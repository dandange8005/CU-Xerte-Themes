# Changelog - SVEM Xerte Version

All notable changes to this project will be documented in this file.

## [Unreleased] - 2024-12-17

### Changed - Button Simplification (Complete)

**Phase 2: Replaced .btn-secondary with .btn-light**

#### CSS Changes
**Removed custom `.btn-secondary`** (17 lines removed):
- ✅ Removed `.btn-secondary` base styles (13 lines)
- ✅ Removed `.btn-secondary.btn-danger` (4 lines)

**Created standalone `.btn-danger`** (17 lines):
- ✅ New `.btn-danger` class for destructive actions
- ✅ White background with red text and border
- ✅ Pink background on hover

**Now using from xot_main.css:**
- ✅ `.btn-light` - Light gray button for secondary actions

#### HTML Changes

1. **page-02-instructions.html**
   - Import Data button: `class="btn btn-light"`
   - Reset Data button: `class="btn btn-danger"`
   - Modal Cancel button: `class="btn btn-light"`
   - Modal Confirm button: `class="btn btn-danger"`

2. **page-07-summary.html**
   - Print button: `class="btn btn-light"`
   - Download button: `class="btn btn-light"`
   - Back to Themes button: `class="btn btn-light"`
   - Continue Editing: `class="btn btn-primary"` (unchanged)

### Changed - Button Simplification (Option A)

#### CSS Changes
**Removed duplicate button classes from `custom.css`** (63 lines removed):
- ✅ Removed `.title-page__enter-btn` (lines 85-106) - 22 lines
- ✅ Removed `.instructions-page__cta-btn` (lines 190-209) - 20 lines
- ✅ Removed `.btn-primary` (lines 353-367) - 15 lines
- ✅ Removed `.btn` (lines 782-796) - 15 lines

**Kept specialized button classes:**
- ✅ `.toggle-btn` - For expand/collapse functionality
- ✅ `.score-btn` - For scoring interface with active states
- ✅ `.btn-secondary` - Custom light secondary button style
- ✅ `.btn-secondary.btn-danger` - For destructive actions

#### HTML Changes
**Updated all pages to use xot_main.css button classes:**

1. **page-01-title.html**
   - Changed: `class="title-page__enter-btn"`
   - To: `class="btn btn-primary btn-lg"`
   - Added inline styles for uppercase text and letter spacing
   - Updated navigation to use linkID pattern

2. **page-02-instructions.html**
   - Changed: `class="instructions-page__cta-btn"`
   - To: `class="btn btn-primary btn-lg"`
   - Updated modal buttons:
     - Cancel: `class="btn btn-secondary"`
     - Confirm: `class="btn btn-primary"` (with red background override)

3. **page-03-themes-overview.html**
   - Changed: `class="btn-primary"`
   - To: `class="btn btn-primary"`

4. **page-07-summary.html**
   - Changed all buttons:
     - Print button: `class="btn btn-secondary"`
     - Download button: `class="btn btn-secondary"`
     - Continue Editing: `class="btn btn-primary"`
     - Back to Themes: `class="btn btn-secondary"`

### Benefits
- **Reduced CSS**: 63 lines removed from custom.css
- **Consistency**: All buttons now follow xot_main.css theming
- **Maintainability**: Updates to xot_main.css automatically apply
- **CSS Variables**: Button colors now use theme variables (`--button-primary`)

### Notes
- xot_main.css `.btn-secondary` is gray (#6c757d), differs from custom light style
- No `.btn-danger` in xot_main.css - custom inline styles used for destructive actions
- Specialized buttons (`.toggle-btn`, `.score-btn`) remain custom for specific functionality

---

## Previous Updates

### [2024-12-17] - Page Update Detection Fix
- Added automatic visibility detection to themes overview and summary pages
- Pages now auto-refresh when navigating back to them
- Fixed issue where progress bars and reports weren't updating

### [2024-12-17] - Import Data Fix
- Fixed import function to handle both export formats
- Now supports summary page export format (with metadata)
- Auto-detects format and maps fields correctly

### [2024-12-17] - Reset Data Feature
- Added reset data modal with confirmation
- Added import/export data functionality
- Added modal CSS styling

### [2024-12-17] - Navigation Pattern Update
- Updated navigation to use linkID pattern (`[next]`, `[previous]`, `[first]`, `[last]`)
- More maintainable than page number offsets

### [2024-12-17] - Level Heading Fix
- Fixed empty level headings in Xerte by simplifying `<summary>` structure
- Removed nested divs, using inline spans instead

---

**Last Updated:** 2024-12-17
