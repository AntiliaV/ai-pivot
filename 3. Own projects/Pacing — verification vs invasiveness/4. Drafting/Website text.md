# Website text

*The wording shown on the pacing explorer website. Scores, stances and readiness come from the "Step 1" table of each background mapping; sources come from each mapping's "Sources" list. Edit the text here, not in the site's code.*

## 1. Introduction

Some researchers, governments and AI companies now argue that frontier AI is advancing faster than our ability to understand and control it. Pacing means deliberately slowing parts of AI development so that safety research, institutions and public debate can keep up.

An agreement to pace AI, between companies or between states, only works if each side can check that the others are keeping to it. That checking is verification. The more a verification tool can confirm, the more it usually has to see or control.

This site compares six verification tools. For each, it asks how much the tool would slow AI development, how well it catches cheating, and what it costs governments and AI companies. It is written for policymakers and assumes no background in AI safety. All scores are the authors' judgements.

## 3. The five pacing proposals

We use five published proposals as reference points. Each describes how AI development could be paced and which verification tools it would rely on.

**MIRI agreement** (Scher et al., 2025). An international treaty to prevent the premature creation of superintelligence. AI chips are registered and gathered in monitored facilities, large training runs are banned or need approval, and a treaty body checks compliance.

**AI 2040: Plan A** (AI Futures Project, 2026). A US–China deal. Each side first counts the other's AI chips; then frontier training pauses, data centres are converted to running existing models only, and network monitoring checks that no training happens.

**Building the Pause Button** (Al Ramiah et al., 2025). A global regime that prepares the means to pause AI development when needed. It rests on three pillars: hardware controls on chips, tracking of chips from factory to user, and legal rules.

**Hardwired Pause** (Working Group on AI Pause Feasibility, 2026). Makes a pause physical. Chips able to train frontier models are counted and licensed; only approved models may run, on separate chips; and the pause lasts as long as the chip count can be trusted.

**We Must Pace the Frontier** (Dario Amodei, 2026). A plan by the head of an AI company, in three steps: independent evaluators embedded inside AI companies, common limits agreed among companies in democratic countries, then global agreements of increasing ambition.

## 4. Ranking: how central each tool is to the proposals

How much each proposal relies on each tool, ranked. This measures reliance, not quality. Classification by the Pacing Verification Atlas.

| Rank | Tool | MIRI agreement | AI 2040: Plan A | Hardwired Pause | Amodei | Building the Pause Button |
|----|----|----|----|----|----|----|
| 1 | Chip production ledger | Core | Core | Core | — | Core |
| 2 | Physical chip inspection | Core | Core | Core | — | Option |
| 3 | Interconnect bandwidth cap | Option | Core | — | — | Core |
| 4 | Independent capability evaluation | Partial | Partial | — | Option | Partial |
| 5 | Cloud workload metering | Partial | Partial | Partial | — | Option |

**Core:** central or required. **Partial:** a broader or closely related check is discussed. **Option:** described as a possibility, without commitment. **—:** not discussed.

## 5. The six tools (short descriptions)

**Chip production ledger.** A register of every advanced AI chip: who made it, who holds it and where it is. It makes the world's AI computing power countable, so that limits on it can be checked.

**Physical chip inspection.** Inspectors visit facilities to check that the chips there match what was declared. They keep the ledger honest and can confirm that chips are switched off or sealed.

**FlexHEGs.** Security hardware built into AI chips that can prove what a chip computed, or block forbidden work, without revealing secrets. Not yet available.

**Independent capability evaluation.** Independent experts test new AI models for dangerous capabilities before release or further training. The only tool here that measures capability itself.

**Interconnect bandwidth cap.** Limits how fast AI chips can exchange data, so that training large models becomes impractically slow while existing AI services keep running.

**Cloud workload metering.** Cloud providers check who their customers are and report when a project's use of computing power nears a limit. Quick to set up, but blind to labs' own data centres.

## 6. Trade-off map (caption)

Each dot is one tool. Further right means more invasive for AI labs; higher up means better at catching cheating. The best tools sit top left: high assurance, little intrusion.

## 7. Build a verification package (intro)

Choose what matters most to you. The tool suggests a combination of verification tools and explains why.

## Intervention pages

### Chip production ledger

**Introduction.** A chip ledger is a register of advanced AI chips. It records who made each chip, who holds it, where it is, and every change of hands until the chip is destroyed. It does not show what the chips are used for. Its purpose is to make the world's AI computing power countable, so that rules on it (caps, pauses, export controls) can be checked. It can be built now with ordinary inventory systems; the hard part is getting firms and states to share their records.

