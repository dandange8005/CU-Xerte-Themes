# CSS Code Optimization Recommendations

**Project:** SVEM Xerte Version
**Date:** 2024-12-18
**Files Analyzed:**
- custom.css (724 lines)
- page-07-summary.html (inline styles, lines 72-324)
- Theme pages (scattered inline styles)

This document provides comprehensive recommendations for improving, simplifying, and optimizing the CSS code structure.

---

## 1. Extract Color Values to CSS Custom Properties

### Current Issues
Repeated color values throughout the codebase without centralized management:

**Repeated Colors:**
- `#003366` (Cardiff University brand blue) - appears 8+ times
- `#2c3e50` (dark text) - appears 10+ times
- `#5f6c7b` (muted text) - appears 6+ times
- `#595959` (gray text) - appears 15+ times
- `#e5e5e5` (borders) - appears 12+ times
- `#27ae60` (success green) - appears 5+ times
- `#f39c12` (warning orange) - appears 5+ times

### Recommendation
Add comprehensive color system to `:root` in custom.css:

```css
/* ========================================
   CSS Custom Properties
   ======================================== */
:root {
    /* Brand Colors */
    --cu-brand-blue: #003366;
    --cu-brand-red: #d4374a;

    /* Grays - Text */
    --text-primary: #1a1a1a;
    --text-secondary: #2c3e50;
    --text-muted: #5f6c7b;
    --text-gray: #595959;
    --text-light-gray: #666;
    --text-disabled: #888;

    /* Grays - Borders & Backgrounds */
    --border-light: #e5e5e5;
    --border-medium: #e0e0e0;
    --border-dark: #dae1e7;
    --bg-white: #ffffff;
    --bg-light: #f8f9fa;
    --bg-gray: #eee;
    --bg-selected: #e6f0fa;

    /* Status Colors */
    --status-success: #27ae60;
    --status-success-light: #d4edda;
    --status-success-text: #155724;
    --status-warning: #f39c12;
    --status-warning-light: #fff3cd;
    --status-warning-text: #856404;
    --status-danger: #c0392b;
    --status-danger-light: #fee;
    --status-danger-border: #e74c3c;

    /* Level Colors (Grayscale) */
    --level-1: #d6d6d6;
    --level-2: #a3a3a3;
    --level-3: #737373;
    --level-4: #404040;
    --level-5: #000000;

    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.1);
    --shadow-modal: 0 4px 12px rgba(0, 0, 0, 0.15);

    /* Spacing Scale */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;

    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;

    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

**Usage Example:**

```css
/* Before */
.theme-card {
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    color: #2c3e50;
}

/* After */
.theme-card {
    background: var(--bg-white);
    box-shadow: var(--shadow-sm);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
}
```

**Benefits:**
- Single source of truth for colors
- Easy to update entire color scheme
- Better consistency across components
- Supports theming/dark mode in future
- Reduces file size through repetition

**Estimated Impact:** ~50 color replacements, improved maintainability

---

## 2. Consolidate Repeated Flexbox Patterns

### Current Issues
Repeated flexbox patterns appear throughout the code:

```css
/* Appears in 8+ places */
display: flex;
justify-content: space-between;
align-items: center;

/* Appears in 5+ places */
display: flex;
align-items: center;
gap: 1rem;

/* Appears in 4+ places */
display: flex;
flex-direction: column;
```

### Recommendation
Create utility classes in custom.css:

```css
/* ========================================
   Layout Utility Classes
   ======================================== */

