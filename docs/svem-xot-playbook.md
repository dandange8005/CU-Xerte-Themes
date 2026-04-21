# SVEM Xerte XOT Project Playbook

Extracted from the Student Voice Enhancement Model self-assessment tool. A decision log — each entry is the question you'll face mid-project, what worked, and why. The SVEM project is the most complex XOT project done so far: it involved converting a standalone web app, building a multi-page interactive assessment with localStorage persistence, a spider chart, dark mode, data import/export, and an HTML report download.

---

## 1. Xerte XOT Architecture (Non-Obvious Facts)

**Q: What is the single most important thing to understand about how Xerte XOT renders pages?**  
A: All pages are loaded into the DOM simultaneously and toggled with `display: none/block`. There is no page unload. JavaScript defined on any page is globally accessible from every other page — and every page's inline `<script>` block runs once at project load, not when the user navigates to that page.  
Why: This breaks every assumption from standalone web apps. `window.onload` only fires once. Navigation between pages is a CSS visibility swap, not a browser page load. Functions you define on page 2 are callable from page 7.

---

**Q: How do I run initialization code when the user actually navigates to a page?**  
A: Poll for element visibility using `setInterval` and track the last state:

```javascript
var lastVisible = false;
setInterval(function() {
    var el = document.getElementById('my-element');
    var isVisible = el && el.offsetParent !== null;
    if (isVisible && !lastVisible) {
        // Page just became visible — run init here
        initPage();
    }
    lastVisible = isVisible;
}, CONFIG.VISIBILITY_CHECK_INTERVAL); // 500ms
```

Why: There's no Xerte lifecycle hook for "user navigated to this page." Polling is the only reliable approach. The `CONFIG` constant prevents magic numbers from scattering across files.

---

**Q: Can I use `window.onload` for initialization?**  
A: No. `window.onload` fires once when the project loads — before the user has navigated anywhere meaningful. For global setup it's fine. For per-page init, use the visibility watcher above or call the function from `Optional Properties → Script` on that page:

```javascript
// In a page's Optional Properties → Script
if (typeof initSVEMPage === 'function') {
    initSVEMPage(['roles', 'training']);
}
```

The `typeof` check is essential — if the shared JS hasn't loaded yet (race condition on slow connections), this prevents "function is not defined" errors.

---

**Q: What HTML is valid inside a Xerte page?**  
A: Content fragments only — no `<html>`, `<head>`, or `<body>` tags. The page content is injected into `#pageContents`. Keep a standalone version (full HTML document) for local development and browser preview; strip the shell when pasting into Xerte.  
Why: Xerte's parser rejects full documents. The standalone file is also your only offline test environment.

---

**Q: Are there any HTML elements that Xerte's parser handles badly?**  
A: Yes — nested block elements inside `<summary>`. Using `<div>` inside `<summary>` causes Xerte to render empty grey accordion headers with `+` icons and no text.

```html
<!-- ❌ Don't — Xerte parser breaks this -->
<summary>
    <div class="level-header">
        <span class="level-number">LEVEL 2</span>
    </div>
</summary>

<!-- ✅ Do — inline elements only inside <summary> -->
<summary>
    <span class="level-number">LEVEL 2</span>
    <span class="level-title-text">Developing Practice</span>
</summary>
```

---

## 2. Converting a Standalone Web App to XOT

**Q: What's the conversion checklist before touching any code?**  
A:
1. Audit every `window.location.href` — each is a navigation that must become `x_navigateToPage()`
2. Map all `window.onload` / `DOMContentLoaded` callbacks — replace with visibility watchers or page-script calls
3. List all CSS `<link>` tags — move to Xerte's Optional Properties → Stylesheet (global) or page-level stylesheet
4. Find all script blocks — extract shared functions to a single JS file, load globally
5. Identify `<html>/<head>/<body>` structure — strip it when pasting into Xerte

---

**Q: How should I organize JavaScript for a multi-page XOT project?**  
A: One global shared file (e.g. `scoring-xerte.js`) loaded via Project Properties → Optional Properties → Script. Page-specific initialization is 5–15 lines at most, added in each page's Optional Properties → Script. No page should have its own copy of shared logic.  
Why: The original standalone version had ~120 lines duplicated across 4 pages (~480 total). Extracting to a shared file cut that to ~200 shared lines + ~10 lines per page. Any fix or change only needs to be made once.

