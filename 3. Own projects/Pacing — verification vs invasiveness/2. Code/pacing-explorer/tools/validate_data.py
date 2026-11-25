#!/usr/bin/env python3
"""Check the pacing explorer's data files against their sources.

Run from anywhere:

    python3 tools/validate_data.py

Standard library only. It reads files and changes none.

Sources it compares against (both in "4. Drafting", next to the site's folder tree):
  - Website text.md                       all wording shown on the site, with its links
  - Background mapping of ... .md (x5)    scores, stances, justifications and the sources list

What it checks
  (a) Site text. Every piece of wording in data/interventions.js, data/method.js and
      data/glossary.js that comes from "Website text.md" is identical to it. That covers
      the introduction above the tool boxes (section 5), the package section (section 7:
      its paragraphs, the line before the list of supporting measures, that list and the
      closing paragraph), the one-line reason for each dependency (dependsOnWhy: the second
      sentence of the matching bullet in section 7's "Supporting measures" list) and every
      glossary definition. Exempt:
      only the interface labels set in the build brief (section titles on tool pages, meter
      labels, Low/Medium/High and Light/Moderate/Heavy, stance names,
      "Learn more →", "← All tools", "Sources", "Glossary"). Links are part of the text:
      "[text](url)" in Website text.md must appear unchanged in the data.
  (b) Every score and stance equals the one in the tool's mapping ("Step 1" scores table).
      The same goes for each justification (the bullet under the table). The marker
      "(our inference)" is ignored: the mappings keep it, the site does not show it.
  (c) Every tool's sources list equals the mapping's "# Sources" list, links included,
      except the "Atlas ..." entries, which the site leaves out.
  Also: every dependsOn id exists, no tool depends on itself or in a circle, every
  field the pages need is present, and the words "(our inference)" and "Atlas" appear
  nowhere in the data files.

Exit code 0: no errors (warnings do not change it). Exit code 1: at least one error.
"""

import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parent
DOCS = SITE.parent.parent / "4. Drafting"      # tools -> pacing-explorer -> 2. Code -> project
WEBSITE_TEXT = DOCS / "Website text.md"

# Tool id -> the mapping that supplies its scores. (To add a tool, add a line here.)
MAPPINGS = {
    "ledger": "Background mapping of chip production ledgers.md",
    "inspections": "Background mapping of physical chip inspections.md",
    "evaluations": "Background mapping of independent capability evaluations.md",
    "bandwidth": "Background mapping of interconnect bandwidth caps.md",
    "metering": "Background mapping of cloud workload metering.md",
}

CRITERIA = ["effectiveness", "coverage", "verifiability", "burden", "robustness", "invasiveness"]
# Column of the mapping's scores table -> criterion (matched on the header text).
COLUMN_KEYS = {"effectiveness": "effectiveness", "coverage": "coverage", "verifiability": "verifiab",
               "burden": "burden", "robustness": "robust", "invasiveness": "invasive"}
# Label of the bullet under the table -> criterion.
BULLET_LABELS = {"effectiveness": "Effectiveness", "coverage": "Coverage", "verifiability": "Verifiability",
                 "burden": "Regulatory burden", "robustness": "Robustness", "invasiveness": "Invasiveness for labs"}
ACTORS = ["labs", "chipCloudFirms", "leadingState", "trailingState"]
ACTOR_WEBSITE = {"labs": "AI labs", "chipCloudFirms": "Chip and cloud firms",
                 "leadingState": "A leading state", "trailingState": "A trailing state"}
ACTOR_MAPPING = {"labs": "Labs", "chipCloudFirms": "Chip and cloud firms",
                 "leadingState": "Leading state", "trailingState": "Trailing state"}
STANCES = ["cooperate", "circumvent", "undermine"]
# Words in a "Supporting measures" bullet's bold lead-in that identify each tool, e.g.
# "**Physical chip inspection is linked to the chip ledger.**" -> inspections depends on ledger.
TOOL_KEYWORDS = {"ledger": ["ledger"], "inspections": ["inspection"], "evaluations": ["evaluation"],
                 "bandwidth": ["interconnect", "bandwidth"], "metering": ["metering"]}
