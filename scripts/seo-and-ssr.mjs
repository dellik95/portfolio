import fs from 'node:fs';
import path from 'node:path';

const PORTFOLIO_URL = 'https://dellik95.github.io/portfolio/';
const REDISGUI_URL = 'https://dellik95.github.io/redis-gui/';

const TEMPLATE_MAP = [
  { file: '01-bento-glass.html', tplClass: 'tpl-01', themeColor: '#090b10', label: '01. Bento Glass (Linear / Raycast)' },
  { file: '02-terminal-ide.html', tplClass: 'tpl-02', themeColor: '#0d1117', label: '02. Terminal & IDE (DevOps / Architecture)' },
  { file: '03-swiss-editorial.html', tplClass: 'tpl-03', themeColor: '#f6f3ec', label: '03. Swiss Editorial (Print / Vermilion)' },
  { file: '04-nordic-fintech.html', tplClass: 'tpl-04', themeColor: '#f8fafc', label: '04. Stripe / FinTech Clean SaaS' },
  { file: '05-executive-split.html', tplClass: 'tpl-05', themeColor: '#0f172a', label: '05. Executive Split-Screen Dossier' },
  { file: '07-architect-sidebar-cv.html', tplClass: 'tpl-07', themeColor: '#ffffff', label: '06. Classic Two-Column Executive Dossier CV' },
  { file: '08-azure-cloud-portal.html', tplClass: 'tpl-08', themeColor: '#ffffff', label: '07. Cloud Solutions Architect Portal' },
  { file: '09-minimal-mono-craft.html', tplClass: 'tpl-09', themeColor: '#ffffff', label: '08. Minimal Mono Craft' },
  { file: '10-interactive-tabbed-folio.html', tplClass: 'tpl-10', themeColor: '#070c0b', label: '09. Emerald Matrix Workstation' },
  { file: '11-classic-pdf.html', tplClass: 'tpl-11', themeColor: '#ffffff', label: '10. Classic PDF Style' }
];

const MONTHS = {
  january: '01', jan: '01', february: '02', feb: '02', march: '03', mar: '03',
  april: '04', apr: '04', may: '05', june: '06', jun: '06', july: '07', jul: '07',
  august: '08', aug: '08', september: '09', sep: '09', sept: '09',
  october: '10', oct: '10', november: '11', nov: '11', december: '12', dec: '12'
};

function escHtml(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pick(val, lang = 'en') {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return val[lang] !== undefined ? val[lang] : (val.en !== undefined ? val.en : '');
  }
  return val;
}

function toIsoMonth(str) {
  if (!str) return undefined;
  const m = String(str).trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const mm = MONTHS[m[1].toLowerCase()];
  return mm ? `${m[2]}-${mm}` : m[2];
}

function parsePeriodRange(period) {
  if (!period) return {};
  const parts = String(period).split(/[–—-]/).map((s) => s.trim());
  const startDate = toIsoMonth(parts[0]);
  const endDate = parts[1] && !/present/i.test(parts[1]) ? toIsoMonth(parts[1]) : undefined;
  return { startDate, endDate };
}

function safeJsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');
}

/* ------------------------------------------------------------------
   SSR Block Generators (matching assets/switcher.js 1:1 in English)
------------------------------------------------------------------ */

