# SVEM Self-Assessment Project - Status & Documentation

## Project Overview

**Project Name:** Student Voice Enhancement Model (SVEM) Self-Assessment Tool
**Purpose:** An interactive web-based self-assessment tool for evaluating institutional practices across multiple themes of student voice and engagement
**Technology Stack:** HTML5, CSS3, Vanilla JavaScript, LocalStorage
**Theme Integration:** Built on top of Xerte Online Toolkits (XOT) theme system (`xot_main.css`)

---

## Project Structure

```
svem self-assessment/
├── index.html                  # Title/Landing page
├── instructions.html           # Instructions and overview
├── themes-overview.html        # Theme selection with progress tracking
├── theme-1.html               # Theme 1: Structures Supporting Student Voice
├── theme-2.html               # Theme 2: Student Reps & SSPs
├── theme-3.html               # Theme 3: Formal Mechanisms
├── summary.html               # [PENDING] Summary and report generation
├── css/
│   └── custom.css             # Project-specific styles
├── js/
│   └── scoring.js             # [CREATED BUT NOT USED] Shared scoring functions
└── PROJECT-STATUS.md          # This file
```

---

## Completed Features

### ✅ 1. Title Page (index.html)
- Clean, centered landing page
- Simple design with icon, title, subtitle
- "ENTER RESOURCE" button to begin assessment
- Responsive typography using `clamp()`

### ✅ 2. Instructions Page (instructions.html)
- Welcome message and overview
- Info cards displaying:
  - Estimated time (45 minutes)
  - Auto-save feature
  - Number of themes
- "Begin Assessment" CTA button
- Responsive card layout

### ✅ 3. Themes Overview Page (themes-overview.html)
- Displays all 3 themes as clickable cards
- **Progress Tracking:**
  - Status badges (Not Started / In Progress / Complete)
  - Progress bars showing "X of Y sections completed"
  - Color-coded left borders (transparent/amber/green)
  - Real-time updates from localStorage
- "Review & Submit Report" button
- JavaScript tracking for completion status

### ✅ 4. Theme 1: Structures Supporting Student Voice (theme-1.html)
**Structure:**
- 2 subsections:
  1. Roles and Structures
  2. SV Training, Development, and Dissemination
- 10 scoring levels total (5 per subsection)

**Features:**
- Score badges showing current level
- Expand/Collapse all buttons
- HTML5 `<details>` accordions for each level
- Scoring buttons (10 buttons total):
  - "Set as Level X" for whole numbers (1, 2, 3, 4, 5)
  - "Transitioning to Level X+1 (X.5)" for transitional scores
- Evidence textarea boxes for contextual notes
- Toast notifications on save
- Auto-save to localStorage
- Auto-load saved data on page load
- Single button selection enforcement

### ✅ 5. Theme 2: Student Reps & SSPs (theme-2.html)
**Structure:**
- 1 subsection: Student Reps and Student-Staff Panels
- 5 scoring levels

**Features:**
- Same scoring interface as Theme 1
- 10 scoring buttons (2 per level)
- Evidence textarea
- localStorage persistence
- Toast notifications

### ✅ 6. Theme 3: Formal Mechanisms (theme-3.html)
**Structure:**
- 4 subsections:
  1. Mid-Module Enhancement (MME)
  2. End of Module Enhancement (ME)
  3. National Student Survey (NSS)
  4. Cardiff University Postgraduate Taught Survey (CUPTS) & PRES
- 20 scoring levels total (5 per subsection)

**Features:**
- Same scoring interface as Themes 1 & 2
- 40 scoring buttons total (2 per level, except Level 5)
- 4 evidence textareas (one per subsection)
- Full localStorage integration
- Toast notifications

---

## Technical Implementation

### Data Storage
**LocalStorage Schema:**
```javascript
Key: `sv_${sectionId}`
Value: {
  score: number (1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5),
  note: string
}
```

**Section IDs:**
- Theme 1: `roles`, `training`
- Theme 2: `reps-ssps`
- Theme 3: `mme`, `me`, `nss`, `pg`

### JavaScript Functions (All Theme Pages)

#### Core Functions:
1. **`saveScore(sectionId, score, btn)`**
   - Saves score to localStorage
   - Passes button reference to updateSectionUI
   - Shows toast notification

2. **`saveNote(sectionId, note)`**
   - Saves evidence/notes to localStorage
   - Shows toast notification

3. **`updateSectionUI(sectionId, score, clickedBtn)`**
   - Clears ALL active button states
   - Activates only the clicked button
   - Highlights the selected level accordion
   - Updates the score badge

4. **`loadSavedData(sectionId)`**
   - Loads data from localStorage on page load
   - Uses precise text matching to find correct button
   - Restores both score and notes

5. **`toggleSection(sectionId, btn)`**
   - Expands/collapses all accordions in a section
   - Updates button text and icon

6. **`showToast()`**
   - Displays "Changes Saved" notification
   - Auto-hides after 2 seconds

#### Bug Fixes Applied:
**Issue 1:** Multiple buttons appearing selected simultaneously
- **Fix:** Modified `updateSectionUI()` to accept button reference and only activate that specific button

**Issue 2:** Wrong button selected on page reload (e.g., selecting "Set as Level 5" would also highlight "Transitioning to Level 5 (4.5)")
- **Fix:** Improved `loadSavedData()` text matching logic:
  ```javascript
  // First try exact match with parentheses for transitional scores
  if (text.includes(`(${saved.score})`)) return true;
  // For whole number scores, match "Set as Level X"
  if (text.includes(`Set as Level ${saved.score}`)) return true;
  ```

