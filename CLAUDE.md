# CLAUDE.md — AI Assistant Guide for PaulAGSchoepfer/Website

This document describes the codebase structure, conventions, and workflows for AI assistants working on this repository.

---

## Project Overview

A static single-page portfolio website for **Paul Schöpfer MSc**. There is no build step, no package manager, no framework, and no server-side code. All three source files are served directly by any static file host.

---

## Repository Structure

```
Website/
├── index.html          # Entire page markup — the only HTML file
├── css/
│   └── style.css       # All styles (~690 lines)
├── js/
│   └── main.js         # All client-side behaviour (~83 lines)
└── assets/
    ├── README.md       # Instructions for placing assets
    ├── profile.jpg     # Profile photo (400×400 px recommended)
    └── cv.pdf          # CV / résumé PDF
```

No other source files exist. Do not create additional HTML pages, CSS files, or JS modules unless explicitly requested.

---

## Technology Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Markup     | HTML5, semantic elements                        |
| Styles     | CSS3 — custom properties, Grid, Flexbox         |
| Behaviour  | Vanilla JavaScript (ES6+), IIFE, strict mode    |
| Fonts      | Google Fonts — Inter (weights 300–700)          |
| Build tool | None                                            |
| Package mgr| None                                            |
| Tests      | None                                            |
| CI/CD      | None                                            |

---

## Page Sections

`index.html` contains one `<header>` and five `<section>` elements, identified by `id`:

| Section id | Nav label | Section number |
|------------|-----------|----------------|
| `home`     | (hero)    | —              |
| `about`    | About     | 01             |
| `cv`       | CV        | 02             |
| `work`     | Work      | 03             |
| `contact`  | Contact   | 04             |

New sections must follow the same two-column grid pattern (`section-grid`) and receive the next sequential number in `section-label`.

---

## CSS Architecture

### Design Tokens (CSS Custom Properties)

All visual values live in `:root` inside `css/style.css`. Always use these tokens instead of hard-coded values:

```css
/* Colours */
--color-bg:           #ffffff   /* page background        */
--color-bg-alt:       #f8f8f6   /* alternate section bg   */
--color-text:         #1a1a1a   /* primary text           */
--color-text-muted:   #6b7280   /* secondary / meta text  */
--color-accent:       #2563eb   /* interactive blue       */
--color-accent-hover: #1d4ed8   /* hover state of accent  */
--color-border:       #e5e7eb   /* borders / dividers     */
--color-tag-bg:       #eff6ff   /* pill tag background    */
--color-tag-text:     #1d4ed8   /* pill tag text          */

/* Typography */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif

/* Spacing / radius */
--radius-sm / --radius-md / --radius-lg / --radius-full

/* Shadows */
--shadow-sm / --shadow-md / --shadow-lg

/* Animation */
--transition: 0.2s ease

/* Layout */
--nav-height: 64px
```

### Breakpoints

```css
@media (max-width: 768px)  /* tablet — hamburger nav, single-column sections */
@media (max-width: 480px)  /* mobile — smaller hero photo, smaller name font  */
```

### Naming Conventions

CSS classes use lowercase kebab-case (`section-grid`, `work-card-title`). Components are prefixed by their block name:

- `.nav-*` — navigation
- `.hero-*` — hero section
- `.btn`, `.btn-primary`, `.btn-secondary` — buttons
- `.section`, `.section-alt`, `.section-grid`, `.section-label`, `.section-title` — shared section layout
- `.cv-*` — CV section
- `.work-*` — Work/Projects section
- `.contact-*` — Contact section

### Fade-in Animation

Elements that should animate in on scroll are **not** given `fade-in` in HTML. Instead, `main.js` adds `.fade-in` programmatically to a selector list at the bottom of the script. Add a new selector to that list if a new element needs the animation; do not add `fade-in` directly in HTML.

---

## JavaScript Conventions (`js/main.js`)

