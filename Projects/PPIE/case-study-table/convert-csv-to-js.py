#!/usr/bin/env python3
"""
Convert CSV to JavaScript data for case studies table
"""

import csv
import json

def convert_csv_to_js(csv_file, output_file):
    case_studies = []

    # Try different encodings
    encodings = ['utf-8', 'latin-1', 'cp1252', 'iso-8859-1']
    success = False

    for encoding in encodings:
        try:
            with open(csv_file, 'r', encoding=encoding, errors='replace') as f:
                reader = csv.reader(f)
                headers = next(reader)
                case_studies = []

                for row in reader:
                    # Skip empty rows
                    if not row or len(row) < 2 or not row[1].strip():
                        continue

                    # Skip rows marked as "NOT INCLUDED"
                    if 'NOT INCLUDED' in row[1]:
                        continue

                    # Extract data from row
                    study = {
                        'title': row[1].strip() if len(row) > 1 else '',
                        'authors': [
                            row[2].strip() if len(row) > 2 and row[2].strip() else None,
                            row[3].strip() if len(row) > 3 and row[3].strip() else None,
                            row[4].strip() if len(row) > 4 and row[4].strip() else None
                        ],
                        'school': row[5].strip() if len(row) > 5 else '',
                        'division': row[6].strip() if len(row) > 6 else '',
                        'centre': row[7].strip() if len(row) > 7 else '',
                        'modules': row[8].strip() if len(row) > 8 else '',
                        'categories': [
                            row[9].strip() if len(row) > 9 and row[9].strip() else None,
                            row[10].strip() if len(row) > 10 and row[10].strip() else None,
                            row[11].strip() if len(row) > 11 and row[11].strip() else None
                        ],
                        'keywords': [
                            row[12].strip() if len(row) > 12 and row[12].strip() else None,
                            row[13].strip() if len(row) > 13 and row[13].strip() else None,
                            row[14].strip() if len(row) > 14 and row[14].strip() else None,
                            row[15].strip() if len(row) > 15 and row[15].strip() else None,
                            row[16].strip() if len(row) > 16 and row[16].strip() else None
                        ],
                        'url': row[17].strip() if len(row) > 17 else ''
                    }

                    # Filter out None values from arrays
                    study['authors'] = [a for a in study['authors'] if a]
                    study['categories'] = [c for c in study['categories'] if c]
                    study['keywords'] = [k for k in study['keywords'] if k]

                    case_studies.append(study)

                success = True
                print(f"Successfully read file with {encoding} encoding")
                break

        except (UnicodeDecodeError, Exception) as e:
            print(f"Failed with {encoding}: {e}")
            continue

    if not success:
        print("Could not decode file with any encoding")
        return

    # Write as JavaScript
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('// Case study data generated from CSV\n')
        f.write('var caseStudies = ')
        f.write(json.dumps(case_studies, indent=4, ensure_ascii=False))
        f.write(';\n')

    print(f"Converted {len(case_studies)} case studies")
    print(f"Output written to: {output_file}")

if __name__ == '__main__':
    convert_csv_to_js('case-studies.csv', 'case-studies-data.js')
