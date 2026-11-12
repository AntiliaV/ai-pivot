# Pacing explorer (v1)

A small website that explains three ways of verifying agreements to pace frontier-AI development (chip ledgers, physical chip inspections, FlexHEGs) to policymakers with little background in AI safety. It is a draft for the pacing.tech project.

**To open it:** double-click `index.html`. It needs no internet connection, no installation and no server. It makes no network calls and stores nothing.

## What is in the site

| View | What it shows |
|---|---|
| Trade-off map (landing) | One chart: invasiveness for AI labs (across) against assurance, i.e. the verifiability score (up). A switch moves FlexHEGs between "today" and "once mature". |
| Build a package | The reader says what matters; the site suggests a layered combination of tools, explains why, and shows its arithmetic. |
| The tools | One card per tool. Scores and a one-line summary are visible at once; eight sections open on demand. Each card prints as a one-page summary. |
| How to read this | What the scores mean, the common yardstick, and the scoring anchors. |
| Glossary | Every term that is underlined with dots in the text. |

## Files

```
index.html                 the page
tests.html                 self-checks for the package builder (double-click to run)
css/style.css              all styles, including print
js/app.js                  views, navigation, glossary tooltips; holds SHOW_NUMERIC_SCORES
js/chart.js                the trade-off map (hand-written SVG)
js/builder.js              the package-builder rules, as pure functions
js/builder.tests.js        the self-checks that tests.html runs
data/interventions.js      the tools: all text and scores   <- most edits happen here
data/method.js             criteria, anchors, wording of scores, builder numbers
data/glossary.js           glossary terms
tools/validate_data.py     checks the data against the rules and the source documents
screenshots/               reference screenshots of each view
```

The content comes from the three background mappings in `../../4. Drafting/`. Those documents are the source of truth. This site condenses them and never changes them.

## Updating the data

### Changing a score

1. Change the score in the **source document** first (the "Step 1" scores table of the background mapping).
2. Make the same change in `data/interventions.js`, and update the one-sentence `justification` if the reason changed.
3. Reread the `headline` at the top of `data/interventions.js`. It is a sentence written from the scores and does not update itself.
4. Run the validator (below). It fails if the two places disagree.

### Changing text

Edit the text in `data/interventions.js`. Keep to the length limits, which the validator checks:

| Field | Limit |
|---|---|
| `oneLiner` | 20 words |
| `howItWorks` | 80 words |
| `theoryOfChange` | 60 words |
| each proposal `role` | 40 words |
| each incentive `note` | 15 words |
| `labsMustDo` | 6 items |
| `sideEffects` | 5 items |
| `labsLikelyResponse`, `firstSteps`, `laterSteps` | 4 items each |

Where a claim is the authors' inference and not from a source, end it with `(our inference)`. The site turns that into a small label.

### Format of `data/interventions.js`

Everything inside the outer braces is strict JSON (double quotes around every key and string, no trailing commas), plus `//` comments. The validator relies on this. `data/method.js` and `data/glossary.js` are ordinary JavaScript and are more forgiving.

### Adding a fourth tool

Add one entry to the `interventions` list in `data/interventions.js`. No code changes are needed: the map, the builder, the cards and the checks all read the list. Copy an existing entry and replace every field:

- `id`, `name`, `nameInText` (the name as it reads mid-sentence, e.g. "the chip ledger"), `plainName`, `oneLiner`, `howItWorks`
- `readiness`: `"now"`, `"1-3y"` or `"3y+"`. Optional `readinessNote` if the source gives a different range (shown to readers in place of the standard label).
- `sourceDoc`: the file name of the background mapping and the label of its row in the scores table. The validator uses this.
- `scoringNote` (optional): what version of the tool was scored.
- `scores`: the six criteria, each with `score`, `justification`, `confidence`.
- `today` (optional): a second full set of scores, for a tool that is weaker today than once mature. It adds a switch on the map.
- `incentives`: a `stance` (`cooperate`, `circumvent` or `undermine`) and a short `note` for each of `labs`, `chipCloudFirms`, `leadingState`, `trailingState`.
- `labsMustDo`, `labsLikelyResponse`, `sideEffects`
- `waysAround`: each with `strategy`, `likelihood` (`low`, `medium` or `high`), `note` (may be empty) and optional `refs`. The three most likely are shown first.
- `proposals`: each with `name` and `role`.
- `theoryOfChange`, `tocAssumptions` (optional), `firstSteps`, `laterSteps`
- `dependsOn`: ids of tools this one needs. Optional `dependsOnWhy` gives one sentence per id, used by the builder.
- `sources`: each with `short` and `full`.

Then add any new terms to `data/glossary.js`, and run the checks.

### Glossary

Each entry in `data/glossary.js` has a `term`, the exact words to `match` in the text, and a `definition`. A term is linked the first time it appears in each view (in each section, on a card). Proposal names are glossary entries too.

## Updating the method

`data/method.js` holds:

- the **yardstick** and the notes shown in "How to read this";
- the six **criteria**: names, the question each answers, and the anchors for scores 1, 3 and 5;
- the **words** shown beside the meters (Low / Medium / High; Light / Moderate / Heavy);
- the **builder numbers**: weight of a picked criterion (3), weight of the others (1), the fit needed for inclusion (3.0), and the invasiveness limits (low = up to 2, medium = up to 3).

The builder's rules themselves are in `js/builder.js`, listed at the top of the file and shown to readers under "How this was worked out". If you change a rule or a number, open `tests.html`: some checks assume the default numbers and will need updating with them.

`confidenceNote` in `data/method.js` tells readers that confidence levels are placeholders. Delete that line once the authors have set them.

## Display setting

At the top of `js/app.js`:

```js
var SHOW_NUMERIC_SCORES = false;
```

With `false`, scores appear as five dots and a word. With `true`, "3/5" is also shown beside each meter, and numbers appear on the map's axes and tooltips. The arithmetic under "How this was worked out" always shows numbers.

## Checks

These are run by Claude Code, not by hand (see the project's `CLAUDE.md`). From this folder:

```bash
python3 tools/validate_data.py
```

```bash
node js/builder.tests.js
```

- The validator checks structure, allowed values, length limits, dependencies, and that every score, stance and readiness value matches its row in the source document. It also lists the placeholders still marked `TO CONFIRM`. Exit code 0 means no errors.
- The builder checks can also be run without Node by opening `tests.html`.

## Placeholders in this version

Marked `TO CONFIRM` in `data/interventions.js`:

- every `confidence` value (all set to `medium`);
- the FlexHEG `today` scores (effectiveness 2 and verifiability 2);
- FlexHEG `readiness`: the source says "2–5 years", which spans two of the three standard values. The data uses `3y+` and shows "2–5 years" to readers.

## Ground rules

- No analytics, external fonts, CDNs or network calls. No build step.
- Scores, sources and figures come from the background mappings. Nothing is invented here.
- The site informs. It does not argue for or against a pause.
