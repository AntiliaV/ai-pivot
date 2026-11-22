// Pacing explorer: the data behind every page.
//
// Wording is copied exactly from "Website text.md"; scores, stances, readiness,
// justifications, the "Where it acts" tag and the sources are copied from each
// tool's background mapping (all in the project's "4. Drafting" folder).
// Do not edit by hand without also changing the source: run
//     python3 tools/validate_data.py
// afterwards. It fails if anything here differs from its source.
//
// Text may use **bold** and *italic* markers, as in the source. "(our inference)"
// is shown as a small label. This file must stay valid JSON after "window.PACING_DATA =".

window.PACING_DATA = {
  "siteTitle": "Verifying agreements to pace AI: five tools compared",
  "introduction": [
    "Some researchers, governments and AI companies now argue that frontier AI is advancing faster than our ability to understand and control it. Pacing refers to deliberately slowing parts of AI development, so that safety research, institutions and public debate have time to keep up.",
    "Since an agreement to pace AI – whether between companies or between states – only works if each side can check that the others are keeping to it, verification is central to any such agreement. However, the more a verification tool can confirm, the more it usually has to see or control, which makes it harder to accept for those being verified.",
    "On this site, we compare five verification tools. For each, we assess how much it would slow AI development, how reliably it catches cheating, and what it costs governments and AI companies. The site is written for policymakers and assumes no background in AI safety; all scores reflect the authors' judgement."
  ],
  "proposals": {
    "intro": "We use five published proposals as reference points. Each describes how AI development could be paced and which verification tools it would rely on.",
    "items": [
      "**MIRI agreement** (Scher, Abecassis, Barnett & Abeyta, 2025). Proposed by the Machine Intelligence Research Institute, this is an international treaty to stop the development of superintelligent AI until it can be done safely. Parties register every cluster of AI chips above 16 H100-equivalents and gather them in declared, monitored facilities. Training runs above 10²⁴ FLOP are banned, while runs between 10²² and 10²⁴ FLOP require prior approval, with inspectors present. A treaty body monitors how chips are used, approves every chip transfer and limits which training techniques may be used; it can also restrict how fast chips communicate, so that they can run existing models but not train new ones.",
      "**AI 2040: Plan A** (AI Futures Project, 2026). A US–China deal to pause frontier AI training, accompanied by a detailed verification plan. Chip tracking starts immediately, so that by a joint declaration in 2029 each side is confident the other hides less than approximately 1% of the world's AI computing power. Data centres above 10,000 H100-equivalents (about 99% of that computing power) are then converted to run existing models only, which is checked by network taps that copy traffic and by recomputing samples of the work, while smaller sites report and face spot checks. Additionally, third-party assessors chosen by both governments evaluate every company, and new models require verified evaluations before release.",
      "**Building the Pause Button** (Al Ramiah et al., 2025). Rather than pausing AI development directly, this proposal sets up a global regime that puts in place, in advance, the means to pause if needed. The pause is triggered by a computing-power threshold rather than by tests of models, since such tests can miss failures nobody anticipated. The regime rests on three pillars: hardware controls on chips (starting with limits on how chips connect, and later controls built into the chips themselves); tracking of chips from the machines that make them to their final users, including identity checks on cloud customers; and legal rules. Violators are cut off from firmware updates, design software, cloud access and chipmaking tools.",
      "**Hardwired Pause** (Working Group on AI Pause Feasibility, 2026). This proposal aims to make a pause enforceable by the hardware itself. Every chip able to train frontier models is either counted in a global census or registered when made at a licensed factory, and only leaves the count through verified destruction; unaccounted chips are presumed hidden and charged to the country that hosts them. During the pause, licensed operators – kept separate from AI companies – run approved models only, eventually on chips that cannot train. Importantly, the pause can only last as long as the census remains complete enough, since hidden chips become more useful as algorithms improve. Buybacks and an amnesty for past export-control evasion encourage registration.",
      "**We Must Pace the Frontier** (Dario Amodei, 2026). In this essay, the chief executive of the AI company Anthropic argues that AI systems helping to build the next generation of AI are now speeding up progress, and that pacing is needed for safety work to keep up. The essay sets out three steps. First, each frontier company gives independent evaluators employee-like access to check its safety practices, a step Anthropic commits to unilaterally. Second, companies in democratic countries agree common limits backed by regulation, preferably based on what models can do. Third, the US seeks global agreements with China, ranging from bans on narrow dangerous uses to a full pause, which the essay considers unlikely in the near term. In the meantime, chip export controls protect the US lead."
    ]
  },
  "ranking": {
    "intro": "The table below shows how much each proposal relies on each tool; it therefore measures reliance rather than quality. The classification is our own, adapted from the Pacing Verification Atlas, and tools are ranked by a weighted count (Core = 1, Partial = 0.5, Option = 0.2), with ties going to the tool with more Core entries.",
    "header": [
      "Rank",
      "Tool",
      "MIRI agreement",
      "AI 2040: Plan A",
      "Hardwired Pause",
      "Amodei",
      "Building the Pause Button"
    ],
    "rows": [
      [
        "1",
        "Chip production ledger",
        "Core",
        "Core",
        "Core",
        "—",
        "Core"
      ],
      [
        "2",
        "Physical chip inspection",
        "Core",
        "Core",
        "Core",
        "—",
        "Option"
      ],
      [
        "3",
        "Interconnect bandwidth cap",
        "Option",
        "Core",
        "Partial",
        "—",
        "Core"
      ],
      [
        "4",
        "Independent capability evaluation",
        "Partial",
        "Partial",
        "Core",
        "Option",
        "Partial"
      ],
      [
        "5",
        "Cloud workload metering",
        "Partial",
        "Partial",
        "Partial",
        "—",
        "Option"
      ]
    ],
    "legend": "**Core:** central or required. **Partial:** a broader or closely related check is discussed. **Option:** described as a possibility, without commitment. **—:** not discussed."
  },
  "caption": "Each dot represents one tool. Tools further right are more invasive for AI labs, while tools higher up are better at catching cheating; the most attractive tools therefore sit in the top left, combining high assurance with little intrusion.",
  "builderIntro": "Choose what matters most to you, and the tool suggests a combination of verification tools, explaining the reasoning behind it.",
  "interventions": [
    {
      "id": "ledger",
      "name": "Chip production ledger",
      "description": "A register of every advanced AI chip, recording who made it, who holds it and where it is. It makes the world's AI computing power countable, so that limits on it can be checked.",
      "acts": "inputs and infrastructure",
      "readiness": "now",
      "scores": {
        "effectiveness": {
          "score": 2,
          "justification": "closes no route by itself; it lets a cap on the compute route be checked for undeclared stock and lets chips be withheld from non-compliant actors. Algorithms, post-training and elicitation stay open."
        },
        "coverage": {
          "score": 4,
          "justification": "new production and large holdings well covered; legacy stock, small clusters and non-parties are the gaps."
        },
        "verifiability": {
          "score": 3,
          "justification": "concentrated supply chain and rich paper trails; weak against state concealment and small clusters."
        },
        "burden": {
          "score": 3,
          "justification": "reporting, audits and customs checks; serial-level lifecycle tracking of millions of chips a year must be automated [Pause Button]. Consolidation and inspections raise it further."
        },
        "robustness": {
          "score": 4,
          "justification": "degrades gracefully if gaps are measured; reusable across regimes; thresholds need continual revision."
        },
        "invasiveness": {
          "score": 2,
          "justification": "low effort (records they already keep), but reveals compute stock and sites."
        }
      },
      "stances": {
        "labs": [
          "cooperate"
        ],
        "chipCloudFirms": [
          "cooperate"
        ],
        "leadingState": [
          "cooperate"
        ],
        "trailingState": [
          "circumvent"
        ]
      },
      "why": {
        "labs": "The ledger shows chip counts and sites, not models, data or workloads.",
        "chipCloudFirms": "If market access depends on it. They already keep these records.",
        "leadingState": "It can use the ledger to enforce its lead.",
        "trailingState": "Holds unrecorded and diverted stock. May see the ledger as locking in a rival's lead."
      },
      "introduction": "A chip ledger is a register of advanced AI chips, recording who made each chip, who holds it, where it is located, and every change of hands until the chip is verifiably destroyed. It does not, however, show what the chips are used for. Its purpose is to make the world's stock of AI computing power countable, so that rules on it – caps on training, pauses, rules on where chips may be located, export controls – can be checked. While the technology is ordinary inventory-keeping and already exists, the obstacle is political: chipmakers, cloud firms and states must share commercially and strategically sensitive records.",
      "contribution": [
        {
          "text": "On its own, a ledger does not slow AI development, since it records chips but limits no training. Its value lies in the fact that every rule based on computing power relies on it: with a complete ledger, verifiers can rule out hidden clusters large enough to train a frontier model, and chips can be withheld from anyone who breaks the rules."
        },
        {
          "text": "The proposals use the ledger in different ways. The MIRI agreement registers every cluster above 16 H100-equivalents (roughly $500,000 of chips) and gathers them in monitored sites, while AI 2040 uses it to make each side confident that the other hides less than about 1% of its AI computing power before a pause begins. The Hardwired Pause goes further, making the completeness of its chip census the limit on how long a pause can last."
        },
        {
          "text": "Importantly, the ledger only acts on one route to more capable AI – computing power – and this route weakens over time, as better algorithms get more out of the same chips."
        },
        {
          "text": "Coverage is good where it matters most. New AI chips come from a handful of firms (TSMC makes about 90% of advanced AI chips, and ASML is the only maker of the most advanced chipmaking machines), and ownership is similarly concentrated, with seven US firms holding about 78% of the world's AI computing power at the end of 2025. Since AI chips are easy to distinguish from other chips, other industries are hardly affected. However, the ledger misses who rents chips through the cloud, as well as gains from better algorithms or training methods."
        }
      ],
      "failures": {
        "intro": "The ledger can fail in several ways:",
        "items": [
          {
            "lead": "Chips kept off the register.",
            "text": "Existing stock is the weakest point, especially chips smuggled around export controls; Epoch AI estimates that about 660,000 H100-equivalents reached China this way in 2024–25. According to the Hardwired Pause's estimates, a thorough census would still miss about 12,000 H100-equivalents in the US and 11,000 in China, rising to about 300,000 and a million respectively if states actively hide chips."
          },
          {
            "lead": "Diversion.",
            "text": "Chips pass through shell companies or mislabelled shipments, or are declared broken or destroyed and then kept or resold."
          },
          {
            "lead": "Hiding below the threshold.",
            "text": "Holdings are split into clusters too small to register, or moved between sites before they are counted."
          },
          {
            "lead": "Ambiguous gaps.",
            "text": "A shortfall shows that chips are missing but not where they are, and may reflect a bookkeeping error rather than cheating; how parties respond to such gaps can decide whether an agreement survives."
          },
          {
            "lead": "Unilateral use.",
            "text": "When one country uses the ledger to enforce export controls, it pushes rivals to build their own chip supply chain, which then sits outside any future ledger."
          },
          {
            "lead": "A covert supply chain.",
            "text": "In the long run, a state could build undeclared chip factories; one older-generation lithography machine can make chips worth roughly 24,000–38,000 H100-equivalents a month (Hardwired Pause estimate)."
          }
        ],
        "closing": [
          "Provided gaps are measured and published, the ledger holds up well over time. Since over 95% of the world's AI chips, by computing power, are less than three years old, tracking new production now would soon cover most of the stock (our inference), whereas each year of delay adds untracked chips. Registration thresholds must, however, keep falling as chips become more efficient."
        ]
      },
      "burden": "A registry body – national at first, then international under an agreement – collects records from chipmakers, distributors and data-centre operators, checks them against customs, tax and sales data, and investigates gaps. It builds on export-control licensing and on records firms already keep (for example for tax deductions and warranties), although tracking millions of chips a year by serial number must be automated. The burden rises considerably if chips must also be gathered in declared sites and inspected, as the MIRI agreement requires.",
      "dependsOn": [],
      "dependsOnWhy": {},
      "sources": [
        "**Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.",
        "**Atlas 04 / Atlas briefs:** Pacing Verification Atlas, mechanism page \"Chip production and transfer ledger\" and the four proposal briefs.",
        "**MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.",
        "**Amodei:** Amodei (September 2026), *We Must Pace the Frontier*.",
        "**AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*.",
        "**Verification Plan:** Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*, ai-2040.com/supplements/verification-plan (read up to its 2033 section).",
        "**Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.",
        "**Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.",
        "**Sastry:** Sastry et al. (2024), *Computing Power and the Governance of Artificial Intelligence*, arXiv:2402.08797.",
        "**CNAS:** Aarne, Fist & Withers (2024), *Secure, Governable Chips*, CNAS."
      ]
    },
    {
      "id": "inspections",
      "name": "Physical chip inspection",
      "description": "Inspectors visit facilities to check that the chips there match what was declared. Inspection keeps the ledger honest and can confirm that chips are switched off or sealed.",
      "acts": "inputs and infrastructure",
      "readiness": "now",
      "scores": {
        "effectiveness": {
          "score": 2,
          "justification": "verifies hardware, not use; it partly closes the compute route, since only switched-off or sealed chips are directly prevented from training."
        },
        "coverage": {
          "score": 2,
          "justification": "declared sites only; reach grows with the ledger and intelligence."
        },
        "verifiability": {
          "score": 3,
          "justification": "strong snapshot of declared sites; weak between visits and blind to undeclared sites unless continuous monitoring and intelligence are added."
        },
        "burden": {
          "score": 4,
          "justification": "a trained, vetted inspectorate, access rights, warrants and dispute procedures; proper checks take chips offline to attest them [CSET]. Continuous monitoring and challenge inspections push it to the maximum."
        },
        "robustness": {
          "score": 3,
          "justification": "easy to adjust and lift; fragile to withdrawal of access in a crisis."
        },
        "invasiveness": {
          "score": 4,
          "justification": "high: downtime while chips are attested, and inspectors see layouts, security and network topology."
        }
      },
      "stances": {
        "labs": [
          "cooperate"
        ],
        "chipCloudFirms": [
          "cooperate"
        ],
        "leadingState": [
          "undermine"
        ],
        "trailingState": [
          "circumvent"
        ]
      },
      "why": {
        "labs": "At home, if inspectors only count chips.",
        "chipCloudFirms": "Passing inspection is what lets their chips keep earning.",
        "leadingState": "Refuses foreign inspectors at strategic or military sites.",
        "trailingState": "Keeps chips at sites it never declares."
      },
      "introduction": "Physical inspection sends trusted inspectors into a facility to compare the hardware there with what was declared: they count chips, read or test chip identifiers, check seals, and compare samples with purchase and registry records. An inspection shows which chips were present, absent or altered at one moment, but says nothing about what the chips computed before or after the visit, nor about sites nobody declared. It is therefore the natural partner of the chip ledger, since the ledger says which chips should be where and inspection checks that they are. While the methods work today, the obstacle is negotiating access to private and state facilities.",
      "contribution": [
        {
          "text": "On its own, inspection does little to slow AI development, as it verifies hardware rather than what the hardware is used for; its main value lies in making the ledger credible. Three uses, however, go further:",
          "items": [
            "Chips required to be switched off or sealed in storage can be checked directly, and chips that are off cannot train.",
            "Inspections of chip factories can enforce a halt or cap on production. Fewer than 20 factories make the most advanced AI chips, and their output can be reconciled with production records.",
            "Inspectors can check physical limits on training, such as how chips are cabled together, or devices that let a data centre run models but not train them."
          ]
        },
        {
          "text": "Four of the five proposals use inspections, with the MIRI agreement, AI 2040 and the Hardwired Pause treating them as core – for example, to confirm that chips have been gathered in declared sites or converted to running models only."
        },
        {
          "text": "Coverage is narrow, since inspections only reach declared sites or sites identified by intelligence. Additionally, costs grow with the number of sites, at roughly $9–49 per chip inspected plus $2,600–6,000 per visit to a cluster (CSET estimate), so that in practice inspections focus on large facilities and chip factories, chosen according to risk. Importantly, inspections do not stop chips from being used, and monitored data centres can keep serving AI models."
        }
      ],
      "failures": {
        "intro": "Inspection can fail in several ways:",
        "items": [
          {
            "lead": "Undeclared sites.",
            "text": "Inspections only cover what was declared, so a state holding unrecorded chips can simply keep them elsewhere."
          },
          {
            "lead": "Gaps between visits.",
            "text": "Chips are moved out before an announced visit and back afterwards. Surprise visits, seals and cameras narrow the gap, but require more access."
          },
          {
            "lead": "Shallow checks.",
            "text": "In 2024–25, smugglers allegedly diverted $2.5 billion of servers to China by moving labels and serial numbers onto dummy servers left in the original boxes, and auditors who opened the boxes were fooled. A proper check removes each chip and tests its hardware, which is slow and disruptive."
          },
          {
            "lead": "Weak seals.",
            "text": "One study defeated all 289 tamper-evident seals it tested, including some used for nuclear materials, at low cost; better seals nonetheless look feasible with investment."
          },
          {
            "lead": "Refused access.",
            "text": "States refuse foreign inspectors at strategic or military sites, or delay access to run down the clock. Without a response agreed in advance, inspection rights fail precisely where suspicion is highest."
          },
          {
            "lead": "Espionage.",
            "text": "Inspectors see layouts, security arrangements and customers, so that each side fears what the other's inspectors learn."
          }
        ],
        "closing": [
          "Methods, frequency and scope are easy to adjust, and visits can stop at once when no longer needed. However, access can be withdrawn overnight in a crisis, and restarting inspections after a breakdown is harder than continuing them."
        ]
      },
      "burden": "Inspection requires an inspectorate of trained, security-vetted staff, with rights of access and agreed rules for warrants, disputes and inspections of suspected hidden sites. While periodic visits to declared sites represent a moderate effort, continuous monitoring (cameras, seals, sensors) and short-notice inspections of suspected sites would require a standing international body, comparable to nuclear safeguards (our inference). Automated location checks on chips could lighten this load, with inspectors sent only to investigate alerts.",
      "dependsOn": [
        "ledger"
      ],
      "dependsOnWhy": {
        "ledger": "Inspectors check the chips on site against the ledger's record of which chips should be there."
      },
      "sources": [
        "**Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.",
        "**Atlas 05 / Atlas briefs:** Pacing Verification Atlas, mechanism page \"Physical chip inventory inspection\" and the four proposal briefs.",
        "**S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI.",
        "**MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.",
        "**Amodei:** Amodei (September 2026), *We Must Pace the Frontier*.",
        "**AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*.",
        "**Verification Plan:** Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*, ai-2040.com/supplements/verification-plan (read up to its 2033 section).",
        "**Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.",
        "**Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.",
        "**Sastry:** Sastry et al. (2024), *Computing Power and the Governance of Artificial Intelligence*, arXiv:2402.08797.",
        "**CNAS:** Aarne, Fist & Withers (2024), *Secure, Governable Chips*, CNAS.",
        "**CSET:** Feldgoise, Miller & Dohmen (2026), *Tracking AI Chips: Assessing Location Verification as an Export Control Enforcement Tool*, CSET; cost figures from the companion article *Tracking AI Chips: What Does It Cost?* (cset.georgetown.edu)."
      ]
    },
    {
      "id": "evaluations",
      "name": "Independent capability evaluation",
      "description": "Independent experts test new AI models for dangerous capabilities before release or further training. It is the only tool here that measures capability itself.",
      "acts": "capability development, and use and distribution (release gate)",
      "readiness": "now",
      "scores": {
        "effectiveness": {
          "score": 4,
          "justification": "under ideal conditions, catches capability gains from every route (compute, algorithms, post-training, elicitation), but only at a gate on submitted models."
        },
        "coverage": {
          "score": 3,
          "justification": "precisely targeted at hazards; misses unsubmitted models, internal use, and risks without tests."
        },
        "verifiability": {
          "score": 2,
          "justification": "hard to prove that the tested model is the deployed one, or that elicitation was complete; says nothing about compute."
        },
        "burden": {
          "score": 3,
          "justification": "accredited evaluators, scarce experts, secure infrastructure, and mutual recognition between states."
        },
        "robustness": {
          "score": 3,
          "justification": "tests can be updated quickly, but they go stale, leak, and get harder as models learn to spot evaluations."
        },
        "invasiveness": {
          "score": 4,
          "justification": "model access, release delays, and an outside veto over specific models."
        }
      },
      "stances": {
        "labs": [
          "cooperate"
        ],
        "chipCloudFirms": [
          "cooperate"
        ],
        "leadingState": [
          "cooperate",
          "undermine"
        ],
        "trailingState": [
          "circumvent"
        ]
      },
      "why": {
        "labs": "Many already volunteer for testing, but contest thresholds and access.",
        "chipCloudFirms": "Little is at stake for them.",
        "leadingState": "Tests its own labs at home; resists foreign evaluators.",
        "trailingState": "Controls its own evaluators, whose results are hard to check."
      },
      "introduction": "In an independent capability evaluation, an assessor gets controlled access to a specific version of a model before a decision is made, such as releasing it or training it further. The assessor then tests whether the model crosses agreed capability thresholds – for example in cyberattacks, help with biological weapons, or carrying out AI research on its own – using tests that range from standard question sets to simulations of a full attack. The result is evidence about what the model did under test rather than a safety certificate: failing to find a capability does not prove it is absent. The practice already exists, as the UK and US AI safety institutes have jointly tested frontier models before release.",
      "contribution": [
        {
          "text": "Evaluations are the only tool here that measures capability itself rather than computing power. Under ideal conditions, they therefore catch gains from every route, whether these come from more computing power, better algorithms, more training after the main run, or better ways of drawing out what a model can do. Used as a gate (e.g. \"no release or further training above this threshold\"), they act directly on what pacing is ultimately concerned with."
        },
        {
          "text": "The proposals give evaluations different roles. In the MIRI agreement, the treaty body can pause a training run if monitoring reveals worrying capabilities, while AI 2040 requires verified evaluations before any model is released and the Hardwired Pause only lets models that pass evaluation be served. Building the Pause Button, on the other hand, rejects evaluations as the pause trigger, since tests miss failures nobody anticipated, and uses them instead to adjust its computing-power threshold. Amodei's essay favours them, requiring models with a given capability to have certified safety properties before going further."
        },
        {
          "text": "Evaluations are the best-targeted tool, as they restrict only models with dangerous capabilities. However, they only act at the gate, and only on models that labs submit, missing models that are never submitted, models used only inside labs, and risks for which nobody has written a test. Testing also requires scarce experts, while frontier models are released every few months."
        }
      ],
      "failures": {
        "intro": "Evaluation can fail in several ways:",
        "items": [
          {
            "lead": "Testing the wrong model.",
            "text": "The lab submits a weaker version or setup (fewer tools, less supporting software), or changes the model after approval. Proving that the tested model is the one in use is the hardest problem; proposed fixes include matching a digital fingerprint of the model's weights and running models on secure hardware."
          },
          {
            "lead": "Underperforming under test.",
            "text": "Capable models increasingly recognise when they are being tested and can underperform, and developers can also train models to do badly on known tests. The UK AI Security Institute has documented models cheating in evaluations."
          },
          {
            "lead": "Unreported versions.",
            "text": "Labs keep training, or use a model internally, without submitting it; catching this requires the tools that track computing power."
          },
          {
            "lead": "Weak evaluators.",
            "text": "Evaluators lack time, access or experts, or are captured by the labs they test. In turn, thresholds become targets that labs train their models to pass."
          },
          {
            "lead": "National evaluators.",
            "text": "States resist foreign evaluators examining their models, so that high-access testing stays national. A rival's evaluators may certify leniently, and their results are hard to check."
          }
        ],
        "closing": [
          "Tests can be updated quickly, and a gate can be lifted model by model. However, the science remains immature, test questions leak into training data, and confidence in the results weakens precisely as models become more capable."
        ]
      },
      "burden": "Governments need accredited evaluators (today, national AI safety institutes and some private auditors), with scarce experts and secure facilities for testing models without exposing them. They must also set thresholds and decision rules in advance – including what happens when results are inconclusive – and agree to recognise each other's results. Testing capacity must keep up with the pace of frontier releases, and regional institutes could serve states without their own.",
      "dependsOn": [],
      "dependsOnWhy": {},
      "sources": [
        "**Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.",
        "**Atlas 01 / Atlas briefs:** Pacing Verification Atlas, mechanism page \"Independent predeployment capability evaluation\" and the four proposal briefs.",
        "**CAST:** Scholefield, Martin & Barten (2025), *International Agreements on AI Safety: Review and Recommendations for a Conditional AI Safety Treaty*, arXiv:2503.18956.",
        "**Taking Control:** Miotti (2023, rev. 2025), *Taking control: Policies to address extinction risks from advanced AI*, arXiv:2310.20563.",
        "**MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.",
        "**Amodei:** Amodei (September 2026), *We Must Pace the Frontier*.",
        "**AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*; and Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*.",
        "**Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.",
        "**Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.",
        "**S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI."
      ]
    },
    {
      "id": "bandwidth",
      "name": "Interconnect bandwidth cap",
      "description": "A limit on how fast AI chips can exchange data, so that training large models becomes impractically slow while existing AI services keep running.",
      "acts": "inputs and infrastructure",
      "readiness": "now",
      "scores": {
        "effectiveness": {
          "score": 3,
          "justification": "directly closes the compute route for training across servers; developers can substitute training within pods and low-communication methods."
        },
        "coverage": {
          "score": 3,
          "justification": "well targeted at training; reaches only capped sites."
        },
        "verifiability": {
          "score": 3,
          "justification": "physical caps can be inspected without secrets; software-only versions can be spoofed; every pathway must be covered."
        },
        "burden": {
          "score": 3,
          "justification": "facility audits, inspections and topology reviews."
        },
        "robustness": {
          "score": 2,
          "justification": "a fixed cap becomes obsolete as methods change, and lifting it restores capacity at once."
        },
        "invasiveness": {
          "score": 2,
          "justification": "metadata only, but it constrains how clusters are built and used."
        }
      },
      "stances": {
        "labs": [
          "cooperate",
          "circumvent"
        ],
        "chipCloudFirms": [
          "cooperate"
        ],
        "leadingState": [
          "cooperate"
        ],
        "trailingState": [
          "circumvent"
        ]
      },
      "why": {
        "labs": "AI services keep running; labs still training look for workarounds.",
        "chipCloudFirms": "Reluctantly: clusters built for training lose rental value.",
        "leadingState": "Cheap, verifiable, and keeps AI services running.",
        "trailingState": "Uses unmonitored links and other hidden channels."
      },
      "introduction": "Training a frontier model spreads the work across thousands of chips that constantly exchange large volumes of data, whereas running a trained model mostly exchanges text. A bandwidth cap exploits this gap by limiting how fast chips can communicate, so that large-scale training becomes impractically slow while existing AI services keep running. In a 2026 test, training traffic between two servers ran at about 1–3 gigabytes per second, compared to about 10 kilobytes per second for running a model – roughly 100,000 times more. A cap of a few megabits per second would therefore slow training about a hundredfold. A software prototype already exists and physical versions use existing equipment (low-bandwidth cables, physically separated groups of chips), although caps built into chips would take years.",
      "contribution": [
        {
          "text": "The cap directly blocks training spread across many servers, which is how frontier models are built today. It acts on one route, computing power, but by limiting how that power can be combined rather than how much of it exists. Notably, it reveals almost nothing to regulators, who see traffic volumes rather than models, code or data."
        },
        {
          "text": "The proposals use the cap for the same purpose: keeping AI services running while training stops. The MIRI agreement lets its treaty body restrict bandwidth between chips, AI 2040 surrounds data centres that only run models with a boundary passing about 1 megabyte per second, and Building the Pause Button caps either bandwidth or the number of chips that can work together. The Hardwired Pause, for its part, runs AI services on small, physically isolated clusters."
        },
        {
          "text": "Two gaps nonetheless remain. First, chips inside one tightly linked group, or \"pod\", keep full speed, and a pod can be large: 128 of today's top chips running for a year exceed the MIRI agreement's training limit (our inference). Second, newer training methods need far less communication – in the 2026 test, one such method cut traffic between servers about a hundredfold. For this reason, Building the Pause Button recommends using the cap only alongside tracking of total computing power."
        },
        {
          "text": "The cap is well targeted, sparing most existing AI services, although very large models split across servers, as well as some scientific computing, also need fast links (our inference). Additionally, it only reaches sites where it is installed, so that other tools must find undeclared sites."
        }
      ],
      "failures": {
        "intro": "The cap can fail in several ways:",
        "items": [
          {
            "lead": "Training inside a pod.",
            "text": "Without a limit on pod size, training continues inside one tightly linked group of chips."
          },
          {
            "lead": "Training that needs less communication.",
            "text": "New methods synchronise rarely and could make a fixed cap obsolete; they also make training easier to spread across many small sites, which are harder to monitor."
          },
          {
            "lead": "Hidden links.",
            "text": "Training traffic runs over unmonitored network cards, shared storage or other side channels, or is disguised as loading a model onto chips, which legitimately requires high bandwidth."
          },
          {
            "lead": "Faked monitoring.",
            "text": "Software-only versions can be faked by the operator, who controls the reporting software. The 2026 prototype also sampled traffic only every 15 seconds, leaving room for bursts in between."
          },
          {
            "lead": "Training elsewhere.",
            "text": "Outputs from capped sites are used as training data at uncapped ones."
          }
        ],
        "closing": [
          "Lifting the cap is as easy as reconnecting cables, which also means that training capacity returns at once. A fixed cap must therefore be revised as training methods change."
        ]
      },
      "burden": "Regulators must audit facilities: checking network maps and cabling, approving changes to network layout and procedures for loading models, and inspecting sites at random, including the supply of networking hardware. While the cap itself is cheap to install, checking that every link is covered requires staff who understand data-centre networks. Caps built into chips would add standards and certification.",
      "dependsOn": [
        "inspections"
      ],
      "dependsOnWhy": {
        "inspections": "Physical caps must be checked on site, so that cables are not reconnected after a visit."
      },
      "sources": [
        "**Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.",
        "**Atlas 19 / Atlas briefs:** Pacing Verification Atlas, mechanism page \"Interconnect bandwidth cap\" and the four proposal briefs.",
        "**MIRI TGT:** Scher, Sarbakysh & Moskvin (30 July 2026), *De-risking Interconnect Limits for AI Verification*, MIRI Technical Governance Team blog (SPAR project).",
        "**MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.",
        "**Amodei:** Amodei (September 2026), *We Must Pace the Frontier*.",
        "**AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*; and Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*.",
        "**Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.",
        "**Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.",
        "**S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI."
      ]
    },
    {
      "id": "metering",
      "name": "Cloud workload metering",
      "description": "Cloud providers check who their customers are and report when a project's use of computing power nears a limit. It is quick to set up, but blind to labs' own data centres.",
      "acts": "inputs and infrastructure",
      "readiness": "now",
      "scores": {
        "effectiveness": {
          "score": 2,
          "justification": "partly closes the compute route, for cloud compute only; own data centres and the other routes stay open."
        },
        "coverage": {
          "score": 3,
          "justification": "all cloud customers above a threshold; blind to own data centres."
        },
        "verifiability": {
          "score": 3,
          "justification": "accurate records and easy account-level enforcement; cannot see what a workload does, or compute outside the cloud."
        },
        "burden": {
          "score": 2,
          "justification": "builds on billing and existing know-your-customer practice; rises if an international body is added."
        },
        "robustness": {
          "score": 3,
          "justification": "easy to update and to lift, but coverage erodes as training moves in-house."
        },
        "invasiveness": {
          "score": 2,
          "justification": "identity, compute volumes and project labels; no weights, code or data."
        }
      },
      "stances": {
        "labs": [
          "cooperate"
        ],
        "chipCloudFirms": [
          "cooperate"
        ],
        "leadingState": [
          "cooperate"
        ],
        "trailingState": [
          "undermine"
        ]
      },
      "why": {
        "labs": "The burden is light; leading labs move frontier training to their own hardware.",
        "chipCloudFirms": "If every provider faces the same rules.",
        "leadingState": "Already uses cloud customer checks for export controls.",
        "trailingState": "Rejects foreign access to its providers' records."
      },
      "introduction": "Cloud providers already record how much computing power each customer uses, since they bill for it. Metering turns those records into a check: providers verify who their customers are, add up the computing power each project uses, and report – or halt new allocations – when a project nears a limit. It requires no new technology and exposes relatively little, because providers report numbers they already hold. In fact, the US already uses this channel, with a November 2026 export-control rule expanding the customer checks expected of data centres abroad that offer remote access to advanced chips.",
      "contribution": [
        {
          "text": "Metering partly closes one route, computing power, and only for computing power rented through the cloud. With honest providers, identity checks that stop customers from splitting work across accounts, and labels linking all the training runs of one model, a limit on training can be enforced for cloud customers; evading a reporting threshold for the very largest training runs would require spreading the work across more than ten providers."
        },
        {
          "text": "However, two limits remain. Leading labs increasingly train on their own or partners' hardware, which falls outside metering unless on-site reporting is added. Additionally, billing records show how much computing power was used but not what for: research classifiers distinguish training from other work with about 95% accuracy, which is too unreliable for enforcement."
        },
        {
          "text": "The proposals treat metering as an existing, light layer to build on. The MIRI agreement builds on monitoring clouds already carry out and keeps foreign remote access to chips under watch, while AI 2040 relies on reporting and spot checks for sites too small to convert. Building the Pause Button links cloud usage logs to verified customer identities, borrowing from banking regulation, and the Hardwired Pause checks reported use against power-station records."
        },
        {
          "text": "Within the cloud, coverage is broad, extending to every customer above a threshold, including small and foreign ones. As a result, metering bites hardest on smaller labs and academics who depend on the cloud, rather than on leading labs with their own data centres (our inference)."
        }
      ],
      "failures": {
        "intro": "Metering can fail in several ways:",
        "items": [
          {
            "lead": "Moving off the cloud.",
            "text": "Leading labs move frontier training to their own data centres, where provider and developer are the same company."
          },
          {
            "lead": "Splitting.",
            "text": "Work is split across accounts, shell companies, providers or countries to stay under the limit; identity checks and project labels make this costly, but not impossible."
          },
          {
            "lead": "Relabelling.",
            "text": "Training is declared as running models, fine-tuning or another permitted use."
          },
          {
            "lead": "Regulatory flight.",
            "text": "Customers move to providers in countries outside the agreement."
          },
          {
            "lead": "Distrust between states.",
            "text": "Rival states refuse foreign access to their providers' records. Laws that let governments demand data from domestic firms, such as China's 2017 National Intelligence Law and US surveillance law, give each side reason to distrust the other's reports."
          },
          {
            "lead": "A sensitive data store.",
            "text": "Records of who trains what, and when, become a target for espionage."
          }
        ],
        "closing": [
          "Thresholds and counting rules are easy to update, and metering can be lifted without leaving anything behind. However, its coverage erodes as frontier training moves off the cloud."
        ]
      },
      "burden": "Regulators set common counting rules and thresholds, receive providers' reports, and audit their records and identity checks. Most of the work therefore falls on providers and reuses billing and customer checks that already exist for export controls, while agreed counting conventions avoid disputes about what counts. Reconciling reports across countries would, however, require an international body, for example one modelled on the Financial Action Task Force against money laundering.",
      "dependsOn": [],
      "dependsOnWhy": {},
      "sources": [
        "**Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.",
        "**Atlas 03 / Atlas briefs:** Pacing Verification Atlas, mechanism page \"Cloud workload metering\" and the four proposal briefs.",
        "**Heim et al.:** Heim, Fist, Egan, Huang, Zekany, Trager, Osborne & Zilberman (2024), *Governing Through the Cloud: The Intermediary Role of Compute Providers in AI Regulation*, arXiv:2403.08501.",
        "**FMF:** Frontier Model Forum (2 May 2024), issue brief on measuring training compute.",
        "**Sastry:** Sastry et al. (2024), *Computing Power and the Governance of Artificial Intelligence*.",
        "**MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.",
        "**Amodei:** Amodei (September 2026), *We Must Pace the Frontier*.",
        "**AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*; and Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*.",
        "**Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.",
        "**Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.",
        "**S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI.",
        "**BIS 2026:** US Bureau of Industry and Security (November 2026), interim final rule \"Addressing Remote Access to Advanced Semiconductors\" (checked 22 Nov 2026 via law-firm summaries)."
      ]
    }
  ]
};
