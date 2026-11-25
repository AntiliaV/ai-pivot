# Pacing explorer — revised edition

Open **index.html** in a browser. No installation, server or internet connection is needed. All text is present in the HTML; JavaScript adds the package explorer, glossary definitions and navigation highlighting. External sources load only when followed.

This is a separate version of the original pacing-explorer website. It uses the revised *Website text ChatGPT.md*, adapted in `content.md` to reflect the new order and the corrected package-builder rules. The original site and drafting files are unchanged.

## What changed

- Findings and a compact tool comparison precede the detailed proposal summaries.
- Responsive comparison cards, an optional numbered map and a desktop chapter guide support different reading depths.
- Five tool pages show the assessed configuration, evidence basis, formal confidence status, score rationales, conditional actor responses and linked sources.
- Numerical scores and proposal classifications are retained. Evidence descriptions are editorial summaries; no formal confidence ratings have been invented.
- The invasiveness ceiling applies to each candidate's complete chain of supporting tools. An over-ceiling dependency excludes that candidate and is explained separately.
- The package explorer shows unresolved claims and a local sensitivity check. It does not infer package-wide assurance from the best individual score.
- A complete reading/print edition, searchable glossary and downloadable Markdown are included.

## Editing

`content.md` is the source for the main prose. `data/assessments.json` preserves the original numerical scores, source rationales, dependencies and proposal classifications. `tools/build_site.py` contains the page layout, edited rationale text, evidence summaries and configuration labels. `css/style.css` contains the design. `js/package.js` contains pure selection logic; `js/app.js` adds browser interactions.

Set `author` and, optionally, `affiliation` in `data/publication.json` to show a byline. It is left blank because no author name was supplied. The date and edition are also configured there.

After editing the sources, rebuild with:

```sh
python3 tools/build_site.py
node tests/package.test.js
```

No packages are required. The generated pages work directly from the folder. `full-note.html` provides a reading view with a **Print / save as PDF** button; printing opens the disclosures and includes the glossary.

## How the explorer differs from the original

The original builder could add a dependency above the user's maximum invasiveness setting. This version checks the complete dependency chain before selecting a tool. A bandwidth cap therefore cannot be included under a Light or Moderate ceiling while its required inspection support remains rated Heavy.

Priorities retain weights of 3 versus 1, and the selection threshold remains 3 out of 5. These are illustrative conventions. If no eligible tool meets that threshold, the closest feasible option is explicitly labelled below threshold. If no candidate fits the ceiling, the explorer returns no package.

The sensitivity check moves one tool–criterion score by one point at a time, staying within the 1–5 scale. It reports how often the included set changes; it is not a probability or confidence interval.

## Privacy and portability

No external fonts, libraries, analytics, storage or network requests are used by the page. The site is static and can be copied to another folder or static host. Source links are ordinary external links. Nothing has been published or deployed.
