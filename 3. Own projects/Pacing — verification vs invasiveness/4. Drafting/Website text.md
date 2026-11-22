# Website text

*The wording shown on the pacing explorer website. Scores, stances and readiness come from the "Step 1" table of each background mapping; sources come from each mapping's "Sources" list. Edit the text here, not in the site's code.*

## 1. Introduction

Some researchers, governments and AI companies now argue that frontier AI is advancing faster than our ability to understand and control it. Pacing means deliberately slowing parts of AI development so that safety research, institutions and public debate can keep up.

An agreement to pace AI, between companies or between states, only works if each side can check that the others are keeping to it. That checking is verification. The more a verification tool can confirm, the more it usually has to see or control.

This site compares five verification tools. For each, it asks how much the tool would slow AI development, how well it catches cheating, and what it costs governments and AI companies. It is written for policymakers and assumes no background in AI safety. All scores are the authors' judgements.

## 3. The five pacing proposals

We use five published proposals as reference points. Each describes how AI development could be paced and which verification tools it would rely on.

**MIRI agreement** (Scher, Abecassis, Barnett & Abeyta, 2025). An international treaty, proposed by the Machine Intelligence Research Institute, to stop the development of superintelligent AI until it can be done safely. Parties register every cluster of AI chips above 16 H100-equivalents and gather them in declared, monitored facilities. Training runs above 10²⁴ FLOP are banned; runs between 10²² and 10²⁴ FLOP need prior approval, with inspectors present. A treaty body monitors chip use, approves every chip transfer, limits which training techniques may be used, and can restrict how fast chips communicate so that they can run models but not train them.

**AI 2040: Plan A** (AI Futures Project, 2026). A US–China deal to pause frontier AI training, with a detailed verification plan. Chip tracking starts at once, so that by a joint declaration in 2029 each side is confident the other hides less than about 1% of the world's AI computing power. Data centres above 10,000 H100-equivalents, about 99% of that power, are then converted to run existing models only, checked by network taps that copy traffic and by recomputing samples of the work. Smaller sites report and face spot checks. Third-party assessors chosen by both governments evaluate every company, and new models need verified evaluations before release.

**Building the Pause Button** (Al Ramiah et al., 2025). A global regime that builds, in advance, the means to pause AI development if needed. The pause is triggered by a computing-power threshold rather than by tests of models, which can miss unexpected failures. The regime has three pillars: hardware controls on chips, starting with limits on how chips connect and later controls built into chips; tracking of chips from the machines that make them to their users, including identity checks on cloud customers; and legal rules. Violators are cut off from firmware updates, design software, cloud access and chipmaking tools.

**Hardwired Pause** (Working Group on AI Pause Feasibility, 2026). Makes a pause enforceable by the hardware itself. Every chip able to train frontier models is counted in a global census, or registered when made at a licensed factory, and leaves the count only through verified destruction. Unaccounted chips are presumed hidden and charged to the country that hosts them. During the pause, licensed operators, kept separate from AI companies, run approved models only, eventually on chips that cannot train. The pause can last only as long as the census stays complete enough, because hidden chips become more useful as algorithms improve. Buybacks and an amnesty for past export-control evasion encourage registration.

**We Must Pace the Frontier** (Dario Amodei, 2026). An essay by the chief executive of the AI company Anthropic, arguing that AI systems helping to build the next generation of AI are now speeding up progress, and that pacing is needed so that safety work can keep up. It sets out three steps. First, each frontier company gives independent evaluators employee-like access to check its safety practices; Anthropic commits to this now. Second, companies in democratic countries agree common limits, backed by regulation, preferably based on what models can do. Third, global agreements with China, ranging from bans on narrow dangerous uses to a full pause, which the essay considers unlikely soon. Meanwhile, chip export controls protect the US lead.

## 4. Ranking: how central each tool is to the proposals

How much each proposal relies on each tool. This measures reliance, not quality. Our classification, adapted from the Pacing Verification Atlas. Tools are ranked by a weighted count (Core 1, Partial 0.5, Option 0.2); ties go to the tool with more Core entries.

| Rank | Tool | MIRI agreement | AI 2040: Plan A | Hardwired Pause | Amodei | Building the Pause Button |
|----|----|----|----|----|----|----|
| 1 | Chip production ledger | Core | Core | Core | — | Core |
| 2 | Physical chip inspection | Core | Core | Core | — | Option |
| 3 | Interconnect bandwidth cap | Option | Core | Partial | — | Core |
| 4 | Independent capability evaluation | Partial | Partial | Core | Option | Partial |
| 5 | Cloud workload metering | Partial | Partial | Partial | — | Option |

