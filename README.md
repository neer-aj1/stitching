# Stitch & Story — Handmade Embroidery & Threadwork

A premium, minimalist landing site for a handmade threadwork & embroidery
studio. Built with **React 19 + TypeScript + Vite + Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run lint      # oxlint
npm run preview   # preview the production build
```

## Editing your content

Almost everything you see — images, projects, categories, testimonials, the
craft steps, your email address and Instagram link — lives in
`src/data/site.ts`. Swap the placeholder image URLs for your own photography
there and you're done.

- `images.*`        → hero / craft / about imagery
- `projects[]`      → the "Featured Work" gallery (order matters, see spans)
- `categories[]`    → product categories
- `testimonials[]`  → customer quotes
- `craftSteps[]`    → the four process steps
- `studioItems[]`   → the "From the studio" strip
- `contactEmail`    → drives all "custom order" CTAs (mailto)
- `instagramUrl`    → leave `''` until you connect your profile

## Structure

```
src/
  components/   Navbar, Footer, Button, SectionHeading, Gallery/CategoryCard, ...
  sections/     Hero, FeaturedWork, TheCraft, CustomWork, Categories, ...
  hooks/        useReveal (scroll animations), useParallax (gentle drift)
  data/site.ts  all editable copy + images
```

## Design notes

- Palette: warm ivory, soft beige, charcoal, muted terracotta, dusty rose/sage.
- Headings: Fraunces (serif) · Body/UI: Inter (sans).
- Scroll-triggered reveals use the `.reveal` class + `data-delay`.
- The hero's rotating embroidery hoop is pure CSS 3D (no Three.js bundle) —
  `src/components/ThreadHoop.tsx`.
- Respects `prefers-reduced-motion`.