# Top-level fields of data/interventions.js (anything else is left over from an older version).
DATA_KEYS = ["siteTitle", "introduction", "proposals", "ranking", "toolsIntro", "builder", "interventions"]
# Section titles in data/method.js.
TITLE_KEYS = ["proposals", "ranking", "tools", "builder", "appendix", "howWeScore", "glossary"]
# Wording the site must not show (the mappings still contain it).
FORBIDDEN = ["(our inference)", "Atlas"]
INFERENCE = re.compile(r"\s*\(our inference\)")

LEAD_INTRO = "**Introduction.** "
LEAD_WHY = "**Expected behaviours (why).** "
LEAD_IDEAL = "**Under ideal conditions, how does this contribute to pacing?** "
LEAD_FAIL = "**Failure scenarios.** "
LEAD_BURDEN = "**Regulatory burden.** "

errors = []
warnings = []


def error(msg):
    errors.append(msg)
    print("  ERROR    " + msg)


def warn(msg):
    warnings.append(msg)
    print("  WARNING  " + msg)


def ok(msg):
    print("  ok       " + msg)


# ------------------------------------------------------------------ reading the data files

def strip_line_comments(text):
    """Remove // comments, leaving anything inside double-quoted strings alone."""
    out = []
    i = 0
    in_string = False
    while i < len(text):
        ch = text[i]
        if in_string:
            out.append(ch)
            if ch == "\\" and i + 1 < len(text):
                out.append(text[i + 1])
                i += 2
                continue
            if ch == '"':
                in_string = False
        elif ch == '"':
            in_string = True
            out.append(ch)
        elif ch == "/" and text[i + 1:i + 2] == "/":
            while i < len(text) and text[i] != "\n":
                i += 1
            continue
        else:
            out.append(ch)
        i += 1
    return "".join(out)


def load_js_json(path, variable):
    """Read `window.<variable> = <JSON>;` from a data file (JSON with // comments allowed)."""
    body = strip_line_comments(path.read_text(encoding="utf-8"))
    marker = "window." + variable
    start = body.find(marker)
    if start == -1:
        raise ValueError("could not find 'window.%s =' in %s" % (variable, path.name))
    eq = body.find("=", start)
    first = min(i for i in (body.find("{", eq), body.find("[", eq)) if i != -1)
    value, _ = json.JSONDecoder().raw_decode(body[first:])
    return value


# ------------------------------------------------------------------ reading Website text.md

def unescape(s):
    """Markdown writes a dollar sign as \\$ ; the site shows $."""
    return re.sub(r"\\(.)", r"\1", s)


def squash(s):
    return re.sub(r"\s+", " ", s).strip()


def md_blocks(lines):
    """Group lines into blocks: ("p", text), ("table", [rows]), ("li", text) or ("oli", text)."""
    blocks = []
    para = []
    table = []

    def flush():
        nonlocal para, table
        if para:
            blocks.append(("p", unescape(squash(" ".join(para)))))
            para = []
        if table:
            rows = []
            for line in table:
                cells = [unescape(squash(c)) for c in line.strip().strip("|").split("|")]
                if all(re.fullmatch(r":?-{2,}:?", c.replace(" ", "")) for c in cells):
                    continue
                rows.append(cells)
            blocks.append(("table", rows))
            table = []

    for line in lines:
        s = line.strip()
        if not s:
            flush()
        elif s.startswith("|"):
            if para:
                flush()
            table.append(s)
        elif s.startswith("- ") and not para:
            flush()
            blocks.append(("li", unescape(squash(s[2:]))))
        elif re.match(r"\d+\.\s", s) and not para:
            flush()
            blocks.append(("oli", unescape(squash(re.sub(r"^\d+\.\s+", "", s)))))
        else:
            if table:
                flush()
            para.append(s)
    flush()
    return blocks


