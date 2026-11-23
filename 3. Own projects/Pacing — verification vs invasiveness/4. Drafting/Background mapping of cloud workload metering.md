# Background mapping of cloud workload metering

**In brief.** Cloud providers already record how much accelerator time each customer uses, because they bill for it. Cloud workload metering turns those records into a governance tool. Providers verify who the customer is ("know your customer"), add up the compute each project uses (in chip-hours and estimated operations), tie it to a project label, and report or act when a project approaches a threshold. An alarm can, for example, halt new allocations. Technical feasibility is high and policy feasibility medium. Two limits define the tool. Billing records show how much compute was used, not what for, so a declared label is needed alongside the measurement. And labs' own data centres fall outside it unless on-premises reporting is added. Its value lies in the narrow, existing access surface: providers report numbers they already hold. The US already uses this channel for export control: a rule issued in November 2026 expanded know-your-customer expectations on foreign data centres offering remote access to advanced chips.

++What Pacing Proposals Say about cloud workload metering++

The four international proposals treat cloud metering as an existing, light-touch layer to build on rather than as a main pillar. They pair it with tracking of chips and data centres, because frontier training increasingly runs on labs' own or partners' hardware.

| Proposal | Role of metering | Who meters, and what is reported | Distinctive design choices |
|----|----|----|----|
| **MIRI agreement** | A starting point. Preparation draws on "governing through the cloud" approaches, and the agreement's monitoring builds on the light-touch monitoring clouds already do. | Providers in party states, under treaty-body oversight. Non-parties' remote access to chips in party states stays monitored, and can be banned. | Supporting analysis rates the ability to tell workload sizes apart internationally as low, because one actor can split work across many customer accounts. |
| **AI 2040: Plan A** | Part of compute accounting: the verification plan calls for investment in compute accounting and tracking, including by intelligence agencies. | Tiered by site size. Sites above 10,000 H100-equivalents (about 99% of compute) are converted to inference only; smaller sites face reporting requirements and spot checks. | Metering covers the long tail of smaller sites; the large sites are handled by physical conversion. |
| **Building the Pause Button** | Know-your-customer rules as one layer of a multilayer regime, with cloud usage logs linked to verified identities. | Providers verify identity and declared projects, keep identity-linked logs, deny above-threshold access to unverified users and report suspicious activity. Regulators inspect the records, logs and configurations. | Cites banking enforcement as precedent: TD Bank's $1.3 billion fine for anti-money-laundering failures. |
| **Hardwired Pause** | Reconciliation: inference traffic and power use are reported per cluster and checked against power-station and inference-provider records. | Licensed hardware operators, kept separate from inference providers. | AI companies cannot hold hardware licences, which avoids the conflict of a developer metering itself. |
| **We Must Pace the Frontier** (Amodei essay) | Not proposed for pacing itself. Calls for a crackdown on remote access to data centres outside China, which relies on providers knowing their customers (our inference). | US export controls. | Considers limiting "ingredients" such as training compute, but worries they are easier to game than measures of what models do. |

++Effectiveness:++\
Q: Under ideal conditions – do cloud workload metering actually slow capability development, or just constrain an imperfect proxy?

**It constrains a proxy (compute used), and only for the share of compute rented through clouds.** Under ideal conditions, with honest providers, identity checks that prevent splitting, and lineage labels that link a model's pretraining, continued training and fine-tuning, a threshold alarm can enforce a compute cap on cloud-based training. Four limits remain:

- **Own data centres.** Leading labs increasingly train on their own or partners' hardware. When the provider and the developer are the same entity, the provider has every reason to under-report.
- **Splitting.** Work can be split across accounts, providers or jurisdictions. Identity checks make this costly: evading a threshold at the scale of the 2023 US executive order would take more than ten providers.
- **Efficiency gains.** Algorithms improve, raising the capability bought per unit of compute.
- **Billed ≠ executed.** Billed compute is not exactly the compute used, and counting conventions differ (for example, whether recomputed steps count).

| Specific use of cloud workload metering | Likelihood of leading to a slow down in capability development on its own | Why? |
|----|----|----|
| Reporting large training runs to a regulator | Low | Information only, though it shows other tools where to look. |
| Know-your-customer checks plus threshold reporting | Low–medium | Makes anonymous large-scale cloud training hard, but doesn't stop known customers. |
| Threshold alarm that halts new allocations to a project | Medium for cloud training | Directly caps cloud compute per project; training moves to own hardware. |
| Metering plus on-premises reporting and the chip ledger | Medium–high | Closes the own-data-centre gap. |
| Metering used as a trigger for capability evaluations | Low on its own | Directs evaluators to the right models. |

