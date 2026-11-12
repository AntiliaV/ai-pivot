# Background mapping of physical chip inspections  
  
**In brief.** Physical inspection sends trusted inspectors into a facility to compare the hardware actually there with what was declared: counting accelerators, reading or challenging chip identifiers, checking seals, and sampling racks against purchase and registry records. It establishes that certain chips were present, absent or altered at a given moment. It is a snapshot: it says nothing about which workloads ran before or after the visit, and nothing about sites nobody declared. Technical feasibility is high (counting and sampling work today); political feasibility is low, because intrusive access to private or sovereign facilities is hard to negotiate. Inspection is the natural partner of the chip ledger: the ledger says which chips should be where, and inspection checks that they are.  
  
++What Pacing Proposals Say about physical chip inspections++  
  
What do each of the pacing proposals say about physical chip inspections?  
  
All four proposals use inspections; MIRI, AI 2040 and Hardwired treat them as core, Building the Pause Button as one specified option. None relies on periodic visits alone: each pairs them with a register, continuous monitoring (cameras, seals, sensors) or intelligence.  
  
| Proposal | What inspection is for | Who inspects, and how often | Distinctive design choices |
| -------- | ---------------------- | --------------------------- | -------------------------- |
| **MIRI agreement** | Confirm that all chip clusters above 16 H100e have been located and consolidated into declared facilities, then verify continuously that they are not used for banned training (Arts. V, VII). | Inspectors oversee domestic consolidation and may accompany any transfer; declared clusters get *continuous* on-site verification (in-person inspectors, tamper-proof cameras, power, heat and network measurements). Challenge inspections of suspected sites (Art. X). | Declared facilities must be reachable within 12 hours from an international airport. Chips whose use cannot be verified must be powered off, and inspectors confirm they stay off. Sensitive facilities get more automated checks and less foreign physical access. Challenge inspections need consensus of the Executive Council; access within 24 hours, with the site under surveillance meanwhile; inspectors approved by both sides; at most 20 per country per year. Precedents: IAEA (≈1,400 cameras, 23,000 seals), two resident NRC inspectors per US nuclear plant. |
| **AI 2040: Plan A** | Check each side's declared chip numbers, then certify the devices that keep data centres inference-only during the training pause. | Reciprocal: "a few hundred" US and Chinese inspectors in each other's country check declarations and records against chip counts; auditor teams in R&D clusters later approve workloads. Clusters >10k H100e (≈99% of compute) get inference-only retrofits; small sites and diffuse compute (≈1%) get reporting and random spot checks. | Only data centres that both sides agree have working verification may keep providing AI services. Inspectors also verify sealed "chip banks" in cold storage (5M H100e US, 500k H100e China). The Verification Plan treats embedded auditors, interviews and whistleblowers as supplements, not load-bearing; the aim is to bound undeclared compute to ≈0.5% of world compute. The scenario's branches show the limits: in the covert branch, China admits US auditors to declared sites while hiding a smuggled stockpile elsewhere; in the breakdown branch, turning inspectors away is the first sign the deal has collapsed; in Plans B and C, the US treats foreign inspectors in its data centres as a nonstarter, so no verified US–China deal is reached (in Plan B the rivals turn to sabotage). |
| **Building the Pause Button** | Back up chip registries and compute caps; check that interconnect limits have not been re-cabled after a visit. | Routine audits of facilities holding high-risk chips by certified third parties; surprise inspections for hidden or diverted chips; on-site audits of major data centres; challenge inspections of sites suspected of exceeding thresholds (OPCW model). | Audits cover utilisation logs, access records, physical security and firmware integrity, alongside cable inspections and tamper-resistant enclosures. Customs inspect chip shipments; suppliers and fabs are also inspected. International funding for countries with little inspection capacity. |
| **Hardwired Pause** | Keep licensed chips at registered sites, confirm sealed reserves, and verify fab output during a production halt. | Licensed hardware operators face routine inspections; chips that move or go silent must be produced for inspection; a large standing international inspectorate (modelled on the OPCW and CTBTO). | Strategic reserves of powered-off chips under seal, checked by periodic counting. At fabs, every printed chip and reject is shown to inspectors; sampling 2,400 chips per production line per year would catch 1% diversion within six months with 95% probability, even if inspectors spot only one illicit chip in four. Walk-through inspections rule out hidden clean rooms. Inspection protocols follow CWC practice (in the US: consent, administrative warrant, or criminal warrant for challenge inspections). More inspector access lowers the hidden capacity a state is assumed to hold. "Whole-lab" inspections serve as a stopgap while technical monitoring is built. |
  
