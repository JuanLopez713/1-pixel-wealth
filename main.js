var bezos = document.getElementById('bezos');
var bezosCounterStart = document.getElementById('bezos-counter-start');

var four_hundred = document.getElementById('four-hundred');
var four_hundred_bar = four_hundred.querySelector('.wealth');
var four_hundred_counter_start = document.getElementById('four-hundred-counter-start');


var strip = document.getElementById('strip');
var progressFill = document.getElementById('progress-fill');
var billionBar = document.querySelector('.billion .wealth');
var readingMark = document.getElementById('reading-mark');
var stripCounter = document.getElementById('strip-counter');
var scaleKey = document.getElementById('scale-key');
var muskTitle = bezos.parentNode.querySelector('.wealth-title');
var ledgerStart = document.getElementById('ledger-start');
var programs = [].slice.call(document.querySelectorAll('.program'));
var pieDisc = document.getElementById('pie-disc');
var piePct = document.getElementById('pie-pct');
var pieLeft = document.getElementById('pie-left');
var pieNow = document.getElementById('pie-now');
var pieSpent = document.getElementById('pie-spent');
// What the 400 have actually spent: real purchases drawn to scale near the
// end of their bar. They feed the pie's orange slice, never "taken".
var spending = [].slice.call(document.querySelectorAll('.spent'));
var ticker = document.getElementById('ticker');
var fourTitle = four_hundred.querySelector('.wealth-title');
var fourDateline = fourTitle.querySelector('.title-dateline');
var deathSquares = document.querySelector('.malaria-squares');
var deathGrid = document.querySelector('.malaria-grid');

var MUSK_WEALTH = 908000000000;
var FOUR_HUNDRED_WEALTH = 8000000000000;
// The counters read the bar 175px from the left of the screen.
var READ_LINE = 175;
var money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
var pageOpened = Date.now();

function pageLeft(el) {
  return el.getBoundingClientRect().left + window.scrollX;
}

// One update per frame, however many scroll events arrive.
var stripQueued = false;
function queueStrip() {
  if (!stripQueued) {
    stripQueued = true;
    window.requestAnimationFrame(function () { stripQueued = false; update_strip(); update_keys(); });
  }
}
window.addEventListener('scroll', queueStrip);

// Every bar is 20 $1 million squares tall (632.46px), so a $100 million ruler
// section (100,000 square pixels) is 158.11px wide: exactly 5 x 20 squares.
var TWENTY_HIGH = 632.46;
function sectionWidth(bar) {
  return 100000 / TWENTY_HIGH;
}

// The $100 million scale, as a grid: one per bar, held at the bar's left edge
// under everything in it (see main.css).
var scaleBars = [billionBar, bezos, four_hundred_bar];
// Its lines are drawn as SVG with crisp edges: a square is 31.623 px, so most
// lines fall between screen pixels, and a 1px CSS gradient line there prints
// as two faint half-lines. crispEdges puts each on a whole pixel, full
// strength. Lines run along the top and left of every square, plus the
// grid's right and bottom edges.
var GRID_SVG = (function () {
  var s = Math.sqrt(1000), w = 5 * s, h = 20 * s, d = '';
  for (var c = 0; c < 5; c++) { d += 'M' + (c * s + 0.5).toFixed(3) + ' 0V' + h.toFixed(3); }
  d += 'M' + (w - 0.5).toFixed(3) + ' 0V' + h.toFixed(3);
  for (var r = 0; r < 20; r++) { d += 'M0 ' + (r * s + 0.5).toFixed(3) + 'H' + w.toFixed(3); }
  d += 'M0 ' + (h - 0.5).toFixed(3) + 'H' + w.toFixed(3);
  return '<svg class="grid-main" width="' + w.toFixed(2) + '" height="' + h.toFixed(2) +
    '" viewBox="0 0 ' + w.toFixed(3) + ' ' + h.toFixed(3) + '" shape-rendering="crispEdges">' +
    '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
})();
scaleBars.forEach(function (bar) {
  var grid = document.createElement('div');
  grid.className = 'grid100';
  grid.setAttribute('aria-hidden', 'true');
  grid.innerHTML = GRID_SVG;
  var tag = document.createElement('div');
  tag.className = 'grid100-tag';
  tag.setAttribute('aria-hidden', 'true');
  tag.innerHTML = '<span>100 &times; $1 million = $100 million</span>';
  var key = bar.querySelector('.key');
  bar.insertBefore(tag, key.nextSibling);
  bar.insertBefore(grid, tag);
});