/* Flexbox Utilities */
.flex {
    display: flex;
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flex-start {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.items-center {
    align-items: center;
}

.justify-between {
    justify-content: space-between;
}

.justify-center {
    justify-content: center;
}

/* Gap Utilities */
.gap-xs { gap: var(--space-xs); }
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }
.gap-xl { gap: var(--space-xl); }
```

**Usage in HTML:**

```html
<!-- Before -->
<div class="section-header-wrapper" style="display: flex; align-items: center; gap: 1rem;">

<!-- After -->
<div class="section-header-wrapper flex items-center gap-md">
```

**Impact:** Eliminates ~15-20 instances of repeated inline flexbox styles

---

## 3. Move Inline Styles to CSS Classes

### Current Issues
Theme pages have repeated inline styles that should be in CSS:

**In page-04-theme-1.html, page-05-theme-2.html, page-06-theme-3.html:**

```html
<!-- Line 18, 136 -->
<div style="display: flex; align-items: center; gap: 1rem;">

<!-- Line 25, 41, 59, etc. -->
<span style="margin-left: 1rem;">Moving towards Baseline</span>

<!-- Lines 115-127 - Evidence box labels -->
<label for="evidence-roles" style="font-weight:600; font-size:0.9rem; display:block; margin-bottom:0.5rem;">
<p style="font-size:0.85rem; color:#666; margin-bottom:0.75rem; line-height:1.5;">
<p style="font-size:0.85rem; color:#555; margin-bottom:0.75rem; line-height:1.6;">

<!-- Line 244 - Navigation -->
<div class="page-navigation" style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; gap: 1rem;">
```

### Recommendation

**Add to custom.css:**

```css
/* ========================================
   Evidence Box Styles
   ======================================== */

.evidence-box__label {
    font-weight: 600;
    font-size: 0.9rem;
    display: block;
    margin-bottom: var(--space-sm);
}

.evidence-box__intro {
    font-size: 0.85rem;
    color: var(--text-light-gray);
    margin-bottom: 0.75rem;
    line-height: 1.5;
}

.evidence-box__checklist {
    font-size: 0.85rem;
    color: var(--text-gray);
    margin-bottom: 0.75rem;
    line-height: 1.6;
}

/* Level Title Spacing */
.level-title-text {
    margin-left: var(--space-md);
}
```

**Update page-navigation in custom.css:**

```css
/* Page Navigation - Updated */
.page-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--space-xl);
    padding-top: var(--space-xl);
    gap: var(--space-md);
    border-top: 1px solid var(--border-light);
}
```

**Benefits:**
- Eliminates ~30+ inline style attributes
- Centralized styling in CSS
- Easier to update across all pages
- Better caching and performance

---

## 4. Consolidate Summary Page Styles into custom.css

### Current Issue
page-07-summary.html has 250+ lines of inline CSS (lines 72-324) that should be in custom.css:

```html
<style>
    /* Summary Page Styles */
    .summary-page { ... }
    .report-header { ... }
    /* ... 250+ lines ... */
</style>
```

### Recommendation
Move all summary page styles to custom.css under a dedicated section:

```css
/* ========================================
   Summary Page Styles
   ======================================== */

.summary-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--space-xl);
}

.report-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--space-xl);
    background: var(--bg-white);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-xl);
    box-shadow: var(--shadow-sm);
}

.report-meta {
    display: flex;
    flex-direction: column;
    text-align: right;
    font-size: 0.9rem;
}

.completion-summary {
    background: var(--bg-white);
    padding: var(--space-xl);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-xl);
    box-shadow: var(--shadow-sm);
}

.completion-summary h3 {
    margin: 0 0 var(--space-lg) 0;
    font-size: 1.25rem;
    color: var(--text-secondary);
}

.summary-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
    align-items: center;
}

.completion-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
}

.chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-md);
    background: var(--bg-light);
    border-radius: var(--radius-md);
    min-height: 300px;
}

.chart-container canvas {
    max-width: 100%;
    max-height: 350px;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--cu-brand-blue);
    line-height: 1;
}

.stat-label {
    margin-top: var(--space-sm);
    font-size: 0.9rem;
    color: var(--text-light-gray);
}

/* Theme Reports */
.theme-report {
    background: var(--bg-white);
    padding: var(--space-lg);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-lg);
    box-shadow: var(--shadow-sm);
}

