# Niche Perfumes — Website Project

## Project Title
Niche Perfumes Website — WEDE5020 Portfolio of Evidence (Parts 1 to 3)

## Live Website
🌐 **https://marie-filloi.github.io/niche-perfume-website/** (deployed with GitHub Pages)

## Student Information
- **Name:** Filloi Marie Antoinette
- **Student Number:** ST10494651
- **Subject:** WEDE5020
- **Qualification:** Diploma in Information Technology Management (DITM)

## Project Overview
Niche Perfumes is a proposed retail business based in Cape Town, South Africa, specialising in
authentic luxury fragrances for men and women. As a start-up with no existing physical store or
online presence, this project builds the business's first digital presence from the ground up —
a five-page website introducing the brand, showcasing its fragrance catalogue, and giving
customers a way to make enquiries.

This repository contains the full project across three parts:
- **Part 1: Building the Foundation** — project planning, content research, and the HTML structure
  for all five pages.
- **Part 2: Designing the Visuals** — CSS styling and responsive design.
- **Part 3: Enhancing Functionality and SEO** — corrections from the Part 2 feedback, JavaScript
  functionality, form validation, SEO, and deployment.

## Website Goals and Objectives
- Increase online visibility and generate direct sales enquiries.
- Showcase the full fragrance catalogue with descriptions and imagery.
- Educate visitors on scent families, ingredients, and the brand's story.

**Key Performance Indicators (KPIs):**
- Monthly unique website visitors.
- Enquiry-to-conversion rate from the enquiry form.
- Average time on site and bounce rate.
- Repeat visitor rate month over month.

## Key Features and Functionality
The website consists of five core pages:

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero image, brand introduction, call-to-action, featured products |
| About Us | `about.html` | Brand history, mission, vision, FAQ accordion |
| Products | `products.html` | Fragrance catalogue by scent family, search/filter/sort, lightbox gallery, Add to Cart |
| Enquiry | `enquiry.html` | Validated enquiry form with an instant price and availability response |
| Contact | `contact.html` | Contact details, validated contact form (compiled into an email), interactive map of two stores |

Design palette (used consistently across the proposal and the coded pages):
- Primary: Deep Black `#1A1A1A`
- Accent: Champagne Gold `#C9A961`
- Background: Ivory White `#FAF8F3`
- Supporting: Soft Grey `#8A8A8A`

## Timeline and Milestones
| Milestone | Target Week |
|---|---|
| Proposal submitted and organisation approved | Week 1 |
| Content and image research completed | Week 2 |
| File/folder structure and GitHub repository set up | Week 3 |
| HTML structure for all 5 pages completed | Week 4 |
| Part 1 submission (HTML, ZIP, GitHub link) | Week 5 |

## Part 1 Details
Part 1 covers project planning and the foundational HTML structure:
- Website Project Proposal (see `/proposal` or submitted Word document)
- Content Research and Sourcing package (folders, sourcing tracker, original written content)
- File and folder structure (`css/`, `js/`, `images/` with per-page subfolders)
- HTML structure for all five pages, linked via a shared navigation menu
- All images sourced and integrated, matching the colour scheme defined in the proposal

## Part 2 Details
Part 2 covers CSS styling and responsive design:
- External stylesheet (`css/style.css`) linked to all five HTML pages
- Design-token system using CSS custom properties (`:root` variables) for colours,
  typography, font sizes, spacing, and border-radius, so the whole site can be restyled from one place
- Custom typography pairing via Google Fonts: "Playfair Display" for headings, "Lato" for body text
- Base styles (reset, typography, colour scheme) applied consistently across the site
- Layout structure built with Flexbox (header/nav, hero, product previews, forms) and
  CSS Grid (Products page "More From Our Collection" gallery)
- Visual styling using the brand palette (Deep Black, Champagne Gold, Ivory White, Soft Grey)
- Interactive states added with `:hover`, `:focus-visible`, and `:active` pseudo-classes
  (navigation links, buttons, form fields, product images)
- Responsive design implemented with media queries at 768px and 480px breakpoints
- Responsive images: a `<picture>` element on the homepage hero image, and `srcset`/`sizes`
  on all product and gallery images (extended to the product images after the Part 2 feedback,
  see below)
- Tested using browser developer tools across multiple screen sizes: 375px (mobile),
  400px (mobile), 768px (tablet), 1024px, and 1440px (desktop)
  
