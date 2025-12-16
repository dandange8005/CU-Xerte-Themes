# SVEM Self-Assessment - Xerte XOT Compatible Version

## Overview

This folder contains Xerte Online Toolkits (XOT) compatible versions of the SVEM Self-Assessment tool. The main differences from the standalone version are:

1. **Content-only HTML** - No full HTML document structure
2. **Xerte-compatible navigation** - Uses `x_navigateToPage()` API
3. **Centralized JavaScript** - All functions in one shared file
4. **Proper initialization** - Works with Xerte's page loading system

---

## 🎯 The Problem We Solved

Your original multi-page HTML project didn't work in Xerte XOT because:

- ❌ Full HTML documents conflict with Xerte's framework
- ❌ `window.location.href` navigation doesn't work in Xerte's multi-page setup
- ❌ Inline `<script>` tags don't execute reliably when pages load dynamically
- ❌ `window.onload` doesn't fire correctly in Xerte's context

### The Solution

- ✅ Content-only HTML that fits into Xerte's `#pageContents` area
- ✅ Xerte API navigation using `x_navigateToPage()`
- ✅ Shared `scoring-xerte.js` loaded globally
- ✅ Page-specific initialization scripts in Optional Properties

---

## 📁 Files in This Folder

### 📘 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | This file - project overview |
| **XERTE-IMPLEMENTATION-GUIDE.md** | Complete setup instructions for Xerte XOT |
| **CONVERSION-SUMMARY.md** | Detailed explanation of what was fixed and why |
| **PAGE-THEME-1.md** | Implementation guide for Theme 1 page |
| **PAGE-THEME-2.md** | Implementation guide for Theme 2 page |

### 💻 Code Files

| File | Purpose |
|------|---------|
| **scoring-xerte.js** | Shared JavaScript functions for all pages (load this globally) |

### 🚧 HTML Files (Legacy - Use .md guides instead)

| File | Status | Notes |
|------|--------|-------|
| page-01-title.html | ⚠️ Legacy | Use XERTE-IMPLEMENTATION-GUIDE.md instead |
| page-02-instructions.html | ⚠️ Legacy | Use XERTE-IMPLEMENTATION-GUIDE.md instead |
| page-03-themes-overview.html | ⚠️ Legacy | Use XERTE-IMPLEMENTATION-GUIDE.md instead |
| page-04-theme-1.html | ⚠️ Legacy | Use PAGE-THEME-1.md instead |

**Note:** The `.html` files were created earlier but the `.md` files are better structured for Xerte implementation. Use the `.md` guides which separate HTML, JavaScript, and CSS clearly.

---

## 🚀 Quick Start Guide

### Step 1: Load Global Files (Do Once)

1. **Load JavaScript Globally**
   - In Xerte: Project Properties → Optional Properties → Script
   - Paste entire contents of `scoring-xerte.js`

2. **Load CSS Globally**
   - In Xerte: Project Properties → Optional Properties → Stylesheet
   - Copy entire contents of `../svem-self-assessment/css/custom.css`
   - Paste into Optional Properties → Stylesheet

### Step 2: Create Pages (Follow the guides)

Create 7 pages in Xerte in this order:

| # | Page Name | Implementation Guide | Status |
|---|-----------|---------------------|--------|
| 0 | Title Page | XERTE-IMPLEMENTATION-GUIDE.md | ✅ Ready |
| 1 | Instructions | XERTE-IMPLEMENTATION-GUIDE.md | ✅ Ready |
| 2 | Themes Overview | XERTE-IMPLEMENTATION-GUIDE.md | ✅ Ready |
| 3 | Theme 1 | PAGE-THEME-1.md | ✅ Ready |
| 4 | Theme 2 | PAGE-THEME-2.md | ✅ Ready |
| 5 | Theme 3 | ⏳ TO BE CREATED | ⏳ Pending |
| 6 | Summary | ⏳ TO BE CREATED | ⏳ Pending |

### Step 3: Test Everything

- [ ] Navigation works between all pages
- [ ] JavaScript loads without errors (check console)
- [ ] Scoring buttons work and save data
- [ ] Evidence textareas save properly
- [ ] Toast notifications appear
- [ ] Progress tracking updates on overview page
- [ ] Data persists after page refresh

---

## 📋 Page Implementation Pattern

Each page follows this structure:

### 1. HTML Content
Copy from the guide and paste into Xerte's main content editor

### 2. JavaScript (Optional Properties → Script)
```javascript
// Initialize page with section IDs
if (typeof initSVEMPage === 'function') {
    initSVEMPage(['section-id-1', 'section-id-2']);
}
```

### 3. CSS
Already loaded globally - no page-specific CSS needed

---

## 🔑 Key Xerte API Functions Used

### Navigation
```javascript
// Navigate to next page
x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)

// Navigate to previous page
x_navigateToPage(x_currentPageXML, x_currentPage - 1, true)
```

### Scoring Functions (from scoring-xerte.js)
```javascript
// Save a score
saveScore('section-id', 3.5, buttonElement)

// Save evidence notes
saveNote('section-id', 'Evidence text')

// Load saved data on page load
initSVEMPage(['section-id-1', 'section-id-2'])

// Update progress on overview page
initThemesOverview()
```

---

## 📊 Data Storage

Data is saved in browser localStorage:

