# Netflix-Style Carousel Implementation

## Files Created

1. **Homepage-backup.html** - Backup of the original homepage with grid layout
2. **Homepage-carousel.html** - New version with Netflix-style carousel
3. **carousel-style.css** - Carousel styling (buttons, layout, effects)
4. **carousel-nav.js** - JavaScript for navigation button functionality
5. **CAROUSEL-README.md** - This documentation file

## What Changed?

### From Grid to Carousel

**Original Layout (Homepage.html & Homepage-backup.html):**
- CSS Grid layout displaying cards in rows
- Cards wrap to multiple rows
- All cards visible at once

**New Layout (Homepage-carousel.html):**
- Horizontal scrolling carousel
- **Previous/Next navigation buttons** (circular arrows on left/right)
- 3 cards visible at once on desktop
- 2 cards on tablets
- 1 card on mobile
- Netflix-style hover effect (scale up on hover)
- Smooth scroll behavior
- Hidden scrollbar (but still scrollable)
- Button states (disabled when at start/end)

## CSS Features Used

### 1. **Flexbox Container**
```css
display: flex;
overflow-x: auto;
scroll-behavior: smooth;
```

### 2. **Scroll Snap Points**
```css
scroll-snap-type: x mandatory;
scroll-snap-align: start; /* on cards */
```
This creates smooth snapping when scrolling, similar to Netflix.

### 3. **Hidden Scrollbar**
```css
scrollbar-width: none; /* Firefox */
-ms-overflow-style: none; /* IE/Edge */
::-webkit-scrollbar { display: none; } /* Chrome/Safari */
```

### 4. **Hover Effects**
```css
transform: scale(1.05);
box-shadow: 0 8px 24px rgba(0, 96, 84, 0.2);
```

### 5. **Gradient Scroll Hint**
A subtle gradient on the right edge indicates more content is available.

### 6. **Responsive Design**
- Desktop: 3 cards visible
- Tablet (< 1200px): 2 cards visible
- Mobile (< 768px): 1 card visible

### 7. **Accessibility**
- Respects `prefers-reduced-motion` for users sensitive to animations
- Keyboard navigable with Tab and arrow keys
- Maintains semantic HTML structure

## How to Use

### View the Carousel
Open `Homepage-carousel.html` in a web browser.

### Navigation Methods
1. **Navigation Buttons** - Click the circular arrow buttons on left/right (desktop only)
2. **Page Indicators** - Click the dots at the bottom to jump to a specific page
3. **Mouse Drag** - Click and drag horizontally (cursor changes to "grab" hand)
4. **Scroll Wheel** - Shift+scroll or touchpad horizontal gesture
5. **Keyboard Navigation**:
   - Arrow Left/Right - Move one page
   - Home - Jump to start
   - End - Jump to end
   - Tab - Focus on carousel, then use arrow keys
6. **Touch** - Swipe left/right on mobile devices

**Note:** Navigation buttons are hidden on mobile devices (< 768px) to save space. Page indicators remain visible on all devices.

### Customization

#### Change Number of Visible Cards
Edit in `carousel-style.css`:
```css
.schools-grid .card {
    flex: 0 0 calc(33.333% - 14px); /* Change 33.333% to desired percentage */
}
```

#### Change Card Size
```css
.schools-grid .card {
    min-width: 300px; /* Minimum card width */
    max-width: 400px; /* Maximum card width */
}
```

#### Adjust Hover Effect
```css
.schools-grid .card:hover {
    transform: scale(1.05); /* Change scale value */
}
```

#### Change Gap Between Cards
```css
.schools-grid {
    gap: 20px; /* Adjust spacing */
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)
- ⚠️ IE11 (partial - no smooth scroll, no scroll-snap)

## Performance

This implementation is lightweight and efficient:
- ✅ Minimal JavaScript (only for navigation buttons)
- ✅ No external libraries required
- ✅ Fast and responsive
- ✅ Core carousel works without JS (navigation buttons require JS)
- ✅ Accessible with keyboard navigation

## Reverting to Grid Layout

To go back to the original grid layout:
1. Use `Homepage-backup.html` instead
2. Or remove these lines from the HTML:
   - `<link rel="stylesheet" href="carousel-style.css">`
   - `<script src="carousel-nav.js"></script>`
   - Remove the carousel wrapper and navigation buttons from the HTML

## Notes

- Navigation buttons added to HTML structure
- All existing card functionality (links, hover states) preserved
- Cards remain fully accessible
- Responsive design adapts to all screen sizes
- Minimal JavaScript added for button navigation
- Buttons intelligently disable at start/end positions
- Buttons hidden on mobile to maximize screen space

## Future Enhancements (Optional)

Additional features that could be added:
- Keyboard shortcuts (e.g., Ctrl + arrow keys for faster navigation)
- Auto-play carousel with pause on hover
- Page indicators (dots showing position)
- "See All" button to toggle grid view
- Touch gesture improvements
- Lazy loading for better performance

## Customizing Navigation Buttons

### Change Button Color
Edit in `carousel-style.css`:
```css
.carousel-nav {
    background: rgba(0, 96, 84, 0.9); /* Change color here */
}
```

### Change Button Size
```css
.carousel-nav {
    width: 40px;  /* Adjust size */
    height: 40px;
}
```

### Change Button Position
```css
.carousel-nav--prev {
    left: 0; /* Distance from left edge */
}

.carousel-nav--next {
    right: 0; /* Distance from right edge */
}
```
