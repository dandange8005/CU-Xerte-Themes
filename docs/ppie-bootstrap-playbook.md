# Xerte Bootstrap Project Playbook

Extracted from the PPIE Training Programme project. A decision log — each entry is the question you'll face mid-project, what worked, and why.

---

## 1. Project Setup

**Q: How should I structure files for a multi-page Xerte Bootstrap project?**  
A: One `project-style.css` for shared component styles across all pages, plus a page-level `<style>` block in each HTML file for layout hacks specific to that page template.  
Why: Xerte injects each page's HTML into its player — page-level styles are safe and scoped. Shared components (cards, quotations, tables) belong in `project-style.css` so they stay consistent and are only maintained in one place.

---

**Q: What goes in the page-level `<style>` block vs `project-style.css`?**  
A: Page-level `<style>` = Xerte layout overrides only (hide TOC, remove left margin, remove scroll-to-top button, full-width section backgrounds). Everything else goes in `project-style.css`.  
Why: Layout overrides are boilerplate that every page needs but that are structurally tied to how Xerte renders the container — they don't belong alongside reusable component code.

---

**Q: What's the correct CDN dependency order in the `<head>`?**  
A: Bootstrap 2.3.2 CSS → Font Awesome 6 → CU Theme (`bs_main.min.css`) → `project-style.css`.  
Why: The CU Theme overrides Bootstrap defaults, and `project-style.css` overrides the CU Theme. Reversing this order causes specificity fights.

---

**Q: Should I build pages as standalone HTML files or bare fragments?**  
A: Standalone HTML (with `<html>`, `<head>`, `<body>`) for development and preview; bare fragments when pasting into Xerte.  
Why: Standalone lets you open the file in a browser directly for fast iteration. Strip the outer shell when you're ready to paste into the Xerte editor.

---

**Q: When does a page need its own sub-directory?**  
A: When the component requires its own JS, CSS, and data files (e.g. the case study table needed `case-studies-data.js`, `case-studies.csv`, a conversion script, and a README). Single-file components stay flat.  
Why: Sub-directories prevent the project root becoming a flat pile of files that are hard to relate to each other.

---

## 2. Layout Patterns

**Q: How do I get alternating full-width background bands inside Bootstrap's fixed-width container?**  
A: Use `section::before` with `width: 100vw; left: calc(-50vw + 50%); position: absolute; z-index: -1` and set `section { position: relative; overflow: revert }`. Apply background colours with `section:nth-child(odd)::before` / `section:nth-child(even)::before`.  
Why: Bootstrap's container constrains content width but not the background. The `calc(-50vw + 50%)` trick pulls the pseudo-element to the viewport edge regardless of container offset. `overflow: revert` is required because the CU Theme sets `overflow: hidden` on sections.

---

**Q: When should I use flex vs CSS grid for a content section?**  
A: Flex (`.flex.flex-wrap` with `.flex-300`/`.flex-400` children) for two-column text+media layouts where columns should wrap naturally on small screens. CSS grid for card grids where you want auto-fit with a minimum column width.  
Why: Flex wrapping gives you responsive two-up layouts with zero media queries. Grid's `auto-fit minmax()` handles variable numbers of cards cleanly.

---

**Q: What's the right grid setup for a card grid (module cards, schools grid)?**  
A: `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--gap)`.  
Why: Auto-fit means any number of cards fills the row gracefully. Adjust the `minmax` floor — 250px for compact cards, 350px for cards with more content (like the schools grid with embedded quotes).

---

**Q: When does a bento grid make sense, and how do I build it?**  
A: Use a bento grid when you have 3–5 related items of unequal importance that you want to display as a visual unit (e.g. "how was this developed" — co-production is most important, gets more space). Build on a 12-column grid: `grid-template-columns: repeat(12, 1fr)` with `grid-column: span N` per item. Collapse all items to `span 12` below 1024px.  
Why: Bento grids communicate hierarchy visually. A flat equal-column grid implies all items are equally important — use that when they are.

---

**Q: How do I lay out a multi-column contributors list?**  
A: Use CSS multi-column: `column-count: 3; column-gap: 3em; column-rule: 1px dotted #eee`. Wrap in a `div.autocolumns.autocolumns3`.  
Why: The CU Theme already has `.autocolumns` utility classes. Multi-column flows content automatically — no need to manually balance three `<div>` columns.

---

**Q: How do I make a data table safe on mobile?**  
A: Wrap the `<table>` in `<div style="overflow-x: auto">`. The table itself gets full width; the wrapper handles horizontal scroll.  
Why: Bootstrap 2.3.2 doesn't have a built-in responsive table wrapper. This is the simplest fix with no layout side effects.

---

## 3. Components

**Q: When do I use `.card.card--clickable` vs a plain link?**  
A: Use `.card.card--clickable` whenever a content unit (icon + heading) is the navigation element — module menu, school showcase. Use a plain link for inline text references.  
Why: The clickable card makes the entire block the tap target, which is important on mobile. Plain links are for inline reading flow.

---