// Every figure's top edge sits on a grid line, so as it passes over the grid
// it can be read off in $1 million squares. Each figure moves (with its
// label) to the nearest line; the lines run up from the bar's foot every
// 31.623px. Text heights change with fonts and screen width, so this reruns.
var SQUARE = Math.sqrt(1000);
var FIGURE_BOX = '.career, .sub-infobox, .column-infobox, .infobox';
function align_figures() {
  scaleBars.forEach(function (bar) {
    [].forEach.call(bar.querySelectorAll(FIGURE_BOX), function (box) { box.style.translate = ''; });
  });
  scaleBars.forEach(function (bar) {
    var br = bar.getBoundingClientRect(), high = br.height;
    var lines = [];
    for (var k = 0; k <= 20; k++) { lines.push(high - k * SQUARE); }
    var moved = [], jobRows = {};
    function shift(box, by) {
      if (Math.abs(by) > 0.01) { box.style.translate = '0 ' + by.toFixed(3) + 'px'; }
    }
    [].forEach.call(bar.querySelectorAll('.square'), function (sq) {
      var box = sq.closest(FIGURE_BOX);
      if (!box || !bar.contains(box) || moved.indexOf(box) >= 0) { return; }
      moved.push(box);
      var sr = sq.getBoundingClientRect();
      var top = sr.top - br.top;
      // The careers grid snaps a row at a time (see below).
      if (box.matches('.career')) {
        var key = Math.round(top);
        var row = jobRows[key] || (jobRows[key] = { top: top, bottom: 0, boxes: [] });
        row.bottom = Math.max(row.bottom, sr.bottom - br.top);
        row.boxes.push(box);
        return;
      }
      var boxTop = box.getBoundingClientRect().top - br.top;
      var best = null;
      lines.forEach(function (y) {
        // Not so high that the figure's label leaves the bar.
        if (boxTop + y - top < -0.5) { return; }
        if (best === null || Math.abs(y - top) < Math.abs(best - top)) { best = y; }
      });
      if (best !== null) { shift(box, best - top); }
    });
    // A row of job squares moves together, so their tops stay level. It moves
    // down to the next line, so it never rides up into the careers heading,
    // unless that would put its tallest square in the ruler band at the
    // bar's foot; then it takes the nearest line.
    Object.keys(jobRows).forEach(function (key) {
      var row = jobRows[key], down = null, near = null;
      lines.forEach(function (y) {
        if (near === null || Math.abs(y - row.top) < Math.abs(near - row.top)) { near = y; }
        if (y >= row.top - 0.5 && row.bottom + y - row.top <= high - 20 &&
            (down === null || y < down)) { down = y; }
      });
      var by = (down !== null ? down : near) - row.top;
      row.boxes.forEach(function (box) { shift(box, by); });
    });
  });
}
align_figures();
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(align_figures); }
window.addEventListener('load', align_figures);
var alignQueued = false;
window.addEventListener('resize', function () {
  if (!alignQueued) {
    alignQueued = true;
    window.requestAnimationFrame(function () { alignQueued = false; align_figures(); });
  }
});

