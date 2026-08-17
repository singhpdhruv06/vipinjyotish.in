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

  function toggleMenu() {
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
    });
  });

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

// --- Bidirectional Language Toggle ---
let isHindi = true; // Start with Hindi
function toggleLanguage() {
  isHindi = !isHindi; // Toggle the state

  document.querySelectorAll('.lang-hi').forEach(el => el.classList.toggle('hidden', !isHindi));
  document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', isHindi));

  // Update the button text
  const langBtnText = document.getElementById('lang-btn-text');
  if(langBtnText) {
    langBtnText.textContent = isHindi ? 'English' : 'हिंदी';
  }
}