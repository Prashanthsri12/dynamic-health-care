# Dynamic Health Care — Website

Marketing website for **Dynamic Health Care**, a multi-specialty clinic in
Mogappair, Chennai, operating under the **Creative Dynamic Health Care** group.

Static HTML + CSS + vanilla JavaScript. No build step. No frameworks.

## Structure

```
.
├── index.html                  homepage
├── about.html                  about the clinic, doctors, group
├── general-medicine.html       general & emergency medicine
├── gynaecology.html            women's health, obstetrics
├── neurology.html              neurology + diagnostics
├── home-care.html              equipment, investigations, pharmacy
├── blog.html                   blog listing
├── blog-sleep.html             blog: sleep medicine
├── blog-general-medicine.html  blog: hypertension
├── blog-gynaecology.html       blog: PCOS
├── blog-neurology.html         blog: stroke (FAST)
├── contact.html                contact form + map
└── assets/
    ├── css/style.css           global stylesheet + design tokens
    ├── js/main.js              all behaviors (slider, forms, etc.)
    └── images/                 photos + logos (placeholders included)
```

## Running locally

For a quick look, just open `index.html` in a browser.

For a fully accurate preview (some features benefit from a real HTTP server):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to Netlify

This repo is configured for **zero-config Netlify deployment**.

1. Go to https://app.netlify.com/start
2. Choose "Import from Git" → GitHub → select this repo.
3. Leave build command empty, publish directory set to `.` (auto-detected).
4. Click **Deploy**. Done.

Subsequent pushes to `main` will redeploy automatically.

## Things you need to replace before going live

These are all marked with `<!-- REPLACE: ... -->` comments in the HTML or
called out in `assets/images/README.md`:

1. **Formspree endpoints** — search the codebase for `YOUR_FORMSPREE_ENDPOINT`
   and replace with the real form ID from https://formspree.io after signing up.
   Affects the homepage callback form and the contact-page form.
2. **Email address** — `info@dynamichealthcare.in` is a placeholder. Update if
   you use a different mailbox.
3. **Photos** — 16 placeholder JPGs in `assets/images/` + 10 in
   `assets/images/carousel/`. See the README in each folder for guidance.

## Customising

- Colors, type, spacing — all design tokens live in `assets/css/style.css`
  under `:root`. Change one variable, propagates everywhere.
- Carousel photos — drop new JPGs into `assets/images/carousel/`, keeping
  the filenames `carousel-1.jpg` through `carousel-10.jpg`.
- Testimonials — open `index.html`, search "TESTIMONIAL", edit the
  `<article class="testimonial">` blocks.

## License

Proprietary — Dynamic Health Care / Creative Dynamic Health Care.
