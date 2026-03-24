/**
 * La Lucia Tennis Club — script.js
 * =======================================================
 * Modules:
 *  1. WhatsApp link generation  (edit WA_NUMBER to update everywhere)
 *  2. Sticky navbar scroll state
 *  3. Mobile navigation toggle
 *  4. Smooth scroll for # anchor links
 *  5. Scroll-triggered reveal animations (IntersectionObserver)
 *  6. Footer copyright year (auto-updates)
 * =======================================================
 */


// ============================================================
// 1. WHATSAPP CONFIGURATION
//    *** EDIT THIS ONE VARIABLE to update all WhatsApp buttons ***
//    Format: country code + number, no '+', no spaces
// ============================================================
const WA_NUMBER  = '27637841545';
const WA_MESSAGE = encodeURIComponent("Hi, I'd like to find out more about La Lucia Tennis Club.");
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

/**
 * Attach click handler to every element with class="wa-book-btn".
 * Opens the pre-filled WhatsApp chat in a new tab.
 */
function initWhatsApp() {
  document.querySelectorAll('.wa-book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(WA_URL, '_blank', 'noopener,noreferrer');
    });
  });
}


// ============================================================
// 2. STICKY NAVBAR
//    Adds the class "scrolled" once user scrolls past 60px.
//    CSS handles the visual transition to a solid background.
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const THRESHOLD = 60;

  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > THRESHOLD);
  }

  handleScroll();  // Set state on page load (e.g. if user refreshes mid-page)
  window.addEventListener('scroll', handleScroll, { passive: true });
}


// ============================================================
// 3. MOBILE NAVIGATION TOGGLE
//    Toggles the full-screen overlay nav and animates the
//    hamburger icon into an × when open.
// ============================================================
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Toggle on hamburger click
  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when any nav link is clicked (after navigating)
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}


// ============================================================
// 4. SMOOTH SCROLL
//    Intercepts clicks on internal # anchor links and uses
//    smooth scrollIntoView. CSS scroll-padding-top handles
//    the sticky navbar offset automatically.
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;  // Skip bare # links

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


// ============================================================
// 5. SCROLL-TRIGGERED REVEAL ANIMATIONS
//    Watches elements with class="reveal" using IntersectionObserver.
//    Adds class="visible" when element enters viewport.
//    CSS handles the fade + slide-up transition.
//    Each element animates in once, then stops being watched.
// ============================================================
function initRevealAnimations() {
  // Fallback: if IntersectionObserver isn't supported, reveal everything
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate once only
        }
      });
    },
    {
      threshold: 0.1,                    // Trigger when 10% of element is visible
      rootMargin: '0px 0px -40px 0px'   // Slightly before the very bottom edge
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// ============================================================
// 6. FOOTER YEAR
//    Keeps the copyright year current automatically.
// ============================================================
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}


// ============================================================
// INIT — Run all modules once the DOM is fully parsed
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initWhatsApp();
  initNavbar();
  initMobileNav();
  initSmoothScroll();
  initRevealAnimations();
  initYear();
});
