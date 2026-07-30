document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle — dark/light, persisted like the AIVA Freelancia site
function applyThemeToggle() {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('aiva-theme', next);
}
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) themeToggle.addEventListener('click', applyThemeToggle);
const themeToggleMobile = document.getElementById('themeToggleMobile');
if (themeToggleMobile) themeToggleMobile.addEventListener('click', applyThemeToggle);

// Mobile nav drawer
const hamburger = document.getElementById('navHamburger');
const drawer = document.getElementById('mobileDrawer');
hamburger.addEventListener('click', () => {
  const isOpen = drawer.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
drawer.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// FAQ accordion — one open at a time
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    item.closest('.faq-list').querySelectorAll('.faq-item').forEach((other) => other.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});