```javascript
// Storage format
localStorage.setItem('sv_roles', '{"score":3.5,"note":"Evidence here"}')
```

### Section IDs Used

- **Theme 1:** `roles`, `training`
- **Theme 2:** `reps-ssps`
- **Theme 3:** `mme`, `me`, `nss`, `pg`

---

## 🎨 Styling

All styles from `../svem-self-assessment/css/custom.css` should be loaded globally in your Xerte project's Optional Properties → Stylesheet.

Key CSS classes:
- `.theme-page-container` - Main theme page wrapper
- `.score-badge` - Level indicator badges
- `.score-btn` - Scoring buttons
- `.score-btn.active` - Selected score button
- `.evidence-box` - Evidence textarea container
- `.theme-card` - Theme cards on overview page
- `.status-badge` - Status indicators
- `#toast` - Save notification

---

## 🐛 Troubleshooting

### JavaScript Errors

**Problem:** Console shows "function is not defined"

**Solution:**
1. Check `scoring-xerte.js` is loaded in Optional Properties → Script
2. Look for syntax errors
3. Ensure functions are globally accessible (not in restrictive scope)

### Navigation Not Working

**Problem:** Buttons don't navigate

**Solution:**
1. Use `x_navigateToPage()` not `window.location.href`
2. Check page numbers are correct (0-indexed)
3. Verify no JavaScript errors in console

### Data Not Saving

**Problem:** Scores/notes don't persist

**Solution:**
1. Check localStorage is enabled (not in private mode)
2. Verify section IDs match between HTML and JavaScript
3. Check browser console for errors

### Styles Missing

**Problem:** Page looks unstyled

**Solution:**
1. Verify `custom.css` is loaded in Optional Properties
2. Check for CSS syntax errors
3. Use browser inspector to debug styles

---

## ⏳ Still To Do

### Theme 3 Page
Create Theme 3 following the same pattern as Theme 1 and Theme 2.

**Section IDs:** `['mme', 'me', 'nss', 'pg']`
**Subsections:**
1. Mid-Module Enhancement (MME)
2. End of Module Enhancement (ME)
3. National Student Survey (NSS)
4. Cardiff University Postgraduate Taught Survey (CUPTS) & PRES

**JavaScript Initialization:**
```javascript
if (typeof initSVEMPage === 'function') {
    initSVEMPage(['mme', 'me', 'nss', 'pg']);
}
```

### Summary Page
Create a summary/report page that:
- Aggregates all localStorage data
- Displays scores for all sections
- Shows evidence for each section
- Calculates overall completion
- Provides print functionality
- Offers data export options

---

## 📚 Additional Resources

### Reference the Original
- Original project: `../svem-self-assessment/`
- Original Theme 3: `../svem-self-assessment/theme-3.html`
- Original Summary: `../svem-self-assessment/summary.html`
- Original CSS: `../svem-self-assessment/css/custom.css`

### Xerte Documentation
- [Xerte Online Toolkits](https://www.xerte.org.uk/)
- [Xerte Community](https://www.xerte.org.uk/index.php?option=com_kunena)

---

## ✅ Implementation Checklist

### Before You Start
- [ ] Read XERTE-IMPLEMENTATION-GUIDE.md
- [ ] Read CONVERSION-SUMMARY.md
- [ ] Have access to Xerte XOT installation
- [ ] Have original `custom.css` file ready

### Setup Phase
- [ ] Create new Xerte project
- [ ] Load `scoring-xerte.js` globally (Optional Properties → Script)
- [ ] Load `custom.css` globally (Optional Properties → Stylesheet)
- [ ] Verify no syntax errors

### Page Creation
- [ ] Create Title Page (use XERTE-IMPLEMENTATION-GUIDE.md)
- [ ] Create Instructions Page (use XERTE-IMPLEMENTATION-GUIDE.md)
- [ ] Create Themes Overview Page (use XERTE-IMPLEMENTATION-GUIDE.md)
- [ ] Create Theme 1 Page (use PAGE-THEME-1.md)
- [ ] Create Theme 2 Page (use PAGE-THEME-2.md)
- [ ] Create Theme 3 Page (to be created)
- [ ] Create Summary Page (to be created)

### Testing Phase
- [ ] Test navigation between all pages
- [ ] Test scoring functionality on each theme
- [ ] Test evidence textarea saving
- [ ] Test data persistence (score, reload, check)
- [ ] Test progress tracking on overview
- [ ] Test in multiple browsers
- [ ] Test on mobile devices

### Deployment
- [ ] Final review of all pages
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Create user documentation

---

## 👥 Support

For issues specific to:
- **Xerte XOT:** Check Xerte documentation or community forum
- **SVEM Assessment:** Contact Student Voice team at Cardiff University
- **This Implementation:** Review the documentation files in this folder

---

## 📝 Version History

- **v1.0** (2024-12-16) - Initial Xerte-compatible conversion
  - Created centralized JavaScript (scoring-xerte.js)
  - Converted pages 1-4 to Xerte format
  - Updated navigation to use Xerte API
  - Fixed script initialization issues
  - Created comprehensive documentation

---

## 📄 License

This project is for Cardiff University's Student Voice Enhancement Model.

---

**Last Updated:** 2024-12-16
**Status:** In Progress - Theme 3 and Summary pages pending
**Maintainer:** Cardiff University Student Voice Team
