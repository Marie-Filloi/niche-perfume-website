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

/* ===== PRODUCTS PAGE: DYNAMIC COLLECTION =====
   The "More From Our Collection" cards are not written in the HTML.
   They are created here from a list of product data and added to the page. */
const collectionList = document.getElementById('collection-list');

const collectionProducts = [
    {
        name: 'Luminous Floral',
        family: 'floral',
        type: 'Eau de Parfum',
        notes: 'Jasmine, rose and soft pear',
        price: 610,
        image: 'luminous-floral-perfume.jpg'
    },
    {
        name: 'Aquatic Fresh',
        family: 'fresh',
        type: 'Eau de Toilette',
        notes: 'Mint, green apple and cedar',
        price: 670,
        image: 'aquatic-fresh-perfume.jpg'
    },
    {
        name: 'Classic Floral',
        family: 'floral',
        type: 'Eau de Parfum',
        notes: 'Aldehydes, rose and jasmine',
        price: 590,
        image: 'classic-floral-perfume.jpg'
    }
];

if (collectionList) {
    collectionProducts.forEach(function (product) {
        const card = document.createElement('article');
        card.className = 'collection-item';
        card.dataset.family = product.family;
        card.dataset.price = product.price;

        card.innerHTML =
            '<img src="images/products/medium/' + product.image + '"' +
            ' srcset="images/products/small/' + product.image + ' 400w, images/products/medium/' + product.image + ' 800w"' +
            ' sizes="(max-width: 768px) 100vw, 300px" loading="lazy"' +
            ' alt="' + product.name + ' perfume bottle">' +
            '<h4>' + product.name + '</h4>' +
            '<p class="collection-notes">' + product.type + ' · ' + product.notes + '</p>' +
            '<p class="price">From R' + product.price + '</p>' +
            '<button class="add-to-cart" data-name="' + product.name + '" data-price="' + product.price + '">Add to Cart</button>';

        collectionList.appendChild(card);
    });
}

/* ===== PRODUCTS PAGE: SEARCH, FILTER AND SORT =====
   Search by name or note, filter by scent family, and sort by price.
   Matching products stay visible; the others get the "hidden" attribute. */
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('product-search');

if (productList && collectionList && searchInput) {
    const filterButtons = document.querySelectorAll('.filter-button');
    const sortSelect = document.getElementById('product-sort');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    const clearButton = document.getElementById('clear-filters');
    const collectionSection = document.getElementById('collection-section');

    const familyItems = Array.from(productList.querySelectorAll('.scent-family'));
    const collectionItems = Array.from(collectionList.querySelectorAll('.collection-item'));
    const allItems = familyItems.concat(collectionItems);

    // Remember the original ("Featured") order of every product
    allItems.forEach(function (item, index) {
        item.dataset.order = index;
    });

    let activeFilter = 'all';

    // Re-order the products inside one container, based on the chosen sort
    function sortItems(container, items) {
        const sortValue = sortSelect.value;

        const sorted = items.slice().sort(function (a, b) {
            if (sortValue === 'price-asc') {
                return a.dataset.price - b.dataset.price;
            }
            if (sortValue === 'price-desc') {
                return b.dataset.price - a.dataset.price;
            }
            return a.dataset.order - b.dataset.order;
        });

        sorted.forEach(function (item) {
            container.appendChild(item); // appendChild moves the element to the end
        });
    }

    function updateProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        allItems.forEach(function (item) {
            const matchesFamily = activeFilter === 'all' || item.dataset.family === activeFilter;
            const matchesSearch = searchTerm === '' || item.textContent.toLowerCase().includes(searchTerm);
            const isVisible = matchesFamily && matchesSearch;

            item.hidden = !isVisible;
            if (isVisible) {
                visibleCount++;
            }
        });

        sortItems(productList, familyItems);
        sortItems(collectionList, collectionItems);

        // Hide the whole collection section when none of its cards match
        collectionSection.hidden = collectionItems.every(function (item) {
            return item.hidden;
        });

        resultsCount.textContent = 'Showing ' + visibleCount + ' of ' + allItems.length + ' fragrances';
        noResults.hidden = visibleCount > 0;
    }

    // Search: update the list on every key press
    searchInput.addEventListener('input', updateProducts);

    // Filter buttons: only one family is active at a time
    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activeFilter = button.dataset.filter;

            filterButtons.forEach(function (otherButton) {
                const isActive = otherButton === button;
                otherButton.classList.toggle('is-active', isActive);
                otherButton.setAttribute('aria-pressed', isActive);
            });

            updateProducts();
        });
    });

    // Sort menu
    sortSelect.addEventListener('change', updateProducts);

    // "Clear search and filters" button in the no-results message
    clearButton.addEventListener('click', function () {
        searchInput.value = '';
        sortSelect.value = 'featured';
        filterButtons[0].click(); // the "All" button
        searchInput.focus();
    });

    updateProducts();
}

