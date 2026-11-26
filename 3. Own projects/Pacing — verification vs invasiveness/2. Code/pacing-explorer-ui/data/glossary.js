// Pacing explorer: glossary.
// Each entry: term (shown in the glossary), match (the exact words in the text that
// should show a tooltip, upper or lower case), definition (copied word for word from
// "Glossary" in section 8 of "Website text.md"; tools/validate_data.py checks every one).
// A term is underlined the first time it appears on each page. The site lists the terms
// in alphabetical order, whatever order they have here.
// To add a term, add it to "Website text.md" first, then add one entry here.
// Must stay valid JSON after "window.PACING_GLOSSARY =".

window.PACING_GLOSSARY = [
  {
    "term": "Pacing",
    "match": [
      "pacing agreements",
      "pacing agreement",
      "coordinated pacing",
      "pacing"
    ],
    "definition": "Deliberately slowing parts of frontier AI development – for example through caps or pauses agreed between companies or states – so that safety work can keep up."
  },
  {
    "term": "Compute",
    "match": [
      "compute",
      "computing power"
    ],
    "definition": "Computing power, i.e. the chips and processing capacity used to train and run AI models. It is the input to AI that is easiest to count and verify."
  },
  {
    "term": "FLOP",
    "match": [
      "FLOP"
    ],
    "definition": "Floating-point operation, one basic arithmetic step by a computer. The total number of FLOP measures how much computation went into training a model."
  },
  {
    "term": "H100-equivalent",
    "match": [
      "H100-equivalents",
      "H100-equivalent",
      "H100e"
    ],
    "definition": "A unit for counting AI chips of different types. One H100-equivalent is the computing power of one Nvidia H100, a widely used AI chip."
  },
  {
    "term": "Frontier",
    "match": [
      "frontier-capable",
      "frontier models",
      "frontier model",
      "frontier"
    ],
    "definition": "The most capable AI models at a given time, and the large-scale computing needed to build them."
  },
  {
    "term": "Training",
    "match": [
      "training runs",
      "training run",
      "training"
    ],
    "definition": "Building an AI model by running very large computations over data. A training run is one such computation, and training frontier models requires very large numbers of chips."
  },
  {
    "term": "Inference",
    "match": [
      "inference-only",
      "inference"
    ],
    "definition": "Running an AI model that has already been trained, for example to answer requests. Data centres limited to inference can run existing models but cannot train new ones."
  },
  {
    "term": "AI chip",
    "match": [
      "AI chips",
      "AI chip"
    ],
    "definition": "A specialised processor built for AI computations. Advanced AI chips are made by a handful of firms."
  },
  {
    "term": "Lithography machine",
    "match": [
      "lithography machines",
      "lithography machine"
    ],
    "definition": "A machine that prints circuit patterns onto chips. Very few firms make the most advanced ones."
  },
  {
    "term": "Cluster",
    "match": [
      "clusters",
      "cluster"
    ],
    "definition": "A group of AI chips connected so that they can work together on one task."
  },
  {
    "term": "Data centre",
    "match": [
      "data-centre",
      "data centres",
      "data centre"
    ],
    "definition": "A building that houses large numbers of computer chips, with the power and cooling they need."
  },
  {
    "term": "Cloud provider",
    "match": [
      "cloud providers",
      "cloud provider",
      "cloud firms"
    ],
    "definition": "A company that rents out computing capacity in its data centres."
  },
  {
    "term": "Model weights",
    "match": [
      "model weights",
      "weights"
    ],
    "definition": "The numbers that make up a trained AI model. Whoever holds the weights can run the model."
  },
  {
    "term": "Export controls",
    "match": [
      "export controls",
      "export-control"
    ],
    "definition": "Government rules restricting which goods, such as advanced chips, can be sold to which countries."
  },
  {
    "term": "Census",
    "match": [
      "census"
    ],
    "definition": "A one-off count of all the AI chips that already exist."
  },
  {
    "term": "Firmware",
    "match": [
      "firmware-level",
      "firmware"
    ],
    "definition": "Low-level software built into a hardware device."
  },
  {
    "term": "Tamper-evidence",
    "match": [
      "tamper-evidence",
      "tamper checks",
      "tamper-evident"
    ],
    "definition": "Features, such as seals, that show whether a device has been opened or interfered with."
  },
  {
    "term": "Leading and trailing states",
    "match": [
      "leading state",
      "trailing state"
    ],
    "definition": "A leading state is ahead in frontier AI, while a trailing state is behind and trying to catch up."
  },
  {
    "term": "Route to capability",
    "match": [
      "routes",
      "route"
    ],
    "definition": "One of the ways AI becomes more capable: more computing power, better algorithms, more training after the main run, or better ways of drawing out what a model can already do."
  },
  {
    "term": "AI safety institute",
    "match": [
      "AI safety institutes",
      "AI safety institute",
      "AI Security Institute"
    ],
    "definition": "A government body that tests AI models, such as the UK AI Security Institute."
  },
  {
    "term": "Bandwidth",
    "match": [
      "bandwidth"
    ],
    "definition": "How fast data can move between chips."
  },
  {
    "term": "Pod",
    "match": [
      "pods",
      "pod"
    ],
    "definition": "A group of chips linked by very fast connections, inside which training can continue under a bandwidth cap."
  },
  {
    "term": "Network tap",
    "match": [
      "network taps",
      "network tap"
    ],
    "definition": "A device that copies the data passing through a network link so that it can be checked."
  },
  {
    "term": "MIRI agreement",
    "match": [
      "MIRI agreement"
    ],
    "definition": "A proposed international treaty to stop the development of superintelligent AI until it can be done safely. Training above 10²⁴ FLOP is banned, and training above 10²² FLOP requires approval."
  },
  {
    "term": "AI 2040: Plan A",
    "match": [
      "AI 2040: Plan A"
    ],
    "definition": "A proposed US–China deal to pause frontier AI training, verified by tracking chips and by converting data centres to run existing models only."
  },
  {
    "term": "Building the Pause Button",
    "match": [
      "Building the Pause Button"
    ],
    "definition": "A proposal to build, in advance, the infrastructure for an enforceable global pause, triggered by a computing-power threshold."
  },
  {
    "term": "Hardwired Pause",
    "match": [
      "Hardwired Pause"
    ],
    "definition": "A proposal to make a pause enforceable by the hardware itself: chips able to train frontier models are counted and licensed, and approved models run on chips that cannot train."
  },
  {
    "term": "We Must Pace the Frontier",
    "match": [
      "We Must Pace the Frontier"
    ],
    "definition": "Dario Amodei's 2026 essay proposing a three-step plan for pacing AI development."
  }
];
