// Component configurations
const componentConfigs = {
    box: {
        title: 'Box Title',
        content: 'Your content goes here. This is a simple box component.',
        icon: '',
        hasIcon: false
    },
    card: {
        title: 'Card Title',
        content: 'Card description goes here.',
        imageUrl: '',
        linkText: 'Read more',
        linkUrl: '#',
        clickable: false
    },
    button: {
        text: 'Button Text',
        url: '#',
        style: 'primary',
        size: 'normal',
        block: false
    },
    callout: {
        title: 'Callout Title',
        content: 'This is a callout message.',
        type: 'warning',
        emoji: '⚠️'
    },
    accordion: {
        title: 'Click to expand',
        content: 'Hidden content goes here when expanded.'
    },
    alert: {
        content: 'This is an alert message.',
        type: 'info'
    },
    quote: {
        content: 'This is a quote or testimonial.',
        author: 'Author Name',
        role: 'Their Role'
    },
    dosdonts: {
        title: 'Best Practices',
        items: ['Do this thing', 'Do that thing', "Don't do this", "Don't do that"],
        types: ['do', 'do', 'dont', 'dont']
    }
};

// Current component state
let currentComponent = 'box';
let currentConfig = { ...componentConfigs[currentComponent] };

// Common Font Awesome icons organized by category
const iconCategories = {
    'Information': [
        { class: 'fas fa-info-circle', name: 'Info Circle' },
        { class: 'fas fa-question-circle', name: 'Question Circle' },
        { class: 'fas fa-exclamation-triangle', name: 'Warning Triangle' },
        { class: 'fas fa-exclamation-circle', name: 'Exclamation Circle' },
        { class: 'fas fa-check-circle', name: 'Check Circle' },
        { class: 'fas fa-times-circle', name: 'Times Circle' },
        { class: 'fas fa-lightbulb', name: 'Lightbulb' },
        { class: 'fas fa-star', name: 'Star' }
    ],
    'Learning': [
        { class: 'fas fa-book', name: 'Book' },
        { class: 'fas fa-graduation-cap', name: 'Graduation Cap' },
        { class: 'fas fa-chalkboard-teacher', name: 'Teacher' },
        { class: 'fas fa-user-graduate', name: 'Graduate' },
        { class: 'fas fa-pencil-alt', name: 'Pencil' },
        { class: 'fas fa-clipboard-list', name: 'Clipboard List' },
        { class: 'fas fa-tasks', name: 'Tasks' },
        { class: 'fas fa-certificate', name: 'Certificate' }
    ],
    'Actions': [
        { class: 'fas fa-download', name: 'Download' },
        { class: 'fas fa-upload', name: 'Upload' },
        { class: 'fas fa-play', name: 'Play' },
        { class: 'fas fa-pause', name: 'Pause' },
        { class: 'fas fa-stop', name: 'Stop' },
        { class: 'fas fa-search', name: 'Search' },
        { class: 'fas fa-cog', name: 'Settings' },
        { class: 'fas fa-edit', name: 'Edit' }
    ],
    'Communication': [
        { class: 'fas fa-envelope', name: 'Email' },
        { class: 'fas fa-phone', name: 'Phone' },
        { class: 'fas fa-comments', name: 'Comments' },
        { class: 'fas fa-bell', name: 'Bell' },
        { class: 'fas fa-bullhorn', name: 'Announcement' },
        { class: 'fas fa-share', name: 'Share' },
        { class: 'fas fa-link', name: 'Link' },
        { class: 'fas fa-hashtag', name: 'Hashtag' }
    ]
};

