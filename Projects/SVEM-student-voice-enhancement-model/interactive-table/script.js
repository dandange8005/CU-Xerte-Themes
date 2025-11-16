// Student Voice Enhancement Model Data
const svemData = [
    // Theme 1: Structures Supporting Student Voice Activity - Roles and Structures
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "Roles and Structures", level: 1, description: "There are currently no clear Student Voice structures in place and/or no defined Student Voice roles within the School." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "Roles and Structures", level: 2, description: "Student Voice roles are assigned within Schools. (At a minimum, these include a Student Rep Coordinator, Survey Contact and an Academic Student Voice Lead). There is student representation on all appropriate School committees Education Student Experience Committee (ESEC), Board of Studies (BoS) etc. and at College Forums. Student Voice staff are aware of the Student Voice Framework (SVF)." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "Roles and Structures", level: 3, description: "Student Voice role descriptions are understood (Student Rep Coordinator, Survey Contact and Academic Lead) and staff support in Student Voice practices within Schools. Student Voice is discussed in Education Student Experience Committee (ESEC) / Board of Studies (BoS) /other appropriate School committees. The Student Voice Framework (SVF) principles are acknowledged when creating Student Voice plans for the year." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "Roles and Structures", level: 4, description: "The School utilises the Student Voice Framework (SVF) principles if considering/creating additional Student Voice roles. There are regular meetings between Student Voice staff within the School. The School has identified and shared good Student Voice practice between School staff. Student Voice is a rolling agenda item at Education Student Experience Committee (ESEC), Board of Studies (BoS) and other appropriate committees. The School has a clear Student Voice timeline for the academic year and this is communicated to staff and students." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "Roles and Structures", level: 5, description: "The School has identified areas for long-term enhancement, and a Student Voice strategy is in development. Student Voice staff are involved in evaluating School level Student Voice mechanisms and lead/support the implementation of learnings into action plans. Students are invited to actively contribute to all School Student Voice activity. All School staff are encouraged to engage in Student Voice discussions (Away Days, Teaching Plenaries etc.)." },

    // Theme 1: Structures Supporting Student Voice Activity - SV Training, Development, and Dissemination
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "SV Training, Development, and Dissemination", level: 1, description: "The School provides no opportunity for staff to engage with Student Voice and engagement CPD. Central Student Voice and engagement updates and opportunities are not circulated by email recipients." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "SV Training, Development, and Dissemination", level: 2, description: "Key/appropriate Student Voice contacts within the School are members of the Student Voice and Experience Network (SVEN) Teams channel. Student Voice staff disseminate Central Student Voice and Engagement updates and CPD opportunities to appropriate staff." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "SV Training, Development, and Dissemination", level: 3, description: "Student Voice staff within the School occasionally engage with Student Voice and Experience Network (SVEN) and SVEN meetings. School encourages and creates opportunities for Student Voice staff to engage with Student Voice and Engagement CPD. All School staff are aware of SVEN." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "SV Training, Development, and Dissemination", level: 4, description: "School Student Voice staff regularly contribute to the Student Voice and Experience Network (SVEN) via Teams and SVEN meetings. School Student Voice staff engage in ongoing Student Voice and Engagement CPD opportunities. School provides opportunities for, and encourages, all staff to engage with Student Voice and Engagement CPD. Student Voice staff identify Student Voice collaboration opportunities with other Schools." },
    { theme: "1. Structures Supporting Student Voice Activity", subCategory: "SV Training, Development, and Dissemination", level: 5, description: "School Student Voice staff deliver Student Voice and Engagement CPD to other staff, both within their School and across the College. School Student Voice staff present in the Student Voice and Experience Network (SVEN) meetings, sharing School best practice and Student Voice partnership opportunities. School Student Voice staff engage in Student Voice collaboration and partnership opportunities with other Schools." },

    // Theme 2: Student Reps and Student-Staff Panels (SSPs)
    { theme: "2. Student Reps and Student-Staff Panels (SSPs)", subCategory: "Student Representation", level: 1, description: "The School does not yet have a formal Student-Staff Panel (SSP) system or a process for recruitment of Student Reps." },
    { theme: "2. Student Reps and Student-Staff Panels (SSPs)", subCategory: "Student Representation", level: 2, description: "The School promotes the Rep System and facilitates the recruitment of Reps. School achieves minimum of one Student Rep per cohort. School provides Reps with the opportunity to become a Chair and Vice Chair. School utilises templates on Student Voice and Experience Network (SVEN) to update Rep lists, deliver the Rep workshop(s), and upload SSP Actions and Key Decisions/minutes and summary sheets. Actions and Key Decisions (AKDs) / minutes and summary sheet are uploaded onto SVEN no later than the end of term. The School organise for AKDs to be shared with Student Reps within ten working days of the SSP. The feedback loop is closed with Student Reps at the following SSP." },
    { theme: "2. Student Reps and Student-Staff Panels (SSPs)", subCategory: "Student Representation", level: 3, description: "The School encourages Student Reps to participate in Student Union Rep training. There is a minimum of two Student Reps per cohort. An SSP Chair and Vice Chair have been elected and the School support them in their roles. School Student Voice staff and Student Reps are aware of each other's roles. SSP membership is formalised as per Student Union guidance and attendance is consistent. The School supports Student Reps to communicate Actions and Key Decisions (AKDs) to whole cohorts. School consistently closes the feedback loop with Student Reps and begins to establish processes for closing the feedback loop with whole cohorts. Where appropriate, the School updates changing Student Rep details on the Student Voice and Experience Network (SVEN). The School offers Student Reps the opportunity to continue in their role for the following academic year." },
    { theme: "2. Student Reps and Student-Staff Panels (SSPs)", subCategory: "Student Representation", level: 4, description: "The School proactively promotes Student Reps as a Student Voice mechanism to student cohorts. Schools are working towards achieving Student Union ratio of 1:40 (Reps:students) for larger cohorts. Returning Student Reps support in the facilitation of the School Student Rep workshop. Rep names/photos are displayed in appropriate student areas (on campus and/or online). Key School staff are equipped to signpost students to their appropriate Student Reps. School facilitates ongoing and open communication with Student Reps in between formal meetings. School have an established process for Closing the Feedback Loop with whole cohorts, including sharing feedback with Student Voice Communication Officers. School informs Student Reps about ongoing Student Voice opportunities e.g. ESLAs, surveys, Speak Week. Before the end of the current Academic Year, Schools promote Student Rep opportunities for the upcoming year." },
    { theme: "2. Student Reps and Student-Staff Panels (SSPs)", subCategory: "Student Representation", level: 5, description: "School achieve Student Union ratio of 1:40 (Rep:students). School are providing opportunities for Student Voice staff, Reps and students to network and share changes/enhancements made as a result of Student Voice feedback. School staff and Reps collaborate on Student Voice/Engagement projects and enhancements beyond the SSP mechanism. School promotes further opportunities to Reps – i.e. conferences/events. School provides meaningful and consistent reward and recognition initiatives for Student Reps. Facilitate further student representation that occurs outside of meetings such as one-to-one sessions discussion boards or online approaches. This could also include 'Town Hall Meetings' and the College Forum." },

    // Theme 3: Supporting Formal Student Voice Mechanisms - Mid-Module Enhancement
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "Mid-Module Enhancement", level: 1, description: "The School does not have an agreed process for mid-module feedback collection. Student feedback is not considered when introducing changes/enhancements to modules." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "Mid-Module Enhancement", level: 2, description: "School specifies method options for mid-module feedback collection. School has an agreed MME timeline, which is communicated to appropriate staff. School encourages Module Leaders to gather mid-module feedback. Some Module Teams engage with MME process. Some Module Leaders share feedback with students, making changes where appropriate." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "Mid-Module Enhancement", level: 3, description: "Most Module Teams engage in MME process, and promote its purpose to students. School communicates MME process to all staff for awareness. School promotes MME to students. School develops guidance on MME journey, including: method, promotion, collection, review, and communicating with students to Close the Feedback Loop. Changes are actively implemented wherever appropriate. Most Module Leaders share feedback and changes made with students. Students are informed when feedback can't be actioned." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "Mid-Module Enhancement", level: 4, description: "School communicates MME journey guidance to staff, including: method, promotion, collection, review, and communicating with students to Close the Feedback Loop. All Module Teams engage in MME process, as per School guidance, and showcase feedback-driven changes to students, to highlight the benefits of MME. MME process and results are actively discussed at School level. Module Leaders explain to students what changes can and cannot be made, and escalate any non-module specific feedback to appropriate colleagues." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "Mid-Module Enhancement", level: 5, description: "School MME journey guidance is consistently implemented by all Module Leaders. MME is supported by senior leadership within the School as an effective key Student Voice mechanism. Module Leaders share relevant changes made as a result of feedback with other Module Teams to support best practice sharing. Significant feedback themes are compiled and communicated to School Student Voice staff for further consideration. School keeps a record of key changes to use as a resource which supports sharing of best practice." },

    // Theme 3: Supporting Formal Student Voice Mechanisms - End of Module Enhancement
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "End of Module Enhancement", level: 1, description: "School relies on automatic Blue Portal email reminders to promote ME to students. Student feedback is not considered when introducing changes/enhancements to modules." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "End of Module Enhancement", level: 2, description: "School has an agreed ME timeline, which is communicated to Module Leaders and Survey Contacts. School develops guidance on ME journey, including: method, promotion, collection, review, and communicating with students to Close the Feedback Loop. School encourages Module Leaders to promote ME. Module Leaders acknowledge ME feedback by providing a response via Blue." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "End of Module Enhancement", level: 3, description: "School develops promotional plan with the aim of increasing ME response rates. School and Module Leaders proactively promote ME and its purpose to students. Module Leaders make feedback-driven changes where appropriate. Module Leaders address key themes in their response, and include changes being considered and why some feedback may be unactionable. Module Leaders respond via Blue within the 2 week response period." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "End of Module Enhancement", level: 4, description: "All Module Teams engage in ME process, as per School promotional plan, and showcase feedback-driven changes to students, to highlight the benefits of ME. School creates guidance on what good Module Leader feedback looks like. Student feedback and subsequent changes made are communicated to students beyond the Blue portal. ME process and results are actively discussed at School level. Module Leaders explain to students what changes can and cannot be made, and escalate any non-module specific feedback to appropriate colleagues. ME feedback and actions are raised during module introductions at the beginning of the next cycle." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "End of Module Enhancement", level: 5, description: "ME is added as an agenda item in SSPs, and Student Reps are encouraged to promote ME as a key Student Voice mechanism. ME is supported by senior leadership within the School as an effective key Student Voice mechanism. Students are regularly consulted on proposed module changes, resulting in the co-creation of enhancements. Significant feedback themes are compiled and communicated to School Student Voice staff for further consideration. School keeps a record of key changes to use as a resource which supports sharing of best practice. School conducts annual review of ME promotional plan." },

    // Theme 3: Supporting Formal Student Voice Mechanisms - National Student Survey (NSS)
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "National Student Survey (NSS)", level: 1, description: "School relies on IPSOS MORI for NSS communications and promotion, and are unaware of guidance and Cardiff University timelines. School are unaware of promotional support offered by the Learning & Teaching Academy. School is informed of NSS results through Cardiff University communications." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "National Student Survey (NSS)", level: 2, description: "Key School staff are aware of NSS dates, guidelines, and who to contact for support. Key School staff contact students to encourage participation throughout the agreed NSS window. Schools are informed of NSS results through Cardiff University communications and prepare appropriate action plans - Medr, Review and Enhancement (RE) etc. NSS results and enhancements are shared at SSPs. Schools encourage appropriate staff to participate in central training session on NSS." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "National Student Survey (NSS)", level: 3, description: "School develops promotional plan with the aim of increasing NSS response rates. School promotional plan is strategically timed around opening/closing dates and pre-promotion. School Student Voice staff communicate NSS guidelines and timeline with appropriate staff. Key staff utilise Business Intelligence (BI) to review School and subject level feedback (qualitative and quantitative), and this contributes to action plans. Feedback-driven changes are shared with whole cohorts, including during welcome week. NSS/ Review and Enhancement (RE) plans are added as an agenda item in SSPs." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "National Student Survey (NSS)", level: 4, description: "School communicates NSS guidelines, timeline and promotional plan with all appropriate staff. Key staff engage in NSS promotion as per School promotional plan, showcasing feedback-driven changes to highlight the benefits of NSS participation. School considers including wider student groups to promote NSS, including Student Champions, Academic Societies and Student Reps. School designates time and space for students to voluntarily complete the NSS. NSS School and subject results are collated into themes and shared with appropriate staff for further consideration. School regularly inform students of ongoing feedback-driven NSS enhancements throughout the year, including during welcome week. Student Reps are consulted on NSS/ Review and Enhancement (RE) plans." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "National Student Survey (NSS)", level: 5, description: "All appropriate School staff engage in NSS promotion as per School promotion plan. School considers incentives to support NSS completion. NSS is discussed with whole student cohorts throughout the academic year. Staff regularly work in partnership with students to co-create changes and enhancements as a result of NSS feedback. School keeps a record of key changes to use as a resource which supports sharing of best practice. School conducts annual review of NSS promotional plan." },

    // Theme 3: Supporting Formal Student Voice Mechanisms - CUPTS & PRES
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "CUPTS & PRES", level: 1, description: "School relies on central communications for PG surveys and are unaware of guidance and timelines. Student feedback is not considered when introducing changes/enhancements to the PG environment." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "CUPTS & PRES", level: 2, description: "School Student Voice staff communicate PG survey timelines and guidance to appropriate School staff. School promotes PG surveys to students, highlighting any incentives available. CUPTS - School reviews feedback and provides response to students. PRES - Quantitative results are shared with students without any further analysis and actions are not communicated." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "CUPTS & PRES", level: 3, description: "School develops PG survey promotional plan with the aim of increasing response rates. School and PG staff proactively promote surveys and their purpose to students. CUPTS - PGT Lead, DLT, and HoS review and respond to feedback according to timeline; highlighting key themes, indicating changes being considered, and why some feedback may be unactionable. PRES - Where appropriate, School and PGR staff consider introducing changes and enhancements as a result of PRES feedback." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "CUPTS & PRES", level: 4, description: "PG staff engage in PG survey promotion as per School promotional plan, showcasing feedback-driven changes to highlight the benefits of survey participation. PG staff explain to students what changes can and cannot be made, and escalate any School-wide feedback to relevant colleagues. PG survey process and feedback is actively discussed at School level; including collaboration between Student Voice staff and appropriate colleagues. Where appropriate, PG staff consult with students on proposed changes." },
    { theme: "3. Supporting Formal Student Voice Mechanisms", subCategory: "CUPTS & PRES", level: 5, description: "PG staff regularly inform students of ongoing feedback-driven enhancements throughout the year, including during welcome week. PG surveys are added as agenda items in SSPs, and Student Reps are encouraged to promote the surveys as key Student Voice mechanisms. Staff regularly work in partnership with students to co-create changes and enhancements to the PG environment. School keeps a record of key changes to use as a resource which supports sharing of best practice. School conducts annual review of PG survey promotional plan." }
];

