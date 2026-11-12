# Background mapping of chip production ledgers

**In brief.** A chip ledger is a reconciled register of advanced AI chips: who made them, who holds them, where they are, and every change of hands until verified destruction. It does not show what the chips are used for. Its job is to make the world's stock of frontier-capable compute countable, so that compute-based pacing rules (caps, pauses, location rules, export controls) can be checked. Technical feasibility is high (ordinary inventory systems exist); political feasibility is low, because manufacturers, cloud firms and states must share sensitive records.

++What Pacing Proposals Say about chip production ledgers++

What do each of the pacing proposals say about chip production ledgers?

All four proposals treat the ledger as a core mechanism and as the foundation other checks build on, never as sufficient by itself.

| Proposal | What the ledger is for | Scope and threshold | Distinctive design choices |
|------------------|------------------|------------------|------------------|
| **MIRI agreement**: US–China-led treaty: training above 10²⁴ FLOP banned, above 10²² FLOP monitored. | Locate all existing chips, consolidate them in declared, inspectable facilities, and keep new production inside the monitored pool. | Any cluster above 16 H100-equivalents (≈\$500k), registered within 120 days and updated every 90: location, type, quantity, serials, interconnects. Staged by size: \>10k H100e on day 1, \>1k by day 10, \>100 by day 100, all \>16 by year 2. Below 16 H100e: "reasonable efforts" only. | Every transfer needs 14 days' notice and treaty-body approval; broken chips count as working until certified destroyed; salvage banned. Production tracked from HBM and logic fabrication to installation, halted where it cannot be tracked; sales to non-parties presumed denied; annual production caps possible to stop stockpiling. Chips stay privately owned. |
| **AI 2040: Plan A**. Scenario for a US–China slowdown with a training pause. | First step of the deal: each side becomes confident the other hides no more than \~1% of AI compute, before training is paused. | Data-centre owners and upstream suppliers (incl. fabs) declare major purchases and sales: first holders above 10k H100e (\~\$100M), within a year anyone above 0.001% of world compute (\~2,800 H100e). | Declarations are public, so analysts from any country can challenge anomalies; mutual inspectors; dead chips stored or verifiably destroyed. Recommends starting now: intelligence on the compute supply chain, and an end to chip recycling (decommissioned chips are a main route to covert compute). The Verification Plan models the numbers: chip tracking starts in 2026, when each side's uncertainty about the other's AI compute is about 10%; by 2028 it is 2–4%. The aim is to account for 100% of new production (including memory and networking), with new chips routed either to retrofitted data centres or to guarded cold storage. At the 2029 declaration (US ~224M, China ~26M, rest of world ~39M H100e), each side's best guess is that at most ~1.5M H100e is hidden (80% interval up to ~4M), about 0.5% of world compute (Verification Plan). |
| **Building the Pause Button**. Infrastructure for an enforceable global compute pause. | "Traceability" is one of three pillars, alongside hardware controls and legal rules. | "High-performance AI chips", defined by standard benchmarks (e.g. MLPerf) set by a multilateral working group. | Four layers: (1) register of critical chip-making tools and inputs (EUV, HBM and packaging equipment); (2) global registry of production volumes, specs and sales, run by an NSG/Wassenaar-style body that flags risks but does not itself control exports; (3) chain of custody from a cryptographic chip ID at manufacture, logging owner, location and declared use, with automated anomaly detection; (4) know-your-customer checks for cloud users. Enforced through ecosystem leverage: violators lose firmware updates, design software, cloud and tool supply. |
| **Hardwired Pause**. Pause of ≥10 years; training-capable chips stop being made and are replaced by inference-only chips. | A global census of pre-pause chips plus registration of all new ones. The census's completeness is judged the binding constraint on how long the pause can last. | All training-capable accelerators. Pre-pause chips enter by census, new ones by registration at a licensed fab; the only exit is verified destruction. Unaccounted chips are presumed hidden ("dark compute") and charged to the host state. | Census draws on 13 paper trails (tax deductions, vendor and resale records, customs, colocation rentals, loan collateral listed by serial, warranty returns, e-waste records, etc.). Registration is the price of joining profitable transitional inference service; buybacks, bounties, and amnesty for past export-control evasion in exchange for records. Extends the ledger upstream to every advanced lithography machine. |

++Effectiveness:++\
Q: Under ideal conditions – do chip ledgers actually slow capability development, or just constrain an imperfect proxy?

