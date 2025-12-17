# Xerte XOT Implementation Guide for SVEM Self-Assessment

## Understanding Xerte Page Structure

Based on the XOT structure, each Xerte page has three main areas:

1. **`#pageContents`** - Your HTML content
2. **`<script id="x_pageScript">`** - Page-specific JavaScript
3. **`<style id="x_pageCSS">`** - Page-specific CSS

## Implementation Methods

### Method 1: Using Xerte's Visual Editor (Recommended)

When you create a page in Xerte (e.g., "Plain Text" or "Bootstrap" page type):

1. **Page Content** - Enter HTML in the main content editor
2. **Optional Properties → Script** - Add JavaScript here
3. **Optional Properties → Stylesheet** - Add CSS here (or load globally)

### Method 2: Direct XML Editing (Advanced)

Edit the project's XML directly with the content for each page.

---

## Global Setup (Do This Once)

### Step 1: Load Shared JavaScript Globally

In your Xerte project's **Optional Properties → Script**, add the entire contents of `scoring-xerte.js`. This makes all functions available to all pages.

**Or** upload `scoring-xerte.js` to your file storage and reference it:
```html
<script src="FileLocation + 'scoring-xerte.js'"></script>
```

### Step 2: Load CSS Globally

In your Xerte project's **Optional Properties → Stylesheet**, paste the entire contents of `custom.css` from the original project.

**Location:** `../svem-self-assessment/css/custom.css`

This applies styles to all pages automatically.

---

## Page-by-Page Implementation

### Page 1: Title Page

**Page Type:** Plain Text or Bootstrap
**Page Name:** "Title Page"

#### HTML Content (for `#pageContents`):
```html
<main class="title-page">
    <div class="title-page__icon">
        <span class="icon">🏛️</span>
    </div>

    <h1 class="title-page__main-title">Student Voice Enhancement Model</h1>
    <p class="title-page__subtitle">Self-Assessment Tool</p>

    <button type="button" class="title-page__enter-btn" onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">
        ENTER RESOURCE
    </button>

    <footer class="title-page__footer">
        <p>&copy; 2024 Cardiff University</p>
    </footer>
</main>

<div id="toast">Changes Saved</div>
```

#### JavaScript (Optional Properties → Script):
```javascript
// No initialization needed for title page
```

---

### Page 2: Instructions

**Page Type:** Plain Text or Bootstrap
**Page Name:** "Instructions"

#### HTML Content:
```html
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

        <button type="button" class="instructions-page__cta-btn" onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">
            Begin Assessment
        </button>
    </div>
</div>

<div id="toast">Changes Saved</div>
```

---

### Page 3: Themes Overview

**Page Type:** Plain Text or Bootstrap
**Page Name:** "Themes Overview"

#### HTML Content:
```html
<div class="themes-overview">
    <div class="container">
        <h1 class="themes-overview__title">Assessment Themes</h1>
        <p class="themes-overview__description">Select a theme to begin or continue your assessment.</p>

        <!-- Theme 1 Card -->
        <div class="theme-card" data-theme-id="theme-1" onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)" style="cursor: pointer;">
            <div class="theme-card__header">
                <h2 class="theme-card__title">Theme 1: Structures Supporting Student Voice Activity</h2>
                <div class="theme-status">
                    <span class="status-badge status-not-started">Not Started</span>
                </div>
            </div>
            <p class="theme-card__description">
                Establishing clear roles, committees, and timelines.
            </p>
            <div class="theme-progress">
                <div class="theme-progress__bar">
                    <div class="theme-progress__fill" style="width: 0%"></div>
                </div>
                <span class="theme-progress__text">0 of 2 sections completed</span>
            </div>
        </div>

        <!-- Theme 2 Card -->
        <div class="theme-card" data-theme-id="theme-2" onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 2, true)" style="cursor: pointer;">
            <div class="theme-card__header">
                <h2 class="theme-card__title">Theme 2: Student Reps and Student-Staff Panels</h2>
                <div class="theme-status">
                    <span class="status-badge status-not-started">Not Started</span>
                </div>
            </div>
            <p class="theme-card__description">
                Supporting and empowering student representatives.
            </p>
            <div class="theme-progress">
                <div class="theme-progress__bar">
                    <div class="theme-progress__fill" style="width: 0%"></div>
                </div>
                <span class="theme-progress__text">0 of 1 sections completed</span>
            </div>
        </div>

        <!-- Theme 3 Card -->
        <div class="theme-card" data-theme-id="theme-3" onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 3, true)" style="cursor: pointer;">
            <div class="theme-card__header">
                <h2 class="theme-card__title">Theme 3: Formal Mechanisms for Student Voice</h2>
                <div class="theme-status">
                    <span class="status-badge status-not-started">Not Started</span>
                </div>
            </div>
            <p class="theme-card__description">
                Optimizing formal feedback mechanisms.
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
            <button type="button" class="btn-primary" onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 4, true)">
                Review & Submit Report
            </button>
        </div>
    </div>
</div>

<div id="toast">Changes Saved</div>
```

