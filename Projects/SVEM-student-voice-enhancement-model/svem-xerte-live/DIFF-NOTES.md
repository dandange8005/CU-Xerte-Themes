# SVEM Xerte — Live vs Local Diff Notes

Tracking differences between the **live published project** (mirrored into
`svem-xerte-live/`) and the local working copy in `svem-xerte-version/`.

Live source: https://xerte.cardiff.ac.uk/play_24007

> **Headline finding:** The live/published project is a **newer generation** than
> `svem-xerte-version`. Production is *ahead* of local — not behind it. The live
> CSS, HTML, and JS form a matched set (see coupling note at the bottom), so pieces
> can't be cherry-picked into local pages without bringing the corresponding markup.

---

## `custom.css` (compared 2026-07-24)

The live `custom.css` is a systematically refactored version. Categories of change:

### 1. Design-token architecture changed (affects the whole file)
Local defines an intermediate alias layer; live **deleted it** and uses raw Open
Props tokens directly everywhere.

| Token group | Local (`svem-xerte-version`) | Live |
|---|---|---|
| Spacing | defines `--space-xs … --space-2xl` → used everywhere | **removed** — uses `var(--size-1…8)` directly |
| Shadows | defines `--shadow-sm/md/lg/modal` | **removed** — uses `var(--shadow-1…4)` directly |
| Levels | defines `--level-1 … --level-5` | **removed** — uses `var(--gray-4/5/7/8/11)` directly |
| Brand blue | `#002554` (hardcoded) | `var(--cu-PrussianBlue)` |

Live **adds new tokens** not present locally: `--radius-pill`, `--radius-round`, `--focus-ring`.

> Most of the "hundreds of changed lines" a diff tool reports are this mechanical
> rename (`var(--space-lg)` → `var(--size-5)`, etc.), not real behaviour changes.

### 2. New shared base-class system (`.card` / `.pill`)
- **`.card`** (new) — `background + radius + shadow`. Live's `.intro-card`,
  `.theme-card`, `.completion-summary`, `.modal-box` dropped their own
  `background/border-radius/box-shadow` and now rely on `.card` in the markup.
- **`.pill`** (new) — base for `.status-badge` and `.score-badge`, which lost
  their own padding/radius.
- Matches live summary markup (`class="card intro-card"`). Local pages lack these
  class additions.

### 3. Toast renamed
- Local: `#toast` (id selector)
- Live: **`.svem-toast`** (class) with `.svem-toast.show` — matches `data-svem-toast`
  in live markup.

### 4. Accessibility additions in live (absent locally)
- **`.sr-only`** utility (new Section 0)
- **`:focus-visible`** rings added to `.theme-card`, `.score-btn`, `.resource-link`,
  `.resource-filter-btn`, `.resources-th--sortable`, `.modal-box`
- Resources category column: local `display:none` → live SR-only absolute pattern
  (hidden visually, still read by screen readers)
- `.theme-card` converted to a `<button>` — live adds button resets
  (`font:inherit; text-align:left; border:none;` etc.)

### 5. Other new rules only in live
`.page-navigation--end`, `.enhancement-plan__cta`, `.data-management__options/__option`,
`.visually-hidden-input`, `.theme-progress__fill--empty`, `.resources-filter-label`,
`.resources-section__hint`, `.modal-box__title--danger`, `.modal-box__text`,
`--focus-ring` used in place of hardcoded `rgba()` focus shadows.

### 6. Trivial value diffs (buried among the token renames)
- `.section-report` border: local `#f0f0f0` → live `var(--border-light)`
- Literal `border-radius: 3px/12px/20px` → live tokenised (`--radius-sm/lg/pill`)

---

## Summary page (compared earlier)

- **Live = the `page-07-summary.html` family** (no radar chart; has CPD module +
  "Share your data" JSON download).
- **`page-07-summary-v3.html` is NOT live** — it's the alternative radar-chart /
  Welsh-localised design (Chart.js, level-definitions panel).
