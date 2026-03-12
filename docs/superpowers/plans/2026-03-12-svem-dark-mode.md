# SVEM Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a manual dark mode toggle to the SVEM Xerte project that covers all pages, persists via localStorage, and is activated from the title page.

**Architecture:** A `body.dark-mode` CSS class (applied by the title page toggle) overrides CSS custom properties in `custom.css`. All SVEM pages read `localStorage` on load and add the class if dark mode is saved. Since Xerte keeps all pages in the DOM simultaneously, toggling the class on `body` from any page instantly affects all pages.

**Tech Stack:** Plain CSS custom properties, jQuery (provided by Xerte runtime), localStorage, HTML5.

**Spec:** `docs/superpowers/specs/2026-03-12-dark-mode-design.md`

---

## Chunk 1: CSS — token overrides, hardcoded fixes, toggle styles

### Task 1: Add dark mode token block to `custom.css`

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/custom.css` (after line 82, after the closing `}` of `:root`)

- [ ] **Step 1: Open `custom.css` and locate the end of the `:root` block (line ~82)**

The `:root` block ends at line 82 with a closing `}`. The dark mode token block goes immediately after it.

- [ ] **Step 2: Insert the `body.dark-mode` token override block**

Insert after line 82:

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

- [ ] **Step 3: Verify visually**

Open `page-01-title.html` in a browser. In the browser console run:
```js
document.body.classList.add('dark-mode')
```
Expected: background goes dark (#111), heading text and link colours become readable on the dark background. No elements should disappear or show black-on-black text (except `.score-indicator` which will be fixed in Task 2).

- [ ] **Step 4: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/custom.css
git commit -m "feat(svem): add dark mode CSS token overrides"
```

---

### Task 2: Add hardcoded overrides block to `custom.css`

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/custom.css` (append to end of file)

- [ ] **Step 1: Append the hardcoded overrides block at the very end of `custom.css`**

```css

/* ========================================
   Dark mode overrides
   Hardcoded values that don't respond to token changes
   ======================================== */

/* Title page heading uses var(--cu-brand-blue) — override to brighter blue for readability */
body.dark-mode .title-page__heading {
  color: #7eb8ff;
}

/* Title page card shadow — deepen on dark background */
body.dark-mode .title-page__card {
  filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.4));
}

/* Score indicators: all use hardcoded light-mode hex backgrounds */
/* Note: level-4 uses var(--status-success-light) in light mode so the token override
   already changes it, but the explicit rule wins via specificity — intentional. */