++Effectiveness:++  
Q: Under ideal conditions – do physical chip inspections actually slow capability development, or just constrain an imperfect proxy?  
  
**On its own, no.** An inspection confirms that declared chips are where they should be, at one moment. It does not show what they computed before or after, and it cannot see undeclared sites. Like the ledger, it constrains a proxy (hardware), one step further from capability than compute use, and that proxy erodes with algorithmic efficiency gains. Its value is as the independent anchor that makes records, seals and sensors credible. The exception is chips required to be *off*: inspection can verify that directly, and chips that are off cannot train.  
  

| Specific use of physical chip inspections | Likelihood of leading to a slow down in capability development on its own | Why? |
| ------------------------------------------ | ------------------------------------------------------------------------- | ---- |
| Spot-checking declared inventories against the ledger (random serial samples) | Very low | Verifies a count, not a use; its value is keeping the register honest. |
| Verifying location rules and export controls: chips have not left declared sites | Low | Deters diversion from declared sites, but only between visits if paired with seals or cameras; blind to undeclared sites. |
| Verifying that chips are powered off or sealed in reserve | High for the chips covered | The easiest claim to verify on site, and switched-off chips cannot train. |
| Verifying physical limits on training: interconnect "pods", inference-only retrofits, tamper-evident seals | Medium | Supports a training cap without code access, but distributed training needs far less bandwidth than before, so pod limits erode. |
| Fab inspections to enforce a production halt or cap | Medium–high | Few fabs, and output can be reconciled and sampled; stops new training capacity being made. |
| Challenge inspections of suspected undeclared sites | Low–medium | Deterrent value; depends on intelligence leads and fast access. |
| Continuous resident inspection of frontier-scale clusters, combined with workload checks | Medium–high | Closest to verifying "no prohibited run", but the most invasive and costly option. |
  
++Incentive compatibility++  
  
Q: Will the relevant actors have reasons to cooperate, circumvent, or undermine it?  
  
Domestic, cooperative operators are likely to comply, especially if inspection is the price of a licence. The binding resistance comes from states that refuse foreign inspectors at strategic sites; that refusal can block an agreement outright.  
  
- **Data-centre and cloud operators:** inspections cost downtime, staff time and physical security, and expose layouts and other tenants' secrets. In return, passing inspection is what lets chips keep earning: only verified data centres may keep serving AI; monitored chips may keep running permitted work; licences depend on compliance. Firms in friendly jurisdictions are "minimally adversarial" and likely to comply.  
- **AI developers:** low invasiveness if inspectors only count chips. Much higher under whole-lab inspections or inspectors with code access.  
- **States:** foreign inspectors at strategic or military sites are the hardest sell. AI 2040's Plans B and C show the failure case: the US calls foreign inspectors a nonstarter, so no verified deal is reached. Reciprocity, mutually approved inspectors, caps on challenge inspections and lighter physical access for sensitive sites are the main concessions.  
- **Perverse incentive:** frequent visits push capacity into smaller or foreign sites that are harder to inspect.  
- **Inspectors:** a compromised inspector could gather intelligence, plant devices or damage equipment, so vetting and approval by both sides matter.  
  
Levers that improve compatibility: licences or continued operation tied to inspection; managed access and "information barriers" so that only compliance-relevant facts leave the site; automated checks, with inspectors sent only to investigate alerts; and consequences for refusal agreed in advance.  
  
++Verifiability and enforceability++  
  
Q: Can violations be detected, and can restrictions be credibly enforced?  
  
Inspection is itself a verification tool. It is strong for claims about declared sites at the time of the visit, weak between visits and blind to undeclared sites. Enforcement depends on what happens when access is refused.  
  
- **What it establishes well:** presence, absence and count of chips at declared sites; that chips are off or sealed; physical configuration (cabling, retrofits); fab output against wafer logs. From inside, a large AI data centre is unmistakable.  
- **Shallow checks fail.** In a 2024–25 case, smugglers allegedly diverted $2.5B of servers to China by moving labels and serial numbers onto dummy servers in the original boxes; auditors from Supermicro and the US Commerce Department unboxed them and were fooled. A proper inspection removes chips from racks, checks serials against the expected list and plugs each chip into a workstation to attest its hardware and firmware, which is intrusive and slow, especially for warehoused chips.  
- **Accurate but expensive:** inspections give more detailed evidence and fewer false alarms than remote location checks, but cannot be repeated often. In 10.5 million simulated scenarios they never detected more diverted chips per dollar than ping-based checks.  
- **Statistical power:** random sampling catches large-scale diversion cheaply, but can miss a small hidden stock.  
- **The snapshot problem:** chips can be moved after a visit. Surprise timing, seals, cameras and portal logs narrow the window, but add access and trust requirements; visit frequency should match how quickly a prohibited run could happen.  
- **Limits of tamper-evidence:** one study found that all 289 tamper-evident seals it tested, including some used for nuclear materials, could be defeated cheaply; better seals look feasible with investment.  
- **Refusal:** without a pre-agreed response, inspection rights fail exactly where suspicion is highest. MIRI: chips that cannot be verified must be switched off; Hardwired: licences are lost.  
  

