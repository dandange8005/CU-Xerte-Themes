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
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23862-sopnz-site/media/funder_logos/Alzheimer-Research-UK-Logo.png",
        "resources": [
            {"html": "Alzheimer's encourage members of the public affected by the disease to sign up to the <a href='https://www.alzheimersresearchuk.org/research/getting-involved-in-research/other-ways-to-get-involved/#patient%20and%20public%20involvement' target='_blank'>People in Research database</a> to support PPI activity"},
            {"html": "<a href='https://www.alzheimersresearchuk.org/grants/inspire-fund/' target='_blank'>Inspire Fund</a> is a public engagement grant providing funding for projects that engage underserved communities with the topic of brain health and reducing the risk of dementia"}
        ],
        "requirements": "None specified.",
        "panels": "Alzheimer's Research UK uses Lay Research Volunteers to review grant applications from scientists who apply for grant funding for their project."
    },
    {
        "id": "bbsrc",
        "name": "Biotechnology and Biological Sciences Research Council (BBSRC)",
        "category": "ukri",
        "isUKRI": true,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/ukri-bbsrc-logo.png",
        "resources": [
            {"text": "BBSRC broad definition of public engagement includes all ways of interacting with the public", "link": null},
            {"text": "Public engagement @BBSRC", "link": "https://www.ukri.org/what-we-do/public-engagement/public-engagement-bbsrc/"},
            {"text": "UKRI public engagement strategy", "link": "https://www.ukri.org/what-we-do/public-engagement/our-strategy/"}
        ],
        "requirements": "UKRI encourages researchers to plan and budget for public engagement from the start of their projects.",
        "requirementsLink": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/",
        "panels": "UKRI is increasingly including people with lived experience in assessing funding applications, to ensure public involvement is appropriately embedded in applications.",
        "panelsLink": "https://www.ukri.org/what-we-do/public-engagement/how-ukri-supports-public-involvement-in-research-and-innovation/"
    },
    {
        "id": "blood-cancer-uk",
        "name": "Blood Cancer UK",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/BCUK-Logo.png",
        "resources": [
            {"html": "Blood Cancer UK has an <a href='https://bloodcancer.org.uk/get-involved/give-time/help-shape-and-improve-our-work/' target='_blank'>Involvement Network</a> for people with lived experience to get involved in opportunities aimed at improving the lives of people affected by blood cancer"},
            {"text": "They will share involvement opportunities for their funded research projects", "link": null},
            {"html": "PPI <a href='https://bloodcancer.org.uk/research/funding/patient-public-involvement/' target='_blank'>Resources</a> and <a href='https://bcuk.cdn.ngo/documents/PPI_Resources_for_Researchers_PjPe9gz.pdf' target='_blank'>Guidance</a> for Researchers"}
        ],
        "requirements": "Encourages meaningful involvement of patients and the public in research proposals.",
        "requirementsLink": "https://bloodcancer.org.uk/research/funding/how-we-fund-research/",
        "panels": "Patient Voice Grant Advisory Network is a group of committed people affected by blood cancer who review all grant applications considered for funding.",
        "panelsLink": "https://bloodcancer.org.uk/research/funding/patient-public-involvement/"
    },
    {
        "id": "bowel-research-uk",
        "name": "Bowel Research UK",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/bowel-research-uk-logo.png",
        "resources": [
            {"html": "<a href='https://bowelresearchuk.org/our-research/patient-and-public-involvement/part-for-researchers/' target='_blank'>PaRT for Researchers</a> provides facilitation of PPI activity. <a href='https://www.bowelresearchuk.org/wp-content/uploads/2024/01/Bowel-Research-UK-PPI-Services-For-Academia-and-NHS.pdf' target='_blank'>Fees apply</a>"},
            {"html": "<a href='https://bowelresearchuk.org/our-research/patient-and-public-involvement/' target='_blank'>Patients</a> are at the heart of everything they do at Bowel Research UK"},
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
            {"html": "PPI in the <a href='https://www.bhf.org.uk/for-professionals/information-for-researchers/how-to-apply/patient-and-public-involvement#cycle' target='_blank'>Research Cycle</a>"},
            {"html": "BHF can connect you with people affected by heart and circulatory conditions via their BHF Heart Voices network. <a href='https://www.bhf.org.uk/for-professionals/information-for-researchers/how-to-apply/patient-and-public-involvement#help' target='_blank'>BHF Help</a>"}
        ],
        "requirements": "PPI is an essential requirement for BHF's Clinical Study Grants and Healthcare Innovation Fund.",
        "requirementsLink": "https://www.bhf.org.uk/for-professionals/information-for-researchers/how-to-apply/patient-and-public-involvement#info",
        "panels": "Up to 4 members of the Patient Advisory Group (PAG) will review applications and score funding applications."
    },
    {
        "id": "cruk",
        "name": "Cancer Research UK (CRUK)",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Cancer-Research-UK-Logo.png",
        "resources": [
            {"html": "Patient involvement <a href='https://www.cancerresearchuk.org/funding-for-researchers/patient-involvement-toolkit-for-researchers' target='_blank'>toolkit</a> for researchers"},
            {"html": "Cancer Research UK run an <a href='https://www.cancerresearchuk.org/get-involved/patient-involvement' target='_blank'>Involvement Network</a>"},
            {"html": "CRUK is a signatory of the <a href='https://www.nihr.ac.uk/shared-commitment-public-involvement' target='_blank'>Shared Commitment to Public Involvement</a>"}
        ],
        "requirements": "Many of Cancer Research UK's funding schemes cover public involvement expenses.",
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
        "panels": "The Grants Advisory Panel (GAP), made up of people affected by diabetes, will review your application for evidence of patient and public involvement throughout the research."
    },
    {
        "id": "epsrc",
        "name": "Engineering and Physical Sciences Research Council (EPSRC)",
        "category": "ukri",
        "isUKRI": true,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/ukri-epsrc-logo.png",
        "resources": [
            {"text": "Patient and the public engagement", "link": "https://www.ukri.org/councils/epsrc/guidance-for-applicants/what-to-include-in-your-proposal/health-technologies-impact-and-translation-toolkit/stakeholder-engagement/patients-and-the-public/"},
            {"text": "Public engagement @EPSRC", "link": "https://www.ukri.org/what-we-do/public-engagement/public-engagement-epsrc/"},
            {"text": "Public engagement @UKRI", "link": "https://www.ukri.org/what-we-do/public-engagement/"}
        ],
        "requirements": "UKRI encourages researchers to plan and budget for public engagement from the start of their projects.",
        "requirementsLink": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/",
        "panels": "UKRI is increasingly including people with lived experience in assessing funding applications, to ensure public involvement is appropriately embedded in applications.",
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
            {"html": "Before your research is funded, you can access the <a href='https://healthandcareresearchwales.org/form/request-for-public-involvement-s' target='_blank'>Enabling Involvement Fund</a> from Health and Care Research Wales to help support public involvement during the development stage of your research project"}
        ],
        "requirements": "Researchers are to detail public involvement plans in applications following UK Standards for Public Involvement.",
        "requirementsLink": "https://sites.google.com/nihr.ac.uk/pi-standards/home",
        "panels": "Members of the public help prioritise research by sitting on funding panels to help decide which research projects should be supported, focusing on those that are most important and deserving."
    },
    {
        "id": "kidney-research-uk",
        "name": "Kidney Research UK (KRUK)",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Kidney-Research-UK-Logo.png",
        "resources": [
            {"html": "<a href='https://www.kidneyresearchuk.org/research/patient-involvement/' target='_blank'>Kidney Voices for Research</a> provides access to online community of patients interested in research"},
            {"html": "<a href='https://www.kidneyresearchuk.org/research/research-networks/kidney-patient-involvement-network/' target='_blank'>Kidney Patient Involvement Network (KPIN)</a> provides access to responsive database, PPIE training packages and a social media peer support network for patients and professionals"},
            {"html": "Offer <a href='https://kidneyresearchuk.org/wp-content/uploads/2021/11/Patient-Info-Days-Guidance.pdf' target='_blank'>grants</a> of up to £1000 to support a patient information day"}
        ],
        "requirements": "Research strategy highlights patient involvement and engagement as one of six supporting principles underpinning the way KRUK operates as a research organisation.",
        "requirementsLink": "https://www.kidneyresearchuk.org/research/",
        "panels": "Kidney Research UK's Lay Advisory Group (LAG) strengthens patient and public involvement and contributes to research funding decisions.",
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
            {"html": "How the MRC will involve the public in their work: <a href='https://www.ukri.org/publications/mrc-public-partnerships-strategy/' target='_blank'>Public partnership strategy</a> 2024 to 2027"}
        ],
        "requirements": "UKRI encourages researchers to plan and budget for public engagement from the start of their projects. Public partnerships strategy states that all applicants for MRC funding to consider how public partnerships could inform and improve their research. Applicants expected to build on relevant standards and checklists, such as: UK Standards for Public Involvement, GRIPP2, PIRIT, PiiAF, and so on, as appropriate.",
        "requirementsLink": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/",
        "panels": "Appropriate public partners are engaged to assess grant applications."
    },
    {
        "id": "nihr",
        "name": "National Institute for Health and Care Research (NIHR)",
        "category": "medical",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/NIHR-Logo.png",
        "resources": [
            {"html": "Public involvement in NHS, health and social care research – <a href='https://www.nihr.ac.uk/briefing-notes-researchers-public-involvement-nhs-health-and-social-care-research' target='_blank'>Briefing notes for researchers</a>"},
            {"text": "Resources and training for public involvement in research", "link": "https://www.learningforinvolvement.org.uk/"},
            {"html": "Practical <a href='https://oxfordbrc.nihr.ac.uk/practical-tools-for-ppi/' target='_blank'>tools for patient and public involvement</a> by NIHR Oxford Biomedical Research Centre"},
            {"html": "NIHR is a signatory of the <a href='https://www.nihr.ac.uk/shared-commitment-public-involvement' target='_blank'>Shared Commitment to Public Involvement</a>"}
        ],
        "requirements": "The NIHR is committed to ensuring that meaningful Patient and Public Involvement and Engagement (PPIE) is not an optional extra, but a fundamental element of impactful research. A well-considered and genuinely collaborative plan for working with people and communities significantly strengthens funding applications. The score for PPIE is equally weighted with all other sections of a research application.",
        "requirementsLink": "https://www.nihr.ac.uk/documents/shared-commitment-to-public-involvement/30134",
        "quote": [
            "The <a href='https://www.nihr.ac.uk/documents/shared-commitment-to-public-involvement/30134' target='_blank'>NIHR is committed</a> to ensuring that meaningful Patient and Public Involvement and Engagement (PPIE) is not an optional extra, but a fundamental element of impactful research. A well-considered and genuinely collaborative plan for <a href='https://www.nihr.ac.uk/research-funding/application-support/working-with-people-and-communities' target='_blank'>working with people and communities</a> significantly strengthens funding applications. We believe people have the right to be involved in all health and social care research, and excellent public involvement is an essential part of this, <a href='https://www.hra.nhs.uk/planning-and-improving-research/best-practice/public-involvement/impact-public-involvement-ethical-aspects-research/' target='_blank'>having been shown to improve its quality and impact</a>. Indeed, people's personal experiences should be a key driver for health and social care research.",
            "When we talk about public involvement, we mean all the ways in which the research community works together with people and communities, including patients, carers, advocates, service users, and the general public. Excellent public involvement is inclusive, values all contributions, ensures people have a meaningful say in what happens and influences outcomes, as set out in the <a href='https://sites.google.com/nihr.ac.uk/pi-standards/home' target='_blank'>UK Standards for Public Involvement</a>.",
            "Part of the decision process for awarding funding at NIHR, involves research applications being reviewed and commented on by committee members with specialist knowledge, experience and expertise in PPIE. They will look for strong evidence of PPIE in the application and allocate a score based on this, this is then collated with peer and scientific reviews to give a final score. The score for PPIE is equally weighted with all other sections of a research application."
        ],
        "panels": "Patients, carers, and public members review proposals and sit on commissioning panels/boards. They could serve as co-chair of events or panels.",
        "panelsLink": "https://www.nihr.ac.uk/nihr-public-contributor-roles-framework"
    },
    {
        "id": "royal-society",
        "name": "Royal Society",
        "category": "other",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/royal-society-logo.png",
        "resources": [
            {"html": "Offers a <a href='https://royalsociety.org/grants/public-engagement-fund/' target='_blank'>Public Engagement Fund</a> to support Royal Society Research Fellows to create and lead innovative public engagement projects"},
            {"text": "Provides training and mentoring schemes to support researchers in public engagement efforts", "link": null}
        ],
        "requirements": "Encourages applicants to incorporate public engagement activities into their research proposals. Public engagement costs are included in the list of eligible costs.",
        "requirementsLink": "https://royalsociety.org/-/media/grants/about-grants/royal-society-grant-funding-guidance.pdf",
        "panels": "Public engagement professionals are involved in the Public Engagement review panels."
    },
    {
        "id": "ukri",
        "name": "UK Research and Innovation (UKRI)",
        "category": "ukri",
        "isUKRI": true,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/UKRI-logo.png",
        "resources": [
            {"text": "Guidance on public involvement in research and innovation", "link": "https://www.ukri.org/manage-your-award/good-research-resource-hub/guidance-on-engaging-the-public-with-your-research/"},
            {"text": "UKRI public engagement strategy", "link": "https://www.ukri.org/publications/ukri-public-engagement-strategy/"},
            {"text": "UKRI considers public involvement as a form of public engagement", "link": "https://www.ukri.org/what-we-do/public-engagement/how-ukri-supports-public-involvement-in-research-and-innovation/"},
            {"html": "UKRI is a signatory of the <a href='https://www.nihr.ac.uk/shared-commitment-public-involvement' target='_blank'>Shared Commitment to Public Involvement</a>"}
        ],
        "requirements": "UKRI encourages researchers to plan and budget for public engagement from the start of their projects. Expectations and application requirements vary across UKRI councils and funding opportunities.",
        "requirementsLink": "https://www.ukri.org/what-we-do/public-engagement/",
        "panels": "UKRI is increasingly including people with lived experience in assessing funding applications, to ensure public involvement is appropriately embedded in applications."
    },
    {
        "id": "wellcome-trust",
        "name": "Wellcome Trust",
        "category": "other",
        "isUKRI": false,
        "logo": "https://xerte.cardiff.ac.uk/USER-FILES/23828-sopnz-site/media/funder_logos/Wellcome-Trust-logo.png",
        "resources": [
            {"text": "Step by step guide for planning your public engagement activities", "link": "https://cms.wellcome.org/sites/default/files/planning-engagement-guide-wellcome-nov14.pdf"}
        ],
        "requirements": "Encourages embedding stakeholder perspectives throughout the research lifecycle.",
        "requirementsLink": "https://wellcome.org/research-funding/guidance/prepare-to-apply/using-engaged-research-approach",
        "panels": "Patient panels are mentioned but their role is not explicitly stated."
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

        // Build quote section if it exists
        var quoteHTML = '';
        if (funder.quote && funder.quote.length > 0) {
            quoteHTML = '<div class="quote-section"><p><strong>Quote from the ' + funder.name + ':</strong></p><blockquote>';
            $.each(funder.quote, function(idx, paragraph) {
                quoteHTML += '<p>' + paragraph + '</p>';
            });
            quoteHTML += '</blockquote></div>';
        }

        var html = '<div class="funder-details">' +
            '<h3 class="funder-title">' + funder.name +
            (funder.isUKRI ? ' <span class="ukri-badge">UKRI</span>' : '') +
            '</h3>' +
            '<div class="funder-content">' +
            logoHTML +
            '<div class="info-section">' +
            '<p><strong>Resources:</strong></p>' + resourcesHTML +
            '<p><strong>Grant application requirements:</strong> ' + requirementsHTML + '</p>' +
            quoteHTML +
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
