// Pacing explorer: the trade-off map, drawn as hand-written SVG.
// No libraries. Colours and type come from css/style.css (classes below).
//
// Usage: var chart = PacingChart.create(container, options); chart.update();
// options:
//   interventions   array from data/interventions.js
//   xKey, yKey      which score goes on each axis
//   xTitle, yTitle, ySubtitle, xWords, yWords (words for scores 1 to 5)
//   quadrants       { topLeft, topRight, bottomLeft, bottomRight }
//   scoresFor(iv)   the score set to plot (mature or today)
//   stateLabel(iv)  optional second label line, e.g. "once mature"
//   otherScoresFor(iv)  optional: the other score set, drawn as a faint ghost
//   ariaLabel(iv), href(iv), showNumeric
//   onEnter(element, iv), onLeave()   for the tooltip

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
    var refs = {};      // id -> { link, label, mark }
    var extras = null;  // group holding ghosts and connectors
    var geom = null;
    var lastWidth = 0;

    function geometry() {
      var width = Math.max(288, Math.min(container.clientWidth || 640, 780));
      var narrow = width < 520;
      var g = {
        width: width,
        narrow: narrow,
        height: narrow ? Math.round(width * 1.0) : Math.round(width * 0.6),
        left: narrow ? 58 : 76,
        right: narrow ? 10 : 20,
        top: 52,
        bottom: 58,
        font: narrow ? 13 : 14,
        small: 12
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

      // Tick words: always words, numbers only if the display flag is on.
      [1, 2, 3, 4, 5].forEach(function (t) {
        var isWordTick = t === 1 || t === 3 || t === 5;
        var xLabel = isWordTick ? opts.xWords[t - 1] : "";
        var yLabel = isWordTick ? opts.yWords[t - 1] : "";
        if (opts.showNumeric) {
          xLabel = xLabel ? t + " " + xLabel : String(t);
          yLabel = yLabel ? yLabel + " " + t : String(t);
        }
        if (xLabel) { frame.appendChild(svg("text", { x: g.sx(t), y: g.y0 + g.h + 18, class: "tick", "text-anchor": "middle" }, xLabel)); }
        if (yLabel) { frame.appendChild(svg("text", { x: g.x0 - 8, y: g.sy(t) + 4, class: "tick", "text-anchor": "end" }, yLabel)); }
      });

      // Axis titles, both horizontal so they stay readable on a phone.
      frame.appendChild(svg("text", { x: 2, y: 16, class: "axis-title" }, "↑ " + opts.yTitle));
      frame.appendChild(svg("text", { x: 2, y: 33, class: "axis-sub" }, opts.ySubtitle));
      frame.appendChild(svg("text", { x: g.x0 + g.w, y: g.y0 + g.h + 42, class: "axis-title", "text-anchor": "end" }, opts.xTitle + " →"));

      // Quiet corner labels.
      var q = opts.quadrants;
      frame.appendChild(svg("text", { x: g.x0 + 8, y: g.y0 + 18, class: "quad" }, q.topLeft));
      frame.appendChild(svg("text", { x: g.x0 + g.w - 8, y: g.y0 + 18, class: "quad", "text-anchor": "end" }, q.topRight));
      frame.appendChild(svg("text", { x: g.x0 + 8, y: g.y0 + g.h - 9, class: "quad" }, q.bottomLeft));
      frame.appendChild(svg("text", { x: g.x0 + g.w - 8, y: g.y0 + g.h - 9, class: "quad", "text-anchor": "end" }, q.bottomRight));
      rootSvg.appendChild(frame);

      // Boxes the dot labels must keep clear of.
      var charW = g.small * 0.56;
      function box(text, x, y, anchorEnd) {
        var w = text.length * charW;
        return anchorEnd ? { x1: x - w, x2: x, y1: y - 13, y2: y + 4 } : { x1: x, x2: x + w, y1: y - 13, y2: y + 4 };
      }
      g.obstacles = [
        box(q.topLeft, g.x0 + 8, g.y0 + 18, false),
        box(q.topRight, g.x0 + g.w - 8, g.y0 + 18, true),
        box(q.bottomLeft, g.x0 + 8, g.y0 + g.h - 9, false),
        box(q.bottomRight, g.x0 + g.w - 8, g.y0 + g.h - 9, true)
      ];
    }

    // Where each dot goes. Dots that share a position are spread side by side.
    function positions(g) {
      var groups = {};
      var list = opts.interventions.map(function (iv) {
        var s = opts.scoresFor(iv);
        var key = s[opts.xKey].score + "," + s[opts.yKey].score;
        (groups[key] = groups[key] || []).push(iv.id);
        return { iv: iv, key: key, x: g.sx(s[opts.xKey].score), y: g.sy(s[opts.yKey].score) };
      });
      list.forEach(function (p) {
        var members = groups[p.key];
        if (members.length > 1) { p.x += (members.indexOf(p.iv.id) - (members.length - 1) / 2) * 24; }
      });
      return list;
    }

    // Greedy label placement: above, below, right, left; first spot that is
    // inside the plot and clear of other labels, dots and corner labels.
    function placeLabels(list, g) {
      var taken = g.obstacles.slice();
      list.forEach(function (p) { taken.push({ x1: p.x - 12, x2: p.x + 12, y1: p.y - 12, y2: p.y + 12, owner: p.iv.id }); });
      // The faint ring and connector that show a tool's other position.
      list.forEach(function (p) {
        var other = opts.otherScoresFor ? opts.otherScoresFor(p.iv) : null;
        if (!other) { return; }
        var ox = g.sx(other[opts.xKey].score);
        var oy = g.sy(other[opts.yKey].score);
        taken.push({ x1: Math.min(p.x, ox) - 4, x2: Math.max(p.x, ox) + 4, y1: Math.min(p.y, oy) - 4, y2: Math.max(p.y, oy) + 4 });
      });
      var lineH = g.font + 3;
      list.forEach(function (p) {
        var lines = wrapLabel(p.iv.name, g.narrow ? 14 : 28).map(function (t) { return { text: t, cls: "dot-label" }; });
        var extra = opts.stateLabel ? opts.stateLabel(p.iv) : "";
        if (extra) { lines.push({ text: extra, cls: "dot-sub" }); }
        var w = 0;
        lines.forEach(function (l) { w = Math.max(w, l.text.length * g.font * 0.57); });
        var h = lines.length * lineH;
        var minX = g.x0 + 3;
        var maxX = g.x0 + g.w - 3;
        function centred(top) {
          var cx = Math.min(Math.max(p.x, minX + w / 2), maxX - w / 2);
          return { anchor: "middle", x: cx, x1: cx - w / 2, x2: cx + w / 2, y1: top, y2: top + h };
        }
        var options = [
          centred(p.y - 15 - h),
          centred(p.y + 15),
          { anchor: "start", x: p.x + 16, x1: p.x + 16, x2: p.x + 16 + w, y1: p.y - h / 2, y2: p.y + h / 2 },
          { anchor: "end", x: p.x - 16, x1: p.x - 16 - w, x2: p.x - 16, y1: p.y - h / 2, y2: p.y + h / 2 }
        ];
        var chosen = null;
        options.forEach(function (o) {
          if (chosen) { return; }
          if (o.x1 < minX - 1 || o.x2 > maxX + 1 || o.y1 < g.y0 + 2 || o.y2 > g.y0 + g.h - 2) { return; }
          var clash = taken.some(function (t) { return t.owner !== p.iv.id && overlaps(o, t); });
          if (!clash) { chosen = o; }
        });
        if (!chosen) { chosen = options[0]; }
        taken.push({ x1: chosen.x1, x2: chosen.x2, y1: chosen.y1, y2: chosen.y2, owner: p.iv.id });
        p.label = { anchor: chosen.anchor, x: chosen.x, top: chosen.y1, lines: lines, lineH: lineH };
      });
    }

    function drawLabel(textNode, p) {
      while (textNode.firstChild) { textNode.removeChild(textNode.firstChild); }
      textNode.setAttribute("text-anchor", p.label.anchor);
      p.label.lines.forEach(function (line, i) {
        // Coordinates are relative to the dot, because the whole link is translated.
        textNode.appendChild(svg("tspan", {
          x: p.label.x - p.x,
          y: p.label.top - p.y + (i + 1) * p.label.lineH - 4,
          class: line.cls
        }, line.text));
      });
    }

    function drawExtras(g, list) {
      while (extras.firstChild) { extras.removeChild(extras.firstChild); }
      if (!opts.otherScoresFor) { return; }
      list.forEach(function (p) {
        var other = opts.otherScoresFor(p.iv);
        if (!other) { return; }
        var ox = g.sx(other[opts.xKey].score);
        var oy = g.sy(other[opts.yKey].score);
        if (Math.abs(ox - p.x) < 1 && Math.abs(oy - p.y) < 1) { return; }
        extras.appendChild(svg("line", { x1: p.x, y1: p.y, x2: ox, y2: oy, class: "ghost-line" }));
        extras.appendChild(svg("circle", { cx: ox, cy: oy, r: 6, class: "ghost-dot" }));
      });
    }

    function render() {
      container.textContent = "";
      refs = {};
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
      extras = svg("g", { "aria-hidden": "true" });
      rootSvg.appendChild(extras);

      var list = positions(g);
      placeLabels(list, g);
      drawExtras(g, list);

      list.forEach(function (p) {
        var iv = p.iv;
        var link = svg("a", { href: opts.href(iv), class: "dot", "aria-label": opts.ariaLabel(iv) });
        link.style.transform = "translate(" + p.x + "px," + p.y + "px)";
        link.appendChild(svg("circle", { r: 22, class: "dot-hit" }));
        link.appendChild(svg("circle", { r: 15, class: "dot-focus" }));
        var mark = svg("circle", { r: 8, class: "dot-mark " + (iv.readiness === "now" ? "is-now" : "is-dev") });
        link.appendChild(mark);
        var label = svg("text", { class: "dot-text" });
        link.appendChild(label);
        drawLabel(label, p);
        if (opts.onEnter) {
          link.addEventListener("mouseenter", function () { opts.onEnter(mark, iv); });
          link.addEventListener("focus", function () { opts.onEnter(mark, iv); });
          link.addEventListener("mouseleave", function () { opts.onLeave(); });
          link.addEventListener("blur", function () { opts.onLeave(); });
        }
        refs[iv.id] = { link: link, label: label };
        rootSvg.appendChild(link);
      });
      container.appendChild(rootSvg);
    }

    // Move dots to their current positions (after the today / mature toggle).
    function update() {
      if (!geom || container.clientWidth !== lastWidth) { render(); return; }
      var list = positions(geom);
      placeLabels(list, geom);
      drawExtras(geom, list);
      list.forEach(function (p) {
        var ref = refs[p.iv.id];
        ref.link.style.transform = "translate(" + p.x + "px," + p.y + "px)";
        ref.link.setAttribute("aria-label", opts.ariaLabel(p.iv));
        drawLabel(ref.label, p);
      });
    }

    return { render: render, update: update };
  }

  root.PacingChart = { create: create };
})(window);
