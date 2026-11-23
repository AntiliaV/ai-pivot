# Scoring method for the intervention mappings

*Agreed 12 November 2026; effectiveness yardstick and lifecycle tag revised 22 November 2026; effectiveness reframed as relevance to pacing 23 November 2026. Applies to the "Step 1" scores table in every background mapping in this folder.*

## Common yardstick

Effectiveness is scored as **relevance to pacing**. A verification tool does not itself slow AI development; what matters is whether the rule it lets us check would slow it if fully respected. The yardstick is the **routes to frontier capability progress**: *Pacing the Frontier* (Douglas et al. 2026, §3.2) lists four, namely more training compute, better algorithms, more elaborate post-training, and better elicitation of existing models. An intervention scores by how many routes the rule it verifies would close, net of what developers recover by substituting another route. A tool is therefore not penalised for only providing information; it scores low when what it verifies has little bearing on pacing.

The list of routes can grow as new routes appear (the Agenda flags continual learning, where models keep improving after deployment). A new intervention is scored by asking the same two questions: which routes would the rule it verifies close, and how easily can developers substitute another?

Each intervention is scored once, in the configuration the pacing proposals use it (e.g. FlexHEGs enforcing a cap or licence; inspections of declared sites backed by the ledger). Where another configuration would score differently, the note under the table says so.

## Criteria and anchors

5 = best, except **regulatory burden** and **invasiveness**, where 5 = heaviest.

| Criterion | 1 | 3 | 5 |
|----|----|----|----|
| Pacing effectiveness (relevance to pacing) | What it verifies has little bearing on pacing; 2 = verifies a rule that partly closes one route, or only at some sites | Verifies a rule that directly closes one route; others stay open and substitution is easy; 4 = verifies rules that close one route with little room to substitute, or several routes partly | Verifies rules that close most routes, with little room to substitute |
| Coverage and targeting | Reaches few relevant actors, or hits mainly beneficial work | Reaches declared or large actors; some spillover onto beneficial work | Reaches nearly all relevant actors, with little spillover |
| Verifiability and enforceability | Violations mostly undetectable | Detectable for declared or large activity; blind to undeclared activity | Detected quickly and with confidence; enforcement credible or automatic |
| Regulatory burden | Light reporting on records firms already keep | A new body plus periodic audits | A standing international inspectorate or new hardware standards |
| Robustness and flexibility | Breaks when circumstances shift; hard to lift | Degrades gracefully but needs active revision | Adapts by design; can be lifted without an overhang |
| Invasiveness for labs | Negligible effort; reveals nothing proprietary; no loss of control | Noticeable effort, or reveals strategically sensitive information | Major disruption, deep access to proprietary information, or others can stop labs' chips |

Invasiveness follows the project's definition (compliance effort; proprietary information revealed), extended with **loss of control** (who can stop or limit a lab's chips), which matters for hardware-enforced tools.

## Not scored on 1–5

- **Incentive compatibility:** stated in words, as *cooperate*, *circumvent* or *undermine*, for each of four actors: AI labs; chip and cloud firms; the leading state; the trailing state.
- **Readiness:** available now; in 1–3 years; in 3+ years.
- **Lifecycle stage (tag):** where the intervention acts in the Agenda's AI lifecycle (§3.1): *inputs and infrastructure*, *capability development*, or *use and distribution*. One or two stages per intervention. Upstream tools tend to be easier to observe but blunter; downstream tools more targeted but easier to circumvent.

## Process

1.  Each score gets a one-sentence justification (the bullets under each table) and a confidence level (low, medium, high).
2.  Two team members score independently, then reconcile differences and record the reason for any change.
3.  Scores are the authors' judgements, labelled as such wherever they appear.

## Display to policymakers

Scores are shown as 5-dot meters with a word, not as raw numbers: Low / Medium / High for effectiveness, coverage, verifiability and robustness (1–2, 3, 4–5); Light / Moderate / Heavy for burden and invasiveness. The justification is one click away.