## Responsive Design Testing
Screenshots were captured using the browser's developer tools device toolbar at three widths:
Desktop (1440px), Tablet (768px), and Mobile (375px). They were retaken on the live website for
Part 3, so they show the hamburger menu on tablet and mobile, the "Find Your Fragrance" toolbar,
and the new forms.

### Home
| Desktop | Tablet | Mobile |
|---|---|---|
| ![Home Desktop](docs/home-desktop.png) | ![Home Tablet](docs/home-tablet.png) | ![Home Mobile](docs/home-mobile.png) |

### About
| Desktop | Tablet | Mobile |
|---|---|---|
| ![About Desktop](docs/about-desktop.png) | ![About Tablet](docs/about-tablet.png) | ![About Mobile](docs/about-mobile.png) |

### Products
| Desktop | Tablet | Mobile |
|---|---|---|
| ![Products Desktop](docs/products-desktop.png) | ![Products Tablet](docs/products-tablet.png) | ![Products Mobile](docs/products-mobile.png) |

### Enquiry
| Desktop | Tablet | Mobile |
|---|---|---|
| ![Enquiry Desktop](docs/enquiry-desktop.png) | ![Enquiry Tablet](docs/enquiry-tablet.png) | ![Enquiry Mobile](docs/enquiry-mobile.png) |

### Contact
| Desktop | Tablet | Mobile |
|---|---|---|
| ![Contact Desktop](docs/contact-desktop.png) | ![Contact Tablet](docs/contact-tablet.png) | ![Contact Mobile](docs/contact-mobile.png) |

## Part 3 Details
Part 3 covers functionality, forms, SEO, and deployment.

### Part 3 Features in Action
| Hamburger menu (mobile) | Search and filter | Lightbox gallery |
|---|---|---|
| ![Hamburger menu open on mobile](docs/features/menu-mobile.png) | ![Product search for "rose"](docs/features/product-search.png) | ![Lightbox showing an enlarged product image](docs/features/lightbox.png) |

| Shopping cart | FAQ accordion | Interactive store map |
|---|---|---|
| ![Cart side panel with two fragrances](docs/features/cart.png) | ![FAQ with question 05 open](docs/features/faq.png) | ![Leaflet map with a store popup](docs/features/store-map.png) |

| Enquiry response | Contact email preview |
|---|---|
| ![Enquiry form response with price and total](docs/features/enquiry-response.png) | ![Contact form email preview](docs/features/contact-email.png) |

### Corrections from Part 2 Feedback
The lecturer's feedback for Part 2 asked for three changes. Each one has been completed and is
logged in the Changelog below.

| Feedback | What was changed |
|---|---|
| Extend `srcset` and `sizes` to the product and gallery images (only the hero was responsive). | All 8 product and gallery images on `products.html` now use `srcset` and `sizes`. A 400px version (`images/products/small/`) and an 800px version (`images/products/medium/`) of each image were created, so the browser downloads the smallest suitable file (about 55–135 KB instead of 1.5 MB). |
| Remove the hard-coded `width` attributes from `<img>` tags. | Removed every `width="..."` attribute from the `<img>` tags in `index.html`, `about.html`, `contact.html`, and `products.html`. Image sizes are now controlled only by the CSS. |
| Move font-size scaling into the design tokens, and add a proper mobile nav toggle. | Every `font-size` in `style.css` now uses a token (`--font-size-sm` to `--font-size-logo`). The heading tokens are redefined inside the 768px and 480px media queries, so the type scale cascades automatically. A hamburger menu (☰) was added to all five pages for tablet and mobile, controlled by `js/main.js`. |

### JavaScript
- `js/main.js` — shared script linked on all five pages.
- **Mobile navigation toggle:** on screens 768px and below, the menu is hidden behind a
  hamburger button. Clicking it adds or removes the `is-open` class on the `<nav>` and updates
  `aria-expanded`, so screen readers know whether the menu is open.
- **Product image lightbox:** on `products.html`, clicking any product or gallery image opens
  the 800px version in a full-screen overlay with a caption. The overlay is created with
  JavaScript (DOM manipulation: `createElement`, `append`, `classList`). It can be closed with
  the × button, a click outside the image, or the Escape key, and it also works with the keyboard
  (Tab to an image, then Enter).