// The $100 million scale, as a marker: it rides on top of everything, so it
// prints in ink or stock, whichever stands out more from what is under it.
var INK = [28, 26, 23], STOCK = [239, 230, 210];
function luminance(rgb) {
  var c = rgb.map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) {
  var la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
// The first solid color under a point, looking past the marker itself and
// the fixed strip and buttons.
function colorUnder(x, y) {
  var els = document.elementsFromPoint(x, y);
  for (var i = 0; i < els.length; i++) {
    if (els[i].closest('.key, .grid100, .jump-nav, .strip, .reading-mark')) { continue; }
    var c = getComputedStyle(els[i]).backgroundColor.match(/[\d.]+/g);
    if (c && (c.length < 4 || +c[3] >= 0.5)) { return [+c[0], +c[1], +c[2]]; }
  }
  return STOCK;
}
function update_keys() {
  if (document.body.classList.contains('scale-grid')) { return; }
  var vw = window.innerWidth, vh = window.innerHeight;
  scaleBars.forEach(function (bar) {
    var span = bar.querySelector('.key > span');
    var r = span.getBoundingClientRect();
    if (r.right <= 0 || r.left >= vw || r.bottom <= 0 || r.top >= vh) { return; }
    // Sample the line and the words, across the marker's width.
    var worstInk = Infinity, worstStock = Infinity;
    [r.top + 4, r.top + r.height * 0.7].forEach(function (y) {
      for (var k = 0; k <= 4; k++) {
        var x = r.left + 4 + (r.width - 8) * k / 4;
        if (x < 0 || x >= vw || y < 0 || y >= vh) { continue; }
        var under = colorUnder(x, y);
        worstInk = Math.min(worstInk, contrast(under, INK));
        worstStock = Math.min(worstStock, contrast(under, STOCK));
      }
    });
    var dark = worstStock > worstInk;
    span.classList.toggle('key-on-dark', dark);
    span.classList.toggle('key-on-light', !dark);
  });
}

// Scale or grid: the reader's choice, kept for their next visit.
function setScaleMode(grid) {
  document.body.classList.toggle('scale-grid', grid);
  [].forEach.call(document.querySelectorAll('.jump-scale button'), function (b) {
    b.setAttribute('aria-pressed', String(b.classList.contains('scale-pick-grid') === grid));
  });
  try { window.localStorage.setItem('scale-mode', grid ? 'grid' : 'scale'); } catch (e) {}
  update_keys();
}
window.addEventListener('resize', queueStrip);

// The width of a counter's longest text, so what sits beside it holds still
// as the digits climb: Musk's dollars and percentage, or the 400's dollars.
// Measured once the fonts have loaded.
var counterWidthCache = {};
function counterWidth(kind) {
  if (!counterWidthCache[kind]) {
    var probe = stripCounter.cloneNode(false);
    probe.removeAttribute('id');
    probe.style.cssText = 'position:absolute;visibility:hidden;min-width:0;width:auto';
    probe.innerHTML = kind === 'musk'
      ? money.format(MUSK_WEALTH) + ' &middot; <strong>100.0%</strong> of Elon Musk\'s wealth'
      : money.format(FOUR_HUNDRED_WEALTH) + ' &middot; <strong>100.0%</strong> of the 400\'s wealth';
    stripCounter.parentNode.appendChild(probe);
    counterWidthCache[kind] = Math.ceil(probe.offsetWidth);
    probe.remove();
  }
  return counterWidthCache[kind];
}
if (document.fonts) {
  document.fonts.ready.then(function () { counterWidthCache = {}; queueStrip(); });
}
window.addEventListener('resize', function () { counterWidthCache = {}; });

function update_strip() {
  var vw = window.innerWidth, x = window.scrollX;
  var muskLeft = pageLeft(bezos);
  var barBottom = bezos.getBoundingClientRect().bottom;
  strip.style.top = Math.round(barBottom + 8) + 'px';
  readingMark.style.top = Math.round(barBottom - 12) + 'px';

  var keyOn = muskLeft - x < vw / 2;
  strip.classList.toggle('on', keyOn);
  strip.classList.toggle('key-on', keyOn);

  // Counter: Musk's dollars and percentage from the "just kidding" box on,
  // then the 400's dollars from the "A trillion dollars" note on.
  var text = '', progress = null, four = false;
  var muskEnd = muskLeft + bezos.offsetWidth;
  if (x < muskEnd + 100) {
    // Each pixel scrolled uncovers a column 632.46 squares tall: $632,460.
    var wealth = Math.min((x - muskLeft + READ_LINE) * TWENTY_HIGH * 1000, MUSK_WEALTH);
    if (wealth > 0 && pageLeft(bezosCounterStart) - x < vw) {
      text = money.format(wealth) + ' &middot; <strong>' + (wealth / MUSK_WEALTH * 100).toFixed(1) + '%</strong> of Elon Musk\'s wealth';
      progress = wealth / MUSK_WEALTH * 100;
    }
  }
  else if (pageLeft(four_hundred_counter_start) - x < vw) {
    var wealth400 = Math.min((x - pageLeft(four_hundred_bar) + READ_LINE) * TWENTY_HIGH * 1000, FOUR_HUNDRED_WEALTH);
    wealth400 = Math.max(wealth400, 0);
    text = money.format(wealth400) + ' &middot; <strong>' + (wealth400 / FOUR_HUNDRED_WEALTH * 100).toFixed(1) + '%</strong> of the 400\'s wealth';
    progress = wealth400 / FOUR_HUNDRED_WEALTH * 100;
    four = true;
  }
  if (stripCounter.innerHTML !== text) { stripCounter.innerHTML = text; }
  strip.classList.toggle('counter-on', text !== '');
  stripCounter.style.minWidth = (text !== '' && vw > 450) ? counterWidth(x < muskEnd + 100 ? 'musk' : 'four') + 'px' : '';
  strip.classList.toggle('progress-on', progress !== null);
  // The 400's progress prints in their blue, Musk's in his orange.
  strip.classList.toggle('progress-four', four);
  if (progress !== null) { progressFill.style.width = progress + '%'; }

  // Until the counter starts, the key lines up with the words of Musk's
  // title, which travel in with his bar and then stick near the screen's
  // left edge. It never runs off the right of the screen.
  var keyShift = 0;
  if (keyOn && vw > 450 && text === '' && progress === null) {
    var titleText = muskTitle.getBoundingClientRect().left + parseFloat(getComputedStyle(muskTitle).paddingLeft);
    var keyHome = scaleKey.getBoundingClientRect().left - (parseFloat(scaleKey.dataset.shift) || 0);
    keyShift = Math.round(Math.min(titleText - keyHome, vw - 16 - keyHome - scaleKey.offsetWidth));
  }
  if (scaleKey.dataset.shift !== String(keyShift)) {
    scaleKey.dataset.shift = keyShift;
    scaleKey.style.transform = keyShift ? 'translateX(' + keyShift + 'px)' : '';
  }

  update_pie(x, vw);
  update_ticker(x, vw);
  update_deaths(x, vw);
}

// The pie: what the programs have taken from the 400 so far. Each program
// takes its share in proportion to how far the middle of the screen (the
// gold mark) is through its bar; the bar is cut back to bare stock up to there.
function update_pie(x, vw) {
  var on = pageLeft(ledgerStart) - x < vw * 0.75;
  strip.classList.toggle('pie-on', on);
  readingMark.classList.toggle('on', on);
  if (!on) { return; }
  var done = 0, now = 0, name = '';
  programs.forEach(function (program) {
    var bar = program.querySelector('.square');
    var cost = Number(program.getAttribute('data-cost'));
    var p = (x + vw / 2 - pageLeft(bar)) / bar.offsetWidth;
    p = Math.max(0, Math.min(1, p));
    // Paint the cut. It never sits left of the label's right edge, so the
    // label window and the cut read as one piece of bare stock.
    var label = bar.querySelector('.title');
    var labelRight = label.getBoundingClientRect().right - bar.getBoundingClientRect().left;
    var cut = p >= 1 ? bar.offsetWidth : (p > 0 ? Math.max(p * bar.offsetWidth, labelRight) : 0);
    bar.style.setProperty('--cut', Math.min(cut, bar.offsetWidth) + 'px');
    program.classList.toggle('funded', p >= 1);
    program.classList.toggle('cutting', p > 0);
    if (p >= 1) { done += cost; }
    else { now += cost * p; }
    if (p > 0) { name = (p < 1 ? 'Funding: ' : 'Funded: ') + program.getAttribute('data-name'); }
  });
  // Real spending: each purchase adds to the orange slice in proportion to
  // how far the reading mark is through its bar, the way programs take theirs.
  var spent = 0;
  spending.forEach(function (item) {
    var bar = item.querySelector('.square');
    var p = Math.max(0, Math.min(1, (x + vw / 2 - pageLeft(bar)) / bar.offsetWidth));
    spent += Number(item.getAttribute('data-cost')) * p;
    if (p > 0) { name = 'Spent: ' + item.getAttribute('data-name'); }
  });
  var taken = done + now;
  var d = done / FOUR_HUNDRED_WEALTH * 100, t = taken / FOUR_HUNDRED_WEALTH * 100;
  var s = t + spent / FOUR_HUNDRED_WEALTH * 100;
  // Taken (stock), the program in progress (gold), spent (orange), left (blue).
  pieDisc.style.background = 'conic-gradient(var(--pie-taken) 0 ' + d + '%, var(--pie-now) ' + d + '% ' + t + '%, var(--pie-spent) ' + t + '% ' + s + '%, var(--pie-rest) ' + s + '% 100%)';
  piePct.textContent = (t < 10 ? t.toFixed(1) : Math.round(t)) + '%';
  // "Left" counts only the programs: they are what this money could do; the
  // spending is money already gone, reported on its own line.
  pieLeft.textContent = '$' + ((FOUR_HUNDRED_WEALTH - taken) / 1e12).toFixed(1) + ' trillion left';
  var spentPct = spent / FOUR_HUNDRED_WEALTH * 100;
  var spentText = !spent ? '' : (spent < 1e9 ? '$' + Math.round(spent / 1e6) + ' million' : '$' + (spent / 1e9).toFixed(1) + ' billion') +
    ' spent (' + (spentPct < 0.01 ? 'under 0.01' : spentPct.toFixed(2)) + '%)';
  if (pieSpent.textContent !== spentText) { pieSpent.textContent = spentText; }
  pieSpent.hidden = !spent;
  pieSpent.parentNode.classList.toggle('has-spent', spent > 0);
  pieNow.textContent = name;
}

// The ticker: one of the 400 at a time, top right, level with the 400's
// title, while their bar is under it. A new name, drawn at random without
// repeats until the list runs out, each time the reader passes a box on the
// bar or presses Back / Next. The list is a static copy (forbes400.js).
var tickerDeck = [], tickerKey = null, tickerSwapped = 0, tickerForce = false, tickerTimer = null, tickerQuietUntil = 0;
function tickerNext() {
  if (!tickerDeck.length) {
    tickerDeck = window.FORBES_400.slice();
    for (var i = tickerDeck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), tmp = tickerDeck[i];
      tickerDeck[i] = tickerDeck[j]; tickerDeck[j] = tmp;
    }
  }
  return tickerDeck.pop();
}
function update_ticker(x, vw) {
  if (!ticker || !window.FORBES_400) { return; }
  var barLeft = pageLeft(four_hundred_bar), barRight = barLeft + four_hundred_bar.offsetWidth;
  var on = barLeft - x < vw / 2 && barRight - x > vw - 16;
  if (!on) { ticker.classList.remove('on'); return; }
  ticker.classList.add('on');
  var key = 0, boxes = four_hundred_bar.children;
  for (var b = 0; b < boxes.length; b++) {
    if (boxes[b].classList.contains('infobox') && pageLeft(boxes[b]) < x + vw / 2) { key++; }
  }
  place_ticker();
  if (key === tickerKey && !tickerForce && ticker.textContent) { return; }
  // A Back / Next press already drew a new name: the boxes its glide passes
  // don't draw more.
  if (!tickerForce && Date.now() < tickerQuietUntil && ticker.textContent) { tickerKey = key; return; }
  // At most one new name every 0.6s, so a glide past several boxes does not
  // flicker through names.
  var wait = 600 - (Date.now() - tickerSwapped);
  if (wait > 0 && ticker.textContent) {
    if (!tickerTimer) { tickerTimer = setTimeout(function () { tickerTimer = null; queueStrip(); }, wait); }
    return;
  }
  tickerKey = key;
  tickerForce = false;
  tickerSwapped = Date.now();
  var who = tickerNext();
  var worth = who[1] % 1 ? who[1].toFixed(1) : String(who[1]);
  ticker.innerHTML = '<span class="ticker-name"></span><span class="ticker-worth"></span>';
  ticker.firstChild.textContent = who[0];
  ticker.lastChild.textContent = '$' + worth + ' billion';
  ticker.classList.remove('ticker-in');
  void ticker.offsetWidth;
  ticker.classList.add('ticker-in');
  place_ticker();
}
// Level with the title's dateline, and never over the words of the title.
function place_ticker() {
  var dl = fourDateline.getBoundingClientRect();
  var anchor = dl.width ? dl : fourTitle.getBoundingClientRect();
  // The name's baseline sits a few pixels above the box's bottom; drop it to
  // the dateline's.
  ticker.style.top = Math.round(anchor.bottom - ticker.offsetHeight + 4) + 'px';
  var words = dl.width ? dl.right : fourTitle.getBoundingClientRect().right - 10;
  ticker.classList.toggle('crowded', window.innerWidth - 16 - ticker.offsetWidth < words + 32);
}
document.addEventListener('jump-stop', function () {
  tickerForce = true;
  tickerQuietUntil = Date.now() + 1500;
  queueStrip();
});