---

**Q: What's the navigation API and which form should I use?**  
A: `x_navigateToPage()` is the only valid navigation. Two forms:

```javascript
// Form 1: Semantic linkID (preferred) — survives page reordering
x_navigateToPage(false, {type:'linkID', ID:'[next]'});     // next page
x_navigateToPage(false, {type:'linkID', ID:'[previous]'}); // previous page
x_navigateToPage(false, {type:'linkID', ID:'[first]'});    // first page
x_navigateToPage(false, {type:'linkID', ID:'[last]'});     // last page
x_navigateToPage(false, {type:'linkID', ID:'PG123456789'}); // specific page by ID

// Form 2: Relative offset (fragile — breaks if pages are reordered)
x_navigateToPage(x_currentPageXML, x_currentPage + 1, true);
```

Always use Form 1 for sequential next/previous navigation. Reserve Form 2 for jumping to a specific non-adjacent page (e.g. clicking a theme card on the overview that jumps 3 pages ahead). **Always add `return false;`** to onclick handlers — missing it causes a page reload.

---

**Q: I found the page ID for a specific page (e.g. `PG1765898999143`). Is it stable?**  
A: Yes — Xerte page IDs are permanent once a page is created. Store them in a `CONFIG` object rather than hardcoding throughout the codebase:

```javascript
const CONFIG = {
    THEMES_OVERVIEW_PAGE_ID: 'PG1765898999143',
    TOAST_DURATION: 2000,
    NAVIGATION_DELAY: 500,
    VISIBILITY_CHECK_INTERVAL: 500
};
```

---

## 3. CSS Architecture

**Q: Where does CSS go in a XOT project?**  
A: Everything global goes in Project Properties → Optional Properties → Stylesheet. Page-specific CSS goes in the page's own Optional Properties → Stylesheet. Don't use inline `<style>` blocks in your HTML content — they're harder to maintain and don't benefit from browser caching.  
Why: Xerte applies the global stylesheet to every page automatically. Keeping styles in one `custom.css` means you change a color once and it updates everywhere.

---

**Q: How should I structure `custom.css` for a complex multi-page project?**  
A: Organize by page with numbered sections and a header index:

```css
/* ============================================
   SVEM Custom Styles - Page Order Index
   1. CSS Custom Properties
   2. Page 01 - Title / Landing Page
   3. Page 02 - Introduction & Instructions
   4. Page 03 - Themes Overview
   5. Pages 04-06 - Individual Theme Pages
   6. Page 07 - Summary & Report
   7. Shared Components
   ============================================ */
```

Co-locate responsive media queries with their section rather than grouping all media queries at the bottom. This makes it obvious which breakpoint belongs to which component.

---

**Q: When should I use CSS custom properties vs. hardcoded values?**  
A: Use custom properties for anything that appears more than once. Define a full design token system in `:root` at the start:

```css
:root {
    --cu-brand-blue: #002554;
    --text-primary: var(--gray-11);   /* from Open Props via xot_main.css */
    --bg-white: var(--white);
    --shadow-sm: var(--shadow-1);
    --radius-md: 8px;
    --space-md: 1rem;
    --transition-fast: 0.2s var(--ease-2);
}
```

The SVEM project replaced ~50 hardcoded hex values and spacing values. A single color change now updates the entire tool. Bonus: it sets up dark mode for free — you only override the tokens.

---

**Q: The theme pages had ~50 inline styles in the HTML. Should those stay inline?**  
A: No. Move them to named CSS classes. The exception is Xerte layout boilerplate (hiding TOC, removing scroll-to-top) — that can stay in a page-level `<style>` block since it's structurally tied to the Xerte container. Everything visual belongs in `custom.css`.  
Why: Inline styles make it impossible to override specificity, can't be cached, and are invisible to grep. After extraction, the HTML becomes readable and the CSS becomes the single source of truth.

---

## 4. Data Persistence (localStorage)

