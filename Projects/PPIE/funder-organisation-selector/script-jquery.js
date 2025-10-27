/**
 * PPIE Funder Organisation Selector - JavaScript Implementation
 *
 * Development Time Estimate (Junior Developer): 2.5-3.5 hours
 *
 * This file handles all the interactive functionality for the funder selector app.
 *
 * Key Components:
 * 1. Data structure (30-45 min)
 *    - 15 organisations with complete metadata
 *    - Resources, requirements, panel information
 *    - Logo URLs and category classifications
 *
 * 2. jQuery initialization and event handling (45 min - 1 hour)
 *    - Document ready handler
 *    - Dropdown change events
 *    - Filter tag click events
 *    - State management (currentFilter)
 *
 * 3. Dynamic content generation (1-1.5 hours)
 *    - populateDropdown() - filtered dropdown options
 *    - displayFunder() - render funder details with mixed HTML/text content
 *    - showWelcomeMessage() - empty state display
 *    - HTML string building with conditional rendering
 *
 * 4. Data filtering and selection (30 min)
 *    - Filter by category (UKRI, medical, other)
 *    - Find selected funder by ID
 *    - jQuery grep/each for array operations
 *
 * Complexity factors:
 * - Mixed data formats (html vs text+link resources)
 * - Conditional rendering (UKRI badge, logos, links)
 * - jQuery-specific methods ($.grep, $.each)
 * - Safe HTML rendering
 */