**Q: The module cards and schools cards look different — same component?**  
A: Same `.card.card--clickable` base, different layout contexts. Module cards: horizontal flex (icon left, text right), circular icon background. Schools cards: vertical (icon + heading in a row at top, quote below), square gradient icon background. Override in the grid's own CSS block rather than adding modifier classes to the card.  
Why: The card component handles hover/focus/link behaviour. Layout details belong to the grid context, not the card itself, so the same card works in multiple configurations.

---

**Q: Which quotation component should I use?**  
A: Three options, each for a different job:
- `.quotation` — pull quote alongside body text, works in a flex layout, has author attribution with profile image. Use for named quotes from real people.
- `.testimonial-card` — centred card with floating profile image above, for a testimonial showcase grid.
- `.quote-card` — bold inline banner, icon quote marks, for decorative section dividers without author attribution.

All support color modifiers (`--blue`, `--green`, `--teal`, `--invert`) via the project color palette.

---

**Q: How do I embed a video with a caption accessibly?**  
A: Use `.video-720 > .iframe-container > iframe` + a `.video-caption` div immediately after. The `:has()` selector in `project-style.css` removes the bottom margin on the iframe container when a caption follows it, keeping them visually joined.  
Why: The caption needs to read as part of the media element, not as a separate paragraph. Include a transcript link in the caption when available.

---

**Q: How do I handle infographics (images with complex content)?**  
A: `<figure class="image"><img/><figcaption/></figure>` immediately followed by `<details class="details"><summary>View text alternative</summary><div>...full text content...</div></details>`. CSS uses `figure + details { margin-top: 0 }` to keep them joined.  
Why: Infographics are inaccessible to screen reader users. The `<details>` disclosure pattern gives a clean text alternative without cluttering the visual page. This is also the pattern the CU Theme expects for collapsible content.

---

**Q: When should I use the feedback/report-a-problem button?**  
A: On any page that will be live for a long time and may accumulate broken links or outdated content. It lives in the footer and uses the native Popover API (`popovertarget` attribute) — no JS needed.  
Why: Gives users a direct reporting path without a full form system. The native Popover API handles show/hide, focus trapping, and light-dismiss natively. No jQuery needed.

---

## 4. Theming

**Q: When do I define a full shade scale vs just using the raw hex?**  
A: Define a full shade scale (`--clr-accent-50` through `--clr-accent-900`) when:
- The project uses the accent colour at multiple opacities/intensities (table header, card icon background, row hover, table striping, heading text)
- You need dark/light variants that must stay on-brand

Use raw hex only for one-off colours that appear once (e.g. `--clr-ppie-blue: #004AAD`).  
Why: A scale makes it trivial to swap the brand colour project-wide. Without it you end up with ad hoc opacity hacks and inconsistent tints.

---

**Q: How do I name CSS custom properties for a project?**  
A: Three tiers:
1. `--clr-accent` — the main brand colour, used for interactive elements and highlights
2. `--clr-accent-{50-900}` — the shade scale, used for backgrounds, borders, text
3. `--clr-{name}` — project-specific named colours for secondary palettes (e.g. `--clr-ppie-blue`)

Keep `--clr-h`, `--clr-s`, `--clr-l` in sync with `--clr-accent` so the CU Theme's HSL-based utilities work correctly.

---

**Q: How do I add color variants to a component (e.g. blue quotation)?**  
A: Add a modifier class with a single `background-color` override: `.quotation--blue { background-color: #005FA8 }`. Don't duplicate the full component ruleset.  
Why: The base component handles all structural and interactive styles. A modifier only needs to change what actually differs — usually just the background and any derived text/border colours.

---

## 5. Tooling & Workflow

**Q: Should I track time/invoice details in the HTML file?**  
A: Yes — put it in a comment block at the top of the file. Include: total billable hours, deliverables checklist, suggested invoice line item, and a junior/senior developer time comparison.  
Why: The HTML file is the deliverable. Keeping invoice notes in the file means the context travels with the work and is never lost in a separate doc.

---

**Q: When does a component need its own README?**  
A: When it has more than one file, requires setup steps, or has non-obvious usage (e.g. the carousel needed `carousel-nav.js` + `carousel-style.css` + specific HTML structure; the case study table needed CSV→JS conversion before it would work). Single-file components don't need a README.

---

**Q: When should I write a Python script instead of doing something manually?**  
A: When the same transformation will be repeated (generating multiple infographic HTML blocks from data, converting a CSV to a JS data file). Even a rough script saves time on the second run and makes the data source the source of truth.  
Why: Manual HTML generation from spreadsheet data is error-prone and hard to update. A script makes the data authoritative and the HTML regenerable.

---

**Q: How do I handle data-driven components (e.g. a filterable case study table)?**  
A: Keep data in a CSV (human-editable source of truth), write a conversion script to produce a JS data file, and load the JS file into the HTML. Don't hardcode data in the HTML.  
Why: Clients update content in spreadsheets, not HTML. The CSV→JS pipeline keeps their workflow intact while giving you a structured data source to work with in code.
