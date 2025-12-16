# Theme 1 Page - Xerte XOT Implementation

## Page Settings

- **Page Type:** Plain Text or Bootstrap
- **Page Name:** Theme 1: Structures Supporting Student Voice
- **Page Order:** 3 (after Themes Overview)

---

## SECTION 1: HTML Content (for `#pageContents` or main editor)

Copy and paste this into your Xerte page's main content area:

```html
<div class="theme-page-container">
    <main class="main-content">
        <header>
            <span class="theme-label">Theme 1</span>
            <h2>Structures Supporting Student Voice Activity</h2>
            <p class="theme-description">
                Establishing clear roles, committees, and timelines to embed student voice into the school's culture.
            </p>
        </header>

        <!-- SUBSECTION 1: Roles and Structures -->
        <section id="roles">
            <div class="section-header-wrapper">
                <h3>Roles and Structures</h3>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span id="badge-roles" class="score-badge">Not Scored</span>
                    <button class="toggle-btn" onclick="toggleSection('roles', this)" type="button">
                        Expand All <span class="toggle-icon">+</span>
                    </button>
                </div>
            </div>

            <div class="level-group">

                <!-- Level 1 -->
                <details class="l1">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 1</span>
                            <span class="level-title">Moving towards Baseline</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>There are currently no clear Student Voice structures in place and/or no defined Student Voice roles within the School.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('roles', 1, this)" type="button">Set as Level 1</button>
                            <button class="score-btn" onclick="saveScore('roles', 1.5, this)" type="button">Transitioning to Level 2 (1.5)</button>
                        </div>
                    </div>
                </details>

                <!-- Level 2 -->
                <details class="l2">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 2</span>
                            <span class="level-title">Baseline Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>Student Voice roles are assigned within Schools. (At a minimum, these include a Student Rep Coordinator, Survey Contact and an Academic Student Voice Lead).</li>
                            <li>There is student representation on all appropriate School committees (ESEC, BoS etc.) and at College Forums.</li>
                            <li>Student Voice staff are aware of the Student Voice Framework (SVF).</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('roles', 2, this)" type="button">Set as Level 2</button>
                            <button class="score-btn" onclick="saveScore('roles', 2.5, this)" type="button">Transitioning to Level 3 (2.5)</button>
                        </div>
                    </div>
                </details>

                <!-- Level 3 -->
                <details class="l3">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 3</span>
                            <span class="level-title">Emerging Good Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>Student Voice role descriptions are understood and staff support in Student Voice practices within Schools.</li>
                            <li>Student Voice is discussed in ESEC / BoS / other appropriate School committees.</li>
                            <li>The SVF principles are acknowledged when creating Student Voice plans for the year.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('roles', 3, this)" type="button">Set as Level 3</button>
                            <button class="score-btn" onclick="saveScore('roles', 3.5, this)" type="button">Transitioning to Level 4 (3.5)</button>
                        </div>
                    </div>
                </details>

                <!-- Level 4 -->
                <details class="l4">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 4</span>
                            <span class="level-title">Established Strong Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>The School utilises the SVF principles if considering/creating additional Student Voice roles.</li>
                            <li>There are regular meetings between Student Voice staff within the School.</li>
                            <li>The School has identified and shared good Student Voice practice between School staff.</li>
                            <li>Student Voice is a rolling agenda item at ESEC, BoS and other appropriate committees.</li>
                            <li>The School has a clear Student Voice timeline for the academic year and this is communicated to staff and students.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('roles', 4, this)" type="button">Set as Level 4</button>
                            <button class="score-btn" onclick="saveScore('roles', 4.5, this)" type="button">Transitioning to Level 5 (4.5)</button>
                        </div>
                    </div>
                </details>

                <!-- Level 5 -->
                <details class="l5">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 5</span>
                            <span class="level-title">Exceptional Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>The School has identified areas for long-term enhancement, and a Student Voice strategy is in development.</li>
                            <li>Student Voice staff are involved in evaluating School level Student Voice mechanisms and lead/support the implementation of learnings into action plans.</li>
                            <li>Students are invited to actively contribute to all School Student Voice activity.</li>
                            <li>All School staff are encouraged to engage in Student Voice discussions (Away Days, Teaching Plenaries etc.).</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('roles', 5, this)" type="button">Set as Level 5</button>
                        </div>
                    </div>
                </details>

            </div>

            <!-- Evidence Box -->
            <div class="evidence-box">
                <label for="evidence-roles" style="font-weight:600; font-size:0.9rem; display:block; margin-bottom:0.5rem;">Evidence & Contextual Notes</label>
                <textarea id="evidence-roles" class="evidence-input"
                    placeholder="Describe your current practice and why you selected this level..."
                    onchange="saveNote('roles', this.value)"></textarea>
            </div>
        </section>

        <!-- SUBSECTION 2: SV Training -->
        <section id="training">
            <div class="section-header-wrapper">
                <h3>SV Training, Development, and Dissemination</h3>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span id="badge-training" class="score-badge">Not Scored</span>
                    <button class="toggle-btn" onclick="toggleSection('training', this)" type="button">
                        Expand All <span class="toggle-icon">+</span>
                    </button>
                </div>
            </div>

            <div class="level-group">

                <details class="l1">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 1</span>
                            <span class="level-title">Moving towards Baseline</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>The School provides no opportunity for staff to engage with Student Voice and engagement CPD.</li>
                            <li>Central Student Voice and engagement updates and opportunities are not circulated by email recipients.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('training', 1, this)" type="button">Set as Level 1</button>
                            <button class="score-btn" onclick="saveScore('training', 1.5, this)" type="button">Transitioning to Level 2 (1.5)</button>
                        </div>
                    </div>
                </details>

                <details class="l2">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 2</span>
                            <span class="level-title">Baseline Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>Key/appropriate Student Voice contacts within the School are members of the Student Voice and Experience Network (SVEN) Teams channel.</li>
                            <li>Student Voice staff disseminate Central Student Voice and Engagement updates and CPD opportunities to appropriate staff.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('training', 2, this)" type="button">Set as Level 2</button>
                            <button class="score-btn" onclick="saveScore('training', 2.5, this)" type="button">Transitioning to Level 3 (2.5)</button>
                        </div>
                    </div>
                </details>

                <details class="l3">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 3</span>
                            <span class="level-title">Emerging Good Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>Student Voice staff within the School occasionally engage with SVEN and SVEN meetings.</li>
                            <li>School encourages and creates opportunities for Student Voice staff to engage with Student Voice and Engagement CPD.</li>
                            <li>All School staff are aware of SVEN.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('training', 3, this)" type="button">Set as Level 3</button>
                            <button class="score-btn" onclick="saveScore('training', 3.5, this)" type="button">Transitioning to Level 4 (3.5)</button>
                        </div>
                    </div>
                </details>

                <details class="l4">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 4</span>
                            <span class="level-title">Established Strong Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>School Student Voice staff regularly contribute to SVEN via Teams and meetings.</li>
                            <li>School Student Voice staff engage in ongoing Student Voice and Engagement CPD opportunities.</li>
                            <li>School provides opportunities for, and encourages, all staff to engage with Student Voice and Engagement CPD.</li>
                            <li>Student Voice staff identify Student Voice collaboration opportunities with other Schools.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('training', 4, this)" type="button">Set as Level 4</button>
                            <button class="score-btn" onclick="saveScore('training', 4.5, this)" type="button">Transitioning to Level 5 (4.5)</button>
                        </div>
                    </div>
                </details>

                <details class="l5">
                    <summary>
                        <div class="level-header">
                            <span class="level-number">Level 5</span>
                            <span class="level-title">Exceptional Practice</span>
                        </div>
                    </summary>
                    <div class="content-body">
                        <ul>
                            <li>School Student Voice staff deliver Student Voice and Engagement CPD to other staff, both within their School and across the College.</li>
                            <li>School Student Voice staff present in SVEN meetings, sharing School best practice and Student Voice partnership opportunities.</li>
                            <li>School Student Voice staff engage in Student Voice collaboration and partnership opportunities with other Schools.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('training', 5, this)" type="button">Set as Level 5</button>
                        </div>
                    </div>
                </details>

            </div>

            <!-- Evidence Box -->
            <div class="evidence-box">
                <label for="evidence-training" style="font-weight:600; font-size:0.9rem; display:block; margin-bottom:0.5rem;">Evidence & Contextual Notes</label>
                <textarea id="evidence-training" class="evidence-input"
                    placeholder="Describe your current practice and why you selected this level..."
                    onchange="saveNote('training', this.value)"></textarea>
            </div>
        </section>

        <!-- Navigation -->
        <div class="page-navigation">
            <button class="btn-secondary" onclick="x_navigateToPage(x_currentPageXML, x_currentPage - 1, true)" type="button">← Back to Themes</button>
            <button class="btn-primary" onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)" type="button">Next: Theme 2 →</button>
        </div>

    </main>
</div>

<!-- Toast Notification -->
<div id="toast">Changes Saved</div>
```

---

## SECTION 2: JavaScript (Optional Properties → Script)

Add this to your page's Optional Properties → Script section:

```javascript
// Initialize Theme 1 page
// Assumes scoring-xerte.js is loaded globally

// Load saved data for both sections in this theme
if (typeof initSVEMPage === 'function') {
    initSVEMPage(['roles', 'training']);
} else {
    console.error('initSVEMPage function not found - ensure scoring-xerte.js is loaded');
}
```

---

## SECTION 3: CSS (Already loaded globally)

No page-specific CSS needed if you've already loaded `custom.css` globally.

---

## Implementation Checklist

- [ ] `scoring-xerte.js` loaded globally
- [ ] `custom.css` loaded globally
- [ ] Create page in Xerte
- [ ] Copy HTML content
- [ ] Add JavaScript to Optional Properties
- [ ] Test all functionality

---

**Created:** 2024-12-16