**Expected behaviours (why).**
- AI labs: The ledger shows chip counts and sites, not models, data or workloads.
- Chip and cloud firms: If market access depends on it. They already keep these records.
- A leading state: It can use the ledger to enforce its lead.
- A trailing state: Holds unrecorded and diverted stock. May see the ledger as locking in a rival's lead.

**Under ideal conditions, how does this contribute to pacing?** On its own, a ledger slows nothing: it records chips but limits no training. Its value is that other rules can rely on it. With a ledger, verifiers can rule out hidden clusters large enough to train a frontier model, and chips can be withheld from those who break the rules. It acts on only one route to more capable AI, computing power, and that route weakens as algorithms become more efficient.

Coverage is good. New chips come from a handful of firms in a few countries, and AI chips are easy to tell apart from other chips. The ledger misses who rents chips through the cloud, and gains from better algorithms or training methods.

**Failure scenarios.**
- States keep existing chips off the register, especially chips smuggled around export controls.
- Chips pass through shell companies or mislabelled shipments, or are declared destroyed and then kept.
- A gap in the ledger shows that chips are missing, not where they are, and may be a bookkeeping error rather than cheating.
- Used by one country to enforce export controls, it pushes rivals to build their own chip supply chain, outside any future ledger.

The ledger holds up well over time if gaps are measured and published. Most chips in use are less than three years old, so tracking new production now soon covers most of the stock.

**Regulatory burden.** A registry body, national at first and international under an agreement, collects records from chipmakers, distributors and data-centre operators and checks them against customs and sales data. It builds on export-control licensing and records firms already keep, but tracking millions of chips a year by serial number must be automated.

### Physical chip inspection

**Introduction.** Trusted inspectors visit a facility and compare the hardware there with what was declared. They count chips, check identifiers and seals, and test samples against records. An inspection shows which chips were present at one moment. It says nothing about what they computed before or after, or about sites nobody declared. Inspections can start now; the hard part is negotiating access to private and state facilities.

**Expected behaviours (why).**
- AI labs: At home, if inspectors only count chips.
- Chip and cloud firms: Passing inspection is what lets their chips keep earning.
- A leading state: Refuses foreign inspectors at strategic or military sites.
- A trailing state: Keeps chips at sites it never declares.

**Under ideal conditions, how does this contribute to pacing?** On its own, an inspection slows little; its main value is making the chip ledger credible. The exception is chips required to be switched off or sealed: inspectors can verify that directly, and chips that are off cannot train. Inspections of chip factories can also enforce a halt on production. Like the ledger, inspection acts only on computing power.

Coverage is narrow. Inspections reach only declared or suspected sites, and their cost rises with the number of sites, so in practice they focus on the largest facilities and on chip factories.

**Failure scenarios.**
- Chips are kept at undeclared sites, or moved out before a visit and back afterwards.
- Shallow checks are fooled. In one case, smugglers moved serial labels onto dummy servers and auditors missed it. Proper checks remove and test each chip, which is slow.
- States refuse foreign inspectors at strategic or military sites, the most likely reason an agreement fails.
- Inspectors see layouts and security arrangements, so each side fears espionage.

Methods and frequency are easy to adjust, but access can be withdrawn overnight in a crisis.

**Regulatory burden.** A trained, security-vetted inspectorate with rights of access and rules for disputes and challenge inspections. Visits to declared sites are a moderate effort. Continuous monitoring and inspections of suspected hidden sites need a standing international body, comparable to nuclear safeguards (our inference).

### FlexHEGs

**Introduction.** Flexible hardware-enabled guarantees (FlexHEGs) are proposed security systems added to AI chips. A small processor in a tamper-proof enclosure watches what the chip does and applies rules that can be updated. It can produce signed "receipts" proving narrow claims, such as how much computing power a model used, without revealing code, data or model weights. It can also block forbidden work, or stop a chip working without a valid licence. Early versions could build on security features in today's chips; secure versions are years away.

**Expected behaviours (why).**
- AI labs: Receipts protect their secrets; a remote off switch is less welcome.
- Chip and cloud firms: If market access depends on it.
- A leading state: If it holds the keys to licences and updates.
- A trailing state: Rejects a foreign off switch; builds chips without the mechanism.