// Level labels
const levelLabels = {
    1: 'Level 1: Moving towards Baseline',
    2: 'Level 2: Baseline Practice',
    3: 'Level 3: Emerging Good Practice',
    4: 'Level 4: Established Strong Practice',
    5: 'Level 5: Exceptional Practice'
};

// Initialize DataTable when DOM is ready
$(document).ready(function() {
    const table = $('#svemTable').DataTable({
        data: svemData,
        columns: [
            {
                data: 'theme',
                width: '20%',
                render: function(data, type, row) {
                    if (type === 'display') {
                        const themeNum = data.charAt(0);
                        return `<span class="theme-badge theme-badge-${themeNum}">${data}</span>`;
                    }
                    return data;
                }
            },
            {
                data: 'subCategory',
                width: '20%'
            },
            {
                data: 'level',
                width: '10%',
                render: function(data, type, row) {
                    if (type === 'display') {
                        // Get theme number from the theme string (first character)
                        const themeNum = row.theme.charAt(0);
                        return `<span class="level-pill theme-${themeNum}-level-${data}">L${data}</span>`;
                    }
                    return data;
                }
            },
            {
                data: 'description',
                width: '50%',
                render: function(data, type, row) {
                    if (type === 'display') {
                        // Split by sentence boundaries that end with periods
                        const sentences = data.split(/\.\s+/).filter(s => s.trim());

                        // If there's more than one sentence, display as list
                        if (sentences.length > 1) {
                            const listItems = sentences.map(sentence => {
                                // Add period back if it doesn't end with one
                                const text = sentence.trim().endsWith('.') ? sentence.trim() : sentence.trim() + '.';
                                return `<li>${text}</li>`;
                            }).join('');
                            return `<ul class="description-list">${listItems}</ul>`;
                        }
                        return data;
                    }
                    return data;
                }
            }
        ],
        order: [[0, 'asc'], [1, 'asc'], [2, 'asc']], // Sort by theme, subcategory, then level
        pageLength: 25,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        responsive: true,
        language: {
            search: "Search framework:",
            lengthMenu: "Show _MENU_ entries per page",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            infoEmpty: "No entries available",
            infoFiltered: "(filtered from _TOTAL_ total entries)",
            paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
            }
        },
        dom: '<"top"l<"filters-row">>rt<"bottom"ip><"clear">',
        initComplete: function() {
            const api = this.api();
            let themeSelect, subCategorySelect, levelSelect;

            // Add custom filter dropdowns in a separate row
            api.columns([0, 1, 2]).every(function(index) {
                const column = this;
                const labels = ['Theme:', 'Sub-Category:', 'Level:'];

                // Create a wrapper div for each filter group
                const filterGroup = $('<div class="filter-group"></div>').appendTo($('.filters-row'));

                // Add label
                $(`<label class="filter-label">${labels[index]}</label>`).appendTo(filterGroup);

                // Add select
                const select = $('<select><option value="">All</option></select>')
                    .appendTo(filterGroup)
                    .on('change', function() {
                        const val = $.fn.dataTable.util.escapeRegex($(this).val());
                        column.search(val ? '^' + val + '$' : '', true, false).draw();

                        // If Theme changes, update Sub-Category options
                        if (index === 0) {
                            updateSubCategoryOptions();
                        }
                    });

                // Store references to selects
                if (index === 0) themeSelect = select;
                if (index === 1) subCategorySelect = select;
                if (index === 2) levelSelect = select;

                column.data().unique().sort().each(function(d) {
                    const displayValue = index === 2 ? levelLabels[d] : d;
                    select.append(`<option value="${d}">${displayValue}</option>`);
                });
            });

            // Function to update Sub-Category dropdown based on Theme selection
            function updateSubCategoryOptions() {
                const selectedTheme = themeSelect.val();
                const currentSubCategory = subCategorySelect.val();

                // Clear and reset Sub-Category dropdown
                subCategorySelect.empty();
                subCategorySelect.append('<option value="">All</option>');

                // Get unique sub-categories for selected theme
                const subCategories = new Set();
                svemData.forEach(row => {
                    if (!selectedTheme || row.theme === selectedTheme) {
                        subCategories.add(row.subCategory);
                    }
                });

                // Add filtered options
                Array.from(subCategories).sort().forEach(subCat => {
                    subCategorySelect.append(`<option value="${subCat}">${subCat}</option>`);
                });

                // Restore previous selection if still valid
                if (currentSubCategory && Array.from(subCategories).includes(currentSubCategory)) {
                    subCategorySelect.val(currentSubCategory);
                } else {
                    subCategorySelect.val('');
                    // Clear the column filter if previous selection is no longer valid
                    api.column(1).search('').draw();
                }
            }
        }
    });
});