- **FAQ accordion:** on `about.html`, six frequently asked questions (authenticity, delivery,
  gift wrapping, returns, choosing a scent for the weather and the perfume types, and sensitive
  skin). Clicking a question opens its answer and closes the others, so only one is open at a
  time. The answers slide open with a CSS transition (`grid-template-rows` from `0fr` to `1fr`),
  and the gold "+" icon rotates into an "×". Each question is a `<button>` with `aria-expanded`
  and `aria-controls`, so the accordion works with a keyboard and screen readers.
- **Interactive store map:** on `contact.html`, the static Google Maps embed was replaced with an
  interactive map built with the Leaflet library. It shows both store locations (the Cape Town CBD
  flagship store and the V&A Waterfront boutique opening in 2027) with custom gold markers and
  popups showing the address and opening hours. Each store card below the map has a "Show on map"
  button that flies the map to that store and opens its popup.
- **Dynamic product listings:** on `products.html`, the "More From Our Collection" cards are not
  written in the HTML. They are created by JavaScript from a list of product data (name, scent
  family, type, notes, price, and image), including their responsive `srcset` images. The five
  scent families stay in the HTML so search engines can read them.
- **Search, filter, and sort ("Find Your Fragrance"):** visitors can search by name or note
  (e.g. "vanilla" or "rose"), filter by scent family with buttons (All, Woody, Floral, Oriental,
  Fresh, Unisex), and sort by price (low to high or high to low). A live counter shows how many
  fragrances match, and a "no results" message offers to clear the search and filters.
- **Add to Cart:** every fragrance has an "Add to Cart" button. A floating cart button shows the
  number of items and opens a side panel where quantities can be changed or removed, with a
  running total and a link to the Enquiry page. The cart is saved in `localStorage`, so it is
  kept when the page is reloaded.

### Forms
- **Enquiry form (`enquiry.html`):** validated with JavaScript (name, email, South African phone
  number, enquiry type, fragrance, quantity 1–50, a "needed by" date that cannot be in the past,
  and a 20–500 character message with a live counter). Error messages appear under each field and
  update while the visitor types. The form is sent with AJAX (`fetch`) to the URL in its `action`
  attribute, without reloading the page, and the visitor then sees a response with the price, stock
  availability, a 10% corporate discount on gift orders of 5 or more, free gift wrapping, the
  delivery cost (free from R1000), an estimated total, and a reference number. Visitors coming from
  the cart get the form filled in with their cart items.
- **Contact form (`contact.html`):** validated in the same way (name, email, phone, message type,
  subject, and a 20–1000 character message). Once valid, the details are compiled into an email to
  the recipient set in the code (`filloi@nicheperfumes.co.za`) with a clear subject line such as
  "[Product feedback] ...". The visitor sees a preview and their email app opens with the message
  ready to send (`mailto:` link built with `encodeURIComponent`).

### Search Engine Optimisation (SEO)

**Keyword research.** The keywords were chosen from what a Cape Town customer would type into
Google when looking for authentic perfume, and from the market research in the References
(demand for niche, authentic, and premium fragrances in South Africa):

| Page | Main keywords |
|---|---|
| Home | luxury perfume Cape Town, authentic perfume South Africa, niche fragrances |
| About | perfume boutique Cape Town, how to choose a perfume, perfume FAQ |
| Products | woody / floral / oriental / fresh citrus / unisex perfume, buy perfume Cape Town |
| Enquiry | perfume price enquiry, corporate perfume gifts, perfume delivery Cape Town |
| Contact | perfume shop Cape Town CBD, V&A Waterfront perfume, perfume shop near me |

**On-page SEO**
- **Title tags and meta descriptions:** every page has its own `<title>` (under 60 characters)
  and `<meta name="description">` (under 160 characters) built around its keywords, plus
  `keywords`, `author`, `robots`, and a `canonical` link.
