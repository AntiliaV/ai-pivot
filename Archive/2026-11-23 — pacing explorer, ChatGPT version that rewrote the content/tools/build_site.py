#!/usr/bin/env python3
"""Build an offline, progressively enhanced policy note from content.md.

Only Python's standard library is needed. Run from any directory.
Numerical scores and classifications remain in data/assessments.json.
"""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
TEXT = (ROOT / 'content.md').read_text()
ASSESSMENTS = json.loads((ROOT / 'data/assessments.json').read_text())
PUB = json.loads((ROOT / 'data/publication.json').read_text())
TOOLS = ASSESSMENTS['interventions']
BY_ID = {t['id']: t for t in TOOLS}
E = html.escape


def inline(text):
    pattern = r'\[([^\]]+)\]\((https?://[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*'
    out, start = [], 0
    for m in re.finditer(pattern, text):
        out.append(E(text[start:m.start()]))
        if m[1] is not None:
            out.append(f'<a href="{E(m[2], quote=True)}" rel="noreferrer">{inline(m[1])}</a>')
        elif m[3] is not None:
            out.append(f'<strong>{E(m[3])}</strong>')
        else:
            out.append(f'<em>{E(m[4])}</em>')
        start = m.end()
    return ''.join(out) + E(text[start:])


def md(text):
    """Render the deliberately small Markdown vocabulary used by this note."""
    out = []
    for block in re.split(r'\n\s*\n', text.strip()):
        if not block:
            continue
        lines = block.splitlines()
        if lines[0].startswith('|'):
            rows = [[x.strip() for x in l.strip().strip('|').split('|')] for l in lines]
            head, rows = rows[0], rows[2:]
            cells = ''.join(f'<th scope="col">{inline(x)}</th>' for x in head)
            body = ''.join('<tr><th scope="row">' + inline(row[0]) + '</th>' + ''.join('<td>'+inline(x)+'</td>' for x in row[1:]) + '</tr>' for row in rows)
            out.append(f'<div class="table-scroll" role="region" aria-label="Assessment criteria" tabindex="0"><table><thead><tr>{cells}</tr></thead><tbody>{body}</tbody></table></div>')
        elif all(re.match(r'^[-*] |^\d+\. ', l) for l in lines):
            tag = 'ol' if re.match(r'^\d+\. ', lines[0]) else 'ul'
            out.append(f'<{tag}>' + ''.join('<li>'+inline(re.sub(r'^([-*]|\d+\.) ', '', l))+'</li>' for l in lines) + f'</{tag}>')
        else:
            out.append('<p>' + inline(' '.join(lines)) + '</p>')
    return '\n'.join(out)


def section(title):
    m = re.search(r'^## \d+\. ' + re.escape(title) + r'\n(.*?)(?=^## |\Z)', TEXT, re.M | re.S)
    if not m:
        raise ValueError('Missing section: ' + title)
    return m[1].strip()


