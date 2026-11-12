# Claude Code prompt: build the "Pacing explorer" (v1)

*Paste everything below the line into a Claude Code session opened in the AI Pivot folder.*

---

## 0. Where to work and what to read first

- Project folder: `/Users/antilia/Documents/Career/2. Post PhD Jobs/AI Pivot`. Read `CLAUDE.md` in that folder first and follow it.
- Build everything inside a new folder: `3. Own projects/Pacing — verification vs invasiveness/2. Code/pacing-explorer/`. (`2. Code/` is one of the project's agreed standard subfolders.)
- Your content sources are the three background mappings in `3. Own projects/Pacing — verification vs invasiveness/4. Drafting/`:
  - `Background mapping of chip production ledgers.md`
  - `Background mapping of physical chip inspections.md`
  - `Background mapping of FlexHEGs.md`
- Read all three in full before writing anything. Treat them as read-only.

## 1. What we are building and for whom

A small, self-contained website that explains three ways of **verifying** AI pacing agreements (chip ledgers, physical chip inspections, FlexHEGs) to policymakers in the EU, UK, US and elsewhere. These readers know policy but have little background in AI safety. They will use the site **on their own, without a guide**. It must be intuitive at first glance and never overwhelming. The detail must still be there for readers who want it, one click away.

Three views, in this order of importance:

**A. Landing view: the trade-off map.** One chart. The x-axis is "Invasiveness for AI labs" (score 1–5, left = light, right = heavy). The y-axis is "Assurance: how reliably it catches or prevents violations" (the verifiability score, 1–5). Each intervention is a labelled dot.
- Dot style shows readiness: solid = available now; hollow/dashed = still in development.
- Above the chart, one headline sentence, e.g. "The best verification tools catch cheating without exposing labs' secrets. No tool available today does both; FlexHEGs could, once built." Write it from the data.
- A toggle, "FlexHEGs today / once mature", moves the FlexHEG dot between two sets of scores (see §3, `today` field).
- Light quadrant labels (e.g. top-left: "Strong and light").
- Clicking a dot opens that intervention's card (view D).
- At most ~60 words of text on this screen besides the chart.

**B. Package builder (the interactive tool).** The user states what matters and gets a recommended combination of interventions.
- Inputs, all on one short panel:
  1. "What matters most to you?" Pick up to three of: *Actually slows AI development* (effectiveness), *Catches cheating* (verifiability), *Reaches the right actors* (coverage and targeting), *Light on AI labs* (invasiveness, inverted), *Light on government* (regulatory burden, inverted), *Holds up over time* (robustness).
  2. "Must it be available now?" (yes/no).
  3. "Maximum acceptable invasiveness for labs" (any / medium / low).
  4. "Setting": domestic only / with allies / an agreement between rival powers (US–China).
- Output:
  1. A **layered stack, not a ranking**. The interventions complement each other and are not alternatives, and the output must make that visible: e.g. "Foundation: chip ledger → Checks now: inspections → In development: FlexHEGs". Layers are placed on a now / 1–3 years / 3+ years timeline.
  2. Two or three sentences on why this package fits the user's choices, and what it gives up.
  3. The theory of change and the first concrete steps, taken from the documents' Step 2 sections.
  4. A "How this was worked out" expander that shows the arithmetic.
- Logic: transparent and rule-based, specified in §4. Never a black box.

**D. Intervention cards (the detail).** One card per intervention, using progressive disclosure.
- Visible at once: name; plain-language one-liner; readiness badge; the seven scored criteria shown as 5-dot meters with words (see §5); one line on who would cooperate or resist.
- Collapsible sections, closed by default: How it works · What the pacing proposals say · What AI labs would have to do (and how they'd likely respond) · Ways around it · Side effects and strategic risks · Recommendation and theory of change · How we scored it (justification and confidence per criterion) · Sources.
- Each card can be printed as a one-page summary (print stylesheet).

Also needed:
- A short **"How to read this"** panel: what the scores mean, that they are the authors' judgements, and the common yardstick.
- A **glossary** of terms used in the text (compute, FLOP, H100-equivalent, frontier model, training vs inference, fab, attestation, etc.), shown as tooltips or links wherever a term appears.

## 2. Technical approach (keep it simple and maintainable)

- **No build step and no external dependencies or CDNs.** Plain HTML, CSS and JavaScript. Draw the chart in hand-written SVG. The site must work offline and must not track users.
- **It must open by double-clicking `index.html`** (a `file://` page). Browsers block `fetch()` of local JSON from `file://`, so put the data in `data/interventions.js` as `window.PACING_DATA = {...}`.
- Suggested layout:
  - `index.html`
  - `css/style.css` (including print styles)
  - `js/app.js`, `js/chart.js`, `js/builder.js`
  - `data/interventions.js`, `data/glossary.js`, `data/method.js`
  - `tools/validate_data.py`
  - `README.md` (how to update the data and the method)
- **Data-driven design.** Adding a fourth intervention later must mean adding one entry to `data/interventions.js`, with no code changes. Up to about ten interventions are expected eventually.
- **Responsive** (works on a phone) and **accessible**:
  - keyboard navigable, with visible focus;
  - ARIA labels on the chart;
  - WCAG AA contrast;
  - a colour-blind-safe palette, and never colour alone to carry meaning.
- **Look:** calm and neutral, like a public-sector briefing. No organisation logos or branding.
- **Display setting:** a single config flag `SHOW_NUMERIC_SCORES` in `js/app.js`, default `false`. When `false`, scores appear as 5-dot meters with words. When `true`, "3/5" is shown next to the meter. Antilia may change this.

## 3. Data model (`data/interventions.js`)

For each intervention:

```
id, name, plainName, oneLiner (≤20 words), howItWorks (≤80 words),
readiness: "now" | "1-3y" | "3y+",
scores: { effectiveness, coverage, verifiability, burden, robustness, invasiveness }
   each: { score: 1–5, justification: one sentence, confidence: "low"|"medium"|"high" },
today: optional, same shape as scores (FlexHEGs only, see below),
incentives: { labs, chipCloudFirms, leadingState, trailingState }
   each: { stance: "cooperate"|"circumvent"|"undermine", note: ≤15 words },
labsMustDo: [≤6 short items], labsLikelyResponse: [≤4 short items],
waysAround: [{ strategy, likelihood: "low"|"medium"|"high", note }] (show top 3, the rest on expand),
sideEffects: [≤5 short items],
proposals: [{ name, role: ≤40 words }],
theoryOfChange: ≤60 words, firstSteps: [≤4 items], laterSteps: [≤4 items],
dependsOn: [ids], sources: [{ short, full }]
```

Content rules:
- Take scores **exactly** from the "Step 1" scores tables in the three documents. Do not change any number.
- Take justifications from the bullets under each table, and stances from the "Incentive compatibility" column.
- Condense text from the documents into plain English, in short sentences. Do not add claims the documents do not make. Where you condense, keep any "(our inference)" markers as a small label.
- `confidence` is not in the documents yet. Set every value to `"medium"` and add `"// TO CONFIRM"` next to it.
- `today` (FlexHEGs only): use effectiveness 2 and verifiability 2, with all other scores the same as `scores`, marked `// TO CONFIRM`. This feeds the landing-view toggle.
- `dependsOn`:
  - chip inspections → [ledger]
  - FlexHEGs → [ledger, inspections] (early versions need a registry and inspections)
  - ledger → []
- Score direction: for `burden` and `invasiveness`, 5 = heaviest. The interface must always phrase these as "light ↔ heavy", so users never have to remember which way is good.

`data/method.js` holds the scoring method shown in "How to read this" and "How we scored it":
- **Common yardstick:** every intervention is scored on how well it supports a coordinated cap on frontier training compute (Case A in *Pacing the Frontier*, Douglas et al. 2026).
- **Anchors:**
  - *Effectiveness:* 1 = produces information only; 3 = constrains a proxy, or only part of relevant compute; 5 = directly blocks capability-relevant activity on nearly all relevant compute.
  - *Coverage and targeting:* 1 = reaches few relevant actors, or hits mainly beneficial work; 3 = reaches declared or large actors, with some spillover; 5 = reaches nearly all relevant actors, little spillover.
  - *Verifiability:* 1 = violations mostly undetectable; 3 = detectable for declared or large activity, blind to undeclared; 5 = detected quickly and with confidence, enforcement credible or automatic.
  - *Regulatory burden:* 1 = light reporting on records firms already keep; 3 = a new body plus periodic audits; 5 = a standing international inspectorate or new hardware standards.
  - *Robustness:* 1 = breaks when circumstances shift, hard to lift; 3 = degrades gracefully but needs active revision; 5 = adapts by design, lifts without an overhang.
  - *Invasiveness for labs:* 1 = negligible effort, reveals nothing proprietary, no loss of control; 3 = noticeable effort, or reveals strategically sensitive information; 5 = major disruption, deep access to proprietary information, or others can stop labs' chips.
  - *Readiness:* now / 1–3 years / 3+ years.
- Incentive compatibility is deliberately not scored: it is shown as cooperate / circumvent / undermine for each of four actors.
- All scores are the authors' judgements, and each comes with a justification and a confidence level.

## 4. Package-builder logic (implement exactly; show it in "How this was worked out")

1. **Weights.** Each of the six criteria gets weight 1; each criterion the user picked gets weight 3.
2. **Orientation.** Use `burden` and `invasiveness` as 6 − score, so higher is always better.
3. **Fit score.** For each intervention: fit = Σ(weight × oriented score) ÷ Σ(weights), on a 1–5 scale. Show it in the explainer, not as a headline number.
4. **Constraints.**
   - Remove interventions whose invasiveness exceeds the user's maximum (low ≤ 2, medium ≤ 3, any = no limit).
   - If "must be available now" is set, an intervention that is not ready now is not removed. It moves to a separate "Start preparing now" lane, with its R&D first steps.
5. **Selection.**
   - Include every intervention whose fit is at least 3.0.
   - If none qualify, include the single best and say that no option fits the user's priorities well.
6. **Dependencies.** Add anything an included intervention `dependsOn`, labelled "needed as a foundation". If the user's constraints would have excluded it, say so explicitly ("FlexHEGs still need a chip ledger for chips without them").
7. **Layout.** Order layers by readiness (now → 1–3 years → 3+ years), with foundations first.
8. **Setting.**
   - Domestic: show `firstSteps` only.
   - With allies: show `firstSteps` and `laterSteps`.
   - Rival powers: show both, and add the trailing-state stances from `incentives` as a "what to expect from the other side" note.
9. **Wording.** Generate the explanation from templates, e.g. "You prioritised X and Y. A ledger scores well on Y but does little on X by itself, so it is paired with Z." Never claim more than the data says.

Write the logic as pure functions in `js/builder.js`, plus a small self-check: an `npm`-free `tests.html` or a node-free `console.assert` block. It must cover at least these cases:
- (a) no priorities chosen;
- (b) "Light on AI labs" plus "low" maximum invasiveness, which should exclude inspections and keep the ledger;
- (c) "Actually slows AI development" plus "must be available now", which should put FlexHEGs in the "Start preparing now" lane;
- (d) choosing FlexHEGs pulls in the ledger as a foundation.

## 5. Plain-language and design rules

- Write for an intelligent policymaker with no AI-safety background. Use short sentences, no unexplained acronyms, and active voice. Every term in the glossary is linked on first use on each view.
- Show scores as 5-dot meters with a word:
  - effectiveness, coverage, verifiability, robustness: 1–2 Low, 3 Medium, 4–5 High;
  - burden and invasiveness: 1–2 Light, 3 Moderate, 4–5 Heavy.
- Label every judgement as the authors' assessment, through the "How to read this" panel and a one-line footer, not on every element.
- Keep the tone neutral: the site informs and does not advocate a pause.
- Footer: "Draft — prepared for the pacing.tech project. Scores are judgements and will be revised." Add no author names or contact details.

## 6. Checks that show success

Run all of these and report the results:
1. `python3 tools/validate_data.py` passes. The script must check:
   - every intervention has every field;
   - scores are integers 1–5;
   - readiness and stance values are from the allowed sets;
   - every `dependsOn` id exists;
   - each intervention's scores match its row in the Step 1 scores table of its markdown document. The script reads the three `.md` files. Their formatting can vary (escaped characters, trailing backslashes), so match rows by the intervention's label, and print a clear warning on any mismatch.
2. The four builder cases in §4 pass.
3. If Node is installed, `node --check` passes on every JS file. If it isn't, say so and skip this check.
4. If Playwright or a headless Chrome is already installed, open `index.html` and save screenshots of views A, B and D (desktop and phone widths) to `pacing-explorer/screenshots/`. Do not install anything to do this; if neither is available, say so.
5. Manually confirm, and report, that:
   - the page works from `file://` with the network off;
   - keyboard navigation reaches every control;
   - the landing view stays within the ~60-word limit.

## 7. If something fails

Diagnose it and report what failed and why. Fix only obvious environment problems, such as a missing standard Python module. Do not change the scores or the meaning of any text to make a check pass. If the source documents contradict each other, list the contradiction instead of choosing between them.

## 8. Do not

- Do not edit, move or delete anything outside `2. Code/pacing-explorer/`. The `.md` documents are read-only.
- Do not run any git command that writes: no `commit`, `add`, `stash`, `checkout` or `reset`. Antilia commits through GitHub Desktop. If you need git at all, use only `git --no-optional-locks status`.
- Do not add analytics, external fonts, CDNs or network calls.
- Do not invent sources, figures or scores.

## 9. When done

End with a plain-language summary for Antilia, following the communication rules in `CLAUDE.md`:
- what was built and where;
- how to open it;
- the results of each check in §6;
- every `TO CONFIRM` placeholder;
- any text you had to condense heavily or could not place;
- a short numbered list of decisions waiting for her.
