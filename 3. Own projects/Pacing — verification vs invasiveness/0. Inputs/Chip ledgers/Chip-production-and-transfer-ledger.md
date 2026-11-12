# 04. Chip production and transfer ledger

*Technical surface: semiconductor supply chain and facility inventory. Typical pacing uses: compute stock limits, location rules, and detection of undeclared capacity.*

## Page 1 of 3 — The evidence chain

<!-- snapshot:start -->

**Mechanism at a glance**

| Field | Summary |
| --- | --- |
| What it does | Record advanced accelerator manufacture, sale, ownership and movement in a reconciled registry. |
| Checks and why | Serials, shipments and changes of custody; to reveal undeclared compute stock. |
| Pacing policy families | Compute limits; Access limits |
| Direct proposals | [Scher & Thiergart, Mechanisms to Verify International Agreements About AI Development](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf) |
| Broader verification frameworks | [CNAS, Secure, Governable Chips](https://s3.us-east-1.amazonaws.com/files.cnas.org/documents/CNAS-Report-Tech-Secure-Chips-Jan-24-finalb.pdf) |
| Literature | [Sastry et al., Computing Power and the Governance of Artificial Intelligence](https://arxiv.org/abs/2402.08797) |
| Technical feasibility | **High** — Ordinary inventory systems exist; completeness across borders and resales is the hard part. |
| Policy and strategy feasibility | **Low** — Exporters, manufacturers and states must share commercially and strategically sensitive records. |

<!-- snapshot:end -->

A chip ledger records the existence and custody of advanced AI accelerators from manufacture through sale, installation, resale, repair, and retirement. Its basic unit is a device or an auditable batch tied to identifiers that can be checked later. The immediate claim is modest: a specified set of chips was produced and is currently reported at specified owners or sites. A ledger does not reveal how the chips are used. It makes other verification methods—inspection, location attestation, or cloud accounting—more complete by establishing the population they are supposed to cover.

The ledger needs several independent inputs. Fabrication and packaging facilities report output; designers and distributors report shipments; customers report receipt and deployment; data centers reconcile rack inventories; and transfer events update ownership and location. An auditor compares these records rather than accepting any one organization's list. Serial numbers or cryptographic device identities help distinguish actual chips from repeated entries, but an identifier alone can be copied or misreported. Physical sampling and supply-chain checks are necessary to establish that the recorded identity corresponds to real hardware. [Scher and Thiergart's verification survey](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf) treats a chip ownership and location registry as a building block for tracking compute.

Scope is a fundamental design choice. “AI chip” is not a permanent, purely technical category. Frontier training can move across generations and form factors, while accelerators used for ordinary workloads may fall within a broad definition. The ledger should publish a versioned coverage rule and a way to add new products. It must also decide whether to count whole systems, modules, or individual dies, and how to treat repaired or disabled devices. Narrow rules create substitution opportunities; broad rules create a much larger inventory and more resistance.

The [research on computing power and AI governance](https://arxiv.org/abs/2402.08797) explains why compute is an attractive observation point: it is more concentrated and often more quantifiable than data or algorithms. That does not make the chain complete. A registry's central quality measure is reconciliation coverage: what proportion of relevant production and transfers can be accounted for, and with what uncertainty?

<div style="break-after: page; page-break-after: always;"></div>

## Page 2 of 3 — How a pacing verifier would use it

For a domestic compute ceiling, the ledger can identify facilities whose chip inventory is large enough to warrant monitoring. For an international agreement, it can show whether declared national capacity is broadly consistent with manufacturing and import records. For an export control, it can help investigate a device reported in the wrong jurisdiction. In each case, the ledger is a map for verification, not a verdict. It tells inspectors where to look and which serials should be present.

Operationally, each transfer should carry a time, sender, recipient, location, quantity, and reason. High-risk events—cross-border sale, service replacement, relocation, decommissioning—need stronger evidence than routine movement within one facility. A receiving party should confirm possession independently of the sender. Random audits could inspect selected chips, compare purchase orders with rack inventories, and check whether “retired” chips were actually destroyed or repurposed. The system should retain historical custody rather than overwriting an old owner. It needs a process for duplicate IDs and missing chips that does not silently erase anomalies.

The access model can be layered. Manufacturers and operators submit detailed records to a trusted body. A regulator or treaty inspector sees full records under confidentiality rules. Public reporting might show only aggregate capacity and discrepancy rates. This matters because chip locations and purchase volumes can reveal commercial plans or national-security capability. An independent body should be able to test the ledger's completeness by examining production and export records even if most entries remain confidential.

The ledger is most useful when combined with physical inspection and remote checks. The [MIRI survey](https://intelligence.org/wp-content/uploads/2024/11/Mechanisms-to-Verify-International-Agreements-About-AI-Development-27-Nov-24.pdf) argues for tracking chips from production through their lifecycle and for comparing registry claims with inspection. A site that reports the right chip count may still be running prohibited training; a site with unexplained chips may be only an inventory error. These cases require different follow-up.

<!-- extended-page2 -->

A pilot ledger could follow one accelerator batch from packaging to two distributors, a cloud facility, a repair vendor, and retirement. Inspectors would sample identifiers at several points and compare independent shipment, receipt, and rack records. The exercise should count unresolved discrepancies and how long they take to resolve. A ledger that works only when every transfer is routine will not support a regime that must investigate diversion or loss.

<div style="break-after: page; page-break-after: always;"></div>

## Page 3 of 3 — Drawbacks, resistance, and failure modes

**Incomplete population.** Existing chips were often sold without a governance-oriented registry. Secondary markets, repairs, stockpiles, and imported systems complicate retrospective enrollment. If a regime covers only new devices, older accelerators may remain useful for prohibited work. If it covers every capable device, the record-keeping cost and dispute rate rise sharply.

**Circumvention.** A noncooperative actor can underreport production, route devices through intermediaries, mislabel shipments, clone identifiers, or declare chips destroyed while retaining them. It may use lower-spec chips in larger numbers, or specialize algorithms to make a smaller fleet sufficient. Strong assurance therefore requires independent production audits, customs and sales reconciliation, random physical checks, and penalties for unexplained losses. Even then, a covert manufacturing supply chain can sit outside the ledger.

**Resistance.** Manufacturers, distributors, cloud firms, and governments may view detailed shipment and location data as commercially or strategically sensitive. Smaller resellers could face substantial compliance costs. International inspectors may not be trusted with a rival state's data-center map. A system designed for one state's export controls will not automatically serve a multilateral pacing treaty, because participants may disagree about who receives the information and who can correct it.

**Failure modes.** A central ledger can look precise while missing a systematic category of chips. A stolen device identity may create false confidence in remote attestation. Delayed updates can make legitimate movements appear illicit, while permissive update windows can hide diversion. The verifier should publish coverage statistics and unresolved discrepancies, and treat registry matches as one piece of evidence. The ledger's value lies in making the universe of compute auditable; it cannot establish a limit on training or capability by itself.

<!-- extended-page3 -->

A red team could introduce a duplicate serial, a missing repair return, and a false destruction certificate. The verifier should show which independent evidence detects each one and which remains ambiguous. It should also test whether an entire unregistered batch could be missed when manufacturing records are incomplete. These cases reveal the difference between an internally consistent database and a genuinely complete supply-chain account.