- Live is a **more recent iteration** than local `page-07-summary.html`: uses
  `initSVEMShell()` + `initSVEMA11y()` (vs `initSVEMDarkMode()`), `.svem-toast` /
  `getVisibleToast()` (vs `#toast`), `<h3 class="section-report__name">` (vs `<h4>`),
  class-based cards (`card intro-card`, `intro-card--gold`, `sv2-actions-row`) instead
  of inline styles, and adds `aria-hidden` / `aria-label` accessibility.

---

## page-01 (title / landing) (compared 2026-07-24)

`.title-page` markup is **byte-identical** (logo, heading, description, Enter button,
footer, both image URLs). Only the two recurring live-side upgrades differ:

- Toast: local `<div id="toast">` → live `<div class="svem-toast" data-svem-toast
  role="status" aria-live="polite" aria-atomic="true">` (accessible live region)
- Init: local `initSVEMDarkMode()` → live `initSVEMShell()` (shell refactor)

The `<head>`/`<body>`/`<link>` wrapper exists only in local (set up to preview
standalone); the live extract is the raw page fragment. Not a content change.

---

## page-02 (introduction) (compared 2026-07-24)

**Real content change (live only):** the Medr reference now reads
"Medr's Learner Engagement Code" — the word **"Draft" was removed** (local still
says "Medr's Draft Learner Engagement Code"). Rest of body text is identical.

Recurring systematic upgrades (same as elsewhere):
- Init: `initSVEMDarkMode()` → `initSVEMShell()`
- Cards: `<section class="intro-card">` → `<section class="card intro-card">`
- Nav: inline button `style="margin-left:auto"` → `.page-navigation--end` modifier class

No toast on this page (both sides). Both are fragments (no `<head>`/`<body>` wrapper).

---

## page-03 (enhancement plan) (compared 2026-07-24)

