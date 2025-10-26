# PPIE Case Studies DataTable

A responsive, filterable table displaying PPIE (Patient and Public Involvement and Engagement) case studies using DataTables 2.3.4.

## 📂 Files

- `case-study-table.html` - Main HTML file with table and filters
- `case-studies-data.js` - Data source (generated from CSV)
- `case-studies.csv` - Original data (edit this)
- `convert-csv-to-js.py` - Python script to convert CSV → JS
- `README.md` - This file

## 🚀 Quick Start

1. **View the table**: Open `case-study-table.html` in a browser
2. **Update data**: Edit `case-studies.csv`
3. **Regenerate JS**: Run `python convert-csv-to-js.py`
4. **Refresh browser**: See updated data

## 📊 Features

### Interactive Table
- ✅ **Sortable columns** - Click headers to sort
- ✅ **Responsive design** - Adapts to mobile/tablet/desktop
- ✅ **Pagination** - 10, 25, 50, or all entries per page
- ✅ **Global search** - Search across all fields
- ✅ **Hidden searchable columns** - Keywords, school, division, centre are searchable but not displayed

### Custom Filters
- 🏷️ **Category filter** - Filter by PPIE category
- 🏫 **School filter** - Filter by Cardiff University school
- 📚 **Module filter** - Filter by training module number
- 🔄 **Reset button** - Clear all filters at once

### Visual Design
- 🎨 **Color-coded badges** - Each category has a unique color
- 🔗 **Clickable titles** - Links open in new tabs
- 💅 **Cardiff brand colors** - Teal theme throughout
- 📱 **Mobile-friendly** - Filters stack vertically on small screens

## 🎨 Category Badge Colors

| Category | Color | CSS Class |
|----------|-------|-----------|
| PPI in Research | Blue | `.category-research` |
| PPI Education and Training | Green | `.category-education` |
| Public Engagement | Yellow | `.category-engagement` |
| EDI in PPIE | Pink | `.category-inclusivity` |
| Coproduction | Brown | `.category-coproduction` |
| PPIE Governance | Cyan | `.category-governance` |

## 📋 Data Structure

Each case study in `case-studies-data.js` has:

```javascript
{
    title: "Case Study Title",
    url: "https://link-to-case-study.com",
    authors: ["Author 1", "Author 2"],
    categories: ["PPI in Research", "Public Engagement"],
    keywords: ["keyword1", "keyword2"],
    school: "School of Medicine",
    division: "Division Name",
    centre: "Centre Name",
    modules: "2, 4, 7"  // Comma-separated module numbers
}
```

## 🔍 How Filtering Works

### Hidden Columns Architecture
The table has **9 columns total**:
- **Visible (3)**: Title, Authors, Categories
- **Hidden but searchable (6)**: Keywords, School, Division, Centre, Modules, Plain Categories

### Filter Implementation

#### Category Filter
```javascript
table.column(8).search(selectedCategory).draw();
```
Searches column 8 (plain text categories)

#### School Filter
```javascript
table.column(4).search(selectedSchool).draw();
```
Searches column 4 (school name)

#### Module Filter
```javascript
var pattern = '(^|,\\s*)' + selectedModule + '($|[,\\s+])';
table.column(7).search(pattern, true, false).draw();
```
Uses **regex** to match exact module numbers:
- Matches `"2"` in `"2, 4, 7"` ✅
- Doesn't match `"2"` in `"12"` ❌

## 🛠️ Customization

### Change Colors

Edit the CSS variables in `case-study-table.html`:

```css
.category-research {
    background-color: var(--blue-1);
    color: var(--blue-9);
}
```

### Change Accent Color

The teal accent color is defined by:
```css
var(--clr-accent)      /* Main teal */
var(--clr-accent-500)  /* Teal shade */
var(--clr-accent-600)  /* Darker teal */
```

These come from `../project-style.css`.

### Add New Category

1. **Add to category map** in JavaScript:
```javascript
function getCategoryClass(category) {
    var categoryMap = {
        // ... existing categories
        "New Category": "category-newname"
    };
}
```

2. **Add CSS styling**:
```css
.category-newname {
    background-color: var(--purple-1);
    color: var(--purple-9);
}
```

### Change Table Settings

Edit DataTables initialization options:

