# Theme 2 Page - Xerte XOT Implementation

## Page Settings

- **Page Type:** Plain Text or Bootstrap
- **Page Name:** Theme 2: Student Reps and SSPs
- **Page Order:** 4 (after Theme 1)

---

## SECTION 1: HTML Content (for `#pageContents` or main editor)

Copy and paste this into your Xerte page's main content area:

```html
<div class="theme-page-container">
    <main class="main-content">
        <header>
            <span class="theme-label">Theme 2</span>
            <h2>Student Reps and Student-Staff Panels (SSPs)</h2>
            <p class="theme-description">
                Supporting student representatives and establishing effective Student-Staff Panel mechanisms.
            </p>
        </header>

        <!-- SUBSECTION: Student Reps and SSPs -->
        <section id="reps-ssps">
            <div class="section-header-wrapper">
                <h3>Student Reps and Student-Staff Panels</h3>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span id="badge-reps-ssps" class="score-badge">Not Scored</span>
                    <button class="toggle-btn" onclick="toggleSection('reps-ssps', this)" type="button">
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
                            <li>The School does not yet have a formal Student-Staff Panel (SSP) system or a process for recruitment of Student Reps.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('reps-ssps', 1, this)" type="button">Set as Level 1</button>
                            <button class="score-btn" onclick="saveScore('reps-ssps', 1.5, this)" type="button">Transitioning to Level 2 (1.5)</button>
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
                            <li>The School promotes the Rep System and facilitates the recruitment of Reps.</li>
                            <li>School achieves minimum of one Student Rep per cohort.</li>
                            <li>School provides Reps with the opportunity to become a Chair and Vice Chair.</li>
                            <li>School utilises templates on Student Voice and Experience Network (SVEN) to update Rep lists, deliver the Rep workshop(s), and upload SSP Actions and Key Decisions/minutes and summary sheets.</li>
                            <li>Actions and Key Decisions (AKDs) / minutes and summary sheet are uploaded onto SVEN no later than the end of term.</li>
                            <li>The School organise for AKDs to be shared with Student Reps within ten working days of the SSP.</li>
                            <li>The feedback loop is closed with Student Reps at the following SSP.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('reps-ssps', 2, this)" type="button">Set as Level 2</button>
                            <button class="score-btn" onclick="saveScore('reps-ssps', 2.5, this)" type="button">Transitioning to Level 3 (2.5)</button>
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
                            <li>The School encourages Student Reps to participate in Student Union Rep training.</li>
                            <li>There is a minimum of two Student Reps per cohort.</li>
                            <li>An SSP Chair and Vice Chair have been elected and the School support them in their roles.</li>
                            <li>School Student Voice staff and Student Reps are aware of each other's roles.</li>
                            <li>SSP membership is formalised as per Student Union guidance and attendance is consistent.</li>
                            <li>The School supports Student Reps to communicate Actions and Key Decisions (AKDs) to whole cohorts.</li>
                            <li>School consistently closes the feedback loop with Student Reps and begins to establish processes for closing the feedback loop with whole cohorts.</li>
                            <li>Where appropriate, the School updates changing Student Rep details on the Student Voice and Experience Network (SVEN).</li>
                            <li>The School offers Student Reps the opportunity to continue in their role for the following academic year.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('reps-ssps', 3, this)" type="button">Set as Level 3</button>
                            <button class="score-btn" onclick="saveScore('reps-ssps', 3.5, this)" type="button">Transitioning to Level 4 (3.5)</button>
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
                            <li>The School proactively promotes Student Reps as a Student Voice mechanism to student cohorts.</li>
                            <li>Schools are working towards achieving Student Union ratio of 1:40 (Reps:students) for larger cohorts.</li>
                            <li>Returning Student Reps support in the facilitation of the School Student Rep workshop.</li>
                            <li>Rep names/photos are displayed in appropriate student areas (on campus and/or online).</li>
                            <li>Key School staff are equipped to signpost students to their appropriate Student Reps.</li>
                            <li>School facilitates ongoing and open communication with Student Reps in between formal meetings.</li>
                            <li>School have an established process for Closing the Feedback Loop with whole cohorts, including sharing feedback with Student Voice Communication Officers.</li>
                            <li>School informs Student Reps about ongoing Student Voice opportunities e.g. ESLAs, surveys, Speak Week.</li>
                            <li>Before the end of the current Academic Year, Schools promote Student Rep opportunities for the upcoming year.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('reps-ssps', 4, this)" type="button">Set as Level 4</button>
                            <button class="score-btn" onclick="saveScore('reps-ssps', 4.5, this)" type="button">Transitioning to Level 5 (4.5)</button>
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
                            <li>School achieve Student Union ratio of 1:40 (Rep:students).</li>
                            <li>School are providing opportunities for Student Voice staff, Reps and students to network and share changes/enhancements made as a result of Student Voice feedback.</li>
                            <li>School staff and Reps collaborate on Student Voice/Engagement projects and enhancements beyond the SSP mechanism.</li>
                            <li>School promotes further opportunities to Reps – i.e. conferences/events.</li>
                            <li>School provides meaningful and consistent reward and recognition initiatives for Student Reps.</li>
                            <li>Facilitate further student representation that occurs outside of meetings such as one-to-one sessions discussion boards or online approaches. This could also include 'Town Hall Meetings' and the College Forum.</li>
                        </ul>
                        <div class="scoring-actions">
                            <button class="score-btn" onclick="saveScore('reps-ssps', 5, this)" type="button">Set as Level 5</button>
                        </div>
                    </div>
                </details>

            </div>

            <!-- Evidence Box -->
            <div class="evidence-box">
                <label for="evidence-reps-ssps" style="font-weight:600; font-size:0.9rem; display:block; margin-bottom:0.5rem;">Evidence & Contextual Notes</label>
                <textarea id="evidence-reps-ssps" class="evidence-input"
                    placeholder="Describe your current practice and why you selected this level..."
                    onchange="saveNote('reps-ssps', this.value)"></textarea>
            </div>
        </section>

        <!-- Navigation -->
        <div class="page-navigation">
            <button class="btn-secondary" onclick="x_navigateToPage(x_currentPageXML, x_currentPage - 1, true)" type="button">← Previous: Theme 1</button>
            <button class="btn-primary" onclick="x_navigateToPage(x_currentPageXML, x_currentPage + 1, true)" type="button">Next: Theme 3 →</button>
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
// Initialize Theme 2 page
// Assumes scoring-xerte.js is loaded globally

// Load saved data for this theme's section
if (typeof initSVEMPage === 'function') {
    initSVEMPage(['reps-ssps']);
} else {
    console.error('initSVEMPage function not found - ensure scoring-xerte.js is loaded');
}
```

