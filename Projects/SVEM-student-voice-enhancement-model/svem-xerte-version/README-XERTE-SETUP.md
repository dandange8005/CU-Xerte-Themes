# SVEM Self-Assessment - Xerte XOT Setup Guide

## Overview

This folder contains Xerte-compatible versions of the SVEM Self-Assessment tool. The key differences from the standalone version are:

1. **Content-only HTML files** - No `<html>`, `<head>`, or `<body>` tags
2. **Xerte navigation** - Uses `parent.x_navigateToPage()` instead of `window.location.href`
3. **Updated JavaScript initialization** - Works with Xerte's page loading system
4. **Shared JavaScript file** - All functions consolidated in `scoring-xerte.js`

---

## File Structure

```
svem-xerte-version/
├── README-XERTE-SETUP.md          # This file
├── scoring-xerte.js                # Shared JavaScript for all pages
├── page-01-title.html              # Title/landing page
├── page-02-instructions.html       # Instructions page
├── page-03-themes-overview.html    # Theme selection with progress tracking
├── page-04-theme-1.html            # Theme 1: Structures Supporting Student Voice
├── page-05-theme-2.html            # Theme 2: Student Reps & SSPs (TO BE CREATED)
├── page-06-theme-3.html            # Theme 3: Formal Mechanisms (TO BE CREATED)
└── page-07-summary.html            # Summary/report page (TO BE CREATED)
```

---

## Setup Instructions

### Step 1: Create a New Xerte Project

1. Log into Xerte Online Toolkits
2. Create a new **Bootstrap** project (recommended) or **HTML5** project
3. Name it "SVEM Self-Assessment"

### Step 2: Upload the JavaScript File

**Option A: Use Xerte's File Upload Feature**
1. In your Xerte project, look for a way to upload/attach files
2. Upload `scoring-xerte.js` to your project's file storage
3. Note the path to the uploaded file

**Option B: Use Optional Properties**
1. Go to your project's Optional Properties
2. In the "Script" section, paste the entire contents of `scoring-xerte.js`
3. This loads the script globally for all pages

**Option C: External Hosting**
1. Upload `scoring-xerte.js` to your web server
2. Reference it via URL in the first page's Optional Properties

### Step 3: Load CSS Styles

You need to load two CSS files:

1. **xot_main.css** - Should already be available in Xerte (Cardiff University theme)
2. **custom.css** - Copy from `../svem-self-assessment/css/custom.css`

**To add custom.css:**

**Method 1: Project-level CSS (Recommended)**
1. Go to Project Properties → Optional Properties
2. In the "Stylesheet" section, paste the contents of `custom.css`
3. This applies the styles to all pages

**Method 2: Page-level CSS**
1. For each page, go to Optional Properties → Stylesheet
2. Paste the custom CSS

**Method 3: External Link**
1. Upload `custom.css` to your server
2. Add to Optional Properties: `<link rel="stylesheet" href="URL_TO_CUSTOM_CSS">`

### Step 4: Create Pages in Xerte

For each HTML file, create a corresponding page in Xerte:

#### Page 1: Title Page
- **Page Type**: Bootstrap (or HTML)
- **Content**: Copy the content from `page-01-title.html`
- **Optional Properties → Script**: If not loaded globally, add reference to `scoring-xerte.js`

#### Page 2: Instructions
- **Page Type**: Bootstrap (or HTML)
- **Content**: Copy from `page-02-instructions.html`

#### Page 3: Themes Overview
- **Page Type**: Bootstrap (or HTML)
- **Content**: Copy from `page-03-themes-overview.html`
- **Note**: This page has inline initialization script that calls `initThemesOverview()`

#### Page 4-6: Theme Pages
- **Page Type**: Bootstrap (or HTML)
- **Content**: Copy from respective theme HTML files
- **Note**: Each has inline script calling `initSVEMPage([sectionIds])`

#### Page 7: Summary (To be created)
- Create summary/report page based on requirements

### Step 5: Update Navigation Page Numbers

The navigation uses `parent.x_navigateToPage(parent.x_currentPageXML, parent.x_currentPage + N, true)`

You may need to adjust the `+ N` values based on your actual page order in Xerte:

**In page-03-themes-overview.html:**
```javascript
// Theme 1 card - adjust the page number offset
onclick="parent.x_navigateToPage(parent.x_currentPageXML, parent.x_currentPage + 1, true)"

// Theme 2 card
onclick="parent.x_navigateToPage(parent.x_currentPageXML, parent.x_currentPage + 2, true)"

// Theme 3 card
onclick="parent.x_navigateToPage(parent.x_currentPageXML, parent.x_currentPage + 3, true)"
```

Adjust these offsets to match your page structure.

---

## How the JavaScript Works

### Core Functions (in scoring-xerte.js)