**Core:** central or required. **Partial:** a broader or closely related check is discussed. **Option:** described as a possibility, without commitment. **—:** not discussed.

## 5. The five tools (short descriptions)

**Chip production ledger.** A register of every advanced AI chip: who made it, who holds it and where it is. It makes the world's AI computing power countable, so that limits on it can be checked.

**Physical chip inspection.** Inspectors visit facilities to check that the chips there match what was declared. They keep the ledger honest and can confirm that chips are switched off or sealed.

**Independent capability evaluation.** Independent experts test new AI models for dangerous capabilities before release or further training. The only tool here that measures capability itself.

**Interconnect bandwidth cap.** Limits how fast AI chips can exchange data, so that training large models becomes impractically slow while existing AI services keep running.

**Cloud workload metering.** Cloud providers check who their customers are and report when a project's use of computing power nears a limit. Quick to set up, but blind to labs' own data centres.

## 6. Trade-off map (caption)

Each dot is one tool. Further right means more invasive for AI labs; higher up means better at catching cheating. The best tools sit top left: high assurance, little intrusion.

## 7. Build a verification package (intro)

Choose what matters most to you. The tool suggests a combination of verification tools and explains why.

## Intervention pages

### Chip production ledger

**Introduction.** A chip ledger is a register of advanced AI chips. It records who made each chip, who holds it, where it is, and every change of hands until the chip is verifiably destroyed. It does not show what the chips are used for. Its purpose is to make the world's stock of AI computing power countable, so that rules on it (caps on training, pauses, rules on where chips may sit, export controls) can be checked. The technology is ordinary inventory-keeping and exists today. The obstacle is political: chipmakers, cloud firms and states must share commercially and strategically sensitive records.

**Expected behaviours (why).**
- AI labs: The ledger shows chip counts and sites, not models, data or workloads.
- Chip and cloud firms: If market access depends on it. They already keep these records.
- A leading state: It can use the ledger to enforce its lead.
- A trailing state: Holds unrecorded and diverted stock. May see the ledger as locking in a rival's lead.

**Under ideal conditions, how does this contribute to pacing?** On its own, a ledger slows nothing: it records chips but limits no training. Its value is that every rule based on computing power relies on it. With a complete ledger, verifiers can rule out hidden clusters large enough to train a frontier model, and chips can be withheld from anyone who breaks the rules.

The proposals use it in different ways. The MIRI agreement registers every cluster above 16 H100-equivalents (roughly $500,000 of chips) and gathers them in monitored sites. AI 2040 uses it to make each side confident that the other hides less than about 1% of its AI computing power before a pause begins. The Hardwired Pause makes the completeness of its chip census the limit on how long a pause can last.

The ledger acts on only one route to more capable AI: computing power. That route weakens over time, because better algorithms get more out of the same chips.

Coverage is good where it matters. New AI chips come from a handful of firms: TSMC makes about 90% of advanced AI chips, and ASML is the only maker of the most advanced chipmaking machines. Ownership is concentrated too: seven US firms held about 78% of the world's AI computing power at the end of 2025. AI chips are easy to tell apart from other chips, so other industries are hardly affected. The ledger misses who rents chips through the cloud, and gains from better algorithms or training methods.

**Failure scenarios.**
- **Chips kept off the register.** Existing stock is the weakest point, especially chips smuggled around export controls: Epoch AI estimates that about 660,000 H100-equivalents reached China this way in 2024–25. The Hardwired Pause estimates that a thorough census would still miss about 12,000 H100-equivalents in the US and 11,000 in China, and up to about 300,000 in the US and a million in China if states actively hide chips.
- **Diversion.** Chips pass through shell companies or mislabelled shipments, or are declared broken or destroyed and then kept or resold.
- **Hiding below the threshold.** Holdings are split into clusters too small to register, or moved between sites before they are counted.
- **Ambiguous gaps.** A shortfall shows that chips are missing, not where they are, and may be a bookkeeping error rather than cheating. How parties respond to gaps decides whether an agreement survives.
- **Unilateral use.** Used by one country to enforce export controls, the ledger pushes rivals to build their own chip supply chain, which then sits outside any future ledger.
- **A covert supply chain.** In the long run, a state could build undeclared chip factories. One older-generation lithography machine can make chips worth roughly 24,000–38,000 H100-equivalents a month (Hardwired Pause estimate).

The ledger holds up well over time if gaps are measured and published. Over 95% of the world's AI chips, by computing power, are less than three years old, so tracking new production now would soon cover most of the stock (our inference). Each year of delay adds untracked chips. Registration thresholds must keep falling as chips grow more efficient.

