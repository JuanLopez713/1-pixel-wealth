var bezos = document.getElementById('bezos');
var bezos_counter = document.getElementById('bezos-counter');
var bezosCounterStart = document.getElementById('bezos-counter-start');

var four_hundred = document.getElementById('four-hundred');
var four_hundred_counter = document.getElementById('four-hundred-counter');
var four_hundred_counter_start = document.getElementById('four-hundred-counter-start');

var sixtyPercent = document.getElementById('sixty-percent');
var sixtyPercentIndicator = document.getElementById('sixty-percent-indicator');
var sixtyPercentScrollPercentage = 0.0;
var babies = document.getElementById('babies-wrapper');
var baby_counter = document.getElementById('baby-counter');

var MUSK_WEALTH = 908000000000;
var thousand = new Intl.NumberFormat('en-US')
var money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

//todo: also work for 400 richest
window.addEventListener('scroll', function(){
  update_wealth_counter();
});

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
babies.addEventListener('scroll', function(){
  let is_mobile = window.innerWidth <= 450;
  let bg_size = (is_mobile) ? 68 : 160;
  baby_counter.innerHTML = thousand.format(Math.floor(babies.scrollTop / bg_size * 5));
})

//Todo: stop executing once scrolled past
function update_wealth_counter() {
  if (bezos_viewable()) {
    let wealth = Math.min((window.scrollX - bezos.offsetLeft + 175) * 500000, MUSK_WEALTH);
    if (wealth > 0 && bezos_counter_viewable()) {
      // The dollar amount and percentage appear together at the
      // "just kidding" box, so the "coming up on the end" joke still lands.
      let pct = wealth / MUSK_WEALTH * 100;
      bezos_counter.innerHTML = money.format(wealth) + ' &middot; <strong>' + pct.toFixed(1) + '%</strong> of Elon Musk\'s wealth';
    }
    else {
      bezos_counter.innerHTML = '';
    }
  }
  else if (four_hundred_viewable()) {
    if (four_hundred_counter_viewable()) {
      let wealth = (window.scrollX - four_hundred.offsetLeft + 175) * 500000;
      four_hundred_counter.innerHTML = (wealth < 8000000000000) ? money.format(wealth) : "$8,000,000,000,000.00";
    }
    else {
      four_hundred_counter.innerHTML = '';
    }
  }
  function bezos_viewable() {
    return window.scrollX < bezos.offsetLeft + bezos.offsetWidth + 100;
  }
  function bezos_counter_viewable() {
    return bezosCounterStart.offsetLeft - window.scrollX < (window.innerWidth);
  }
  function four_hundred_viewable() {
    return window.scrollX < four_hundred.offsetLeft + four_hundred.offsetWidth + 100;
  }
  function four_hundred_counter_viewable() {
    return four_hundred_counter_start.offsetLeft - window.scrollX < (window.innerWidth);
  }
}
function toggleZoom() {
  document.getElementById('line-chart').classList.toggle('zoom');
}

// Back / Next buttons: jump to the previous or next piece of information.
(function () {
  var german = document.documentElement.lang === 'de';
  var nav = document.createElement('nav');
  nav.className = 'jump-nav';
  nav.innerHTML =
    '<button type="button" class="jump-prev">&lsaquo; ' + (german ? 'Zur&uuml;ck' : 'Back') + '</button>' +
    '<button type="button" class="jump-next">' + (german ? 'Weiter' : 'Next') + ' &rsaquo;</button>';
  document.body.appendChild(nav);

  var STICKY_CONTENT = '.title, .chart, .piechart, .worldchart, .chart-outer, .midtext, .title-square-wrapper, .center-sticky';
  var lastTarget = null, lastJump = 0;

  function pageLeft(el) {
    return el.getBoundingClientRect().left + window.scrollX;
  }

  // Where to scroll so that a stop is in view.
  // Box figures (a colored square or bar with its label) line up with the
  // left edge of the screen; text and charts are centered.
  var BOX_FIGURES = '.celebrities > *, .infectious > div, .lifetime, .healthcare, .amazon-year, .year-veteran, .year-chemo, .money-bar, .teacher-pay';

  function targetFor(el) {
    var left = pageLeft(el), width = el.offsetWidth, vw = window.innerWidth;
    if (el.matches(BOX_FIGURES)) {
      // Line up the square itself (the celebrity boxes have side margins).
      var square = el.closest('.celebrities') && el.querySelector('.square');
      return (square ? pageLeft(square) : left) - (vw <= 450 ? 10 : 40);
    }
    if (width <= vw) {
      return left + width / 2 - vw / 2;              // small: center it
    }
    if (el.classList.contains('infobox') && el.querySelector(STICKY_CONTENT)) {
      // Its content sticks to the middle of the screen (or 10px from the left
      // on phones) once its left edge reaches that point.
      return vw <= 450 ? left - 5 : left - vw / 2 + 5;
    }
    return left - 60;                                 // wide: show its start
  }

  function stops() {
    var els = document.querySelectorAll('.wealth-wrapper, .wealth-wrapper .infobox');
    var targets = [];
    for (var i = 0; i < els.length; i++) {
      // A box that holds a row of graphics gets one stop per graphic (below).
      if (els[i].classList.contains('celebrities') || els[i].querySelector('.infectious')) { continue; }
      targets.push(targetFor(els[i]));
    }
    // Graphics side by side in one box: Solomon, Beyonce, Tim Cook, the
    // doctor/lawyer column and the hedge fund manager; COVID, malaria, Ebola.
    var items = document.querySelectorAll('.celebrities > .sub-infobox, .celebrities > .column-infobox, .infectious > div');
    for (var j = 0; j < items.length; j++) {
      targets.push(targetFor(items[j]));
    }
    // Text in the middle of a wide box (the "$9 billion every week" line on
    // the chemotherapy bar) only comes into view partway through the box.
    // It is centered in its wrapper and sticks to the middle of the screen.
    var midtexts = document.querySelectorAll('.midtext-wrapper');
    for (var k = 0; k < midtexts.length; k++) {
      var wrapper = midtexts[k], text = wrapper.querySelector('.midtext');
      var start = pageLeft(wrapper) + (wrapper.offsetWidth - text.offsetWidth) / 2;
      targets.push(window.innerWidth <= 450 ? start - 5 : start - window.innerWidth / 2 + 5);
    }
    // The end of each giant bar, where its counter reaches the total
    // (the counter reads the bar 175px from the left of the screen).
    [bezos, four_hundred.querySelector('.wealth')].forEach(function (bar) {
      targets.push(pageLeft(bar) + bar.offsetWidth - 170);
    });
    var max = document.documentElement.scrollWidth - window.innerWidth;
    targets = targets.map(function (t) { return Math.max(0, Math.min(Math.round(t), max)); });
    targets.sort(function (a, b) { return a - b; });
    // Stops a few pixels apart show the same thing: keep the first.
    var kept = [];
    targets.forEach(function (t) {
      if (!kept.length || t - kept[kept.length - 1] > 300) { kept.push(t); }
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

  nav.querySelector('.jump-prev').addEventListener('click', function () { jump(-1); });
  nav.querySelector('.jump-next').addEventListener('click', function () { jump(1); });
})();
