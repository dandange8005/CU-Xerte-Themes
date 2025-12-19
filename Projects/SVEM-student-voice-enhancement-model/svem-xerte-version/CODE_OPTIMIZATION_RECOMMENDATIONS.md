# JavaScript Code Optimization Recommendations

**Project:** SVEM Xerte Version
**Date:** 2024-12-18
**Files Analyzed:** scoring-xerte.js (417 lines), page-07-summary.html (JavaScript section)

This document provides comprehensive recommendations for improving, simplifying, and optimizing the JavaScript code structure.

---

## 1. Extract Magic Strings and Numbers into Constants

### Current Issues
- Repeated localStorage prefix `'sv_'` throughout both files
- Hard-coded linkID `'PG1765898999143'` (themes overview page)
- Magic numbers like `500`, `2000`, `100` for timeouts
- Chart.js CDN URL embedded in HTML

### Recommendation
Add configuration constants at the top of scoring-xerte.js:

```javascript
// Configuration Constants
const CONFIG = {
    STORAGE_PREFIX: 'sv_',
    THEMES_OVERVIEW_PAGE_ID: 'PG1765898999143',
    TOAST_DURATION: 2000,
    NAVIGATION_DELAY: 500,
    RELOAD_DELAY: 1500,
    VISIBILITY_CHECK_INTERVAL: 500,
    CHART_INIT_RETRY: 100
};
```

**Benefits:**
- Single source of truth for configuration values
- Easier to update values across the codebase
- Improved code readability
- Reduced risk of typos/inconsistencies

---

## 2. Eliminate Code Duplication in localStorage Operations

### Current Issue
LocalStorage get/set operations are repeated 15+ times with similar patterns:

```javascript
// Pattern appears in multiple places
const saved = JSON.parse(localStorage.getItem(`sv_${sectionId}`));
localStorage.setItem(`sv_${sectionId}`, JSON.stringify(currentData));
```

### Recommendation
Create utility functions:

```javascript
// LocalStorage utility functions
function getSectionData(sectionId) {
    try {
        const data = localStorage.getItem(`${CONFIG.STORAGE_PREFIX}${sectionId}`);
        return data ? JSON.parse(data) : { score: 0, note: '' };
    } catch (e) {
        console.error(`Error reading section ${sectionId}:`, e);
        return { score: 0, note: '' };
    }
}

function setSectionData(sectionId, data) {
    try {
        localStorage.setItem(
            `${CONFIG.STORAGE_PREFIX}${sectionId}`,
            JSON.stringify(data)
        );
        return true;
    } catch (e) {
        console.error(`Error saving section ${sectionId}:`, e);
        return false;
    }
}

function getAllSectionKeys() {
    return Object.keys(localStorage)
        .filter(key => key.startsWith(CONFIG.STORAGE_PREFIX));
}
```

**Impact:**
- Refactor saveScore, saveNote, loadSavedData, importData, downloadJSON, and confirmReset functions
- Eliminates ~30 lines of duplicated code
- Adds proper error handling to all localStorage operations
- Makes code more maintainable

---

## 3. Simplify saveScore and saveNote Functions

### Current Code
```javascript
function saveScore(sectionId, score, btn) {
    const currentData = JSON.parse(localStorage.getItem(`sv_${sectionId}`)) || { note: "" };
    currentData.score = score;
    localStorage.setItem(`sv_${sectionId}`, JSON.stringify(currentData));
    updateSectionUI(sectionId, score, btn);
    showToast();
}

function saveNote(sectionId, note) {
    const currentData = JSON.parse(localStorage.getItem(`sv_${sectionId}`)) || { score: 0 };
    currentData.note = note;
    localStorage.setItem(`sv_${sectionId}`, JSON.stringify(currentData));
    showToast();
}
```