.theme-report__title {
    font-size: 1.5rem;
    margin: 0 0 var(--space-md) 0;
    padding-bottom: var(--space-sm);
    border-bottom: 2px solid var(--border-light);
    color: var(--text-primary);
}

/* Section Reports */
.section-report {
    padding: var(--space-md) 0;
    border-bottom: 1px solid #f0f0f0;
}

.section-report:last-child {
    border-bottom: none;
}

.section-report__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.section-report__name {
    font-size: 1.1rem;
    margin: 0;
    color: var(--text-secondary);
    font-weight: 600;
}

.section-report__score {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.score-indicator {
    display: inline-block;
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-sm);
    font-weight: 700;
    font-size: 0.9rem;
}

.score-indicator.level-1 {
    background: #e8e8e8;
    color: #404040;
}
.score-indicator.level-2 {
    background: #d1e7dd;
    color: #0f5132;
}
.score-indicator.level-3 {
    background: #cfe2ff;
    color: #084298;
}
.score-indicator.level-4 {
    background: #d4edda;
    color: #155724;
}
.score-indicator.level-5 {
    background: #d1ecf1;
    color: #0c5460;
}
.score-indicator.not-scored {
    background: #f8d7da;
    color: #721c24;
}

.maturity-level {
    font-size: 0.85rem;
    color: var(--text-light-gray);
    font-style: italic;
}

.section-report__evidence {
    background: var(--bg-light);
    padding: 0.75rem;
    border-radius: var(--radius-sm);
    border-left: 3px solid var(--cu-brand-blue);
    margin-top: var(--space-sm);
}

.section-report__evidence strong {
    display: block;
    margin-bottom: 0.4rem;
    color: var(--text-secondary);
    font-size: 0.85rem;
}

.section-report__evidence p {
    margin: 0;
    line-height: 1.5;
    color: #495057;
    font-size: 0.9rem;
}

/* Report Actions */
.report-actions {
    background: var(--bg-white);
    padding: var(--space-xl);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-xl);
    text-align: center;
    box-shadow: var(--shadow-sm);
}

.report-actions p {
    margin: 0 0 var(--space-lg) 0;
    color: var(--text-light-gray);
}

.report-actions button {
    margin: 0 var(--space-sm);
}

/* Print styles */
@media print {
    .summary-page {
        background: white;
    }

    .page-navigation,
    .report-actions {
        display: none;
    }

    .theme-report,
    .completion-summary,
    .report-header {
        box-shadow: none;
        page-break-inside: avoid;
    }

    .summary-container {
        page-break-inside: avoid;
    }

    .chart-container {
        background: white;
        border: 1px solid var(--border-medium);
    }
}

/* Responsive - Summary Page */
@media (max-width: 768px) {
    .report-header {
        flex-direction: column;
        gap: var(--space-md);
    }

    .report-meta {
        text-align: left;
    }

    .summary-container {
        grid-template-columns: 1fr;
        gap: var(--space-xl);
    }

    .completion-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .chart-container {
        min-height: 250px;
    }

    .report-actions button {
        display: block;
        width: 100%;
        margin: var(--space-sm) 0;
    }
}
```

**In page-07-summary.html, replace the <style> block with:**

```html
<!-- Styles moved to custom.css -->
```

**Benefits:**
- Reduces HTML file size by ~250 lines
- All styles in one place
- Better caching (CSS file cached separately)
- Easier to maintain
- Consistent with project structure

---

## 5. Optimize clamp() Usage

### Current Issue
Multiple clamp() functions with similar patterns:

```css
font-size: clamp(2rem, 5vw, 3.5rem);
font-size: clamp(1rem, 2.5vw, 1.5rem);
font-size: clamp(2rem, 5vw, 3rem);
font-size: clamp(1rem, 2vw, 1.25rem);
font-size: clamp(1.75rem, 4vw, 2.5rem);
```

### Recommendation
Create a consistent type scale using CSS custom properties:

```css
:root {
    /* Typography Scale */
    --text-xs: 0.75rem;
    --text-sm: 0.85rem;
    --text-base: 0.9rem;
    --text-md: 0.95rem;
    --text-lg: 1rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 2rem;
    --text-4xl: 2.5rem;
    --text-5xl: 3rem;

    /* Responsive Typography */
    --heading-hero: clamp(2rem, 5vw, 3.5rem);
    --heading-1: clamp(2rem, 5vw, 3rem);
    --heading-2: clamp(1.75rem, 4vw, 2.5rem);
    --heading-3: 1.5rem;
    --heading-4: 1.25rem;
    --subheading: clamp(1rem, 2.5vw, 1.5rem);
    --body-lg: clamp(1rem, 2vw, 1.25rem);
}
```

**Usage:**

```css
/* Before */
.title-page__main-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
}

