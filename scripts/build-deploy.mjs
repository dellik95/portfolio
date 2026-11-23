#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { syncResumeData } from './sync-resume-data.mjs';

syncResumeData(process.cwd());

function parseArgs(argv) {
  const args = { target: 'resume', template: '11-classic-pdf', out: 'dist' };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--target' && argv[i + 1]) args.target = argv[++i];
    else if (k === '--template' && argv[i + 1]) args.template = argv[++i];
    else if (k === '--out' && argv[i + 1]) args.out = argv[++i];
  }
  return args;
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

const TEMPLATE_ALIASES = {
  bento: '01-bento-glass',
  glass: '01-bento-glass',
  'bento-glass': '01-bento-glass',
  terminal: '02-terminal-ide',
  ide: '02-terminal-ide',
  'terminal-ide': '02-terminal-ide',
  swiss: '03-swiss-editorial',
  editorial: '03-swiss-editorial',
  'swiss-editorial': '03-swiss-editorial',
  nordic: '04-nordic-fintech',
  fintech: '04-nordic-fintech',
  'nordic-fintech': '04-nordic-fintech',
  executive: '05-executive-split',
  split: '05-executive-split',
  'executive-split': '05-executive-split',
  '06': '07-architect-sidebar-cv',
  '6': '07-architect-sidebar-cv',
  dossier: '07-architect-sidebar-cv',
  architect: '07-architect-sidebar-cv',
  sidebar: '07-architect-sidebar-cv',
  'architect-sidebar': '07-architect-sidebar-cv',
  azure: '08-azure-cloud-portal',
  cloud: '08-azure-cloud-portal',
  portal: '08-azure-cloud-portal',
  'azure-cloud': '08-azure-cloud-portal',
  minimal: '09-minimal-mono-craft',
  mono: '09-minimal-mono-craft',
  craft: '09-minimal-mono-craft',
  emerald: '10-interactive-tabbed-folio',
  tabbed: '10-interactive-tabbed-folio',
  matrix: '10-interactive-tabbed-folio',
  interactive: '10-interactive-tabbed-folio',
  pdf: '11-classic-pdf',
  classic: '11-classic-pdf',
  ats: '11-classic-pdf',
  print: '11-classic-pdf',
  hub: 'hub',
  all: 'hub',
  switcher: 'hub',
  'all-templates-hub': 'hub'
};

function injectRouteMeta(html, { standalone = false, templateFile = '', assetRoot = '', ensureTrailingSlash = false } = {}) {
  let out = html;
  if (ensureTrailingSlash && !out.includes('ol-slash-normalizer')) {
    const slashScript = '  <script id="ol-slash-normalizer">(function(){var p=location.pathname;if(!p.endsWith("/")&&!/\\.html$/i.test(p)){location.replace(p+"/"+location.search+location.hash);}})();</script>';
    out = out.replace(/<head(\b[^>]*)>/i, `<head$1>\n${slashScript}`);
  }
  const metaTags = [];
  if (!out.includes('ol-asset-root')) {
    metaTags.push(`  <meta name="ol-asset-root" content="${assetRoot}" />`);
  }
  if (standalone && !out.includes('ol-standalone-resume')) {
    metaTags.push('  <meta name="ol-standalone-resume" content="1" />');
  }
  if (templateFile && !out.includes('ol-template-file')) {
    metaTags.push(`  <meta name="ol-template-file" content="${templateFile}" />`);
  }
  if (metaTags.length) {
    out = out.replace('</head>', `${metaTags.join('\n')}\n</head>`);
  }
  return out;
}

function rewriteRootPaths(html, injectStandaloneMeta, templateFile) {
  const out = html
    .replaceAll('../assets/', 'assets/')
    .replaceAll('../data/', 'data/')
    .replaceAll('../CV_OleksandrLutskov_.NetFull-Stack.pdf', 'CV_OleksandrLutskov_.NetFull-Stack.pdf');
  return injectRouteMeta(out, {
    standalone: !!injectStandaloneMeta,
    templateFile,
    assetRoot: '',
    ensureTrailingSlash: false
  });
}