- **Open Graph tags** (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`) give a
  clean preview when a page is shared on WhatsApp, Facebook, or LinkedIn.
- **Header tags:** one `<h1>` (the brand) on every page, an `<h2>` for each page's main title, and
  `<h3>`/`<h4>` for sections, products, and questions.
- **Image optimisation:** descriptive file names (e.g. `woody-perfume.jpg`,
  `fresh-citrus-perfume.jpg`, `featured-woody-perfume.jpg` instead of `product-1.jpg`), descriptive
  `alt` text, 400px and 800px versions with `srcset`, and `loading="lazy"` on images lower down the
  page.
- **URL structure:** short, clean, lowercase page names (`about.html`, `products.html`,
  `enquiry.html`, `contact.html`).
- **Internal linking:** shared navigation on every page, plus links inside the content (the
  hero "Shop Now" button, the FAQ answers linking to Products and Enquiry, and the cart linking
  to Enquiry).
- **Mobile-friendliness:** responsive layout, hamburger menu, and touch-friendly buttons, tested
  at 375px, 768px, and 1440px.

**Off-page SEO (plan for the business)**
- **Backlinks:** list the store on South African directories and local guides (e.g. Cape Town
  shopping and V&A Waterfront store directories), and partner with local beauty and lifestyle
  bloggers for fragrance reviews that link back to the website.
- **Social media:** promote new arrivals and the scent guide on Instagram, Facebook, and TikTok,
  always linking to the Products page (the Contact page already has Instagram and Facebook
  links, ready to point to the real profiles once they are created).
- **Local SEO:** the Contact page contains schema.org `Store` data (JSON-LD) with the address,
  phone number, coordinates, and opening hours, so Google can show the store in local results.
  The next step is a Google Business Profile for each store with the same details.

**Additional requests**
- **`robots.txt`:** allows all crawlers, blocks the `docs/` folder (project screenshots), and
  points to the sitemap. Note: search engines read `robots.txt` from the root of the domain, so
  on GitHub Pages (a sub-folder site) it takes full effect once the site moves to its own domain,
  e.g. `nicheperfumes.co.za`.
- **`sitemap.xml`:** lists all five pages with their last-modified date, change frequency, and
  priority.
- **Page speed:** product images reduced from about 1.5 MB to under 135 KB each, responsive
  `srcset` images, lazy loading, and `preconnect` links so Google Fonts load sooner.

### Security
- Visitor input is never inserted as HTML: both form responses are built with `createElement` and
  `textContent`, so code typed into a form cannot run on the page (protection against XSS).
- The Leaflet library is loaded with Subresource Integrity (`integrity` and `crossorigin`), so the
  browser refuses the file if it has been changed.
- `localStorage` access is wrapped in `try/catch`, so the cart still works if storage is blocked.
- The live site is served over HTTPS by GitHub Pages.

### Deployment
The website is deployed with **GitHub Pages** from the `main` branch (root folder) and is live at
https://marie-filloi.github.io/niche-perfume-website/. Every push to `main` updates the live site
automatically. After deployment, all five pages were tested online on a laptop and a phone
(navigation, images, lightbox, cart, FAQ, map, and both forms).

## Sitemap
![Niche Perfumes Sitemap](docs/sitemap.png)

Shared across all five pages:
- **Header/Navigation:** Home | About | Products | Enquiry | Contact
- **Footer:** Contact info, social links, copyright

## Wireframe
![Niche Perfumes Homepage Wireframe](docs/wireframe.png)


## Changelog

| Date | Part | Category | Description |
|---|---|---|---|
| 13 August 2026 | Part 1 | Planning | Website Project Proposal drafted for Niche Perfumes, including organisation overview, goals, KPIs, colour scheme, wireframes, timeline, and budget. |
| 13 August 2026 | Part 1 | Content Research | Content Research and Sourcing package created, covering original page copy and an image sourcing tracker. |
| 13 August 2026 | Part 1 | File Structure | Project folder structure created (`css/`, `js/`, `images/` with `home`, `about`, `products`, `enquiry`, `contact` subfolders). |
| 13 August 2026 | Part 1 | HTML | Five HTML pages created and linked via shared navigation (`index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`). |
| 13 August 2026 | Part 1 | Images | All images sourced from Pexels and integrated into the HTML; file format and folder-path issues corrected; images without a valid free licence were removed and replaced. |
| 13 August 2026 | Part 1 | Content Fixes | Contact details updated; colour scheme documented with a swatch table matching the coded palette. |
| 25 August 2026 | Part 2 | CSS Styling | Created external stylesheet (`css/style.css`) and linked it to all five pages; applied base styles, typography, and the brand colour palette across header, hero, featured products, about, products, enquiry, and contact sections. |
| 25 August 2026 | Part 2 | Layout | Implemented Flexbox layouts for navigation, hero section, product grids, and the enquiry form. |
| 25 August 2026 | Part 2 | Interactivity | Added hover and focus states on navigation links, buttons, and form fields for better usability. |
| 25 August 2026 | Part 2 | Responsive Design | Added media queries at 768px and 480px breakpoints to adapt the navigation, hero, and image layouts for tablet and mobile screens. |
| 25 August 2026 | Part 2 | Responsive Images | Added `srcset`/`sizes` to the homepage hero image to serve a smaller image on mobile devices. |
| 17 September 2026 | Part 2 | Design Tokens | Refactored `style.css` to use CSS custom properties (`:root` variables) for the colour palette, typography, and spacing, instead of repeating hard-coded values throughout the file. |
| 17 September 2026 | Part 2 | Typography | Added Google Fonts ("Playfair Display" for headings, "Lato" for body text) in place of the default system font. |
| 17 September 2026 | Part 2 | Layout | Converted the Products page gallery section to CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(...))`) for automatic responsive columns. |
| 17 September 2026 | Part 2 | Interactivity | Extended interactive states to include `:focus-visible` and `:active`, in addition to `:hover`, on navigation, buttons, and form fields. |
| 17 September 2026 | Part 2 | Testing | Captured responsive screenshots (Desktop 1440px, Tablet 768px, Mobile 375px) for all five pages using Chrome DevTools' device toolbar. |
| 25 October 2026 | Part 3 (Part 2 feedback) | HTML / Images | Removed the hard-coded `width` attributes from all `<img>` tags in `index.html`, `about.html`, `contact.html`, and `products.html`, so they no longer conflict with the CSS sizing rules. |
| 25 October 2026 | Part 3 (Part 2 feedback) | Responsive Images | Added `srcset` and `sizes` to all 8 product and gallery images on `products.html`. Created 400px (`images/products/small/`) and 800px (`images/products/medium/`) versions of each image with I Love IMG, reducing each download from about 1.5 MB to under 135 KB. |
| 25 October 2026 | Part 3 (Part 2 feedback) | Typography / Design Tokens | Added a type scale to `:root` (`--font-size-sm`, `--font-size-base`, `--font-size-lg`, `--font-size-h3`, `--font-size-h2`, `--font-size-hero`, `--font-size-logo`) and replaced every hard-coded `font-size` in `style.css` with these tokens. The heading tokens are redefined in the 768px and 480px media queries, and the old per-selector font-size overrides were removed. |
| 25 October 2026 | Part 3 (Part 2 feedback) | Navigation / JavaScript | Added an accessible hamburger menu (☰) to all five pages for screens 768px and below. Created `js/main.js`, which toggles the `is-open` class on the `<nav>` and updates `aria-expanded`. Styled the button with the brand colours and `:hover`, `:focus-visible`, and `:active` states. |
| 25 October 2026 | Part 3 | Layout | Fixed the "More From Our Collection" grid on `products.html`: `minmax(200px, 1fr)` created an empty fourth column and pushed the 3 items to the left, so it was changed to `minmax(250px, 1fr)` to centre them. |
| 25 October 2026 | Part 3 | HTML Fixes | Restored the missing closing `</main>`, footer, `</body>`, and `</html>` tags at the end of `products.html`, and removed a stray `</section>` tag in `index.html`. |
| 25 October 2026 | Part 3 | Documentation | Updated the README: project title and overview now cover all three parts, Part 2 Details corrected (responsive images and font-size tokens), and a new Part 3 Details section added. |
| 25 October 2026 | Part 3 | Interactive Elements / JavaScript | Added a lightbox gallery to `products.html`: clicking any of the 8 product images opens its 800px version in a full-screen overlay with a caption. The overlay is built with DOM manipulation in `js/main.js`, closes with the × button, an outside click, or the Escape key, and is keyboard accessible (`tabindex`, `aria-modal`, focus returned to the image on close). Styled in `style.css` with a fade-in and zoom transition. |
| 26 October 2026 | Part 3 | Interactive Elements / JavaScript | Added a FAQ accordion to `about.html` with six questions (authenticity, delivery in Cape Town, gift wrapping, 72-hour returns policy with till slip and no refunds, choosing a scent for the weather including perfume concentration types, and tips for skin sensitive to alcohol). Styled in an editorial luxury look (numbered questions, thin gold lines, rotating "+" icon, smooth slide animation) and made accessible with `<button>`, `aria-expanded`, `aria-controls`, and `role="region"`. The answers include internal links to `products.html` and `enquiry.html` for SEO. |
| 26 October 2026 | Part 3 | Interactive Map / JavaScript | Replaced the Google Maps `<iframe>` on `contact.html` with an interactive Leaflet map showing two locations: the Cape Town CBD flagship store (Long Street) and the planned V&A Waterfront boutique (Victoria Wharf). Added custom gold markers (`L.divIcon`), popups with the address and opening hours, two store cards with "Show on map" buttons (`flyTo` animation), and a light grey Esri basemap to match the brand palette. Leaflet is loaded from a CDN with Subresource Integrity (`integrity` and `crossorigin`) for security. The first basemap tried (CARTO) required an API key, so it was replaced with the free Esri World Light Gray Canvas. |
| 28 October 2026 | Part 3 | Dynamic Content / JavaScript | Added a "Find Your Fragrance" toolbar to `products.html` with a live search (by name or note), scent-family filter buttons (`aria-pressed`), and price sorting, plus a results counter (`aria-live`) and a "no results" message. The "More From Our Collection" cards are now generated by JavaScript from a product data array, and each collection product was given a name, type, and notes. Wrapped the scent-family sections in `#product-list` with `data-family` and `data-price` attributes so they can be filtered and re-ordered. The collection grid columns were changed to `minmax(240px, 270px)` so three cards fit per row and stay centred when some are filtered out. |
| 28 October 2026 | Part 3 | Add to Cart / JavaScript | Added "Add to Cart" buttons to all 8 fragrances and a shopping cart built with DOM manipulation: a floating cart button with an item count, and a slide-in side panel with quantity controls, remove, clear cart, a running total, and a link to `enquiry.html`. The cart is saved in `localStorage` (inside `try/catch`) so it survives a page reload. Re-ordered `js/main.js` so the collection is created before the lightbox code, which keeps the lightbox working on the new images. |
| 28 October 2026 | Part 3 | Forms / Validation | Rebuilt the enquiry form on `enquiry.html` with HTML5 validation attributes (`required`, `minlength`, `maxlength`, `min`, `max`, `type="email"`, `type="tel"`, `type="date"`) and custom JavaScript validation with an error message under each field (updated while typing), a live character counter, and fields that show or hide depending on the enquiry type. Added AJAX submission with `fetch` (the form's `action` points to a test API) and a response showing price, availability, discounts, delivery, and an estimated total. The cart's "Enquire About These Items" button now pre-fills the form, and the quantity field is hidden when "My cart" is chosen. |
| 28 October 2026 | Part 3 | Forms / Email | Added a contact form to `contact.html` (name, email, phone, message type, subject, message) with the same validation. Valid messages are compiled into an email to `filloi@nicheperfumes.co.za` and opened in the visitor's email app through a `mailto:` link, with an on-page preview. The form's `action="mailto:..."` remains as a fallback if JavaScript is turned off. |
| 28 October 2026 | Part 3 | Security | Form responses and previews are built with `createElement` and `textContent` instead of `innerHTML` with visitor input, to prevent cross-site scripting (XSS). |
| 28 October 2026 | Part 3 | Documentation | Updated the README: Key Features table, Part 3 Details (JavaScript, Forms, and Security sections), Changelog, and References. |
| 28 October 2026 | Part 3 | Deployment | Deployed the website with GitHub Pages (Settings → Pages → Deploy from branch `main`, root folder). Tested all five pages online on a laptop and a phone. Live URL: https://marie-filloi.github.io/niche-perfume-website/ |
| 28 October 2026 | Part 3 | SEO / Meta Tags | Added a unique `<title>`, `meta description`, `keywords`, `author`, `robots`, `canonical` link, and Open Graph tags to the `<head>` of all five pages, based on keyword research for each page. Added `preconnect` links for Google Fonts. |
| 28 October 2026 | Part 3 | SEO / Local SEO | Added schema.org `Store` structured data (JSON-LD) to `contact.html` with the business name, address, phone, email, coordinates, price range, and opening hours. |
| 28 October 2026 | Part 3 | SEO / Files | Created `robots.txt` (allows crawlers, blocks `docs/`, links to the sitemap) and `sitemap.xml` (all five pages with `lastmod`, `changefreq`, and `priority`) in the root folder. |
| 28 October 2026 | Part 3 | SEO / Images | Renamed the product images with descriptive file names in `images/products/small/` and `images/products/medium/` (e.g. `product-1.jpg` → `woody-perfume.jpg`) and the homepage images (`featured-woody-perfume.jpg`, `featured-fresh-perfume.jpg`), updated `products.html`, `index.html`, and `js/main.js`, improved the homepage `alt` text, and added `loading="lazy"` to images lower down the page. |
| 28 October 2026 | Part 3 | Images | Replaced the duplicate Fresh / Citrus image (it was the same photo as Woody) with a new Pexels photo of a perfume bottle with a lemon, resized to 400px and 800px. |
| 28 October 2026 | Part 3 | References | Corrected the product image references: added the missing references for the Versace and Chanel photos and the new citrus photo, and removed the reference for a photo no longer used on the site. Added an SEO section (keyword research, on-page, off-page, and local SEO) and a Deployment section to the README. |
| 28 October 2026 | Part 3 | Bug Fix | Fixed the lightbox showing a broken image in Microsoft Edge after `loading="lazy"` was added: Edge replaces lazy images with placeholders, so the lightbox now uses the image the browser is actually showing (`currentSrc`) and swaps `/small/` for `/medium/` to load the 800px version. |
| 29 October 2026 | Part 3 | Testing | Retook all 15 responsive screenshots (Home, About, Products, Enquiry, Contact at 1440px, 768px, and 375px) on the live website, replacing the Part 2 versions in `docs/`. |
| 29 October 2026 | Part 3 | Documentation | Added a "Part 3 Features in Action" gallery to the README with eight screenshots in `docs/features/` (hamburger menu, product search, lightbox, cart, FAQ, store map, enquiry response, and contact email preview), and marked Part 3 as complete. |

## References
Bonafide Research (2025) *South Africa Perfume Market Growth & Demand*. Available at:
https://www.bonafideresearch.com/product/6212192417/south-africa-perfume-market (Accessed: 13
August 2026).

