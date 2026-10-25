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

/* ===== IMAGE GALLERY LIGHTBOX (products page) =====
   Clicking a product image opens it in a large overlay.
   The overlay is built with JavaScript (DOM manipulation),
   so no extra HTML is needed in products.html. */
const galleryImages = document.querySelectorAll('.scent-family img, .collection-item img');

if (galleryImages.length > 0) {
    // 1. Create the lightbox elements once
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Enlarged product image');

    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.setAttribute('aria-label', 'Close image');
    closeButton.innerHTML = '&times;';

    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';

    const caption = document.createElement('p');
    caption.className = 'lightbox-caption';

    // 2. Put the pieces together and add them to the page
    lightbox.append(closeButton, lightboxImage, caption);
    document.body.appendChild(lightbox);

    let lastFocusedImage = null;

    // 3. Open: show the largest version of the clicked image
    //    (the last file listed in its srcset, e.g. the 800px "medium" version)
    function openLightbox(image) {
        lastFocusedImage = image;
        const sources = image.srcset ? image.srcset.split(',') : [];
        const largestSource = sources.length > 0
            ? sources[sources.length - 1].trim().split(' ')[0]
            : image.src;
        lightboxImage.src = largestSource;
        lightboxImage.alt = image.alt;
        caption.textContent = image.alt;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // stop the page scrolling behind
        closeButton.focus();
    }

    // 4. Close: hide the lightbox and return focus to the image
    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        if (lastFocusedImage) {
            lastFocusedImage.focus();
        }
    }

    // 5. Make every product image clickable (mouse and keyboard)
    galleryImages.forEach(function (image) {
        image.setAttribute('tabindex', '0');

        image.addEventListener('click', function () {
            openLightbox(image);
        });

        image.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    // 6. Three ways to close: the X button, a click outside the image, or the Escape key
    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
}

/* ===== FAQ ACCORDION (about page) =====
   Clicking a question opens its answer and closes the others,
   so only one answer is open at a time. */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {
        const wasOpen = item.classList.contains('is-open');

        // Close every item first
        faqItems.forEach(function (otherItem) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Then open the clicked item (unless it was already open, so a second click closes it)
        if (!wasOpen) {
            item.classList.add('is-open');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});