function rewriteHubSubpathHtml(html) {
  const out = html
    .replace(/(href|src)=["']assets\//g, '$1="../assets/')
    .replace(/(href|src)=["']templates\//g, '$1="../templates/')
    .replace(/(["'])templates\/([0-9]+-[^"']+\.html)\1/g, '$1../templates/$2$1')
    .replace(/(href|src)=["']data\//g, '$1="../data/')
    .replace(/(href|src)=["']CV_OleksandrLutskov_\.NetFull-Stack\.pdf["']/g, '$1="../CV_OleksandrLutskov_.NetFull-Stack.pdf"');
  return injectRouteMeta(out, {
    standalone: false,
    templateFile: '',
    assetRoot: '../',
    ensureTrailingSlash: true
  });
}

function build404Html(templateIds, defaultTemplate) {
  const linksHtml = templateIds
    .map((id) => `        <a class="tpl-link" href="./${id}/">${id}</a>`)
    .join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Redirecting — Oleksandr Lutskov CV</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b111b;
      color: #e6edf3;
      display: grid;
      place-items: center;
      padding: 24px;
    }
    .card {
      max-width: 680px;
      width: 100%;
      background: #131c2b;
      border: 1px solid #26354d;
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    }
    h1 { margin: 0 0 8px; font-size: 20px; }
    p { margin: 0 0 18px; color: #9fb0c8; font-size: 14px; line-height: 1.5; }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
    .btn {
      display: inline-flex;
      align-items: center;
      padding: 9px 14px;
      border-radius: 9px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid #304565;
      color: #e6edf3;
      background: #1a2639;
    }
    .btn.primary { background: #2563eb; border-color: #3b82f6; color: #fff; }
    .tpl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(195px, 1fr)); gap: 8px; }
    .tpl-link {
      display: block;
      padding: 8px 10px;
      border-radius: 8px;
      background: #0f1724;
      border: 1px solid #243247;
      color: #93c5fd;
      text-decoration: none;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
    }
    .tpl-link:hover { border-color: #60a5fa; color: #fff; }
    body.redirecting .card { opacity: 0; }
  </style>
  <script>
    (function () {
      var templateIds = ${JSON.stringify(templateIds)};
      var aliases = ${JSON.stringify(TEMPLATE_ALIASES)};
      function resolveSlug(raw) {
        if (!raw) return null;
        var clean = String(raw).trim().replace(/^\\/+|\\/+$/g, '').replace(/\\/index\\.html$/i, '').replace(/\\.html$/i, '').toLowerCase();
        if (!clean) return null;
        for (var i = 0; i < templateIds.length; i++) {
          var id = templateIds[i];
          var prefix = id.split('-')[0];
          if (id.toLowerCase() === clean || prefix === clean || String(parseInt(prefix, 10)) === clean) return id;
        }
        return aliases[clean] || null;
      }

      var pathname = location.pathname;
      var base = '/';
      var rest = pathname.replace(/^\\/+/, '');
      if (pathname === '/portfolio' || pathname.indexOf('/portfolio/') === 0) {
        base = '/portfolio/';
        rest = pathname === '/portfolio' ? '' : pathname.slice('/portfolio/'.length);
      } else if (location.hostname.indexOf('.github.io') !== -1) {
        var m = pathname.match(/^\\/([^/]+)(\\/.*)?$/);
        if (m && !resolveSlug(m[1])) {
          base = '/' + m[1] + '/';
          rest = (m[2] || '').replace(/^\\/+/, '');
        }
      }

      var firstSeg = (rest.split('/')[0] || '').trim();
      var target = resolveSlug(firstSeg);
      if (target) {
        document.documentElement.classList.add('redirecting');
        location.replace(base + target + '/' + location.search + location.hash);
      } else {
        window.__OL_BASE_URL__ = base;
      }
    })();
  </script>
</head>
<body>
  <main class="card">
    <h1>Template not found</h1>
    <p>Choose the default deployed resume (${defaultTemplate}), open the interactive hub, or select any template by ID:</p>
    <div class="actions" id="main-actions">
      <a class="btn primary" id="default-link" href="./">Default CV (${defaultTemplate})</a>
      <a class="btn" id="hub-link" href="./hub/">All Templates Hub</a>
    </div>
    <div class="tpl-grid" id="tpl-grid">
${linksHtml}
    </div>
  </main>
  <script>
    (function () {
      var base = window.__OL_BASE_URL__ || './';
      var def = document.getElementById('default-link');
      var hub = document.getElementById('hub-link');
      if (def) def.setAttribute('href', base);
      if (hub) hub.setAttribute('href', base + 'hub/');
      var links = document.querySelectorAll('.tpl-link');
      for (var i = 0; i < links.length; i++) {
        var slug = links[i].textContent.trim();
        links[i].setAttribute('href', base + slug + '/');
      }
    })();
  </script>
</body>
</html>
`;
}

const root = process.cwd();
const { target, template, out } = parseArgs(process.argv.slice(2));
const outDir = path.resolve(root, out);

if (target !== 'resume') {
  console.error(`Invalid --target "${target}". Only "resume" is hosted in this repository (RedisGUI landing moved to https://github.com/dellik95/redis-gui).`);
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const templatesDir = path.join(root, 'templates');
const templateFiles = fs.readdirSync(templatesDir)
  .filter((name) => name.endsWith('.html'))
  .sort();
const templateIds = templateFiles.map((name) => name.replace(/\.html$/i, ''));

if (template === 'all-templates-hub') {
  console.log('[build-deploy] Target: resume | Template: all-templates-hub (full portfolio switcher hub + per-template routes)');
  const rootHubHtml = injectRouteMeta(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    standalone: false,
    templateFile: '',
    assetRoot: '',
    ensureTrailingSlash: false
  });
  fs.writeFileSync(path.join(outDir, 'index.html'), rootHubHtml, 'utf8');
} else {
  const safeTemplate = template.replace(/\.html$/i, '');
  const srcTemplate = path.join(templatesDir, `${safeTemplate}.html`);
  if (!fs.existsSync(srcTemplate)) {
    console.error(`Template not found: ${srcTemplate}`);
    process.exit(1);
  }
  console.log(`[build-deploy] Target: resume | Default template: ${safeTemplate} (+ all ${templateIds.length} /{templateId}/ routes)`);
  const html = fs.readFileSync(srcTemplate, 'utf8');
  fs.writeFileSync(path.join(outDir, 'index.html'), rewriteRootPaths(html, true, `${safeTemplate}.html`), 'utf8');
}

// Always publish every template at /{templateId}/index.html and the interactive switcher at /hub/index.html
for (const id of templateIds) {
  const rawTpl = fs.readFileSync(path.join(templatesDir, `${id}.html`), 'utf8');
  const routedHtml = injectRouteMeta(rawTpl, {
    standalone: true,
    templateFile: `${id}.html`,
    assetRoot: '../',
    ensureTrailingSlash: true
  });
  const tplOutDir = path.join(outDir, id);
  fs.mkdirSync(tplOutDir, { recursive: true });
  fs.writeFileSync(path.join(tplOutDir, 'index.html'), routedHtml, 'utf8');
}

const hubOutDir = path.join(outDir, 'hub');
fs.mkdirSync(hubOutDir, { recursive: true });
const hubHtml = rewriteHubSubpathHtml(fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
fs.writeFileSync(path.join(hubOutDir, 'index.html'), hubHtml, 'utf8');

fs.writeFileSync(path.join(outDir, '404.html'), build404Html(templateIds, template.replace(/\.html$/i, '')), 'utf8');

copyRecursive(path.join(root, 'CV_OleksandrLutskov_.NetFull-Stack.pdf'), path.join(outDir, 'CV_OleksandrLutskov_.NetFull-Stack.pdf'));
copyRecursive(path.join(root, 'assets'), path.join(outDir, 'assets'));
copyRecursive(path.join(root, 'data'), path.join(outDir, 'data'));
copyRecursive(templatesDir, path.join(outDir, 'templates'));
const kadexDir = path.join(outDir, 'kadex-ui');
fs.mkdirSync(kadexDir, { recursive: true });
execFileSync('tar', ['-xzf', path.join(root, 'showcases', 'kadex-showcase.tgz'), '-C', kadexDir]);
if (fs.existsSync(path.join(root, 'qandivo'))) {
  copyRecursive(path.join(root, 'qandivo'), path.join(outDir, 'qandivo'));
}
for (const seoFile of ['robots.txt', 'sitemap.xml']) {
  if (fs.existsSync(path.join(root, seoFile))) {
    copyRecursive(path.join(root, seoFile), path.join(outDir, seoFile));
  }
}

const swaConfig = path.join(root, 'staticwebapp.config.json');
if (fs.existsSync(swaConfig)) {
  fs.copyFileSync(swaConfig, path.join(outDir, 'staticwebapp.config.json'));
}
// Prevent Jekyll from ignoring dot-prefixed folders or modifying files on GitHub Pages
fs.writeFileSync(path.join(outDir, '.nojekyll'), '', 'utf8');

console.log(`[build-deploy] Staged cleanly into ${outDir}`);
