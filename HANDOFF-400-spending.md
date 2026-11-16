# Handoff: "What have they actually spent it on?" for the 400

**Status: built 2026-11-15, then the 400's bar was reordered into titled
sections (the placement below is superseded). Uncommitted, awaiting the
owner's review.** See HANDOFF.md steps 4 and 6 and the sources table.

Written 2026-11-15 at the end of the session that rebuilt the 400's program
list. Read `HANDOFF.md`, `DESIGN.md` and `PRODUCT.md` first. Load the
`impeccable` skill before any UI work; this page has a strict design system.

## Where things stand

- **Uncommitted work in the tree.** The 400's ledger now has nine lasting
  programs, cheapest first: vaccines (Gavi) $11.9B, malaria $100B, transit
  repairs $140.2B, school meals endowment $224B, electricity and clean cooking
  $263B, internet $428B, clean water by 2030 $456B, US drinking water $625B,
  and the 2021 child tax credit endowment $2.14T. Together $4.39T, about 55%.
  "$3.6 trillion left". `img/combined.svg` was redrawn and is linked as
  `img/combined.svg?version=2026.11p` (bump the version on any image you
  change; the owner's browser cached the old one). The poverty window gives
  the 2025 poverty line ($32,649 for two parents and two children, about $22 a
  day each). Ask the owner whether to commit this before starting.
- **Open question for the owner**, unanswered: the design hook flags three
  tight line-heights (`tight-leading`, attribution unknown). Most are the
  intentional display headings; the two phone-only careers rules (11px at
  1.25, 13px at 1.3, `main.css` ~1620) may be real. Don't change them without
  an answer.

## The task (owner's words, 2026-11-15)

> go with your picks and build the section. also the bar should still be
> progress bar like Elon's, instead make the pie chart have an orange slice
> that grows as the spending is accumulated. Also, I would want to source
> everything, and at the top right, i want random names of the 400 rich
> americans and their net worth to appear as we scroll through the slides.
> I put the placement in red for showing you, but make it look cohesive with
> the presentation.

Three parts:

### 1. A spending section on the 400's bar

Mirror Elon's "What has Elon actually spent it on?" (`index.html` ~409–445):
an `infobox-half` heading, then `money-bar cost-bar` squares drawn to scale.
Cost bars are 569.21px tall and `cost / 1000 / 569.21` px wide (check against
`.musk-twitter`: $44B → 77,300.12px); small ones use `cost-bar-small`.

**Placement:** after the "whats-left" box ("…about $3.6 trillion") and right
before `.political-start` ("So why hasn't any of this happened?").
`.political-start` has `margin-left: auto` (`main.css` ~541) to push the
ending to the far end of the bar. Move that push to the new section's first
box, so the spending section and the political ending travel together at the
end. Re-check that the sources box still ends inside the bar
(`#four-hundred` is 12,649,021.28px wide; at the end of the last session the
sources box ended about 200px before the bar's end).

**Picks** (each is a lead from memory; nothing below is verified, so verify
every figure and link a primary or reputable source before it goes on the
page. Drop any item you can't source.)

| Item | Lead figure | Look for |
|---|---|---|
| Ken Griffin's Manhattan penthouse | $238M (2019), then a US home-price record | NYT / WSJ / Bloomberg |
| Jeff Bezos buys the Washington Post | $250M (2013) | Washington Post / NYT |
| Bezos's superyacht Koru | ~$500M (2023) | Bloomberg / Forbes |
| Ken Griffin's de Kooning and Pollock | ~$500M for the pair (2016) | Bloomberg / NYT |
| Blue Origin | Bezos said he sells ~$1B of Amazon stock a year to fund it (2017) | Reuters / CNBC |
| Barre Seid's gift to Leonard Leo's Marble Freedom Trust | $1.6B (2021, reported 2022), the largest known political gift | NYT / ProPublica |
| Steve Ballmer: Clippers + Intuit Dome | $2B team (2014) + ~$2B privately built arena (2024) | ESPN / LA Times |
| Walton–Penner group buys the Denver Broncos | $4.65B (2022) | NFL.com / ESPN |
| Josh Harris group buys the Washington Commanders | $6.05B (2023) | NFL.com / ESPN |

Order them cheapest first, like the programs. They total roughly $19B, about
0.23% of the 400's wealth. Compare items only to numbers already on the page,
e.g. the Commanders' $6.05B is about half of Gavi's $11.9B plan to vaccinate
500 million children (check the math before using any comparison). The "Mississippi school meals"
comparison floated in chat was never checked; don't use it.

**End the section with text, not bars**, leading into the political ending:
Harlan Crow's gifts and trips for Justice Clarence Thomas (ProPublica, 2023;
there is no single clean dollar total, so don't draw it as a bar). Barre Seid
also bridges into "So why hasn't any of this happened?". Optional: the Giving
Pledge (signers far richer now than when they pledged; Institute for Policy
Studies report), only if sourced.

Copy rules in house style: plain words, one idea per box, each number linked,
"About X% of the 400's wealth" on each bar. Add each source to the sources
paragraph at the bar's end and to the sources table in `HANDOFF.md`, and list
any arithmetic in the "our own arithmetic" sentence.

### 2. Strip: keep the progress bar, add an orange slice to the pie

The owner's screenshot shows the strip's progress bar at the political
section (Cancellation Orange sliver, "Billionaire families' 2026 midterm
spending, $1.7 billion"). Keep that behaving as it does now. The new behavior
is on the pie (`#pie-disc`, `update_pie` in `main.js` ~303):

- As the reader scrolls through each spending bar, an orange slice grows in
  proportion to how far the reading mark is through that bar, exactly the way
  program bars feed the pie today. Mark the spending bars with their own class
  and `data-cost` / `data-name` (not `.program`, which feeds "taken").
- Draw it after the programs' taken area: taken (stock) → spent (orange) →
  left (blue). Add a token `--pie-spent`. Use Cancellation Orange (#b4441a),
  per DESIGN.md's Pulled Stamp Rule for orange on stock; check it against
  the blue next to it.
- It will be tiny (~0.23%, under 1°). Keep it to scale, as the page always
  is. The text carries it: under "55% taken", add a line such as
  "Spent: $18.8 billion (0.23%)" while the section is on screen, and set
  `pie-now` to "Spent: <item>". Ask the owner before inventing a minimum
  slice width.
- Keep "$3.6 trillion left" as is: the programs are hypothetical, the
  spending is real money already gone, so decide with the owner whether
  "left" should drop by the spending. Default: don't change it.

### 3. Top-right ticker: random members of the 400

The owner's mock puts "JEFF BEZOS $300 Billion" (placeholder number) at the
top right of the 400's title row, level with "400 RICHEST AMERICANS ($8
TRILLION)" and "Forbes 400, September 2026".

- **Data:** Forbes' JSON endpoint answered in the last session through
  WebFetch:
  `https://www.forbes.com/forbesapi/person/forbes-400/2026/position/true.json?limit=400`
  (with `limit=5` it returned Musk $908B, Bezos $378B, Page $278B, Dell $263B,
  Brin $256B, count 400). WebFetch summarizes through a small model, so pull
  the list in chunks and cross-check a sample against forbes.com profiles and
  the figures already on the page (Musk $908B, Bezos $378B). Save it as a
  small static data file (e.g. `forbes400.js`: name + net worth in billions);
  no runtime fetch from Forbes. Credit: "Forbes 400, September 2026", already
  linked in the title.
  Don't spoof a browser user-agent with curl; that was blocked as
  unauthorized in the last session. If the endpoint stops answering, ask the
  owner for an export.
- **Behavior:** show one name at a time while the 400's bar is on screen;
  change the name at each Next/Back stop and as the reader scrolls past each
  infobox, picking at random without repeats until the list is used up.
  Hide it before the 400's bar and after its end.
- **Look:** make it part of the title row, not a red overlay: the
  `.title-dateline` scale and ink, name in the display face, net worth in
  the body face, e.g. "JEFF BEZOS · $378 billion". It must not collide with
  the title on narrow screens: on phones put it on its own line under the
  title, or hide it under ~600px, whichever reads better in screenshots.
  Respect `prefers-reduced-motion` (no fades). Give it `aria-hidden="true"`
  so screen readers don't hear a stream of names.

## How to check your work

- A live server may already be running on port 8765 (`python3 -I
  tools/live_server.py . 8765` fails if so; just use it).
- Screenshots: `node tools/cdp_shot.mjs http://127.0.0.1:8765/ <out.png> 1300
  760 "<setup js>"`. Scroll by setting `window.scrollTo(window.scrollX +
  el.getBoundingClientRect().left - 300, 0)` in the setup JS and return the
  pie text to read it back. Check 1300×760 and 500×900.
- `sh tools/walk_test.sh` must still report 0 pieces "never fully on screen".
- Confirm the pie reads 55% / $3.6 trillion left after the programs and shows
  the spent line through the new section.
- Update `HANDOFF.md` (story step 4, sources table), the story line in
  `.impeccable/surfaces/index-html.md`, and DESIGN.md if you add a token.
- Don't commit unless the owner asks.

## Prompt to start the fresh session

```
Read HANDOFF-400-spending.md and do the task it describes: build the "What
have they actually spent it on?" section on the 400's bar, the orange spent
slice on the pie, and the top-right ticker of random Forbes 400 members.
Source every figure before it goes on the page, and drop anything you can't
source. First ask me whether to commit the uncommitted work from the last
session and the line-height question it lists. Show me screenshots at desktop
and phone width when you're done. Don't commit until I say so.
```