/* After */
.title-page__main-title {
    font-size: var(--heading-hero);
}
```

**Benefits:**
- Consistent typography across the application
- Easier to adjust responsive sizing
- More semantic naming
- Reduces duplication

---

## 6. Consolidate Media Queries

### Current Issue
Media queries scattered throughout the file:

- Lines 525-529: Theme page responsive
- Lines 295-323 (summary page): Multiple responsive rules

### Recommendation
Group all media queries at the end of the file:

```css
/* ========================================
   Responsive Design - Mobile
   ======================================== */

@media (max-width: 768px) {
    /* Theme Pages */
    .main-content {
        padding: var(--space-lg) var(--space-md);
    }

    /* Instructions Page */
    .instructions-page__info-cards {
        flex-direction: column;
        align-items: center;
    }

    .info-card {
        width: 100%;
        max-width: 300px;
    }

    /* Theme Cards */
    .theme-card {
        padding: var(--space-lg);
    }

    /* Summary Page - moved from inline styles */
    .report-header {
        flex-direction: column;
        gap: var(--space-md);
    }

    .report-meta {
        text-align: left;
    }

    .summary-container {
        grid-template-columns: 1fr;
        gap: var(--space-xl);
    }

    .completion-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .chart-container {
        min-height: 250px;
    }

    .report-actions button {
        display: block;
        width: 100%;
        margin: var(--space-sm) 0;
    }

    /* Modal */
    .modal-box {
        width: 95%;
    }
}

@media print {
    /* Print styles consolidated */
    .summary-page {
        background: white;
    }

    .page-navigation,
    .report-actions,
    #toast {
        display: none !important;
    }

    .theme-report,
    .completion-summary,
    .report-header {
        box-shadow: none;
        page-break-inside: avoid;
    }

    .summary-container {
        page-break-inside: avoid;
    }

    .chart-container {
        background: white;
        border: 1px solid var(--border-medium);
    }
}
```

**Benefits:**
- Easier to see all responsive behavior
- Reduces duplication across breakpoints
- Easier to maintain
- Better for debugging

---

## 7. Optimize Transitions

### Current Issue
Repeated transition declarations:

```css
transition: transform 0.2s ease, box-shadow 0.2s ease;
transition: all 0.2s ease;
transition: width 0.5s ease;
transition: opacity 0.3s;
transition: all 0.2s ease, border-left-color 0.3s ease;
```

### Recommendation
Use CSS custom properties and create standard transition utilities:

```css
:root {
    /* Transitions (from recommendation #1) */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}

/* Transition Utilities */
.transition {
    transition: all var(--transition-fast);
}

.transition-transform {
    transition: transform var(--transition-fast);
}

.transition-colors {
    transition: background-color var(--transition-fast),
                border-color var(--transition-fast),
                color var(--transition-fast);
}

.transition-shadow {
    transition: box-shadow var(--transition-fast);
}
```

**Usage:**

```css
/* Before */
.theme-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-left-color 0.3s ease;
}

/* After */
.theme-card {
    transition: transform var(--transition-fast),
                box-shadow var(--transition-fast),
                border-left-color var(--transition-normal);
}
```

**Benefits:**
- Consistent animation timing
- Easier to adjust globally
- Better performance (browser can optimize)
- More maintainable

---

## 8. Remove Empty Rules and Comments

### Current Issues
- Line 625-627: Empty `.summary-page` rule
- Line 13-14: Commented-out example that's no longer needed

### Recommendation

```css
/* Remove these: */

