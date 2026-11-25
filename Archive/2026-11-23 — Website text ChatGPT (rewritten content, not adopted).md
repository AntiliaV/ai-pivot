# Website text ChatGPT

*Revised website copy · 23 November 2026*

*Editorial note — not for publication: This revision retains the five tools, proposal classifications, numerical scores and package-builder rules. “Key findings” and “Policy implications” are new sections. Revised headings, actor descriptions, citations and methodological qualifications also need to be carried through to the website's interface and data files. Remove this note before publication.*

## Site title

Verifying agreements to pace AI

**Subtitle:** What five verification tools can establish, what they expose, and how they could work together.

## 1. Introduction

An agreement to slow frontier AI development faces a practical problem: how can participants gain enough confidence that others are exercising the same restraint? A company that delays training may lose ground to a competitor. A state that accepts limits may fear a rival's undisclosed programme. Verification can reduce these uncertainties, but it also requires access to commercially and strategically sensitive information, infrastructure or decisions.

Pacing means deliberately moderating the development, deployment or spread of AI capabilities. Its purpose may be to give safety research, institutions and public deliberation more time to respond to emerging risks. Agreements can take different forms: a limit on training compute, a temporary pause, or a requirement to demonstrate specified safeguards before developing or releasing a model. Each creates a different verification task.

This note compares five tools: chip production ledgers, physical chip inspections, independent capability evaluations, interconnect bandwidth caps and cloud workload metering. It examines what each can establish, how that evidence could support pacing, and what compliance would require from governments, AI developers and infrastructure providers. Five recent proposals provide reference points for the comparison.

The central finding is that a credible regime would need complementary tools. A ledger records where chips should be; inspections check those declarations; metering and network controls provide evidence about, or place limits on, their use; evaluations test selected model capabilities. None establishes, by itself, that frontier capability development has stopped.

The design challenge is therefore to obtain enough assurance about a specified restriction while limiting unnecessary disclosure, disruption and external control. More access can improve assurance, but it can also make an agreement harder to negotiate and sustain. Better technical design and governance may reduce both problems.

