// Pacing explorer: the page itself (views, navigation, glossary tooltips).
// Data comes from data/*.js, the builder rules from js/builder.js, the map from js/chart.js.
// No network calls, no storage, no tracking.

(function () {
  "use strict";

  // ------------------------------------------------------------------
  // DISPLAY SETTING
  // false: scores appear as 5-dot meters with a word (Low, Medium, High...).
  // true:  the number ("3/5") is also shown next to each meter and on the map.
  var SHOW_NUMERIC_SCORES = false;
  // ------------------------------------------------------------------

  var DATA = window.PACING_DATA;
  var GLOSSARY = window.PACING_GLOSSARY;
  var METHOD = window.PACING_METHOD;
  var B = window.PacingBuilder;
  var Chart = window.PacingChart;

  var view = document.getElementById("view");
  var tooltip = document.getElementById("tooltip");

  if (!DATA || !GLOSSARY || !METHOD || !B || !Chart) {
    view.textContent = "The page could not load its data files. Check that the data and js folders sit next to index.html.";
    return;
  }

  var interventions = DATA.interventions;
  var byId = {};
  interventions.forEach(function (iv) { byId[iv.id] = iv; });

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

  function lowerFirst(s) {
    // "Chip and cloud firms" -> "chip and cloud firms", but "AI labs" stays.
    return /^[A-Z][a-z ]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  }

  function criterion(id) {
    return METHOD.criteria.filter(function (c) { return c.id === id; })[0];
  }

  function readinessLevel(id) {
    return METHOD.readiness.filter(function (r) { return r.id === id; })[0] || { id: id, label: id, column: id };
  }

  function readinessText(iv) {
    if (iv.readiness !== "now" && iv.readinessNote) { return "In development: " + iv.readinessNote; }
    return readinessLevel(iv.readiness).label;
  }

  // ---------- glossary links and the "our inference" label ----------

  var INFERENCE = "(our inference)";
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

  // Text with glossary terms linked on first use (per ctx) and the
  // "(our inference)" marker turned into a small label. ctx null = plain text.
  function rich(str, ctx) {
    var frag = document.createDocumentFragment();
    String(str).split(INFERENCE).forEach(function (piece, i) {
      if (i > 0) { frag.appendChild(h("span", { class: "inference" }, "our inference")); }
      linkTerms(piece, ctx, frag);
    });
    return frag;
  }

  function list(items, ctx, ordered) {
    return h(ordered ? "ol" : "ul", { class: "plain-list" }, items.map(function (item) { return h("li", null, rich(item, ctx)); }));
  }

  // ---------- one shared tooltip ----------

  var tipAnchor = null;
  var tipPinned = false;

  function showTip(anchor, content, pinned) {
    hideTip();
    tooltip.textContent = "";
    append(tooltip, content);
    tooltip.hidden = false;
    tipAnchor = anchor;
    tipPinned = !!pinned;
    anchor.setAttribute("aria-describedby", "tooltip");
    if (anchor.classList && anchor.classList.contains("term")) { anchor.setAttribute("aria-expanded", "true"); }
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
    if (tipAnchor) {
      tipAnchor.removeAttribute("aria-describedby");
      if (tipAnchor.classList && tipAnchor.classList.contains("term")) { tipAnchor.setAttribute("aria-expanded", "false"); }
    }
    tipAnchor = null;
    tipPinned = false;
    tooltip.hidden = true;
  }

  function termTip(button, pinned) {
    var entry = GLOSSARY[Number(button.getAttribute("data-term"))];
    if (!entry) { return; }
    showTip(button, [h("strong", null, entry.term), h("span", null, entry.definition)], pinned);
  }

  function closestTerm(target) {
    return target && target.closest ? target.closest("button.term") : null;
  }

  document.addEventListener("mouseover", function (e) {
    var t = closestTerm(e.target);
    if (t && !tipPinned) { termTip(t, false); }
  });
  document.addEventListener("mouseout", function (e) {
    if (closestTerm(e.target) && !tipPinned) { hideTip(); }
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
    } else if (tipPinned) {
      hideTip();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { hideTip(); }
  });
  window.addEventListener("scroll", function () { if (!tooltip.hidden) { hideTip(); } }, { passive: true });

  // ---------- score meters ----------

  function meter(c, scoreObj) {
    var score = scoreObj.score;
    var word = B.wordFor(c, score, METHOD);
    var dots = h("span", { class: "dots dots-" + c.kind, "aria-hidden": "true" });
    for (var i = 1; i <= 5; i++) { dots.appendChild(h("span", { class: "pip" + (i <= score ? " on" : "") })); }
    return h("span", { class: "meter" }, [
      dots,
      h("span", { class: "meter-word" }, word),
      h("span", { class: "visually-hidden" }, " (" + score + " out of 5)"),
      SHOW_NUMERIC_SCORES ? h("span", { class: "meter-num", "aria-hidden": "true" }, score + "/5") : null
    ]);
  }

  function scoreRow(c, scoreObj) {
    return h("div", { class: "score-row" }, [
      h("span", { class: "score-name" }, [
        c.plainLabel,
        c.plainLabel !== c.label ? h("span", { class: "score-tech" }, c.label) : null
      ]),
      meter(c, scoreObj)
    ]);
  }

  function readinessIcon(isNow) {
    var ns = "http://www.w3.org/2000/svg";
    var s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", "0 0 20 20");
    s.setAttribute("width", "16");
    s.setAttribute("height", "16");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("class", "readiness-icon");
    var c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", "10");
    c.setAttribute("cy", "10");
    c.setAttribute("r", "7");
    c.setAttribute("class", "dot-mark " + (isNow ? "is-now" : "is-dev"));
    s.appendChild(c);
    return s;
  }

  function readinessBadge(iv) {
    return h("span", { class: "badge" }, [readinessIcon(iv.readiness === "now"), readinessText(iv)]);
  }

  // =====================================================================
  // VIEW A: the trade-off map
  // =====================================================================

  var mapState = { today: {} };   // id -> true while the map shows today's scores
  var currentChart = null;

  function mapScores(iv) { return mapState.today[iv.id] && iv.today ? iv.today : iv.scores; }

  function renderMap() {
    var ctx = newCtx();
    var cx = criterion("invasiveness");
    var cy = criterion("verifiability");

    view.appendChild(h("h1", { class: "headline", tabindex: "-1" }, rich(DATA.headline, ctx)));

    var tableBody = h("tbody");
    function fillTable() {
      tableBody.textContent = "";
      interventions.forEach(function (iv) {
        var s = mapScores(iv);
        tableBody.appendChild(h("tr", null, [
          h("th", { scope: "row" }, iv.name + (iv.today ? (mapState.today[iv.id] ? " (today)" : " (once mature)") : "")),
          h("td", null, B.wordFor(cx, s.invasiveness.score, METHOD) + ", " + s.invasiveness.score + " out of 5"),
          h("td", null, B.wordFor(cy, s.verifiability.score, METHOD) + ", " + s.verifiability.score + " out of 5"),
          h("td", null, readinessText(iv))
        ]));
      });
    }

    // One "today / once mature" switch per tool that has a "today" score set.
    var controls = h("div", { class: "map-controls" });
    interventions.filter(function (iv) { return !!iv.today; }).forEach(function (iv) {
      function option(value, label) {
        var input = h("input", { type: "radio", name: "state-" + iv.id, value: value });
        input.checked = (value === "today") === !!mapState.today[iv.id];
        input.addEventListener("change", function () {
          mapState.today[iv.id] = value === "today";
          hideTip();
          currentChart.update();
          fillTable();
        });
        return h("label", { class: "seg-option" }, [input, h("span", null, label)]);
      }
      controls.appendChild(h("fieldset", { class: "seg" }, [
        h("legend", null, iv.name),
        option("today", "today"),
        option("mature", "once mature")
      ]));
    });
    view.appendChild(controls);

    var chartBox = h("div", { class: "chart" });
    view.appendChild(h("figure", { class: "map-figure" }, chartBox));

    currentChart = Chart.create(chartBox, {
      interventions: interventions,
      xKey: "invasiveness",
      yKey: "verifiability",
      xTitle: "Invasiveness for AI labs",
      yTitle: "Assurance",
      ySubtitle: "how reliably it catches or prevents violations",
      xWords: METHOD.words.cost,
      yWords: METHOD.words.benefit,
      quadrants: { topLeft: "Strong and light", topRight: "Strong but heavy", bottomLeft: "Weak but light", bottomRight: "Weak and heavy" },
      label: "Trade-off map. Horizontal: invasiveness for AI labs, from light to heavy. Vertical: assurance, from low to high.",
      showNumeric: SHOW_NUMERIC_SCORES,
      scoresFor: mapScores,
      otherScoresFor: function (iv) { return iv.today ? (mapState.today[iv.id] ? iv.scores : iv.today) : null; },
      stateLabel: function (iv) { return iv.today ? (mapState.today[iv.id] ? "today" : "once mature") : ""; },
      href: function (iv) { return "#tool/" + iv.id; },
      ariaLabel: function (iv) {
        var s = mapScores(iv);
        return iv.name + (iv.today ? (mapState.today[iv.id] ? ", today" : ", once mature") : "") +
          ". Invasiveness for AI labs: " + B.wordFor(cx, s.invasiveness.score, METHOD) + ", " + s.invasiveness.score + " out of 5" +
          ". Assurance: " + B.wordFor(cy, s.verifiability.score, METHOD) + ", " + s.verifiability.score + " out of 5" +
          ". " + readinessText(iv) + ". Open details.";
      },
      onEnter: function (anchor, iv) {
        var s = mapScores(iv);
        var num = function (v) { return SHOW_NUMERIC_SCORES ? " (" + v + "/5)" : ""; };
        showTip(anchor, [
          h("strong", null, iv.name + (iv.today ? (mapState.today[iv.id] ? " (today)" : " (once mature)") : "")),
          h("span", null, "Invasiveness for AI labs: " + B.wordFor(cx, s.invasiveness.score, METHOD) + num(s.invasiveness.score)),
          h("span", null, "Assurance: " + B.wordFor(cy, s.verifiability.score, METHOD) + num(s.verifiability.score)),
          h("span", null, readinessText(iv))
        ], false);
      },
      onLeave: function () { if (!tipPinned) { hideTip(); } }
    });
    currentChart.render();

    // Legend: only the readiness states that are present.
    var hasNow = interventions.some(function (iv) { return iv.readiness === "now"; });
    var hasDev = interventions.some(function (iv) { return iv.readiness !== "now"; });
    view.appendChild(h("ul", { class: "legend", "aria-label": "Dot styles" }, [
      hasNow ? h("li", null, [readinessIcon(true), "Available now"]) : null,
      hasDev ? h("li", null, [readinessIcon(false), "In development"]) : null
    ]));

    view.appendChild(h("p", { class: "hint" }, [
      "Select a dot for details. ",
      h("a", { href: "#guide" }, "How to read this")
    ]));

    // The same data as a table, for screen readers.
    fillTable();
    view.appendChild(h("div", { class: "visually-hidden" }, h("table", null, [
      h("caption", null, "Trade-off map as a table"),
      h("thead", null, h("tr", null, [
        h("th", { scope: "col" }, "Tool"),
        h("th", { scope: "col" }, "Invasiveness for AI labs"),
        h("th", { scope: "col" }, "Assurance"),
        h("th", { scope: "col" }, "Readiness")
      ])),
      tableBody
    ])));
  }

  // =====================================================================
  // VIEW D: one card per tool
  // =====================================================================

  var LIKELIHOOD_RANK = { high: 0, medium: 1, low: 2 };
  var LIKELIHOOD_LABEL = { high: "High likelihood", medium: "Medium likelihood", low: "Low likelihood" };

  function stanceLine(iv) {
    var groups = {};
    Object.keys(METHOD.actors).forEach(function (actor) {
      var stance = iv.incentives[actor].stance;
      (groups[stance] = groups[stance] || []).push(lowerFirst(METHOD.actors[actor]));
    });
    var parts = Object.keys(METHOD.stances).filter(function (s) { return groups[s]; }).map(function (s) {
      return "Likely to " + s + ": " + B.joinList(groups[s]) + ".";
    });
    return parts.join(" ");
  }

  function section(title, body) {
    return h("details", { class: "section" }, [
      h("summary", null, h("h2", { class: "summary-title" }, title)),
      h("div", { class: "section-body" }, body)
    ]);
  }

  function wayAroundItem(w, ctx) {
    return h("li", null, [
      h("span", { class: "tag tag-" + w.likelihood }, LIKELIHOOD_LABEL[w.likelihood]),
      " ",
      rich(w.strategy, ctx),
      w.note ? h("span", { class: "way-note" }, [" ", rich(w.note, ctx)]) : null,
      w.refs ? h("span", { class: "refs" }, " Discussed in: " + w.refs + ".") : null
    ]);
  }

  function sortedWays(iv) {
    return iv.waysAround.map(function (w, i) { return { w: w, i: i }; }).sort(function (a, b) {
      return (LIKELIHOOD_RANK[a.w.likelihood] - LIKELIHOOD_RANK[b.w.likelihood]) || (a.i - b.i);
    }).map(function (x) { return x.w; });
  }

  function incentivesTable(iv, ctx) {
    return h("table", { class: "data-table" }, [
      h("thead", null, h("tr", null, [
        h("th", { scope: "col" }, "Actor"), h("th", { scope: "col" }, "Expected stance"), h("th", { scope: "col" }, "Why")
      ])),
      h("tbody", null, Object.keys(METHOD.actors).map(function (actor) {
        var inc = iv.incentives[actor];
        return h("tr", null, [
          h("th", { scope: "row" }, rich(METHOD.actors[actor], ctx)),
          h("td", null, h("span", { class: "tag tag-stance" }, METHOD.stances[inc.stance].label)),
          h("td", null, rich(inc.note, ctx))
        ]);
      }))
    ]);
  }

  function renderTool(id) {
    var iv = byId[id] || interventions[0];
    var top = newCtx();

    view.appendChild(h("nav", { class: "tool-tabs", "aria-label": "Tools" }, h("ul", null, interventions.map(function (other) {
      return h("li", null, h("a", { href: "#tool/" + other.id, "aria-current": other.id === iv.id ? "page" : null }, other.name));
    }))));

    var benefits = METHOD.criteria.filter(function (c) { return c.kind === "benefit"; });
    var costs = METHOD.criteria.filter(function (c) { return c.kind === "cost"; });

    var card = h("article", { class: "card" });
    card.appendChild(h("header", { class: "card-head" }, [
      h("p", { class: "kicker" }, rich(iv.plainName, top)),
      h("h1", { tabindex: "-1" }, iv.name),
      h("p", { class: "one-liner" }, rich(iv.oneLiner, top)),
      h("p", { class: "card-meta" }, [
        readinessBadge(iv),
        h("button", { type: "button", class: "btn no-print", onclick: function () { window.print(); } }, "Print one-page summary")
      ])
    ]));

    card.appendChild(h("section", { class: "scores", "aria-label": "Scores" }, [
      h("div", { class: "score-group" }, [
        h("h2", { class: "group-title" }, "What it achieves"),
        benefits.map(function (c) { return scoreRow(c, iv.scores[c.id]); })
      ]),
      h("div", { class: "score-group" }, [
        h("h2", { class: "group-title" }, ["What it costs ", h("span", { class: "group-hint" }, "light ↔ heavy")]),
        costs.map(function (c) { return scoreRow(c, iv.scores[c.id]); }),
        h("div", { class: "score-row" }, [h("span", { class: "score-name" }, "Readiness"), readinessBadge(iv)])
      ])
    ]));

    card.appendChild(h("p", { class: "stance-line" }, rich(stanceLine(iv), top)));
    if (iv.scoringNote) { card.appendChild(h("p", { class: "scoring-note" }, rich(iv.scoringNote, top))); }

    var ways = sortedWays(iv);

    // Printed one-page summary (hidden on screen).
    card.appendChild(h("div", { class: "print-only print-summary" }, [
      h("div", null, [
        h("h2", null, "How it works"), h("p", null, iv.howItWorks),
        h("h2", null, "What AI labs would have to do"), list(iv.labsMustDo, null),
        h("h2", null, "Theory of change"), h("p", null, iv.theoryOfChange)
      ]),
      h("div", null, [
        h("h2", null, "Main ways around it"),
        h("ul", { class: "plain-list" }, ways.slice(0, 3).map(function (w) {
          return h("li", null, w.strategy + " (" + LIKELIHOOD_LABEL[w.likelihood].toLowerCase() + ")");
        })),
        h("h2", null, "Side effects and strategic risks"), list(iv.sideEffects, null),
        h("h2", null, "First steps"), list(iv.firstSteps, null, true)
      ])
    ]));

    var sections = h("div", { class: "sections no-print" });
    sections.appendChild(h("p", { class: "section-tools" }, [
      h("button", { type: "button", class: "btn btn-quiet", onclick: function () { setAll(true); } }, "Open all sections"),
      h("button", { type: "button", class: "btn btn-quiet", onclick: function () { setAll(false); } }, "Close all sections")
    ]));
    function setAll(open) {
      Array.prototype.forEach.call(sections.querySelectorAll("details.section"), function (d) { d.open = open; });
    }

    var c1 = newCtx();
    sections.appendChild(section("How it works", h("p", null, rich(iv.howItWorks, c1))));

    var c2 = newCtx();
    sections.appendChild(section("What the pacing proposals say", h("dl", { class: "def-list" }, iv.proposals.map(function (p) {
      return [h("dt", null, rich(p.name, c2)), h("dd", null, rich(p.role, c2))];
    }))));

    var c3 = newCtx();
    sections.appendChild(section("What AI labs would have to do (and how they’d likely respond)", [
      h("h3", null, "What it would require from AI labs"), list(iv.labsMustDo, c3),
      h("h3", null, "How labs would likely respond"), list(iv.labsLikelyResponse, c3)
    ]));

    var c4 = newCtx();
    var rest = ways.slice(3);
    sections.appendChild(section("Ways around it", [
      h("ul", { class: "ways" }, ways.slice(0, 3).map(function (w) { return wayAroundItem(w, c4); })),
      rest.length ? h("details", { class: "more" }, [
        h("summary", null, "Show " + rest.length + " more"),
        h("ul", { class: "ways" }, rest.map(function (w) { return wayAroundItem(w, c4); }))
      ]) : null
    ]));

    var c5 = newCtx();
    sections.appendChild(section("Side effects and strategic risks", list(iv.sideEffects, c5)));

    var c6 = newCtx();
    var deps = (iv.dependsOn || []).filter(function (d) { return byId[d]; });
    sections.appendChild(section("Recommendation and theory of change", [
      h("h3", null, "Theory of change"), h("p", null, rich(iv.theoryOfChange, c6)),
      iv.tocAssumptions && iv.tocAssumptions.length ? [h("h3", null, "It rests on these assumptions"), list(iv.tocAssumptions, c6)] : null,
      h("h3", null, "First steps"), list(iv.firstSteps, c6, true),
      iv.laterSteps && iv.laterSteps.length ? [h("h3", null, "Later steps"), list(iv.laterSteps, c6, true)] : null,
      deps.length ? [h("h3", null, "What it needs alongside"), h("ul", { class: "plain-list" }, deps.map(function (d) {
        return h("li", null, [
          h("a", { href: "#tool/" + d }, byId[d].name), ". ",
          iv.dependsOnWhy && iv.dependsOnWhy[d] ? rich(iv.dependsOnWhy[d], c6) : null
        ]);
      }))] : null
    ]));

    var c7 = newCtx();
    var todayDiffs = iv.today ? METHOD.criteria.filter(function (c) { return iv.today[c.id].score !== iv.scores[c.id].score; }) : [];
    sections.appendChild(section("How we scored it", [
      h("p", null, [rich(METHOD.judgementNote, c7), " ", h("a", { href: "#guide" }, "How to read the scores")]),
      iv.scoringNote ? h("p", null, rich(iv.scoringNote, c7)) : null,
      h("table", { class: "data-table score-table" }, [
        h("thead", null, h("tr", null, [
          h("th", { scope: "col" }, "Criterion"), h("th", { scope: "col" }, "Score"),
          h("th", { scope: "col" }, "Why"), h("th", { scope: "col" }, "Confidence")
        ])),
        h("tbody", null, METHOD.criteria.map(function (c) {
          var s = iv.scores[c.id];
          return h("tr", null, [
            h("th", { scope: "row" }, [c.plainLabel, c.plainLabel !== c.label ? h("span", { class: "score-tech" }, c.label) : null]),
            h("td", null, meter(c, s)),
            h("td", null, rich(s.justification, c7)),
            h("td", null, METHOD.confidence[s.confidence] || s.confidence)
          ]);
        }))
      ]),
      METHOD.confidenceNote ? h("p", { class: "muted" }, METHOD.confidenceNote) : null,
      todayDiffs.length ? [
        h("h3", null, "Today’s versions (provisional)"),
        h("ul", { class: "plain-list" }, todayDiffs.map(function (c) {
          return h("li", null, [c.plainLabel + ", today: ", meter(c, iv.today[c.id]), h("span", { class: "block-note" }, rich(iv.today[c.id].justification, c7))]);
        }))
      ] : null,
      h("h3", null, "Not scored: who would cooperate, and who would resist"),
      h("p", null, rich(METHOD.incentiveNote, c7)),
      incentivesTable(iv, c7)
    ]));

    sections.appendChild(section("Sources", h("dl", { class: "def-list sources" }, iv.sources.map(function (s) {
      return [h("dt", null, s.short), h("dd", null, s.full)];
    }))));

    card.appendChild(sections);
    view.appendChild(card);
  }

  // =====================================================================
  // VIEW B: the package builder
  // =====================================================================

  var builderState = { priorities: [], availableNow: false, maxInvasiveness: "any", setting: "domestic" };

  function radioGroup(legend, name, options, current, onChange, hint) {
    return h("fieldset", { class: "field" }, [
      h("legend", null, legend),
      hint ? h("p", { class: "field-hint" }, hint) : null,
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
    var roleText = layer.role === "foundation" ? "Needed as a foundation"
      : layer.role === "closest" ? "Closest fit"
      : (result.choices.priorities.length ? "Fits your priorities" : "Fits overall");
    return h("li", { class: "layer layer-" + layer.role }, [
      h("span", { class: "layer-role" }, roleText),
      h("a", { class: "layer-name", href: "#tool/" + iv.id }, iv.name),
      h("span", { class: "layer-plain" }, iv.plainName),
      h("span", { class: "layer-ready" }, [readinessIcon(iv.readiness === "now"), readinessText(iv)]),
      layer.foundationFor.length ? h("span", { class: "layer-supports" },
        "Foundation for: " + B.joinList(layer.foundationFor.map(function (d) { return byId[d].name; }))) : null
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
      var text = layer.role === "foundation"
        ? "Included as a foundation for " + B.joinList(layer.foundationFor.map(function (d) { return byId[d].name; }))
        : layer.role === "closest" ? "Included as the closest fit" : "Included";
      return text + (layer.lane === "prepare" ? " (start preparing now)" : "");
    }

    var table = h("table", { class: "data-table sums" }, [
      h("thead", null, h("tr", null, [
        h("th", { scope: "col" }, "Criterion"),
        h("th", { scope: "col" }, "Weight"),
        result.rows.map(function (row) { return h("th", { scope: "col" }, byId[row.id].name); })
      ])),
      h("tbody", null, [
        METHOD.criteria.map(function (c, ci) {
          var picked = result.choices.priorities.indexOf(c.id) !== -1;
          return h("tr", null, [
            h("th", { scope: "row" }, [c.plainLabel, picked ? h("span", { class: "tag tag-picked" }, "picked") : null]),
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
          h("th", { scope: "row" }, "Within your invasiveness limit?"),
          h("td", null, ""),
          result.rows.map(function (row) { return h("td", null, row.withinLimit ? "Yes" : "No"); })
        ]),
        h("tr", { class: "sum-row" }, [
          h("th", { scope: "row" }, "Outcome"),
          h("td", null, ""),
          result.rows.map(function (row) { return h("td", null, outcome(row)); })
        ])
      ])
    ]);

    return h("details", { class: "section worked" }, [
      h("summary", null, h("h3", { class: "summary-title" }, "How this was worked out")),
      h("div", { class: "section-body" }, [
        h("ol", { class: "plain-list" }, [
          h("li", null, "Every criterion counts " + METHOD.builder.baseWeight + ". Each criterion you picked counts " + METHOD.builder.pickedWeight + "."),
          h("li", null, "Scores run from 1 to 5. For the two cost criteria (burden on government, invasiveness for AI labs), the score is turned round as 6 minus the score, so that a higher number is always better."),
          h("li", null, "Fit is the sum of score × weight, divided by the sum of the weights. It stays on the 1 to 5 scale."),
          h("li", null, "A tool is included if its fit is at least " + threshold + " and its invasiveness score is within your limit (" +
            (limit >= 5 ? "you set no limit" : "you allowed scores up to " + limit + " out of 5") + ")."),
          h("li", null, "If no tool qualifies, the single best is shown and flagged."),
          h("li", null, "Anything an included tool depends on is added as a foundation, even if it did not qualify by itself."),
          h("li", null, "If you asked for tools that are available now, tools still in development are not removed. They move to “Start preparing now”."),
          h("li", null, "The scores used are those of a mature version of each tool.")
        ]),
        h("div", { class: "table-scroll", tabindex: "0", role: "region", "aria-label": "Fit arithmetic" }, table)
      ])
    ]);
  }

  function renderOutput(box, formCtx, status) {
    var ctx = newCtx(formCtx);
    var result = B.buildPackage(DATA, METHOD, builderState);
    var text = B.explain(result, DATA, METHOD);
    var chain = B.describeChain(result, DATA);
    box.textContent = "";
    box.appendChild(h("h2", null, "Suggested package"));

    if (result.noneWithinLimit) {
      box.appendChild(h("p", { class: "why" }, text.priorities + " " + text.why.join(" ")));
      status.textContent = "No tool is within your invasiveness limit.";
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

    // Layers on a timeline.
    var timelineLayers = result.layers.filter(function (l) { return l.lane === "timeline"; });
    var prepareLayers = result.layers.filter(function (l) { return l.lane === "prepare"; });
    var columns = result.choices.availableNow ? METHOD.readiness.slice(0, 1) : METHOD.readiness;
    box.appendChild(h("div", { class: "timeline cols-" + columns.length }, columns.map(function (col) {
      var here = timelineLayers.filter(function (l) { return l.readiness === col.id; });
      return h("section", { class: "time-col" }, [
        h("h3", { class: "time-title" }, col.column),
        here.length ? h("ol", { class: "layers" }, here.map(function (l) { return layerCard(l, result); }))
          : h("p", { class: "empty" }, "Nothing in this package")
      ]);
    })));
    if (prepareLayers.length) {
      box.appendChild(h("section", { class: "prepare-lane" }, [
        h("h3", { class: "time-title" }, "Start preparing now"),
        h("p", { class: "field-hint" }, "Not available yet, but worth starting on."),
        h("ol", { class: "layers" }, prepareLayers.map(function (l) { return layerCard(l, result); }))
      ]));
    }

    // Why this package, and what it gives up.
    box.appendChild(h("h3", null, "Why this package"));
    box.appendChild(h("p", { class: "why" }, rich(text.priorities + " " + text.why.join(" "), ctx)));
    box.appendChild(h("p", { class: "why" }, rich(text.givesUp, ctx)));
    if (text.notes.length) { box.appendChild(h("ul", { class: "notes" }, text.notes.map(function (n) { return h("li", null, rich(n, ctx)); }))); }

    // Theory of change and steps.
    box.appendChild(h("h3", null, "Theory of change and first steps"));
    result.layers.forEach(function (layer) {
      var iv = byId[layer.id];
      box.appendChild(h("section", { class: "steps-block" }, [
        h("h4", null, [h("a", { href: "#tool/" + iv.id }, iv.name), layer.lane === "prepare" ? h("span", { class: "tag" }, "Start preparing now") : null]),
        h("p", null, rich(iv.theoryOfChange, ctx)),
        h("h5", null, "First steps"),
        list(layer.steps.first, ctx, true),
        layer.steps.later.length ? [h("h5", null, "Later steps"), list(layer.steps.later, ctx, true)] : null
      ]));
    });

    if (result.rivalNotes.length) {
      box.appendChild(h("h3", null, "What to expect from the other side"));
      box.appendChild(h("p", null, rich("How a trailing state is expected to respond to each tool:", ctx)));
      box.appendChild(h("ul", { class: "notes" }, result.rivalNotes.map(function (n) {
        return h("li", null, [
          h("strong", null, byId[n.id].name + ": "),
          h("span", { class: "tag tag-stance" }, METHOD.stances[n.stance].label), " ",
          rich(n.note, ctx)
        ]);
      })));
    }

    box.appendChild(workedOut(result));
    status.textContent = "Package updated: " + chain.map(function (c) { return c.name; }).join(", ") + ".";
  }

  function renderBuilder() {
    var formCtx = newCtx();
    view.appendChild(h("h1", { tabindex: "-1" }, "Build a verification package"));
    view.appendChild(h("p", { class: "lede" }, rich("Say what matters to you. The builder suggests which tools to combine, and in what order. The tools are layers that build on each other, not alternatives.", formCtx)));

    var output = h("section", { class: "builder-output", "aria-label": "Suggested package" });
    var status = h("p", { class: "visually-hidden", role: "status" });
    var pickStatus = h("p", { class: "field-hint", role: "status" });
    function refresh() { renderOutput(output, formCtx, status); }

    var max = METHOD.builder.maxPicks;
    function pickText() { return builderState.priorities.length + " of " + max + " picked."; }
    pickStatus.textContent = pickText();

    var order = METHOD.builder.priorityOrder || METHOD.criteria.map(function (c) { return c.id; });
    var priorityField = h("fieldset", { class: "field" }, [
      h("legend", null, "What matters most to you?"),
      h("p", { class: "field-hint" }, "Pick up to " + max + "."),
      order.map(function (id) {
        var c = criterion(id);
        var input = h("input", { type: "checkbox", name: "priority", value: id });
        input.checked = builderState.priorities.indexOf(id) !== -1;
        input.addEventListener("change", function () {
          if (input.checked) {
            if (builderState.priorities.length >= max) {
              input.checked = false;
              pickStatus.textContent = "You can pick up to " + max + ". Untick one to choose another.";
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
      }),
      pickStatus
    ]);

    var form = h("form", { class: "builder-form", "aria-label": "Your choices", onsubmit: function (e) { e.preventDefault(); } }, [
      priorityField,
      radioGroup("Must it be available now?", "now", [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }],
        builderState.availableNow ? "yes" : "no", function (v) { builderState.availableNow = v === "yes"; refresh(); }),
      radioGroup("Maximum acceptable invasiveness for AI labs", "limit",
        [{ value: "any", label: "Any" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" }],
        builderState.maxInvasiveness, function (v) { builderState.maxInvasiveness = v; refresh(); }),
      radioGroup("Setting", "setting",
        [{ value: "domestic", label: "Domestic only" }, { value: "allies", label: "With allies" }, { value: "rivals", label: "An agreement between rival powers (US–China)" }],
        builderState.setting, function (v) { builderState.setting = v; refresh(); }),
      h("button", { type: "button", class: "btn btn-quiet", onclick: function () {
        builderState = { priorities: [], availableNow: false, maxInvasiveness: "any", setting: "domestic" };
        route(true);
      } }, "Reset choices")
    ]);

    view.appendChild(h("div", { class: "builder-grid" }, [form, h("div", null, [status, output])]));
    refresh();
  }

  // =====================================================================
  // "How to read this" and the glossary
  // =====================================================================

  function renderGuide() {
    var ctx = newCtx();
    var sample = { score: 4 };
    view.appendChild(h("h1", { tabindex: "-1" }, "How to read this"));
    view.appendChild(h("div", { class: "prose" }, [
      h("p", { class: "lede" }, rich("This site compares ways of checking that an agreement to pace frontier AI development is being kept. It sets out trade-offs. It does not argue for or against any agreement.", ctx)),

      h("h2", null, "Whose scores these are"),
      h("p", null, rich(METHOD.judgementNote, ctx)),
      METHOD.confidenceNote ? h("p", null, METHOD.confidenceNote) : null,

      h("h2", null, "The common yardstick"),
      h("p", null, rich(METHOD.yardstick, ctx)),

      h("h2", null, "How scores are shown"),
      h("p", null, "Each score runs from 1 to 5 and is shown as five dots with a word."),
      h("ul", { class: "plain-list" }, [
        h("li", null, ["What a tool achieves: 1–2 is Low, 3 is Medium, 4–5 is High. Example: ", meter(criterion("verifiability"), sample)]),
        h("li", null, ["What a tool costs: 1–2 is Light, 3 is Moderate, 4–5 is Heavy. More dots mean a heavier cost. Example: ", meter(criterion("burden"), sample)])
      ]),

      h("h2", null, "The criteria"),
      h("div", { class: "table-scroll", tabindex: "0", role: "region", "aria-label": "Scoring anchors" },
        h("table", { class: "data-table" }, [
          h("thead", null, h("tr", null, [
            h("th", { scope: "col" }, "Criterion"), h("th", { scope: "col" }, "A score of 1 means"),
            h("th", { scope: "col" }, "A score of 3 means"), h("th", { scope: "col" }, "A score of 5 means")
          ])),
          h("tbody", null, METHOD.criteria.map(function (c) {
            return h("tr", null, [
              h("th", { scope: "row" }, [c.plainLabel, c.plainLabel !== c.label ? h("span", { class: "score-tech" }, c.label) : null,
                h("span", { class: "criterion-q" }, rich(c.question, ctx))]),
              h("td", null, rich(c.anchors[1], ctx)), h("td", null, rich(c.anchors[3], ctx)), h("td", null, rich(c.anchors[5], ctx))
            ]);
          }))
        ])),

      h("h2", null, "Readiness"),
      h("p", null, "Each tool is marked as available now, in 1–3 years, or in 3+ years."),
      h("ul", { class: "legend" }, [
        h("li", null, [readinessIcon(true), "A solid dot: available now"]),
        h("li", null, [readinessIcon(false), "A dashed, hollow dot: still in development"])
      ]),

      h("h2", null, "Who would cooperate, and who would resist"),
      h("p", null, rich(METHOD.incentiveNote, ctx)),
      h("ul", { class: "plain-list" }, Object.keys(METHOD.stances).map(function (s) {
        return h("li", null, [h("strong", null, METHOD.stances[s].label + ". "), METHOD.stances[s].meaning]);
      })),
      h("p", null, rich("The four actors are " + B.joinList(Object.keys(METHOD.actors).map(function (a) { return lowerFirst(METHOD.actors[a]); })) + ".", ctx)),

      h("h2", null, "The trade-off map"),
      h("p", null, METHOD.mapNote),
      h("p", null, "Where a tool has two positions, today and once mature, a switch above the map moves its dot. A faint ring marks the other position."),

      h("h2", null, "The package builder"),
      h("p", null, "The builder follows fixed rules, shown in full under “How this was worked out” on its page. In short:"),
      h("ul", { class: "plain-list" }, [
        h("li", null, "Every criterion counts once. Each criterion you pick counts " + METHOD.builder.pickedWeight + " times."),
        h("li", null, "A tool is included if its overall fit is at least " + METHOD.builder.threshold.toFixed(1) + " out of 5 and it is within your limit on invasiveness."),
        h("li", null, "Anything an included tool depends on is added as a foundation."),
        h("li", null, "Tools still in development are never dropped for that reason. If you ask for tools available now, they move to “Start preparing now”.")
      ])
    ]));
  }

  function renderGlossary() {
    view.appendChild(h("h1", { tabindex: "-1" }, "Glossary"));
    var sorted = GLOSSARY.slice().sort(function (a, b) { return a.term.toLowerCase() < b.term.toLowerCase() ? -1 : 1; });
    view.appendChild(h("dl", { class: "def-list glossary" }, sorted.map(function (entry) {
      return [h("dt", null, entry.term), h("dd", null, entry.definition)];
    })));
  }

  // =====================================================================
  // Navigation
  // =====================================================================

  var TITLES = { map: "Trade-off map", builder: "Build a package", tool: "The tools", guide: "How to read this", glossary: "Glossary" };
  var firstLoad = true;

  function route(keepScroll) {
    var parts = location.hash.replace(/^#/, "").split("/");
    var name = TITLES[parts[0]] ? parts[0] : "map";
    hideTip();
    currentChart = null;
    view.textContent = "";
    view.className = "wrap view view-" + name;

    if (name === "map") { renderMap(); }
    else if (name === "builder") { renderBuilder(); }
    else if (name === "tool") { renderTool(parts[1]); }
    else if (name === "guide") { renderGuide(); }
    else { renderGlossary(); }

    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (a) {
      if (a.getAttribute("data-nav") === name) { a.setAttribute("aria-current", "page"); }
      else { a.removeAttribute("aria-current"); }
    });
    var toolName = name === "tool" ? (byId[parts[1]] || interventions[0]).name : "";
    document.title = (toolName || TITLES[name]) + " · Pacing explorer";

    if (!firstLoad && keepScroll !== true) {
      window.scrollTo(0, 0);
      var heading = view.querySelector("h1");
      if (heading) { heading.focus({ preventScroll: true }); }
    }
    firstLoad = false;
  }

  window.addEventListener("hashchange", function () { route(); });

  document.querySelector(".skip-link").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("main").focus();
  });

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (currentChart) { hideTip(); currentChart.update(); } }, 120);
  });

  route();
})();