### Optimized Code
```javascript
function saveScore(sectionId, score, btn) {
    const data = getSectionData(sectionId);
    data.score = score;
    if (setSectionData(sectionId, data)) {
        updateSectionUI(sectionId, score, btn);
        showToast();
    }
}

function saveNote(sectionId, note) {
    const data = getSectionData(sectionId);
    data.note = note;
    if (setSectionData(sectionId, data)) {
        showToast();
    }
}
```

**Benefits:**
- Cleaner, more readable code
- Proper error handling (only shows toast if save succeeds)
- Uses utility functions from recommendation #2

---

## 4. Consolidate Navigation Functions

### Current Issue
Two separate functions with similar Xerte navigation calls:

```javascript
function saveAndContinue() {
    // ... save logic
    setTimeout(() => {
        if (typeof x_navigateToPage === 'function') {
            x_navigateToPage(false, {type:'linkID', ID:'PG1765898999143'});
        }
    }, 500);
}

function backToMenu() {
    if (typeof x_navigateToPage === 'function') {
        x_navigateToPage(false, {type:'linkID', ID:'PG1765898999143'});
    }
}
```

### Optimized Code
```javascript
function navigateToThemesOverview(delay = 0) {
    const navigate = () => {
        if (typeof x_navigateToPage === 'function') {
            x_navigateToPage(false, {
                type: 'linkID',
                ID: CONFIG.THEMES_OVERVIEW_PAGE_ID
            });
        }
    };

    delay > 0 ? setTimeout(navigate, delay) : navigate();
}

function saveAndContinue() {
    const textareas = document.querySelectorAll('.evidence-input');
    textareas.forEach(textarea => {
        const sectionId = textarea.id.replace('evidence-', '');
        if (textarea.value && sectionId) {
            saveNote(sectionId, textarea.value);
        }
    });

    showToast('Progress saved!');
    navigateToThemesOverview(CONFIG.NAVIGATION_DELAY);
}

function backToMenu() {
    navigateToThemesOverview();
}
```

**Benefits:**
- DRY principle - single navigation function
- Easier to update navigation logic
- Uses CONFIG constant for page ID and delay

---

## 5. Improve loadSavedData Function

### Current Code
```javascript
function loadSavedData(sectionId) {
    const saved = JSON.parse(localStorage.getItem(`sv_${sectionId}`));
    if (!saved) return;

    if (saved.score > 0) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const matchingBtn = Array.from(section.querySelectorAll('.score-btn')).find(btn => {
            const text = btn.textContent;
            if (text.includes(`(${saved.score})`)) return true;
            if (text.includes(`Set as Level ${saved.score}`)) return true;
            return false;
        });
        updateSectionUI(sectionId, saved.score, matchingBtn);
    }

    if (saved.note) {
        const textarea = document.getElementById(`evidence-${sectionId}`);
        if (textarea) textarea.value = saved.note;
    }
}
```

### Optimized Code
```javascript
function loadSavedData(sectionId) {
    const saved = getSectionData(sectionId);
    const section = document.getElementById(sectionId);

    if (!section) return;

    // Load score if present
    if (saved.score > 0) {
        const matchingBtn = findScoreButton(section, saved.score);
        updateSectionUI(sectionId, saved.score, matchingBtn);
    }

    // Load note if present
    if (saved.note) {
        const textarea = document.getElementById(`evidence-${sectionId}`);
        if (textarea) textarea.value = saved.note;
    }
}

function findScoreButton(section, score) {
    return Array.from(section.querySelectorAll('.score-btn')).find(btn => {
        const text = btn.textContent;
        return text.includes(`(${score})`) || text.includes(`Set as Level ${score}`);
    });
}
```

**Benefits:**
- Separated concerns (button finding is now its own function)
- More readable logic
- Reusable findScoreButton function
- Uses getSectionData utility

---

## 6. Optimize confirmReset Function

