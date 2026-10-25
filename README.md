# Niche Perfumes — Website Project

## Project Title
Niche Perfumes Website — WEDE5020 Portfolio of Evidence (Parts 1 to 3)

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
  functionality, form validation, SEO, and deployment (in progress).

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
| About Us | `about.html` | Brand history, mission, vision |
| Products | `products.html` | Fragrance catalogue organised by scent family |
| Enquiry | `enquiry.html` | Contact form for product/stockist enquiries |
| Contact | `contact.html` | Contact details, embedded map, store locations |

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
Screenshots were captured using Chrome DevTools' device toolbar at three widths:
Desktop (1440px), Tablet (768px), and Mobile (375px).

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
Part 3 covers functionality, forms, SEO, and deployment. Completed so far:

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

Maram (2024) *Luxurious Elie Saab perfume bottle with a botanical accent on textured fabric*.
[Photograph]. Pexels. Available at:
https://www.pexels.com/photo/perfume-in-glass-bottle-26838653/ (Accessed: 13 August 2026).

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