```javascript
table = $('#caseStudiesTable').DataTable({
    pageLength: 10,              // Entries per page
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
    order: [[0, 'asc']],         // Sort by column 0 (title)
    responsive: true              // Enable responsive mode
});
```

## 📱 Responsive Behavior

### Desktop (> 992px)
- All 3 visible columns displayed
- Filters in single row
- Full table width

### Tablet (768px - 992px)
- Authors column may collapse
- Filters wrap to 2 columns
- Responsive icons appear for hidden data

### Mobile (< 768px)
- Authors column hidden (click `+` to expand)
- Filters stack vertically
- Smaller badge text
- Full-width filter buttons

## 🔧 Technical Details

### Dependencies

#### CSS
- Bootstrap 2.3.2 (page layout)
- Font Awesome 6 (icons)
- Cardiff University Theme (`bs_main.min.css`)
- DataTables 2.3.4 (`dataTables.dataTables.min.css`)
- Responsive extension (`responsive.dataTables.min.css`)
- Project styles (`../project-style.css`)

#### JavaScript
- jQuery 3.7.1
- DataTables 2.3.4 core (`dataTables.min.js`)
- DataTables Responsive (`dataTables.responsive.min.js`)
- Case studies data (`case-studies-data.js`)

### Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🐛 Troubleshooting

### Table not loading?
1. Check browser console for errors (F12)
2. Verify `case-studies-data.js` exists and has `var caseStudies = [...]`
3. Ensure jQuery loads before DataTables

### Filters not working?
1. Check that column indexes match:
   - Column 4 = School
   - Column 7 = Modules
   - Column 8 = Plain Categories
2. Open console and test: `table.column(4).search('School of Medicine').draw();`

### Styling looks wrong?
1. Verify all CSS files load (check Network tab in DevTools)
2. Check CSS variable definitions in `../project-style.css`
3. Look for CSS conflicts in browser DevTools

### Module filter matches wrong numbers?
The regex pattern should be: `(^|,\s*){NUMBER}($|[,\s+])`

This ensures:
- Matches at start of string OR after comma+space
- Matches the exact number
- Matches at end of string OR before comma/space/+

## 📝 Updating Data

### Method 1: Edit CSV (Recommended)

1. Open `case-studies.csv` in Excel/Google Sheets
2. Edit data (keep column headers unchanged)
3. Save as CSV
4. Run converter:
   ```bash
   python convert-csv-to-js.py
   ```
5. Refresh browser

### Method 2: Edit JavaScript Directly

1. Open `case-studies-data.js`
2. Edit the `caseStudies` array:
   ```javascript
   var caseStudies = [
       {
           title: "New Case Study",
           url: "https://example.com",
           // ... other fields
       }
   ];
   ```
3. Refresh browser

**Note**: Editing CSV is preferred as it's easier to maintain.

## 🎓 Learning Resources

### DataTables Documentation
- [DataTables Manual](https://datatables.net/manual/)
- [API Reference](https://datatables.net/reference/api/)
- [Responsive Extension](https://datatables.net/extensions/responsive/)

### Key Concepts Used
- **Data arrays**: Populate table from JavaScript arrays
- **Hidden columns**: `visible: false` but `searchable: true`
- **Custom filtering**: `.column().search()` with regex
- **Responsive classes**: `all`, `min-tablet-l`, etc.
- **Column definitions**: Control behavior per column

## 📊 Statistics

Current implementation:
- **Total CSS**: ~280 lines (simplified using DataTables defaults)
- **Total JavaScript**: ~220 lines (includes data prep and filtering)
- **Dependencies**: 6 external files (2 CSS, 2 JS DataTables, jQuery, data)
- **Load time**: < 500ms on typical connection

## 🚀 Future Enhancements

Potential improvements:
- [ ] Export to CSV/Excel button
- [ ] Advanced multi-column sorting
- [ ] Filter by multiple categories at once
- [ ] Saved filter presets
- [ ] URL parameters for shareable filtered views
- [ ] Lazy loading for large datasets
- [ ] Print-friendly view
- [ ] Dark mode support

## 📞 Support

For issues or questions:
1. Check this README first
2. Review browser console for errors
3. Consult [DataTables documentation](https://datatables.net/)
4. Check CSS variable definitions in `../project-style.css`

## 📜 License

Part of the Cardiff University Xerte Themes project.
