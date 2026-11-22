# Pacing explorer (version 2)

A short website for policymakers that compares five tools for verifying agreements to pace frontier AI: the chip production ledger, physical chip inspection, independent capability evaluation, the interconnect bandwidth cap and cloud workload metering. FlexHEGs, which version 1 included, is no longer on the site.

## How to open it

Double-click `index.html`. It opens in your browser. There is no server to start, no internet connection is needed, nothing is installed, and nothing is sent anywhere or stored in the browser. The five tool pages open from the main page (`tool.html#ledger`, `#inspections`, `#evaluations`, `#bandwidth`, `#metering`).

## What is in it

- `index.html`: the main page. Introduction, contents, the five pacing proposals, the ranking, one card per tool, the trade-off map, the package builder, and the appendix (how we score, glossary).
- `tool.html`: one page for every tool, chosen by the part after `#` in the address.
- `data/interventions.js`: all the wording, scores, stances, readiness, justifications and sources for the five tools.
- `data/method.js`: the appendix text, section titles, the six criteria and their display labels, the words (Low … High, Light … Heavy), the colours and the package builder's numbers.
- `data/glossary.js`: the glossary.
- `js/app.js` (the pages), `js/chart.js` (the map), `js/builder.js` (the package builder's rules), `css/style.css`.
- `js/builder.tests.js` and `tests.html`: self-checks for the package builder.
- `tools/validate_data.py`: checks that the data files match their sources.
- `screenshots/`: pictures of the pages at 1280 px and 390 px wide (`v2-…`). Older pictures from version 1 are still in the folder.

## Where things come from

All files below are in `4. Drafting/` of the pacing project, and the site copies from them. It never invents text.

| On the site | Source |
|---|---|
| Wording: introduction, proposals, ranking, tool descriptions, map caption, builder intro, each tool's introduction, expected-behaviour reasons, contribution to pacing, failure scenarios, regulatory burden, appendix, new glossary terms | `Website text.md` |
| Scores, stances, readiness, the "Where it acts" tag | the "Step 1" scores table (and the "Lifecycle stage" bullet) of each `Background mapping of … .md` |
| The sentence shown when you click a score | the bullet under that table, without its bold label |
| Sources list on each tool page | the "# Sources" list of the mapping |
| Rules for scoring | `Scoring method.md` |

Three things come from neither: the interface labels (for example "What it achieves", "Learn more →", "Previous"), the one-line reasons for each dependency between tools (`dependsOnWhy`, used by the package builder), and the definitions of glossary terms kept from version 1. The validator does not check these.

## How to change the text

1. Edit `Website text.md` (not the site's code).
2. Copy the change into the matching place in `data/interventions.js` (or `data/method.js` for the appendix, `data/glossary.js` for new glossary terms). The data files are plain JSON, so keep the quotes and commas intact. Text may use `**bold**` and `*italic*` as in `Website text.md`.
3. Run `python3 tools/validate_data.py` from this folder. It prints `RESULT: PASSED` when everything matches and `RESULT: FAILED` with the first difference otherwise. It changes no files.

## How to change a score, stance or readiness

Change it in the tool's background mapping first (the "Step 1" scores table, and the bullet under it that justifies the score). Then copy it into `data/interventions.js` and run the validator. The map, the meters and the package builder update by themselves. If the change moves a score used in the builder's examples, also run the builder self-checks (below), because a few of them check exact results.

## How to check the site

- `python3 tools/validate_data.py` checks the data against the sources (see the top of the file for exactly what). Warnings about glossary terms that appear nowhere in the text are reminders, not errors.
- `node js/builder.tests.js`, or open `tests.html` in a browser, runs the package builder's self-checks.

## Things to know

- Tools that share the same two scores on the map (the ledger, the bandwidth cap and metering) are drawn as one marker with stacked labels; each label links to its page.
- Dependencies between tools are set in `data/interventions.js` (`dependsOn`): inspections need the ledger, and the bandwidth cap needs inspections.
- Clicking or focusing a score row on a tool page shows its justification.
- Printing opens every closed section first, so the sources are printed too.
- Everything is plain HTML, CSS and JavaScript, with no external libraries or fonts.
