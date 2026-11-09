window.addEventListener("load", async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const vw = innerWidth;
  // Every piece of content a reader should land on.
  const content = [...document.querySelectorAll(
    ".wealth-title, .infobox .title, .midtext, .piechart, .chart, .worldchart, .chart-outer, .people-wrapper, .babies-wrapper, .plane, .ninety, .sub-infobox, .corona-bar, .malaria-bar, .ebola-bar, .title-square-wrapper, .bar-end-note")]
    .filter(e => !e.closest(".sub-infobox") || e.classList.contains("sub-infobox"))
    .filter(e => !(e.classList.contains("title") && e.closest(".corona-bar, .malaria-bar, .ebola-bar")));
  const name = e => (e.innerText || e.className || "").trim().replace(/\s+/g, " ").slice(0, 55) || e.className;
  const seen = new Set();
  const look = () => {
    content.forEach((e, i) => {
      const r = e.getBoundingClientRect();
      const w = Math.min(r.width, vw);
      const visible = Math.min(r.right, vw) - Math.max(r.left, 0);
      if (r.width > 0 && visible >= w * 0.9 - 1) seen.add(i);
    });
  };
  let stops = 0, last = -1;
  look();
  for (let i = 0; i < 300; i++) {
    document.querySelector(".jump-next").click(); await wait(120);
    if (Math.round(scrollX) === last) break;
    last = Math.round(scrollX); stops++; look();
  }
  const missed = content.filter((e, i) => !seen.has(i)).map(name);
  document.body.setAttribute("data-log", JSON.stringify(["width " + vw + ": " + stops + " stops, " + content.length + " pieces, " + missed.length + " never fully on screen"].concat(missed)));
});