**Q: What's the localStorage key scheme for a XOT assessment tool?**  
A: Use a project-specific prefix to prevent collisions with other Xerte projects on the same domain:

```javascript
// Key: sv_{sectionId}   (sv = student voice)
// Value: JSON string of { score: Number, note: String }
localStorage.setItem('sv_roles', JSON.stringify({ score: 3, note: 'We have...' }));
```

A prefix also makes it trivial to find all keys for this project (`getAllSectionKeys()` filters by `sv_`), reset the tool (remove all `sv_*` keys), and export data without touching other projects' storage.

---

**Q: How do I write safe localStorage utility functions?**  
A:

```javascript
function getSectionData(sectionId) {
    try {
        var raw = localStorage.getItem('sv_' + sectionId);
        return raw ? JSON.parse(raw) : { score: 0, note: '' };
    } catch(e) {
        console.error('localStorage read failed:', e);
        return { score: 0, note: '' };
    }
}

function setSectionData(sectionId, data) {
    try {
        localStorage.setItem('sv_' + sectionId, JSON.stringify(data));
        return true;
    } catch(e) {
        console.error('localStorage write failed:', e);
        return false; // quota exceeded or private mode
    }
}
```

Always wrap in try/catch — localStorage throws in private/incognito mode and when the storage quota is exceeded. Return a default value on read failure, return a boolean on write failure so the caller can show an error to the user.

---

**Q: The summary page is complex and self-contained. Should it share the same CONFIG and localStorage utilities as the other pages?**  
A: Duplicate them in the summary page. Each Xerte page's script runs in the same global scope, but you can't guarantee execution order on first load. Keeping the summary page self-contained (its own CONFIG, its own utility functions) means it works reliably even if the shared `scoring-xerte.js` hasn't fully initialized yet.  
Why: This was a real bug — on first load, summary page functions were calling shared utilities that hadn't run yet. Self-contained summary = no race condition.

---

**Q: How do I handle data export/import between sessions?**  
A: Export as a structured JSON file with a metadata wrapper. Import should auto-detect both the metadata-wrapped format and the raw format (for users who edited the file manually):

```javascript
function normalizeImportData(rawData) {
    // Detect wrapped format: { metadata: {...}, assessmentData: {...} }
    if (rawData.assessmentData) {
        return rawData.assessmentData;
    }
    // Detect raw format: { roles: { score: 3, note: '...' }, ... }
    return rawData;
}
```

Map field name differences (`evidence` → `note`) during import so both export formats work.

---

## 5. Dark Mode