### Current Code
```javascript
function confirmReset() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sv_')) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    closeResetModal();
    showToast('All data has been reset');

    if (typeof initThemesOverview === 'function') {
        setTimeout(() => {
            initThemesOverview();
        }, 100);
    }

    setTimeout(() => {
        location.reload();
    }, 1500);
}
```

### Optimized Code
```javascript
function confirmReset() {
    // Clear all sv_ keys
    getAllSectionKeys().forEach(key => localStorage.removeItem(key));

    closeResetModal();
    showToast('All data has been reset');

    // Refresh UI
    if (typeof initThemesOverview === 'function') {
        setTimeout(initThemesOverview, 100);
    }

    setTimeout(() => location.reload(), CONFIG.RELOAD_DELAY);
}
```

**Benefits:**
- Uses getAllSectionKeys utility function
- More concise code
- Uses CONFIG constant for reload delay
- Cleaner setTimeout syntax

---

## 7. Simplify Summary Page Report Generation

### Current Issue
Long string concatenation in generateReport() function (lines 516-567):

```javascript
reportHTML += `<div class="theme-report">`;
reportHTML += `<h3 class="theme-report__title">${themeName}</h3>`;
// ... 40+ lines of string concatenation
```

### Optimized Code

**Part 1: Extract Section Report Creation**

```javascript
function createSectionReportHTML(section, savedData) {
    const hasScore = savedData && savedData.score;
    const levelName = hasScore ? getMaturityLevelName(savedData.score) : 'Not Scored';
    const scoreClass = hasScore ? `level-${Math.floor(savedData.score)}` : 'not-scored';
    const scoreLabel = hasScore ? `Level ${savedData.score}` : 'Not Scored';

    const evidenceHTML = hasScore
        ? (savedData.note?.trim()
            ? `<strong>Evidence:</strong><p>${savedData.note}</p>`
            : `<em style="color: #999;">No evidence provided</em>`)
        : '';

    return `
        <div class="section-report">
            <div class="section-report__header">
                <h4 class="section-report__name">${section.name}</h4>
                <div class="section-report__score">
                    <span class="score-indicator ${scoreClass}">${scoreLabel}</span>
                    ${hasScore ? `<span class="maturity-level">${levelName}</span>` : ''}
                </div>
            </div>
            ${evidenceHTML ? `<div class="section-report__evidence">${evidenceHTML}</div>` : ''}
        </div>
    `;
}
```

**Part 2: Refactor Main Generation Function**

```javascript
function generateReport() {
    const reportDate = new Date().toLocaleDateString('en-GB', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('report-date').textContent = reportDate;

    let stats = { completed: 0, total: 0, totalScore: 0, scored: 0 };

    const reportHTML = Object.entries(SECTIONS).map(([themeName, theme]) => {
        const sectionsHTML = theme.sections.map(section => {
            stats.total++;
            const savedData = getSectionData(section.id);

            if (savedData.score) {
                stats.completed++;
                stats.totalScore += savedData.score;
                stats.scored++;
            }

            return createSectionReportHTML(section, savedData);
        }).join('');

        return `
            <div class="theme-report">
                <h3 class="theme-report__title">${themeName}</h3>
                ${sectionsHTML}
            </div>
        `;
    }).join('');

    document.getElementById('report-body').innerHTML = reportHTML;
    updateStatistics(stats);
}
```

**Part 3: Extract Statistics Update**

```javascript
function updateStatistics(stats) {
    document.getElementById('completed-count').textContent = stats.completed;
    const completionPercent = Math.round((stats.completed / stats.total) * 100);
    document.getElementById('completion-percent').textContent = `${completionPercent}%`;

    const averageScore = stats.scored > 0
        ? (stats.totalScore / stats.scored).toFixed(1)
        : '0.0';
    document.getElementById('average-score').textContent = averageScore;

    updateStatusBadge(stats.completed, stats.total);
}

function updateStatusBadge(completed, total) {
    const statusEl = document.getElementById('report-status');
    const statusConfig = {
        complete: { text: 'Complete', color: '#27ae60' },
        inProgress: { text: 'In Progress', color: '#f39c12' },
        notStarted: { text: 'Not Started', color: '#999' }
    };

    const status = completed === total ? 'complete'
        : completed > 0 ? 'inProgress'
        : 'notStarted';

    statusEl.textContent = statusConfig[status].text;
    statusEl.style.color = statusConfig[status].color;
    statusEl.style.fontWeight = completed > 0 ? '600' : 'normal';
}
```