**Regulatory burden.** A registry body, national at first and international under an agreement, collects records from chipmakers, distributors and data-centre operators. It checks them against customs, tax and sales data, and investigates gaps. It builds on export-control licensing and on records firms already keep, for example for tax deductions and warranties. Tracking millions of chips a year by serial number must be automated. The burden rises if chips must also be gathered in declared sites and inspected, as the MIRI agreement requires.

### Physical chip inspection

**Introduction.** Trusted inspectors visit a facility and compare the hardware there with what was declared. They count chips, read or test chip identifiers, check seals, and compare samples with purchase and registry records. An inspection shows which chips were present, absent or altered at one moment. It says nothing about what the chips computed before or after the visit, or about sites nobody declared. Inspection is the natural partner of the chip ledger: the ledger says which chips should be where, and inspection checks that they are. The methods work today; the obstacle is negotiating access to private and state facilities.

**Expected behaviours (why).**
- AI labs: At home, if inspectors only count chips.
- Chip and cloud firms: Passing inspection is what lets their chips keep earning.
- A leading state: Refuses foreign inspectors at strategic or military sites.
- A trailing state: Keeps chips at sites it never declares.

**Under ideal conditions, how does this contribute to pacing?** On its own, an inspection slows little: it verifies hardware, not what the hardware is used for. Its main value is making the ledger credible. Three uses go further:
- Chips required to be switched off or sealed in storage can be checked directly, and chips that are off cannot train.
- Inspections of chip factories can enforce a halt or cap on production. Fewer than 20 factories make the most advanced AI chips, and their output can be reconciled with production records.
- Inspectors can check physical limits on training, such as how chips are cabled together, or devices that let a data centre run models but not train them.

Four of the five proposals use inspections. The MIRI agreement, AI 2040 and the Hardwired Pause treat them as core, for example to confirm that chips have been gathered in declared sites or converted to running models only.

Coverage is narrow. Inspections reach only declared sites, or sites flagged by intelligence. Costs grow with the number of sites: roughly $9–49 per chip inspected plus $2,600–6,000 per visit to a cluster (CSET estimate). In practice inspections focus on large facilities and chip factories, chosen by risk. They do not stop chips being used, and monitored data centres can keep serving AI models.

**Failure scenarios.**
- **Undeclared sites.** Inspections cover only what was declared. A state holding unrecorded chips can simply keep them elsewhere.
- **Gaps between visits.** Chips are moved out before an announced visit and back afterwards. Surprise visits, seals and cameras narrow the gap, but need more access.
- **Shallow checks.** In 2024–25, smugglers allegedly diverted $2.5 billion of servers to China by moving labels and serial numbers onto dummy servers left in the original boxes; auditors who opened the boxes were fooled. A proper check removes each chip and tests its hardware, which is slow and disruptive.
- **Weak seals.** One study defeated all 289 tamper-evident seals it tested, including some used for nuclear materials, at low cost. Better seals look feasible with investment.
- **Refused access.** States refuse foreign inspectors at strategic or military sites, or delay access to run down the clock. Without a response agreed in advance, inspection rights fail exactly where suspicion is highest.
- **Espionage.** Inspectors see layouts, security arrangements and customers, so each side fears what the other's inspectors learn.

Methods, frequency and scope are easy to adjust, and visits can stop at once when no longer needed. But access can be withdrawn overnight in a crisis, and restarting after a breakdown is harder than continuing.

**Regulatory burden.** An inspectorate of trained, security-vetted staff, with rights of access and agreed rules for warrants, disputes and inspections of suspected hidden sites. Periodic visits to declared sites are a moderate effort. Continuous monitoring (cameras, seals, sensors) and short-notice inspections of suspected sites need a standing international body, comparable to nuclear safeguards (our inference). Automated location checks on chips could lighten the load, with inspectors sent only to investigate alerts.

### Independent capability evaluation

**Introduction.** An independent assessor gets controlled access to a specific version of a model before a decision, such as releasing it or training it further. The assessor tests whether the model crosses agreed capability thresholds, for example in cyberattacks, help with biological weapons, or carrying out AI research on its own. Tests range from standard question sets to simulations of a full attack. The result is evidence about what the model did under test, not a safety certificate: failing to find a capability does not prove it is absent. The practice already exists: the UK and US AI safety institutes have jointly tested frontier models before release.

**Expected behaviours (why).**
- AI labs: Many already volunteer for testing, but contest thresholds and access.
- Chip and cloud firms: Little is at stake for them.
- A leading state: Tests its own labs at home; resists foreign evaluators.
- A trailing state: Controls its own evaluators, whose results are hard to check.

