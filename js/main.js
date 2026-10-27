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
        image: 'product-6.jpg'
    },
    {
        name: 'Aquatic Fresh',
        family: 'fresh',
        type: 'Eau de Toilette',
        notes: 'Mint, green apple and cedar',
        price: 670,
        image: 'product-7.jpg'
    },
    {
        name: 'Classic Floral',
        family: 'floral',
        type: 'Eau de Parfum',
        notes: 'Aldehydes, rose and jasmine',
        price: 590,
        image: 'product-8.jpg'
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
            ' sizes="(max-width: 768px) 100vw, 300px"' +
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
