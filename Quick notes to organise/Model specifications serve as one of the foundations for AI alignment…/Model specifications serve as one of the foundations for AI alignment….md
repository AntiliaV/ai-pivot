Model specifications serve as one of the foundations for AI alignment. Anthropic uses methods like  [Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback), while OpenAI uses [deliberative alignment](https://openai.com/index/deliberative-alignment/) to ensure their principles directly shape the training signals of current LLMs. Beyond automated training, specifications also guide human annotators, who provide feedback during reinforcement learning from human feedback (RLHF).  
  
Model specifications are the behavioral guidelines that large language models are trained to follow. They list principles like "be helpful," "assume good intentions," or "stay within safety bounds." Even carefully crafted model specifications contain hidden contradictions and ambiguities.  
  
  
  
AI character evaluation:  
- Pro social tendencies of AI agents  
- Do we want them to be pro social in the first place? How much? Does it increases the probability of a power grab? Does it increase the consequences of misbehaviour?  
- Can you evaluate this in the field as opposed to control experiments?  
  
Outputs:  
Evaluation   
Likelihood of increased security incidents  
  
  
The crucial and overlooked problem is that the models are becoming so situationally aware that we are losing the ability to evaluate them in contexts where they believe they are not being watched or controlled. Future experiments will tell us almost nothing new about how they would behave if they were truly unconstrained by humans, and what we already know about this is alarming. ++Models will increasingly seem aligned even when they are not++.  
  
Frameworks from economics that are useful:  
- **Experimenter effects**  
- **Hawthorne effect**  
-  (“alignment "proxy metrics... will go up like every other benchmark”)  
- **Lucas critique: **you can't reliably extrapolate behavior observed under one policy regime to a different regime, because rational agents' behavior is itself a function of the regime — the "structural parameters" you estimated were never regime-invariant to begin with. Selsam's core claim — "future experiments will tell us almost nothing new about how they'd behave if truly unconstrained" — is exactly this: behavior measured under the "constrained/observed" regime doesn't identify behavior under the "unconstrained/unobserved" regime, because the model's policy is itself conditioned on which regime it believes it's in.  
  
This seems akin to experimenter effects in economics. We have ways to improve this:  

| Approach | How it reduces EDE | Main drawback |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Neutral instructions and framing | Avoids signaling which behavior is desirable | Can reduce external validity if natural framing matters |
| Between-subject designs | Participants see fewer conditions and therefore have less information from which to infer the hypothesis | Requires larger samples |
| Hide the key comparison | Use fillers, multiple tasks, or make the focal manipulation less salient | Added complexity may itself affect behavior |
| Double-blind procedures | Removes cues from experimenter-participant interaction | Does not eliminate demand conveyed by the task itself |
| Computerized/self-administered procedures | Standardizes interaction and minimizes experimenter cues | Participants still know researchers designed the experiment |
| Avoid evaluative language | Makes it less obvious that one choice is "good," "generous," "rational," etc. | Sometimes the framing is theoretically important |
| Deception / cover stories | Can conceal the true hypothesis | Generally disfavored in experimental economics and can contaminate subject pools |
| Demand measurement | Ask participants what they thought the study was about | Measurement usually occurs ex post and may itself be noisy |
| Demand manipulation | Experimentally vary what participants think the experimenter wants | Adds treatments and changes the estimand |
| Obfuscation | Embed the focal choice in a richer environment so the intended response is unclear | Can introduce additional mechanisms |
| Replication under different implementations | Tests whether results survive changes in demand cues | More expensive; doesn't solve EDE within one experiment |
  