**On its own, no.** A ledger records chips; it limits no training, so it slows nothing unless a rule acts on what it reveals. Its value is as an enabler: compute is the AI input that is easiest to count and verify, and the ledger is what makes it countable. Even with a rule attached, what is constrained is a proxy (compute), not capability. The proxy erodes as algorithms become more efficient (Hardwired assumes \~57%/yr post-pause; pre-pause estimates reach 2.7×/yr), as dangerous narrow models need far less compute (AlphaFold 2 used \<10²³ FLOP), and as capability comes from post-training and inference-time compute. Ledger-based pacing is strongest while frontier training needs a large share of the world's chips.

| Specific use of chip ledgers | Likelihood of leading to a slow down in capability development on its own | Why? |
|------------------------|------------------------|------------------------|
| Transparency only: a register of stocks and flows, with no rule attached | Very low | Informs decisions but restricts nothing. Knowing a rival is close can even intensify racing. |
| Unilateral export-control enforcement: detect diversion to restricted countries | Low | Slows targeted rivals, not the frontier; leaky (smuggling already happens); pushes targets to build their own supply chain, outside any ledger. |
| Location rules: covered chips must sit in declared, inspectable sites | Low–medium | Stops large hidden clusters from being assembled and makes shutdown possible, but does not restrict what declared chips do. |
| Base for a training cap or pause: defines the population that usage checks must cover | Low alone; high with usage verification | Lets verifiers rule out undeclared clusters big enough for a frontier run. The cap itself is enforced by other tools: inspections, inference-only retrofits, on-chip metering. |
| Production or stock caps: limit chips made per year, or phase out training-capable stock | Medium–high | A hard ceiling on compute available to anyone; removes the "dry tinder" for a later breakout. Still eroded by efficiency gains over time. |

++Incentive compatibility++

Q: Will the relevant actors have reasons to cooperate, circumvent, or undermine it?

Firms are likely to cooperate if registration is the price of market access. The main circumvention risk is states holding unrecorded stock; the main risk of undermining is a state that sees the ledger as locking in a rival's lead.

- **Chip designers and fabs** (Nvidia, TSMC, etc.): production and sales data are commercially sensitive, but they already keep these records, and a ledger can win back markets closed by blunt export bans. CNAS proposes conditional "export market commitments"; MIRI presumes approval for sales within the agreement.\
- **Data-centre and cloud operators:** costs are compliance and loss of location secrecy. Strong reasons to comply: purchases are already declared for tax deductions, and registration can unlock the most profitable use (Hardwired: transitional inference service). Smaller resellers bear proportionally higher costs.\
- **AI developers:** little invasiveness. The ledger shows how many chips they hold and where, not models, data or workloads. Chip counts still reveal strategy, which labs increasingly withhold.\
- **States:** a leader can use the ledger to enforce its lead (export controls), which is attractive unilaterally and unattractive to the target. China holds most diverted chips (Epoch: \~660k H100e diverted 2024–25), so a full census exposes past evasion; Hardwired argues Chinese tax and customs records already show most of this stock to the Chinese state, and proposes amnesty. States behind may see chip-supply limits as blocking their path to catch up. The incentive to defect grows as efficiency gains make hidden stock more valuable.\
- **Smugglers and shell companies:** will evade. Countered by sting operations, black-market monitoring, bounties and whistleblower channels.

Levers that improve compatibility: buybacks (Hardwired: \~25M accelerators cost \~\$500B; even a \$1T budget is under a quarter of US Covid relief), amnesty, licences tied to registration, trade only among parties (a reason to join), and layered access so that rivals see only aggregates.

++Verifiability and enforceability++

Q: Can violations be detected, and can restrictions be credibly enforced?

Largely yes for new production and large holdings; weaker for legacy stock, small clusters and determined states. Enforcement depends on the rule the ledger serves.

- **Production is verifiable.** The supply chain is narrow: TSMC makes \~90% of advanced AI logic chips, ASML is the sole EUV maker, 2–3 firms make HBM. Fab output can be reconciled (wafers in, prints logged, chips out) and dies randomly sampled.\
- **Large holdings are visible.** Sites above 100k H100e are hard to hide, \~10k is probably detectable by intelligence from footprint, power and heat, detection is unclear around 1k and hard below \~100.\
- **Legacy stock leaves paper trails.** Hardwired's conservative estimate of what a thorough census would miss: \~12k H100e in the US (of \~35M) and \~11k in China (of \~3.1M). With low cooperation, 5–10× more; with open concealment, up to \~300k (US) and \~1M (China).\
- **A gap is not a location.** The ledger shows that chips are missing, not where they are (AI 2040: 1M H100e unaccounted gives only circumstantial evidence of a covert project), and a mismatch may be an error rather than cheating.\
- **Enforcement:** domestic law and customs; internationally, ecosystem leverage, sanctions, and ultimately disabling chips held in consolidated sites.

