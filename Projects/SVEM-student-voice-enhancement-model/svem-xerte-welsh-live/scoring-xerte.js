// SVEM Self-Assessment Scoring JavaScript - XERTE COMPATIBLE VERSION (CYMRAEG / WELSH)
// Shared functions for all theme pages in Xerte Online Toolkits
//
// WELSH BUILD NOTES (svem-xerte-welsh-live):
//  - Derived verbatim from svem-xerte-live/scoring-xerte.js; ONLY the storage
//    prefix and user-facing strings were translated. Logic is unchanged.
//  - STORAGE_PREFIX is 'sv_cy_' so Welsh assessment data lives in its own
//    localStorage namespace, separate from the English tool ('sv_').
//  - findScoreButton() matches the Welsh button label "Gosod fel Lefel N".
//  - THEMES_OVERVIEW_PAGE_ID and every x_navigateToPage(...ID:'PG...') in the
//    PAGES point at the ENGLISH resource's page IDs. When the Welsh resource is
//    built in Xerte it will have its OWN page IDs — update them then.
//    (See TRANSLATION-QUERIES-LIVE.md.)

// Configuration Constants
const CONFIG = {
    STORAGE_PREFIX: 'sv_cy_',
    DARK_MODE_KEY: 'svem-dark-mode',
    THEMES_OVERVIEW_PAGE_ID: 'PG1765898999143', // TODO: set to Welsh resource's themes-overview page ID
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
        toggle.setAttribute('aria-label', isDark ? 'Analluogi modd tywyll' : 'Galluogi modd tywyll');
        var label = toggle.querySelector('.dark-mode-toggle__label');
        if (label) label.textContent = isDark ? 'Tywyll' : 'Golau';
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
        toggle.setAttribute('aria-label', 'Galluogi modd tywyll');
        toggle.innerHTML =
            '<span class="dark-mode-toggle__label">Golau</span>' +
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
    if (!section) return 'Yr adran hon';

    const heading = section.querySelector('h2, h3');
    if (heading && heading.textContent) {
        return heading.textContent.trim();
    }

    return 'Yr adran hon';
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
        '<label class="evidence-box__label" for="evidence-' + safeSectionId + '">Tystiolaeth a Nodiadau Cyd-destunol</label>' +
        '<p class="evidence-box__intro"><strong>Mae\'r cyd-destun hwn yn hanfodol ar gyfer creu argymhellion ystyrlon.</strong><br />' +
        'Eglurwch pam y gwnaethoch chi ddewis y lefel hon ar gyfer <strong>' + safeSectionLabel + '</strong>.</p>' +
        '<p class="evidence-box__checklist">Dylai eich ymateb gynnwys:<br />' +
        '&#10003; Pa arferion/strwythurau sydd ar waith ar hyn o bryd?<br />' +
        '&#10003; Pam mae hyn yn cynrychioli\'r lefel a ddewisoch chi?<br />' +
        '&#10003; Pa dystiolaeth sy\'n cefnogi\'r asesiad hwn?<br />' +
        '&#10003; Os dewisoch chi lefel &quot;rhwng&quot; (e.e., 2.5), beth ydych chi\'n ei wneud o bob lefel?<br />' +
        '<em>Byddwch mor benodol â phosibl - mae\'r cyd-destun hwn yn ein helpu i greu argymhellion wedi\'u teilwra ar gyfer eich ysgol.</em></p>' +
        '<textarea class="evidence-input" id="evidence-' + safeSectionId + '" onchange="saveNote(\'' + safeSectionId + '\', this.value)" placeholder="' + safePlaceholder + '"></textarea>' +
        '<div class="evidence-unsure"><label><input type="checkbox" id="unsure-' + safeSectionId + '" onchange="saveUnsure(\'' + safeSectionId + '\', this.checked)" /> Nid wyf yn hyderus yn fy sgiliau hunanfyfyrio ar gyfer y maes hwn</label></div>';
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

// Get all localStorage keys with the (Welsh) sv_cy_ prefix
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
        showToast(getSectionAccessibleName(section) + ' wedi\'i osod i Lefel ' + score);
    }
}

// Save note function
function saveNote(sectionId, note) {
    const data = getSectionData(sectionId);
    data.note = note;
    if (setSectionData(sectionId, data)) {
        const section = document.getElementById(sectionId);
        showToast('Nodiadau wedi\'u cadw ar gyfer ' + getSectionAccessibleName(section));
    }
}

// Save "I'm unsure" flag
function saveUnsure(sectionId, isUnsure) {
    const data = getSectionData(sectionId);
    data.unsure = isUnsure;
    if (setSectionData(sectionId, data)) {
        const section = document.getElementById(sectionId);
        showToast((isUnsure ? 'Wedi\'i nodi\'n ansicr ar gyfer ' : 'Hyder wedi\'i adfer ar gyfer ') + getSectionAccessibleName(section));
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
        badge.innerText = `Lefel ${score}`;
        badge.classList.add('active');
    }
}

// Helper function to find score button (matches Welsh button label "Gosod fel Lefel N")
function findScoreButton(section, score) {
    return Array.from(section.querySelectorAll('.score-btn')).find(btn => {
        const text = btn.textContent;
        return text.includes(`(${score})`) || text.includes(`Gosod fel Lefel ${score}`);
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
        btn.innerHTML = 'Crebachu Popeth <span class="toggle-icon">−</span>';
        btn.setAttribute('aria-expanded', 'true');
    } else {
        btn.innerHTML = 'Ehangu Popeth <span class="toggle-icon">+</span>';
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
        progressText.textContent = `${progress.completed} o ${progress.total} adran wedi'u cwblhau`;
    }

    // Update status badge
    const statusBadge = card.querySelector('.status-badge');
    if (statusBadge) {
        statusBadge.classList.remove('status-not-started', 'status-in-progress', 'status-complete');

        if (progress.completed === 0) {
            statusBadge.classList.add('status-not-started');
            statusBadge.textContent = 'Heb Ddechrau';
            card.classList.remove('in-progress', 'completed');
        } else if (progress.completed === progress.total) {
            statusBadge.classList.add('status-complete');
            statusBadge.textContent = 'Wedi\'i Gwblhau';
            card.classList.remove('in-progress');
            card.classList.add('completed');
        } else {
            statusBadge.classList.add('status-in-progress');
            statusBadge.textContent = 'Ar y Gweill';
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
    // Clear all sv_cy_ keys
    getAllSectionKeys().forEach(key => localStorage.removeItem(key));

    closeResetModal();
    showToast('Mae\'r holl ddata wedi\'i ailosod');

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

        showToast(`Data wedi'i fewnforio'n llwyddiannus! (${importCount} adran)`);
        setTimeout(() => location.reload(), CONFIG.RELOAD_DELAY);

    } catch (err) {
        showToast('Gwall: Ffeil JSON annilys');
        console.error('Import error:', err, '\nFile content:', fileContent);
    } finally {
        input.value = '';
    }
}

// Import data from JSON file
function importData(input) {
    const file = input.files[0];
    if (!file) return;

    showToast('Yn mewnforio data\'r asesiad');

    const reader = new FileReader();
    reader.onload = (e) => processImportData(e.target.result, input);
    reader.onerror = () => showToast('Gwall: Methu darllen y ffeil');
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

    showToast('Cynnydd wedi\'i gadw!');
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