1. **`initSVEMPage(sectionIds)`** - Initializes a theme page, loads saved data
2. **`saveScore(sectionId, score, btn)`** - Saves score to localStorage
3. **`saveNote(sectionId, note)`** - Saves evidence notes
4. **`updateSectionUI(sectionId, score, clickedBtn)`** - Updates UI after scoring
5. **`loadSavedData(sectionId)`** - Loads saved data from localStorage
6. **`toggleSection(sectionId, btn)`** - Expand/collapse accordions
7. **`showToast(message)`** - Shows save confirmation
8. **`initThemesOverview()`** - Updates progress on overview page

### Page Initialization Pattern

Each theme page includes this at the bottom:

```html
<script>
    (function() {
        setTimeout(function() {
            if (typeof initSVEMPage === 'function') {
                initSVEMPage(['section-id-1', 'section-id-2']);
            }
        }, 100);
    })();
</script>
```

This ensures the page loads data after Xerte finishes loading.

---

## LocalStorage Data Structure

Data is stored in the browser's localStorage with this schema:

```javascript
// Key format
`sv_${sectionId}`

// Value format (JSON)
{
  score: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
  note: "Evidence text here..."
}
```

### Section IDs Used:
- **Theme 1**: `roles`, `training`
- **Theme 2**: `reps-ssps`
- **Theme 3**: `mme`, `me`, `nss`, `pg`

---

## Xerte Navigation API

The navigation uses Xerte's built-in navigation function:

```javascript
parent.x_navigateToPage(parent.x_currentPageXML, targetPageNumber, true)
```

**Parameters:**
- `parent.x_currentPageXML` - Current page XML (always use this)
- `targetPageNumber` - The page number to navigate to
  - `parent.x_currentPage + 1` = Next page
  - `parent.x_currentPage - 1` = Previous page
  - Or use absolute page number (0-indexed)
- `true` - History flag (always use true for proper back button behavior)

---

## Alternative: Using Xerte Page Names

If you prefer to navigate by page name instead of numbers:

```javascript
// Navigate to a named page
parent.x_navigateToPage(parent.x_currentPageXML, parent.x_getPageID('page-name'), true)
```

You would need to:
1. Name your pages in Xerte (e.g., "theme-1", "theme-2")
2. Update navigation code to use page names

---

## Testing Checklist

After setup, test these features:

- [ ] Navigation works between all pages
- [ ] JavaScript loads correctly (check browser console for errors)
- [ ] CSS styles display properly
- [ ] Score buttons work and save to localStorage
- [ ] Evidence textareas save on change
- [ ] Toast notifications appear
- [ ] Accordions expand/collapse
- [ ] Progress tracking updates on overview page
- [ ] Data persists after navigating away and back
- [ ] Badge updates show correct scores

---

## Troubleshooting

### JavaScript Not Loading

**Symptom**: Buttons don't work, console shows "function not defined"

**Solutions**:
1. Check that `scoring-xerte.js` is properly loaded
2. Verify the script path is correct
3. Check browser console for loading errors
4. Try loading script globally in Optional Properties

### Navigation Not Working

**Symptom**: Clicking buttons doesn't navigate

**Solutions**:
1. Verify you're using `parent.x_navigateToPage()` not `window.location.href`
2. Check page numbers are correct (0-indexed in Xerte)
3. Ensure `parent` object is available (works in Xerte frame)

### Styles Not Applying

**Symptom**: Page looks unstyled

**Solutions**:
1. Check `custom.css` is loaded properly
2. Verify XOT main theme is selected in project settings
3. Check for CSS conflicts with Xerte's default styles
4. Use browser inspector to check if CSS is loaded

### Data Not Saving

**Symptom**: Selections don't persist

**Solutions**:
1. Check localStorage is enabled in browser
2. Verify `saveScore()` and `saveNote()` functions are defined
3. Check browser console for JavaScript errors
4. Confirm section IDs match between HTML and JavaScript

### Toast Not Showing

**Symptom**: No "Changes Saved" notification

**Solutions**:
1. Verify `<div id="toast">` is present in HTML
2. Check CSS for `#toast` and `.show` styles
3. Ensure `showToast()` function is defined

---

## Converting Remaining Pages

To create Theme 2, Theme 3, and Summary pages:

### Pattern for Theme Pages:

1. Copy content from original HTML (inside `<main>` tag only)
2. Remove `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` tags
3. Keep only the content portion
4. Update navigation to use `parent.x_navigateToPage()`
5. Add initialization script at bottom:
   ```html
   <script>
       (function() {
           setTimeout(function() {
               if (typeof initSVEMPage === 'function') {
                   initSVEMPage(['section-ids-here']);
               }
           }, 100);
       })();
   </script>
   ```
6. Include toast div: `<div id="toast">Changes Saved</div>`

---

## Support

For Xerte-specific issues:
- Check Xerte documentation: [xerte.org.uk](https://www.xerte.org.uk/)
- Cardiff University IT support

For SVEM assessment issues:
- Contact the Student Voice team

---

## Version Information

- **Created**: December 2024
- **Xerte Version**: Compatible with XOT 3.x+
- **Browser Requirements**: Modern browsers with localStorage support

---

**Last Updated**: 2024-12-16
