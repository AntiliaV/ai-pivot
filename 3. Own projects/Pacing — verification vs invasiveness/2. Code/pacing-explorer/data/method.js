// Pacing explorer: the scoring method and the display settings.
//
// "howWeScore" and "sectionTitles" come from "Website text.md" (checked by
// tools/validate_data.py). The rest sets how scores are shown:
//   criteria    the six criteria, in display order; "label" is the name shown on the site,
//               "technical" the name used in the background mappings.
//               kind "benefit": 5 is best. kind "cost": 5 is heaviest.
//   words       the word shown next to a meter, by score 1 to 5.
//   colours     blue dots (benefit), brown squares (cost), hollow marks (empty).
//   builder     the numbers used by the package builder (js/builder.js). Changing them
//               changes its results; run tests.html (or node js/builder.tests.js) afterwards.
// Must stay valid JSON after "window.PACING_METHOD =".

window.PACING_METHOD = {
  "sectionTitles": {
    "proposals": "Pacing proposals",
    "ranking": "How central each tool is to the proposals",
    "tools": "Verification interventions",
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
    "introduction": "Introduction",
    "overview": "Overview",
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
    "xAxis": "Invasiveness for AI labs",
    "yAxis": "Detects violations"
  },
  "howWeScore": {
    "intro": "We score each tool on six criteria, shown on five-point meters (dots for what a tool achieves, squares for what it costs). A verification tool does not itself slow AI development; what matters is whether the rule it lets us check would slow it if fully respected. \"Relevance to pacing\" therefore asks how many routes to more capable AI the verified rule would close. We distinguish four routes: more computing power for training, better algorithms, more training after the main run, and better ways of drawing out what a model can already do.",
    "table": {
      "header": [
        "Shown as",
        "What 1 means",
        "What 5 means"
      ],
      "rows": [
        [
          "Relevance to pacing",
          "What it verifies has little bearing on how fast AI develops",
          "Verifies rules that close most routes, with little room to get around them"
        ],
        [
          "Reaches the right actors",
          "Reaches few relevant actors, or mainly hits beneficial work",
          "Reaches nearly all relevant actors, with little spillover"
        ],
        [
          "Detects violations",
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
    "expected": "**Expected behaviours.** For four actors (AI labs, chip and cloud firms, a leading state, a trailing state), we state whether we expect them to *cooperate*, *circumvent* (comply on paper while evading in practice) or *undermine* (work to weaken the rule).",
    "closing": "All scores reflect our judgement, based on the sources listed on each tool's page."
  },
  "criteria": [
    {
      "id": "effectiveness",
      "label": "Relevance to pacing",
      "kind": "benefit",
      "technical": "Effectiveness",
      "priorityLabel": "Relevance to pacing",
      "phrase": "relevance to pacing"
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
      "label": "Detects violations",
      "kind": "benefit",
      "technical": "Verifiability and enforceability",
      "priorityLabel": "Detects violations",
      "phrase": "detecting violations"
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
    "empty": "#6b7280"
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
