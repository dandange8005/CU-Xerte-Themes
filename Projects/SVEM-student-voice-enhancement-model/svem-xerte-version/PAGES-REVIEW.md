# Review: Pages 1-3 (Title, Instructions, Themes Overview)

## Summary

I've reviewed all three pages. They are **mostly correct** but have a few minor issues to fix.

---

## ✅ Page 1: Title (page-01-title.html)

### Status: **MOSTLY CORRECT** ⚠️

### Issues Found:

1. **Line 15:** Navigation uses `parent.x_navigateToPage()`
   - **Issue:** The `parent.` prefix is unnecessary in Xerte pages
   - **Fix:** Change to `x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)`

### Corrected HTML:

```html
<!-- SVEM Title Page - Xerte Compatible -->
<main class="title-page">
    <div class="title-page__icon">
        <span class="icon">🏛️</span>
    </div>

    <h1 class="title-page__main-title">Student Voice Enhancement Model</h1>
    <p class="title-page__subtitle">Self-Assessment Tool</p>

    <!-- ✅ CORRECTED: Removed parent. prefix -->
    <button type="button" class="title-page__enter-btn"
            onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)">
        ENTER RESOURCE
    </button>

    <footer class="title-page__footer">
        <p>&copy; 2024 Cardiff University</p>
    </footer>
</main>

<div id="toast">Changes Saved</div>
```

### CSS Classes Used:
- `.title-page` ✅
- `.title-page__icon` ✅
- `.title-page__main-title` ✅
- `.title-page__subtitle` ✅
- `.title-page__enter-btn` ✅
- `.title-page__footer` ✅

**All classes are defined in custom.css (lines 50-119)**

---

## ✅ Page 2: Instructions (page-02-instructions.html)

### Status: **MOSTLY CORRECT** ⚠️

### Issues Found:

1. **Line 35:** Navigation uses `parent.x_navigateToPage()`
   - **Issue:** The `parent.` prefix is unnecessary
   - **Fix:** Change to `x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)`

### Corrected HTML:

```html
<!-- SVEM Instructions Page - Xerte Compatible -->
<div class="instructions-page">
    <div class="instructions-container">
        <h1 class="instructions-page__title">Welcome to the SVEM Self-Assessment</h1>

        <p class="instructions-page__description">
            This self-assessment tool will help you evaluate your institution's Student Voice practices
            across multiple themes and identify areas for development.
        </p>

        <div class="instructions-page__info-cards">
            <div class="info-card">
                <div class="info-card__icon">⏱️</div>
                <div class="info-card__value">45 mins</div>
                <div class="info-card__label">Estimated Time</div>
            </div>

            <div class="info-card">
                <div class="info-card__icon">💾</div>
                <div class="info-card__value">Auto-Save</div>
                <div class="info-card__label">Progress Saved</div>
            </div>

            <div class="info-card">
                <div class="info-card__icon">📋</div>
                <div class="info-card__value">3 Themes</div>
                <div class="info-card__label">To Complete</div>
            </div>
        </div>

        <!-- ✅ CORRECTED: Removed parent. prefix -->
        <button type="button" class="instructions-page__cta-btn"
                onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)">
            Begin Assessment
        </button>
    </div>
</div>

<div id="toast">Changes Saved</div>
```

### CSS Classes Used:
- `.instructions-page` ✅
- `.instructions-container` ✅
- `.instructions-page__title` ✅
- `.instructions-page__description` ✅
- `.instructions-page__info-cards` ✅
- `.info-card` ✅
- `.info-card__icon` ✅
- `.info-card__value` ✅
- `.info-card__label` ✅
- `.instructions-page__cta-btn` ✅

**All classes are defined in custom.css (lines 122-213)**

---

## ✅ Page 3: Themes Overview (page-03-themes-overview.html)

### Status: **NEEDS CORRECTION** ❌

### Issues Found:

1. **Lines 10, 29, 48, 68:** Navigation uses `parent.x_navigateToPage()`
   - **Issue:** The `parent.` prefix is unnecessary
   - **Fix:** Remove `parent.`

2. **Line 29:** Theme 2 navigation offset is wrong
   - **Current:** `x_currentPage + 4`
   - **Should be:** `x_currentPage + 2` (assuming pages are in order)

3. **Line 48:** Theme 3 navigation offset is wrong
   - **Current:** `x_currentPage + 5`
   - **Should be:** `x_currentPage + 3`