Futurism (2026) *South Africa Perfume Market: Fragrance Trends, Premiumization & Growth
Outlook*. Available at:
https://vocal.media/futurism/south-africa-perfume-market-fragrance-trends-premiumization-and-growth-outlook
(Accessed: 13 August 2026).

IMARC Group (2025) *South Africa Perfume Market Size, Share & Forecast 2033*. Available at:
https://www.imarcgroup.com/south-africa-perfume-market (Accessed: 13 August 2026).

### Image References (Harvard Style)
All images used in this project were sourced from Pexels under their free-to-use licence
(https://www.pexels.com/license/).

**Home**

Debonair Afrik Studios (2024) *Stylish man holding a luxurious perfume bottle in a dimly lit
setting*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/man-showing-perfumes-14687012/ (Accessed: 13 August 2026).

Abubakar, A. (2025) *Elegant Givenchy perfume bottle on a book, perfect for a luxury lifestyle
theme*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/luxury-perfume-bottle-on-an-open-book-30463181/ (Accessed: 13
August 2026).

Mclean, E. (2025) *A stylish black perfume bottle on a textured dark background, showcasing
luxury design*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/cosmetic-product-on-black-background-7487827/ (Accessed: 13
August 2026).

**About**

Travelling Tourist (2026) *Bright cosmetics store interior showcasing luxury brands in London*.
[Photograph]. Pexels. Available at:
https://www.pexels.com/photo/modern-perfume-and-cosmetics-store-interior-in-london-36437176/
(Accessed: 13 August 2026).

**Products**

Daza, A. (2024) *Luxury perfume bottle and gold jewelry on soft white fabric create an elegant
scene*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/luxury-perfume-in-a-glass-bottle-17567999/ (Accessed: 13 August
2026).

Absin (2024) *Elegant still life of a J'adore perfume bottle with packaging in soft lighting*.
[Photograph]. Pexels. Available at:
https://www.pexels.com/photo/bottle-of-perfume-17945897/ (Accessed: 13 August 2026).

Boltneva, V. (2025) *A close-up view of a golden perfume bottle exuding elegance and luxury*.
[Photograph]. Pexels. Available at:
https://www.pexels.com/photo/a-dolce-and-gabbana-perfume-bottle-13800860/ (Accessed: 13 August
2026).