++Incentive compatibility++

Q: Will the relevant actors have reasons to cooperate, circumvent, or undermine it?

Providers and the leading state largely cooperate, because the system reuses existing records and existing export-control practice. Labs that can, move frontier work off the cloud. Rival states resist foreign access to their providers' records.

- **AI labs:** most cooperate, since the burden is light and the data mostly exists. Compute volumes and timing still reveal roadmaps, so labs want confidentiality. Leading labs can shift frontier training to their own or partners' data centres; cloud-dependent labs and academics cannot (our inference).
- **Cloud firms:** cooperate if obligations are the same for every provider, so that compliant firms don't lose customers to lax ones. Their concerns are cost, customer privacy, trade secrets, liability, and conflicts with cross-border data rules.
- **Leading state:** cooperates. The US already uses cloud know-your-customer requirements through export controls. In November 2026 the Commerce Department issued an interim rule on remote access to advanced chips. It expands expectations on foreign data centres, and treats a provider's refusal to share customer information as presumed knowledge of a prohibited use. The same rule rescinded the 2025 AI Diffusion Rule.
- **Trailing state:** undermines. It rejects foreign access to its providers' records, which its domestic providers dominate. Laws such as China's 2017 National Intelligence Law and the US surveillance statute (FISA) give each side reason to distrust reports from the other's providers.

++Verifiability and enforceability++

Q: Can violations be detected, and can restrictions be credibly enforced?

Moderately well for cloud compute, and not at all beyond it.

- **Accounting:** feasible. A theoretical count comes from billing (chip-hours times peak performance), an empirical one from measured utilisation. Common counting conventions avoid disputes: count all operations equally whatever their precision, exclude recomputation and discarded branches, and accept approximations within about 5%.
- **Identity checks:** likely feasible, building on banking practice.
- **Classifying workloads** (training or inference): likely feasible for large pretraining. Research classifiers reach about 95% accuracy, but a 5% error rate is too high in production, and disguising a workload costs the customer efficiency.
- **Detailed verification** of what a workload does: not possible without code or data. Confidential computing could change that.
- **Cross-checks:** power use, job schedulers and network traffic. Lineage identifiers, reconciled across providers, link one project's runs.
- **Provider honesty:** hyperscalers have reputations and audit trails at stake. In-house compute needs direct inspection or whistleblowers. Internationally, reports from a rival's providers are hard to trust.
- **Enforcement:** account-level enforcement (suspending access) is highly feasible; model-level enforcement is not yet.

| Circumvention strategy | How likely? | Discussed |
|----|----|----|
| Move frontier training to own or partner data centres | High for leading labs | Atlas 03; Heim et al. |
| Split work across accounts or shell companies | Medium; lower with identity checks and lineage IDs | Atlas 03; Heim et al.; Pause Button §6.2.3 |
| Split work across providers or jurisdictions | Medium (more than ten providers for very large runs) | Heim et al.; S&T |
| Relabel training as inference, fine-tuning or another permitted use | Medium | Atlas 03; Heim et al. |
| Disguise workloads to fool classifiers | Low–medium (costs efficiency) | Heim et al. |
| Use non-compliant providers abroad | Medium | Heim et al.; MIRI |
| Providers under-report, especially in-house or small ones | Low for hyperscalers, higher otherwise | Heim et al. |
| Gain more capability per unit of compute through efficiency | High over time | Atlas 03 |

++Strategic consequences++:

Q: Do cloud workload metering shift competitive or geopolitical advantages in ways that undermine its original purpose?

Mostly through who is covered and who holds the data.

- **Asymmetric bite:** the rule binds cloud-dependent labs and academics more than vertically integrated leaders, and may speed the shift of frontier training in-house (our inference).
- **Regulatory flight:** customers move to providers in non-participating jurisdictions.
- **Sensitive data:** aggregated records of who trains what, and when, are highly sensitive, and an espionage target.
- **Legal conflict:** reporting duties clash with privacy and cross-border data rules. The EU–US Privacy Shield was struck down on such grounds.
- **Geopolitics:** because the same channel serves US export control, trailing states may see metering as a tool of US control rather than a neutral pacing measure (our inference). An international body modelled on the Financial Action Task Force, or a club with chip access as its membership benefit, could help.
- **Upside:** it reuses records that exist, so it can be stood up quickly and lifted without leaving anything behind.

++Coverage and targeting++