**Under ideal conditions, how does this contribute to pacing?** When enforcing rules, FlexHEGs can block forbidden training on every chip that carries them, leave little room to get around the rule, and prove that no forbidden run happened. Unlike the ledger and inspections, they check what chips actually compute, not just where they are. Used only to verify, they produce information and slow nothing by themselves.

Coverage is limited to chips that carry the mechanism. Rules can target large training runs while leaving small clusters and approved uses untouched, so beneficial work is largely spared. FlexHEGs cannot see intent, or dangerous models that need little computing power.

**Failure scenarios.**
- Training moves to chips without the mechanism: older chips, consumer chips, or chips from a state's own factories.
- A state finds one deep security flaw and uses it on every chip. Hardware flaws cannot be patched.
- Whoever holds the keys to licences and updates gains power over everyone's computing. Rivals will not trust a device designed by the other side without inspecting the design.
- A large training run is split into pieces that each stay under the limit.

Rules can change by update without renegotiating a treaty, but trust then depends on who governs the updates.

**Regulatory burden.** Governments fund research, set hardware standards, certify chip designs and oversee the supply chain. Someone must govern updates and hold the keys; enforcement adds licensing authorities and joint sign-off between states. Chipmakers bear most of the cost.

### Independent capability evaluation

**Introduction.** An independent assessor, such as a national AI safety institute, gets controlled access to a new model before a decision on release or further training. It tests whether the model crosses agreed thresholds, for example in cyberattacks, biological weapons or AI research. The result is evidence about what the model did under test, not a safety certificate: failing to find a capability does not prove it is absent. Safety institutes already test some frontier models before release.

**Expected behaviours (why).**
- AI labs: Many already volunteer for testing, but contest thresholds and access.
- Chip and cloud firms: Little is at stake for them.
- A leading state: Tests its own labs at home; resists foreign evaluators.
- A trailing state: Controls its own evaluators, whose results are hard to check.

**Under ideal conditions, how does this contribute to pacing?** Evaluations measure capability itself, so under ideal conditions they catch gains from every route: more computing power, better algorithms, more training after the main run, or better prompting. Used as a gate ("no release or further training above this threshold"), they act directly on what pacing cares about. But they act only at the gate, and only on models that labs submit.

They are the best-targeted tool, restricting only models with dangerous capabilities. They miss models never submitted, models used only inside labs, and risks nobody has written a test for.

**Failure scenarios.**
- The lab tests a weaker version, or changes the model after approval. Proving that the tested model is the one in use is the hardest part.
- The model recognises it is being tested and underperforms.
- Evaluators lack time, access or experts, or are captured by the labs they test.
- States resist foreign evaluators examining their models, and a rival's evaluators may certify leniently.

Tests can be updated quickly, but they get harder as models get better at spotting them.

**Regulatory burden.** Governments need accredited evaluators with scarce experts and secure testing facilities. They must set thresholds and decision rules, and agree to recognise each other's results. Testing capacity must keep up with the pace of frontier releases.

### Interconnect bandwidth cap

**Introduction.** Training a frontier model spreads the work across thousands of chips that constantly exchange large volumes of data. Running a trained model exchanges far less. A bandwidth cap limits how fast chips can communicate, so that large-scale training slows about a hundredfold while existing AI services keep running. It can be done now with low-bandwidth cables and physically separated groups of chips; caps built into chips would take years.

**Expected behaviours (why).**
- AI labs: AI services keep running; labs still training look for workarounds.
- Chip and cloud firms: Reluctantly: clusters built for training lose rental value.
- A leading state: Cheap, verifiable, and keeps AI services running.
- A trailing state: Uses unmonitored links and other hidden channels.

**Under ideal conditions, how does this contribute to pacing?** The cap directly blocks training spread across many servers, one of the main ways computing power becomes frontier capability. It reveals almost nothing: regulators see traffic volumes, not models, code or data. But developers can get around it, by training inside a single tightly linked group of chips or with newer methods that need far less communication.

It is well targeted, sparing most existing AI services. It reaches only the sites where it is installed, so other tools must find undeclared sites.

**Failure scenarios.**
- Training continues inside one tightly linked group of chips, which can still be large enough for a frontier run (our inference).
- New training methods need far less communication and make the cap obsolete.
- Training traffic runs over hidden or alternative links, or is disguised as loading a model onto chips.
- Software-only versions can be faked by the operator.

Lifting the cap is as easy as reconnecting cables, which also means training capacity returns at once.