// Initialize the app
function init() {
    try {
        console.log('Initializing component generator...');
        updateControls();
        updatePreview();
        updateCode();
        console.log('Component generator initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Update the controls panel based on selected component
function updateControls() {
    const controlsContainer = document.getElementById('componentControls');
    const config = componentConfigs[currentComponent];
    
    let controlsHTML = '';
    
    switch(currentComponent) {
        case 'box':
            controlsHTML = `
                <div class="form-group">
                    <label for="boxTitle">Title</label>
                    <input type="text" id="boxTitle" value="${config.title}" onchange="updateConfig('title', this.value)">
                </div>
                <div class="form-group">
                    <label for="boxContent">Content</label>
                    <textarea id="boxContent" onchange="updateConfig('content', this.value)">${config.content}</textarea>
                </div>
                <div class="toggle-group">
                    <span class="toggle-label">Include Icon</span>
                    <label class="toggle-switch">
                        <input type="checkbox" id="boxHasIcon" ${config.hasIcon ? 'checked' : ''} onchange="updateConfig('hasIcon', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="form-group" id="iconGroup" style="${config.hasIcon ? '' : 'display: none;'}">
                    <label for="boxIcon">Select Icon</label>
                    <input type="text" id="boxIcon" value="${config.icon}" placeholder="fas fa-info-circle" onchange="updateConfig('icon', this.value)" style="margin-bottom: 0.5rem;">
                    <div id="iconPicker" class="icon-picker-container">
                        ${generateIconPicker()}
                    </div>
                </div>
            `;
            break;
            
        case 'card':
            controlsHTML = `
                <div class="form-group">
                    <label for="cardTitle">Title</label>
                    <input type="text" id="cardTitle" value="${config.title}" onchange="updateConfig('title', this.value)">
                </div>
                <div class="form-group">
                    <label for="cardContent">Content</label>
                    <textarea id="cardContent" onchange="updateConfig('content', this.value)">${config.content}</textarea>
                </div>
                <div class="form-group">
                    <label for="cardImageUrl">Image URL (optional)</label>
                    <input type="url" id="cardImageUrl" value="${config.imageUrl}" onchange="updateConfig('imageUrl', this.value)">
                </div>
                <div class="form-group">
                    <label for="cardLinkText">Link Text</label>
                    <input type="text" id="cardLinkText" value="${config.linkText}" onchange="updateConfig('linkText', this.value)">
                </div>
                <div class="form-group">
                    <label for="cardLinkUrl">Link URL</label>
                    <input type="url" id="cardLinkUrl" value="${config.linkUrl}" onchange="updateConfig('linkUrl', this.value)">
                </div>
                <div class="toggle-group">
                    <span class="toggle-label">Clickable Card</span>
                    <label class="toggle-switch">
                        <input type="checkbox" id="cardClickable" ${config.clickable ? 'checked' : ''} onchange="updateConfig('clickable', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            `;
            break;
            
        case 'button':
            controlsHTML = `
                <div class="form-group">
                    <label for="buttonText">Button Text</label>
                    <input type="text" id="buttonText" value="${config.text}" onchange="updateConfig('text', this.value)">
                </div>
                <div class="form-group">
                    <label for="buttonUrl">URL</label>
                    <input type="url" id="buttonUrl" value="${config.url}" onchange="updateConfig('url', this.value)">
                </div>
                <div class="form-group">
                    <label for="buttonStyle">Style</label>
                    <select id="buttonStyle" onchange="updateConfig('style', this.value)">
                        <option value="primary" ${config.style === 'primary' ? 'selected' : ''}>Primary</option>
                        <option value="outline" ${config.style === 'outline' ? 'selected' : ''}>Outline</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="buttonSize">Size</label>
                    <select id="buttonSize" onchange="updateConfig('size', this.value)">
                        <option value="normal" ${config.size === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="small" ${config.size === 'small' ? 'selected' : ''}>Small</option>
                    </select>
                </div>
                <div class="toggle-group">
                    <span class="toggle-label">Block Button (Full Width)</span>
                    <label class="toggle-switch">
                        <input type="checkbox" id="buttonBlock" ${config.block ? 'checked' : ''} onchange="updateConfig('block', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            `;
            break;
            
        case 'callout':
            controlsHTML = `
                <div class="form-group">
                    <label for="calloutTitle">Title</label>
                    <input type="text" id="calloutTitle" value="${config.title}" onchange="updateConfig('title', this.value)">
                </div>
                <div class="form-group">
                    <label for="calloutContent">Content</label>
                    <textarea id="calloutContent" onchange="updateConfig('content', this.value)">${config.content}</textarea>
                </div>
                <div class="form-group">
                    <label for="calloutType">Type</label>
                    <select id="calloutType" onchange="updateConfig('type', this.value)">
                        <option value="warning" ${config.type === 'warning' ? 'selected' : ''}>Warning</option>
                        <option value="success" ${config.type === 'success' ? 'selected' : ''}>Success</option>
                        <option value="danger" ${config.type === 'danger' ? 'selected' : ''}>Danger</option>
                        <option value="info" ${config.type === 'info' ? 'selected' : ''}>Info</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="calloutEmoji">Custom Emoji (optional)</label>
                    <input type="text" id="calloutEmoji" value="${config.emoji}" onchange="updateConfig('emoji', this.value)">
                </div>
            `;
            break;
            
        case 'accordion':
            controlsHTML = `
                <div class="form-group">
                    <label for="accordionTitle">Summary Text</label>
                    <input type="text" id="accordionTitle" value="${config.title}" onchange="updateConfig('title', this.value)">
                </div>
                <div class="form-group">
                    <label for="accordionContent">Hidden Content</label>
                    <textarea id="accordionContent" onchange="updateConfig('content', this.value)">${config.content}</textarea>
                </div>
            `;
            break;
            
        case 'alert':
            controlsHTML = `
                <div class="form-group">
                    <label for="alertContent">Alert Message</label>
                    <textarea id="alertContent" onchange="updateConfig('content', this.value)">${config.content}</textarea>
                </div>
                <div class="form-group">
                    <label for="alertType">Type</label>
                    <select id="alertType" onchange="updateConfig('type', this.value)">
                        <option value="info" ${config.type === 'info' ? 'selected' : ''}>Info</option>
                        <option value="success" ${config.type === 'success' ? 'selected' : ''}>Success</option>
                        <option value="warning" ${config.type === 'warning' ? 'selected' : ''}>Warning</option>
                        <option value="danger" ${config.type === 'danger' ? 'selected' : ''}>Danger</option>
                    </select>
                </div>
            `;
            break;
            
        case 'quote':
            controlsHTML = `
                <div class="form-group">
                    <label for="quoteContent">Quote Text</label>
                    <textarea id="quoteContent" onchange="updateConfig('content', this.value)">${config.content}</textarea>
                </div>
                <div class="form-group">
                    <label for="quoteAuthor">Author</label>
                    <input type="text" id="quoteAuthor" value="${config.author}" onchange="updateConfig('author', this.value)">
                </div>
                <div class="form-group">
                    <label for="quoteRole">Role/Title</label>
                    <input type="text" id="quoteRole" value="${config.role}" onchange="updateConfig('role', this.value)">
                </div>
            `;
            break;
            
        case 'dosdonts':
            controlsHTML = `
                <div class="form-group">
                    <label for="dosdontsTitle">Section Title</label>
                    <input type="text" id="dosdontsTitle" value="${config.title}" onchange="updateConfig('title', this.value)">
                </div>
                <div class="form-group">
                    <label>Items (one per line, prefix with DO: or DON'T:)</label>
                    <textarea id="dosdontsItems" placeholder="DO: Follow best practices&#10;DO: Use clear language&#10;DON'T: Ignore accessibility&#10;DON'T: Use complex jargon" onchange="updateDosdontsItems(this.value)">${config.items.map((item, i) => (config.types[i] === 'do' ? 'DO: ' : "DON'T: ") + item).join('\n')}</textarea>
                </div>
            `;
            break;
    }
    
    controlsContainer.innerHTML = controlsHTML;
}

// Update component configuration
function updateConfig(key, value) {
    try {
        currentConfig[key] = value;
        
        // Handle special cases
        if (currentComponent === 'box' && key === 'hasIcon') {
            const iconGroup = document.getElementById('iconGroup');
            if (iconGroup) {
                iconGroup.style.display = value ? '' : 'none';
            }
        }
        
        updatePreview();
        updateCode();
    } catch (error) {
        console.error('Error updating config:', error);
    }
}

// Special handler for dos/don'ts items
function updateDosdontsItems(text) {
    const lines = text.split('\n').filter(line => line.trim());
    const items = [];
    const types = [];
    
    lines.forEach(line => {
        if (line.startsWith('DO:')) {
            items.push(line.substring(3).trim());
            types.push('do');
        } else if (line.startsWith("DON'T:")) {
            items.push(line.substring(6).trim());
            types.push('dont');
        }
    });
    
    currentConfig.items = items;
    currentConfig.types = types;
    
    updatePreview();
    updateCode();
}

// Update the preview
function updatePreview() {
    const previewContainer = document.getElementById('componentPreview');
    let html = '';
    
    switch(currentComponent) {
        case 'box':
            if (currentConfig.hasIcon) {
                html = `
                    <div class="box box-icon">
                        <i class="${currentConfig.icon}"></i>
                        <div>
                            <h3 class="box__title">${currentConfig.title}</h3>
                            <p>${currentConfig.content}</p>
                        </div>
                    </div>
                `;
            } else {
                html = `
                    <div class="box">
                        <h3 class="box__title">${currentConfig.title}</h3>
                        <p>${currentConfig.content}</p>
                    </div>
                `;
            }
            break;
            
        case 'card':
            const cardClasses = ['card'];
            if (currentConfig.clickable) cardClasses.push('card--clickable');
            
            html = `
                <div class="${cardClasses.join(' ')}">
                    ${currentConfig.imageUrl ? `<div class="card__image"><img src="${currentConfig.imageUrl}" alt="${currentConfig.title}"></div>` : ''}
                    <div class="card__content">
                        <h3 class="card__heading">${currentConfig.title}</h3>
                        <p class="card__description">${currentConfig.content}</p>
                        <a href="${currentConfig.linkUrl}" class="card__link">${currentConfig.linkText}</a>
                    </div>
                </div>
            `;
            break;
            
        case 'button':
            const buttonClasses = ['button'];
            if (currentConfig.style === 'outline') buttonClasses.push('button--outline');
            if (currentConfig.size === 'small') buttonClasses.push('button--small');
            if (currentConfig.block) buttonClasses.push('button--block');
            
            html = `<a href="${escapeHtml(currentConfig.url)}" class="${buttonClasses.join(' ')}">${escapeHtml(currentConfig.text)}</a>`;
            break;
            
        case 'callout':
            const calloutAttr = currentConfig.emoji ? ` emoji-data="${currentConfig.emoji}"` : '';
            html = `
                <div class="callout ${currentConfig.type}"${calloutAttr}>
                    <h4>${currentConfig.title}</h4>
                    <p>${currentConfig.content}</p>
                </div>
            `;
            break;
            
        case 'accordion':
            html = `
                <details class="details">
                    <summary class="details__summary">${currentConfig.title}</summary>
                    <div class="details__text">
                        <p>${currentConfig.content}</p>
                    </div>
                </details>
            `;
            break;
            
        case 'alert':
            html = `
                <div class="alert alert-${currentConfig.type}">
                    <p>${currentConfig.content}</p>
                </div>
            `;
            break;
            
        case 'quote':
            html = `
                <blockquote class="quote">
                    <p>${currentConfig.content}</p>
                    <footer class="quote__author">
                        <cite>${currentConfig.author}</cite>
                        <span class="quote__role">${currentConfig.role}</span>
                    </footer>
                </blockquote>
            `;
            break;
            
        case 'dosdonts':
            html = `
                <div class="dosdonts">
                    <h3>${currentConfig.title}</h3>
                    <ul class="dosdonts__list">
                        ${currentConfig.items.map((item, i) => `
                            <li class="dosdonts__item dosdonts__item--${currentConfig.types[i]}">
                                ${item}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            break;
    }
    
    previewContainer.innerHTML = html;
}

// Update the generated code
function updateCode() {
    const codeContainer = document.getElementById('generatedCode');
    let html = '';
    
    switch(currentComponent) {
        case 'box':
            if (currentConfig.hasIcon) {
                html = `<div class="box box-icon">
  <i class="${currentConfig.icon}"></i>
  <div>
    <h3 class="box__title">${escapeHtml(currentConfig.title)}</h3>
    <p>${escapeHtml(currentConfig.content)}</p>
  </div>
</div>`;
            } else {
                html = `<div class="box">
  <h3 class="box__title">${escapeHtml(currentConfig.title)}</h3>
  <p>${escapeHtml(currentConfig.content)}</p>
</div>`;
            }
            break;
            
        case 'card':
            const cardClasses = ['card'];
            if (currentConfig.clickable) cardClasses.push('card--clickable');
            
            html = `<div class="${cardClasses.join(' ')}">`;
            if (currentConfig.imageUrl) {
                html += `\n  <div class="card__image">
    <img src="${escapeHtml(currentConfig.imageUrl)}" alt="${escapeHtml(currentConfig.title)}">
  </div>`;
            }
            html += `\n  <div class="card__content">
    <h3 class="card__heading">${escapeHtml(currentConfig.title)}</h3>
    <p class="card__description">${escapeHtml(currentConfig.content)}</p>
    <a href="${escapeHtml(currentConfig.linkUrl)}" class="card__link">${escapeHtml(currentConfig.linkText)}</a>
  </div>
</div>`;
            break;
            
        case 'button':
            const buttonClasses = ['button'];
            if (currentConfig.style === 'outline') buttonClasses.push('button--outline');
            if (currentConfig.size === 'small') buttonClasses.push('button--small');
            if (currentConfig.block) buttonClasses.push('button--block');
            
            html = `<a href="${escapeHtml(currentConfig.url)}" class="${buttonClasses.join(' ')}">${escapeHtml(currentConfig.text)}</a>`;
            break;
            
        case 'callout':
            const calloutAttr = currentConfig.emoji ? ` emoji-data="${currentConfig.emoji}"` : '';
            html = `<div class="callout ${currentConfig.type}"${calloutAttr}>
  <h4>${escapeHtml(currentConfig.title)}</h4>
  <p>${escapeHtml(currentConfig.content)}</p>
</div>`;
            break;
            
        case 'accordion':
            html = `<details class="details">
  <summary class="details__summary">${escapeHtml(currentConfig.title)}</summary>
  <div class="details__text">
    <p>${escapeHtml(currentConfig.content)}</p>
  </div>
</details>`;
            break;
            
        case 'alert':
            html = `<div class="alert alert-${currentConfig.type}">
  <p>${escapeHtml(currentConfig.content)}</p>
</div>`;
            break;
            
        case 'quote':
            html = `<blockquote class="quote">
  <p>${escapeHtml(currentConfig.content)}</p>
  <footer class="quote__author">
    <cite>${escapeHtml(currentConfig.author)}</cite>
    <span class="quote__role">${escapeHtml(currentConfig.role)}</span>
  </footer>
</blockquote>`;
            break;
            
        case 'dosdonts':
            html = `<div class="dosdonts">
  <h3>${escapeHtml(currentConfig.title)}</h3>
  <ul class="dosdonts__list">
${currentConfig.items.map((item, i) => `    <li class="dosdonts__item dosdonts__item--${currentConfig.types[i]}">${escapeHtml(item)}</li>`).join('\n')}
  </ul>
</div>`;
            break;
    }
    
    codeContainer.textContent = html;
    
    // Re-run Prism syntax highlighting
    if (window.Prism) {
        Prism.highlightElement(codeContainer);
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Generate icon picker HTML
function generateIconPicker() {
    let html = '<input type="text" class="icon-search" placeholder="Search icons..." onkeyup="filterIcons(this.value)">';
    html += '<div class="icon-picker" id="iconGrid">';
    
    Object.entries(iconCategories).forEach(([category, icons]) => {
        html += `<div class="icon-category">
            <div class="icon-category-title">${category}</div>
            <div class="icon-category-grid">`;
        
        icons.forEach(icon => {
            html += `<div class="icon-option" data-icon="${icon.class}" title="${icon.name}" onclick="selectIcon('${icon.class}')">
                <i class="${icon.class}"></i>
            </div>`;
        });
        
        html += '</div></div>';
    });
    
    html += '</div>';
    return html;
}

// Select an icon from the picker
function selectIcon(iconClass) {
    try {
        currentConfig.icon = iconClass;
        const iconInput = document.getElementById('boxIcon');
        if (iconInput) {
            iconInput.value = iconClass;
        }
        
        // Update visual selection
        document.querySelectorAll('.icon-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedIcon = document.querySelector(`[data-icon="${iconClass}"]`);
        if (selectedIcon) {
            selectedIcon.classList.add('selected');
        }
        
        updatePreview();
        updateCode();
    } catch (error) {
        console.error('Error selecting icon:', error);
    }
}

// Filter icons based on search
function filterIcons(searchTerm) {
    try {
        const categories = document.querySelectorAll('.icon-category');
        
        if (!searchTerm) {
            searchTerm = '';
        }
        searchTerm = searchTerm.toLowerCase();
        
        categories.forEach(category => {
            const categoryIcons = category.querySelectorAll('.icon-option');
            let hasVisibleIcons = false;
            
            categoryIcons.forEach(icon => {
                const iconName = icon.getAttribute('title')?.toLowerCase() || '';
                const iconClass = icon.getAttribute('data-icon')?.toLowerCase() || '';
                
                if (iconName.includes(searchTerm) || iconClass.includes(searchTerm)) {
                    icon.style.display = 'flex';
                    hasVisibleIcons = true;
                } else {
                    icon.style.display = 'none';
                }
            });
            
            category.style.display = hasVisibleIcons ? 'block' : 'none';
        });
    } catch (error) {
        console.error('Error filtering icons:', error);
    }
}

// Handle component type change
document.addEventListener('DOMContentLoaded', function() {
    const componentSelector = document.getElementById('componentType');
    componentSelector.addEventListener('change', function() {
        currentComponent = this.value;
        currentConfig = { ...componentConfigs[currentComponent] };
        updateControls();
        updatePreview();
        updateCode();
    });
    
    init();
});

// Copy to clipboard function
function copyToClipboard() {
    try {
        const codeElement = document.getElementById('generatedCode');
        if (!codeElement) {
            console.error('Code element not found');
            return;
        }
        
        const code = codeElement.textContent;
        const button = document.querySelector('.copy-button');
        
        if (!button) {
            console.error('Copy button not found');
            return;
        }
        
        navigator.clipboard.writeText(code).then(function() {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }).catch(function(error) {
            console.log('Clipboard API failed, using fallback:', error);
            // Fallback for older browsers
            try {
                const textArea = document.createElement('textarea');
                textArea.value = code;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 2000);
            } catch (fallbackError) {
                console.error('Copy fallback failed:', fallbackError);
                alert('Copy failed. Please manually select and copy the code.');
            }
        });
    } catch (error) {
        console.error('Error in copyToClipboard:', error);
    }
}