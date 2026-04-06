# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional corporate website for **Baneste Codes**, a Colombian software development agency specializing in Flutter mobile apps, web development, n8n automation, and custom software. Static HTML/CSS/JS — no build step, no framework, no dependencies.

## Running Locally

```bash
# Python (recommended)
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

## File Structure

```
index.html          # Main single-page site (all sections)
privacy.html        # Privacy policy page
styles/
  main.css          # CSS variables, base styles, typography
  components.css    # Buttons, forms, cards, navbar
  animations.css    # Keyframes and transition definitions
  sections.css      # Section-specific layout and content styles
  mobile.css        # Responsive breakpoints
scripts/
  main.js           # Core: loader animation, smooth scroll, lazy loading
  navigation.js     # Navbar: sticky behavior, active link highlighting
  animations.js     # Scroll reveal, parallax, hover tilt, counters
  contact.js        # Contact form: email client + WhatsApp redirect
  whatsapp.js       # WhatsApp chat widget (bottom-right)
assets/             # Logo files and favicon
```

## Architecture

Single-page design with sections loaded in `index.html`: Loader → Hero (video bg) → About → Services → Projects → Testimonials → Contact → Footer. Floating UI: WhatsApp widget + scroll-to-top button.

**CSS design system** lives in `styles/main.css` CSS custom properties — colors, spacing, shadows, z-index, and animation timing all defined there. Always use variables, never hardcode values.

**JavaScript** is modular per concern. Each script file handles one feature area and runs independently. There is no module bundler — scripts are loaded via `<script>` tags in order.

**Key patterns:**
- Scroll animations use `IntersectionObserver` (in `animations.js`)
- Lazy loading uses `data-src` attributes, also via `IntersectionObserver` (in `main.js`)
- Contact form does not POST to a server — it opens `mailto:` and redirects to WhatsApp
- No external JS libraries; all vanilla JS

## Brand & Styling

- Primary color: `#1a8b9d` (turquoise)
- Dark background: `#0a0a0a` / `#111`
- Fonts: Inter (body), Poppins (headings) — loaded via Google Fonts
- The site is Spanish-language (audience: Colombia/Latin America)

## Deployment

Static site — deploy directly to Netlify, Vercel, or GitHub Pages. No build command needed. Production domain: `https://banestecodes.com/`