**Under ideal conditions, how does this contribute to pacing?** Evaluations are the only tool here that measures capability itself rather than computing power. Under ideal conditions they catch gains from every route: more computing power, better algorithms, more training after the main run, or better ways of drawing out what a model can do. Used as a gate, such as "no release or further training above this threshold", they act directly on what pacing cares about.

The proposals give them different roles. In the MIRI agreement, the treaty body can pause a training run if monitoring shows worrying capabilities. AI 2040 requires verified evaluations before any model is released. The Hardwired Pause lets only models that pass evaluation be served. Building the Pause Button rejects evaluations as the pause trigger, because tests miss failures nobody anticipated, and uses them instead to adjust its computing-power threshold. Amodei's essay prefers them: models with a given capability would need certified safety properties before going further.

They are the best-targeted tool, restricting only models with dangerous capabilities. But they act only at the gate, and only on models that labs submit. They miss models never submitted, models used only inside labs, and risks for which nobody has written a test. Testing also needs scarce experts, while frontier models are released every few months.

**Failure scenarios.**
- **Testing the wrong model.** The lab submits a weaker version or setup (fewer tools, less supporting software), or changes the model after approval. Proving that the tested model is the one in use is the hardest problem; proposed fixes include matching a digital fingerprint of the model's weights and running models on secure hardware.
- **Underperforming under test.** Capable models increasingly recognise when they are being tested, and can underperform. Developers can also train models to do badly on known tests. The UK AI Security Institute has documented models cheating in evaluations.
- **Unreported versions.** Labs keep training, or use a model internally, without submitting it. Catching this needs the tools that track computing power.
- **Weak evaluators.** Evaluators lack time, access or experts, or are captured by the labs they test. Thresholds become targets that labs train their models to pass.
- **National evaluators.** States resist foreign evaluators examining their models, so high-access testing stays national. A rival's evaluators may certify leniently, and their results are hard to check.

Tests can be updated quickly, and a gate can be lifted model by model. But the science is immature, test questions leak into training data, and confidence in the results weakens just as models become more capable.

**Regulatory burden.** Governments need accredited evaluators (today, national AI safety institutes and some private auditors) with scarce experts and secure facilities for testing models without exposing them. They must set thresholds and decision rules in advance, including what happens when results are inconclusive, and agree to recognise each other's results. Testing capacity must keep up with the pace of frontier releases. Regional institutes could serve states without their own.

### Interconnect bandwidth cap

**Introduction.** Training a frontier model spreads the work across thousands of chips that constantly exchange large volumes of data. Running a trained model mostly exchanges text. A bandwidth cap exploits this gap: it limits how fast chips can communicate, so that large-scale training becomes impractically slow while existing AI services keep running. In a 2026 test, training traffic between two servers ran at about 1–3 gigabytes per second, against about 10 kilobytes per second for running a model: roughly 100,000 times more. A cap of a few megabits per second would slow training about a hundredfold. A software prototype exists, physical versions use existing equipment (low-bandwidth cables, physically separated groups of chips), and caps built into chips would take years.

**Expected behaviours (why).**
- AI labs: AI services keep running; labs still training look for workarounds.
- Chip and cloud firms: Reluctantly: clusters built for training lose rental value.
- A leading state: Cheap, verifiable, and keeps AI services running.
- A trailing state: Uses unmonitored links and other hidden channels.

**Under ideal conditions, how does this contribute to pacing?** The cap directly blocks training spread across many servers, which is how frontier models are built today. It acts on one route, computing power, by limiting how that power can be combined rather than how much exists. It reveals almost nothing: regulators see traffic volumes, not models, code or data.

The proposals use it for the same purpose, keeping AI services running while training stops. The MIRI agreement lets its treaty body restrict bandwidth between chips. AI 2040 surrounds data centres that only run models with a boundary that passes about 1 megabyte per second. Building the Pause Button caps bandwidth or the number of chips that can work together. The Hardwired Pause runs AI services on small, physically isolated clusters.

Two gaps remain. Chips inside one tightly linked group, or "pod", keep full speed, and a pod can be large: 128 of today's top chips running for a year exceed the MIRI agreement's training limit (our inference). And newer training methods need far less communication: in the 2026 test, one cut traffic between servers about a hundredfold. Building the Pause Button therefore says the cap should be used only alongside tracking of total computing power.

The cap is well targeted, sparing most existing AI services, although very large models split across servers, and some scientific computing, also need fast links (our inference). It reaches only sites where it is installed, so other tools must find undeclared sites.