// Embedded JSON data
var fundersData = [
    {
        "id": "alzheimers-research-uk",
        "name": "Alzheimer's Research UK",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Alzheimer's-Research-UK-Logo.png",
        "resources": [
            {"html": "Alzheimer's encourage members of the public affected by the disease to sign up to the People in Research database to support <a href='https://www.alzheimersresearchuk.org/research/getting-involved-in-research/other-ways-to-get-involved/#patient%20and%20public%20involvement' target='_blank'>PPI</a> activity."},
            {"html": "<a href='https://www.alzheimersresearchuk.org/grants/inspire-fund/' target='_blank'>Inspire Fund</a> is a public engagement grant providing funding for projects that engage underserved communities with the topic of brain health and reducing the risk of dementia"}
        ],
        "requirements": "None specified.",
        "panels": "Alzheimer's Research UK uses Lay Research Volunteers to review grant applications."
    },
    {
        "id": "bbsrc",
        "name": "Biotechnology and Biological Sciences Research Council (BBSRC)",
        "category": "ukri",
        "isUKRI": true,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/ukri-bbsrc-logo.png",
        "resources": [
            {"text": "BBSRC broad definition of public engagement", "link": null},
            {"text": "Public engagement @BBSRC", "link": "https://www.ukri.org/what-we-do/public-engagement/public-engagement-bbsrc/"},
            {"text": "UKRI public engagement strategy", "link": "https://www.ukri.org/what-we-do/public-engagement/our-strategy/"}
        ],
        "requirements": "UKRI encourages researchers to plan and budget for public engagement from the start of their projects.",
        "requirementsLink": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/",
        "panels": "UKRI is increasingly including people with lived experience in assessing funding applications.",
        "panelsLink": "https://www.ukri.org/what-we-do/public-engagement/how-ukri-supports-public-involvement-in-research-and-innovation/"
    },
    {
        "id": "blood-cancer-uk",
        "name": "Blood Cancer UK",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/BCUK-Logo.png",
        "resources": [
            {"text": "Involvement Network for people with lived experience", "link": "https://bloodcancer.org.uk/get-involved/give-time/help-shape-and-improve-our-work/"},
            {"text": "PPI Resources and Guidance for Researchers", "link": "https://bloodcancer.org.uk/research/funding/patient-public-involvement/"}
        ],
        "requirements": "Encourages meaningful involvement of patients and the public in research proposals.",
        "requirementsLink": "https://bloodcancer.org.uk/research/funding/how-we-fund-research/",
        "panels": "Patient Voice Grant Advisory Network reviews all grant applications.",
        "panelsLink": "https://bloodcancer.org.uk/research/funding/patient-public-involvement/"
    },
    {
        "id": "bowel-research-uk",
        "name": "Bowel Research UK",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/bowel-research-uk-logo.png",
        "resources": [
            {"text": "PaRT for Researchers provides facilitation of PPI activity (fees apply)", "link": "https://bowelresearchuk.org/our-research/patient-and-public-involvement/part-for-researchers/"},
            {"text": "Researcher PPI Code of Conduct", "link": "https://bowelresearchuk.org/our-research/patient-and-public-involvement/part-for-researchers/researcher-ppi-code-of-conduct/"}
        ],
        "requirements": "Public involvement in your research can improve your chances of funding success.",
        "panels": "PaRT Network Members review funding applications and lay summaries."
    },
    {
        "id": "bhf",
        "name": "British Heart Foundation (BHF)",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/British-Heart-Foundation-Logo.png",
        "resources": [
            {"text": "Patient and Public Involvement in Research", "link": "https://www.bhf.org.uk/for-professionals/information-for-researchers/how-to-apply/patient-and-public-involvement"},
            {"text": "PPI in the Research Cycle", "link": "https://www.bhf.org.uk/for-professionals/information-for-researchers/how-to-apply/patient-and-public-involvement#cycle"},
            {"text": "BHF Heart Voices network", "link": "https://www.bhf.org.uk/for-professionals/information-for-researchers/how-to-apply/patient-and-public-involvement#help"}
        ],
        "requirements": "PPI is an essential requirement for BHF's Clinical Study Grants and Healthcare Innovation Fund.",
        "requirementsLink": "https://www.bhf.org.uk/for-professionals/information-for-researchers/how-to-apply/patient-and-public-involvement#info",
        "panels": "Up to 4 members of the Patient Advisory Group (PAG) review applications."
    },
    {
        "id": "cruk",
        "name": "Cancer Research UK (CRUK)",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Cancer-Research-UK-Logo.png",
        "resources": [
            {"text": "Patient involvement toolkit for researchers", "link": "https://www.cancerresearchuk.org/funding-for-researchers/patient-involvement-toolkit-for-researchers"},
            {"text": "Involvement Network", "link": "https://www.cancerresearchuk.org/get-involved/patient-involvement"},
            {"text": "Signatory of Shared Commitment to Public Involvement", "link": "https://www.nihr.ac.uk/shared-commitment-public-involvement"}
        ],
        "requirements": "Many funding schemes cover public involvement expenses.",
        "requirementsLink": "https://www.cancerresearchuk.org/funding-for-researchers/applying-for-funding/how-to-make-a-successful-application",
        "panels": "Patients and public members contribute to funding reviews.",
        "panelsLink": "https://www.cancerresearchuk.org/funding-for-researchers/how-we-deliver-research/ppi-statement-of-intent"
    },
    {
        "id": "diabetes-uk",
        "name": "Diabetes UK",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Diabetes-UK-Logo.png",
        "resources": [
            {"text": "Patient and Public Involvement (PPI) in your study", "link": "https://www.diabetes.org.uk/our-research/for-researchers/applying-for-funding/patient-and-public-involvement"},
            {"text": "PPI Guidance for researchers", "link": "https://www.diabetes.org.uk/sites/default/files/2017-10/0983_PPI%20resource_guidance-document_DL_v5.pdf"}
        ],
        "requirements": "Involvement at all stages of clinical and basic research is encouraged.",
        "panels": "The Grants Advisory Panel (GAP) reviews applications for evidence of PPI."
    },
    {
        "id": "epsrc",
        "name": "Engineering and Physical Sciences Research Council (EPSRC)",
        "category": "ukri",
        "isUKRI": true,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/ukri-epsrc-logo.png",
        "resources": [
            {"text": "Patient and public engagement", "link": "https://www.ukri.org/councils/epsrc/guidance-for-applicants/what-to-include-in-your-proposal/health-technologies-impact-and-translation-toolkit/stakeholder-engagement/patients-and-the-public/"},
            {"text": "Public engagement @EPSRC", "link": "https://www.ukri.org/what-we-do/public-engagement/public-engagement-epsrc/"}
        ],
        "requirements": "UKRI encourages researchers to plan and budget for public engagement from the start.",
        "requirementsLink": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/",
        "panels": "UKRI includes people with lived experience in assessing funding applications.",
        "panelsLink": "https://www.ukri.org/what-we-do/public-engagement/how-ukri-supports-public-involvement-in-research-and-innovation/"
    },
    {
        "id": "health-care-research-wales",
        "name": "Health and Care Research Wales",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Health-and-Care-Research-Wales-logo.png",
        "resources": [
            {"text": "Involving the public in your research", "link": "https://healthandcareresearchwales.org/researchers-support-and-guidance-researchers-develop-research-idea/involving-public-your-research"},
            {"text": "Enabling Involvement Fund", "link": "https://healthandcareresearchwales.org/form/request-for-public-involvement-s"}
        ],
        "requirements": "Detail public involvement plans following UK Standards for Public Involvement.",
        "requirementsLink": "https://sites.google.com/nihr.ac.uk/pi-standards/home",
        "panels": "Members of the public sit on funding panels to help decide which projects to support."
    },
    {
        "id": "kidney-research-uk",
        "name": "Kidney Research UK (KRUK)",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Kidney-Research-UK-Logo.png",
        "resources": [
            {"text": "Kidney Voices for Research online community", "link": "https://www.kidneyresearchuk.org/research/patient-involvement/"},
            {"text": "Kidney Patient Involvement Network (KPIN)", "link": "https://www.kidneyresearchuk.org/research/research-networks/kidney-patient-involvement-network/"},
            {"text": "Grants up to £1000 for patient information days", "link": "https://kidneyresearchuk.org/wp-content/uploads/2021/11/Patient-Info-Days-Guidance.pdf"}
        ],
        "requirements": "Patient involvement is one of six supporting principles underpinning KRUK operations.",
        "panels": "Lay Advisory Group (LAG) contributes to research funding decisions.",
        "panelsLink": "https://www.kidneyresearchuk.org/research/patient-involvement/lay-advisory-group/"
    },
    {
        "id": "mrc",
        "name": "Medical Research Council (MRC)",
        "category": "ukri",
        "isUKRI": true,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/ukri-mrc-logo.png",
        "resources": [
            {"text": "Public involvement and engagement @MRC", "link": "https://www.ukri.org/what-we-do/public-engagement/public-engagement-mrc/"},
            {"text": "Public partnership strategy 2024 to 2027", "link": "https://www.ukri.org/publications/mrc-public-partnerships-strategy/"}
        ],
        "requirements": "Applicants expected to build on UK Standards for Public Involvement, GRIPP2, PIRIT, PiiAF, etc.",
        "requirementsLink": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/",
        "panels": "Appropriate public partners assess grant applications."
    },
    {
        "id": "nihr",
        "name": "National Institute for Health and Care Research (NIHR)",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/NIHR-Logo.png",
        "resources": [
            {"text": "Briefing notes for researchers", "link": "https://www.nihr.ac.uk/briefing-notes-researchers-public-involvement-nhs-health-and-social-care-research"},
            {"text": "Resources and training", "link": "https://www.learningforinvolvement.org.uk/"},
            {"text": "Practical tools for PPI", "link": "https://oxfordbrc.nihr.ac.uk/practical-tools-for-ppi/"},
            {"text": "Signatory of Shared Commitment", "link": "https://www.nihr.ac.uk/shared-commitment-public-involvement"}
        ],
        "requirements": "PPIE is fundamental, not optional. PPIE score is equally weighted with all other sections.",
        "requirementsLink": "https://www.nihr.ac.uk/documents/shared-commitment-to-public-involvement/30134",
        "panels": "Patients, carers, and public members review proposals and sit on panels.",
        "panelsLink": "https://www.nihr.ac.uk/nihr-public-contributor-roles-framework"
    },
    {
        "id": "royal-society",
        "name": "Royal Society",
        "category": "other",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/royal-society-logo.png",
        "resources": [
            {"text": "Public Engagement Fund", "link": "https://royalsociety.org/grants/public-engagement-fund/"},
            {"text": "Training and mentoring schemes", "link": null}
        ],
        "requirements": "Public engagement costs are eligible costs.",
        "requirementsLink": "https://royalsociety.org/-/media/grants/about-grants/royal-society-grant-funding-guidance.pdf",
        "panels": "Public engagement professionals are involved in review panels."
    },
    {
        "id": "ukri",
        "name": "UK Research and Innovation (UKRI)",
        "category": "ukri",
        "isUKRI": true,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/UKRI-logo.png",
        "resources": [
            {"text": "Guidance on public involvement", "link": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/"},
            {"text": "UKRI public engagement strategy", "link": "https://www.ukri.org/publications/ukri-public-engagement-strategy/"},
            {"text": "Signatory of Shared Commitment", "link": "https://www.nihr.ac.uk/shared-commitment-public-involvement"}
        ],
        "requirements": "Plan and budget for public engagement from the start. Requirements vary across councils.",
        "requirementsLink": "https://www.ukri.org/what-we-do/public-engagement/",
        "panels": "Increasingly including people with lived experience in assessing applications."
    },
    {
        "id": "wellcome-trust",
        "name": "Wellcome Trust",
        "category": "other",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Wellcome-Trust-logo.png",
        "resources": [
            {"text": "Step by step guide for planning engagement activities", "link": "https://cms.wellcome.org/sites/default/files/planning-engagement-guide-wellcome-nov14.pdf"}
        ],
        "requirements": "Encourages embedding stakeholder perspectives throughout research lifecycle.",
        "requirementsLink": "https://wellcome.org/research-funding/guidance/prepare-to-apply/using-engaged-research-approach",
        "panels": "Patient panels mentioned but role not explicitly stated."
    }
];

// Using jQuery
$(document).ready(function() {
    console.log('jQuery ready - initializing Funder App');

    var currentFilter = 'all';

    // Populate dropdown
    function populateDropdown(filter) {
        filter = filter || 'all';
        var $select = $('#funderSelect');

        if ($select.length === 0) {
            console.error('funderSelect element not found');
            return;
        }

        $select.html('<option value="">-- Choose an organisation --</option>');

        var filtered = filter === 'all' ? fundersData : $.grep(fundersData, function(funder) {
            return funder.category === filter;
        });

        $.each(filtered, function(i, funder) {
            $select.append($('<option>', {
                value: funder.id,
                text: funder.name
            }));
        });
    }

    // Display funder details
    function displayFunder(funder) {
        var resourcesHTML = '<ul>';
        $.each(funder.resources, function(index, resource) {
            if (resource.html) {
                // Use HTML directly for inline links
                resourcesHTML += '<li>' + resource.html + '</li>';
            } else if (resource.link) {
                // Legacy format: whole text as link
                resourcesHTML += '<li><a href="' + resource.link + '" target="_blank">' + resource.text + '</a></li>';
            } else {
                resourcesHTML += '<li>' + resource.text + '</li>';
            }
        });
        resourcesHTML += '</ul>';

        var requirementsHTML = funder.requirementsLink
            ? funder.requirements + ' <a href="' + funder.requirementsLink + '" target="_blank">More information</a>'
            : funder.requirements;

        var panelsHTML = funder.panelsLink
            ? funder.panels + ' <a href="' + funder.panelsLink + '" target="_blank">More information</a>'
            : funder.panels;

        var logoHTML = funder.logo
            ? '<img src="' + funder.logo + '" alt="' + funder.name + ' Logo" class="funder-logo" />'
            : '';

        var html = '<div class="funder-details">' +
            '<h3 class="funder-title">' + funder.name +
            (funder.isUKRI ? ' <span class="ukri-badge">UKRI</span>' : '') +
            '</h3>' +
            '<div class="funder-content">' +
            logoHTML +
            '<div class="info-section">' +
            '<p><strong>Resources:</strong></p>' + resourcesHTML +
            '<p><strong>Grant application requirements:</strong> ' + requirementsHTML + '</p>' +
            '<p><strong>Public partners on funding panels:</strong> ' + panelsHTML + '</p>' +
            '</div></div></div>';

        $('#detailsContainer').html(html);
    }

    function showWelcomeMessage() {
        $('#detailsContainer').html('<div class="welcome-message"><h2>👋 Welcome!</h2><p>Please select an organisation from the dropdown above to view detailed information about their PPI requirements, resources, and funding panel structures.</p></div>');
    }

    // Initialize
    populateDropdown('all');

    // Dropdown change handler
    $('#funderSelect').on('change', function() {
        var selectedId = $(this).val();

        if (selectedId === '') {
            showWelcomeMessage();
            return;
        }

        var funder = $.grep(fundersData, function(f) {
            return f.id === selectedId;
        })[0];

        if (funder) {
            displayFunder(funder);
        }
    });

    // Filter tag handlers
    $('.filter-tag').on('click', function() {
        $('.filter-tag').removeClass('active');
        $(this).addClass('active');

        var filter = $(this).data('filter');
        currentFilter = filter;
        populateDropdown(filter);

        showWelcomeMessage();
    });

    console.log('Funder App initialized successfully with jQuery!');
});
