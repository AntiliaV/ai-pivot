// Pacing explorer: draws the main page (index.html) and the tool pages (tool.html#<id>).
// Data comes from data/*.js, the package-builder rules from js/builder.js.
// No network calls, no storage, no tracking.

(function () {
  "use strict";

  var DATA = window.PACING_DATA;
  var GLOSSARY = window.PACING_GLOSSARY;
  var METHOD = window.PACING_METHOD;
  var B = window.PacingBuilder;

  var view = document.getElementById("view");
  var tooltip = document.getElementById("tooltip");
  var page = document.body.getAttribute("data-page");

  if (!DATA || !GLOSSARY || !METHOD || !B) {
    view.textContent = "The page could not load its data files. Check that the data and js folders sit next to this page.";
    return;
  }

  var L = METHOD.labels;
  var T = METHOD.sectionTitles;
  var interventions = DATA.interventions;
  var byId = {};
  interventions.forEach(function (iv) { byId[iv.id] = iv; });

  // Colours come from data/method.js so there is one place to change them.
  Object.keys(METHOD.colours).forEach(function (k) {
    document.documentElement.style.setProperty("--c-" + k, METHOD.colours[k]);
  });

  // ---------- small DOM helpers ----------

  function append(node, children) {
    if (children === null || children === undefined || children === false) { return; }
    if (Array.isArray(children)) { children.forEach(function (c) { append(node, c); }); return; }
    if (typeof children === "string" || typeof children === "number") {
      node.appendChild(document.createTextNode(String(children)));
      return;
    }
    node.appendChild(children);
  }

  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === false || v === null || v === undefined) { return; }
        if (k === "class") { node.className = v; }
        else if (k.slice(0, 2) === "on") { node.addEventListener(k.slice(2), v); }
        else { node.setAttribute(k, v === true ? "" : v); }
      });
    }
    append(node, children);
    return node;
  }

  function criterion(id) {
    return METHOD.criteria.filter(function (c) { return c.id === id; })[0];
  }

  function toolHref(id) { return "tool.html#" + id; }

  // ---------- rich text: **bold**, *italic*, [links](https://...), glossary terms ----------

  var termIndex = {};
  var termPatterns = [];
  GLOSSARY.forEach(function (entry, i) {
    entry.match.forEach(function (m) { termIndex[m.toLowerCase()] = i; termPatterns.push(m); });
  });
  termPatterns.sort(function (a, b) { return b.length - a.length; });
  var termRegex = new RegExp(
    "(^|[^A-Za-z0-9-])(" +
    termPatterns.map(function (p) { return p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") +
    ")(?![A-Za-z0-9-])", "gi");

  // A context remembers which glossary terms have been underlined already on this page.
  function newCtx(from) {
    var seen = {};
    if (from) { Object.keys(from.seen).forEach(function (k) { seen[k] = true; }); }
    return { seen: seen };
  }

  function linkTerms(piece, ctx, frag) {
    if (!ctx) { frag.appendChild(document.createTextNode(piece)); return; }
    var last = 0;
    var m;
    termRegex.lastIndex = 0;
    while ((m = termRegex.exec(piece)) !== null) {
      var idx = termIndex[m[2].toLowerCase()];
      if (idx === undefined || ctx.seen[idx]) { continue; }
      ctx.seen[idx] = true;
      var start = m.index + m[1].length;
      frag.appendChild(document.createTextNode(piece.slice(last, start)));
      frag.appendChild(h("button", { type: "button", class: "term", "data-term": idx, "aria-expanded": "false" }, m[2]));
      last = start + m[2].length;
    }
    frag.appendChild(document.createTextNode(piece.slice(last)));
  }

  // **bold** and *italic*, with glossary terms underlined.
  function emphasis(str, ctx) {
    var frag = document.createDocumentFragment();
    String(str).split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).forEach(function (part) {
      if (!part) { return; }
      var m = /^\*\*([^*]+)\*\*$/.exec(part);
      if (m) { var strong = h("strong"); linkTerms(m[1], ctx, strong); frag.appendChild(strong); return; }
      m = /^\*([^*]+)\*$/.exec(part);
      if (m) { var em = h("em"); linkTerms(m[1], ctx, em); frag.appendChild(em); return; }
      linkTerms(part, ctx, frag);
    });
    return frag;
  }

  // Links open in a new tab and load nothing until they are clicked. Only http(s) addresses become links.
  // Glossary terms are not underlined inside link text.
  // ctx null = no glossary tooltips (used inside tables of figures and in the sources).
  function rich(str, ctx) {
    var frag = document.createDocumentFragment();
    var text = String(str);
    var re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    var last = 0;
    var m;
    while ((m = re.exec(text)) !== null) {
      frag.appendChild(emphasis(text.slice(last, m.index), ctx));
      if (/^https?:\/\//i.test(m[2])) {
        frag.appendChild(h("a", { href: m[2], target: "_blank", rel: "noopener noreferrer" }, emphasis(m[1], null)));
      } else {
        frag.appendChild(emphasis(m[0], ctx));
      }
      last = m.index + m[0].length;
    }
    frag.appendChild(emphasis(text.slice(last), ctx));
    return frag;
  }

  function para(str, ctx) { return h("p", null, rich(str, ctx)); }

  // Paragraphs and lists: [{type: "p", text}, {type: "ul" | "ol", items: [...]}].
  function richBlocks(blocks, ctx) {
    return blocks.map(function (b) {
      if (b.type === "p") { return para(b.text, ctx); }
      return h(b.type, { class: "bullets" }, b.items.map(function (it) { return h("li", null, rich(it, ctx)); }));
    });
  }

  function table(header, rows, cls, firstColHeader, label) {
    return h("div", { class: "table-scroll", tabindex: "0", role: "region", "aria-label": label }, h("table", { class: "data-table " + cls }, [
      h("thead", null, h("tr", null, header.map(function (c) { return h("th", { scope: "col" }, c); }))),
      h("tbody", null, rows.map(function (r) {
        return h("tr", null, r.map(function (c, i) {
          return i === 0 && firstColHeader ? h("th", { scope: "row", "data-label": header[i] }, c) : h("td", { "data-label": header[i] }, c);
        }));
      }))
    ]));
  }

  // ---------- one shared tooltip (glossary terms) ----------

  var tipAnchor = null;
  var tipPinned = false;
  var tipCloseTimer = null;

  function showTip(anchor, content, pinned) {
    hideTip();
    tooltip.textContent = "";
    append(tooltip, content);
    tooltip.hidden = false;
    tipAnchor = anchor;
    tipPinned = !!pinned;
    anchor.setAttribute("aria-describedby", "tooltip");
    anchor.setAttribute("aria-expanded", "true");
    var r = anchor.getBoundingClientRect();
    var tw = tooltip.offsetWidth;
    var th = tooltip.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), window.innerWidth - tw - 8);
    var top = r.bottom + 8;
    if (top + th > window.innerHeight - 8 && r.top - th - 8 > 0) { top = r.top - th - 8; }
    tooltip.style.left = Math.max(8, left) + "px";
    tooltip.style.top = top + "px";
  }

  function hideTip() {
    window.clearTimeout(tipCloseTimer);
    if (tipAnchor) {
      tipAnchor.removeAttribute("aria-describedby");
      tipAnchor.setAttribute("aria-expanded", "false");
    }
    tipAnchor = null;
    tipPinned = false;
    tooltip.hidden = true;
  }

  function termTip(button, pinned) {
    var entry = GLOSSARY[Number(button.getAttribute("data-term"))];
    if (!entry) { return; }
    showTip(button, [h("strong", null, entry.term), h("span", { class: "def" }, entry.definition)], pinned);
  }

  function closestTerm(target) {
    return target && target.closest ? target.closest("button.term") : null;
  }

  function deferTipClose() {
    window.clearTimeout(tipCloseTimer);
    tipCloseTimer = window.setTimeout(function () {
      if (!tipPinned && document.activeElement !== tipAnchor) { hideTip(); }
    }, 180);
  }
  tooltip.addEventListener("mouseenter", function () { window.clearTimeout(tipCloseTimer); });
  tooltip.addEventListener("mouseleave", deferTipClose);
  document.addEventListener("mouseover", function (e) {
    var t = closestTerm(e.target);
    if (t) {
      window.clearTimeout(tipCloseTimer);
      if (!tipPinned && t !== tipAnchor) { termTip(t, false); }
    }
  });
  document.addEventListener("mouseout", function (e) {
    var t = closestTerm(e.target);
    if (t && !t.contains(e.relatedTarget) && !tooltip.contains(e.relatedTarget)) { deferTipClose(); }
  });
  document.addEventListener("focusin", function (e) {
    var t = closestTerm(e.target);
    if (t && !tipPinned) { termTip(t, false); }
  });
  document.addEventListener("focusout", function (e) {
    if (closestTerm(e.target)) { hideTip(); }
  });
  document.addEventListener("click", function (e) {
    var t = closestTerm(e.target);
    if (t) {
      if (tipPinned && tipAnchor === t) { hideTip(); } else { termTip(t, true); }
    } else if (tipPinned && !tooltip.contains(e.target)) {
      hideTip();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { hideTip(); }
  });
  window.addEventListener("scroll", function () { if (!tooltip.hidden) { hideTip(); } }, { passive: true });

  // ---------- stance badges, ranking badges ----------

  function stanceBadges(stances) {
    return h("span", { class: "badges" }, stances.map(function (s) { return h("span", { class: "badge-stance stance-" + s }, METHOD.stances[s]); }));
  }

  function rankBadge(value) {
    var kind = { Core: "core", Partial: "partial", Option: "option" }[value] || "none";
    return h("span", { class: "rank rank-" + kind }, value);
  }

  // ---------- score meters ----------

  function dots(c, score) {
    var box = h("span", { class: "dots dots-" + c.kind, "aria-hidden": "true" });
    for (var i = 1; i <= 5; i++) { box.appendChild(h("span", { class: "pip" + (i <= score ? " on" : "") })); }
    return box;
  }

  // One row: label, five marks, word. Activate with a click, Enter, or Space to read the justification.
  function meterRow(c, scoreObj, id) {
    var score = scoreObj.score;
    var pinned = false;
    var note = h("p", { class: "justification", id: id, hidden: true }, rich(scoreObj.justification, null));
    var row = h("button", { type: "button", class: "meter-row", "aria-expanded": "false", "aria-controls": id }, [
      h("span", { class: "meter-label" }, c.label),
      h("span", { class: "meter-reading" }, [
        dots(c, score),
        h("span", { class: "meter-word" }, B.wordFor(c, score, METHOD))
      ]),
      h("span", { class: "visually-hidden" }, " (" + score + " out of 5)"),
      h("span", { class: "chev", "aria-hidden": "true" })
    ]);
    function show(open) {
      note.hidden = !open;
      row.setAttribute("aria-expanded", open ? "true" : "false");
    }
    row.addEventListener("click", function () {
      pinned = !pinned;
      show(pinned);
    });
    return h("li", { class: "meter-item" }, [row, note]);
  }

  // =====================================================================
  // THE MAIN PAGE
  // =====================================================================

  var homeOrder = ["introduction", "proposals", "ranking", "tools", "builder", "appendix"];
  var homeLabels = { introduction: L.introduction, proposals: T.proposals, ranking: T.ranking,
    tools: T.tools, builder: T.builder, appendix: T.appendix };

  function sectionHead(id, title) {
    var index = homeOrder.indexOf(id);
    return h("div", { class: "section-heading" }, [
      h("span", { class: "section-index", "aria-hidden": "true" }, "0" + index),
      h("h2", { id: id + "-title" }, title)
    ]);
  }

  function contents(entries, extra) {
    return h("nav", { class: "toc", "aria-label": "On this page" }, [
      h("p", { class: "toc-heading" }, "On this page"),
      h("button", { type: "button", class: "toc-toggle", "aria-expanded": "false", "aria-controls": "contents-list" }, [
        h("span", { class: "toc-mobile-prefix" }, "Contents"),
        h("span", { class: "toc-current" }, "On this page"),
        h("span", { class: "menu-icon", "aria-hidden": "true" })
      ]),
      h("ol", { id: "contents-list" }, entries.map(function (entry, i) {
        return h("li", null, h("a", { href: entry.href || "#" + entry.id, "data-section": entry.id }, [
          h("span", { class: "toc-number", "aria-hidden": "true" }, "0" + (i + 1)),
          h("span", null, entry.label)
        ]));
      })),
      extra || null,
      h("a", { class: "back-top", href: "#", "data-top": true }, "Back to top ↑")
    ]);
  }

  function renderMasthead() {
    document.body.insertBefore(h("header", { class: "masthead" },
      h("div", { class: "masthead-inner" }, [
        h("a", { class: "brand", href: "index.html", "aria-label": "Pacing explorer home" }, [
          h("span", { class: "brand-mark", "aria-hidden": "true" }), "Pacing explorer"
        ]),
        h("nav", { "aria-label": "Main navigation" }, [
          h("a", { href: "index.html#tools" }, "Explore the tools"),
          h("a", { href: "index.html#builder" }, "Package explorer"),
          h("a", { href: "index.html#appendix" }, T.appendix)
        ])
      ])
    ), document.getElementById("main"));
  }

  function renderProposals(ctx) {
    var list = h("ul", { class: "proposal-list" }, DATA.proposals.items.map(function (blocks, i) {
      var match = /^\[\*\*([^*]+)\*\*\]/.exec(blocks[0].text);
      return h("li", null, h("details", { class: "proposal" }, [
        h("summary", null, [
          h("span", { class: "proposal-number", "aria-hidden": "true" }, "0" + (i + 1)),
          h("span", null, match ? match[1] : "Proposal " + (i + 1)),
          h("span", { class: "disclosure-icon", "aria-hidden": "true" })
        ]),
        h("div", { class: "proposal-body" }, richBlocks(blocks, ctx))
      ]));
    }));
    var expand = h("button", { type: "button", class: "text-button", onclick: function () {
      var open = expand.getAttribute("aria-expanded") !== "true";
      Array.prototype.forEach.call(list.querySelectorAll("details"), function (d) { d.open = open; });
      expand.setAttribute("aria-expanded", String(open));
      expand.textContent = open ? "Collapse all" : "Expand all";
    }, "aria-expanded": "false" }, "Expand all");
    list.addEventListener("toggle", function () {
      var allOpen = Array.prototype.every.call(list.querySelectorAll("details"), function (d) { return d.open; });
      expand.setAttribute("aria-expanded", String(allOpen));
      expand.textContent = allOpen ? "Collapse all" : "Expand all";
    }, true);
    return h("section", { id: "proposals", "aria-labelledby": "proposals-title" }, [
      sectionHead("proposals", T.proposals), para(DATA.proposals.intro, ctx),
      h("div", { class: "section-actions" }, expand), list
    ]);
  }

  function renderRanking(ctx) {
    var rk = DATA.ranking;
    var s = h("section", { id: "ranking", "aria-labelledby": "ranking-title" }, [sectionHead("ranking", T.ranking)]);
    s.appendChild(para(rk.intro, ctx));
    var idByName = {};
    interventions.forEach(function (iv) { idByName[iv.name] = iv.id; });
    s.appendChild(table(rk.header, rk.rows.map(function (row) {
      return row.map(function (cell, i) {
        if (i === 1) { return idByName[cell] ? h("a", { href: toolHref(idByName[cell]) }, cell) : cell; }
        if (i >= 2) { return rankBadge(cell); }
        return cell;
      });
    }), "ranking-table", false, T.ranking));
    // Legend: "**Core:** central or required. **Partial:** ..." becomes badge + meaning pairs.
    var legend = h("ul", { class: "rank-legend" });
    var re = /\*\*([^*]+?):\*\*\s*([^*]+)/g;
    var m;
    while ((m = re.exec(rk.legend)) !== null) {
      legend.appendChild(h("li", null, [rankBadge(m[1]), " ", m[2].trim()]));
    }
    s.appendChild(legend);
    return s;
  }

  function renderCards(ctx) {
    var s = h("section", { id: "tools", "aria-labelledby": "tools-title" }, [sectionHead("tools", T.tools)]);
    s.appendChild(para(DATA.toolsIntro, ctx));
    s.appendChild(h("ul", { class: "cards" }, interventions.map(function (iv) {
      return h("li", { class: "card" }, [
        h("span", { class: "card-number", "aria-hidden": "true" }, "0" + (interventions.indexOf(iv) + 1)),
        h("h3", null, iv.name),
        h("p", { class: "card-text" }, iv.description),
        h("a", { class: "card-link", href: toolHref(iv.id), "aria-label": "Learn more: " + iv.name }, L.learnMore)
      ]);
    })));
    return s;
  }

  function renderAppendix(ctx) {
    var how = METHOD.howWeScore;
    var s = h("section", { id: "appendix", "aria-labelledby": "appendix-title" }, [sectionHead("appendix", T.appendix)]);
    s.appendChild(h("details", { class: "reference", id: "how-we-score" }, [
      h("summary", null, [T.howWeScore, h("span", { class: "disclosure-icon", "aria-hidden": "true" })]),
      h("div", { class: "reference-body" }, [
        para(how.intro, ctx), table(how.table.header, how.table.rows, "score-key", true, T.howWeScore),
        para(how.expected, ctx), para(how.closing, ctx)
      ])
    ]));
    var sorted = GLOSSARY.slice().sort(function (a, b) { return a.term.toLowerCase() < b.term.toLowerCase() ? -1 : 1; });
    var entries = sorted.map(function (entry) {
      return h("div", { class: "glossary-entry" }, [h("dt", null, entry.term), h("dd", null, entry.definition)]);
    });
    var count = h("p", { class: "field-hint glossary-count", role: "status" }, sorted.length + " terms");
    var empty = h("p", { class: "empty-search", hidden: true }, "No matching terms. Try another search.");
    var search = h("input", { type: "search", class: "glossary-search", placeholder: "Search terms and definitions", "aria-label": "Search glossary" });
    search.addEventListener("input", function () {
      var query = search.value.toLowerCase().trim();
      var total = 0;
      entries.forEach(function (entry) {
        entry.hidden = entry.textContent.toLowerCase().indexOf(query) === -1;
        if (!entry.hidden) { total++; }
      });
      count.textContent = query ? total + " of " + sorted.length + " terms" : sorted.length + " terms";
      empty.hidden = total !== 0;
    });
    s.appendChild(h("details", { class: "reference", id: "glossary" }, [
      h("summary", null, [T.glossary, h("span", { class: "disclosure-icon", "aria-hidden": "true" })]),
      h("div", { class: "reference-body" }, [search, count, empty, h("dl", { class: "glossary" }, entries)])
    ]));
    return s;
  }

  function renderHome() {
    var ctx = newCtx();
    document.title = DATA.siteTitle;
    view.appendChild(h("header", { class: "site-head", id: "introduction" }, [
      h("p", { class: "eyebrow" }, "Pacing explorer"),
      h("h1", { tabindex: "-1" }, DATA.siteTitle),
      h("div", { class: "hero-actions" }, [
        h("a", { class: "button-primary", href: "#tools" }, "Explore the tools ↓"),
        h("a", { class: "button-secondary", href: "#builder" }, "Build a package →")
      ])
    ]));
    view.appendChild(h("div", { class: "intro" }, DATA.introduction.map(function (p) { return para(p, ctx); })));
    view.appendChild(contents(homeOrder.map(function (id) { return { id: id, label: homeLabels[id] }; })));
    view.appendChild(renderProposals(ctx));
    view.appendChild(renderRanking(ctx));
    view.appendChild(renderCards(ctx));
    view.appendChild(renderBuilder(ctx));
    view.appendChild(renderAppendix(ctx));
    if (location.hash) { window.requestAnimationFrame(function () { scrollToSection(location.hash.slice(1)); }); }
  }

  // =====================================================================
  // A TOOL PAGE
  // =====================================================================

  function renderTool() {
    var id = location.hash.replace(/^#/, "").split("/")[0];
    var index = 0;
    interventions.forEach(function (iv, i) { if (iv.id === id) { index = i; } });
    var iv = interventions[index];
    var ctx = newCtx();
    document.title = iv.name;
    view.textContent = "";

    var benefits = METHOD.criteria.filter(function (c) { return c.kind === "benefit"; });
    var costs = METHOD.criteria.filter(function (c) { return c.kind === "cost"; });

    var crumbs = h("p", { class: "crumbs" }, h("a", { href: "index.html#tools" }, L.allTools));
    var switcher = h("select", { id: "tool-switcher", "aria-label": "Choose a verification tool", onchange: function (e) {
      location.hash = e.target.value;
    } }, interventions.map(function (item) { return h("option", { value: item.id, selected: item.id === iv.id }, item.name); }));
    view.appendChild(h("div", { class: "tool-toolbar" }, [crumbs,
      h("div", { class: "tool-switch" }, [h("label", { for: "tool-switcher" }, "Verification interventions"), switcher])
    ]));
    view.appendChild(h("header", { class: "tool-head" }, [
      h("p", { class: "eyebrow" }, "Tool " + (index + 1) + " of " + interventions.length),
      h("h1", { tabindex: "-1" }, iv.name)
    ]));
    var sections = [
      { key: "introduction", label: L.introduction }, { key: "overview", label: L.overview },
      { key: "contribution", label: "Contribution to pacing" }, { key: "failures", label: L.failures },
      { key: "burden", label: L.burden }, { key: "sources", label: L.sources }
    ];
    view.appendChild(contents(sections.map(function (item) {
      return { id: "tool-" + item.key, label: item.label, href: "#" + iv.id + "/" + item.key };
    }), h("a", { class: "toc-method", href: "index.html#how-we-score" }, T.howWeScore + " ↗")));

    // Introduction
    view.appendChild(h("section", { id: "tool-introduction", "aria-labelledby": "t-intro" }, [
      h("h2", { id: "t-intro" }, L.introduction),
      para(iv.introduction, ctx)
    ]));

    // Overview
    var behaviours = h("div", { class: "table-scroll", tabindex: "0", role: "region", "aria-label": L.behaviours },
      h("table", { class: "data-table behaviours" }, [
        h("thead", null, h("tr", null, [L.actor, L.stance, L.why].map(function (t) { return h("th", { scope: "col" }, t); }))),
        h("tbody", null, Object.keys(METHOD.actors).map(function (actor) {
          return h("tr", null, [
            h("th", { scope: "row" }, METHOD.actors[actor]),
            h("td", { "data-label": L.stance }, stanceBadges(iv.stances[actor])),
            h("td", { "data-label": L.why }, rich(iv.why[actor], ctx))
          ]);
        }))
      ]));
    view.appendChild(h("section", { id: "tool-overview", class: "overview", "aria-labelledby": "t-overview" }, [
      h("h2", { id: "t-overview" }, L.overview),
      h("div", { class: "overview-grid" }, [
        h("div", { class: "ov ov-achieves" }, [
          h("h3", null, L.achieves),
          h("ul", { class: "meters" }, benefits.map(function (c) { return meterRow(c, iv.scores[c.id], "j-" + c.id); }))
        ]),
        h("div", { class: "ov ov-costs" }, [
          h("h3", null, L.costs),
          h("ul", { class: "meters" }, costs.map(function (c) { return meterRow(c, iv.scores[c.id], "j-" + c.id); }))
        ]),
        h("div", { class: "ov ov-behaviours" }, [h("h3", null, L.behaviours), behaviours])
      ])
    ]));

    // Under ideal conditions
    view.appendChild(h("section", { id: "tool-contribution", "aria-labelledby": "t-ideal" }, [
      h("h2", { id: "t-ideal" }, L.contribution),
      iv.contribution.map(function (block) {
        return [
          para(block.text, ctx),
          block.items ? h("ul", { class: "bullets" }, block.items.map(function (it) { return h("li", null, rich(it, ctx)); })) : null
        ];
      })
    ]));

    // Failure scenarios
    view.appendChild(h("section", { id: "tool-failures", "aria-labelledby": "t-fail" }, [
      h("h2", { id: "t-fail" }, L.failures),
      para(iv.failures.intro, ctx),
      h("ul", { class: "bullets" }, iv.failures.items.map(function (it) {
        return h("li", null, [h("strong", null, it.lead), " ", rich(it.text, ctx)]);
      })),
      iv.failures.closing.map(function (p) { return para(p, ctx); })
    ]));

    // Regulatory burden
    view.appendChild(h("section", { id: "tool-burden", "aria-labelledby": "t-burden" }, [
      h("h2", { id: "t-burden" }, L.burden),
      para(iv.burden, ctx)
    ]));

    // Sources
    view.appendChild(h("details", { class: "sources", id: "tool-sources" }, [
      h("summary", null, [L.sources, h("span", { class: "disclosure-icon", "aria-hidden": "true" })]),
      h("ul", { class: "source-list" }, iv.sources.map(function (s) { return h("li", null, rich(s, null)); }))
    ]));

    // Previous and next tool
    var prev = interventions[(index + interventions.length - 1) % interventions.length];
    var next = interventions[(index + 1) % interventions.length];
    view.appendChild(h("nav", { class: "prevnext", "aria-label": L.allTools }, [
      h("a", { class: "prev", href: toolHref(prev.id) }, [h("span", { class: "dir" }, "← " + L.previous), h("span", { class: "name" }, prev.name)]),
      h("a", { class: "all", href: "index.html#tools" }, L.allTools),
      h("a", { class: "next", href: toolHref(next.id) }, [h("span", { class: "dir" }, L.next + " →"), h("span", { class: "name" }, next.name)])
    ]));
  }

  // =====================================================================
  // THE PACKAGE BUILDER
  // =====================================================================

  function readBuilderChoices() {
    var params = new URLSearchParams(location.search);
    return B.normaliseChoices({
      priorities: (params.get("priorities") || "").split(",").filter(Boolean),
      maxInvasiveness: params.get("limit")
    }, METHOD);
  }

  var builderState = readBuilderChoices();

  function choicesQuery() {
    var params = new URLSearchParams();
    if (builderState.priorities.length) { params.set("priorities", builderState.priorities.join(",")); }
    params.set("limit", builderState.maxInvasiveness);
    return "?" + params.toString();
  }

  function packageHref() { return "package.html" + choicesQuery(); }

  function radioGroup(legend, name, options, current, onChange) {
    return h("fieldset", { class: "field" }, [
      h("legend", null, legend),
      options.map(function (o) {
        var input = h("input", { type: "radio", name: name, value: o.value });
        input.checked = o.value === current;
        input.addEventListener("change", function () { onChange(o.value); });
        return h("label", { class: "choice" }, [input, h("span", null, o.label)]);
      })
    ]);
  }

  function layerCard(layer, result) {
    var iv = byId[layer.id];
    var roleText = layer.role === "supporting" ? "Needed as a supporting measure"
      : layer.role === "closest" ? "Closest fit"
      : (result.choices.priorities.length ? "Fits the priorities" : "Fits overall");
    return h("li", { class: "layer layer-" + layer.role }, [
      h("span", { class: "layer-role" }, roleText),
      h("a", { class: "layer-name", href: toolHref(iv.id) }, iv.name),
      layer.supportFor.length ? h("span", { class: "layer-supports" },
        "Supporting measure for: " + B.joinList(layer.supportFor.map(function (d) { return byId[d].name; }))) : null
    ]);
  }

  function workedOut(result) {
    var limit = METHOD.builder.invasivenessLimits[result.choices.maxInvasiveness];
    var threshold = METHOD.builder.threshold.toFixed(1);
    var layerById = {};
    result.layers.forEach(function (l) { layerById[l.id] = l; });

    function outcome(row) {
      var layer = layerById[row.id];
      if (!layer) { return "Left out"; }
      return layer.role === "supporting"
        ? "Included as a supporting measure for " + B.joinList(layer.supportFor.map(function (d) { return byId[d].name; }))
        : layer.role === "closest" ? "Included as the closest fit" : "Included";
    }

    var tbl = h("table", { class: "data-table sums" }, [
      h("thead", null, h("tr", null, [
        h("th", { scope: "col" }, "Criterion"),
        h("th", { scope: "col" }, "Weight"),
        result.rows.map(function (row) { return h("th", { scope: "col" }, byId[row.id].name); })
      ])),
      h("tbody", null, [
        METHOD.criteria.map(function (c, ci) {
          var picked = result.choices.priorities.indexOf(c.id) !== -1;
          return h("tr", null, [
            h("th", { scope: "row" }, [c.label, picked ? h("span", { class: "tag-picked" }, "picked") : null]),
            h("td", null, String(result.weights[c.id])),
            result.rows.map(function (row) {
              var t = row.fit.terms[ci];
              var scoreText = c.kind === "cost" ? "(6 − " + t.raw + ")" : String(t.raw);
              return h("td", null, scoreText + " × " + t.weight + " = " + t.product);
            })
          ]);
        }),
        h("tr", { class: "sum-row" }, [
          h("th", { scope: "row" }, "Fit: total ÷ sum of weights"),
          h("td", null, String(result.rows[0].fit.den)),
          result.rows.map(function (row) {
            return h("td", null, row.fit.num + " ÷ " + row.fit.den + " = " + B.formatFit(row.fit));
          })
        ]),
        h("tr", null, [
          h("th", { scope: "row" }, "Fit at least " + threshold + "?"),
          h("td", null, ""),
          result.rows.map(function (row) { return h("td", null, row.meetsThreshold ? "Yes" : "No"); })
        ]),
        h("tr", null, [
          h("th", { scope: "row" }, "Within the invasiveness limit?"),
          h("td", null, ""),
          result.rows.map(function (row) { return h("td", null, row.withinLimit ? "Yes" : "No"); })
        ]),
        h("tr", null, [
          h("th", { scope: "row" }, "Supporting measures within the invasiveness limit?"),
          h("td", null, ""),
          result.rows.map(function (row) {
            if (!row.supportChain.length) { return h("td", null, "None needed"); }
            return h("td", null, row.blockedBy.length
              ? "No: " + B.joinList(row.blockedBy.map(function (d) { return byId[d].name; }))
              : "Yes");
          })
        ]),
        h("tr", { class: "sum-row" }, [
          h("th", { scope: "row" }, "Outcome"),
          h("td", null, ""),
          result.rows.map(function (row) { return h("td", null, outcome(row)); })
        ])
      ])
    ]);

    return h("details", { class: "worked", id: "package-method" }, [
      h("summary", null, "How this was worked out"),
      h("div", { class: "worked-body" }, [
        h("ol", { class: "plain-list" }, [
          h("li", null, "Every criterion counts " + METHOD.builder.baseWeight + ". Each criterion picked as a priority counts " + METHOD.builder.pickedWeight + "."),
          h("li", null, "Scores run from 1 to 5. For the two cost criteria (burden on government, invasiveness for AI labs), the score is turned round as 6 minus the score, so that a higher number is always better."),
          h("li", null, "Fit is the sum of score × weight, divided by the sum of the weights. It stays on the 1 to 5 scale."),
          h("li", null, "The invasiveness limit (" +
            (limit >= 5 ? "no limit was set" : "scores up to " + limit + " out of 5 were allowed") +
            ") applies to each tool together with every supporting measure it requires, directly or through another supporting measure. If any of them is above the limit, the tool is left out, and the explanation names the supporting measure that caused this."),
          h("li", null, "A tool that passes this check is included if its fit is at least " + threshold + "."),
          h("li", null, "If no tool qualifies, the single best tool that passes the check is shown, with a note that it falls short. If no tool passes the check, there is no package."),
          h("li", null, "The supporting measures of each included tool are added, even if they did not qualify on fit by themselves. Supporting measures are never added above the invasiveness limit.")
        ]),
        h("div", { class: "table-scroll", tabindex: "0", role: "region", "aria-label": "Fit arithmetic" }, tbl)
      ])
    ]);
  }

  function renderOutput(box, formCtx, status, hideHeading) {
    var ctx = newCtx(formCtx);
    var result = B.buildPackage(DATA, METHOD, builderState);
    var text = B.explain(result, DATA, METHOD);
    var chain = B.describeChain(result, DATA);
    box.textContent = "";
    box.classList.toggle("is-empty", result.noneWithinLimit);
    if (!hideHeading) { box.appendChild(h("h3", null, "Suggested package")); }

    if (result.noneWithinLimit) {
      box.appendChild(h("p", { class: "why" }, text.priorities + " " + text.why.join(" ")));
      status.textContent = "No tool, together with its supporting measures, is within the invasiveness limit.";
      box.appendChild(workedOut(result));
      return;
    }

    // The one-line chain.
    var chainNode = h("p", { class: "chain" });
    chain.forEach(function (c, i) {
      if (i > 0) { chainNode.appendChild(h("span", { class: "chain-arrow", "aria-hidden": "true" }, "→")); chainNode.appendChild(h("span", { class: "visually-hidden" }, ", then ")); }
      chainNode.appendChild(h("span", { class: "chain-item" }, [h("span", { class: "chain-label" }, c.label + ": "), c.name]));
    });
    box.appendChild(chainNode);

    // The tools in the package, supporting measures first.
    box.appendChild(h("ol", { class: "layers" }, result.layers.map(function (l) { return layerCard(l, result); })));

    // Why this package, and what it gives up.
    box.appendChild(h(page === "package" ? "h2" : "h4", { id: "why-package" }, "Why this package"));
    box.appendChild(h("p", { class: "why" }, rich(text.priorities + " " + text.why.join(" "), ctx)));
    box.appendChild(h("p", { class: "why" }, rich(text.givesUp, ctx)));
    if (text.notes.length) {
      box.appendChild(h("ul", { class: "notes" }, text.notes.map(function (n) {
        var conflict = result.excluded.some(function (ex) {
          return ex.reason === "supportingMeasure" && n.indexOf(byId[ex.id].name + " is left out:") === 0;
        });
        return h("li", { class: conflict ? "note-conflict" : null }, rich(n, ctx));
      })));
    }

    // Steps, if the data has any.
    result.layers.forEach(function (layer) {
      if (!layer.steps.first.length) { return; }
      box.appendChild(h("section", { class: "steps-block" }, [
        h(page === "package" ? "h3" : "h5", null, [h("a", { href: toolHref(layer.id) }, byId[layer.id].name)]),
        h("p", { class: "field-hint" }, "First steps"),
        h("ol", { class: "plain-list" }, layer.steps.first.map(function (item) { return h("li", null, rich(item, ctx)); }))
      ]));
    });

    if (result.rivalNotes.length) {
      box.appendChild(h(page === "package" ? "h2" : "h4", { id: "expected-response" }, "What to expect from the other side"));
      box.appendChild(h("p", null, "How a trailing state is expected to respond to each tool:"));
      box.appendChild(h("ul", { class: "notes" }, result.rivalNotes.map(function (n) {
        return h("li", null, [
          h("strong", null, byId[n.id].name + ": "),
          stanceBadges(n.stances), " ",
          rich(n.note, ctx)
        ]);
      })));
    }

    box.appendChild(workedOut(result));
    status.textContent = "Package updated: " + chain.map(function (c) { return c.name; }).join(", ") + ".";
  }

  function renderBuilder(pageCtx) {
    var s = h("section", { id: "builder", "aria-labelledby": "builder-title" }, [sectionHead("builder", T.builder)]);
    var bt = DATA.builder;
    s.appendChild(h("div", { class: "builder-text" }, [
      bt.intro.map(function (p) { return para(p, pageCtx); }),
      h("details", { class: "supporting-details" }, [
        h("summary", null, ["Supporting measures", h("span", { class: "disclosure-icon", "aria-hidden": "true" })]),
        h("div", { class: "reference-body" }, [
          para(bt.supportingLead, pageCtx),
          h("ul", { class: "bullets" }, bt.supporting.map(function (it) { return h("li", null, rich(it, pageCtx)); })),
          bt.closing.map(function (p) { return para(p, pageCtx); })
        ])
      ])
    ]));

    var resultsLink = h("a", {
      class: "view-results", href: packageHref(), target: "_blank", rel: "noopener",
      "aria-label": "View suggested package (opens in a new tab)"
    }, ["View suggested package", h("span", { "aria-hidden": "true" }, " ↗")]);
    var pickStatus = h("p", { class: "field-hint pick-status", id: "pick-status", role: "status" });
    function refresh() { resultsLink.href = packageHref(); }

    var max = METHOD.builder.maxPicks;
    function pickText() { return builderState.priorities.length + " of " + max + " picked."; }
    pickStatus.textContent = pickText();

    var order = METHOD.builder.priorityOrder || METHOD.criteria.map(function (c) { return c.id; });
    var priorityField = h("fieldset", { class: "field field-priorities" }, [
      h("legend", null, "What matters most?"),
      h("p", { class: "field-hint" }, "Pick up to " + max + "."),
      h("div", { class: "choices" }, order.map(function (id) {
        var c = criterion(id);
        var input = h("input", { type: "checkbox", name: "priority", value: id, "aria-describedby": "pick-status" });
        input.checked = builderState.priorities.indexOf(id) !== -1;
        input.addEventListener("change", function () {
          if (input.checked) {
            if (builderState.priorities.length >= max) {
              input.checked = false;
              pickStatus.textContent = "Up to " + max + " can be picked. Untick one to pick another.";
              return;
            }
            builderState.priorities.push(id);
          } else {
            builderState.priorities = builderState.priorities.filter(function (p) { return p !== id; });
          }
          pickStatus.textContent = pickText();
          refresh();
        });
        return h("label", { class: "choice" }, [input, h("span", null, c.priorityLabel)]);
      })),
      pickStatus
    ]);

    var form = h("form", { class: "builder-form", "aria-label": "Choices", onsubmit: function (e) { e.preventDefault(); } }, [
      priorityField,
      radioGroup("Maximum acceptable invasiveness for AI labs", "limit",
        [{ value: "any", label: "Any" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" }],
        builderState.maxInvasiveness, function (v) { builderState.maxInvasiveness = v; refresh(); }),
      h("button", { type: "button", class: "btn", onclick: function () {
        builderState = { priorities: [], maxInvasiveness: "any" };
        Array.prototype.forEach.call(form.querySelectorAll("input"), function (input) {
          input.checked = input.name === "limit" && input.value === "any";
        });
        pickStatus.textContent = pickText();
        refresh();
      } }, "Reset choices")
    ]);

    form.appendChild(resultsLink);
    s.appendChild(form);
    refresh();
    return s;
  }

  function renderPackage() {
    var ctx = newCtx();
    var editHref = "index.html" + choicesQuery() + "#builder";
    document.title = "Suggested package | " + DATA.siteTitle;
    view.textContent = "";
    view.appendChild(h("p", { class: "package-toolbar crumbs" }, h("a", { href: editHref }, "← Back to package explorer")));
    view.appendChild(h("header", { class: "package-head" }, [
      h("p", { class: "eyebrow" }, "Package explorer"),
      h("h1", { tabindex: "-1" }, "Suggested package")
    ]));
    var limitLabels = { any: "Any", medium: "Medium", low: "Low" };
    view.appendChild(h("dl", { class: "package-choices" }, [
      h("div", null, [h("dt", null, "What matters most?"),
        h("dd", null, builderState.priorities.length
          ? builderState.priorities.map(function (id) { return criterion(id).priorityLabel; }).join(", ")
          : "All criteria equally")]),
      h("div", null, [h("dt", null, "Maximum acceptable invasiveness for AI labs"),
        h("dd", null, limitLabels[builderState.maxInvasiveness])])
    ]));
    var output = h("article", { class: "builder-output package-output", id: "package-report", "aria-label": "Suggested package" });
    var status = h("p", { class: "visually-hidden", role: "status" });
    renderOutput(output, ctx, status, true);
    view.appendChild(status);
    view.appendChild(output);
    var sections = [
      { id: "package-report", label: "Suggested package" },
      { id: "why-package", label: "Why this package" },
      { id: "expected-response", label: "What to expect from the other side" },
      { id: "package-method", label: "How this was worked out" }
    ].filter(function (entry) { return document.getElementById(entry.id); });
    view.appendChild(contents(sections, h("a", { class: "toc-method", href: editHref }, "Edit choices →")));
    if (location.hash) { window.requestAnimationFrame(function () { scrollToSection(location.hash.slice(1)); }); }
  }

  // ---------- presentation: compact contents, reading position and scroll cues ----------

  var contentsCleanup = function () {};

  function scrollToSection(id, focus) {
    var section = document.getElementById(id);
    if (!section) { return; }
    var parent = section.parentElement;
    while (parent) { if (parent.tagName === "DETAILS") { parent.open = true; } parent = parent.parentElement; }
    if (section.tagName === "DETAILS") { section.open = true; }
    section.scrollIntoView({ block: "start" });
    if (focus) { section.setAttribute("tabindex", "-1"); section.focus({ preventScroll: true }); }
  }

  function setupContents() {
    contentsCleanup();
    var nav = document.querySelector(".toc");
    if (!nav) { return; }
    var toggle = nav.querySelector(".toc-toggle");
    var links = Array.prototype.slice.call(nav.querySelectorAll("a[data-section]"));
    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
    });
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
        scrollToSection(link.getAttribute("data-section"), true);
      });
    });
    nav.querySelector("[data-top]").addEventListener("click", function (e) {
      e.preventDefault(); closeMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
      var heading = view.querySelector("h1");
      if (heading) { heading.focus({ preventScroll: true }); }
    });
    function outsideClick(e) { if (!nav.contains(e.target)) { closeMenu(); } }
    document.addEventListener("click", outsideClick);
    var queued = false;
    function markCurrent() {
      queued = false;
      var current = links[0];
      links.forEach(function (link) {
        var section = document.getElementById(link.getAttribute("data-section"));
        if (section && section.getBoundingClientRect().top <= Math.min(200, window.innerHeight * .3)) { current = link; }
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) { current = links[links.length - 1]; }
      links.forEach(function (link) {
        if (link === current) { link.setAttribute("aria-current", "location"); }
        else { link.removeAttribute("aria-current"); }
      });
      nav.querySelector(".toc-current").textContent = current.lastChild.textContent;
    }
    function queueCurrent() { if (!queued) { queued = true; window.requestAnimationFrame(markCurrent); } }
    window.addEventListener("scroll", queueCurrent, { passive: true });
    window.addEventListener("resize", queueCurrent);
    contentsCleanup = function () {
      document.removeEventListener("click", outsideClick);
      window.removeEventListener("scroll", queueCurrent);
      window.removeEventListener("resize", queueCurrent);
    };
    markCurrent();
  }

  function refreshScrollCues() {
    Array.prototype.forEach.call(document.querySelectorAll(".table-scroll"), function (region) {
      var overflow = region.scrollWidth > region.clientWidth + 1;
      region.classList.toggle("is-scrollable", overflow);
      region.tabIndex = overflow ? 0 : -1;
    });
  }
  window.addEventListener("resize", refreshScrollCues);
  if (window.ResizeObserver) {
    var tableResize = new ResizeObserver(refreshScrollCues);
    tableResize.observe(view);
  }
  // Builder results and tool pages are replaced in place; update their scroll regions too.
  var presentationObserver = new MutationObserver(function (records) {
    if (records.some(function (record) { return record.type === "childList"; })) { refreshScrollCues(); }
  });
  presentationObserver.observe(view, { childList: true, subtree: true });

  // =====================================================================
  // Start-up
  // =====================================================================

  renderMasthead();
  if (page === "tool") {
    renderTool();
    var currentTool = location.hash.split("/")[0];
    function handleToolRoute() {
      var tool = location.hash.split("/")[0];
      if (tool !== currentTool) {
        hideTip(); renderTool(); setupContents(); currentTool = tool;
        window.scrollTo(0, 0);
        var heading = view.querySelector("h1");
        if (heading) { heading.focus({ preventScroll: true }); }
      }
      var section = location.hash.split("/")[1];
      if (section) { scrollToSection("tool-" + section, true); }
    }
    window.addEventListener("hashchange", handleToolRoute);
    window.requestAnimationFrame(handleToolRoute);
  } else {
    if (page === "package") { renderPackage(); }
    else { renderHome(); }
    window.addEventListener("hashchange", function () { scrollToSection(location.hash.slice(1)); });
  }

  setupContents();
  refreshScrollCues();

  document.querySelector(".skip-link").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("main").focus();
  });

  // Printing: open every closed <details> for the print, then put them back as they were.
  var reopened = [];
  var filteredForPrint = [];
  window.addEventListener("beforeprint", function () {
    reopened = Array.prototype.filter.call(document.querySelectorAll("details"), function (d) { return !d.open; });
    reopened.forEach(function (d) { d.open = true; });
    filteredForPrint = Array.prototype.slice.call(document.querySelectorAll(".glossary-entry[hidden]"));
    filteredForPrint.forEach(function (entry) { entry.hidden = false; });
    Array.prototype.forEach.call(document.querySelectorAll(".justification"), function (n) { n.hidden = false; });
  });
  window.addEventListener("afterprint", function () {
    reopened.forEach(function (d) { d.open = false; });
    reopened = [];
    filteredForPrint.forEach(function (entry) { entry.hidden = true; });
    filteredForPrint = [];
    Array.prototype.forEach.call(document.querySelectorAll(".meter-row"), function (r) {
      var n = document.getElementById(r.getAttribute("aria-controls"));
      if (n) { n.hidden = r.getAttribute("aria-expanded") !== "true"; }
    });
  });
})();
