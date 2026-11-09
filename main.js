var bezos = document.getElementById('bezos');
var bezosCounterStart = document.getElementById('bezos-counter-start');

var four_hundred = document.getElementById('four-hundred');
var four_hundred_bar = four_hundred.querySelector('.wealth');
var four_hundred_counter_start = document.getElementById('four-hundred-counter-start');

var sixtyPercent = document.getElementById('sixty-percent');
var sixtyPercentIndicator = document.getElementById('sixty-percent-indicator');
var sixtyPercentScrollPercentage = 0.0;

var strip = document.getElementById('strip');
var progressFill = document.getElementById('progress-fill');
var politicalStart = document.querySelector('.political-start');
var billionBar = document.querySelector('.billion .wealth');
var grid80 = document.getElementById('grid80');
var readingMark = document.getElementById('reading-mark');
var stripCounter = document.getElementById('strip-counter');
var ledgerStart = document.getElementById('ledger-start');
var programs = [].slice.call(document.querySelectorAll('.program'));
var pieDisc = document.getElementById('pie-disc');
var piePct = document.getElementById('pie-pct');
var pieLeft = document.getElementById('pie-left');
var pieNow = document.getElementById('pie-now');
var deaths = document.getElementById('deaths');
var malariaStart = document.getElementById('malaria-start');
var malariaEnd = document.getElementById('malaria-end');

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

function generate_sixty_percent() {
  for (var i = 0; i < 100; i++) {
    var node = document.createElement("div");
    node.classList = "people";
    if (i === 0) {
      node.classList += " first";
    }
    document.getElementById("sixty-percent").appendChild(node);
  }
}
generate_sixty_percent();

sixtyPercent.addEventListener('scroll', function(){
  let newScroll = ((sixtyPercent.scrollTop / sixtyPercent.scrollHeight) * 50).toFixed(1);
  if (sixtyPercentScrollPercentage !== newScroll) {
    sixtyPercentScrollPercentage = newScroll;
    sixtyPercentIndicator.innerHTML = newScroll + '%';
  }
})

// One update per frame, however many scroll events arrive.
var stripQueued = false;
function queueStrip() {
  if (!stripQueued) {
    stripQueued = true;
    window.requestAnimationFrame(function () { stripQueued = false; update_strip(); });
  }
}
window.addEventListener('scroll', queueStrip);

// The $100 million grid: half a second after scrolling stops, 100 cells of
// $1 million appear over the ruler section at the left edge of the screen.
var gridTimer = null;
window.addEventListener('scroll', function () {
  grid80.classList.remove('on');
  document.body.classList.remove('grid-on');
  window.clearTimeout(gridTimer);
  gridTimer = window.setTimeout(showGrid80, 500);
});
function showGrid80() {
  var SECTION = 200, SIDE = 221.36, HIGH = 474.34, vw = window.innerWidth;
  if (vw <= 450) { return; }
  var bars = [billionBar, bezos, four_hundred_bar];
  for (var i = 0; i < bars.length; i++) {
    var r = bars[i].getBoundingClientRect();
    // The first ruler tick at or right of the screen's left edge.
    // (Within a pixel counts: bars start at fractional positions.)
    var tick = r.left >= -1 ? r.left : r.left + Math.ceil((-r.left - 1) / SECTION) * SECTION;
    if (tick + SIDE <= r.right && tick + SIDE <= vw) {
      grid80.style.left = Math.round(tick) + 'px';
      grid80.style.top = (r.bottom - HIGH) + 'px';
      // A wash of the bar's own ink hides whatever has scrolled under the
      // grid, so nothing shows on top of it. Over a program bar it stays
      // clear: the bare stock there is money already taken.
      var overProgram = [].some.call(document.querySelectorAll('.program .square'), function (sq) {
        var q = sq.getBoundingClientRect();
        return q.left < tick + SIDE && q.right > tick;
      });
      var ink = getComputedStyle(bars[i]).backgroundColor.match(/\d+/g);
      grid80.style.backgroundColor = overProgram ? 'transparent' : 'rgb(' + ink.slice(0, 3).join(',') + ')';
      grid80.classList.add('on');
      document.body.classList.add('grid-on');
      return;
    }
  }
}
window.addEventListener('resize', queueStrip);

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
  // then the 400's dollars from the 400 people box on.
  var text = '', progress = null, political = false;
  var muskEnd = muskLeft + bezos.offsetWidth;
  if (x < muskEnd + 100) {
    var wealth = Math.min((x - muskLeft + READ_LINE) * 500000, MUSK_WEALTH);
    if (wealth > 0 && pageLeft(bezosCounterStart) - x < vw) {
      text = money.format(wealth) + ' &middot; <strong>' + (wealth / MUSK_WEALTH * 100).toFixed(1) + '%</strong> of Elon Musk\'s wealth';
      progress = wealth / MUSK_WEALTH * 100;
    }
  }
  else if (pageLeft(four_hundred_counter_start) - x < vw) {
    var wealth400 = Math.min((x - pageLeft(four_hundred_bar) + READ_LINE) * 500000, FOUR_HUNDRED_WEALTH);
    text = money.format(Math.max(wealth400, 0));
  }
  if (stripCounter.innerHTML !== text) { stripCounter.innerHTML = text; }
  // The progress bar returns at the political section: what billionaire
  // families spent on the 2026 midterms, as a share of the 400's wealth.
  if (progress === null && pageLeft(politicalStart) - x < vw * 0.75) {
    progress = 1.7e9 / FOUR_HUNDRED_WEALTH * 100;
    political = true;
  }
  strip.classList.toggle('progress-on', progress !== null);
  strip.classList.toggle('progress-political', political);
  if (progress !== null) { progressFill.style.width = progress + '%'; }

  update_pie(x, vw);
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
    if (p >= 1) { done += cost; }
    else { now += cost * p; }
    if (p > 0) { name = (p < 1 ? 'Funding: ' : 'Funded: ') + program.getAttribute('data-name'); }
  });
  var taken = done + now;
  var d = done / FOUR_HUNDRED_WEALTH * 100, t = taken / FOUR_HUNDRED_WEALTH * 100;
  pieDisc.style.background = 'conic-gradient(var(--pie-taken) 0 ' + d + '%, var(--pie-now) ' + d + '% ' + t + '%, var(--pie-rest) ' + t + '% 100%)';
  piePct.textContent = (t < 10 ? t.toFixed(1) : Math.round(t)) + '%';
  pieLeft.textContent = '$' + ((FOUR_HUNDRED_WEALTH - taken) / 1e12).toFixed(1) + ' trillion left';
  pieNow.textContent = name;
}

