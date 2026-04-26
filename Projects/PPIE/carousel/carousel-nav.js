/**
 * Netflix-style Carousel Navigation
 * Features: prev/next buttons, mouse drag, indicators, keyboard nav
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('schoolsCarousel');
        const prevBtn = document.querySelector('.carousel-nav--prev');
        const nextBtn = document.querySelector('.carousel-nav--next');
        const wrapper = document.querySelector('.carousel-wrapper');

        if (!carousel || !prevBtn || !nextBtn) {
            console.warn('Carousel elements not found');
            return;
        }

        // ==================== INDICATORS ====================
        const cards = carousel.querySelectorAll('.card');
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';

        // Calculate number of pages based on viewport
        function getPageCount() {
            const carouselWidth = carousel.offsetWidth;
            const scrollWidth = carousel.scrollWidth;
            return Math.ceil(scrollWidth / carouselWidth);
        }

        // Create indicator dots
        function createIndicators() {
            indicatorsContainer.innerHTML = '';
            const pageCount = getPageCount();

            for (let i = 0; i < pageCount; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-indicator';
                dot.setAttribute('aria-label', `Go to page ${i + 1}`);
                dot.dataset.page = i;

                dot.addEventListener('click', function() {
                    const targetScroll = i * carousel.offsetWidth;
                    carousel.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                    });
                });

                indicatorsContainer.appendChild(dot);
            }

            wrapper.appendChild(indicatorsContainer);
        }

        // Update active indicator
        function updateIndicators() {
            const dots = indicatorsContainer.querySelectorAll('.carousel-indicator');
            const currentPage = Math.round(carousel.scrollLeft / carousel.offsetWidth);

            dots.forEach((dot, index) => {
                if (index === currentPage) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        createIndicators();

        // ==================== MOUSE DRAG ====================
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', function(e) {
            // Don't interfere with link clicks
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }

            isDown = true;
            carousel.style.cursor = 'grabbing';
            carousel.style.userSelect = 'none';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', function() {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', function() {
            isDown = false;
            carousel.style.cursor = 'grab';
            carousel.style.userSelect = '';
        });

        carousel.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Set initial cursor
        carousel.style.cursor = 'grab';

        // ==================== SCROLL WHEEL ====================
        carousel.addEventListener('wheel', function(e) {
            // Support horizontal scroll with shift+wheel or touchpad horizontal gesture
            if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                carousel.scrollLeft += e.deltaY + e.deltaX;
            }
        }, { passive: false });

        // ==================== KEYBOARD NAVIGATION ====================
        carousel.setAttribute('tabindex', '0');

        carousel.addEventListener('keydown', function(e) {
            const scrollAmount = carousel.offsetWidth;

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    carousel.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    carousel.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                    break;
                case 'Home':
                    e.preventDefault();
                    carousel.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                    break;
                case 'End':
                    e.preventDefault();
                    carousel.scrollTo({
                        left: carousel.scrollWidth,
                        behavior: 'smooth'
                    });
                    break;
            }
        });

        // ==================== BUTTON NAVIGATION ====================
        function getScrollAmount() {
            return carousel.offsetWidth;
        }

        prevBtn.addEventListener('click', function() {
            const scrollAmount = getScrollAmount();
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', function() {
            const scrollAmount = getScrollAmount();
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // ==================== UPDATE STATES ====================
        function updateButtonVisibility() {
            const isAtStart = carousel.scrollLeft <= 0;
            const isAtEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 5;

            prevBtn.style.opacity = isAtStart ? '0.3' : '0.8';
            prevBtn.style.cursor = isAtStart ? 'default' : 'pointer';
            prevBtn.disabled = isAtStart;

            nextBtn.style.opacity = isAtEnd ? '0.3' : '0.8';
            nextBtn.style.cursor = isAtEnd ? 'default' : 'pointer';
            nextBtn.disabled = isAtEnd;

            // Update indicators
            updateIndicators();
        }

        // Update on scroll
        carousel.addEventListener('scroll', updateButtonVisibility);

        // Initial state
        updateButtonVisibility();

        // Update on window resize
        window.addEventListener('resize', function() {
            createIndicators();
            updateButtonVisibility();
        });
    });
})();
