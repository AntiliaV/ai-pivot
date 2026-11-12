# Background mapping of FlexHEGs  
  
**In brief.** Flexible hardware-enabled guarantees (FlexHEGs) are proposed security systems added to AI chips. Each chip sits in a **tamper-proof enclosure** with a small **guarantee processor** that sees all data and instructions going to and from the chip and runs a **programmable, updateable ruleset**. They can work in two modes. In *verification* mode, the chip produces cryptographically signed "receipts" that let its owner prove narrow claims (e.g. "this model was trained with less than X FLOP") without revealing code, data or weights. In *enforcement* mode, the processor blocks prohibited computations, or stops the chip working without a valid licence. If the enclosure is breached, secrets are wiped and the chip can be disabled. To be trusted by rivals, the design must be open source, auditable and secure even against state-level attackers. FlexHEGs do not exist yet: early versions could build on existing "confidential computing" features and be retrofitted to current chips, but high-security versions are years away. Unlike the chip ledger and inspections, which track hardware, FlexHEGs can check what the chips are actually computing.  
  
++What Pacing Proposals Say about FlexHEGs++  
  
What do each of the pacing proposals say about FlexHEGs?  
  
No proposal relies on FlexHEGs today. All treat them, or similar on-chip mechanisms, as a later upgrade to cruder near-term tools. Two of the four (Hardwired, AI 2040) deliberately design around them because they judge firmware-level security insufficient against a state adversary in the near term.  
  
| Proposal | Role of FlexHEG-type mechanisms | Timing | Distinctive design choices |
| -------- | ------------------------------- | ------ | -------------------------- |
| **Building the Pause Button** | Named explicitly as the foundation for hardware controls across the AI lifecycle: FLOP accounting and caps, dataset limits, architecture checks, licensed use (§6.1.1–6.1.2). | "Several years" of research; not yet deployable. Nearer-term options run in parallel: offline licensing via firmware (<1 year, low tamper-resistance), fixed sets with interconnect limits (<1 year), model locking (1–5 years) (Table 2). | Tamper-proof FLOP caps built from FlexHEG "receipts" halt any run about to exceed its authorised compute. A governance body sets thresholds, certifies hardware designs and authorises firmware updates; designs are open source. Notes that training could be split into many runs that each stay under the cap ("task splitting"). |
| **MIRI agreement** | One option for verifying chip use: "on-chip hardware-enabled mechanisms", including retrofits and remote deactivation that let the Executive Council disable chips (Art. VII.1(d)). | Not relied on: current chips are judged insecure, so chips must be consolidated and monitored on site until such mechanisms mature. Cites 2–5 years for ideal mechanisms (less secure versions in months), and notes little progress since; retrofitting in 1–2 years if chips are already tracked (Art. V notes). | Preparation phase includes R&D on hardware-enabled mechanisms, an interagency group and a public–private partnership. Once mature, they would allow chips to be governed without centralising them. |
| **AI 2040: Plan A** and its **Verification Plan** | Not named. The pause is verified with "simple, passive" network taps and recomputation servers instead, because a fully trustless, low-cost solution "is not mature". | Later upgrades: secure gateways, hardware-derived keys, offline licensing to support compute destruction, more robust trusted execution (around 2033) [Verification Plan]. | In the breakdown branch, chips in the transparent training data centres need regular "continue" messages from each great power, in effect a multilateral operating licence, and become bricks when the deal collapses. Cryptographic proof schemes are called more speculative. |
| **Hardwired Pause** | Chooses physical specialisation (inference-only chips) over programmable guarantees: for a near-term treaty, it assumes firmware- and driver-level guarantees will not survive a state-level adversary (§4.2, fn. 41). | FlexHEG ideas could help monitor the remaining training-capable chips during the transition (§1). Trusted execution environments and formal methods could tighten verification later (§3.3.3). | Licensed chips are fitted or retrofitted with on-chip location attestation (§3.3.2). Treaty authorities may accept firmware guarantees if shown evidence that they are secure enough. |
  