// Malaria figures on the 400's bar. The death squares grow in when their
// window comes on screen; the grid then fills with one year of under-five
// malaria deaths when its window does.
var UNDER_FIVE_DEATHS = 434000, PER_DOT = 100, GRID_COLS = 140;
var SECONDS_PER_DEATH = 365.25 * 24 * 3600 / UNDER_FIVE_DEATHS;   // about 73
var squaresStarted = false, gridStarted = false;
var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function update_deaths(x, vw) {
  if (!squaresStarted && pageLeft(deathSquares) - x < vw * 0.7) {
    squaresStarted = true;
    // Let the squares paint at scale(0) first, so they grow.
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { deathSquares.classList.add('play'); });
    });
  }
  if (!gridStarted && pageLeft(deathGrid) - x < vw * 0.7) {
    gridStarted = true;
    start_grid();
  }
}

function start_grid() {
  var canvas = document.getElementById('deaths-canvas');
  var live = document.getElementById('deaths-live');
  var dots = UNDER_FIVE_DEATHS / PER_DOT, pitch = 4, size = 3;
  var ratio = window.devicePixelRatio || 1;
  var ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.fillStyle = getComputedStyle(canvas).color;
  var drawn = 0;
  function drawTo(n) {
    for (; drawn < n; drawn++) {
      ctx.fillRect((drawn % GRID_COLS) * pitch, Math.floor(drawn / GRID_COLS) * pitch, size, size);
    }
  }
  function tick() {
    var n = Math.floor((Date.now() - pageOpened) / 1000 / SECONDS_PER_DEATH);
    live.textContent = 'At the real pace, a child under five dies of malaria about every ' +
      Math.round(SECONDS_PER_DEATH) + ' seconds. Since you opened this page: ' +
      n + (n === 1 ? ' child.' : ' children.');
  }
  tick();
  window.setInterval(tick, 1000);
  if (reduceMotion) { drawTo(dots); return; }
  var t0 = performance.now(), duration = 20000;
  (function frame(now) {
    drawTo(Math.min(dots, Math.floor((now - t0) / duration * dots)));
    if (drawn < dots) { window.requestAnimationFrame(frame); }
  })(t0);
}

