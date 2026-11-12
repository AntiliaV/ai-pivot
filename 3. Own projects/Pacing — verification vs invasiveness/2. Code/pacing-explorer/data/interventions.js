// Pacing explorer: intervention data.
//
// HOW THIS FILE IS WRITTEN (see README.md before editing)
// - Everything between the outer braces is strict JSON: double quotes around
//   every key and string, no trailing commas. Line comments like this one are
//   allowed. tools/validate_data.py reads this file, so keep to that format.
// - Scores are copied from the "Step 1" scores table of each source document
//   and must not be changed here without changing the document first.
// - "TO CONFIRM" marks a placeholder that the authors have not yet agreed.
// - To add an intervention, add one more entry to "interventions". No code changes.

window.PACING_DATA = {

  // The one sentence above the trade-off map. Rewrite it whenever scores change.
  "headline": "The ideal verification tool catches cheating without intruding on AI labs. No tool available today gives high assurance. FlexHEGs could, once built, at moderate invasiveness.",

  "interventions": [

    {
      "id": "ledger",
      "name": "Chip ledger",
      "nameInText": "the chip ledger",
      "plainName": "A register of advanced AI chips",
      "oneLiner": "A reconciled register of advanced AI chips: who made them, who holds them and where they are.",
      "howItWorks": "A chip ledger records every advanced AI chip from manufacture to verified destruction: who made it, who holds it, where it is, and each change of hands. Records from chip makers and owners are reconciled with customs, tax and data-centre records. The ledger does not show what the chips are used for. Its job is to make the world's stock of frontier-capable compute countable, so that rules based on compute can be checked.",
      "readiness": "now",
      "sourceDoc": { "file": "Background mapping of chip production ledgers.md", "rowLabel": "chip ledgers" },
      "scoringNote": "Scored as a support for a coordinated cap on frontier training compute.",
      "scores": {
        "effectiveness": { "score": 2, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "The ledger restricts nothing by itself. It lets a compute cap be checked for undeclared stock, but the cap constrains a proxy that erodes with efficiency gains." },
        "coverage": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "New production and large holdings are well covered. Legacy stock, small clusters and states outside the agreement are the gaps." },
        "verifiability": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "The supply chain is concentrated and paper trails are rich, but the ledger is weak against state concealment and small clusters." },
        "burden": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "It needs reporting, audits and customs checks. Tracking millions of chips a year by serial number must be automated." },
        "robustness": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "It degrades gracefully if gaps are measured, and it is reusable across regimes. Thresholds need continual revision." },
        "invasiveness": { "score": 2, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Low effort, because labs already keep these records, but it reveals their compute stock and sites." }
      },
      "incentives": {
        "labs": { "stance": "cooperate", "note": "The ledger shows chip counts and sites, not models, data or workloads." },
        "chipCloudFirms": { "stance": "cooperate", "note": "If market access depends on it. They already keep these records." },
        "leadingState": { "stance": "cooperate", "note": "It can use the ledger to enforce its lead." },
        "trailingState": { "stance": "circumvent", "note": "Holds unrecorded and diverted stock. May see the ledger as locking in a rival's lead." }
      },
      "labsMustDo": [
        "Declare every covered chip they own or control, including capacity reserved from cloud providers.",
        "Report transfers, repairs and disposals on time.",
        "Train only on registered chips, and rent only from providers that report their customers.",
        "Not restructure their holdings to fall below reporting thresholds.",
        "Hand over purchase records for a census, and destroy retired chips under certification.",
        "Accept that the regulator knows their compute stock and sites, and that rivals see aggregates."
      ],
      "labsLikelyResponse": [
        "Comply, but push for high thresholds and long reporting windows.",
        "Rent rather than own, or hold chips through partners or special-purpose companies.",
        "Insist on confidentiality.",
        "Support a credible ledger early, as a shield against heavier tools (our inference)."
      ],
      "waysAround": [
        { "strategy": "Keep existing chips off the register (\"dark compute\"), especially chips diverted around export controls.", "likelihood": "high", "note": "The stock already exists.", "refs": "Hardwired §5.5, §6.4.3; AI 2040 App. D; MIRI App. D" },
        { "strategy": "Divert chips through intermediaries, shell companies or mislabelled shipments.", "likelihood": "high", "note": "Ongoing under export controls.", "refs": "CNAS; Sastry §5; AI 2040; MIRI App. D; Atlas 04" },
        { "strategy": "Declare chips destroyed or broken, then keep, repair or resell them.", "likelihood": "medium", "note": "", "refs": "MIRI Art. V; AI 2040; Hardwired §5.5; Atlas 04" },
        { "strategy": "Clone or spoof chip identifiers.", "likelihood": "medium", "note": "Medium for states, low for others.", "refs": "Atlas 04; Sastry §4; CNAS" },
        { "strategy": "Split holdings below the threshold, rotate chips between sites, or train across many small sites.", "likelihood": "medium", "note": "", "refs": "MIRI Art. V; Sastry §5; Agenda §3.6" },
        { "strategy": "Substitute hardware the rules do not cover: more lower-spec chips, new form factors, consumer chips.", "likelihood": "medium", "note": "Depends on how fast the coverage rule is updated.", "refs": "Atlas 04; Sastry §5; CNAS" },
        { "strategy": "Rent registered chips through the cloud. The ledger sees owners, not users.", "likelihood": "medium", "note": "", "refs": "MIRI Art. VI; Pause Button; Sastry §4" },
        { "strategy": "Use reporting windows or a staged roll-out to move chips before they are counted.", "likelihood": "medium", "note": "", "refs": "MIRI Art. V; Atlas 04" },
        { "strategy": "Under-report output at declared fabs.", "likelihood": "low", "note": "", "refs": "Hardwired §3.3.4; MIRI Art. VI" },
        { "strategy": "Build a covert supply chain: undeclared fabs and unregistered lithography machines.", "likelihood": "low", "note": "Low now, rising over years.", "refs": "Hardwired §6.5.4; MIRI Art. VI; Pause Button §6.2.1; Sastry §5" }
      ],
      "sideEffects": [
        "Used by one state alone, it entrenches the leader and pushes rivals to build a separate chip supply chain, outside any future ledger.",
        "The register is itself a strategic asset: a map of a rival's compute, and a target for espionage.",
        "A discovered gap is ambiguous. It can be a bookkeeping error or cheating.",
        "Fixed compliance costs favour large incumbents.",
        "Upside: the same infrastructure serves export controls, compute caps and pauses."
      ],
      "proposals": [
        { "name": "MIRI agreement", "role": "Locate all existing chips, consolidate them in declared, inspectable facilities, and keep new production inside the monitored pool. Covers any cluster above 16 H100-equivalents. Every transfer needs advance notice and approval." },
        { "name": "AI 2040: Plan A", "role": "The first step of the deal. Each side must be confident the other hides no more than about 1% of AI compute before training is paused. Declarations are public, so outside analysts can challenge anomalies." },
        { "name": "Building the Pause Button", "role": "\"Traceability\" is one of three pillars. A global registry of production and sales, plus a chain of custody from a cryptographic chip identity given at manufacture, with automated anomaly detection." },
        { "name": "Hardwired Pause", "role": "A global census of existing chips plus registration of all new ones. The only exit is verified destruction. The completeness of the census is judged the binding constraint on how long a pause can last." }
      ],
      "theoryOfChange": "Require records from the few firms that make and sell AI chips. Reconcile them with customs, tax and data-centre records. The stock and location of frontier-capable compute is then known within a small, measured margin. Compute limits become verifiable, and so negotiable between rivals. Coordinated pacing becomes possible when the political will exists.",
      "tocAssumptions": [
        "Frontier training stays compute-hungry.",
        "The chip supply chain stays concentrated.",
        "States share records."
      ],
      "firstSteps": [
        "Require firms to report production, sales and holdings above a high threshold, in confidence, to the regulator.",
        "Require certified destruction of retired chips, with no untracked recycling.",
        "Add a chain of custody for transfers and exports, reconciled with customs records.",
        "Pilot and red-team the ledger: follow one batch end to end, plant errors, and publish coverage and discrepancy rates."
      ],
      "laterSteps": [
        "Set up an international registry with layered access: full records for inspectors, aggregates for parties.",
        "Run a one-off census of existing stock, backed by buybacks and amnesty.",
        "Extend the ledger upstream to lithography machines.",
        "Always attach the ledger to a rule and to checks on how chips are used. Alone, it paces nothing."
      ],
      "dependsOn": [],
      "sources": [
        { "short": "Agenda", "full": "Douglas et al. (2026), Pacing the Frontier: A Framework & Research Agenda." },
        { "short": "Atlas 04", "full": "Pacing Verification Atlas, mechanism page \"Chip production and transfer ledger\" and the four proposal briefs." },
        { "short": "MIRI", "full": "Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), An International Agreement to Prevent the Premature Creation of Artificial Superintelligence, arXiv:2511.10783." },
        { "short": "AI 2040", "full": "Larsen et al. (AI Futures Project, 2026), AI 2040: Plan A." },
        { "short": "Verification Plan", "full": "Dean (2026), Verification plan, supplement to AI 2040: Plan A, ai-2040.com/supplements/verification-plan (read up to its 2033 section)." },
        { "short": "Pause Button", "full": "Al Ramiah et al. (2025), Toward a Global Regime for Compute Governance: Building the Pause Button, arXiv:2506.20530." },
        { "short": "Hardwired", "full": "Working Group on AI Pause Feasibility (2026, v1.0.2), The Feasibility of a Hardwired Pause of Frontier AI Training." },
        { "short": "Sastry", "full": "Sastry et al. (2024), Computing Power and the Governance of Artificial Intelligence, arXiv:2402.08797." },
        { "short": "CNAS", "full": "Aarne, Fist & Withers (2024), Secure, Governable Chips, CNAS." }
      ]
    },

    {
      "id": "inspections",
      "name": "Physical chip inspections",
      "nameInText": "physical chip inspections",
      "plainName": "On-site checks of AI chips",
      "oneLiner": "Trusted inspectors visit a facility and compare the chips actually there with what was declared.",
      "howItWorks": "Inspectors enter a facility and compare the hardware there with what was declared. They count chips, check identifiers and seals, and sample racks against purchase and ledger records. A proper check takes sampled chips out of their racks and tests each one, because labels can be swapped. An inspection is a snapshot. It says nothing about what the chips computed before or after the visit, and nothing about sites nobody declared.",
      "readiness": "now",
      "sourceDoc": { "file": "Background mapping of physical chip inspections.md", "rowLabel": "physical chip inspections" },
      "scoringNote": "Scored as periodic inspections of declared sites, backed by the ledger, with seals or cameras between visits.",
      "scores": {
        "effectiveness": { "score": 2, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Inspections verify hardware, not use. Only switched-off or sealed chips are directly prevented from training." },
        "coverage": { "score": 2, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "They reach declared sites only. Their reach grows with the ledger and with intelligence." },
        "verifiability": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "A strong snapshot of declared sites, but weak between visits and blind to undeclared sites unless continuous monitoring and intelligence are added." },
        "burden": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "They need a trained, vetted inspectorate, access rights, warrants and dispute procedures. Proper checks take chips offline to test them." },
        "robustness": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Easy to adjust and to lift, but fragile if access is withdrawn in a crisis." },
        "invasiveness": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Chips are offline while they are tested, and inspectors see layouts, security and network topology." }
      },
      "incentives": {
        "labs": { "stance": "cooperate", "note": "Domestically, and if inspectors only count chips. Whole-lab inspections are far more invasive." },
        "chipCloudFirms": { "stance": "cooperate", "note": "If continued operation depends on passing inspection." },
        "leadingState": { "stance": "undermine", "note": "Refuses foreign inspectors at strategic sites." },
        "trailingState": { "stance": "circumvent", "note": "Keeps chips at undeclared sites, which inspections do not cover." }
      },
      "labsMustDo": [
        "Give inspectors short-notice or surprise access, including at the cloud and colocation sites that hold their chips.",
        "Let inspectors choose serial numbers on arrival, and take the sampled chips offline for testing.",
        "Keep rack-level inventories that match the ledger, with seals or cameras between visits.",
        "Keep excluded \"sensitive\" areas narrow, and agree in advance what happens if access is refused.",
        "Not re-cable clusters after a visit, or move capacity to sites that are harder to visit.",
        "Under whole-lab variants, accept inspectors with access to code and staff, a much more invasive step."
      ],
      "labsLikelyResponse": [
        "Press for announced rather than surprise visits.",
        "Consolidate into a few large sites designed for inspection.",
        "Narrow the scope and claim confidentiality exclusions.",
        "Back less invasive alternatives, such as remote location checks or FlexHEGs (our inference)."
      ],
      "waysAround": [
        { "strategy": "Keep chips at undeclared sites. Inspections cover declared sites only.", "likelihood": "high", "note": "High for states holding unrecorded stock.", "refs": "Atlas 05; AI 2040 App. D; Verification Plan; Hardwired §6.4; MIRI Art. X" },
        { "strategy": "Move chips out before an announced visit and back afterwards.", "likelihood": "high", "note": "High if visits are announced. Low with surprise visits and cameras.", "refs": "Atlas 05; S&T" },
        { "strategy": "Swap labels, copy identifiers, use lookalike devices or fabricate matching paperwork.", "likelihood": "high", "note": "High against checks of labels or serial numbers only (this has already happened). Low if each chip is tested.", "refs": "Atlas 05; CSET; Sastry §4" },
        { "strategy": "Keep chips offline or warehoused, where testing them means unpacking and powering each one.", "likelihood": "medium", "note": "", "refs": "CSET" },
        { "strategy": "Hide chips in areas excluded for security or customer confidentiality.", "likelihood": "medium", "note": "", "refs": "Atlas 05; MIRI Art. VII" },
        { "strategy": "Show the declared racks while training on remote capacity elsewhere.", "likelihood": "medium", "note": "", "refs": "Atlas 05" },
        { "strategy": "Tamper with chips, seals or monitors between visits.", "likelihood": "medium", "note": "", "refs": "CNAS; Atlas 05" },
        { "strategy": "Re-cable or reconfigure clusters after an inspection.", "likelihood": "medium", "note": "", "refs": "Pause Button; S&T" },
        { "strategy": "Spread training across many small sites that are inspected rarely.", "likelihood": "medium", "note": "", "refs": "S&T; Pause Button; MIRI Art. V" },
        { "strategy": "Delay access to run down the clock, or dispute the scope of the visit.", "likelihood": "medium", "note": "", "refs": "MIRI Art. X; Atlas 05" },
        { "strategy": "Place AI chips alongside military or other sensitive facilities to restrict access.", "likelihood": "medium", "note": "", "refs": "S&T; MIRI Art. VII" },
        { "strategy": "Compromise or co-opt inspectors, or steer the choice of favourable auditors.", "likelihood": "low", "note": "Low to medium. Higher where the inspected firm picks its auditors.", "refs": "Atlas 05; CSET" },
        { "strategy": "Show inspectors only part of a fab's output.", "likelihood": "low", "note": "Countered by reconciling wafers and sampling chips.", "refs": "Hardwired §3.3.4, §5.3" }
      ],
      "sideEffects": [
        "Inspectors see layouts, security procedures and tenants. Reciprocal inspections give each side a window into the other's infrastructure.",
        "State or military sites are harder to inspect than commercial ones, so assurance may be weakest where risk is highest (our inference).",
        "Inspection costs push capacity to smaller or foreign sites.",
        "Turning inspectors away is a visible sign of defection. That gives early warning but can also speed escalation.",
        "Upside: decades of nuclear and chemical-weapons inspections show that inspections can build trust between rivals."
      ],
      "proposals": [
        { "name": "MIRI agreement", "role": "Inspectors confirm that chip clusters above 16 H100-equivalents are consolidated in declared facilities, then verify continuously on site that they are not used for banned training. Challenge inspections cover suspected sites, with access within 24 hours." },
        { "name": "AI 2040: Plan A", "role": "A few hundred US and Chinese inspectors in each other's country check declared chip numbers, then certify the devices that keep data centres inference-only during the pause. Small sites get reporting and random spot checks." },
        { "name": "Building the Pause Button", "role": "One specified option, backing up chip registries and compute caps. Certified third parties run routine audits. Surprise and challenge inspections look for hidden or diverted chips. Customs inspect chip shipments." },
        { "name": "Hardwired Pause", "role": "A large standing international inspectorate. Routine inspections keep licensed chips at registered sites, confirm sealed reserves, and verify fab output during a production halt by sampling chips on each production line." }
      ],
      "theoryOfChange": "The ledger defines what should be where. Inspectors independently confirm a random, unpredictable sample on site, and seals and cameras cover the gaps between visits. Diverting declared chips becomes detectable and costly. States can then trust each other's declarations enough to agree compute limits. Intelligence covers undeclared sites, and workload checks cover use.",
      "tocAssumptions": [
        "Inspectors get unpredictable, independent sampling.",
        "Refusing access carries consequences agreed in advance.",
        "Undeclared capacity is small, which is the ledger's job."
      ],
      "firstSteps": [
        "Have the regulator audit large declared sites against ledger records, choosing serial numbers after arrival and testing each sampled chip.",
        "Require every report to state what was and was not examined.",
        "Pilot at a site with installed chips, spares and equipment under repair, then repeat unannounced.",
        "Red-team the process: a hidden storeroom, swapped labels and a shipment during the visit."
      ],
      "laterSteps": [
        "Agree reciprocal international inspections, largest sites first, and consolidate chips to cut the number of sites.",
        "Use seals and cameras between visits, and challenge inspections with fast access and agreed consequences for refusal.",
        "Use managed access, information barriers and inspectors approved by both sides.",
        "Over time, move routine checks to automated location attestation on chips, and keep inspections for alerts, offline chips and tamper checks."
      ],
      "dependsOn": ["ledger"],
      "dependsOnWhy": {
        "ledger": "The ledger says which chips should be where, and inspection checks that they are."
      },
      "sources": [
        { "short": "Agenda", "full": "Douglas et al. (2026), Pacing the Frontier: A Framework & Research Agenda." },
        { "short": "Atlas 05", "full": "Pacing Verification Atlas, mechanism page \"Physical chip inventory inspection\" and the four proposal briefs." },
        { "short": "S&T", "full": "Scher & Thiergart (2024), Mechanisms to Verify International Agreements About AI Development, MIRI." },
        { "short": "MIRI", "full": "Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), An International Agreement to Prevent the Premature Creation of Artificial Superintelligence, arXiv:2511.10783." },
        { "short": "AI 2040", "full": "Larsen et al. (AI Futures Project, 2026), AI 2040: Plan A." },
        { "short": "Verification Plan", "full": "Dean (2026), Verification plan, supplement to AI 2040: Plan A, ai-2040.com/supplements/verification-plan (read up to its 2033 section)." },
        { "short": "Pause Button", "full": "Al Ramiah et al. (2025), Toward a Global Regime for Compute Governance: Building the Pause Button, arXiv:2506.20530." },
        { "short": "Hardwired", "full": "Working Group on AI Pause Feasibility (2026, v1.0.2), The Feasibility of a Hardwired Pause of Frontier AI Training." },
        { "short": "Sastry", "full": "Sastry et al. (2024), Computing Power and the Governance of Artificial Intelligence, arXiv:2402.08797." },
        { "short": "CNAS", "full": "Aarne, Fist & Withers (2024), Secure, Governable Chips, CNAS." },
        { "short": "CSET", "full": "Feldgoise, Miller & Dohmen (2026), Tracking AI Chips: Assessing Location Verification as an Export Control Enforcement Tool, CSET; cost figures from the companion article Tracking AI Chips: What Does It Cost? (cset.georgetown.edu)." }
      ]
    },

    {
      "id": "flexhegs",
      "name": "FlexHEGs",
      "nameInText": "FlexHEGs",
      "plainName": "Tamper-proof guarantees built into AI chips",
      "oneLiner": "Proposed security hardware on AI chips that can prove, or enforce, what the chips compute, without revealing secrets.",
      "howItWorks": "FlexHEG stands for flexible hardware-enabled guarantee. Each AI chip sits in a tamper-proof enclosure with a small guarantee processor that sees everything going to and from the chip and applies updateable rules. In verification mode, the chip produces signed receipts that prove narrow claims, such as \"this model was trained with less than X FLOP\", without revealing code, data or weights. In enforcement mode, it blocks prohibited computations or stops working without a valid licence. FlexHEGs do not exist yet.",
      "readiness": "3y+", // TO CONFIRM: the source document says "2–5 years", which spans two of the three allowed values
      "readinessNote": "2–5 years",
      "sourceDoc": { "file": "Background mapping of FlexHEGs.md", "rowLabel": "FlexHEGs" },
      "scoringNote": "Scored as the pacing proposals use FlexHEGs (enforcing a compute cap or licence), assuming a mature, secure implementation. Today's deployable versions would score lower on verifiability and effectiveness.",
      "scores": {
        "effectiveness": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Verification mode informs decisions. Enforcement mode blocks development directly, but only on equipped chips." },
        "coverage": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Well targeted at frontier workloads, but blind to unequipped compute and to intent." },
        "verifiability": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "In principle the strongest of the compute tools, but it rests on unproven hardware security and on a ledger for unequipped chips." },
        "burden": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "It needs research, standards, design certification, supply-chain oversight and governance of updates. Enforcement adds licensing authorities and multilateral signing." },
        "robustness": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Rules adapt easily, but a deep security flaw, or capture of the update keys, undermines everything at once." },
        "invasiveness": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "It reveals little information, but enforcement gives others the power to stop or limit labs' chips." }
      },
      // TO CONFIRM (whole "today" block): effectiveness 2 and verifiability 2 are
      // placeholders for what can be deployed today. The other four scores repeat "scores".
      "today": {
        "effectiveness": { "score": 2, "confidence": "medium", // TO CONFIRM (score and confidence)
          "justification": "The source document says today's deployable versions would score lower than a mature one, without giving a number. This value is a placeholder." },
        "coverage": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Well targeted at frontier workloads, but blind to unequipped compute and to intent." },
        "verifiability": { "score": 2, "confidence": "medium", // TO CONFIRM (score and confidence)
          "justification": "The source document says today's deployable versions would score lower than a mature one, without giving a number. This value is a placeholder." },
        "burden": { "score": 4, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "It needs research, standards, design certification, supply-chain oversight and governance of updates. Enforcement adds licensing authorities and multilateral signing." },
        "robustness": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "Rules adapt easily, but a deep security flaw, or capture of the update keys, undermines everything at once." },
        "invasiveness": { "score": 3, "confidence": "medium", // TO CONFIRM (confidence)
          "justification": "It reveals little information, but enforcement gives others the power to stop or limit labs' chips." }
      },
      "incentives": {
        "labs": { "stance": "cooperate", "note": "Verification mode protects their model weights. Enforcement mode is far less attractive." },
        "chipCloudFirms": { "stance": "cooperate", "note": "If market access depends on it. They face research costs and performance overhead." },
        "leadingState": { "stance": "cooperate", "note": "If it holds the keys." },
        "trailingState": { "stance": "undermine", "note": "Rejects a foreign off switch. Builds unequipped chips." }
      },
      "labsMustDo": [
        "Run frontier work only on FlexHEG-equipped hardware, including their own custom chips.",
        "Install signed updates on schedule, and accept time-limited licences for large training runs.",
        "Structure training so that compute receipts can be produced, and report basic details of each training run.",
        "Keep frontier weights inside the FlexHEG ecosystem, deployed only on approved devices.",
        "Not split training runs or build modular systems to get around limits set per model.",
        "Accept some performance overhead, and the risk that a bug halts part of their fleet."
      ],
      "labsLikelyResponse": [
        "Back early versions built on confidential computing, which also protect their weights.",
        "Prefer verification mode, and resist costly redesigns.",
        "Lobby over who holds the keys and what the baseline rules allow.",
        "Keep unequipped capacity in reserve."
      ],
      "waysAround": [
        { "strategy": "Use compute without FlexHEGs: older chips, consumer chips, or chips from a state's own fabs.", "likelihood": "high", "note": "High until most frontier compute is equipped.", "refs": "Petrie p.13–16; Baker; MIRI Art. V; Hardwired §6.4" },
        { "strategy": "Split a training run, or build a larger system from modules that each stay under the limit.", "likelihood": "high", "note": "", "refs": "Petrie p.36–37; Pause Button §6.1" },
        { "strategy": "Disguise the purpose of a permitted computation. Intent is invisible on the chip.", "likelihood": "high", "note": "High for rules against misuse. Low for compute caps.", "refs": "Petrie p.16–17" },
        { "strategy": "Squeeze more capability out of permitted compute through efficiency gains.", "likelihood": "medium", "note": "Medium to high. This is ordinary engineering, within the letter of the rule.", "refs": "Agenda §3.2, §5.1; Sastry §5" },
        { "strategy": "Exploit bugs in the guarantee processor's firmware or in compute accounting.", "likelihood": "medium", "note": "Medium in early versions. Falls with red-teaming.", "refs": "Petrie p.16, 28; Baker; CNAS" },
        { "strategy": "Physically tamper with the enclosure, or extract the chip's signing key.", "likelihood": "medium", "note": "Medium for state actors, low for others.", "refs": "CNAS; Baker; S&T; Hardwired fn. 41" },
        { "strategy": "Move weights off the FlexHEG ecosystem, then train them further or merge them elsewhere.", "likelihood": "medium", "note": "The gain is likely bounded by about one order of magnitude of compute.", "refs": "Petrie p.36" },
        { "strategy": "Spoof location, or change the end user without moving the chip.", "likelihood": "medium", "note": "", "refs": "CSET; Petrie p.30" },
        { "strategy": "Capture or abuse the licensing authority or the update keys.", "likelihood": "medium", "note": "", "refs": "Petrie p.15, 34; Sastry §4–5" },
        { "strategy": "Keep chips offline or refuse updates to escape rule changes.", "likelihood": "low", "note": "Low if licences or rules expire unless renewed.", "refs": "Petrie p.8, 32–33; CNAS" },
        { "strategy": "Exit by resuming production of chips without FlexHEGs (states with fabs).", "likelihood": "low", "note": "Low in the short term, rising over years.", "refs": "Petrie p.15; Sastry §5" },
        { "strategy": "Shift development to jurisdictions that do not take part.", "likelihood": "low", "note": "Low for private labs, because frontier compute is costly to move. Medium for states.", "refs": "Agenda §5.1; Petrie p.13" }
      ],
      "sideEffects": [
        "Whoever controls licences and updates can disable others' compute. Rivals who see this as one state's lever may build their own chip supply chain.",
        "A disabling mechanism on most of the world's AI chips is an attack surface for criminals, rival states or misaligned AI systems.",
        "Binding rules could freeze in whoever leads when they are adopted.",
        "Limits set per model reward splitting work into many smaller runs. That could redirect AI research, not just slow it.",
        "Upside: verification reveals only the compliance claim, so the espionage risk is lower than with inspections."
      ],
      "proposals": [
        { "name": "Building the Pause Button", "role": "Names FlexHEGs as the foundation for hardware controls: compute accounting and caps, and licensed use. Expects \"several years\" of research before deployment, with cruder options running in parallel." },
        { "name": "MIRI agreement", "role": "One option for verifying chip use. Not relied on: current chips are judged insecure, so chips must be consolidated and monitored on site until such mechanisms mature." },
        { "name": "AI 2040: Plan A", "role": "Not named. The pause is verified with simple network taps and recomputation servers instead, because a fully trustless, low-cost solution \"is not mature\". More robust hardware comes later, around 2033." },
        { "name": "Hardwired Pause", "role": "Chooses inference-only chips over programmable guarantees. For a near-term treaty, it assumes firmware-level guarantees will not survive a state-level attacker. FlexHEG ideas could help monitor the remaining training-capable chips." }
      ],
      "theoryOfChange": "Fund research and standards now. Early versions spread for commercial reasons (protecting model weights) and through export controls. When pacing is needed, rivals verify each other's compute use through minimal, private claims rather than inspections. Optionally, the chips themselves enforce agreed rules. The result is coordinated pacing with less espionage risk and less reliance on goodwill.",
      "tocAssumptions": [
        "Security against state-level attackers is achievable.",
        "The chip supply chain can be trusted.",
        "Nearly all frontier compute is equipped, with a ledger and fab monitoring for the rest.",
        "The relevant risks can be stated as technical rules."
      ],
      "firstSteps": [
        "Fund an open-source guarantee processor, and verification protocols that run on existing confidential computing.",
        "Fund tamper-evidence for deployed chips, and red-teaming competitions.",
        "Create demand: require security and attestation features in export-control conditions, data-centre security standards and government procurement.",
        "Pilot verification mode between willing parties, on small batches of chips."
      ],
      "laterSteps": [
        "Only under multilateral governance: enforce rules and licences that need several states' signatures.",
        "Adopt baseline rules that guarantee safe uses, with anonymised location checks that rely on several states.",
        "Always keep the ledger, fab monitoring and inspections alongside. FlexHEGs complement them and do not replace them."
      ],
      "dependsOn": ["ledger", "inspections"],
      "dependsOnWhy": {
        "ledger": "FlexHEGs say nothing about chips without them, so a chip ledger is still needed for those chips.",
        "inspections": "Early versions of FlexHEGs still need occasional physical inspections."
      },
      "sources": [
        { "short": "Petrie", "full": "Petrie, Aarne, Ammann & Dalrymple (2025), Flexible Hardware-Enabled Guarantees for AI Compute, Part I (page numbers refer to Part I; Parts II and III were not reviewed)." },
        { "short": "Agenda", "full": "Douglas et al. (2026), Pacing the Frontier: A Framework & Research Agenda." },
        { "short": "MIRI", "full": "Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), An International Agreement to Prevent the Premature Creation of Artificial Superintelligence, arXiv:2511.10783." },
        { "short": "AI 2040", "full": "Larsen et al. (AI Futures Project, 2026), AI 2040: Plan A." },
        { "short": "Verification Plan", "full": "Dean (2026), Verification plan, supplement to AI 2040: Plan A, ai-2040.com/supplements/verification-plan (read up to its 2033 section)." },
        { "short": "Pause Button", "full": "Al Ramiah et al. (2025), Toward a Global Regime for Compute Governance: Building the Pause Button, arXiv:2506.20530." },
        { "short": "Hardwired", "full": "Working Group on AI Pause Feasibility (2026, v1.0.2), The Feasibility of a Hardwired Pause of Frontier AI Training." },
        { "short": "S&T", "full": "Scher & Thiergart (2024), Mechanisms to Verify International Agreements About AI Development, MIRI." },
        { "short": "Baker", "full": "Baker, Kulp, Marks, Brundage & Heim (2025), Verifying International Agreements on AI: Six Layers of Verification, arXiv:2507.15916." },
        { "short": "CNAS", "full": "Aarne, Fist & Withers (2024), Secure, Governable Chips, CNAS." },
        { "short": "Sastry", "full": "Sastry et al. (2024), Computing Power and the Governance of Artificial Intelligence, arXiv:2402.08797." },
        { "short": "CSET", "full": "Feldgoise, Miller & Dohmen (2026), Tracking AI Chips: Assessing Location Verification as an Export Control Enforcement Tool, CSET." }
      ]
    }

  ]
};