++Effectiveness:++  
Q: Under ideal conditions – do FlexHEGs actually slow capability development, or just constrain an imperfect proxy?  
  
**It depends on the mode.** In verification mode, FlexHEGs only produce information, which slows nothing by itself; at most it changes incentives by making commitments credible. In enforcement mode (rules, licences, multilateral approval), they can block capability development directly, on every equipped chip. They are also less of a proxy than the ledger or inspections: they can check the workload itself (FLOP, data, training techniques, whether evaluations were run), not just the hardware. Two limits remain. Intent is invisible on-chip. And they only govern equipped chips, so their pacing effect scales with the share of frontier compute that carries them. Every rating below assumes a mature, secure implementation, which does not yet exist.  
  

| Specific use of FlexHEGs | Likelihood of leading to a slow down in capability development on its own | Why? |
| ---------------------------- | ------------------------------------------------------------------------- | ---- |
| Verifying or restricting chip location | Low | Verification shows where chips are; restriction stops them operating in the wrong place. Neither limits training. |
| Securing model weights and controlled deployment (weights can only move to approved devices, with safeguards on) | Low for capability; high for pacing *diffusion* | Does not limit training, but can tightly control who can use a model and how, including the bounded black-box access to rivals' models that Petrie et al. describe. |
| Verifiable, mutually privacy-preserving evaluations | Low | Informs pause decisions without revealing the model or the test; already prototyped on confidential computing. |
| Required evaluations during large training runs, with training blocked above a capability threshold | Medium | Directly gates progress, but only as well as evaluations resist sandbagging, which is an open problem. |
| Maximum-cluster-size baseline rule | Medium | Stops equipped chips joining large clusters unless licensed; weaker as distributed training improves. |
| Verified limits on total training compute (FLOP caps via "compute accounting") | High within the equipped fleet | Blocks any run that would exceed the cap and can prove no such run happened; still a compute proxy that erodes with efficiency gains. |
| Time-limited operating licences for large runs | High | Development continues only while an authority keeps renewing the licence; refusing to renew acts as an off switch that the owner cannot block. |
| Multilateral approval of large training runs (a quorum of states must sign) | High | Turns a pause into a technical default that no single state can lift unilaterally, but makes the heaviest demands on sovereignty. |
  
++Incentive compatibility++  
  
Q: Will the relevant actors have reasons to cooperate, circumvent, or undermine it?  
  
FlexHEGs mainly solve the *information* half of the coordination problem: by making commitments verifiable, they remove the fear that rivals are secretly racing. They do not remove the incentive to defect itself, which moves to non-equipped compute and to attacking the mechanism. Enforcement mode addresses that, but raises the question of who holds the keys.  
  
- **Chip designers** (Nvidia etc.): face R&D cost, performance overhead and harder cooling for enclosures, and are reluctant to open-source security modules such as Nvidia's GPU System Processor. Their payoff is market access: CNAS proposes export-market commitments for chips with the features; Petrie et al. suggest secure chips could be sold into less trusted jurisdictions.  
- **AI developers and clouds:** demand already exists for confidential computing to protect model weights, so verification mode fits their interests, and receipts reveal far less than inspections or code access. Enforcement mode is far less attractive: a remote off switch, rules they do not set, and the risk of a bug halting their fleet.  
- **States:** verification-only FlexHEGs give no new coercive power. Enforced rulesets bind even the most powerful states, which appeals to weaker states and less to leaders. Rivals will not trust a device designed and made by the other side without reviewing designs, sampling chips for destructive reverse-engineering and overseeing manufacturing. An internationally binding ruleset can read as a loss of sovereignty.  
- **Whoever controls licences, landmarks and updates** gains leverage over everyone's compute. Petrie et al. propose multi-state signatures, anonymised location pings and trusting several states' landmarks.  
- **Stability:** Petrie et al.'s game-theoretic model finds a FlexHEG-verified agreement stable if a defector's chance of winning a race is capped at 75% or less, players see at least a 10% risk of catastrophe without coordination, and they value winning no more than 1.5× an agreed balance of power [Petrie p.15].  
  
++Verifiability and enforceability++  
  
