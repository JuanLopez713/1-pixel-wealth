---
name: Wealth, shown to scale
description: US wealth inequality at $1,000 per square pixel, printed as a public-works silkscreen poster.
colors:
  stock: "#efe6d2"
  ink: "#1c1a17"
  orange: "#e0662a"
  blue: "#25547f"
  gold: "#c9a227"
  stamp: "#b4441a"
typography:
  display:
    fontFamily: "Big Shoulders Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(72px, 11vw, 168px)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "0.005em"
  figure:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(44px, 7.4vw, 128px)"
    fontWeight: 900
    lineHeight: 0.86
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "46px"
    fontWeight: 900
    lineHeight: 0.95
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "34px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.01em"
  label:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "22px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.04em"
  stamp:
    fontFamily: "Big Shoulders Stencil, Arial Narrow, sans-serif"
    fontSize: "72px"
    fontWeight: 900
    lineHeight: 1
  body:
    fontFamily: "Public Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.45
  body-small:
    fontFamily: "Public Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.35
    fontFeature: "tnum"
  dateline:
    fontFamily: "Public Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  none: "0px"
  disc: "50%"
spacing:
  xs: "8px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  pixel: "1px"
  million: "31.62px"
  ruler-section: "200px"
  grid-zone: "158.11px"
  lane: "189.74px"
  money-bar: "400px"
  bar: "500px"
components:
  tab:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "9px 22px 8px"
  tab-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
  tab-home:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "9px 16px 8px 14px"
  bar-label:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0 10px 8px"
  familiar-square:
    backgroundColor: "{colors.blue}"
    rounded: "{rounded.none}"
    size: "{spacing.million}"
  grid-100m:
    rounded: "{rounded.none}"
    width: "221.36px"
    height: "474.34px"
  progress-track:
    rounded: "{rounded.none}"
    width: "360px"
    height: "14px"
    padding: "3px"
  progress-fill:
    backgroundColor: "{colors.orange}"
  progress-fill-political:
    backgroundColor: "{colors.stamp}"
  career-square:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.none}"
  stock-window:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  ink-field:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: "{spacing.money-bar}"
    padding: "{spacing.sm}"
  program-label:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.blue}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "18px 24px"
  cost-label:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "18px 24px"
  stamp:
    textColor: "{colors.stamp}"
    typography: "{typography.stamp}"
    rounded: "{rounded.none}"
    padding: "6px 18px 2px"
  ink-label:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  pie-disc:
    rounded: "{rounded.disc}"
    size: "clamp(56px, calc(100vh - 705px), 130px)"
---

# Design System: Wealth, shown to scale

## Overview

**Creative North Star: "Public Works Silkscreen"**

The page is a public-works poster pulled in flat inks on buff stock, after the 1936-43 Federal Art Project posters for public programs. Each ink is a fixed meaning, not a decoration: orange is Elon Musk's money, blue is the 400 richest Americans' money and the familiar amounts that set the scale, key ink is everything else drawn to scale, and bare stock is paper with nothing printed on it. When a program is funded, its ink is cut away and the stock shows through. The scale is the argument, so the system's first job is to leave every drawn area exactly the size its dollars say.

Density is poster density: one idea per stop, solid poster capitals (Big Shoulders Display) that shout, Public Sans that reads, and long stretches of solid ink the reader scrolls through to feel a sum. The cut stencil survives only as decoration, on the title poster and the FUNDED stamp; the direction contract named stencil capitals for headings, and the build moved them to the solid face. Every bar carries a printed ruler of $100 million sections, and when the reader stops, a grid of one hundred $1 million squares prints over the section at the left edge. There is no elevation, no gradient lighting, no rounded card. Depth is only ink over stock, and the one sanctioned misregistration (orange pulled under the key ink) on the title and the ending poster.

**Key Characteristics:**
- Six inks, each with one job; gold is reserved for "now".
- $1,000 per square pixel wherever money is drawn; rulers mark $100 million every 200px.
- Solid poster capitals (Big Shoulders Display 900) for headings, bar labels, figures, tabs and counters; Big Shoulders Stencil only for the title poster and the FUNDED stamp; Public Sans for reading.
- Every amount's label sits above its shape, in ink on stock.
- Square corners everywhere; the pie is the only round shape.
- The knock-out: a program's blue is cut back to bare stock as the reader passes, and the pie loses the same slice.
- Charts and photos sit in windows of bare stock; nothing is lifted with a shadow.

