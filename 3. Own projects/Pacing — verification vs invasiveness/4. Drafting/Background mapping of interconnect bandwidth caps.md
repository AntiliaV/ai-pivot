# Background mapping of interconnect bandwidth caps

**In brief.** Training a frontier model means spreading the work over thousands of chips that constantly exchange huge volumes of data (gradients). Running a trained model ("inference") mostly exchanges text tokens. An interconnect bandwidth cap exploits that gap. It limits how fast chips can talk to each other, between servers and in strict versions also within them, so that large-scale training becomes impractically slow while inference still works. In a 2026 prototype, training traffic between two servers ran at about 1–3 GB/s, against about 10 kB/s for distributed inference: roughly 100,000 times more. A cap of a few megabits per second would therefore slow training about a hundredfold. The cap is a technical control, not a detector: it does not count compute or tell models apart. A software prototype exists, and physical versions (low-bandwidth cables, physically separated server groups) could be deployed within a year or two; versions built into chips would take years. Technical and political feasibility are both medium. The main weaknesses are training inside a single high-bandwidth group of chips, and new training methods that need far less communication.

++What Pacing Proposals Say about interconnect bandwidth caps++

All four proposals use bandwidth limits for the same purpose: keeping inference running while making training impractical. None relies on the cap alone; each pairs it with compute tracking, inspections or recomputation of workloads.

| Proposal | Role of the cap | Where it sits and how it is verified | Distinctive design choices |
|----|----|----|----|
| **MIRI agreement** | One of the tools that separate permitted inference from banned training. The treaty body may restrict bandwidth and latency between chips, or to the outside network (Art. VII). | On monitored chip clusters; a cluster counts as networked if the total bandwidth between its servers exceeds 25 Gbit/s. Verified by treaty-body monitoring. | Bandwidth limiters are part of the preparation work. Low-bandwidth cables are cited as a way to allow inference only. |
| **AI 2040: Plan A** | A boundary around inference datacentres: a "secure boundary" lets through only verified tokens, at about 1 MB/s. | At the datacentre perimeter. The main verification is more invasive: network taps that copy traffic, plus recomputation of sampled work. | Unplugging most backend networking is named as a quick first option. Warns that outputs from capped inference sites could still feed training elsewhere. |
| **Building the Pause Button** | The "fixed set" option: cap the bandwidth between chips, or the number of chips that can communicate. | Facility path: low-throughput cables and physically separated groups of servers, fast to deploy but dependent on the facility's integrity. Chip path: limits built into firmware or chip logic, which takes years. Verified by audits, cameras, cable inspections, tamper-resistant enclosures and telemetry. | Rated medium on tamper-resistance and deployable within a year. Warns that training methods needing about a hundred times less bandwidth undermine the premise, so the cap should be used only alongside tracking of total compute. |
| **Hardwired Pause** | Part of a transitional inference regime: an internationally operated router feeds requests to small, physically isolated clusters. | Router and cluster design, checked by recomputing a sample of the work. | Bandwidth limits feed into the proposal's estimate of how much training a capped cluster could still do. |

++Effectiveness:++\
Q: Under ideal conditions – do interconnect bandwidth caps actually slow capability development, or just constrain an imperfect proxy?

**Partly. The cap blocks one essential ingredient of frontier training, scaling out across many servers, rather than compute itself.** If every pathway is covered, training a frontier model across many servers becomes roughly a hundred times slower, and inference continues. Four limits remain:

- **Training within a group.** Chips inside one server, or one tightly linked "pod" (about 128 chips in one design), keep full bandwidth. A 128-chip pod of current top chips running for a year at typical utilisation delivers roughly 1.5×10²⁴ operations, above the MIRI agreement's strictest training threshold of 10²⁴ (our inference). The cap therefore needs a pod-size limit, or compute tracking, to bind.
- **Low-communication training.** Newer methods synchronise rarely. In the prototype, one such method (DiLoCo) cut total traffic between servers by about a hundredfold, though its bursts were still detected. Methods like this, if they keep improving, erode the cap.
- **Other workloads.** Reinforcement learning, fine-tuning and small adapters need much less bandwidth than full pretraining and may pass under the cap.
- **No compute count.** A lab can accept slower, longer training, although a hundredfold slowdown makes frontier runs impractical.