body.dark-mode .score-indicator.level-1 { background: #2a2a2a; color: #ccc; }
body.dark-mode .score-indicator.level-2 { background: #1a2e1e; color: #86efac; }
body.dark-mode .score-indicator.level-3 { background: #1a2040; color: #93b4fd; }
body.dark-mode .score-indicator.level-4 { background: #1a2e1a; color: #86efac; }
body.dark-mode .score-indicator.level-5 { background: #1a2a2e; color: #7dd3e0; }
body.dark-mode .score-indicator.not-scored { background: #2e1a1a; color: #fca5a5; }

/* Section report border (hardcoded #f0f0f0 in light mode) */
body.dark-mode .section-report {
  border-bottom-color: #2e2e2e;
}
```

- [ ] **Step 2: Verify visually**

In browser console, run `document.body.classList.add('dark-mode')` and navigate to the summary page. Expected: score indicators show coloured dark backgrounds instead of washed-out light ones.

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/custom.css
git commit -m "feat(svem): add dark mode hardcoded value overrides"
```

---

### Task 3: Add toggle button styles to `custom.css`

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/custom.css` (inside the Title Page section, after `.title-page__footer p` block, around line ~169)

- [ ] **Step 1: Locate the title page footer styles (around line 159–169) and add toggle styles after them**

```css
/* Dark Mode Toggle Button */
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

- [ ] **Step 2: Verify visually**

The button doesn't exist in HTML yet — skip visual check for now. Confirm the CSS compiles without errors (no browser console CSS errors).

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/custom.css
git commit -m "feat(svem): add dark mode toggle button styles"
```

---

## Chunk 2: Title page — toggle button HTML and JS

### Task 4: Add toggle button markup to `page-01-title.html`

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-01-title.html` (inside `<footer class="title-page__footer">`, after the `<p>` copyright line)

- [ ] **Step 1: Open `page-01-title.html` and locate the footer (line 25–28)**

Current footer:
```html
<footer class="title-page__footer">
  <p>&copy; Cardiff University Learning and Teaching Academy
  </p>
</footer>
```

- [ ] **Step 2: Add toggle button after the `<p>` tag**

```html
<footer class="title-page__footer">
  <p>&copy; Cardiff University Learning and Teaching Academy
  </p>
  <button id="dark-mode-toggle" class="dark-mode-toggle" type="button" aria-pressed="false" aria-label="Enable dark mode">
    <span class="dark-mode-toggle__icon">☾</span>
    <span class="dark-mode-toggle__label">Dark mode</span>
  </button>
</footer>
```

- [ ] **Step 3: Verify visually**

Open `page-01-title.html` in a browser. Expected: a small pill button labelled "☾ Dark mode" appears below the copyright text in the footer. It should be subtle (muted border, muted text).

- [ ] **Step 4: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-01-title.html
git commit -m "feat(svem): add dark mode toggle button to title page"
```

---

### Task 5: Add init + toggle JS to `page-01-title.html`

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-01-title.html` (append `<script>` block at end of file)

- [ ] **Step 1: Append a new `<script>` block at the end of the file**

Note: `page-01-title.html` ends at line 33 with no closing `</body>` or `</html>` tags. Append at the very end.

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

- [ ] **Step 2: Verify the toggle works end-to-end**

Open the project in the Xerte player (or open `page-01-title.html` in a browser with the `custom.css` linked). Click the toggle button. Expected:
- Background goes dark (#111)
- Button label changes to "☀ Light mode"
- `aria-pressed` attribute becomes `"true"`
- `localStorage.getItem('svem-dark-mode')` returns `'dark'` in the browser console

Click again. Expected: reverts to light mode, button shows "☾ Dark mode".

- [ ] **Step 3: Verify localStorage persistence**

With dark mode on, hard-reload the page (in the browser, not the Xerte player — in the actual Xerte player the init fires once on player load and doesn't re-run on navigation). Expected: dark mode is still active (class is re-applied by the init on reload).

- [ ] **Step 4: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-01-title.html
git commit -m "feat(svem): add dark mode init and toggle JS to title page"
```

---

## Chunk 3: All other pages — dark mode init

The same init snippet goes into each of the 8 remaining pages. Pages without an existing `<script>` block get a new one added at the end of the file. For pages with an existing `$(function(){...})` block, the snippet goes at the top of that block. For pages that use a plain IIFE `(function(){...})` or bare top-level JS instead, prepend a standalone `$(function(){...})` block before the existing `<script>` tag.

**Init snippet:**
```js
// Dark mode init
if (localStorage.getItem('svem-dark-mode') === 'dark') {
  $('body').addClass('dark-mode');
}
```

---

### Task 6: `page-02-introduction.html` — create new script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-02-introduction.html` (no existing script block — add at end of file)

- [ ] **Step 1: Append a new `<script>` block at the end of `page-02-introduction.html`**

```html
<script>
// Dark mode init
$(function () {
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }
});
</script>
```

- [ ] **Step 2: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-02-introduction.html
git commit -m "feat(svem): add dark mode init to introduction page"
```

---

### Task 7: `page-03-themes-overview.html` — prepend new script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-03-themes-overview.html`

Note: this file's `<script>` tag (line ~74) opens with a plain IIFE `(function() {`, not a `$(function(){})` wrapper. Add a standalone `$(function(){})` init block immediately before the existing `<script>` tag.

- [ ] **Step 1: Open the file and locate the existing `<script>` tag (around line 74)**

The existing script starts:
```html
<script>
(function() {
    // Run on initial load
    initThemesOverview();
```

- [ ] **Step 2: Insert a new `<script>` block immediately before the existing one**

```html
<script>
// Dark mode init
$(function () {
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }
});
</script>
<script>
(function() {
    // existing code unchanged...
```

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-03-themes-overview.html
git commit -m "feat(svem): add dark mode init to themes overview page"
```

---

### Task 8: `page-03-enhancement-plan.html` — create new script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-03-enhancement-plan.html` (no existing script block)

- [ ] **Step 1: Append a new `<script>` block at the end of the file**

```html
<script>
// Dark mode init
$(function () {
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }
});
</script>
```

- [ ] **Step 2: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-03-enhancement-plan.html
git commit -m "feat(svem): add dark mode init to enhancement plan page"
```

---

### Task 9: `page-04-theme-1.html` — add to existing script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-04-theme-1.html`

- [ ] **Step 1: Open the file and locate the opening of the `$(function () {` block**

- [ ] **Step 2: Add the init snippet as the first statement inside that `$(function(){` block**

```js
$(function () {
  // Dark mode init
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }

  // ... existing code below unchanged ...
```

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-04-theme-1.html
git commit -m "feat(svem): add dark mode init to theme 1 page"
```

---

### Task 10: `page-05-theme-2.html` — add to existing script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-05-theme-2.html`

- [ ] **Step 1: Open the file and locate the opening of the `$(function () {` block**

- [ ] **Step 2: Add the init snippet as the first statement inside that `$(function(){` block**

```js
$(function () {
  // Dark mode init
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }

  // ... existing code below unchanged ...
```

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-05-theme-2.html
git commit -m "feat(svem): add dark mode init to theme 2 page"
```

---

### Task 11: `page-06-theme-3.html` — add to existing script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-06-theme-3.html`

- [ ] **Step 1: Open the file and locate the opening of the `$(function () {` block**

- [ ] **Step 2: Add the init snippet as the first statement inside that `$(function(){` block**

```js
$(function () {
  // Dark mode init
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }

  // ... existing code below unchanged ...
```

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-06-theme-3.html
git commit -m "feat(svem): add dark mode init to theme 3 page"
```

---

### Task 12: `page-07-summary-v3.html` — prepend new script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-07-summary-v3.html`

Note: this file has 3 `<script>` blocks. The first (line ~657) is bare top-level JS (`const CONFIG_V2 = ...`), not wrapped in a jQuery ready callback. The second block (around line 1093) has an IIFE. Add a standalone `$(function(){})` init block immediately before the first `<script>` tag.

- [ ] **Step 1: Open the file and locate the first `<script>` tag (line ~657)**

The existing first script starts:
```html
<script>
// ============================================================
```

- [ ] **Step 2: Insert a new `<script>` block immediately before the first `<script>` tag**

```html
<script>
// Dark mode init
$(function () {
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }
});
</script>
<script>
// ============================================================
// existing code unchanged...
```

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-07-summary-v3.html
git commit -m "feat(svem): add dark mode init to summary page"
```

---

### Task 13: `page-resources.html` — add to existing script block

**Files:**
- Modify: `Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-resources.html`

- [ ] **Step 1: Open the file and locate the opening of the `$(function () {` block (line ~353)**

- [ ] **Step 2: Add the init snippet as the first statement inside that `$(function(){` block**

```js
$(function () {
  // Dark mode init
  if (localStorage.getItem('svem-dark-mode') === 'dark') {
    $('body').addClass('dark-mode');
  }

  // ... existing code below unchanged ...
```

- [ ] **Step 3: Commit**

```bash
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/page-resources.html
git commit -m "feat(svem): add dark mode init to resources page"
```

---

### Task 14: Final end-to-end verification

- [ ] **Step 1: Open the project in the Xerte player**

Navigate through all pages while dark mode is active. Check for any elements that are invisible or have unacceptably low contrast. Pay particular attention to:
- Title page heading
- Filter buttons on resources page (active state: light blue text on medium blue bg — acceptable but review)
- Score indicators on theme pages
- Progress bars and status badges on themes overview

- [ ] **Step 2: Confirm localStorage persistence across navigation**

Toggle dark mode on, navigate through all pages, come back to title page. Dark mode should remain on. Toggle off and confirm all pages revert to light.

- [ ] **Step 3: Final commit if any minor tweaks were needed**

```bash
# Stage only the files you tweaked, e.g.:
git add Projects/SVEM-student-voice-enhancement-model/svem-xerte-version/custom.css
git commit -m "fix(svem): dark mode contrast tweaks from final review"
```