/* ===== SHOPPING CART (products page) =====
   "Add to Cart" buttons add products to a cart saved in localStorage,
   so the cart is kept when the page is reloaded. The cart button and
   side panel are created with JavaScript. */
const addToCartButtons = document.querySelectorAll('.add-to-cart');

if (addToCartButtons.length > 0) {
    const CART_KEY = 'nichePerfumesCart';

    // Read and save the cart (try/catch in case the browser blocks storage)
    function loadCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveCart() {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        } catch (error) {
            // Storage is not available: the cart still works until the page is closed
        }
    }

    let cart = loadCart();

    // 1. Floating cart button (bottom-right corner)
    const cartToggle = document.createElement('button');
    cartToggle.className = 'cart-toggle';
    cartToggle.setAttribute('aria-label', 'Open shopping cart');
    cartToggle.innerHTML = 'Cart <span class="cart-count">0</span>';

    // 2. Dark overlay behind the cart panel
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';

    // 3. Cart side panel
    const cartDrawer = document.createElement('aside');
    cartDrawer.className = 'cart-drawer';
    cartDrawer.setAttribute('role', 'dialog');
    cartDrawer.setAttribute('aria-modal', 'true');
    cartDrawer.setAttribute('aria-labelledby', 'cart-title');
    cartDrawer.innerHTML =
        '<div class="cart-header">' +
            '<h2 id="cart-title">Your Cart</h2>' +
            '<button class="cart-close" aria-label="Close cart">&times;</button>' +
        '</div>' +
        '<ul class="cart-items"></ul>' +
        '<p class="cart-empty">Your cart is empty. Add a fragrance to get started.</p>' +
        '<div class="cart-footer">' +
            '<p class="cart-total">Total: <strong>R0</strong></p>' +
            '<a href="enquiry.html" class="cart-checkout">Enquire About These Items</a>' +
            '<button class="cart-clear">Clear cart</button>' +
        '</div>';

    document.body.append(cartToggle, cartOverlay, cartDrawer);

    const cartCount = cartToggle.querySelector('.cart-count');
    const cartItemsList = cartDrawer.querySelector('.cart-items');
    const cartEmpty = cartDrawer.querySelector('.cart-empty');
    const cartFooter = cartDrawer.querySelector('.cart-footer');
    const cartTotal = cartDrawer.querySelector('.cart-total strong');
    const cartClose = cartDrawer.querySelector('.cart-close');

    // Draw the cart contents, item count and total
    function renderCart() {
        cartItemsList.innerHTML = '';
        let itemCount = 0;
        let total = 0;

        cart.forEach(function (item, index) {
            itemCount += item.quantity;
            total += item.price * item.quantity;

            const row = document.createElement('li');
            row.className = 'cart-item';
            row.innerHTML =
                '<div class="cart-item-info">' +
                    '<span class="cart-item-name">' + item.name + '</span>' +
                    '<span class="cart-item-price">R' + item.price + ' each</span>' +
                '</div>' +
                '<div class="cart-quantity">' +
                    '<button data-action="decrease" data-index="' + index + '" aria-label="Decrease quantity of ' + item.name + '">&minus;</button>' +
                    '<span>' + item.quantity + '</span>' +
                    '<button data-action="increase" data-index="' + index + '" aria-label="Increase quantity of ' + item.name + '">+</button>' +
                '</div>' +
                '<button class="cart-remove" data-action="remove" data-index="' + index + '">Remove</button>';
            cartItemsList.appendChild(row);
        });

        cartCount.textContent = itemCount;
        cartTotal.textContent = 'R' + total;
        cartItemsList.hidden = cart.length === 0;
        cartEmpty.hidden = cart.length > 0;
        cartFooter.hidden = cart.length === 0;
        saveCart();
    }

    function openCart() {
        cartDrawer.classList.add('is-open');
        cartOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        cartClose.focus();
    }

    function closeCart() {
        cartDrawer.classList.remove('is-open');
        cartOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
        cartToggle.focus();
    }

    // Add to Cart: add a new item, or increase the quantity if it is already in the cart
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const name = button.dataset.name;
            const price = Number(button.dataset.price);
            const existingItem = cart.find(function (item) {
                return item.name === name;
            });

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: name, price: price, quantity: 1 });
            }

            renderCart();

            // Short confirmation on the button and a little "pop" on the cart button
            button.textContent = 'Added ✓';
            button.classList.add('is-added');
            cartToggle.classList.add('is-bumped');

            setTimeout(function () {
                button.textContent = 'Add to Cart';
                button.classList.remove('is-added');
                cartToggle.classList.remove('is-bumped');
            }, 1500);
        });
    });

    // Quantity and remove buttons inside the cart (one listener for all rows)
    cartItemsList.addEventListener('click', function (event) {
        const target = event.target.closest('button');
        if (!target) {
            return;
        }

        const index = Number(target.dataset.index);
        const action = target.dataset.action;

        if (action === 'increase') {
            cart[index].quantity++;
        } else if (action === 'decrease') {
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }
        } else if (action === 'remove') {
            cart.splice(index, 1);
        }

        renderCart();
    });

    cartDrawer.querySelector('.cart-clear').addEventListener('click', function () {
        cart = [];
        renderCart();
    });

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && cartDrawer.classList.contains('is-open')) {
            closeCart();
        }
    });

    renderCart();
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

        // 3. Open: show the large (800px "medium") version of the clicked image.
    //    currentSrc is the file the browser is showing; if it is the small
    //    400px version, swap the folder name to load the medium version.
    function openLightbox(image) {
        lastFocusedImage = image;
        const shownSource = image.currentSrc || image.src;
        const largestSource = shownSource.replace('/small/', '/medium/');
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

/* ===== INTERACTIVE STORE MAP (contact page, Leaflet) =====
   Uses the Leaflet library (loaded in contact.html) to show
   both store locations with gold markers and popups. */
const mapElement = document.getElementById('store-map');

if (mapElement && typeof L !== 'undefined') {
    // 1. Store details: name, address, opening hours and map position
    const stores = {
        cbd: {
            name: 'Niche Perfumes — Cape Town CBD',
            address: 'Long Street, Cape Town CBD, 8001',
            hours: 'Mon–Fri 09:00–18:00 · Sat 09:00–15:00',
            coords: [-33.9225, 18.4177]
        },
        waterfront: {
            name: 'Niche Perfumes — V&A Waterfront',
            address: 'Victoria Wharf Shopping Centre, V&A Waterfront, 8001',
            hours: 'Opening in 2027',
            coords: [-33.9030, 18.4206]
        }
    };

    // 2. Create the map (scroll-wheel zoom is off so the page scrolls normally)
    const map = L.map('store-map', { scrollWheelZoom: false });

    // 3. Elegant light grey map style (Esri World Light Gray Canvas, free with attribution)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    }).addTo(map);

    // 4. Custom gold marker, styled in style.css (.gold-marker)
    const goldIcon = L.divIcon({
        className: 'gold-marker',
        html: '<span></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -14]
    });

    // 5. Add one marker and popup per store
    const markers = {};

    Object.keys(stores).forEach(function (key) {
        const store = stores[key];

        markers[key] = L.marker(store.coords, { icon: goldIcon, title: store.name, alt: store.name })
            .addTo(map)
            .bindPopup('<strong>' + store.name + '</strong><br>' + store.address + '<br>' + store.hours);
    });

    // 6. Zoom so that both stores are visible
    map.fitBounds([stores.cbd.coords, stores.waterfront.coords], { padding: [60, 60] });

    // 7. "Show on map" buttons: fly to the store and open its popup
    document.querySelectorAll('.store-button').forEach(function (button) {
        button.addEventListener('click', function () {
            const key = button.dataset.store;

            map.flyTo(stores[key].coords, 16, { duration: 1 });

            // Open the popup once the map has finished moving
            map.once('moveend', function () {
                markers[key].openPopup();
            });
            mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

/* ===== FORM VALIDATION HELPERS (enquiry and contact forms) =====
   Each check returns an error message, or an empty string when the value is valid. */
const namePattern = /^[A-Za-zÀ-ÿ' -]{2,60}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^(\+27|0)[1-9][0-9]{8}$/; // South African numbers: 0XX XXX XXXX or +27 XX XXX XXXX

function checkName(value) {
    if (value === '') {
        return 'Please enter your full name.';
    }
    if (!namePattern.test(value)) {
        return 'Your name should be 2 to 60 letters (spaces, hyphens and apostrophes are allowed).';
    }
    return '';
}

function checkEmail(value) {
    if (value === '') {
        return 'Please enter your email address.';
    }
    if (!emailPattern.test(value)) {
        return 'Please enter a valid email address, e.g. name@example.com.';
    }
    return '';
}

function checkPhone(value) {
    const digits = value.replace(/[\s()-]/g, ''); // ignore spaces, brackets and dashes
    if (digits === '') {
        return ''; // the phone number is optional
    }
    if (!phonePattern.test(digits)) {
        return 'Please enter a valid South African number, e.g. 081 301 0574 or +27 81 301 0574.';
    }
    return '';
}

function checkMessage(value, minLength, maxLength) {
    if (value.length < minLength) {
        return 'Your message must be at least ' + minLength + ' characters (currently ' + value.length + ').';
    }
    if (value.length > maxLength) {
        return 'Your message must be ' + maxLength + ' characters or fewer.';
    }
    return '';
}

// Show or clear the error message under a field
function showFieldError(field, message) {
    const errorElement = document.getElementById(field.id + '-error');
    errorElement.textContent = message;
    field.classList.toggle('is-invalid', message !== '');
    field.setAttribute('aria-invalid', message !== '');
    if (message !== '') {
        field.setAttribute('aria-describedby', errorElement.id);
    } else {
        field.removeAttribute('aria-describedby');
    }
    return message === '';
}

// Live character counter under a textarea
function setUpCounter(textarea, counter, minLength, maxLength) {
    function update() {
        counter.textContent = textarea.value.length + ' / ' + maxLength + ' characters (minimum ' + minLength + ')';
    }
    textarea.addEventListener('input', update);
    update();
}

/* ===== ENQUIRY FORM (enquiry page) =====
   Validates the form, sends it with AJAX (fetch), and then shows the visitor
   a response with the price, availability and delivery of the fragrance. */
const enquiryForm = document.getElementById('enquiry-form');

if (enquiryForm) {
    // Prices and stock levels used to build the response
    const catalogue = {
        'Woody Collection': { price: 650, stock: 12 },
        'Floral Collection': { price: 580, stock: 8 },
        'Oriental / Amber Collection': { price: 720, stock: 3 },
        'Fresh / Citrus Collection': { price: 540, stock: 15 },
        'Unisex Collection': { price: 690, stock: 0 },
        'Luminous Floral': { price: 610, stock: 5 },
        'Aquatic Fresh': { price: 670, stock: 2 },
        'Classic Floral': { price: 590, stock: 6 }
    };

    const FREE_DELIVERY_FROM = 1000; // free Cape Town delivery from R1000
    const DELIVERY_FEE = 80;

    const fields = {
        name: document.getElementById('fullname'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        type: document.getElementById('enquiry-type'),
        fragrance: document.getElementById('fragrance'),
        quantity: document.getElementById('quantity'),
        neededBy: document.getElementById('needed-by'),
        message: document.getElementById('message')
    };
    const productFields = document.getElementById('product-fields');
    const submitButton = document.getElementById('enquiry-submit');
    const responseBox = document.getElementById('enquiry-response');

    setUpCounter(fields.message, document.getElementById('message-counter'), 20, 500);

    // The "Needed by" date cannot be in the past
    const today = new Date().toISOString().split('T')[0];
    fields.neededBy.min = today;

    // Show the fragrance, quantity and date fields only when they are needed
    function needsProduct() {
        return fields.type.value === 'availability' || fields.type.value === 'gift';
    }

    // The quantity field is not needed for "My cart" (the cart already has quantities)
    const quantityParts = [
        document.querySelector('label[for="quantity"]'),
        fields.quantity,
        document.getElementById('quantity-error')
    ];

    function toggleProductFields() {
        productFields.hidden = !needsProduct();
        quantityParts.forEach(function (part) {
            part.hidden = fields.fragrance.value === 'cart';
        });
    }

    fields.type.addEventListener('change', toggleProductFields);
    fields.fragrance.addEventListener('change', toggleProductFields);

    // If the visitor comes from the cart, add a "My cart" option and fill in the form
    let cartItems = [];
    try {
        cartItems = JSON.parse(localStorage.getItem('nichePerfumesCart')) || [];
    } catch (error) {
        cartItems = [];
    }

    if (cartItems.length > 0) {
        const cartOption = document.createElement('option');
        cartOption.value = 'cart';
        cartOption.textContent = 'My cart (' + cartItems.length + (cartItems.length === 1 ? ' fragrance)' : ' fragrances)');
        fields.fragrance.insertBefore(cartOption, fields.fragrance.options[1]);

        fields.type.value = 'availability';
        fields.fragrance.value = 'cart';
        fields.message.value = 'I would like to know the price and availability of the items in my cart: ' +
            cartItems.map(function (item) {
                return item.name + ' x ' + item.quantity;
            }).join(', ') + '.';
        fields.message.dispatchEvent(new Event('input')); // update the character counter
        toggleProductFields();
    }

    // Validate one field at a time
    const validators = {
        name: function () { return showFieldError(fields.name, checkName(fields.name.value.trim())); },
        email: function () { return showFieldError(fields.email, checkEmail(fields.email.value.trim())); },
        phone: function () { return showFieldError(fields.phone, checkPhone(fields.phone.value.trim())); },
        type: function () {
            return showFieldError(fields.type, fields.type.value === '' ? 'Please choose an enquiry type.' : '');
        },
        fragrance: function () {
            if (!needsProduct()) { return true; }
            return showFieldError(fields.fragrance, fields.fragrance.value === '' ? 'Please choose a fragrance.' : '');
        },
        quantity: function () {
            if (!needsProduct() || fields.fragrance.value === 'cart') { return true; }
            const quantity = Number(fields.quantity.value);
            const valid = Number.isInteger(quantity) && quantity >= 1 && quantity <= 50;
            return showFieldError(fields.quantity, valid ? '' : 'Please enter a quantity between 1 and 50.');
        },
        neededBy: function () {
            if (!needsProduct() || fields.neededBy.value === '') { return true; }
            return showFieldError(fields.neededBy, fields.neededBy.value < today ? 'Please choose today or a future date.' : '');
        },
        message: function () {
            return showFieldError(fields.message, checkMessage(fields.message.value.trim(), 20, 500));
        }
    };

    // Check each field when the visitor leaves it, and update an error while they fix it
    Object.keys(validators).forEach(function (key) {
        fields[key].addEventListener('blur', validators[key]);
        fields[key].addEventListener('input', function () {
            if (fields[key].classList.contains('is-invalid')) {
                validators[key]();
            }
        });
    });

    // Format a number as Rand, e.g. R1 300
    function rand(amount) {
        return 'R' + amount.toLocaleString('en-ZA');
    }

    // Work out the response for one fragrance
    function availabilityText(name, quantity) {
        const stock = catalogue[name].stock;
        if (stock >= quantity) {
            return 'In stock: ready for collection at our Cape Town CBD store within 24 hours, or delivered in Cape Town within 1–3 business days.';
        }
        if (stock > 0) {
            return 'Only ' + stock + ' available now. The remaining ' + (quantity - stock) + ' can be ordered in 7–10 business days.';
        }
        return 'Currently out of stock. Available to pre-order, with delivery in 7–10 business days.';
    }

    // Build the response with createElement and textContent (never innerHTML with
    // visitor input), so nothing typed in the form can run as code on the page.
    function addLine(parent, tag, text, className) {
        const element = document.createElement(tag);
        element.textContent = text;
        if (className) {
            element.className = className;
        }
        parent.appendChild(element);
        return element;
    }

    function showResponse(data, referenceNumber, sentOnline) {
        responseBox.innerHTML = '';
        const firstName = data.name.split(' ')[0];

        addLine(responseBox, 'h3', 'Thank you, ' + firstName + '!');
        addLine(responseBox, 'p', 'Your enquiry reference is ' + referenceNumber + '. Our team will also reply to ' + data.email + ' within 1–2 business days.', 'response-reference');

        if (data.type === 'availability' || data.type === 'gift') {
            if (data.fragrance === 'not-sure') {
                addLine(responseBox, 'p', 'Our fragrances range from R540 to R720. Our fragrance advisor will email you three personal recommendations based on your message.');
            } else {
                // Items to price: the whole cart, or the chosen fragrance
                const items = data.fragrance === 'cart'
                    ? cartItems
                    : [{ name: data.fragrance, quantity: data.quantity }];

                const list = document.createElement('ul');
                list.className = 'response-items';
                let subtotal = 0;
                let itemCount = 0;

                items.forEach(function (item) {
                    const product = catalogue[item.name];
                    if (!product) { return; }
                    const lineTotal = product.price * item.quantity;
                    subtotal += lineTotal;
                    itemCount += item.quantity;

                    const row = document.createElement('li');
                    addLine(row, 'strong', item.name + ' × ' + item.quantity + ': ' + rand(lineTotal));
                    addLine(row, 'span', availabilityText(item.name, item.quantity));
                    list.appendChild(row);
                });
                responseBox.appendChild(list);

                let total = subtotal;
                const summary = document.createElement('div');
                summary.className = 'response-summary';
                addLine(summary, 'p', 'Subtotal: ' + rand(subtotal));

                // Corporate discount: 10% off gift orders of 5 or more bottles
                if (data.type === 'gift' && itemCount >= 5) {
                    const discount = Math.round(subtotal * 0.1);
                    total -= discount;
                    addLine(summary, 'p', 'Corporate gift discount (10%): −' + rand(discount));
                }
                if (data.type === 'gift') {
                    addLine(summary, 'p', 'Gift wrapping in our black and gold packaging: free');
                }

                const delivery = total >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
                total += delivery;
                addLine(summary, 'p', 'Delivery in Cape Town: ' + (delivery === 0 ? 'free' : rand(delivery)));
                addLine(summary, 'p', 'Estimated total: ' + rand(total), 'response-total');
                responseBox.appendChild(summary);

                if (data.neededBy) {
                    const neededDate = new Date(data.neededBy + 'T00:00:00');
                    addLine(responseBox, 'p', 'You need your order by ' + neededDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) + '. We will confirm the delivery date with you by email.');
                }
            }
        } else if (data.type === 'stockist') {
            addLine(responseBox, 'p', 'Thank you for your interest in stocking Niche Perfumes. Our partnerships team will email our wholesale price list and terms within 2 business days.');
        } else {
            addLine(responseBox, 'p', 'We have received your message. Thank you for getting in touch with Niche Perfumes.');
        }

        if (!sentOnline) {
            addLine(responseBox, 'p', 'Note: our server could not be reached, so your enquiry was only processed in your browser. Please also email us at filloi@nicheperfumes.co.za.', 'response-note');
        }

        responseBox.hidden = false;
        responseBox.focus();
    }

    enquiryForm.addEventListener('submit', function (event) {
        event.preventDefault(); // stop the page from reloading

        // Run every check (not just until the first error) so all messages show at once
        let formIsValid = true;
        Object.keys(validators).forEach(function (key) {
            if (!validators[key]()) {
                formIsValid = false;
            }
        });

        if (!formIsValid) {
            enquiryForm.querySelector('.is-invalid').focus();
            return;
        }

        const data = {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            phone: fields.phone.value.trim(),
            type: fields.type.value,
            fragrance: fields.fragrance.value,
            quantity: Number(fields.quantity.value),
            neededBy: fields.neededBy.value,
            message: fields.message.value.trim()
        };
        const referenceNumber = 'NP-' + Date.now().toString().slice(-6);

        // AJAX: send the data in the background to the URL in the form's "action"
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';

        fetch(enquiryForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Server error ' + response.status);
                }
                showResponse(data, referenceNumber, true);
            })
            .catch(function () {
                showResponse(data, referenceNumber, false);
            })
            .finally(function () {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Enquiry';
                enquiryForm.reset();
                fields.message.dispatchEvent(new Event('input'));
                toggleProductFields();
            });
    });
}

/* ===== CONTACT FORM (contact page) =====
   Validates the message, then compiles it into an email addressed to
   Niche Perfumes. The visitor sees a preview and sends it from their own
   email app (a "mailto:" link). */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const CONTACT_EMAIL = 'filloi@nicheperfumes.co.za'; // the recipient of every message

    const contactFields = {
        name: document.getElementById('contact-name'),
        email: document.getElementById('contact-email'),
        phone: document.getElementById('contact-phone'),
        type: document.getElementById('contact-type'),
        subject: document.getElementById('contact-subject'),
        message: document.getElementById('contact-message')
    };
    const emailPreview = document.getElementById('email-preview');

    setUpCounter(contactFields.message, document.getElementById('contact-message-counter'), 20, 1000);

    const contactValidators = {
        name: function () { return showFieldError(contactFields.name, checkName(contactFields.name.value.trim())); },
        email: function () { return showFieldError(contactFields.email, checkEmail(contactFields.email.value.trim())); },
        phone: function () { return showFieldError(contactFields.phone, checkPhone(contactFields.phone.value.trim())); },
        type: function () {
            return showFieldError(contactFields.type, contactFields.type.value === '' ? 'Please choose a message type.' : '');
        },
        subject: function () {
            const length = contactFields.subject.value.trim().length;
            return showFieldError(contactFields.subject, length < 5 || length > 80 ? 'Your subject should be 5 to 80 characters.' : '');
        },
        message: function () {
            return showFieldError(contactFields.message, checkMessage(contactFields.message.value.trim(), 20, 1000));
        }
    };

    Object.keys(contactValidators).forEach(function (key) {
        contactFields[key].addEventListener('blur', contactValidators[key]);
        contactFields[key].addEventListener('input', function () {
            if (contactFields[key].classList.contains('is-invalid')) {
                contactValidators[key]();
            }
        });
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let formIsValid = true;
        Object.keys(contactValidators).forEach(function (key) {
            if (!contactValidators[key]()) {
                formIsValid = false;
            }
        });

        if (!formIsValid) {
            contactForm.querySelector('.is-invalid').focus();
            return;
        }

        // 1. Compile the form into an email
        const name = contactFields.name.value.trim();
        const emailSubject = '[' + contactFields.type.value + '] ' + contactFields.subject.value.trim();
        const emailBody =
            'Name: ' + name + '\n' +
            'Email: ' + contactFields.email.value.trim() + '\n' +
            'Phone: ' + (contactFields.phone.value.trim() || 'Not provided') + '\n' +
            'Message type: ' + contactFields.type.value + '\n\n' +
            contactFields.message.value.trim() + '\n\n' +
            'Sent from the Niche Perfumes website contact form.';

        // encodeURIComponent makes spaces, line breaks and symbols safe inside a link
        const mailtoLink = 'mailto:' + CONTACT_EMAIL +
            '?subject=' + encodeURIComponent(emailSubject) +
            '&body=' + encodeURIComponent(emailBody);

        // 2. Show a preview (built with textContent so typed text is never run as code)
        emailPreview.innerHTML = '';

        const title = document.createElement('h3');
        title.textContent = 'Your email is ready, ' + name.split(' ')[0] + '!';

        const intro = document.createElement('p');
        intro.textContent = 'Check the preview below, then click the button to send it from your email app.';

        const preview = document.createElement('div');
        preview.className = 'email-preview-box';
        [['To', CONTACT_EMAIL], ['Subject', emailSubject]].forEach(function (pair) {
            const line = document.createElement('p');
            const label = document.createElement('strong');
            label.textContent = pair[0] + ': ';
            line.appendChild(label);
            line.appendChild(document.createTextNode(pair[1]));
            preview.appendChild(line);
        });
        const body = document.createElement('pre');
        body.textContent = emailBody;
        preview.appendChild(body);

        const sendLink = document.createElement('a');
        sendLink.href = mailtoLink;
        sendLink.className = 'send-email-button';
        sendLink.textContent = 'Send with My Email App';

        emailPreview.append(title, intro, preview, sendLink);
        emailPreview.hidden = false;
        emailPreview.focus();

        // 3. Open the visitor's email app straight away with everything filled in
        window.location.href = mailtoLink;
    });
}
