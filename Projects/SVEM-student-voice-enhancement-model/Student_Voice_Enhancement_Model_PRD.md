# Product Requirements Document (PRD)
## Student Voice Enhancement Model - Digital Platform

**Version:** 1.0  
**Date:** 12 December 2024  
**Project Owner:** Nan (Student Voice & Partnership Team)  
**Technical Lead:** Clover (Learning & Teaching Academy)  
**Target Launch:** End of February 2025

---

## Executive Summary

### Project Overview
Transform Cardiff University's Student Voice Enhancement Model from a PDF-based framework into an interactive digital platform that enables schools to self-assess their student voice practices and receive personalized enhancement recommendations integrated with institutional Review and Enhancement (RE) planning.

### Key Deliverables
- Interactive model interface with collapsible sections
- Self-assessment scoring system (1-5 scale with 0.5 increments)
- Contextual feedback collection
- Automated enhancement report generation
- Bilingual English/Welsh content
- Integrated resource library
- Progress tracking

### Strategic Value
- Reduces staff time per school engagement by 50%
- Connects student voice activity to institutional quality processes
- Provides scalable, sustainable tool for 24 schools
- Enables ongoing reflection vs. one-off workshop dependency

---

## Project Background

### Current State
**The Model:** 7-area framework assessing student voice practices across 5 maturity levels
- Areas: Roles/Structures, Training/Development, Student Reps/SSPs, Mid-Module Enhancement, End-Module Enhancement, NSS, PG Surveys
- Levels: 1-Moving towards Baseline, 2-Baseline, 3-Emerging Good, 4-Established Strong, 5-Exceptional

**Pain Points:**
- Large PDF difficult to navigate
- Manual workshop delivery not scalable
- Paper-based scoring inefficient
- No connection to RE planning processes
- Risk of one-off engagement without follow-up

### Strategic Context
- Model paused ~1 year due to staffing, now being revitalized
- Professional services realignment & academic futures restructure underway
- Opportunity to embed tool in institutional quality processes
- 24 schools currently (likely reducing to ~16 post-restructure)

---

## Project Goals & Success Criteria

### Primary Objectives
1. **Accessibility:** Transform complex PDF into intuitive, mobile-responsive interface
2. **Meaningful Assessment:** Enable genuine self-reflection with flexible scoring
3. **Actionable Outputs:** Generate personalized recommendations linked to RE planning
4. **Sustainable Delivery:** Reduce team resource requirements while increasing reach
5. **Partnership:** Include student voice in assessment process

### Success Metrics

**Launch (Feb 2025):**
- System live, WCAG 2.1 AA compliant
- Zero critical bugs
- Complete bilingual content
- Enhancement reports deliverable (auto or manual)

**6 Months:**
- 12+ schools complete assessment
- 80% user satisfaction rating
- 50% of schools include student voice actions in RE plans
- 50% reduction in team time per school

**Long-term:**
- All schools complete annual assessment
- Measurable improvement in practice levels
- Active resource library with user contributions
- Cross-school collaboration initiatives

---

## Scope Definition

### Phase 1: Core Platform (Feb 2025) - MUST HAVE

✅ **Interactive Model Display**
- Complete framework content with expandable sections
- Responsive design (desktop/tablet/mobile)
- Bilingual EN/CY throughout

✅ **Self-Assessment**
- Scoring system with 0.5 increments
- Contextual feedback text boxes
- Progress tracking
- Save/resume functionality (if technically feasible)

✅ **Enhancement Reports**
- Automated or semi-automated generation
- Gap analysis (current → next level)
- Specific recommendations from model content
- Resource links embedded
- RE plan format compatible

✅ **Resource Integration**
- Minimum 20 resources (templates, guides, case studies)
- Searchable library
- Bilingual resources

### Phase 2: Enhanced Features (Post-Launch)

⏸️ **Future Considerations:**
- Assessment history & comparison
- Multiple contributors per school assessment
- Student input mechanism
- Cross-school benchmarking
- Gamification elements
- Video tutorials
- Advanced analytics dashboard

### Out of Scope - Phase 1
❌ Real-time collaboration, mobile apps, automated notifications, external system integrations beyond Learning Central

---

## User Analysis

### Primary User Groups