**Q: How do I add dark mode to a XOT project that uses CSS custom properties?**  
A: Add a `data-theme="dark"` attribute to a stable parent element (the XOT player's outer container or `document.documentElement`), then override your `:root` tokens in a `[data-theme="dark"]` rule block:

```css
[data-theme="dark"] {
    --bg-white: #1e1e1e;
    --text-primary: #e0e0e0;
    --cu-brand-blue: #4a90d9;
    /* etc. */
}
```

Persist the preference in localStorage so it survives navigation between pages. Apply the attribute on every page's visibility init, not just the title page.

---

**Q: Some components used hardcoded colors not captured by the token system. How do I handle those?**  
A: Add targeted overrides in a `/* Dark mode hardcoded overrides */` section. Don't try to retroactively tokenize everything — just override the specific selectors:

```css
[data-theme="dark"] .score-btn.active { background: #4a90d9; color: #fff; }
[data-theme="dark"] .section-report__evidence { background: #2a2a2a; }
```

Accept that a few hardcoded overrides are better than a sweeping refactor mid-project.

---

**Q: Where should the dark mode toggle button live?**  
A: On the title/landing page only, in a fixed position (top-right). Every other page inherits the setting via localStorage on page visibility. Don't put a toggle on every page — it clutters the UI and the global setting is already applied.

---

## 6. Complex Components

**Q: How do I add a Chart.js spider/radar chart that works in Xerte?**  
A: Load Chart.js via CDN in the page's Optional Properties → Script (or globally if used on multiple pages). Destroy and recreate the chart instance every time the page becomes visible — don't try to update it in place:

```javascript
var chartInstance = null;
function generateSpiderChart() {
    if (chartInstance) { chartInstance.destroy(); }
    var ctx = document.getElementById('maturity-chart');
    if (!ctx) return;
    chartInstance = new Chart(ctx, { type: 'radar', data: {...}, options: {...} });
}
```

For print/PDF export: capture the canvas as a PNG (`canvas.toDataURL('image/png')`), swap it with an `<img>` in a DOM clone, then embed the clone in the downloaded HTML. The exported file has no Chart.js dependency.

---

**Q: The HTML report download function used template literals and worked fine in dev but broke in production. Why?**  
A: Xerte's JavaScript environment may be running in a context that doesn't support ES6 template literals consistently, particularly when building long HTML strings for download. Revert to string concatenation for HTML generation in download functions:

```javascript
// ❌ Broke in production
var html = `<h1>${title}</h1><p>${body}</p>`;

// ✅ Works everywhere
var html = '<h1>' + title + '</h1><p>' + body + '</p>';
```

Use `var` instead of `const`/`let` in download functions for maximum compatibility. Modern JS is fine in page logic; be conservative in file-generation code.

---

**Q: How do I make accordion sections work so only one is open at a time?**  
A: Use `<details>` elements and close siblings on open:

```javascript
document.querySelectorAll('.level-group details').forEach(function(detail) {
    detail.addEventListener('toggle', function() {
        if (this.open) {
            document.querySelectorAll('.level-group details').forEach(function(d) {
                if (d !== detail) d.removeAttribute('open');
            });
        }
    });
});
```

Initialize this in the page's visibility watcher — not in a `DOMContentLoaded` listener.

---

## 7. Development Process & Workflow

**Q: What's the right development loop for a XOT project?**  
A: Develop in standalone HTML files (full `<html>/<head>/<body>` structure) for fast browser preview. Keep a parallel `svem-self-assessment/` folder with the standalone version. When a page is stable, strip the shell and paste into Xerte. This means you always have a locally runnable version of the project.

---

**Q: When should I write a multi-page refactor vs. add code?**  
A: Refactor when you see the same code block in more than two places. The original SVEM pages each had ~120 lines of duplicated JavaScript — the refactor to `scoring-xerte.js` took one session and paid back in every subsequent change. Don't wait until the project is "done."

---

**Q: How do I handle the CSS optimization/cleanup cycle?**  
A: Keep a `CSS_OPTIMIZATION_RECOMMENDATIONS.md` or similar doc listing what needs doing. Work through it in one focused session rather than bits and pieces — moving inline styles to CSS classes, extracting tokens, and consolidating sections interact with each other. The SVEM cleanup replaced ~400 lines worth of duplicated/inline styles in a single session.

---

**Q: When does a XOT page need its own sub-directory?**  
A: Not often. The SVEM project uses a flat file structure: all HTML pages, `scoring-xerte.js`, and `custom.css` are siblings in `svem-xerte-version/`. Sub-directories made sense in PPIE (which had data files and conversion scripts). For assessment tools with shared JS and CSS, flat is fine.

---

## 8. Dos and Don'ts

| Do | Don't |
|----|-------|
| Use `x_navigateToPage()` with linkID | Use `window.location.href` |
| Add `return false;` to every onclick handler | Forget `return false;` (causes page reload) |
| Load shared JS and CSS globally via Optional Properties | Duplicate JS across pages |
| Use inline elements only inside `<summary>` | Nest `<div>` inside `<summary>` |
| Use `typeof fn === 'function'` before calling shared functions | Assume shared functions have loaded |
| Poll for page visibility to trigger per-page init | Use `window.onload` for page-level init |
| Store all config values in a `CONFIG` object | Scatter magic numbers throughout files |
| Wrap localStorage in try/catch | Call localStorage directly without error handling |
| Use string concatenation in download/export functions | Use template literals in download functions |
| Keep a standalone HTML version for local dev | Develop exclusively inside Xerte |
| Prefix localStorage keys with a project identifier | Use generic key names (collision risk) |
| Keep the summary page JS self-contained | Have the summary depend on other pages' functions |
| Test dark mode overrides on every page | Only test dark mode on the title page |
| Destroy and recreate Chart.js instances on page show | Try to update chart data in place |
