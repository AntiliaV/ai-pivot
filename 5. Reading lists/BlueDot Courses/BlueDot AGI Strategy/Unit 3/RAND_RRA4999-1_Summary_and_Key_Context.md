---
title: "Building a Defense-in-Depth Biosecurity Strategy for the AI Era"
authors: "Steph Guerra, Aurelia Attal-Juncqua, John P. Tarangelo, Casey Aveggio, Katie Dammer, David Glickstein"
publisher: "RAND Corporation"
report_number: "RR-A4999-1"
year: 2026
source_file: "RAND_RRA4999-1.pdf"
extract: "Summary (pp. v–vii) and Chapter 1 'Key Context' (pp. 2–3), text rendered verbatim"
---

# Summary

*(printed pages v–vii)*

The convergence of artificial intelligence (AI) and biology offers great promise for such fields as medicine and public health, and it promises the potential to yield transformative societal benefits. Yet this same convergence could introduce serious risks to global health and national security. As capabilities continue to advance, AI-enabled biotechnology might lower the technical, operational, and motivational barriers to creating biological weapons. It might also enable devastating attacks involving enhanced or novel pathogens, including events far worse than historical pandemics that caused many millions of fatalities globally. The dual-use nature of biotechnology requires proactive mitigation measures to counter these high-consequence threats.

Therefore, we undertook an effort to identify which mitigation measures that have been proposed to date provide the greatest protection in aggregate against the most serious AI-enabled biological incidents, which are those enabled by human-transmissible pathogens. There has been limited systematic analysis of how mitigations interact across the biological risk chain, how they address different actor profiles, and how robust they remain under divergent AI futures. With this report, we seek to move beyond cataloging options and toward structuring them into an integrated prevention framework.

To develop a mitigation strategy that is robust, complementary, and deployable across a wide variety of threat scenarios, we considered each essential step of the bioweapon-development pathway prior to an attack, from ideation to weaponization, and assessed the capabilities of various actor types to achieve such weapons. We then examined how different prototype networks of mitigations added friction to five primary milestones that nefarious actors must bypass to successfully execute an attack using AI-enabled biological weapons. These milestones are (1) developing and sustaining motivation to cause harm using biological means, (2) using the appropriate tools and data to ideate and design an enhanced or novel biological threat, (3) accessing the right information and expertise to successfully execute the steps to biological threat development and weaponization, (4) obtaining the appropriate precursor materials and equipment to translate designs to physical manifestations, and (5) circumventing biosecurity controls and law enforcement to avoid detection.

Next, we further evaluated these prototype networks of mitigations against representative threat actor profiles to stress test the network and determine the interplay between different mitigations. A central finding from this analysis is that different actor profiles are susceptible to different classes of mitigations, such that coverage across the different harm pathways is necessary to create defense-in-depth that meaningfully prevents misuse. Some actors appear relatively amenable to disruption but are difficult to deter, while others appear difficult to disrupt but are more susceptible to deterrence. This trade-off motivates the creation of a layered strategy that combines approaches rather than one that relies on any single intervention at any single node to achieve defense-in-depth that prevents harm across several pathways (see Figure S.1).

Our findings suggest that a strategy that pairs disruption-oriented mitigations with credible deterrence- and detection-oriented backstops is more robust than one that concentrates investment at any single point. In-depth discussion of the analyses and stress testing that led to the selection of these nine mitigations can be found in Chapter 3.

From our assessment, nine priority mitigations emerged to form a layered, defense-in-depth protection approach, as outlined in Table S.1. This strategy has dense coverage across early stages of the biological weapons risk pathway and a central focus on the design-build-test-learn cycle primarily because we seek to reduce actors' capacities to effectively design a novel pathogen that could initiate global-scale consequences. However, none of these early-stage mitigations will be perfectly implemented: Information controls can be circumvented or are irrelevant for expert actors, synthesis screening has coverage gaps, and access-controlled platforms can be exploited by credentialed insiders or sufficiently resourced actors. In these cases, disruption shifts to additional layers, such as the proactive detection of misuse behavior across the risk chain and the deterrence of nefarious activity. Taken together, these mitigations are designed to maximize the upsides of tomorrow's innovations without enabling pandemic-scale harm.