function renderExperienceHtml(data, tplClass) {
  const jobs = data.experience || [];
  return jobs.map((job, idx) => {
    const co = escHtml(job.company);
    const role = escHtml(pick(job.role, 'en'));
    const period = escHtml(pick(job.period, 'en'));
    const domain = job.domain ? escHtml(pick(job.domain, 'en')) : '';
    const bullets = (pick(job.bullets, 'en') || []).map((b) => `<li>${escHtml(b)}</li>`).join('');
    const tags = job.tags || [];

    if (tplClass === 'tpl-01') {
      return `<article class="exp-card"${idx === 0 ? ' style="border-color: rgba(139, 92, 246, 0.35);"' : ''}>
          <div>
            <div class="exp-company">${co}</div>
            <div class="exp-role-title">${role}</div>
            <span class="exp-period">${period}</span>
          </div>
          <div>
            ${domain ? `<p style="font-size:13.5px; color:#38bdf8; font-weight:600; margin-bottom:10px;">${domain}</p>` : ''}
            <ul class="exp-bullets">${bullets}</ul>
            <div class="pill-cloud">${tags.map((t, ti) => `<span class="tech-pill${ti < 2 ? ' hi' : (ti < 5 && idx === 0 ? ' cyan' : '')}">${escHtml(t)}</span>`).join('')}</div>
          </div>
        </article>`;
    }
    if (tplClass === 'tpl-02') {
      return `<article class="git-commit">
          <div class="commit-meta">
            ${job.hash ? `<span class="commit-hash">${escHtml(job.hash)}</span>` : ''}
            ${job.branch ? `<span class="commit-branch">${escHtml(job.branch)}</span>` : ''}
            <span style="color:var(--text-muted);">${period}</span>
          </div>
          <h3 class="commit-title">${co} — <span style="color:${idx === 0 ? 'var(--cyan)' : (idx === 1 ? 'var(--purple)' : 'var(--text)')};">${role}</span></h3>
          ${domain ? `<p style="font-size:13.5px;color:var(--green);font-weight:600;margin-bottom:10px;">${domain}</p>` : ''}
          <ul class="commit-list">${bullets}</ul>
          <div class="tag-row">${tags.map((t) => `<span class="code-tag">${escHtml(t)}</span>`).join('')}</div>
        </article>`;
    }
    if (tplClass === 'tpl-03') {
      return `<article class="exp-row">
          <div>
            <div class="exp-co">${co}</div>
            <div class="exp-rl">${role}</div>
            <div class="exp-dt">${period}</div>
          </div>
          <div>
            ${domain ? `<p style="font-size:14px;color:var(--vermilion);font-weight:700;margin-bottom:10px;">${domain}</p>` : ''}
            <ul class="exp-ul">${bullets}</ul>
            <div class="tag-line">${tags.map((t) => `<span class="s-tag">${escHtml(t)}</span>`).join('')}</div>
          </div>
        </article>`;
    }
    if (tplClass === 'tpl-04') {
      return `<article class="exp-item${idx === 0 ? ' current' : ''}">
          <div>
            <div class="exp-company">${co}</div>
            <div class="exp-role">${role}</div>
            <span class="exp-date-pill">${period}</span>
          </div>
          <div>
            ${domain ? `<span class="domain-banner">${domain}</span>` : ''}
            <ul class="clean-list" style="margin-top:${domain ? '6px' : '0'};">${bullets}</ul>
            <div class="chips">${tags.map((t, ti) => `<span class="chip${ti < 2 ? ' indigo' : (ti < 4 ? ' emerald' : '')}">${escHtml(t)}</span>`).join('')}</div>
          </div>
        </article>`;
    }
    if (tplClass === 'tpl-05') {
      return `<article class="exec-card"${idx === 0 ? ' style="border-color:rgba(45,212,191,0.35);"' : ''}>
          <div class="exec-card-header">
            <h3 class="exec-card-title">${co} · <span style="color:var(--teal);">${role}</span></h3>
            <span class="exec-date">${period}</span>
          </div>
          ${domain ? `<p style="font-size:13.5px;color:#38bdf8;font-weight:600;margin-bottom:8px;">${domain}</p>` : ''}
          <ul class="exec-ul">${bullets}</ul>
          <div class="teal-tags">${tags.map((t) => `<span class="teal-tag">${escHtml(t)}</span>`).join('')}</div>
        </article>`;
    }
    if (tplClass === 'tpl-07') {
      return `<article class="tl-item">
          <div class="tl-head">
            <div><span class="tl-co">${co}</span> — <span class="tl-role">${role}</span></div>
            <span class="tl-date">${period}</span>
          </div>
          ${domain ? `<div style="font-size:13.5px;font-weight:700;color:#059669;margin-bottom:6px;">${domain}</div>` : ''}
          <ul class="tl-ul">${bullets}</ul>
          <div class="tl-tags">${tags.map((t) => `<span class="tl-tag">${escHtml(t)}</span>`).join('')}</div>
        </article>`;
    }
    if (tplClass === 'tpl-08') {
      return `<article class="exp-cloud-item">
          <div class="exp-cloud-head">
            <h3 style="font-size:20px;color:var(--ink);">${co} — <span style="color:var(--blue);">${role}</span></h3>
            <span class="c-badge${idx === 0 ? ' aws' : ''}">${period}</span>
          </div>
          ${domain ? `<div style="font-weight:700;font-size:13.5px;color:#0d9488;margin-bottom:6px;">${domain}</div>` : ''}
          <ul class="exp-cloud-ul">${bullets}</ul>
          <div class="cloud-badges">${tags.map((t, ti) => `<span class="c-badge${/aws|lambda|dynamo|s3|event/i.test(t) && ti > 1 ? ' aws' : ''}">${escHtml(t)}</span>`).join('')}</div>
        </article>`;
    }
    if (tplClass === 'tpl-09') {
      return `<article class="mono-exp-card">
          <div class="mono-exp-top">
            <h3 style="font-size:18px;color:var(--ink);">${co} · <span style="font-weight:500;color:var(--muted);">${role}</span></h3>
            <span class="mono" style="font-size:12px;color:var(--muted);">${period}</span>
          </div>
          ${domain ? `<div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:8px;">${domain}</div>` : ''}
          <ul class="mono-ul">${bullets}</ul>
          <div class="mono-pills">${tags.map((t) => `<span class="m-pill">${escHtml(t)}</span>`).join('')}</div>
        </article>`;
    }
    if (tplClass === 'tpl-11') {
      return `<article class="pdf-exp-item">
          <h3 class="pdf-exp-role">${role}</h3>
          <div class="pdf-exp-meta">${co} | ${period}</div>
          ${domain ? `<p class="pdf-exp-domain">${domain}</p>` : ''}
          <ul class="pdf-bullet-list">${bullets}</ul>
          ${tags.length ? `<p class="pdf-exp-tech"><em>Technologies: ${tags.map(escHtml).join(', ')}</em></p>` : ''}
        </article>`;
    }
    return `<article class="em-exp-item">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <h3 style="font-size:19px;">${co} — <span style="color:var(--emerald);">${role}</span></h3>
          <span class="em-tag">${period}</span>
        </div>
        ${domain ? `<div style="font-size:13.5px;color:var(--cyan);font-weight:700;margin:6px 0;">${domain}</div>` : ''}
        <ul class="em-ul">${bullets}</ul>
        <div class="em-tags">${tags.map((t) => `<span class="em-tag">${escHtml(t)}</span>`).join('')}</div>
      </article>`;
  }).join('');
}

function renderEducationHtml(data, tplClass) {
  const items = data.education || [];
  return `<div class="ol-edu-list">${items.map((ed) => {
    const inst = escHtml(pick(ed.institution, 'en'));
    const deg = escHtml(pick(ed.degree, 'en'));
    const per = escHtml(ed.period || '');
    const titleHtml = `<span>${inst}</span>`;
    if (tplClass === 'tpl-11') {
      return `<div class="pdf-edu-item">
          <div class="pdf-edu-inst">${titleHtml}</div>
          <div class="pdf-edu-deg">${deg}${per ? ` (${per})` : ''}</div>
        </div>`;
    }
    if (tplClass === 'tpl-07') {
      return `<div class="ol-edu-item sb-edu-item">
          <div class="ol-edu-inst">${titleHtml}</div>
          <div class="ol-edu-deg">${deg}</div>
          ${per ? `<div class="ol-edu-period">${per}</div>` : ''}
        </div>`;
    }
    return `<div class="ol-edu-item">
        <div class="ol-edu-top">
          <strong class="ol-edu-inst">${titleHtml}</strong>
          ${per ? `<span class="ol-edu-period">${per}</span>` : ''}
        </div>
        <div class="ol-edu-deg">${deg}</div>
      </div>`;
  }).join('')}</div>`;
}

function renderLanguagesHtml(data, tplClass) {
  const items = data.languages || [];
  if (tplClass === 'tpl-11') {
    return `<ul class="pdf-bullet-list">${items.map((ln) => `<li>${escHtml(pick(ln.name, 'en'))} — ${escHtml(pick(ln.level, 'en'))}</li>`).join('')}</ul>`;
  }
  if (tplClass === 'tpl-07') {
    return items.map((ln) => {
      const label = `${escHtml(pick(ln.name, 'en'))} — ${escHtml(pick(ln.level, 'en'))}`;
      const pct = Number(ln.proficiency) || 80;
      return `<div class="sb-bar-item">
          <div class="sb-bar-head"><span>${label}</span><span>${pct}%</span></div>
          <div class="sb-bar-track"><div class="sb-bar-fill ol-anim-bar ol-bar-filled" style="width:${pct}%;"></div></div>
        </div>`;
    }).join('');
  }
  if (tplClass === 'tpl-04' || tplClass === 'tpl-05' || tplClass === 'tpl-09') {
    const pillCls = tplClass === 'tpl-04' ? 'chip indigo' : (tplClass === 'tpl-05' ? 'teal-tag' : 'm-pill');
    return `<div class="ol-lang-pills">${items.map((ln, idx) => {
      const cls = tplClass === 'tpl-04' && idx > 0 ? 'chip' : pillCls;
      return `<span class="${cls}">${escHtml(pick(ln.name, 'en'))} — ${escHtml(pick(ln.level, 'en'))}</span>`;
    }).join('')}</div>`;
  }
  return `<div class="ol-lang-rows">${items.map((ln) => `
      <div class="ol-lang-row">
        <strong>${escHtml(pick(ln.name, 'en'))}</strong>
        <span>${escHtml(pick(ln.level, 'en'))}</span>
      </div>
    `).join('')}</div>`;
}

function renderCertificationsHtml(data) {
  const certs = data.certifications || [];
  const u = data.ui || {};
  const showCredTxt = escHtml(pick(u.show_credential, 'en') || 'Show credential ↗');
  const issuedTxt = escHtml(pick(u.issued_label, 'en') || 'Issued');
  const credIdTxt = escHtml(pick(u.credential_id_label, 'en') || 'Credential ID');
  const skillsTxt = escHtml(pick(u.skills_label, 'en') || 'Skills');

  return `<div class="ol-cert-grid">${certs.map((c) => {
    const credLink = c.credentialUrl
      ? `<a href="${escHtml(c.credentialUrl)}" target="_blank" rel="noopener" class="ol-cert-btn">${showCredTxt}</a>`
      : (c.credentialId ? `<span class="ol-cert-id">${credIdTxt}: ${escHtml(c.credentialId)}</span>` : '');
    const skillsHtml = (c.skills && c.skills.length)
      ? `<div class="ol-cert-skills">${c.skills.map((s) =>
        c.skillsUrl
          ? `<a href="${escHtml(c.skillsUrl)}" target="_blank" rel="noopener" class="ol-cert-skill">${skillsTxt}: ${escHtml(s)}</a>`
          : `<span class="ol-cert-skill">${escHtml(s)}</span>`
      ).join('')}</div>`
      : '';
    return `<article class="ol-cert-card">
        <div class="ol-cert-head">
          <span class="ol-cert-issuer">${escHtml(c.issuer)}</span>
          <span class="ol-cert-date">${issuedTxt} ${escHtml(c.issued)}</span>
        </div>
        <h3 class="ol-cert-title">${escHtml(c.title)}</h3>
        <div class="ol-cert-foot">
          ${credLink}
          ${skillsHtml}
        </div>
      </article>`;
  }).join('')}</div>`;
}

function renderEducationLanguagesJsonHtml(data) {
  const eduItems = data.education || [];
  const langItems = data.languages || [];
  const eduHtml = eduItems.map((ed, idx) => {
    const comma = idx < eduItems.length - 1 ? ',' : '';
    const inst = escHtml(pick(ed.institution, 'en'));
    const deg = escHtml(pick(ed.degree, 'en'));
    const per = escHtml(ed.period || '');
    return [
      '    {',
      `      <span class="ol-jk">"university"</span>: <span class="ol-js">"${inst}"</span>,`,
      `      <span class="ol-jk">"degree"</span>: <span class="ol-js2">"${deg}"</span>,`,
      `      <span class="ol-jk">"period"</span>: <span class="ol-jn">"${per}"</span>`,
      `    }${comma}`
    ].join('\n');
  }).join('\n');

  const langHtml = langItems.map((ln, idx) => {
    const comma = idx < langItems.length - 1 ? ',' : '';
    return [
      '    {',
      `      <span class="ol-jk">"language"</span>: <span class="ol-js3">"${escHtml(pick(ln.name, 'en'))}"</span>,`,
      `      <span class="ol-jk">"level"</span>: <span class="ol-js2">"${escHtml(pick(ln.level, 'en'))}"</span>`,
      `    }${comma}`
    ].join('\n');
  }).join('\n');

  return [
    '<span class="json-key">"educationAndLanguages":</span> {',
    '<pre class="ol-json-body">',
    '  <span class="ol-jk">"education"</span>: [',
    eduHtml,
    '  ],',
    '  <span class="ol-jk">"languages"</span>: [',
    langHtml,
    '  ]',
    '</pre>',
    '}'
  ].join('\n');
}

function renderSkillsBulletsHtml(data) {
  const sk = data.skills || {};
  const lines = [];
  [sk.backend, sk.frontend, sk.cloudAndData].forEach((arr) => {
    if (!Array.isArray(arr) || !arr.length) return;
    for (let i = 0; i < arr.length; i += 3) {
      lines.push(arr.slice(i, i + 3).map(escHtml).join(', '));
    }
  });
  return `<ul class="pdf-bullet-list">${lines.map((line) => `<li>${line}</li>`).join('')}</ul>`;
}

function renderSlotHtml(slot, data, tplClass) {
  const tagClassMap = {
    'tpl-01': 'tech-pill', 'tpl-02': 'code-tag', 'tpl-03': 's-tag', 'tpl-04': 'chip',
    'tpl-05': 'teal-tag', 'tpl-07': 'tl-tag', 'tpl-08': 'c-badge', 'tpl-09': 'm-pill', 'tpl-10': 'em-tag'
  };
  const tCls = tagClassMap[tplClass] || 'code-tag';

  switch (slot) {
    case 'experience': return renderExperienceHtml(data, tplClass);
    case 'education': return renderEducationHtml(data, tplClass);
    case 'languages': return renderLanguagesHtml(data, tplClass);
    case 'certifications': return renderCertificationsHtml(data);
    case 'education-languages-json': return renderEducationLanguagesJsonHtml(data);
    case 'skills-backend': return ((data.skills && data.skills.backend) || []).map((s) => `<span class="${tCls}">${escHtml(s)}</span>`).join('');
    case 'skills-frontend': return ((data.skills && data.skills.frontend) || []).map((s) => `<span class="${tCls}">${escHtml(s)}</span>`).join('');
    case 'skills-cloud': return ((data.skills && data.skills.cloudAndData) || []).map((s) => `<span class="${tCls}">${escHtml(s)}</span>`).join('');
    case 'skills-bullets': return renderSkillsBulletsHtml(data);
    default: return null;
  }
}

/* ------------------------------------------------------------------
   Schema.org JSON-LD + Meta Builders
------------------------------------------------------------------ */

function buildPersonEntity(data) {
  const p = data.profile;
  const c = p.contacts;
  const allSkills = [
    ...(data.skills?.backend || []),
    ...(data.skills?.frontend || []),
    ...(data.skills?.cloudAndData || []),
    'C#', '.NET 11', 'ASP.NET Core', 'Angular 22', 'React.js', 'TypeScript',
    'Microservices Architecture', 'AWS Serverless', 'Microsoft Azure', 'Semantic Kernel', 'AI Agents', 'MCP', 'Redis', 'Playwright'
  ];
  const knowsAbout = [...new Set(allSkills)];

  const institutions = [...new Set((data.education || []).map((e) => pick(e.institution, 'en')))];
  const alumniOf = institutions.map((name) => ({
    '@type': 'EducationalOrganization',
    name
  }));

  const degreeCredentials = (data.education || []).map((e) => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    name: `${pick(e.degree, 'en')} (${e.period})`,
    recognizedBy: {
      '@type': 'EducationalOrganization',
      name: pick(e.institution, 'en')
    }
  }));

  const certCredentials = (data.certifications || []).map((cert) => {
    const obj = {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: cert.title,
      recognizedBy: {
        '@type': 'Organization',
        name: cert.issuer
      },
      datePublished: toIsoMonth(cert.issued) || cert.issued,
      about: cert.skills
    };
    if (cert.credentialUrl) obj.url = cert.credentialUrl;
    if (cert.credentialId) obj.identifier = cert.credentialId;
    return obj;
  });

  const hasOccupation = (data.experience || []).map((job) => {
    const { startDate, endDate } = parsePeriodRange(pick(job.period, 'en'));
    const roleObj = {
      '@type': 'EmployeeRole',
      roleName: pick(job.role, 'en'),
      hasOccupation: {
        '@type': 'Occupation',
        name: pick(job.role, 'en'),
        skills: (job.tags || []).join(', ')
      },
      worksFor: {
        '@type': 'Organization',
        name: job.company
      },
      description: [job.domain ? pick(job.domain, 'en') : '', ...(pick(job.bullets, 'en') || [])].filter(Boolean).join(' ')
    };
    if (startDate) roleObj.startDate = startDate;
    if (endDate) roleObj.endDate = endDate;
    return roleObj;
  });

  const featured = data.portfolio?.featured;
  const projects = data.portfolio?.projects || [];
  const workExample = [];
  if (featured) {
    workExample.push({
      '@type': 'SoftwareApplication',
      '@id': `${REDISGUI_URL}#app`,
      name: pick(featured.title, 'en'),
      description: pick(featured.description, 'en'),
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, Linux, macOS, Docker',
      url: featured.landingUrl || REDISGUI_URL,
      codeRepository: featured.githubUrl
    });
  }
  for (const proj of projects) {
    if (proj.landingUrl || proj.githubUrl) {
      workExample.push({
        '@type': 'SoftwareApplication',
        '@id': `${proj.landingUrl || proj.githubUrl}#app`,
        name: pick(proj.title, 'en'),
        description: pick(proj.description, 'en'),
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows, Linux, macOS',
        ...(proj.landingUrl ? { url: proj.landingUrl } : {}),
        ...(proj.githubUrl ? { codeRepository: proj.githubUrl } : {})
      });
    } else {
      workExample.push({
        '@type': 'CreativeWork',
        name: pick(proj.title, 'en'),
        description: pick(proj.description, 'en')
      });
    }
  }

  return {
    '@type': 'Person',
    '@id': `${PORTFOLIO_URL}#person`,
    name: p.name,
    givenName: 'Oleksandr',
    familyName: 'Lutskov',
    alternateName: ['dellik95', 'Александр Луцков', 'Олександр Луцков'],
    jobTitle: pick(p.role, 'en'),
    description: pick(p.summary, 'en').replace(/\s+/g, ' ').trim(),
    url: PORTFOLIO_URL,
    email: `mailto:${c.email}`,
    telephone: c.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
      addressRegion: pick(p.location, 'en')
    },
    sameAs: [c.github, c.linkedin, c.telegram, c.youtube].filter(Boolean),
    knowsLanguage: (data.languages || []).map((ln) => ({
      '@type': 'Language',
      name: `${pick(ln.name, 'en')} (${pick(ln.level, 'en')})`
    })),
    knowsAbout,
    alumniOf,
    hasCredential: [...degreeCredentials, ...certCredentials],
    hasOccupation,
    workExample
  };
}

