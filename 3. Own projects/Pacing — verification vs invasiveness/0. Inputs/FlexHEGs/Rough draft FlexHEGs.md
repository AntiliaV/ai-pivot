## **Mapping FlexHEGs as a verification procedure (work for 27/10)**

### Methodology I’ve adopted

1. First, I apply the conceptual tools outlined in “Pacing the Frontier: A Framework & Research Agenda” to the FlexHEGs case. The goal is to get a general overview of the goals, tradeoffs and incentives involved.  
2. From there, go deeper in terms of three specific aspects:  
   1. What success would require from one specific actor, the AI labs  
   2. How the invasiveness characteristics of FlexHEGs might affect the optimal behaviour from AI Labs and have negative second-order effects  
3. Policy recommendations stemming from this

### What are FlexHEGs?

* Definition from the *Flexible Hardware-Enabled Guarantees for AI Compute* (Petrie et al.) paper:  “Security systems added to AI chips that combine a tamper-proof enclosure with a guarantee processor to enable trustworthy, privacy-preserving verification and enforcement of claims about how the chips are used”.  
* Three main components:  
  * AI chip is housed in a tamper-proof enclosure, cannot be bypassed.  
  * The guarantee processor monitors information entering and leaving the chip  
  * They have a programmable rule set that defines which computations are allowed.  
* This means FlexHEGs are dual-use:  
  * Enable verification: providing information on the compliance of an AI chip  
  * Enable enforcement: preventing the chip from breaking the law in the first place  
* The technology is still work in progress, but could be retrofitted to existing AI chips.

### (1) Applying the conceptual tools outlined in the Pacing Agenda to FlexHEGs

Effectiveness

Q: Do FlexHEGs actually slow capability development, or just constrain an imperfect proxy?

The answer to this question is entirely use-dependent. Expanding on the verification vs. enforcement distinction, there are two functions that FlexHEGs can in theory perform:

1. FlexHEGs used as a verification intervention: in this case, the use of FlexHEGs is to provide information that would otherwise be hard to obtain.  
   - In and of itself, providing information does not slow dangerous capability development. It is likely that information provision would change incentives, but not in a way that systematically slows down capability expansion.  
2. FlexHEGs being used as the basis for governance requirements (e.g. from the paper: “requiring the possession of a non-expired license to run computations with specific technical properties, e.g. exceeding some compute threshold”).  
- This more directly targets capability development, but requires a more active role from relevant actors/institutions.

Below, I order the list of proposed uses from the executive summary from least to most likely to directly lead to a slow down of capability development.

| Use of FlexHEG | Likelihood of leading to a slow down in capability development on its own | Why? |
| :---- | :---- | :---- |
| Verifying or restricting the approximate location of chips | Low | Verification use: basically useless in terms of slowing down capabilities. Restriction use, i.e. actually controlling where AI chips can operate, is more promising (best case: targeted implementation could indirectly slow development by restricting access to compute in certain locations) but also does not directly affect  capability development. |
| Securing access to model weights and controlling deployment | Low | Restricts where and how trained models can be deployed. Does not directly limit the training of more capable models.  Best case: restrictions on access to model weights could indirectly constrain further development. |
| Verifiable, mutually privacy-preserving model evaluations.  | Low | Allows actors to verify model capabilities and safety properties without revealing sensitive information. Evaluations alone do not stop development. Best case: inform decisions to pause or restrict development. |
| Requiring standardized evaluations during large training runs | Moderate | Depending on the rules, development could be delayed or stopped when evaluations are not completed or dangerous capability thresholds are reached. |
| Requiring a non-expired license for certain computations | High | Makes high-compute training conditional on authorization. Authorities/regulators could delay, deny, or decline to renew licenses, directly preventing capability development. |
| Verification or limits on total training compute or other model properties | High | Most directly targets the resources used to develop more capable models. Training-compute ceilings, if actually enforced, effectively prevents training runs above an agreed threshold and limits capability development. |

Incentive compatibility

Q: Will the relevant actors have reasons to cooperate, circumvent, or undermine it?

Two baseline strategic considerations affect pacing:

1. During an announced pacing agreement, AI labs and governments have a strong incentive to defect, i.e. to try to secretly circumvent the agreed upon rules for pacing.  
2. If everyone thinks other actors are going to defect, the incentive to defect first is even stronger.

→ Leads to coordination problem.

FlexHEGs contribute to the second part of the coordination problem (the imperfect information problem). By enabling credible, verifiable commitments, AI labs and governments no longer “over react” to unknown information. 

However, FlexHEGs do not solve the first part of the coordination problem, i.e. the fact that a dominant strategy is to deviate.  
→ Actors now just have an incentive to find ways to circumvent the restrictions from FlexHEGs.

Verifiability and enforceability

Q: Can violations be detected, and can restrictions be credibly enforced?

Violations about the use of AI chips \- yes, that is the entire advantage of implementing pacing rules via FlexHEGs. Assuming perfect tamper-resistance \+ open source: 