- Entire file is wrapped in an **IIFE** with `'use strict'` — keep it that way.
- No external libraries. Use standard DOM APIs only.
- **IntersectionObserver** is used for two purposes:
  1. Active nav-link highlighting (`observer`, `rootMargin: '-40% 0px -55% 0px'`)
  2. Fade-in scroll animations (`fadeObserver`, `threshold: 0.08`)
- Scroll event listener uses `{ passive: true }` — maintain this for performance.
- The footer year is set dynamically via `new Date().getFullYear()`.

---

## Content Customisation Guide

All placeholder content is marked with `<!-- TO DO: … -->` comments in `index.html`. Key locations:

| What to change           | Location in `index.html`      |
|--------------------------|-------------------------------|
| Profile photo            | `<img src="assets/profile.jpg" …>` (line ~41) |
| Tagline                  | `.hero-tagline` paragraph (line ~58) |
| About biography          | `.section-content` inside `#about` |
| Education entries        | `<ul class="cv-list">` inside `.cv-block` (Education) |
| Experience entries       | `<ul class="cv-list">` inside `.cv-block` (Experience) |
| Skill tags               | `<span class="skill-tag">` elements |
| Work / project cards     | `<article class="work-card">` elements |
| Email address            | `<a href="mailto:…">` in `#contact` |
| LinkedIn URL             | `<a href="https://linkedin.com/in/…">` |
| GitHub URL               | `<a href="https://github.com/…">` |

### Adding a Work Card

Copy this template into `.work-grid` in `index.html`:

```html
<article class="work-card">
  <div class="work-card-header">
    <span class="work-tag">Project</span>   <!-- or: Publication, Talk, etc. -->
    <span class="work-year">2024</span>
  </div>
  <h3 class="work-card-title">Title Here</h3>
  <p class="work-card-desc">Description of the work.</p>
  <div class="work-card-links">
    <a href="https://…" class="work-link">Read more &rarr;</a>
  </div>
</article>
```

### Adding a CV Entry

```html
<li class="cv-item">
  <div class="cv-item-meta">
    <strong>Degree or Role Title</strong>
    <span class="cv-year">2021 – 2023</span>
  </div>
  <div class="cv-item-detail">Institution or Organisation</div>
  <p class="cv-item-desc">Optional description.</p>
</li>
```

---

## Assets

| File                 | Purpose                   | Notes                                  |
|----------------------|---------------------------|----------------------------------------|
| `assets/profile.jpg` | Hero profile photo        | 400×400 px recommended, square crop    |
| `assets/cv.pdf`      | Downloadable CV           | Linked by the "Download Full CV" button |

If `assets/profile.jpg` is missing or fails to load, the hero falls back to a blue gradient circle showing the initials **PS** (`.photo-placeholder`). This is intentional — do not remove the `onerror` handler on the `<img>`.

---

## Development Workflow

There is no build or install step. To preview the site locally:

```bash
# Any local HTTP server works, for example:
python3 -m http.server 8000
# Then open http://localhost:8000
```

Or open `index.html` directly in a browser (smooth scroll and font loading work best over HTTP).

---

## Deployment

The site is a static bundle — copy all files (including `css/`, `js/`, `assets/`) to any web server root or static hosting platform (GitHub Pages, Netlify, Vercel, etc.). No environment variables or server configuration are required.

---

## Git Conventions

- The `master` branch is the production branch.
- AI-created branches follow the pattern `claude/<task-id>`.
- Commit messages are short and imperative (e.g. "Add project card for X", "Update contact email").
- Do not commit binary assets (images, PDFs) unless the user explicitly asks.

---

## What NOT to Do

- Do not introduce a build tool, package manager, or bundler unless explicitly requested.
- Do not split styles across multiple CSS files.
- Do not add a JavaScript framework or library.
- Do not hard-code colour values — always use CSS custom properties.
- Do not add `fade-in` directly in HTML; keep animation logic in `main.js`.
- Do not create additional HTML pages; this is a single-page site.
- Do not add backend code, server configuration, or environment files.