| Circumvention strategy | How likely? | Discussed |
|------------------------|------------------------|------------------------|
| Keep existing chips off the register ("dark compute"), especially chips diverted around export controls | High: the stock already exists | Hardwired §5.5, §6.4.3; AI 2040 App. D; MIRI App. D |
| Divert through intermediaries, shell companies or mislabelled shipments | High: ongoing under export controls | CNAS; Sastry §5; AI 2040; MIRI App. D; Atlas 04 |
| Declare chips destroyed or broken, then keep, repair or resell them | Medium | MIRI Art. V; AI 2040; Hardwired §5.5; Atlas 04 |
| Clone or spoof chip identifiers | Medium for states, low for others | Atlas 04; Sastry §4 (unclonable IDs); CNAS |
| Split holdings below the threshold, rotate chips between sites, or train across many small sites | Medium | MIRI Art. V; Sastry §5; Agenda §3.6 |
| Substitute uncovered hardware: more lower-spec chips, new form factors, consumer GPUs | Medium: depends on how fast the coverage rule is updated | Atlas 04; Sastry §5; CNAS |
| Rent registered chips through the cloud (the ledger sees owners, not users) | Medium | MIRI Art. VI; Pause Button (KYC); Sastry §4 |
| Use reporting windows or a staged roll-out to move chips before they are counted | Medium | MIRI Art. V; Atlas 04 |
| Under-report output at declared fabs | Low | Hardwired §3.3.4; MIRI Art. VI |
| Build a covert supply chain: undeclared fabs, unregistered lithography machines (one DUV machine ≈ 24–38k H100e a month) | Low now, rising over years | Hardwired §6.5.4; MIRI Art. VI; Pause Button §6.2.1; Sastry §5 ("decoupling") |

++Strategic consequences++:

Q: Do chip ledgers shift competitive or geopolitical advantages in ways that undermine its original purpose?

Yes, in some designs, mainly when used unilaterally.

- **Unilateral use entrenches the leader and speeds decoupling.** Ledger-backed export controls slow rivals but push them to build a separate supply chain, which then sits outside any future ledger and erodes the base for later coordinated pacing.\
- **Trade among parties only** rewards joining but can harden blocs, with non-parties racing outside.\
- **The register is itself a strategic asset:** a map of a rival's compute and data centres, a target for espionage, and a source of leaks that could intensify racing. Hence layered access.\
- **Discovered gaps are ambiguous.** A shortfall can be bookkeeping or cheating; how parties respond decides whether the deal survives.\
- **Market structure:** fixed compliance costs favour incumbents; combined with model whitelists, a pause could entrench leading developers.\
- **Power of the registry body:** sensitive data plus discretion invites mission creep and capture.\
- **Upside:** the same infrastructure serves export controls, compute caps, pauses and on-chip mechanisms, so it is reusable across regimes.

++Coverage and targeting++

Q: Do chip ledgers cover the relevant actors and activities without unnecessarily restricting beneficial development?

Good coverage of the actors that matter, with gaps at the edges. Restrictions on beneficial work come from the rules attached to the ledger, not from the ledger itself.

- **Actors.** New chips from a handful of firms in a few countries are easy to cover. Existing stock needs the US and China plus trade hubs (Singapore, Malaysia, Taiwan, UAE). Ownership is concentrated: seven US firms held \~78% of the stock (in H100e) at end-2025.\
- **Activities.** AI chips are distinguishable (large HBM, matrix units), so spillover onto other chips is small. Sastry et al. recommend excluding consumer and non-AI compute.\
- **Threshold trade-off.** Lower thresholds catch more but cost more and are harder to enforce; 16 H100e is near the practical floor. "AI chip" must be a versioned definition, updated as hardware changes.\
- **What it misses:** dangerous low-compute models, post-training of existing models, algorithmic progress, and who rents chips through the cloud.\
- **Beneficial development.** A ledger alone permits every use; under MIRI and Hardwired, inference and approved science continue on registered chips.