function buildHeadSeoBlock({ title, description, keywords, canonicalUrl, ogType, ogImage, ogImageAlt, themeColor, hreflang, jsonLd }) {
  const tags = [
    '<!-- OL_SEO_HEAD_START -->',
    `  <meta name="description" content="${escHtml(description)}" />`,
    `  <meta name="keywords" content="${escHtml(keywords)}" />`,
    `  <meta name="author" content="Oleksandr Lutskov" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `  <meta name="googlebot" content="index, follow" />`,
    themeColor ? `  <meta name="theme-color" content="${escHtml(themeColor)}" />` : null,
    `  <link rel="canonical" href="${escHtml(canonicalUrl)}" />`,
    ...(hreflang ? [
      `  <link rel="alternate" hreflang="en" href="${escHtml(canonicalUrl)}" />`,
      `  <link rel="alternate" hreflang="uk" href="${escHtml(canonicalUrl)}?lang=uk" />`,
      `  <link rel="alternate" hreflang="x-default" href="${escHtml(canonicalUrl)}" />`
    ] : []),
    `  <meta property="og:type" content="${escHtml(ogType)}" />`,
    `  <meta property="og:site_name" content="Oleksandr Lutskov — Engineering Portfolio" />`,
    `  <meta property="og:title" content="${escHtml(title)}" />`,
    `  <meta property="og:description" content="${escHtml(description)}" />`,
    `  <meta property="og:url" content="${escHtml(canonicalUrl)}" />`,
    `  <meta property="og:image" content="${escHtml(ogImage)}" />`,
    `  <meta property="og:image:alt" content="${escHtml(ogImageAlt)}" />`,
    `  <meta property="og:locale" content="en_US" />`,
    ...(hreflang ? [`  <meta property="og:locale:alternate" content="uk_UA" />`] : []),
    ...(ogType === 'profile' ? [
      `  <meta property="profile:first_name" content="Oleksandr" />`,
      `  <meta property="profile:last_name" content="Lutskov" />`,
      `  <meta property="profile:username" content="dellik95" />`
    ] : []),
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${escHtml(title)}" />`,
    `  <meta name="twitter:description" content="${escHtml(description)}" />`,
    `  <meta name="twitter:image" content="${escHtml(ogImage)}" />`,
    `  <script type="application/ld+json">\n${safeJsonLd(jsonLd)}\n  </script>`,
    '  <!-- OL_SEO_HEAD_END -->'
  ].filter(Boolean);

  return tags.join('\n');
}

