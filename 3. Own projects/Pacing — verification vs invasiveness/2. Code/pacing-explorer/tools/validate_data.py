#!/usr/bin/env python3
"""Check data/interventions.js against the rules of the Pacing explorer and
against the three background-mapping documents.

Run from anywhere:

    python3 tools/validate_data.py

It uses only the Python standard library and changes no files.

What it checks
  1. Every intervention has every required field, of the right shape.
  2. Scores are whole numbers from 1 to 5.
  3. Readiness, stance, confidence and likelihood values come from the allowed sets.
  4. Every id in "dependsOn" exists.
  5. Length limits (words per text, items per list).
  6. Each intervention's scores, stances and readiness match its row in the
     "Step 1" scores table of its source document (the .md files in "4. Drafting").

Exit code 0 means no errors. Warnings do not change the exit code.
"""

import argparse
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parent
DEFAULT_DATA = SITE / "data" / "interventions.js"
DEFAULT_METHOD = SITE / "data" / "method.js"
# tools -> pacing-explorer -> "2. Code" -> the project folder
DEFAULT_DOCS = SITE.parent.parent / "4. Drafting"

CRITERIA = ["effectiveness", "coverage", "verifiability", "burden", "robustness", "invasiveness"]
ACTORS = ["labs", "chipCloudFirms", "leadingState", "trailingState"]
READINESS = {"now", "1-3y", "3y+"}
STANCES = {"cooperate", "circumvent", "undermine"}
CONFIDENCE = {"low", "medium", "high"}
LIKELIHOOD = {"low", "medium", "high"}

REQUIRED = ["id", "name", "plainName", "oneLiner", "howItWorks", "readiness", "scores",
            "incentives", "labsMustDo", "labsLikelyResponse", "waysAround", "sideEffects",
            "proposals", "theoryOfChange", "firstSteps", "laterSteps", "dependsOn", "sources"]

# Which column of the documents' scores table holds what (matched on the header text).
COLUMN_KEYS = {
    "effectiveness": "effectiveness",
    "coverage": "coverage",
    "incentive": "incentive",
    "verifiability": "verifiab",
    "burden": "burden",
    "robustness": "robust",
    "invasiveness": "invasive",
    "readiness": "readiness",
}

# How the documents name each actor in the "Incentive compatibility" cell.
ACTOR_LABELS = {
    "labs": "Labs",
    "chipCloudFirms": "Chip and cloud firms",
    "leadingState": "Leading state",
    "trailingState": "Trailing state",
}

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


# ---------------------------------------------------------------- reading the data file

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
        else:
            if ch == '"':
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


def load_data(path):
    raw = path.read_text(encoding="utf-8")
    body = strip_line_comments(raw)
    marker = "window.PACING_DATA"
    start = body.find(marker)
    if start == -1:
        raise ValueError("could not find 'window.PACING_DATA =' in " + path.name)
    first = body.find("{", start)
    last = body.rfind("}")
    return raw, json.loads(body[first:last + 1])


def words(text):
    return len(str(text).split())


# ---------------------------------------------------------------- structure checks

def check_score_set(label, block):
    if not isinstance(block, dict):
        error(f"{label}: must be an object with the six criteria")
        return
    for c in CRITERIA:
        entry = block.get(c)
        if not isinstance(entry, dict):
            error(f"{label}.{c}: missing")
            continue
        score = entry.get("score")
        if isinstance(score, bool) or not isinstance(score, int) or not 1 <= score <= 5:
            error(f"{label}.{c}.score: must be a whole number from 1 to 5, found {score!r}")
        if not isinstance(entry.get("justification"), str) or not entry["justification"].strip():
            error(f"{label}.{c}.justification: missing")
        if entry.get("confidence") not in CONFIDENCE:
            error(f"{label}.{c}.confidence: must be one of {sorted(CONFIDENCE)}, found {entry.get('confidence')!r}")
    for extra in set(block) - set(CRITERIA):
        error(f"{label}: unknown criterion {extra!r}")


