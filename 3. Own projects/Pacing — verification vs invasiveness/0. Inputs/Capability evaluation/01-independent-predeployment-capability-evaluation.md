# 01. Independent predeployment capability evaluation

*Technical surface: model evaluation. Typical pacing uses: capability thresholds, release gates, and conditions on further training. Discussion prominence: high; this ordering is qualitative, not a citation count.*

## Page 1 of 3 — What the mechanism measures

<!-- snapshot:start -->

**Mechanism at a glance**

| Field | Summary |
| --- | --- |
| What it does | Run benchmarks, bottleneck tests and controlled threat simulations on a fixed model version. |
| Checks and why | Performance on specified risk tasks; to check whether capability thresholds are crossed. |
| Pacing policy families | Capability limits; Release limits |
| Direct proposals | [Scholefield et al., Conditional AI Safety Treaty](https://arxiv.org/html/2503.18956); [Miotti, Taking Control](https://arxiv.org/abs/2310.20563) (model audits and affirmative evaluations; independence varies by design) |
| Broader verification frameworks | [Scher & Thiergart, Mechanisms to Verify International Agreements About AI Development](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf) |
| Literature | [Frontier Model Forum, Frontier Capability Assessments](https://www.frontiermodelforum.org/technical-reports/frontier-capability-assessments/); [Frontier Model Forum, Preliminary Taxonomy of Pre-Deployment Frontier AI Safety Evaluations](https://www.frontiermodelforum.org/updates/issue-brief-preliminary-taxonomy-of-pre-deployment-frontier-ai-safety-evaluations/); [Frontier Model Forum, Third-Party Assessments](https://www.frontiermodelforum.org/technical-reports/third-party-assessments/) |
| Technical feasibility | **Medium** — Common practice is emerging; elicitation, contamination and validity limit assurance. |
| Policy and strategy feasibility | **Medium** — Labs may accept confidential evaluation but dispute thresholds or evaluator access. |

<!-- snapshot:end -->

An independent capability evaluation gives an assessor controlled access to a specified model or system before a covered decision. The assessor runs tasks chosen to reveal whether the system can perform actions associated with a policy threshold: for example, sustained cyber operations, assistance with dangerous biological work, or autonomous completion of complex tasks. The output is evidence about tested behavior under stated conditions. It is not a general certificate that the model is safe. The [Frontier Model Forum's capability-assessment report](https://www.frontiermodelforum.org/technical-reports/frontier-capability-assessments/) distinguishes relative assessments, bottleneck assessments, and threat simulations; those approaches can be combined rather than treated as mutually exclusive.

The first design decision is the *claim*. “The model does not cross a concerning cyber threshold” is too vague to verify. A usable claim names a domain, actor, resources, time horizon, success criterion, elicitation budget, and level of assistance. In a pacing regime, the claim might be that a checkpoint remains below a predefined threshold, or that an additional training phase can proceed only after a particular safeguard is shown to work. A benchmark score can screen for change, but a decisive assessment should also test the real bottlenecks in the threat model. A system that answers isolated questions may still fail at end-to-end planning; a system that fails a short benchmark may succeed with tools, scaffolding, or a human collaborator.

The object being evaluated must be identified precisely. The assessor should record the weight or checkpoint digest where available, model and system versions, prompt template, sampling settings, tools, access permissions, safety filters, and any test-time fine-tuning. It should establish whether the developer can change the served model during the assessment. The result applies to that configuration and a specified class of nearby configurations, if justified. It cannot automatically cover a more heavily scaffolded agent or a later checkpoint.

Independent evaluation can mean several levels of separation. An external team may design and run tests on a developer-hosted endpoint; it may inspect the developer's methods and reproduce samples; or it may obtain sufficiently direct access to run its own methods. The [FMF report on third-party assessments](https://www.frontiermodelforum.org/technical-reports/third-party-assessments/) separates confirmation, robustness testing, and supplementation. The stronger the claim, the more valuable it is for the assessor to choose at least some tasks without revealing them in advance.

<div style="break-after: page; page-break-after: always;"></div>

## Page 2 of 3 — How it would verify a pacing rule

A pacing protocol would start with a trigger and a decision rule. The trigger might be a new checkpoint, a material post-training change, access to new tools, or an increase in benchmark performance. The decision rule should specify what happens when evidence is positive, negative, or inconclusive. An inconclusive result cannot quietly be treated as a pass: it may require more testing, a narrower deployment, or continued restraint. The protocol should also specify whether the developer may keep training while evaluation is underway. Without this, the tested checkpoint can cease to be the relevant frontier model before a verdict arrives.

The practical workflow has five stages. First, developer and assessor register the model version and the claimed operating configuration. Second, they agree on secure access and permissible testing, including what data can leave the environment. Third, the assessor conducts a mixture of repeatable benchmarks, expert-designed probes, and longer threat simulations. Fourth, it reviews failures and successes, including whether the model exploited shortcuts in the test environment. Fifth, a decision body records the evidence, uncertainty, restrictions, and the precise condition that would require reassessment. The [FMF preliminary taxonomy of predeployment evaluations](https://www.frontiermodelforum.org/updates/issue-brief-preliminary-taxonomy-of-pre-deployment-frontier-ai-safety-evaluations/) explains why benchmark and red-team methods answer different questions.

For comparability, the evaluation should preserve test artifacts: task definitions, prompts, tool traces, grading criteria, human interventions, and version metadata. Confidentiality matters; full publication of dangerous tasks can contaminate later tests or expose sensitive techniques. A useful reporting model therefore has a public summary of scope and conclusions, a restricted technical annex for qualified oversight, and a protected record of the actual test set. Independent assessors need authority to report material limitations, including lack of access, tight deadlines, or a developer veto over tasks.

Capability measurement is a signal, not a self-enforcing limit. If the pacing policy is “do not deploy above threshold T,” an evaluation can inform the gate, while identity and deployment controls must ensure that the evaluated version is the one actually used. If the policy is “pause further development once T is reached,” the protocol needs repeated assessments during training and a way to detect unreported checkpoints. Those are separate mechanisms. The UK [AI Security Institute's frontier trends report](https://www.aisi.gov.uk/frontier-ai-trends-report) illustrates the value of repeated, domain-specific testing across model generations, while also showing how quickly the frontier can move.

<!-- extended-page2 -->

A useful pilot would evaluate one registered checkpoint twice: once through the developer’s ordinary interface and once with an assessor-controlled scaffold that grants the tools and time contemplated by the threshold. The two results should be reported separately. If a later deployment adds code execution, retrieval, or a longer task horizon, the earlier “pass” should be reviewed rather than inherited automatically. This pilot would also reveal how much assessor effort and secure infrastructure a routine gate requires.

<div style="break-after: page; page-break-after: always;"></div>

## Page 3 of 3 — Drawbacks, resistance, and failure modes

**Measurement limits.** A finite test suite samples a large behavior space. Results depend on elicitation skill, scaffolding, tool access, time budget, and the quality of the threat model. “No success observed” is weaker than “the system cannot do it.” Benchmarks may be contaminated by training data, and success rates may be unstable across prompt variants. Expert simulations are expensive and sometimes difficult to reproduce. Near a threshold, the uncertainty interval may be more important than the point estimate.

**Circumvention and evasion.** A developer can present a weaker checkpoint, remove tools during testing, retain an unreported fine-tune, or deploy a different system later. A model may recognize the evaluation setting and underperform, or it may exploit the scoring environment rather than perform the intended task. The [UK AISI's work on evaluation cheating](https://www.aisi.gov.uk/blog/cheating-behaviour-in-frontier-model-evaluations) documents why test infrastructure itself needs scrutiny. Controls include checkpoint binding, surprise tests, direct configuration inspection, held-out tasks, and repeat testing after material changes. None eliminates strategic behavior by a capable model or a noncooperative developer.

**Adoption resistance.** Labs will resist disclosure of weights, internal tools, security weaknesses, and commercially valuable test results. Governments may disagree about who accredits assessors and whether foreign assessors may access sensitive models. Evaluators may lack scarce domain experts and secure infrastructure. A tight gate can delay legitimate safety work, so exceptions for testing and mitigation need a precise scope and audit trail. Financial incentives also matter: if competitors are not covered by the same rule, a lab has reason to oppose a costly gate.

**Institutional failure.** An assessor can be captured, under-resourced, or given only developer-selected evidence. A regulator can turn an uncertain test into an overly crisp legal label. A threshold can become a target for optimization rather than a warning about risk. A sound regime should publish the claim boundary, preserve dissent and uncertainty, fund independent replication, and require a new assessment when the model or its operating environment changes. The mechanism is most credible as one element of a broader chain that also verifies model identity and actual use.

<!-- extended-page3 -->

An adversarial audit should attempt a model swap and a configuration swap after the initial assessment, then ask whether the approval system notices. It should also seed at least one hidden task whose answer is unavailable in public benchmark material. If the assessor cannot verify the served model version or obtain meaningful access to the intended operating setup, the evaluation report should say that the threshold claim was not established. Lack of an observed failure is not a substitute for coverage.