def parse_website(path):
    text = path.read_text(encoding="utf-8")
    sections = []     # (h2, h3, [lines])
    h2 = h3 = None
    current = []
    for line in text.splitlines():
        if line.startswith("## "):
            sections.append((h2, h3, current))
            h2, h3, current = line[3:].strip(), None, []
        elif line.startswith("### "):
            sections.append((h2, h3, current))
            h3, current = line[4:].strip(), []
        elif line.startswith("# "):
            continue
        else:
            current.append(line)
    sections.append((h2, h3, current))

    web = {"headings": [], "tools": {}}
    for h2, h3, lines in sections:
        if h2 is None:
            continue
        blocks = md_blocks(lines)
        paras = [b[1] for b in blocks if b[0] == "p"]
        if h2 not in web["headings"]:
            web["headings"].append(h2)
        if h2 == "Site title":
            web["site_title"] = paras[0]
        elif h2.startswith("1."):
            web["introduction"] = paras
        elif h2.startswith("3."):
            web["proposals"] = parse_proposals(blocks)
        elif h2.startswith("4."):
            web["ranking"] = {"intro": paras[0], "table": [b[1] for b in blocks if b[0] == "table"][0], "legend": paras[1]}
        elif h2.startswith("5."):
            web["tools_intro"] = [p for p in paras if not p.startswith("**")]
            web["tool_descriptions"] = paras
        elif h2.startswith("7."):
            web["builder"] = parse_builder(blocks)
        elif h2 == "Intervention pages" and h3:
            web["tools"][h3] = parse_tool(blocks)
        elif h2.startswith("8.") and h3 == "How we score":
            web["how_we_score"] = {"blocks": blocks}
        elif h2.startswith("8.") and h3 == "Glossary":
            terms = []
            for kind, value in blocks:
                m = re.fullmatch(r"\*\*(.+?):\*\* (.+)", value) if kind == "li" else None
                if m:
                    terms.append((m.group(1), m.group(2)))
            web["glossary"] = terms
    return web


def parse_builder(blocks):
    """Section 7: paragraphs, the line that introduces the list of supporting measures,
    the list itself (one bullet per dependency), and the paragraphs after it."""
    first_li = next(i for i, (kind, _) in enumerate(blocks) if kind == "li")
    before = [text for kind, text in blocks[:first_li] if kind == "p"]
    items = [text for kind, text in blocks[first_li:] if kind == "li"]
    after = [text for kind, text in blocks[first_li:] if kind == "p"]
    return {"intro": before[:-1], "supportingLead": before[-1], "supporting": items, "closing": after}


def tool_in(phrase):
    """The one tool id whose keywords appear in a phrase, or None."""
    hits = [tid for tid, words in TOOL_KEYWORDS.items() if any(w in phrase.lower() for w in words)]
    return hits[0] if len(hits) == 1 else None


def dependency_reasons(items):
    """{(dependent id, supporting id): reason} from the "Supporting measures" bullets.
    Each bullet reads "**<dependent> is linked to <supporting measure>.** <reason>. <more>";
    the reason is the sentence right after the bold lead-in."""
    out = {}
    for item in items:
        m = re.fullmatch(r"\*\*(.+?) is linked to (.+?)\.\*\* (.+)", item)
        if not m:
            error("Website text.md: cannot read the supporting-measure bullet %r" % item[:70])
            continue
        dependent, supporting = tool_in(m.group(1)), tool_in(m.group(2))
        if not dependent or not supporting:
            error("Website text.md: cannot tell which tools the bullet %r links (see TOOL_KEYWORDS)" % item[:70])
            continue
        reason = re.match(r"(.+?\.)(?=\s|$)", m.group(3)).group(1)
        out[(dependent, supporting)] = reason
    return out


def rich_blocks(blocks):
    """Paragraphs and lists as {"type": "p"|"ul"|"ol", ...}; neighbouring items of one kind join one list."""
    out = []
    for kind, text in blocks:
        if kind == "p":
            out.append({"type": "p", "text": text})
        elif kind in ("li", "oli"):
            t = "ul" if kind == "li" else "ol"
            if out and out[-1]["type"] == t:
                out[-1]["items"].append(text)
            else:
                out.append({"type": t, "items": [text]})
    return out


def parse_proposals(blocks):
    """Section 3: an intro paragraph, then one group of paragraphs and lists per proposal.
    A proposal starts at a paragraph that begins with a linked bold name, "[**Name**](url)"."""
    groups = []
    for kind, text in blocks[1:]:
        if kind == "p" and text.startswith("[**"):
            groups.append([])
        if groups:
            groups[-1].append((kind, text))
    return {"intro": blocks[0][1], "items": [rich_blocks(g) for g in groups]}


def flatten_text(blocks):
    """All the text of rich blocks, for the glossary check."""
    out = []
    for b in blocks:
        out.append(b["text"] if b["type"] == "p" else " ".join(b["items"]))
    return " ".join(out)