| Circumvention strategy | How likely? | Discussed |
| ---------------------- | ----------- | --------- |
| Keep chips at undeclared sites (inspections cover declared sites only) | High for states holding unrecorded stock | Atlas 05; AI 2040 App. D; Verification Plan; Hardwired §6.4; MIRI Art. X |
| Keep chips offline or warehoused, where attesting them means unpacking and powering each one | Medium | CSET |
| Move chips out before an announced visit and back afterwards | High if visits are announced; low with surprise visits and cameras | Atlas 05; S&T |
| Hide chips in areas excluded for security or customer confidentiality | Medium | Atlas 05; MIRI Art. VII |
| Show declared racks while training on remote capacity elsewhere | Medium | Atlas 05 |
| Swap labels, copy identifiers, use lookalike devices or fabricate matching paperwork | High against label or serial-only checks (already happened); low if each chip is attested | Atlas 05; CSET (case study); Sastry §4 (unclonable IDs) |
| Tamper with chips, seals or monitors between visits | Medium | CNAS; Atlas 05 |
| Re-cable or reconfigure clusters after inspection | Medium | Pause Button; S&T |
| Spread training across many small sites that are inspected rarely | Medium | S&T; Pause Button; MIRI Art. V |
| Delay access to run down the clock, or dispute the scope of the visit | Medium | MIRI Art. X; Atlas 05 |
| Co-locate AI chips with military or other sensitive facilities to restrict access | Medium | S&T; MIRI Art. VII |
| Compromise or co-opt inspectors, or steer the choice of "favourable" auditors | Low–medium; higher where the inspected firm picks its auditors | Atlas 05; CSET (case study) |
| Show inspectors only part of a fab's output | Low (wafer reconciliation and sampling) | Hardwired §3.3.4, §5.3 |
  
++Strategic consequences++:  
  
Q: Do physical chip inspections shift competitive or geopolitical advantages in ways that undermine its original purpose?  
  
Inspection rights change the strategic balance mainly through espionage risk and unequal inspectability.  
  
- **Intelligence both ways:** inspectors see layouts, security procedures, tenants and hardware placement. Reciprocal regimes give each side a window into the other's infrastructure, which is a reason to agree and a reason to refuse.  
- **Unequal inspectability:** privately run, commercially open facilities are easier to inspect than state or military ones. If sensitive sites get lighter access, assurance is weakest where risk may be highest, and the more transparent party may be bound more tightly (our inference).  
- **Displacement:** inspection costs push capacity to smaller or foreign sites, a form of regulatory flight.  
- **Crisis signalling:** turning inspectors away is a visible sign of defection. That gives early warning but can also speed escalation.  
- **Market structure:** costs rise with the number of sites, which favours a few large, consolidated operators.  
- **Upside:** decades of IAEA, OPCW, START and INF practice show that inspections can build trust between rivals, and an inspectorate's expertise carries over to later regimes.  
  
++Coverage and targeting++  
  
Q: Do physical chip inspections cover the relevant actors and activities without unnecessarily restricting beneficial development?  
  
Inspections cover only what is declared or flagged. Their reach depends on the ledger and on intelligence; their burden depends on the number of sites.  
  
- **Actors:** declared sites only; undeclared sites need supply-chain evidence or intelligence first.  
- **Scale:** there are tens of thousands of data centres worldwide, of which only a small fraction hold AI chips; fewer than 20 fabs make cutting-edge AI chips. Costs grow with the number and spread of sites: roughly $9–49 per chip inspected plus $2,600–6,000 per cluster visit [CSET cost model]; hence risk-based frequency and consolidation into fewer facilities.  
- **Activities:** AI chips can be told apart with minimally intrusive inspection; halls mixing AI and non-AI equipment make this harder, hence MIRI's advice not to co-locate them.  
- **Beneficial development:** inspection does not stop use, and monitored chips can keep serving inference; opening racks and maintenance windows do disrupt service.  
- **What it misses:** what chips compute (unless inspectors get code access), algorithmic progress, and capacity rented remotely.  
  
