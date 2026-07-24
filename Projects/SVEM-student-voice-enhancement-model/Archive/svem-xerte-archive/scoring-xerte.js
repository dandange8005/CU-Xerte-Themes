// SVEM Self-Assessment Scoring JavaScript - XERTE COMPATIBLE VERSION
// Shared functions for all theme pages in Xerte Online Toolkits

// Configuration Constants
const CONFIG = {
    STORAGE_PREFIX: 'sv_',
    DARK_MODE_KEY: 'svem-dark-mode',
    THEMES_OVERVIEW_PAGE_ID: 'PG1765898999143',
    TOAST_DURATION: 2000,
    NAVIGATION_DELAY: 500,
    RELOAD_DELAY: 1500,
    VISIBILITY_CHECK_INTERVAL: 500,
    CHART_INIT_RETRY: 100
};

// ========================================
// Language / Localisation
// ========================================
// Language flag. English pages leave this as 'en'; each Welsh page's inline
// init sets `SVEM_LANG = 'cy';` BEFORE calling initSVEMPage(...).
var SVEM_LANG = (typeof SVEM_LANG !== 'undefined') ? SVEM_LANG : 'en';

// UI string dictionary. Values are strings, or functions for parametric text.
// NOTE: the Welsh (cy) micro-strings below are UI chrome not present in the
// supplied docx/xlsx sources; they are translator-supplied and listed in
// svem-xerte-welsh/TRANSLATION-QUERIES.md for SVP sign-off.
const SVEM_STRINGS = {
    en: {
        level: 'Level',
        expandAll: 'Expand All',
        collapseAll: 'Collapse All',
        notStarted: 'Not Started',
        inProgress: 'In Progress',
        complete: 'Complete',
        sectionsCompleted: (c, t) => `${c} of ${t} sections completed`,
        dataReset: 'All data has been reset',
        imported: (n) => `Data imported successfully! (${n} sections)`,
        invalidJson: 'Error: Invalid JSON file',
        readError: 'Error: Could not read file',
        progressSaved: 'Progress saved!',
        dark: 'Dark',
        light: 'Light',
        enableDark: 'Enable dark mode',
        disableDark: 'Disable dark mode'
    },
    cy: {
        level: 'Lefel',
        expandAll: 'Ehangu Popeth',
        collapseAll: 'Crebachu Popeth',
        notStarted: 'Heb Ddechrau',
        inProgress: 'Ar y Gweill',
        complete: "Wedi'i Gwblhau",
        sectionsCompleted: (c, t) => `${c} o ${t} adran wedi'u cwblhau`,
        dataReset: "Mae'r holl ddata wedi'i ailosod",
        imported: (n) => `Data wedi'i fewnforio'n llwyddiannus! (${n} adran)`,
        invalidJson: 'Gwall: Ffeil JSON annilys',
        readError: 'Gwall: Methu darllen y ffeil',
        progressSaved: "Cynnydd wedi'i gadw!",
        dark: 'Tywyll',
        light: 'Golau',
        enableDark: "Galluogi'r modd tywyll",
        disableDark: "Analluogi'r modd tywyll"
    }
};

// Look up a UI string for the active language (falls back to English).
function t(key) {
    const lang = (SVEM_LANG === 'cy') ? 'cy' : 'en';
    const val = SVEM_STRINGS[lang] && (key in SVEM_STRINGS[lang])
        ? SVEM_STRINGS[lang][key]
        : SVEM_STRINGS.en[key];
    return val;
}

// Active localStorage prefix, derived from the language at call time so it
// respects a page setting SVEM_LANG after this script has loaded.
// English: 'sv_'  |  Welsh: 'sv_cy_'
function storagePrefix() {
    return (SVEM_LANG === 'cy') ? 'sv_cy_' : 'sv_';
}

// ========================================
// LocalStorage Utility Functions
// ========================================

function applySVEMDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', !!isDark);
    var toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
        toggle.setAttribute('aria-label', isDark ? t('disableDark') : t('enableDark'));
        var label = toggle.querySelector('.dark-mode-toggle__label');
        if (label) label.textContent = isDark ? t('dark') : t('light');
    }
}

function initSVEMDarkMode() {
    if (!document.getElementById('dark-mode-toggle')) {
        var toggle = document.createElement('button');
        toggle.id = 'dark-mode-toggle';
        toggle.className = 'dark-mode-toggle';
        toggle.type = 'button';
        toggle.setAttribute('role', 'switch');
        toggle.setAttribute('aria-checked', 'false');
        toggle.setAttribute('aria-label', t('enableDark'));
        toggle.innerHTML =
            '<span class="dark-mode-toggle__label">' + t('light') + '</span>' +
            '<span class="dark-mode-toggle__track"><span class="dark-mode-toggle__thumb"></span></span>';
        toggle.addEventListener('click', function () {
            var isDark = !document.body.classList.contains('dark-mode');
            localStorage.setItem(CONFIG.DARK_MODE_KEY, isDark ? 'dark' : 'light');
            applySVEMDarkMode(isDark);
        });
        document.body.appendChild(toggle);
    }

    var syncDarkMode = function () {
        applySVEMDarkMode(localStorage.getItem(CONFIG.DARK_MODE_KEY) === 'dark');
    };

    syncDarkMode();

    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(syncDarkMode);
    }

    setTimeout(syncDarkMode, 0);
    setTimeout(syncDarkMode, CONFIG.CHART_INIT_RETRY);
}

// Get section data from localStorage with error handling
function getSectionData(sectionId) {
    try {
        const data = localStorage.getItem(`${storagePrefix()}${sectionId}`);
        return data ? JSON.parse(data) : { score: 0, note: '' };
    } catch (e) {
        console.error(`Error reading section ${sectionId}:`, e);
        return { score: 0, note: '' };
    }
}

// Save section data to localStorage with error handling
function setSectionData(sectionId, data) {
    try {
        localStorage.setItem(
            `${storagePrefix()}${sectionId}`,
            JSON.stringify(data)
        );
        return true;
    } catch (e) {
        console.error(`Error saving section ${sectionId}:`, e);
        return false;
    }
}

// Get all localStorage keys for the active language.
// Note: the English prefix 'sv_' is also a prefix of the Welsh 'sv_cy_', so
// English must explicitly exclude Welsh keys to keep the two data sets isolated
// (otherwise an English reset would delete Welsh progress, and vice versa).
function getAllSectionKeys() {
    const prefix = storagePrefix();
    return Object.keys(localStorage).filter(key => {
        if (!key.startsWith(prefix)) return false;
        if (prefix === 'sv_' && key.startsWith('sv_cy_')) return false;
        return true;
    });
}

// ========================================
// Page Initialization
// ========================================

// Initialize when page content is loaded in Xerte
function initSVEMPage(sectionIds) {
    initSVEMDarkMode();

    if (Array.isArray(sectionIds)) {
        sectionIds.forEach(sectionId => loadSavedData(sectionId));
    }
}

// Save score function
function saveScore(sectionId, score, btn) {
    const data = getSectionData(sectionId);
    data.score = score;
    if (setSectionData(sectionId, data)) {
        updateSectionUI(sectionId, score, btn);
        showToast();
    }
}

// Save note function
function saveNote(sectionId, note) {
    const data = getSectionData(sectionId);
    data.note = note;
    if (setSectionData(sectionId, data)) {
        showToast();
    }
}

// Save "I'm unsure" flag
function saveUnsure(sectionId, isUnsure) {
    const data = getSectionData(sectionId);
    data.unsure = isUnsure;
    setSectionData(sectionId, data);
}