**1. School Student Voice Staff (50-150 users)**
- Student Rep Coordinators: Focus on Rep/SSP areas
- Survey Contacts: Focus on survey mechanisms
- Academic Leads: Oversight of all areas
- **Access Needs:** Role-based selective viewing, clear navigation

**2. Academic Leadership**
- Directors of Learning & Teaching: Comprehensive oversight
- Heads of School: Strategic priorities
- ESEC Members: Monitoring trends
- **Access Needs:** Aggregated results, RE plan integration

**3. Student Representatives (Phase 2)**
- SSP Chairs initially
- **Role:** Provide student perspective before report finalization

**4. Support Teams**
- Student Voice & Partnership Team: Admin, support, insights
- Learning & Teaching Academy: Technical maintenance

### User Characteristics
- **Technical Proficiency:** Basic to intermediate
- **Time Availability:** Limited; tool must be efficient
- **Motivation:** Voluntary engagement; must demonstrate clear value
- **Context:** Academic autonomy valued; supportive not punitive tone essential

---

## User Journey & Workflow

### Core Workflow

**1. Access & Orientation (5-10 min)**
- Receive link → Land on introduction → Understand purpose & process
- **System Provides:** Welcome, guidance, time estimate

**2. Exploration (10-20 min)**
- Navigate to relevant areas → Expand sections → Read level descriptions → Explore resources
- **System Provides:** Collapsible interface, embedded resources

**3. Reflection & Scoring (20-40 min)**
- Review current practice → Select levels (including 0.5 options) → Write contextual notes
- **System Provides:** Scoring interface, text boxes, progress indicator, auto-save

**4. Review & Submission (5-10 min)**
- Check completeness → Make edits → Submit
- **System Provides:** Summary view, confirmation

**5. Report Generation (System)**
- Process scores → Map to recommendations → Compile resources → Format report
- **Options:** Fully automated (ideal), semi-automated (likely), manual (fallback)

**6. Report Receipt & Review (15-30 min)**
- Receive notification → Download report → Review recommendations → Identify priorities
- **System Provides:** Professional report in RE plan format

**7. Action & Implementation (Ongoing)**
- Individual actions → Team discussion → Integration into RE plan → Contact support as needed

**8. Ongoing Engagement (Annual)**
- Return for new assessment → Compare progress → Updated report → Continuous improvement

### Alternative: Workshop-Based Hybrid
If full automation not achievable:
- Pre-workshop: Staff explore tool independently
- During workshop: Facilitated scoring & discussion
- Post-workshop: Student Voice team manually creates report (10 days)

---

## Functional Requirements Summary

### FR1: Content Management & Display
- Complete model content displayed accurately
- Progressive disclosure (collapsible sections)
- Responsive design (mobile/tablet/desktop)
- WCAG 2.1 AA accessibility compliance
- Bilingual EN/CY with language toggle

### FR2: Self-Assessment & Scoring
- Level selection (1-5 with 0.5 increments)
- Visual feedback on selections
- Contextual text boxes per assessment area
- Progress tracking ("3 of 7 complete")
- Save/resume capability (requires database)

### FR3: Enhancement Report Generation
- Automated report creation (if feasible)
- Gap analysis showing current → target level
- Specific recommendations from model
- Resource links throughout
- RE plan compatible format
- Bilingual reports

### FR4: Resource Library
- Minimum 20 resources at launch
- Categorized by type & area
- Search functionality
- Downloadable (PDF, Word, etc.)
- Admin interface for easy updates

### FR5: User Authentication & Data (if database available)
- Cardiff SSO integration
- Assessment data storage
- User profile management
- Data export for analysis
- GDPR compliance

### FR6: Welsh Language Support
- Complete translation of all content
- Professional quality review
- Equal prominence for Welsh
- Language preference persistence

---

## Technical Architecture

### Recommended Approach: Xerte + Learning Central Hybrid

**Why Hybrid:**
- Xerte: Interactive front-end, responsive design, embedded resources
- Learning Central: Database, user authentication, data storage, quiz tools
- **Limitation:** Report automation TBC; may require manual process

**Architecture:**
```
User → Cardiff SSO → Learning Central Course
                           ↓
                    Xerte Package (embedded)
                           ↓
                    Quiz/Survey for data collection
                           ↓
                    Learning Central Database
                           ↓
                    Report Generation (auto/semi-auto/manual)
```

### Alternative Options Considered