---

## SECTION 3: CSS (Already loaded globally)

No page-specific CSS needed if you've already loaded `custom.css` globally in Optional Properties → Stylesheet.

If you haven't loaded the global CSS yet, add this to your **Project's** Optional Properties → Stylesheet (NOT page-level):

```css
/* Copy entire contents of ../svem-self-assessment/css/custom.css here */
```

---

## Implementation Checklist

Before creating this page:
- [ ] Ensure `scoring-xerte.js` is loaded globally
- [ ] Ensure `custom.css` is loaded globally
- [ ] Note the correct page number for navigation

When creating this page:
- [ ] Create new page in Xerte (Plain Text or Bootstrap type)
- [ ] Copy HTML content into main editor
- [ ] Add JavaScript to Optional Properties → Script
- [ ] Save and test

After creating:
- [ ] Test scoring buttons work
- [ ] Test evidence textarea saves
- [ ] Test navigation to previous/next pages
- [ ] Test data persistence (score, reload page, check score is still there)
- [ ] Test progress updates on overview page

---

## Testing

1. **Score a level** - Click "Set as Level 3" button
   - Badge should update to "Level 3"
   - Button should become active (blue background)
   - Toast notification should appear
   - Selected accordion should highlight

2. **Add evidence** - Type in evidence textarea
   - Toast should appear when you change focus
   - Text should save automatically

3. **Navigate away and back**
   - Go to previous page
   - Return to this page
   - Score and evidence should still be there

4. **Check progress**
   - Navigate to Themes Overview page
   - Theme 2 card should show "1 of 1 sections completed"
   - Status badge should show "Complete"
   - Progress bar should be at 100%

---

## Troubleshooting

### Buttons don't work
**Check:** JavaScript console for errors
**Fix:** Ensure `scoring-xerte.js` is loaded globally

### Toast doesn't appear
**Check:** `<div id="toast">` is present in HTML
**Fix:** Make sure global CSS includes toast styles

### Data doesn't save
**Check:** Browser console for localStorage errors
**Fix:** Ensure not in private/incognito mode

### Styles look wrong
**Check:** `custom.css` is loaded in Optional Properties
**Fix:** Load CSS globally or check for syntax errors

---

## Next: Theme 3

After completing Theme 2, create Theme 3 following the same pattern with section IDs: `['mme', 'me', 'nss', 'pg']`

---

**Created:** 2024-12-16
