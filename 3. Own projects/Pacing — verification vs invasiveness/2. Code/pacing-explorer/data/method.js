// Pacing explorer: the scoring method.
// Shown in "How to read this" and in each card's "How we scored it".
// The "builder" block holds the numbers used by the package builder (js/builder.js).
// Plain JavaScript object: edit the text freely, keep the ids unchanged.

window.PACING_METHOD = {

  yardstick: "Every tool is scored on one question: how well does it support a coordinated cap on frontier training compute? This is Case A in Pacing the Frontier (Douglas et al. 2026). Using one yardstick makes the scores comparable.",

  judgementNote: "All scores are the authors' judgements, not measurements. Each score comes with a one-sentence justification and a confidence level. They will be revised.",

  incentiveNote: "Incentive compatibility is deliberately not scored. A single number would hide who resists and why. It is shown instead as one of three stances for each of four actors.",

  confidenceNote: "In this draft, every confidence level is a placeholder set to medium. The authors have still to confirm them.",

  mapNote: "On the trade-off map, \"assurance\" is the verifiability score and \"invasiveness for AI labs\" is the invasiveness score.",

  // Order here is the order used on the cards and in the builder's arithmetic.
  // kind "benefit": 5 is best. kind "cost": 5 is heaviest (always shown as light to heavy).
  criteria: [
    {
      id: "effectiveness",
      label: "Effectiveness",
      plainLabel: "Slows AI development",
      priorityLabel: "Actually slows AI development",
      phrase: "slowing AI development",
      kind: "benefit",
      question: "Does it actually slow capability development, or only constrain an imperfect proxy?",
      anchors: {
        1: "Produces information only.",
        3: "Constrains a proxy, or only part of the relevant compute.",
        5: "Directly blocks capability-relevant activity on nearly all relevant compute."
      }
    },
    {
      id: "coverage",
      label: "Coverage and targeting",
      plainLabel: "Reaches the right actors",
      priorityLabel: "Reaches the right actors",
      phrase: "reaching the right actors",
      kind: "benefit",
      question: "Does it cover the relevant actors and activities, without hitting beneficial work?",
      anchors: {
        1: "Reaches few relevant actors, or hits mainly beneficial work.",
        3: "Reaches declared or large actors, with some spillover.",
        5: "Reaches nearly all relevant actors, with little spillover."
      }
    },
    {
      id: "verifiability",
      label: "Verifiability",
      plainLabel: "Catches cheating",
      priorityLabel: "Catches cheating",
      phrase: "catching cheating",
      kind: "benefit",
      question: "Can violations be detected, and can restrictions be credibly enforced?",
      anchors: {
        1: "Violations are mostly undetectable.",
        3: "Detectable for declared or large activity, blind to undeclared activity.",
        5: "Detected quickly and with confidence. Enforcement is credible or automatic."
      }
    },
    {
      id: "robustness",
      label: "Robustness",
      plainLabel: "Holds up over time",
      priorityLabel: "Holds up over time",
      phrase: "holding up over time",
      kind: "benefit",
      question: "Can it survive imperfect implementation, adapt to change, and be lifted when appropriate?",
      anchors: {
        1: "Breaks when circumstances shift, and is hard to lift.",
        3: "Degrades gracefully but needs active revision.",
        5: "Adapts by design, and lifts without an overhang."
      }
    },
    {
      id: "burden",
      label: "Regulatory burden",
      plainLabel: "Burden on government",
      priorityLabel: "Light on government",
      phrase: "staying light on government",
      costPhrase: "burden on government",
      kind: "cost",
      question: "How much active regulation does it need?",
      anchors: {
        1: "Light reporting on records firms already keep.",
        3: "A new body plus periodic audits.",
        5: "A standing international inspectorate, or new hardware standards."
      }
    },
    {
      id: "invasiveness",
      label: "Invasiveness for AI labs",
      plainLabel: "Invasiveness for AI labs",
      priorityLabel: "Light on AI labs",
      phrase: "staying light on AI labs",
      costPhrase: "invasiveness for AI labs",
      kind: "cost",
      question: "How much effort, exposure of proprietary information and loss of control does it impose on AI labs?",
      anchors: {
        1: "Negligible effort, reveals nothing proprietary, no loss of control.",
        3: "Noticeable effort, or reveals strategically sensitive information.",
        5: "Major disruption, deep access to proprietary information, or others can stop labs' chips."
      }
    }
  ],

  // Words shown next to the 5-dot meters, by score 1 to 5.
  words: {
    benefit: ["Low", "Low", "Medium", "High", "High"],
    cost: ["Light", "Light", "Moderate", "Heavy", "Heavy"]
  },

  readiness: [
    { id: "now", label: "Available now", column: "Now" },
    { id: "1-3y", label: "In development: 1–3 years", column: "In 1–3 years" },
    { id: "3y+", label: "In development: 3+ years", column: "In 3+ years" }
  ],

  stances: {
    cooperate: { label: "Cooperate", meaning: "Has reasons to go along with it." },
    circumvent: { label: "Circumvent", meaning: "Is likely to look for ways around it." },
    undermine: { label: "Undermine", meaning: "Is likely to resist or weaken it." }
  },

  actors: {
    labs: "AI labs",
    chipCloudFirms: "Chip and cloud firms",
    leadingState: "A leading state",
    trailingState: "A trailing state"
  },

  confidence: {
    low: "Low confidence",
    medium: "Medium confidence",
    high: "High confidence"
  },

  // Numbers used by the package builder. Changing them changes its results;
  // open tests.html afterwards (some checks assume these defaults).
  builder: {
    baseWeight: 1,        // weight of every criterion
    pickedWeight: 3,      // weight of a criterion the user picked
    maxPicks: 3,          // how many priorities the user may pick
    priorityOrder: ["effectiveness", "verifiability", "coverage", "invasiveness", "burden", "robustness"],  // order of the tick boxes
    threshold: 3.0,       // minimum fit (1 to 5) for a tool to be included
    invasivenessLimits: { any: 5, medium: 3, low: 2 }  // highest invasiveness score allowed
  }
};
