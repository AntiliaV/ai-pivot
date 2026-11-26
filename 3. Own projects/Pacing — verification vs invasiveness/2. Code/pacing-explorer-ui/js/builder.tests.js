// Pacing explorer: self-checks for the package builder (js/builder.js).
//
// Two ways to run them, neither needs npm:
//   - open tests.html in a browser (double-click it), or
//   - run `node js/builder.tests.js` from the pacing-explorer folder.
// Each check is also passed to console.assert.
//
// Checks labelled "real data" use data/interventions.js as it stands and assume
// the default builder numbers in data/method.js. Checks labelled "synthetic" use
// an altered copy made here, to reach rules the real data never triggers.
// The real data is never changed.

(function (root) {
  "use strict";

  var inNode = typeof module !== "undefined" && module.exports && typeof window === "undefined";
  var B, DATA, METHOD;

  if (inNode) {
    global.window = {};
    require("../data/interventions.js");
    require("../data/method.js");
    DATA = global.window.PACING_DATA;
    METHOD = global.window.PACING_METHOD;
    B = require("./builder.js");
  } else {
    DATA = root.PACING_DATA;
    METHOD = root.PACING_METHOD;
    B = root.PacingBuilder;
  }

  var results = [];
  function check(name, condition, detail) {
    var pass = !!condition;
    console.assert(pass, name + (detail ? " — " + detail : ""));
    results.push({ name: name, pass: pass, detail: detail || "" });
  }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function ids(layers) { return layers.map(function (l) { return l.id; }); }
  function layer(result, id) { return result.layers.filter(function (l) { return l.id === id; })[0]; }
  function approx(a, b) { return Math.abs(a - b) < 1e-9; }

  function row(r, id) { return r.rows.filter(function (x) { return x.id === id; })[0]; }
  function byTool(data) { var m = {}; data.interventions.forEach(function (i) { m[i.id] = i; }); return m; }
  function tool(data, id) { return data.interventions.filter(function (i) { return i.id === id; })[0]; }

  // ---------- the five tools and their dependencies (real data) ----------
  (function () {
    check("(0) the data holds the five tools, in card order",
      DATA.interventions.map(function (i) { return i.id; }).join(",") === "ledger,inspections,evaluations,bandwidth,metering",
      DATA.interventions.map(function (i) { return i.id; }).join(","));
    var deps = DATA.interventions.map(function (i) { return i.id + ">" + i.dependsOn.join("+"); }).join(" ");
    check("(0) dependencies: inspections need the ledger, bandwidth caps need inspections, the rest none",
      deps === "ledger> inspections>ledger evaluations> bandwidth>inspections metering>", deps);
  })();

  // ---------- (a) no priorities chosen. Real data. ----------
  (function () {
    var r = B.buildPackage(DATA, METHOD, {});
    var allOne = METHOD.criteria.every(function (c) { return r.weights[c.id] === 1; });
    check("(a) no priorities: every weight is 1", allOne);
    var expected = { ledger: 21, inspections: 15, evaluations: 17, bandwidth: 18, metering: 19 };
    Object.keys(expected).forEach(function (id) {
      var f = row(r, id).fit;
      check("(a) no priorities: " + id + " fit is " + expected[id] + "/6", f.num === expected[id] && f.den === 6, f.num + "/" + f.den);
    });
    check("(a) no priorities: ledger, bandwidth cap and metering are selected on fit (the cap at exactly 3.0)",
      r.selected.join(",") === "ledger,bandwidth,metering" && row(r, "bandwidth").meetsThreshold, r.selected.join(","));
    check("(a) no priorities: inspections come in as a supporting measure only", layer(r, "inspections") && layer(r, "inspections").role === "supporting");
    check("(a) no priorities: evaluations are left out on fit",
      !layer(r, "evaluations") && r.excluded.filter(function (e) { return e.id === "evaluations" && e.reason === "fit"; }).length === 1);
    check("(a) no priorities: layers run ledger, metering, inspections, bandwidth cap", ids(r.layers).join(",") === "ledger,metering,inspections,bandwidth", ids(r.layers).join(","));
    var labels = B.describeChain(r, DATA).map(function (c) { return c.label; }).join(",");
    check("(a) no priorities: the chain labels run Supporting measure, Selected, Supporting measure, Selected", labels === "Supporting measure,Selected,Supporting measure,Selected", labels);
    var text = B.explain(r, DATA, METHOD);
    check("(a) no priorities: the explanation says every criterion counts equally", /every criterion counts equally/.test(text.priorities), text.priorities);
  })();

  // ---------- (b) "Light on AI labs" plus low maximum invasiveness. Real data. ----------
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["invasiveness"], maxInvasiveness: "low" });
    check("(b) light on labs + low limit: invasiveness has weight 3", r.weights.invasiveness === 3);
    check("(b) light on labs + low limit: ledger and metering are selected", r.selected.join(",") === "ledger,metering", r.selected.join(","));
    var ev = r.excluded.filter(function (e) { return e.id === "evaluations"; })[0];
    check("(b) light on labs + low limit: evaluations are excluded for invasiveness", ev && ev.reason === "invasiveness" && ids(r.layers).indexOf("evaluations") === -1);
    var insp = r.excluded.filter(function (e) { return e.id === "inspections"; })[0];
    check("(b) light on labs + low limit: inspections are excluded for invasiveness and not brought back as a supporting measure",
      insp && insp.reason === "invasiveness" && !layer(r, "inspections"));
    var bw = r.excluded.filter(function (e) { return e.id === "bandwidth"; })[0];
    check("(b) light on labs + low limit: the bandwidth cap is left out because its supporting measure (inspections) is above the limit",
      bw && bw.reason === "supportingMeasure" && bw.blockedBy.join(",") === "inspections" && row(r, "bandwidth").withinLimit, bw && bw.blockedBy.join(","));
    check("(b) light on labs + low limit: layers run ledger, metering", ids(r.layers).join(",") === "ledger,metering", ids(r.layers).join(","));
    var f = row(r, "ledger").fit;
    check("(b) light on labs + low limit: ledger fit is 29/8 = 3.625", f.num === 29 && f.den === 8 && approx(f.value, 3.625));
    var notes = B.explain(r, DATA, METHOD).notes.join(" ");
    check("(b) light on labs + low limit: the explanation names the supporting measure and its invasiveness word",
      notes.indexOf("Interconnect bandwidth cap is left out: its supporting measure, Physical chip inspection, is above the invasiveness limit (Heavy).") !== -1, notes);
  })();

  // ---------- (c) "Relevance to pacing" as the priority ----------
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness"] });
    check("(c) relevance to pacing: effectiveness has weight 3", r.weights.effectiveness === 3);
    var f = row(r, "bandwidth");
    check("(c) relevance to pacing: the bandwidth cap's fit is exactly 3.0 and counts as 'at least 3.0'", f.fit.num === 24 && f.fit.den === 8 && f.meetsThreshold);
    check("(c) relevance to pacing: evaluations (fit 25/8) are selected", row(r, "evaluations").fit.num === 25 && ids(r.layers).indexOf("evaluations") !== -1);
    check("(c) relevance to pacing: metering (fit 23/8) is left out on fit",
      r.excluded.filter(function (e) { return e.id === "metering" && e.reason === "fit"; }).length === 1);
    check("(c) relevance to pacing: layers run ledger, evaluations, inspections, bandwidth cap", ids(r.layers).join(",") === "ledger,evaluations,inspections,bandwidth", ids(r.layers).join(","));
  })();

  // ---------- (d) choosing the bandwidth cap pulls in inspections, and through them the ledger ----------
  (function () {
    // Real data, dependency rule on its own.
    var resolved = B.resolveDependencies(["bandwidth"], DATA.interventions);
    check("(d) the bandwidth cap alone pulls in inspections", resolved.ids.indexOf("inspections") !== -1, resolved.ids.join(","));
    check("(d) the bandwidth cap alone pulls in the ledger too (through inspections)", resolved.ids.indexOf("ledger") !== -1);
    check("(d) the ledger is recorded as a supporting measure for inspections", resolved.supportFor.ledger.indexOf("inspections") !== -1);
    check("(d) inspections are recorded as a supporting measure for the bandwidth cap", resolved.supportFor.inspections.indexOf("bandwidth") !== -1);
    var mapAll = byTool(DATA);
    check("(d) the bandwidth cap's chain of supporting measures is inspections, then the ledger (followed recursively)",
      B.supportChain("bandwidth", mapAll).join(",") === "inspections,ledger", B.supportChain("bandwidth", mapAll).join(","));
    check("(d) the ledger, evaluations and metering need no supporting measure",
      ["ledger", "evaluations", "metering"].every(function (id) { return B.supportChain(id, mapAll).length === 0; }));
    var alone = B.resolveDependencies(["metering", "evaluations"], DATA.interventions);
    check("(d) metering and evaluations pull in nothing", alone.ids.join(",") === "metering,evaluations", alone.ids.join(","));

    // Real data, full package: the supporting measures come first.
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness", "verifiability"] });
    check("(d) a package with the bandwidth cap runs ledger, inspections, bandwidth cap", ids(r.layers).join(",") === "ledger,inspections,bandwidth", ids(r.layers).join(","));
    check("(d) the ledger layer lists inspections among what it supports", layer(r, "ledger").supportFor.indexOf("inspections") !== -1);
    check("(d) the chain labels the ledger 'Supporting measure'", B.describeChain(r, DATA)[0].label === "Supporting measure");

    // Synthetic: lower the ledger's scores so that it no longer qualifies on fit.
    // It must still come in, with the role "supporting" and a note saying why.
    var altered = clone(DATA);
    var ledger = tool(altered, "ledger");
    ["effectiveness", "coverage", "verifiability", "robustness"].forEach(function (k) { ledger.scores[k].score = 1; });
    var s = B.buildPackage(altered, METHOD, { priorities: ["effectiveness"] });
    check("(d) synthetic: a ledger that fails on fit is still added, as a supporting measure",
      layer(s, "ledger") && layer(s, "ledger").role === "supporting" && s.selected.indexOf("ledger") === -1);
    var notes = B.explain(s, altered, METHOD).notes.join(" ");
    check("(d) synthetic: the note says the ledger is needed as a supporting measure", /Chip production ledger: not selected on fit, but needed as a supporting measure/.test(notes), notes);
    check("(d) synthetic: the note gives the reason from the data", notes.indexOf(tool(DATA, "inspections").dependsOnWhy.ledger) !== -1, notes);
  })();

  // ---------- further checks ----------

  // A constraint excludes a tool that another tool needs. Real data.
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness"], maxInvasiveness: "medium" });
    check("(e) medium limit: inspections are above the limit and are not added as a supporting measure", !layer(r, "inspections"));
    var bw = r.excluded.filter(function (e) { return e.id === "bandwidth"; })[0];
    check("(e) medium limit: the bandwidth cap (fit exactly 3.0, invasiveness within the limit) is omitted because of inspections",
      bw && bw.reason === "supportingMeasure" && bw.meetsThreshold && row(r, "bandwidth").withinLimit && !layer(r, "bandwidth"));
    check("(e) medium limit: evaluations are left out for invasiveness",
      r.excluded.filter(function (e) { return e.id === "evaluations" && e.reason === "invasiveness"; }).length === 1);
    check("(e) medium limit: the package is the ledger alone", ids(r.layers).join(",") === "ledger", ids(r.layers).join(","));
    var notes = B.explain(r, DATA, METHOD).notes.join(" ");
    check("(e) medium limit: the conflict is reported, naming the supporting measure and its invasiveness word",
      notes.indexOf("Interconnect bandwidth cap is left out: its supporting measure, Physical chip inspection, is above the invasiveness limit (Heavy).") !== -1, notes);
    check("(e) medium limit: no note says a tool above the limit is still needed", !/still needed/.test(notes), notes);
  })();

  // The other side's stance: one trailing-state note per tool in the package, whatever the choices.
  (function () {
    var plain = B.buildPackage(DATA, METHOD, {});
    var picky = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness", "verifiability"], maxInvasiveness: "medium" });
    [plain, picky].forEach(function (r, i) {
      var which = i === 0 ? "no choices" : "priorities and a medium limit";
      check("(f) " + which + ": one trailing-state note per tool in the package",
        r.rivalNotes.length === r.layers.length && ids(r.rivalNotes).join(",") === ids(r.layers).join(","), ids(r.rivalNotes).join(","));
    });
    var ledgerNote = plain.rivalNotes.filter(function (n) { return n.id === "ledger"; })[0];
    var ledgerData = tool(DATA, "ledger");
    check("(f) the note repeats the data's trailing-state stance and reason",
      ledgerNote && ledgerNote.stances.join(",") === ledgerData.stances.trailingState.join(",") && ledgerNote.note === ledgerData.why.trailingState);
    check("(f) the choices no longer include a setting", plain.choices.setting === undefined && B.normaliseChoices({ setting: "rivals" }, METHOD).setting === undefined);
    var none = B.buildPackage(DATA, METHOD, { maxInvasiveness: "low", priorities: [] });
    check("(f) a package with no tools has no notes", none.layers.length === 0 ? none.rivalNotes.length === 0 : true);
  })();

  // Orientation and input handling.
  (function () {
    var burden = METHOD.criteria.filter(function (c) { return c.id === "burden"; })[0];
    var eff = METHOD.criteria.filter(function (c) { return c.id === "effectiveness"; })[0];
    check("(g) orientation: burden 4 becomes 2, relevance to pacing 4 stays 4", B.orientScore(burden, 4) === 2 && B.orientScore(eff, 4) === 4);
    var n = B.normaliseChoices({ priorities: ["effectiveness", "coverage", "verifiability", "robustness", "nonsense", "coverage"] }, METHOD);
    check("(g) at most three priorities are kept, unknown ones dropped", n.priorities.join(",") === "effectiveness,coverage,verifiability", n.priorities.join(","));
  })();

  // Synthetic: nothing reaches 3.0, so the single best is shown, with a note that it falls short.
  (function () {
    var altered = clone(DATA);
    altered.interventions.forEach(function (iv) {
      iv.dependsOn = [];
      ["effectiveness", "coverage", "verifiability", "robustness"].forEach(function (k) { iv.scores[k].score = 1; });
      iv.scores.burden.score = 5;
      iv.scores.invasiveness.score = 5;
    });
    altered.interventions[1].scores.coverage.score = 2;
    var r = B.buildPackage(altered, METHOD, {});
    check("(h) synthetic: when none qualifies, only the single best is shown", r.noneQualify && ids(r.layers).join(",") === "inspections", ids(r.layers).join(","));
    check("(h) synthetic: the explanation says no option fits well", /No option fits the priorities well/.test(B.explain(r, altered, METHOD).why.join(" ")));
    var none = B.buildPackage(altered, METHOD, { maxInvasiveness: "low" });
    check("(h) synthetic: when every tool exceeds the limit, the package is empty and says why",
      none.noneWithinLimit && none.layers.length === 0 && /No tool, together with its supporting measures, is within the limit/.test(B.explain(none, altered, METHOD).why.join(" ")));
  })();

  // Real data: every combination of inputs gives a consistent package.
  (function () {
    var critIds = METHOD.criteria.map(function (c) { return c.id; });
    var subsets = [[]];
    critIds.forEach(function (c) {
      subsets.slice().forEach(function (s) { if (s.length < METHOD.builder.maxPicks) { subsets.push(s.concat([c])); } });
    });
    var problems = [];
    var count = 0;
    subsets.forEach(function (p) {
      ["any", "medium", "low"].forEach(function (limit) {
          {
            count++;
            var choices = { priorities: p, maxInvasiveness: limit };
            var r, text;
            try {
              r = B.buildPackage(DATA, METHOD, choices);
              text = B.explain(r, DATA, METHOD);
            } catch (e) {
              problems.push(JSON.stringify(choices) + " threw " + e.message);
              return;
            }
            var present = ids(r.layers);
            r.layers.forEach(function (l, i) {
              var iv = DATA.interventions.filter(function (x) { return x.id === l.id; })[0];
              iv.dependsOn.forEach(function (dep) {
                if (present.indexOf(dep) === -1) { problems.push(JSON.stringify(choices) + ": " + l.id + " is missing " + dep); }
              });
              if (!B.withinInvasivenessLimit(iv, limit, METHOD)) { problems.push(JSON.stringify(choices) + ": " + l.id + " is above the limit but was added"); }
              if (i > 0 && B.dependencyDepth(r.layers[i - 1].id, byTool(DATA)) > B.dependencyDepth(l.id, byTool(DATA))) {
                problems.push(JSON.stringify(choices) + ": layers are not ordered with supporting measures first");
              }
            });
            if (present.length + r.excluded.length !== DATA.interventions.length) { problems.push(JSON.stringify(choices) + ": a tool is neither included nor excluded"); }
            if (!text.priorities || !text.why.length) { problems.push(JSON.stringify(choices) + ": empty explanation"); }
            r.excluded.forEach(function (ex) {
              if (ex.reason !== "supportingMeasure") { return; }
              var name = DATA.interventions.filter(function (x) { return x.id === ex.id; })[0].name;
              if (!text.notes.some(function (n) { return n.indexOf(name + " is left out: its supporting measure") === 0; })) {
                problems.push(JSON.stringify(choices) + ": the conflict for " + ex.id + " is not explained");
              }
            });
            if (r.rivalNotes.length !== r.layers.length) { problems.push(JSON.stringify(choices) + ": a tool has no note on the other side"); }
          }
      });
    });
    check("(i) all " + count + " input combinations give a consistent package and explanation, and nothing above the limit is ever added",
      problems.length === 0, problems.slice(0, 3).join(" / "));
  })();

  // ---------- (j) the ceiling applies to supporting measures too ----------

  // Synthetic: the conflict is found through an indirect supporting measure.
  // Inspections are made light (within a medium limit), the ledger heavy (5).
  // The bandwidth cap's direct supporting measure is fine, but its chain reaches the ledger.
  (function () {
    var altered = clone(DATA);
    tool(altered, "inspections").scores.invasiveness.score = 3;
    tool(altered, "ledger").scores.invasiveness.score = 5;
    var r = B.buildPackage(altered, METHOD, { maxInvasiveness: "medium" });
    var bw = r.excluded.filter(function (e) { return e.id === "bandwidth"; })[0];
    var insp = r.excluded.filter(function (e) { return e.id === "inspections"; })[0];
    check("(j) synthetic: a candidate whose indirect supporting measure exceeds the ceiling is omitted",
      bw && bw.reason === "supportingMeasure" && bw.blockedBy.join(",") === "ledger" && !layer(r, "bandwidth"), bw && JSON.stringify(bw.blockedBy));
    check("(j) synthetic: so is the tool in between (inspections need the ledger)",
      insp && insp.reason === "supportingMeasure" && insp.blockedBy.join(",") === "ledger");
    check("(j) synthetic: the heavy ledger is not added", !layer(r, "ledger"));
    var notes = B.explain(r, altered, METHOD).notes.join(" ");
    check("(j) synthetic: the conflict names the indirect supporting measure and its word",
      notes.indexOf("Interconnect bandwidth cap is left out: its supporting measure, Chip production ledger, is above the invasiveness limit (Heavy).") !== -1, notes);
  })();

  // Synthetic: two supporting measures above the ceiling are both named.
  (function () {
    var altered = clone(DATA);
    tool(altered, "ledger").scores.invasiveness.score = 5;
    var r = B.buildPackage(altered, METHOD, { maxInvasiveness: "medium" });
    var notes = B.explain(r, altered, METHOD).notes.join(" ");
    check("(j) synthetic: with two supporting measures above the ceiling, both are named",
      notes.indexOf("Interconnect bandwidth cap is left out: its supporting measures, Physical chip inspection (Heavy) and Chip production ledger (Heavy), are above the invasiveness limit.") !== -1, notes);
  })();

  // Synthetic: a blocked candidate that also falls short on fit says both.
  (function () {
    var altered = clone(DATA);
    var bw = tool(altered, "bandwidth");
    ["effectiveness", "coverage", "verifiability", "robustness"].forEach(function (k) { bw.scores[k].score = 1; });
    var r = B.buildPackage(altered, METHOD, { maxInvasiveness: "low" });
    var notes = B.explain(r, altered, METHOD).notes.join(" ");
    check("(j) synthetic: a blocked candidate below the fit threshold is reported with both reasons",
      /Interconnect bandwidth cap is left out: its supporting measure, Physical chip inspection, is above the invasiveness limit \(Heavy\)\. Its overall fit with the priorities is also below 3\.0 out of 5\./.test(notes), notes);
  })();

  // Synthetic: no candidate remains, because every tool is light but needs a heavy one.
  (function () {
    var altered = clone(DATA);
    altered.interventions.forEach(function (iv) { iv.dependsOn = iv.id === "inspections" ? [] : ["inspections"]; iv.dependsOnWhy = {}; });
    var r = B.buildPackage(altered, METHOD, { maxInvasiveness: "low" });
    var text = B.explain(r, altered, METHOD);
    check("(j) synthetic: when no candidate remains, the package is empty",
      r.noneWithinLimit && r.layers.length === 0 && r.selected.length === 0, ids(r.layers).join(","));
    check("(j) synthetic: and the explanation says so plainly",
      text.why.join(" ") === "No tool, together with its supporting measures, is within the limit on invasiveness for AI labs, so there is no package to show. A higher limit shows more options.", text.why.join(" "));
  })();

  // Real data: whatever the choices, no tool in a package is above the ceiling,
  // and every tool in a package has its whole chain of supporting measures in it.
  (function () {
    var problems = [];
    var map = byTool(DATA);
    ["any", "medium", "low"].forEach(function (limit) {
      METHOD.criteria.forEach(function (c) {
        var r = B.buildPackage(DATA, METHOD, { priorities: [c.id], maxInvasiveness: limit });
        var present = ids(r.layers);
        r.layers.forEach(function (l) {
          if (!B.withinInvasivenessLimit(map[l.id], limit, METHOD)) { problems.push(limit + "/" + c.id + ": " + l.id + " is above the ceiling"); }
          B.supportChain(l.id, map).forEach(function (dep) {
            if (present.indexOf(dep) === -1) { problems.push(limit + "/" + c.id + ": " + l.id + " lacks " + dep); }
          });
        });
      });
    });
    check("(j) real data: nothing above the ceiling is ever added, and every chain is complete", problems.length === 0, problems.slice(0, 3).join(" / "));
  })();

  // ---------- report ----------
  var failed = results.filter(function (r) { return !r.pass; });
  if (inNode) {
    results.forEach(function (r) { console.log((r.pass ? "PASS  " : "FAIL  ") + r.name + (r.pass || !r.detail ? "" : "  [" + r.detail + "]")); });
    console.log("\n" + (results.length - failed.length) + " of " + results.length + " checks passed.");
    process.exitCode = failed.length ? 1 : 0;
  } else {
    root.PACING_TEST_RESULTS = results;
  }
})(typeof window !== "undefined" ? window : globalThis);