function upsertSeoHeadBlock(html, seoBlock) {
  const reExisting = /<!-- OL_SEO_HEAD_START -->[\s\S]*?<!-- OL_SEO_HEAD_END -->/;
  if (reExisting.test(html)) {
    return html.replace(reExisting, seoBlock);
  }
  return html.replace(/<\/title>/i, `</title>\n  ${seoBlock}`);
}

function upsertSsrContainers(html, data, tplClass) {
  const slots = [
    'experience', 'education', 'languages', 'certifications',
    'education-languages-json', 'skills-backend', 'skills-frontend', 'skills-cloud', 'skills-bullets'
  ];
  let out = html;
  for (const slot of slots) {
    const rendered = renderSlotHtml(slot, data, tplClass);
    if (rendered == null) continue;
    const wrapped = `\n<!-- OL_SSR_START:${slot} -->\n${rendered}\n<!-- OL_SSR_END:${slot} -->\n`;

    const existingMarkerRe = new RegExp(`<!-- OL_SSR_START:${slot} -->[\\s\\S]*?<!-- OL_SSR_END:${slot} -->`, 'g');
    if (existingMarkerRe.test(out)) {
      out = out.replace(existingMarkerRe, `<!-- OL_SSR_START:${slot} -->\n${rendered}\n<!-- OL_SSR_END:${slot} -->`);
    } else {
      const emptyDivRe = new RegExp(`(<div\\b[^>]*\\bdata-render=["']${slot}["'][^>]*>)(\\s*<\\/div>)`, 'g');
      out = out.replace(emptyDivRe, `$1${wrapped}</div>`);
    }
  }
  return out;
}