#### JavaScript (Optional Properties → Script):
```javascript
// Initialize themes overview on page load
if (typeof initThemesOverview === 'function') {
    initThemesOverview();
}
```

---

## Key Differences from Standalone Version

### Navigation

**❌ Old (doesn't work in Xerte):**
```javascript
window.location.href='theme-2.html'
```

**✅ New Method 1: Sequential Navigation (Recommended)**
```javascript
x_navigateToPage(false, {type:'linkID', ID:'[next]'})
```

Available link IDs:
- `[next]` - Navigate to next page
- `[previous]` - Navigate to previous page
- `[first]` - Navigate to first page
- `[last]` - Navigate to last page

**Benefits:**
- More maintainable (no need to calculate page offsets)
- Flexible (adding/removing pages won't break navigation)
- Semantic and clear

**✅ New Method 2: Relative Page Navigation**
```javascript
x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)
```

**Parameters:**
- `x_currentPageXML` - Current page XML (always use this variable)
- `x_currentPage + N` - Target page (relative navigation with offset)
- `true` - History flag (enables back button)

**When to use each method:**
- Use **Method 1** for sequential navigation (Next, Previous, First, Last buttons)
- Use **Method 2** when jumping to specific pages (e.g., clicking theme cards from overview)

### Script Execution

**❌ Old (doesn't work in Xerte):**
```javascript
window.onload = function() {
    loadSavedData('roles');
};
```

**✅ New (works in Xerte):**
```javascript
// Put initialization code directly in x_pageScript
// Xerte executes this after page loads
if (typeof initSVEMPage === 'function') {
    initSVEMPage(['roles', 'training']);
}
```

---

## Navigation Patterns & Examples

### Adding Previous/Next Buttons to Pages

Add navigation buttons at the bottom of assessment pages:

```html
<div class="navigation-buttons" style="margin-top: 2rem; display: flex; justify-content: space-between;">
    <button type="button" class="btn-secondary" onclick="x_navigateToPage(false, {type:'linkID', ID:'[previous]'}); return false;">
        ← Previous
    </button>
    <button type="button" class="btn-primary" onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">
        Next →
    </button>
</div>
```

### Return to Overview Button

Add a button to return to the themes overview page:

```html
<button type="button" class="btn-secondary" onclick="x_navigateToPage(false, {type:'linkID', ID:'[first]'}); return false;">
    ← Back to Overview
</button>
```

### Jump to Summary/Last Page

Add a button to skip to the summary:

```html
<button type="button" class="btn-primary" onclick="x_navigateToPage(false, {type:'linkID', ID:'[last]'}); return false;">
    View Summary →
</button>
```

### Complete Navigation Footer Example

```html
<footer class="page-navigation">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem 0;">
        <button type="button" class="btn-secondary" onclick="x_navigateToPage(false, {type:'linkID', ID:'[previous]'}); return false;">
            ← Previous
        </button>

        <a href="#" onclick="x_navigateToPage(false, {type:'linkID', ID:'[first]'}); return false;" style="text-decoration: underline;">
            Return to Overview
        </a>

        <button type="button" class="btn-primary" onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">
            Next →
        </button>
    </div>
</footer>
```

---

## Data Management Features

### Reset Data Modal

The Instructions page includes a data management feature that allows users to reset all assessment data with a confirmation dialog.

#### What's Included:

1. **Reset Button** - Red "🗑️ Reset All Data" button on the Instructions page
2. **Confirmation Modal** - Prevents accidental data loss with a warning dialog
3. **Import Data** - Allows users to import previously exported JSON data
4. **Export Data** - Users can download their assessment data as JSON

#### Implementation:

**HTML Structure** (in `page-02-instructions.html`):
```html
<!-- Data Management Buttons -->
<div style="margin-top: 2rem; display: flex; gap: 10px; justify-content: center;">
    <input type="file" id="importFile" style="display:none"
           onchange="importData(this); return false;" accept=".json">
    <button class="btn-secondary"
            onclick="document.getElementById('importFile').click(); return false;">
        📂 Import Data
    </button>
    <button class="btn-secondary btn-danger"
            onclick="resetData(); return false;">
        🗑️ Reset All Data
    </button>
</div>

<!-- Reset Confirmation Modal -->
<div id="reset-modal" class="modal-overlay" style="display: none;">
    <div class="modal-box">
        <h3 style="color:#c0392b;">Reset All Data?</h3>
        <p>This will permanently delete all your scores and notes. This cannot be undone.</p>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="closeResetModal(); return false;">
                Cancel
            </button>
            <button class="btn" style="background:#c0392b;" onclick="confirmReset(); return false;">
                Yes, Delete Everything
            </button>
        </div>
    </div>
</div>
```

**CSS** (added to `custom.css`):
- `.modal-overlay` - Full-screen overlay with semi-transparent background
- `.modal-box` - Centered modal dialog with slide-in animation
- `.btn-danger` - Red warning button styling

**JavaScript Functions** (in `scoring-xerte.js`):
- `resetData()` - Opens the confirmation modal
- `closeResetModal()` - Closes the modal without action
- `confirmReset()` - Clears all localStorage data with `sv_` prefix and reloads page
- `importData(input)` - Imports JSON data from file upload
- `downloadJSON()` - Exports all assessment data to JSON file

#### User Flow:

1. User clicks "🗑️ Reset All Data" button
2. Modal appears with warning message
3. User can:
   - Click "Cancel" to close modal (no action taken)
   - Click "Yes, Delete Everything" to confirm reset
4. On confirmation:
   - All assessment data is cleared from localStorage
   - Toast notification shows "All data has been reset"
   - Page reloads to show clean state

#### Data Import/Export:

**Export Data:**
- Users can click "📥 Download Data (JSON)" on the summary page
- Creates a JSON file named `svem_assessment_data_YYYY-MM-DD.json`
- Contains all scores, notes, and evidence

**Import Data:**
- Users click "📂 Import Data" button
- Select a previously exported JSON file
- Data is loaded into localStorage
- Page reloads to show imported data

#### Safety Features:

- **Confirmation dialog** prevents accidental deletion
- **Clear warning** message explains consequences
- **Visual distinction** (red button) signals destructive action
- **Toast feedback** confirms action completion
- **Data preservation** through export before reset

---

## Testing Your Implementation

### 1. Check JavaScript Loading
Open browser console (F12) and verify no errors.

### 2. Test Navigation
- Click through all pages
- Use browser back button
- Check page transitions are smooth

### 3. Test Scoring
- Click score buttons
- Verify toast notification appears
- Check badge updates
- Refresh page and verify data persists

### 4. Test Progress Tracking
- Score sections in themes
- Return to overview page
- Verify progress bars update
- Check status badges change

### 5. Test Data Management
- Click "Reset All Data" button
- Verify modal appears with warning
- Click "Cancel" - modal should close without action
- Click "Reset All Data" again
- Click "Yes, Delete Everything"
- Verify toast notification shows "All data has been reset"
- Check that all scores and notes are cleared
- Test Import Data:
  - Export data first (if available on summary page)
  - Clear some data
  - Import the exported file
  - Verify data is restored

---

## Troubleshooting

### JavaScript Functions Not Found

**Problem:** Console shows "function is not defined"

**Solution:**
1. Verify `scoring-xerte.js` is loaded in Optional Properties → Script
2. Check for syntax errors in the script
3. Ensure functions are not wrapped in restrictive scope

### Navigation Not Working

**Problem:** Clicking buttons does nothing

**Solution:**
1. Check you're using `x_navigateToPage()` not `window.location.href`
2. Verify page numbers are correct (0-indexed)
3. Check console for JavaScript errors

### Styles Not Applied

**Problem:** Page looks unstyled

**Solution:**
1. Verify CSS is loaded in Optional Properties → Stylesheet
2. Check for CSS syntax errors
3. Use browser inspector to see which styles are applied

### LocalStorage Not Persisting

**Problem:** Data doesn't save or reload

**Solution:**
1. Check browser allows localStorage (not in private/incognito mode)
2. Verify section IDs match between HTML and JavaScript
3. Check console for localStorage errors

---

## Page Order Reference

When creating your Xerte project, use this page order:

0. **Title Page** (index)
1. **Instructions**
2. **Themes Overview**
3. **Theme 1** - Structures Supporting Student Voice
4. **Theme 2** - Student Reps & SSPs
5. **Theme 3** - Formal Mechanisms
6. **Summary** - Results & Report

Adjust the `x_currentPage + N` values in your navigation based on this order.

---

## Next Steps

1. ✅ Load `scoring-xerte.js` globally
2. ✅ Load `custom.css` globally
3. ✅ Create pages 1-3 (Title, Instructions, Overview)
4. ⏳ Create Theme pages (see separate implementation files)
5. ⏳ Test thoroughly before publishing

---

**Last Updated:** 2024-12-16
