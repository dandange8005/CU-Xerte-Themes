# Dark Mode — SVEM Xerte Project

**Date:** 2026-03-12
**Project:** SVEM Student Voice Enhancement Model (`Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/`)
**Status:** Approved for implementation

---

## Overview

Add a manual dark mode to the SVEM Xerte project. Users toggle it once on the title page; the preference persists across all pages via `localStorage` and a CSS class on `body`.

---

## Scope

- All SVEM pages share a single stylesheet (`custom.css`) and run inside the Xerte player, which keeps all pages in the DOM simultaneously.
- Dark mode must apply project-wide — not just the resources page.
- No changes to the Xerte player shell or `xot_main.css`.
- Print styles (`@media print`) are kept as light mode only.
- The summary page download/report feature generates a standalone HTML blob — this is also intentionally kept as light mode (it inlines its own token values independently of the toggle state).
- OS-level `prefers-color-scheme` detection is out of scope — manual toggle only.
- `localStorage` unavailability (private browsing, restricted iframes) is accepted as out of scope; no try/catch guard is required.

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Toggle placement | Title page only | No player modifications needed; users set preference once before starting |
| Persistence | `localStorage` key `svem-dark-mode` + `body.dark-mode` class | Shared across all pages; class change on `body` instantly affects all DOM-present pages |
| Implementation | CSS custom property override block in `custom.css` | Follows existing token pattern; one file to maintain |
| Palette | Neutral Dark | Near-black backgrounds, neutral greys; CU blue lightened for dark backgrounds |
| OS preference detection | Manual only | Light mode by default; toggle is the only activation mechanism |

---

## CSS Changes (`custom.css`)

### 1. Dark mode token overrides

Add immediately after the `:root` block. `--cu-brand-blue` is overridden here to a lighter blue (`#5b9bd5`) so that all downstream uses — foreground text, icons, borders, focus rings — automatically become readable on dark backgrounds.

```css
body.dark-mode {
  --text-primary: #e5e5e5;
  --text-secondary: #c0c0c0;
  --text-muted: #888;
  --text-light-gray: #666;
  --bg-white: #1a1a1a;
  --bg-light: #1f1f1f;
  --bg-gray: #242424;
  --border-light: #2e2e2e;
  --status-success-light: #1a2e1a;
  --status-warning-light: #2e2a14;
  --status-danger-light: #2e1a1a;
  --cu-brand-blue: #5b9bd5;
  background: #111;
}
```

Overriding `--cu-brand-blue` globally covers all component uses at once: `.intro-card__icon`, `.intro-card__heading`, `.scoring-explanation summary`, `.score-btn`, `.stat-value`, `.resource-category`, `.resource-link`, `.resource-filter-btn`, `.resources-note a`, and others.

### 2. Hardcoded value overrides

Components that bypass the token system need explicit dark rules, grouped in a `/* Dark mode overrides */` block at the end of `custom.css`.

```css
/* ========================================
   Dark mode overrides
   Hardcoded values that don't respond to token changes
   ======================================== */

/* Title page heading: original value was hardcoded to --cu-brand-blue (#002554) in light mode */
body.dark-mode .title-page__heading {
  color: #7eb8ff;
}

/* Title page card: img element — drop-shadow applies around non-transparent image pixels */
body.dark-mode .title-page__card {
  filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.4));
}

/* Score indicators: all use hardcoded light-mode hex backgrounds */
/* Note: level-4 uses var(--status-success-light) in light mode, so the token override would
   already change it. The explicit rule here wins via specificity and is intentionally kept
   for consistency with the other levels. */
body.dark-mode .score-indicator.level-1 { background: #2a2a2a; color: #ccc; }
body.dark-mode .score-indicator.level-2 { background: #1a2e1e; color: #86efac; }
body.dark-mode .score-indicator.level-3 { background: #1a2040; color: #93b4fd; }
body.dark-mode .score-indicator.level-4 { background: #1a2e1a; color: #86efac; }
body.dark-mode .score-indicator.level-5 { background: #1a2a2e; color: #7dd3e0; }
body.dark-mode .score-indicator.not-scored { background: #2e1a1a; color: #fca5a5; }

/* Section report border (hardcoded #f0f0f0) */
body.dark-mode .section-report {
  border-bottom-color: #2e2e2e;
}
```

### 3. Toggle button styles

