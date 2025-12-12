# Student Voice Enhancement Model - Interactive Table

An interactive web-based table displaying the Student Voice Enhancement Model framework for Cardiff University, built with DataTables 2.3.4.

## Overview

This project transforms the Student Voice Enhancement Model markdown document into an interactive, searchable, and filterable table interface. It helps schools assess and improve their student voice practices across five progressive levels.

## Features

### Interactive DataTable
- **Sortable columns**: Click any column header to sort
- **Pagination**: Choose to display 10, 25, 50, or all entries
- **Responsive design**: Adapts to different screen sizes

### Advanced Filtering
- **Cascading filters**: Sub-Category dropdown updates based on selected Theme
- **Three filter options**:
  - Theme (3 themes)
  - Sub-Category (dynamically filtered based on theme)
  - Level (5 levels)
- **Filter persistence**: Selections are maintained when valid

### Visual Design
- **Theme color coding**: Three distinct colors differentiate the themes
  - **Theme 1** (Structures Supporting Student Voice Activity): Blue (#045bc6)
  - **Theme 2** (Student Reps and Student-Staff Panels): Red (#d4374a)
  - **Theme 3** (Supporting Formal Student Voice Mechanisms): Green (#008458)

- **Progressive level indicators**: Level pills with progressive color shades
  - Each theme has its own color family (blue, red, green)
  - Levels 1-5 progress from light to dark shades
  - Level pills display as "L1", "L2", etc.

- **Level definitions**: Numbered icons (1-5) with progressive green shades
  - Visual progression from light to dark green
  - Circular badges with clear numbering

### Content Presentation
- **Bullet-point descriptions**: Multi-sentence descriptions automatically formatted as lists
- **Theme badges**: Color-coded left border indicators for each theme
- **Cardiff University branding**: Uses official brand colors throughout

## File Structure

```
SVEM-student-voice-enhancement-model/
├── index.html          # Main HTML structure
├── script.js           # DataTables configuration and data
├── styles.css          # Custom styling and Cardiff University branding
├── model.md            # Original markdown source document
└── README.md           # This documentation file
```

## Technologies Used

- **DataTables 2.3.4**: Interactive table functionality
- **jQuery 3.7.1**: Required for DataTables
- **Font Awesome 6.5.1**: Icon library (for numbered level icons)
- **Pure CSS**: Custom styling with CSS variables
- **Vanilla JavaScript**: Custom filter logic

## Level Definitions

- **Level 1**: Moving towards Baseline
- **Level 2**: Baseline Practice
- **Level 3**: Emerging Good Practice
- **Level 4**: Established Strong Practice
- **Level 5**: Exceptional Practice

## Core Activity Themes

### Theme 1: Structures Supporting Student Voice Activity
- Roles and Structures
- SV Training, Development, and Dissemination

### Theme 2: Student Reps and Student-Staff Panels (SSPs)
- Student Representation

### Theme 3: Supporting Formal Student Voice Mechanisms
- Mid-Module Enhancement
- End of Module Enhancement
- National Student Survey (NSS)
- Cardiff University Postgraduate Taught Survey (CUPTS) & Postgraduate Research Experience Survey (PRES)

## Color Scheme

### Theme Colors
```css
--theme-1: #045bc6;  /* Blue - Structures */
--theme-2: #d4374a;  /* Red - Student Reps */
--theme-3: #008458;  /* Green - Formal Mechanisms */
```

### Theme 1 (Blue) - Progressive Shades
```css
--theme-1-level-1: #bbdefb;  /* Very light blue */
--theme-1-level-2: #64b5f6;  /* Light blue */
--theme-1-level-3: #2196f3;  /* Medium blue */
--theme-1-level-4: #1976d2;  /* Dark blue */
--theme-1-level-5: #0d47a1;  /* Very dark blue */
```

### Theme 2 (Red) - Progressive Shades
```css
--theme-2-level-1: #ffcdd2;  /* Very light red */
--theme-2-level-2: #e57373;  /* Light red */
--theme-2-level-3: #f44336;  /* Medium red */
--theme-2-level-4: #d32f2f;  /* Dark red */
--theme-2-level-5: #b71c1c;  /* Very dark red */
```

### Theme 3 (Green) - Progressive Shades
```css
--theme-3-level-1: #c8e6c9;  /* Very light green */
--theme-3-level-2: #81c784;  /* Light green */
--theme-3-level-3: #4caf50;  /* Medium green */
--theme-3-level-4: #2e7d32;  /* Dark green */
--theme-3-level-5: #1b5e20;  /* Very dark green */
```

## Usage

### Basic Usage
1. Open `index.html` in a web browser
2. Use the filter dropdowns to narrow down results
3. Click column headers to sort
4. Adjust pagination as needed

### Filtering
1. **By Theme**: Select a theme to see all related entries
   - Automatically filters Sub-Category options
2. **By Sub-Category**: Select specific sub-categories within a theme
3. **By Level**: Filter by specific maturity levels (1-5)
4. **Reset**: Select "All" in any dropdown to clear that filter

### Navigation
- Use pagination controls at the bottom to navigate through pages
- Adjust "Show X entries per page" to change the number of visible rows
- Results info shows current position (e.g., "Showing 1 to 25 of 35 entries")

## Responsive Design

The interface adapts to different screen sizes:

- **Desktop**: All filters display on one line
- **Tablet/Mobile**: Filters wrap to multiple lines while keeping label-dropdown pairs together
- **Small screens**: Table becomes horizontally scrollable to preserve data integrity

## Key Features Explained

### Cascading Filters
When you select a theme, the Sub-Category dropdown automatically updates to show only relevant sub-categories:
- **Theme 1** → Shows only its 2 sub-categories
- **Theme 2** → Shows only its 1 sub-category
- **Theme 3** → Shows only its 4 sub-categories

### Auto-formatted Lists
Descriptions with multiple sentences are automatically converted to bullet points for easier reading. The script splits content by sentence boundaries and formats them as list items.

### Theme-Matched Colors
Each level pill matches its parent theme's color family, making it easy to visually identify which theme an entry belongs to at a glance.

## Customization

### Changing Colors
Edit the CSS variables in `styles.css` (lines 19-43) to customize theme and level colors.

### Modifying Data
Update the `svemData` array in `script.js` (lines 2-51) to add, remove, or modify entries.

### Adjusting Layout
Modify the `.filters-row` and `.filter-group` classes in `styles.css` to change filter layout and spacing.

## Browser Compatibility

Works with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Credits

- **Framework**: Student Voice Enhancement Model - Cardiff University
- **Development**: Interactive table implementation
- **Design**: Cardiff University brand guidelines
- **Copyright**: © 2024 Student Voice Enhancement Model | Cardiff University

## License

This project uses Cardiff University branding and is intended for Cardiff University use.

## Support

For questions or issues with the Student Voice Enhancement Model framework, contact the Cardiff University Student Voice team.
