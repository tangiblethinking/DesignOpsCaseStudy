# Design Ops Case Study

A portfolio case study showcasing Design Operations transformation across e-commerce and SaaS platforms.

## Features

- Parallax hero with animated stat counters
- Scroll-triggered section reveals throughout
- Before/after metrics slider — drag to reveal post-implementation results
- Interactive workflow comparison diagram
- Hover tooltips with expanded detail on every key claim
- Org maturity matrix with visual capability bars
- Expandable leadership competency cards
- Sticky nav with active section tracking

## Tech Stack

- React 18 + Vite 5
- Pure CSS (no CSS-in-JS)
- Google Fonts: DM Serif Display + DM Sans + DM Mono
- Material Icons (filled)

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to vercel.com → New Project
3. Import your GitHub repo
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click Deploy

The `vercel.json` handles SPA routing automatically.

## Project Structure

```
src/
  components/
    Nav.jsx / Nav.css       — Sticky navigation with active state
    Tooltip.jsx             — Reusable tooltip component
  sections/
    Hero.jsx / Hero.css     — Parallax hero + animated counters
    Problem.jsx / Problem.css  — Chaos cards + affected systems
    Intervention.jsx / Intervention.css  — Framework pillars + workflow
    Metrics.jsx / Metrics.css  — Before/after slider metrics
    Maturity.jsx / Maturity.css  — Org capability matrix
    Leadership.jsx / Leadership.css  — Competency cards + takeaway
    Footer.jsx / Footer.css
  hooks.js                  — useScrollReveal + useCounter
  App.jsx                   — Root component
  index.css                 — Design tokens + global styles
```
