// Pacing explorer: the trade-off map, drawn as hand-written SVG.
// No libraries. Colours and type come from css/style.css (classes below).
//
// Usage: var chart = PacingChart.create(container, options); chart.render();
// options:
//   interventions   array from data/interventions.js
//   scoresFor(iv)   the score set to plot (default: iv.scores)
//   xKey, yKey      which score goes on each axis
//   xTitle, yTitle  axis titles
//   xWords, yWords  words for scores 1 to 5 (shown at 1, 3 and 5)
//   label           accessible name of the whole map
//   href(iv)        where a tool's label links to
//   ariaLabel(iv)   accessible name of a tool's link
//
// Tools with the same scores share one marker. Their labels are stacked next to it,
// each a link of its own. The marker is never moved off its true position.

(function (root) {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  function svg(name, attrs, text) {
    var node = document.createElementNS(NS, name);
    if (attrs) { Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); }); }
    if (text !== undefined && text !== null) { node.textContent = text; }
    return node;
  }

  function overlaps(a, b) {
    return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
  }

  // Split a long label into two balanced lines.
  function wrapLabel(text, maxChars) {
    if (text.length <= maxChars || text.indexOf(" ") === -1) { return [text]; }
    var words = text.split(" ");
    var best = null;
    for (var i = 1; i < words.length; i++) {
      var a = words.slice(0, i).join(" ");
      var b = words.slice(i).join(" ");
      var longest = Math.max(a.length, b.length);
      if (!best || longest < best.longest) { best = { longest: longest, lines: [a, b] }; }
    }
    return best.lines;
  }

  function create(container, opts) {
    var scoresFor = opts.scoresFor || function (iv) { return iv.scores; };
    var geom = null;
    var lastWidth = 0;

    function geometry() {
      var width = Math.max(288, Math.min(container.clientWidth || 640, 780));
      var narrow = width < 520;
      var g = {
        width: width,
        narrow: narrow,
        height: narrow ? Math.round(width * 1.05) : Math.round(width * 0.62),
        left: narrow ? 62 : 80,
        right: narrow ? 10 : 20,
        top: 34,
        bottom: 58,
        font: narrow ? 13 : 14
      };
      g.x0 = g.left;
      g.y0 = g.top;
      g.w = width - g.left - g.right;
      g.h = g.height - g.top - g.bottom;
      // Scores 1 to 5 sit inside the plot with half a step of padding.
      g.sx = function (v) { return g.x0 + ((v - 0.5) / 5) * g.w; };
      g.sy = function (v) { return g.y0 + g.h - ((v - 0.5) / 5) * g.h; };
      return g;
    }

    function drawFrame(rootSvg, g) {
      var frame = svg("g", { "aria-hidden": "true" });
      frame.appendChild(svg("rect", { x: g.x0, y: g.y0, width: g.w, height: g.h, class: "plot-bg" }));
      for (var v = 1; v <= 5; v++) {
        var cls = v === 3 ? "grid mid" : "grid";
        frame.appendChild(svg("line", { x1: g.sx(v), x2: g.sx(v), y1: g.y0, y2: g.y0 + g.h, class: cls }));
        frame.appendChild(svg("line", { x1: g.x0, x2: g.x0 + g.w, y1: g.sy(v), y2: g.sy(v), class: cls }));
      }
      frame.appendChild(svg("rect", { x: g.x0, y: g.y0, width: g.w, height: g.h, class: "plot-frame" }));

      // Tick words at scores 1, 3 and 5.
      [1, 3, 5].forEach(function (t) {
        frame.appendChild(svg("text", { x: g.sx(t), y: g.y0 + g.h + 18, class: "tick", "text-anchor": "middle" }, opts.xWords[t - 1]));
        frame.appendChild(svg("text", { x: g.x0 - 8, y: g.sy(t) + 4, class: "tick", "text-anchor": "end" }, opts.yWords[t - 1]));
      });

      // Axis titles, both horizontal so they stay readable on a phone.
      frame.appendChild(svg("text", { x: 2, y: 16, class: "axis-title" }, "↑ " + opts.yTitle));
      frame.appendChild(svg("text", { x: g.x0 + g.w, y: g.y0 + g.h + 42, class: "axis-title", "text-anchor": "end" }, opts.xTitle + " →"));
      rootSvg.appendChild(frame);
    }

    // Tools with the same pair of scores form one group, drawn at one marker.
    function groupsOf(g) {
      var byKey = {};
      var groups = [];
      opts.interventions.forEach(function (iv) {
        var s = scoresFor(iv);
        var key = s[opts.xKey].score + "," + s[opts.yKey].score;
        if (!byKey[key]) {
          byKey[key] = { x: g.sx(s[opts.xKey].score), y: g.sy(s[opts.yKey].score), members: [] };
          groups.push(byKey[key]);
        }
        byKey[key].members.push(iv);
      });
      return groups;
    }

    // Greedy label placement: right, left, above, below; first spot that is inside
    // the plot and clear of other labels and markers. A group's labels move as a block.
    function placeLabels(groups, g) {
      var taken = [];
      groups.forEach(function (grp) { taken.push({ x1: grp.x - 12, x2: grp.x + 12, y1: grp.y - 12, y2: grp.y + 12, owner: grp }); });
      var lineH = g.font + 4;
      var minX = g.x0 + 3;
      var maxX = g.x0 + g.w - 3;
      groups.forEach(function (grp) {
        var tools = grp.members.map(function (iv) {
          var lines = wrapLabel(iv.name, g.narrow ? 14 : 30);
          var w = 0;
          lines.forEach(function (l) { w = Math.max(w, l.length * g.font * 0.58); });
          return { iv: iv, lines: lines, w: w, h: lines.length * lineH };
        });
        var w = Math.max.apply(null, tools.map(function (t) { return t.w; }));
        var h = tools.reduce(function (sum, t) { return sum + t.h; }, 0) + (tools.length - 1) * 4;
        function centred(top) {
          var cx = Math.min(Math.max(grp.x, minX + w / 2), maxX - w / 2);
          return { anchor: "middle", x: cx, x1: cx - w / 2, x2: cx + w / 2, y1: top, y2: top + h };
        }
        var options = [
          { anchor: "start", x: grp.x + 16, x1: grp.x + 16, x2: grp.x + 16 + w, y1: grp.y - h / 2, y2: grp.y + h / 2 },
          { anchor: "end", x: grp.x - 16, x1: grp.x - 16 - w, x2: grp.x - 16, y1: grp.y - h / 2, y2: grp.y + h / 2 },
          centred(grp.y - 15 - h),
          centred(grp.y + 15)
        ];
        var chosen = null;
        options.forEach(function (o) {
          if (chosen) { return; }
          if (o.x1 < minX - 1 || o.x2 > maxX + 1 || o.y1 < g.y0 + 2 || o.y2 > g.y0 + g.h - 2) { return; }
          var clash = taken.some(function (t) { return t.owner !== grp && overlaps(o, t); });
          if (!clash) { chosen = o; }
        });
        if (!chosen) { chosen = options[0]; }
        taken.push({ x1: chosen.x1, x2: chosen.x2, y1: chosen.y1, y2: chosen.y2, owner: grp });
        // Stack the tools' labels from the top of the block.
        var top = chosen.y1;
        tools.forEach(function (t) {
          t.top = top;
          top += t.h + 4;
        });
        grp.label = { anchor: chosen.anchor, x: chosen.x, tools: tools, lineH: lineH };
      });
    }

    function drawGroup(rootSvg, grp, g) {
      var single = grp.members.length === 1;
      if (!single) {
        // One marker for all of them, drawn first so the labels sit on top.
        var marker = svg("g", { "aria-hidden": "true", transform: "translate(" + grp.x + "," + grp.y + ")" });
        marker.appendChild(svg("circle", { r: 8, class: "dot-mark" }));
        rootSvg.appendChild(marker);
      }
      grp.label.tools.forEach(function (t) {
        var link = svg("a", { href: opts.href(t.iv), class: "dot", "aria-label": opts.ariaLabel(t.iv) });
        if (single) {
          var at = svg("g", { transform: "translate(" + grp.x + "," + grp.y + ")" });
          at.appendChild(svg("circle", { r: 22, class: "dot-hit" }));
          at.appendChild(svg("circle", { r: 15, class: "dot-focus" }));
          at.appendChild(svg("circle", { r: 8, class: "dot-mark" }));
          link.appendChild(at);
        }
        var pad = 4;
        var x1 = grp.label.anchor === "start" ? grp.label.x : grp.label.anchor === "end" ? grp.label.x - t.w : grp.label.x - t.w / 2;
        link.appendChild(svg("rect", { x: x1 - pad, y: t.top - pad / 2, width: t.w + 2 * pad, height: t.h + pad, rx: 4, class: "label-hit" }));
        var text = svg("text", { class: "dot-text", "text-anchor": grp.label.anchor });
        t.lines.forEach(function (line, i) {
          text.appendChild(svg("tspan", { x: grp.label.x, y: t.top + (i + 1) * grp.label.lineH - 5, class: "dot-label" }, line));
        });
        link.appendChild(text);
        rootSvg.appendChild(link);
      });
    }

    function render() {
      container.textContent = "";
      geom = geometry();
      lastWidth = container.clientWidth;
      var g = geom;
      var rootSvg = svg("svg", {
        viewBox: "0 0 " + g.width + " " + g.height,
        width: g.width,
        height: g.height,
        role: "group",
        "aria-label": opts.label,
        class: "map-svg"
      });
      drawFrame(rootSvg, g);
      var groups = groupsOf(g);
      placeLabels(groups, g);
      groups.forEach(function (grp) { drawGroup(rootSvg, grp, g); });
      container.appendChild(rootSvg);
    }

    // Redraw if the container has changed width (phone turned, window resized).
    function update() {
      if (!geom || container.clientWidth !== lastWidth) { render(); }
    }

    return { render: render, update: update };
  }

  root.PacingChart = { create: create };
})(window);