// Deaths widget: shows while the malaria passage is on screen. The squares
// grow in, then a grid fills with one year of under-five malaria deaths.
var UNDER_FIVE_DEATHS = 434000, PER_DOT = 100, GRID_COLS = 140;
var SECONDS_PER_DEATH = 365.25 * 24 * 3600 / UNDER_FIVE_DEATHS;   // about 73
var deathsStarted = false;
var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function update_deaths(x, vw) {
  var start = pageLeft(malariaStart), end = pageLeft(malariaEnd) + malariaEnd.offsetWidth;
  var on = x + vw > start + vw * 0.3 && x < end - vw * 0.3;
  strip.classList.toggle('deaths-on', on);
  if (on && !deathsStarted) {
    deathsStarted = true;
    start_deaths();
  }
}

function start_deaths() {
  var canvas = document.getElementById('deaths-canvas');
  var live = document.getElementById('deaths-live');
  var dots = UNDER_FIVE_DEATHS / PER_DOT, rows = Math.ceil(dots / GRID_COLS), pitch = 4, size = 3;
  var ratio = window.devicePixelRatio || 1;
  canvas.width = GRID_COLS * pitch * ratio;
  canvas.height = rows * pitch * ratio;
  canvas.style.aspectRatio = GRID_COLS + ' / ' + rows;
  var ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.fillStyle = getComputedStyle(canvas).color;
  var drawn = 0;
  function drawTo(n) {
    for (; drawn < n; drawn++) {
      ctx.fillRect((drawn % GRID_COLS) * pitch, Math.floor(drawn / GRID_COLS) * pitch, size, size);
    }
  }
  function fill() {
    if (reduceMotion) { drawTo(dots); return; }
    var t0 = performance.now(), duration = 20000;
    (function frame(now) {
      drawTo(Math.min(dots, Math.floor((now - t0) / duration * dots)));
      if (drawn < dots) { window.requestAnimationFrame(frame); }
    })(t0);
  }
  function tick() {
    var n = Math.floor((Date.now() - pageOpened) / 1000 / SECONDS_PER_DEATH);
    live.textContent = 'At the real pace, a child under five dies of malaria about every ' +
      Math.round(SECONDS_PER_DEATH) + ' seconds. Since you opened this page: ' +
      n + (n === 1 ? ' child.' : ' children.');
  }
  tick();
  window.setInterval(tick, 1000);
  // Let the squares paint at scale(0) first, so they grow.
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () { deaths.classList.add('play'); });
  });
  // The two parts take turns: the squares grow in, then the grid fills.
  window.setTimeout(function () { deaths.classList.add('phase-grid'); fill(); }, 7000);
}

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
  // On wider screens the left 250px of every bar belong to the $100 million
  // grid (100 squares of $1 million, 221px wide), so box figures (a colored
  // square or bar with its label) line up 250px from the left, and text and
  // charts center in the space to the right of the grid. On phones there is no grid: boxes sit 10px from the
  // left and text is centered on the screen.
  var BOX_FIGURES = '.celebrities > *, .careers, .lifetime, .healthcare, .amazon-year, .year-veteran, .year-chemo, .money-bar, .teacher-pay';
  var SECTION = 200, GRID_ZONE = 250;

  function phone() { return window.innerWidth <= 450; }
  function boxLeft() { return phone() ? 10 : GRID_ZONE; }
  function centerLine() { return window.innerWidth / 2 + (phone() ? 0 : GRID_ZONE / 2); }

  function targetFor(el) {
    var left = pageLeft(el), width = el.offsetWidth, vw = window.innerWidth;
    if (el.matches(BOX_FIGURES)) {
      // Line up the square itself (the celebrity boxes have side margins).
      var square = el.closest('.celebrities') && el.querySelector('.square');
      return (square ? pageLeft(square) : left) - boxLeft();
    }
    if (width <= vw) {
      return left + width / 2 - centerLine();        // small: center it
    }
    if (el.classList.contains('infobox') && el.querySelector(STICKY_CONTENT)) {
      // Its content sticks to the center line (or 10px from the left on
      // phones) once its left edge reaches that point.
      return phone() ? left - 5 : left - centerLine() + 5;
    }
    return left - 60;                                 // wide: show its start
  }

  // Inside a bar, stop where a ruler tick meets the left edge of the screen,
  // so the grid's left edge sits exactly on it. Content that sticks in place
  // takes the next tick (scrolling a little further does not move it); boxes
  // that scroll with the page take the previous tick (they shift right);
  // small centered notes take the nearest.
  function snap(t, el, mode) {
    if (phone()) { return t; }
    var bar = el.classList.contains('ruler') ? el : el.closest('.wealth.ruler');
    if (!bar) { return t; }
    var origin = pageLeft(bar), k = (t - origin) / SECTION;
    var n = mode === 'floor' ? Math.floor(k) : (mode === 'round' ? Math.round(k) : Math.ceil(k));
    return origin + n * SECTION;
  }

  function stops() {
    var vw = window.innerWidth;
    var els = document.querySelectorAll('.wealth-wrapper, .wealth-wrapper .infobox');
    var targets = [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      // A box that holds a row of graphics gets one stop per graphic (below).
      if (el.classList.contains('celebrities')) { continue; }
      var still = el.offsetWidth <= vw && !el.matches(BOX_FIGURES) && !el.querySelector(STICKY_CONTENT);
      targets.push(snap(targetFor(el), el, still ? 'round' : 'ceil'));
    }
    // Graphics side by side in one box: Solomon, Beyonce, Tim Cook, the
    // creators and the rest. Small ones scroll with the page (previous tick);
    // wide ones keep their label pinned at the grid's edge (next tick).
    var items = document.querySelectorAll('.celebrities > .sub-infobox, .celebrities > .column-infobox');
    for (var j = 0; j < items.length; j++) {
      // (Too wide to fit after a shift of up to one section: next tick.)
      targets.push(snap(targetFor(items[j]), items[j], items[j].offsetWidth > vw - GRID_ZONE - SECTION ? 'ceil' : 'floor'));
    }
    // The end of each giant bar, where its counter reaches the total
    // (the counter reads the bar 175px from the left of the screen).
    [bezos, four_hundred_bar].forEach(function (bar) {
      targets.push(snap(pageLeft(bar) + bar.offsetWidth - 170, bar, 'ceil'));
    });
    // A program bar ends when its end reaches the middle of the screen, where
    // the pie reads it: the whole slice is taken and the FUNDED stamp shows.
    var programBars = document.querySelectorAll('.program .square');
    for (var m = 0; m < programBars.length; m++) {
      targets.push(snap(pageLeft(programBars[m]) + programBars[m].offsetWidth - vw / 2 + 2, programBars[m], 'ceil'));
    }
    var max = document.documentElement.scrollWidth - vw;
    targets = targets.map(function (t) { return Math.max(0, Math.min(Math.round(t), max)); });
    targets.sort(function (a, b) { return a - b; });
    // Stops a few pixels apart show the same thing: keep the first. (Snapped
    // stops sit whole ruler sections apart, 200px or more, so they all stay.)
    var kept = [];
    targets.forEach(function (t) {
      if (!kept.length || t - kept[kept.length - 1] > 150) { kept.push(t); }
    });
    return kept;
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
    window.scrollTo({left: target, top: window.scrollY, behavior: 'smooth'});
  }

  nav.querySelector('.jump-home').addEventListener('click', function () {
    lastTarget = 0;
    lastJump = Date.now();
    window.scrollTo({left: 0, top: window.scrollY, behavior: 'smooth'});
  });
  nav.querySelector('.jump-prev').addEventListener('click', function () { jump(-1); });
  nav.querySelector('.jump-next').addEventListener('click', function () { jump(1); });
})();
