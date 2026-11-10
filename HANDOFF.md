# Handoff: reorganize and polish "Wealth, shown to scale" with impeccable

Written 2026-11-09 at the end of a long session. Everything a fresh session needs
to continue is here; you should not need the old conversation.

## How to start

1. Open Claude Code in `~/Git-Repositories/1-pixel-wealth` (this folder).
2. Run `/impeccable shape` and point it at this file:
   > /impeccable shape — read HANDOFF.md first; it has the product truth, the
   > owner's decisions, the proposed story and the constraints.
3. There is no PRODUCT.md or DESIGN.md yet. When `shape` asks, let it run
   `init` (write PRODUCT.md from the "Product truth" section below) before any
   visual work. The existing look is evidence, not a mandate (see "Visual
   direction").
4. Start the live preview (see "Tools") so the owner can watch changes.

## Product truth

- **What it is:** a single, very wide, horizontally scrolling web page that
  shows US wealth inequality *to scale*: every dollar amount is drawn as an
  area at **$1,000 per square pixel**. It's a fork of Matt Korostoff's 2020
  "Wealth, shown to scale" (via `eattherichtextformat/1-pixel-wealth`),
  updated with 2026 figures.
- **Owner:** a high school math teacher (Harvard-Westlake). The audience is
  the general public and students: people who underestimate how rich the
  super rich are.
- **Mode:** Persuade/Experience: an argued, scroll-driven explainer. It is
  openly persuasive (its thesis is that extreme wealth concentration is an
  oligarchy problem), but every number must be sourced and accurate.
- **What success looks like:** a reader scrolls (or clicks Next) through the
  whole thing, *feels* the scale, and finishes on the political point.
- **Live:** https://juanlopez713.github.io/1-pixel-wealth/ (GitHub Pages,
  branch `gh-pages` of `JuanLopez713/1-pixel-wealth`, which is the default
  branch).
- **Stack:** plain static HTML/CSS/JS. `index.html`, `main.css`, `main.js`,
  `img/*.svg|png`, a German page in `de/` (loads the English HTML and swaps
  strings by `i18n-*` class; see `i18n.js`, `de/i18n_de.js`). No build step,
  no framework, no dependencies. Keep it that way unless the owner agrees.

## Current state (read before touching anything)

- Last **published** commit: `4ca4572` on `gh-pages` (pushed; live).
- Work continues on the local branch **`redesign-2026`** (not pushed). Its
  first commit holds these changes the owner reviewed in the local preview but
  has not published yet. Don't push or merge into `gh-pages` until the owner
  says to publish:
  - Lifetime-earnings label reworded ("On average, a person's earnings…").
  - Next/Back stops for the mid-bar Musk sentence, each celebrity square,
    and each COVID/malaria/Ebola bar; box figures align to the left edge.
  - $200 million vs. Bezos chart: red $200M, and a 300× close-up when zoomed.
  - "For scale" key ($1,000 / median income / $1 million) under Musk's bar.
  - Teacher pay square; "What could Elon Musk alone pay for?" (famine plan,
    end hunger, free college, Biden debt relief); end-of-bar public-schools note.
  - Political section ("So why hasn't any of this happened?": billionaire
    midterm spending, Musk 2024, lobbying, oligarchy) before "We cannot accept…".
  - `tools/` folder (helper scripts, below) and this file. Decide with the
    owner whether `tools/` and `HANDOFF.md` should be published; GitHub Pages
    serves every file in the branch.

## The owner's decisions (must-haves)

From the owner, 2026-11-09. These are decided; don't relitigate them.

1. **Reorganize the story:** start with fun facts, end with the political side.
2. **Keep the main bars about money only.** Everything drawn on the scrolling
   bars must be a dollar amount at $1,000 per square pixel.
3. **Deaths move off the money bars.** The COVID / malaria / Ebola comparison
   (and likely the malaria-babies scroller) is interesting but its scale is
   not money, so it becomes an **auto-animating widget below** the bars.
