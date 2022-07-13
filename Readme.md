Project Notes:
## Main styles linkS
github page link: 
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_main.css
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_main.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_article.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_articleWide.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/openprop/open-props.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/images/CU_logo.png
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/images/shadow.png
- 


## Tools for developers
1. Open Props: https://open-props.style/
2. Color picker: http://color.aurlien.net/
3. Color Converter: https://htmlcolors.com/color-converter
4. Code block: prism
5. html encoder: http://htmlencode.net/
6. svg encoder: https://yoksel.github.io/url-encoder/


## Short tutorials

### How to inserting code snippets in Xerte Bootstrap theme template 
- Tutorial: https://clt.champlain.edu/kb/inserting-code-snippets/
- go to https://prismjs.com/
- select theme
- download stylesheet
- copy js library cdn: https://cdnjs.com/libraries/prism
-  Include prismjs stylesheet and js library into the project
- use http://htmlencode.net/ to encode html to escape the <> characters
- create a new text page and paste the code in the following structure


## Working with Icons

Icon options
- Google materials icons
- Bootstrap icons
- Font Awesome Icons

Tools:
[URL-encoder for SVG](https://yoksel.github.io/url-encoder/)

Embedding Google Icon steps
Using as image
Using as background image in css

1. find the icon
2. download the icon and save to Assets/icons
3. copy the svg code
4. use [URL-encoder for SVG](https://yoksel.github.io/url-encoder/) to get the css code
    ```css
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='40' width='40'%3E%3Cpath d='M10.458 29.833 8.5 27.875l16.792-16.75H10V8.333h20v20h-2.792V13.042Z'/%3E%3C/svg%3E");
    ```
5. change the fill colour
6. use the follow code snippet
    ```css
    .icon {
        position: relative;
        }
    .icon::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 10rem;
    aspect-ratio: 1;
    background-repeat: no-repeat;
    background-size: cover;
    }
    .arrow::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='40' fill='darkgreen' width='40'%3E%3Cpath d='M10.458 29.833 8.5 27.875l16.792-16.75H10V8.333h20v20h-2.792V13.042Z'/%3E%3C/svg%3E");
    }
    ```

