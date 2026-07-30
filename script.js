document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle — dark/light, persisted like the AIVA Freelancia site.
// Initial theme (saved choice, else OS preference, else dark) is already
// applied by the inline <head> script before this file loads, to avoid
// a flash of the wrong theme; this only wires up manual switching.
const themeColorMeta = document.getElementById('themeColorMeta');
const themeToggle = document.getElementById('themeToggle');

function syncThemeUI(theme) {
  if (themeColorMeta) themeColorMeta.setAttribute('content', theme === 'light' ? '#fafafa' : '#0a0a0a');
  if (themeToggle) themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
syncThemeUI(document.documentElement.getAttribute('data-theme'));

function applyThemeToggle() {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('aiva-theme', next);
  syncThemeUI(next);
}
if (themeToggle) themeToggle.addEventListener('click', applyThemeToggle);
const themeToggleMobile = document.getElementById('themeToggleMobile');
if (themeToggleMobile) themeToggleMobile.addEventListener('click', applyThemeToggle);

// Mobile nav drawer — Escape to close, click outside to close, focus management
// (guarded: simplified pages like the policy docs don't include a drawer)
const hamburger = document.getElementById('navHamburger');
const drawer = document.getElementById('mobileDrawer');

if (hamburger && drawer) {
  const openDrawer = () => {
    drawer.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    const firstLink = drawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  };
  const closeDrawer = (returnFocus) => {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (returnFocus) hamburger.focus();
  };

  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('open')) closeDrawer(false);
    else openDrawer();
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer(true);
  });

  document.addEventListener('click', (e) => {
    if (!drawer.classList.contains('open')) return;
    if (drawer.contains(e.target) || hamburger.contains(e.target)) return;
    closeDrawer(false);
  });
}

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

// FAQ accordion — one open at a time, with aria-expanded kept in sync
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    item.closest('.faq-list').querySelectorAll('.faq-item').forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});
