// Pacing explorer: self-checks for the package builder (js/builder.js).
//
// Two ways to run them, neither needs npm:
//   - open tests.html in a browser (double-click it), or
//   - run `node js/builder.tests.js` from the pacing-explorer folder.
// Each check is also passed to console.assert.
//
// Checks marked "real data" use data/interventions.js as it stands and assume
// the default builder numbers in data/method.js. Checks marked "synthetic" use
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

  // ---------- (a) no priorities chosen. Real data. ----------
  (function () {
    var r = B.buildPackage(DATA, METHOD, {});
    var allOne = METHOD.criteria.every(function (c) { return r.weights[c.id] === 1; });
    check("(a) no priorities: every weight is 1", allOne);
    var fits = {};
    r.rows.forEach(function (row) { fits[row.id] = row.fit; });
    check("(a) no priorities: ledger fit is 20/6", fits.ledger.num === 20 && fits.ledger.den === 6, fits.ledger.num + "/" + fits.ledger.den);
    check("(a) no priorities: inspections fit is 14/6", fits.inspections.num === 14 && fits.inspections.den === 6, fits.inspections.num + "/" + fits.inspections.den);
    check("(a) no priorities: FlexHEGs fit is 19/6", fits.flexhegs.num === 19 && fits.flexhegs.den === 6, fits.flexhegs.num + "/" + fits.flexhegs.den);
    check("(a) no priorities: ledger and FlexHEGs are selected on fit", r.selected.join(",") === "ledger,flexhegs", r.selected.join(","));
    check("(a) no priorities: inspections come in as a foundation only", layer(r, "inspections") && layer(r, "inspections").role === "foundation");
    check("(a) no priorities: layers run ledger, inspections, FlexHEGs", ids(r.layers).join(",") === "ledger,inspections,flexhegs", ids(r.layers).join(","));
    check("(a) no priorities: nothing sits in the prepare lane", r.layers.every(function (l) { return l.lane === "timeline"; }));
    var text = B.explain(r, DATA, METHOD);
    check("(a) no priorities: the explanation says every criterion counts equally", /every criterion counts equally/.test(text.priorities), text.priorities);
  })();

  // ---------- (b) "Light on AI labs" plus low maximum invasiveness. Real data. ----------
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["invasiveness"], maxInvasiveness: "low" });
    check("(b) light on labs + low limit: invasiveness has weight 3", r.weights.invasiveness === 3);
    check("(b) light on labs + low limit: the ledger is kept", ids(r.layers).indexOf("ledger") !== -1);
    check("(b) light on labs + low limit: inspections are excluded", ids(r.layers).indexOf("inspections") === -1);
    var ex = r.excluded.filter(function (e) { return e.id === "inspections"; })[0];
    check("(b) light on labs + low limit: inspections are excluded for invasiveness", ex && ex.reason === "invasiveness");
    check("(b) light on labs + low limit: the package is the ledger alone", ids(r.layers).join(",") === "ledger", ids(r.layers).join(","));
    var row = r.rows.filter(function (x) { return x.id === "ledger"; })[0];
    check("(b) light on labs + low limit: ledger fit is 28/8 = 3.5", row.fit.num === 28 && row.fit.den === 8 && approx(row.fit.value, 3.5));
  })();

  // ---------- (c) "Actually slows AI development" plus must be available now. Real data. ----------
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness"], availableNow: true });
    var flex = layer(r, "flexhegs");
    check("(c) slows AI + available now: FlexHEGs are not removed", !!flex);
    check("(c) slows AI + available now: FlexHEGs sit in the 'Start preparing now' lane", flex && flex.lane === "prepare");
    check("(c) slows AI + available now: FlexHEGs carry their first steps",
      flex && flex.steps.first.length > 0 && flex.steps.first.join("|") === DATA.interventions.filter(function (i) { return i.id === "flexhegs"; })[0].firstSteps.join("|"));
    check("(c) slows AI + available now: the ledger stays on the timeline", layer(r, "ledger") && layer(r, "ledger").lane === "timeline");
    var ledgerRow = r.rows.filter(function (x) { return x.id === "ledger"; })[0];
    check("(c) slows AI + available now: ledger fit is exactly 3.0 and counts as 'at least 3.0'",
      ledgerRow.fit.num === 24 && ledgerRow.fit.den === 8 && ledgerRow.meetsThreshold);
    var chain = B.describeChain(r, DATA);
    var flexChain = chain.filter(function (c) { return c.id === "flexhegs"; })[0];
    check("(c) slows AI + available now: the chain labels FlexHEGs 'Start preparing now'", flexChain && flexChain.label === "Start preparing now");
  })();

  // ---------- (d) choosing FlexHEGs pulls in the ledger as a foundation ----------
  (function () {
    // Real data, dependency rule on its own.
    var resolved = B.resolveDependencies(["flexhegs"], DATA.interventions);
    check("(d) FlexHEGs alone pull in the ledger", resolved.ids.indexOf("ledger") !== -1, resolved.ids.join(","));
    check("(d) FlexHEGs alone pull in inspections", resolved.ids.indexOf("inspections") !== -1);
    check("(d) the ledger is recorded as a foundation for FlexHEGs", resolved.foundationFor.ledger.indexOf("flexhegs") !== -1);

    // Real data, full package: wherever FlexHEGs appear, the ledger does too, placed first.
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness", "verifiability"] });
    check("(d) a package with FlexHEGs has the ledger first", ids(r.layers)[0] === "ledger" && ids(r.layers).indexOf("flexhegs") !== -1, ids(r.layers).join(","));
    check("(d) the ledger layer lists FlexHEGs among what it supports", layer(r, "ledger").foundationFor.indexOf("flexhegs") !== -1);
    check("(d) the chain labels the ledger 'Foundation'", B.describeChain(r, DATA)[0].label === "Foundation");

    // Synthetic: lower the ledger's scores so that it no longer qualifies on fit.
    // It must still come in, with the role "foundation" and a note saying why.
    var altered = clone(DATA);
    var ledger = altered.interventions.filter(function (i) { return i.id === "ledger"; })[0];
    ["effectiveness", "coverage", "verifiability", "robustness"].forEach(function (k) { ledger.scores[k].score = 1; });
    var s = B.buildPackage(altered, METHOD, { priorities: ["effectiveness"] });
    check("(d) synthetic: a ledger that fails on fit is still added, as a foundation",
      layer(s, "ledger") && layer(s, "ledger").role === "foundation" && s.selected.indexOf("ledger") === -1);
    var notes = B.explain(s, altered, METHOD).notes.join(" ");
    check("(d) synthetic: the note says the ledger is needed as a foundation", /Chip ledger: not selected on fit, but needed as a foundation/.test(notes), notes);
  })();

  // ---------- further checks ----------

  // A constraint excludes a tool that another tool needs. Real data.
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness"], maxInvasiveness: "medium" });
    var insp = layer(r, "inspections");
    check("(e) medium limit: inspections exceed the limit but return as a foundation for FlexHEGs",
      insp && insp.role === "foundation" && insp.withinLimit === false);
    var notes = B.explain(r, DATA, METHOD).notes.join(" ");
    check("(e) medium limit: the explanation says so explicitly", /above your limit on invasiveness for AI labs, but still needed as a foundation/.test(notes), notes);
  })();

  // Settings. Real data.
  (function () {
    var d = B.buildPackage(DATA, METHOD, { setting: "domestic" });
    var a = B.buildPackage(DATA, METHOD, { setting: "allies" });
    var v = B.buildPackage(DATA, METHOD, { setting: "rivals" });
    check("(f) domestic: first steps only", d.layers.every(function (l) { return l.steps.first.length > 0 && l.steps.later.length === 0; }));
    check("(f) allies: first and later steps", a.layers.every(function (l) { return l.steps.first.length > 0 && l.steps.later.length > 0; }));
    check("(f) allies: no note on the other side", a.rivalNotes.length === 0);
    check("(f) rivals: later steps and one trailing-state note per layer",
      v.layers.every(function (l) { return l.steps.later.length > 0; }) && v.rivalNotes.length === v.layers.length);
    var ledgerNote = v.rivalNotes.filter(function (n) { return n.id === "ledger"; })[0];
    var ledgerData = DATA.interventions.filter(function (i) { return i.id === "ledger"; })[0];
    check("(f) rivals: the note repeats the data's trailing-state stance", ledgerNote && ledgerNote.stance === ledgerData.incentives.trailingState.stance);
  })();

  // Orientation and input handling.
  (function () {
    var burden = METHOD.criteria.filter(function (c) { return c.id === "burden"; })[0];
    var eff = METHOD.criteria.filter(function (c) { return c.id === "effectiveness"; })[0];
    check("(g) orientation: burden 4 becomes 2, effectiveness 4 stays 4", B.orientScore(burden, 4) === 2 && B.orientScore(eff, 4) === 4);
    var n = B.normaliseChoices({ priorities: ["effectiveness", "coverage", "verifiability", "robustness", "nonsense", "coverage"] }, METHOD);
    check("(g) at most three priorities are kept, unknown ones dropped", n.priorities.join(",") === "effectiveness,coverage,verifiability", n.priorities.join(","));
  })();

  // Synthetic: nothing reaches 3.0, so the single best is shown and flagged.
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
    check("(h) synthetic: the explanation says no option fits well", /No option fits your priorities well/.test(B.explain(r, altered, METHOD).why.join(" ")));
    var none = B.buildPackage(altered, METHOD, { maxInvasiveness: "low" });
    check("(h) synthetic: when every tool exceeds the limit, the package is empty and says why",
      none.noneWithinLimit && none.layers.length === 0 && /No tool is within your limit/.test(B.explain(none, altered, METHOD).why.join(" ")));
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
      [false, true].forEach(function (now) {
        ["any", "medium", "low"].forEach(function (limit) {
          ["domestic", "allies", "rivals"].forEach(function (setting) {
            count++;
            var choices = { priorities: p, availableNow: now, maxInvasiveness: limit, setting: setting };
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
              if (!l.withinLimit && l.role !== "foundation") { problems.push(JSON.stringify(choices) + ": " + l.id + " exceeds the limit but is not a foundation"); }
              if (now && iv.readiness !== "now" && l.lane !== "prepare") { problems.push(JSON.stringify(choices) + ": " + l.id + " should be in the prepare lane"); }
              if (i > 0 && B.READINESS_ORDER.indexOf(r.layers[i - 1].readiness) > B.READINESS_ORDER.indexOf(l.readiness)) {
                problems.push(JSON.stringify(choices) + ": layers are out of readiness order");
              }
            });
            if (present.length + r.excluded.length !== DATA.interventions.length) { problems.push(JSON.stringify(choices) + ": a tool is neither included nor excluded"); }
            if (!text.priorities || !text.why.length) { problems.push(JSON.stringify(choices) + ": empty explanation"); }
          });
        });
      });
    });
    check("(i) all " + count + " input combinations give a consistent package and explanation", problems.length === 0, problems.slice(0, 3).join(" / "));
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