// Size the grid's canvas from the start, so its window never changes size.
(function () {
  var canvas = document.getElementById('deaths-canvas');
  var rows = Math.ceil(UNDER_FIVE_DEATHS / PER_DOT / GRID_COLS), pitch = 4;
  var ratio = window.devicePixelRatio || 1;
  canvas.width = GRID_COLS * pitch * ratio;
  canvas.height = rows * pitch * ratio;
  canvas.style.aspectRatio = GRID_COLS + ' / ' + rows;
})();

update_strip();

function toggleZoom() {
  document.getElementById('line-chart').classList.toggle('zoom');
}

// Back / Next buttons: jump to the previous or next piece of information.
(function () {
  var german = document.documentElement.lang === 'de';
  var nav = document.createElement('nav');
  nav.className = 'jump-nav';
  nav.innerHTML =
    '<button type="button" class="jump-home"><svg class="chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M2 8 L8 2 L14 8 M4 6.5 V14 H12 V6.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square" stroke-linejoin="miter"/></svg>' + (german ? 'Start' : 'Home') + '</button>' +
    '<button type="button" class="jump-prev"><svg class="chev" viewBox="0 0 10 16" width="10" height="16" aria-hidden="true"><path d="M8 2 L2 8 L8 14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg>' + (german ? 'Zur&uuml;ck' : 'Back') + '</button>' +
    '<button type="button" class="jump-next">' + (german ? 'Weiter' : 'Next') + '<svg class="chev" viewBox="0 0 10 16" width="10" height="16" aria-hidden="true"><path d="M2 2 L8 8 L2 14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg></button>';
  document.body.appendChild(nav);

  var STICKY_CONTENT = '.title, .chart, .piechart, .worldchart, .chart-outer, .midtext, .title-square-wrapper, .center-sticky';
  var lastTarget = null, lastJump = 0;

  // Where to scroll so that a stop is in view.
  // On wider screens the left of every bar belongs to the $100 million grid
  // (5 $1 million squares wide), and every stop puts its content's left edge
  // one square to the grid's right: the lane (--lane in main.css, 6 squares
  // from the left). Content that sticks in place holds there as the page
  // scrolls on. On phones boxes sit 10px from the left and text is centered
  // on the screen; there is no grid.
  var BOX_FIGURES = '.celebrities > *, .careers, .amazon-year, .money-bar, .teacher-pay, .crow-thomas';
  var LANE = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--lane')) || 6 * SQUARE;

  function phone() { return window.innerWidth <= 450; }

  // Where content would sit if it did not stick: its left edge on the page.
  // (Sticky offsets are switched off while measuring; see main.css.)
  function staticLeft(el) {
    if (el.classList.contains('wealth-wrapper')) {
      // A bar's start: the bar itself (its title sticks to the screen edge).
      return pageLeft(el.querySelector(':scope > .wealth') || el);
    }
    if (el.matches(BOX_FIGURES)) {
      // Line up the square itself (the celebrity boxes have side margins).
      return pageLeft((el.closest('.celebrities') && el.querySelector('.square')) || el);
    }
    var inner = el.querySelectorAll(STICKY_CONTENT), left = Infinity;
    for (var i = 0; i < inner.length; i++) {
      if (inner[i].offsetWidth) { left = Math.min(left, pageLeft(inner[i])); }
    }
    return left === Infinity ? pageLeft(el) : left;
  }

  function targetFor(el) {
    if (!phone()) { return staticLeft(el) - LANE; }
    var left = pageLeft(el), width = el.offsetWidth, vw = window.innerWidth;
    if (el.matches(BOX_FIGURES)) { return staticLeft(el) - 10; }
    if (width <= vw) { return left + width / 2 - vw / 2; }   // small: center it
    if (el.classList.contains('infobox') && el.querySelector(STICKY_CONTENT)) {
      return left - 5;                               // its content sticks at 10px
    }
    return left - 60;                                 // wide: show its start
  }

  function stops() {
    var vw = window.innerWidth;
    var els = document.querySelectorAll('.wealth-wrapper, .wealth-wrapper .infobox');
    var targets = [];
    // Measure where sticky content sits in the page, not where it is held.
    document.documentElement.classList.add('jump-measuring');
    for (var i = 0; i < els.length; i++) {
      // A box that holds a row of graphics gets one stop per graphic (below).
      if (els[i].classList.contains('celebrities')) { continue; }
      targets.push(targetFor(els[i]));
    }
    // Graphics side by side in one box: Solomon, Beyonce, Tim Cook, the
    // creators and the rest.
    var items = document.querySelectorAll('.celebrities > .sub-infobox, .celebrities > .column-infobox');
    for (var j = 0; j < items.length; j++) {
      targets.push(targetFor(items[j]));
    }
    document.documentElement.classList.remove('jump-measuring');
    // The end of each giant bar, where its counter reaches the total
    // (the counter reads the bar 175px from the left of the screen).
    [bezos, four_hundred_bar].forEach(function (bar) {
      targets.push(pageLeft(bar) + bar.offsetWidth - 170);
    });
    // The last cost bar on Musk's bar ends at the counter's read line before
    // the long run of what is left.
    var costBars = bezos.querySelectorAll('.cost-bar .square');
    var lastCost = costBars[costBars.length - 1];
    targets.push(pageLeft(lastCost) + lastCost.offsetWidth - READ_LINE);
    // A program bar ends when its end reaches the middle of the screen, where
    // the pie reads it: the whole slice is taken and the FUNDED stamp shows.
    var programBars = document.querySelectorAll('.program .square');
    for (var m = 0; m < programBars.length; m++) {
      targets.push(pageLeft(programBars[m]) + programBars[m].offsetWidth - vw / 2 + 2);
    }
    var max = document.documentElement.scrollWidth - vw;
    targets = targets.map(function (t) { return Math.max(0, Math.min(Math.round(t), max)); });
    targets.sort(function (a, b) { return a - b; });
    // Stops a few pixels apart show the same thing: keep the first.
    var kept = [];
    targets.forEach(function (t) {
      if (!kept.length || t - kept[kept.length - 1] > 150) { kept.push(t); }
    });
    return kept;
  }

  // Glide to a stop. A smooth scroll across a long bar (the malaria program
  // alone is 250,000px) outruns Chrome's painting, and the page flashes flat
  // blue where it has not painted yet. So a long jump lands instantly just
  // short of the stop and glides only the last screen and a half.
  function glide(target) {
    var x = window.scrollX, lead = window.innerWidth * 1.5;
    if (Math.abs(target - x) > lead * 2) {
      window.scrollTo({left: target - (target > x ? lead : -lead), top: window.scrollY, behavior: 'instant'});
    }
    window.scrollTo({left: target, top: window.scrollY, behavior: 'smooth'});
  }

  function jump(direction) {
    // While a jump is still animating, count from where it is going.
    var from = (lastTarget !== null && Date.now() - lastJump < 1500) ? lastTarget : window.scrollX;
    var all = stops(), target = null;
    if (direction > 0) {
      for (var i = 0; i < all.length; i++) {
        if (all[i] > from + 20) { target = all[i]; break; }
      }
    }
    else {
      for (var j = all.length - 1; j >= 0; j--) {
        if (all[j] < from - 20) { target = all[j]; break; }
      }
      if (target === null) { target = 0; }
    }
    if (target === null) { return; }
    lastTarget = target;
    lastJump = Date.now();
    glide(target);
    document.dispatchEvent(new Event('jump-stop'));
  }

  nav.querySelector('.jump-home').addEventListener('click', function () {
    lastTarget = 0;
    lastJump = Date.now();
    glide(0);
  });
  nav.querySelector('.jump-prev').addEventListener('click', function () { jump(-1); });
  nav.querySelector('.jump-next').addEventListener('click', function () { jump(1); });

  // Sections: a menu of every titled section, to skip ahead (or back).
  // Built from the page's own headings each time it opens, so it follows
  // the German strings and any section added later.
  var sectionsWrap = document.createElement('span');
  sectionsWrap.className = 'jump-sections';
  sectionsWrap.innerHTML =
    '<button type="button" class="jump-sections-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="jump-sections-menu" title="' + (german ? 'Abschnitte' : 'Jump to a section') + '"><svg class="chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M1 3 H15 M1 8 H15 M1 13 H15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg><span class="sections-word">' + (german ? 'Abschnitte' : 'Sections') + '</span></button>' +
    '<div id="jump-sections-menu" class="jump-sections-menu" role="menu" hidden></div>';
  nav.insertBefore(sectionsWrap, nav.querySelector('.jump-prev'));
  var toggle = sectionsWrap.querySelector('.jump-sections-toggle');
  var menu = sectionsWrap.querySelector('.jump-sections-menu');

  // A bar's own title, without its dateline.
  function barLabel(wrapper) {
    var h = wrapper.querySelector(':scope > .wealth-title');
    if (!h) { return ''; }
    var copy = h.cloneNode(true);
    [].forEach.call(copy.querySelectorAll('.title-dateline'), function (d) { d.remove(); });
    return copy.textContent.trim();
  }

  // Each entry: a label, where to scroll, and whether it heads a group.
  function sections() {
    var list = [{label: german ? 'Von $1.000 bis $1 Milliarde' : '$1,000 to $1 billion', target: 0, head: true}];
    document.documentElement.classList.add('jump-measuring');
    [bezos.parentNode, four_hundred_bar.parentNode].forEach(function (wrapper) {
      list.push({label: barLabel(wrapper), target: targetFor(wrapper), head: true});
      [].forEach.call(wrapper.querySelectorAll('.infobox > h2.what-could-we-do'), function (h) {
        list.push({label: h.textContent.trim(), target: targetFor(h.parentNode)});
      });
    });
    document.documentElement.classList.remove('jump-measuring');
    var max = document.documentElement.scrollWidth - window.innerWidth;
    list.forEach(function (s) { s.target = Math.max(0, Math.min(Math.round(s.target), max)); });
    return list;
  }

  function closeMenu(refocus) {
    if (menu.hidden) { return; }
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (refocus) { toggle.focus(); }
  }

  function openMenu() {
    var list = sections(), x = window.scrollX, current = 0;
    list.forEach(function (s, i) { if (s.target <= x + 20) { current = i; } });
    menu.innerHTML = '';
    list.forEach(function (s, i) {
      var item = document.createElement('button');
      item.type = 'button';
      item.setAttribute('role', 'menuitem');
      item.className = 'jump-section' + (s.head ? ' jump-section-head' : '');
      item.textContent = s.label;
      if (i === current) { item.setAttribute('aria-current', 'true'); }
      item.addEventListener('click', function () {
        closeMenu(false);
        lastTarget = s.target;
        lastJump = Date.now();
        glide(s.target);
        document.dispatchEvent(new Event('jump-stop'));
      });
      menu.appendChild(item);
    });
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    var here = menu.querySelector('[aria-current]') || menu.firstChild;
    here.scrollIntoView({block: 'nearest'});
    here.focus({preventScroll: true});
  }

  toggle.addEventListener('click', function () {
    if (menu.hidden) { openMenu(); } else { closeMenu(true); }
  });
  document.addEventListener('click', function (e) {
    if (!sectionsWrap.contains(e.target)) { closeMenu(false); }
  });
  menu.addEventListener('keydown', function (e) {
    var items = [].slice.call(menu.querySelectorAll('.jump-section'));
    var i = items.indexOf(document.activeElement);
    var next = null;
    if (e.key === 'ArrowDown') { next = items[(i + 1) % items.length]; }
    else if (e.key === 'ArrowUp') { next = items[(i - 1 + items.length) % items.length]; }
    else if (e.key === 'Home') { next = items[0]; }
    else if (e.key === 'End') { next = items[items.length - 1]; }
    else if (e.key === 'Escape' || e.key === 'Tab') { closeMenu(e.key === 'Escape'); return; }
    if (next) { e.preventDefault(); next.focus(); }
  });
})();

// Scale | Grid: shows the $100 million scale as the marker or as the grid.
(function () {
  var nav = document.querySelector('.jump-nav');
  var group = document.createElement('span');
  group.className = 'jump-scale';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', '$100 million scale');
  group.innerHTML =
    '<button type="button" class="scale-pick-line" title="Show $100 million as a marker"><svg class="chev" viewBox="0 0 22 16" width="22" height="16" aria-hidden="true"><path d="M2 4 V12 M2 8 H20 M20 4 V12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg><span class="scale-word">Scale</span></button>' +
    '<button type="button" class="scale-pick-grid" title="Show $100 million as a grid of $1 million squares"><svg class="chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M2 2 H14 V14 H2 Z M6 2 V14 M10 2 V14 M2 6 H14 M2 10 H14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg><span class="scale-word">Grid</span></button>';
  nav.appendChild(group);
  group.querySelector('.scale-pick-line').addEventListener('click', function () { setScaleMode(false); });
  group.querySelector('.scale-pick-grid').addEventListener('click', function () { setScaleMode(true); });

  var stored = null;
  try { stored = window.localStorage.getItem('scale-mode'); } catch (e) {}
  setScaleMode(stored !== 'scale');
  window.addEventListener('load', update_keys);
})();