Q: Can violations be detected, and can restrictions be credibly enforced?  
  
In principle the strongest of the compute tools: violations generate cryptographic evidence, and rules can be enforced by the chip itself. In practice this rests on unproven security, and it covers only equipped chips.  
  
- **What it could establish:** signed receipts for FLOP, data and training steps, aggregated across devices into minimal claims; *negative* claims, by accounting for all of a data centre's capacity (compute accounting); verified location; cluster configuration; where weights have been sent.  
- **Security is the crux.** One exploitable flaw shared by every chip can be found once and used everywhere, so a state may spend heavily to break it (CNAS: an actor holding $500M of chips might spend another $500M to defeat their disabling mechanism). Hardware flaws cannot be patched after manufacture; fixing them may mean replacing millions of chips. The Hardwired Pause therefore assumes firmware-level guarantees will not survive a state attacker in the near term.  
- **Coverage gap:** FlexHEGs say nothing about chips without them. Petrie et al. themselves call for fab monitoring and an international chip registry against secret data centres, and judge occasional physical inspections, and thus a registry, a "practical necessity" for early versions.  
- **Trust in the design:** open source, published designs, red-teaming, and destructive reverse-engineering of sampled units.  
- **Limits of on-chip knowledge:** chips cannot see intent, and claims that cannot be stated precisely cannot be checked automatically; they then need logs shared with a verifier, which is less private.  
  

| Circumvention strategy | How likely? | Discussed |
| ---------------------- | ----------- | --------- |
| Use non-FlexHEG compute: legacy chips, consumer GPUs, chips from a state's own fabs | High until most frontier compute is equipped | Petrie p.13–16; Baker; MIRI Art. V; Hardwired §6.4 |
| Split a training run, or build a larger system from modules (e.g. mixture of experts) that each stay under the limit | High | Petrie p.36–37; Pause Button §6.1 ("task splitting") |
| Disguise the purpose of permitted computation (intent is invisible on-chip) | High for misuse rules; low for compute caps | Petrie p.16–17 |
| Squeeze more capability out of permitted compute through algorithmic efficiency | Medium–high: ordinary engineering, within the letter of the rule | Agenda §3.2, §5.1; Sastry §5 |
| Exploit bugs in the guarantee processor's firmware or in compute accounting (e.g. smuggling compute in through "training data" inputs) | Medium in early versions; falls with red-teaming | Petrie p.16, 28; Baker; CNAS |
| Physically tamper with the enclosure or extract the chip's signing key | Medium for state actors, low for others | CNAS; Baker; S&T; Hardwired fn. 41 |
| Move weights off the FlexHEG ecosystem, then fine-tune or merge them elsewhere | Medium; gain likely bounded by about one order of magnitude of compute | Petrie p.36 |
| Spoof location, or change the end user without moving the chip | Medium | CSET; Petrie p.30 |
| Keep chips offline or refuse updates to escape rule changes | Low if licences or rulesets expire unless renewed | Petrie p.8, 32–33; CNAS |
| Capture or abuse the licensing authority, landmarks or update keys | Medium | Petrie p.15, 34; Sastry §4–5 |
| Exit by resuming production of non-FlexHEG chips (states with fabs) | Low short term, rising over years | Petrie p.15; Sastry §5 |
| Shift development to non-participating jurisdictions | Low for private labs (frontier compute is costly to move); medium for states | Agenda §5.1; Petrie p.13 |
  
++Strategic consequences++:  
  
Q: Do FlexHEGs shift competitive or geopolitical advantages in ways that undermine its original purpose?  
  
The main risk is that the mechanism's control points become strategic assets, and that chips with someone else's off switch push rivals to build their own.  
  
