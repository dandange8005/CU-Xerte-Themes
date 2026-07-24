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

let activeModalTrigger = null;

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

function initSVEMShell() {
    initSVEMDarkMode();
    initSVEMA11y();
}

function initSVEMA11y() {
    document.querySelectorAll('i.fa-solid:not([aria-hidden="true"])').forEach(function (icon) {
        icon.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('.theme-card[onclick]').forEach(function (card) {
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        if (!card.hasAttribute('role')) {
            card.setAttribute('role', 'link');
        }
        if (!card.hasAttribute('data-svem-keyboard-bound')) {
            card.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    card.click();
                }
            });
            card.setAttribute('data-svem-keyboard-bound', 'true');
        }
    });

    document.querySelectorAll('.score-btn').forEach(function (button) {
        if (!button.hasAttribute('aria-pressed')) {
            button.setAttribute('aria-pressed', 'false');
        }
    });

    document.querySelectorAll('.toggle-btn').forEach(function (button) {
        if (!button.hasAttribute('aria-expanded')) {
            button.setAttribute('aria-expanded', 'false');
        }
    });
}

function getVisibleToast() {
    const visibleToast = Array.from(document.querySelectorAll('[data-svem-toast]')).find(function (toast) {
        return toast.offsetParent !== null;
    });

    return visibleToast || document.querySelector('[data-svem-toast]');
}

function getSectionAccessibleName(section) {
    if (!section) return 'This section';

    const heading = section.querySelector('h2, h3');
    if (heading && heading.textContent) {
        return heading.textContent.trim();
    }

    return 'This section';
}

function getFocusableElements(container) {
    if (!container) return [];

    return Array.from(container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(function (element) {
            return !element.disabled && element.getAttribute('aria-hidden') !== 'true' && element.offsetParent !== null;
        });
}

function trapModalFocus(event) {
    const modal = document.getElementById('reset-modal');
    if (!modal || modal.style.display !== 'flex' || event.key !== 'Tab') return;

    const focusable = getFocusableElements(modal);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function handleModalKeydown(event) {
    const modal = document.getElementById('reset-modal');
    if (!modal || modal.style.display !== 'flex') return;

    if (event.key === 'Escape') {
        event.preventDefault();
        closeResetModal();
        return;
    }

    trapModalFocus(event);
}

function initSVEMSections(sectionIds) {
    if (typeof initSVEMPage === 'function') {
        initSVEMPage(sectionIds);
    } else {
        console.error('initSVEMPage function not found - ensure scoring-xerte.js is loaded');
    }
}

function initSVEMVisibilityRefresh(selector, onVisible) {
    if (typeof onVisible !== 'function') return;

    onVisible();

    var target = document.querySelector(selector);
    if (target) {
        var lastVisible = false;
        window._themesOverviewInterval = setInterval(function () {
            var isVisible = target.offsetParent !== null;
            if (isVisible && !lastVisible) {
                onVisible();
            }
            lastVisible = isVisible;
        }, CONFIG.VISIBILITY_CHECK_INTERVAL);
    }

    window.addEventListener('focus', onVisible);
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            onVisible();
        }
    });
}

