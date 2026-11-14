# Oleksandr Lutskov — Interactive Portfolio & RedisGUI Showcase

Bilingual (**EN / UA**) interactive resume templates (9 themes with Dark/Light modes & print-ready A4 styling) and a dedicated **RedisStudio V2.2 (`RedisGUI`)** product landing page.

## Structure
- `index.html` — Hub switcher across all 9 resume templates + RedisGUI landing
- `templates/` — 9 standalone resume templates (`01`..`10`)
- `projects/redis-gui.html` — Standalone product landing page for [dellik95/redis-gui](https://github.com/dellik95/redis-gui)
- `scripts/build-deploy.mjs` — Builds a clean `dist/` bundle for either `resume` (chosen template or full hub) or `landing` (ignores template selection)
- `.github/workflows/deploy-pages.yml` — **100% Free GitHub Pages** deploy pipeline (`workflow_dispatch`)
- `.github/workflows/deploy-azure.yml` — Optional Azure Static Web Apps deploy pipeline (`workflow_dispatch`, requires `AZURE_STATIC_WEB_APPS_API_TOKEN` secret)

## Deploying via Pipelines (GitHub Pages — Free)
Go to **Actions → Deploy Portfolio to GitHub Pages (Free) → Run workflow**:
1. **`deploy_target`**: choose `resume` or `landing`.
2. **`resume_template`**: pick one of the 9 templates (or `all-templates-hub`) when `deploy_target = resume`. Automatically ignored when `deploy_target = landing`.
