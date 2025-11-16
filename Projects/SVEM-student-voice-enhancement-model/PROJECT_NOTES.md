# Project Development Notes - SVEM Interactive Table

## 2025-11-16

### 1. Initial Setup
- Created HTML structure with DataTables 2.3.4, jQuery 3.7.1, and Font Awesome 6
- Transformed 35 markdown entries into JavaScript data array
- Set up 4-column table: Theme, Sub-Category, Level, Description

### 2. Visual Design
- Applied Cardiff University branding colors (red, green, blue)
- Created Level Definitions section with numbered circular icons (1-5)
- Added progressive green color shades to level icons (light to dark)

### 3. Theme Color Coding
- Assigned distinct colors to each theme:
  - Theme 1 (Structures): Blue (#045bc6)
  - Theme 2 (Student Reps): Red (#d4374a)
  - Theme 3 (Formal Mechanisms): Green (#008458)
- Added colored left borders to theme items in Core Themes section
- Applied theme badges with color coding in the table

### 4. Progressive Level Pills
- Created 15 color variations (3 themes × 5 levels)
- Each theme has progressive shades from light to dark
- Changed level display to compact pills: "L1", "L2", etc.
- Matched pill colors to their parent theme

### 5. Content Formatting
- Auto-converted multi-sentence descriptions into bullet-point lists
- Improved readability with proper spacing and line height

### 6. Filter System
- Removed global search box
- Reorganized filters into two lines:
  - Line 1: "Show entries per page" dropdown
  - Line 2: Theme, Sub-Category, Level filters
- Added light gray background to filter section
- Implemented cascading filters: Sub-Category updates based on Theme selection

### 7. Responsive Design
- Made label-dropdown pairs stay together when wrapping
- Optimized spacing for better fit on one line
- Added responsive flex layout that adapts to screen sizes

### 8. Documentation
- Created comprehensive README with features, usage, and customization guide
- Documented color schemes and CSS variables

---

## Key Features Delivered

✅ Interactive sortable table with pagination
✅ Cascading dropdown filters (Theme → Sub-Category)
✅ Three-color theme system with progressive level shades
✅ Auto-formatted bullet-point descriptions
✅ Responsive layout with smart wrapping
✅ Cardiff University branding throughout

---

## Files Created

1. `index.html` - Main page structure
2. `script.js` - DataTables config and cascading filter logic
3. `styles.css` - Custom styling with CSS variables
4. `README.md` - User documentation
5. `PROJECT_NOTES.md` - This summary

---

## Technical Stack

- DataTables 2.3.4
- jQuery 3.7.1
- Font Awesome 6.5.1
- Pure CSS with CSS Custom Properties
- Vanilla JavaScript for custom logic

---

**Status**: Complete
**Date**: 2025-11-16