def check_list(label, value, max_items=None, min_items=1):
    if not isinstance(value, list):
        error(f"{label}: must be a list")
        return False
    if len(value) < min_items:
        error(f"{label}: needs at least {min_items} item(s)")
    if max_items is not None and len(value) > max_items:
        error(f"{label}: at most {max_items} items allowed, found {len(value)}")
    return True


def check_words(label, text, limit):
    if not isinstance(text, str) or not text.strip():
        error(f"{label}: missing")
    elif words(text) > limit:
        error(f"{label}: at most {limit} words allowed, found {words(text)}")


def check_structure(data):
    print("\n1. Structure of data/interventions.js")
    items = data.get("interventions")
    if not isinstance(items, list) or not items:
        error("'interventions' must be a non-empty list")
        return []
    if not isinstance(data.get("headline"), str) or not data["headline"].strip():
        error("'headline' is missing")

    ids = [iv.get("id") for iv in items]
    for dup in {i for i in ids if ids.count(i) > 1}:
        error(f"id {dup!r} is used more than once")

    for iv in items:
        name = iv.get("id", "?")
        before = len(errors)
        for field in REQUIRED:
            if field not in iv:
                error(f"{name}: missing field '{field}'")
        if len(errors) > before:
            continue

        check_words(f"{name}.oneLiner", iv["oneLiner"], 20)
        check_words(f"{name}.howItWorks", iv["howItWorks"], 80)
        check_words(f"{name}.theoryOfChange", iv["theoryOfChange"], 60)

        if iv["readiness"] not in READINESS:
            error(f"{name}.readiness: must be one of {sorted(READINESS)}, found {iv['readiness']!r}")

        check_score_set(f"{name}.scores", iv["scores"])
        if "today" in iv:
            check_score_set(f"{name}.today", iv["today"])

        inc = iv["incentives"]
        for actor in ACTORS:
            entry = inc.get(actor) if isinstance(inc, dict) else None
            if not isinstance(entry, dict):
                error(f"{name}.incentives.{actor}: missing")
                continue
            if entry.get("stance") not in STANCES:
                error(f"{name}.incentives.{actor}.stance: must be one of {sorted(STANCES)}, found {entry.get('stance')!r}")
            check_words(f"{name}.incentives.{actor}.note", entry.get("note"), 15)

        check_list(f"{name}.labsMustDo", iv["labsMustDo"], 6)
        check_list(f"{name}.labsLikelyResponse", iv["labsLikelyResponse"], 4)
        check_list(f"{name}.sideEffects", iv["sideEffects"], 5)
        check_list(f"{name}.firstSteps", iv["firstSteps"], 4)
        check_list(f"{name}.laterSteps", iv["laterSteps"], 4)

        if check_list(f"{name}.waysAround", iv["waysAround"]):
            for n, w in enumerate(iv["waysAround"], 1):
                if not isinstance(w, dict) or not w.get("strategy"):
                    error(f"{name}.waysAround[{n}]: needs a 'strategy'")
                    continue
                if w.get("likelihood") not in LIKELIHOOD:
                    error(f"{name}.waysAround[{n}].likelihood: must be one of {sorted(LIKELIHOOD)}, found {w.get('likelihood')!r}")
                if "note" not in w:
                    error(f"{name}.waysAround[{n}]: needs a 'note' (it may be empty)")

        if check_list(f"{name}.proposals", iv["proposals"]):
            for n, p in enumerate(iv["proposals"], 1):
                if not isinstance(p, dict) or not p.get("name"):
                    error(f"{name}.proposals[{n}]: needs a 'name'")
                    continue
                check_words(f"{name}.proposals[{n}].role", p.get("role"), 40)

        if check_list(f"{name}.sources", iv["sources"]):
            for n, s in enumerate(iv["sources"], 1):
                if not isinstance(s, dict) or not s.get("short") or not s.get("full"):
                    error(f"{name}.sources[{n}]: needs 'short' and 'full'")

        if check_list(f"{name}.dependsOn", iv["dependsOn"], min_items=0):
            for dep in iv["dependsOn"]:
                if dep not in ids:
                    error(f"{name}.dependsOn: unknown id {dep!r}")
                if dep == name:
                    error(f"{name}.dependsOn: an intervention cannot depend on itself")

        if len(errors) == before:
            ok(f"{name}: all fields present and well formed")
    return items