def split_why(items):
    """The "Expected behaviours (why)" list: one bullet per actor, "AI labs: reason"."""
    out = {}
    for item in items:
        m = re.match(r"(AI labs|Chip and cloud firms|A leading state|A trailing state): (.+)", item)
        if m:
            out[m.group(1)] = m.group(2).strip()
    return out


def parse_tool(blocks):
    """A tool page: paragraphs and bullet lists under the five bold lead-ins."""
    fields = {}
    current = None
    for kind, text in blocks:
        if kind == "p":
            for key, lead in (("intro", LEAD_INTRO), ("why", LEAD_WHY), ("ideal", LEAD_IDEAL),
                              ("fail", LEAD_FAIL), ("burden", LEAD_BURDEN)):
                if text == lead.strip() or text.startswith(lead):
                    current = key
                    fields[key] = [("p", text[len(lead):].strip())]
                    break
            else:
                if current:
                    fields[current].append(("p", text))
        elif kind == "li" and current:
            fields[current].append(("li", text))

    contribution = []
    for kind, text in fields["ideal"]:
        if kind == "p":
            contribution.append({"text": text})
        else:
            contribution[-1].setdefault("items", []).append(text)

    fail = fields["fail"]
    items, closing = [], []
    for kind, text in fail[1:]:
        if kind == "li":
            m = re.fullmatch(r"\*\*(.+?)\*\* (.+)", text)
            items.append({"lead": m.group(1), "text": m.group(2)} if m else {"lead": "", "text": text})
        else:
            closing.append(text)
    return {
        "introduction": fields["intro"][0][1],
        "why": split_why([t for k, t in fields["why"] if k == "li"]),
        "contribution": contribution,
        "failures": {"intro": fail[0][1], "items": items, "closing": closing},
        "burden": fields["burden"][0][1],
    }


def tool_descriptions(web):
    out = {}
    for p in web.get("tool_descriptions", []):
        m = re.fullmatch(r"\*\*(.+?)\.\*\* (.+)", p)
        if m:
            out[m.group(1)] = m.group(2)
    return out


# ------------------------------------------------------------------ reading a mapping

def parse_mapping(path):
    """Return {header, row, bullets, sources} from a background mapping.
    "(our inference)" is removed from the bullets and "Atlas ..." entries from the sources."""
    lines = path.read_text(encoding="utf-8").splitlines()
    start = next(i for i, l in enumerate(lines) if l.strip().startswith("++Step 1"))
    end = next(i for i, l in enumerate(lines) if l.strip().startswith("++Step 2"))
    table = []
    bullets = {}
    for l in lines[start:end]:
        s = l.strip()
        if s.startswith("|"):
            cells = [squash(unescape(c)) for c in s.strip("|").split("|")]
            if not all(re.fullmatch(r":?-{2,}:?", c.replace(" ", "")) for c in cells):
                table.append(cells)
        elif s.startswith("- **"):
            s = re.sub(r"\\$", "", s).rstrip()
            m = re.fullmatch(r"- \*\*(.+?):\*\* (.+)", s)
            if m:
                bullets[m.group(1)] = INFERENCE.sub("", unescape(squash(m.group(2))))
    header, row = None, None
    for cells in table:
        if any("effectiveness" in c.lower() for c in cells):
            header = cells
        elif header and row is None:
            row = cells
    sources = []
    in_sources = False
    for l in lines:
        if l.startswith("# "):
            in_sources = l.strip() == "# Sources"
            continue
        if in_sources and l.strip().startswith("- "):
            item = unescape(squash(re.sub(r"\\$", "", l.strip())[2:]))
            if item.startswith("**Atlas"):       # the site does not mention the Atlas
                continue
            sources.append(item)
    return {"header": header, "row": row, "bullets": bullets, "sources": sources}


def column_index(header, criterion):
    for i, cell in enumerate(header):
        if COLUMN_KEYS[criterion] in cell.lower():
            return i
    return None


def mapping_stances(cell):
    """{actor: [stance words in the order they appear]} from the Incentive compatibility cell."""
    labels = [ACTOR_MAPPING[a] + ": " for a in ACTORS]
    spots = []
    for a, label in zip(ACTORS, labels):
        i = cell.find(label)
        if i == -1:
            return None
        spots.append((i, a, label))
    spots.sort()
    out = {}
    for n, (i, a, label) in enumerate(spots):
        end = spots[n + 1][0] if n + 1 < len(spots) else len(cell)
        segment = re.sub(r"\([^)]*\)", "", cell[i + len(label):end])
        out[a] = [w.lower() for w in re.findall(r"\b(cooperate|circumvent|undermine)\b", segment, flags=re.IGNORECASE)]
    return out


