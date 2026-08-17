document.addEventListener('DOMContentLoaded', function () {
    // --- Scroll Progress Bar ---
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // --- Hamburger Menu ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Bidirectional Language Toggle ---
    const langBtn = document.getElementById('lang-toggle-btn');
    let isHindi = true; // Start with Hindi

    function toggleLanguage() {
        isHindi = !isHindi; // Toggle the state

        document.querySelectorAll('.lang-hi').forEach(el => {
            el.classList.toggle('hidden', !isHindi);
        });
        document.querySelectorAll('.lang-en').forEach(el => {
            el.classList.toggle('hidden', isHindi);
        });

        // Update the button text
        const langBtnText = document.getElementById('lang-btn-text');
        if (langBtnText) {
            langBtnText.textContent = isHindi ? 'English' : 'हिंदी';
        }
    }

    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }

    // --- Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const targets = document.querySelectorAll('.scroll-animate');
    targets.forEach(target => observer.observe(target));
});