**Benefits:**
- Separated concerns (HTML generation, statistics, status badge)
- More functional/declarative style with map/join
- Easier to test individual components
- More readable and maintainable
- Reduces ~25 lines of code

---

## 8. Optimize Spider Chart Label Mapping

### Current Code
```javascript
// Lines 400-407 - inefficient if-chain
let shortLabel = section.name;
if (section.id === 'roles') shortLabel = 'Roles';
if (section.id === 'training') shortLabel = 'Training';
if (section.id === 'reps-ssps') shortLabel = 'Reps/SSPs';
if (section.id === 'mme') shortLabel = 'MME';
if (section.id === 'me') shortLabel = 'ME';
if (section.id === 'nss') shortLabel = 'NSS';
if (section.id === 'pg') shortLabel = 'PG Surveys';
```

### Optimized Code
```javascript
// At top of file (after SECTIONS constant)
const SECTION_SHORT_LABELS = {
    'roles': 'Roles',
    'training': 'Training',
    'reps-ssps': 'Reps/SSPs',
    'mme': 'MME',
    'me': 'ME',
    'nss': 'NSS',
    'pg': 'PG Surveys'
};

// In generateSpiderChart function
const shortLabel = SECTION_SHORT_LABELS[section.id] || section.name;
```

**Benefits:**
- O(1) lookup instead of O(n) if-chain
- More maintainable - labels in one place
- Easier to add/modify labels
- More elegant code

---

## 9. Improve Error Handling in Import Function

### Current Code
```javascript
function importData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const rawData = JSON.parse(e.target.result);
            // ... 70 lines of logic
        } catch (err) {
            showToast('Error: Invalid JSON file');
            console.error('Import error:', err);
            console.error('File content:', e.target.result);
        }
    };
    reader.readAsText(file);
    input.value = '';
}
```

### Optimized Code

**Part 1: Main Import Function**

```javascript
function importData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => processImportData(e.target.result, input);
    reader.onerror = () => showToast('Error: Could not read file');
    reader.readAsText(file);
}
```

**Part 2: Process Import Data**

```javascript
function processImportData(fileContent, input) {
    try {
        const rawData = JSON.parse(fileContent);

        if (typeof rawData !== 'object' || rawData === null) {
            throw new Error('Invalid data format');
        }

        const dataToImport = normalizeImportData(rawData);
        const importCount = importSections(dataToImport);

        showToast(`Data imported successfully! (${importCount} sections)`);
        setTimeout(() => location.reload(), CONFIG.RELOAD_DELAY);

    } catch (err) {
        showToast('Error: Invalid JSON file');
        console.error('Import error:', err, '\nFile content:', fileContent);
    } finally {
        input.value = '';
    }
}
```

**Part 3: Normalize Import Data**

```javascript
function normalizeImportData(rawData) {
    // Handle summary page export format
    if (rawData.metadata && rawData.assessmentData) {
        return Object.entries(rawData.assessmentData).reduce((acc, [key, item]) => {
            acc[key] = {
                score: item.score || 0,
                note: item.evidence || ''
            };
            return acc;
        }, {});
    }

    // Handle simple export format
    return rawData;
}
```

**Part 4: Import Sections**

