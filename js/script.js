document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile nav toggle */
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
navToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

/* Growth-path stem draw-on */
const pathLine = document.querySelector('.path-line');
if (pathLine && 'IntersectionObserver' in window) {
  const pathIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        pathLine.classList.add('drawn');
        pathIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  pathIo.observe(document.getElementById('growth-path'));
}

/* Accordion */
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.accordion-trigger').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    panel.style.maxHeight = expanded ? null : panel.scrollHeight + 'px';
  });
});

/* Header shadow on scroll */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 8 ? '0 8px 24px -18px rgba(28,27,23,.4)' : 'none';
}, { passive: true });

/* Contact form (progressive enhancement — falls back to normal POST if JS/fetch unavailable) */
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    note.textContent = 'Sending…';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
      if (res.ok) {
        note.textContent = "Thanks — we'll be in touch within one business day.";
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      note.textContent = "Something went wrong. Please call us at (248) 609-1422 or email info@elevatecounselingmi.com.";
    }
  });
}
