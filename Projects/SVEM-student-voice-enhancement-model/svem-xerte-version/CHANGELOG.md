# Changelog - SVEM Xerte Version

All notable changes to this project will be documented in this file.

## [1.4.0] - 2024-12-19

### Changed - Code Optimization & Refactoring

**Implemented high-priority optimizations** from `CODE_OPTIMIZATION_RECOMMENDATIONS.md`:

#### 1. Configuration Constants Extraction
**Added centralized `CONFIG` object** to both `scoring-xerte.js` and `page-07-summary.html`:
- ✅ `STORAGE_PREFIX`: 'sv_' - localStorage key prefix
- ✅ `THEMES_OVERVIEW_PAGE_ID`: 'PG1765898999143' - navigation target
- ✅ `TOAST_DURATION`: 2000ms - notification display time
- ✅ `NAVIGATION_DELAY`: 500ms - delay before page navigation
- ✅ `RELOAD_DELAY`: 1500ms - delay before page reload
- ✅ `VISIBILITY_CHECK_INTERVAL`: 500ms - page visibility polling
- ✅ `CHART_INIT_RETRY`: 100ms - Chart.js initialization retry

**Benefits:**
- Single source of truth for all configuration values
- Easy to update timeouts and settings across entire codebase
- Improved code readability and maintainability
- Eliminated magic numbers and hard-coded strings

#### 2. LocalStorage Utility Functions
**Created reusable localStorage utilities** (`scoring-xerte.js` and `page-07-summary.html`):

**New Functions:**
- ✅ `getSectionData(sectionId)` - Read with error handling, returns default `{score: 0, note: ''}`
- ✅ `setSectionData(sectionId, data)` - Write with error handling, returns success boolean
- ✅ `getAllSectionKeys()` - Get all sv_ prefixed keys from localStorage

**Refactored Functions (10+ functions updated):**
- ✅ `saveScore()` - Now uses getSectionData/setSectionData with error handling
- ✅ `saveNote()` - Now uses getSectionData/setSectionData with error handling
- ✅ `loadSavedData()` - Uses getSectionData, extracted `findScoreButton()` helper
- ✅ `calculateThemeProgress()` - Uses getSectionData
- ✅ `confirmReset()` - Uses getAllSectionKeys, cleaner implementation
- ✅ `downloadJSON()` - Uses getAllSectionKeys
- ✅ `importData()` - Split into modular functions:
  - `normalizeImportData()` - Handle different export formats
  - `importSections()` - Import to localStorage with setSectionData
  - `processImportData()` - Main processing with try-catch-finally
- ✅ `showToast()` - Uses CONFIG.TOAST_DURATION
- ✅ Summary page functions - All localStorage calls updated

**Benefits:**
- **~30 lines of code eliminated** through DRY principle
- Consistent error handling across all localStorage operations
- Better user feedback when saves fail
- More testable and maintainable code
- Reduced risk of localStorage quota errors

#### 3. Navigation Consolidation
**Created single navigation function** (`scoring-xerte.js`):
- ✅ `navigateToThemesOverview(delay = 0)` - Unified navigation with optional delay

**Refactored Navigation Functions:**
- ✅ `saveAndContinue()` - Uses navigateToThemesOverview(CONFIG.NAVIGATION_DELAY)
- ✅ `backToMenu()` - Uses navigateToThemesOverview()

**Benefits:**
- **~10 lines eliminated** through consolidation
- Single source of truth for navigation logic
- Easy to update navigation target (uses CONFIG.THEMES_OVERVIEW_PAGE_ID)
- Consistent delay handling

### Files Modified
- `scoring-xerte.js` - Major refactoring with CONFIG, utilities, and navigation
- `page-07-summary.html` - Added CONFIG and getSectionData for self-contained operation

### Code Quality Improvements
**Overall Impact:**
- **~85 lines of code eliminated** through refactoring
- **Improved error handling** - All localStorage operations now wrapped in try-catch
- **Better separation of concerns** - Import function split into 3 focused helpers
- **No breaking changes** - All function signatures remain the same
- **Backward compatible** - Works with existing localStorage data
- **More maintainable** - Configuration centralized, utilities reusable

### Technical Notes
- Summary page now has self-contained CONFIG and utilities to work in Xerte's isolated page environment
- All magic numbers replaced with named CONFIG constants
- Error logging added for debugging localStorage issues
- Import function now handles file read errors with proper user feedback

---

## [1.3.0] - 2024-12-18

### Added - Summary Page Spider Chart & Enhanced Navigation