**Option 1: Xerte Standalone**
- ✅ Simplest implementation
- ❌ No database, no user accounts, no data storage
- **Verdict:** Insufficient for requirements

**Option 2: Custom Web Application**
- ✅ Full functionality and control
- ❌ Requires significant dev resources, IT involvement, longer timeline
- **Verdict:** Ideal long-term but not feasible for Feb 2025

### Technical Stack (Hybrid Approach)

**Frontend:**
- Platform: Xerte (XLT template or HTML5 package)
- Technologies: HTML5, CSS3, JavaScript
- Framework: Bootstrap or custom responsive CSS
- Accessibility: WCAG 2.1 AA compliant markup

**Backend:**
- Platform: Learning Central (Blackboard)
- Authentication: Cardiff SSO (Shibboleth/SAML)
- Data Collection: Learning Central Quiz/Survey tools
- Storage: Learning Central database

**Reporting:**
- **Option A:** Automated via Learning Central reporting + template
- **Option B:** Semi-automated export to template
- **Option C:** Manual creation with notification

**Resources:**
- Storage: Learning Central content areas or SharePoint
- Management: Content editor accessible to Student Voice team

### Data Models

**Assessment Record:**
```
{
  userId, schoolName, assessmentDate, language (en|cy),
  scores: {
    area1: {score: 2.5, context: "text"},
    area2: {score: 3, context: "text"},
    ...
  },
  progress: 85%, submitted: true
}
```

### Security & Compliance
- SSL/TLS encryption
- Cardiff SSO (no separate passwords)
- GDPR compliant data handling
- WCAG 2.1 AA accessibility
- Welsh Language Standards compliance

---

## Design Strategy

### Design Principles
1. **Clarity Over Complexity:** Counteract model complexity with clear information architecture
2. **Support, Not Assessment:** Emphasize enhancement, avoid test/exam patterns
3. **Accessibility First:** Core requirement, not add-on
4. **Mobile-Friendly:** Responsive design non-negotiable
5. **Culturally Appropriate:** Welsh language equal prominence, academic tone

### Visual Design

**Reference:** Rachel's Inclusive Education Enhancement Model (Xerte)
- Clean layout, expandable sections with +/- icons
- Clear scoring interface
- Professional academic aesthetic

**Colour Palette:**
- Primary: Cardiff Purple
- Neutrals: Grays, white/off-white
- Accents: Green (positive), Blue (info), Amber (in-progress), Red (errors - sparingly)

**Colour Coding for Levels (Optional, Secondary Indicator):**
- Level 1: Light red/pink
- Level 2: Light amber/yellow
- Level 3: Light blue
- Level 4: Light green
- Level 5: Darker green/purple

**Typography:**
- Headings: Cardiff corporate font or Lato/Open Sans
- Body: Sans-serif, 16-18px minimum
- Line height: 1.5-1.6
- WCAG contrast ratios: 4.5:1 text, 3:1 UI

### Information Architecture

```
Landing Page
├── Introduction & Overview
├── Enhancement Model (Interactive)
│   ├── Area 1: Roles & Structures [expandable]
│   │   ├── Levels 1-5 [collapsible]
│   │   ├── Scoring interface
│   │   └── Context text box
│   ├── Areas 2-7 [similar structure]
├── Resources
│   ├── Templates
│   ├── Guides
│   ├── Case Studies
│   └── Contacts
├── My Assessments (if authenticated)
└── Help & Support
[Language Toggle: EN | CY]
```

### Key Interface Elements

**Expandable Sections:**
- Plus/minus icons for expand/collapse
- Smooth 200-300ms animations
- Multiple sections can be open
- Print view expands all

**Scoring Interface:**
- Radio buttons for accessibility (recommended)
- OR clickable cells for visual polish
- Clear selected state (highlight, checkmark)
- In-between options (1.5, 2.5, etc.) distinct

**Progress Tracking:**
- Progress bar: "3 of 7 areas completed - 43%"
- Checklist showing completion per area
- Frames as "assessment progress" not "performance"

### Accessibility Checklist
✅ Semantic HTML, proper heading hierarchy
✅ Keyboard accessible (tab navigation, focus indicators)
✅ Screen reader compatible (ARIA labels, announcements)
✅ Colour contrast ratios (4.5:1 text, 3:1 UI)
✅ Don't rely on colour alone
✅ Resizable text (200% without breaking)
✅ Alt text for images
✅ Form labels and error messages