## Colors

A two-ink poster palette (orange and blue over key ink) on uncoated buff stock, with one reserved highlight and one darker pull for marks.

### Primary
- **Musk Orange** (#e0662a): the fill of Elon Musk's bar, money attributed to him, and the progress bar's fill while the counter climbs through his fortune. Text on it is key ink (5.05:1). It also prints the title's out-of-register second ink. On bare stock it fails text contrast (2.77:1), so it never carries text or thin marks there.
- **Cancellation Orange** (#b4441a): orange pulled darker for marks on bare stock: the FUNDED stamp, the orange marks in recolored charts, and the progress bar's sliver at the political section. It measures 4.47:1 on stock, so it is for large or bold marks (stamps, chart fills and strokes), not small body text.

### Secondary
- **Ledger Blue** (#25547f): the fill of the 400 richest Americans' bar and the uncut part of every program bar. It also prints the familiar amounts (the $1,000 pixel, the $87,460 median square, the $1 million square, the For scale key squares, the title poster's lone pixel) and net worth in the celebrities row. Text on it is stock (6.38:1). On stock windows it is the program label's ink (6.38:1). It is also the pie's remaining wealth.

### Tertiary
- **Reserved Gold** (#c9a227): the one highlight ink, meaning "the thing you are on now": the in-progress pie slice, the reading mark at the screen's middle, and text selection.

### Neutral
- **Buff Poster Stock** (#efe6d2): the page, with a faint even tooth (5px dot grid of key ink at 5% alpha). Also every window for charts and photos, the knocked-out part of a program bar, the rulers and key markers on the ink and blue bars, the focus ring's halo, and type on blue and ink fields.
- **Key Ink** (#1c1a17): body text on stock and orange, every bar label, the $1 billion bar, money bars on Musk's bar and the political bars, earnings squares (careers and one year's earnings in the celebrities row), the 10px strip, Back/Next/Home tabs, ink labels, focus rings, the ruler on Musk's bar, and arrows.

### Named Rules
**The One Ink, One Meaning Rule.** Orange is Musk's money; blue is the 400's money, net worth, and the familiar amounts that set the scale; key ink is earnings and every other amount drawn to scale. Do not reassign a bar's ink for variety.

**The Reserved Gold Rule.** Gold (#c9a227) appears only for "now": the in-progress pie slice, the reading mark, and `::selection`. Focus rings are ink on a stock halo, because gold fails 3:1 on stock and orange. A finished state is never gold; a funded slice goes to stock.

**The Pulled Stamp Rule.** Marks and text on bare stock that want orange use Cancellation Orange (#b4441a), never Musk Orange.

**The Ink Pairing Rule.** Key ink on orange; stock on blue and on ink fields; blue or ink on stock. Charts and photos never sit directly on a bar: they sit in a stock window.

## Typography

**Display Font:** Big Shoulders Display, weight 900, always uppercase (with Arial Narrow, sans-serif)
**Decoration Font:** Big Shoulders Stencil, weight 900, uppercase: the title poster and the FUNDED stamp only
**Body Font:** Public Sans (with Helvetica Neue, Arial, sans-serif), roman and italic
All three are self-hosted woff2 under the SIL Open Font License (`fonts/`).

**Character:** Solid condensed poster capitals against a plain, civic sans built for government documents. The capitals do the shouting; Public Sans does the explaining and the sourcing. The cut stencil is kept as a printer's flourish where the page is a poster (the title) or a rubber stamp (FUNDED).

### Hierarchy
- **Display** (Stencil 900, clamp(72px, 11vw, 168px), 0.84, uppercase, balanced, max 11ch): the title poster only, with the orange overprint. The ending line takes the same scale and overprint in the solid face at 92px, 0.9 (52px on phones).
- **Figure** (Display 900, clamp(44px, 7.4vw, 128px), 0.86, no wrap): one oversized number per program, the program's cost. 44px on phones. The pie's percentage (48px, 0.9) is the strip's figure.
- **Headline** (Display 900, 46px, 0.95, uppercase): section turns such as "What could we do with 46% of this money?"; 36px on phones.
- **Title** (Display 900, 34px, 1, uppercase, 0.01em, no wrap): bar labels, set above their shape. Program names at 30px (24px on phones), the strip counter at 30px (20px on phones), chart headings at 24px, the deaths heading at 19px. Bar labels drop to 22px and may wrap on phones (the median's label 19px).
- **Label** (Display 900, 22px, 0.04em, uppercase): Back/Next/Home tabs, the zoom tab (20px).
- **Stamp** (Stencil 900, 72px, 1, uppercase): the FUNDED stamp only; 48px on phones.
- **Body** (400, 19px, 1.45): infobox reading text, max 600px wide (450px for chart columns). Paragraph gap 0.7em. Money-bar labels at 19px/1.4, the bar-end note at 22px, the credit at 15px/1.5, career working at 12.5px/1.3.
- **Body Small** (400, 14px, 1.35, tabular numerals): the strip, the scale key (13px), the progress label (13px), death captions (12px). The "$100 million" key marker is 14px bold; the grid's label is 12px bold.
- **Dateline** (400, 13px): source, value and date set beside a bar label or under a program or chart. Sources box at 13.5px.

### Named Rules
**The Capitals Shout, Sans Explains Rule.** Poster capitals are uppercase and weight 900, for names, labels, figures, tabs and counters. Sentences and sources are Public Sans. Never set a paragraph in poster capitals.

**The Stencil Is Decoration Rule.** Big Shoulders Stencil prints only the title poster and the FUNDED stamp. Every other heading, label, figure and tab is Big Shoulders Display.

**The One Big Number Rule.** Each program carries exactly one Figure-size number, its cost, and the label window always holds the whole number (`width: max-content`, no wrap).

**The Lining Figures Rule.** Body numerals are lining; anything that counts (the strip) uses tabular numerals so it does not jitter.

## Layout

One horizontal row, roughly 17.82 million px wide, read by scrolling sideways or by Back/Next/Home. Width is money: this is the hard constraint behind every layout decision.

- **Scale:** $1,000 per square pixel wherever money is drawn. Big bars are 500px tall ($500,000 per px of width). Money bars inside a bar are 400px tall, width = dollars / 400,000. Squares have side = sqrt(dollars / 1000) px: the $87,460 median is 9.35px, $1 million is 31.62px. Bar and square sizes are computed values, set inline or per figure; never round, pad, border, or min-width them in a way that changes their area.
- **Labels above shapes:** every amount's label sits above its shape, in key ink on stock. The labels of the $1 billion, Musk and 400 bars sit outside the bar, along its top edge, and stay pinned at the left of the screen (sticky, 10px side padding, 8px above the bar) as the reader scrolls; the 400's label carries the bar's own 100px offset. Datelines sit beside the label (hidden on phones).
- **Rulers:** the $1 billion, Musk and 400 bars carry a ruler along their foot, one 200px section per $100 million, with a big tick at $0, a middle tick at $50 million and small ticks every $10 million. The ruler prints in key ink on Musk's orange bar and in stock on the ink $1 billion bar and the blue 400 bar.
- **Bar row:** a bar is a flex row (`.wealth`) holding its sticky key marker, rulers, and infoboxes. Nothing in that row may change width at runtime, and no new content may add page width; new material goes inside an existing bar's span (the far end of a bar uses `margin-left: auto`).
- **Grid zone and lane (wider than 450px):** the left 158.11px of each bar (5 $1 million squares) belong to the $100 million grid. Everything a Back/Next stop lands on (box figures, text, charts, a bar's start) puts its left edge on the lane, one square (31.62px) right of the grid: `--lane`, 189.74px, 6 squares from the left. Sticky content holds on the lane. Text widths cap at min(600px, calc(100vw − lane − 60px)), wide charts and photos at calc(100vw − lane − 60px), sources at min(720px, calc(100vw − lane − 60px)).
- **Infobox rhythm:** text boxes are spaced by fixed left margins (500px close, 2000/4000px quarter/half, 6000px default, 30000px for the first) and their content sticks to the center line.
- **Phones (450px and under):** no grid and no snapping. Box figures sit 10px from the left and text centers on the screen.
- **The strip:** fixed below the bars (8px under the bar's bottom edge, set by main.js) and above the tabs (64px from the bottom). Three columns: counter, progress bar and scale key; the deaths widget; the pie. Gaps 12px by 32px, padding 4px 16px.
- **Spacing:** small fixed steps (8px tab gap and dateline offset, 10px label padding, 16px window padding, 24px rows). There is no fluid spacing scale.
- **Breakpoints:** 450px is the phone break (counter and pie share a row, smaller capitals, datelines hidden, box figures at 10px, no grid). Below 1300px the deaths widget takes the scale key's place. Short screens (wider than 450px, 800px tall or less) drop the deaths note and widen its captions.

### Named Rules
**The Scale Is Sacred Rule.** A drawn money shape's area is its dollars divided by 1,000, in pixels. Changing a number means changing its drawn size; no style may change a drawn size.

**The No New Width Rule.** Nothing in a bar's flex row changes width at runtime, and nothing adds page width. Animate paint (gradients, opacity, transforms of non-flow marks), never width.

**The Clear Zone Rule.** On screens wider than 450px, the left of a bar up to the lane (189.74px) holds only the ruler, the key marker, the bar's own label and the $100 million grid. Box figures, text and charts start on the lane.

## Elevation & Depth

Flat. Depth is ink over stock, the way a screen print has it: there are no drop shadows, no layered cards, no blur. The only offset is the misregistered second ink on the two poster-scale headings (the title and the ending), where orange sits a hair down and right of the key ink like a pull slightly out of register. Rings drawn with `box-shadow` (the pie's 3px ink rim, the progress track, the register ring around the title's $1,000 pixel, the focus halo) are printed outlines, not elevation. The $100 million grid prints over the bar it sits on, under a wash of that bar's own ink, so nothing scrolled beneath it shows through.

### Shadow Vocabulary
- **Overprint** (`text-shadow: 0.035em 0.025em 0 var(--orange)`): Display-size headings only (title poster, ending line).
- **Ink rim** (`box-shadow: 0 0 0 3px var(--ink)`): the pie disc's printed edge.
- **Track rim** (`box-shadow: inset 0 0 0 2px var(--ink)`): the progress bar's printed outline.
- **Register ring** (`box-shadow: 0 0 0 9px var(--stock), 0 0 0 10px var(--ink)`): frames the lone $1,000 pixel on the title poster.
- **Focus halo** (`outline: 3px solid var(--ink); outline-offset: 2px; box-shadow: 0 0 0 2px var(--stock)`): every focusable element.

### Named Rules
**The Flat Ink Rule.** No drop shadows or elevation on any element. If something needs separating, put it in a stock window or an ink field.

**The Overprint Rule.** The orange misregistration belongs only to Display-size headings, at most two on the page. It is a print artifact, not a shadow style.

## Shapes

Square-cut throughout: tabs, windows, ink labels, stamps, the progress track, the grid and every money shape have 0 radius, because money shapes must be exact rectangles and the rest follow them. The pie is the single round form. Dashed stock lines (2px dashed, inset 2px, on program bars; 5px dashed on the chemotherapy bar) are cutting guides that show a bar's full size while its ink is cut away. The FUNDED stamp is a 6px Cancellation Orange box rotated -8deg with `mix-blend-mode: multiply`, like a rubber stamp on paper. Ruler ticks are 1.2px bars. Arrows, chevrons and the Home house are drawn SVG in currentColor.

## Components

### Buttons (Home / Back / Next tabs)
Printed ink tabs, fixed at the bottom center of the screen.
- **Shape:** square (0px).
- **Default:** key ink fill, stock Label type, padding 9px 22px 8px, 8px apart, drawn chevron (10 by 16, 2.6 stroke, square caps) inside.
- **Home:** the same tab with a drawn house (16 by 16, 2.2 stroke) before the word, padding 9px 16px 8px 14px; it reads "Start" on the German page.
- **Hover:** fill goes to Musk Orange, text to key ink (0.15s ease-out).
- **Active:** nudges down 1px.
- **Focus:** 3px ink outline, offset 2px, over a 2px stock halo (global), so the ring reads on stock, orange, blue and ink.
- **Stops:** on screens wider than 450px, every Back/Next stop puts its content's left edge on the lane, one $1 million square right of the grid. The exceptions are the stops that end a bar where its counter or pie reads it.
- The zoom tab on the line chart is the same tab at 20px.

### Bar labels
- Title type in key ink on bare stock, above the shape. On the three long bars the label stays pinned at the left of the screen along the bar's top edge, with its dateline beside it.

### Ruler and the $100 million marker
- A 200px by 30px tile repeated along the bar's foot (see Layout for ticks and inks).
- The key marker is a sticky bracket, one section (200px) wide, 10px in from the left and 34px above the bar's foot, reading "$100 million" in 14px bold Public Sans; stock on the ink and blue bars, ink on orange. It hides while the grid shows.

### The $100 million grid (signature)
- One hundred true $1 million squares (31.62px each) as six full columns of 15 plus 10 at the foot of a seventh: 221.36 by 474.34px, bottom-aligned to the bar.
- Cell lines are one solid 1px line: stock on the ink and blue bars, key ink on orange. They are drawn as SVG with crisp edges, so every line lands on a whole screen pixel at full strength (a square is 31.623px, so a CSS gradient line would fall between pixels and fade). Each bar clips its own width, so the grid leaves with the bar's end.
- Half a second after scrolling stops, it fades in (0.35s ease-out; no fade under reduced-motion) at the left of the screen. A solid wash of the bar's own color fills the full bar height out to the grid's edge, so nothing beneath shows; over a program bar the wash is clear, because the bare stock there is money already taken.
- An ink label (12px bold stock type, 4px 7px padding) above it reads "100 × $1 million = $100 million".
- Hidden at 450px and under.

### Stock windows (charts and photos)
- **Corner Style:** square.
- **Background:** bare stock with key ink type, padding 16px; chart heading in poster capitals at 24px; a 13px source line under the chart.
- **Shadow Strategy:** none.
- Used for every chart, map, and photo that sits on a bar.

### Ink fields (money bars)
- To-scale money bars 400px tall, key ink (or orange for Musk's own spending) with a sticky label window in the bar's opposite ink: stock on ink, key ink on orange. Label 19px/1.4, max 460px.

### Cost bars (what Elon alone could pay for)
- Every cost drawn to scale inside Musk's bar is a cost bar (`.money-bar.cost-bar`): the VA's homeless veterans' budget, US cancer drug spending, the WFP famine plan, ending world hunger, free college, and the student debt relief plan.
- 18 $1 million squares tall (569.21px), centered on the 20-square bar: one square of orange above, one below where the ruler runs. Key ink, no outline. Width = cost / $1,000 / 569.21px, set inline in `index.html`.
- The label is the program bar's window, unanimated: bare stock, key ink type, 18px 24px padding, pinned on the lane. It holds the name (poster capitals 30px), the one Figure-size cost, its share of Elon's wealth or what it buys (18px), and a 14px linked source line.
- Never cut away and no stamp: the knock-out belongs to the 400's programs.

### The program bar and the knock-out (signature)
- Starts as Ledger Blue and is painted `linear-gradient(to right, var(--stock) var(--cut), var(--blue) var(--cut))`. main.js sets `--cut` from how far the screen's middle has passed through the bar, never less than the label window's right edge, so window and cut read as one piece of bare stock.
- A 2px dashed stock cutting guide keeps the bar's full size visible.
- The label window (stock, blue type, 18px 24px padding) holds the program name (poster capitals 30px), the one Figure-size cost, its share of the 400's wealth (18px), and a 14px source line.
- When the cut reaches the end, the bar gets `.funded` and the FUNDED stamp lands: opacity 0 to 1 and scale 1.6 to 1 over 0.35s with an overshoot (cubic-bezier(0.2, 1.5, 0.4, 1)); no motion under reduced-motion.

### The strip, progress bar, pie and reading mark
- The counter is poster capitals at 30px with tabular numerals.
- The progress bar sits under the counter: a 14px track, up to 360px wide, 3px inside a 2px ink rim. Its Musk Orange fill grows with Musk's share of his own fortune as the counter climbs. At the political section it returns as a Cancellation Orange sliver (at least 3px) for billionaire families' midterm spending, with a 13px label under it.
- The scale key ("For scale:" in bold) draws $1,000, the median household, and $1 million to scale in Ledger Blue.
- The pie: stock = funded, gold = the program in progress, blue = what is left, inside a 3px ink rim. Beside it, the percentage at 48px poster capitals, "$X trillion left", and a bold "Funding:" or "Funded:" line.
- The reading mark is a gold downward triangle (24 by 18px) on the bar's bottom edge at the screen's middle, the exact line the pie reads.

### The 10px strip
- A key ink band 10px wide and the bar's full height, pinned beside the "Every 10 pixels…" note (at calc(50% − 51px) on wider screens, 10px from the left on phones), so the note shows the strip it describes.

### Careers box
- Lifetime earnings for familiar jobs as key ink squares to scale, smallest to largest, in a 5-column grid (132px columns, 26px by 12px gaps); 3 columns on phones. Each row's squares start level, on one grid line, with their labels set right on top (subgrid rows); main.js snaps a row as a unit, downward, clear of the ruler band. Each label sits above its square as a three-line figure label: the job in poster capitals (16px), the working in Public Sans (12.5px; the pay, then "× 40 years" on its own line, hidden on phones), and the total as a poster-capital figure (21px, no wrap; 14px and 18px on phones). On Musk's bar each label line backs onto the orange, hugging its words, so the grid's lines never run through it (careers and celebrities alike). The box starts on the lane with the other box figures.

### Familiar amounts on Musk's bar
- The high school graduate's lifetime earnings, family health insurance, Amazon warehouse pay and teacher pay each carry the same three-line figure label as the celebrities row (name 26px, working 16px, amount 34px), above a key ink square on the lane. A fourth Public Sans line may follow the amount (teacher pay: how many years of it Elon's fortune could pay).

### Creators and celebrities row
- A row of squares and bars, bottom-aligned: key ink for one year's earnings, Ledger Blue for net worth. Labels sit above each shape as three-line figure labels: the name in poster capitals (26px), what the amount is and its source in Public Sans (16px), and the amount as a poster-capital figure (34px), linked to its source (22px, 14px, 28px on phones). On wider screens a label wider than the screen stays pinned on the lane.

### Ink labels
- Key ink box, stock poster-capital text, square: the people-chart labels, the sticky percentage and the grid's label. Sub-labels drop back to Public Sans.

### Deaths widget
- Lives in the strip, never on the bars, because it is not money. Squares to scale with each other in key ink, growing from the bottom-left (1.2s, cubic-bezier(0.16, 1, 0.3, 1), staggered 0.4s); then a canvas grid of 3px key-ink dots on a 4px pitch, one dot per 100 children.

## Do's and Don'ts

### Do:
- **Do** draw every amount at $1,000 per square pixel: bars 500px tall, money bars 400px tall at dollars / 400,000 wide, squares sqrt(dollars / 1000) on a side ($1 million = 31.62px).
- **Do** paint program bars with the stock-to-blue gradient driven by `--cut`; change paint, never width.
- **Do** keep gold (#c9a227) for "now" only: the in-progress slice, the reading mark, text selection.
- **Do** use Cancellation Orange (#b4441a) for stamps and marks on bare stock, and only at stamp or bold-mark size.
- **Do** set key ink on orange, stock on blue and on ink fields, and put charts and photos in stock windows with 16px padding.
- **Do** set headings, bar labels, figures, tabs and counters in Big Shoulders Display 900 uppercase, and reading text in Public Sans.
- **Do** put every amount's label above its shape, in key ink on stock.
- **Do** keep the left of a bar clear up to the lane on screens wider than 450px: box figures, text and charts start on the lane (189.74px), widths capped at calc(100vw − lane − 60px).
- **Do** measure bars with the $100 million ruler (158.11px sections) and land Back/Next stops with their content on the lane.
- **Do** give each figure a printed source line (dateline) in 13-14px Public Sans.

### Don't:
- **Don't** let anything in a bar's flex row change width at runtime, and don't add page width; the page is about 17.82 million px wide, near Firefox's limit.
- **Don't** draw non-money quantities (deaths, people) on the bars as money shapes; they go in the strip or in stock windows.
- **Don't** use gold for a finished state, a decoration, or a category color.
- **Don't** put Musk Orange text or thin marks on bare stock (2.77:1).
- **Don't** add drop shadows, rounded corners, or gradient lighting; the overprint stays on Display-size headings only.
- **Don't** use Big Shoulders Stencil for anything but the title poster and the FUNDED stamp.
- **Don't** set sentences in poster capitals or headings in Public Sans.
