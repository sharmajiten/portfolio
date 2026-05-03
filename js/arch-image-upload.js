(() => {
  // ── STEP DEFINITIONS ──────────────────────────────────────────────
  const STEPS = [
    {
      node: 'node-client',
      edge: null,
      from: null,
      to: null,
      num: 1,
      label: 'User selects image',
      desc: '<strong>Browser</strong> — User clicks upload. The browser reads the file via the File API, performs a quick client-side check (size limit), then constructs a <code>multipart/form-data</code> HTTP POST request.',
    },
    {
      node: 'node-lb',
      edge: 'edge-0',
      from: 'node-client',
      to: 'node-lb',
      num: 2,
      label: 'Load Balancer routes request',
      desc: '<strong>Load Balancer</strong> — The request hits the load balancer (e.g. AWS ALB / Nginx). It picks a healthy upstream API server using round-robin and forwards the request, adding an <code>X-Forwarded-For</code> header.',
    },
    {
      node: 'node-apigw',
      edge: 'edge-1',
      from: 'node-lb',
      to: 'node-apigw',
      num: 3,
      label: 'API Gateway validates auth',
      desc: '<strong>API Gateway</strong> — Verifies the JWT bearer token, checks rate limits (e.g. 100 uploads/min per user), and enforces content-length limits. Unauthorized or throttled requests are rejected here — before touching any services.',
    },
    {
      node: 'node-upload',
      edge: 'edge-2',
      from: 'node-apigw',
      to: 'node-upload',
      num: 4,
      label: 'Upload Service receives bytes',
      desc: '<strong>Upload Service</strong> — A dedicated microservice receives the binary stream. It buffers the multipart body, extracts the file field, and passes it downstream. Large files may be streamed directly to avoid memory pressure.',
    },
    {
      node: 'node-validate',
      edge: 'edge-3',
      from: 'node-upload',
      to: 'node-validate',
      num: 5,
      label: 'Validation Service checks file',
      desc: '<strong>Validation</strong> — Checks MIME type via magic bytes (not just the extension), enforces file size limits, scans dimensions, and optionally runs a virus/malware scan. Rejects anything that fails.',
    },
    {
      node: 'node-process',
      edge: 'edge-4',
      from: 'node-validate',
      to: 'node-process',
      num: 6,
      label: 'Processing: resize & compress',
      desc: '<strong>Processing Worker</strong> — Generates multiple variants: thumbnail (150×150), medium (800px), and original. Applies lossy compression (WebP / AVIF), strips EXIF metadata for privacy, and produces a content-addressed filename (SHA-256 hash).',
    },
    {
      node: 'node-storage',
      edge: 'edge-5',
      from: 'node-process',
      to: 'node-storage',
      num: 7,
      label: 'Images written to Object Storage',
      desc: '<strong>Object Storage (S3/GCS)</strong> — All variants are uploaded with server-side encryption (SSE-S3) and public-read ACLs. The storage key is the content hash, making uploads idempotent — uploading the same file twice produces the same URL.',
    },
    {
      node: 'node-db',
      edge: 'edge-6',
      from: 'node-storage',
      to: 'node-db',
      num: 8,
      label: 'Metadata persisted to database',
      desc: '<strong>Metadata DB (PostgreSQL)</strong> — A record is inserted: user ID, upload timestamp, original filename, content type, byte size, CDN URLs for each variant, and a checksum. This is the source of truth for listing and managing uploads.',
    },
    {
      node: 'node-cdn',
      edge: 'edge-7',
      from: 'node-db',
      to: 'node-cdn',
      num: 9,
      label: 'CDN cache populated',
      desc: '<strong>CDN Edge (CloudFront / Fastly)</strong> — The CDN fetches and caches the image at the nearest edge PoP on the first request. Subsequent requests are served from cache with low latency globally. Cache-Control headers set a long TTL (1 year) since the URL is content-addressed.',
    },
    {
      node: 'node-client',
      edge: 'edge-8',
      from: 'node-cdn',
      to: 'node-client',
      num: 10,
      label: 'Response: 201 + image URLs',
      desc: '<strong>Response</strong> — The API returns <code>HTTP 201 Created</code> with a JSON body containing CDN URLs for all image variants. The browser renders the uploaded image. Total round-trip: ~400–900ms for a typical photo.',
    },
  ];

  // ── STATE ──────────────────────────────────────────────────────────
  let currentStep = -1;
  let paused = false;
  let speed = 1;
  let timer = null;

  const STEP_DURATION_BASE = 1800; // ms per step

  // ── DOM REFS ──────────────────────────────────────────────────────
  const packet    = document.getElementById('packet');
  const stepNum   = document.getElementById('step-num');
  const stepText  = document.getElementById('step-text');
  const progFill  = document.getElementById('progress-fill');
  const stepList  = document.getElementById('step-list');

  const btnPlay    = document.getElementById('btn-play');
  const btnRestart = document.getElementById('btn-restart');
  const btnSlow    = document.getElementById('btn-slow');
  const btnNormal  = document.getElementById('btn-normal');
  const btnFast    = document.getElementById('btn-fast');

  // ── INIT STEP PILLS ──────────────────────────────────────────────
  STEPS.forEach((s, i) => {
    const pill = document.createElement('div');
    pill.className = 'step-pill';
    pill.id = `pill-${i}`;
    pill.innerHTML = `<div class="step-dot"></div><span>${s.label}</span>`;
    stepList.appendChild(pill);
  });

  // ── HELPERS ──────────────────────────────────────────────────────
  function getNodeCenter(nodeId) {
    const g = document.getElementById(nodeId);
    const rect = g.querySelector('rect');
    const transform = g.getAttribute('transform');
    const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
    const ox = parseFloat(match[1]);
    const oy = parseFloat(match[2]);
    const w = parseFloat(rect.getAttribute('width'));
    const h = parseFloat(rect.getAttribute('height'));
    return { x: ox + w / 2, y: oy + h / 2 };
  }

  function setNodeState(nodeId, state) {
    const el = document.getElementById(nodeId);
    el.classList.remove('active', 'done');
    if (state) el.classList.add(state);
  }

  function setEdgeState(edgeId, state) {
    if (!edgeId) return;
    const el = document.getElementById(edgeId);
    el.classList.remove('active', 'done');
    if (state) el.classList.add(state);
    if (state === 'active') {
      el.setAttribute('marker-end', 'url(#arr-active)');
    } else if (state === 'done') {
      el.setAttribute('marker-end', 'url(#arr-done)');
    } else {
      el.setAttribute('marker-end', 'url(#arr-default)');
    }
  }

  function setPillState(idx, state) {
    const pill = document.getElementById(`pill-${idx}`);
    pill.classList.remove('active', 'done');
    if (state) pill.classList.add(state);
  }

  // ── PACKET ANIMATION ─────────────────────────────────────────────
  function animatePacket(fromId, toId, duration) {
    if (!fromId || !toId) return Promise.resolve();
    const from = getNodeCenter(fromId);
    const to   = getNodeCenter(toId);
    packet.classList.add('visible');
    packet.setAttribute('cx', from.x);
    packet.setAttribute('cy', from.y);

    return new Promise(resolve => {
      const startTime = performance.now();
      function frame(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const ease = t < .5 ? 2*t*t : -1+(4-2*t)*t; // ease-in-out
        packet.setAttribute('cx', from.x + (to.x - from.x) * ease);
        packet.setAttribute('cy', from.y + (to.y - from.y) * ease);
        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          packet.classList.remove('visible');
          resolve();
        }
      }
      requestAnimationFrame(frame);
    });
  }

  // ── RESET ─────────────────────────────────────────────────────────
  function resetAll() {
    STEPS.forEach((s, i) => {
      setNodeState(s.node, null);
      if (s.edge) setEdgeState(s.edge, null);
      setPillState(i, null);
    });
    packet.classList.remove('visible');
    stepNum.textContent = '—';
    stepText.innerHTML = 'Animation starting…';
    progFill.style.width = '0%';
  }

  // ── ADVANCE STEP ─────────────────────────────────────────────────
  async function runStep(idx) {
    if (idx >= STEPS.length) {
      // Finished — mark all done and loop after pause
      timer = setTimeout(() => {
        if (!paused) restart();
      }, 2000 / speed);
      return;
    }

    const step = STEPS[idx];

    // Mark previous node as done
    if (idx > 0) {
      const prev = STEPS[idx - 1];
      setNodeState(prev.node, 'done');
      if (prev.edge) setEdgeState(prev.edge, 'done');
    }

    // Mark current edge as active
    if (step.edge) setEdgeState(step.edge, 'active');

    // Move packet along edge
    const travelDuration = (STEP_DURATION_BASE * 0.45) / speed;
    await animatePacket(step.from, step.to, travelDuration);

    // Activate current node
    setNodeState(step.node, 'active');
    setPillState(idx, 'active');

    // Update description
    stepNum.textContent = step.num;
    stepText.innerHTML = step.desc;

    // Update progress bar
    progFill.style.width = `${((idx + 1) / STEPS.length) * 100}%`;

    // Schedule next step
    const waitDuration = (STEP_DURATION_BASE * 0.7) / speed;
    timer = setTimeout(() => {
      if (!paused) runStep(idx + 1);
      else currentStep = idx + 1;
    }, waitDuration);

    currentStep = idx;
  }

  // ── START / RESTART ──────────────────────────────────────────────
  function restart() {
    clearTimeout(timer);
    resetAll();
    currentStep = 0;
    if (!paused) runStep(0);
  }

  // ── CONTROLS ─────────────────────────────────────────────────────
  btnPlay.addEventListener('click', () => {
    paused = !paused;
    btnPlay.textContent = paused ? '▶ Play' : '⏸ Pause';
    if (!paused) runStep(currentStep);
  });

  btnRestart.addEventListener('click', restart);

  function setSpeed(s, activeBtn) {
    speed = s;
    [btnSlow, btnNormal, btnFast].forEach(b => b.classList.remove('active-ctrl'));
    activeBtn.classList.add('active-ctrl');
  }
  btnSlow.addEventListener('click',   () => setSpeed(0.5, btnSlow));
  btnNormal.addEventListener('click', () => setSpeed(1,   btnNormal));
  btnFast.addEventListener('click',   () => setSpeed(2,   btnFast));

  // ── KICK OFF ─────────────────────────────────────────────────────
  // Small delay so SVG layout is complete
  setTimeout(() => restart(), 600);

})();
