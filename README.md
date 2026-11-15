# Oleksandr Lutskov — Interactive Portfolio & CV

Bilingual (**EN / UA**) interactive resume templates (**10 themes** with Dark/Light modes, print-ready A4 styling, SEO meta/JSON-LD, and pre-rendered ATS-friendly HTML).

Live Portfolio: https://dellik95.github.io/portfolio/  
RedisGUI Product Landing: https://dellik95.github.io/redis-gui/ ([dellik95/redis-gui](https://github.com/dellik95/redis-gui))  
Context Platform (Claudy) Landing: https://dellik95.github.io/context-platform/ ([dellik95/context-platform](https://github.com/dellik95/context-platform))

## Structure
- `index.html` — Style switcher hub across all 10 resume templates
- `templates/` — 10 standalone resume templates (`01`–`05`, `07`–`11`)
- `data/resume-data.json` — Single source of truth for profile, experience, skills, education, languages & certifications
- `assets/switcher.js` & `assets/resume-data.js` — Bilingual runtime hydration, theme switching, and offline `file://` fallback
- `assets/redis-gui/` — RedisGUI preview screenshots embedded across the portfolio templates
- `assets/context-platform/` — Context Platform (Claudy) dashboard and call-graph screenshots embedded across the portfolio templates
- `scripts/sync-resume-data.mjs` & `scripts/seo-and-ssr.mjs` — Syncs `data/resume-data.json` to `assets/resume-data.js`, pre-renders SSR HTML inside templates, and updates Schema.org JSON-LD, meta tags, `robots.txt` & `sitemap.xml`
- `scripts/build-deploy.mjs` — Stages a clean `dist/` bundle for the chosen template (or `all-templates-hub`)
- `.github/workflows/deploy-pages.yml` — GitHub Pages deploy pipeline (`workflow_dispatch`)
- `.github/workflows/deploy-azure.yml` — Optional Azure Static Web Apps deploy pipeline (`workflow_dispatch`, requires `AZURE_STATIC_WEB_APPS_API_TOKEN`)

## Syncing Data After Editing `data/resume-data.json`
```bash
node scripts/sync-resume-data.mjs
```

## Deploying via GitHub Pages
Go to **Actions → Deploy Resume to GitHub Pages → Run workflow** and select `resume_template` (`01-bento-glass`..`11-classic-pdf` or `all-templates-hub`).