def check_method(path):
    """Light check that data/method.js scores the same six criteria."""
    print("\n2. Criteria in data/method.js")
    if not path.exists():
        error(f"{path} not found")
        return
    text = path.read_text(encoding="utf-8")
    start = text.find("criteria:")
    end = text.find("words:", start)
    found = re.findall(r'\bid:\s*"([A-Za-z]+)"', text[start:end]) if start != -1 and end != -1 else []
    if sorted(found) == sorted(CRITERIA):
        ok("method.js lists the same six criteria as the data")
    else:
        error(f"method.js criteria {found} do not match {CRITERIA}")


# ---------------------------------------------------------------- comparison with the documents

def clean_cell(cell):
    cell = cell.replace("\\", "").replace("*", "").replace("+", "")
    return re.sub(r"\s+", " ", cell).strip()


def norm(text):
    return clean_cell(text).replace("–", "-").replace("—", "-").lower()


def table_rows(md_text):
    rows = []
    for line in md_text.splitlines():
        line = line.strip()
        if line.endswith("\\"):
            line = line[:-1].rstrip()
        if not line.startswith("|"):
            continue
        cells = [clean_cell(c) for c in line.strip("|").split("|")]
        if all(re.fullmatch(r":?-{2,}:?", c.replace(" ", "")) or c == "" for c in cells):
            continue
        rows.append(cells)
    return rows


def find_scores_row(md_text, row_label):
    """Return (header cells, row cells) for the scores table row with this label."""
    header = None
    for cells in table_rows(md_text):
        lowered = [c.lower() for c in cells]
        if any("effectiveness" in c for c in lowered) and any("invasive" in c for c in lowered):
            header = cells
            continue
        if header and norm(cells[0]) == norm(row_label):
            return header, cells
    return header, None


def column_index(header, key):
    for i, cell in enumerate(header):
        if COLUMN_KEYS[key] in cell.lower():
            return i
    return None


def map_readiness(doc_value):
    v = norm(doc_value)
    if v == "now":
        return "now"
    if re.fullmatch(r"(in )?1-3 years?", v):
        return "1-3y"
    if re.fullmatch(r"(in )?3\+ years?", v):
        return "3y+"
    return None