Ahmed, R. (2024) *Dolce & Gabbana perfume bottle placed elegantly with green leaves on a dark
background*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/perfume-bottle-beside-green-leaves-13827110/ (Accessed: 13 August
2026).

Lalada (2025) *A close-up of luxury perfume and lipstick showcasing elegance and style*.
[Photograph]. Pexels. Available at:
https://www.pexels.com/photo/glass-perfume-bottle-beside-a-lipstick-8981521/ (Accessed: 13
August 2026).

Arjunn. la (2024) *Versace Eros perfume bottle and box displayed on stylish light fabric,
capturing luxury*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/versace-eros-perfume-on-elegant-fabric-28460123/ (Accessed: 13
August 2026).

Chouette, L. (2024) *Chanel No 5 perfume bottle elegantly surrounded by white roses, symbolizing
luxury*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/a-bottle-of-chanel-no-5-perfume-lying-on-a-white-surface-with-flowers-22589355/
(Accessed: 13 August 2026).

Chouette, L. (2024) *Elegant Chanel No 5 perfume bottle with a lemon, perfect for luxury and
freshness themes*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/perfume-bottle-and-half-a-lemon-on-a-white-background-21574969/
(Accessed: 28 October 2026).

**Enquiry**

mrish_marina_alekseevna (2024) *Bright and dynamic golden swirl abstract painting, showcasing
motion and energy*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/a-yellow-and-white-swirly-abstract-painting-6606011/ (Accessed: 13
August 2026).

