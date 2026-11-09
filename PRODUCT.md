# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The general public and students, especially people who underestimate how rich
the super rich are. The owner is a high school math teacher (Harvard-Westlake)
who shares the page with students and the public. Readers arrive from a link,
on a laptop or a phone, and either scroll sideways or click Back/Next.

## Product Purpose

"Wealth, shown to scale": a single, very wide, horizontally scrolling page that
shows US wealth inequality to scale. Every dollar amount drawn on the bars is an
area at **$1,000 per square pixel**. Success: a reader gets through the whole
thing, *feels* the scale, and finishes on the political point: extreme wealth
concentration is an oligarchy problem.

## Positioning

The scale itself is the argument. Nothing is a metaphor or an icon chart: a
billion dollars is literally a billion square pixels' worth of area at the same
rate as $1,000, so the reader's own scrolling measures the gap. It is a fork of
Matt Korostoff's 2020 "Wealth, shown to scale" (via
`eattherichtextformat/1-pixel-wealth`), updated with 2026 figures.

## Operating Context

- Live at https://juanlopez713.github.io/1-pixel-wealth/ (GitHub Pages, branch
  `gh-pages` of `JuanLopez713/1-pixel-wealth`). Work happens on local branches
  and is published only when the owner says so.
- A German page in `de/` reuses the English HTML and swaps strings by `i18n-*`
  class. Changed English passages get a new key (suffix `-2026`) so German falls
  back to English rather than showing stale numbers.
- Readers move by scrolling or by Back/Next buttons that smooth-scroll to the
  next piece of content and must never skip a text or graphic.

## Capabilities and Constraints

- Plain static HTML/CSS/JS, no build step, no framework, no dependencies,
  unless the owner agrees otherwise.
- **Scale is sacred.** Bars are 500 px tall ($500,000 per px of width); squares
  have side √(dollars ÷ 1000) px; money bars inside a bar are 400 px tall with
  width = dollars ÷ 400,000. Changing a number means changing its drawn size.
- **Only money is drawn to scale on the bars.** Non-money quantities (deaths)
  live below the bars. Charts, photos and the people comparison may sit on the
  bars as annotations because they are not to-scale money shapes.
- The document is ~17.82 million px wide, close to browser limits (Firefox
  ~17.9M). New content goes inside existing bars; nothing adds page width.
- Nothing in a bar's flex row may change width at runtime.
- Back/Next must reach every text and graphic: `tools/walk_test.sh 1400` and
  `tools/walk_test.sh 1000` must both report 0 items never fully on screen.

## Brand Commitments

- Openly persuasive, never inaccurate. Every number has a source link; advocacy
  sources are labeled as such (e.g. Americans for Tax Fairness is "a
  progressive advocacy group"). Nothing is invented.
- Keep: the fork credit on the title screen, the sources box at the end, the
  Musk counter (dollars + "% of Elon Musk's wealth", starting at the "Lol, just
  kidding" box), Musk as the richest-person bar, Bezos in the $200M chart.
- Box figures (a colored square or bar with a label) line up at the left edge
  of the screen when landed on; text and charts are centered.
- The owner's school requires human review of all AI-assisted content. Ask
  before replacing factual copy or adding claims.

## Evidence on Hand

Figures and sources are inventoried in `HANDOFF.md` ("Data inventory"). Charts
in `img/` (`cares.svg`, `poverty.svg`, `combined.svg`, `plane.png`,
`no_clean_water.png`). Several Musk-bar figures (lifetime earnings, chemo,
homeless veterans, Solomon, doctor/lawyer/hedge fund) are original 2020 numbers
awaiting sourced replacements the owner approves one by one.

## Product Principles

1. The reader's scroll is the unit of measure; protect the scale above all.
2. Fun and familiar first, then the scale of what could be funded, then the
   politics of why it isn't. The page ends on the political point.
3. Every claim is checkable on the page itself.
4. Never make the reader hunt: every piece of content is reachable with Next.