# ------------------------------------------------------------------ comparison helper

def compare(label, got, want):
    if got == want:
        return True
    g, w = str(got), str(want)
    i = next((k for k in range(min(len(g), len(w))) if g[k] != w[k]), min(len(g), len(w)))
    lo = max(0, i - 25)
    error("MISMATCH %s\n               site:   ...%s\n               source: ...%s" % (label, g[lo:i + 45], w[lo:i + 45]))
    return False


def present(label, value, kind=str):
    if not isinstance(value, kind) or (kind is str and not value.strip()) or (kind in (list, dict) and not value):
        error("%s: missing or empty" % label)
        return False
    return True


# ------------------------------------------------------------------ the checks

def check_structure(data, method, glossary):
    print("\n1. Structure of the data files")
    before = len(errors)
    items = data.get("interventions")
    if not isinstance(items, list) or not items:
        error("'interventions' must be a non-empty list")
        return []
    for key in ("siteTitle", "toolsIntro"):
        present("data." + key, data.get(key))
    for key in ("introduction",):
        present("data." + key, data.get(key), list)
    for key in data:
        if key not in DATA_KEYS:
            error("data.%s: not used by the site (left over from an older version?)" % key)
    bd = data.get("builder")
    if present("data.builder", bd, dict):
        for key in ("intro", "supporting", "closing"):
            present("data.builder." + key, bd.get(key), list)
        present("data.builder.supportingLead", bd.get("supportingLead"))
    titles = method.get("sectionTitles", {})
    if sorted(titles) != sorted(TITLE_KEYS):
        error("method.js sectionTitles has %s; expected %s" % (sorted(titles), sorted(TITLE_KEYS)))
    ids = [iv.get("id") for iv in items]
    for dup in {i for i in ids if ids.count(i) > 1}:
        error("id %r is used more than once" % dup)
    criteria_ids = [c.get("id") for c in method.get("criteria", [])]
    if sorted(criteria_ids) != sorted(CRITERIA):
        error("method.js criteria %s do not match %s" % (criteria_ids, CRITERIA))

    for iv in items:
        n = iv.get("id", "?")
        for f in ("id", "name", "description", "introduction", "burden"):
            present("%s.%s" % (n, f), iv.get(f))
        for c in CRITERIA:
            e = iv.get("scores", {}).get(c)
            if not isinstance(e, dict):
                error("%s.scores.%s: missing" % (n, c))
                continue
            s = e.get("score")
            if isinstance(s, bool) or not isinstance(s, int) or not 1 <= s <= 5:
                error("%s.scores.%s.score: must be a whole number from 1 to 5, found %r" % (n, c, s))
            present("%s.scores.%s.justification" % (n, c), e.get("justification"))
        for a in ACTORS:
            st = iv.get("stances", {}).get(a)
            if not isinstance(st, list) or not st or any(x not in STANCES for x in st):
                error("%s.stances.%s: must be a non-empty list drawn from %s, found %r" % (n, a, STANCES, st))
            present("%s.why.%s" % (n, a), iv.get("why", {}).get(a))
        present("%s.contribution" % n, iv.get("contribution"), list)
        fl = iv.get("failures", {})
        present("%s.failures.intro" % n, fl.get("intro"))
        present("%s.failures.items" % n, fl.get("items"), list)
        present("%s.sources" % n, iv.get("sources"), list)
        deps = iv.get("dependsOn")
        if not isinstance(deps, list):
            error("%s.dependsOn: must be a list (it may be empty)" % n)
            continue
        why = iv.get("dependsOnWhy", {})
        for d in deps:
            if d not in ids:
                error("%s.dependsOn: unknown id %r" % (n, d))
            if d == n:
                error("%s.dependsOn: a tool cannot depend on itself" % n)
            present("%s.dependsOnWhy.%s" % (n, d), why.get(d))
        for d in why:
            if d not in deps:
                error("%s.dependsOnWhy: %r is not in dependsOn" % (n, d))

    # No circular dependencies.
    by_id = {iv.get("id"): iv for iv in items}

    def walk(node, trail):
        for d in by_id.get(node, {}).get("dependsOn", []):
            if d in trail:
                error("circular dependency: %s" % " -> ".join(trail + [d]))
                return
            walk(d, trail + [d])
    for i in ids:
        walk(i, [i])

    # Wording the site must not show.
    def strings(x):
        if isinstance(x, str):
            yield x
        elif isinstance(x, dict):
            for v in x.values():
                yield from strings(v)
        elif isinstance(x, list):
            for v in x:
                yield from strings(v)
    for name, obj in (("interventions.js", data), ("method.js", method), ("glossary.js", glossary)):
        for text in strings(obj):
            for word in FORBIDDEN:
                if word in text:
                    error("%s contains %r: %s..." % (name, word, text[:60]))

    if len(errors) == before:
        ok("all fields present and well formed; every dependsOn id exists; no circular dependencies; no forbidden wording")
    return items


