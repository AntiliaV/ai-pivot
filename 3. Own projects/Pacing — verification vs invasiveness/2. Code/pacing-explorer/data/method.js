// Pacing explorer: the scoring method and the display settings.
//
// "howWeScore" and "sectionTitles" come from "Website text.md" (checked by
// tools/validate_data.py). The rest sets how scores are shown:
//   criteria    the six criteria, in display order; "label" is the name shown on the site,
//               "technical" the name used in the background mappings.
//               kind "benefit": 5 is best. kind "cost": 5 is heaviest.
//   words       the word shown next to a meter, by score 1 to 5.
//   colours     blue dots (benefit), brown squares (cost), hollow marks (empty),
//               green and red readiness dots.
//   builder     the numbers used by the package builder (js/builder.js). Changing them
//               changes its results; run tests.html (or node js/builder.tests.js) afterwards.
// Must stay valid JSON after "window.PACING_METHOD =".

window.PACING_METHOD = {
  "sectionTitles": {
    "proposals": "The five pacing proposals",
    "ranking": "Ranking: how central each tool is to the proposals",
    "tools": "The five tools",
    "map": "Trade-off map",
    "builder": "Build a verification package",
    "appendix": "Appendix",
    "howWeScore": "How we score",
    "glossary": "Glossary"
  },
  "labels": {
    "learnMore": "Learn more →",
    "allTools": "← All tools",
    "previous": "Previous",
    "next": "Next",
    "whereItActs": "Where it acts",
    "introduction": "Introduction",
    "overview": "Overview",
    "readiness": "Readiness",
    "achieves": "What it achieves",
    "costs": "What it costs",
    "behaviours": "Expected behaviours",
    "actor": "Actor",
    "stance": "Expected stance",
    "why": "Why",
    "contribution": "Under ideal conditions, how does this contribute to pacing?",
    "failures": "Failure scenarios",
    "burden": "Regulatory burden",
    "sources": "Sources",
    "ourInference": "our inference",
    "xAxis": "Invasiveness for AI labs",
    "yAxis": "Catches cheating"
  },
  "howWeScore": {
    "intro": "Each tool is scored by the authors on six criteria, shown as five dots. Effectiveness (\"Slows AI development\") asks how many routes to more capable AI the tool would close if it worked as intended. We distinguish four routes: more computing power for training, better algorithms, more training after the main run, and better ways of drawing out what a model can already do. Tools that only provide information therefore score low, even when other tools depend on them.",
    "table": {
      "header": [
        "Shown as",
        "What 1 means",
        "What 5 means"
      ],
      "rows": [
        [
          "Slows AI development",
          "Closes no route on its own",
          "Closes most routes, with little room to get around them"
        ],
        [
          "Reaches the right actors",
          "Reaches few relevant actors, or mainly hits beneficial work",
          "Reaches nearly all relevant actors, with little spillover"
        ],
        [
          "Catches cheating",
          "Violations mostly go undetected",
          "Violations are detected quickly; enforcement is credible or automatic"
        ],
        [
          "Holds up over time",
          "Breaks when circumstances change; hard to lift",
          "Adapts by design; can be lifted without leaving spare capacity ready to use"
        ],
        [
          "Burden on government",
          "Light reporting on records firms already keep",
          "A standing international inspectorate, or new hardware standards"
        ],
        [
          "Invasiveness for AI labs",
          "Negligible effort; reveals nothing proprietary",
          "Major disruption, deep access to secrets, or others can stop labs' chips"
        ]
      ]
    },
    "readiness": "**Readiness.** Green: available now. Red: not yet available, with the expected wait.",
    "expected": "**Expected behaviours.** For four actors (AI labs, chip and cloud firms, a leading state, a trailing state), we state whether we expect them to *cooperate*, *circumvent* (comply on paper while evading in practice) or *undermine* (work to weaken the rule).",
    "acts": "**Where it acts.** Each tool is tagged with the stage of AI development it acts on: inputs and infrastructure (chips, data centres), capability development (training and testing models), or use and distribution (releasing and running models). Tools acting at earlier stages are easier to observe but blunter, whereas tools acting at later stages are more targeted but easier to get around.",
    "closing": "All scores reflect the authors' judgement, based on the sources listed on each tool's page."
  },
  "criteria": [
    {
      "id": "effectiveness",
      "label": "Slows AI development",
      "kind": "benefit",
      "technical": "Effectiveness",
      "priorityLabel": "Actually slows AI development",
      "phrase": "slowing AI development"
    },
    {
      "id": "coverage",
      "label": "Reaches the right actors",
      "kind": "benefit",
      "technical": "Coverage and targeting",
      "priorityLabel": "Reaches the right actors",
      "phrase": "reaching the right actors"
    },
    {
      "id": "verifiability",
      "label": "Catches cheating",
      "kind": "benefit",
      "technical": "Verifiability and enforceability",
      "priorityLabel": "Catches cheating",
      "phrase": "catching cheating"
    },
    {
      "id": "robustness",
      "label": "Holds up over time",
      "kind": "benefit",
      "technical": "Robustness and flexibility",
      "priorityLabel": "Holds up over time",
      "phrase": "holding up over time"
    },
    {
      "id": "burden",
      "label": "Burden on government",
      "kind": "cost",
      "technical": "Regulatory burden",
      "priorityLabel": "Light on government",
      "phrase": "staying light on government",
      "costPhrase": "burden on government"
    },
    {
      "id": "invasiveness",
      "label": "Invasiveness for AI labs",
      "kind": "cost",
      "technical": "Invasiveness for labs",
      "priorityLabel": "Light on AI labs",
      "phrase": "staying light on AI labs",
      "costPhrase": "invasiveness for AI labs"
    }
  ],
  "words": {
    "benefit": [
      "Low",
      "Low",
      "Medium",
      "High",
      "High"
    ],
    "cost": [
      "Light",
      "Light",
      "Moderate",
      "Heavy",
      "Heavy"
    ]
  },
  "readiness": [
    {
      "id": "now",
      "label": "Available now",
      "column": "Now"
    },
    {
      "id": "1-3y",
      "label": "In 1–3 years",
      "column": "In 1–3 years"
    },
    {
      "id": "3y+",
      "label": "In 3+ years",
      "column": "In 3+ years"
    }
  ],
  "stances": {
    "cooperate": "Cooperate",
    "circumvent": "Circumvent",
    "undermine": "Undermine"
  },
  "actors": {
    "labs": "AI labs",
    "chipCloudFirms": "Chip and cloud firms",
    "leadingState": "A leading state",
    "trailingState": "A trailing state"
  },
  "colours": {
    "benefit": "#1f5fbf",
    "cost": "#8a5a2b",
    "empty": "#6b7280",
    "ready": "#1a7f37",
    "notReady": "#c62828"
  },
  "builder": {
    "baseWeight": 1,
    "pickedWeight": 3,
    "maxPicks": 3,
    "priorityOrder": [
      "effectiveness",
      "verifiability",
      "coverage",
      "invasiveness",
      "burden",
      "robustness"
    ],
    "threshold": 3.0,
    "invasivenessLimits": {
      "any": 5,
      "medium": 3,
      "low": 2
    }
  }
};
