# Xerte Implementation Troubleshooting Guide

## Issue: Empty Level Headings in Details Elements

### Problem Description
When copying theme pages to Xerte, the level headings appear as empty gray boxes with + icons, but no text is visible.

**Screenshot of Issue:**
- Level 1 shows correctly
- Levels 2-5 show as empty collapsible boxes

### Root Cause
The original HTML uses nested `<div>` elements inside `<summary>` tags:

```html
<!-- ❌ This doesn't work well in Xerte -->
<details class="l2">
    <summary>
        <div class="level-header">
            <span class="level-number">Level 2</span>
            <span class="level-title">Baseline Practice</span>
        </div>
    </summary>
    ...
</details>
```

**Why this fails in Xerte:**
1. Xerte's HTML parser may strip or modify nested div structures in summary elements
2. CSS styling for `.level-header` might not load correctly
3. The complex structure doesn't render reliably across Xerte's different page types

### Solution

Simplify the `<summary>` structure to use inline elements only:

```html
<!-- ✅ This works in Xerte -->
<details class="l2">
    <summary>
        <span class="level-number">LEVEL 2</span>
        <span style="margin-left: 1rem;">Baseline Practice</span>
    </summary>
    ...
</details>
```

**Key changes:**
1. Remove the `<div class="level-header">` wrapper
2. Put spans directly inside `<summary>`
3. Use inline styles for spacing (`margin-left: 1rem;`)
4. Use uppercase "LEVEL" for consistency

### Additional Xerte-Specific Fixes

#### 1. Add `return false;` to all onclick handlers

Prevents Xerte from navigating or reloading unexpectedly:

```html
<!-- ❌ Original -->
<button onclick="saveScore('roles', 1, this)">Set as Level 1</button>

<!-- ✅ Xerte-compatible -->
<button onclick="saveScore('roles', 1, this); return false;">Set as Level 1</button>
```

#### 2. Use HTML entities for special characters

```html
<!-- ❌ Original -->
<label>Evidence & Contextual Notes</label>

<!-- ✅ Xerte-compatible -->
<label>Evidence &amp; Contextual Notes</label>
```

#### 3. Update navigation to use linkID pattern

```html
<!-- ❌ Original (standalone HTML) -->
<button onclick="window.location.href='theme-2.html'">Next</button>

<!-- ✅ Xerte-compatible -->
<button onclick="x_navigateToPage(false, {type:'linkID', ID:'[next]'}); return false;">Next</button>
```

### Files Available

| File | Description |
|------|-------------|
| `theme-1-xerte.html` | **Use this for Xerte** - Fixed HTML with simplified structure |
| `../svem-self-assessment/theme-1.html` | Original standalone HTML (reference only) |

### How to Use the Fixed Version

1. **Open your Xerte project**

2. **Navigate to the Theme 1 page** (or create it as Plain Text/Bootstrap page type)

3. **Copy the HTML from `theme-1-xerte.html`**
   - Copy everything inside the file (it's already prepared for Xerte's page content area)

4. **Paste into Xerte's page content editor**

5. **In Optional Properties → Script**
   - Ensure `scoring-xerte.js` is loaded globally (see XERTE-IMPLEMENTATION-GUIDE.md)
   - Add initialization code:
   ```javascript
   if (typeof initSVEMPage === 'function') {
       initSVEMPage(['roles', 'training']);
   }
   ```

6. **Test the page**
   - All 5 levels should now have visible headings
   - Expand/collapse should work
   - Scoring buttons should work
   - Navigation should work

### Verification Checklist

- [ ] All 5 level headings are visible (not empty boxes)
- [ ] Clicking level headers expands/collapses content
- [ ] "Expand All" button works
- [ ] Scoring buttons activate and show toast notification
- [ ] Badge updates when scoring
- [ ] Evidence textareas save on change
- [ ] Navigation buttons work (Previous/Next)
- [ ] Browser console shows no JavaScript errors

### If Levels Are Still Not Showing

1. **Check CSS is loaded**
   - Open browser inspector (F12)
   - Look at the `<details>` elements
   - Verify CSS classes are applied

2. **Check for JavaScript errors**
   - Open browser console (F12)
   - Look for any red error messages

3. **Verify HTML structure**
   - Right-click → Inspect Element on a broken level heading
   - Check if the `<span>` elements are actually present in the DOM
   - If spans are missing, Xerte might be stripping them

