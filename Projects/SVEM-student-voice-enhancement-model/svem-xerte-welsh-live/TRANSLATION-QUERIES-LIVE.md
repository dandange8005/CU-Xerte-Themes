# Welsh (live-based) — Translation Queries & Build Notes

`svem-xerte-welsh-live/` = the Welsh version rebuilt on the **live English architecture**
(`svem-xerte-live/`). Separate Xerte resource, own `sv_cy_` localStorage namespace,
live (no-chart) summary. Reuses the signed-off Welsh from `svem-xerte-welsh/` wherever it
existed; anything not sourced from signed-off material is flagged below for review.

## ⚠️ Page-ID mapping (MUST fix when the Welsh Xerte object is built)

The Welsh resource will have its **own** Xerte page IDs. Every English page-ID reference
must be repointed once the Welsh object exists:
- `scoring-xerte.js` → `CONFIG.THEMES_OVERVIEW_PAGE_ID` (currently the English `PG1765898999143`)
- In pages: all `x_navigateToPage(false,{type:'linkID',ID:'PG...'})` calls, and the
  themes-overview theme-card links (`PG1765751366809`, `PG1765751572203`, `PG1765751630571`,
  `PG1765751762045`, `PG1770647401918`, `PG1765898999143`). `[next]`/`[previous]` tokens are fine.

## scoring-xerte.js string provenance

### ✅ Signed-off / reused from existing Welsh corpus
- Evidence box: label "Tystiolaeth a Nodiadau Cyd-destunol", intro, 4-point checklist,
  and unsure checkbox "Nid wyf yn hyderus yn fy sgiliau hunanfyfyrio ar gyfer y maes hwn"
  — from `svem-xerte-welsh/page-04-theme-1.html`.
- Status chips: "Heb Ddechrau" / "Ar y Gweill" / "Wedi'i Gwblhau" — from v3 `STR_V2.cy`.
- "Ehangu Popeth" (Expand All), "Lefel" — from existing Welsh pages / `terminology-cy.csv`.

### ❓ Provisional (my best-effort Welsh — NOT yet signed off, please review)
| English (live) | Provisional Welsh | Where |
|---|---|---|
| Light / Dark | Golau / Tywyll | dark-mode toggle label |
| Enable/Disable dark mode | Galluogi/Analluogi modd tywyll | toggle aria-label |
| This section (fallback) | Yr adran hon | `getSectionAccessibleName` |
| Collapse All | Crebachu Popeth | `toggleSection` (Expand All was signed-off) |
| "… set to Level N" | "… wedi'i osod i Lefel N" | score toast |
| "Notes saved for …" | "Nodiadau wedi'u cadw ar gyfer …" | note toast |
| "Marked as not confident for …" | "Wedi'i nodi'n ansicr ar gyfer …" | unsure toast |
| "Confidence restored for …" | "Hyder wedi'i adfer ar gyfer …" | unsure toast |
| "N of M sections completed" | "N o M adran wedi'u cwblhau" | theme card progress |
| "All data has been reset" | "Mae'r holl ddata wedi'i ailosod" | reset toast |
| "Data imported successfully! (N sections)" | "Data wedi'i fewnforio'n llwyddiannus! (N adran)" | import toast |
| "Importing assessment data" | "Yn mewnforio data'r asesiad" | import toast |
| "Error: Invalid JSON file" | "Gwall: Ffeil JSON annilys" | import toast |
| "Error: Could not read file" | "Gwall: Methu darllen y ffeil" | import toast |
| "Progress saved!" | "Cynnydd wedi'i gadw!" | save toast |

("Invalid data format" is an internal Error() message, never shown — left in English.)

## Build status — ALL PAGES BUILT (2026-07-24)
- [x] `custom.css` — copied from live verbatim (language-neutral)
- [x] `scoring-xerte.js` — Welsh engine (sv_cy_ prefix + Welsh strings; logic identical
      to live, verified by diff + `node --check`)
- [x] page-01 title
- [x] page-02 introduction
- [x] page-03 enhancement plan (mirrors live's commented-out explainer block)
- [x] page-04 themes overview
- [x] page-05 theme 1  (evidence boxes → data-driven; Welsh content verbatim)
- [x] page-06 theme 2
- [x] page-07 theme 3
- [x] page-08 summary (live no-chart design + Welsh strings; script `node --check` OK)
- [x] page-09 resources (Welsh doc URLs kept; live a11y structure applied)

## ⚠️ Content decisions & divergences to review

1. **page-08 summary — CONTENT I OMITTED (needs your call / restore):**
   - Dropped the **"CPD Asynch LTA LC module"** section that live English has (folder
     19–23 list). It's English course-folder content; I left it out pending a Welsh
     version. **Say the word and I'll add it back (translated wrapper, English folder names).**
   - Reduced the "Helpful Resources" teaser from **4 links to 2** (kept Case study +
     MME guidance with Welsh doc URLs; dropped "Empowering Your Student Academic Reps"
     and "Student Voice Induction Slides"). Restore on request.

2. **page-08 maturity names — deliberate consistency choice:** live English summary uses
   `Moving towards Baseline` / `Baseline Practice` for levels 1–2 (differs from its OWN
   theme pages AND the signed-off Welsh). I used the **signed-off Welsh** names
   (`Arfer Sylfaenol` … `Arfer Eithriadol`) so the Welsh tool is internally consistent.
   Flag if you want the English's alternate naming translated instead.

3. **page-02 "How does it benefit you?" para 1 — translation drift:** your approved Welsh
   here was translated from an OLDER English than live (live now emphasises "critical
   self-appraisement / does not generate an action plan automatically"). I kept the
   **approved Welsh** rather than machine-translate the changed English. Para 2 matches.
   Also removed "drafft" from the Medr code reference to match live ("…Cod Ymgysylltu
   â Dysgwyr Medr").

4. **page-08 provisional Welsh** (not signed off): SECTION_SHORT_DISPLAY short names
   (`Rolau a Strwythurau`, `Canol Modiwl`, etc.), the three SECTIONS theme names
   (`Thema 1: Strwythurau sy'n Cefnogi Llais y Myfyrwyr`, `Thema 2: …a SSPs`,
   `Thema 3: Mecanweithiau Ffurfiol`), and toasts (`…wedi'i Gynhyrchu`, `…wedi'i lawrlwytho'n llwyddiannus`).

5. **page-09 resources:** resource-link display titles kept in **English** (matches the
   existing Welsh resources page convention; the Welsh doc URLs point to the (Welsh)
   SharePoint folder). Back-nav token changed `[prev]` → `[previous]` and label to
   "Yn ôl i'r Crynodeb".

6. **page-08 CONFIG.THEMES_OVERVIEW_PAGE_ID** and all `PG...` page-ID references in every
   page still point at the ENGLISH resource — repoint when the Welsh Xerte object exists
   (see page-ID section at top).