- **Who holds the keys:** licences, landmarks and update signatures can disable or redirect compute. If the mechanism grows out of US export controls, others will see it as a US lever, which strengthens their incentive to build an independent chip supply chain outside the regime. Multilateral signing mitigates this but is slow to agree.  
- **Systemic security risk:** a disabling mechanism on most of the world's AI chips is an attack surface for criminals, rival states or even misaligned AI systems.  
- **Locking in the balance of power:** binding rulesets fix the current balance of power, which reassures smaller states but could freeze in whoever leads when they are adopted.  
- **Less espionage than inspections:** verification reveals only the compliance claim, which addresses the concern that mutual transparency transfers technology to rivals. This is the main strategic advantage over inspections and code access.  
- **Benefit sharing:** controlled deployment could give rivals or less-trusted countries private, safeguarded access to frontier models without proliferating the weights, reducing the pressure to race.  
- **Lead time:** if R&D starts late, early pacing will rely on more invasive tools (inspections, consolidation), and the precedents those set will stick.  
  
++Coverage and targeting++  
  
Q: Do FlexHEGs cover the relevant actors and activities without unnecessarily restricting beneficial development?  
  
Potentially the best-targeted compute tool, because rules can be written about workloads rather than hardware. But coverage is limited to equipped frontier compute, and to risks that can be described in technical terms.  
  
- **Targeting:** rules can name training compute, data, techniques or evaluation results. Baseline rulesets always allow small clusters and whitelisted workloads (e.g. inference on approved models), and non-AI users can prove their chips did no AI work. This leaves beneficial use largely untouched.  
- **Coverage:** frontier data-centre compute only, and only chips that carry the mechanism. The existing stock needs retrofits or replacement, and determined actors will always reach some unequipped compute.  
- **What it misses:** intent and misuse, who actually benefits from a workload, dangerous low-compute models, and risks that cannot yet be specified precisely.  
  
++Robustness++:  
  
Q: Can FlexHEGs survive imperfect implementation, adapt to changing circumstances, and be lifted when appropriate?  
  
Highly adaptable by design, but fragile to a single deep flaw, and only as trustworthy as whoever governs updates.  
  
- **Flexibility:** rules can change by signed firmware update without renegotiating a treaty; the mode can range from verification only to automatic enforcement; and the update interval itself (e.g. every three months) can be tightened or loosened.  
- **Imperfect implementation:** a flaw found in a widely deployed design compromises every chip at once, and hardware flaws cannot be patched. Hence defence in depth: inspections, whistleblowers and intelligence remain necessary.  
- **Lifting:** rules can be relaxed or removed by update, and licences can simply lapse. But baseline rulesets are hard to change, so bugs in them are permanent; and it is likely infeasible to restrict what future updates may add (e.g. "phoning home" or back doors), so trust depends on governance, not on the chip.  
- **Durability:** states with fabs can leave gradually by making unequipped chips. Readiness is the binding constraint: estimates range from about two years (chip-adjacent prototypes) to five years (secure chips in the installed base) [S&T; CNAS; MIRI].  
  
# Deep dive: AI labs

*Our assessment. "Invasiveness" follows the project's definition: how much effort compliance takes, and how much of what labs see as proprietary information they must reveal.*

FlexHEGs touch labs more directly than the ledger or inspections: they sit on the chips that run labs' training and inference, and can govern what those workloads may do. A third dimension of invasiveness therefore matters here: **loss of control**, meaning who can stop or limit a lab's chips. It may be worth adding to the project's definition.

++What success would require from AI labs++

1. Run frontier work only on FlexHEG-equipped hardware, including labs' or their clouds' own custom chips (e.g. Google's TPUs, Amazon's Trainium), which would need compatible guarantee processors.
2. Install signed updates on schedule, and accept time-limited licences for large runs.
3. Structure distributed training so that compute receipts can be produced and aggregated, and report basic training-run metadata (Petrie et al. suggest this to catch modular workarounds).
4. Keep frontier weights inside the ecosystem and deploy them only on approved devices with the required safeguards, which constrains partner deployments and open-weight releases.
5. Not game per-model limits by splitting runs or building systems from modules, and accept conservative thresholds.
6. Accept some performance overhead, and the risk that a bug halts part of their fleet.

++How invasiveness shapes labs' behaviour++