4. **Fallback: Use even simpler structure**
   ```html
   <details class="l2">
       <summary>LEVEL 2 - Baseline Practice</summary>
       <div class="content-body">
           <!-- content -->
       </div>
   </details>
   ```

### Themes Overview / Summary Page Not Updating

**Problem:** After scoring sections in theme pages, the Themes Overview page doesn't show updated progress bars/status badges, or the Summary page doesn't display the latest scores.

**Cause:**
Xerte loads all pages into the DOM simultaneously, so inline JavaScript only executes once on initial page load, not when navigating back to the page.

**Solution:**
The updated `page-03-themes-overview.html` and `page-07-summary.html` files now include automatic visibility detection that refreshes data when you navigate back to these pages.

**How it works:**
1. ✅ Visibility check runs every 500ms to detect if page is displayed
2. ✅ Automatically refreshes when page becomes visible after being hidden
3. ✅ Listens to window focus and visibility change events
4. ✅ Only updates when visibility state changes (prevents excessive updates)

**If the issue persists:**
1. Clear browser cache and reload the Xerte project
2. Check browser console (F12) for JavaScript errors
3. Verify `initThemesOverview()` is available globally (loaded in Optional Properties → Script)
4. For Summary page, verify localStorage contains data with `sv_` prefix

**Manual refresh options:**
- **Themes Overview:** Refresh the browser window
- **Summary:** Navigate away and back to the summary page
- Check localStorage in browser DevTools: `localStorage` should show `sv_roles`, `sv_training`, etc.

**Debugging steps:**
```javascript
// Open browser console (F12) and run:
console.log(localStorage); // Should show sv_* keys
console.log(typeof initThemesOverview); // Should show "function"
console.log(typeof generateReport); // Should show "function"
```

---

### Import Data Not Working

**Problem:** When trying to import a JSON file downloaded from the summary page, the import fails or shows "Error: Invalid JSON file"

**Cause:**
There were two different export formats in the system:
1. **Summary Page Export** - Complex format with metadata and nested assessmentData
2. **Simple Export** - Direct key-value pairs

The import function was only handling the simple format.

**Solution:**
The `importData()` function has been updated to automatically detect and handle both formats:

**Format 1 - Summary Page Export:**
```json
{
  "metadata": {...},
  "assessmentData": {
    "roles": {"sectionName": "...", "score": 3, "evidence": "..."}
  }
}
```

**Format 2 - Simple Export:**
```json
{
  "roles": {"score": 3, "note": "..."},
  "training": {"score": 3, "note": "..."}
}
```

**What the fix does:**
- ✅ Detects which format the JSON file is in
- ✅ Extracts data from nested structures (assessmentData)
- ✅ Maps field names correctly (`evidence` → `note`)
- ✅ Shows import count in success message
- ✅ Logs detailed error information to console

**Testing the import:**
1. Download data from the Summary page
2. Go to Instructions page
3. Click "📂 Import Data"
4. Select the downloaded JSON file
5. Should see: "Data imported successfully! (X sections)"
6. Page will reload and data should be restored

**Debugging import issues:**
```javascript
// Open browser console (F12) before importing
// You'll see debug messages:
// - "Detected summary page export format" or "Detected simple export format"
// - Any warnings about data parsing
// - Error details if import fails
```

---

### Common Xerte HTML Gotchas

| Issue | Cause | Solution |
|-------|-------|----------|
| Empty headings | Nested divs in `<summary>` | Use inline elements only |
| Navigation not working | Using `window.location.href` | Use `x_navigateToPage()` |
| Buttons refresh page | Missing `return false;` | Add `return false;` to onclick |
| JavaScript not running | Functions not globally loaded | Load in Optional Properties → Script |
| CSS not applied | External stylesheet not loading | Add CSS to Optional Properties → Stylesheet |
| Pages not updating on navigation | Scripts only run on initial load | Use visibility detection (already implemented) |

### Need More Help?

1. Check the main implementation guide: `XERTE-IMPLEMENTATION-GUIDE.md`
2. Review the working example: `theme-1-xerte.html`
3. Test in a standalone HTML file first, then migrate to Xerte
4. Use browser dev tools to compare working vs. non-working structure

---

**Last Updated:** 2024-12-17