**Contact**

Al Assaad, M. (2025) *Indoor scene at New York mall with woman browsing perfumes at a lit kiosk
in warm ambient lighting*. [Photograph]. Pexels. Available at:
https://www.pexels.com/photo/woman-shopping-at-perfume-kiosk-in-mall-34990739/ (Accessed: 13
August 2026).

### Tools and Resources Used (Part 2)

Google Fonts (2026) *Playfair Display*. Available at: https://fonts.google.com/specimen/Playfair+Display (Accessed: 17 September 2026).

Google Fonts (2026) *Lato*. Available at: https://fonts.google.com/specimen/Lato (Accessed: 17 September 2026).

I Love IMG (2026) *Resize Image*. Available at: https://www.iloveimg.com/resize-image (Accessed: 13 August 2026).

### Tools and Resources Used (Part 3)

I Love IMG (2026) *Resize Image*. Available at: https://www.iloveimg.com/resize-image (Accessed: 25 October 2026).

MDN Web Docs (2026) *&lt;img&gt;: The Image Embed element* (`srcset` and `sizes` attributes). Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img (Accessed: 25 October 2026).

MDN Web Docs (2026) *Element: classList property*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList (Accessed: 25 October 2026).

MDN Web Docs (2026) *aria-expanded*. Available at: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded (Accessed: 25 October 2026).