def slug(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')


def sub_sections(text):
    matches = list(re.finditer(r'^### (.+)\n', text, re.M))
    return [(m[1], text[m.end():matches[i+1].start() if i+1 < len(matches) else len(text)].strip()) for i, m in enumerate(matches)]


def details(title, body, cls='', opened=False, id_=''):
    return f'<details class="{cls}"{(" open" if opened else "")}{(" id=" + chr(34) + id_ + chr(34)) if id_ else ""}><summary>{title}</summary><div class="disclosure-body">{body}</div></details>'


def heading(id_, kicker, title):
    return f'<header class="section-heading"><span class="eyebrow">{E(kicker)}</span><h2 id="{id_}">{E(title)}</h2></header>'


def page(title, content, nav, kind='home'):
    author = ''
    if PUB['author']:
        author = '<span>' + E(PUB['author']) + (', ' + E(PUB['affiliation']) if PUB['affiliation'] else '') + '</span>'
    links = ''.join(f'<a href="{E(h)}">{E(t)}</a>' for h,t in nav)
    scripts = '<script src="js/package.js" defer></script><script src="data/site.js" defer></script><script src="js/app.js" defer></script>'
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="referrer" content="no-referrer"><meta name="description" content="A policy note comparing five tools for verifying agreements to pace frontier AI."><title>{E(title)} · AI pacing policy note</title><link rel="stylesheet" href="css/style.css">{scripts}</head>
<body data-page="{kind}"><a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><a class="wordmark" href="index.html"><span class="wordmark-symbol" aria-hidden="true">↗</span>AI pacing <span class="wordmark-kind">/ Policy note</span></a><div class="header-links"><a href="index.html#methods">Methods &amp; sources</a><a class="header-full" href="full-note.html">Read full note <span aria-hidden="true">↗</span></a></div></header>
<div class="publication-bar"><span>{E(PUB['edition'])}</span><time datetime="{PUB['dateISO']}">{E(PUB['date'])}</time>{author}<span>Qualitative research synthesis</span></div>
<div class="page-layout"><aside class="contents"><nav aria-label="On this page"><span class="nav-label">On this page</span>{links}</nav></aside><main id="main" tabindex="-1">{content}</main></div>
<footer class="site-footer"><div><strong>Verifying agreements to pace AI</strong><p>Five tools. Different claims. A shared verification problem.</p></div><nav aria-label="Further reading"><a href="full-note.html">Full reading &amp; print view</a><a href="content.md" download>Download the text</a><a href="index.html#methods">Methods &amp; limitations</a><a href="#main">Back to top ↑</a></nav><p class="footer-note">A comparison of verification options. Scores are qualitative judgements; they are not measured detection probabilities.</p></footer>
<div id="definition" class="definition" role="dialog" aria-modal="false" aria-label="Glossary definition" hidden><button class="definition-close" type="button" aria-label="Close definition">×</button><strong></strong><p></p><a href="index.html#glossary">Open the glossary</a></div></body></html>'''


META = {
 'ledger': {'short':'Chip ledger', 'role':'Account for hardware', 'claim':'Stocks, transfers and declared locations', 'gap':'What registered chips compute; unregistered stock', 'configuration':'A reconciled register supporting rules on chip stocks, production or location.', 'evidence':'Established inventory methods', 'uncertainty':'Completeness of a global inventory has not been validated.', 'source':'https://arxiv.org/html/2511.10783v3', 'sourceLabel':'MIRI agreement, Articles V–VI'},
 'inspections': {'short':'Physical inspection', 'role':'Check declarations', 'claim':'Hardware and physical controls at inspected sites', 'gap':'Undeclared sites and activity between visits', 'configuration':'Periodic checks of declared sites, linked to the ledger and continuity measures.', 'evidence':'Established inspection practices', 'uncertainty':'International access and continuity remain dependent on the agreed protocol.', 'source':'https://cset.georgetown.edu/publication/tracking-ai-chips/', 'sourceLabel':'CSET: Tracking AI Chips'},
 'evaluations': {'short':'Capability evaluation', 'role':'Assess model capabilities', 'claim':'Performance of a specified model under test', 'gap':'Unsubmitted models, incomplete elicitation and changed configurations', 'configuration':'Independent tests informing a release gate or repeated development checkpoints. These gates have different pacing effects.', 'evidence':'Existing evaluation practice', 'uncertainty':'Tests give incomplete evidence about latent capabilities and unsubmitted models.', 'source':'https://arxiv.org/html/2511.10783v3', 'sourceLabel':'MIRI agreement, Articles IV & XIII'},
 'bandwidth': {'short':'Bandwidth cap', 'role':'Restrict communication', 'claim':'Communication limits at a defined network boundary', 'gap':'Training within pods, hidden links and low-communication methods', 'configuration':'Physical bandwidth restrictions between servers at declared sites, supported by inspection.', 'evidence':'Proof-of-concept evidence', 'uncertainty':'Robustness against a determined operator is not established by the prototype.', 'source':'https://techgov.intelligence.org/blog/de-risking-interconnect-limits-for-ai-verification', 'sourceLabel':'Interconnect limits: prototype & limitations'},
 'metering': {'short':'Cloud metering', 'role':'Account for compute use', 'claim':'Compute records linked to customers and projects', 'gap':'Activity outside reporting duties and projects split across providers', 'configuration':'Provider-based identity checks and project-level accounting, with threshold reporting or allocation limits.', 'evidence':'Established resource accounting', 'uncertainty':'Cross-provider aggregation and coverage of self-operated capacity remain unresolved.', 'source':'https://arxiv.org/abs/2403.08501', 'sourceLabel':'Heim et al.: Governing Through the Cloud'}
}
RATIONALES = {
 'ledger': ['Supports limits on hardware stocks, production and location; usage restrictions need additional checks.', 'Concentrated new production and large holdings are relatively observable; legacy stock and non-participants leave gaps.', 'Reconciled records support useful checks, but do not rule out state concealment or small hidden clusters.', 'Reporting, reconciliation and audits require a registry function; consolidation and inspections add costs.', 'Reusable across agreements, provided gaps and changing hardware definitions receive continuing review.', 'Reuses asset records without exposing weights or code, while chip counts and sites remain strategically sensitive.'],
 'inspections': ['Can support rules on storage, shutdown, physical configuration or production; the protocol determines what is established.', 'Reaches declared or independently identified sites, with limited reach into undeclared capacity.', 'Provides an independent snapshot; seals and other continuity measures are needed between visits.', 'Requires trained inspectors, timely access, sampling protocols and dispute procedures.', 'Methods can adapt, but continued assurance depends on political access and continuity.', 'Visits may disrupt operations and expose layouts, security procedures and network configurations.'],
 'evaluations': ['Can reveal gains from several routes to capability, conditional on test validity and the decision gate applied.', 'Targets selected capabilities in submitted models; unreported versions and internal use may remain outside scope.', 'Incomplete elicitation, model substitution and configuration changes limit assurance.', 'Requires scarce experts, secure facilities and explicit decision rules for uncertain results.', 'Tests can change, but validity, contamination and strategic underperformance require continual attention.', 'High-access testing can involve valuable model information, staff time and release or development delays.'],
 'bandwidth': ['Impedes communication-intensive training at covered sites; within-pod and lower-communication methods remain possible.', 'Applies at the installed boundary, with spillovers onto some permitted inference and scientific workloads.', 'Physical restrictions are inspectable, conditional on coverage of every relevant path and exception.', 'Requires topology audits, physical checks, change control and continuity measures.', 'Fixed caps can erode as methods change; removing them can restore training capacity quickly.', 'Reveals relatively little model information but constrains network design and operational flexibility.'],
 'metering': ['Supports a compute cap for covered cloud projects; a report alone does not constrain development.', 'Covers customers within the reporting duty, with gaps for self-operated capacity and fragmented projects.', 'Auditable account records help, but workload purpose and cross-provider aggregation require additional evidence.', 'Builds on billing and customer records, with added standards, audits and reconciliation.', 'Counting rules can change; coverage depends on the reporting duty and developer responses.', 'Uses identity, timing, volume and project records without requiring model weights or training data.']
}
SCORE_ORDER = ['effectiveness','coverage','verifiability','burden','robustness','invasiveness']
for i, t in enumerate(TOOLS,1):
    t.update(META[t['id']]); t['number'] = i
    t['rationales'] = dict(zip(SCORE_ORDER, RATIONALES[t['id']]))


def tool_link(t, text=None):
    return f'<a href="tool-{t["id"]}.html">{E(text or t["name"])}</a>'


def score_word(t, key):
    return ASSESSMENTS['words']['cost' if key in ('burden','invasiveness') else 'benefit'][t['scores'][key]['score']-1]


def pips(t, key):
    value=t['scores'][key]['score'];cost=key in ('burden','invasiveness')
    return f'<span class="score-visual {"cost" if cost else "benefit"}" aria-hidden="true">' + ''.join(f'<i class="{"filled" if x < value else ""}"></i>' for x in range(5)) + '</span>'


def score_row(t, key):
    c=next(c for c in ASSESSMENTS['criteria'] if c['id']==key)
    label={'effectiveness':'Relevance to pacing','coverage':'Coverage & targeting','verifiability':'Detection & enforcement','robustness':'Durability & flexibility','burden':'Government burden','invasiveness':'Lab invasiveness'}[key]
    word=score_word(t,key);n=t['scores'][key]['score']
    return details(f'<span class="score-label">{label}</span>{pips(t,key)}<span class="score-word">{word}</span><span class="sr-only">, {n} out of 5. Read rationale</span>', f'<p>{E(t["rationales"][key])}</p><p class="small muted">Original score retained; explanation edited for this edition. Formal confidence rating: not assigned.</p><a class="small" href="{E(t["source"])}">Primary source: {E(t["sourceLabel"])} ↗</a>', 'score-row')


def overview():
    descriptions={}
    for name, desc in re.findall(r'^\*\*([^*]+)\.\*\* (.+)$',section('Verification tools'),re.M):
        descriptions[name]=desc
    rows=[]
    for t in TOOLS:
        rows.append(f'<tr><th scope="row"><span class="tool-number">{t["number"]:02}</span>{tool_link(t)}<span class="cell-caption">{E(t["role"])}</span></th><td data-label="What it establishes">{E(t["claim"])}</td><td data-label="Main limit">{E(t["gap"])}</td><td data-label="Lab invasiveness"><span class="rating cost">{score_word(t,"invasiveness")}</span><a class="cell-caption" href="tool-{t["id"]}.html#assessment">Assumptions &amp; evidence ↗</a></td></tr>')
    table='<div class="comparison-table"><table><caption class="sr-only">Five tools: primary claims, blind spots and invasiveness for AI labs</caption><thead><tr><th scope="col">Tool</th><th scope="col">What it establishes</th><th scope="col">Main limit</th><th scope="col">Lab invasiveness</th></tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'
    descriptions_html=''.join(f'<p><strong>{E(name)}.</strong> {inline(desc)}</p>' for name,desc in descriptions.items())
    return heading('comparison','02 / Compare the tools','Five complementary checks')+'<p class="section-intro">Each tool answers a different question. Read across the evidence, then follow a tool for its assumptions, scores and failure modes.</p>'+table+details('Read the five tool summaries',md(section('Verification tools')),'reading-details')+map_html()


def map_html():
    groups={}
    for t in TOOLS:
        groups.setdefault((t['scores']['invasiveness']['score'],t['scores']['verifiability']['score']),[]).append(t)
    markers=[]
    for (x,y),members in groups.items():
        nums=' · '.join(str(t['number']) for t in members)
        target=f'tool-{members[0]["id"]}.html' if len(members)==1 else '#map-key'
        label=', '.join(t['name'] for t in members)+f': lab invasiveness {score_word(members[0],"invasiveness")}; detection & enforcement {score_word(members[0],"verifiability")}.'
        markers.append(f'<a class="map-marker" href="{target}" style="left:{(x-.5)*20}%;bottom:{(y-.5)*20}%" aria-label="{E(label)}">{nums}</a>')
    keys=''.join(f'<li><span class="key-number">{t["number"]}</span><div>{tool_link(t)}<span class="cell-caption">Intrusion: {score_word(t,"invasiveness").lower()} · Detection: {score_word(t,"verifiability").lower()}</span></div></li>' for t in TOOLS)
    chart=f'<div class="map-layout"><div class="map-chart"><p class="axis-heading">Detection &amp; enforcement ↑</p><div class="y-labels" aria-hidden="true"><span>High</span><span>Medium</span><span>Low</span></div><div class="map-plot" role="group" aria-label="Qualitative trade-off map">{"".join(markers)}</div><div class="x-labels" aria-hidden="true"><span>Light</span><span>Moderate</span><span>Heavy</span></div><p class="x-title">Lab invasiveness →</p></div><ol id="map-key" class="map-key">{keys}</ol></div>'
    return details('Explore the qualitative trade-off map',chart+md(section('Trade-off map')),'map-disclosure',id_='tradeoff-map')


def builder():
    priorities=''.join(f'<label class="choice"><input type="checkbox" name="priority" value="{c["id"]}"><span>{E(c["priorityLabel"])}</span></label>' for id_ in ASSESSMENTS['builder']['priorityOrder'] for c in ASSESSMENTS['criteria'] if c['id']==id_)
    return heading('explorer','03 / Explore the choices','What could a package include?')+'''<p class="section-intro">Set priorities and an invasiveness ceiling. The explorer shows which tools meet an illustrative scoring rule, including the supporting measures they require.</p>
<div class="notice"><strong>A discussion aid, not a validated policy recommendation.</strong><p>Scores are qualitative. Combined detection, total costs and political acceptance are not calculated.</p></div>
<div id="package-explorer" hidden><form id="package-form" class="explorer-form"><fieldset><legend>What matters most?</legend><p class="small muted" id="priority-hint">Choose up to three. All six criteria still count.</p><div class="priority-choices">'''+priorities+'''</div><p class="small" id="pick-count" aria-live="polite">0 of 3 selected</p></fieldset><fieldset class="limit-field"><legend>Maximum invasiveness for AI labs</legend><p class="small muted">Applies to every included tool, including supporting measures.</p><div class="limit-choices"><label class="choice"><input type="radio" name="limit" value="low"><span>Light only</span></label><label class="choice"><input type="radio" name="limit" value="medium"><span>Up to moderate</span></label><label class="choice"><input type="radio" name="limit" value="any" checked><span>Any level</span></label></div><button type="reset" class="button secondary">Reset choices</button></fieldset></form><p id="package-status" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></p><div id="package-results"></div></div>
<noscript><p class="notice">The interactive explorer requires JavaScript. All analysis, tool pages and methods are readable without it.</p></noscript>'''+details('Scope, dependencies and interpretation',md(section('Explore a verification package')),'reading-details')


def proposals():
    text=section('Pacing proposals');blocks=text.split('\n\n');intro=blocks[0];end=blocks[-1]
    items=[]
    for b in blocks[1:-1]:
        m=re.match(r'\[\*\*(.+?)\*\*\]\((.+?)\) — (.+?\(20\d{2}[^)]*\))\. (.*)',b,re.S)
        if not m:raise ValueError('Could not parse proposal '+b[:100])
        items.append(details(E(m[1])+f'<span class="proposal-attribution">{E(m[3])}</span>',md(m[4])+f'<a class="source-link" href="{E(m[2])}">Read the proposal ↗</a>','proposal'))
    rk=section('How central each tool is to the proposals')
    return heading('proposals','05 / Reference cases','Five approaches to pacing')+md(intro)+''.join(items)+md(end)+details('How the selected proposals use each tool',md(rk),'reading-details')


def methods():
    parts=sub_sections(section('Appendix'));out=[]
    for title,body in parts:
        if title=='Glossary':continue
        out.append(details(E(title),md(body),'reading-details',id_=slug(title)))
    publication='<p class="section-intro">Assessments concern defined configurations. The scores and proposal classifications are retained from the original research; the explanations have been edited for clarity.</p><div class="notice evidence"><strong>Confidence has not been formally rated.</strong><p>The evidence labels distinguish established components from prototypes and unresolved regime assumptions. They are descriptive summaries, not additional scores.</p></div>'
    glossary=next(body for title,body in parts if title=='Glossary')
    terms=re.findall(r'^- \*\*(.+?):\*\* (.+)$',glossary,re.M)
    entries=''.join(f'<div class="glossary-entry" id="term-{slug(term)}" data-search="{E((term+" "+definition).lower(),quote=True)}"><dt>{E(term)}</dt><dd>{inline(definition)}</dd></div>' for term,definition in terms)
    glossary_html=details('Glossary', '<label class="glossary-search" hidden>Find a term<input id="glossary-search" type="search" placeholder="For example, inference" autocomplete="off"></label><p id="glossary-count" class="small muted" role="status"></p><dl class="glossary">'+entries+'</dl>','reading-details',id_='glossary')
    return heading('methods','06 / Methods & sources','How to read the assessments')+publication+''.join(out)+glossary_html,terms


def tool_content(t):
    match=re.search(r'^### '+re.escape(t['name'])+r'\n(.*?)(?=^### |^## |\Z)',TEXT,re.M|re.S)
    if not match:raise ValueError('Missing tool '+t['id'])
    raw=match[1].strip();markers=list(re.finditer(r'^\*\*([^*]+)\.\*\*\s*',raw,re.M));parts={}
    for i,m in enumerate(markers):
        parts[m[1]]=raw[m.end():markers[i+1].start() if i+1<len(markers) else len(raw)].strip()
    return parts


def assessment(t):
    benefits=''.join(score_row(t,k) for k in ['effectiveness','coverage','verifiability','robustness'])
    costs=''.join(score_row(t,k) for k in ['burden','invasiveness'])
    return f'''<section class="assessment" aria-labelledby="assessment"><h2 id="assessment">Assessment at a glance</h2><div class="configuration"><span class="eyebrow">Configuration assessed</span><p>{E(t['configuration'])}</p></div><div class="evidence-panel"><div><span class="eyebrow">Evidence basis</span><strong>{E(t['evidence'])}</strong><p>{E(t['uncertainty'])}</p></div><div><span class="eyebrow">Confidence</span><strong>Not formally rated</strong><p>Qualitative author assessment, not measured performance.</p><a href="{E(t['source'])}">{E(t['sourceLabel'])} ↗</a></div></div><div class="score-columns"><div><h3>Potential contribution</h3>{benefits}</div><div><h3>Costs &amp; intrusion</h3>{costs}<p class="small muted">Select a score to read its rationale, assumptions and primary source. All numerical scores are retained.</p></div></div></section>'''


def tool_page(t):
    parts=tool_content(t)
    hero=f'<header class="tool-hero"><a class="back-link" href="index.html#comparison">← Back to the comparison</a><p class="eyebrow">Tool {t["number"]:02} / {E(t["role"])}</p><h1>{E(t["name"])}</h1><p class="lead">{E(t["claim"])}.</p></header>'
    intro=f'<section class="prose" data-prose><h2 id="overview">What this tool does</h2>{md(parts["Introduction"])}<div class="readiness"><strong>Readiness</strong>{md(parts["Readiness"])}</div></section>'
    body=hero+intro+assessment(t)
    labels=[('contribution','Contribution to pacing','Contribution to pacing'),('responses','Incentives and possible responses','Possible responses'),('failure-modes','Failure scenarios','Where it can fail'),('governance','Regulatory burden and safeguards','Government burden & safeguards'),('implication','Policy implication','Policy implication')]
    for id_,key,title in labels:
        body+=f'<section class="prose {"policy-callout" if id_=="implication" else ""}" data-prose><h2 id="{id_}">{title}</h2>{md(parts[key])}</section>'
    body+=f'<section class="prose sources" id="sources"><h2>Sources &amp; further reading</h2>{md(parts["Sources"])}'
    body+=details('Full source list from the original mapping','<ul>'+''.join(f'<li>{inline(s)}</li>' for s in t['sources'])+'</ul>','reading-details')+'</section>'
    index=TOOLS.index(t);prev=TOOLS[(index-1)%len(TOOLS)];nxt=TOOLS[(index+1)%len(TOOLS)]
    body+=f'<nav class="tool-pagination" aria-label="Other tools"><div><span class="small muted">Previous tool</span>{tool_link(prev)}</div><div><span class="small muted">Next tool</span>{tool_link(nxt)}</div></nav>'
    nav=[('#overview','Overview'),('#assessment','Scores & evidence'),('#contribution','Contribution to pacing'),('#responses','Possible responses'),('#failure-modes','Failure modes'),('#governance','Government burden'),('#sources','Sources')]
    return page(t['name'],body,nav,'tool')


def main():
    intro=section('Introduction').split('\n\n');subtitle=re.search(r'^\*\*Subtitle:\*\* (.+)$',TEXT,re.M)[1]
    hero=f'<header class="hero"><p class="eyebrow">Verification / Invasiveness / Coordination</p><h1>Verifying agreements<br class="desktop-break"> to pace AI</h1><p class="subtitle">{E(subtitle)}</p><div class="hero-actions"><a class="button" href="#comparison">Compare the five tools <span aria-hidden="true">↓</span></a><a class="text-link" href="full-note.html">Read the complete note ↗</a></div></header>'
    opening='<div class="opening prose" data-prose>'+md(intro[0])+'<div class="thesis"><span class="eyebrow">The central finding</span>'+md(intro[3])+'</div>'+details('The question, scope and research context',md('\n\n'.join(intro[1:3]+intro[4:])),'reading-details')+'</div>'
    findings=re.findall(r'^- \*\*(.+?)\*\* (.+)$',section('Key findings'),re.M)
    cards=''.join(f'<li><span class="finding-number">{i:02}</span><h3>{E(title)}</h3><p>{inline(body)}</p></li>' for i,(title,body) in enumerate(findings,1))
    summary=heading('findings','01 / Key findings','Assurance comes from the package')+'<ol class="findings-grid">'+cards+'</ol>'
    policy=heading('policy','04 / Policy implications','Design the agreement around the claim')+'<div class="prose" data-prose>'+md(section('Policy implications'))+'</div>'
    method_html,terms=methods()
    content=hero+opening+'<section>'+summary+'</section><section>'+overview()+'</section><section>'+builder()+'</section><section>'+policy+'</section><section>'+proposals()+'</section><section>'+method_html+'</section>'
    nav=[('#findings','Key findings'),('#comparison','Compare five tools'),('#explorer','Package explorer'),('#policy','Policy implications'),('#proposals','Reference proposals'),('#methods','Methods & sources')]
    (ROOT/'index.html').write_text(page(PUB['title'],content,nav))
    for t in TOOLS:(ROOT/f'tool-{t["id"]}.html').write_text(tool_page(t))
    full='<header class="hero"><p class="eyebrow">Complete reading &amp; print edition</p><h1>'+E(PUB['title'])+'</h1><p class="subtitle">'+E(subtitle)+'</p><button class="button print-button" type="button">Print / save as PDF</button></header>'
    for title,body in [('Introduction',section('Introduction')),('Key findings',section('Key findings')),('Verification tools',section('Verification tools')),('Interpreting the map',section('Trade-off map')),('Exploring a verification package',section('Explore a verification package')),('Policy implications',section('Policy implications')),('Pacing proposals',section('Pacing proposals')),('How central each tool is to the proposals',section('How central each tool is to the proposals'))]:
        full+=f'<section class="prose" data-prose><h2 id="full-{slug(title)}">{E(title)}</h2>{md(body)}</section>'
    for t in TOOLS:
        parts=tool_content(t);full+=f'<section class="full-tool"><h2>{E(t["name"])}</h2>'+assessment(t).replace('id="assessment"','id="assessment-'+t['id']+'"').replace('aria-labelledby="assessment"','aria-labelledby="assessment-'+t['id']+'"')
        for key,value in parts.items():full+=f'<div class="prose"><h3>{E(key)}</h3>{md(value)}</div>'
        full+='</section>'
    full+='<section><h2>Methods &amp; limitations</h2>'+method_html+'</section>'
    (ROOT/'full-note.html').write_text(page(PUB['title']+' — full note',full,[('#full-introduction','Introduction'),('#full-key-findings','Findings'),('#full-policy-implications','Policy implications'),('#methods','Methods & sources')],'full'))
    # No runtime fetch: this data file also works from file:// with plain scripts.
    config={**ASSESSMENTS,'interventions':TOOLS,'glossary':dict(terms),'date':PUB['date']}
    (ROOT/'data/site.js').write_text('// Generated by tools/build_site.py. Edit content.md or the build inputs.\nwindow.PACING_SITE = '+json.dumps(config,ensure_ascii=False,indent=2)+';\n')
    print('Built index, five tool pages, full note and local data.')


if __name__=='__main__':main()