**Regulatory burden.** Regulators audit facilities: network maps, cabling, changes to network layout and procedures for loading models, with random inspections. The cap itself is cheap to install, but checking every link needs staff who understand data-centre networks.

### Cloud workload metering

**Introduction.** Cloud providers already record how much computing power each customer uses, because they bill for it. Metering turns those records into a check: providers verify who their customers are, add up the computing power each project uses, and report or halt new allocations when a project nears a limit. It builds on records and identity checks that already exist; the US already requires some of them for export control.

**Expected behaviours (why).**
- AI labs: The burden is light; leading labs move frontier training to their own hardware.
- Chip and cloud firms: If every provider faces the same rules.
- A leading state: Already uses cloud customer checks for export controls.
- A trailing state: Rejects foreign access to its providers' records.

**Under ideal conditions, how does this contribute to pacing?** Metering partly closes one route, computing power, and only for computing power rented through the cloud. Leading labs increasingly train on their own or partners' hardware, which falls outside it unless reporting is extended. It also shows how much was used, not what for.

Within the cloud, coverage is broad: every customer above a threshold, including small and foreign ones. It bites hardest on smaller labs and academics who depend on the cloud (our inference).

**Failure scenarios.**
- Leading labs move frontier training to their own data centres.
- Work is split across accounts, providers or countries to stay under the limit, or training is labelled as something else.
- Customers move to providers in countries outside the agreement.
- Rival states refuse foreign access to their providers' records, and distrust each other's reports.

Thresholds and counting rules are easy to update, and metering can be lifted without leaving anything behind.

**Regulatory burden.** Regulators set counting rules and thresholds, receive providers' reports and audit their records. Most of the work falls on providers and reuses existing billing and customer checks. Reconciling reports across countries would need an international body.

## 8. Appendix

### How we score

Each tool is scored by the authors on six criteria, shown as five dots. Effectiveness ("Slows AI development") asks how many routes to more capable AI the tool would close if it worked as intended. There are four routes: more computing power for training, better algorithms, more training after the main run, and better ways of drawing out what a model can already do. Tools that only provide information score low, even when other tools depend on them.

| Shown as | What 1 means | What 5 means |
|----|----|----|
| Slows AI development | Closes no route on its own | Closes most routes, with little room to get around them |
| Reaches the right actors | Reaches few relevant actors, or mainly hits beneficial work | Reaches nearly all relevant actors, with little spillover |
| Catches cheating | Violations mostly go undetected | Violations are detected quickly; enforcement is credible or automatic |
| Holds up over time | Breaks when circumstances change; hard to lift | Adapts by design; can be lifted without leaving spare capacity ready to use |
| Burden on government | Light reporting on records firms already keep | A standing international inspectorate, or new hardware standards |
| Invasiveness for AI labs | Negligible effort; reveals nothing proprietary | Major disruption, deep access to secrets, or others can stop labs' chips |

**Readiness.** Green: available now. Red: not yet available, with the expected wait.

**Expected behaviours.** For four actors (AI labs, chip and cloud firms, a leading state, a trailing state), whether we expect them to *cooperate*, *circumvent* (comply on paper, evade in practice) or *undermine* (work to weaken the rule).

**Where it acts.** Each tool is tagged with the stage of AI development it acts on: inputs and infrastructure (chips, data centres), capability development (training and testing models), or use and distribution (releasing and running models). Earlier stages are easier to observe but blunter; later stages are more targeted but easier to get around.

All scores are the authors' judgements, based on the sources listed on each tool's page.

### New glossary terms

To add to the existing glossary:

- **Pacing proposal:** a published plan for slowing or pausing parts of AI development, including how compliance would be checked.
- **Route to capability:** one of the ways AI becomes more capable: more computing power, better algorithms, more post-training, or better elicitation.
- **Post-training:** training a model further after its main training run, for example to follow instructions or use tools.
- **Elicitation:** drawing out capabilities a model already has, for example through better prompts or tools.
- **Sandbagging:** a model, or its developer, deliberately underperforming in a test.
- **AI safety institute:** a government body that tests AI models, such as the UK AI Security Institute.
- **Bandwidth:** how fast data can move between chips.
- **Pod:** a group of chips linked by very fast connections, inside which training can continue under a bandwidth cap.
- **Know your customer:** checks a provider makes to verify who its customers are, borrowed from banking.
- **Embedded evaluator:** an independent evaluator working inside an AI company with employee-like access.
- **We Must Pace the Frontier:** Dario Amodei's 2026 essay proposing a three-step plan for pacing AI development.