++Robustness++:  
  
Q: Can physical chip inspections survive imperfect implementation, adapt to changing circumstances, and be lifted when appropriate?  
  
Fairly robust and easy to scale up or down, but politically fragile: it depends on continued access.  
  
- **Imperfect implementation:** it degrades gracefully if every report is a bounded statement of what was inspected, what was seen, what was inaccessible and how it compares with records. The failure mode is a narrow tour mistaken for a full inventory.  
- **Adaptation:** methods, frequency and scope can be updated by the treaty body and adjusted to risk. Inspections can start now and shift towards investigating alerts as automated location checks on chips mature; CSET recommends exactly this division of labour for export controls.  
- **Lifting:** visits can stop at once, without creating an overhang. A standing inspectorate, however, tends to persist and look for new work.  
- **Political shocks:** access can be withdrawn overnight in a crisis; restarting after a breakdown is harder than continuing.  
  
# Deep dive: AI labs

*Our assessment. "Invasiveness" follows the project's definition: how much effort compliance takes, and how much of what labs see as proprietary information they must reveal.*

Labs are usually tenants, not owners, of the buildings their chips sit in. An inspection regime therefore runs through their cloud and colocation providers, and through other tenants' space.

++What success would require from AI labs++

1. Give inspectors short-notice or surprise access, including to the cloud and colocation facilities where their chips sit.
2. Let inspectors choose serials on arrival, and take sampled chips offline so that each can be attested (checking labels is not enough).
3. Keep rack-level inventories that match the ledger, with chips under seals or cameras between visits.
4. Keep excluded "sensitive" areas narrow, and agree in advance what happens if access is refused.
5. Not re-cable or reconfigure clusters after a visit, and not move capacity to sites that are harder to visit.
6. Under whole-lab variants, accept inspectors with access to code and staff, a much more invasive step.

++How invasiveness shapes labs' behaviour++

| Dimension | What it asks of labs | Likely lab response | Second-order effect |
| --------- | -------------------- | ------------------- | ------------------- |
| Compliance effort | High: downtime while chips are removed and attested, escorts, staff time, security vetting; costs rise with the number of sites | Press for announced rather than surprise visits; consolidate into a few large sites; design halls for inspection | Announced visits weaken the check. Consolidation helps verification but concentrates compute and favours operators that can afford purpose-built sites |
| Proprietary information | High: inspectors see data-centre layouts, security procedures, network topology (which can reveal how training is set up) and other tenants' equipment; foreign inspectors add espionage risk | Narrow the scope; claim confidentiality exclusions; segment facilities; move sensitive work to unvisited sites | Exclusions can swallow the inspection; segmentation raises labs' own costs; work drifts to smaller or foreign sites |

++Second-order effects to watch++

- **Passing becomes the goal:** measures that are easy to audit attract effort even when they track risk poorly.
- **Demand for less invasive alternatives:** labs and clouds have a reason to back remote location checks or FlexHEGs to replace routine visits, the division of labour CSET recommends (our inference).
- **Uneven cost:** downtime hurts most for labs without spare capacity.
- **Internal security posture:** labs may harden internal segmentation against inspectors, slowing their own operations.

++What would lower resistance++

Managed access that records only compliance facts; inspectors approved by both sides; risk-based frequency; remote checks for routine cases and inspectors only for alerts.

# Policy mapping  
  
++Step 1: policy goals scoring for each intervention++  
  
Give a score/value to each intervention of these 5 on:  
1. Effectiveness: score 1 to 5 on whether actually expected to slow capability development (as opposed to just constrain an imperfect proxy).   
2. Coverage and targeting: score 1 to 5, are the relevant actors and activities targeted?  
3. Incentive compatibility: do we expect the most relevant actors to {cooperate, circumvent, undermine}?  
4. Verifiability and enforceability: score 1 to 5 on whether violations of the intervention can be detected/whether intervention can be credibly enforced  
5. Regulatory burden: score 1 to 5, how much active regulation is needed?  
6. Robustness: score 1 to 5, how flexibly can the intervention be adapted to changing circumstances  
7. Invasiveness for labs: score 1 to 5, how much compliance effort, proprietary information and loss of control it imposes on AI labs  
8. Readiness: available now, in 1–3 years, or in 3+ years
  
E.g. for physical chip inspections:  
  