4. **Line 68:** Summary navigation offset might be wrong
   - **Current:** `x_currentPage + 6`
   - **Should be:** `x_currentPage + 4` (if summary comes right after Theme 3)

### Corrected HTML:

```html
<!-- SVEM Themes Overview Page - Xerte Compatible -->
<div class="themes-overview">
    <div class="container">
        <h1 class="themes-overview__title">Assessment Themes</h1>
        <p class="themes-overview__description">Select a theme to begin or continue your assessment. Your progress is automatically saved.</p>

        <!-- Theme 1 Card -->
        <!-- ✅ CORRECTED: Removed parent. prefix -->
        <div class="theme-card" data-theme-id="theme-1"
             onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)"
             style="cursor: pointer;">
            <div class="theme-card__header">
                <h2 class="theme-card__title">Theme 1: Structures Supporting Student Voice Activity</h2>
                <div class="theme-status">
                    <span class="status-badge status-not-started">Not Started</span>
                </div>
            </div>
            <p class="theme-card__description">
                Establishing clear roles, committees, and timelines to embed student voice into the school's culture.
            </p>
            <div class="theme-progress">
                <div class="theme-progress__bar">
                    <div class="theme-progress__fill" style="width: 0%"></div>
                </div>
                <span class="theme-progress__text">0 of 2 sections completed</span>
            </div>
        </div>

        <!-- Theme 2 Card -->
        <!-- ✅ CORRECTED: Changed +4 to +2 -->
        <div class="theme-card" data-theme-id="theme-2"
             onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 2, true)"
             style="cursor: pointer;">
            <div class="theme-card__header">
                <h2 class="theme-card__title">Theme 2: Student Reps and Student-Staff Panels</h2>
                <div class="theme-status">
                    <span class="status-badge status-not-started">Not Started</span>
                </div>
            </div>
            <p class="theme-card__description">
                Supporting and empowering student representatives and enhancing Student-Staff Panel effectiveness.
            </p>
            <div class="theme-progress">
                <div class="theme-progress__bar">
                    <div class="theme-progress__fill" style="width: 0%"></div>
                </div>
                <span class="theme-progress__text">0 of 1 sections completed</span>
            </div>
        </div>

        <!-- Theme 3 Card -->
        <!-- ✅ CORRECTED: Changed +5 to +3 -->
        <div class="theme-card" data-theme-id="theme-3"
             onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 3, true)"
             style="cursor: pointer;">
            <div class="theme-card__header">
                <h2 class="theme-card__title">Theme 3: Formal Mechanisms for Student Voice</h2>
                <div class="theme-status">
                    <span class="status-badge status-not-started">Not Started</span>
                </div>
            </div>
            <p class="theme-card__description">
                Optimizing formal feedback mechanisms including module evaluations and institutional surveys.
            </p>
            <div class="theme-progress">
                <div class="theme-progress__bar">
                    <div class="theme-progress__fill" style="width: 0%"></div>
                </div>
                <span class="theme-progress__text">0 of 4 sections completed</span>
            </div>
        </div>

        <!-- Actions -->
        <div class="themes-overview__actions">
            <!-- ✅ CORRECTED: Changed +6 to +4 -->
            <button type="button" class="btn-primary"
                    onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 4, true)">
                Review & Submit Report
            </button>
        </div>
    </div>
</div>

<div id="toast">Changes Saved</div>

<!-- Initialize themes overview on page load -->
<script>
    (function() {
        setTimeout(function() {
            if (typeof initThemesOverview === 'function') {
                initThemesOverview();
            }
        }, 100);
    })();
</script>
```

### CSS Classes Used:
- `.themes-overview` ✅
- `.container` ✅
- `.themes-overview__title` ✅
- `.themes-overview__description` ✅
- `.theme-card` ✅
- `.theme-card__header` ✅
- `.theme-card__title` ✅
- `.theme-status` ✅
- `.status-badge` ✅
- `.theme-card__description` ✅
- `.theme-progress` ✅
- `.theme-progress__bar` ✅
- `.theme-progress__fill` ✅
- `.theme-progress__text` ✅
- `.themes-overview__actions` ✅
- `.btn-primary` ✅

**All classes are defined in custom.css (lines 215-371)**

---

## 🎨 CSS Requirements

### ⚠️ CRITICAL: You MUST Load custom.css

All three pages use CSS classes from `../svem-self-assessment/css/custom.css`. Without this CSS, the pages will look unstyled.

### Option 1: Load Globally (RECOMMENDED ✅)

