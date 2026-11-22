# 19. Interconnect bandwidth cap

*Technical surface: accelerator fabric and cluster topology. Typical pacing uses: making large distributed training impractical while preserving some inference.*

## Page 1 of 3 — Constraining rather than observing

<!-- snapshot:start -->

**Mechanism at a glance**

| Field | Summary |
| --- | --- |
| What it does | Constrain accelerator-to-accelerator bandwidth so large synchronous training is impractical. |
| Checks and why | Link rates and topology; to make certain training patterns too slow while preserving inference. |
| Pacing policy families | Activity limits; Compute limits |
| Direct proposals | [Scher et al., De-risking Interconnect Limits for AI Verification](https://techgov.intelligence.org/blog/de-risking-interconnect-limits-for-ai-verification); [Scher & Thiergart, Mechanisms to Verify International Agreements About AI Development](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf) |
| Broader verification frameworks | [Cankaya, A System Overview for Near-Term, Low-Trust AI Compute Verification](https://techgov.intelligence.org/research/a-system-overview-for-near-term-low-trust-ai-compute-verification) |
| Literature | No mechanism-specific source identified in this review. |
| Technical feasibility | **Medium** — Small-cluster prototype exists; production topology and bypass resistance need testing. |
| Policy and strategy feasibility | **Medium** — Operators may object to lost flexibility and performance for legitimate work. |

<!-- snapshot:end -->

An interconnect cap limits communication among accelerator nodes or pods. The idea is that many forms of large, synchronous training require frequent exchange of gradients or parameters across devices, while some inference services can operate with less inter-node communication. If the fabric bandwidth is kept below a chosen limit, covered training becomes very slow even though approved inference may continue. This is a technical control, not merely a detector. The [MIRI report on interconnect limits](https://techgov.intelligence.org/blog/de-risking-interconnect-limits-for-ai-verification) presents a prototype and tests both compliant and adversarial workloads on a small cluster.

The cap can be applied at network switches, host interfaces, or protected monitoring agents. The trust question is whether an operator can reconfigure the limit or route traffic around it. It must cover the relevant pathways: inter-node Ethernet or InfiniBand, high-speed links within a node, storage-mediated exchange, and any alternative channel capable of carrying training updates. A limit on one fabric is not a limit on the entire computational system.

The performance argument is workload-specific. Large full-weight pretraining often needs high communication throughput, especially with data or model parallelism. But fine-tuning a small adapter, reinforcement learning with heavy rollout inference, asynchronous training, and future communication-efficient methods may behave differently. Likewise, some inference configurations shard very large models and need significant network capacity. The mechanism's claimed selectivity should be tested against representative production workloads rather than assumed from a simple training-versus-inference contrast.

An interconnect cap does not count total compute and cannot distinguish two different inference models. It acts on a bottleneck. If a prohibited run can be redesigned to fit below the cap at acceptable speed, the control has failed for that policy. The size of “acceptable speed” depends on the pacing objective: slowing a run by a factor of ten may matter for a short moratorium but may not prevent eventual completion.

<div style="break-after: page; page-break-after: always;"></div>

## Page 2 of 3 — Implementing and testing the cap

A verifier would specify allowed topology and maximum sustained bandwidth between defined groups of devices. The operator installs rate limits or traffic shaping, while independent monitors record link utilization and configuration changes. Before activation, testers run allowed inference and prohibited training examples under the actual hardware configuration. The acceptance criterion includes both sides: legitimate services must remain functional and the prohibited class must become infeasible within the relevant time horizon.

The cap may need exceptions for model loading, maintenance, or recovery. Those exceptions are a major governance issue. A legitimate one-time weight transfer can exceed a sustained bandwidth threshold. The MIRI prototype discusses distinguishing such bursts from continuing training traffic. A trusted loading process could allow a bounded transfer and record its source and destination. If exceptions are broad or frequent, they may be enough to carry gradients or checkpoints for prohibited training.

Topology changes must be audited. Adding local accelerators can move a run entirely within a pod whose internal links remain fast. Adding a second network can bypass the shaped fabric. Software updates can alter how training communicates. The verifier therefore needs a chip inventory, current network map, and ongoing configuration attestation. The limit should be challenged with adversarial workloads designed to find the fastest training route that remains within the rules.

Policy fit matters. A cap may be attractive in a temporary agreement that allows inference on existing hardware but wants to prevent a new frontier-scale pretraining run. It is less suitable for a rule about harmful capability already present in a model, or for stopping all forms of improvement. It may be combined with metering and network-traffic monitoring, which can detect abnormal use and quantify how close the system is to the limit.

<!-- extended-page2 -->

A production-like pilot should measure the fastest compliant inference service and the fastest prohibited training run under the same cap, including initialization and failure recovery. The operator should then attempt to optimize training below the limit. The policy team must decide what slowdown is sufficient for the relevant time horizon. “Training was slower” is not enough if the run still finishes before the agreement expires.

<div style="break-after: page; page-break-after: always;"></div>

## Page 3 of 3 — Drawbacks, resistance, and failure modes

**Workload drift.** The assumption that prohibited training needs more interconnect than permitted inference may weaken. Adapter training, reinforcement learning, local training within a large node, or new algorithms may make progress under the limit. The [MIRI prototype](https://techgov.intelligence.org/blog/de-risking-interconnect-limits-for-ai-verification) explicitly flags these boundaries. A policy relying on the cap needs periodic adversarial re-evaluation.

**Circumvention.** An operator can add unmonitored links, use alternate interfaces, concentrate compute inside unrestricted pods, exploit exception windows, or accept a slower but longer training schedule. It may disguise communication as authorized model loading. Physical topology inspection, configuration attestation, and independent network taps can make evasion harder but raise cost and intrusiveness.

**Resistance.** Cloud providers and labs may oppose restrictions that degrade utilization, hinder recovery, or constrain future legitimate workloads. Hardware vendors may not support a consistent enforcement interface. A government may object to an external party controlling strategic compute fabric. Negotiating which inference services remain allowed is a business and political question, not just a bandwidth benchmark.

**Failure modes.** A small-scale test can overstate effectiveness at production scale. A fixed cap can become obsolete as workloads change. A verifier can misread an alert as proof of training or a low traffic rate as proof of compliance. The result should be framed as an experimentally tested bottleneck for a specified class of training, with explicit bypass routes and performance tradeoffs.

<!-- extended-page3 -->

The red team should search for unmetered intra-node links, alternative network routes, exception windows, and local training within a large pod. It should also examine legitimate inference cases that the cap damages. If a bypass is found, the remedy may require a new topology rule rather than a lower bandwidth number. Every revision should be retested against both allowed and prohibited work.