def check_site_text(data, method, glossary, web):
    """(a) Wording on the site equals Website text.md."""
    print("\n2. Site text against Website text.md  [check (a)]")
    before = len(errors)
    n_compared = 0

    def eq(label, got, want):
        nonlocal n_compared
        n_compared += 1
        compare(label, got, want)

    eq("site title", data.get("siteTitle"), web["site_title"])
    eq("introduction (paragraphs)", data.get("introduction"), web["introduction"])
    for page in ("index.html", "tool.html"):
        html = (SITE / page).read_text(encoding="utf-8")
        m = re.search(r"<title>(.*?)</title>", html, flags=re.S)
        eq("<title> of %s (the site title)" % page, m.group(1).strip() if m else None, web["site_title"])

    prop = data.get("proposals", {})
    eq("proposals: intro", prop.get("intro"), web["proposals"]["intro"])
    eq("proposals: the five proposals (paragraphs, lists and links)", prop.get("items"), web["proposals"]["items"])

    rk = data.get("ranking", {})
    eq("ranking: intro", rk.get("intro"), web["ranking"]["intro"])
    eq("ranking: table header", rk.get("header"), web["ranking"]["table"][0])
    eq("ranking: table rows", rk.get("rows"), web["ranking"]["table"][1:])
    eq("ranking: legend", rk.get("legend"), web["ranking"]["legend"])

    eq("tools section: introduction (section 5)", [data.get("toolsIntro")], web["tools_intro"])
    bd, wb = data.get("builder", {}), web["builder"]
    eq("package section: paragraphs before the list", bd.get("intro"), wb["intro"])
    eq("package section: line before the list", bd.get("supportingLead"), wb["supportingLead"])
    eq("package section: supporting measures list", bd.get("supporting"), wb["supporting"])
    eq("package section: closing paragraph(s)", bd.get("closing"), wb["closing"])

    # Reasons for dependencies: the sentence after each bullet's bold lead-in in section 7.
    expected_reasons = dependency_reasons(wb["supporting"])
    for iv in data["interventions"]:
        for d in iv.get("dependsOn", []):
            if (iv["id"], d) not in expected_reasons:
                error("%s depends on %s, but section 7 of Website text.md has no supporting-measure bullet for it" % (iv["id"], d))
            else:
                eq("%s: reason for needing %s (dependsOnWhy)" % (iv["id"], d),
                   iv.get("dependsOnWhy", {}).get(d), expected_reasons[(iv["id"], d)])
    for (a, b) in expected_reasons:
        if b not in next(iv for iv in data["interventions"] if iv["id"] == a).get("dependsOn", []):
            error("section 7 of Website text.md links %s to %s, but dependsOn does not list it" % (a, b))

    descriptions = tool_descriptions(web)
    names = [iv.get("name") for iv in data["interventions"]]
    eq("tool order on the cards (section 5)", names, list(descriptions.keys()))
    for iv in data["interventions"]:
        n = iv.get("id")
        if iv.get("name") not in web["tools"]:
            error("%s: no tool page named %r in Website text.md" % (n, iv.get("name")))
            continue
        src = web["tools"][iv["name"]]
        eq("%s: short description" % n, iv.get("description"), descriptions.get(iv["name"]))
        eq("%s: introduction" % n, iv.get("introduction"), src["introduction"])
        for a in ACTORS:
            eq("%s: why (%s)" % (n, ACTOR_WEBSITE[a]), iv.get("why", {}).get(a), src["why"].get(ACTOR_WEBSITE[a]))
        eq("%s: contribution to pacing" % n, iv.get("contribution"), src["contribution"])
        eq("%s: failure scenarios" % n, iv.get("failures"), src["failures"])
        eq("%s: regulatory burden" % n, iv.get("burden"), src["burden"])

    # Ranking rows name the same tools as the cards.
    for row in rk.get("rows", []):
        if len(row) > 1 and row[1] not in names:
            error("ranking: %r is not the name of any tool" % row[1])

    # Section headings: the headings of Website text.md without numbers and bracketed notes.
    wanted = {}
    for h in web["headings"]:
        clean = re.sub(r"^\d+\.\s*", "", h)
        clean = re.sub(r"\s*\([^)]*\)\s*$", "", clean)
        wanted[h] = clean
    titles = method.get("sectionTitles", {})
    expect = {
        "proposals": next(v for k, v in wanted.items() if k.startswith("3.")),
        "ranking": next(v for k, v in wanted.items() if k.startswith("4.")),
        "tools": next(v for k, v in wanted.items() if k.startswith("5.")),
        "builder": next(v for k, v in wanted.items() if k.startswith("7.")),
        "appendix": next(v for k, v in wanted.items() if k.startswith("8.")),
        "howWeScore": "How we score",
    }
    for key, want in expect.items():
        eq("section title '%s'" % key, titles.get(key), want)

    # The appendix.
    how = method.get("howWeScore", {})
    blocks = web.get("how_we_score", {}).get("blocks", [])
    paras = [b[1] for b in blocks if b[0] == "p"]
    tables = [b[1] for b in blocks if b[0] == "table"]
    if len(paras) != 3 or len(tables) != 1:
        error("Website text.md: 'How we score' should hold three paragraphs and one table; found %d and %d" % (len(paras), len(tables)))
    else:
        eq("how we score: first paragraph", how.get("intro"), paras[0])
        eq("how we score: table header", how.get("table", {}).get("header"), tables[0][0])
        eq("how we score: table rows", how.get("table", {}).get("rows"), tables[0][1:])
        eq("how we score: expected behaviours", how.get("expected"), paras[1])
        eq("how we score: closing line", how.get("closing"), paras[2])
        labels = [c.get("label") for c in method.get("criteria", [])]
        eq("how we score: the 'Shown as' column names the six criteria, in order", [r[0] for r in tables[0][1:]], labels)

    # Glossary: the same terms as Website text.md, with word-for-word definitions.
    by_term = {g.get("term"): g for g in glossary}
    source_terms = [t for t, _ in web.get("glossary", [])]
    eq("glossary: the terms (as a sorted list)", sorted(by_term, key=str.lower), sorted(source_terms, key=str.lower))
    for term, definition in web.get("glossary", []):
        if term in by_term:
            eq("glossary: definition of %r" % term, by_term[term].get("definition"), definition)

    if len(errors) == before:
        ok("%d pieces of wording match Website text.md exactly" % n_compared)