We detail these mitigations in this report along with key considerations for their adoption and implementation. In Chapter 4, we provide an outline of how policymakers and decisionmakers in the public and private sectors can work collaboratively to advance this mitigation strategy for preventing global-scale AI-enabled biological incidents.

> **[FIGURE S.1 — "Example of Layered Defense Achieved by This Report's Mitigations" — graphic not reproduced.]**
>
> NOTE: BT = biological tool; CW = closed weight; DNA = deoxyribonucleic acid; LLM = large language model; OW = open weight; RNA = ribonucleic acid.

## Table S.1. Summary of the Mitigation Strategy

| Mitigation Class | Mitigation |
| --- | --- |
| Manage access to dangerous and dual-use information | • Development of tamper-resistant safeguards for open-weight AI models<br>• Protection of sensitive biological data<br>• Access-control platforms and mechanisms for dual-use AI systems |
| Disrupt materials access | • Biological precursor screening |
| Deter nefarious activity | • Pathogen early-warning systems<br>• Bioattribution and forensics<br>• Demonstrated rapid-response and consequence-mitigation capabilities |
| Detect misuse signals proactively | • Real-time monitoring and reporting of misuse of closed-weight general-purpose AI models<br>• Centralized AI x Bio information-sharing nexus |

NOTE: AI x Bio = the intersection of AI and biology.

## Key Findings

- **Different threat actors require different prevention mechanisms.** Resource-constrained individuals might be thwarted at material or information access chokepoints. However, technologically sophisticated or well-resourced groups, such as state actors, might be immune to access controls and therefore require deterrence through elevated perceived costs and a degraded expected utility of attack.
- **Prevention must evolve beyond access controls alone.** Although restricting dual-use information and materials remains necessary, determined actors with sufficient resources can circumvent these barriers. An effective strategy, therefore, requires a complementary detection architecture that identifies and disrupts misuse patterns in digital and physical domains before they culminate in harm, shifting the paradigm from denial to integrated monitoring and early response.
- **Aggregate signals matter.** Threat actors operating across multiple nodes of the AI-biology ecosystem—probing different models, querying multiple synthesis providers, sourcing materials from separate vendors—produce signals that appear ambiguous when observed individually but form identifiable patterns of concern when analyzed collectively. Realizing this aggregate value requires centralized AI x Bio information-sharing infrastructure that no single entity can provide alone.
- **Invest early.** Implementing this strategy's mitigations will require investments in new research, institutional adaptation, legal clarification, and international coordination. Waiting until more-advanced biological threats are undeniable will be waiting too long.

---

# Key Context

*(Chapter 1, "Introduction and Background," printed pages 2–3)*

## AI and Emerging Biological Risks

In this report, AI refers broadly to machine learning–based systems, including both established approaches used in biological research and more-recent advances in foundation models and AI agents. These systems play different roles across the biological workflow. General-purpose models support reasoning and design tasks, agents can coordinate multistep processes, and domain-specific BTs enable such tasks as protein-structure function prediction or sequence analysis. Increasingly, these components are being combined within integrated workflows that accelerate biological research and development.

Advances in these systems and tools over the past several years have expanded the variety of tasks that can be automated, accelerated, or optimized across scientific and operational domains.[^4] In biology, such advanced AI systems can assist with protein-structure prediction,[^5] genome modeling, experimental planning, workflow optimization, and large-scale information synthesis.[^6] These developments offer substantial benefits for medicine, biotechnology, and research productivity.