++Robustness++:

Q: Can chip ledgers survive imperfect implementation, adapt to changing circumstances, and be lifted when appropriate?

Among the more robust pacing tools, provided gaps are measured and published.

- **Imperfect implementation.** A ledger that is 99% complete still bounds hidden compute; the danger is false precision from a systematically missed category, so coverage and discrepancy rates should be published. Hardwired: a thorough census leaves \~100× headroom against efficiency gains, low cooperation \~10×, open concealment little.\
- **Time works for it.** Over 95% of world stock (by compute) is under three years old, so tracking new production now would cover most of the stock within a few years (our inference). Each year of delay adds untracked stock.\
- **Adaptation.** Thresholds and the chip definition can be revised by the treaty body, but must keep falling as efficiency improves, and enforcement gets harder as they fall.\
- **Lifting.** The ledger creates no overhang of its own and can stay as cheap standing infrastructure after the binding rules are lifted, which also makes staged exits observable. The risk is that it persists and its use expands.\
- **Long-run threat:** a covert or independent supply chain, especially unregistered lithography machines.

# Deep dive: AI labs

*Our assessment. "Invasiveness" follows the project's definition: how much effort compliance takes, and how much of what labs see as proprietary information they must reveal.*

Frontier labs relate to chips in two ways: some own and run their own data centres, others rent capacity from cloud providers. Seven US firms (Google, Microsoft, Amazon, Meta, Oracle, xAI, CoreWeave) held about 78% of the world's AI compute stock at end-2025 (Hardwired, citing Epoch AI), so a ledger reaches most labs through these owners.

++What success would require from AI labs++

1. Declare every covered chip they own *or control*, including capacity reserved long-term from clouds or held by partners, and report transfers, repairs and disposals on time.
2. Train only on registered chips, and rent only from providers who report their customers (the ledger sees owners, not users).
3. Not restructure to fall below reporting thresholds, e.g. by splitting holdings across subsidiaries or sites.
4. Hand over purchase records for a census of existing stock, and destroy retired chips under certification instead of reselling them.
5. Accept that the regulator knows their compute stock and sites, and that rivals see aggregates.

++How invasiveness shapes labs' behaviour++

| Dimension | What it asks of labs | Likely lab response | Second-order effect |
| --------- | -------------------- | ------------------- | ------------------- |
| Compliance effort | Low to moderate: labs already track hardware for accounting, tax and security; the new costs are timely transfer reports and certified destruction | Comply, but push for high thresholds and long reporting windows | Long windows are what lets diversion go unnoticed; small labs and resellers bear proportionally more cost, a mild advantage for incumbents |
| Proprietary information | Moderate: chip counts, growth plans and site locations reveal strategy, which labs increasingly withhold | Rent rather than own; hold chips through partners or special-purpose companies; insist on confidentiality | Visibility shifts to cloud providers, so the ledger needs know-your-customer rules and a definition based on control, not ownership. Aggregates may show rivals how close they are, which can intensify racing |

++Second-order effects to watch++

- **Bunching below thresholds:** firms cluster just under regulatory limits, so expect holdings and clusters sized to sit just below reporting lines.
- **Expectations move first:** if a ledger is read as the first step towards compute caps, investors may reprice compute assets before any rule binds, slowing the build-out on its own (our inference).
- **Stranded value:** ending chip recycling removes the resale value of old chips, adding to the cost of compliance.
- **A shield against heavier tools:** a credible ledger lets regulators target inspections at a few sites, so labs may prefer to support it early (our inference).

++What would lower resistance++

Confidential reporting to a domestic regulator, with only aggregates shared; reuse of records labs already keep (tax, customs, asset registers); market access or licences tied to registration.

# Policy mapping

++Step 1: policy goals scoring for each intervention++

Give a score/value to each intervention of these 5 on:\
1. Effectiveness: score 1 to 5 on whether actually expected to slow capability development (as opposed to just constrain an imperfect proxy). \
2. Coverage and targeting: score 1 to 5, are the relevant actors and activities targeted?\
3. Incentive compatibility: do we expect the most relevant actors to {cooperate, circumvent, undermine}?\
4. Verifiability and enforceability: score 1 to 5 on whether violations of the intervention can be detected/whether intervention can be credibly enforced\
5. Regulatory burden: score 1 to 5, how much active regulation is needed?\
6. Robustness: score 1 to 5, how flexibly can the intervention be adapted to changing circumstances  
7. Invasiveness for labs: score 1 to 5, how much compliance effort, proprietary information and loss of control it imposes on AI labs  
8. Readiness: available now, in 1–3 years, or in 3+ years

