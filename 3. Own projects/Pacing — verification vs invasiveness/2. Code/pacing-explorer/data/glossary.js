// Pacing explorer: glossary.
// Each entry: term (shown in the glossary), match (the exact words in the text
// that should link to it, upper or lower case), definition (one or two plain sentences).
// A term is linked the first time it appears on each view.
// To add a term, add one entry. No code changes.

window.PACING_GLOSSARY = [
  {
    term: "Pacing",
    match: ["pacing agreements", "pacing agreement", "coordinated pacing", "pacing"],
    definition: "Deliberately managing the speed of frontier AI development, for example through caps or pauses that states agree between them."
  },
  {
    term: "Compute",
    match: ["compute"],
    definition: "Computing power: the chips and processing capacity used to train and run AI models. It is the AI input that is easiest to count and verify."
  },
  {
    term: "Compute cap",
    match: ["compute caps", "compute cap", "compute limits"],
    definition: "A limit on the computing power that may be used to train frontier AI models."
  },
  {
    term: "FLOP",
    match: ["FLOP"],
    definition: "Floating-point operation: one basic arithmetic step by a computer. The total number of FLOP measures how much computation went into training a model."
  },
  {
    term: "H100-equivalent",
    match: ["H100-equivalents", "H100-equivalent", "H100e"],
    definition: "A unit for counting AI chips of different types. One H100-equivalent is the computing power of one Nvidia H100, a widely used AI chip."
  },
  {
    term: "Frontier",
    match: ["frontier-capable", "frontier models", "frontier model", "frontier"],
    definition: "The most capable AI models at a given time, and the large-scale computing needed to build them."
  },
  {
    term: "Training",
    match: ["training runs", "training run", "training"],
    definition: "Building an AI model by running very large computations over data. Training frontier models needs very large numbers of chips. A training run is one such computation."
  },
  {
    term: "Inference",
    match: ["inference-only", "inference"],
    definition: "Running an AI model that has already been trained, to answer requests. Inference-only chips or data centres can run models but cannot train new ones."
  },
  {
    term: "AI chip",
    match: ["AI chips", "AI chip"],
    definition: "A specialised processor built for AI computations. Advanced AI chips are made by a handful of firms."
  },
  {
    term: "Fab",
    match: ["fabs", "fab"],
    definition: "A factory that manufactures chips. Short for fabrication plant."
  },
  {
    term: "Lithography machine",
    match: ["lithography machines", "lithography machine"],
    definition: "A machine that prints circuit patterns onto chips. Very few firms make the most advanced ones."
  },
  {
    term: "Cluster",
    match: ["clusters", "cluster"],
    definition: "A group of AI chips connected so that they can work together on one task."
  },
  {
    term: "Data centre",
    match: ["data-centre", "data centres", "data centre"],
    definition: "A building that houses large numbers of computer chips, with the power and cooling they need."
  },
  {
    term: "Cloud provider",
    match: ["cloud providers", "cloud provider", "cloud firms"],
    definition: "A company that rents out computing capacity in its data centres."
  },
  {
    term: "Colocation site",
    match: ["colocation sites", "colocation"],
    definition: "A data centre where several firms rent space for their own equipment."
  },
  {
    term: "Attestation",
    match: ["attestation", "attested"],
    definition: "A check in which a chip proves, cryptographically, what it is: its hardware and the software built into it."
  },
  {
    term: "Model weights",
    match: ["model weights", "weights"],
    definition: "The numbers that make up a trained AI model. Whoever holds the weights can run the model."
  },
  {
    term: "Proxy",
    match: ["proxy"],
    definition: "Something measured in place of the thing you really care about. Here, compute stands in for AI capability."
  },
  {
    term: "Efficiency gains",
    match: ["efficiency gains"],
    definition: "Improvements in AI methods that get more capability out of the same amount of compute. They weaken any rule based on counting compute."
  },
  {
    term: "Export controls",
    match: ["export controls", "export-control"],
    definition: "Government rules that restrict which goods, such as advanced chips, can be sold to which countries."
  },
  {
    term: "Dark compute",
    match: ["dark compute"],
    definition: "Chips that are not on the register and are presumed hidden."
  },
  {
    term: "Census",
    match: ["census"],
    definition: "A one-off count of all the AI chips that already exist."
  },
  {
    term: "Chain of custody",
    match: ["chain of custody"],
    definition: "A continuous record of who has held a chip, from manufacture onwards."
  },
  {
    term: "Challenge inspection",
    match: ["challenge inspections", "challenge inspection"],
    definition: "An inspection of a suspected site at short notice, requested by another party to the agreement."
  },
  {
    term: "Managed access",
    match: ["managed access", "information barriers"],
    definition: "Inspection arrangements designed so that only the facts needed to judge compliance leave the site."
  },
  {
    term: "Confidential computing",
    match: ["confidential computing"],
    definition: "Existing chip features that keep data and programs shielded while in use, even from the machine's operator."
  },
  {
    term: "Guarantee processor",
    match: ["guarantee processor"],
    definition: "The small, separate processor in a FlexHEG. It watches the data going to and from the AI chip and applies the rules."
  },
  {
    term: "Receipt",
    match: ["receipts"],
    definition: "A cryptographically signed record produced by a chip. It proves a narrow claim about what the chip computed."
  },
  {
    term: "Compute accounting",
    match: ["compute accounting", "compute-accounting"],
    definition: "Adding up signed records from all the chips in a data centre to show how much computation was done, and that no larger run took place."
  },
  {
    term: "Firmware",
    match: ["firmware-level", "firmware"],
    definition: "Low-level software built into a hardware device."
  },
  {
    term: "Open source",
    match: ["open-source", "open source"],
    definition: "A design or program whose full details are published, so that anyone can inspect it."
  },
  {
    term: "Red-teaming",
    match: ["red-teaming", "red-team"],
    definition: "Testing a system by having experts try to defeat it."
  },
  {
    term: "Tamper-evidence",
    match: ["tamper-evidence", "tamper checks"],
    definition: "Features, such as seals, that show whether a device has been opened or interfered with."
  },
  {
    term: "Overhang",
    match: ["overhang"],
    definition: "A build-up of unused capacity that could be released suddenly when a restriction is lifted."
  },
  {
    term: "Leading and trailing states",
    match: ["leading state", "trailing state"],
    definition: "A leading state is ahead in frontier AI. A trailing state is behind and trying to catch up."
  },
  {
    term: "MIRI agreement",
    match: ["MIRI agreement"],
    definition: "A proposed treaty led by the US and China. Training above 10²⁴ FLOP is banned, and training above 10²² FLOP is monitored."
  },
  {
    term: "AI 2040: Plan A",
    match: ["AI 2040: Plan A"],
    definition: "A scenario for a slowdown agreed between the US and China, with a pause on training."
  },
  {
    term: "Building the Pause Button",
    match: ["Building the Pause Button"],
    definition: "A proposal for the infrastructure needed for an enforceable global pause on compute."
  },
  {
    term: "Hardwired Pause",
    match: ["Hardwired Pause"],
    definition: "A proposal for a pause of at least ten years. Chips that can train models stop being made and are replaced by inference-only chips."
  }
];