```javascript
function importSections(dataToImport) {
    let importCount = 0;

    Object.entries(dataToImport).forEach(([key, value]) => {
        if (key === 'metadata' || key === 'assessmentData') return;

        const sectionId = key.replace(/^sv_/, '');
        let data = typeof value === 'string' ? JSON.parse(value) : value;

        const importValue = {
            score: data.score || 0,
            note: data.note || data.evidence || ''
        };

        if (setSectionData(sectionId, importValue)) {
            importCount++;
        }
    });

    return importCount;
}
```

**Benefits:**
- Separated concerns (file reading, parsing, normalizing, importing)
- Better error handling with try-catch-finally
- More testable code
- Uses CONFIG constant
- Clearer logic flow
- Reduces ~15 lines

---

## 10. Optimize Visibility Detection in Summary Page

### Current Code
```javascript
// Lines 663-678 - polling every 500ms
const checkVisibility = setInterval(function() {
    const isVisible = summaryPageElement.offsetParent !== null;
    if (isVisible && !lastVisibleState) {
        generateReport();
        generateSpiderChart();
    }
    lastVisibleState = isVisible;
}, 500);
```

### Optimized Code
```javascript
function createVisibilityWatcher(element, callback) {
    let lastVisibleState = false;

    const checkVisibility = () => {
        const isVisible = element.offsetParent !== null;
        if (isVisible && !lastVisibleState) {
            callback();
        }
        lastVisibleState = isVisible;
    };

    return setInterval(checkVisibility, CONFIG.VISIBILITY_CHECK_INTERVAL);
}

// In initializeReports:
if (summaryPageElement) {
    const intervalId = createVisibilityWatcher(summaryPageElement, () => {
        generateReport();
        generateSpiderChart();
    });
    window._summaryPageInterval = intervalId;
}
```

**Benefits:**
- Reusable visibility watcher function
- Uses CONFIG constant
- More functional approach with callback
- Easier to test and maintain

---

## Summary of Improvements

| Category | Lines Saved | Benefit |
|----------|-------------|---------|
| LocalStorage utilities | ~30 | Better error handling, DRY |
| Navigation consolidation | ~10 | Single source of truth |
| Report generation refactor | ~25 | More readable, maintainable |
| Constants extraction | ~0 | Improves clarity |
| Import function split | ~15 | Better separation of concerns |
| Chart label mapping | ~5 | O(1) lookup vs O(n) |
| **TOTAL** | **~85 lines** | **Improved code quality** |

---

## Implementation Priority

### High Priority (Implement First)
1. **Constants extraction (#1)** - Foundation for other improvements
2. **LocalStorage utilities (#2)** - Used throughout the codebase
3. **Navigation consolidation (#4)** - Simple, high impact

### Medium Priority
4. **Simplify save functions (#3)** - Depends on #2
5. **Optimize confirmReset (#6)** - Depends on #2
6. **Improve loadSavedData (#5)** - Depends on #2
7. **Chart label mapping (#8)** - Independent, easy win

### Lower Priority (Nice to Have)
8. **Report generation refactor (#7)** - Larger refactor, but valuable
9. **Import function improvements (#9)** - Depends on #2
10. **Visibility detection (#10)** - Minor improvement

---

## Testing Recommendations

After implementing these optimizations:

1. **Test all localStorage operations:**
   - Save scores and notes
   - Load saved data on page reload
   - Import/export data
   - Reset data

2. **Test navigation:**
   - "Save & Continue" button
   - "Back to Menu" button
   - Verify correct page navigation

3. **Test summary page:**
   - Report generation
   - Spider chart rendering
   - Statistics calculation
   - Visibility detection when navigating back

4. **Test error scenarios:**
   - Invalid JSON import
   - LocalStorage quota exceeded
   - Missing DOM elements
   - File read errors

---

## Notes

- All optimizations maintain backward compatibility with existing localStorage data
- No breaking changes to the public API (function signatures remain the same)
- Code remains compatible with Xerte Online Toolkits environment
- Modern ES6+ syntax is already in use, so no syntax changes needed
- All recommendations follow existing code style and patterns

---

**Last Updated:** 2024-12-18