Added to the Title Page section of `custom.css`:

```css
.dark-mode-toggle {
  background: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--space-sm);
}

.dark-mode-toggle:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

body.dark-mode .dark-mode-toggle {
  background: var(--bg-gray);
  border-color: var(--text-muted);
  color: var(--text-primary);
}

body.dark-mode .dark-mode-toggle:hover {
  border-color: var(--text-secondary);
}
```

---

## HTML Changes (`page-01-title.html`)

Add the toggle button inside `<footer class="title-page__footer">`, after the copyright paragraph:

```html
<button id="dark-mode-toggle" class="dark-mode-toggle" type="button" aria-pressed="false" aria-label="Enable dark mode">
  <span class="dark-mode-toggle__icon">☾</span>
  <span class="dark-mode-toggle__label">Dark mode</span>
</button>
```

---

## JavaScript

**jQuery availability note:** `page-01-title.html` is a full HTML file (has its own `DOCTYPE`/`<html>`/`<head>`) but runs inside the Xerte player runtime, which injects jQuery globally. The use of `x_navigateToPage()` in the existing markup confirms the Xerte runtime is active. jQuery (`$`) is therefore available on all pages including the title page.

### Title page (`page-01-title.html`) — init + toggle handler

`page-01-title.html` has no existing `<script>` block. Add a new one at the end of the file:

```html
<script>
$(function () {
  // Dark mode — init + toggle
  function applyDarkMode(isDark) {
    $('body').toggleClass('dark-mode', isDark);
    $('#dark-mode-toggle')
      .attr('aria-pressed', isDark ? 'true' : 'false')
      .attr('aria-label', isDark ? 'Disable dark mode' : 'Enable dark mode')
      .find('.dark-mode-toggle__icon').text(isDark ? '☀' : '☾').end()
      .find('.dark-mode-toggle__label').text(isDark ? 'Light mode' : 'Dark mode');
  }

  applyDarkMode(localStorage.getItem('svem-dark-mode') === 'dark');

  $('#dark-mode-toggle').on('click', function () {
    var isDark = !$('body').hasClass('dark-mode');
    localStorage.setItem('svem-dark-mode', isDark ? 'dark' : 'light');
    applyDarkMode(isDark);
  });
});
</script>
```

### All other pages — init only

Add the snippet below to each page. For pages **with** an existing `<script>` block, add at the top of the jQuery ready callback. For pages **without** one, create a new `<script>` block.

```js
// Dark mode init
$(function () {
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }
});
```

Pages affected:

| Page | `<script>` block exists? | Action |
|---|---|---|
| `page-02-introduction.html` | No | Create new `<script>` block |
| `page-03-themes-overview.html` | Yes | Add to existing |
| `page-03-enhancement-plan.html` | No | Create new `<script>` block |
| `page-04-theme-1.html` | Yes | Add to existing |
| `page-05-theme-2.html` | Yes | Add to existing |
| `page-06-theme-3.html` | Yes | Add to existing |
| `page-07-summary-v3.html` | Yes | Add to existing |
| `page-resources.html` | Yes | Add to existing |

---

## Out of Scope

- Print styles (`@media print`) — kept as light mode only.
- Downloaded summary report — generates its own standalone HTML blob, intentionally always light mode.
- `xot_main.css` and Bootstrap theme files — not modified.
- OS-level `prefers-color-scheme` detection — manual toggle only.
- `localStorage` unavailability — accepted risk, no guard needed.

---

## Files Changed

| File | Change |
|---|---|
| `custom.css` | Add `body.dark-mode` token block, hardcoded overrides, toggle button styles |
| `page-01-title.html` | Add toggle button markup + new `<script>` block with init/toggle JS |
| `page-02-introduction.html` | Create new `<script>` block with dark mode init |
| `page-03-themes-overview.html` | Add dark mode init to existing `<script>` block |
| `page-03-enhancement-plan.html` | Create new `<script>` block with dark mode init |
| `page-04-theme-1.html` | Add dark mode init to existing `<script>` block |
| `page-05-theme-2.html` | Add dark mode init to existing `<script>` block |
| `page-06-theme-3.html` | Add dark mode init to existing `<script>` block |
| `page-07-summary-v3.html` | Add dark mode init to existing `<script>` block |
| `page-resources.html` | Add dark mode init to existing `<script>` block |
