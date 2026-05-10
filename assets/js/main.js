/* Amna's Photography — interaction layer */

(function () {
  'use strict';

  /* Sticky nav state */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('nav--scrolled');
      else nav.classList.remove('nav--scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile drawer */
  const toggle = document.querySelector('.nav__toggle');
  const drawer = document.querySelector('.nav__drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* Portfolio category filter */
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-cat]');
  if (filterButtons.length && filterItems.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.toggle('active', b === btn));
        filterItems.forEach(item => {
          const match = target === 'all' || item.dataset.cat === target;
          item.style.display = match ? '' : 'none';
          if (match) {
            item.classList.remove('in');
            requestAnimationFrame(() => item.classList.add('in'));
          }
        });
      });
    });
  }

  /* Lightbox */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox__close');
    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
      trigger.style.cursor = 'zoom-in';
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const src = trigger.dataset.lightbox;
        lbImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const close = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.src = '';
    };
    lbClose && lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) close(); });
  }

  /* Contact form (placeholder demo) */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = contactForm.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thank you. Your inquiry has been recorded. Amna will be in touch within 24 hours.';
        status.style.color = 'var(--clay)';
      }
      contactForm.reset();
    });
  }
})();