def check_glossary(glossary, web):
    print("\n3. Glossary")
    before = len(errors)
    terms = [g.get("term") for g in glossary]
    for t in {t for t in terms if terms.count(t) > 1}:
        error("glossary: the term %r appears twice" % t)
    for g in glossary:
        if not g.get("term") or not g.get("definition") or not g.get("match"):
            error("glossary: every entry needs term, match (a list) and definition: %r" % g.get("term"))
    # Which terms appear in the site's text? A term nobody can see is only a warning.
    corpus = " ".join(
        [web["site_title"]] + web["introduction"] + [web["proposals"]["intro"]] + [flatten_text(g) for g in web["proposals"]["items"]] + [web["ranking"]["intro"], web["ranking"]["legend"]]
        + web["tool_descriptions"] + web["tools_intro"]
        + web["builder"]["intro"] + [web["builder"]["supportingLead"]] + web["builder"]["supporting"] + web["builder"]["closing"]
        + [b[1] for b in web["how_we_score"]["blocks"] if b[0] == "p"]
        + [" ".join(str(v) for v in json.dumps(web["tools"], ensure_ascii=False).split())]
    )
    for g in glossary:
        found = any(re.search(r"(^|[^A-Za-z0-9-])" + re.escape(m) + r"(?![A-Za-z0-9-])", corpus, flags=re.IGNORECASE)
                    for m in g.get("match", []))
        if not found:
            warn("glossary: %r is not matched anywhere in the site's text (it will appear only in the Glossary list)" % g.get("term"))
    if len(errors) == before:
        ok("%d terms, all with the definitions of Website text.md" % len(glossary))