|  | Pacing effectiveness | Coverage and targeting | Incentive compatibility | Verifiability and enforceability | Regulatory burden | Robustness and flexibility | Invasiveness for labs | Readiness |
| -------------------------- | -------------------- | ---------------------- | ----------------------- | -------------------------------- | ----------------- | -------------------------- | --- | --- |
| physical chip inspections | 2 | 2 | Labs: cooperate domestically. Chip and cloud firms: cooperate if operation depends on it. Leading state: undermine (refuses foreign inspectors). Trailing state: circumvent (undeclared sites) | 3 | 4 | 3 | 4 | Now |
  
*Our assessment. Scored as periodic inspections of declared sites, backed by the ledger, with seals or cameras between visits. Scored against a common yardstick, a coordinated cap on frontier training compute (the Agenda's Case A), using the anchored 1–5 scales in `Scoring method.md`. 5 = best, except regulatory burden and invasiveness, where 5 = heaviest.*  
- **Effectiveness:** verifies hardware, not use; only switched-off or sealed chips are directly prevented from training.  
- **Coverage:** declared sites only; reach grows with the ledger and intelligence.  
- **Verifiability:** strong snapshot of declared sites; weak between visits and blind to undeclared sites unless continuous monitoring and intelligence are added.  
- **Regulatory burden:** a trained, vetted inspectorate, access rights, warrants and dispute procedures; proper checks take chips offline to attest them [CSET]. Continuous monitoring and challenge inspections push it to the maximum.  
- **Robustness:** easy to adjust and lift; fragile to withdrawal of access in a crisis.  
- **Invasiveness for labs:** high: downtime while chips are attested, and inspectors see layouts, security and network topology.  
  
  
++Step 2:++  
  
Strategic consequences and incentive compatibility analysis.  
→ Use this as input to produce a policy recommendation and a theory of change for each intervention/classes of interventions.  
  
**Strategic consequences and incentives in one line:** inspection is technically ready now and acceptable domestically, but its international form trades assurance against espionage exposure, and refusal of access can block or end a deal.  
  
**Theory of change.** The ledger defines what should be where → inspectors independently confirm a random, unpredictable sample on site, and seals and cameras cover the gaps between visits → diverting declared chips becomes detectable and costly → states can trust each other's declarations enough to agree compute limits → combined with intelligence for undeclared sites and workload checks for use, this makes coordinated pacing verifiable. It rests on three assumptions: inspectors get unpredictable, independent sampling; refusal carries pre-agreed consequences; undeclared capacity is small (the ledger's job).  
  
**Policy recommendation (our assessment), from least to most invasive:**  
1. *Now, domestic:* regulator audits of large declared sites against ledger records: record review plus serials chosen after arrival, with each sampled chip attested rather than its label read [CSET]. Every report states what was and was not examined [Atlas 05; S&T].  
2. *Pilot and red-team:* a trial at a site with installed chips, spares and equipment under repair, then an unannounced repeat; an adversarial exercise with a hidden storeroom, swapped labels and a shipment during the visit [Atlas 05].  
3. *When pacing is on the table:* reciprocal international inspections, largest sites first; consolidation to cut the number of sites; seals and cameras between visits; challenge inspections with fast access and agreed consequences for refusal; managed access, information barriers and inspectors approved by both sides [MIRI Arts. V, VII, X; Sastry §5].  
4. *Over time:* move routine checks to automated location attestation on chips, keeping inspections for alerts, offline or warehoused chips, and tamper checks, which lowers invasiveness and cost [Atlas 05; S&T; CNAS; CSET].  
  
**Verification vs invasiveness.** Inspection is the clearest case of the trade-off: assurance rises with access (surprise timing, rack access, free choice of samples, entry to sensitive rooms). For AI labs it is minimally invasive when limited to counting chips; for data-centre operators, other tenants and states hosting foreign inspectors it is among the most invasive tools available.  
  
# Sources  
  
- **Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.  
- **Atlas 05 / Atlas briefs:** Pacing Verification Atlas, mechanism page "Physical chip inventory inspection" and the four proposal briefs.  
- **S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI.  
- **MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.  
- **AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*.  
- **Verification Plan:** Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*, ai-2040.com/supplements/verification-plan (read up to its 2033 section).  
- **Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.  
- **Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.  
- **Sastry:** Sastry et al. (2024), *Computing Power and the Governance of Artificial Intelligence*, arXiv:2402.08797.  
- **CNAS:** Aarne, Fist & Withers (2024), *Secure, Governable Chips*, CNAS.  
- **CSET:** Feldgoise, Miller & Dohmen (2026), *Tracking AI Chips: Assessing Location Verification as an Export Control Enforcement Tool*, CSET; cost figures from the companion article *Tracking AI Chips: What Does It Cost?* (cset.georgetown.edu).  
