/* ============================================================
   Dynamic Health Care - Global JS
   Plain vanilla, no dependencies. Loaded on every page.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ---------- Sticky nav (glassmorphism on scroll) ---------- */
  function initStickyNav() {
    const header = $('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Active nav link based on filename ---------- */
  function initActiveNav() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link, .dropdown a, .mobile-menu a').forEach((a) => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href && href === path) a.classList.add('is-active');
    });
  }

  /* ---------- Mobile menu toggle ---------- */
  function initMobileMenu() {
    const btnOpen = $('.nav__hamburger');
    const menu = $('.mobile-menu');
    const overlay = $('.mobile-menu__overlay');
    const btnClose = $('.mobile-menu__close');
    if (!btnOpen || !menu) return;

    const open = () => {
      menu.classList.add('is-open');
      overlay && overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      menu.classList.remove('is-open');
      overlay && overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    btnOpen.addEventListener('click', open);
    btnClose && btnClose.addEventListener('click', close);
    overlay && overlay.addEventListener('click', close);
    $$('.mobile-menu a').forEach((a) => a.addEventListener('click', close));
  }

  /* ---------- Dropdown menus (click on mobile, hover on desktop) ---------- */
  function initDropdowns() {
    $$('.nav__menu .has-dropdown').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width: 980px)').matches) {
          e.preventDefault();
          trigger.parentElement.classList.toggle('is-open');
        }
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initScrollReveal() {
    const targets = $$('.reveal');
    if (!targets.length || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => obs.observe(el));
  }

  /* ---------- Stat count-up ---------- */
  function initCountUp() {
    const targets = $$('[data-count]');
    if (!targets.length || !('IntersectionObserver' in window)) {
      targets.forEach((el) => (el.textContent = el.dataset.count));
      return;
    }

    const animate = (el) => {
      const target = parseFloat(el.dataset.count) || 0;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = prefix + val.toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    targets.forEach((el) => obs.observe(el));
  }

  /* ---------- Generic slider (used by hero slider AND image carousel) ---------- */
  function initSlider(slider, slideSelector, intervalMs) {
    if (!slider) return;
    const slides = $$(slideSelector, slider);
    const dotsWrap = $('.slider-dots', slider);
    const prev = $('.slider-arrow--prev', slider);
    const next = $('.slider-arrow--next', slider);
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;

    // Build dots
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => go(i, true));
        dotsWrap.appendChild(dot);
      });
    }
    const dots = dotsWrap ? $$('button', dotsWrap) : [];

    const render = () => {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    };
    const go = (i, manual) => {
      current = (i + slides.length) % slides.length;
      render();
      if (manual) restart();
    };
    const advance = () => go(current + 1);
    const start = () => {
      timer = setInterval(advance, intervalMs);
    };
    const restart = () => {
      if (timer) clearInterval(timer);
      start();
    };

    prev && prev.addEventListener('click', () => go(current - 1, true));
    next && next.addEventListener('click', () => go(current + 1, true));

    // Pause on hover
    slider.addEventListener('mouseenter', () => timer && clearInterval(timer));
    slider.addEventListener('mouseleave', start);

    // Touch swipe
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => (touchStartX = e.touches[0].clientX), { passive: true });
    slider.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1), true);
    });

    render();
    start();
  }

  function initHeroSlider() {
    initSlider($('.hero-slider'), '.hero-slide', 5000);
  }

  function initImageCarousel() {
    initSlider($('.image-carousel'), '.carousel-slide', 5000);
  }

  /* ---------- WhatsApp FAB intro bounce ---------- */
  function initWhatsAppFAB() {
    const fab = $('.fab-whatsapp');
    if (!fab) return;
    setTimeout(() => {
      fab.classList.add('is-bouncing');
      setTimeout(() => fab.classList.remove('is-bouncing'), 1000);
    }, 2000);
  }

  /* ---------- Toast ---------- */
  function showToast(message) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-shown');
    setTimeout(() => toast.classList.remove('is-shown'), 3500);
  }

  /* ---------- Form validation + submit ---------- */
  function initForms() {
    $$('form[data-validate]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        let valid = true;
        // Clear previous errors
        $$('.field-error', form).forEach((el) => el.remove());

        $$('input[required], select[required], textarea[required]', form).forEach((field) => {
          if (!field.value.trim()) {
            showError(field, 'This field is required.');
            valid = false;
          } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            showError(field, 'Enter a valid email address.');
            valid = false;
          } else if (field.type === 'tel' && !/^[0-9 +\-()]{7,}$/.test(field.value)) {
            showError(field, 'Enter a valid phone number.');
            valid = false;
          }
        });

        if (!valid) {
          e.preventDefault();
          return;
        }

        // If form has data-formspree we let the browser submit normally.
        // Otherwise we intercept and show a success message in-page.
        if (!form.hasAttribute('data-formspree')) {
          e.preventDefault();
          const successBox = $('.form-success', form);
          if (successBox) {
            successBox.classList.add('is-shown');
            successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            showToast('Thank you! We will get back to you shortly.');
          }
          form.reset();
        } else {
          // Formspree path: use fetch so we can show in-page success.
          e.preventDefault();
          const data = new FormData(form);
          const submitBtn = $('button[type="submit"]', form);
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.label = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
          }
          fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          })
            .then((res) => {
              if (!res.ok) throw new Error('submit failed');
              return res.json().catch(() => ({}));
            })
            .then(() => {
              const successBox = $('.form-success', form);
              if (successBox) successBox.classList.add('is-shown');
              else showToast('Thank you! We will call you back shortly.');
              form.reset();
            })
            .catch(() => {
              showToast('Could not send right now. Please call us on 96001 23463.');
            })
            .finally(() => {
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = submitBtn.dataset.label || 'Submit';
              }
            });
        }
      });
    });

    function showError(field, message) {
      const err = document.createElement('span');
      err.className = 'field-error';
      err.textContent = message;
      field.parentElement.appendChild(err);
      field.style.borderColor = 'var(--soft-red)';
      field.addEventListener('input', () => (field.style.borderColor = ''), { once: true });
    }
  }

  /* ---------- Tabs (gynaecology page) ---------- */
  function initTabs() {
    $$('.tab-row').forEach((row) => {
      const buttons = $$('button', row);
      const panels = $$('.tab-panel', row.parentElement);
      buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.classList.remove('is-active'));
          panels.forEach((p) => p.classList.remove('is-active'));
          btn.classList.add('is-active');
          if (panels[i]) panels[i].classList.add('is-active');
        });
      });
    });
  }

  /* ---------- Init ---------- */
  ready(() => {
    initStickyNav();
    initActiveNav();
    initMobileMenu();
    initDropdowns();
    initScrollReveal();
    initCountUp();
    initHeroSlider();
    initImageCarousel();
    initWhatsAppFAB();
    initForms();
    initTabs();
  });
})();