---

## Implementation Plan

### Timeline: 16 Weeks (Early Jan - Late Feb 2025)

**Phase 1A: Content Preparation (Weeks 1-4)**
- Week 1-2: Finalize content, commission Welsh translation
- Week 2-3: Write introductory/help content, translate
- Week 3-4: Platform setup (Learning Central course, Xerte dev environment)
- **Deliverable:** Finalized bilingual content, platform ready

**Phase 1B: Design & Development (Weeks 5-10)**
- Week 5-6: Interface design (wireframes, mockups, style guide)
- Week 7-8: Core development (Xerte package, content pages, responsive layout)
- Week 9-10: Assessment features (scoring, feedback collection, progress tracking, Learning Central integration)
- **Deliverable:** Functional prototype with core features

**Phase 1C: Report Generation & Integration (Weeks 11-13)**
- Week 11: Report template development, generation logic (or manual workflow)
- Week 12: Resource integration (library, links, contact info)
- Week 13: End-to-end testing, UAT with 3-5 volunteer schools
- **Deliverable:** Complete system with reporting capability

**Phase 1D: Final Testing & Launch Prep (Weeks 14-15)**
- Week 14: Accessibility audit, performance optimization, security review, Welsh QA, bug fixes
- Week 15: Documentation finalization, training materials, communications prep, soft launch to pilot schools
- **Deliverable:** Production-ready system

**Phase 1E: Launch (Week 16 - End Feb 2025)**
- Launch week: Final checks, communications sent, system live, monitoring
- Post-launch: User support, feedback collection, issue resolution
- **Deliverable:** Live platform with support system

**Phase 2: Post-Launch Enhancement (March 2025+)**
- Month 1-3: Gather feedback, monitor analytics, iterate improvements
- Evaluate Phase 2 features: assessment history, collaboration, student input

### Team Structure

**Core Team:**
- **Project Owner:** Nan (vision, content, stakeholder communication, user support)
- **Technical Lead:** Clover (architecture, development, testing, technical support)

**Additional Roles:**
- Welsh language services (translation, QA)
- Accessibility specialist (audit, testing)
- Volunteer schools (UAT, feedback)
- Cardiff IT (SSO support, hosting if custom build)

### Communication Plan

**Internal:**
- Weekly check-ins (Nan & Clover)
- Fortnightly stakeholder updates (Student Voice team, LTA leadership)

**User Communication:**
- Pre-launch: Teaser (January)
- Launch: Comprehensive announcement with guide (February)
- Ongoing: Monthly tips, success stories, resource updates

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| **Automated report generation not feasible** | High | High | Manual fallback process documented; prioritize usability over automation |
| **Welsh translation delayed** | Medium | High | Engage services Week 1; phased translation if needed; core content prioritized |
| **Low user adoption** | Medium | Medium | Clear value proposition; comprehensive comms; incentivize early adopters |
| **Timeline slippage** | Medium | Medium | Buffer time; prioritize core features; accept limited scope Phase 1 |
| **Xerte/Learning Central integration complex** | Medium | High | Early technical testing Week 5; fallback to simpler tool; external dev if budget allows |
| **Accessibility issues late** | Low | High | Accessibility from design stage; regular testing; formal audit pre-launch |
| **Tool doesn't meet user needs** | Medium | High | User involvement in testing; iterative development; flexibility to adjust |
| **Resource requirements exceed capacity** | Medium | Medium | Realistic scope; ruthless prioritization; seek additional support if needed |
| **Data security/GDPR concerns** | Low | High | Cardiff IT consultation; compliance review; standard institutional protocols |
| **Platform not scalable for future needs** | Medium | Low | Phase 2 planning; evaluate long-term custom solution; acceptable for Phase 1 |

### Critical Dependencies
1. ✅ Welsh translation services available and responsive
2. ⚠️ Learning Central technical capabilities confirmed for workflow
3. ⚠️ Cardiff SSO integration working smoothly
4. ✅ Xerte platform reliable and maintainable
5. ⚠️ Student Voice team capacity for report generation if manual

---

## Budget Estimate

### Phase 1 Costs

**Welsh Translation:** £500-£1,500
- Professional translation (10,000-15,000 words)
- Quality review

