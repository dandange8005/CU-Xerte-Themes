# SVEM Self-Assessment - Xerte Conversion Summary

## What Was the Problem?

Your original SVEM Self-Assessment project was built as standalone HTML pages that don't work properly in Xerte XOT's multi-page environment. Here's why:

### Key Issues:

1. **Full HTML Documents**
   - Original files had complete HTML structure (`<html>`, `<head>`, `<body>`)
   - Xerte loads content into its own framework - full HTML documents conflict with this

2. **Inline JavaScript Not Executing**
   - Scripts embedded in `<script>` tags don't run reliably when Xerte dynamically loads pages
   - `window.onload` doesn't fire correctly in Xerte's page loading system

3. **Navigation Method Incompatible**
   - Used `window.location.href='page.html'`
   - This doesn't work in Xerte's single-page application structure
   - Xerte uses its own navigation API: `parent.x_navigateToPage()`

4. **Duplicated JavaScript**
   - Each page had its own copy of the same JavaScript functions
   - Not DRY (Don't Repeat Yourself)
   - Hard to maintain and update

---

## What Was Fixed?

### 1. Content-Only HTML Files ✅

**Before:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SVEM - Theme 1</title>
    <link rel="stylesheet" href="../../../css/xot_main.css">
    <link rel="stylesheet" href="css/custom.css">
</head>
<body>
    <main class="main-content">
        <!-- Content here -->
    </main>
    <script>
        // JavaScript here
    </script>
</body>
</html>
```

**After:**
```html
<!-- SVEM Theme 1 - Xerte Compatible -->
<div class="theme-page-container">
    <main class="main-content">
        <!-- Content here -->
    </main>
</div>

<div id="toast">Changes Saved</div>

<script>
    (function() {
        setTimeout(function() {
            if (typeof initSVEMPage === 'function') {
                initSVEMPage(['roles', 'training']);
            }
        }, 100);
    })();
</script>
```

**Changes:**
- Removed all HTML boilerplate
- Kept only the content markup
- CSS now loaded via Xerte's Optional Properties
- Minimal initialization script instead of full inline code

---

### 2. Centralized JavaScript ✅

**Before:**
- Each page: ~120 lines of duplicated JavaScript
- Total: 4 pages × 120 lines = ~480 lines of redundant code

**After:**
- One shared file: `scoring-xerte.js` (~200 lines)
- Each page: ~10 lines of initialization code
- More maintainable and DRY

**New Features in scoring-xerte.js:**
- `initSVEMPage(sectionIds)` - Centralized page initialization
- `initThemesOverview()` - Progress tracking on overview page
- `calculateThemeProgress(sectionIds)` - Progress calculations
- `updateThemeCard(themeId, sectionIds)` - Dynamic progress updates

---

### 3. Xerte-Compatible Navigation ✅

**Before:**
```javascript
// Doesn't work in Xerte
<button onclick="window.location.href='theme-2.html'">Next</button>
```

**After:**
```javascript
// Works in Xerte
<button onclick="parent.x_navigateToPage(parent.x_currentPageXML, parent.x_currentPage + 1, true)">Next</button>
```

**Navigation Methods:**
- `parent.x_currentPage + 1` - Next page
- `parent.x_currentPage - 1` - Previous page
- `parent.x_getPageID('page-name')` - Navigate by page name (alternative)

---

### 4. Fixed Script Initialization ✅

**Before:**
```javascript
// Doesn't work reliably in Xerte
window.onload = function() {
    loadSavedData('roles');
    loadSavedData('training');
};
```

**After:**
```javascript
// Works in Xerte - uses setTimeout to ensure Xerte framework is ready
(function() {
    setTimeout(function() {
        if (typeof initSVEMPage === 'function') {
            initSVEMPage(['roles', 'training']);
        }
    }, 100);
})();
```

**Why This Works:**
1. Immediately Invoked Function Expression (IIFE) runs when page loads
2. `setTimeout` gives Xerte's framework time to finish loading
3. Checks if function exists before calling (defensive programming)
4. Calls centralized `initSVEMPage()` with section IDs

---

### 5. Improved Button Selection Logic ✅

Enhanced the button matching in `loadSavedData()` to handle edge cases:

```javascript
// Precise button matching
const matchingBtn = Array.from(section.querySelectorAll('.score-btn')).find(btn => {
    const text = btn.textContent;
    // Match transitional scores like (4.5)
    if (text.includes(`(${saved.score})`)) return true;
    // Match whole numbers like "Set as Level 5"
    if (text.includes(`Set as Level ${saved.score}`)) return true;
    return false;
});
```

This fixes the bug where selecting "Level 5" would also highlight "Level 4.5".

---

## Files Created

### ✅ Completed:

1. **scoring-xerte.js** - Centralized JavaScript for all pages
2. **page-01-title.html** - Landing page (Xerte-compatible)
3. **page-02-instructions.html** - Instructions (Xerte-compatible)
4. **page-03-themes-overview.html** - Theme selection with progress (Xerte-compatible)
5. **page-04-theme-1.html** - Theme 1 with 2 subsections (Xerte-compatible)
6. **README-XERTE-SETUP.md** - Complete setup instructions
7. **CONVERSION-SUMMARY.md** - This file

### ⏳ To Be Created (Following Same Pattern):

8. **page-05-theme-2.html** - Theme 2 (1 subsection)
9. **page-06-theme-3.html** - Theme 3 (4 subsections)
10. **page-07-summary.html** - Summary/report page

---

## How to Create Remaining Pages

Follow this pattern for Theme 2 and Theme 3:

### Step-by-Step:

1. **Copy content from original file**
   - Open `../svem-self-assessment/theme-2.html`
   - Copy everything inside the `<body>` tag (lines 14-179)

2. **Remove outer wrapper if needed**
   - Keep the content structure
   - Remove `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` tags

3. **Update navigation buttons**
   - Replace `onclick="window.location.href='page.html'"`
   - With `onclick="parent.x_navigateToPage(parent.x_currentPageXML, parent.x_currentPage ± N, true)"`

4. **Add initialization script**
   ```html
   <script>
       (function() {
           setTimeout(function() {
               if (typeof initSVEMPage === 'function') {
                   initSVEMPage(['section-id-array']);
               }
           }, 100);
       })();
   </script>
   ```

5. **Include toast notification**
   ```html
   <div id="toast">Changes Saved</div>
   ```

6. **Test in Xerte**
   - Create page in Xerte
   - Paste content
   - Test navigation, scoring, saving

---

## Section IDs Reference

When creating initialization scripts, use these section IDs:

### Theme 1 (page-04-theme-1.html):
```javascript
initSVEMPage(['roles', 'training']);
```

### Theme 2 (page-05-theme-2.html):
```javascript
initSVEMPage(['reps-ssps']);
```

### Theme 3 (page-06-theme-3.html):
```javascript
initSVEMPage(['mme', 'me', 'nss', 'pg']);
```

### Themes Overview (page-03-themes-overview.html):
```javascript
initThemesOverview();
// Uses all section IDs internally
```

---

## Testing in Xerte

### Before Going Live:

1. **Load Test**
   - Navigate to each page
   - Check JavaScript console for errors
   - Verify CSS loads correctly

2. **Functionality Test**
   - Click score buttons
   - Enter evidence notes
   - Check toast notifications
   - Expand/collapse accordions

3. **Persistence Test**
   - Score several sections
   - Navigate away
   - Navigate back
   - Verify scores and notes are restored

4. **Progress Test**
   - Score some sections
   - Return to overview page
   - Check progress bars update
   - Check status badges change

5. **Cross-browser Test**
   - Test in Chrome, Firefox, Safari
   - Check mobile responsiveness

---

## Data Persistence

All data is stored in browser localStorage:

```javascript
// Storage format
localStorage.setItem('sv_roles', '{"score":3.5,"note":"Evidence here"}');
localStorage.setItem('sv_training', '{"score":4,"note":"Training notes"}');
// etc.
```

**Important Notes:**
- Data is browser-specific (not synced across devices)
- Data persists across sessions
- Clearing browser data will delete progress
- No server-side storage currently

**Future Enhancement Ideas:**
- Export data to JSON
- Server-side storage
- Print to PDF functionality
- Email results

---

## CSS Loading in Xerte

You need to load `custom.css` in Xerte. Three methods:

### Method 1: Project-Level (Recommended)
1. Copy contents of `../svem-self-assessment/css/custom.css`
2. In Xerte: Project Properties → Optional Properties
3. Paste into "Stylesheet" section
4. Applies to all pages automatically

### Method 2: External Link
1. Upload `custom.css` to web server
2. In Optional Properties, add:
   ```html
   <link rel="stylesheet" href="https://your-server.com/path/to/custom.css">
   ```

### Method 3: Page-Level
1. Add CSS to each individual page's Optional Properties
2. More work, but more control per page

---

## Comparison: Before vs After

| Aspect | Original Version | Xerte Version |
|--------|-----------------|---------------|
| File Structure | Full HTML documents | Content-only HTML |
| JavaScript | Inline, duplicated | Centralized, shared |
| Navigation | `window.location.href` | `parent.x_navigateToPage()` |
| Initialization | `window.onload` | IIFE with setTimeout |
| CSS Loading | `<link>` in `<head>` | Xerte Optional Properties |
| Maintainability | Low (duplication) | High (DRY) |
| Xerte Compatible | ❌ No | ✅ Yes |

---

## Next Steps

1. **Create remaining pages** (Theme 2, Theme 3, Summary)
2. **Test in Xerte environment**
3. **Adjust page navigation numbers** based on actual Xerte page order
4. **Add summary page** with report generation
5. **User testing** with Cardiff University stakeholders

---

## Questions & Support

### Common Questions:

**Q: Why the 100ms delay in initialization?**
A: Xerte needs time to fully load the page framework before our JavaScript runs.

**Q: Can I use absolute page numbers instead of relative (+1, -1)?**
A: Yes, but relative is better - if you reorder pages, navigation still works.

**Q: Can I navigate by page name?**
A: Yes, use `parent.x_getPageID('page-name')` - requires naming pages in Xerte.

**Q: Why is data stored in localStorage?**
A: Simplest solution for client-side persistence without server backend.

**Q: Can users export their results?**
A: Not yet - this would be a good enhancement for the summary page.

---

**Conversion Completed**: December 2024
**Converted By**: Claude Code
**Original Project**: `../svem-self-assessment/`
**Xerte Version**: `./` (svem-xerte-version/)