Leaflet (2023) *Leaflet 1.9.4: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com/ (Accessed: 26 October 2026).

Esri (2026) *World Light Gray Canvas Base* [Map tiles]. Available at: https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer (Accessed: 26 October 2026).

MDN Web Docs (2026) *Window: localStorage property*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage (Accessed: 28 October 2026).

MDN Web Docs (2026) *Array.prototype.sort()*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort (Accessed: 28 October 2026).

MDN Web Docs (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (Accessed: 28 October 2026).

MDN Web Docs (2026) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 28 October 2026).

JSONPlaceholder (2026) *Free fake and reliable API for testing and prototyping*. Available at: https://jsonplaceholder.typicode.com/ (Accessed: 28 October 2026).

Google Search Central (2026) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 28 October 2026).

Google Search Central (2026) *Build and submit a sitemap*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (Accessed: 28 October 2026).

Google Search Central (2026) *Local business (LocalBusiness) structured data*. Available at: https://developers.google.com/search/docs/appearance/structured-data/local-business (Accessed: 28 October 2026).

The Open Graph protocol (2026) *The Open Graph protocol*. Available at: https://ogp.me/ (Accessed: 28 October 2026).

GitHub Docs (2026) *Creating a GitHub Pages site*. Available at: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site (Accessed: 28 October 2026).
