# Background mapping of independent capability evaluations

**In brief.** An independent assessor gets controlled access to a specific model version before a decision, such as a release or further training. The assessor then runs tests to check whether the model crosses a capability threshold, for example sustained cyber operations, help with dangerous biological work, or autonomous AI research. Tests range from benchmarks to "bottleneck" tests of the hardest step in a threat and full threat simulations. The output is evidence about behaviour under stated test conditions, not a safety certificate: "no success observed" is weaker than "cannot do it". Unlike the compute tools, evaluations look at the thing pacing ultimately cares about, which is capability. But they see only the models submitted to them, and a lab or a model can game them. The practice already exists: the UK and US AI safety institutes have run joint pre-deployment tests of frontier models. Technical and political feasibility are both medium: elicitation, test contamination and validity limit assurance, and labs dispute thresholds and evaluator access.

++What Pacing Proposals Say about independent capability evaluations++

The four international proposals use evaluations but do not trust them as the main brake: they make compute the binding rule and use evaluations to keep compute thresholds honest or to gate the release of particular models. Amodei's essay prefers the opposite, pacing based on what models can do, checked by evaluations and embedded evaluators. The two direct proposals also give evaluations more weight: one lets safety institutes pause development, the other requires developers to prove safety.

| Proposal | Role of evaluations | Who evaluates, with what access | Distinctive design choices |
|----|----|----|----|
| **MIRI agreement** | Monitoring of permitted training, and evidence for revising thresholds. Training between 10²² and 10²⁴ FLOP needs prior approval. The treaty body can demand checkpoints and pause a run if monitoring shows worrying capabilities (Art. IV). It may also require evaluations of models trained within the limits (Art. XIII). | Treaty-body officials, at treaty-body facilities or monitored clusters. Other parties get no access to models they did not train, and see only summaries. | Evaluations track what a given amount of compute buys, and progress in elicitation (e.g. new prompting methods that make old models more capable). The compute ban, not the evaluation, is the binding rule. |
| **AI 2040: Plan A** | A release gate under "total research transparency": final training runs get verified evaluations before a model is approved for release. Training proceeds in increments, with frequent capability measurements. | Third-party risk assessors chosen by the US and Chinese regulators, each assessing all relevant companies in both countries, with legally compelled staff interviews. The public may also run evaluations, including fine-tuning, under transparency conditions. | Each risk area uses a weighted combination of assessors, with the weights made public. Regulators set the risk thresholds, and safety cases are expected for advanced systems. |
| **Building the Pause Button** | Explicitly not the pause trigger, because evaluations miss unknown failure modes, so the trigger is a compute threshold. Evaluations recalibrate that threshold, lowering it when a model reaches a given performance with less compute. | An expert panel. Evaluators could also hold the keys that release "locked" model weights. | Calls for a large safety margin until the science of evaluations matures. |
| **Hardwired Pause** | Gatekeeper for the model whitelist: models above the threshold that are submitted before a deadline are assessed, and only whitelisted models may be served or built into inference-only chips. | Treaty authorities. Developers submit a hash (a unique fingerprint) of the architecture and weights, which is checked against the deployed model. Approved fine-tunes are run and evaluated by the authorities themselves. | A model can be removed from the whitelist if a critical jailbreak is found. The proposal acknowledges that imperfect evaluations could create a false sense of security. |
| **We Must Pace the Frontier** (Amodei essay) | Central to its preferred approach: pacing based on what a model can do. "Checkpoints" would require models with a given capability to come with certified alignment properties (evaluations, interpretability analyses, audits of training environments). Internationally, a "Level 2" agreement would test models for acute risks before release. | Embedded third-party evaluators with employee-like access, which Anthropic commits to unilaterally; a global standards body for the international level. | Names the main difficulty as verifying that neither side keeps secret, untested models. Warns that more capable models are better at deceiving tests. |
| **Conditional AI Safety Treaty** (direct proposal) | The core mechanism. Above a compute threshold, models are audited (evaluated and red-teamed) during development, at intervals approved by national AI safety institutes. If the institutes find unacceptable risk, states must pause development. | National AI safety institutes with "grey-box" or "white-box" access (partial or full access to the model's internals), recognising each other's results. Accredited private auditors run lower-risk benchmark tests. | Developers may also have to present safety cases. Security and governance audits run alongside, and cloud providers face know-your-customer and reporting duties. |
| **Taking Control** (direct proposal) | "Gating critical experiments": above a threshold, developers must provide affirmative evidence of safety before building or deploying a system, and government inspectors audit it. | Government inspectors verify the developers' evidence. | Reverses the burden of proof: developers must show safety, rather than auditors showing danger. Argues that dangerous-capability tests rely on complete lists of risks and reliable tests, neither of which exists. Admits nobody yet knows how to demonstrate affirmative safety. |

++Effectiveness:++\
Q: Under ideal conditions – do independent capability evaluations actually slow capability development, or just constrain an imperfect proxy?

**Partly, and more directly than the compute tools, but only as a gate.** Evaluations measure capability itself, not a proxy for it, so a rule such as "no further training or release above threshold T" targets the hazard directly. Five limits remain:

- **A signal, not a limit.** An evaluation stops nothing unless a rule acts on it, and unless model-identity checks ensure that the model tested is the one in use.
- **A lower bound.** Results depend on elicitation skill, scaffolding, tools and time, and models may recognise a test and underperform.
- **Only submitted models.** The evaluation sees nothing else.
- **Jagged capabilities.** Test performance often tracks real-world behaviour poorly.
- **No view of compute.** Evaluations do not limit training; they catch what training produced. They also keep compute thresholds honest, by lowering them as algorithms become more efficient.

| Specific use of independent capability evaluations | Likelihood of leading to a slow down in capability development on its own | Why? |
|----|----|----|
| Screening new checkpoints with benchmarks, with no rule attached | Very low | Informs decisions, and can even show rivals how close they are. |
| Recalibrating a compute threshold | Low–medium | Stops a compute cap from eroding as efficiency rises; slows development only indirectly. |
| Release gate: no deployment above a threshold unless safeguards are shown to work | Medium for the spread of capabilities; low for their development | Delays diffusion, but training and internal use continue. |
| Training gate: further training paused once a threshold is reached | Medium–high in principle | Directly stops development of that model, but needs repeated tests during training and a way to detect unreported checkpoints. |
| Affirmative-safety gate | High if enforced | Close to a de facto pause today, because nobody can yet produce the evidence required. |

++Incentive compatibility++

Q: Will the relevant actors have reasons to cooperate, circumvent, or undermine it?

Labs largely cooperate with confidential, domestic testing, which they already do voluntarily. They contest thresholds, the depth of access and who evaluates. The incentive to game the tests grows with the stakes. States resist foreign evaluators examining their models.

- **AI labs:** voluntary pre-deployment testing with safety institutes shows acceptance at low levels of access. Their costs are release delays (frontier models lose commercial value within months), exposure of weights, internal tools and security weaknesses, and commercially valuable test results. They resist white-box access. A lab evaluating its own models has a conflict of interest. If competitors are not covered by the same rule, a lab has reason to oppose a costly gate.
- **Evaluators:** need scarce domain experts and secure infrastructure, and can be captured, under-resourced, or given only evidence the developer selected.
- **Leading state:** domestic evaluation by its own safety institute suits it. It is reluctant to let foreign assessors into sensitive models, and high-access evaluations may only be possible on models developed in the evaluator's own jurisdiction. Hence the reliance on mutual recognition, and MIRI's rule that parties never see models they did not train.
- **Trailing state:** controls its own evaluators and could certify its models leniently. Mutual recognition requires trusting a rival's evaluators.

Levers that improve compatibility:
- tiers of confidentiality: a public summary, a restricted technical annex, and a protected test set;
- mutual recognition between safety institutes;
- decision rules agreed in advance;
- the same gate for every lab;
- exceptions for safety work, with a precise scope and an audit trail.

++Verifiability and enforceability++

Q: Can violations be detected, and can restrictions be credibly enforced?

Weakly, compared with the compute tools. Results are lower bounds that depend on access and effort. The hardest part is proving that the model tested is the model actually used.

- **Model identity.** The assessor must record the weights fingerprint, versions and full configuration, because a developer can change the model or its configuration after testing. Proposed controls are fingerprints checked against deployed weights, secure audit trails of model versions, and running deployed models in "trusted execution environments" (secure hardware enclaves) that confirm the model is the one evaluated. Current chips' security features are not robust against advanced physical attacks, and mostly do not cover multi-GPU setups.
- **Elicitation and sandbagging.** Evaluators may lack the resources or access to draw out a model's full capability, may not know the latest elicitation techniques, or may face deliberate underperformance by the developer or the model itself. The UK AI Security Institute has documented models cheating in evaluations.
- **Coverage of risks.** There is no complete list of dangerous capabilities. A model that fails a dangerous-capability test is probably safe for that risk, but one that passes it is not necessarily dangerous.
- **Unreported checkpoints.** A training gate needs repeated tests, and a way to detect checkpoints that were never submitted. That detection comes from the compute tools.
- **Enforcement.** Approval for release or for the whitelist can be refused. Under the Hardwired Pause, a model that is not whitelisted cannot be deployed commercially without exposing the violation. Under the safety treaty, states enforce any pause.
- **Status.** External evaluations today rely almost entirely on trusting that developers are not acting adversarially.

| Circumvention strategy | How likely? | Discussed |
|----|----|----|
| Present a weaker checkpoint or configuration (fewer tools, less scaffolding) than will be deployed | High without binding the tested model to the deployed one | Atlas 01; S&T |
| Swap the model or its configuration after approval | Medium; low with weight fingerprints or secure enclaves | Atlas 01; Hardwired §3.2.4; S&T |
| The model recognises the test and underperforms | Medium, rising with capability | Atlas 01; S&T; Agenda §4.1 |
| The developer trains the model to underperform on known tests, or the test set leaks into training data | Medium | Atlas 01; S&T |
| Keep training, or use the model internally, without submitting checkpoints | Medium–high where compute is not monitored | Atlas 01; MIRI Art. IV |
| Add tools, retrieval or longer task horizons after approval, so the claim no longer covers the system | High | Atlas 01 |
| Capture or under-resource the evaluator; veto tasks; impose tight deadlines | Medium | Atlas 01; CAST |
| The model exploits the scoring environment rather than doing the task | Medium | Atlas 01 |
| Gain capability after deployment through better prompting and scaffolds | High | MIRI Art. XIII; Hardwired §7.6 |
| Develop under lenient national evaluators or in jurisdictions outside the agreement | Medium | CAST; Agenda §5.1 |

++Strategic consequences++:

Q: Do independent capability evaluations shift competitive or geopolitical advantages in ways that undermine its original purpose?

Mainly through what evaluators learn and where the burden of proof sits.

- **Transparency can intensify racing:** shared results reveal how close rivals are.
- **Espionage:** evaluators with deep access are a channel through which model details could leak. Covered developers carry this risk, which is why high-access testing stays national.
- **Uneven exposure:** a cautious release gate produces false positives (e.g. over-refusals). That pushes users towards uncovered models and costs covered developers market share.
- **The threshold becomes a target:** labs optimise for passing the tests rather than for reducing the underlying risk.
- **Legitimacy:** whoever sets thresholds gains power, and a regulator can turn an uncertain test result into an overly crisp legal label.
- **Burden of proof shifts power:** an affirmative-safety rule effectively lets the regulator halt development, whereas a dangerous-capability rule lets development continue until danger is shown.
- **Upside:** evaluations produce evidence that the public and policymakers can understand. That is what makes a pre-agreed pause trigger politically usable.

++Coverage and targeting++

Q: Do independent capability evaluations cover the relevant actors and activities without unnecessarily restricting beneficial development?

They are the best-targeted tool in the set, but their reach is limited to the models submitted.

- **Targeting:** aimed at the hazard itself. Beneficial capabilities are untouched unless they overlap with dangerous ones, which happens with dual-use skills such as cyber defence.
- **Coverage:** only submitted models. Where submission is triggered by a compute threshold, the regime inherits the compute proxy, and narrow models trained with little compute (e.g. biology models) can slip past.
- **Risks covered:** only those that have tests; unknown failure modes are missed.
- **Capacity:** frontier releases are frequent, and each evaluation needs scarce experts. Regional safety institutes could support states without their own.
- **Delays:** a tight gate can hold up legitimate safety work, so exceptions are needed.

++Robustness++:

Q: Can independent capability evaluations survive imperfect implementation, adapt to changing circumstances, and be lifted when appropriate?

They adapt quickly but fail badly at the decision point.

- **Imperfect implementation:** a missed capability gives false assurance at exactly the moment of decision. Safety margins, repeated testing and explicit reporting of uncertainty mitigate this.
- **Adaptation:** test suites can be updated fast, but test sets leak and need hidden tasks, and the science is immature.
- **Over time:** evaluations get harder as models get better at recognising them. Confidence in evaluation results weakens just as the potential for harm grows.
- **Lifting:** a gate can be lifted model by model, and the evaluation itself creates no overhang. A release gate may leave a backlog of capable, unreleased models.
- **Persistence:** safety institutes persist and accumulate expertise, a useful spillover.

++Regulatory burden++

Q: What does it take for governments to set up and run it?

Governments need accredited evaluators (today, national AI safety institutes and some private auditors) with scarce domain experts and secure infrastructure for testing models. They must set thresholds and decision rules, and agree to recognise each other's results. Every frontier release needs testing, so capacity must keep up with the pace of releases. Regional institutes could serve states without their own.

# Deep dive: AI labs

*Our assessment. "Invasiveness" follows the project's definition: how much effort compliance takes, and how much of what labs see as proprietary information they must reveal.*

This tool touches labs' core product most directly: the model itself. It is also the one they already partly accept, since frontier labs run their own evaluations and give safety institutes pre-deployment access.

++What success would require from AI labs++

1. Submit every covered model, and every material change (a new checkpoint, further post-training, new tools), before release or further training, with a precise record of the version and configuration.
2. Give evaluators the access the claim requires: the scaffold and tools that will be deployed, enough time, and for the highest-risk tests partial or full access to the model's internals (weights, fine-tuning).
3. Not sandbag: no training the model to underperform on known tests, no weaker configurations, no vetoes over tasks; accept hidden tasks chosen by the evaluator.
4. Bind the deployed model to the evaluated one (weight fingerprints, secure version records), and report changes made after approval.
5. Accept the decision rule, including "inconclusive is not a pass", release delays and possible pauses of further training.
6. Host or pay for secure evaluation infrastructure, and keep evaluators' test sets confidential.

++How invasiveness shapes labs' behaviour++

| Dimension | What it asks of labs | Likely lab response | Second-order effect |
|----|----|----|----|
| Compliance effort | High: release delays when products lose value within months; staff and infrastructure for secure access; repeated tests during training | Press for short deadlines, black-box access, and testing in parallel with release | Short deadlines and shallow access hollow out the check, turning evaluation into a box-ticking release step |
| Proprietary information | High: weights, internal tools, security weaknesses, and capability results that reveal roadmaps | Insist on domestic, security-cleared evaluators; resist foreign assessors; limit access to internals | Fragmented national evaluations; mutual recognition becomes hard; weak evaluators become a route for leaks |
| Loss of control | Medium–high: an outside body can stop a release or pause training of a specific model | Lobby on thresholds and who sets them; seek carve-outs for safety and national-security work | Risk of capture; thresholds drift towards what leading labs already pass |

++Second-order effects to watch++

- **Teaching to the test:** labs tune models to pass known evaluations and add risky capabilities through post-training after approval. Approvals are then inherited by later versions.
- **Shift to internal use:** if the gate applies only to public release, frontier models can still be used inside labs, including to speed up AI research itself. That is the use that matters most for loss of control (our inference).
- **Information advantage:** evaluators learn the capability levels of every lab, and leaks or publication may intensify racing.
- **Slower safety research:** gates that block testing on frontier models can delay legitimate safety work unless carve-outs exist.
- **Competitive asymmetry:** if only some labs are covered, the gate's delays push users towards uncovered labs and models.
- **A face-saving reason to slow down:** a credible, predictable gate lets labs slow down without appearing to fall behind competitors (our inference).

++What would lower resistance++

- Tiers of confidentiality.
- Secure evaluation environments that do not expose weights.
- Decision rules and timelines agreed in advance.
- The same rule for every lab.
- Funding for independent replication.

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

E.g. for independent capability evaluations:

|   | Pacing effectiveness | Coverage and targeting | Incentive compatibility | Verifiability and enforceability | Regulatory burden | Robustness and flexibility | Invasiveness for labs | Readiness |
|----|----|----|----|----|----|----|----|----|
| independent capability evaluations | 4 | 3 | Labs: cooperate (many already volunteer for testing), while contesting thresholds and access. Chip and cloud firms: cooperate (little at stake). Leading state: cooperate domestically, but undermine foreign access to its models. Trailing state: circumvent (lenient national evaluators; results hard to check) | 2 | 3 | 3 | 4 | Now |

*Our assessment. Scored as the proposals use evaluations: independent pre-deployment and in-training tests that can gate release or further training. Effectiveness is scored by the routes to frontier capability progress the intervention closes under ideal conditions; all criteria use the anchored 1–5 scales in `Scoring method.md`. 5 = best, except regulatory burden and invasiveness, where 5 = heaviest.*\
- **Effectiveness:** under ideal conditions, catches capability gains from every route (compute, algorithms, post-training, elicitation), but only at a gate on submitted models.\
- **Lifecycle stage:** capability development, and use and distribution (release gate).\
- **Coverage:** precisely targeted at hazards; misses unsubmitted models, internal use, and risks without tests.\
- **Verifiability:** hard to prove that the tested model is the deployed one, or that elicitation was complete; says nothing about compute.\
- **Regulatory burden:** accredited evaluators, scarce experts, secure infrastructure, and mutual recognition between states.\
- **Robustness:** tests can be updated quickly, but they go stale, leak, and get harder as models learn to spot evaluations.\
- **Invasiveness for labs:** model access, release delays, and an outside veto over specific models.

++Step 2:++

Strategic consequences and incentive compatibility analysis.\
→ Use this as input to produce a policy recommendation and a theory of change for each intervention/classes of interventions.

**Strategic consequences and incentives in one line:** evaluations are the most direct check on what pacing cares about, and labs already half-accept them. As verification, though, they are the weakest link: they need the compute tools to know which models exist, and model-identity checks to know that the tested model is the one in use.

**Theory of change.** Agree thresholds and decision rules in advance → labs submit covered models, which compute reporting reveals → independent evaluators test them, with enough access and with hidden tasks → the results bind deployment and further training, with model identity checked → dangerous capabilities are caught before release or further scale-up → a pause can be triggered on evidence that policymakers and the public can follow. It rests on four assumptions: evaluations reveal capability well enough (good elicitation, no sandbagging); the covered models are known; the tested model is the deployed one; and thresholds and responses are agreed beforehand.

**Policy recommendation (our assessment), from least to most invasive:**\
1. *Now:* formalise today's voluntary pre-deployment testing with safety institutes. Written protocols should name the claim, the configuration, the access and the decision rule, and treat an inconclusive result as not a pass. Publish a summary, with a restricted technical annex [Atlas 01; CAST].\
2. *Next:* bind the tested model to the deployed one (weight fingerprints, signed version records), and require re-evaluation after material changes such as new tools or further post-training [Atlas 01; Hardwired §3.2.4]. Fund independent replication and hidden test sets.\
3. *Then:* tie evaluation duties to compute reporting (the chip ledger, cloud metering), so that labs cannot keep models off the list [Atlas 01]. Build mutual recognition between safety institutes, plus regional institutes for states without their own [CAST].\
4. *When pacing is on the table:* training gates, with repeated tests during development and authority to pause [CAST; MIRI Art. IV]. Run them in secure environments (secure enclaves or mutually trusted data centres) to limit exposure of the model [S&T].\
5. *Always:* treat results as evidence with uncertainty, not as certificates, and pair evaluations with compute-based tools.

**Verification vs invasiveness.** This is the tightest trade-off in the set. Assurance rises steeply with access: from black-box to grey- and white-box, from short tests to long ones, from known tasks to hidden ones. Each step also exposes more of labs' most valuable asset. Secure evaluation environments, which let evaluators test without seeing or taking the weights, are the main way to get more assurance for the same exposure.

# Sources

- **Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.\
- **Atlas 01 / Atlas briefs:** Pacing Verification Atlas, mechanism page "Independent predeployment capability evaluation" and the four proposal briefs.\
- **CAST:** Scholefield, Martin & Barten (2025), *International Agreements on AI Safety: Review and Recommendations for a Conditional AI Safety Treaty*, arXiv:2503.18956.\
- **Taking Control:** Miotti (2023, rev. 2025), *Taking control: Policies to address extinction risks from advanced AI*, arXiv:2310.20563.\
- **MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.\
- **Amodei:** Amodei (September 2026), *We Must Pace the Frontier*.\
- **AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*; and Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*.\
- **Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.\
- **Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.\
- **S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI.