def check_mappings(data, docs):
    """(b) scores, stances, justifications; (c) sources."""
    print("\n4. Scores, stances, justifications and sources against the mappings  [checks (b) and (c)]")
    for iv in data["interventions"]:
        n = iv.get("id")
        before = len(errors)
        fname = MAPPINGS.get(n)
        if not fname:
            error("%s: no mapping is listed for this tool in tools/validate_data.py (MAPPINGS)" % n)
            continue
        path = docs / fname
        if not path.exists():
            error("%s: mapping not found: %s" % (n, fname))
            continue
        try:
            m = parse_mapping(path)
        except StopIteration:
            error("%s: no 'Step 1' scores table found in %s" % (n, fname))
            continue
        if not m["header"] or not m["row"]:
            error("%s: could not read the scores table in %s" % (n, fname))
            continue
        header, row = m["header"], m["row"]

        for c in CRITERIA:
            idx = column_index(header, c)
            if idx is None or idx >= len(row) or not re.fullmatch(r"[1-5]", row[idx]):
                error("%s.%s: no score from 1 to 5 in the mapping's table" % (n, c))
                continue
            compare("%s.%s score (site vs %s)" % (n, c, fname), iv["scores"][c]["score"], int(row[idx]))
            bullet = m["bullets"].get(BULLET_LABELS[c])
            if bullet is None:
                error("%s.%s: no bullet '%s' under the table in %s" % (n, c, BULLET_LABELS[c], fname))
            else:
                compare("%s.%s justification" % (n, c), iv["scores"][c]["justification"], bullet)

        idx = next((i for i, h in enumerate(header) if "incentive" in h.lower()), None)
        stances = mapping_stances(row[idx]) if idx is not None else None
        if stances is None:
            error("%s: could not read the four actors' stances in %s" % (n, fname))
        else:
            for a in ACTORS:
                compare("%s.stances.%s (site vs %s)" % (n, a, fname), iv["stances"][a], stances[a])

        compare("%s: sources list (site vs %s)" % (n, fname), iv["sources"], m["sources"])
        if len(errors) == before:
            ok("%s: scores, stances, justifications and %d sources match %s" % (n, len(m["sources"]), fname))


def main():
    print("Site folder:   %s" % SITE)
    print("Sources:       %s" % DOCS)
    try:
        data = load_js_json(SITE / "data" / "interventions.js", "PACING_DATA")
        method = load_js_json(SITE / "data" / "method.js", "PACING_METHOD")
        glossary = load_js_json(SITE / "data" / "glossary.js", "PACING_GLOSSARY")
    except (OSError, ValueError, KeyError) as exc:
        print("\n  ERROR    could not read a data file as JSON: %s" % exc)
        print("\nRESULT: FAILED (a data file could not be read)")
        return 1
    if not DOCS.exists() or not WEBSITE_TEXT.exists():
        print("\n  ERROR    source folder or Website text.md not found: %s" % DOCS)
        print("\nRESULT: FAILED (sources not found)")
        return 1
    try:
        web = parse_website(WEBSITE_TEXT)
    except (KeyError, IndexError, StopIteration) as exc:
        print("\n  ERROR    could not read Website text.md (a section is missing or renamed): %r" % exc)
        print("\nRESULT: FAILED (Website text.md could not be read)")
        return 1

    check_structure(data, method, glossary)
    if not errors:
        check_site_text(data, method, glossary, web)
        check_glossary(glossary, web)
        check_mappings(data, DOCS)
    else:
        print("\n  (The other checks are skipped until the structure is fixed.)")

    print()
    if errors:
        print("RESULT: FAILED with %d error(s) and %d warning(s)." % (len(errors), len(warnings)))
        return 1
    print("RESULT: PASSED with %d warning(s)." % len(warnings))
    return 0


if __name__ == "__main__":
    sys.exit(main())
