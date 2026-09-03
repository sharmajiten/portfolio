// Add new architectures to this array.
// Set status: "live" to make it selectable; "coming-soon" shows as a placeholder card.
//
// For "live" entries, provide:
//   stageTitle  — header text in the animation stage
//   viewBox     — SVG viewBox, e.g. "0 0 860 420"
//   nodes[]     — { id, x, y, w, h, icon, label, sub }
//   edges[]     — { id, d }  (d is an SVG path string)
//   steps[]     — { node, edge, from, to, num, label, desc }
//                   node/edge/from/to must match ids in nodes[]/edges[]

const ARCHITECTURES = [
  // ─────────────────────────────────────────────────────────────────
  // Add new live architectures here. Template:
  //
  // {
  //   id: 'my-arch',
  //   emoji: '🔧',
  //   title: 'My Architecture',
  //   cardDesc: 'Short one-liner for the gallery card.',
  //   status: 'live',
  //   stageTitle: '🔧 My Architecture — Full Request Lifecycle',
  //   viewBox: '0 0 860 420',
  //   nodes: [
  //     { id: 'node-a', x: 8, y: 64, w: 120, h: 84, icon: '🖥️', label: 'Node A', sub: 'subtitle' },
  //     ...
  //   ],
  //   edges: [
  //     { id: 'edge-0', d: 'M 128 106 L 200 106' },
  //     ...
  //   ],
  //   steps: [
  //     { node: 'node-a', edge: null, from: null, to: null, num: 1, label: 'Step label', desc: 'HTML description' },
  //     { node: 'node-b', edge: 'edge-0', from: 'node-a', to: 'node-b', num: 2, label: '...', desc: '...' },
  //     ...
  //   ],
  // },
  // ─────────────────────────────────────────────────────────────────

  {
    id: 'nmt-translation',
    emoji: '🌐',
    title: 'Language Translation',
    cardDesc: 'Encoder–decoder, attention, softmax, and the cross-entropy training loop.',
    status: 'live',
    stageTitle: '🌐 Neural Machine Translation — Encoder / Decoder Training Loop',
    viewBox: '0 0 860 420',
    nodes: [
      { id: 'node-src',      x: 8,   y: 56,  w: 126, h: 84, icon: '📝', label: 'Source Text',   sub: 'Hallo Welt →' },
      { id: 'node-embed',    x: 200, y: 56,  w: 150, h: 84, icon: '🔤', label: 'Embedding',     sub: 'Tokens + Positional' },
      { id: 'node-encoder',  x: 416, y: 56,  w: 150, h: 84, icon: '🧠', label: 'Encoder',       sub: 'Self-Attention ×N' },
      { id: 'node-decoder',  x: 632, y: 56,  w: 150, h: 84, icon: '🧩', label: 'Decoder',       sub: 'Masked + Cross-Attn' },
      { id: 'node-softmax',  x: 632, y: 300, w: 150, h: 84, icon: '📊', label: 'Softmax',       sub: 'Vocab Distribution' },
      { id: 'node-output',   x: 416, y: 300, w: 150, h: 84, icon: '🌍', label: 'Translation',   sub: 'Predicted Tokens' },
      { id: 'node-loss',     x: 200, y: 300, w: 150, h: 84, icon: '📉', label: 'Cross-Entropy', sub: 'Loss vs Target' },
      { id: 'node-backprop', x: 8,   y: 300, w: 126, h: 84, icon: '🔁', label: 'Backprop',      sub: 'Gradient Update' },
    ],
    edges: [
      { id: 'edge-0', d: 'M 134 98 L 200 98' },
      { id: 'edge-1', d: 'M 350 98 L 416 98' },
      { id: 'edge-2', d: 'M 566 98 L 632 98' },
      { id: 'edge-3', d: 'M 707 140 L 707 300' },
      { id: 'edge-4', d: 'M 632 342 L 566 342' },
      { id: 'edge-5', d: 'M 416 342 L 350 342' },
      { id: 'edge-6', d: 'M 200 342 L 134 342' },
      { id: 'edge-7', d: 'M 71 300 L 71 220 L 491 220 L 491 140' },
    ],
    steps: [
      {
        node: 'node-src', edge: null, from: null, to: null, num: 1,
        label: 'Source sentence in',
        desc: '<strong>Source Sentence</strong> — The input sentence in the source language (e.g. German <code>"Hallo Welt"</code>) enters the pipeline. During training it is paired with its reference translation; at inference it arrives on its own.',
      },
      {
        node: 'node-embed', edge: 'edge-0', from: 'node-src', to: 'node-embed', num: 2,
        label: 'Tokenize & embed',
        desc: '<strong>Tokenization + Embedding</strong> — The sentence is split into subword tokens (BPE / WordPiece), and each token is mapped to a learned dense vector. Positional encodings are added so the model knows token order — self-attention itself is order-agnostic.',
      },
      {
        node: 'node-encoder', edge: 'edge-1', from: 'node-embed', to: 'node-encoder', num: 3,
        label: 'Encoder reads source',
        desc: '<strong>Encoder Stack</strong> — N stacked layers of multi-head <strong>self-attention</strong> + feed-forward networks read the whole source at once, letting every token attend to every other. Output: a sequence of context-rich hidden states capturing the source meaning.',
      },
      {
        node: 'node-decoder', edge: 'edge-2', from: 'node-encoder', to: 'node-decoder', num: 4,
        label: 'Decoder generates target',
        desc: '<strong>Decoder Stack</strong> — Produces the target sequence. <strong>Masked self-attention</strong> stops it peeking at future tokens; <strong>cross-attention</strong> lets each target position query the encoder\'s hidden states. In training, teacher forcing feeds the ground-truth previous token.',
      },
      {
        node: 'node-softmax', edge: 'edge-3', from: 'node-decoder', to: 'node-softmax', num: 5,
        label: 'Project → softmax',
        desc: '<strong>Output Projection → Softmax</strong> — A linear layer maps each decoder state to logits over the entire target vocabulary; <code>softmax</code> turns them into a probability distribution — e.g. <code>P("World") = 0.82</code>. This is the model\'s predicted next-token probability.',
      },
      {
        node: 'node-output', edge: 'edge-4', from: 'node-softmax', to: 'node-output', num: 6,
        label: 'Emit predicted tokens',
        desc: '<strong>Predicted Tokens</strong> — Taking <code>argmax</code> (or beam search at inference) over each distribution yields the output tokens — <code>"Hello World"</code>. During training these predictions are scored against the reference translation.',
      },
      {
        node: 'node-loss', edge: 'edge-5', from: 'node-output', to: 'node-loss', num: 7,
        label: 'Cross-entropy loss',
        desc: '<strong>Cross-Entropy Loss</strong> — Measures how far the predicted distribution is from the true target: <code>H = −Σ y·log(ŷ)</code>. Since the target is one-hot, it reduces to <code>−log P(correct token)</code>. A confident, correct guess ≈ 0 loss; a wrong or uncertain one is penalized heavily — this entropy is what drives learning.',
      },
      {
        node: 'node-backprop', edge: 'edge-6', from: 'node-loss', to: 'node-backprop', num: 8,
        label: 'Backprop the gradients',
        desc: '<strong>Backpropagation + Optimizer</strong> — Gradients of the loss flow backward through decoder, encoder, and embeddings via the chain rule. An optimizer (e.g. Adam) nudges every weight to reduce the loss on this batch.',
      },
      {
        node: 'node-encoder', edge: 'edge-7', from: 'node-backprop', to: 'node-encoder', num: 9,
        label: 'Update weights → repeat',
        desc: '<strong>Training Loop</strong> — The updated encoder & decoder are ready for the next batch. Over many epochs the loss curve falls and translations sharpen. At inference the same encoder → decoder → softmax path runs forward only — no loss, just generation.',
      },
    ],
  },

  {
    id: 'class-imbalance',
    emoji: '⚖️',
    title: 'Class Imbalance',
    cardDesc: 'Resampling, class weights, confusion matrices, and why accuracy lies to you.',
    status: 'live',
    stageTitle: '⚖️ Class Imbalance — Resampling, Reweighting & the Metrics That Matter',
    viewBox: '0 0 860 420',
    nodes: [
      { id: 'node-data',      x: 8,   y: 56,  w: 126, h: 84, icon: '📊', label: 'Raw Dataset',      sub: '95% / 5% split' },
      { id: 'node-check',     x: 200, y: 56,  w: 150, h: 84, icon: '🔍', label: 'Class Balance Check', sub: 'Imbalance Ratio' },
      { id: 'node-resample',  x: 416, y: 56,  w: 150, h: 84, icon: '🧬', label: 'Resampling',       sub: 'SMOTE · Under/Over' },
      { id: 'node-weight',    x: 632, y: 56,  w: 150, h: 84, icon: '🎚️', label: 'Class Weights',    sub: 'Loss Re-weighting' },
      { id: 'node-train',     x: 632, y: 300, w: 150, h: 84, icon: '🧠', label: 'Model Training',   sub: 'Weighted Objective' },
      { id: 'node-confusion', x: 416, y: 300, w: 150, h: 84, icon: '🧮', label: 'Confusion Matrix', sub: 'TP · FP · FN · TN' },
      { id: 'node-metrics',   x: 200, y: 300, w: 150, h: 84, icon: '📈', label: 'Precision & Recall', sub: 'F1 · AUPRC' },
      { id: 'node-decision',  x: 8,   y: 300, w: 126, h: 84, icon: '🔁', label: 'Iterate?',         sub: 'Tune & Retrain' },
    ],
    edges: [
      { id: 'edge-0', d: 'M 134 98 L 200 98' },
      { id: 'edge-1', d: 'M 350 98 L 416 98' },
      { id: 'edge-2', d: 'M 566 98 L 632 98' },
      { id: 'edge-3', d: 'M 707 140 L 707 300' },
      { id: 'edge-4', d: 'M 632 342 L 566 342' },
      { id: 'edge-5', d: 'M 416 342 L 350 342' },
      { id: 'edge-6', d: 'M 200 342 L 134 342' },
      { id: 'edge-7', d: 'M 71 300 L 71 220 L 275 220 L 275 140' },
    ],
    steps: [
      {
        node: 'node-data', edge: null, from: null, to: null, num: 1,
        label: 'Raw, imbalanced dataset',
        desc: '<strong>Raw Dataset</strong> — Most real-world classification problems are lopsided: fraud detection, disease screening, and defect inspection might all see a <code>95% / 5%</code> split or worse between the majority (normal) and minority (the thing you actually care about) class.',
      },
      {
        node: 'node-check', edge: 'edge-0', from: 'node-data', to: 'node-check', num: 2,
        label: 'Measure the imbalance',
        desc: '<strong>Class Balance Check</strong> — Compute the class ratio before doing anything else. This surfaces the <em>accuracy paradox</em>: a model that always predicts "majority class" scores 95% accuracy while catching <code>0%</code> of the cases you built the model for.',
      },
      {
        node: 'node-resample', edge: 'edge-1', from: 'node-check', to: 'node-resample', num: 3,
        label: 'Resample the data',
        desc: '<strong>Resampling</strong> — <strong>Oversampling</strong> duplicates or synthesizes minority examples (SMOTE interpolates between nearest neighbors in feature space); <strong>undersampling</strong> drops majority examples. Both rebalance the training set the model actually sees.',
      },
      {
        node: 'node-weight', edge: 'edge-2', from: 'node-resample', to: 'node-weight', num: 4,
        label: 'Or, reweight the loss',
        desc: '<strong>Class Weights</strong> — Instead of touching the data, penalize minority-class errors more heavily in the loss function (e.g. inverse class frequency, or focal loss). No synthetic samples, no discarded data — just a different cost for getting it wrong.',
      },
      {
        node: 'node-train', edge: 'edge-3', from: 'node-weight', to: 'node-train', num: 5,
        label: 'Train on the adjusted objective',
        desc: '<strong>Model Training</strong> — The model trains on the rebalanced data and/or reweighted loss. Watch for overfitting to synthetic minority points (SMOTE) or instability from extreme weight ratios — both are common failure modes here.',
      },
      {
        node: 'node-confusion', edge: 'edge-4', from: 'node-train', to: 'node-confusion', num: 6,
        label: 'Build the confusion matrix',
        desc: '<strong>Confusion Matrix</strong> — On a held-out, untouched-by-resampling validation set, count <code>True Positives</code>, <code>False Positives</code>, <code>False Negatives</code>, and <code>True Negatives</code> for the minority class specifically.',
      },
      {
        node: 'node-metrics', edge: 'edge-5', from: 'node-confusion', to: 'node-metrics', num: 7,
        label: 'Compute the metrics that matter',
        desc: '<strong>Precision & Recall</strong> — <code>Precision = TP/(TP+FP)</code>, <code>Recall = TP/(TP+FN)</code>, <code>F1</code> is their harmonic mean. For severe imbalance, <strong>AUPRC</strong> (area under the precision-recall curve) is the honest headline number — ROC-AUC can look great while recall on the minority class is terrible.',
      },
      {
        node: 'node-decision', edge: 'edge-6', from: 'node-metrics', to: 'node-decision', num: 8,
        label: 'Good enough — or iterate?',
        desc: '<strong>Iterate?</strong> — If minority-class recall or F1 is still too low, this isn\'t a dead end: adjust the resampling ratio, try a different weighting scheme, or go collect more minority-class data. If the metrics hold up, ship it.',
      },
      {
        node: 'node-check', edge: 'edge-7', from: 'node-decision', to: 'node-check', num: 9,
        label: 'Tune strategy → recheck',
        desc: '<strong>The Loop</strong> — Each iteration adjusts one lever — resampling ratio, class weight, or model choice — and re-measures. Unlike a one-shot fix, class imbalance is usually solved by a few small, deliberate turns of this loop, not one big one.',
      },
    ],
  },
];