At the same time, the integration of AI into biological research environments surfaces new potential risks. Indeed, AI systems can reduce knowledge requirements, accelerate experimental iteration cycles, and shift aspects of biological insight into earlier, digital stages of the development process, during which oversight mechanisms might be weaker.[^7] AI systems can also support coordination, planning, and information acquisition in ways that expand the number of actors who could feasibly achieve a successful biological attack. For GPAI systems, this often represents a redistribution of capability rather than a wholly new category of risk across existing threat pathways. However, biological design tools might introduce meaningful novelty into the risk landscape—introducing unprecedented capabilities that existing frameworks were not designed to address. These dynamics might become more pronounced as laboratory automation, cloud-based experimentation platforms, and AI-integrated research environments continue to develop. For example, cloud laboratories and other remotely or autonomously operated experimental platforms could allow users to move from digital design to physical testing without being physically embedded in a laboratory, while automation of routine experimental steps could reduce a reliance on tacit bench expertise for setup, execution, and iteration.[^8] Integrated systems that combine model-assisted design, protocol generation, materials ordering, and experiment management could also redistribute parts of the workflow that once depended on highly trained researchers across a wider variety of users. In such settings, the boundary between digital design and physical execution might become increasingly compressed, reducing reliance on tacit expertise and shifting key control points earlier in the workflow, including toward platform access, upstream design choices, and procurement pathways. This evolution could both amplify efficiency gains and introduce new challenges for oversight and intervention, particularly when end-to-end processes become more accessible within integrated or remotely accessible systems.

### Footnotes

[^4]: Cyndy S. Groff-Vindman, Benjamin D. Trump, Christopher L. Cummings, Madison Smith, Alexander J. Titus, Ken Oye, Valentina Prado, Eyup Turmus, and Igor Linkov, "The Convergence of AI and Synthetic Biology: The Looming Deluge," *npj Biomedical Innovations*, Vol. 2, July 1, 2025.

[^5]: Lingtao Chen, Qiaomu Li, Kazi Fahim Ahmad Nasif, Ying Xie, Bobin Deng, Shuteng Niu, Seyedamin Pouriyeh, Zhiyu Dai, Jiawei Chen, and Chloe Y. Xie, "AI-Driven Deep Learning Techniques in Protein Structure Prediction," *International Journal of Molecular Sciences*, Vol. 25, No. 15, August 1, 2024.

[^6]: Kang Zhang, Xin Yang, Yifei Wang, Yunfang Yu, Niu Huang, Gen Li, Xiaokun Li, Joseph C. Wu, and Shengyong Yang, "Artificial Intelligence in Drug Development," *Nature Medicine*, Vol. 31, January 2025.

[^7]: Jaspreet Pannu, Doni Bloomfield, Robert MacKnight, Mortiz S. Hanke, Alex Zhu, Gabe Gomes, Anita Cicero, and Thomas V. Inglesby, "Dual-Use Capabilities of Concern of Biological AI Models," *PLoS Computational Biology*, Vol. 21, No. 5, May 8, 2025; National Academies of Sciences, Engineering, and Medicine, "AI-Enabled Biological Design and the Risks of Synthetic Biology," in *The Age of AI in the Life Sciences: Benefits and Biosecurity Considerations*, National Academies Press, 2025a.

[^8]: Ying-Chiang Jeffrey Lee, Bria Persaud, Barbara Del Castello, Allison Berke, and Gustavs Zilgalvis, *Documenting Cloud Labs and Examining How Remotely Operated Automated Laboratories Could Enable Bad Actors*, RAND Corporation, PE-A3851-1, April 2025; Nazish Jeffery, Sarah R. Carter, Tessa Alexanian, Oliver Crook, Samuel Curtis, Richard Moulange, Shrestha Rath, Sophie Rose, and Jennifer Clarke, "Bio x AI: Policy Recommendations for a New Frontier," Federation of American Scientists, December 12, 2023.

---

*Abbreviation used above and defined earlier in the report: BT = biological tool (AI-enabled biological tool); GPAI = general-purpose AI.*
