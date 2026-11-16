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
3. **Musk's bar ($908B), in titled sections** (each title is an
   `h2.what-could-we-do` in its own half-spaced box):
   - *How big is $908 billion?* "Elon is so wealthy…", the strip, the joke
     ("coming up on the end… lol, less than a tenth").
   - *Where does his money come from?* His stakes, then "$9 billion every week".
   - *How long would you have to work to earn it?* One year of Amazon and
     teacher pay, then *What do people typically earn in a lifetime?* and the grid (high school graduate + 9 jobs).
   - *How does he compare with other rich people?* Creators and celebrities,
     the $200M vs Bezos chart, Oxfam, "No single human needs…".
   - *How does it compare with what the US spends?* Homeless veterans, cancer drugs.
   - *What could Elon Musk alone pay for?*, *What has Elon actually spent it
     on?*, *And what did he take away?*, ending at the bar's end.
4. **The 400 richest ($8T)**, in titled sections like Musk's bar (owner,
   2026-11-15): *How much do the 400 own?* (intro, trillion note, 747) →
   *Could they have paid for 2020?* ($1,200 checks, CARES; not counted) →
   *What could the 400 pay for?* (vaccines (Gavi), malaria, transit repairs,
   school meals endowment, electricity and clean cooking, internet, clean
   water by 2030, US drinking water) → *What could they do for America's
   poor?* (poverty, 2021 child tax credit endowment) → *What would they have
   left?* (combined ≈55%, transform, "all of them would still be
   billionaires") → *What have they actually spent it on?*: nine real
   purchases as cost bars (569.21px tall, cost / 1000 / 569.21 wide, class
   `.spent` with `data-cost` and `data-name`), cheapest first: Griffin's
   penthouse $238M, the Washington Post $250M, Koru $500M (estimate),
   Griffin's two paintings $500M, Blue Origin $1B a year, the Clippers $2B,
   the Intuit Dome $2B, the Broncos $4.65B, the Commanders $6.05B; together
   $17.2B (0.21%). Each grows the pie's orange `--pie-spent` slice (to scale,
   a hairline) and the "$X spent (Y%)" line; "left" does not drop (owner,
   2026-11-15) → *Is it really so radical?* → "$3.6 trillion left" and the
   long blue run.
5. (2020 now lives inside step 4 as its own titled section; owner kept it,
   2026-11-15.)
6. **Political section, at the far end of the bar** (`.political-start`
   carries `margin-left: auto`): *What does their money buy in politics?* →
   a sliver buys political power → billionaire midterm spending $1.7B →
   super PACs → Barre Seid's $1.6B to Leonard Leo (an ink money bar to
   scale, 4,000px wide) and Harlan Crow's
   trips for Clarence Thomas (an ink box like the midterms bar, but sized to
   its words, not its $500,000, and labeled "not drawn to scale"; owner's
   choice, 2026-11-15). Neither is on the Forbes 400, so neither is counted
   → lobbying → oligarchy → "We cannot accept this level of inequality any
   longer." (the only poster-scale ending heading) → sources. A ticker at
   the top right shows one Forbes 400 member at a time (`forbes400.js`, a
   static copy of the September 2026 list; new name per box passed or
   Back/Next press; hidden when it would touch the title, so off on phones).
