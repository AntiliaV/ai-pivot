// Pacing explorer: package-builder logic.
//
// Pure functions only: nothing here touches the page. The same file runs in the
// browser (as window.PacingBuilder) and in Node (for js/builder.tests.js).
//
// The rules, in order (also shown to users under "How this was worked out"):
//   1. Weights      every criterion counts 1; each criterion the user picked counts 3.
//   2. Orientation  burden and invasiveness are used as 6 - score, so higher is always better.
//   3. Fit          fit = sum(weight x oriented score) / sum(weights), on a 1 to 5 scale.
//   4. Constraints  the invasiveness ceiling applies to each candidate together with its
//                   full chain of supporting measures (dependsOn, followed recursively).
//                   If any tool in that chain is above the ceiling, the candidate is left
//                   out, and the explanation names the supporting measure that caused it.
//   5. Selection    every remaining tool with fit >= 3.0 is included. If none
//                   qualifies, the single best remaining tool is included, with a note
//                   that it falls short. If no tool remains, there is no package.
//   6. Dependencies anything an included tool depends on is added as a supporting
//                   measure. By rule 4, it is never above the ceiling.
//   7. Layout       layers are ordered with supporting measures first, then in card order.
//   8. Other side   for each tool in the package, the trailing state's expected stance
//                   and reason are listed (always, whatever the other choices).
//   9. Wording      the explanation is generated from templates and the scores only.
//
// The numbers (1, 3, 3.0, the invasiveness limits) live in data/method.js.

