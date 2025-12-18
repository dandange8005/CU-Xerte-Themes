# Converting Standalone Web Applications to Xerte XOT

A comprehensive guide for converting standalone HTML/CSS/JavaScript projects into Xerte Online Toolkits (XOT) multi-page projects, with or without applying the Cardiff University theme.

## Table of Contents

- [Overview](#overview)
- [Understanding Xerte's Architecture](#understanding-xertes-architecture)
- [Pre-Conversion Checklist](#pre-conversion-checklist)
- [Conversion Process](#conversion-process)
- [HTML Structure Conversion](#html-structure-conversion)
- [JavaScript Conversion](#javascript-conversion)
- [CSS Implementation](#css-implementation)
- [Navigation Implementation](#navigation-implementation)
- [Data Persistence](#data-persistence)
- [Cardiff University Theme Integration](#cardiff-university-theme-integration)
- [Testing & Validation](#testing--validation)
- [Common Issues & Solutions](#common-issues--solutions)
- [Best Practices](#best-practices)

---

## Overview

Converting a standalone web application to Xerte XOT requires understanding how Xerte's single-page application (SPA) framework differs from traditional multi-page websites. This guide provides a systematic approach based on real-world conversion experience.

### Key Differences

| Aspect | Standalone Web App | Xerte XOT |
|--------|-------------------|-----------|
| **Structure** | Full HTML documents | Content-only HTML fragments |
| **Navigation** | `window.location.href` | `x_navigateToPage()` API |
| **Page Loading** | Browser page loads | Dynamic content injection |
| **JavaScript** | Per-page scripts | Global + page-specific initialization |
| **CSS** | Multiple stylesheets | Centralized + optional page-specific |
| **Scope** | Each page isolated | All pages loaded simultaneously |

---

## Understanding Xerte's Architecture

### DOM Structure

Each Xerte page has three main areas accessible via Optional Properties:

1. **`#pageContents`** - Your HTML content (main content editor)
2. **`<script id="x_pageScript">`** - Page-specific JavaScript (Optional Properties → Script)
3. **`<style id="x_pageCSS">`** - Page-specific CSS (Optional Properties → Stylesheet)

### Page Loading Behavior

**Critical Understanding:**
- Xerte loads ALL pages into the DOM simultaneously
- Pages are hidden/shown via CSS `display` property
- Inline `<script>` tags may not execute reliably
- `window.onload` doesn't fire when navigating between pages
- Scripts must account for Xerte's framework loading time

---

## Pre-Conversion Checklist

Before starting conversion:

- [ ] **Audit HTML Structure** - Identify full HTML documents vs. content fragments
- [ ] **Map Navigation Flow** - Document all links and navigation paths
- [ ] **Identify JavaScript Dependencies** - List all functions and their dependencies
- [ ] **Review CSS Architecture** - Understand stylesheet structure and dependencies
- [ ] **Document Data Flow** - Identify form submissions, AJAX calls, localStorage usage
- [ ] **Check External Resources** - List CDN links, external scripts, fonts
- [ ] **Test Original Application** - Ensure everything works before conversion
- [ ] **Create Backup** - Make a complete copy of original files

---

## Conversion Process

### Step-by-Step Workflow

#### 1. Prepare Global Assets

**JavaScript:**
- Consolidate shared functions into a single file (e.g., `main.js`)
- Remove page-specific initialization code
- Create initialization functions that can be called per-page

**CSS:**
- Combine all stylesheets or keep modular with imports
- Remove page-specific `<link>` tags from HTML
- Prepare for global loading in Xerte

#### 2. Create Xerte Project Structure

1. Create new Xerte XOT project
2. Choose appropriate page type (Bootstrap recommended for Cardiff University projects)
3. Plan page hierarchy matching original site structure

#### 3. Load Global Assets

**Load JavaScript Globally:**
```
Project Properties → Optional Properties → Script
Paste entire JavaScript code or link to external file
```

**Load CSS Globally:**
```
Project Properties → Optional Properties → Stylesheet
Paste entire CSS code or link to external stylesheet
```

**OR use external links:**
```html
<script src="https://your-server.com/path/to/main.js"></script>
<link rel="stylesheet" href="https://your-server.com/path/to/styles.css">
```

#### 4. Convert Each Page

For each HTML page:
1. **Extract content** - Remove `<html>`, `<head>`, `<body>` tags
2. **Clean HTML** - Keep only content markup
3. **Update navigation** - Replace with Xerte navigation API
4. **Add initialization** - Create page-specific init script
5. **Test** - Preview and check browser console

---

## HTML Structure Conversion

### Before Conversion (Standalone)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main class="content">
        <h1>Page Heading</h1>
        <p>Content here...</p>
        <button onclick="window.location.href='page2.html'">Next</button>
    </main>

    <script src="main.js"></script>
    <script>
        window.onload = function() {
            initializePage();
        };
    </script>
</body>
</html>
```

### After Conversion (Xerte)

**In Xerte Content Editor:**
```html
<main class="content">
    <h1>Page Heading</h1>
    <p>Content here...</p>
    <button onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">
        Next
    </button>
</main>
```

**In Optional Properties → Script:**
```javascript
// Initialize page after Xerte loads
if (typeof initializePage === 'function') {
    initializePage();
}
```

### Key Conversion Rules

1. **Remove Document Structure**
   - ❌ Remove: `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
   - ✅ Keep: Only content markup

2. **Simplify Nested Structures**
   - ❌ Don't use: Nested `<div>` in `<summary>` elements
   - ✅ Use: Inline elements (`<span>`) in `<summary>`

3. **Escape Special Characters**
   - ❌ Don't use: `&` directly
   - ✅ Use: `&amp;`

4. **Add Return False**
   - ❌ Don't use: `onclick="doSomething()"`
   - ✅ Use: `onclick="doSomething(); return false;"`

---

## JavaScript Conversion

### Centralize Shared Code

**Create a main JavaScript file with all shared functions:**

```javascript
// main.js - Global JavaScript for Xerte project

// Example: Shared utility functions
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        showToast('Data saved successfully');
        return true;
    } catch (e) {
        console.error('Save failed:', e);
        showToast('Failed to save data');
        return false;
    }
}

function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Load failed:', e);
        return null;
    }
}

// Page initialization function
function initPage(config) {
    console.log('Initializing page with config:', config);
    // Your initialization logic here
}
```

### Page-Specific Initialization

**Pattern for page initialization in Optional Properties → Script:**

```javascript
// Check if global function exists (defensive programming)
if (typeof initPage === 'function') {
    // Call with page-specific configuration
    initPage({
        pageId: 'page1',
        sections: ['section1', 'section2'],
        features: ['autosave', 'validation']
    });
}
```

### Handling Xerte's Loading Timing

**If initialization timing is critical, use setTimeout:**

```javascript
// IIFE with setTimeout to ensure Xerte loads first
(function() {
    setTimeout(function() {
        if (typeof initPage === 'function') {
            initPage({ pageId: 'page1' });
        }
    }, 100); // 100ms delay allows Xerte framework to load
})();
```

### Common Conversion Patterns

**Before (Standalone):**
```javascript
window.onload = function() {
    document.getElementById('myForm').addEventListener('submit', handleSubmit);
    loadSavedData();
};
```

**After (Xerte):**
```javascript
// In global JS: Define functions
function initMyPage() {
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    loadSavedData();
}

function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission
}

function loadSavedData() {
    // Load data logic
}

// In page-specific script:
if (typeof initMyPage === 'function') {
    initMyPage();
}
```

---

## CSS Implementation

### Three-Level CSS Architecture

#### 1. Project-Level CSS (Recommended for shared styles)

Load in **Project Properties → Optional Properties → Stylesheet:**

```css
/* Project-wide styles */
:root {
    --primary-color: #d4374a;
    --secondary-color: #008458;
    --text-color: #333;
    --spacing: 1rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    background: var(--primary-color);
    color: white;
    cursor: pointer;
    transition: background 0.3s;
}

.btn:hover {
    background: #b02f3d;
}

/* Toast notification */
#toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #333;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 9999;
}

#toast.show {
    opacity: 1;
}
```

#### 2. External CSS (For large stylesheets)

**Load in Optional Properties:**
```html
<link rel="stylesheet" href="https://your-server.com/path/to/styles.css">
```

#### 3. Page-Level CSS (For page-specific styles)

**In page's Optional Properties → Stylesheet:**
```css
/* Page-specific overrides */
.content {
    max-width: 800px;
    margin: 0 auto;
}

.custom-component {
    /* Styles only for this page */
}
```

---

## Navigation Implementation

### Xerte Navigation API

Replace all `window.location.href` with Xerte's navigation functions.

### Method 1: Sequential Navigation (Recommended)

**Best for: Previous/Next buttons, linear navigation**

```javascript
// Navigate to next page
x_navigateToPage(false, {type:'linkID', ID:'[next]'})

// Navigate to previous page
x_navigateToPage(false, {type:'linkID', ID:'[previous]'})

// Navigate to first/last page
x_navigateToPage(false, {type:'linkID', ID:'[first]'})
x_navigateToPage(false, {type:'linkID', ID:'[last]'})
```

**HTML Examples:**
```html
<!-- Previous/Next Buttons -->
<div class="navigation-buttons">
    <button onclick="x_navigateToPage(false, {type:'linkID', ID:'[previous]'}); return false;">
        ← Previous
    </button>
    <button onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">
        Next →
    </button>
</div>

<!-- Back to Start -->
<a href="#" onclick="x_navigateToPage(false, {type:'linkID', ID:'[first]'}); return false;">
    ← Back to Home
</a>

<!-- Jump to End -->
<button onclick="x_navigateToPage(false, {type:'linkID', ID:'[last]'}); return false;">
    View Summary →
</button>
```

### Method 2: Direct Page IDs

**Best for: Jumping to specific pages, navigation menus**

```html
<!-- Direct links using page IDs -->
<p><a href="#" onclick="x_navigateToPage(false,{type:'linkID',ID:'PG1663761049119'}); return false;">
    Go to Introduction
</a></p>

<p><a href="#" onclick="x_navigateToPage(false,{type:'linkID',ID:'PG1765898999143'}); return false;">
    Go to Overview
</a></p>

<p><a href="#" onclick="x_navigateToPage(false,{type:'linkID',ID:'PG1765751366809'}); return false;">
    Go to Theme 1
</a></p>
```

**Finding Page IDs:**
1. In Xerte editor, select a page
2. Look at the page properties
3. Copy the page ID (format: `PGXXXXXXXXXX`)

### Method 3: Relative Page Navigation

**Best for: Theme cards, specific page offsets**

```javascript
// Navigate to specific page offset from current
x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)
x_navigateToPage(x_currentPageXML, x_currentPage - 1, true)
x_navigateToPage(x_currentPageXML, x_currentPage + 3, true)
```

**HTML Example:**
```html
<!-- Theme cards that jump to specific offsets -->
<div class="theme-card"
     onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)"
     style="cursor: pointer;">
    <h3>Theme 1</h3>
    <p>Click to start this theme</p>
</div>
```

### Navigation Best Practices

1. **Always add `return false;`** to prevent page reload
2. **Use Method 1** for sequential navigation (more maintainable)
3. **Use Method 2** for complex navigation menus
4. **Use Method 3** when jumping from overview to specific pages
5. **Test all navigation paths** after conversion

---

## Data Persistence

### LocalStorage Best Practices

When converting applications that save data:

**1. Use Consistent Naming Convention**
```javascript
// Prefix keys to avoid conflicts
const APP_PREFIX = 'myapp_';

function saveData(key, value) {
    localStorage.setItem(APP_PREFIX + key, JSON.stringify(value));
}

function loadData(key) {
    const data = localStorage.getItem(APP_PREFIX + key);
    return data ? JSON.parse(data) : null;
}
```

**2. Handle Errors Gracefully**
```javascript
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Storage quota exceeded. Please clear some data.');
        }
        console.error('Save failed:', e);
        return false;
    }
}
```

**3. Provide Data Export/Import**
```javascript
// Export all data
function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(APP_PREFIX)) {
            data[key] = JSON.parse(localStorage.getItem(key));
        }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)],
                          {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// Import data
function importData(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            Object.keys(data).forEach(key => {
                localStorage.setItem(key, JSON.stringify(data[key]));
            });
            alert('Data imported successfully!');
            location.reload();
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    };
    reader.readAsText(file);
}
```

**4. Reset Functionality**
```javascript
function resetAllData() {
    if (confirm('This will delete all your data. Are you sure?')) {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(APP_PREFIX)) {
                keys.push(key);
            }
        }
        keys.forEach(key => localStorage.removeItem(key));
        alert('All data has been reset.');
        location.reload();
    }
}
```

---

## Cardiff University Theme Integration

### Using CU XOT Theme

Cardiff University projects typically use the official CU Xerte theme:

**Theme URL:**
```
https://dandange8005.github.io/CU-Xerte-Themes/css/xot_main.min.css
```

### Loading the CU Theme

**In Project Properties → Optional Properties → Stylesheet:**
```html
<link rel="stylesheet" href="https://dandange8005.github.io/CU-Xerte-Themes/css/xot_main.min.css">
```

### CU Theme Components

The CU theme provides pre-built components:

#### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-danger">Danger Button</button>
```

#### Cards
```html
<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-body">
        <p>Card content here...</p>
    </div>
</div>
```

#### Callouts
```html
<div class="callout callout-info">
    <p>Important information here</p>
</div>

<div class="callout callout-warning">
    <p>Warning message here</p>
</div>
```

#### Grid System
```html
<div class="row">
    <div class="col-md-6">Column 1</div>
    <div class="col-md-6">Column 2</div>
</div>
```

### Customizing CU Theme

**Add custom CSS after loading CU theme:**

```css
/* Custom overrides - add in Optional Properties after CU theme link */

/* Custom colors using CSS variables */
:root {
    --custom-accent: #f8d349;
    --custom-bg: #f5f5f5;
}

/* Override button styles */
.btn-custom {
    background: var(--custom-accent);
    color: #333;
}

/* Custom component */
.progress-card {
    padding: 1.5rem;
    border-left: 4px solid var(--clr-accent);
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

---

## Testing & Validation

### Pre-Deployment Checklist

#### Functional Testing
- [ ] All navigation links work correctly
- [ ] Previous/Next buttons navigate properly
- [ ] JavaScript functions execute without errors
- [ ] Data saves and loads correctly
- [ ] Forms submit and validate properly
- [ ] All interactive elements respond

#### Visual Testing
- [ ] Styles load correctly on all pages
- [ ] Layout is responsive (test on mobile)
- [ ] Buttons and links are clearly visible
- [ ] Colors match brand guidelines
- [ ] Images and media load properly

#### Browser Testing
- [ ] Test in Chrome/Edge
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test on mobile devices
- [ ] Test in private/incognito mode

#### Console Checks
```javascript
// Open browser console (F12) and check for:
// 1. No JavaScript errors
console.log('No errors should appear above');

// 2. Global functions are defined
console.log(typeof myGlobalFunction); // Should show 'function'

// 3. LocalStorage is accessible
console.log(localStorage); // Should show storage object

// 4. Xerte variables are available
console.log(typeof x_navigateToPage); // Should show 'function'
console.log(x_currentPage); // Should show current page number
```

#### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] Color contrast sufficient
- [ ] Screen reader compatible

---

## Common Issues & Solutions

### Issue 1: JavaScript Functions Not Found

**Problem:** Console shows "function is not defined"

**Causes:**
- Global JS not loaded
- Syntax errors in global JS
- Function scope issues

**Solutions:**
1. Verify JS is in Project Properties → Optional Properties → Script
2. Check console for syntax errors (missing brackets, semicolons)
3. Ensure functions are globally scoped (not in restrictive IIFE)
4. Clear browser cache and reload

**Test:**
```javascript
// In browser console:
console.log(typeof myFunction); // Should show 'function'
```

---

### Issue 2: Navigation Not Working

**Problem:** Clicking navigation buttons does nothing or refreshes page

**Causes:**
- Missing `return false;`
- Using `window.location.href`
- Incorrect page IDs

**Solutions:**
```html
<!-- ❌ Wrong -->
<button onclick="goToNextPage()">Next</button>

<!-- ✅ Correct -->
<button onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">
    Next
</button>
```

---

### Issue 3: Styles Not Applied

**Problem:** Page appears unstyled or partially styled

**Causes:**
- CSS not loaded globally
- CSS syntax errors
- Xerte's default styles overriding

**Solutions:**
1. Verify CSS in Optional Properties → Stylesheet
2. Check for CSS errors (missing semicolons, brackets)
3. Use browser inspector (F12) to see which styles are applied
4. Increase specificity or use `!important` for critical styles

```css
/* If CU theme styles conflict: */
.my-custom-element {
    color: red !important; /* Override CU theme */
}
```

---

### Issue 4: Data Not Persisting

**Problem:** Saved data disappears on page refresh

**Causes:**
- Private/incognito mode
- localStorage disabled
- Incorrect key names
- JSON parse errors

**Solutions:**
1. Check browser settings allow localStorage
2. Verify keys match between save/load
3. Add error handling

```javascript
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log('Saved:', key, value);
        return true;
    } catch (e) {
        console.error('Save failed:', e);
        alert('Unable to save data. Check browser settings.');
        return false;
    }
}
```

---

### Issue 5: Page Content Not Updating

**Problem:** After navigating back to a page, it shows old data

**Cause:** Xerte loads all pages once; dynamic updates need refresh logic

**Solution:** Use visibility detection

```javascript
// Auto-refresh when page becomes visible
function initPageWithRefresh() {
    let lastVisibility = document.hidden;

    // Initial load
    loadPageData();

    // Check visibility every 500ms
    setInterval(function() {
        const currentVisibility = document.hidden;

        // If page just became visible
        if (lastVisibility && !currentVisibility) {
            console.log('Page visible, refreshing data');
            loadPageData();
        }

        lastVisibility = currentVisibility;
    }, 500);

    // Also listen to visibility events
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            loadPageData();
        }
    });
}

function loadPageData() {
    // Reload your data here
    console.log('Loading page data...');
}
```

---

### Issue 6: Empty `<details>` Headings

**Problem:** Collapsible sections show empty boxes

**Cause:** Xerte's parser doesn't handle nested divs in `<summary>` well

**Solution:** Use inline elements only

```html
<!-- ❌ Wrong -->
<details>
    <summary>
        <div class="header">
            <span>Level 1</span>
        </div>
    </summary>
    <p>Content...</p>
</details>

<!-- ✅ Correct -->
<details>
    <summary>
        <span class="level-number">LEVEL 1</span>
        <span style="margin-left: 1rem;">Description</span>
    </summary>
    <p>Content...</p>
</details>
```

---

### Issue 7: Special Characters Breaking

**Problem:** Ampersands, quotes, or other characters display incorrectly

**Solution:** Use HTML entities

```html
<!-- ❌ Wrong -->
<label>Evidence & Notes</label>
<p>"Important" information</p>
<p>Cost < £100</p>

<!-- ✅ Correct -->
<label>Evidence &amp; Notes</label>
<p>&quot;Important&quot; information</p>
<p>Cost &lt; &pound;100</p>
```

---

## Best Practices

### 1. Code Organization

**Structure your project logically:**

```
Xerte Project
├── Project Properties
│   └── Optional Properties
│       ├── Script: main.js (all shared functions)
│       └── Stylesheet: styles.css (all shared styles)
│
├── Page 1: Title
│   ├── Content: HTML only
│   └── Optional Properties → Script: (minimal initialization)
│
├── Page 2: Instructions
│   ├── Content: HTML only
│   └── Optional Properties → Script: (minimal initialization)
│
└── Page 3-N: Content pages
    ├── Content: HTML only
    └── Optional Properties → Script: (page-specific initialization)
```

### 2. Defensive Programming

Always check if functions/elements exist before using:

```javascript
// Check function exists
if (typeof myFunction === 'function') {
    myFunction();
}

// Check element exists
const element = document.getElementById('myElement');
if (element) {
    element.addEventListener('click', handleClick);
}

// Check localStorage available
if (typeof(Storage) !== "undefined") {
    localStorage.setItem('key', 'value');
} else {
    console.warn('LocalStorage not available');
}
```

### 3. Consistent Naming

Use clear, consistent naming conventions:

```javascript
// Function names: camelCase, descriptive verbs
function saveUserData() {}
function loadThemeProgress() {}
function calculateScore() {}

// Constants: UPPER_SNAKE_CASE
const APP_PREFIX = 'myapp_';
const MAX_SCORE = 100;
const DEFAULT_THEME = 'light';

// CSS classes: kebab-case, BEM methodology
.theme-card {}
.theme-card__header {}
.theme-card__title {}
.theme-card--active {}
```

### 4. Error Handling

Always handle errors gracefully:

```javascript
function processData(data) {
    try {
        // Process data
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        console.error('Data processing error:', error);
        // Show user-friendly message
        alert('Unable to process data. Please try again.');
        return null;
    }
}
```

### 5. Documentation

Document your code:

```javascript
/**
 * Initialize assessment page with given section IDs
 * @param {Array<string>} sectionIds - Array of section IDs to initialize
 * @returns {boolean} Success status
 */
function initAssessmentPage(sectionIds) {
    if (!Array.isArray(sectionIds)) {
        console.error('sectionIds must be an array');
        return false;
    }

    sectionIds.forEach(id => {
        loadSectionData(id);
        attachSectionListeners(id);
    });

    return true;
}
```

### 6. Performance Optimization

Minimize DOM queries:

```javascript
// ❌ Poor performance - queries DOM multiple times
function updateScores() {
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;
    document.getElementById('score3').textContent = score3;
}

// ✅ Better - cache DOM references
const scoreElements = {
    score1: document.getElementById('score1'),
    score2: document.getElementById('score2'),
    score3: document.getElementById('score3')
};

function updateScores() {
    scoreElements.score1.textContent = score1;
    scoreElements.score2.textContent = score2;
    scoreElements.score3.textContent = score3;
}
```

### 7. Mobile-First Design

Ensure responsive design:

```css
/* Mobile-first approach */
.container {
    width: 100%;
    padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1200px) {
    .container {
        width: 1140px;
    }
}
```

### 8. Version Control

Track changes with comments:

```javascript
// Version 1.0 - Initial implementation
// Version 1.1 - Added error handling (2024-12-18)
// Version 1.2 - Improved performance (2024-12-19)

const APP_VERSION = '1.2';
console.log('App version:', APP_VERSION);
```

---

## Summary Checklist

Use this checklist for every conversion:

### Planning Phase
- [ ] Analyze original application structure
- [ ] Identify shared vs. page-specific code
- [ ] Map navigation flow
- [ ] Plan data persistence strategy
- [ ] Create backup of original files

### Setup Phase
- [ ] Create Xerte project
- [ ] Choose appropriate page types
- [ ] Load global JavaScript
- [ ] Load global CSS
- [ ] Verify no syntax errors in console

### Conversion Phase
- [ ] Convert HTML (remove document structure)
- [ ] Update navigation to use Xerte API
- [ ] Add `return false;` to onclick handlers
- [ ] Escape special characters
- [ ] Simplify nested structures
- [ ] Create page initialization scripts

### Testing Phase
- [ ] Test all navigation paths
- [ ] Verify JavaScript functions work
- [ ] Check data persistence
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify styles load correctly
- [ ] Check console for errors

### Deployment Phase
- [ ] Final review of all pages
- [ ] User acceptance testing
- [ ] Create user documentation
- [ ] Deploy to production

---

## Additional Resources

### Xerte Documentation
- [Xerte Online Toolkits](https://www.xerte.org.uk/)
- [Xerte Community Forum](https://www.xerte.org.uk/index.php?option=com_kunena)

### Cardiff University Resources
- [CU Xerte Theme Repository](https://github.com/dandange8005/CU-Xerte-Themes)
- CU Theme Demo: `https://dandange8005.github.io/CU-Xerte-Themes/css/xot_main.min.css`

### Web Standards
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Support

For questions or issues:
- **Xerte XOT:** Check Xerte documentation or community forum
- **CU Theme:** Raise issue on GitHub repository
- **General Web Development:** MDN Web Docs, Stack Overflow

---

**Document Version:** 2.0
**Last Updated:** 2024-12-18
**Based on:** SVEM Self-Assessment conversion project
**Maintained by:** Cardiff University Learning Technology Team