/* Line 13-14 */
/* Example: --svem-primary: #d4374a; */

/* Line 625-627 */
.summary-page {
    /* Add specific styles as needed */
}
```

**Impact:** Minor cleanup, reduces confusion

---

## 9. Optimize Selector Specificity

### Current Issue
Some selectors are more specific than necessary:

```css
/* Line 63 */
.title-page__icon .icon { }

/* Line 94 */
.title-page__footer p { }

/* Lines 493-500 */
.content-body ul { }
.content-body li { }
```

### Recommendation
Use child selectors or flatten where appropriate:

```css
/* Option 1: More specific (if needed) */
.title-page__icon > .icon { }
.title-page__footer > p { }

/* Option 2: Flatten (if icon is always in title-page) */
.title-page__icon {
    font-size: 4rem;
    line-height: 1;
}

/* For content body, these are fine as-is since they scope the styles */
.content-body ul { }
.content-body li { }
```

**Impact:** Minor improvement in specificity, easier overrides if needed

---

## 10. Create Spacing Utility Classes

### Current Issue
Many elements use custom padding/margin values:

```css
padding: 2rem;
margin-bottom: 2rem;
margin-top: 1.5rem;
gap: 8px;
padding: 0.8rem 1rem;
```

### Recommendation
Create spacing utility classes:

```css
/* ========================================
   Spacing Utility Classes
   ======================================== */

/* Margin Utilities */
.m-0 { margin: 0; }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }

/* Padding Utilities */
.p-0 { padding: 0; }
.p-sm { padding: var(--space-sm); }
.p-md { padding: var(--space-md); }
.p-lg { padding: var(--space-lg); }
.p-xl { padding: var(--space-xl); }
.px-md { padding-left: var(--space-md); padding-right: var(--space-md); }
.py-md { padding-top: var(--space-md); padding-bottom: var(--space-md); }
```

**Usage in HTML:**

```html
<!-- Before -->
<div style="margin-bottom: 2rem; padding: 1rem;">