function escapeSVEMHTML(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildSVEMEvidenceBoxMarkup(sectionId, sectionLabel, placeholder) {
    var safeSectionId = escapeSVEMHTML(sectionId);
    var safeSectionLabel = escapeSVEMHTML(sectionLabel);
    var safePlaceholder = escapeSVEMHTML(placeholder);

    return '' +
        '<label class="evidence-box__label" for="evidence-' + safeSectionId + '">Evidence &amp; Contextual Notes</label>' +
        '<p class="evidence-box__intro"><strong>This context is essential for generating meaningful recommendations.</strong><br />' +
        'Please explain why you selected this level for <strong>' + safeSectionLabel + '</strong>.</p>' +
        '<p class="evidence-box__checklist">Your response should include:<br />' +
        '&#10003; What practices/structures are currently in place?<br />' +
        '&#10003; Why does this represent the level you selected?<br />' +
        '&#10003; What evidence supports this assessment?<br />' +
        '&#10003; If you selected an &quot;in-between&quot; level (e.g., 2.5), what are you doing from each level?<br />' +
        '<em>Be as specific as possible - this context helps us generate tailored recommendations for your school.</em></p>' +
        '<textarea class="evidence-input" id="evidence-' + safeSectionId + '" onchange="saveNote(\'' + safeSectionId + '\', this.value)" placeholder="' + safePlaceholder + '"></textarea>' +
        '<div class="evidence-unsure"><label><input type="checkbox" id="unsure-' + safeSectionId + '" onchange="saveUnsure(\'' + safeSectionId + '\', this.checked)" /> I\'m not confident in my self-reflection for this area</label></div>';
}

function renderSVEMEvidenceBoxes() {
    document.querySelectorAll('.evidence-box[data-section-id]').forEach(function (box) {
        var sectionId = box.getAttribute('data-section-id');
        var sectionLabel = box.getAttribute('data-section-label');
        var placeholder = box.getAttribute('data-placeholder');

        if (!sectionId || !sectionLabel || !placeholder) return;

        box.innerHTML = buildSVEMEvidenceBoxMarkup(sectionId, sectionLabel, placeholder);
    });
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
    initSVEMShell();

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
        const section = document.getElementById(sectionId);
        showToast(getSectionAccessibleName(section) + ' set to Level ' + score);
    }
}

// Save note function
function saveNote(sectionId, note) {
    const data = getSectionData(sectionId);
    data.note = note;
    if (setSectionData(sectionId, data)) {
        const section = document.getElementById(sectionId);
        showToast('Notes saved for ' + getSectionAccessibleName(section));
    }
}

// Save "I'm unsure" flag
function saveUnsure(sectionId, isUnsure) {
    const data = getSectionData(sectionId);
    data.unsure = isUnsure;
    if (setSectionData(sectionId, data)) {
        const section = document.getElementById(sectionId);
        showToast((isUnsure ? 'Marked as not confident for ' : 'Confidence restored for ') + getSectionAccessibleName(section));
    }
}

// Update section UI after scoring
function updateSectionUI(sectionId, score, clickedBtn) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const baseLevel = Math.floor(score);

    // Clear ALL active states first
    section.querySelectorAll('.score-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });

    // Only activate the clicked button
    if (clickedBtn) {
        clickedBtn.classList.add('active');
        clickedBtn.setAttribute('aria-pressed', 'true');
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
    const toast = getVisibleToast();
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
        btn.setAttribute('aria-expanded', 'true');
    } else {
        btn.innerHTML = 'Expand All <span class="toggle-icon">+</span>';
        btn.setAttribute('aria-expanded', 'false');
    }

    initSVEMA11y();
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

function initSVEMThemesOverview() {
    initSVEMShell();
    initSVEMVisibilityRefresh('.themes-overview__actions', initThemesOverview);
}

// ========================================
// Data Management Functions
// ========================================

// Open reset confirmation modal
function resetData() {
    const modal = document.getElementById('reset-modal');
    if (modal) {
        activeModalTrigger = document.activeElement;
        modal.style.display = 'flex';
        const modalBox = modal.querySelector('.modal-box');
        if (modalBox) {
            modalBox.focus();
        } else {
            const focusable = getFocusableElements(modal);
            if (focusable.length) {
                focusable[0].focus();
            }
        }
    }
}

// Close reset confirmation modal
function closeResetModal() {
    const modal = document.getElementById('reset-modal');
    if (modal) {
        modal.style.display = 'none';
        if (activeModalTrigger && typeof activeModalTrigger.focus === 'function') {
            activeModalTrigger.focus();
        }
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

    showToast('Importing assessment data');

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

document.addEventListener('keydown', handleModalKeydown);
