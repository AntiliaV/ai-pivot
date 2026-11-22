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

  function row(r, id) { return r.rows.filter(function (x) { return x.id === id; })[0]; }
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
    var expected = { ledger: 20, inspections: 14, evaluations: 17, bandwidth: 18, metering: 19 };
    Object.keys(expected).forEach(function (id) {
      var f = row(r, id).fit;
      check("(a) no priorities: " + id + " fit is " + expected[id] + "/6", f.num === expected[id] && f.den === 6, f.num + "/" + f.den);
    });
    check("(a) no priorities: ledger, bandwidth cap and metering are selected on fit (the cap at exactly 3.0)",
      r.selected.join(",") === "ledger,bandwidth,metering" && row(r, "bandwidth").meetsThreshold, r.selected.join(","));
    check("(a) no priorities: inspections come in as a foundation only", layer(r, "inspections") && layer(r, "inspections").role === "foundation");
    check("(a) no priorities: evaluations are left out on fit",
      !layer(r, "evaluations") && r.excluded.filter(function (e) { return e.id === "evaluations" && e.reason === "fit"; }).length === 1);
    check("(a) no priorities: layers run ledger, metering, inspections, bandwidth cap", ids(r.layers).join(",") === "ledger,metering,inspections,bandwidth", ids(r.layers).join(","));
    check("(a) no priorities: nothing sits in the prepare lane", r.layers.every(function (l) { return l.lane === "timeline"; }));
    var text = B.explain(r, DATA, METHOD);
    check("(a) no priorities: the explanation says every criterion counts equally", /every criterion counts equally/.test(text.priorities), text.priorities);
  })();

  // ---------- (b) "Light on AI labs" plus low maximum invasiveness. Real data. ----------
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["invasiveness"], maxInvasiveness: "low" });
    check("(b) light on labs + low limit: invasiveness has weight 3", r.weights.invasiveness === 3);
    check("(b) light on labs + low limit: ledger, bandwidth cap and metering are selected", r.selected.join(",") === "ledger,bandwidth,metering", r.selected.join(","));
    var ev = r.excluded.filter(function (e) { return e.id === "evaluations"; })[0];
    check("(b) light on labs + low limit: evaluations are excluded for invasiveness", ev && ev.reason === "invasiveness" && ids(r.layers).indexOf("evaluations") === -1);
    var insp = layer(r, "inspections");
    check("(b) light on labs + low limit: inspections exceed the limit but return as a foundation for the bandwidth cap",
      insp && insp.role === "foundation" && insp.withinLimit === false && insp.foundationFor.join(",") === "bandwidth");
    check("(b) light on labs + low limit: layers run ledger, metering, inspections, bandwidth cap", ids(r.layers).join(",") === "ledger,metering,inspections,bandwidth", ids(r.layers).join(","));
    var f = row(r, "ledger").fit;
    check("(b) light on labs + low limit: ledger fit is 28/8 = 3.5", f.num === 28 && f.den === 8 && approx(f.value, 3.5));
    var notes = B.explain(r, DATA, METHOD).notes.join(" ");
    check("(b) light on labs + low limit: the explanation says inspections are above the limit but still needed",
      /Physical chip inspection: above your limit on invasiveness for AI labs, but still needed as a foundation/.test(notes), notes);
  })();

  // ---------- (c) "Actually slows AI development" plus must be available now ----------
  (function () {
    // Real data: all five tools are available now, so nothing moves to the prepare lane.
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness"], availableNow: true });
    check("(c) slows AI + available now (real data): every tool stays on the timeline", r.layers.every(function (l) { return l.lane === "timeline"; }));
    var f = row(r, "ledger");
    check("(c) slows AI + available now: ledger fit is exactly 3.0 and counts as 'at least 3.0'", f.fit.num === 24 && f.fit.den === 8 && f.meetsThreshold);
    check("(c) slows AI + available now: evaluations (fit 25/8) are selected", row(r, "evaluations").fit.num === 25 && ids(r.layers).indexOf("evaluations") !== -1);

    // Synthetic: evaluations made "not yet available". They must not be removed.
    var altered = clone(DATA);
    var ev = tool(altered, "evaluations");
    ev.readiness = "1-3y";
    ev.firstSteps = ["Step one", "Step two"];
    var s = B.buildPackage(altered, METHOD, { priorities: ["effectiveness"], availableNow: true });
    var layerEv = layer(s, "evaluations");
    check("(c) synthetic: a tool that is not available yet is not removed", !!layerEv);
    check("(c) synthetic: it sits in the 'Start preparing now' lane", layerEv && layerEv.lane === "prepare");
    check("(c) synthetic: it carries its first steps", layerEv && layerEv.steps.first.join("|") === "Step one|Step two");
    check("(c) synthetic: the ledger stays on the timeline", layer(s, "ledger") && layer(s, "ledger").lane === "timeline");
    var chain = B.describeChain(s, altered).filter(function (c) { return c.id === "evaluations"; })[0];
    check("(c) synthetic: the chain labels it 'Start preparing now'", chain && chain.label === "Start preparing now");
    var notes = B.explain(s, altered, METHOD).notes.join(" ");
    check("(c) synthetic: the explanation says it is not available yet", /Independent capability evaluation: not available yet/.test(notes), notes);
  })();

  // ---------- (d) choosing the bandwidth cap pulls in inspections, and through them the ledger ----------
  (function () {
    // Real data, dependency rule on its own.
    var resolved = B.resolveDependencies(["bandwidth"], DATA.interventions);
    check("(d) the bandwidth cap alone pulls in inspections", resolved.ids.indexOf("inspections") !== -1, resolved.ids.join(","));
    check("(d) the bandwidth cap alone pulls in the ledger too (through inspections)", resolved.ids.indexOf("ledger") !== -1);
    check("(d) the ledger is recorded as a foundation for inspections", resolved.foundationFor.ledger.indexOf("inspections") !== -1);
    check("(d) inspections are recorded as a foundation for the bandwidth cap", resolved.foundationFor.inspections.indexOf("bandwidth") !== -1);
    var alone = B.resolveDependencies(["metering", "evaluations"], DATA.interventions);
    check("(d) metering and evaluations pull in nothing", alone.ids.join(",") === "metering,evaluations", alone.ids.join(","));

    // Real data, full package: the foundations come first.
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness", "verifiability"] });
    check("(d) a package with the bandwidth cap runs ledger, inspections, bandwidth cap", ids(r.layers).join(",") === "ledger,inspections,bandwidth", ids(r.layers).join(","));
    check("(d) the ledger layer lists inspections among what it supports", layer(r, "ledger").foundationFor.indexOf("inspections") !== -1);
    check("(d) the chain labels the ledger 'Foundation'", B.describeChain(r, DATA)[0].label === "Foundation");

    // Synthetic: lower the ledger's scores so that it no longer qualifies on fit.
    // It must still come in, with the role "foundation" and a note saying why.
    var altered = clone(DATA);
    var ledger = tool(altered, "ledger");
    ["effectiveness", "coverage", "verifiability", "robustness"].forEach(function (k) { ledger.scores[k].score = 1; });
    var s = B.buildPackage(altered, METHOD, { priorities: ["effectiveness"] });
    check("(d) synthetic: a ledger that fails on fit is still added, as a foundation",
      layer(s, "ledger") && layer(s, "ledger").role === "foundation" && s.selected.indexOf("ledger") === -1);
    var notes = B.explain(s, altered, METHOD).notes.join(" ");
    check("(d) synthetic: the note says the ledger is needed as a foundation", /Chip production ledger: not selected on fit, but needed as a foundation/.test(notes), notes);
    check("(d) synthetic: the note gives the reason from the data", notes.indexOf(tool(DATA, "inspections").dependsOnWhy.ledger) !== -1, notes);
  })();

  // ---------- further checks ----------

  // A constraint excludes a tool that another tool needs. Real data.
  (function () {
    var r = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness"], maxInvasiveness: "medium" });
    var insp = layer(r, "inspections");
    check("(e) medium limit: inspections exceed the limit but return as a foundation for the bandwidth cap",
      insp && insp.role === "foundation" && insp.withinLimit === false);
    check("(e) medium limit: evaluations are left out for invasiveness",
      r.excluded.filter(function (e) { return e.id === "evaluations" && e.reason === "invasiveness"; }).length === 1);
    var notes = B.explain(r, DATA, METHOD).notes.join(" ");
    check("(e) medium limit: the explanation says so explicitly", /above your limit on invasiveness for AI labs, but still needed as a foundation/.test(notes), notes);
  })();

  // The other side's stance: one trailing-state note per tool in the package, whatever the choices.
  (function () {
    var plain = B.buildPackage(DATA, METHOD, {});
    var picky = B.buildPackage(DATA, METHOD, { priorities: ["effectiveness", "verifiability"], availableNow: true, maxInvasiveness: "medium" });
    [plain, picky].forEach(function (r, i) {
      var which = i === 0 ? "no choices" : "priorities, available now and a medium limit";
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
    check("(g) orientation: burden 4 becomes 2, effectiveness 4 stays 4", B.orientScore(burden, 4) === 2 && B.orientScore(eff, 4) === 4);
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
          {
            count++;
            var choices = { priorities: p, availableNow: now, maxInvasiveness: limit };
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
            if (r.rivalNotes.length !== r.layers.length) { problems.push(JSON.stringify(choices) + ": a tool has no note on the other side"); }
          }
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