This is a comparison of verification options, rather than an assessment of whether any particular pause is justified. It develops one part of the research agenda in [*Pacing the Frontier*](https://pacing.tech/): understanding how verification requirements and the responses they induce affect the prospects for coordinated restraint.

## 2. Key findings

- **Start with the restriction to be verified.** Counting chips, detecting a prohibited training run and testing a model's capabilities are different tasks. A tool's usefulness depends on which claim an agreement requires participants to establish.
- **Coverage is as important as precision.** A highly reliable check at a declared facility offers limited reassurance if strategically significant activity can move elsewhere. Conversely, a broad inventory does not show what registered chips are computing.
- **Invasiveness has several dimensions.** Compliance effort, disclosure of proprietary information and loss of operational control need not move together. A bandwidth cap may reveal little while substantially restricting the use of a cluster.
- **Verification must remain credible as conditions change.** Better algorithms, alternative training methods and changing incentives can weaken a regime that initially works. Agreements need review procedures, rules for investigating uncertainty, and plans for both orderly exit and breakdown.

## 3. Pacing proposals

The five reference cases below include a draft treaty, a policy scenario, a governance architecture, a technical feasibility study and an industry leader's essay. They illustrate different approaches to pacing and verification without representing the full policy debate.

[**MIRI agreement**](https://arxiv.org/abs/2511.10783v3) — Scher, Abecassis, Barnett and Abeyta (2025; revised 2026). This proposed international agreement would prohibit training above 10²⁴ floating-point operations (FLOP), subject training between 10²² and 10²⁴ FLOP to approval and monitoring, and restrict research that could undermine the agreement. Clusters above 16 H100-equivalents would be brought into declared, monitored facilities. Chip tracking and verification of chip use underpin the regime; the treaty body could also require limits on communication between chips. These thresholds are proposed rules, not established boundaries between safe and dangerous AI.

[**AI 2040: Plan A**](https://ai-2040.com/) — AI Futures Project (2026). This policy scenario describes a US–China agreement to pause frontier training and subsequently resume development under extensive oversight. Its [verification plan](https://ai-2040.com/supplements/verification-plan) combines supply-chain tracking, reciprocal inspections and checks that designated facilities perform permitted work. Network taps and recomputation of sampled workloads play important roles. Dates, chip counts and estimates of hidden capacity belong to the scenario and its assumptions; they are not observations of an implemented regime.

[**Building the Pause Button**](https://arxiv.org/abs/2506.20530) — Al Ramiah et al. (2025). This proposal would establish the capacity for an enforceable pause before one is needed. It combines hardware controls, traceability of chips and their users, and legal obligations. Nearer-term options include limits on interconnection; more ambitious controls would be built into hardware. The proposal favours compute-based triggers over reliance on capability evaluations alone, while using evaluations to inform the thresholds.

[**Hardwired Pause**](https://hardwired-pause.ai/) — Working Group on AI Pause Feasibility (2026). This study examines whether frontier training could be paused while approved AI services continue. It combines a census of existing training-capable chips, registration of new production, licensed hardware operators and a transition towards inference-only hardware. A central constraint is how long the remaining hidden compute could be kept below a strategically significant level as algorithms improve. Registration incentives include buybacks and amnesty for past export-control evasion.

[**We Must Pace the Frontier**](https://darioamodei.com/post/we-must-pace-the-frontier) — Dario Amodei (2026). This essay proposes embedded independent evaluators, common pacing requirements among democratic countries, and efforts towards wider international agreements. It favours requirements tied to what models can do and the safeguards demonstrated for them. Its conception of independent assessment is broader than capability testing alone: evaluators would also examine safety practices and evidence about alignment.

These cases differ in ambition, scope and assumptions about political cooperation. The next comparison asks how they use particular tools, before examining what those tools can deliver.

## 4. How central each tool is to the proposals

The table records the role assigned to each tool in the selected proposals. It describes their designs, rather than ranking effectiveness or establishing a policy consensus.

Rows are ordered by a weighted count: Core = 1, Partial = 0.5 and Option = 0.2, with ties resolved by the number of Core entries. The weights organise the comparison; they do not measure evidential strength.

| Order | Tool | MIRI agreement | AI 2040: Plan A | Building the Pause Button | Hardwired Pause | Amodei |
|---|---|---|---|---|---|---|
| 1 | Chip production ledger | Core | Core | Core | Core | — |
| 2 | Physical chip inspection | Core | Core | Option | Core | — |
| 3 | Interconnect bandwidth cap | Option | Core | Core | Partial | — |
| 4 | Independent capability evaluation | Partial | Partial | Partial | Core | Option |
| 5 | Cloud workload metering | Partial | Partial | Option | Partial | — |

**Core:** central or required. **Partial:** a broader or closely related check is discussed. **Option:** described as a possibility without commitment to that specific mechanism. **—:** not identified as a verification mechanism in the proposal as coded here.

Classifications refer to the specific tools assessed here. Amodei's embedded evaluators are a substantial commitment, while his capability-checkpoint scheme remains an option. Broader compute reporting is likewise distinguished from project-level cloud metering. Sources and context accompany each tool.

## 5. Verification tools

The tools address different parts of the problem. The first two establish an inventory and check its physical counterpart. The remaining three examine capabilities, restrict communication or account for compute use.

**Chip production ledger.** A register of covered AI chips from production through transfers to verified destruction. It helps establish how much computing capacity exists and where it should be, but does not establish what that capacity is used for.

**Physical chip inspection.** On-site checks of hardware, identifiers, records and physical controls. Inspections test declarations and can support shutdown or configuration requirements; periodic visits provide only limited evidence about activity between visits.

**Independent capability evaluation.** External testing of a specified model and configuration. Evaluations can inform decisions about further development or release, but test results do not establish that all relevant capabilities have been found or all relevant models submitted.

**Interconnect bandwidth cap.** A restriction on communication between groups of AI chips. It can impede training that relies on frequent exchanges while preserving some inference workloads. Its effect depends on cluster design, permitted exceptions and available training methods.

**Cloud workload metering.** Provider records linking customers and projects to compute use. Metering can support reporting thresholds or allocation limits, but needs additional arrangements to cover self-operated capacity and activity split across providers.

## 6. Trade-off map

The map places each tool according to our assessment of its invasiveness for AI labs and its ability to support detection and enforcement. Markers may represent several tools with the same scores. Moving left indicates less intrusion; moving up indicates stronger assessed verification within the configuration described on the tool's page.

These are qualitative judgements on an ordinal scale, not measured probabilities of detecting a violation. The tools also verify different claims: confirming a chip inventory is different from establishing the absence of a dangerous capability. Position on the map therefore does not establish an overall ranking. Relevance to the agreement, coverage, durability and the costs of supporting tools must also be considered.

The map is best used to identify questions for closer examination: what assurance does a tool buy, about which activity, and at whose expense?

## 7. Explore a verification package

The package explorer uses the assessments in this note to illustrate how different priorities change the selection of tools. Choose up to three priorities and a preferred limit on invasiveness. The explanation shows which tools meet the scoring rule, which are added as supporting measures, and what trade-offs follow.

The result is a starting point for discussion. It does not estimate the combined probability of detecting violations, the total cost of a regime or the likelihood that states would accept it. Several tools may share the same blind spot, and a package can require more access than any headline mechanism suggests.

**Supporting measures in the configuration assessed here:**

- **Physical chip inspection is linked to the chip ledger.** The ledger supplies the declared inventory against which inspectors check a facility. Inspections can also use other records or investigate suspected sites, so this is a design choice for the explorer rather than a universal prerequisite for inspection.
- **A physical interconnect cap is linked to inspection.** Inspectors check network layouts and physical restrictions. Seals, monitoring or other controls are needed to maintain confidence between visits; a visit alone cannot establish that cables will remain disconnected afterwards.

The current explorer adds supporting tools even when they exceed the selected invasiveness limit, and flags the conflict. This indicates an unresolved trade-off: the package exceeds the limit.

## 8. Policy implications

The comparison suggests a practical sequence for policymakers considering a pacing agreement.

**First, specify the prohibited activity and the evidence needed to assess compliance.** A restriction on chip holdings, a cap on training compute and a release gate require different checks. Parties also need to decide how much undetected activity would threaten the agreement's purpose, how quickly it must be detected, and how an ambiguous result will be investigated.

**Second, establish a credible picture of covered capacity.** Ledgers, reconciled supply-chain records and inspections can make declarations more credible. Their value depends on bounding omissions, including legacy chips and undeclared sites, rather than assuming a complete inventory. Pilots should test missing records, false identifiers, unreported transfers and refusal of access.

**Third, match controls on use to the restriction.** A ledger cannot establish that registered chips are not training. Cloud metering can support compute limits within its scope; physical network restrictions may impede selected forms of training; evaluations can inform capability-based gates. Each needs an explicit account of the activity it leaves possible. For a development pause, that account must include internal use of models and improvements through post-training and elicitation.

**Fourth, negotiate information protection and authority alongside access.** Agreements should define what inspectors and evaluators may examine, what information may leave a site, who can halt activity, and how decisions can be challenged. Reciprocal obligations and managed access may make verification more acceptable. Broad exemptions for sensitive sites may instead undermine the assurance the agreement is meant to provide.

**Finally, plan for change and exit.** Review thresholds as algorithms and hardware improve. Test the regime against determined circumvention, and distinguish an orderly relaxation of limits from a withdrawal of access or sudden breakdown. Restrictions may leave substantial computing capacity or unreleased models ready for use; ending the monitoring procedure does not eliminate that overhang.

The immediate priority is to test whether a specified set of obligations and checks can provide decision-relevant assurance at an acceptable cost. The tool pages below explain where each mechanism could contribute and where additional evidence would be needed.

## Intervention pages

### Chip production ledger

**Introduction.** A chip ledger records covered AI chips from manufacture through changes of ownership, control and location to verified destruction. By reconciling records from producers, distributors and operators, it helps establish the size and distribution of the computing capacity subject to an agreement.

The ledger records stocks, rather than activity. It defines the population that other checks must cover, or supports rules directly limiting production, holdings or location. It does not show what registered chips computed.

**Readiness.** Inventory systems and commercial records are available today. A comprehensive, independently credible international register would also require common definitions, audit arrangements and political agreement on access to sensitive records.

**Incentives and possible responses.**

- **AI labs:** Existing asset records can lower compliance costs, but chip counts and locations still reveal investment plans. Labs may seek confidential reporting, higher thresholds or arrangements based on their providers' records.
- **Chip and cloud firms:** Registration may be attractive when market access or operating licences depend on it. Firms have reasons to resist disclosure of customer relationships and commercially sensitive flows.
- **A leading state:** A ledger may help preserve an advantage, but reciprocal reporting would expose its own infrastructure and could limit future expansion.
- **A trailing state:** A regime perceived as freezing a rival's lead creates incentives to withhold records or retain unregistered stock. Reciprocity, access to permitted services and incentives to disclose legacy holdings may improve participation.

**Contribution to pacing.** Under a production or stock cap, a ledger supplies evidence about compliance with a direct limit on available hardware. Under a training cap, its role is supporting: it helps identify the capacity whose use must be checked and investigate discrepancies that could indicate hidden clusters. Restrictions and consequences for non-compliance must come from the agreement itself.

MIRI links registration to consolidation in monitored facilities. AI 2040 uses accounting to reduce uncertainty before a pause. Hardwired Pause uses unaccounted capacity to assess how long restraint could remain effective.

Tracking new production is facilitated by the concentrated advanced-chip supply chain. Establishing a reliable starting inventory is harder, especially for equipment already resold, diverted or held outside transparent commercial systems. A register's completeness should therefore be reported as an estimate with explicit gaps. Even a small omitted fraction may matter if it can support a strategically significant programme.

Algorithmic improvements, post-training and better elicitation can also improve systems without a new frontier-scale pretraining run. A hardware inventory does not independently reveal those gains.

**Failure scenarios.**

- **Incomplete starting inventory.** Legacy or diverted chips never enter the register, creating a blind spot inherited by later checks.
- **False transfers or disposals.** Intermediaries obscure control; equipment reported as destroyed, broken or exported remains usable elsewhere.
- **Threshold avoidance.** Holdings are split across sites or organisations, or uncovered hardware is substituted for registered chips.
- **Misinterpreted discrepancies.** Missing records may reflect error or evasion. A discrepancy identifies a question to investigate, rather than proving where hidden activity occurs.
- **Supply-chain fragmentation.** Non-participants develop alternative production and distribution channels beyond the registry's reach.

**Regulatory burden and safeguards.** A registry authority would set reporting standards, reconcile records and investigate anomalies. Automated reporting could reuse sales, customs and asset records, although serial-level tracking across repairs, transfers and retirement adds work. Consolidation and physical checks are additional obligations and should be costed separately.

Confidential reporting and tiered access can reduce exposure: detailed records for authorised verifiers, with only the information necessary for reciprocal assurance shared more widely. Data retention, permitted uses and oversight of the registry body should be specified from the outset.

**Policy implication.** Pilot the ledger, measure its omissions and discrepancies, and attach it to a specified rule. Registration must be supplemented by usage checks where compliance depends on what chips compute.

**Sources.** [MIRI agreement, Articles V–VI](https://arxiv.org/html/2511.10783v3); [AI 2040 verification plan](https://ai-2040.com/supplements/verification-plan); [Hardwired Pause](https://hardwired-pause.ai/); [Sastry et al. (2024), *Computing Power and the Governance of Artificial Intelligence*](https://arxiv.org/abs/2402.08797).

### Physical chip inspection

**Introduction.** Physical inspection checks whether equipment and controls at a facility match its declarations. Inspectors may sample chips, verify identifiers, compare hardware with purchase records, and examine seals or network configurations. These checks provide an independent counterpart to the paper trail in a chip ledger.

A periodic visit gives limited evidence about activity before and after it, or at undeclared sites. Continuous monitoring and inspections of suspected sites can strengthen assurance, at additional political and operational cost.

**Readiness.** Counting, sampling and record reconciliation are established practices. Credible international application depends on negotiated access, independent choice of samples and methods that resist deception without causing disproportionate disruption.

**Incentives and possible responses.**

- **AI labs:** Narrow inventory checks may be acceptable; downtime and access to security arrangements or proprietary work create resistance as scope expands.
- **Chip and cloud firms:** Passing inspection may preserve operating rights, but visits affect staff, service availability and the confidentiality of other customers.
- **A leading state:** Reciprocal access may build confidence in a rival's restraint, while exposing sensitive domestic and military infrastructure.
- **A trailing state:** The same assurance benefits apply, alongside incentives to shield strategic sites or retain undeclared capacity if restrictions are viewed as unequal.

**Contribution to pacing.** Inspections can verify physical conditions relevant to a restriction: whether declared chips are present, whether stored equipment remains sealed, or whether specified network links have been removed. Factory inspections can also support production limits. These are stronger claims than checking an inventory alone, but they remain dependent on the protocol and the period covered.

The selected proposals combine inspections with declarations and other evidence. Their configurations range from periodic visits to resident inspectors and continuous monitoring, with correspondingly different costs and assurance.

For a training pause, an inspection needs a clear connection to the restriction being enforced. Observing powered-down equipment during a visit is insufficient if it can be restarted immediately afterwards. Similarly, checking cabling gives little assurance if the operator can restore prohibited links without detection. Seals, cameras, access controls or repeated unpredictable checks may narrow these gaps.

Supply-chain records and other information must also direct attention to suspected omissions. Otherwise, thorough inspections of declared facilities may coexist with substantial covert activity elsewhere.

**Failure scenarios.**

- **Undeclared locations.** Equipment remains outside the set of sites inspectors can visit.
- **Preparation for announced visits.** Hardware or connections are moved or altered before arrival and restored afterwards.
- **Superficial identity checks.** Labels, boxes or reported serial numbers are accepted without sufficient assurance that they correspond to the actual equipment.
- **Gaps in continuity.** Seals or monitoring fail to reveal movement, reactivation or changes between visits.
- **Delayed or refused access.** An agreement provides inspection rights without timely procedures or credible consequences when access is denied.
- **Information compromise.** Inspectors obtain more sensitive information than the compliance task requires, or the parties fear that they might.

**Regulatory burden and safeguards.** An inspectorate needs trained staff, secure information handling, equipment and access procedures. Costs depend on site dispersion, sampling intensity, notice periods and whether equipment must be taken offline. Standing monitoring and inspections of suspected hidden sites are materially more demanding than periodic inventory audits.

Protocols should state what inspectors may examine, how samples are selected, what information may be recorded and what happens when a finding is disputed. Reports should distinguish verified observations, inaccessible areas and unresolved questions. Automated location checks could eventually reduce routine visits, while leaving physical inspection available to investigate alerts and test the monitoring system itself.

**Policy implication.** Pilot inspections against adversarial scenarios, negotiate access and continuity measures together, and state precisely what the resulting evidence permits parties to conclude.

**Sources.** [MIRI agreement, Articles V, VII and X](https://arxiv.org/html/2511.10783v3); [Scher and Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf); [CSET (2026), *Tracking AI Chips*](https://cset.georgetown.edu/publication/tracking-ai-chips/).

### Independent capability evaluation

**Introduction.** An independent capability evaluation tests a specified model under stated conditions. Assessors may examine capabilities relevant to cyber operations, biological misuse or autonomous AI research, using tasks ranging from benchmarks to extended simulations. The outcome is evidence about demonstrated performance, with uncertainty about capabilities the tests did not elicit.

Evaluations can reveal gains from algorithms, post-training and better tools that hardware accounting misses. Failure to demonstrate a capability does not establish its absence. Capability also contributes to risk alongside access, safeguards and the setting in which a system is used.

**Readiness.** Independent testing is already practised. Using it as a high-confidence basis for binding international restrictions requires stronger arrangements for access, model identity, coverage, replication and decisions under uncertainty.

**Incentives and possible responses.**

- **AI labs:** Predictable, confidential testing can support credible safety claims. Costly delays, deeper model access or inconsistent treatment create incentives to contest thresholds, narrow access or optimise for known tests.
- **Chip and cloud firms:** Their role grows where they host secure testing or help verify the identity and configuration of deployed models.
- **A leading state:** Domestic testing may be attractive, while foreign access to valuable models raises security concerns.
- **A trailing state:** International recognition of domestic assessments may support participation; concerns about unequal standards and disclosure can also encourage resistance. Any state may face incentives to favour its national developers.

**Contribution to pacing.** An evaluation provides a signal; a decision rule determines its effect. Three uses should be distinguished:

- **Recalibrating compute limits:** Tests show what a given amount of compute can achieve, informing revisions as methods improve.
- **Gating release or access:** A model cannot be released, or made available to particular users, without meeting agreed requirements. This can pace diffusion while allowing internal development to continue.
- **Gating further development:** Repeated assessments trigger restrictions on additional training or other specified development activity. This can act on capability growth more directly, provided relevant models and activities are covered.

MIRI authorises monitoring of permitted development and responses to concerning capabilities. Hardwired Pause evaluates models for permission to be served. Building the Pause Button uses evaluations to inform compute thresholds, while Amodei favours capability-linked requirements within a broader safety assessment.

The benefit depends on test validity and the configuration examined. A fingerprint of weights helps establish model identity; separate evidence is needed to check the tools, software and operating conditions, and to identify models never submitted.

**Failure scenarios.**

- **Unrepresentative model or configuration.** A weaker checkpoint is submitted, or approval is extended to a materially changed system without renewed testing.
- **Incomplete elicitation or deliberate underperformance.** Assessors lack the time, expertise or access to draw out capabilities, or the developer or model conceals them.
- **Missing models and internal uses.** A release-only regime overlooks models used privately, including for AI research, while a development gate misses unreported checkpoints.
- **Narrow or compromised tests.** Known test sets become optimisation targets; contamination and gaps in threat modelling weaken the connection to real-world performance.
- **Weak institutional independence.** Funding, access or national interests shape what assessors can test and how uncertain results are interpreted.

**Regulatory burden and safeguards.** A regime needs qualified assessors, secure testing environments, sufficient access and explicit decision rules. These should specify how inconclusive results are handled, which changes require reassessment and how findings can be challenged. Independent replication and protected test sets can strengthen confidence, although they do not eliminate uncertainty.

Confidentiality can be tiered: public summaries, restricted technical findings and tightly protected model access. International cooperation may rely on mutually recognised domestic assessors, joint teams or secure shared facilities. Each arrangement leaves different trust requirements.

**Policy implication.** Specify the decision and the evidence required. For a development restriction, identify covered models and monitor development activity as well as testing capabilities. A favourable result is not a general safety certificate.

**Sources.** [MIRI agreement, Articles IV and XIII](https://arxiv.org/html/2511.10783v3); [Building the Pause Button](https://arxiv.org/abs/2506.20530); [Hardwired Pause](https://hardwired-pause.ai/); [Amodei (2026)](https://darioamodei.com/post/we-must-pace-the-frontier); [Scher and Thiergart (2024)](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf).

### Interconnect bandwidth cap

**Introduction.** Large-scale training often requires frequent exchanges of data between chips or groups of chips. A bandwidth cap restricts these exchanges. If the cap is sufficiently tight, covers all relevant communication paths and limits the size of unrestricted groups, it can make some forms of distributed training impractically slow while allowing some existing AI services to continue.

The mechanism relies on differences between workloads. It does not create a universal technical boundary between training and inference. Some inference systems need substantial communication, while some training and post-training methods need much less than conventional distributed pretraining.

**Readiness.** Software prototypes and simple physical restrictions are available. Their existence does not establish that a cap is robust against a determined operator. More secure implementations require further engineering, adversarial testing and verification of facility-wide coverage.

**Incentives and possible responses.**

- **AI labs:** Operators may accept restrictions that preserve permitted services. Developers seeking further capability gains may shift towards unrestricted groups, alternative sites or methods requiring less communication.
- **Chip and cloud firms:** Continued inference revenue can support participation, while reduced flexibility and the loss of training business create costs.
- **A leading state:** Low disclosure may be attractive, but a cap can also constrain its own research and infrastructure investments.
- **A trailing state:** Participation depends in part on whether permitted services and future access are acceptable. A regime that fixes an unfavourable capability gap increases incentives to seek workarounds.

**Contribution to pacing.** A physical cap is a restriction as well as a verification mechanism: while intact, it limits what the covered network can do. Its immediate target is the efficient combination of many chips for communication-intensive work. It neither counts total computation nor establishes the absence of training elsewhere.

A [2026 proof-of-concept study](https://techgov.intelligence.org/blog/de-risking-interconnect-limits-for-ai-verification) found substantial differences between the training and inference traffic it tested. It also detected the tested DiLoCo workload despite its lower total communication. These results support further investigation, but the authors identify major limitations and do not present the prototype as ready for production. Particular traffic ratios should not be interpreted as a general estimate of how much a cap would slow frontier development.

The proposals place caps at different boundaries: around data centres, between servers or between smaller groups of chips. Each leaves an unrestricted interior that may retain useful training capacity. Group-size limits and controls on exceptions, such as loading models, are central to the design.

**Failure scenarios.**

- **Training within unrestricted groups.** A server or tightly connected pod remains large enough to support prohibited work.
- **Lower-communication methods.** Developers reduce or reorganise exchanges, weakening a fixed cap without physically tampering with it.
- **Uncovered paths.** Additional network devices, shared storage or other channels carry data outside the monitored boundary.
- **Uncontrolled exceptions.** Legitimate high-bandwidth operations, such as loading weights, provide opportunities for prohibited communication.
- **Untrusted monitoring.** An operator falsifies software reports or changes the configuration after inspection.
- **Activity outside the boundary.** Permitted services generate data or other inputs used for training at an uncapped site.

**Regulatory burden and safeguards.** Regulators need a verified network map, a definition of the restricted boundary, rules for configuration changes and evidence that alternative paths are covered. Physical inspection and continuity measures may be required. Software alerts alone offer weaker assurance when the operator controls the reporting system.

The cap may disclose little about models or data, but still impose substantial operational restrictions. Large inference workloads and scientific computing can also be affected. Those costs, and the access needed to verify the supporting controls, belong in the assessment of the full package.

**Policy implication.** Test permitted workloads and adversarial training methods. Pair the cap with capacity accounting and measures addressing undeclared sites. Review it as methods change, and plan for training capacity to return when restrictions end or are bypassed.

**Sources.** [Scher, Sarbakysh and Moskvin (2026), *De-risking Interconnect Limits for AI Verification*](https://techgov.intelligence.org/blog/de-risking-interconnect-limits-for-ai-verification); [Building the Pause Button](https://arxiv.org/abs/2506.20530); [AI 2040 verification plan](https://ai-2040.com/supplements/verification-plan); [Scher and Thiergart (2024)](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf).

### Cloud workload metering

**Introduction.** Cloud workload metering links a customer and project to records of compute use. Providers already record resource allocations for billing and operations. A verification regime could build on those records by adding common counting conventions, customer identification, project identifiers and reporting requirements.

Metering can support an alarm or a limit on further allocations when a project approaches a threshold. Billing data alone, however, does not reliably establish the purpose of every workload. The scope of the reporting duty also matters: capacity operated by a developer for its own use is not automatically covered by obligations imposed on providers serving external customers.

**Readiness.** Resource accounting is established. Consistent project-level accounting across providers, accurate treatment of actual computation and credible verification against determined evasion require additional arrangements.

**Incentives and possible responses.**

- **AI labs:** Reusing provider records can reduce effort, but compute volumes and timing reveal strategy. Developers may seek confidential reporting or move work to arrangements outside the rule's scope.
- **Chip and cloud firms:** Common obligations reduce the competitive disadvantage of compliance. Providers may resist costs, liability and demands for sensitive customer information.
- **A leading state:** Domestic provider reporting can improve visibility, while reciprocal access to its own providers' records creates confidentiality concerns.
- **A trailing state:** A regime perceived as extending another state's export controls may face resistance. Agreed reporting standards and protected channels can improve the prospects for cooperation.

**Contribution to pacing.** Metering can support a compute cap for covered cloud projects when providers report honestly, related activity is aggregated and exceeding the threshold has an agreed consequence. Reporting alone supplies information; an allocation limit or other binding rule supplies restraint.

Two boundaries are especially important. First, account-level data must be linked to the project that the rule governs. A model's development may involve several accounts, affiliates, providers and stages of training. Second, reporting obligations must address equivalent activity on self-operated or dedicated infrastructure if that activity is relevant to the agreement. Ownership alone is an unreliable guide to whether capacity is covered.

Metering complements the ledger's hardware records with records of use. Both can identify activity for further scrutiny, including evaluation, while leaving questions about whether a workload has its declared purpose.

Providers can be useful intermediaries, as argued in [*Governing Through the Cloud*](https://arxiv.org/abs/2403.08501). Coverage restricted to external customers, however, may constrain cloud-dependent researchers more than developers with dedicated infrastructure.

**Failure scenarios.**

- **Fragmented projects.** Related work is split across accounts, companies or providers, defeating thresholds applied separately to each.
- **Activity outside scope.** Development moves to self-operated capacity, exempt arrangements or non-participating jurisdictions.
- **Misleading workload labels.** Compute is accurately counted but assigned to an incorrect or insufficiently precise category.
- **Inconsistent accounting.** Providers measure allocations, utilisation and operations differently, making reports difficult to combine or compare.
- **Unreliable reporting.** A provider understates activity, or an integrated developer is effectively asked to verify itself without independent checks.
- **Sensitive record accumulation.** Project-level data becomes a source of commercial intelligence or a target for espionage.

**Regulatory burden and safeguards.** Regulators need counting standards, aggregation rules, audit rights and procedures for investigating anomalies. Providers need reliable identity and project records, proportionate retention requirements and clarity about what triggers a report or suspension. Cross-provider reconciliation can improve coverage while increasing confidentiality and coordination demands.

Reporting can be narrowed to information needed for the claim, with more detailed access reserved for defined investigations. Extending duties to self-operated capacity would require explicit obligations and independent assurance; it does not follow automatically from cloud metering.

**Policy implication.** Resolve project aggregation and self-operated-capacity gaps before relying on a cloud-based cap. Lifting reporting is straightforward, but removing a binding cap may still release accumulated capacity for use.

**Sources.** [Heim et al. (2024), *Governing Through the Cloud*](https://arxiv.org/abs/2403.08501); [Sastry et al. (2024)](https://arxiv.org/abs/2402.08797); [Building the Pause Button](https://arxiv.org/abs/2506.20530).

## 9. Appendix

### How we assess the tools

The website summarises six criteria on five-point meters. Dots indicate benefits; squares indicate costs. These are the authors' structured judgements, informed by the sources on each tool's page. They are not empirical estimates, and differences between adjacent scores should not be interpreted as precise differences in performance.

Each assessment refers to a particular configuration. A ledger is assessed as a reconciled register supporting rules on compute; inspection as periodic checks of declared sites backed by records and continuity measures; evaluation as testing that can inform release or development gates; bandwidth limits as physical restrictions at declared sites; and metering as provider-based identification and compute accounting. More intrusive or technically ambitious versions may perform differently.

**Relevance to pacing** asks how the rule supported by a tool could constrain capability progress if respected. The framework considers four routes: more training compute, better algorithms, more elaborate post-training, and better elicitation of existing models. These routes overlap and their importance changes. Counting them is a qualitative guide to substitution opportunities, rather than a prediction of time gained. A release gate and a development gate should also be distinguished, since they constrain different outcomes.

| Criterion shown on the site | Low / light: scores 1–2 | Medium / moderate: score 3 | High / heavy: scores 4–5 |
|---|---|---|---|
| Relevance to pacing | The supported rule has limited bearing on capability progress, or partly constrains one route | The supported rule directly constrains one route, while substantial substitution remains | The supported rule constrains a route with less substitution, or addresses several routes; the highest score requires broad limits with little substitution |
| Reaches the right actors | Limited reach or substantial restrictions on beneficial activity | Reaches declared or large actors, with material gaps or spillovers | Broad reach across relevant actors with relatively limited spillovers |
| Detects violations | Weak ability to identify breaches of the specified obligation | Useful checks on declared or large activity, with important blind spots | Timely, credible detection and a credible or automatic enforcement mechanism |
| Holds up over time | Vulnerable to changing circumstances or difficult to end safely | Adaptable, but requires active review and maintenance | Designed to adapt, with manageable exit and overhang risks |
| Burden on government | Relatively limited reporting and oversight | New regulatory capacity and periodic audits | Extensive inspection, international coordination or hardware certification |
| Invasiveness for AI labs | Limited additional effort, disclosure or external control | Noticeable compliance costs or strategically sensitive access | Major disruption, deep proprietary access or substantial external control |

The “Detects violations” score summarises both verification and enforceability in the current framework. Evidence of a breach and the capacity to respond are distinct requirements; neither should be assumed from the other. Similarly, the coverage score combines reach and targeting, while the robustness score combines adaptation and exit. The accompanying explanations are necessary to interpret these summaries.

**Invasiveness** includes compliance effort, proprietary information revealed and loss of operational control. Its distribution matters: a measure that is relatively light for an AI developer may be more demanding for its cloud provider, chip supplier or host state. Supporting mechanisms can also raise the intrusiveness of a package beyond that of its most visible component.

**Actor responses** describe incentives under stated conditions. Cooperation, circumvention and attempts to weaken a rule are possibilities whose likelihood depends on reciprocity, relative gains, confidentiality, compensation and enforcement. Being ahead or behind in AI does not determine compliance. Improving efficiency within an agreed rule is also different from violating it, even where it reduces the rule's pacing effect.

**Readiness** distinguishes established components from a credible regime built around them. Existing inventories, inspection practices, billing systems and evaluation exercises do not establish that an international agreement can already achieve its desired level of assurance. Hardware-enabled guarantees may eventually change the comparison, but are outside the five-tool assessment presented here.

### How the package explorer works

The explorer applies a transparent selection rule to the existing scores:

1. Each criterion receives weight 1; a selected priority receives weight 3. Users may select up to three priorities.
2. Cost scores are reversed so that lower burden and invasiveness improve the result.
3. Each tool receives a weighted average on the resulting one-to-five scale. Tools above the selected invasiveness limit are initially excluded.
4. Remaining tools with an average of at least 3 are selected. If none reaches that threshold, the highest-scoring eligible tool is shown with an explanation.
5. Supporting tools are added according to the stated dependencies, including where they exceed the preferred invasiveness limit. Such conflicts are flagged.

The weighting and selection threshold are illustrative choices. Averaging ordinal scores assumes that gains on one criterion can compensate for losses on another, and that the scale can be used arithmetically. Results should therefore be read alongside the individual judgements and the effect of alternative priorities.

The explorer does not optimise a verification regime, aggregate package costs or calculate the value of combining tools. It also does not model strategic bargaining or technological change. Its purpose is to make the assumptions behind a possible selection easier to inspect.

### Scope and limitations

This note focuses on five tools used or discussed in selected pacing proposals. It does not provide a comprehensive assessment of verification methods, compare the overall merits of the proposals, or estimate the net benefits of pacing. Intelligence, whistleblowing, legal enforcement, hardware security and benefit-sharing may be essential to an agreement without appearing as separately scored tools here.

The analysis distinguishes source descriptions from the authors' assessments and recommendations. Numerical thresholds in proposal summaries are features of those proposals. The assessments should be reviewed as technical evidence, deployment practices and the policy context change.

### Glossary

- **Pacing:** Deliberately moderating the development, deployment or spread of AI capabilities, for example to allow more time for safety work and institutional adaptation.
- **Verification:** Gathering and assessing evidence to increase confidence that agreed obligations are being met. It need not eliminate all uncertainty.
- **Assurance:** The degree of justified confidence in a specified claim, based on the evidence and assumptions supporting it.
- **Enforcement:** Measures that prevent a breach or impose consequences for non-compliance. Detection alone does not establish that enforcement is credible.
- **Compute:** Computation or computational resources. A policy must distinguish installed processing capacity, allocated chip-time and operations actually performed.
- **FLOP:** Floating-point operation, a basic numerical operation. A total FLOP count measures an amount of computation; FLOP per second measures a rate.
- **H100-equivalent:** A convention for comparing processing capacity with that of an Nvidia H100. Results depend on the performance metric used and do not capture every hardware characteristic relevant to a workload.
- **Frontier AI:** AI systems near the leading edge of capability at a given time. Different capabilities may have different frontiers.
- **Training:** Updating a model's parameters using data and computation. Pretraining and post-training are stages of this process.
- **Post-training:** Further training of an existing model, including methods intended to improve instruction following, reasoning or performance on particular tasks.
- **Inference:** Running a trained model to produce outputs. General-purpose hardware used for inference may also support training unless additional restrictions prevent it.
- **Elicitation:** Methods that draw out a model's capabilities, such as prompting, tools, supporting software and additional computation at inference time.
- **AI chip:** A processor used for AI workloads. Regulatory coverage requires an operational definition, since the boundary between AI and other computing hardware is not absolute.
- **Cluster:** A group of connected chips or servers that can work together on a workload.
- **Pod:** In this note, a tightly connected group of chips within which communication remains unrestricted under a bandwidth cap. Its permitted size is a design choice.
- **Data centre:** A facility housing computing equipment and its power, cooling and networking infrastructure.
- **Cloud provider:** A company supplying computing capacity or services to customers, including through shared or dedicated infrastructure.
- **Model weights:** Numerical parameters learned during training. Running the model also requires suitable software and computing resources.
- **Model fingerprint:** An identifier, often a cryptographic hash, used to check whether specified model files match. It does not by itself verify the full system configuration or all uses of the model.
- **Census:** An exercise to establish the stock of covered hardware already in existence at a specified time.
- **Undeclared compute:** Computing capacity or activity omitted from the declarations required by an agreement. Its strategic significance depends on what it can accomplish.
- **Bandwidth:** The rate at which data can be transferred over a connection.
- **Network tap:** A device that copies network traffic for observation. Unlike a volume-only monitor, it may expose the content of communications.
- **Firmware:** Software embedded in a hardware device that controls aspects of its operation.
- **Tamper-evidence:** Features intended to reveal interference. Their presence does not establish that all tampering will be detected.
- **Managed access:** Inspection arrangements intended to provide compliance-relevant evidence while protecting unrelated sensitive information.
- **Hardware-enabled guarantee:** A proposed or implemented mechanism using hardware security to substantiate or enforce a specified claim about computation. Assurance depends on its design, deployment and resistance to attack.
- **Overhang:** Accumulated resources, models or knowledge that could permit a burst of capability progress when restrictions end or are bypassed.
- **Leading and trailing states:** Simplified labels for states ahead or behind on a specified dimension of AI capability or infrastructure. Relative position does not imply a particular willingness to cooperate.
- **Export controls:** Government restrictions on transfers of specified goods, technologies or services. Their objectives and coverage may differ from those of a reciprocal pacing agreement.
- **AI safety or security institute:** A public institution that evaluates AI systems or researches their risks and safeguards. Responsibilities vary across institutions.
- **Lithography machine:** Equipment used to pattern features during semiconductor fabrication.
- **MIRI agreement:** A proposed international agreement combining training and research restrictions with chip tracking and verification of chip use.
- **AI 2040: Plan A:** A policy scenario recommending an international agreement on the development of advanced AI, supported by extensive transparency and verification.
- **Building the Pause Button:** A proposal to establish the governance and technical capacity for an enforceable pause before one is needed.
- **Hardwired Pause:** A feasibility study of pausing frontier training through chip accounting, licensing and a transition towards hardware restricted to approved inference.
- **We Must Pace the Frontier:** Amodei's essay proposing embedded evaluators and progressively wider coordination on pacing, with an emphasis on capability-linked requirements.