// Update section UI after scoring
function updateSectionUI(sectionId, score, clickedBtn) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const baseLevel = Math.floor(score);

    // Clear ALL active states first
    section.querySelectorAll('.score-btn').forEach(b => b.classList.remove('active'));

    // Only activate the clicked button
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }

    // Highlight the selected level accordion
    section.querySelectorAll('details').forEach(d => {
        d.classList.remove('selected-level');
        const levelMatch = d.className.match(/l(\d)/);
        if (levelMatch) {
            const levelNum = parseInt(levelMatch[1]);
            if (levelNum === baseLevel) {
                d.classList.add('selected-level');
                d.setAttribute('open', '');
            }
        }
    });

    // Update badge
    const badge = document.getElementById(`badge-${sectionId}`);
    if (badge) {
        badge.innerText = `${t('level')} ${score}`;
        badge.classList.add('active');
    }
}

// Helper function to find score button.
// Primary match is the language-independent data-score attribute; the prose
// match is kept only as a fallback for any button missing that attribute.
function findScoreButton(section, score) {
    const buttons = Array.from(section.querySelectorAll('.score-btn'));

    const byData = buttons.find(
        btn => parseFloat(btn.getAttribute('data-score')) === score
    );
    if (byData) return byData;

    return buttons.find(btn => {
        const text = btn.textContent;
        return text.includes(`(${score})`) || text.includes(`Set as Level ${score}`);
    });
}

// Load saved data
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

    // Load unsure checkbox state if present
    const unsureCheckbox = document.getElementById(`unsure-${sectionId}`);
    if (unsureCheckbox && saved.unsure) {
        unsureCheckbox.checked = true;
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        if (message) {
            toast.textContent = message;
        }
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), CONFIG.TOAST_DURATION);
    }
}

// Toggle section function
function toggleSection(sectionId, btn) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const details = section.querySelectorAll('details');

    // Check if any details are currently closed
    const isAnyClosed = Array.from(details).some(d => !d.open);

    details.forEach(d => {
        if (isAnyClosed) {
            d.setAttribute('open', '');
        } else {
            d.removeAttribute('open');
        }
    });

    // Update button text and icon
    if (isAnyClosed) {
        btn.innerHTML = t('collapseAll') + ' <span class="toggle-icon">−</span>';
    } else {
        btn.innerHTML = t('expandAll') + ' <span class="toggle-icon">+</span>';
    }
}

// Calculate progress for themes overview
function calculateThemeProgress(sectionIds) {
    let completed = 0;
    sectionIds.forEach(sectionId => {
        const saved = getSectionData(sectionId);
        if (saved.score > 0) {
            completed++;
        }
    });
    return {
        completed: completed,
        total: sectionIds.length,
        percentage: Math.round((completed / sectionIds.length) * 100)
    };
}

// Update theme card progress (for themes overview page)
function updateThemeCard(themeId, sectionIds) {
    const progress = calculateThemeProgress(sectionIds);
    const card = document.querySelector(`[data-theme-id="${themeId}"]`);

    if (!card) return;

    // Update progress bar
    const progressFill = card.querySelector('.theme-progress__fill');
    if (progressFill) {
        progressFill.style.width = `${progress.percentage}%`;
    }

    // Update progress text
    const progressText = card.querySelector('.theme-progress__text');
    if (progressText) {
        progressText.textContent = t('sectionsCompleted')(progress.completed, progress.total);
    }

    // Update status badge
    const statusBadge = card.querySelector('.status-badge');
    if (statusBadge) {
        statusBadge.classList.remove('status-not-started', 'status-in-progress', 'status-complete');

        if (progress.completed === 0) {
            statusBadge.classList.add('status-not-started');
            statusBadge.textContent = t('notStarted');
            card.classList.remove('in-progress', 'completed');
        } else if (progress.completed === progress.total) {
            statusBadge.classList.add('status-complete');
            statusBadge.textContent = t('complete');
            card.classList.remove('in-progress');
            card.classList.add('completed');
        } else {
            statusBadge.classList.add('status-in-progress');
            statusBadge.textContent = t('inProgress');
            card.classList.remove('completed');
            card.classList.add('in-progress');
        }
    }
}

