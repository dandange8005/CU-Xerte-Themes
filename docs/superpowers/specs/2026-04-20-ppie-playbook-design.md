---
title: PPIE Bootstrap Playbook — Design Spec
date: 2026-04-20
status: approved
---

## What

A single Markdown decision-log playbook at `docs/ppie-bootstrap-playbook.md`, extracted from the PPIE Training Programme project. Personal reference for future Xerte Bootstrap projects.

## Format

Decision Log: each entry is a Q (the decision you face mid-project) → A (what PPIE chose) → Why (the reason it was the right call).

## Sections

1. **Project Setup** — file architecture, dependency order, when `project-style.css` vs page-level `<style>`
2. **Layout Patterns** — full-width section bands, flex layouts, bento grid, auto-columns, responsive table
3. **Components** — which component for which job (cards, quotations, video+caption, infographic+details)
4. **Theming** — brand color decisions, shade scales, CSS custom property naming, color variant modifiers
5. **Tooling & Workflow** — invoice tracking, Python scripts, CSV→JS, per-component READMEs

## Out of scope

- Code snippets (high-level principles only)
- Shared team documentation
- Component library / template files