Q: Do cloud workload metering cover the relevant actors and activities without unnecessarily restricting beneficial development?

Broad within the cloud, blind outside it.

- **Coverage:** all cloud customers, including small and foreign ones. A threshold keeps most beneficial small users out of scope.
- **Gap:** own data centres, which host a growing share of frontier training.
- **Targeting:** compute-based, so it inherits the compute proxy's flaws. Fine-tuning and efficiency gains below the threshold go unseen.

++Robustness++:

Q: Can cloud workload metering survive imperfect implementation, adapt to changing circumstances, and be lifted when appropriate?

Adaptable and easy to lift, but its coverage erodes.

- **Imperfect implementation:** degrades gracefully. A missed account loses one customer's data, not the whole system.
- **Adaptation:** thresholds and counting rules can be updated, and reporting can be extended to on-premises compute. Coverage erodes as training moves in-house and efficiency improves.
- **Lifting:** easy, with no overhang, since it builds nothing beyond reporting.

++Regulatory burden++

Q: What does it take for governments to set up and run it?

Regulators set common counting rules and thresholds, receive providers' reports, and audit their records and identity checks. Most of the work falls on providers and reuses billing and know-your-customer systems that already exist for export controls. The burden rises if reports must be reconciled across countries, which needs an international body.

# Deep dive: AI labs

*Our assessment. "Invasiveness" follows the project's definition: how much effort compliance takes, and how much of what labs see as proprietary information they must reveal.*

For labs, metering mostly formalises what providers already know. Its sharpest edge is the threshold alarm, and its main side effect is the incentive to leave the cloud.

++What success would require from AI labs++

1. Verify their identity and declare projects, with lineage identifiers that link pretraining, continued training and fine-tuning across providers.
2. Not split work across accounts, affiliates or providers to stay under thresholds.
3. Label workloads truthfully, and accept cross-checks against power, scheduler and network data.
4. Accept that new allocations stop when a project nears the threshold.
5. Report on-premises compute on the same basis where that rule applies.

++How invasiveness shapes labs' behaviour++

| Dimension | What it asks of labs | Likely lab response | Second-order effect |
|----|----|----|----|
| Compliance effort | Low: identity checks, project labels and lineage IDs; most data already exists | Accept | Low cost makes it an easy first step |
| Proprietary information | Low–medium: compute volumes and timing reveal scale and roadmap | Demand tiered reporting and confidentiality; distrust foreign providers | Strong data protection is needed, or the records become an espionage target |
| Loss of control | Low–medium: a provider can halt allocations at the threshold | Shift frontier training to own or partner hardware | Coverage erodes unless on-premises reporting is added |

++Second-order effects to watch++

- **Vertical integration:** leading labs build or lease dedicated data centres outside metering.
- **Uneven burden:** smaller, cloud-dependent labs and academics face relatively more scrutiny than leaders.
- **Data concentration:** regulators accumulate a sensitive map of who is training what.
- **Provider competition:** non-compliant providers abroad gain customers.

++What would lower resistance++

- The same obligations for every provider.
- Tiered reporting: aggregates to the regulator, details only on request.
- Strong confidentiality rules.
- Agreed counting conventions.
- Safe harbours for providers who report in good faith.

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

E.g. for cloud workload metering:

|   | Pacing effectiveness | Coverage and targeting | Incentive compatibility | Verifiability and enforceability | Regulatory burden | Robustness and flexibility | Invasiveness for labs | Readiness |
|----|----|----|----|----|----|----|----|----|
| cloud workload metering | 2 | 3 | Labs: cooperate, while leaders shift frontier training to their own hardware. Chip and cloud firms: cooperate if obligations are uniform across providers. Leading state: cooperate (already uses cloud know-your-customer rules through export controls). Trailing state: undermine (rejects foreign access to its providers' records) | 3 | 2 | 3 | 2 | Now |

*Our assessment. Scored as the proposals use it: identity checks plus compute metering by cloud providers, with threshold reporting or alarms. Effectiveness (relevance to pacing) is scored by how many routes to frontier capability progress the rule this intervention verifies would close if fully respected; all criteria use the anchored 1–5 scales in `Scoring method.md`. 5 = best, except regulatory burden and invasiveness, where 5 = heaviest.*\
- **Effectiveness:** verifies computing power used in the cloud, so a limit on it partly closes the compute route, for cloud compute only; own data centres and the other routes stay open.\
- **Lifecycle stage:** inputs and infrastructure.\
- **Coverage:** all cloud customers above a threshold; blind to own data centres.\
- **Verifiability:** accurate records and easy account-level enforcement; cannot see what a workload does, or compute outside the cloud.\
- **Regulatory burden:** builds on billing and existing know-your-customer practice; rises if an international body is added.\
- **Robustness:** easy to update and to lift, but coverage erodes as training moves in-house.\
- **Invasiveness for labs:** identity, compute volumes and project labels; no weights, code or data.

++Step 2:++

Strategic consequences and incentive compatibility analysis.\
→ Use this as input to produce a policy recommendation and a theory of change for each intervention/classes of interventions.

**Strategic consequences and incentives in one line:** metering is the quickest tool to stand up, because it reuses records and export-control practice that already exist. But it governs only the cloud, and the frontier is leaving the cloud.

**Theory of change.** Common counting rules → providers verify customers and meter compute per project, using lineage IDs → threshold reports and alarms stop cloud projects at the cap → cross-checks and audits keep reports honest → extended to on-premises compute through the chip ledger, the same accounting covers frontier training wherever it runs. It rests on four assumptions: providers report honestly; identity checks prevent splitting; on-premises compute is covered by other tools; and states accept each other's providers' reports, or share them through a common body.

**Policy recommendation (our assessment), from least to most invasive:**\
1. *Now:* standard counting conventions, know-your-customer checks for large-compute customers, and threshold reporting by providers [Heim et al.; FMF; Pause Button §6.2.3].\
2. *Next:* lineage IDs reconciled across providers, threshold alarms that pause new allocations, and cross-checks against power and scheduler data [Atlas 03].\
3. *Then:* extend the same reporting to on-premises compute, linked to the chip ledger [Atlas 03; Heim et al.].\
4. *Internationally:* a body modelled on the Financial Action Task Force, or a club with chip access as its membership benefit, plus mutual recognition of providers' reports [Heim et al.].\
5. *Most invasive:* verifying what workloads do, for example through confidential computing, only once the technology allows it [Heim et al.].

**Verification vs invasiveness.** Metering is cheap and exposes little, because it reuses billing data. The next step up, verifying what a workload actually does, needs code or data access: a sharp jump in invasiveness for a modest gain in assurance.

# Sources

- **Agenda:** Douglas et al. (2026), [*Pacing the Frontier: A Framework & Research Agenda*](https://pacing.tech/).\
- **Atlas 03 / Atlas briefs:** [Pacing Verification Atlas](https://pacing-atlas.acacianimrod.chatgpt.site/), mechanism page "Cloud workload metering" and the four proposal briefs.\
- **Heim et al.:** Heim, Fist, Egan, Huang, Zekany, Trager, Osborne & Zilberman (2024), [*Governing Through the Cloud: The Intermediary Role of Compute Providers in AI Regulation*](https://arxiv.org/abs/2403.08501), arXiv:2403.08501.\
- **FMF:** Frontier Model Forum (2 May 2024), [issue brief on measuring training compute](https://www.frontiermodelforum.org/updates/issue-brief-measuring-training-compute/).\
- **Sastry:** Sastry et al. (2024), [*Computing Power and the Governance of Artificial Intelligence*](https://arxiv.org/abs/2402.08797).\
- **MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), [*An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*](https://arxiv.org/abs/2511.10783), arXiv:2511.10783.\
- **Amodei:** Amodei (September 2026), [*We Must Pace the Frontier*](https://darioamodei.com/post/we-must-pace-the-frontier).\
- **AI 2040:** Larsen et al. (AI Futures Project, 2026), [*AI 2040: Plan A*](https://www.ai-2040.com/); and Dean (2026), [*Verification plan*](https://ai-2040.com/supplements/verification-plan), supplement to *AI 2040: Plan A*.\
- **Pause Button:** Al Ramiah et al. (2025), [*Toward a Global Regime for Compute Governance: Building the Pause Button*](https://arxiv.org/abs/2506.20530), arXiv:2506.20530.\
- **Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), [*The Feasibility of a Hardwired Pause of Frontier AI Training*](https://hardwired-pause.ai/).\
- **S&T:** Scher & Thiergart (2024), [*Mechanisms to Verify International Agreements About AI Development*](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf), MIRI.\
- **BIS 2026:** US Bureau of Industry and Security (November 2026), interim final rule ["Addressing Remote Access to Advanced Semiconductors"](https://bis.gov/press-release/bis-issues-rule-addressing-remote-access-american-super-intelligence-technology) (checked 22 Nov 2026 via law-firm summaries).