**External Development (Only if needed):** £0 (avoid for Phase 1)
- Use existing platforms (Xerte, Learning Central)
- Reserve custom development for future if required

**Accessibility Audit (Optional):** £0-£500
- Use Cardiff internal resources or automated tools

**Hosting & Infrastructure:** £0
- Cardiff systems (no additional cost)

**Ongoing:** Staff time (Clover, Nan)

**Total Phase 1 Budget:** £500-£2,000

### Funding Sources
- Student Voice & Partnership Team budget
- Learning & Teaching Academy budget
- Institutional quality enhancement funds (if available)

---

## Next Steps & Decisions Required

### Immediate Actions (Week of 12 Dec 2024)

**Decision Points:**
1. ⚠️ **Approve project scope:** Confirm Phase 1 core features acceptable
2. ⚠️ **Confirm technical approach:** Xerte + Learning Central hybrid endorsed
3. ⚠️ **Approve timeline:** Feb 2025 launch realistic or adjust
4. ⚠️ **Allocate resources:** Confirm Clover availability, budget for translation
5. ⚠️ **Report generation approach:** Accept manual fallback if automation not feasible?

**Next Meeting (Scheduled):**
- Either week of 16 Dec or early January
- Agenda: 
  - Technical feasibility update from Clover (Learning Central testing)
  - Enhancement report generation strategy finalized
  - Phase 1A workplan confirmed

### Phase 1A Kickoff (Early January)

**Week 1 Actions:**
1. Nan: Finalize model content, identify any updates needed
2. Clover: Begin Learning Central course setup, test technical feasibility
3. Both: Commission Welsh translation services
4. Both: Compile initial resource inventory

---

## Appendices

### A. Assessment Areas Detail

**1. Roles & Structures Supporting Student Voice**
- Student Voice roles assigned and understood
- Student representation on committees
- Awareness and use of Student Voice Framework

**2. Training, Development & Dissemination**
- Staff engagement with SVEN (Student Voice and Experience Network)
- CPD opportunities for Student Voice staff
- Dissemination of updates and best practice

**3. Student Reps & Student-Staff Panels**
- Rep recruitment and training
- SSP structure and engagement
- Closing the feedback loop
- Rep recognition and support

**4. Mid-Module Enhancement**
- MME process established and communicated
- Student promotion and engagement
- Feedback review and action
- Closing the feedback loop

**5. End of Module Enhancement**
- ME promotional plan and staff engagement
- Module Leader response and action
- Feedback loop closure
- Connection to curriculum planning

**6. National Student Survey**
- NSS awareness and promotional activity
- Results analysis and action planning
- Engagement with enhancement initiatives
- Closing the feedback loop with students

**7. Postgraduate Surveys (CUPTS & PRES)**
- PG survey awareness and promotion
- Results review and response
- Enhancement action implementation
- Student engagement in improvements

### B. Glossary

- **BoS:** Board of Studies
- **CUPTS:** Cardiff University Postgraduate Taught Survey
- **DLT:** Director of Learning and Teaching
- **ESEC:** Education Student Experience Committee
- **LTA:** Learning & Teaching Academy
- **ME:** Module Enhancement
- **MME:** Mid-Module Enhancement
- **NSS:** National Student Survey
- **PRES:** Postgraduate Research Experience Survey
- **RE Plan:** Review and Enhancement Plan
- **SRC:** Student Rep Coordinator
- **SSO:** Single Sign-On
- **SSP:** Student-Staff Panel
- **SVEN:** Student Voice and Experience Network
- **SVF:** Student Voice Framework

### C. Key Contacts

**Project Team:**
- **Nan:** Project Owner, Student Voice & Partnership Team
- **Clover:** Technical Lead, Learning & Teaching Academy

**Support Services:**
- **Welsh Translation:** Cardiff Welsh Language Services
- **Accessibility:** Cardiff Digital Accessibility Team
- **IT Support:** Cardiff IT Services (SSO, hosting)

### D. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 12 Dec 2024 | Claude (AI Assistant) | Initial draft based on meeting transcript and Q&A |
| 1.0 | 12 Dec 2024 | Claude (AI Assistant) | Comprehensive PRD incorporating all requirements |

---

**END OF DOCUMENT**

*This PRD is a living document and will be updated as the project progresses and new information becomes available.*
