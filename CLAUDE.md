# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SCSS-based theme system for Xerte Online Toolkits (XOT) and Bootstrap projects, primarily designed for Cardiff University but also includes themes for other universities like Bristol. The project generates CSS stylesheets for educational content platforms.

## Development Commands

### SCSS Compilation
- **VS Code Live Sass Compiler**: Use the Live Sass Compiler extension in VS Code to automatically compile SCSS files
- **Watch Mode**: The Live Sass Compiler will watch for changes and automatically compile SCSS to CSS
- **Output**: Compiled CSS files are generated in the `/css` directory in both expanded and compressed formats

### Key Files to Compile
- `Bootstrap/bs_main.scss` → `css/bs_main.css` and `css/bs_main.min.css`
- `Bootstrap/bs_article.scss` → `css/bs_article.css` and `css/bs_article.min.css`
- `Bootstrap/bs_articleWide.scss` → `css/bs_articleWide.css` and `css/bs_articleWide.min.css`
- `XOT/xot_main.scss` → `css/xot_main.css` and `css/xot_main.min.css`
- `Bristol/bristol_main.scss` → `css/bristol_main.css` and `css/bristol_main.min.css`

## Architecture

### Theme Structure
The project follows a modular SCSS architecture with three main theme variants:

1. **Bootstrap Theme** (`/Bootstrap/`) - Main Cardiff University theme
2. **XOT Theme** (`/XOT/`) - Xerte Online Toolkit specific theme
3. **Bristol Theme** (`/Bristol/`) - University of Bristol variant

### SCSS Organization
Each theme follows a consistent structure:
- `abstract/` - Variables, mixins, and functions (colors, breakpoints)
- `base/` - Base styles, typography, resets
- `components/` - UI components (buttons, cards, boxes, etc.)
- `layouts/` - Layout-related styles (header, footer, navigation)
- `utility/` - Utility classes and helpers
- `vendors/` - Third-party library styles
- `pages/` - Page-specific styles (XOT theme only)

### Key Color System
Cardiff University brand colors are defined in `Bootstrap/abstract/_cuColours.scss`:
- Primary: `$colourRed: #d4374a`
- Secondary: `$colourGreen: #008458`
- Link: `$colourLink: #045bc6`
- Accent: `$colourEnergyYellow: #f8d349`

### CSS Custom Properties
The themes use CSS custom properties (CSS variables) for theming:
- `--clr-accent` - Main accent color
- `--clr-h`, `--clr-s`, `--clr-l` - HSL color components
- Located in `*_customProperties.scss` files

## Key Components

### Bootstrap Theme Components
- **Boxes** (`_boxes.scss`) - Content containers with various styles
- **Cards** (`_cards.scss`) - Card-based layouts
- **Buttons** (`_buttons.scss`) - Button styles following brand guidelines
- **Callouts** (`_callout.scss`) - Highlighted content sections
- **Navigation** (`_bsnavigators.scss`) - Bootstrap navigation components

### XOT Specific Components
- **Page Types** (`pages/`) - Specific page layouts (quiz, media, text pages)
- **Sidebar** (`_sidebar.scss`) - XOT sidebar navigation
- **Alerts** (`_alerts.scss`) - System notifications and messages

### Utility Classes
- **Spacing** (`_spacing.scss`) - Margin and padding utilities
- **Grid** (`_grid.scss`) - Grid system utilities
- **Flex** (`_flex.scss`) - Flexbox utilities
- **Typography** (`_text.scss`) - Text styling utilities

## External Dependencies

### Open Props Integration
The project integrates [Open Props](https://open-props.style/) for design tokens:
- CSS custom properties for consistent design
- Spacing, sizing, and color tokens
- Animation and shadow utilities

### Third-party Libraries
- **Bootstrap** - UI framework (imported in `vendors/_bootstrap.scss`)
- **Prism** - Code syntax highlighting (`vendors/_prism.scss`)
- **jQuery UI** - UI components (XOT theme only)

## Assets

### Fonts
Franklin Gothic font family in multiple weights:
- Book, Medium, Demi weights
- Located in `Assets/Fonts/`

### Images and Logos
- Cardiff University logos in various formats
- Located in `Assets/Logos/` and `Assets/images/`

### Icons
- Google Material Icons integration
- Custom SVG icons in `Assets/icons/`

## Usage Notes

### Theme Customization
- Colors can be customized via CSS custom properties
- Main accent color controlled through `--clr-accent` variable
- HSL color values allow for programmatic color manipulation

### Responsive Design
- Breakpoints defined in `abstract/_breakpoints.scss`
- Media queries in `_mediaQueries.scss`
- Mobile-first approach

### Adding New Components
1. Create component file in appropriate `components/` directory
2. Import in the main theme's `components/_index.scss`
3. Follow existing naming conventions and BEM methodology

### GitHub Pages Deployment
The themes are deployed to GitHub Pages with direct CSS links:
- `https://dandange8005.github.io/CU-Xerte-Themes/css/[theme-name].min.css`