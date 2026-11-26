# Pacing explorer (version 2)

A short website for policymakers that compares five tools for verifying agreements to pace frontier AI: the chip production ledger, physical chip inspection, independent capability evaluation, the interconnect bandwidth cap and cloud workload metering. FlexHEGs, which version 1 included, is no longer on the site.

## How to open it

Double-click `index.html`. It opens in a browser. There is no server to start, no internet connection is needed, nothing is installed, and nothing is sent anywhere or stored in the browser (links to sources are followed only when clicked). The five tool pages open from the main page (`tool.html#ledger`, `#inspections`, `#evaluations`, `#bandwidth`, `#metering`).

## What is in it

- `index.html`: the main page. Introduction, contents, the five pacing proposals, the ranking, one card per tool, the package section ("What could a verification package include") with its builder, and the appendix (how we score, glossary).
- `tool.html`: one page for every tool, chosen by the part after `#` in the address.
- `package.html`: the suggested package, opened in a new tab from the homepage form. Priorities and the invasiveness limit travel in the URL, with no browser storage.
- `data/interventions.js`: all the wording, scores, stances, justifications and sources for the five tools.
- `data/method.js`: the appendix text, section titles, the six criteria and their display labels, the words (Low … High, Light … Heavy), the colours and the package builder's numbers.
- `data/interventions.js` also holds the text above the tool cards (`toolsIntro`) and the package section's text (`builder`: paragraphs, the supporting-measures list and the closing paragraph).
- `data/glossary.js`: the glossary.
- `js/app.js` (the pages), `js/builder.js` (the package builder's rules), `css/style.css`.
- `js/builder.tests.js` and `tests.html`: self-checks for the package builder.
- `tools/validate_data.py`: checks that the data files match their sources.
- `screenshots/`: pictures of the pages at 1280 px and 390 px wide (`v2-…`). Older pictures from version 1 are still in the folder.

## Where things come from

All files below are in `4. Drafting/` of the pacing project, and the site copies from them. It never invents text.

| On the site | Source |
|---|---|
| Wording: introduction, proposals, ranking, introduction above the tool cards, tool descriptions, the package section (paragraphs, supporting-measures list, closing paragraph), each tool's introduction, expected-behaviour reasons, contribution to pacing, failure scenarios, regulatory burden, the reason for each dependency (the second sentence of its bullet under "Supporting measures"), appendix, glossary | `Website text.md` |
| Scores and stances | the "Step 1" scores table of each `Background mapping of … .md` |
| The sentence shown when a score is clicked | the bullet under that table, without its bold label and without the marker "(our inference)" |
| Sources list on each tool page | the "# Sources" list of the mapping, links included, without the "Atlas …" entries |
| Rules for scoring | `Scoring method.md` |

Only the interface labels (for example "What it achieves", "Learn more →", "Previous", "Needed as a supporting measure") come from neither. The validator does not check them.

## How to change the text

1. Edit `Website text.md` (not the site's code).
2. Copy the change into the matching place in `data/interventions.js` (or `data/method.js` for the appendix, `data/glossary.js` for glossary terms). The data files are plain JSON, so keep the quotes and commas intact. Text may use `**bold**`, `*italic*` and `[text](url)` links as in `Website text.md`. Links open in a new tab and load nothing until they are clicked.
3. Run `python3 tools/validate_data.py` from this folder. It prints `RESULT: PASSED` when everything matches and `RESULT: FAILED` with the first difference otherwise. It changes no files.

## How to change a score or stance

Change it in the tool's background mapping first (the "Step 1" scores table, and the bullet under it that justifies the score). Then copy it into `data/interventions.js` and run the validator. The meters and the package builder update by themselves. If the change moves a score used in the builder's examples, also run the builder self-checks (below), because a few of them check exact results.

## How to check the site

- `python3 tools/validate_data.py` checks the data against the sources (see the top of the file for exactly what). Warnings about glossary terms that appear nowhere in the text are reminders, not errors.
- `node js/builder.tests.js`, or open `tests.html` in a browser, runs the package builder's self-checks.

## Things to know

- Supporting measures (dependencies between tools) are set in `data/interventions.js` (`dependsOn`): inspections need the ledger, and the bandwidth cap needs inspections. Each one needs a bullet in the "Supporting measures" list of `Website text.md` whose bold lead-in reads "<tool> is linked to <supporting measure>."; the validator recognises the tools in it by keyword (`TOOL_KEYWORDS` in `tools/validate_data.py`).
- The invasiveness limit in the builder applies to each tool together with its whole chain of supporting measures. If any of them is above the limit, the tool is left out and the explanation names the supporting measure that caused this (for example, at Medium or Low the bandwidth cap is left out because physical chip inspection is Heavy). Supporting measures are never added above the limit.
- Clicking a score row, or pressing Enter or Space when it is focused, shows its justification.
- Printing opens every closed section first, so the sources are printed too.
- Everything is plain HTML, CSS and JavaScript, with no external libraries or fonts.


## Presentation and navigation

The interface uses a shared header and section navigation on the homepage and every tool report. On phones, the labelled Contents menu provides the same links. Each report has a tool selector; section links such as `tool.html#ledger/overview` can be bookmarked, while all existing `tool.html#ledger` links still work.

The homepage links directly to the tools and package explorer. The complete original introduction is visible, in its original order. The five proposals, supporting-measure explanations and appendix sections are expandable. All original content is retained. The glossary can be searched by term or definition. Phone comparison tables show all ratings as labelled cards. “View suggested package” opens a separate report in a new tab with the selected priorities and invasiveness limit. Its back/edit links restore those choices in the package explorer. Reset keeps keyboard focus in place. Printing expands disclosures and includes glossary entries hidden by a search.

The redesign changes only presentation and interface behaviour. `js/builder.js` is unchanged, and the three `data/` files are unchanged apart from the package section's new title in `data/method.js`. It still works directly from `index.html`, without a server, dependencies, external fonts, network requests or browser storage.