(function (root) {
  "use strict";

  // ---------- small helpers ----------

  function byId(interventions) {
    var map = {};
    interventions.forEach(function (iv) { map[iv.id] = iv; });
    return map;
  }

  function criterionById(method, id) {
    for (var i = 0; i < method.criteria.length; i++) {
      if (method.criteria[i].id === id) { return method.criteria[i]; }
    }
    return null;
  }

  function joinList(items) {
    if (items.length === 0) { return ""; }
    if (items.length === 1) { return items[0]; }
    return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
  }

  // "Chip production ledger" -> "the chip production ledger", for use inside a sentence.
  function inText(iv) { return "the " + iv.name.charAt(0).toLowerCase() + iv.name.slice(1); }

  function formatFit(fit) { return fit.value.toFixed(2); }

  // ---------- rules 1 to 3: weights, orientation, fit ----------

  function computeWeights(priorities, method) {
    var weights = {};
    method.criteria.forEach(function (c) {
      weights[c.id] = priorities.indexOf(c.id) !== -1 ? method.builder.pickedWeight : method.builder.baseWeight;
    });
    return weights;
  }

  // Higher is always better after orientation.
  function orientScore(criterion, score) {
    return criterion.kind === "cost" ? 6 - score : score;
  }

  function wordFor(criterion, score, method) {
    return method.words[criterion.kind][score - 1];
  }

  function computeFit(intervention, weights, method) {
    var num = 0;
    var den = 0;
    var terms = method.criteria.map(function (c) {
      var raw = intervention.scores[c.id].score;
      var oriented = orientScore(c, raw);
      var weight = weights[c.id];
      num += weight * oriented;
      den += weight;
      return { id: c.id, weight: weight, raw: raw, oriented: oriented, product: weight * oriented };
    });
    return { num: num, den: den, value: num / den, terms: terms };
  }

  // Compared as whole numbers (num >= threshold x den) so 3.0 means exactly 3.0.
  function meetsThreshold(fit, method) {
    return fit.num >= method.builder.threshold * fit.den - 1e-9;
  }

  // ---------- rule 4: constraints ----------

  function withinInvasivenessLimit(intervention, maxInvasiveness, method) {
    var limit = method.builder.invasivenessLimits[maxInvasiveness];
    if (typeof limit !== "number") { limit = 5; }
    return intervention.scores.invasiveness.score <= limit;
  }

  // Every supporting measure a tool requires, directly or through another supporting
  // measure (dependsOn, followed recursively), nearest first. The tool itself is not included.
  function supportChain(id, map) {
    var chain = [];
    var queue = ((map[id] && map[id].dependsOn) || []).slice();
    while (queue.length) {
      var dep = queue.shift();
      if (dep === id || chain.indexOf(dep) !== -1 || !map[dep]) { continue; }
      chain.push(dep);
      (map[dep].dependsOn || []).forEach(function (next) { queue.push(next); });
    }
    return chain;
  }

  // ---------- rule 6: dependencies ----------

  // Returns every id in the package (the selected ids plus everything they
  // depend on, directly or indirectly) and, for each id, who depends on it.
  function resolveDependencies(selectedIds, interventions) {
    var map = byId(interventions);
    var ids = [];
    var supportFor = {};
    var queue = selectedIds.slice();
    while (queue.length) {
      var id = queue.shift();
      if (ids.indexOf(id) !== -1 || !map[id]) { continue; }
      ids.push(id);
      (map[id].dependsOn || []).forEach(function (dep) { queue.push(dep); });
    }
    ids.forEach(function (id) { supportFor[id] = []; });
    ids.forEach(function (id) {
      (map[id].dependsOn || []).forEach(function (dep) {
        if (supportFor[dep] && supportFor[dep].indexOf(id) === -1) { supportFor[dep].push(id); }
      });
    });
    return { ids: ids, supportFor: supportFor };
  }

  // 0 for a tool that depends on nothing, 1 for a tool that depends only on
  // such tools, and so on. Used to put supporting measures first.
  function dependencyDepth(id, map, seen) {
    seen = seen || [];
    if (seen.indexOf(id) !== -1 || !map[id]) { return 0; }
    var deps = map[id].dependsOn || [];
    if (!deps.length) { return 0; }
    var deepest = 0;
    deps.forEach(function (dep) {
      deepest = Math.max(deepest, dependencyDepth(dep, map, seen.concat([id])));
    });
    return deepest + 1;
  }

  // ---------- rules 4 to 8 together ----------

  function normaliseChoices(choices, method) {
    choices = choices || {};
    var valid = method.criteria.map(function (c) { return c.id; });
    var priorities = [];
    (choices.priorities || []).forEach(function (p) {
      if (valid.indexOf(p) !== -1 && priorities.indexOf(p) === -1 && priorities.length < method.builder.maxPicks) {
        priorities.push(p);
      }
    });
    return {
      priorities: priorities,
      maxInvasiveness: method.builder.invasivenessLimits.hasOwnProperty(choices.maxInvasiveness) ? choices.maxInvasiveness : "any"
    };
  }

  function buildPackage(data, method, rawChoices) {
    var choices = normaliseChoices(rawChoices, method);
    var interventions = data.interventions;
    var map = byId(interventions);
    var weights = computeWeights(choices.priorities, method);

    // One row per tool: its fit and whether it passes each test. Rule 4 looks at the
    // tool and at its whole chain of supporting measures.
    var rows = interventions.map(function (iv) {
      var fit = computeFit(iv, weights, method);
      var withinLimit = withinInvasivenessLimit(iv, choices.maxInvasiveness, method);
      var chain = supportChain(iv.id, map);
      var blockedBy = chain.filter(function (dep) { return !withinInvasivenessLimit(map[dep], choices.maxInvasiveness, method); });
      var feasible = withinLimit && blockedBy.length === 0;
      var meets = meetsThreshold(fit, method);
      return {
        id: iv.id, fit: fit, withinLimit: withinLimit, supportChain: chain, blockedBy: blockedBy,
        feasible: feasible, meetsThreshold: meets, qualifies: feasible && meets
      };
    });
    var rowById = {};
    rows.forEach(function (r) { rowById[r.id] = r; });

    // Rule 5: selection.
    var selected = rows.filter(function (r) { return r.qualifies; }).map(function (r) { return r.id; });
    var noneQualify = false;
    var noneWithinLimit = false;
    if (!selected.length) {
      var candidates = rows.filter(function (r) { return r.feasible; });
      if (candidates.length) {
        var best = candidates[0];
        candidates.forEach(function (r) { if (r.fit.value > best.fit.value) { best = r; } });
        selected = [best.id];
        noneQualify = true;
      } else {
        noneWithinLimit = true;
      }
    }

    // Rule 6: dependencies.
    var resolved = resolveDependencies(selected, interventions);

    // Rule 7 (order); first steps are an optional field (the data has none yet).
    var layers = resolved.ids.map(function (id) {
      var iv = map[id];
      var isSelected = selected.indexOf(id) !== -1;
      return {
        id: id,
        role: isSelected ? (noneQualify ? "closest" : "fit") : "supporting",
        supportFor: resolved.supportFor[id],
        withinLimit: rowById[id].withinLimit,
        fit: rowById[id].fit,
        steps: { first: (iv.firstSteps || []).slice() }
      };
    });
    layers.sort(function (a, b) {
      var da = dependencyDepth(a.id, map);
      var db = dependencyDepth(b.id, map);
      if (da !== db) { return da - db; }
      return interventions.indexOf(map[a.id]) - interventions.indexOf(map[b.id]);
    });

    var excluded = rows.filter(function (r) { return resolved.ids.indexOf(r.id) === -1; }).map(function (r) {
      var reason = !r.withinLimit ? "invasiveness" : r.blockedBy.length ? "supportingMeasure" : "fit";
      return { id: r.id, reason: reason, blockedBy: r.blockedBy.slice(), meetsThreshold: r.meetsThreshold, fit: r.fit };
    });

    // Rule 8: the trailing state's stance and reason, for each tool in the package.
    var rivalNotes = layers.map(function (layer) {
      return { id: layer.id, stances: map[layer.id].stances.trailingState, note: map[layer.id].why.trailingState };
    });

    return {
      choices: choices,
      weights: weights,
      rows: rows,
      selected: selected,
      layers: layers,
      excluded: excluded,
      noneQualify: noneQualify,
      noneWithinLimit: noneWithinLimit,
      rivalNotes: rivalNotes
    };
  }

  // ---------- the one-line chain ("Supporting measure: chip ledger -> ...") ----------

  function layerLabel(layer, map) {
    var hasDeps = (map[layer.id].dependsOn || []).length > 0;
    if (layer.role === "supporting" || (layer.supportFor.length && !hasDeps)) { return "Supporting measure"; }
    return layer.role === "closest" ? "Closest fit" : "Selected";
  }

  function describeChain(result, data) {
    var map = byId(data.interventions);
    return result.layers.map(function (layer) {
      return { id: layer.id, label: layerLabel(layer, map), name: map[layer.id].name };
    });
  }

  // ---------- rule 9: wording ----------

  // Every sentence below is built from the user's choices and the scores.
  // Nothing is asserted that the data does not contain.
  function explain(result, data, method) {
    var map = byId(data.interventions);
    var choices = result.choices;
    var threshold = method.builder.threshold.toFixed(1);
    var out = { priorities: "", why: [], givesUp: "", notes: [] };

    // Sentence 1: what the user asked for.
    if (!choices.priorities.length) {
      out.priorities = "No priority was selected, so every criterion counts equally.";
    } else {
      var phrases = choices.priorities.map(function (p) { return criterionById(method, p).phrase; });
      var ratio = method.builder.pickedWeight / method.builder.baseWeight;
      out.priorities = "The selected priorities are " + joinList(phrases) + ". " +
        (phrases.length === 1 ? "It counts " : "Each counts ") + ratio + " times as much as the other criteria.";
    }

    if (result.noneWithinLimit) {
      out.why.push("No tool, together with its supporting measures, is within the limit on invasiveness for AI labs, so there is no package to show. A higher limit shows more options.");
      return out;
    }

    // Sentence 2: why these tools.
    if (result.noneQualify) {
      var closest = map[result.selected[0]];
      out.why.push("No option fits the priorities well: none reaches an overall fit of " + threshold +
        " out of 5. The closest is " + inText(closest) + ", shown here.");
    } else if (!choices.priorities.length) {
      out.why.push("Each tool shown either has an overall fit of at least " + threshold +
        " out of 5, or is needed as a supporting measure for one that does.");
    } else {
      // Group the picked priorities by the part of the package that is best on each.
      var groups = [];
      choices.priorities.forEach(function (p) {
        var c = criterionById(method, p);
        var bestLayer = null;
        var bestOriented = 0;
        result.layers.forEach(function (layer) {
          var o = orientScore(c, map[layer.id].scores[p].score);
          if (o > bestOriented) { bestOriented = o; bestLayer = layer; }
        });
        var word = wordFor(c, map[bestLayer.id].scores[p].score, method);
        var key = bestOriented <= 2 ? "none" : bestLayer.id;
        var group = groups.filter(function (g) { return g.key === key; })[0];
        if (!group) { group = { key: key, phrases: [], words: [] }; groups.push(group); }
        group.phrases.push(c.phrase);
        group.words.push(word);
      });
      var clauses = groups.map(function (g, index) {
        var same = g.words.every(function (w) { return w === g.words[0]; });
        var rating = g.words.length === 1 ? g.words[0]
          : same ? g.words[0] + " on each"
          : joinList(g.words) + ", in that order";
        if (g.key === "none") {
          return (index === 0 ? "For " : "for ") + joinList(g.phrases) + ", no part of this package is rated better than " + rating;
        }
        return (index === 0 ? "For " + joinList(g.phrases) + ", this package relies most on " : "for " + joinList(g.phrases) + ", on ") +
          inText(map[g.key]) + " (rated " + rating + ")";
      });
      out.why.push(clauses.join("; ") + ".");

      // Optional pairing sentence: a selected tool is weak on a priority that
      // another part of the package is strong on. Benefits only: costs add up,
      // they are not offset by pairing.
      var pairing = null;
      result.layers.forEach(function (layer) {
        if (pairing || layer.role !== "fit") { return; }
        choices.priorities.forEach(function (p) {
          var c = criterionById(method, p);
          if (pairing || c.kind !== "benefit") { return; }
          if (map[layer.id].scores[p].score > 2) { return; }
          var partner = null;
          result.layers.forEach(function (other) {
            if (!partner && other.id !== layer.id && map[other.id].scores[p].score >= 4) { partner = other; }
          });
          if (partner) {
            pairing = "Alone, " + inText(map[layer.id]) + " would do little on " + c.phrase +
              ", so the package adds " + inText(map[partner.id]) + " for that.";
          }
        });
      });
      if (pairing) { out.why.push(pairing); }
    }

    // Sentence 3: what the package gives up.
    var lowAlways = [];
    var heavy = [];
    method.criteria.forEach(function (c) {
      if (c.kind === "benefit") {
        var bestAll = 0;
        result.layers.forEach(function (l) { bestAll = Math.max(bestAll, map[l.id].scores[c.id].score); });
        if (bestAll <= 2) { lowAlways.push(c.phrase); }
      } else {
        var heavyParts = result.layers.filter(function (l) { return map[l.id].scores[c.id].score >= 4; });
        if (heavyParts.length) {
          heavy.push("heavy " + (c.costPhrase || c.label) + " (from " +
            joinList(heavyParts.map(function (l) { return inText(map[l.id]); })) + ")");
        }
      }
    });
    var parts = [];
    if (lowAlways.length) { parts.push("no part of it is rated above Low on " + joinList(lowAlways)); }
    if (heavy.length) { parts.push("it accepts " + joinList(heavy)); }
    out.givesUp = parts.length
      ? "What it gives up: " + parts.join("; ") + "."
      : "What it gives up: little on these scores. No criterion is rated Low for the package as a whole, and no part is rated Heavy.";

    // Notes: one per tool that needs a word of explanation.
    result.layers.forEach(function (layer) {
      var iv = map[layer.id];
      if (layer.role === "supporting") {
        var reasons = layer.supportFor.map(function (depId) {
          var dependent = map[depId];
          return (dependent.dependsOnWhy && dependent.dependsOnWhy[layer.id]) ||
            (dependent.name + " cannot work without it.");
        });
        out.notes.push(iv.name + ": not selected on fit, but needed as a supporting measure. " + reasons.join(" "));
      }
    });
    var inv = criterionById(method, "invasiveness");
    result.excluded.forEach(function (ex) {
      var iv = map[ex.id];
      if (ex.reason === "invasiveness") {
        out.notes.push(iv.name + ": left out. Invasiveness for AI labs (" +
          wordFor(inv, iv.scores.invasiveness.score, method) + ") is above the limit.");
      } else if (ex.reason === "supportingMeasure") {
        var named = ex.blockedBy.map(function (id) {
          return map[id].name + " (" + wordFor(inv, map[id].scores.invasiveness.score, method) + ")";
        });
        var sentence = ex.blockedBy.length === 1
          ? iv.name + " is left out: its supporting measure, " + map[ex.blockedBy[0]].name +
            ", is above the invasiveness limit (" + wordFor(inv, map[ex.blockedBy[0]].scores.invasiveness.score, method) + ")."
          : iv.name + " is left out: its supporting measures, " + joinList(named) + ", are above the invasiveness limit.";
        if (!ex.meetsThreshold) { sentence += " Its overall fit with the priorities is also below " + threshold + " out of 5."; }
        out.notes.push(sentence);
      } else {
        out.notes.push(iv.name + ": left out. Overall fit with the priorities is below " + threshold + " out of 5.");
      }
    });

    return out;
  }

  var api = {
    computeWeights: computeWeights,
    orientScore: orientScore,
    wordFor: wordFor,
    computeFit: computeFit,
    meetsThreshold: meetsThreshold,
    withinInvasivenessLimit: withinInvasivenessLimit,
    supportChain: supportChain,
    resolveDependencies: resolveDependencies,
    dependencyDepth: dependencyDepth,
    normaliseChoices: normaliseChoices,
    buildPackage: buildPackage,
    describeChain: describeChain,
    explain: explain,
    formatFit: formatFit,
    joinList: joinList
  };

  root.PacingBuilder = api;
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})(typeof window !== "undefined" ? window : globalThis);