### CSS Styling (custom.css)

**Key Components:**
- `.score-badge` - Level indicator badges
- `.score-btn` - Scoring buttons with active states
- `.evidence-box` - Evidence textarea containers
- `details.selected-level` - Highlighted selected level
- `#toast` - Notification system
- `.theme-card` - Theme cards with progress indicators
- `.status-badge` - Status indicators (Not Started/In Progress/Complete)

**Color Scheme:**
- Primary: `#003366` (Cardiff University blue)
- Active states: Dark blue background, white text
- Selected levels: Blue border with light blue background
- Grayscale level indicators (5 shades)

---

## Scoring System

### Maturity Levels:
1. **Level 1** - Moving towards Baseline
2. **Level 2** - Baseline Practice
3. **Level 3** - Emerging Good Practice
4. **Level 4** - Established Strong Practice
5. **Level 5** - Exceptional Practice

### Transitional Scores:
- 1.5 - Transitioning between Level 1 and 2
- 2.5 - Transitioning between Level 2 and 3
- 3.5 - Transitioning between Level 3 and 4
- 4.5 - Transitioning between Level 4 and 5

### Total Scoring Capacity:
- **7 sections** across 3 themes
- **35 distinct levels** to assess
- **70 scoring buttons** total
- **7 evidence textareas** for contextual notes

---

## Pending Work

### 🚧 Summary Page (summary.html)
**Requirements:**
- Aggregate all data from localStorage (7 sections)
- Display scores and evidence for each section
- Show overall completion status
- Generate printable report
- Provide export functionality (PDF/Print)
- Calculate average scores per theme
- Visual representation of results

**Features Needed:**
- Overall assessment summary
- Theme-by-theme breakdown
- Evidence compilation
- Print-friendly layout
- Export options
- Date/timestamp of completion
- Recommendations based on scores

---

## Known Issues & Limitations

### Current Limitations:
1. Data stored in browser localStorage only (not server-side)
2. No data export/import functionality yet
3. No multi-user or authentication system
4. Data can be lost if localStorage is cleared
5. No offline functionality beyond basic HTML

### Browser Compatibility:
- Requires modern browser with localStorage support
- HTML5 `<details>` element support required
- JavaScript enabled required

---

## Testing Checklist

### ✅ Completed Tests:
- [x] Score selection and deselection
- [x] Single button active state enforcement
- [x] LocalStorage save/load functionality
- [x] Evidence textarea save/load
- [x] Toast notifications
- [x] Accordion expand/collapse
- [x] Progress tracking on overview page
- [x] Navigation between pages
- [x] Precise button matching for all score values (1-5 and .5 increments)

### ⏳ Pending Tests:
- [ ] Full user journey (start to summary)
- [ ] Cross-browser testing
- [ ] Mobile/responsive testing
- [ ] Accessibility testing (WCAG compliance)
- [ ] Print functionality
- [ ] Data persistence across sessions

---

## Version History

### Version 0.9 (Current - 2025-12-15)
- ✅ All three theme pages completed with full functionality
- ✅ Progress tracking implemented on overview page
- ✅ Fixed multiple button selection bug
- ✅ Fixed Level 5 button matching issue
- ⏳ Summary page pending

### Version 0.8
- ✅ Theme 3 completed with 4 subsections
- ✅ 20 levels added to Theme 3
- ✅ Evidence boxes for all sections

### Version 0.7
- ✅ Theme 2 completed with scoring functionality
- ✅ Improved JavaScript for button state management

### Version 0.6
- ✅ Theme 1 completed with 2 subsections
- ✅ Scoring interface implemented
- ✅ LocalStorage integration

### Version 0.5
- ✅ Themes overview page with status tracking
- ✅ CSS styling for all components

### Version 0.1-0.4
- ✅ Initial structure and page layout
- ✅ Title and instructions pages
- ✅ Navigation flow

---

## Technical Debt & Future Enhancements

### Technical Improvements:
- [ ] Refactor JavaScript into shared module (scoring.js is created but unused)
- [ ] Add input validation and error handling
- [ ] Implement data export/import functionality
- [ ] Add confirmation dialogs for destructive actions
- [ ] Optimize localStorage usage

### Feature Enhancements:
- [ ] Add "Save & Exit" functionality
- [ ] Implement draft/final submission states
- [ ] Add keyboard navigation support
- [ ] Add comparison with previous assessments
- [ ] Generate improvement recommendations
- [ ] Add analytics/insights dashboard
- [ ] Multi-language support

### UX Improvements:
- [ ] Add progress bar across all pages
- [ ] Add "Back" and "Next" navigation consistency
- [ ] Add quick navigation menu
- [ ] Add search/filter on themes
- [ ] Add tooltips for guidance
- [ ] Add estimated time remaining

---

## Contact & Credits

**Project:** SVEM Self-Assessment Tool
**Institution:** Cardiff University
**Framework:** Xerte Online Toolkits (XOT)
**Development Date:** December 2025

---

## Next Steps

1. **Complete Summary Page** - Highest Priority
   - Design report layout
   - Aggregate data from localStorage
   - Implement print functionality
   - Add export options

2. **Testing & Refinement**
   - Cross-browser testing
   - Mobile responsiveness check
   - Accessibility audit

3. **Deployment**
   - Documentation for users
   - Integration with Xerte platform
   - User training materials

---

*Last Updated: 2025-12-15*
