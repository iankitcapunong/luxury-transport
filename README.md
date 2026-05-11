# Luxury Transport Ltd — Website

Single-page React + Tailwind site for a UK premium chauffeur / passenger transport company. Cream + gold + black palette, serif headlines, scroll-reveal animations, Mercedes V-Class focus.

## Run

```bash
cd luxury-transport
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

- `index.html` — loads Playfair Display + Inter from Google Fonts
- `src/main.jsx` — React entry
- `src/App.jsx` — all sections (Nav, Hero, How it works, Social proof, Services / Features, Testimonials, CTA, Footer)
- `src/index.css` — Tailwind layers + `.reveal` scroll animation + button styles
- `tailwind.config.js` — custom cream / gold / ink palette + serif fonts

Everything is one page, no routing, fully responsive.