<!-- After -->
<div class="mb-xl p-md">
```

**Benefits:**
- Consistent spacing throughout
- Reduces inline styles
- Easier to maintain
- Faster development

---

## 11. Optimize Level Indicator Colors

### Current Issue
Level colors defined separately (lines 445-463):

```css
details.l1 summary::before { background-color: #d6d6d6; }
details.l2 summary::before { background-color: #a3a3a3; }
details.l3 summary::before { background-color: #737373; }
details.l4 summary::before { background-color: #404040; }
details.l5 summary::before { background-color: #000000; }
```

### Recommendation
Use CSS custom properties (already defined in recommendation #1):

```css
details.l1 summary::before { background-color: var(--level-1); }
details.l2 summary::before { background-color: var(--level-2); }
details.l3 summary::before { background-color: var(--level-3); }
details.l4 summary::before { background-color: var(--level-4); }
details.l5 summary::before { background-color: var(--level-5); }
```

**Benefits:**
- Consistent with color system
- Easier to adjust level colors
- Centralized color management

---

## 12. Consolidate Box Shadow Declarations

### Current Issue
Box shadows repeated with similar values:

```css
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);  /* appears 8+ times */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);  /* appears 3+ times */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);   /* appears 3+ times */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);  /* appears 1 time */
```

### Recommendation
Use shadow custom properties (already defined in recommendation #1):

```css
/* Replace all instances */
box-shadow: var(--shadow-sm);   /* 0 2px 4px rgba(0, 0, 0, 0.05) */
box-shadow: var(--shadow-md);   /* 0 2px 8px rgba(0, 0, 0, 0.05) */
box-shadow: var(--shadow-lg);   /* 0 4px 12px rgba(0, 0, 0, 0.1) */
box-shadow: var(--shadow-modal); /* 0 4px 12px rgba(0, 0, 0, 0.15) */
```

**Impact:** ~15 replacements, better consistency

---

## Summary of Improvements

| Category | Lines Saved | Benefit |
|----------|-------------|---------|
| Move summary page styles to CSS | ~250 | Better structure, caching |
| Color custom properties | ~50 replacements | Consistency, theming |
| Flexbox utilities | ~15-20 | DRY, performance |
| Move inline styles to CSS | ~30 | Centralized styling |
| Spacing utilities | ~10-15 | Consistency |
| Shadow/transition properties | ~20 | Consistency |
| Media query consolidation | ~0 | Better organization |
| **TOTAL** | **~375-405 lines** | **Improved maintainability** |

---

## Implementation Priority

### High Priority (Implement First)
1. **CSS Custom Properties (#1)** - Foundation for all other improvements
2. **Move Summary Page Styles (#4)** - Largest impact, better structure
3. **Move Inline Styles to Classes (#3)** - Immediate improvement

### Medium Priority
4. **Flexbox Utilities (#2)** - Frequently used patterns
5. **Consolidate Media Queries (#6)** - Better organization
6. **Color/Shadow Variables (#11, #12)** - Depends on #1

### Lower Priority (Nice to Have)
7. **Typography Scale (#5)** - Depends on #1
8. **Spacing Utilities (#10)** - Depends on #1
9. **Transitions (#7)** - Depends on #1
10. **Cleanup (#8, #9)** - Minor improvements

---

## File Structure Recommendation

### Suggested custom.css Organization

```css
/* ========================================
   SVEM Xerte Version Custom Styles
   ======================================== */

/* 1. CSS Custom Properties */
:root { ... }

/* 2. Base Utilities */
/* Flexbox utilities */
/* Spacing utilities */

/* 3. Layout Styles */
/* Containers */
/* Navigation */

/* 4. Component Styles - Ordered by page */
/* Title Page */
/* Instructions Page */
/* Themes Overview Page */
/* Theme Pages */
/* Summary Page (moved from inline) */

/* 5. Shared Components */
/* Modals */
/* Buttons */
/* Toast */
/* Score badges */
/* Evidence boxes */

/* 6. Responsive Design */
/* Mobile (@media max-width: 768px) */
/* Print (@media print) */
```

---

## Testing Recommendations

After implementing CSS optimizations:

1. **Visual Regression Testing:**
   - Compare each page before/after
   - Check all responsive breakpoints
   - Test print styles

2. **Browser Testing:**
   - Chrome, Firefox, Safari
   - iOS Safari, Android Chrome
   - Ensure CSS custom properties work (IE11 not supported)

3. **Performance Testing:**
   - Measure CSS file size reduction
   - Check page load times
   - Verify caching behavior

4. **Accessibility:**
   - Check color contrast ratios
   - Verify focus states still work
   - Test with screen readers

---

## Migration Path

### Step-by-Step Implementation

**Phase 1: Foundation (Week 1)**
1. Add CSS custom properties to `:root`
2. Create utility classes (flexbox, spacing)
3. Test thoroughly

**Phase 2: Consolidation (Week 2)**
1. Move summary page styles to custom.css
2. Replace inline styles with CSS classes
3. Update all HTML files
4. Test each page

**Phase 3: Optimization (Week 3)**
1. Replace color values with CSS variables
2. Replace shadow/transition values
3. Consolidate media queries
4. Final testing

**Phase 4: Cleanup (Week 4)**
1. Remove unused styles
2. Remove empty rules
3. Final code review
4. Documentation update

---

## Notes

- All CSS custom properties require modern browsers (no IE11 support)
- Current code already uses some modern CSS (clamp, grid) so this is acceptable
- Inline styles in HTML are sometimes necessary for Xerte compatibility
- Keep summary page chart styles close to the chart implementation
- Consider creating a separate `utilities.css` if utility classes grow too large

---

**Last Updated:** 2024-12-18