Load the CSS once for the entire project:

1. Go to **Project Properties → Optional Properties → Stylesheet**
2. Copy the **entire contents** of `../svem-self-assessment/css/custom.css`
3. Paste into the Stylesheet field
4. Save

**Advantages:**
- ✅ Load once, applies to all pages
- ✅ Easier to maintain
- ✅ Better performance
- ✅ Consistent styling across all pages

### Option 2: Load Per Page (NOT RECOMMENDED ❌)

For each page, copy only the relevant CSS sections:

**Page 1 (Title):**
- Lines 50-119 from custom.css

**Page 2 (Instructions):**
- Lines 122-213 from custom.css

**Page 3 (Themes Overview):**
- Lines 215-371 from custom.css

**Why not recommended:**
- ❌ Duplicates CSS across pages
- ❌ Hard to maintain (changes must be made on every page)
- ❌ Larger total file size

---

## 📋 CSS Classes Reference

### Used by ALL Pages:
```css
#toast              /* Toast notification (lines 671-687) */
.show              /* Toast show animation */
```

### Used by Page 1 (Title):
```css
.title-page
.title-page__icon
.title-page__main-title
.title-page__subtitle
.title-page__enter-btn
.title-page__footer
```

### Used by Page 2 (Instructions):
```css
.instructions-page
.instructions-container
.instructions-page__title
.instructions-page__description
.instructions-page__info-cards
.info-card
.info-card__icon
.info-card__value
.info-card__label
.instructions-page__cta-btn
```

### Used by Page 3 (Themes Overview):
```css
.themes-overview
.container
.themes-overview__title
.themes-overview__description
.theme-card
.theme-card__header
.theme-card__title
.theme-status
.status-badge
.status-not-started
.status-in-progress
.status-complete
.theme-card__description
.theme-progress
.theme-progress__bar
.theme-progress__fill
.theme-progress__text
.themes-overview__actions
.btn-primary
```

### Used by Theme Pages (4-6):
```css
.theme-page-container
.main-content
.theme-label
.theme-description
.section-header-wrapper
.score-badge
.toggle-btn
.level-group
.level-header
.level-number
.level-title
.content-body
.scoring-actions
.score-btn
.score-btn.active
.evidence-box
.evidence-input
.page-navigation
.btn-secondary
.selected-level
```

---

## 🚀 Implementation Checklist

### Before Creating Pages:
- [ ] **Load custom.css globally** in Project Optional Properties → Stylesheet
- [ ] **Load scoring-xerte.js globally** in Project Optional Properties → Script

### Create Pages in This Order:
- [ ] **Page 0:** Title (use corrected HTML above)
- [ ] **Page 1:** Instructions (use corrected HTML above)
- [ ] **Page 2:** Themes Overview (use corrected HTML above)
- [ ] **Page 3:** Theme 1 (use PAGE-THEME-1.md)
- [ ] **Page 4:** Theme 2 (use PAGE-THEME-2.md)
- [ ] **Page 5:** Theme 3 (use PAGE-THEME-3.md)
- [ ] **Page 6:** Summary (use PAGE-SUMMARY.md)

### After Creating Pages:
- [ ] Test navigation flows correctly
- [ ] Verify CSS styling applied to all pages
- [ ] Check toast notifications work
- [ ] Test progress tracking on overview page

---

## 🐛 Navigation Page Numbers

**IMPORTANT:** The page offsets in page-03-themes-overview.html assume this page order:

```
Page 0: Title
Page 1: Instructions
Page 2: Themes Overview    ← You are here
Page 3: Theme 1            ← +1 from current
Page 4: Theme 2            ← +2 from current
Page 5: Theme 3            ← +3 from current
Page 6: Summary            ← +4 from current
```

If you create pages in a different order, you'll need to adjust the `+ N` values in the onclick handlers.

---

## Summary of Changes Needed

### Page 1 (Title):
- ✅ Remove `parent.` from line 15

### Page 2 (Instructions):
- ✅ Remove `parent.` from line 35

### Page 3 (Themes Overview):
- ✅ Remove `parent.` from lines 10, 29, 48, 68
- ✅ Change `+4` to `+2` on line 29 (Theme 2)
- ✅ Change `+5` to `+3` on line 48 (Theme 3)
- ✅ Change `+6` to `+4` on line 68 (Summary)

### CSS:
- ✅ **MUST load custom.css globally** in Project Optional Properties

---

**Created:** 2024-12-16
**Status:** Ready for implementation with corrections