4. **A pie chart that is always visible in the 400-richest section**, showing
   how much of their wealth "we've taken away" as each program is funded. It
   should update cumulatively and end with what's left (they all stay
   billionaires).
5. **The "For scale" key stays on screen** once it appears under Musk's bar,
   including through the 400 section (right now it's stuck inside Musk's bar
   and disappears).
6. Keep: Back/Next buttons (smooth scroll to the next piece of content; must
   never skip a text or graphic), the Musk counter that shows dollars +
   "% of Elon Musk's wealth" starting at the "Lol, just kidding" box (not
   before; that keeps the "coming up on the end" joke), the fork credit on the
   title screen, and the sources box at the end.
7. Box figures (a colored square/bar with a label) line up at the **left
   edge** of the screen when you land on them; text and charts are centered.
8. Musk is the richest-person bar (not Bezos). Bezos appears in the $200M chart.

## Proposed story arc (confirm with the owner in `shape`)

1. **Title:** "Wealth shown to scale" + fork credit, Next button.
2. **The familiar:** $1,000 → $87,460 median household income → $1 million →
   $1 billion.
3. **Musk's bar ($908B): fun facts and perspective.** "Elon is so wealthy…",
   the joke ("coming up on the end… lol, less than a tenth"), lifetime
   earnings, health insurance, Amazon pay, teacher pay, homeless veterans,
   chemotherapy + "$9 billion every week", the celebrities, the $200M vs Bezos
   chart, "No single human needs…", then "What could Elon Musk alone pay
   for?" in ascending order, ending at the bar's end with the public-schools note.
4. **The 400 richest ($8T): what this wealth could fund.** Who they are (the
   747), then programs in ascending cost, each
   taking a slice out of the always-visible pie: malaria, $1,200 per household,
   poverty, medical debt, clean water, $10,000 per household, federal student
   loans → combined (≈48%) → "all of them would still be billionaires".
5. **History (2020):** COVID testing, CARES Act, 2018 taxes. Open question:
   keep as one short "In 2020…" beat inside step 4, or drop.
6. **Political ending:** "So why hasn't any of this happened?": billionaire
   midterm spending, Musk's 2024 spending, lobbying, oligarchy → "We cannot
   accept this level of inequality any longer." → sources.
7. **Below-the-bar layer (not on the money scale):** the persistent "For
   scale" key, the persistent pie (400 section), the Musk/400 counters, and the
   deaths widget (auto-animating; shows when the malaria content is on screen).

## Open questions for `shape`

- Where exactly does the deaths widget live and what does it animate? (e.g. a
  live counter of malaria deaths at the real rate, about one child under five
  every 73 seconds; and/or the COVID/malaria/Ebola bars growing in). Does
  the babies scroller stay, become automatic, or go?
- The pie: what counts as "taken away"? Proposal: only the present-day
  programs in step 4 (not 2020 history), cumulative, labelled with % and
  dollars remaining. Shown from the first program to the "still billionaires" beat.
- The 2020 history items: keep, shrink to one beat, or remove?
- Do the "For scale" key and pie share one bottom "instrument panel" with the
  counter, or stay separate? (Mind the Back/Next buttons at the bottom center.)
- Visual direction: keep the original's plain, data-first look (black text,
  orange Musk bar, blue 400 bar) or a refreshed world? The owner has not
  asked for a new look; treat this as refinement unless they say otherwise.

## Hard constraints and gotchas

- **Scale is sacred.** $1,000 per square pixel everywhere on the bars. Bars
  are 500 px tall: $500,000 per px of width. Squares: side = √(dollars ÷
  1000) px. Money bars inside a bar: 400 px tall, width = dollars ÷ 400,000.
  If you change a number, change its drawn size too (in `main.css`, or the
  inline `style="width: …"` on money bars in `index.html`).