**Failure scenarios.**
- **Training inside a pod.** Without a limit on pod size, training continues inside one tightly linked group of chips.
- **Training that needs less communication.** New methods synchronise rarely and could make a fixed cap obsolete. They also make training easier to spread across many small sites, which are harder to monitor.
- **Hidden links.** Training traffic runs over unmonitored network cards, shared storage or other side channels, or is disguised as loading a model onto chips, which legitimately needs high bandwidth.
- **Faked monitoring.** Software-only versions can be faked by the operator, who controls the reporting software. The 2026 prototype also sampled traffic only every 15 seconds, leaving room for bursts in between.
- **Training elsewhere.** Outputs from capped sites are used as training data at uncapped ones.

Lifting the cap is as easy as reconnecting cables, which also means training capacity returns at once. A fixed cap must be revised as training methods change.

**Regulatory burden.** Regulators audit facilities: they check network maps and cabling, approve changes to network layout and procedures for loading models, and inspect sites at random, including the supply of networking hardware. The cap itself is cheap to install, but checking that every link is covered needs staff who understand data-centre networks. Caps built into chips would add standards and certification.

### Cloud workload metering

**Introduction.** Cloud providers already record how much computing power each customer uses, because they bill for it. Metering turns those records into a check: providers verify who their customers are, add up the computing power each project uses, and report, or halt new allocations, when a project nears a limit. It needs no new technology and exposes little, because providers report numbers they already hold. The US already uses this channel: a November 2026 export-control rule expanded the customer checks expected of data centres abroad that offer remote access to advanced chips.

**Expected behaviours (why).**
- AI labs: The burden is light; leading labs move frontier training to their own hardware.
- Chip and cloud firms: If every provider faces the same rules.
- A leading state: Already uses cloud customer checks for export controls.
- A trailing state: Rejects foreign access to its providers' records.

**Under ideal conditions, how does this contribute to pacing?** Metering partly closes one route, computing power, and only for computing power rented through the cloud. With honest providers, identity checks that stop customers splitting work across accounts, and labels that link all the training runs of one model, a limit on training can be enforced for cloud customers. Evading a reporting threshold for the very largest training runs would mean spreading the work across more than ten providers.

Two limits remain. Leading labs increasingly train on their own or partners' hardware, which falls outside metering unless on-site reporting is added. And billing records show how much computing power was used, not what for: research classifiers tell training apart from other work with about 95% accuracy, too unreliable for enforcement.

The proposals treat metering as an existing, light layer to build on. The MIRI agreement builds on monitoring clouds already do, and keeps foreign remote access to chips under watch. AI 2040 relies on reporting and spot checks for sites too small to convert. Building the Pause Button links cloud usage logs to verified customer identities, borrowing from banking rules. The Hardwired Pause checks reported use against power-station records.

Within the cloud, coverage is broad: every customer above a threshold, including small and foreign ones. It bites hardest on smaller labs and academics who depend on the cloud, rather than on leading labs with their own data centres (our inference).

**Failure scenarios.**
- **Moving off the cloud.** Leading labs move frontier training to their own data centres, where provider and developer are the same company.
- **Splitting.** Work is split across accounts, shell companies, providers or countries to stay under the limit. Identity checks and project labels make this costly, not impossible.
- **Relabelling.** Training is declared as running models, fine-tuning or another permitted use.
- **Regulatory flight.** Customers move to providers in countries outside the agreement.
- **Distrust between states.** Rival states refuse foreign access to their providers' records. Laws that let governments demand data from domestic firms, such as China's 2017 National Intelligence Law and US surveillance law, give each side reason to distrust the other's reports.
- **A sensitive data store.** Records of who trains what, and when, become a target for espionage.

Thresholds and counting rules are easy to update, and metering can be lifted without leaving anything behind. But its coverage erodes as frontier training moves off the cloud.

**Regulatory burden.** Regulators set common counting rules and thresholds, receive providers' reports, and audit their records and identity checks. Most of the work falls on providers and reuses billing and customer checks that already exist for export controls. Agreed counting conventions avoid disputes about what counts. Reconciling reports across countries would need an international body, for example one modelled on the Financial Action Task Force against money laundering.

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
- **Network tap:** a device that copies the data passing through a network link so that it can be checked.
- **Know your customer:** checks a provider makes to verify who its customers are, borrowed from banking.
- **Embedded evaluator:** an independent evaluator working inside an AI company with employee-like access.
- **We Must Pace the Frontier:** Dario Amodei's 2026 essay proposing a three-step plan for pacing AI development.