7. **Below-the-bar layer (not on the money scale):** the persistent "For
   scale" key, the persistent pie (400 section) and the Musk/400 counters. Both
   counters read "$X · Y% of … wealth" with a progress bar under them,
   orange for Musk, blue for the 400 (Nov 2026; the midterms sliver and its
   caption were removed). The
   malaria figures (death squares and the dot grid) moved out of the strip
   into chart windows on the 400's bar in Nov 2026.

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
| Poverty line, 2025 | $32,649 (2 adults, 2 children; ≈$22/person/day); $16,749 (single adult under 65) | Census thresholds via CRS IN12737, Sept 2026 | current |
| US population / households | 341.8M / 134.8M | Census Vintage 2025 / FRED TTLHH | current |
| High school graduate pay | $966/week | BLS Education pays, 2025 | current |
| Typical retirement savings, ages 55–64 | $239,000 median (63% hold any) | Fed SCF 2025, summary table 6 (all retirement accounts, families holding) | current |
| Amazon warehouse pay | ~$47,800 ($23/hr) | Fortune, Sept 2025 | current |
| Teacher average pay | $74,495 | NEA 2026 Rankings & Estimates (via NPR) | current |
| Beyoncé / Tim Cook | ~$1B / ~$3B | Forbes (Dec 2025) / secondary reports | approximate |
| Malaria deaths | 610k (2024); ~434k under-5 | WHO World Malaria Report 2025 | current |
| Clean water | 2.1B lack safe water; 354M open defecation | WHO/UNICEF JMP 2025 | current |
| Contaminated-water deaths | ~505k/yr | WHO (via UNDRR) | current |
| WFP famine plan | $6B, 42M people (2021) | NPR / Global News | historical |
| End world hunger by 2030 | ~$33B/yr; shown as $132B for 2027–2030 | Ceres2030 (IFPRI), 2020 | dated estimate |
| Free community college endowment | $184B ($9B/yr ÷ 4.9%) | Education Dept FY2025 plan ($90B/10 yrs), via EducationData; NACUBO-Commonfund FY2025 spending rate | current |
| Replace US lead pipes | ≥$45B (estimates to $90B) | Inside Climate News, Jan 2026 (EPA count ~4M lines, disputed) | current |
| Musk's Twitter purchase | $44B (Oct 2022) | NPR | historical |
| Musk 2026 midterm spending | at least $445M | AP via PBS NewsHour, Nov 5 2026 (NYT tally ~$474M) | current |
| Musk taxes 2014–2018 | $455M; wealth +$13.9B; 3.27% "true tax rate"; $0 federal income tax in 2018 | ProPublica (IRS data), 2021 | historical |
| Musk taxes 2021 | over $11B, his own statement | CNBC, Dec 2021 | historical, self-reported |
| DOGE claimed savings | ~$215B claimed; GAO found $110B tested unreliable, 2,503 of 13,476 contracts never terminated | GAO-26-108615 via CNBC, Aug 2026 | current |
| Cost of DOGE's workforce cuts | $135B in FY2025 | Partnership for Public Service (nonpartisan), via CBS News, Apr 2025 | estimate |
| EPA spending canceled with DOGE | at least $29B, EPA's own count | FedScoop, Oct 2025 | agency claim |
| Deaths from foreign aid cuts | >750,000 (>500,000 children) by Jan 2026 | Brooke Nichols (BU) Impact Counter, via AFP/Taipei Times; model estimate, not peer-reviewed | estimate; drawn as dots (1 per 1,000), never a box |
| Projected deaths to 2030 | >14M, ~4.5M children under 5 | The Lancet (2025), via NPR | projection |
| US public K-12 spending | $927B/yr | NCES Fast Facts (2020–21, 2022–23 $) | removed from the page (Nov 2026) |
| Griffin penthouse | $238M (2019), a US record | Reuters via NBC News | historical; price from Griffin's spokesman |
| Bezos buys the Washington Post | $250M cash (2013) | Al Jazeera (Post Co. release) | historical; WaPo's own story blocked our fetch |
| Bezos yacht Koru | >$500M (2023) | Bloomberg via gCaptain | estimate |
| Griffin's de Kooning + Pollock | $500M for the pair (summer 2015) | CNBC, Feb 2016 (unnamed sources; Bloomberg broke it) | reported |
| Blue Origin | ~$1B of Amazon stock a year (Bezos, 2017) | CNBC | per year; no reputable cumulative total found |
| Ballmer buys the Clippers | $2B (2014) | ESPN | historical |
| Intuit Dome | "upward of $2 billion" | ESPN, 2021 | estimate; "privately paid" not sourced, so not claimed |
| Walton-Penner group buys the Broncos | $4.65B (2022) | ESPN | historical; a group led by Rob Walton |
| Harris group buys the Commanders | $6.05B (2023), a record | ESPN | historical; a group; ≈ the WFP's 2021 $6B famine ask |
| Barre Seid gift to Marble Freedom Trust | $1.6B (2020–21), largest known donation to a political advocacy group | ProPublica, Aug 2022 | historical; Seid is not on the Forbes 400; ink money bar, 4,000px |
| Crow trips for Clarence Thomas | 20+ years; 2019 Indonesia trip could have exceeded $500,000 | ProPublica, Apr 2023 | historical; Crow is not on the Forbes 400; ink box, labeled not to scale |
| Forbes 400 names (ticker) | 400 names, Sept 2026 list values | Forbes API (`forbes-400/2026/position/true.json`), pulled twice in chunks, 0 diffs; 9 profiles spot-checked | static copy in `forbes400.js` |
| Giving Pledge (unused) | 32 original pledgers still billionaires: +283% since signing | Institute for Policy Studies, July 2025 (advocacy) | sourced, not on the page |
| Billionaire midterm spending | $1.7B (81% super PACs), 53× since 2010 | Americans for Tax Fairness, FEC data to Aug 2026 | current, advocacy source |
| Musk 2024 election spending | ~$290M | CNN (FEC filings) | current; now a cost bar on Musk's bar (moved from the political ending) |
| Federal lobbying 2025 | >$5B (~$9M per member of Congress) | LegiStorm; matches OpenSecrets, Bloomberg Gov | current |
| Gavi 2026–2030 | $11.9B; 500M children, ≥8M lives; ~$9B pledged | Gavi; TimesLIVE, June 2025 | current |
| Transit repair backlog | $140.2B (up from $101.4B in 2018) | FTA National Backlog Analysis, Jan 2025 | current |
| Free school meals endowment | $224B ($11B/yr extra ÷ 4.9%; ~$30B/yr total vs $19B now) | Baker Institute, Rice; NACUBO FY2025 | estimate |
| Electricity + clean cooking | $263B ($23B/yr × 2027–2035 + $4B/yr × 2027–2040); 730M without power, ~2B without clean cooking | IEA WEO 2025 (ACCESS scenario) | current |
| Household air pollution deaths | 2.9M (2021), >309k under 5 | WHO fact sheet | current |
| Internet for everyone by 2030 | $428B, 3B offline | ITU Connecting Humanity, 2020 | dated estimate |
| Clean water by 2030 | $456B ($114B/yr × 2027–2030) | World Bank, 2016 | dated estimate |
| US drinking water needs | $625B over 20 yrs (includes lead lines) | EPA 7th DWINSA, 2023 | current |
| 2021 child tax credit endowment | $2.14T ($105B/yr ÷ 4.9%); child poverty 5.2% (2021) → 12.4% (2022) | JCT via CRS IN11851 (Feb 2022); Census SEHSD WP 2022-24; CBS News | estimate |
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
| `img/cares.svg`, `img/poverty.svg`, `img/combined.svg` | Charts rebuilt for 2026 (combined = the 55% pie, nine programs). `img/ninety.svg` is the old 2020 pie, now unused. |
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