export function syncSeoAndSsr(root, data) {
  const person = buildPersonEntity(data);
  const resumeDesc =
    'Oleksandr Lutskov — Senior Full Stack Software Engineer (9+ yrs, 2 yrs Tech Lead). .NET 11/C#, Angular 22, React.js, 190+ Microservices, AWS Serverless, Azure, AI Agents & Semantic Kernel. Creator of RedisGUI and Context Platform (Claudy).';
  const resumeKeywords = [
    'Oleksandr Lutskov', 'Senior Full Stack Software Engineer', '.NET Engineer', 'C#', 'ASP.NET Core',
    'Angular', 'React.js', 'TypeScript', 'Microservices', 'AWS Lambda', 'AWS Step Functions',
    'Azure Functions', 'Semantic Kernel', 'OpenAI', 'MCP', 'AI Agents', 'RedisGUI', 'Context Platform', 'Claudy',
    'Tree-sitter', 'SQLite FTS5', 'sqlite-vec', 'Playwright', 'RabbitMQ', 'Kafka', 'DynamoDB', 'Docker', 'Kubernetes', 'Tech Lead'
  ].join(', ');

  const ogResumeImg = `${PORTFOLIO_URL}assets/redis-gui/02_dashboard.png`;
  const resumeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${PORTFOLIO_URL}#webpage`,
        url: PORTFOLIO_URL,
        name: 'Oleksandr Lutskov — Senior Full Stack Software Engineer CV & Portfolio',
        description: resumeDesc,
        dateModified: data.meta?.updatedAt || '2026-11-14',
        inLanguage: ['en', 'uk'],
        mainEntity: { '@id': `${PORTFOLIO_URL}#person` }
      },
      person
    ]
  };

  // 1. All 10 templates
  for (const tpl of TEMPLATE_MAP) {
    const filePath = path.join(root, 'templates', tpl.file);
    let html = fs.readFileSync(filePath, 'utf8');
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = (titleMatch ? titleMatch[1] : 'Oleksandr Lutskov — Senior Full Stack Software Engineer').replace(/&amp;/g, '&').trim();

    const seoBlock = buildHeadSeoBlock({
      title,
      description: resumeDesc,
      keywords: resumeKeywords,
      canonicalUrl: PORTFOLIO_URL,
      ogType: 'profile',
      ogImage: ogResumeImg,
      ogImageAlt: 'Oleksandr Lutskov — Senior Full Stack Software Engineer & RedisGUI Architecture Showcase',
      themeColor: tpl.themeColor,
      hreflang: true,
      jsonLd: resumeJsonLd
    });

    html = upsertSeoHeadBlock(html, seoBlock);
    html = upsertSsrContainers(html, data, tpl.tplClass);
    fs.writeFileSync(filePath, html, 'utf8');
  }

  // 2. index.html hub
  const indexPath = path.join(root, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  const indexTitleMatch = indexHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const indexTitle = (indexTitleMatch ? indexTitleMatch[1] : 'Oleksandr Lutskov — Resume & Portfolio Switcher').replace(/&amp;/g, '&').trim();
  const hubJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${PORTFOLIO_URL}#hub`,
        url: PORTFOLIO_URL,
        name: indexTitle,
        description: resumeDesc,
        dateModified: data.meta?.updatedAt || '2026-11-14',
        about: { '@id': `${PORTFOLIO_URL}#person` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: TEMPLATE_MAP.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: t.label,
            url: `${PORTFOLIO_URL}templates/${t.file}`
          }))
        }
      },
      person
    ]
  };
  const indexSeoBlock = buildHeadSeoBlock({
    title: indexTitle,
    description: resumeDesc,
    keywords: resumeKeywords,
    canonicalUrl: PORTFOLIO_URL,
    ogType: 'website',
    ogImage: ogResumeImg,
    ogImageAlt: 'Oleksandr Lutskov — 10 Interactive CV & Engineering Portfolio Templates',
    themeColor: '#07080c',
    hreflang: true,
    jsonLd: hubJsonLd
  });
  indexHtml = upsertSeoHeadBlock(indexHtml, indexSeoBlock);
  fs.writeFileSync(indexPath, indexHtml, 'utf8');

  // 3. robots.txt + sitemap.xml (Portfolio root)
  const updatedDate = data.meta?.updatedAt || '2026-11-14';
  const robotsTxt = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${PORTFOLIO_URL}sitemap.xml`,
    ''
  ].join('\n');
  fs.writeFileSync(path.join(root, 'robots.txt'), robotsTxt, 'utf8');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${PORTFOLIO_URL}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${PORTFOLIO_URL}" />
    <xhtml:link rel="alternate" hreflang="uk" href="${PORTFOLIO_URL}?lang=uk" />
    <lastmod>${updatedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${PORTFOLIO_URL}?lang=uk</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${PORTFOLIO_URL}" />
    <xhtml:link rel="alternate" hreflang="uk" href="${PORTFOLIO_URL}?lang=uk" />
    <lastmod>${updatedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${PORTFOLIO_URL}CV_OleksandrLutskov_.NetFull-Stack.pdf</loc>
    <lastmod>${updatedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemapXml, 'utf8');
}
