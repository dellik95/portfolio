#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { syncResumeData } from './sync-resume-data.mjs';

syncResumeData(process.cwd());

function parseArgs(argv) {
  const args = { target: 'resume', template: '01-bento-glass', out: 'dist' };
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

function rewriteRootPaths(html, injectStandaloneMeta, templateFile) {
  let out = html
    .replaceAll('../assets/', 'assets/')
    .replaceAll('../data/', 'data/')
    .replaceAll('../CV_OleksandrLutskov_.NetFull-Stack.pdf', 'CV_OleksandrLutskov_.NetFull-Stack.pdf');
  if (injectStandaloneMeta) {
    const metaTags = [];
    if (!out.includes('ol-standalone-resume')) {
      metaTags.push('  <meta name="ol-standalone-resume" content="1" />');
    }
    if (templateFile && !out.includes('ol-template-file')) {
      metaTags.push(`  <meta name="ol-template-file" content="${templateFile}" />`);
    }
    if (metaTags.length) {
      out = out.replace('</head>', `${metaTags.join('\n')}\n</head>`);
    }
  }
  return out;
}

const root = process.cwd();
const { target, template, out } = parseArgs(process.argv.slice(2));
const outDir = path.resolve(root, out);

if (!['resume', 'landing'].includes(target)) {
  console.error(`Invalid --target "${target}". Expected "resume" or "landing".`);
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

if (target === 'landing') {
  console.log('[build-deploy] Target: landing (RedisGUI product page — template input ignored)');
  const srcLanding = path.join(root, 'projects', 'redis-gui.html');
  const html = fs.readFileSync(srcLanding, 'utf8');
  fs.writeFileSync(path.join(outDir, 'index.html'), rewriteRootPaths(html, false), 'utf8');
  copyRecursive(path.join(root, 'assets', 'redis-gui'), path.join(outDir, 'assets', 'redis-gui'));
} else if (template === 'all-templates-hub') {
  console.log('[build-deploy] Target: resume | Template: all-templates-hub (full portfolio switcher hub)');
  copyRecursive(path.join(root, 'index.html'), path.join(outDir, 'index.html'));
  copyRecursive(path.join(root, 'CV_OleksandrLutskov_.NetFull-Stack.pdf'), path.join(outDir, 'CV_OleksandrLutskov_.NetFull-Stack.pdf'));
  copyRecursive(path.join(root, 'assets'), path.join(outDir, 'assets'));
  copyRecursive(path.join(root, 'data'), path.join(outDir, 'data'));
  copyRecursive(path.join(root, 'templates'), path.join(outDir, 'templates'));
  copyRecursive(path.join(root, 'projects'), path.join(outDir, 'projects'));
} else {
  const safeTemplate = template.replace(/\.html$/i, '');
  const srcTemplate = path.join(root, 'templates', `${safeTemplate}.html`);
  if (!fs.existsSync(srcTemplate)) {
    console.error(`Template not found: ${srcTemplate}`);
    process.exit(1);
  }
  console.log(`[build-deploy] Target: resume | Template: ${safeTemplate}`);
  const html = fs.readFileSync(srcTemplate, 'utf8');
  fs.writeFileSync(path.join(outDir, 'index.html'), rewriteRootPaths(html, true, `${safeTemplate}.html`), 'utf8');
  copyRecursive(path.join(root, 'CV_OleksandrLutskov_.NetFull-Stack.pdf'), path.join(outDir, 'CV_OleksandrLutskov_.NetFull-Stack.pdf'));
  copyRecursive(path.join(root, 'assets'), path.join(outDir, 'assets'));
  copyRecursive(path.join(root, 'data'), path.join(outDir, 'data'));
}

const swaConfig = path.join(root, 'staticwebapp.config.json');
if (fs.existsSync(swaConfig)) {
  fs.copyFileSync(swaConfig, path.join(outDir, 'staticwebapp.config.json'));
}
// Prevent Jekyll from ignoring dot-prefixed folders or modifying files on GitHub Pages
fs.writeFileSync(path.join(outDir, '.nojekyll'), '', 'utf8');

console.log(`[build-deploy] Staged cleanly into ${outDir}`);