def check_against_documents(items, docs_dir):
    print("\n3. Scores against the source documents")
    if not docs_dir.exists():
        error(f"source folder not found: {docs_dir}")
        return
    for iv in items:
        name = iv.get("id", "?")
        src = iv.get("sourceDoc")
        if not isinstance(src, dict) or not src.get("file") or not src.get("rowLabel"):
            error(f"{name}: needs 'sourceDoc' with 'file' and 'rowLabel' so its scores can be checked")
            continue
        path = docs_dir / src["file"]
        if not path.exists():
            error(f"{name}: source document not found: {path.name}")
            continue
        header, row = find_scores_row(path.read_text(encoding="utf-8"), src["rowLabel"])
        if header is None:
            error(f"{name}: no scores table found in {path.name}")
            continue
        if row is None:
            error(f"{name}: no row labelled {src['rowLabel']!r} in the scores table of {path.name}")
            continue

        before = len(errors)
        for c in CRITERIA:
            idx = column_index(header, c)
            if idx is None or idx >= len(row):
                error(f"{name}.{c}: column not found in {path.name}")
                continue
            doc_value = row[idx]
            if not re.fullmatch(r"[1-5]", doc_value):
                error(f"{name}.{c}: the document has {doc_value!r}, which is not a score from 1 to 5")
                continue
            data_value = iv.get("scores", {}).get(c, {}).get("score")
            if int(doc_value) != data_value:
                error(f"MISMATCH {name}.{c}: data file has {data_value}, {path.name} has {doc_value}")

        idx = column_index(header, "incentive")
        if idx is not None and idx < len(row):
            cell = row[idx]
            for actor, label in ACTOR_LABELS.items():
                m = re.search(re.escape(label) + r":\s*([A-Za-z]+)", cell, flags=re.IGNORECASE)
                data_stance = iv.get("incentives", {}).get(actor, {}).get("stance")
                if not m:
                    warn(f"{name}.incentives.{actor}: could not read a stance for '{label}' in {path.name}")
                elif m.group(1).lower() != data_stance:
                    error(f"MISMATCH {name}.incentives.{actor}: data file has {data_stance!r}, {path.name} has {m.group(1).lower()!r}")
        else:
            warn(f"{name}: no 'Incentive compatibility' column found in {path.name}")

        idx = column_index(header, "readiness")
        if idx is not None and idx < len(row):
            doc_ready = row[idx]
            mapped = map_readiness(doc_ready)
            if mapped is None:
                note = iv.get("readinessNote", "")
                if norm(note) != norm(doc_ready):
                    error(f"MISMATCH {name}.readiness: {path.name} has {doc_ready!r}, which is not one of the three "
                          f"standard values; 'readinessNote' should repeat it exactly (found {note!r})")
                else:
                    warn(f"{name}.readiness: {path.name} has {doc_ready!r}, which is not one of the three standard "
                         f"values (now, 1-3 years, 3+ years). The data file uses {iv.get('readiness')!r} and shows "
                         f"{note!r} to readers. A person must confirm this choice.")
            elif mapped != iv.get("readiness"):
                error(f"MISMATCH {name}.readiness: data file has {iv.get('readiness')!r}, {path.name} has {doc_ready!r}")
        else:
            warn(f"{name}: no 'Readiness' column found in {path.name}")

        if len(errors) == before:
            ok(f"{name}: scores and stances match the row '{src['rowLabel']}' in {path.name}")


def report_placeholders(raw):
    print("\n4. Placeholders still marked TO CONFIRM")
    lines = [(n, line.strip()) for n, line in enumerate(raw.splitlines(), 1)
             if "TO CONFIRM" in line and not line.lstrip().startswith("// - ")]
    if not lines:
        ok("none")
        return
    print(f"  {len(lines)} line(s). These are reminders, not errors:")
    kinds = {}
    for _, line in lines:
        m = re.search(r"TO CONFIRM[^\n]*", line)
        key = m.group(0) if m else "TO CONFIRM"
        kinds[key] = kinds.get(key, 0) + 1
    for key, count in kinds.items():
        print(f"    {count:>2} x  {key}")


def main():
    parser = argparse.ArgumentParser(description="Validate the Pacing explorer data.")
    parser.add_argument("--data", type=Path, default=DEFAULT_DATA, help="path to interventions.js")
    parser.add_argument("--docs", type=Path, default=DEFAULT_DOCS, help="folder holding the background-mapping .md files")
    args = parser.parse_args()

    print(f"Data file:       {args.data}")
    print(f"Source documents: {args.docs}")

    try:
        raw, data = load_data(args.data)
    except (OSError, ValueError) as exc:
        print(f"\n  ERROR    could not read the data file as JSON: {exc}")
        print("\nRESULT: FAILED (the data file could not be read)")
        return 1

    items = check_structure(data)
    check_method(DEFAULT_METHOD)
    check_against_documents(items, args.docs)
    report_placeholders(raw)

    print()
    if errors:
        print(f"RESULT: FAILED with {len(errors)} error(s) and {len(warnings)} warning(s).")
        return 1
    print(f"RESULT: PASSED with {len(warnings)} warning(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