E.g. for chip ledgers:

|   | Pacing effectiveness | Coverage and targeting | Incentive compatibility | Verifiability and enforceability | Regulatory burden | Robustness and flexibility | Invasiveness for labs | Readiness |
|-----------|-----------|-----------|-----------|-----------|-----------|-----------| --- | --- |
| chip ledgers | 2 | 4 | Labs: cooperate. Chip and cloud firms: cooperate if market access depends on it. Leading state: cooperate (it enforces the lead). Trailing state: circumvent (unrecorded and diverted stock) | 3 | 3 | 4 | 2 | Now |

*Our assessment. Scored against a common yardstick, a coordinated cap on frontier training compute (the Agenda's Case A), using the anchored 1–5 scales in `Scoring method.md`. 5 = best, except regulatory burden and invasiveness, where 5 = heaviest.*\
- **Effectiveness:** the ledger restricts nothing by itself; it lets a compute cap be checked for undeclared stock, but the cap constrains a proxy that erodes with efficiency gains.\
- **Coverage:** new production and large holdings well covered; legacy stock, small clusters and non-parties are the gaps.\
- **Verifiability:** concentrated supply chain and rich paper trails; weak against state concealment and small clusters.\
- **Regulatory burden:** reporting, audits and customs checks; serial-level lifecycle tracking of millions of chips a year must be automated [Pause Button]. Consolidation and inspections raise it further.\
- **Robustness:** degrades gracefully if gaps are measured; reusable across regimes; thresholds need continual revision.\
- **Invasiveness for labs:** low effort (records they already keep), but reveals compute stock and sites.

++Step 2:++

Strategic consequences and incentive compatibility analysis.\
→ Use this as input to produce a policy recommendation and a theory of change for each intervention/classes of interventions.

**Strategic consequences and incentives in one line:** the ledger is cheap insurance and politically easiest in its domestic, confidential, new-production form; it is most contested in its international, backward-looking form (counting existing and diverted stock).

**Theory of change.** Require records from the few firms that make and sell AI chips → reconcile them with customs, tax and data-centre records → the stock and location of frontier-capable compute is known within a small, measured margin → compute limits become verifiable → and so negotiable between rivals → coordinated pacing becomes possible when the political will exists. It rests on three assumptions: frontier training stays compute-hungry, the supply chain stays concentrated, and states share records.

**Policy recommendation (our assessment), from least to most invasive:**\
1. *Now, domestic:* mandatory reporting of production, sales and holdings above a high threshold (AI 2040 starts at 10k H100e), confidential to the regulator; certified destruction, and no untracked recycling.\
2. *Next:* chain of custody for transfers and exports, reconciled with customs. Pilot and red-team the ledger: follow one batch end to end; plant a duplicate serial, a missing repair return and a false destruction certificate; publish coverage and discrepancy rates [Atlas 04].\
3. *When pacing is on the table:* an international registry with layered access (full records for inspectors, aggregates for parties) [Atlas 04; MIRI Art. X]; a one-off census of existing stock backed by buybacks and amnesty [Hardwired §5.4; MIRI App. D]; extension upstream to lithography machines [Hardwired §3.3.4].\
4. *Always:* attach the ledger to a rule and to usage verification. Alone, it paces nothing.

**Verification vs invasiveness.** For AI labs, a ledger is among the least invasive verification tools: it reveals chip counts and sites, not models, data or workloads. Its invasiveness falls on chip makers, cloud operators and states, whose records and data-centre maps it exposes.

# Sources

- **Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.\
- **Atlas 04 / Atlas briefs:** Pacing Verification Atlas, mechanism page "Chip production and transfer ledger" and the four proposal briefs.\
- **MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.\
- **AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*.\
- **Verification Plan:** Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*, ai-2040.com/supplements/verification-plan (read up to its 2033 section).\
- **Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.\
- **Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.\
- **Sastry:** Sastry et al. (2024), *Computing Power and the Governance of Artificial Intelligence*, arXiv:2402.08797.\
- **CNAS:** Aarne, Fist & Withers (2024), *Secure, Governable Chips*, CNAS.
