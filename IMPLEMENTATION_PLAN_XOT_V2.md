# XOT Main Stylesheet v2 - Implementation Plan
## Component-First Design System for Cardiff University

**Author**: Based on SVEM Project Analysis
**Date**: December 2024
**Version**: 2.0.0

---

## Executive Summary

### Goal
Reduce custom CSS requirements in projects like SVEM from **1121 lines to 200-300 lines** (70-75% reduction)

### Strategy
- **Component-focused approach** (not utility-first like Tailwind)
- **Leverage existing jQuery UI** (enhance theming, don't rebuild)
- **Expand Open Props integration** with Cardiff semantic mappings
- **Breaking changes OK** - clean v2 architecture (old projects stay on v1)

### Return on Investment
- **Investment**: ~1,055 lines added to base stylesheet
- **Return**: 600-900 lines saved per typical project
- **Break-even**: After 2 projects using v2
- **Long-term**: 70-75% reduction in custom CSS across all projects

---

## Background Analysis

### What SVEM Project Required (1121 lines custom CSS)

#### Design Tokens (57 lines)
- Semantic text colors (primary, secondary, muted, light)
- Complete status color system (success, warning, danger, info with light variants)
- Spacing scale (6 levels: xs, sm, md, lg, xl, 2xl)
- Shadow scale (4 levels: sm, md, lg, xl)
- Border radius scale (3 levels: sm, md, lg, full)
- Transition tokens with easing functions
- Assessment level colors for maturity models

#### Components (600+ lines)
- Cards with hover effects and left border accents
- Status badges (not-started, in-progress, complete)
- Progress bars with animated fills
- Toast notifications for user feedback
- Statistics grids for dashboards
- Evidence/content boxes with structured guidance
- Score/action buttons for assessments
- Native `<details>` accordion styling

#### Current Base Stylesheet Gaps
- **Cards component is completely EMPTY** (just header comment)
- No badge, progress bar, toast, or statistics components
- Incomplete semantic token system
- Very limited utility classes (no spacing, display, border, shadow utilities)

---

## Implementation Phases

### Phase 1: Foundation - Design Tokens (~170 lines)

**File**: `XOT/base/_customProperties.scss`
**Action**: EXPAND from 281 to ~450 lines

#### Add 8 Semantic Token Categories

**1. Semantic Text Colors** (map Open Props to Cardiff needs)
```scss
:where(html) {
    /* Semantic Text Colors */
    --text-primary: var(--gray-11);      // Main body text
    --text-secondary: var(--gray-9);     // Secondary headings
    --text-muted: var(--gray-7);         // Subtle text
    --text-light: var(--gray-6);         // Very subtle text
    --text-on-dark: var(--gray-0);       // For dark backgrounds
}
```

**2. Complete Status Color System**
```scss
:where(html) {
    /* Status Colors - with light variants for backgrounds */
    --status-success: var(--green-7);
    --status-success-light: var(--green-1);
    --status-success-dark: var(--green-9);
    --status-success-text: var(--green-12);

    --status-warning: var(--orange-5);
    --status-warning-light: var(--yellow-1);
    --status-warning-text: var(--yellow-11);

    --status-danger: var(--red-9);
    --status-danger-light: var(--red-0);
    --status-danger-text: var(--red-11);

    --status-info: var(--blue-6);
    --status-info-light: var(--blue-1);
    --status-info-text: var(--blue-11);
}
```

**3. Background & Border Colors**
```scss
:where(html) {
    /* Backgrounds - semantic naming */
    --bg-primary: var(--white);
    --bg-secondary: var(--gray-0);
    --bg-subtle: var(--gray-1);
    --bg-muted: var(--gray-2);

    /* Borders - graduated scale */
    --border-subtle: var(--gray-2);
    --border-light: var(--gray-3);
    --border-medium: var(--gray-5);
    --border-strong: var(--gray-7);
}
```

**4. Spacing Scale** (6 levels mapping to Open Props)
```scss
:where(html) {
    /* Semantic Spacing - 6 levels as used in SVEM */
    --space-xs: var(--size-1);      // 0.25rem
    --space-sm: var(--size-2);      // 0.5rem
    --space-md: var(--size-3);      // 0.75rem
    --space-lg: var(--size-5);      // 1.25rem
    --space-xl: var(--size-7);      // 2rem
    --space-2xl: var(--size-8);     // 3rem
}
```

**5. Shadow Scale** (4 elevation levels)
```scss
:where(html) {
    /* Shadow Scale - semantic elevation */
    --shadow-sm: var(--shadow-1);       // Subtle hover
    --shadow-md: var(--shadow-2);       // Card default
    --shadow-lg: var(--shadow-3);       // Card hover
    --shadow-xl: var(--shadow-4);       // Modals/popovers
}
```

**6. Border Radius Scale** (3 levels)
```scss
:where(html) {
    /* Border Radius - 3-tier system */
    --radius-sm: var(--radius-2);       // 4px - badges, small elements
    --radius-md: var(--radius-3);       // 8px - cards, buttons
    --radius-lg: var(--radius-4);       // 12px - large containers
    --radius-full: var(--radius-round); // Pills, circular
}
```

**7. Transition Tokens** (standardized timing)
```scss
:where(html) {
    /* Transitions - consistent easing */
    --transition-fast: 0.15s var(--ease-2);
    --transition-base: 0.2s var(--ease-3);
    --transition-slow: 0.3s var(--ease-4);
}
```

**8. Assessment Level Colors** (for maturity model tools)
```scss
:where(html) {
    /* Assessment Level Colors - grayscale progression */
    --level-1: var(--gray-4);
    --level-2: var(--gray-5);
    --level-3: var(--gray-7);
    --level-4: var(--gray-8);
    --level-5: var(--gray-11);
}
```

---

### Phase 2: Core Components (~500 lines)

#### 2A. Enhanced Cards Component (~120 lines)
**File**: `XOT/components/_cards.scss` (currently EMPTY)

**Implementation**:
```scss
/* Card Base */
.card {
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: var(--space-lg);
    transition: transform var(--transition-fast),
                box-shadow var(--transition-fast);
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

/* Card with left border accent (SVEM pattern) */
.card-accent {
    border-left: 5px solid transparent;
}

.card-accent-success { border-left-color: var(--status-success); }
.card-accent-warning { border-left-color: var(--status-warning); }
.card-accent-danger { border-left-color: var(--status-danger); }
.card-accent-cu-blue { border-left-color: var(--cu-blue); }

/* Card states */
.card-interactive { cursor: pointer; }
.card-flat {
    box-shadow: none;
    border: 1px solid var(--border-light);
}

/* Card sections */
.card-header {
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border-light);
}

.card-footer {
    margin-top: var(--space-md);
    padding-top: var(--space-sm);
    border-top: 1px solid var(--border-light);
}

/* Info cards with icon (SVEM instructions page) */
.info-card {
    text-align: center;
    min-width: 200px;
}

.info-card-icon {
    font-size: 2.5rem;
    margin-bottom: var(--space-sm);
    line-height: 1;
}

.info-card-value {
    font-weight: 600;
    font-size: var(--fs-xl);
    color: var(--text-secondary);
}

.info-card-label {
    font-size: var(--fs-sm);
    color: var(--text-light);
}
```

**Uses**: Theme cards, report containers, info displays, dashboard widgets

---

#### 2B. Status Badges Component (~90 lines)
**File**: `XOT/components/_badges.scss` (NEW)

**Implementation**:
```scss
/* Badge Base */
.badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 0.25em 0.75em;
    font-size: var(--fs-xs);
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: var(--radius-full);
    white-space: nowrap;
}

/* Status variants */
.badge-success {
    background: var(--status-success-light);
    color: var(--status-success-text);
    border: 1px solid var(--status-success);
}

.badge-warning {
    background: var(--status-warning-light);
    color: var(--status-warning-text);
    border: 1px solid var(--status-warning);
}

.badge-danger {
    background: var(--status-danger-light);
    color: var(--status-danger-text);
    border: 1px solid var(--status-danger);
}

.badge-info {
    background: var(--status-info-light);
    color: var(--status-info-text);
    border: 1px solid var(--status-info);
}

.badge-neutral {
    background: var(--bg-muted);
    color: var(--text-muted);
    border: 1px solid var(--border-light);
}

/* Cardiff brand badges */
.badge-cu-blue {
    background: var(--cu-blue);
    color: var(--white);
}

/* Size variants */
.badge-sm { padding: 0.2em 0.5em; font-size: 0.65rem; }
.badge-lg { padding: 0.35em 1em; font-size: var(--fs-sm); }

/* Interactive badge (SVEM score badges) */
.badge-interactive {
    cursor: pointer;
    transition: filter var(--transition-fast);
}

.badge-interactive:hover {
    filter: brightness(0.95);
}

.badge-interactive.active {
    background: var(--cu-blue);
    color: var(--white);
    border-color: var(--cu-blue);
}
```

**Uses**: Status indicators, score badges, completion status, tags

---

#### 2C. Progress Bars Component (~80 lines)
**File**: `XOT/components/_progress.scss` (NEW)

**Implementation**:
```scss
/* Progress Bar Container */
.progress {
    width: 100%;
    height: 6px;
    background: var(--bg-muted);
    border-radius: var(--radius-sm);
    overflow: hidden;
    margin-bottom: var(--space-sm);
}

/* Progress Bar Fill */
.progress-bar {
    height: 100%;
    background: var(--status-success);
    border-radius: var(--radius-sm);
    transition: width var(--transition-slow);
}

/* Status variants */
.progress-bar-warning { background: var(--status-warning); }
.progress-bar-danger { background: var(--status-danger); }
.progress-bar-info { background: var(--status-info); }
.progress-bar-cu-blue { background: var(--cu-blue); }

/* Size variants */
.progress-sm { height: 4px; }
.progress-md { height: 8px; }
.progress-lg { height: 12px; }

/* With label */
.progress-labeled {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.progress-label {
    font-size: var(--fs-sm);
    color: var(--text-light);
    font-weight: 500;
    white-space: nowrap;
}
```

**Uses**: Theme completion tracking, assessment progress, loading indicators

---

#### 2D. Evidence/Content Boxes (~60 lines)
**File**: `XOT/components/_boxes.scss` (EXPAND existing)

**Add to existing file**:
```scss
/* Evidence Box */
.evidence-box {
    margin-top: var(--space-lg);
    padding: var(--space-lg);
    background: var(--bg-secondary);
    border-left: 3px solid var(--cu-blue);
    border-radius: var(--radius-sm);
}

.evidence-box-label {
    display: block;
    font-weight: 600;
    font-size: var(--fs-sm);
    margin-bottom: var(--space-sm);
    color: var(--text-secondary);
}

/* Content box variants with colored borders */
.content-box {
    padding: var(--space-lg);
    background: var(--bg-primary);
    border-left: 4px solid var(--border-medium);
    border-radius: var(--radius-sm);
    margin-block: var(--space-lg);
}

.content-box-cu-blue { border-left-color: var(--cu-blue); }
.content-box-cu-red { border-left-color: var(--cu-red); }
.content-box-success {
    border-left-color: var(--status-success);
    background: var(--status-success-light);
}
.content-box-warning {
    border-left-color: var(--status-warning);
    background: var(--status-warning-light);
}
```

**Uses**: Evidence input sections, highlighted content, callouts

---

### Phase 3: Interaction Components (~260 lines)

#### 3A. Toast Notifications (~70 lines)
**File**: `XOT/components/_toasts.scss` (NEW)

**Implementation**:
```scss
/* Toast Container */
.toast-container {
    position: fixed;
    bottom: var(--space-lg);
    right: var(--space-lg);
    z-index: 1050;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    pointer-events: none;
}

/* Toast Base */
.toast {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    min-width: 250px;
    max-width: 350px;
    padding: var(--space-md) var(--space-lg);
    background: var(--gray-8);
    color: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-xl);
    opacity: 0;
    transform: translateX(100%);
    transition: opacity var(--transition-base),
                transform var(--transition-base);
    pointer-events: all;
}

.toast.show {
    opacity: 1;
    transform: translateX(0);
}

/* Toast variants */
.toast-success { background: var(--status-success); color: var(--white); }
.toast-warning { background: var(--status-warning); color: var(--gray-9); }
.toast-danger { background: var(--status-danger); color: var(--white); }
.toast-info { background: var(--status-info); color: var(--white); }
```

**Uses**: Save confirmations, action feedback, notifications

---

#### 3B. Statistics Grid (~70 lines)
**File**: `XOT/components/_statistics.scss` (NEW)

**Implementation**:
```scss
/* Statistics Container */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-lg);
    margin-block: var(--space-lg);
}

/* Stat Item */
.stat-item {
    text-align: center;
    padding: var(--space-lg);
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
}

.stat-value {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    color: var(--cu-blue);
    line-height: 1;
    margin-bottom: var(--space-sm);
}

.stat-label {
    font-size: var(--fs-sm);
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Stat variants */
.stat-value-success { color: var(--status-success); }
.stat-value-warning { color: var(--status-warning); }
.stat-value-danger { color: var(--status-danger); }
```

**Uses**: Summary dashboards, metrics display, analytics

---

#### 3C. Score/Action Buttons (~60 lines)
**File**: `XOT/components/_buttons.scss` (EXPAND existing)

**Add to existing button styles**:
```scss
/* Score Button Group */
.score-btn-group {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
}

.score-btn {
    flex: 1 1 auto;
    min-width: 60px;
    padding: var(--space-sm) var(--space-md);
    text-align: center;
    font-size: var(--fs-sm);
    font-weight: 500;
    background: var(--bg-primary);
    color: var(--cu-blue);
    border: 1px solid var(--cu-blue);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background-color var(--transition-fast),
                color var(--transition-fast);
}

.score-btn:hover {
    background: var(--blue-1);
}

.score-btn.active {
    background: var(--cu-blue);
    color: var(--white);
}

/* Toggle button group */
.toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 0.3em 0.75em;
    font-size: var(--fs-xs);
    font-weight: 500;
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: border-color var(--transition-fast),
                color var(--transition-fast);
}

.toggle-btn:hover {
    border-color: var(--border-medium);
    color: var(--text-primary);
}
```

**Uses**: Level selection, scoring interfaces, toggle controls

---

#### 3D. Native Details/Summary (~70 lines)
**File**: `XOT/vendors/_native-alternatives.scss` (NEW)

**Implementation**:
```scss
/* Native Details/Summary (Alternative to jQuery UI Accordion) */
details {
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-xs);
    transition: box-shadow var(--transition-fast);
}

details:hover {
    box-shadow: var(--shadow-md);
}

details[open] {
    border-color: var(--cu-blue);
}

details[open] summary {
    border-bottom: 1px solid var(--border-light);
    margin-bottom: var(--space-md);
}

summary {
    padding: var(--space-md) var(--space-lg);
    cursor: pointer;
    list-style: none;
    font-weight: 600;
    color: var(--text-primary);
    user-select: none;
    position: relative;
}

summary::-webkit-details-marker {
    display: none;
}

summary::after {
    content: '+';
    position: absolute;
    right: var(--space-lg);
    font-weight: 300;
    font-size: 1.2rem;
    color: var(--text-muted);
    transition: transform var(--transition-fast);
}

details[open] summary::after {
    content: '−';
}

/* Cardiff accent variant */
details.details-cu-accent {
    position: relative;
    padding-left: var(--space-sm);
}

details.details-cu-accent::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--cu-blue);
    border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}
```

**Uses**: Collapsible content, assessment levels, FAQs, accordions

---

### Phase 4: jQuery UI Enhancement (~150 lines)

**File**: `XOT/vendors/_jquery-ui-theme.scss` (ENHANCE existing)

#### Add Cardiff Branding to jQuery UI Components

**Accordion Enhancement**:
```scss
/* jQuery UI Accordion Cardiff Enhancement */
.ui-accordion {
    border: none;
}

.ui-accordion-header {
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-weight: 600;
    margin-bottom: var(--space-xs);
    transition: background-color var(--transition-fast),
                box-shadow var(--transition-fast);
    margin-top: 0;
}

.ui-accordion-header:hover {
    background: var(--bg-subtle);
    box-shadow: var(--shadow-md);
}

.ui-accordion-header.ui-state-active {
    background: var(--cu-blue);
    color: var(--white);
    border-color: var(--cu-blue);
}

.ui-accordion-content {
    border: 1px solid var(--border-light);
    border-top: none;
    padding: var(--space-lg);
    background: var(--bg-primary);
}
```

**Tabs Enhancement**:
```scss
/* jQuery UI Tabs Cardiff Enhancement */
.ui-tabs {
    border: none;
}

.ui-tabs-nav {
    background: transparent;
    border: none;
    border-bottom: 2px solid var(--border-light);
    padding: 0;
}

.ui-tabs-anchor {
    padding: var(--space-md) var(--space-lg);
    color: var(--text-muted);
    font-weight: 500;
    border-bottom: 3px solid transparent;
    transition: color var(--transition-fast),
                border-color var(--transition-fast);
}

.ui-tabs-anchor:hover {
    color: var(--text-primary);
    border-bottom-color: var(--cu-blue);
}

.ui-tabs-active .ui-tabs-anchor {
    color: var(--cu-blue);
    border-bottom-color: var(--cu-blue);
    font-weight: 600;
}
```

**Dialog Enhancement**:
```scss
/* jQuery UI Dialog Cardiff Enhancement */
.ui-dialog {
    border: none;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    padding: 0;
}

.ui-dialog-titlebar {
    background: var(--cu-blue);
    color: var(--white);
    border: none;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    padding: var(--space-lg);
    font-weight: 600;
}

.ui-dialog-content {
    padding: var(--space-xl);
}

.ui-dialog-buttonpane {
    border-top: 1px solid var(--border-light);
    padding: var(--space-lg);
    background: var(--bg-secondary);
}
```

---

### Phase 5: Essential Utilities (~110 lines)

**File**: `XOT/utility/_utilityClass.scss` (EXPAND from 158 to ~270 lines)

#### Add Minimal but Essential Utilities

**Spacing** (block direction only, avoid explosion):
```scss
/* Margin utilities - block direction only */
.mt-0 { margin-top: 0; }
.mb-0 { margin-bottom: 0; }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }

/* Padding utilities - limited to common needs */
.p-sm { padding: var(--space-sm); }
.p-md { padding: var(--space-md); }
.p-lg { padding: var(--space-lg); }
.p-xl { padding: var(--space-xl); }
```

**Display**:
```scss
.d-block { display: block; }
.d-inline-block { display: inline-block; }
.d-inline { display: inline; }
.d-flex { display: flex; }
.d-grid { display: grid; }
```

**Gap** (for flex/grid):
```scss
.gap-xs { gap: var(--space-xs); }
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }
.gap-xl { gap: var(--space-xl); }
```

**Flex Alignment**:
```scss
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }
```

**Borders**:
```scss
.border { border: 1px solid var(--border-light); }
.border-top { border-top: 1px solid var(--border-light); }
.border-bottom { border-bottom: 1px solid var(--border-light); }
.border-left { border-left: 1px solid var(--border-light); }
.border-right { border-right: 1px solid var(--border-light); }
.border-none { border: none; }

.rounded { border-radius: var(--radius-md); }
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-full { border-radius: var(--radius-full); }
```

**Shadows**:
```scss
.shadow-none { box-shadow: none; }
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
```

**Common Patterns**:
```scss
.w-full { width: 100%; }
.w-auto { width: auto; }
.clickable { cursor: pointer; }
.no-select { user-select: none; }
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
```

#### Utilities to SKIP (avoid bloat)
- Comprehensive spacing system (m-1, m-2, m-3... p-1, p-2, p-3)
- Text color utilities (use semantic classes)
- Background color utilities (use components)
- Width/height percentage utilities (w-1/2, h-full, etc.)
- Z-index, opacity, font-weight utilities

**Philosophy**: Provide utilities for truly reusable patterns, not one-off helpers

---

### Phase 6: Component Registration

#### Update Component Index
**File**: `XOT/components/_index.scss`

```scss
@forward 'alerts';
@forward 'boxes';        // Expanded
@forward 'buttons';      // Expanded
@forward 'cards';        // Implemented (was empty)
@forward 'badges';       // NEW
@forward 'progress';     // NEW
@forward 'toasts';       // NEW
@forward 'statistics';   // NEW
@forward 'forms';
```

#### Update Vendor Index
**File**: `XOT/vendors/_index.scss`

```scss
@forward 'jquery-ui';
@forward 'jquery-ui-theme';      // Enhanced
@forward 'native-alternatives';   // NEW
```

---

## Implementation Timeline

### Week 1: Foundation
- [ ] Expand `XOT/base/_customProperties.scss` (+170 lines)
- [ ] Add all 8 semantic token categories
- [ ] Test compilation with Live Sass Compiler
- [ ] Verify no breaking changes to existing projects

### Week 2: Priority Components (Highest Impact)
- [ ] Implement `XOT/components/_cards.scss` (+120 lines)
- [ ] Implement `XOT/components/_badges.scss` (+90 lines)
- [ ] Implement `XOT/components/_progress.scss` (+80 lines)
- [ ] Update `XOT/components/_index.scss` imports
- [ ] Test each component in isolation

### Week 3: Supporting Components
- [ ] Expand `XOT/components/_boxes.scss` (+60 lines)
- [ ] Implement `XOT/components/_toasts.scss` (+70 lines)
- [ ] Implement `XOT/components/_statistics.scss` (+70 lines)
- [ ] Expand `XOT/components/_buttons.scss` (+60 lines)
- [ ] Test component interactions

### Week 4: Interactive & Utilities
- [ ] Implement `XOT/vendors/_native-alternatives.scss` (+70 lines)
- [ ] Enhance `XOT/vendors/_jquery-ui-theme.scss` (+150 lines)
- [ ] Expand `XOT/utility/_utilityClass.scss` (+110 lines)
- [ ] Update `XOT/vendors/_index.scss`
- [ ] Full integration testing

### Week 5: Testing & Migration
- [ ] SVEM migration proof-of-concept
- [ ] Document custom CSS reduction achieved
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Create component usage examples
- [ ] Update CLAUDE.md documentation

---

## Critical Files Reference

| File Path | Action | Lines | Purpose |
|-----------|--------|-------|---------|
| `XOT/base/_customProperties.scss` | EXPAND | +170 | 8 semantic token categories |
| `XOT/components/_cards.scss` | IMPLEMENT | +120 | Card components (empty→complete) |
| `XOT/components/_badges.scss` | CREATE | +90 | Status badges |
| `XOT/components/_progress.scss` | CREATE | +80 | Progress bars |
| `XOT/components/_boxes.scss` | EXPAND | +60 | Evidence/content boxes |
| `XOT/components/_toasts.scss` | CREATE | +70 | Toast notifications |
| `XOT/components/_statistics.scss` | CREATE | +70 | Statistics display |
| `XOT/components/_buttons.scss` | EXPAND | +60 | Score/action buttons |
| `XOT/vendors/_native-alternatives.scss` | CREATE | +70 | Native `<details>` styling |
| `XOT/vendors/_jquery-ui-theme.scss` | ENHANCE | +150 | Cardiff jQuery UI theme |
| `XOT/utility/_utilityClass.scss` | EXPAND | +110 | Essential utilities |
| `XOT/components/_index.scss` | UPDATE | +4 | Import new components |
| `XOT/vendors/_index.scss` | UPDATE | +1 | Import native alternatives |
| **TOTAL** | | **~1,055** | **New code in v2** |

---

## Success Criteria

### Quantitative Targets
✅ **SVEM Custom CSS Reduction**: 1121 lines → 200-300 lines (70-75% reduction)
✅ **New Components**: 8 components added to base stylesheet
✅ **Semantic Tokens**: 60+ tokens across 8 categories
✅ **Essential Utilities**: ~40 utility classes (minimal set)
✅ **ROI**: Positive after 2 projects using v2

### Qualitative Goals
✅ All SVEM component patterns have Cardiff-branded equivalents
✅ Clear, semantic class names (self-documenting)
✅ Consistent Cardiff branding without effort
✅ Maintains excellent existing architecture (flex/grid, typography)
✅ Faster development for future projects
✅ No jQuery dependency explosion (enhance existing)

---

## Migration Strategy

### Versioning Approach
- Create `css/xot_main_v2.css` alongside existing `css/xot_main.css`
- Old projects stay on v1 (no forced migration)
- New projects use v2
- Both versions maintained for 6 months minimum
- Clear deprecation timeline communicated

### SVEM Migration Example

**Before (v1 with 1121 lines custom CSS)**:
```html
<link rel="stylesheet" href="https://dandange8005.github.io/CU-Xerte-Themes/css/xot_main.css">
<link rel="stylesheet" href="custom.css"> <!-- 1121 lines -->
```

**After (v2 with 200-300 lines custom CSS)**:
```html
<link rel="stylesheet" href="https://dandange8005.github.io/CU-Xerte-Themes/css/xot_main_v2.css">
<link rel="stylesheet" href="custom.css"> <!-- 200-300 lines -->
```

### What Moves to Base Stylesheet

| Feature | Lines Saved | Now Available In Base |
|---------|-------------|----------------------|
| Cards | 90 | `.card`, `.card-accent`, `.info-card` |
| Badges | 60 | `.badge-success`, `.badge-warning`, etc. |
| Progress bars | 45 | `.progress`, `.progress-bar` |
| Toasts | 65 | `.toast`, `.toast-success` |
| Statistics | 80 | `.stats-grid`, `.stat-item` |
| Accordions | 120 | `details.details-cu-accent` |
| Design tokens | 150+ | 60+ CSS custom properties |
| Utilities | 100+ | Spacing, display, flex, borders, shadows |
| **TOTAL** | **710+** | **Moved to base stylesheet** |

### What Remains in Custom CSS (200-300 lines)
- Page-specific layouts (title page, instructions page unique designs)
- Domain-specific components (SVEM-specific evidence checklists)
- Unique transitions/animations (project-specific micro-interactions)
- Chart.js integration styling (data visualization customization)
- Print styles customization (report-specific print layouts)

---

## Component Usage Examples

### Cards Example
```html
<!-- Basic card -->
<div class="card">
    <h3>Card Title</h3>
    <p>Card content here.</p>
</div>

<!-- Card with left accent and status badge -->
<div class="card card-accent card-accent-success">
    <div class="card-header">
        <h3>Theme 1: Learning & Teaching</h3>
        <span class="badge badge-success">Complete</span>
    </div>
    <div class="card-body">
        <div class="progress">
            <div class="progress-bar" style="width: 100%"></div>
        </div>
        <p class="progress-label">100% Complete</p>
    </div>
</div>

<!-- Info card with icon -->
<div class="card info-card">
    <div class="info-card-icon">📊</div>
    <div class="info-card-value">12</div>
    <div class="info-card-label">Completed Themes</div>
</div>
```

### Badges Example
```html
<span class="badge badge-success">Complete</span>
<span class="badge badge-warning">In Progress</span>
<span class="badge badge-neutral">Not Started</span>
<span class="badge badge-cu-blue">Cardiff</span>
```

### Progress Bars Example
```html
<!-- Basic progress bar -->
<div class="progress">
    <div class="progress-bar progress-bar-success" style="width: 75%"></div>
</div>

<!-- With label -->
<div class="progress-labeled">
    <div class="progress">
        <div class="progress-bar progress-bar-cu-blue" style="width: 60%"></div>
    </div>
    <span class="progress-label">60%</span>
</div>
```

### Toast Notification Example
```html
<div class="toast-container">
    <div class="toast toast-success show">
        <span class="toast-icon">✓</span>
        <span class="toast-message">Progress saved successfully!</span>
    </div>
</div>
```

### Statistics Grid Example
```html
<div class="stats-grid">
    <div class="stat-item">
        <div class="stat-value stat-value-success">12</div>
        <div class="stat-label">Completed</div>
    </div>
    <div class="stat-item">
        <div class="stat-value stat-value-warning">3</div>
        <div class="stat-label">In Progress</div>
    </div>
    <div class="stat-item">
        <div class="stat-value">2</div>
        <div class="stat-label">Not Started</div>
    </div>
    <div class="stat-item">
        <div class="stat-value">85%</div>
        <div class="stat-label">Overall Progress</div>
    </div>
</div>
```

### Accordion Example
```html
<details class="details-cu-accent">
    <summary>
        <span class="level-header">Level 1: Emerging</span>
    </summary>
    <div class="content-body">
        <p>Level 1 description and criteria...</p>
        <div class="score-btn-group">
            <button class="score-btn" onclick="saveScore(1)">
                Set as Level 1
            </button>
            <button class="score-btn" onclick="saveScore(1.5)">
                Transitioning to Level 2 (1.5)
            </button>
        </div>
    </div>
</details>
```

---

## Design Principles

### 1. Component-First Philosophy
- Focus on semantic components, not utility explosion
- Each component should be self-contained and reusable
- Minimal configuration via modifier classes

### 2. Open Props Integration
- Maximize reuse of Open Props design tokens
- Map Open Props to Cardiff-specific semantic names
- Maintain consistency with broader design system

### 3. Cardiff Branding
- All components reflect Cardiff University visual identity
- Cardiff blue (`--cu-blue: #233E8B`) as primary accent
- Consistent typography using Franklin Gothic font family

### 4. Accessibility
- WCAG AA color contrast ratios
- Focus states for all interactive elements
- Semantic HTML structure
- Screen reader friendly markup

### 5. Performance
- Minimal CSS footprint (~1,055 lines added)
- Modern CSS features (custom properties, grid, flexbox)
- No JavaScript dependencies for base components
- Leverage existing jQuery UI (enhance, don't replace)

### 6. Maintainability
- Clear file organization by concern
- Consistent naming conventions (BEM-influenced)
- Well-commented code
- Modular SCSS architecture

---

## Testing Checklist

### Compilation Testing
- [ ] SCSS compiles without errors using Live Sass Compiler
- [ ] No breaking changes to existing xot_main.css users
- [ ] Minified version generates correctly
- [ ] Source maps work for debugging

### Component Testing
- [ ] Each component renders correctly in isolation
- [ ] Modifier classes work as expected
- [ ] Responsive behavior functions properly
- [ ] Hover/focus states appear correctly

### Cross-Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces elements correctly
- [ ] Color contrast ratios meet WCAG AA
- [ ] Focus indicators visible
- [ ] Semantic HTML used throughout

### Integration Testing
- [ ] Components work together (e.g., badges in cards)
- [ ] Design tokens applied consistently
- [ ] No naming conflicts with existing styles
- [ ] jQuery UI enhancements don't break functionality

### Performance Testing
- [ ] CSS file size reasonable (< 100KB minified)
- [ ] No layout shifts (CLS)
- [ ] Transitions smooth (60fps)
- [ ] Fast initial render

---

## Documentation Updates

### Files to Update
- [ ] `CLAUDE.md` - Add v2 architecture notes
- [ ] `README.md` - Update with v2 information
- [ ] GitHub Pages - Deploy xot_main_v2.css
- [ ] Create component showcase page
- [ ] Add migration guide for existing projects

### Component Documentation
Each component should be documented with:
- Purpose and use cases
- HTML structure example
- Available modifier classes
- Accessibility considerations
- Browser support notes

---

## Rollout Plan

### Phase 1: Internal Testing (Week 5)
- Deploy to development environment
- Test with SVEM migration
- Gather feedback from Cardiff team

### Phase 2: Beta Release (Week 6)
- Deploy to GitHub Pages as xot_main_v2.css
- Announce to Cardiff Xerte authors
- Collect bug reports and feedback

### Phase 3: Production Release (Week 7-8)
- Address beta feedback
- Finalize documentation
- Official announcement and training
- Monitor adoption metrics

### Phase 4: Maintenance (Ongoing)
- Bug fixes as needed
- Minor enhancements based on usage
- Quarterly review of component library
- Annual major version updates if needed

---

## Notes & Considerations

### Build Tool
- Continue using VS Code Live Sass Compiler
- Maintains consistency with current workflow
- No additional build tooling required
- Easy for content authors to understand

### Naming Conventions
- **Component blocks**: `.card`, `.badge`, `.progress`
- **Modifiers**: `.card-accent-success`, `.badge-lg`
- **State modifiers**: `.active`, `.show`
- **Utility classes**: `.mb-lg`, `.d-flex`, `.shadow-md`
- **Prefixes**: `.cu-*` for Cardiff-specific styles

### Version Control
- Tag release as `v2.0.0` in git
- Maintain v1.x branch for legacy support
- Semantic versioning for future updates
- Clear changelog documentation

### Future Enhancements (v2.1+)
- Dark mode support
- Additional color themes (Bristol, other universities)
- Print-specific utilities
- Data visualization helpers
- Animation library
- Responsive typography enhancements

---

## Contact & Support

For questions about this implementation plan:
- Review SVEM project for reference implementation
- Check CLAUDE.md for project-specific guidance
- Reference Open Props documentation for token system
- Consult Cardiff University brand guidelines

---

**Document Status**: Planning Complete - Ready for Implementation
**Last Updated**: December 2024
**Next Review**: After Week 1 (Foundation Phase)