| Dimension | What it asks of labs | Likely lab response | Second-order effect |
| --------- | -------------------- | ------------------- | ------------------- |
| Compliance effort | Moderate to high at first (integration, performance overhead, update cadence, retrofits or new hardware); low once built into chips | Back early versions built on confidential computing, which also protects their weights; resist costly redesigns | Adoption can start for commercial reasons; but unequipped legacy chips stay attractive as backup capacity, which undermines coverage |
| Proprietary information | Low in verification mode: only the claim is revealed (e.g. "under X FLOP"); higher when claims cannot be checked on-chip and logs must be shared | Prefer verification mode; push for claims that can be checked automatically | The main advantage over inspections; but pressure to formalise rules may favour easily measured proxies over real risk |
| Loss of control | High in enforcement mode: licences work as an off switch, rules are set by others, and a bug or a hostile key-holder can stop the fleet | Lobby over who holds the keys and what the baseline ruleset allows; keep unequipped capacity in reserve | The licensing authority becomes a target for capture; rival "trusted" designs may fragment the ecosystem |

++Second-order effects to watch++

- **Designing to the limit:** per-model limits reward modular systems, mixtures of experts and many smaller runs, like the 1922 "treaty cruisers" built exactly to the tonnage cap. This could redirect the course of AI R&D, not just slow it.
- **Efficiency push:** caps raise the value of getting more capability out of each FLOP.
- **Open-weight strategies:** controlled deployment conflicts with publishing weights, so labs that rely on open release are likely to oppose it.
- **Hardware market:** certified designs could become a moat for the chip designers and clouds that build them first; requiring open-source designs mitigates this.
- **Security co-benefit:** protecting weights is something labs already want, which gives a commercial path to adoption.

++What would lower resistance++

Start with verification-only and commercial security uses; require several states' signatures for rules; a baseline ruleset that guarantees approved workloads; reliability standards and testing before any enforcement.

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
  
E.g. for FlexHEGs:  
  

|  | Pacing effectiveness | Coverage and targeting | Incentive compatibility | Verifiability and enforceability | Regulatory burden | Robustness and flexibility | Invasiveness for labs | Readiness |
| ------------ | -------------------- | ---------------------- | ----------------------- | -------------------------------- | ----------------- | -------------------------- | --- | --- |
| FlexHEGs | 4 | 3 | Labs: cooperate (verification protects their weights). Chip and cloud firms: cooperate if market access depends on it. Leading state: cooperate if it holds the keys. Trailing state: undermine (rejects a foreign off switch; builds unequipped chips) | 4 | 4 | 3 | 3 | 2–5 years |
  
*Our assessment. Scored as the pacing proposals use FlexHEGs (enforcing a compute cap or licence), assuming a mature, secure implementation; today's deployable versions would score lower on verifiability and effectiveness, and verification-only use would score 2 on effectiveness. Scored against a common yardstick, a coordinated cap on frontier training compute (the Agenda's Case A), using the anchored 1–5 scales in `Scoring method.md`. 5 = best, except regulatory burden and invasiveness, where 5 = heaviest.*  
- **Effectiveness:** verification mode informs decisions; enforcement mode blocks development directly, but only on equipped chips.  
- **Coverage:** well targeted at frontier workloads; blind to unequipped compute and to intent.  
- **Verifiability:** strongest of the compute tools in principle; resting on unproven hardware security and on a ledger for unequipped chips.  
- **Regulatory burden:** R&D, standards, design certification, supply-chain oversight and update governance; enforcement adds licensing authorities and multilateral signing.  
- **Robustness:** rules adapt easily; a deep security flaw, or capture of the update keys, undermines everything at once.  
- **Invasiveness for labs:** reveals little information, but enforcement gives others the power to stop or limit labs' chips.  
  
  
++Step 2:++  
  
Strategic consequences and incentive compatibility analysis.  
→ Use this as input to produce a policy recommendation and a theory of change for each intervention/classes of interventions.  
  
**Strategic consequences and incentives in one line:** FlexHEGs promise the best trade-off between verification and invasiveness of any compute tool, but only if they become secure, trusted by rivals and near-universal, and only if no single party controls the keys.  
  