// Initialize themes overview page
function initThemesOverview() {
    const themesConfig = [
        { themeId: 'theme-1', sectionIds: ['roles', 'training'] },
        { themeId: 'theme-2', sectionIds: ['reps-ssps'] },
        { themeId: 'theme-3', sectionIds: ['mme', 'me', 'nss', 'cupts', 'pres'] }
    ];

    themesConfig.forEach(theme => {
        updateThemeCard(theme.themeId, theme.sectionIds);
    });
}

// ========================================
// Data Management Functions
// ========================================

// Open reset confirmation modal
function resetData() {
    const modal = document.getElementById('reset-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close reset confirmation modal
function closeResetModal() {
    const modal = document.getElementById('reset-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Confirm and execute data reset
function confirmReset() {
    // Clear all sv_ keys
    getAllSectionKeys().forEach(key => localStorage.removeItem(key));

    closeResetModal();
    showToast(t('dataReset'));

    setTimeout(initThemesOverview, CONFIG.CHART_INIT_RETRY);

    setTimeout(() => location.reload(), CONFIG.RELOAD_DELAY);
}

// Normalize import data from different export formats
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

// Import sections into localStorage
function importSections(dataToImport) {
    let importCount = 0;

    Object.entries(dataToImport).forEach(([key, value]) => {
        const sectionId = key.replace(/^sv_(cy_)?/, '');
        let data = typeof value === 'string' ? JSON.parse(value) : value;

        const importValue = {
            score: data.score || 0,
            note: data.note || data.evidence || '',
            unsure: data.unsure || false
        };

        if (setSectionData(sectionId, importValue)) {
            importCount++;
        }
    });

    return importCount;
}

// Process import data
function processImportData(fileContent, input) {
    try {
        const rawData = JSON.parse(fileContent);

        if (typeof rawData !== 'object' || rawData === null) {
            throw new Error('Invalid data format');
        }

        const dataToImport = normalizeImportData(rawData);
        const importCount = importSections(dataToImport);

        showToast(t('imported')(importCount));
        setTimeout(() => location.reload(), CONFIG.RELOAD_DELAY);

    } catch (err) {
        showToast(t('invalidJson'));
        console.error('Import error:', err, '\nFile content:', fileContent);
    } finally {
        input.value = '';
    }
}

// Import data from JSON file
function importData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => processImportData(e.target.result, input);
    reader.onerror = () => showToast(t('readError'));
    reader.readAsText(file);
}

// ========================================
// Navigation Functions
// ========================================

// Navigate to themes overview page
function navigateToThemesOverview(delay = 0) {
    const navigate = () => {
        if (typeof x_navigateToPage === 'function') {
            x_navigateToPage(false, {
                type: 'linkID',
                ID: CONFIG.THEMES_OVERVIEW_PAGE_ID
            });
        }
    };

    setTimeout(navigate, delay);
}

// Save and continue to themes overview
function saveAndContinue() {
    // Save all textareas on the current page
    const textareas = document.querySelectorAll('.evidence-input');
    textareas.forEach(textarea => {
        const sectionId = textarea.id.replace('evidence-', '');
        if (textarea.value && sectionId) {
            saveNote(sectionId, textarea.value);
        }
    });

    showToast(t('progressSaved'));
    navigateToThemesOverview(CONFIG.NAVIGATION_DELAY);
}

// Navigate back to themes overview (without save confirmation)
function backToMenu() {
    navigateToThemesOverview();
}

// ========================================
// Accordion: one level open at a time
// ========================================
$(document).on('click', '.level-group details summary', function() {
    var $details = $(this).closest('details');
    if (!$details.prop('open')) {
        $details.siblings('details').removeAttr('open');
    }
});
