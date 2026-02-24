/* ============================================================
   Paul Schöpfer MSc – Portfolio Scripts
   ============================================================ */

(function () {
  'use strict';

  /* ---- Dynamic footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky nav shadow on scroll ---- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile nav when a link is clicked */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active nav link on scroll (Intersection Observer) ---- */
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const activateLink = (id) => {
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activateLink(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(sec => observer.observe(sec));

  /* ---- Fade-in on scroll ---- */
  const fadeEls = document.querySelectorAll(
    '.work-card, .cv-block, .contact-item, .hero-text, .hero-photo-wrap, .photo-placeholder'
  );

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  fadeEls.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

})();
