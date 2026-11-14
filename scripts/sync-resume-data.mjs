#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { syncSeoAndSsr } from './seo-and-ssr.mjs';

export function syncResumeData(root = process.cwd()) {
  const jsonPath = path.join(root, 'data', 'resume-data.json');
  const jsOutPath = path.join(root, 'assets', 'resume-data.js');
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const parsed = JSON.parse(raw); // Validates JSON syntax before emitting
  const banner = '// AUTO-GENERATED from data/resume-data.json for offline file:// fallback.\n// Edit data/resume-data.json; HTTP/HTTPS pages fetch data/resume-data.json directly.\n';
  fs.writeFileSync(jsOutPath, `${banner}window.__OL_RESUME_DATA__ = ${JSON.stringify(parsed, null, 2)};\n`, 'utf8');
  syncSeoAndSsr(root, parsed);
  return parsed;
}

if (process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase()) {
  const data = syncResumeData();
  console.log(`[sync-resume-data] Synced data/resume-data.json -> assets/resume-data.js (${data.experience.length} jobs, ${data.education.length} degrees, ${data.certifications.length} certifications)`);
}
