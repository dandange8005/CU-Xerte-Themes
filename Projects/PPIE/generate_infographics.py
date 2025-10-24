#!/usr/bin/env python3
import csv
import html
import re

def parse_text_content(text):
    """Parse the full text content and convert to HTML"""
    if not text:
        return ""

    lines = text.strip().split('\n')
    html_parts = []
    in_list = False

    for line in lines:
        line = line.strip()
        if not line:
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            continue

        # Check if line is all caps (likely a heading)
        if line.isupper() and not line.startswith('-'):
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            html_parts.append(f'<h4>{html.escape(line)}</h4>')
        # Check if line starts with a dash or bullet (list item)
        elif line.startswith('-') or line.startswith('•'):
            if not in_list:
                html_parts.append('<ul>')
                in_list = True
            # Remove leading dash/bullet and whitespace
            item_text = re.sub(r'^[-•]\s*', '', line)
            html_parts.append(f'<li><p>{html.escape(item_text)}</p></li>')
        # Check if it looks like a quoted paragraph
        elif line.startswith('"') and line.endswith('"'):
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            html_parts.append(f'<blockquote><p>{html.escape(line)}</p></blockquote>')
        # Regular paragraph
        else:
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            # Check if it's a bolded section title (contains keywords)
            if any(keyword in line for keyword in ['Benefits for', 'Do\'s', 'Don\'ts', 'Step ', 'Stage ']):
                html_parts.append(f'<p><strong>{html.escape(line)}</strong></p>')
            else:
                html_parts.append(f'<p>{html.escape(line)}</p>')

    if in_list:
        html_parts.append('</ul>')

    return '\n'.join(html_parts)


def generate_infographic_section(name, content, canva_link, location):
    """Generate HTML for a single infographic section"""

    # Parse the content
    parsed_content = parse_text_content(content)

    # Generate figcaption
    figcaption_parts = [f'<strong>{html.escape(name)}</strong>']

    if canva_link:
        figcaption_parts.append(f' - <a href="{html.escape(canva_link)}" target="_blank">View in Canva</a>')

    figcaption = '\n'.join(figcaption_parts)

    # Add location to the bottom of content if it exists
    location_html = ''
    if location:
        location_html = f'\n<hr>\n<p><small><em>Location: {html.escape(location)}</em></small></p>'

    # Generate the section
    section = f'''
        <section>
            <h2>{html.escape(name)}</h2>
            <figure class="image">
                <img src="placeholder.jpg" />
                <figcaption>
                    {figcaption}
                </figcaption>
            </figure>
            <details class="details">
                <summary class="details__summary">View text alternative</summary>
                <div class="details__text">
                    {parsed_content}{location_html}
                </div>
            </details>
        </section>
'''

    return section


# Read CSV and generate HTML
csv_file = '/Users/nanzhang/Downloads/Infographics_Accessibility_Catalogue_Template - PPIE Training Resource.csv'
output_file = '/Users/nanzhang/Developer/Github Repos/CU Xerte Themes/Projects/PPIE/infographic_sections.html'

sections = []

with open(csv_file, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row['Infographic Name']
        content = row['Full Text Content (Detailed)']
        canva_link = row['Canva Public Link']
        location = row['Location (Page/Section)']

        if name:  # Only process rows with a name
            section = generate_infographic_section(name, content, canva_link, location)
            sections.append(section)

# Write all sections to file
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sections))

print(f"Generated {len(sections)} infographic sections")
print(f"Output saved to: {output_file}")