- Violations can be detected: FlexHEGs generate cryptographically verifiable evidence about how AI chips have been used.  
- Restrictions can be enforced: the guarantee processor in FlexHEGs directly blocks prohibited operations.

But there will be attempts to circumvent FlexHEGs that will require their own adaptations (e.g. use of non-FlexHEG compute, disguising the purpose of computations… Petrie et al. go through a list of circumvention strategies). So successful implementation of FlexHEGs requires analysing which circumvention strategies are more likely to be used and why.

| Circumvention strategy | How likely? | Discussed |
| ----- | ----- | ----- |
| Using non-FlexHEG compute | **Depends** \- I think this threat is proportional to how widely available non-FlexHEG compute is.  | p. 13, 16 |
| Combining multiple smaller models into a bigger model with capacity exceeding the allowed threshold | (ChatGPT answer): “**High**. Modular architectures, including mixture-of-experts systems, provide a plausible way to develop more capable systems without any individual model exceeding specified limits.” | p. 36–37 |
| Disguising the purpose of computations, i.e. use technically allowed compute for prohibited purposes | **High**. Technically feasible because FlexHEGs cannot determine intent.  | p. 16–17 |
| Exploiting compute-accounting weaknesses | **Moderate** if the technical challenges are not solved, **low** if the technology has undergone a lot of security testing (would require spending a lot of time/resources trying to find weaknesses) | p. 27–28 |
| Using algorithmic improvements to circumvent compute limits | **Moderate**. Already aligns with incentives that developers have. However improvements in algorithmic efficiency tend to follow a pre-defined pace (at least until recursive self improvement) so this might not be technically feasible. |  |
| Actors shifting development to regions/jurisdictions that do not participate in FlexHEG governance | From private AI labs: threat is quite **low**, relocating is very costly, talent restrictions etc. From government actors: **moderate** likelihood  |  |

Strategic consequences:

Q: Do FlexHEGs shift competitive or geopolitical advantages in ways that undermine its original purpose?

As for the effectiveness question, the answer depends on the specific implementation of FlexHEGs. 

Are there considerations that are likely to apply across the implementation strategies?

Coverage and targeting

Q: Do FlexHEGs cover the relevant actors and activities without unnecessarily restricting beneficial development?

Yes; that’s one of the strengths of FlexHEGs. Unlike other pacing strategies, they are highly targeted in their coverage while allowing companies and governments to continue to pursue authorised, beneficial development.

Robustness:

Q: Can FlexHEGs survive imperfect implementation, adapt to changing circumstances, and be lifted when appropriate?

FlexHEGs are highly adaptable. There are multiple types of “flexibility” this intervention provides:

- Flexibility about the rules: they don’t have to be hardcoded to enforce one specific rule. The basic requirement is that the guarantee processor must be able to determine whether a computation complies with it, using information accessible to the hardware. Beyond that, there is flexibility in which rules can be enforced.  
- Flexibility about the type of governance strategy it supports: can go from not very invasive (verification only) to automatic enforcement of rules  
- Flexibility over time: could make them require software updates without which the chip would stop working, for example. Would enable to enforce different priorities over time.


### (2) Dive deeper

### (3) Policy recommendations

## **What I learnt from this exercise \+ how I would communicate findings**

### Here is how I would conduct the rest of the project

5 interventions under review:

1. Independent third-party audits  
2. Cloud/infrastructure monitoring  
3. Hardware-based controls  
4. Cryptographic verification  
5. Research workflow/model lifecycle controls

Step 1: policy goals scoring for each intervention

Give a score/value to each intervention of these 5 on:

1. Effectiveness: score 1 to 5 on whether actually expected to slow capability development (as opposed to just constrain an imperfect proxy).   
2. Coverage and targeting: score 1 to 5, are the relevant actors and activities targeted?  
3. Incentive compatibility: do we expect the most relevant actors to {cooperate, circumvent, undermine}?  
4. Verifiability and enforceability: score 1 to 5 on whether violations of the intervention can be detected/whether intervention can be credibly enforced  
5. Regulatory burden: score 1 to 5, how much active regulation is needed?  
6. Robustness: score 1 to 5, how flexibly can the intervention be adapted to changing circumstances

E.g. for FlexHEGs:

|  | Pacing effectiveness | Coverage and targeting | Incentive compatibility | Verifiability and enforceability | Regulatory burden | Robustness and flexibility |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| FlexHEGs | 3 | 3 | 2 | 5 | 2 | 5 |

Step 2:

Strategic consequences and incentive compatibility analysis.  
→ Use this as input to produce a policy recommendation and a theory of change for each intervention/classes of interventions.

### Proposal for presenting output to policy makers

“Modest” version would be a table with each of the policy goals scored, and text underneath explaining main strategic recommendations affecting each intervention.

More ambitious would be an interactive webpage:

- Pick your tolerance for each of the 6 policy goals, on a slider  
- Based on your preferences, we produce a policy recommendation, with a theory of change backing it up that starts with concrete steps to take as a policy maker.