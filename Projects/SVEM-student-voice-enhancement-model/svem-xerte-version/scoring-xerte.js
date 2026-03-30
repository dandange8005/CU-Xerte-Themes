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
// LocalStorage Utility Functions
// ========================================

function applySVEMDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', !!isDark);
    var toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
        toggle.setAttribute('aria-label', isDark ? 'Disable dark mode' : 'Enable dark mode');
        var label = toggle.querySelector('.dark-mode-toggle__label');
        if (label) label.textContent = isDark ? 'Dark' : 'Light';
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
        toggle.setAttribute('aria-label', 'Enable dark mode');
        toggle.innerHTML =
            '<span class="dark-mode-toggle__label">Light</span>' +
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
        const data = localStorage.getItem(`${CONFIG.STORAGE_PREFIX}${sectionId}`);
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
            `${CONFIG.STORAGE_PREFIX}${sectionId}`,
            JSON.stringify(data)
        );
        return true;
    } catch (e) {
        console.error(`Error saving section ${sectionId}:`, e);
        return false;
    }
}

// Get all localStorage keys with sv_ prefix
function getAllSectionKeys() {
    return Object.keys(localStorage)
        .filter(key => key.startsWith(CONFIG.STORAGE_PREFIX));
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
        badge.innerText = `Level ${score}`;
        badge.classList.add('active');
    }
}

// Helper function to find score button
function findScoreButton(section, score) {
    return Array.from(section.querySelectorAll('.score-btn')).find(btn => {
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
        btn.innerHTML = 'Collapse All <span class="toggle-icon">−</span>';
    } else {
        btn.innerHTML = 'Expand All <span class="toggle-icon">+</span>';
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
        progressText.textContent = `${progress.completed} of ${progress.total} sections completed`;
    }

    // Update status badge
    const statusBadge = card.querySelector('.status-badge');
    if (statusBadge) {
        statusBadge.classList.remove('status-not-started', 'status-in-progress', 'status-complete');

        if (progress.completed === 0) {
            statusBadge.classList.add('status-not-started');
            statusBadge.textContent = 'Not Started';
            card.classList.remove('in-progress', 'completed');
        } else if (progress.completed === progress.total) {
            statusBadge.classList.add('status-complete');
            statusBadge.textContent = 'Complete';
            card.classList.remove('in-progress');
            card.classList.add('completed');
        } else {
            statusBadge.classList.add('status-in-progress');
            statusBadge.textContent = 'In Progress';
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
    showToast('All data has been reset');

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
        const sectionId = key.replace(/^sv_/, '');
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

        showToast(`Data imported successfully! (${importCount} sections)`);
        setTimeout(() => location.reload(), CONFIG.RELOAD_DELAY);

    } catch (err) {
        showToast('Error: Invalid JSON file');
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
    reader.onerror = () => showToast('Error: Could not read file');
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

    showToast('Progress saved!');
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
