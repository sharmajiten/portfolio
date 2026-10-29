// Add new posts at the TOP of this array.
// Fields: title, category ("tpm" | "tech" | "life"), date, excerpt, readTime, emoji, featured (true/false), content (HTML string)
const POSTS = [
  {
    title: "The Art of Translating Tech to Exec: A TPM's Playbook",
    category: "tpm",
    date: "Apr 20, 2026",
    excerpt: "Engineering thinks in systems. Executives think in outcomes. As a TPM, your most valuable skill isn't running standups or updating Jira — it's being the real-time interpreter between two groups who speak different languages and have different definitions of \"done.\" Here's how I think about it.",
    readTime: "8 min read",
    emoji: "🗺️",
    featured: true,
    content: `
      <p>Engineering thinks in systems. Executives think in outcomes. As a TPM, your most valuable skill isn't running standups or updating Jira — it's being the real-time interpreter between two groups who speak entirely different languages and have fundamentally different definitions of "done."</p>
      <h3>The Translation Problem</h3>
      <p>I've sat in hundreds of engineering discussions where the team is rightfully proud of a resilient architecture — retry logic, circuit breakers, graceful degradation. Then I walk into the exec review and realize none of that maps to what the VP cares about: will it be on time, what's the risk, and what does it cost?</p>
      <p>Neither side is wrong. They're optimizing for different variables. Your job is to carry signal between these two worlds without losing meaning in transit.</p>
      <h3>A Framework I Use</h3>
      <p>I think of every technical update in terms of three exec-facing dimensions:</p>
      <ul>
        <li><strong>Timeline confidence</strong> — not "we're 70% done" but "we can commit to X by Y given Z assumptions"</li>
        <li><strong>Risk surface</strong> — not "there's a race condition in the worker pool" but "if we don't address the data integrity issue, there's a meaningful chance of a customer-visible bug at launch"</li>
        <li><strong>Decision needed (or not)</strong> — be explicit about whether you need the room to decide something, or just need to inform them</li>
      </ul>
      <h3>What to Never Do</h3>
      <p>Don't translate by stripping information. "It's fine, don't worry" is not a translation — it's a lie of omission. Execs need accurate information to make resource calls, set board expectations, and communicate with customers. When you oversimplify, you remove their ability to make good decisions.</p>
      <p>The best translators I've worked with never lose the nuance — they just package it differently. They say: "We have a dependency on the auth service team that could slip us by a week. I've already talked to their lead and we have a mitigation plan, but I want you aware in case it escalates."</p>
      <h3>Practice in the Room</h3>
      <p>Start every engineering update you own by asking yourself: if the CTO had 90 seconds and needed to make one decision based on this, what would the update say? Write that first. Then add technical depth below it for those who want it. You'll never go back to leading with the system design.</p>
    `
  },
  {
    title: "Distributed Systems Explained Through Pizza Delivery",
    category: "tech",
    date: "Apr 12, 2026",
    excerpt: "CAP theorem, eventual consistency, and distributed transactions are easier to understand if you just think about a very ambitious pizza restaurant.",
    readTime: "6 min read",
    emoji: "🍕",
    featured: false,
    content: `
      <p>CAP theorem, eventual consistency, and distributed transactions are easier to understand if you just think about a very ambitious pizza restaurant. Bear with me.</p>
      <h3>The Setup</h3>
      <p>Imagine a pizza chain with three locations: downtown, midtown, and uptown. Each location keeps its own inventory book. When you call any location, they check their local book and either make your pizza or tell you they're out. Simple enough.</p>
      <p>Now the chain gets popular and the owner wants all locations to share inventory in real time. This is where distributed systems get interesting — and painful.</p>
      <h3>CAP Theorem (The Trilemma)</h3>
      <p>The CAP theorem says you can only guarantee two of three things at once: <strong>Consistency</strong> (all locations see the same inventory), <strong>Availability</strong> (every location always answers your call), and <strong>Partition tolerance</strong> (locations keep working even if the phone lines between them go down).</p>
      <p>Since network partitions happen in the real world, you're really choosing between C and A. Either you wait for all locations to agree before confirming your order (CP), or you let them each answer independently and reconcile later (AP).</p>
      <h3>Eventual Consistency in Practice</h3>
      <p>Most real systems choose AP. Uptown might tell you the last mozzarella is available, sell it to you, and then 200ms later discover downtown sold it first. This is called an <strong>eventual consistency</strong> conflict, and the system has to decide how to resolve it — usually by compensating (calling you back, issuing a refund, making a substitution).</p>
      <p>Amazon's shopping cart is famously AP. It lets you add items even when inventory systems are degraded, then resolves conflicts at checkout. The slight inaccuracy is a better tradeoff than showing customers an error page.</p>
      <h3>Distributed Transactions</h3>
      <p>Sometimes you genuinely need all-or-nothing. You're ordering from three locations at once for a big party — if any one can't fulfill their part, the whole order cancels. This is a distributed transaction. The two-phase commit protocol coordinates this: all locations first say "I can do it" (prepare phase), and only then does everyone commit. If anyone says no, everyone aborts. It's slow and failure-prone, which is why most modern systems avoid it unless they absolutely need it.</p>
      <p>Next time someone throws around "distributed systems" in a design review, ask them which CAP guarantees they actually need. The answer shapes everything downstream.</p>
    `
  },
  {
    title: "Why I Started Running at 30 (And What It Taught Me About Project Management)",
    category: "life",
    date: "Mar 30, 2026",
    excerpt: "Turns out training for a half marathon and delivering a major infra migration have more in common than you'd think. Both have a long runway, lots of small daily bets, and a cruel taper phase.",
    readTime: "5 min read",
    emoji: "🏃",
    featured: false,
    content: `
      <p>I was not a runner. For most of my twenties, "cardio" meant speed-walking between the parking garage and the office. Then I turned 30, my doctor said something mildly alarming, and I signed up for a half marathon with exactly zero preparation. Classic project management instinct: commit first, figure out the plan second.</p>
      <h3>The Long Runway Problem</h3>
      <p>Training for a half marathon takes about 14 weeks. A major infrastructure migration at work was on a 16-week timeline. I was doing both simultaneously, and I kept noticing the same failure modes showing up in each.</p>
      <p>The biggest one: underestimating early weeks. Week 1 of training is a 20-minute easy jog. Week 1 of the migration was scoping and dependency mapping. Both feel like nothing. Both are load-bearing. Skip or rush either, and you pay for it in week 10 when everything is harder and there's no slack left.</p>
      <h3>Small Daily Bets</h3>
      <p>Running coaches will tell you that fitness is the accumulation of many modest, consistent efforts — not a few heroic long runs. Project delivery is the same. The teams I've seen ship reliably aren't the ones who crunch at the end. They're the ones who make small, irreversible forward progress every single day and keep the blast radius of any individual decision small.</p>
      <h3>The Taper</h3>
      <p>Two weeks before race day, you dramatically cut your mileage. Your body is tired, your mind tells you you're losing fitness, and you feel oddly worse than you did mid-training. Runners call this the taper. It's real, it's cruel, and it's necessary.</p>
      <p>The equivalent in projects is the pre-launch freeze: you stop adding scope, you focus on hardening, and everyone feels vaguely antsy because it seems like nothing is happening. The teams that respect the taper ship cleaner than the ones who sneak in "just one more feature" in week 15.</p>
      <h3>I Finished the Race</h3>
      <p>2:11:43. Not fast, but done. The migration shipped on week 17 — one week late, which we had budgeted for in the risk plan. Both of us, me and the infra team, had learned the same lesson: the plan isn't the thing. The discipline to follow it when it's inconvenient is the thing.</p>
    `
  },
  {
    title: "How to Run a Post-Mortem People Actually Learn From",
    category: "tpm",
    date: "Mar 14, 2026",
    excerpt: "Most post-mortems produce a doc that no one reads again. Here's the format I've landed on after way too many outages and botched deployments.",
    readTime: "7 min read",
    emoji: "🔥",
    featured: false,
    content: `
      <p>Most post-mortems produce a document that gets linked in Slack, acknowledged, and never read again. The format I've landed on after dozens of outages tries to fix that by treating the postmortem as a live session rather than a report.</p>
      <h3>The Common Failure Mode</h3>
      <p>The typical flow: something breaks, there's an incident channel, someone writes a doc afterward, the doc gets "signed off," life moves on. The learnings stay in the doc. The doc stays in Confluence. The next incident has the same root cause.</p>
      <p>This happens because most post-mortems optimize for accountability (explaining what happened) rather than learning (changing what we do next time). The fix is structural.</p>
      <h3>The Format</h3>
      <p>I run post-mortems in two parts separated by 48 hours:</p>
      <ul>
        <li><strong>Part 1 (24 hours after incident):</strong> 30-minute meeting. No blame. Timeline reconstruction only. Everyone on the incident call adds their perspective to a shared doc before we meet. Goal: agree on what actually happened, not what we think happened.</li>
        <li><strong>Part 2 (48 hours later):</strong> 45-minute working session. We walk through the contributing factors and generate action items. Each action item needs an owner, a due date, and a "definition of done." Vague action items get sent back.</li>
      </ul>
      <h3>The Questions That Matter</h3>
      <p>Instead of "what went wrong," ask: <em>What did we believe that turned out to be false?</em> This reframes the conversation. It surfaces hidden assumptions — about system behavior, about team capacity, about monitoring coverage — that are more actionable than "the deploy script had a bug."</p>
      <p>Also ask: <em>What went right?</em> Seriously. Every incident has moments where things were detected faster than expected, or where a mitigation worked cleanly. Reinforcing those is just as important as fixing the gaps.</p>
      <h3>Closing the Loop</h3>
      <p>The post-mortem isn't done when the doc is written. It's done when the action items are closed. I put a 30-day review on my calendar for every major incident: have we actually shipped the changes we said we would? If not, why not? This follow-up is where most post-mortem programs fall apart — and where mine earns its credibility.</p>
    `
  },
  {
    title: "What Actually Happens When You Upload an Image",
    category: "tech",
    date: "Feb 28, 2026",
    excerpt: "A deep-dive into the full request lifecycle: from the browser click to CDN delivery. Pairs well with the interactive diagram on my Architecture page.",
    readTime: "10 min read",
    emoji: "📦",
    featured: false,
    content: `
      <p>You click "Upload." The progress bar fills. Your photo appears. It looks instantaneous. Under the hood, about a dozen systems just coordinated across multiple data centers to make that happen. Let's walk through all of them.</p>
      <h3>Step 1: The Browser</h3>
      <p>Before a single byte leaves your device, the browser does its job. It reads the file from disk into memory, validates the MIME type, and if you're on a modern site, might even do client-side compression or format conversion (e.g., converting PNG to WebP) before the upload begins. Then it opens a TCP connection — or reuses an existing HTTP/2 or HTTP/3 stream — and starts sending.</p>
      <h3>Step 2: The Load Balancer</h3>
      <p>Your bytes hit a load balancer first. It terminates your TLS connection (decrypting the traffic), inspects the request, and routes it to one of potentially dozens of application servers. It also enforces rate limits, checks request size limits, and handles health-checking so sick servers don't get traffic. If you're uploading something large, the load balancer may stream the bytes directly to object storage rather than buffering the whole thing in memory.</p>
      <h3>Step 3: The Application Server</h3>
      <p>The app server validates your session token, checks that you have permission to upload, validates the file (checking actual file headers, not just the extension — <code>file.jpg</code> that's actually an executable is a real attack vector), and begins orchestrating what happens next.</p>
      <p>For most modern systems, the actual file bytes go directly to object storage (S3, GCS, Azure Blob) — the app server just coordinates metadata. This keeps the app server stateless and cheap to scale.</p>
      <h3>Step 4: Object Storage + Processing Queue</h3>
      <p>The raw file lands in object storage. Simultaneously, the app server drops a message on a processing queue (SQS, Pub/Sub, Kafka — depending on the system). Worker processes pick up that message and do the heavy lifting: image resizing for different viewports, format conversion, EXIF stripping, content safety scanning, thumbnail generation. These are done asynchronously so the upload response doesn't have to wait for all of it.</p>
      <h3>Step 5: CDN Distribution</h3>
      <p>Once processed versions are ready, the canonical URLs are written to the database and the CDN is notified (or just lets cache-miss populate lazily on first access). The CDN replicates your image to edge nodes in dozens of regions so that when someone in Singapore loads your photo, it comes from Singapore — not your origin data center in Virginia.</p>
      <h3>Why This Matters for TPMs</h3>
      <p>Every one of these steps is a potential failure point, a latency contributor, and a cost driver. Understanding the lifecycle helps you ask the right questions: Why is upload slow? (Check Step 1-2.) Why do images sometimes appear broken right after upload? (Probably async processing lag in Step 4.) Why did our storage bill spike? (Unoptimized format conversion in Step 4.) The system isn't magic — it's a chain, and chains break at their weakest link.</p>
    `
  },
  {
    title: "Writing RFCs That Engineers Actually Read",
    category: "tpm",
    date: "Jan 22, 2026",
    excerpt: "The secret is not in the template — it's in being ruthlessly specific about what you're NOT deciding. A good RFC narrows the solution space. Here's mine.",
    readTime: "6 min read",
    emoji: "📐",
    featured: false,
    content: `
      <p>The secret to a good RFC is not in the template. It's in being ruthlessly specific about what you are <em>not</em> deciding. Most RFCs I've reviewed fail because they're too broad — they try to design an entire system when they should be deciding one thing and explicitly deferring everything else.</p>
      <h3>What an RFC Is Actually For</h3>
      <p>An RFC (Request for Comments) is a coordination tool. Its job is to get the right people to give you their input before you're too far committed to change course. It's not a spec, not a design doc, and not a project plan. An RFC that tries to be all three is none of them.</p>
      <h3>The Structure That Works</h3>
      <p>Here's the template I've converged on after writing and reviewing hundreds of these:</p>
      <ul>
        <li><strong>Problem statement (3 sentences max).</strong> What is broken or missing? Who is affected? How do you know it's a real problem?</li>
        <li><strong>Decision being made.</strong> One sentence. "We are deciding X." Not "we are designing a system that handles X, Y, and Z."</li>
        <li><strong>What we are NOT deciding here.</strong> Explicitly call out the adjacent questions you're deferring. This is the most important section and almost always missing.</li>
        <li><strong>Proposed solution.</strong> Your recommendation, with enough detail to evaluate it. Not a complete design.</li>
        <li><strong>Alternatives considered.</strong> At least two. Show you actually thought about this.</li>
        <li><strong>Open questions.</strong> Things you want input on, numbered so reviewers can respond inline.</li>
      </ul>
      <h3>The Scope Trap</h3>
      <p>Every RFC has a natural tendency to expand. You write "we need to decide how to handle auth tokens" and by paragraph three you're designing a full identity platform. This happens because problems are connected, and smart engineers can't look at a problem without seeing its neighbors.</p>
      <p>Fight this. Add a "non-goals" section early and update it aggressively as you write. If you notice yourself deciding something you didn't put in the decision statement, either update the decision statement or cut the section.</p>
      <h3>Getting Good Comments</h3>
      <p>The quality of comments on an RFC is directly proportional to how specific your open questions are. "Feedback welcome" gets you nothing. "Is the proposed token TTL of 15 minutes the right tradeoff for our mobile client latency?" gets you a useful thread.</p>
      <p>Send a short Slack message when you publish: one sentence on what you're deciding, one sentence on the specific input you need, and a deadline. Engineers will engage if they know what you're actually asking.</p>
    `
  },
  {
    title: "Service Meshes: When They Help and When They Don't",
    category: "tech",
    date: "Jan 5, 2026",
    excerpt: "I've shipped two service mesh migrations. One went well. One was a disaster. The difference was understanding what problem you actually have.",
    readTime: "9 min read",
    emoji: "🕸️",
    featured: false,
    content: `
      <p>I've shipped two service mesh migrations. One went well. One was a disaster. Looking back, the difference had nothing to do with the mesh we chose — it was about whether we understood the problem we were actually solving before we committed to the solution.</p>
      <h3>What a Service Mesh Actually Does</h3>
      <p>A service mesh adds a sidecar proxy (like Envoy) to every service in your infrastructure. These proxies intercept all network traffic between services and give you: mutual TLS between services, fine-grained traffic control (retries, timeouts, circuit breaking), and deep observability (distributed traces, request metrics, latency histograms) — without changing application code.</p>
      <p>That "without changing application code" part is why meshes are appealing. The observability and reliability features feel free. They're not — but we'll get there.</p>
      <h3>When It Went Well</h3>
      <p>The first migration was at a company with 40+ services, a diverse language stack (Go, Python, Java), and a compliance requirement for mTLS between all services. Implementing mTLS in each service individually would have taken months and left us with 40 different implementations to maintain. The mesh gave us blanket mTLS in weeks with a single control plane to audit. Clear problem, good fit.</p>
      <h3>When It Was a Disaster</h3>
      <p>The second migration was... different. We had 12 services, all Go, no compliance requirements, and our observability was already reasonable through manual instrumentation. We adopted a mesh because it was the hot thing and because our new VP of Engineering had used one at his previous company.</p>
      <p>What followed: six months of debugging sidecar proxy OOMs, fighting configuration drift between the mesh's traffic model and our deployment tooling, explaining to on-call engineers why a service outage was "actually the mesh" instead of the service itself. The operational overhead ate us alive. We ripped it out eight months later.</p>
      <h3>The Diagnostic Questions</h3>
      <p>Before you commit to a mesh migration, honestly answer these:</p>
      <ul>
        <li>Do you have more than ~15 services? If not, the coordination overhead isn't worth it.</li>
        <li>Do you have a polyglot stack? If everyone is writing Go, library-level solutions are simpler.</li>
        <li>Do you have a compliance requirement that mandates mTLS? If not, is your threat model actually requiring it?</li>
        <li>Do you have a team with the operational depth to run a control plane? Istio, Linkerd, Consul — all of these require dedicated expertise to operate well.</li>
        <li>Are you solving a problem you have, or a problem you expect to have?</li>
      </ul>
      <h3>The Honest Tradeoff</h3>
      <p>Service meshes shift complexity out of your application code and into your infrastructure layer. That's a real benefit if your application code complexity is the bottleneck. It's a terrible deal if your infrastructure team is already stretched. There's no free lunch — you're relocating the problem, not eliminating it. Know where you want the complexity to live before you sign up for the migration.</p>
    `
  }
];
