# Website text

*The wording shown on the pacing explorer website. Scores and stances come from the "Step 1" table of each background mapping; sources come from each mapping's "Sources" list. Edit the text here, not in the site's code.*

## Site title

Verifying agreements to pace AI

## 1. Introduction

Some researchers, governments and AI companies now argue that frontier AI is advancing faster than our ability to understand and control it. Pacing refers to deliberately slowing parts of AI development, so that safety research, institutions and public debate have time to keep up.

Since an agreement to pace AI – whether between companies or between states – only works if each side can check that the others are keeping to it, verification is central to any such agreement. However, the more a verification tool can confirm, the more it usually has to see or control, which makes it harder to accept for those being verified.

On this site, we compare five verification tools. For each, we assess how much it would slow AI development, how reliably it detects violations, and what it costs governments and AI companies. The site is written for policymakers and assumes no background in AI safety; all scores reflect our judgement.

## 3. The five pacing proposals

We use five published proposals as reference points. Each describes how AI development could be paced and which verification tools it would rely on.

**[MIRI agreement](https://arxiv.org/abs/2511.10783)** (Scher, Abecassis, Barnett & Abeyta, 2025). Proposed by the Machine Intelligence Research Institute, this is an international treaty to stop the development of superintelligent AI until it can be done safely. Parties register every cluster of AI chips above 16 H100-equivalents and gather them in declared, monitored facilities. Training runs above 10²⁴ FLOP are banned, while runs between 10²² and 10²⁴ FLOP require prior approval, with inspectors present. A treaty body monitors how chips are used, approves every chip transfer and limits which training techniques may be used; it can also restrict how fast chips communicate, so that they can run existing models but not train new ones.

**[AI 2040: Plan A](https://www.ai-2040.com/)** (AI Futures Project, 2026). A US–China deal to pause frontier AI training, accompanied by a detailed [verification plan](https://ai-2040.com/supplements/verification-plan). Chip tracking starts immediately, so that by a joint declaration in 2029 each side is confident the other hides less than approximately 1% of the world's AI computing power. Data centres above 10,000 H100-equivalents (about 99% of that computing power) are then converted to run existing models only, which is checked by network taps that copy traffic and by recomputing samples of the work, while smaller sites report and face spot checks. Additionally, third-party assessors chosen by both governments evaluate every company, and new models require verified evaluations before release.

**[Building the Pause Button](https://arxiv.org/abs/2506.20530)** (Al Ramiah et al., 2025). Rather than pausing AI development directly, this proposal sets up a global regime that puts in place, in advance, the means to pause if needed. The pause is triggered by a computing-power threshold rather than by tests of models, since such tests can miss failures nobody anticipated. The regime rests on three pillars: hardware controls on chips (starting with limits on how chips connect, and later controls built into the chips themselves); tracking of chips from the machines that make them to their final users, including identity checks on cloud customers; and legal rules. Violators are cut off from firmware updates, design software, cloud access and chipmaking tools.

**[Hardwired Pause](https://hardwired-pause.ai/)** (Working Group on AI Pause Feasibility, 2026). This proposal aims to make a pause enforceable by the hardware itself. Every chip able to train frontier models is either counted in a global census or registered when made at a licensed factory, and only leaves the count through verified destruction; unaccounted chips are presumed hidden and charged to the country that hosts them. During the pause, licensed operators – kept separate from AI companies – run approved models only, eventually on chips that cannot train. Importantly, the pause can only last as long as the census remains complete enough, since hidden chips become more useful as algorithms improve. Buybacks and an amnesty for past export-control evasion encourage registration.

**[We Must Pace the Frontier](https://darioamodei.com/post/we-must-pace-the-frontier)** (Dario Amodei, 2026). In this essay, the chief executive of the AI company Anthropic argues that AI systems helping to build the next generation of AI are now speeding up progress, and that pacing is needed for safety work to keep up. The essay sets out three steps. First, each frontier company gives independent evaluators employee-like access to check its safety practices, a step Anthropic commits to unilaterally. Second, companies in democratic countries agree common limits backed by regulation, preferably based on what models can do. Third, the US seeks global agreements with China, ranging from bans on narrow dangerous uses to a full pause, which the essay considers unlikely in the near term. In the meantime, chip export controls protect the US lead.

## 4. Ranking: how central each tool is to the proposals

The table below shows how much each proposal relies on each tool; it therefore measures reliance rather than quality. The classification is our own, adapted from the [Pacing Verification Atlas](https://pacing-atlas.acacianimrod.chatgpt.site/), and tools are ranked by a weighted count (Core = 1, Partial = 0.5, Option = 0.2), with ties going to the tool with more Core entries.

| Rank | Tool | MIRI agreement | AI 2040: Plan A | Building the Pause Button | Hardwired Pause | Amodei |
|----|----|----|----|----|----|----|
| 1 | Chip production ledger | Core | Core | Core | Core | — |
| 2 | Physical chip inspection | Core | Core | Option | Core | — |
| 3 | Interconnect bandwidth cap | Option | Core | Core | Partial | — |
| 4 | Independent capability evaluation | Partial | Partial | Partial | Core | Option |
| 5 | Cloud workload metering | Partial | Partial | Option | Partial | — |

**Core:** central or required. **Partial:** a broader or closely related check is discussed. **Option:** described as a possibility, without commitment. **—:** not discussed.

## 5. The five tools (short descriptions)

**Chip production ledger.** A register of every advanced AI chip, recording who made it, who holds it and where it is. It makes the world's AI computing power countable, so that limits on it can be checked.

**Physical chip inspection.** Inspectors visit facilities to check that the chips there match what was declared. Inspection keeps the ledger honest and can confirm that chips are switched off or sealed.

**Independent capability evaluation.** Independent experts test new AI models for dangerous capabilities before release or further training. It is the only tool here that measures capability itself.

**Interconnect bandwidth cap.** A limit on how fast AI chips can exchange data, so that training large models becomes impractically slow while existing AI services keep running.

**Cloud workload metering.** Cloud providers check who their customers are and report when a project's use of computing power nears a limit. It is quick to set up, but blind to labs' own data centres.

## 6. Trade-off map (caption)

Each marker represents one tool, or several tools with the same scores. Tools further right are more invasive for AI labs, while tools higher up are better at detecting violations; the most attractive tools therefore sit in the top left, combining high assurance with little intrusion.

## 7. Build a verification package (intro)

Given a set of priorities, the tool below suggests a combination of verification tools and explains the reasoning behind each choice.

**Dependencies** (each reason is shown in the package's explanation when a tool is added as a foundation):

- Physical chip inspection needs the chip production ledger: inspectors check the chips on site against the ledger's record of which chips should be there.
- Interconnect bandwidth cap needs physical chip inspection: physical caps must be checked on site, so that cables are not reconnected after a visit.

## Intervention pages

### Chip production ledger

**Introduction.** A chip ledger is a register of advanced AI chips, recording who made each chip, who holds it, where it is located, and every change of hands until the chip is verifiably destroyed. It does not, however, show what the chips are used for. Its purpose is to make the world's stock of AI computing power countable, so that rules on it – caps on training, pauses, rules on where chips may be located, export controls – can be checked. While the technology is ordinary inventory-keeping and already exists, the obstacle is political: chipmakers, cloud firms and states must share commercially and strategically sensitive records.

**Expected behaviours (why).**

- AI labs: The ledger shows chip counts and sites, not models, data or workloads.
- Chip and cloud firms: If market access depends on it. They already keep these records.
- A leading state: It can use the ledger to enforce its lead.
- A trailing state: Holds unrecorded and diverted stock. May see the ledger as locking in a rival's lead.

**Under ideal conditions, how does this contribute to pacing?** On its own, a ledger does not slow AI development, since it records chips but limits no training. Its value lies in the fact that every rule based on computing power relies on it: with a complete ledger, verifiers can rule out hidden clusters large enough to train a frontier model, and chips can be withheld from anyone who breaks the rules.

The proposals use the ledger in different ways. The MIRI agreement registers every cluster above 16 H100-equivalents (roughly \$500,000 of chips) and gathers them in monitored sites, while AI 2040 uses it to make each side confident that the other hides less than about 1% of its AI computing power before a pause begins. The Hardwired Pause goes further, making the completeness of its chip census the limit on how long a pause can last.

Importantly, the ledger only acts on one route to more capable AI – computing power – and this route weakens over time, as better algorithms get more out of the same chips.

Coverage is good where it matters most. New AI chips come from a handful of firms (TSMC makes about 90% of advanced AI chips, and ASML is the only maker of the most advanced chipmaking machines), and ownership is similarly concentrated, with seven US firms holding about 78% of the world's AI computing power at the end of 2025. Since AI chips are easy to distinguish from other chips, other industries are hardly affected. However, the ledger misses who rents chips through the cloud, as well as gains from better algorithms or training methods.

**Failure scenarios.** The ledger can fail in several ways:

- **Chips kept off the register.** Existing stock is the weakest point, especially chips smuggled around export controls; Epoch AI estimates that about 660,000 H100-equivalents reached China this way in 2024–25. According to the Hardwired Pause's estimates, a thorough census would still miss about 12,000 H100-equivalents in the US and 11,000 in China, rising to about 300,000 and a million respectively if states actively hide chips.
- **Diversion.** Chips pass through shell companies or mislabelled shipments, or are declared broken or destroyed and then kept or resold.
- **Hiding below the threshold.** Holdings are split into clusters too small to register, or moved between sites before they are counted.
- **Ambiguous gaps.** A shortfall shows that chips are missing but not where they are, and may reflect a bookkeeping error rather than cheating; how parties respond to such gaps can decide whether an agreement survives.
- **Unilateral use.** When one country uses the ledger to enforce export controls, it pushes rivals to build their own chip supply chain, which then sits outside any future ledger.
- **A covert supply chain.** In the long run, a state could build undeclared chip factories; one older-generation lithography machine can make chips worth roughly 24,000–38,000 H100-equivalents a month (Hardwired Pause estimate).

Provided gaps are measured and published, the ledger holds up well over time. Since over 95% of the world's AI chips, by computing power, are less than three years old, tracking new production now would soon cover most of the stock, whereas each year of delay adds untracked chips. Registration thresholds must, however, keep falling as chips become more efficient.

**Regulatory burden.** A registry body – national at first, then international under an agreement – collects records from chipmakers, distributors and data-centre operators, checks them against customs, tax and sales data, and investigates gaps. It builds on export-control licensing and on records firms already keep (for example for tax deductions and warranties), although tracking millions of chips a year by serial number must be automated. The burden rises considerably if chips must also be gathered in declared sites and inspected, as the MIRI agreement requires.

### Physical chip inspection

**Introduction.** Physical inspection sends trusted inspectors into a facility to compare the hardware there with what was declared: they count chips, read or test chip identifiers, check seals, and compare samples with purchase and registry records. An inspection shows which chips were present, absent or altered at one moment, but says nothing about what the chips computed before or after the visit, nor about sites nobody declared. It is therefore the natural partner of the chip ledger, since the ledger says which chips should be where and inspection checks that they are. While the methods work today, the obstacle is negotiating access to private and state facilities.

**Expected behaviours (why).**

- AI labs: At home, if inspectors only count chips.
- Chip and cloud firms: Passing inspection is what lets their chips keep earning.
- A leading state: Refuses foreign inspectors at strategic or military sites.
- A trailing state: Keeps chips at sites it never declares.

**Under ideal conditions, how does this contribute to pacing?** On its own, inspection does little to slow AI development, as it verifies hardware rather than what the hardware is used for; its main value lies in making the ledger credible. Three uses, however, go further:

- Chips required to be switched off or sealed in storage can be checked directly, and chips that are off cannot train.
- Inspections of chip factories can enforce a halt or cap on production. Fewer than 20 factories make the most advanced AI chips, and their output can be reconciled with production records.
- Inspectors can check physical limits on training, such as how chips are cabled together, or devices that let a data centre run models but not train them.

Four of the five proposals use inspections, with the MIRI agreement, AI 2040 and the Hardwired Pause treating them as core – for example, to confirm that chips have been gathered in declared sites or converted to running models only.

Coverage is narrow, since inspections only reach declared sites or sites identified by intelligence. Additionally, costs grow with the number of sites, at roughly \$9–49 per chip inspected plus \$2,600–6,000 per visit to a cluster (CSET estimate), so that in practice inspections focus on large facilities and chip factories, chosen according to risk. Importantly, inspections do not stop chips from being used, and monitored data centres can keep serving AI models.

**Failure scenarios.** Inspection can fail in several ways:

- **Undeclared sites.** Inspections only cover what was declared, so a state holding unrecorded chips can simply keep them elsewhere.
- **Gaps between visits.** Chips are moved out before an announced visit and back afterwards. Surprise visits, seals and cameras narrow the gap, but require more access.
- **Shallow checks.** In 2024–25, smugglers allegedly diverted \$2.5 billion of servers to China by moving labels and serial numbers onto dummy servers left in the original boxes, and auditors who opened the boxes were fooled. A proper check removes each chip and tests its hardware, which is slow and disruptive.
- **Weak seals.** One study defeated all 289 tamper-evident seals it tested, including some used for nuclear materials, at low cost; better seals nonetheless look feasible with investment.
- **Refused access.** States refuse foreign inspectors at strategic or military sites, or delay access to run down the clock. Without a response agreed in advance, inspection rights fail precisely where suspicion is highest.
- **Espionage.** Inspectors see layouts, security arrangements and customers, so that each side fears what the other's inspectors learn.

Methods, frequency and scope are easy to adjust, and visits can stop at once when no longer needed. However, access can be withdrawn overnight in a crisis, and restarting inspections after a breakdown is harder than continuing them.

**Regulatory burden.** Inspection requires an inspectorate of trained, security-vetted staff, with rights of access and agreed rules for warrants, disputes and inspections of suspected hidden sites. While periodic visits to declared sites represent a moderate effort, continuous monitoring (cameras, seals, sensors) and short-notice inspections of suspected sites would require a standing international body, comparable to nuclear safeguards. Automated location checks on chips could lighten this load, with inspectors sent only to investigate alerts.

### Independent capability evaluation

**Introduction.** In an independent capability evaluation, an assessor gets controlled access to a specific version of a model before a decision is made, such as releasing it or training it further. The assessor then tests whether the model crosses agreed capability thresholds – for example in cyberattacks, help with biological weapons, or carrying out AI research on its own – using tests that range from standard question sets to simulations of a full attack. The result is evidence about what the model did under test rather than a safety certificate: failing to find a capability does not prove it is absent. The practice already exists, as the UK and US AI safety institutes have jointly tested frontier models before release.

**Expected behaviours (why).**

- AI labs: Many already volunteer for testing, but contest thresholds and access.
- Chip and cloud firms: Little is at stake for them.
- A leading state: Tests its own labs at home; resists foreign evaluators.
- A trailing state: Controls its own evaluators, whose results are hard to check.

**Under ideal conditions, how does this contribute to pacing?** Evaluations are the only tool here that measures capability itself rather than computing power. Under ideal conditions, they therefore catch gains from every route, whether these come from more computing power, better algorithms, more training after the main run, or better ways of drawing out what a model can do. Used as a gate (e.g. "no release or further training above this threshold"), they act directly on what pacing is ultimately concerned with.

The proposals give evaluations different roles. In the MIRI agreement, the treaty body can pause a training run if monitoring reveals worrying capabilities, while AI 2040 requires verified evaluations before any model is released and the Hardwired Pause only lets models that pass evaluation be served. Building the Pause Button, on the other hand, rejects evaluations as the pause trigger, since tests miss failures nobody anticipated, and uses them instead to adjust its computing-power threshold. Amodei's essay favours them, requiring models with a given capability to have certified safety properties before going further.

Evaluations are the best-targeted tool, as they restrict only models with dangerous capabilities. However, they only act at the gate, and only on models that labs submit, missing models that are never submitted, models used only inside labs, and risks for which nobody has written a test. Testing also requires scarce experts, while frontier models are released every few months.

**Failure scenarios.** Evaluation can fail in several ways:

- **Testing the wrong model.** The lab submits a weaker version or setup (fewer tools, less supporting software), or changes the model after approval. Proving that the tested model is the one in use is the hardest problem; proposed fixes include matching a digital fingerprint of the model's weights and running models on secure hardware.
- **Underperforming under test.** Capable models increasingly recognise when they are being tested and can underperform, and developers can also train models to do badly on known tests. The UK AI Security Institute has documented models cheating in evaluations.
- **Unreported versions.** Labs keep training, or use a model internally, without submitting it; catching this requires the tools that track computing power.
- **Weak evaluators.** Evaluators lack time, access or experts, or are captured by the labs they test. In turn, thresholds become targets that labs train their models to pass.
- **National evaluators.** States resist foreign evaluators examining their models, so that high-access testing stays national. A rival's evaluators may certify leniently, and their results are hard to check.

Tests can be updated quickly, and a gate can be lifted model by model. However, the science remains immature, test questions leak into training data, and confidence in the results weakens precisely as models become more capable.

**Regulatory burden.** Governments need accredited evaluators (today, national AI safety institutes and some private auditors), with scarce experts and secure facilities for testing models without exposing them. They must also set thresholds and decision rules in advance – including what happens when results are inconclusive – and agree to recognise each other's results. Testing capacity must keep up with the pace of frontier releases, and regional institutes could serve states without their own.

### Interconnect bandwidth cap

**Introduction.** Training a frontier model spreads the work across thousands of chips that constantly exchange large volumes of data, whereas running a trained model mostly exchanges text. A bandwidth cap exploits this gap by limiting how fast chips can communicate, so that large-scale training becomes impractically slow while existing AI services keep running. In a 2026 test, training traffic between two servers ran at about 1–3 gigabytes per second, compared to about 10 kilobytes per second for running a model – roughly 100,000 times more. A cap of a few megabits per second would therefore slow training about a hundredfold. A software prototype already exists and physical versions use existing equipment (low-bandwidth cables, physically separated groups of chips), although caps built into chips would take years.

**Expected behaviours (why).**

- AI labs: AI services keep running; labs still training look for workarounds.
- Chip and cloud firms: Reluctantly: clusters built for training lose rental value.
- A leading state: Cheap, verifiable, and keeps AI services running.
- A trailing state: Uses unmonitored links and other hidden channels.

**Under ideal conditions, how does this contribute to pacing?** The cap directly blocks training spread across many servers, which is how frontier models are built today. It acts on one route, computing power, but by limiting how that power can be combined rather than how much of it exists. Notably, it reveals almost nothing to regulators, who see traffic volumes rather than models, code or data.

The proposals use the cap for the same purpose: keeping AI services running while training stops. The MIRI agreement lets its treaty body restrict bandwidth between chips, AI 2040 surrounds data centres that only run models with a boundary passing about 1 megabyte per second, and Building the Pause Button caps either bandwidth or the number of chips that can work together. The Hardwired Pause, for its part, runs AI services on small, physically isolated clusters.

Two gaps nonetheless remain. First, chips inside one tightly linked group, or "pod", keep full speed, and a pod can be large: 128 of today's top chips running for a year exceed the MIRI agreement's training limit. Second, newer training methods need far less communication – in the 2026 test, one such method cut traffic between servers about a hundredfold. For this reason, Building the Pause Button recommends using the cap only alongside tracking of total computing power.

The cap is well targeted, sparing most existing AI services, although very large models split across servers, as well as some scientific computing, also need fast links. Additionally, it only reaches sites where it is installed, so that other tools must find undeclared sites.

**Failure scenarios.** The cap can fail in several ways:

- **Training inside a pod.** Without a limit on pod size, training continues inside one tightly linked group of chips.
- **Training that needs less communication.** New methods synchronise rarely and could make a fixed cap obsolete; they also make training easier to spread across many small sites, which are harder to monitor.
- **Hidden links.** Training traffic runs over unmonitored network cards, shared storage or other side channels, or is disguised as loading a model onto chips, which legitimately requires high bandwidth.
- **Faked monitoring.** Software-only versions can be faked by the operator, who controls the reporting software. The 2026 prototype also sampled traffic only every 15 seconds, leaving room for bursts in between.
- **Training elsewhere.** Outputs from capped sites are used as training data at uncapped ones.

Lifting the cap is as easy as reconnecting cables, which also means that training capacity returns at once. A fixed cap must therefore be revised as training methods change.

**Regulatory burden.** Regulators must audit facilities: checking network maps and cabling, approving changes to network layout and procedures for loading models, and inspecting sites at random, including the supply of networking hardware. While the cap itself is cheap to install, checking that every link is covered requires staff who understand data-centre networks. Caps built into chips would add standards and certification.

### Cloud workload metering

**Introduction.** Cloud providers already record how much computing power each customer uses, since they bill for it. Metering turns those records into a check: providers verify who their customers are, add up the computing power each project uses, and report – or halt new allocations – when a project nears a limit. It requires no new technology and exposes relatively little, because providers report numbers they already hold. In fact, the US already uses this channel, with a November 2026 export-control rule expanding the customer checks expected of data centres abroad that offer remote access to advanced chips.

**Expected behaviours (why).**

- AI labs: The burden is light; leading labs move frontier training to their own hardware.
- Chip and cloud firms: If every provider faces the same rules.
- A leading state: Already uses cloud customer checks for export controls.
- A trailing state: Rejects foreign access to its providers' records.

**Under ideal conditions, how does this contribute to pacing?** Metering partly closes one route, computing power, and only for computing power rented through the cloud. With honest providers, identity checks that stop customers from splitting work across accounts, and labels linking all the training runs of one model, a limit on training can be enforced for cloud customers; evading a reporting threshold for the very largest training runs would require spreading the work across more than ten providers.

However, two limits remain. Leading labs increasingly train on their own or partners' hardware, which falls outside metering unless on-site reporting is added. Additionally, billing records show how much computing power was used but not what for: research classifiers distinguish training from other work with about 95% accuracy, which is too unreliable for enforcement.

The proposals treat metering as an existing, light layer to build on. The MIRI agreement builds on monitoring clouds already carry out and keeps foreign remote access to chips under watch, while AI 2040 relies on reporting and spot checks for sites too small to convert. Building the Pause Button links cloud usage logs to verified customer identities, borrowing from banking regulation, and the Hardwired Pause checks reported use against power-station records.

Within the cloud, coverage is broad, extending to every customer above a threshold, including small and foreign ones. As a result, metering bites hardest on smaller labs and academics who depend on the cloud, rather than on leading labs with their own data centres.

**Failure scenarios.** Metering can fail in several ways:

- **Moving off the cloud.** Leading labs move frontier training to their own data centres, where provider and developer are the same company.
- **Splitting.** Work is split across accounts, shell companies, providers or countries to stay under the limit; identity checks and project labels make this costly, but not impossible.
- **Relabelling.** Training is declared as running models, fine-tuning or another permitted use.
- **Regulatory flight.** Customers move to providers in countries outside the agreement.
- **Distrust between states.** Rival states refuse foreign access to their providers' records. Laws that let governments demand data from domestic firms, such as China's 2017 National Intelligence Law and US surveillance law, give each side reason to distrust the other's reports.
- **A sensitive data store.** Records of who trains what, and when, become a target for espionage.

Thresholds and counting rules are easy to update, and metering can be lifted without leaving anything behind. However, its coverage erodes as frontier training moves off the cloud.

**Regulatory burden.** Regulators set common counting rules and thresholds, receive providers' reports, and audit their records and identity checks. Most of the work therefore falls on providers and reuses billing and customer checks that already exist for export controls, while agreed counting conventions avoid disputes about what counts. Reconciling reports across countries would, however, require an international body, for example one modelled on the Financial Action Task Force against money laundering.

## 8. Appendix

### How we score

We score each tool on six criteria, shown on five-point meters (dots for what a tool achieves, squares for what it costs). Effectiveness ("Slows AI development") asks how many routes to more capable AI the tool would close if it worked as intended. We distinguish four routes: more computing power for training, better algorithms, more training after the main run, and better ways of drawing out what a model can already do. Tools that only provide information therefore score low, even when other tools depend on them.

| Shown as | What 1 means | What 5 means |
|----|----|----|
| Slows AI development | Closes no route on its own | Closes most routes, with little room to get around them |
| Reaches the right actors | Reaches few relevant actors, or mainly hits beneficial work | Reaches nearly all relevant actors, with little spillover |
| Detects violations | Violations mostly go undetected | Violations are detected quickly; enforcement is credible or automatic |
| Holds up over time | Breaks when circumstances change; hard to lift | Adapts by design; can be lifted without leaving spare capacity ready to use |
| Burden on government | Light reporting on records firms already keep | A standing international inspectorate, or new hardware standards |
| Invasiveness for AI labs | Negligible effort; reveals nothing proprietary | Major disruption, deep access to secrets, or others can stop labs' chips |

**Expected behaviours.** For four actors (AI labs, chip and cloud firms, a leading state, a trailing state), we state whether we expect them to *cooperate*, *circumvent* (comply on paper while evading in practice) or *undermine* (work to weaken the rule).

All scores reflect our judgement, based on the sources listed on each tool's page.

### Glossary

- **Pacing:** Deliberately slowing parts of frontier AI development – for example through caps or pauses agreed between companies or states – so that safety work can keep up.
- **Compute:** Computing power, i.e. the chips and processing capacity used to train and run AI models. It is the input to AI that is easiest to count and verify.
- **FLOP:** Floating-point operation, one basic arithmetic step by a computer. The total number of FLOP measures how much computation went into training a model.
- **H100-equivalent:** A unit for counting AI chips of different types. One H100-equivalent is the computing power of one Nvidia H100, a widely used AI chip.
- **Frontier:** The most capable AI models at a given time, and the large-scale computing needed to build them.
- **Training:** Building an AI model by running very large computations over data. A training run is one such computation, and training frontier models requires very large numbers of chips.
- **Inference:** Running an AI model that has already been trained, for example to answer requests. Data centres limited to inference can run existing models but cannot train new ones.
- **AI chip:** A specialised processor built for AI computations. Advanced AI chips are made by a handful of firms.
- **Lithography machine:** A machine that prints circuit patterns onto chips. Very few firms make the most advanced ones.
- **Cluster:** A group of AI chips connected so that they can work together on one task.
- **Data centre:** A building that houses large numbers of computer chips, with the power and cooling they need.
- **Cloud provider:** A company that rents out computing capacity in its data centres.
- **Model weights:** The numbers that make up a trained AI model. Whoever holds the weights can run the model.
- **Export controls:** Government rules restricting which goods, such as advanced chips, can be sold to which countries.
- **Census:** A one-off count of all the AI chips that already exist.
- **Firmware:** Low-level software built into a hardware device.
- **Tamper-evidence:** Features, such as seals, that show whether a device has been opened or interfered with.
- **Leading and trailing states:** A leading state is ahead in frontier AI, while a trailing state is behind and trying to catch up.
- **Route to capability:** One of the ways AI becomes more capable: more computing power, better algorithms, more training after the main run, or better ways of drawing out what a model can already do.
- **AI safety institute:** A government body that tests AI models, such as the UK AI Security Institute.
- **Bandwidth:** How fast data can move between chips.
- **Pod:** A group of chips linked by very fast connections, inside which training can continue under a bandwidth cap.
- **Network tap:** A device that copies the data passing through a network link so that it can be checked.
- **MIRI agreement:** A proposed international treaty to stop the development of superintelligent AI until it can be done safely. Training above 10²⁴ FLOP is banned, and training above 10²² FLOP requires approval.
- **AI 2040: Plan A:** A proposed US–China deal to pause frontier AI training, verified by tracking chips and by converting data centres to run existing models only.
- **Building the Pause Button:** A proposal to build, in advance, the infrastructure for an enforceable global pause, triggered by a computing-power threshold.
- **Hardwired Pause:** A proposal to make a pause enforceable by the hardware itself: chips able to train frontier models are counted and licensed, and approved models run on chips that cannot train.
- **We Must Pace the Frontier:** Dario Amodei's 2026 essay proposing a three-step plan for pacing AI development.