| Specific use of interconnect bandwidth caps | Likelihood of leading to a slow down in capability development on its own | Why? |
|----|----|----|
| Software monitor with alerts, no hard limit | Very low | Informs only, and the operator controls the software it reports through. |
| Hard cap between servers at declared inference sites (low-bandwidth cables, physical separation) | Medium | Blocks training across servers at those sites; training within pods, or at undeclared sites, continues. |
| Hard cap plus a limit on the size of high-bandwidth pods | Medium–high | Closes the within-pod route, at some cost to serving very large models. |
| Bandwidth limits built into chips | Medium–high in principle | Harder to bypass, but years away. |
| Cap as part of an inference-only regime with compute tracking and inspections | High in combination | Each tool covers the others' gaps. |

++Incentive compatibility++

Q: Will the relevant actors have reasons to cooperate, circumvent, or undermine it?

Cooperation is unusually easy to obtain, because the cap keeps the inference business running and reveals almost nothing. The incentive to circumvent sits with whoever still wants to train.

- **AI labs:** most can live with it at inference sites, since revenue comes from serving models and the cap reveals only traffic volumes, not weights, code or data. Labs that want to keep training will move training into unrestricted pods or other sites, adopt low-communication methods, or disguise training traffic as model loading (copying a model's weights onto chips, which legitimately needs high bandwidth).
- **Chip and cloud firms:** cooperate reluctantly. Clusters built for training lose utilisation and rental value, and high-bandwidth networking products lose sales. Topologies may need redesign.
- **Leading state:** cooperates. The cap is cheap, quick, easy to explain and verifiable without exposing its labs' secrets, and it preserves the inference economy.
- **Trailing state:** circumvents through unmonitored links or side channels, and may object to outside control over its networks. It would also likely resist a regime that freezes the leading state's model advantage in place (our inference).

++Verifiability and enforceability++

Q: Can violations be detected, and can restrictions be credibly enforced?

Moderately, depending on the version. Physical caps are fairly easy to inspect: cables and switches are visible, and the regulator needs no algorithms, weights or data. Software-only caps are easy to fake.

- **Full coverage.** Every pathway must be covered: network cards between servers, links inside servers, and indirect exchange through shared storage. This requires an inventory, a network map, attestation of configurations, and audits of every change in topology.
- **Software monitor.** The prototype read only network-card and internal-bus counters and sampled every 15 seconds, so an adversary could slip bursts between samples; a cumulative alert (e.g. 2 GB per hour) narrows that gap. Because the operator controls the reporting pipeline, the software-only version can be spoofed unless trusted hardware attests to the readings.
- **Exceptions.** Loading a model onto chips legitimately exceeds the cap. Fixes include averaging over time, logged burst windows, or a trusted loading process. Each exception is a potential hiding place.
- **Physical verification.** Random inspections, cameras, monitoring of the supply of interconnect hardware, and shielding against covert radio links.
- **Enforcement.** A physical cap enforces itself as long as the hardware is untouched. Detected tampering leads to the agreement's general remedies.

| Circumvention strategy | How likely? | Discussed |
|----|----|----|
| Train inside an unrestricted server or high-bandwidth pod | High without pod-size limits | Atlas 19; S&T; MIRI TGT |
| Use low-communication distributed training | Medium–high, rising as methods improve | Pause Button §6.1.4; MIRI TGT; S&T |
| Use unmonitored or alternative links (extra network cards, shared storage, side channels, covert radio) | Medium | Atlas 19; MIRI TGT; S&T |
| Spoof the software monitor | High for the software-only version | MIRI TGT |
| Disguise training traffic as model loading, or exploit exception windows | Medium | Atlas 19; MIRI TGT |
| Send traffic bursts between monitor samples | Medium for the software version | MIRI TGT |
| Shift to reinforcement learning, fine-tuning or adapters that need less bandwidth | Medium | Atlas 19; MIRI TGT |
| Use outputs from capped inference sites to train elsewhere | Medium | Verification Plan |
| Split one training task across many isolated pods | Medium | Pause Button §6.1.4 |
| Accept slower, longer training | Low (about a hundredfold slowdown) | Atlas 19; MIRI TGT; S&T |

++Strategic consequences++:

Q: Do interconnect bandwidth caps shift competitive or geopolitical advantages in ways that undermine its original purpose?

Its main strategic effect is to freeze the status quo: existing models keep running, new frontier models stop.

- **Locks in current leaders:** whoever has the best models when the cap takes effect keeps serving them (our inference).
- **Pushes research towards low-communication training:** that work makes the cap obsolete and makes training easier to spread across many small, scattered sites, which are harder to monitor.
- **Low espionage risk:** only traffic metadata is collected, unlike network taps, which read content. That makes the cap an easy first step between rivals.
- **Upside:** it keeps the economic value of AI flowing during a pause, which makes a pause easier to accept politically.

++Coverage and targeting++

Q: Do interconnect bandwidth caps cover the relevant actors and activities without unnecessarily restricting beneficial development?

Well targeted, but it reaches only the sites where it is installed.

- **Targeting:** aimed at large-scale training. It spares most inference, but can slow serving very large models split across servers, and scientific computing such as climate simulation that also needs fast links (our inference).
- **Coverage:** any actor at a capped site. Undeclared sites need the chip ledger or inspections to be found, and the cap is specific to each topology, so every new facility design needs its own review.
- **Smaller models:** training below the pod-scale threshold continues, as intended.

++Robustness++:

Q: Can interconnect bandwidth caps survive imperfect implementation, adapt to changing circumstances, and be lifted when appropriate?

Simple to apply and to lift, but fragile.

- **Imperfect implementation:** one missed link or one unrestricted pod can defeat it.
- **Adaptation:** a fixed cap becomes obsolete as training methods need less communication, and results from small tests may overstate how well it works at scale. The cap must be revised as methods change.
- **Lifting:** easy, by reconnecting cables or changing configurations. But the chips remain in place, so training capacity returns at once: a compute overhang.

# Deep dive: AI labs

*Our assessment. "Invasiveness" follows the project's definition: how much effort compliance takes, and how much of what labs see as proprietary information they must reveal.*

In information terms this is the least invasive tool in the set: it reads traffic volumes, not content. What it changes is how labs build and use their clusters, which are designed around fast links for training.

++What success would require from AI labs++

1. Declare all sites, network maps and every communication pathway, including shared storage.
2. Install and maintain the caps (cables, switch and network-card settings), attest to configurations, and submit every topology change for audit.
3. Keep high-bandwidth pods within the agreed size.
4. Load models only through approved, logged procedures and exception windows.
5. Not run low-communication training at capped sites, and not route inference outputs into training elsewhere.
6. Accept inspections and cameras.

++How invasiveness shapes labs' behaviour++

| Dimension | What it asks of labs | Likely lab response | Second-order effect |
|----|----|----|----|
| Compliance effort | Medium: rewiring or reconfiguring networks; lower utilisation of training clusters; procedures for model loading | Accept at inference sites; push for large pod sizes and generous exception windows | Pressure to raise the cap or the pod size erodes effectiveness |
| Proprietary information | Low: traffic volumes and network maps, but no weights, code or data | Largely accept; treat network maps as security-sensitive | Low exposure makes the cap a good first step between rivals |
| Loss of control | Medium: no large-scale training at capped sites; an outside body controls network settings | Move training to uncapped sites or into pods; invest in low-communication methods | An algorithmic race against the cap |

++Second-order effects to watch++

- **Research into low-communication training** accelerates, eroding the cap and making training easier to spread across many small, scattered sites.
- **Facility redesign:** larger high-bandwidth pods built to fit under the rules.
- **Business models shift towards inference,** favouring labs that already hold strong models.
- **Inference outputs used as training data** at other sites.

++What would lower resistance++

- Preserve inference capacity and revenue.
- Prefer physical caps over intrusive software monitoring.
- Provide a trusted model-loading process with clear exception rules.
- Apply the same rules to every lab and provider.

# Policy mapping

++Step 1: policy goals scoring for each intervention++

Give a score/value to each intervention of these 5 on:\
1. Effectiveness: score 1 to 5 on whether actually expected to slow capability development (as opposed to just constrain an imperfect proxy). \
2. Coverage and targeting: score 1 to 5, are the relevant actors and activities targeted?\
3. Incentive compatibility: do we expect the most relevant actors to {cooperate, circumvent, undermine}?\
4. Verifiability and enforceability: score 1 to 5 on whether violations of the intervention can be detected/whether intervention can be credibly enforced\
5. Regulatory burden: score 1 to 5, how much active regulation is needed?\
6. Robustness: score 1 to 5, how flexibly can the intervention be adapted to changing circumstances\
7. Invasiveness for labs: score 1 to 5, how much compliance effort, proprietary information and loss of control it imposes on AI labs\
8. Readiness: available now, in 1–3 years, or in 3+ years

E.g. for interconnect bandwidth caps:

|   | Pacing effectiveness | Coverage and targeting | Incentive compatibility | Verifiability and enforceability | Regulatory burden | Robustness and flexibility | Invasiveness for labs | Readiness |
|----|----|----|----|----|----|----|----|----|
| interconnect bandwidth caps | 3 | 3 | Labs: cooperate at inference sites, circumvent where they still want to train (pods, low-communication methods). Chip and cloud firms: cooperate reluctantly (lost utilisation). Leading state: cooperate (cheap, verifiable, preserves inference). Trailing state: circumvent (unmonitored links, side channels) | 3 | 3 | 2 | 2 | Now |

*Our assessment. Scored as the proposals use it: a physical cap on bandwidth between servers at declared sites, paired with other tools. Effectiveness is scored by the routes to frontier capability progress the intervention closes under ideal conditions; all criteria use the anchored 1–5 scales in `Scoring method.md`. 5 = best, except regulatory burden and invasiveness, where 5 = heaviest.*\
- **Effectiveness:** directly closes the compute route for training across servers; developers can substitute training within pods and low-communication methods.\
- **Lifecycle stage:** inputs and infrastructure.\
- **Coverage:** well targeted at training; reaches only capped sites.\
- **Verifiability:** physical caps can be inspected without secrets; software-only versions can be spoofed; every pathway must be covered.\
- **Regulatory burden:** facility audits, inspections and topology reviews.\
- **Robustness:** a fixed cap becomes obsolete as methods change, and lifting it restores capacity at once.\
- **Invasiveness for labs:** metadata only, but it constrains how clusters are built and used.\
- **Readiness:** software and cable-based versions now; hardened versions built into chips in 1–3 years or more.

++Step 2:++

Strategic consequences and incentive compatibility analysis.\
→ Use this as input to produce a policy recommendation and a theory of change for each intervention/classes of interventions.

**Strategic consequences and incentives in one line:** the cap is the cheapest way to keep inference running while halting large-scale training, and it reveals almost nothing. It is also the easiest to outgrow, because training methods are getting less communication-hungry.

**Theory of change.** Declare sites and network maps → install physical caps between servers and limit pod sizes at declared sites → inspections and attested configurations confirm the caps → frontier training across servers becomes impractically slow while inference continues → paired with compute tracking, the remaining routes (pods, low-communication methods, undeclared sites) become visible. It rests on four assumptions: every pathway is covered; pods are kept small enough; training methods have not yet caught up with the cap; and undeclared sites are found by other tools.

**Policy recommendation (our assessment), from least to most invasive:**\
1. *Now:* pilot the software monitor voluntarily at inference sites, with cumulative alerts, and publish typical traffic profiles for training and inference [MIRI TGT].\
2. *Next:* physical caps at declared inference sites, using low-bandwidth cables between pods and physical separation, checked by inspections and by monitoring the supply of interconnect hardware [S&T; Pause Button §6.1.4].\
3. *Then:* pair the cap with the chip ledger and compute tracking, so that training inside pods and low-communication training become visible [Pause Button §6.1.4; Atlas 19]. Set pod-size limits and revise the cap as methods change.\
4. *Later:* bandwidth limits built into chips or attested by hardware, a route that overlaps with FlexHEGs [Pause Button §6.1.4].\
5. *Most invasive:* network taps and recomputation, used only where caps alone cannot separate inference from training [Verification Plan].

**Verification vs invasiveness.** This tool has the best ratio in the set, because it verifies using traffic volumes alone. But that verification shows only that the cap is in place, not that no training is happening anywhere. Closing that gap with network taps, which read content, makes the regime far more invasive.

# Sources

- **Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.\
- **Atlas 19 / Atlas briefs:** Pacing Verification Atlas, mechanism page "Interconnect bandwidth cap" and the four proposal briefs.\
- **MIRI TGT:** Scher, Sarbakysh & Moskvin (30 July 2026), *De-risking Interconnect Limits for AI Verification*, MIRI Technical Governance Team blog (SPAR project).\
- **MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.\
- **AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*; and Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*.\
- **Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.\
- **Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.\
- **S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI.
