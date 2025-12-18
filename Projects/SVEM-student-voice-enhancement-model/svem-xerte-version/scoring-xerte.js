// SVEM Self-Assessment Scoring JavaScript - XERTE COMPATIBLE VERSION
// Shared functions for all theme pages in Xerte Online Toolkits

// Initialize when page content is loaded in Xerte
function initSVEMPage(sectionIds) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadAllSections(sectionIds);
        });
    } else {
        loadAllSections(sectionIds);
    }
}

// Load all sections for a page
function loadAllSections(sectionIds) {
    if (Array.isArray(sectionIds)) {
        sectionIds.forEach(sectionId => loadSavedData(sectionId));
    }
}

// Save score function
function saveScore(sectionId, score, btn) {
    const currentData = JSON.parse(localStorage.getItem(`sv_${sectionId}`)) || { note: "" };
    currentData.score = score;
    localStorage.setItem(`sv_${sectionId}`, JSON.stringify(currentData));
    updateSectionUI(sectionId, score, btn);
    showToast();
}

// Save note function
function saveNote(sectionId, note) {
    const currentData = JSON.parse(localStorage.getItem(`sv_${sectionId}`)) || { score: 0 };
    currentData.note = note;
    localStorage.setItem(`sv_${sectionId}`, JSON.stringify(currentData));
    showToast();
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

// Load saved data
function loadSavedData(sectionId) {
    const saved = JSON.parse(localStorage.getItem(`sv_${sectionId}`));
    if (!saved) return;

    // Load score
    if (saved.score > 0) {
        // Find the button that matches this score
        const section = document.getElementById(sectionId);
        if (!section) return;

        const matchingBtn = Array.from(section.querySelectorAll('.score-btn')).find(btn => {
            const text = btn.textContent;
            // First try exact match with parentheses for transitional scores (e.g., "(4.5)")
            if (text.includes(`(${saved.score})`)) return true;
            // For whole number scores, match "Set as Level X" (not "Transitioning to Level X")
            if (text.includes(`Set as Level ${saved.score}`)) return true;
            return false;
        });
        updateSectionUI(sectionId, saved.score, matchingBtn);
    }

    // Load note
    if (saved.note) {
        const textarea = document.getElementById(`evidence-${sectionId}`);
        if (textarea) textarea.value = saved.note;
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
        setTimeout(() => toast.classList.remove('show'), 2000);
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
        const saved = JSON.parse(localStorage.getItem(`sv_${sectionId}`));
        if (saved && saved.score > 0) {
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
        { themeId: 'theme-3', sectionIds: ['mme', 'me', 'nss', 'pg'] }
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
    // Clear all localStorage data with sv_ prefix
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sv_')) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));

    // Close modal
    closeResetModal();

    // Show confirmation toast
    showToast('All data has been reset');

    // Refresh themes overview if on that page
    if (typeof initThemesOverview === 'function') {
        setTimeout(() => {
            initThemesOverview();
        }, 100);
    }

    // Reload page to reflect changes
    setTimeout(() => {
        location.reload();
    }, 1500);
}

// Import data from JSON file
function importData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const rawData = JSON.parse(e.target.result);

            // Validate that it's an object
            if (typeof rawData !== 'object' || rawData === null) {
                throw new Error('Invalid data format');
            }

            let dataToImport = {};

            // Check if this is the summary page export format (with metadata and assessmentData)
            if (rawData.metadata && rawData.assessmentData) {
                console.log('Detected summary page export format');
                // Extract data from assessmentData and convert to localStorage format
                Object.keys(rawData.assessmentData).forEach(key => {
                    const item = rawData.assessmentData[key];
                    dataToImport[key] = {
                        score: item.score || 0,
                        note: item.evidence || '' // Map 'evidence' to 'note'
                    };
                });
            }
            // Check if this is the simple export format (direct key-value pairs)
            else {
                console.log('Detected simple export format');
                dataToImport = rawData;
            }

            // Import data to localStorage
            let importCount = 0;
            Object.keys(dataToImport).forEach(key => {
                // Skip metadata or other non-section keys
                if (key === 'metadata' || key === 'assessmentData') {
                    return;
                }

                // Add sv_ prefix if not present
                const storageKey = key.startsWith('sv_') ? key : `sv_${key}`;

                // Ensure the data has the correct structure
                let dataValue = dataToImport[key];

                // If it's already a string, parse it
                if (typeof dataValue === 'string') {
                    try {
                        dataValue = JSON.parse(dataValue);
                    } catch (e) {
                        console.warn(`Could not parse value for ${key}:`, dataValue);
                    }
                }

                // Ensure we have score and note fields
                const importValue = {
                    score: dataValue.score || 0,
                    note: dataValue.note || dataValue.evidence || ''
                };

                localStorage.setItem(storageKey, JSON.stringify(importValue));
                importCount++;
            });

            showToast(`Data imported successfully! (${importCount} sections)`);

            // Refresh the page after a short delay
            setTimeout(() => {
                location.reload();
            }, 1500);

        } catch (err) {
            showToast('Error: Invalid JSON file');
            console.error('Import error:', err);
            console.error('File content:', e.target.result);
        }
    };

    reader.readAsText(file);

    // Reset file input
    input.value = '';
}

// Export data to JSON file
function downloadJSON() {
    const exportData = {};

    // Collect all sv_ prefixed data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sv_')) {
            const cleanKey = key.replace('sv_', '');
            const value = localStorage.getItem(key);
            try {
                exportData[cleanKey] = JSON.parse(value);
            } catch (e) {
                exportData[cleanKey] = value;
            }
        }
    }

    // Create download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    const date = new Date().toISOString().slice(0, 10);
    a.download = `svem_assessment_data_${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToast('Data exported successfully!');
}

// ========================================
// Navigation Functions
// ========================================

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

    // Show confirmation
    showToast('Progress saved!');

    // Navigate back to themes overview (page 3)
    setTimeout(() => {
        if (typeof x_navigateToPage === 'function') {
            x_navigateToPage(false, {type:'linkID', ID:'PG1765898999143'});
        }
    }, 500);
}

// Navigate back to themes overview (without save confirmation)
function backToMenu() {
    if (typeof x_navigateToPage === 'function') {
        x_navigateToPage(false, {type:'linkID', ID:'PG1765898999143'});
    }
}

