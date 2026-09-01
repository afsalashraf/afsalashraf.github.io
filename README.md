# Afsal Ashraf — Portfolio

Premium React portfolio built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

Live at [afsalashraf.com](https://afsalashraf.com)

## GitHub Pages + React

GitHub Pages serves **static files only** (no Node.js server at runtime). This project uses React during development, then **builds to static HTML/JS/CSS** that GitHub Pages can host.

On every push to `main`, GitHub Actions builds the site and publishes to the `gh-pages` branch.

### Pages source

GitHub → **Settings → Pages** → Source: **`gh-pages`** branch, **`/ (root)`**

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview production build
```

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- Framer Motion
- Lucide React icons