#### Spider Chart Implementation
**Added interactive radar/spider chart to summary page** (`page-07-summary.html`):
- ✅ Chart.js v4.4.0 integration via CDN
- ✅ 7-point radar chart showing all assessment sections
- ✅ Shortened labels for better readability (Roles, Training, Reps/SSPs, MME, ME, NSS, PG Surveys)
- ✅ Enhanced tooltips showing full section names and maturity levels
- ✅ Cardiff University brand colors (rgb(0, 51, 102))
- ✅ 0-5 scale with proper grid lines
- ✅ Auto-regenerates when page becomes visible
- ✅ Print-friendly (animation disabled)

**CSS Updates**:
- ✅ Two-column balanced layout (stats on left, chart on right)
- ✅ Responsive design (stacks on mobile < 768px)
- ✅ Chart container styling with background and rounded corners
- ✅ Print styles for clean PDF output

**JavaScript Updates**:
- ✅ `generateSpiderChart()` function with section data mapping
- ✅ Chart instance management (destroy/recreate on updates)
- ✅ Visibility detection for auto-refresh
- ✅ Chart.js initialization with proper error handling

#### Enhanced Navigation System
**Added smart navigation functions** (`scoring-xerte.js`):
- ✅ `saveAndContinue()` - Saves all evidence notes and navigates to themes overview
- ✅ `backToMenu()` - Quick navigation back to themes overview
- ✅ Toast notification on save ("Progress saved!")
- ✅ 500ms delay for smooth transition
- ✅ Auto-updates progress bars on overview page

**Updated all theme pages** with new navigation:
- ✅ `page-04-theme-1.html` - 2 sections (Roles, Training)
- ✅ `page-05-theme-2.html` - 1 section (Reps/SSPs)
- ✅ `page-06-theme-3.html` - 4 sections (MME, ME, NSS, PG Surveys)

**Navigation button styles**:
- Primary: "Save & Continue →" (`btn btn-primary`)
- Secondary: "← Back to Menu" (`btn btn-light` with custom styles)
- Flexbox layout with space-between alignment

#### Enhanced Evidence Collection
**Added comprehensive guidance to all evidence boxes**:

**New structure for each evidence section**:
1. **Heading**: "Evidence & Contextual Notes"
2. **Importance statement**: "This context is essential for generating meaningful recommendations"
3. **Section-specific prompt**: Names the specific section being assessed
4. **Four-point checklist**:
   - ✓ What practices/structures are currently in place?
   - ✓ Why does this represent the level you selected?
   - ✓ What evidence supports this assessment?
   - ✓ If you selected an "in-between" level (e.g., 2.5), what are you doing from each level?
5. **Reminder**: "Be as specific as possible - this context helps us generate tailored recommendations for your school."
6. **Section-specific placeholder examples**

**Updated sections**:
- Theme 1 (page-04-theme-1.html):
  - Roles and Structures
  - SV Training, Development, and Dissemination
- Theme 2 (page-05-theme-2.html):
  - Student Reps and Student-Staff Panels
- Theme 3 (page-06-theme-3.html):
  - Mid-Module Enhancement (MME)
  - End of Module Enhancement (ME)
  - National Student Survey (NSS)
  - Postgraduate Surveys (CUPTS & PRES)

### Files Modified
- `scoring-xerte.js` - Added navigation functions (lines 385-416)
- `page-04-theme-1.html` - Navigation buttons + enhanced evidence boxes
- `page-05-theme-2.html` - Navigation buttons + enhanced evidence boxes
- `page-06-theme-3.html` - Navigation buttons + enhanced evidence boxes
- `page-07-summary.html` - Spider chart + two-column layout
- `README.md` - Updated documentation with v1.3 features

### Files Created
- `page-07-summary-backup.html` - Backup with experimental chart fixes

### Documentation Updates
**README.md v1.3**:
- ✅ Updated Key Features list
- ✅ Added navigation functions to Core Functions table
- ✅ Updated Navigation Patterns section
- ✅ Updated Evidence Box example with new structure
- ✅ Added v1.3 to Version History
- ✅ Changed project status to "Complete - All themes implemented with enhanced features"

### Benefits
- **Improved UX**: Clear "Save & Continue" workflow reduces confusion
- **Better Data Quality**: Enhanced evidence prompts guide users to provide meaningful context
- **Visual Overview**: Spider chart provides instant visual assessment of progress
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Print Ready**: Chart and layout optimize for PDF generation
- **Consistency**: All theme pages follow the same pattern

### Technical Notes
- Chart.js loaded via CDN: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`
- Navigation uses linkID pattern: `{type:'linkID', ID:'PG1765898999143'}`
- Evidence guidance uses inline styles for compatibility
- Chart uses `suggestedMin/suggestedMax` (may show negative values when all scores are 0 - see backup file for fixes)

---

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

**Last Updated:** 2024-12-18