**Theory of change.** Fund R&D and standards now → early versions built on confidential computing spread for commercial reasons (protecting weights) and export-control reasons → mandated for high-security and export uses, red-teamed and open-sourced → when pacing is needed, rivals verify each other's compute use through minimal, private claims rather than inspections → optionally, agreed rules (compute caps, licences, multilateral approval) are enforced by the chips themselves → coordinated pacing with less espionage risk and less reliance on goodwill. It rests on four assumptions: security against state adversaries is achievable; the supply chain can be trusted; nearly all frontier compute is equipped (with a ledger and fab monitoring for the rest); the relevant risks can be stated as technical rules.  
  
**Policy recommendation (our assessment), from least to most invasive:**  
1. *Now:* fund an open-source guarantee processor (building on OpenTitan or Caliptra), verification protocols on existing confidential computing (FLOP claims, private evaluations, controlled deployment) and tamper-evidence for deployed chips [Petrie p.18–19]; fund red-teaming competitions [Baker].  
2. *Create demand:* security and attestation features in export-control conditions, data-centre security standards (e.g. FedRAMP) and government procurement; standards for tamper protection on AI chips [Petrie p.19–20; CNAS].  
3. *Pilot verification mode:* privacy-preserving evaluations and compute-accounting claims between willing parties, on small batches of internationally verifiable compute [Petrie p.18].  
4. *Only under multilateral governance:* enforced rulesets and licences requiring several states' signatures, with a baseline ruleset that guarantees safe uses and with anonymised, multi-landmark location checks [Petrie p.14–15, 34–35].  
5. *Always:* keep the ledger, fab monitoring and inspections alongside; FlexHEGs complement them rather than replace them [Petrie p.13, 17, 25].  
  
**Verification vs invasiveness.** FlexHEGs are the clearest attempt to push this frontier outwards. In verification mode they reveal only the claim being checked (e.g. "under X FLOP"), not code, data or weights, which is far less invasive for labs than inspections or code access. The invasiveness moves elsewhere: into the hardware (a device on every chip, potentially with an off switch) and into governance (who writes the rules and holds the keys). Early versions will still need a registry and inspections.  
  
# Sources  
  
- **Petrie:** Petrie, Aarne, Ammann & Dalrymple (2025), *Flexible Hardware-Enabled Guarantees for AI Compute*, Part I (page numbers refer to Part I; Parts II and III were not reviewed).  
- **Agenda:** Douglas et al. (2026), *Pacing the Frontier: A Framework & Research Agenda*.  
- **MIRI:** Scher, Abecassis, Barnett & Abeyta (2025, v3 May 2026), *An International Agreement to Prevent the Premature Creation of Artificial Superintelligence*, arXiv:2511.10783.  
- **AI 2040:** Larsen et al. (AI Futures Project, 2026), *AI 2040: Plan A*.  
- **Verification Plan:** Dean (2026), *Verification plan*, supplement to *AI 2040: Plan A*, ai-2040.com/supplements/verification-plan (read up to its 2033 section).  
- **Pause Button:** Al Ramiah et al. (2025), *Toward a Global Regime for Compute Governance: Building the Pause Button*, arXiv:2506.20530.  
- **Hardwired:** Working Group on AI Pause Feasibility (2026, v1.0.2), *The Feasibility of a Hardwired Pause of Frontier AI Training*.  
- **S&T:** Scher & Thiergart (2024), *Mechanisms to Verify International Agreements About AI Development*, MIRI.  
- **Baker:** Baker, Kulp, Marks, Brundage & Heim (2025), *Verifying International Agreements on AI: Six Layers of Verification*, arXiv:2507.15916.  
- **CNAS:** Aarne, Fist & Withers (2024), *Secure, Governable Chips*, CNAS.  
- **Sastry:** Sastry et al. (2024), *Computing Power and the Governance of Artificial Intelligence*, arXiv:2402.08797.  
- **CSET:** Feldgoise, Miller & Dohmen (2026), *Tracking AI Chips: Assessing Location Verification as an Export Control Enforcement Tool*, CSET.  