Live `page-03.html` = local `page-03-enhancement-plan.html` (the "Next Steps /
Your Enhancement Plan" page). Local also has a separate `page-03-themes-overview.html`
which is a *different* page, not represented by this live extract.

**Major live change — large content block commented out (deliberate, on request):**
Live wraps lines 1–110 in `<!-- hidden content … -->`, hiding the header +
"What is the Enhancement Plan?" + "How to Get an Enhancement Plan" + "Roles and
Responsibilities" + "How the Enhancement Plan is Developed". Live now shows only:
CTA button → Data Management → Navigation (+ toast + reset modal). Local still shows
all of it. The hidden text is identical to local's — wrapped, not edited.

⚠️ **Verify layout:** the opening `<div class="theme-page-container"><main class="main-content">`
tags fell *inside* the comment, and there's no closing `</main></div>` either. Tags
are balanced (not broken), but the still-visible CTA/Data-Management/Nav now render
*outside* `.main-content`, losing its padding/width. Xerte's page holder may mask this
— check the live page visually.

Recurring systematic upgrades (visible portion):
- CTA: inline `style` → `.enhancement-plan__cta`
- Data Mgmt card: `.intro-card` → `.card intro-card`
- Data Mgmt options: inline styles → `.data-management__options/__option`, `.visually-hidden-input`
- Import: adds `aria-describedby` + `<p id="importFileHelp">` help text
- Toast: `#toast` → `.svem-toast` + ARIA
- Reset modal: `.modal-box` (inline-styled) → `.card modal-box` + full dialog ARIA +
  `.modal-box__title--danger` / `.modal-box__text`
- Init: `initSVEMDarkMode()` → `initSVEMShell()`

---

## page-05 = Theme 1 detail (compared 2026-07-24)

Live `page-05.html` = local `page-04-theme-1.html` (Theme 1: Student Voice Structures
and Governance). **Assessment content is byte-identical** — every Level 1–5 bullet for
both "roles" and "training" sections matches (only cosmetic entity encoding differs:
live uses `&ndash;`/`&mdash;`/`&#39;` where local has literal `–`/`—`/`'`).

**Major refactor — evidence boxes are now JS-generated:**
- Live: one data-driven placeholder per section —
  `<div class="evidence-box" data-placeholder="…" data-section-id="roles"
  data-section-label="…">` — label/intro/checklist/textarea/unsure-checkbox built at
  runtime by new `renderSVEMEvidenceBoxes()`.
- Local: full hardcoded evidence-box markup inline, repeated per section.

Other systematic upgrades:
- Score badge: `.score-badge` → `.pill score-badge`
- Toggle button: live adds `aria-controls`, `aria-expanded="false"`, `type="button"`
- Score buttons: live drops `data-score`, adds `type="button"`
- Toast: `#toast` → `.svem-toast` + ARIA
- Init: `initSVEMDarkMode()` + `initSVEMPage([...])` → `renderSVEMEvidenceBoxes()` +
  `initSVEMSections([...])`. (`initSVEMPage` split into the two new functions.)

⚠️ **Dependency:** the live data-driven evidence boxes require `renderSVEMEvidenceBoxes()`
and `initSVEMSections()` to exist in `scoring-xerte.js`. Local `scoring-xerte.js` is
uncommitted/modified and likely still has old `initSVEMPage()`. **Compare
`scoring-xerte.js` next** — it decides whether live theme-page HTML renders at all.

---

## scoring-xerte.js (extracted 2026-07-24 via browser)

**How the live JS is delivered — key discovery:**
It is NOT a separate file and is NOT loaded from GitHub Pages. Network capture of a
full live run (title → theme pages) shows `scoring-xerte.js` is *never requested* from
any host. The ~22 KB of code is **inlined as an embedded `<script>` inside the Xerte
project (data.xml)**, loaded once and kept in global scope. This is why it appears
"gone" from the editor's file list — it was never a file there.

Extracted the live inline script (script element index 1 on a theme page, 22,073 chars)
to `svem-xerte-live/scoring-xerte.js` (676 lines). Only things loaded from GitHub Pages
live: `css/xot_main.min.css` and the Cardiff logo PNG. (Direct `data.xml` fetch = 403;
USER-FILES has only media.)

**Version landscape — live is newest by far:**
| Copy | Lines | new-style funcs |
|---|---|---|
| Deployed GitHub Pages (`svem-xerte-version/scoring-xerte.js`) | 466 | no |
| Repo `master` | 466 | no |
| Repo `feature/lowest-score-resources` | 440 | no |
| Local WIP (`svem-xerte-version/scoring-xerte.js`, uncommitted) | 548 | no |
| **Live (extracted)** | **676** | **yes** |

**Live vs local = DIVERGED, not clean ahead/behind:**
- Live adds 14 funcs local lacks: `renderSVEMEvidenceBoxes`, `buildSVEMEvidenceBoxMarkup`,
  `escapeSVEMHTML`, `initSVEMShell`, `initSVEMSections`, `initSVEMThemesOverview`,
  `initSVEMVisibilityRefresh`, `initSVEMA11y`, `getFocusableElements`,
  `getSectionAccessibleName`, `handleModalKeydown`, `trapModalFocus`, `getVisibleToast`.
- Local WIP has 2 funcs live lacks: `storagePrefix`, `t` — looks like i18n/Welsh
  groundwork started locally.
- So local went toward localisation; production went toward shell + a11y + JS-generated
  evidence boxes. Reconciling = a real MERGE, not an overwrite. Local WIP would NOT
  drive the live HTML pages (missing `renderSVEMEvidenceBoxes` etc.).

This confirms the coupling note: the live theme-page HTML (data-driven evidence boxes,
`.svem-toast`, `initSVEMShell`) only works with THIS live scoring-xerte.js.

---

## page-06 = Theme 2 detail (compared 2026-07-24)

Live `page-06.html` = local `page-05-theme-2.html` (Theme 2: Student Reps & SSPs).
**Assessment content byte-identical** (all Level 1–5 bullets for `reps-ssps` match; only
cosmetic `&ndash;`/`&#39;` vs `–`/`'`). Same systematic upgrades as Theme 1 (page-05),
nothing new:
- Evidence box: data-driven placeholder (live) vs hardcoded markup (local)
- `.score-badge` → `.pill score-badge`; toggle btn gains `aria-controls`/`aria-expanded`
- Score buttons drop `data-score`
- `#toast` → `.svem-toast` + ARIA
- Init: `initSVEMDarkMode()` + `initSVEMPage([...])` → `renderSVEMEvidenceBoxes()` +
  `initSVEMSections([...])`

No content drift.

---

## page-07 = Theme 3 detail (compared 2026-07-24)

Live `page-07.html` = local `page-06-theme-3.html` (Theme 3: Student Voice Surveys,
5 sections: mme, me, nss, cupts, pres). Text-content diff shows **all Level 1–5 bullets
byte-identical in wording across all 5 sections** — zero assessment-content drift. Only
diffs are the established pattern:
- em-dash encoding on scale list (`&ndash;` → `–`)
- 5 evidence boxes: data-driven placeholders (live) vs hardcoded markup (local)
- `.score-badge` → `.pill score-badge` (×5); score buttons drop `data-score` (local has 45)
- `#toast` → `.svem-toast` + ARIA
- Init: `initSVEMDarkMode()` + `initSVEMPage([...5...])` → `renderSVEMEvidenceBoxes()` +
  `initSVEMSections([...5...])`

---

## page-08 = Summary (compared/logged 2026-07-24)

Live `page-08.html` = the `page-07-summary.html` family (NOT v3): no radar chart, has
CPD module + "Share your data" JSON download. Same systematic upgrades vs local as
noted in the earlier "Summary page" section (`initSVEMShell`/`initSVEMA11y`,
`.svem-toast`/`getVisibleToast`, `card intro-card`/`intro-card--gold`/`sv2-actions-row`
classes, `<h3 class="section-report__name">`, `aria-*`).

⚠️ **Extraction artifact FIXED (2026-07-24):** the inline summary script's `escapeHTML()`
had all five entity strings HTML-decoded during extraction — `'&amp;'`→`'&'`, `'&lt;'`→
`'<'`, `'&gt;'`→`'>'`, `'&quot;'`→`'"'`, and fatally `'&#39;'`→`'''` (unterminated string
= SyntaxError that killed the whole `<script>`, so the report never generated). Restored
the five entities; `node --check` passes. Almost certainly an extraction artifact (same
corruption was in the very first pasted copy; inside a real `<script>` the browser does
not decode entities), so the live site is probably fine — not verified in-browser.
Minor leftover (not fixed, harmless): `innerHTML = ' '` in two spots where source
was `'&nbsp;'` — valid JS, renders identically.

---

## page-09 = Additional Resources (compared 2026-07-24)

Live `page-09.html` = local `page-resources.html`. **Resource content 100% identical** —
all 34 rows (labels + hrefs) and all category labels match exactly (automated diff clean).
Every difference is structural; this page got the biggest accessibility overhaul.

Systematic upgrades:
- `.resource-category` → `.pill resource-category`; filter buttons → `.pill resource-filter-btn`
- section hint & filter label: inline `style` → `.resources-section__hint` / `.resources-filter-label`
- Init: `initSVEMDarkMode()` → `initSVEMShell()`

Accessibility overhaul (live only):
- search input `aria-label` → proper `<label class="sr-only">`
- `<caption class="sr-only">`; `<th scope="col" aria-sort>`
- new `#resources-live-region` (aria-live) announcing result counts
- filter container `role="group"` + `aria-label`; buttons `aria-pressed` + `type="button"`
- external links append `<span class="sr-only"> (opens in new tab)</span>`
- keyboard-accessible sorting: headers `tabindex="0"`, Enter/Space, live `aria-sort` (local
  was click-only)

⚠️ **Functional nav difference:** local back button uses `ID:'[prev]'` ("← Previous");
live uses `ID:'[previous]'` ("← Back to Summary"). `[previous]` is the standard Xerte
token — local's `[prev]` may not resolve (possibly broken back button).

Pre-existing content bug in BOTH (not a drift): the "6. NSS" row "NSS Strategy and
Promotion Plan" links to the ENCAP Student Awards PDF (wrong target) in live AND local.

---

## Pages still to extract / compare

- [x] page-01 (title / landing)
- [x] page-02 (introduction)
- [x] page-03 (enhancement plan) — NOTE: live `page-03.html` = enhancement-plan, not themes-overview
- [x] themes-overview page — live `page-04.html` = local `page-03-themes-overview.html`
- [x] theme 1 detail — live `page-05.html` = local `page-04-theme-1.html`
- [x] theme 2 detail — live `page-06.html` = local `page-05-theme-2.html`
- [x] theme 3 detail — live `page-07.html` = local `page-06-theme-3.html`
- [x] summary — live `page-08.html` = local `page-07-summary.html` family
- [x] resources page — live `page-09.html` = local `page-resources.html`
- [x] `scoring-xerte.js` — extracted from live inline script (see below)
- [x] `custom.css`

## ✅ ALL PAGES COMPARED — overall conclusion (2026-07-24)

Every page + `custom.css` + `scoring-xerte.js` now extracted and compared. Findings:

- **Assessment/resource CONTENT is essentially untouched** across the whole tool — every
  theme's Level 1–5 bullets and all 34 resource links are byte-identical live vs local.
- **Live is a newer, coherent generation** everywhere: `.card`/`.pill` base classes,
  `.svem-toast` + ARIA, the `initSVEMShell`/`initSVEMSections`/`renderSVEMEvidenceBoxes`
  refactor, JS-generated evidence boxes, and a big accessibility pass.
- **`scoring-xerte.js` has DIVERGED** (local went i18n, live went shell/a11y) — that one
  needs a real merge, not an overwrite. It is inlined in Xerte (not a file / not on GitHub Pages).
- **Genuine content drifts found (live ahead of local):**
  - page-02: "Medr's Draft Learner Engagement Code" → "…Learner Engagement Code" (Draft removed)
  - page-03: large Enhancement-Plan explainer block commented out on live (deliberate)
- **Bugs/issues surfaced:**
  - page-08 extracted copy had a fatal `escapeHTML` entity-decode SyntaxError — FIXED.
  - page-03 live: `.main-content` wrapper commented away → visible content unwrapped (verify layout).
  - page-09: local back button uses non-standard `[prev]` token (possibly broken); live uses `[previous]`.
  - Resources "NSS Strategy and Promotion Plan" → wrong PDF target (ENCAP) in BOTH.

Coupling reminder: live HTML + live custom.css + live scoring-xerte.js are a matched set;
reconcile per-page as a unit, not file-type by file-type.

---

## ⚠️ Page-numbering map (live extract vs local filenames)

Live extract numbers run **one ahead** of local `page-0N-theme-*` names from the
themes-overview onward. Compare by CONTENT, not by matching numbers:

| Live extract | Content | Local file |
|---|---|---|
| `page-01-title` | Title | `page-01-title.html` |
| `page-02` | Introduction | `page-02-introduction.html` |
| `page-03` | Enhancement Plan (lead-in) | `page-03-enhancement-plan.html` |
| `page-04` | Themes Overview | `page-03-themes-overview.html` |
| `page-05?` | Theme 1 detail | `page-04-theme-1.html` |
| `page-06?` | Theme 2 detail | `page-05-theme-2.html` |
| `page-07?` | Theme 3 detail | `page-06-theme-3.html` |
| `page-08?` | Summary | `page-07-summary.html` |

---

## Coupling note (important)

The live CSS is tightly coupled to the live HTML/JS:
`.card` classes, `.svem-toast` + `data-svem-toast`, `.pill`-based badges, and
button-based theme cards. Swapping live CSS into local pages (or vice versa) without
the matching markup/script will render broken components. Reconcile per-page as a
unit — CSS + HTML + JS together — not file type by file type.