- **Cost bars** (`.money-bar.cost-bar`, Musk's bar): one recipe for every
  "what could Elon pay for" slide. 18 squares tall (569.21 px), centered,
  width = dollars ÷ 1,000 ÷ 569.21; the label uses the program spans
  (`program-name`, `-cost`, `-share`, `-source`) on a stock window in key ink.
  To add one, copy an existing block in `index.html` and set its width.
- **Page width is close to the browser limit.** The document is about
  17.82 million px wide (Musk bar 1,816,000 px; 400 bar 16,000,000 px).
  Firefox's maximum is about 17.9 million. Don't add width outside the bars;
  put new content *inside* existing bars (there's lots of empty bar).
- **Nothing in a bar's flex row may change width at runtime.** The counter
  has a fixed 140px width for this reason (its growing text used to push
  every later box 190px right and break the Next targets). New overlays that
  live inside a bar use zero-width sticky wrappers (see `.scale-key`).
- **Sticky positioning does a lot of work.** On screens wider than 450px,
  text, charts and squares with labels all stick on the lane (`--lane` in
  `main.css`, 189.74px: one $1 million square right of the 158.11px grid);
  on phones (≤450px) things stick 10px from the left or center. Next/Back
  targets in `main.js` (`targetFor`, `stops`) read `--lane` and put each
  stop's content on it exactly, measuring sticky content with its offsets
  switched off (`.jump-measuring`); change them together.
- **Next/Back** (`main.js`, the IIFE at the bottom): stops are every
  `.wealth-wrapper`, every `.wealth-wrapper .infobox`, each celebrity /
  infectious child, `.midtext-wrapper` text, and the end of each giant bar.
  Box figures are listed in `BOX_FIGURES`. After any layout change, run
  `tools/walk_test.sh 1400` and `tools/walk_test.sh 1000`; both must say
  "0 never fully on screen".
- **German page** (`/de/`): changed English passages get a new `i18n-*` key
  (suffix `-2026`) so German falls back to English instead of showing stale
  German numbers. New sections are English-only on the German page.
- **Copy rules from the owner's org:** human review of all content; don't
  invent facts or sources; cite everything; label advocacy sources as such
  (Americans for Tax Fairness is "a progressive advocacy group").
- **Never publish a number without a source link.** Ask before replacing
  factual copy or adding claims.

## Data inventory (current figures)

| Figure | Value | Source | Status |
|---|---|---|---|
| Musk net worth | $908B | Forbes 400, Sept 2026 | current |
| 400 richest Americans | $8T | Forbes 400, Sept 2026 | current |
| Bezos (chart) | $378B | Forbes 400, Sept 2026 | current |
| Bottom 50% of households | $4.3T | Fed DFA via FRED (WFRBLB50107), Q2 2026 | current |
| Median household income | $87,460 | Census P60-289 (2025) | current |
| People in poverty | 34.5M | Census P60-290 (2025) | current |
| US population / households | 341.8M / 134.8M | Census Vintage 2025 / FRED TTLHH | current |
| Family health premium | $28,303 | KFF 2026 EHBS | current |
| Amazon warehouse pay | ~$47,800 ($23/hr) | Fortune, Sept 2025 | current |
| Teacher average pay | $74,495 | NEA 2026 Rankings & Estimates (via NPR) | current |
| Beyoncé / Tim Cook | ~$1B / ~$3B | Forbes (Dec 2025) / secondary reports | approximate |
| Malaria deaths | 610k (2024); ~434k under-5 | WHO World Malaria Report 2025 | current |
| Clean water | 2.1B lack safe water; 354M open defecation | WHO/UNICEF JMP 2025 | current |
| Contaminated-water deaths | ~505k/yr | WHO (via UNDRR) | current |
| Medical debt | ≥$220B | KFF 2024 | current |
| Federal student loans | $1.7T, 42M borrowers | Federal Student Aid, Sept 2026 | current |
| WFP famine plan | $6B, 42M people (2021) | NPR / Global News | historical |
| End world hunger by 2030 | ~$33B/yr | Ceres2030 (IFPRI), 2020 | dated estimate |
| Tuition-free college | up to ~$100B/yr | Georgetown (2020) in 2025 $, via EducationData | dated estimate |
| Biden debt relief | ~$400B | CBO 2022 (via NPR) | historical |
| US public K-12 spending | $927B/yr | NCES Fast Facts (2020–21, 2022–23 $) | removed from the page (Nov 2026) |
| Billionaire midterm spending | $1.7B (81% super PACs), 53× since 2010 | Americans for Tax Fairness, FEC data to Aug 2026 | current, advocacy source |
| Musk 2024 election spending | ~$290M | CNN (FEC filings) | current |
| Federal lobbying 2025 | >$5B (~$9M per member of Congress) | LegiStorm; matches OpenSecrets, Bloomberg Gov | current |
| Poverty cost | ~$195B | 2019 Census-based $170B, adjusted for inflation and today's count | estimate (stated on page) |
| Lifetime earnings $1.7M, chemo $9B, veterans housing, Solomon $50M, doctor/lawyer/hedge fund | | Original 2020 figures | **not updated**; refresh or cut |
| COVID testing $100B, CARES $2.2T, 2018 taxes $200B, COVID/malaria Jan–Apr 2020 | | Original 2020 sources | historical |

Final 2026 midterm outside-spending totals weren't out yet on 2026-11-09;
update the political section when OpenSecrets publishes them.

## Files

| Path | What |
|---|---|
| `index.html` | All content. Musk's bar is `#bezos` (id kept from the original); the 400 bar is `#four-hundred`. |
| `main.css` | All styles. Bar widths, square sizes, money-bar colors, nav, scale key. |
| `main.js` | Scroll counters (`update_wealth_counter`), people/babies scroll counters, zoom toggle, Back/Next navigation. |
| `img/cares.svg`, `img/poverty.svg`, `img/combined.svg` | Charts rebuilt for 2026 (combined = the 48% pie). `img/ninety.svg` is the old 2020 pie, now unused. |
| `de/` | German page; `de/i18n_de.js` has the strings and `images: ['plane.png']`. |
| `tools/` | Helper scripts (below). |

## Tools

- **Live preview:** `python3 -I tools/live_server.py . 8000`, then open
  http://127.0.0.1:8000/. CSS edits apply in place; other edits reload the
  page and keep the scroll position. If you run it from a sandboxed shell, the
  browser may not reach it; run it unsandboxed (it binds only to 127.0.0.1).
- **Screenshots of any scrolled spot:** plain `chrome --headless --screenshot`
  comes out blank anywhere but the top-left of this page. Use
  `node tools/cdp_shot.mjs <file-or-http-url> out.png 1300 760 "<async JS to run first>"`,
  e.g. click Next a few times and then screenshot. It prints the JS's return value.
- **Next/Back coverage test:** `tools/walk_test.sh 1400` (and `1000`). Lists any
  piece of content that never comes fully on screen.
- **Note on browsers:** the Claude-in-Chrome extension's default browser for this
  account is a *Windows* machine ("Browser 1"), which can't see localhost on this Mac.
  The owner's Mac Chrome is "Browser 2"; ask before switching.

## Publishing (only when the owner says so)

1. Commit on `gh-pages` (or a branch, then fast-forward `gh-pages`) and push to `origin`.
2. Bump the `?version=` cache-busting query on `main.css` / `main.js` in
   `index.html`, `de/index.html` and `i18n.js` whenever CSS/JS changes.
3. Watch the "pages build and deployment" run (`gh run list -R JuanLopez713/1-pixel-wealth`).
   GitHub Pages had hiccups on 2026-11-09: a deploy job silently not running,
   and a re-run stuck in "queued" that blocked later deploys. If a deploy doesn't
   finish, trigger a fresh build:
   `gh api -X POST repos/JuanLopez713/1-pixel-wealth/pages/builds`.
   There's a zombie queued run (42671246137, an older commit) that GitHub won't
   cancel or delete; if it ever runs, it would roll the site back, so always check
   the live `?version=` after publishing.
4. Verify on the live site, not just locally.
