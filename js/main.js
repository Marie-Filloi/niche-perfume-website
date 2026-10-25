/* =========================================================
   Niche Perfumes - main.js
   Shared JavaScript for all five pages.
   ========================================================= */

/* ===== MOBILE NAVIGATION TOGGLE (HAMBURGER MENU) =====
   On tablet and mobile, the menu is hidden by CSS.
   Clicking the hamburger button adds or removes the
   "is-open" class on the <nav>, which shows or hides it. */
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
        // toggle() adds the class if missing, removes it if present
        const isOpen = mainNav.classList.toggle('is-open');

        // Tell screen readers whether the menu is open or closed
        navToggle.setAttribute('aria-expanded', isOpen);
    });
}
