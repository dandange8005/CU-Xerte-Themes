## Bootstrap SASS Structure

abstract/ (things that are not compiled into css)
- _colours.scss
- _openProps.scss (not included)
- _breakpoints.scss
- _functions.scss
- _mixins.scss
- _type


Reset/
- overall.scss
- project.scss

base/
- customProperties.scss
- overallReset.scss
- typography.scss
    - paragraph
    - headings
    - table
    - lists
    - quote
- content.scss
    - images and figures
    - video
    - audio
    - file
    - embed
    - divider

layouts/
- header.scss
- footer.scss
- mainNav.scss
- sideNav.scss
- section.scss
- flex.scss
- grid.scss

components/


pages/
- article.css
- articleWide.css



vendors/
- bootstrap.scss (overwirte default bootstrap)
- prism.scss (code highligher)
- _jquery-ui.scss


bs_main.scss



```
Example

sass/
|
|– base/
|   |– _reset.scss       # Reset/normalize
|   |– _typography.scss  # Typography rules
|   ...                  # Etc…
|
|– components/
|   |– _buttons.scss     # Buttons
|   |– _carousel.scss    # Carousel
|   |– _cover.scss       # Cover
|   |– _dropdown.scss    # Dropdown
|   ...                  # Etc…
|
|– layout/
|   |– _navigation.scss  # Navigation
|   |– _grid.scss        # Grid system
|   |– _header.scss      # Header
|   |– _footer.scss      # Footer
|   |– _sidebar.scss     # Sidebar
|   |– _forms.scss       # Forms
|   ...                  # Etc…
|
|– pages/
|   |– _home.scss        # Home specific styles
|   |– _contact.scss     # Contact specific styles
|   ...                  # Etc…
|
|– themes/
|   |– _theme.scss       # Default theme
|   |– _admin.scss       # Admin theme
|   ...                  # Etc…
|
|– utils/
|   |– _variables.scss   # Sass Variables
|   |– _functions.scss   # Sass Functions
|   |– _mixins.scss      # Sass Mixins
|   |– _helpers.scss     # Class & placeholders helpers
|
|– vendors/
|   |– _bootstrap.scss   # Bootstrap
|   |– _jquery-ui.scss   # jQuery UI
|   ...                  # Etc…
|
|
`– main.scss             # Main Sass file
```