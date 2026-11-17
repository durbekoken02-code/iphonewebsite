document.addEventListener('DOMContentLoaded', () => {
    const globalNav = document.getElementById('globalNav');
    const searchBtn = document.getElementById('searchBtn');
    const bagBtn = document.getElementById('bagBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const searchDropdown = document.getElementById('searchDropdown');
    const bagDropdown = document.getElementById('bagDropdown');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const navBackdrop = document.getElementById('navBackdrop');
    const searchInput = document.getElementById('searchInput');

    function closeAllMenus() {
        searchDropdown.classList.remove('active');
        bagDropdown.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        navBackdrop.classList.remove('active');
        globalNav.classList.remove('open');
    }

    // Search Toggle
    searchBtn.addEventListener('click', () => {
        const isActive = searchDropdown.classList.contains('active');
        closeAllMenus();
        if (!isActive) {
            searchDropdown.classList.add('active');
            navBackdrop.classList.add('active');
            globalNav.classList.add('open');
            setTimeout(() => searchInput.focus(), 100);
        }
    });

    // Bag Toggle
    bagBtn.addEventListener('click', () => {
        const isActive = bagDropdown.classList.contains('active');
        closeAllMenus();
        if (!isActive) {
            bagDropdown.classList.add('active');
            navBackdrop.classList.add('active');
            globalNav.classList.add('open');
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileNavOverlay.classList.contains('active');
        closeAllMenus();
        if (!isActive) {
            mobileNavOverlay.classList.add('active');
            mobileMenuBtn.classList.add('active');
            globalNav.classList.add('open');
        }
    });

    // Close menus when clicking backdrop or mobile links
    navBackdrop.addEventListener('click', closeAllMenus);
    document.querySelectorAll('.mobile-nav-list a').forEach(link => {
        link.addEventListener('click', closeAllMenus);
    });

    // Close menus on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllMenus();
    });

    // Apple TV+ Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const playPauseBtn = document.getElementById('playPauseBtn');

    let currentIndex = 0;
    let isPlaying = true;
    let slideInterval;

    // Generate navigation dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        slideInterval = setInterval(nextSlide, 4500);
    }

    function stopAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) startAutoPlay();
    });

    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playPauseBtn.innerHTML = '&#10074;&#10074;';
            playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
            startAutoPlay();
        } else {
            playPauseBtn.innerHTML = '&#9654;';
            playPauseBtn.setAttribute('aria-label', 'Play slideshow');
            stopAutoPlay();
        }
    });

    startAutoPlay();
});