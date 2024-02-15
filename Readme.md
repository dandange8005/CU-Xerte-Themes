# CU-Xerte-Themes

## Introduction

- Why:
  - Why create the theme
  - The goal
  - The objectives
- Who:
  - Who is this for
- The approach
- How
  - how to use the themes
  - how to report issues
  - how to contribute


## About the project

<!-- - it is still in development therefore new updates and tweaks are constantly added to the master stylesheet
- I need to figure out a way that all projects use the template get the latest version of stylesheet
- I don't want people who use the template need to go through the hassel of updating the stylesheet themselves whenever there is an update -->


## Projects that are adopting the theme

### Bootstrap Theme

Projects that using the Bootstrap theme

- [Getting started with Mentimeter](https://xerte.cardiff.ac.uk/play_18796#page1) #DigEd
- [Ultra Essentials](https://xerte.cardiff.ac.uk/play_18321#UltraEssentials) #DigEd
- [Digital Learning Environment](https://xerte.cardiff.ac.uk/play_18292#page1) #DigEd
- [Ultra Courses Setup Checklist](https://xerte.cardiff.ac.uk/play_18204#page1) #DigEd
- [Ultra Courses Help for Staff](https://xerte.cardiff.ac.uk/play_19885#page1) #DigEd
- [Turnitin Ultra Courses](https://xerte.cardiff.ac.uk/play_19039#page1) #DigEd
- [‘Preparing for Ultra Courses’ Guide](https://xerte.cardiff.ac.uk/play_19104#Aims_&_Use_of_Resource) #DigEd
- [Learning Central Guidance for Students](https://xerte.cardiff.ac.uk/play_18610#Home) #DigEd
- [Engagement in classrooms using Mentimeter](https://xerte.cardiff.ac.uk/play_18796) #DigEd
- [Emergency Medicine Academic Centre](https://xerte.cardiff.ac.uk/play_20643) #MEDIC
- [School of Physics and Astronomy UG Support Toolkit](https://xerte.cardiff.ac.uk/play_19724) #PSYSX
- [Setting up Electronic Tests on Blackboard Ultra Courses](https://xerte.cardiff.ac.uk/play_20396) #COMSC
- [School of Biosciences Student Support Toolkit](https://xerte.cardiff.ac.uk/play_18168#page1) #BIOSI
- [Education Development Toolkit](https://xerte.cardiff.ac.uk/play_18569#page1) #LTA

### XOT Theme

Projects that using the XOT theme

- [Academic Integrity](https://xerte.cardiff.ac.uk/play_20576#page1) #DigEd
- [COMMUNITY OF INQUIRY TOOLKIT](https://xerte.cardiff.ac.uk/play_18701#page1) #DigEd


## Using the template

<!-- 1. Download the template from github
2. Upload the template to your Xerte project
3. Add the following code to the head of the project
    ```html
    <link rel="stylesheet" href="https://dandange8005.github.io/CU-Xerte-Themes/css/bs_main.min.css">
    ``` -->

## Contribution

## Main styles direct urls
github page link: 
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_main.css
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_main.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_article.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/css/bs_articleWide.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/openprop/open-props.min.css
- https://dandange8005.github.io/CU-Xerte-Themes/css/xot_main.min.css


Assets
Images
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/images/CU_logo.png
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/images/shadow.png

webfonts
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/webfonts/FranklinGothic-Book.woff
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/webfonts/FranklinGothic-BookIt.woff
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/webfonts/FranklinGothic-Demi.woff
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/webfonts/FranklinGothic-Med.woff
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/webfonts/FranklinGothic-MedIt-webfont.woff
- https://dandange8005.github.io/CU-Xerte-Themes/Assets/webfonts/FranklinGothicURW-Lig.woff


## Tools for developers
1. Open Props: https://open-props.style/
2. Color picker: http://color.aurlien.net/
3. Color Converter: https://htmlcolors.com/color-converter
4. Code block: prism
5. html encoder: http://htmlencode.net/
6. svg encoder: https://yoksel.github.io/url-encoder/

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

