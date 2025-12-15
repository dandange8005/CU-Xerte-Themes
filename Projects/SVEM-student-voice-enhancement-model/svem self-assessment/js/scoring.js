// SVEM Self-Assessment Scoring JavaScript
// Shared functions for all theme pages

// Save score function
function saveScore(sectionId, score, btn) {
    const currentData = JSON.parse(localStorage.getItem(`sv_${sectionId}`)) || { note: "" };
    currentData.score = score;
    localStorage.setItem(`sv_${sectionId}`, JSON.stringify(currentData));
    updateSectionUI(sectionId, score);
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
function updateSectionUI(sectionId, score) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const baseLevel = Math.floor(score);

    // Reset all buttons in the section
    section.querySelectorAll('.score-btn').forEach(b => b.classList.remove('active'));

    // Find and activate the clicked button
    section.querySelectorAll('.score-btn').forEach(btn => {
        if (btn.textContent.includes(`Level ${score}`) || btn.textContent.includes(`(${score})`)) {
            btn.classList.add('active');
        }
    });

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
        updateSectionUI(sectionId, saved.score);
    }

    // Load note
    if (saved.note) {
        const textarea = document.getElementById(`evidence-${sectionId}`);
        if (textarea) textarea.value = saved.note;
    }
}

// Show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

// Toggle section function
function toggleSection(sectionId, btn) {
    const section = document.getElementById(sectionId);
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
