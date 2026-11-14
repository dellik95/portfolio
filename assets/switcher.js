(function () {
  const TEMPLATES = [
    {
      id: '01-bento-glass',
      tplClass: 'tpl-01',
      nativeTheme: 'dark',
      num: '01',
      name: 'Bento Glass',
      tag: 'Linear / Raycast',
      file: '01-bento-glass.html',
      accent: '#8B5CF6'
    },
    {
      id: '02-terminal-ide',
      tplClass: 'tpl-02',
      nativeTheme: 'dark',
      num: '02',
      name: 'Terminal & IDE',
      tag: 'DevOps / Architecture',
      file: '02-terminal-ide.html',
      accent: '#10B981'
    },
    {
      id: '03-swiss-editorial',
      tplClass: 'tpl-03',
      nativeTheme: 'light',
      noTheme: true,
      num: '03',
      name: 'Swiss Editorial',
      tag: 'Minimalist / Print',
      file: '03-swiss-editorial.html',
      accent: '#DC382D'
    },
    {
      id: '04-nordic-fintech',
      tplClass: 'tpl-04',
      nativeTheme: 'light',
      num: '04',
      name: 'Stripe / FinTech',
      tag: 'Clean Enterprise',
      file: '04-nordic-fintech.html',
      accent: '#4F46E5'
    },
    {
      id: '05-executive-split',
      tplClass: 'tpl-05',
      nativeTheme: 'dark',
      num: '05',
      name: 'Executive Split',
      tag: 'Staff+ / Sticky Nav',
      file: '05-executive-split.html',
      accent: '#2DD4BF'
    },
    {
      id: '07-architect-sidebar-cv',
      tplClass: 'tpl-07',
      nativeTheme: 'light',
      num: '06',
      name: 'Classic Dossier CV',
      tag: '2-Column Sidebar + Skill Bars',
      file: '07-architect-sidebar-cv.html',
      accent: '#2563EB'
    },
    {
      id: '08-azure-cloud-portal',
      tplClass: 'tpl-08',
      nativeTheme: 'light',
      num: '07',
      name: 'Cloud Architect',
      tag: 'Fluent / AWS & Azure + MegaMenu',
      file: '08-azure-cloud-portal.html',
      accent: '#0066FF'
    },
    {
      id: '09-minimal-mono-craft',
      tplClass: 'tpl-09',
      nativeTheme: 'light',
      num: '08',
      name: 'Minimal Mono',
      tag: 'Apple / Geist + Dropdown',
      file: '09-minimal-mono-craft.html',
      accent: '#18181B'
    },
    {
      id: '10-interactive-tabbed-folio',
      tplClass: 'tpl-10',
      nativeTheme: 'dark',
      num: '09',
      name: 'Emerald Matrix',
      tag: 'Profile Card + Skill Matrix + Menu',
      file: '10-interactive-tabbed-folio.html',
      accent: '#10B981'
    },
    {
      id: '11-classic-pdf',
      tplClass: 'tpl-11',
      nativeTheme: 'light',
      noTheme: true,
      num: '10',
      name: 'Classic PDF',
      tag: 'Serif / Original A4 PDF Style',
      file: '11-classic-pdf.html',
      accent: '#575757'
    }
  ];

  let resumeData = window.__OL_RESUME_DATA__ || null;

  function escHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function pick(val, lang) {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val[lang] != null ? val[lang] : (val.en != null ? val.en : '');
  }

  function buildI18nDict(lang) {
    const d = resumeData;
    if (!d) return {};
    const p = d.profile || {};
    const u = d.ui || {};
    const pf = (d.portfolio && d.portfolio.featured) || {};
    const pr = (d.portfolio && d.portfolio.projects) || [];
    const ex = d.experience || [];
    const ed0 = (d.education && d.education[0]) || {};
    const ln = d.languages || [];

    const dict = {
      role: pick(p.role, lang),
      role_sub: pick(p.roleSub, lang),
      location: pick(p.location, lang),
      exp_badge: pick(p.expBadge, lang),
      summary_title: pick(u.summary_title, lang),
      summary_text: pick(p.summary, lang),
      skills_title: pick(u.skills_title, lang),
      exp_title: pick(u.exp_title, lang),
      portfolio_title: pick(u.portfolio_title, lang),
      portfolio_sub: pick(u.portfolio_sub, lang),
      edu_title: pick(u.edu_title, lang),
      lang_title: pick(u.lang_title, lang),
      cert_title: pick(u.cert_title, lang),
      certs_title: pick(u.cert_title, lang),
      contact_title: pick(u.contact_title, lang),
      download_cv: pick(u.download_cv, lang),
      open_landing_cta: pick(u.open_landing_cta, lang),
      github_cta: pick(u.github_cta, lang),
      photo_hint: pick(u.photo_hint, lang),
      edu_uni: pick(ed0.institution, lang),
      edu_degree: pick(ed0.degree, lang),
      lang_uk: ln[0] ? `${pick(ln[0].name, lang)} — ${pick(ln[0].level, lang)}` : '',
      lang_en: ln[1] ? `${pick(ln[1].name, lang)} — ${pick(ln[1].level, lang)}` : '',
      rg_badge: pick(pf.badge, lang),
      rg_title: pick(pf.title, lang),
      rg_desc: pick(pf.description, lang)
    };

    const fArr = pick(pf.features, lang) || [];
    fArr.forEach((txt, idx) => { dict[`rg_f${idx + 1}`] = txt; });

    const projPrefixes = ['tm', 'cl', 'yt'];
    pr.forEach((item, idx) => {
      const k = projPrefixes[idx];
      if (!k) return;
      dict[`${k}_badge`] = pick(item.badge, lang);
      dict[`${k}_title`] = pick(item.title, lang);
      dict[`${k}_desc`] = pick(item.description, lang);
    });

    const expPrefixes = ['da', 'fp', 'gl', 'rz', 'av'];
    ex.forEach((job, idx) => {
      const k = expPrefixes[idx];
      if (!k) return;
      dict[`${k}_role`] = pick(job.role, lang);
      dict[`${k}_date`] = pick(job.period, lang);
      if (job.domain) {
        dict[`${k}_domain`] = pick(job.domain, lang);
        dict[`${k}_desc`] = pick(job.domain, lang);
      }
      const bullets = pick(job.bullets, lang) || [];
      bullets.forEach((b, bIdx) => { dict[`${k}_b${bIdx + 1}`] = b; });
    });

    return dict;
  }

  function renderEducationLanguagesJson(container, lang) {
    const d = resumeData;
    if (!d) return;
    const eduItems = d.education || [];
    const langItems = d.languages || [];
    const eduHtml = eduItems.map((ed, idx) => {
      const comma = idx < eduItems.length - 1 ? ',' : '';
      const inst = escHtml(pick(ed.institution, lang));
      const deg = escHtml(pick(ed.degree, lang));
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
        `      <span class="ol-jk">"language"</span>: <span class="ol-js3">"${escHtml(pick(ln.name, lang))}"</span>,`,
        `      <span class="ol-jk">"level"</span>: <span class="ol-js2">"${escHtml(pick(ln.level, lang))}"</span>`,
        `    }${comma}`
      ].join('\n');
    }).join('\n');

    container.innerHTML = [
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

  function renderEducationList(container, lang, tplClass) {
    const items = (resumeData && resumeData.education) || [];
    container.innerHTML = `<div class="ol-edu-list">${items.map((ed) => {
      const inst = escHtml(pick(ed.institution, lang));
      const deg = escHtml(pick(ed.degree, lang));
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

  function renderLanguagesList(container, lang, tplClass) {
    const items = (resumeData && resumeData.languages) || [];
    if (tplClass === 'tpl-11') {
      container.innerHTML = `<ul class="pdf-bullet-list">${items.map((ln) => `<li>${escHtml(pick(ln.name, lang))} — ${escHtml(pick(ln.level, lang))}</li>`).join('')}</ul>`;
      return;
    }
    if (tplClass === 'tpl-07') {
      container.innerHTML = items.map((ln) => {
        const label = `${escHtml(pick(ln.name, lang))} — ${escHtml(pick(ln.level, lang))}`;
        const pct = Number(ln.proficiency) || 80;
        return `<div class="sb-bar-item">
          <div class="sb-bar-head"><span>${label}</span><span>${pct}%</span></div>
          <div class="sb-bar-track"><div class="sb-bar-fill ol-anim-bar ol-bar-filled" style="width:${pct}%;"></div></div>
        </div>`;
      }).join('');
      return;
    }
    if (tplClass === 'tpl-04' || tplClass === 'tpl-05' || tplClass === 'tpl-09') {
      const pillCls = tplClass === 'tpl-04' ? 'chip indigo' : (tplClass === 'tpl-05' ? 'teal-tag' : 'm-pill');
      container.innerHTML = `<div class="ol-lang-pills">${items.map((ln, idx) => {
        const cls = tplClass === 'tpl-04' && idx > 0 ? 'chip' : pillCls;
        return `<span class="${cls}">${escHtml(pick(ln.name, lang))} — ${escHtml(pick(ln.level, lang))}</span>`;
      }).join('')}</div>`;
      return;
    }
    container.innerHTML = `<div class="ol-lang-rows">${items.map((ln) => `
      <div class="ol-lang-row">
        <strong>${escHtml(pick(ln.name, lang))}</strong>
        <span>${escHtml(pick(ln.level, lang))}</span>
      </div>
    `).join('')}</div>`;
  }

  function renderCertificationsList(container, lang) {
    const d = resumeData;
    if (!d) return;
    const certs = d.certifications || [];
    const u = d.ui || {};
    const showCredTxt = escHtml(pick(u.show_credential, lang) || 'Show credential ↗');
    const issuedTxt = escHtml(pick(u.issued_label, lang) || 'Issued');
    const credIdTxt = escHtml(pick(u.credential_id_label, lang) || 'Credential ID');
    const skillsTxt = escHtml(pick(u.skills_label, lang) || 'Skills');

    container.innerHTML = `<div class="ol-cert-grid">${certs.map((c) => {
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

  function renderExperienceList(container, lang, tplClass) {
    const jobs = (resumeData && resumeData.experience) || [];
    container.innerHTML = jobs.map((job, idx) => {
      const co = escHtml(job.company);
      const role = escHtml(pick(job.role, lang));
      const period = escHtml(pick(job.period, lang));
      const domain = job.domain ? escHtml(pick(job.domain, lang)) : '';
      const bullets = (pick(job.bullets, lang) || []).map((b) => `<li>${escHtml(b)}</li>`).join('');
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
        const techLabel = lang === 'uk' ? 'Технології' : 'Technologies';
        return `<article class="pdf-exp-item">
          <h3 class="pdf-exp-role">${role}</h3>
          <div class="pdf-exp-meta">${co} | ${period}</div>
          ${domain ? `<p class="pdf-exp-domain">${domain}</p>` : ''}
          <ul class="pdf-bullet-list">${bullets}</ul>
          ${tags.length ? `<p class="pdf-exp-tech"><em>${techLabel}: ${tags.map(escHtml).join(', ')}</em></p>` : ''}
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

  function renderStructuredBlocks(lang) {
    if (!resumeData) return;
    const meta = getCurrentTemplateMeta();
    const tplClass = (meta && meta.tplClass) || '';
    const d = resumeData;

    document.querySelectorAll('[data-render="education-languages-json"]').forEach((el) => renderEducationLanguagesJson(el, lang));
    document.querySelectorAll('[data-render="education"]').forEach((el) => renderEducationList(el, lang, tplClass));
    document.querySelectorAll('[data-render="languages"]').forEach((el) => renderLanguagesList(el, lang, tplClass));
    document.querySelectorAll('[data-render="certifications"]').forEach((el) => renderCertificationsList(el, lang));
    document.querySelectorAll('[data-render="experience"]').forEach((el) => renderExperienceList(el, lang, tplClass));

    const skillGroups = {
      'skills-backend': (d.skills && d.skills.backend) || [],
      'skills-frontend': (d.skills && d.skills.frontend) || [],
      'skills-cloud': (d.skills && d.skills.cloudAndData) || []
    };
    const tagClassMap = {
      'tpl-01': 'tech-pill',
      'tpl-02': 'code-tag',
      'tpl-03': 's-tag',
      'tpl-04': 'chip',
      'tpl-05': 'teal-tag',
      'tpl-07': 'tl-tag',
      'tpl-08': 'c-badge',
      'tpl-09': 'm-pill',
      'tpl-10': 'em-tag'
    };
    const tCls = tagClassMap[tplClass] || 'code-tag';
    Object.entries(skillGroups).forEach(([slot, items]) => {
      document.querySelectorAll(`[data-render="${slot}"]`).forEach((el) => {
        el.innerHTML = items.map((s) => `<span class="${tCls}">${escHtml(s)}</span>`).join('');
      });
    });

    document.querySelectorAll('[data-render="skills-bullets"]').forEach((el) => {
      const sk = (d && d.skills) || {};
      const lines = [];
      [sk.backend, sk.frontend, sk.cloudAndData].forEach((arr) => {
        if (!Array.isArray(arr) || !arr.length) return;
        for (let i = 0; i < arr.length; i += 3) {
          lines.push(arr.slice(i, i + 3).map(escHtml).join(', '));
        }
      });
      el.innerHTML = `<ul class="pdf-bullet-list">${lines.map((line) => `<li>${line}</li>`).join('')}</ul>`;
    });

    if (d.profile && d.profile.contacts) {
      const c = d.profile.contacts;
      document.querySelectorAll('[data-contact="email"]').forEach((a) => {
        a.href = `mailto:${c.email}`;
      });
      document.querySelectorAll('[data-contact="phone"]').forEach((a) => {
        a.href = `tel:${c.phone}`;
      });
      document.querySelectorAll('[data-contact="github"]').forEach((a) => {
        a.href = c.github;
      });
      document.querySelectorAll('[data-contact="linkedin"]').forEach((a) => {
        a.href = c.linkedin;
      });
      document.querySelectorAll('[data-contact="telegram"]').forEach((a) => {
        a.href = c.telegram;
      });
      document.querySelectorAll('[data-contact="youtube"]').forEach((a) => {
        if (c.youtube) a.href = c.youtube;
      });
    }
  }

  function syncPrintBackground() {
    const printBg = document.getElementById('ol-print-page-bg');
    if (!printBg) return;
    const bodyStyle = window.getComputedStyle(document.body);
    printBg.style.backgroundColor = bodyStyle.backgroundColor;
    printBg.style.backgroundImage = bodyStyle.backgroundImage;
  }

  function getCurrentTemplateMeta() {
    const metaEl = document.querySelector('meta[name="ol-template-file"]');
    const metaFile = metaEl ? metaEl.getAttribute('content') : '';
    const currentFile = metaFile || window.location.pathname.split('/').pop() || 'index.html';
    return TEMPLATES.find((t) => t.file === currentFile) || null;
  }

  function isPhotoLocked() {
    const isStandalone = !!document.querySelector('meta[name="ol-standalone-resume"]');
    const host = window.location.hostname || '';
    const isRemoteHttp = window.location.protocol.startsWith('http') &&
      host !== '' &&
      !/^(localhost|127\.0\.0\.1)$/i.test(host);
    return isStandalone || isRemoteHttp;
  }

  function getCurrentTheme() {
    const meta = getCurrentTemplateMeta();
    if (meta && meta.noTheme) return meta.nativeTheme || 'light';
    try {
      const saved = localStorage.getItem('ol_cv_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    return (meta && meta.nativeTheme) || 'light';
  }

  function setTheme(theme, persist = true) {
    const meta = getCurrentTemplateMeta();
    const effective = (meta && meta.noTheme) ? (meta.nativeTheme || 'light') : theme;
    if (effective !== 'light' && effective !== 'dark') return;
    if (persist && !(meta && meta.noTheme)) {
      try {
        localStorage.setItem('ol_cv_theme', effective);
      } catch (e) {}
    }
    document.documentElement.setAttribute('data-theme', effective);
    document.querySelectorAll('[data-theme-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === effective);
    });
    // Re-sync full-bleed print background layer after styles recompute
    window.requestAnimationFrame(syncPrintBackground);
    if (window.self !== window.top && window.parent) {
      try {
        window.parent.postMessage({ type: 'OL_THEME_STATE', theme: effective }, '*');
      } catch (e) {}
    }
  }

  function getCurrentLang() {
    try {
      const qLang = new URLSearchParams(window.location.search).get('lang');
      if (qLang === 'en' || qLang === 'uk') return qLang;
    } catch (e) {}
    try {
      return localStorage.getItem('ol_cv_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function setLanguage(lang) {
    try {
      localStorage.setItem('ol_cv_lang', lang);
    } catch (e) {}
    document.documentElement.setAttribute('lang', lang);
    renderStructuredBlocks(lang);
    const dict = buildI18nDict(lang);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const isAct = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('active', isAct);
    });
  }

  function loadLiveResumeJson() {
    if (!window.location.protocol.startsWith('http')) return;
    const isInTemplatesDir = window.location.pathname.replace(/\\/g, '/').includes('/templates/');
    const jsonUrl = isInTemplatesDir ? '../data/resume-data.json' : 'data/resume-data.json';
    fetch(jsonUrl, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json) return;
        resumeData = json;
        window.__OL_RESUME_DATA__ = json;
        setLanguage(getCurrentLang());
      })
      .catch(() => {});
  }

  function initPhotoSlots() {
    if (isPhotoLocked()) {
      document.documentElement.classList.add('ol-photo-locked');
      document.querySelectorAll('.ol-photo-slot').forEach((slot) => {
        slot.style.cursor = 'default';
        slot.removeAttribute('title');
      });
      return;
    }

    let fileInput = document.getElementById('ol-hidden-photo-input');
    if (!fileInput) {
      fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.id = 'ol-hidden-photo-input';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
          try {
            localStorage.setItem('ol_profile_photo', ev.target.result);
          } catch (err) {}
          applySavedPhoto(ev.target.result);
        };
        reader.readAsDataURL(file);
      });
    }

    document.querySelectorAll('.ol-photo-slot').forEach((slot) => {
      slot.style.cursor = 'pointer';
      slot.title = 'Click to upload your photo (persists across all templates)';
      slot.addEventListener('click', () => fileInput.click());
    });

    try {
      const savedPhoto = localStorage.getItem('ol_profile_photo');
      if (savedPhoto) {
        applySavedPhoto(savedPhoto);
      }
    } catch (e) {}
  }

  function applySavedPhoto(dataUrl) {
    document.querySelectorAll('.ol-photo-slot').forEach((slot) => {
      if (!dataUrl) return;
      slot.classList.add('has-photo');
      let img = slot.querySelector('img.ol-uploaded-img');
      if (!img) {
        img = document.createElement('img');
        img.className = 'ol-uploaded-img';
        img.alt = 'Oleksandr Lutskov';
        slot.appendChild(img);
      }
      img.src = dataUrl;
    });
  }

  function openProjectModal(projectId) {
    const remoteLandingUrl = (resumeData && resumeData.portfolio && resumeData.portfolio.featured && resumeData.portfolio.featured.landingUrl) || 'https://dellik95.github.io/redis-gui/';
    const redisLandingUrl = remoteLandingUrl;

    if (projectId === 'redis-gui') {
      const win = window.open(redisLandingUrl, '_blank', 'noopener');
      if (!win) {
        window.location.href = redisLandingUrl;
      }
      return;
    }

    let modal = document.getElementById('ol-project-landing-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ol-project-landing-modal';
      modal.innerHTML = `
        <div class="ol-modal-backdrop" id="ol-modal-close-bg"></div>
        <div class="ol-modal-dialog" role="dialog" aria-modal="true">
          <div class="ol-modal-header">
            <div class="ol-modal-title-wrap">
              <span class="ol-modal-pill">PORTFOLIO &amp; ENGINEERING SYSTEMS</span>
              <h3>RedisStudio V2.2 &amp; Engineering Showcase</h3>
            </div>
            <button class="ol-modal-close" id="ol-modal-close-btn" aria-label="Close">&times;</button>
          </div>
          <div class="ol-modal-body">
            <p class="ol-modal-lead">
              Повноцінний інтерактивний лендінг <strong>RedisStudio V2.2 (RedisGUI)</strong> із паралаксом, перекриттями, симулятором CLI та детальним оглядом усіх 4 скриншотів уже доступний!
            </p>
            <div class="ol-modal-shots">
              <div class="ol-shot-card">
                <img src="../assets/redis-gui/03_storage_table.png" onerror="this.src='assets/redis-gui/03_storage_table.png'" alt="Storage Table View">
                <span>01. Storage Manager (Virtual Table & Live Telemetry)</span>
              </div>
              <div class="ol-shot-card">
                <img src="../assets/redis-gui/02_dashboard.png" onerror="this.src='assets/redis-gui/02_dashboard.png'" alt="Dashboard">
                <span>02. Real-Time SignalR Observability Dashboard</span>
              </div>
              <div class="ol-shot-card">
                <img src="../assets/redis-gui/05_stream_visual_editor.png" onerror="this.src='assets/redis-gui/05_stream_visual_editor.png'" alt="Stream Editor">
                <span>03. Strategy-Pattern Visual Data Structure Editors</span>
              </div>
              <div class="ol-shot-card">
                <img src="../assets/redis-gui/10_redis_cli_drawer.png" onerror="this.src='assets/redis-gui/10_redis_cli_drawer.png'" alt="CLI Drawer">
                <span>04. Interactive Multi-DB CLI Terminal & Load Tester</span>
              </div>
            </div>
          </div>
          <div class="ol-modal-footer">
            <a href="https://github.com/dellik95" target="_blank" rel="noopener" class="ol-btn-gh">GitHub (@dellik95) ↗</a>
            <a href="${redisLandingUrl}" class="ol-btn-primary">Відкрити лендінг RedisGUI →</a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('ol-modal-close-bg').addEventListener('click', () => modal.classList.remove('open'));
      document.getElementById('ol-modal-close-btn').addEventListener('click', () => modal.classList.remove('open'));
    }
    modal.classList.add('open');
  }

  window.OLPortfolio = {
    setLanguage,
    getCurrentLang,
    setTheme,
    getCurrentTheme,
    openProjectModal,
    applySavedPhoto,
    TEMPLATES
  };

  function injectSwitcherToolbar() {
    const isIframe = window.self !== window.top;
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const isInTemplatesDir = window.location.pathname.replace(/\\/g, '/').includes('/templates/');
    const prefix = isInTemplatesDir ? '' : 'templates/';
    const hubHref = isInTemplatesDir ? '../index.html' : 'index.html';
    const meta = getCurrentTemplateMeta();
    if (meta && meta.tplClass) {
      document.documentElement.classList.add(meta.tplClass);
    }

    // Create full-bleed print background layer that mirrors body background on every printed page
    const printBg = document.createElement('div');
    printBg.id = 'ol-print-page-bg';
    document.body.prepend(printBg);
    window.addEventListener('beforeprint', syncPrintBackground);

    const style = document.createElement('style');
    style.textContent = `
      [data-i18n="summary_text"] {
        white-space: pre-line;
      }

      #ol-print-page-bg {
        display: none;
      }

      /* Universal Photo Slot Styling */
      .ol-photo-slot {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        user-select: none;
        transition: all 0.22s ease;
      }
      .ol-photo-slot img.ol-uploaded-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 2;
      }
      .ol-photo-slot .ol-photo-overlay {
        position: absolute;
        inset: 0;
        background: rgba(10, 12, 20, 0.65);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 600;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 3;
        padding: 8px;
      }
      .ol-photo-slot:hover .ol-photo-overlay {
        opacity: 1;
      }
      html.ol-photo-locked .ol-photo-slot {
        cursor: default !important;
      }
      html.ol-photo-locked .ol-photo-overlay,
      html.ol-photo-locked [data-i18n="photo_hint"] {
        display: none !important;
      }

      /* Native Header Actions (Theme / Language / Print) Styled Per Template */
      .ol-hdr-actions {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        flex-wrap: wrap;
      }
      .ol-hdr-seg {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 2px;
      }
      .ol-hdr-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        border: 1px solid transparent;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        font-size: 11.5px;
        font-weight: 600;
        line-height: 1;
        transition: all 0.16s ease;
        white-space: nowrap;
      }
      body.in-iframe .ol-hdr-actions {
        display: none !important;
      }

      /* tpl-01: Bento Glass Header Actions */
      html.tpl-01 .ol-hdr-actions { margin-left: auto; margin-right: 4px; }
      html.tpl-01 .ol-hdr-seg {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border);
        border-radius: 10px;
      }
      html.tpl-01 .ol-hdr-btn {
        color: var(--text-muted);
        padding: 5px 8px;
        border-radius: 7px;
      }
      html.tpl-01 .ol-hdr-btn:hover { color: var(--text); background: rgba(255, 255, 255, 0.08); }
      html.tpl-01 .ol-hdr-btn.active {
        background: rgba(139, 92, 246, 0.24);
        border-color: rgba(139, 92, 246, 0.45);
        color: #fff;
      }
      html.tpl-01 .ol-hdr-print {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--border);
        border-radius: 10px;
        color: var(--text);
        padding: 7px 11px;
      }
      html.tpl-01 .ol-hdr-print:hover {
        border-color: var(--border-hi);
        background: rgba(139, 92, 246, 0.14);
      }
      html.tpl-01[data-theme="light"] .ol-hdr-seg,
      html.tpl-01[data-theme="light"] .ol-hdr-print {
        background: rgba(15, 23, 42, 0.04);
        border-color: var(--border);
        color: #334155;
      }
      html.tpl-01[data-theme="light"] .ol-hdr-btn.active {
        background: #ede9fe;
        border-color: #c4b5fd;
        color: #5b21b6;
      }

      /* tpl-02: Terminal & IDE Titlebar Actions */
      html.tpl-02 .ol-hdr-actions {
        font-family: 'JetBrains Mono', monospace;
        gap: 6px;
      }
      html.tpl-02 .ol-hdr-seg {
        background: #0d1117;
        border: 1px solid var(--border);
        border-radius: 6px;
      }
      html.tpl-02 .ol-hdr-btn {
        color: var(--text-muted);
        padding: 4px 7px;
        border-radius: 4px;
        font-size: 11px;
      }
      html.tpl-02 .ol-hdr-btn:hover { color: #fff; background: rgba(56, 189, 248, 0.12); }
      html.tpl-02 .ol-hdr-btn.active {
        background: rgba(16, 185, 129, 0.18);
        border-color: rgba(16, 185, 129, 0.45);
        color: #34d399;
      }
      html.tpl-02 .ol-hdr-print {
        background: #0d1117;
        border: 1px solid var(--border);
        border-radius: 6px;
        color: var(--cyan);
        padding: 5px 9px;
        font-size: 11px;
      }
      html.tpl-02 .ol-hdr-print:hover {
        border-color: var(--cyan);
        color: #fff;
      }
      html.tpl-02[data-theme="light"] .ol-hdr-seg,
      html.tpl-02[data-theme="light"] .ol-hdr-print {
        background: #ffffff;
        border-color: #cbd5e1;
        color: #0f172a;
      }
      html.tpl-02[data-theme="light"] .ol-hdr-btn:hover {
        color: #0284c7;
        background: #e0f2fe;
      }
      html.tpl-02[data-theme="light"] .ol-hdr-btn.active {
        background: #ecfdf5;
        border-color: #a7f3d0;
        color: #047857;
      }
      html.tpl-02[data-theme="light"] .ol-hdr-print {
        color: #0284c7;
      }

      /* tpl-03: Swiss Editorial Masthead Actions */
      html.tpl-03 .masthead > .m-col-3 {
        flex-wrap: wrap;
        gap: 6px 10px;
      }
      html.tpl-03 .ol-hdr-actions {
        font-family: 'JetBrains Mono', monospace;
        gap: 5px;
      }
      html.tpl-03 .ol-hdr-seg {
        border: 1px solid var(--ink);
        border-radius: 0;
        padding: 1px;
        background: transparent;
      }
      html.tpl-03 .ol-hdr-btn {
        color: var(--ink);
        padding: 3px 6px;
        border-radius: 0;
        font-size: 10.5px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      html.tpl-03 .ol-hdr-btn:hover { background: rgba(220, 56, 45, 0.12); color: var(--vermilion); }
      html.tpl-03 .ol-hdr-btn.active {
        background: var(--ink);
        color: var(--paper);
      }
      html.tpl-03 .ol-hdr-print {
        border: 1px solid var(--ink);
        border-radius: 0;
        padding: 4px 8px;
        font-size: 10.5px;
      }
      html.tpl-03 .ol-hdr-print:hover {
        background: var(--vermilion);
        border-color: var(--vermilion);
        color: #fff;
      }

      /* tpl-04: Nordic FinTech (Stripe) Navbar Actions */
      html.tpl-04 .ol-hdr-actions { margin-left: auto; margin-right: 4px; }
      html.tpl-04 .ol-hdr-seg {
        background: var(--surface-subtle);
        border: 1px solid var(--border);
        border-radius: 8px;
      }
      html.tpl-04 .ol-hdr-btn {
        color: var(--text-muted);
        padding: 5px 8px;
        border-radius: 6px;
      }
      html.tpl-04 .ol-hdr-btn:hover { color: var(--text-main); }
      html.tpl-04 .ol-hdr-btn.active {
        background: var(--surface);
        color: var(--indigo);
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
        border-color: var(--border);
      }
      html.tpl-04 .ol-hdr-print {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 8px;
        color: var(--text-main);
        padding: 6px 11px;
      }
      html.tpl-04 .ol-hdr-print:hover {
        border-color: var(--indigo);
        color: var(--indigo);
      }

      /* tpl-05: Executive Split Left-Pane Header Actions */
      html.tpl-05 .ol-hdr-actions {
        margin-bottom: 14px;
        width: 100%;
      }
      html.tpl-05 .ol-hdr-seg {
        background: var(--slate-card);
        border: 1px solid var(--border);
        border-radius: 999px;
      }
      html.tpl-05 .ol-hdr-btn {
        color: var(--text-mid);
        padding: 4px 9px;
        border-radius: 999px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
      }
      html.tpl-05 .ol-hdr-btn:hover { color: var(--text-hi); }
      html.tpl-05 .ol-hdr-btn.active {
        background: rgba(45, 212, 191, 0.16);
        border-color: rgba(45, 212, 191, 0.45);
        color: var(--teal);
      }
      html.tpl-05 .ol-hdr-print {
        background: var(--slate-card);
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--text-hi);
        padding: 5px 11px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
      }
      html.tpl-05 .ol-hdr-print:hover {
        border-color: var(--teal);
        color: var(--teal);
      }
      html.tpl-05[data-theme="light"] .ol-hdr-btn.active {
        background: #f0fdfa;
        border-color: #5eead4;
        color: #0f766e;
      }

      /* tpl-07: Executive Dossier Top-Bar Actions */
      html.tpl-07 .ol-hdr-seg {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 6px;
      }
      html.tpl-07 .ol-hdr-btn {
        color: #cbd5e1;
        padding: 5px 8px;
        border-radius: 4px;
        font-size: 11.5px;
      }
      html.tpl-07 .ol-hdr-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.1); }
      html.tpl-07 .ol-hdr-btn.active {
        background: #2563eb;
        color: #fff;
      }
      html.tpl-07 .ol-hdr-print {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 6px;
        color: #fff;
        padding: 6px 10px;
      }
      html.tpl-07 .ol-hdr-print:hover { background: rgba(255, 255, 255, 0.2); }

      /* tpl-08: Cloud Architect Portal Top-Bar Actions */
      html.tpl-08 .ol-hdr-seg {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
      }
      html.tpl-08 .ol-hdr-btn {
        color: rgba(255, 255, 255, 0.85);
        padding: 5px 8px;
        border-radius: 4px;
        font-size: 11.5px;
      }
      html.tpl-08 .ol-hdr-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.14); }
      html.tpl-08 .ol-hdr-btn.active {
        background: #ffffff;
        color: #0f172a;
      }
      html.tpl-08 .ol-hdr-print {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 6px;
        color: #fff;
        padding: 6px 10px;
      }
      html.tpl-08 .ol-hdr-print:hover { background: rgba(255, 255, 255, 0.22); }

      /* tpl-09: Minimal Mono Craft Nav Actions */
      html.tpl-09 .ol-hdr-seg {
        background: transparent;
        border: 1px solid var(--border);
        border-radius: 8px;
      }
      html.tpl-09 .ol-hdr-btn {
        color: var(--muted);
        padding: 5px 8px;
        border-radius: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
      }
      html.tpl-09 .ol-hdr-btn:hover { color: var(--ink); }
      html.tpl-09 .ol-hdr-btn.active {
        background: var(--ink);
        color: var(--bg);
      }
      html.tpl-09 .ol-hdr-print {
        background: transparent;
        border: 1px solid var(--border);
        border-radius: 8px;
        color: var(--ink);
        padding: 6px 10px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
      }
      html.tpl-09 .ol-hdr-print:hover {
        border-color: var(--ink);
      }

      /* tpl-10: Emerald Engineering Matrix Header Actions */
      html.tpl-10 .ol-hdr-seg {
        background: var(--card);
        border: 1px solid var(--border-dim);
        border-radius: 8px;
      }
      html.tpl-10 .ol-hdr-btn {
        color: var(--muted);
        padding: 5px 8px;
        border-radius: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
      }
      html.tpl-10 .ol-hdr-btn:hover { color: var(--text); }
      html.tpl-10 .ol-hdr-btn.active {
        background: var(--emerald-soft);
        border-color: var(--border);
        color: var(--emerald);
      }
      html.tpl-10 .ol-hdr-print {
        background: var(--card);
        border: 1px solid var(--border-dim);
        border-radius: 8px;
        color: var(--text);
        padding: 6px 10px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
      }
      html.tpl-10 .ol-hdr-print:hover {
        border-color: var(--emerald);
        color: var(--emerald);
      }

      /* Structured Education, Languages & Certifications Blocks */
      .ol-json-body {
        margin: 0;
        padding-left: 0;
        font-family: inherit;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        line-height: 1.55;
        font-size: 12px;
        color: #cbd5e1;
      }
      .ol-json-obj { padding-left: 8px; }
      .ol-jk { color: #93c5fd; }
      .ol-js { color: #fde047; }
      .ol-js2 { color: #38bdf8; }
      .ol-js3 { color: #6ee7b7; }
      .ol-jn { color: #c084fc; }
      .ol-jurl { color: #38bdf8; text-decoration: none; border-bottom: 1px dashed rgba(56,189,248,0.45); }
      .ol-jurl:hover { color: #6ee7b7; border-bottom-color: #6ee7b7; }
      html.tpl-02[data-theme="light"] .ol-json-body { color: #334155; }
      html.tpl-02[data-theme="light"] .ol-jk { color: #1d4ed8; }
      html.tpl-02[data-theme="light"] .ol-js { color: #b45309; }
      html.tpl-02[data-theme="light"] .ol-js2 { color: #0284c7; }
      html.tpl-02[data-theme="light"] .ol-js3 { color: #047857; }
      html.tpl-02[data-theme="light"] .ol-jn { color: #7c3aed; }
      html.tpl-02[data-theme="light"] .ol-jurl { color: #0284c7; }

      .ol-edu-list { display: grid; gap: 12px; }
      .ol-edu-item {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.16);
      }
      .ol-edu-item:last-child { padding-bottom: 0; border-bottom: none; }
      .ol-edu-top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 6px 12px;
      }
      .ol-edu-inst { font-size: 15px; font-weight: 700; color: inherit; }
      .ol-edu-link { color: inherit; text-decoration: none; border-bottom: 1px dotted currentColor; }
      .ol-edu-link:hover { opacity: 0.85; }
      .ol-edu-period {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11.5px;
        opacity: 0.78;
      }
      .ol-edu-deg { font-size: 13.5px; margin-top: 2px; opacity: 0.88; font-weight: 600; }
      .sb-edu-item .ol-edu-inst { font-size: 13px; }
      .sb-edu-item .ol-edu-deg { font-size: 12px; color: #94a3b8; font-weight: 500; }
      .sb-edu-item .ol-edu-period { font-size: 11px; color: #64748b; margin-top: 2px; }
      html.tpl-07[data-theme="light"] .sb-edu-item .ol-edu-deg { color: #475569; }
      html.tpl-07[data-theme="light"] .sb-edu-item { border-bottom-color: rgba(37, 99, 235, 0.15); }

      .ol-lang-rows { display: grid; gap: 8px; }
      .ol-lang-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        font-size: 13.5px;
      }
      .ol-lang-pills { display: flex; flex-wrap: wrap; gap: 6px; }

      .ol-cert-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }
      @media screen and (max-width: 780px) {
        .ol-cert-grid { grid-template-columns: 1fr; }
      }
      .ol-cert-card {
        padding: 16px 18px;
        border-radius: 10px;
        border: 1px solid rgba(148, 163, 184, 0.22);
        background: rgba(148, 163, 184, 0.05);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
      }
      .ol-cert-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
      }
      .ol-cert-issuer {
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 4px;
        background: rgba(56, 189, 248, 0.14);
        color: #38bdf8;
      }
      .ol-cert-date { opacity: 0.72; }
      .ol-cert-title {
        font-size: 15px;
        font-weight: 700;
        line-height: 1.35;
      }
      .ol-cert-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .ol-cert-btn {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11.5px;
        font-weight: 600;
        text-decoration: none;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid rgba(56, 189, 248, 0.35);
        color: #38bdf8;
      }
      .ol-cert-btn:hover { background: rgba(56, 189, 248, 0.14); }
      .ol-cert-id {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        opacity: 0.75;
      }
      .ol-cert-skills { display: flex; flex-wrap: wrap; gap: 5px; }
      .ol-cert-skill {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 999px;
        border: 1px solid rgba(148, 163, 184, 0.28);
        text-decoration: none;
        color: inherit;
        opacity: 0.85;
      }
      a.ol-cert-skill:hover { opacity: 1; border-color: #38bdf8; }

      /* Per-template native certificate card harmonization */
      html.tpl-01 .ol-cert-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 16px;
      }
      html.tpl-01 .ol-cert-issuer { background: rgba(139, 92, 246, 0.16); color: #c4b5fd; }
      html.tpl-01[data-theme="light"] .ol-cert-issuer { background: #ede9fe; color: #6d28d9; }
      html.tpl-01[data-theme="light"] .ol-cert-btn { color: #6d28d9; border-color: #c4b5fd; }

      html.tpl-02 .ol-cert-card {
        background: #0d1117;
        border: 1px solid var(--border);
        border-radius: 10px;
      }
      html.tpl-02 .ol-cert-title { color: #fff; }
      html.tpl-02 .ol-cert-issuer { background: rgba(16, 185, 129, 0.14); color: #34d399; }
      html.tpl-02[data-theme="light"] .ol-cert-card { background: #ffffff; border-color: #cbd5e1; }
      html.tpl-02[data-theme="light"] .ol-cert-title { color: #0f172a; }
      html.tpl-02[data-theme="light"] .ol-cert-issuer { background: #ecfdf5; color: #047857; }
      html.tpl-02[data-theme="light"] .ol-cert-btn { color: #0284c7; border-color: #bae6fd; }

      html.tpl-03 .ol-cert-card {
        border-radius: 0;
        border: 1px solid var(--ink);
        background: transparent;
      }
      html.tpl-03 .ol-cert-issuer { background: transparent; color: var(--vermilion); padding: 0; }
      html.tpl-03 .ol-cert-btn { border-radius: 0; border-color: var(--ink); color: var(--ink); }

      html.tpl-04 .ol-cert-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 12px;
      }
      html.tpl-04 .ol-cert-issuer { background: var(--indigo-soft); color: var(--indigo); }
      html.tpl-04 .ol-cert-btn { color: var(--indigo); border-color: rgba(79, 70, 229, 0.35); }

      html.tpl-05 .ol-cert-card {
        background: var(--slate-card);
        border: 1px solid var(--border);
        border-radius: 12px;
      }
      html.tpl-05 .ol-cert-issuer { background: rgba(45, 212, 191, 0.14); color: var(--teal); }
      html.tpl-05 .ol-cert-btn { color: var(--teal); border-color: rgba(45, 212, 191, 0.4); }

      html.tpl-07 .ol-cert-card {
        background: var(--main-bg);
        border: 1px solid var(--border);
        border-radius: 10px;
      }
      html.tpl-07 .ol-cert-issuer { background: rgba(37, 99, 235, 0.12); color: #2563eb; }
      html.tpl-07[data-theme="dark"] .ol-cert-issuer { color: #93c5fd; }
      html.tpl-07 .ol-cert-btn { color: #2563eb; border-color: rgba(37, 99, 235, 0.35); }
      html.tpl-07[data-theme="dark"] .ol-cert-btn { color: #93c5fd; }

      html.tpl-08 .ol-cert-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 10px;
      }
      html.tpl-08 .ol-cert-issuer { background: rgba(0, 102, 255, 0.12); color: var(--blue); }
      html.tpl-08 .ol-cert-btn { color: var(--blue); border-color: rgba(0, 102, 255, 0.35); }

      html.tpl-09 .ol-cert-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 10px;
      }
      html.tpl-09 .ol-cert-issuer { background: rgba(16, 185, 129, 0.12); color: var(--emerald); }
      html.tpl-09 .ol-cert-btn { color: var(--ink); border-color: var(--border); }

      html.tpl-10 .ol-cert-card {
        background: var(--card-2);
        border: 1px solid var(--border);
        border-radius: 10px;
      }
      html.tpl-10 .ol-cert-issuer { background: var(--emerald-soft); color: var(--emerald); }
      html.tpl-10 .ol-cert-btn { color: var(--emerald); border-color: var(--border); }

      /* tpl-11: Classic PDF Style Actions & Certifications */
      html.tpl-11 .ol-hdr-actions {
        font-family: 'Raleway', sans-serif;
        gap: 6px;
      }
      html.tpl-11 .ol-hdr-seg {
        border: 1px solid #b8b8b8;
        border-radius: 0;
        padding: 1px;
        background: #ffffff;
      }
      html.tpl-11 .ol-hdr-btn {
        color: #575757;
        padding: 4px 8px;
        border-radius: 0;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      html.tpl-11 .ol-hdr-btn:hover { background: #efefef; color: #222222; }
      html.tpl-11 .ol-hdr-btn.active { background: #575757; color: #ffffff; }
      html.tpl-11 .ol-hdr-print {
        border: 1px solid #b8b8b8;
        border-radius: 0;
        padding: 4px 10px;
        font-size: 11px;
        color: #575757;
      }
      html.tpl-11 .ol-hdr-print:hover {
        background: #575757;
        border-color: #575757;
        color: #ffffff;
      }
      html.tpl-11 .ol-cert-card {
        background: #ffffff;
        border: 1px solid #cfcfcf;
        border-radius: 0;
        padding: 14px 16px;
      }
      html.tpl-11 .ol-cert-head {
        font-family: 'Raleway', sans-serif;
        letter-spacing: 0.04em;
      }
      html.tpl-11 .ol-cert-issuer {
        background: #efefef;
        color: #4a4a4a;
        border-radius: 0;
        font-weight: 600;
      }
      html.tpl-11 .ol-cert-title {
        font-family: 'Lora', Georgia, serif;
        color: #4a4a4a;
        font-size: 14.5px;
      }
      html.tpl-11 .ol-cert-btn {
        font-family: 'Lora', Georgia, serif;
        border: none;
        border-bottom: 1px solid #575757;
        border-radius: 0;
        padding: 0 0 1px;
        color: #4a4a4a;
      }
      html.tpl-11 .ol-cert-btn:hover {
        background: transparent;
        color: #222222;
      }
      html.tpl-11 .ol-cert-skill {
        border-radius: 0;
        border-color: #cfcfcf;
        color: #575757;
      }

      /* Cross-template Responsive Hardening (Tablet <= 860px & Mobile <= 640px) */
      *, *::before, *::after { box-sizing: border-box; }
      main, main > *, .ide-content, .sec-main, .cv-main, .right-pane,
      .exp-timeline, .exp-list, .timeline-wrap, .bento-card,
      .exec-card, .mono-exp-card, .em-exp-item, .exp-cloud-item,
      .clean-card, .commit-card,
      .sln-body > *, .sln-grid-3 > *, .json-grid > *,
      .bento-card > *, .clean-card > *, .exec-card > * {
        min-width: 0;
        max-width: 100%;
      }
      .ol-json-obj {
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      @media screen and (max-width: 920px) {
        .top-bar-inner, .portal-nav-inner, .mono-nav-inner, .em-header-inner, .top-nav-inner {
          flex-wrap: wrap;
          gap: 8px 12px;
        }
        .top-nav > a.t-link, .portal-links > a.p-link, .mono-menu > a.m-link, .em-nav > a.em-link {
          display: none;
        }
      }
      @media screen and (max-width: 860px) {
        section#education > div[style*="grid-template-columns"],
        main section > div[style*="grid-template-columns:1.4fr"],
        main section > div[style*="grid-template-columns:1.15fr"],
        section#portfolio [style*="grid-template-columns:1fr 280px"] {
          grid-template-columns: 1fr !important;
        }
        .ol-cert-grid { grid-template-columns: 1fr; }
        .dd-panel, .mono-dd-panel, .em-dd-panel, .mega-menu {
          max-width: calc(100vw - 24px) !important;
        }
      }
      @media screen and (max-width: 640px) {
        html, body { overflow-x: hidden; }
        .top-nav-inner {
          border-radius: 20px !important;
          padding: 10px 14px !important;
          gap: 8px !important;
        }
        .top-bar-inner, .portal-nav-inner, .mono-nav-inner, .em-header-inner {
          padding: 10px 14px !important;
        }
        .container, .page-wrap, .sheet, .wrap, .cloud-wrap {
          padding-left: 14px !important;
          padding-right: 14px !important;
        }
        .ol-hdr-actions { gap: 4px; flex-wrap: wrap; }
        .ol-hdr-print { padding: 4px 8px; font-size: 10.5px; }
        .ol-cert-card { padding: 14px; }
        .ol-edu-top, .ol-lang-row, .exp-header, .timeline-top,
        .tl-head, .exec-card-header, .exp-cloud-head, .mono-exp-top {
          flex-wrap: wrap !important;
          gap: 6px !important;
        }
        .bento-hero-main, .bento-card, .hero-card, .clean-card,
        .exec-card, .mono-hero, .mono-exp-card, .em-panel, .em-exp-item,
        .exp-cloud-item, .profile-card {
          padding: 18px 16px !important;
        }
        .rg-metrics {
          grid-template-columns: 1fr !important;
        }
        .shot-tabs, .shot-browser-bar, .exec-shot-nav, .term-shot-tabs, .mono-menu {
          flex-wrap: wrap !important;
        }
      }

      #ol-floating-switcher {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9990;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 6px 10px;
        background: rgba(12, 14, 22, 0.9);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 999px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 11.5px;
        color: #F3F4F6;
        max-width: calc(100vw - 20px);
        overflow-x: auto;
        white-space: nowrap;
      }
      body.in-iframe #ol-floating-switcher {
        display: none !important;
      }
      .ol-sw-hub {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 11px;
        border-radius: 999px;
        background: rgba(255,255,255,0.1);
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 11.5px;
      }
      .ol-sw-divider {
        width: 1px;
        height: 16px;
        background: rgba(255,255,255,0.14);
        margin: 0 2px;
        flex-shrink: 0;
      }
      .ol-sw-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 9px;
        border-radius: 999px;
        color: #9CA3AF;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.18s ease;
        border: 1px solid transparent;
      }
      .ol-sw-item:hover {
        color: #fff;
        background: rgba(255,255,255,0.06);
      }
      .ol-sw-item.active {
        color: #fff;
        background: rgba(255,255,255,0.13);
        border-color: rgba(255,255,255,0.22);
        font-weight: 600;
      }
      .ol-sw-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
      .ol-sw-lang-group {
        display: inline-flex;
        background: rgba(255,255,255,0.06);
        border-radius: 999px;
        padding: 2px;
      }
      .ol-sw-lang {
        border: none;
        background: transparent;
        color: #9CA3AF;
        font-size: 10.5px;
        font-weight: 700;
        padding: 3px 7px;
        border-radius: 999px;
        cursor: pointer;
      }
      .ol-sw-lang.active {
        background: #fff;
        color: #090A0F;
      }
      #ol-project-landing-modal {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      #ol-project-landing-modal.open {
        display: flex;
      }
      .ol-modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(5, 7, 12, 0.82);
        backdrop-filter: blur(10px);
      }
      .ol-modal-dialog {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 880px;
        max-height: 90vh;
        overflow-y: auto;
        background: #0F131F;
        color: #F3F4F6;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 20px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.7);
        padding: 28px;
      }
      .ol-modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding-bottom: 16px;
      }
      .ol-modal-pill {
        display: inline-block;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: #38BDF8;
        background: rgba(56, 189, 248, 0.12);
        border: 1px solid rgba(56, 189, 248, 0.3);
        padding: 3px 9px;
        border-radius: 999px;
        margin-bottom: 6px;
      }
      .ol-modal-header h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        color: #fff;
      }
      .ol-modal-close {
        background: rgba(255,255,255,0.07);
        border: none;
        color: #fff;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
      }
      .ol-modal-lead {
        color: #9CA3AF;
        font-size: 14px;
        line-height: 1.6;
        margin: 16px 0;
      }
      .ol-modal-lead code {
        color: #A78BFA;
        background: rgba(167, 139, 250, 0.12);
        padding: 2px 6px;
        border-radius: 4px;
      }
      .ol-modal-shots {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 12px;
        margin-bottom: 18px;
      }
      .ol-shot-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        overflow: hidden;
      }
      .ol-shot-card img {
        width: 100%;
        height: 135px;
        object-fit: cover;
        object-position: top;
        display: block;
      }
      .ol-shot-card span {
        display: block;
        padding: 8px 10px;
        font-size: 11px;
        color: #D1D5DB;
        font-weight: 500;
      }
      .ol-spec-box {
        background: rgba(16, 185, 129, 0.06);
        border: 1px solid rgba(16, 185, 129, 0.22);
        border-radius: 12px;
        padding: 14px 18px;
        font-size: 13px;
        line-height: 1.6;
      }
      .ol-spec-box ul {
        margin: 8px 0 0;
        padding-left: 18px;
        color: #D1D5DB;
      }
      .ol-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid rgba(255,255,255,0.08);
      }
      .ol-btn-gh {
        padding: 9px 16px;
        border-radius: 8px;
        background: rgba(255,255,255,0.08);
        color: #fff;
        text-decoration: none;
        font-size: 13px;
        font-weight: 600;
      }
      .ol-btn-primary {
        padding: 9px 18px;
        border-radius: 8px;
        background: #6366F1;
        color: #fff;
        border: none;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }

      /* ==========================================================================
         UNIVERSAL LIGHT / DARK THEME OVERRIDES ACROSS ALL 9 TEMPLATES
         ========================================================================== */

      /* Template 01: Bento Glass -> Light Mode */
      html.tpl-01[data-theme="light"] {
        --bg: #f4f6fb;
        --bg-card: rgba(255, 255, 255, 0.94);
        --bg-card-hover: #ffffff;
        --border: rgba(15, 23, 42, 0.11);
        --border-hi: rgba(109, 40, 217, 0.35);
        --text: #0f172a;
        --text-muted: #475569;
        --text-dim: #64748b;
        --accent: #7c3aed;
      }
      html.tpl-01[data-theme="light"] body {
        background-color: #f4f6fb !important;
        background-image:
          radial-gradient(circle at 15% 10%, rgba(124, 58, 237, 0.08), transparent 38%),
          radial-gradient(circle at 85% 18%, rgba(14, 165, 233, 0.08), transparent 36%) !important;
        color: #0f172a;
      }
      html.tpl-01[data-theme="light"] .top-nav-inner {
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);
      }
      html.tpl-01[data-theme="light"] .nav-links a:hover {
        color: #0f172a;
        background: rgba(15, 23, 42, 0.06);
      }
      html.tpl-01[data-theme="light"] .bento-card,
      html.tpl-01[data-theme="light"] .exp-card,
      html.tpl-01[data-theme="light"] .proj-card,
      html.tpl-01[data-theme="light"] .skill-group-card,
      html.tpl-01[data-theme="light"] .portfolio-flagship {
        box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
      }
      html.tpl-01[data-theme="light"] .bento-hero-main {
        background:
          radial-gradient(circle at 90% 10%, rgba(124, 58, 237, 0.08), transparent 45%),
          #ffffff;
      }
      html.tpl-01[data-theme="light"] .portfolio-flagship {
        background:
          radial-gradient(circle at 85% 20%, rgba(239, 68, 68, 0.06), transparent 45%),
          radial-gradient(circle at 15% 85%, rgba(124, 58, 237, 0.06), transparent 45%),
          #ffffff;
        border-color: rgba(15, 23, 42, 0.12);
      }
      html.tpl-01[data-theme="light"] .hero-name {
        background: none !important;
        -webkit-text-fill-color: #0f172a !important;
        color: #0f172a !important;
      }
      html.tpl-01[data-theme="light"] .hero-role,
      html.tpl-01[data-theme="light"] .exp-role-title {
        color: #6d28d9;
      }
      html.tpl-01[data-theme="light"] .hero-bio,
      html.tpl-01[data-theme="light"] .flagship-desc,
      html.tpl-01[data-theme="light"] .feature-list li,
      html.tpl-01[data-theme="light"] .exp-bullets li {
        color: #334155;
      }
      html.tpl-01[data-theme="light"] .status-pill {
        background: #ecfdf5;
        border-color: #a7f3d0;
        color: #047857;
      }
      html.tpl-01[data-theme="light"] .btn-primary {
        background: #0f172a;
        color: #ffffff;
      }
      html.tpl-01[data-theme="light"] .btn-glass {
        background: #f8fafc;
        border-color: #cbd5e1;
        color: #0f172a;
      }
      html.tpl-01[data-theme="light"] .btn-glass:hover {
        background: #e2e8f0;
      }
      html.tpl-01[data-theme="light"] .metric-box,
      html.tpl-01[data-theme="light"] .exp-period {
        background: #f8fafc;
        color: #334155;
      }
      html.tpl-01[data-theme="light"] .metric-val,
      html.tpl-01[data-theme="light"] .exp-company,
      html.tpl-01[data-theme="light"] .proj-card h3,
      html.tpl-01[data-theme="light"] .section-head h2,
      html.tpl-01[data-theme="light"] .flagship-title,
      html.tpl-01[data-theme="light"] .skill-group-card h3 {
        color: #0f172a;
      }
      html.tpl-01[data-theme="light"] .tech-pill,
      html.tpl-01[data-theme="light"] .skill-chip {
        background: #f1f5f9;
        border-color: #cbd5e1;
        color: #1e293b;
      }
      html.tpl-01[data-theme="light"] .tech-pill.hi {
        background: #ede9fe;
        border-color: #c4b5fd;
        color: #5b21b6;
      }
      html.tpl-01[data-theme="light"] .tech-pill.cyan {
        background: #e0f2fe;
        border-color: #bae6fd;
        color: #0369a1;
      }
      html.tpl-01[data-theme="light"] .flagship-badge {
        background: #fef2f2;
        border-color: #fecaca;
        color: #b91c1c;
      }
      html.tpl-01[data-theme="light"] .ol-photo-slot {
        background: #f5f3ff !important;
        border-color: #a78bfa !important;
      }
      html.tpl-01[data-theme="light"] .ol-photo-slot [style*="color:#c4b5fd"] {
        color: #6d28d9 !important;
      }
      html.tpl-01[data-theme="light"] .loc-bar {
        background: #f0f9ff;
        border-color: #bae6fd;
      }
      html.tpl-01[data-theme="light"] [style*="color:#cbd5e1"],
      html.tpl-01[data-theme="light"] [style*="color:#d1d5db"] {
        color: #334155 !important;
      }
      html.tpl-01[data-theme="light"] [style*="color:#a78bfa"] {
        color: #6d28d9 !important;
      }
      html.tpl-01[data-theme="light"] [style*="color:#38bdf8"] {
        color: #0284c7 !important;
      }
      html.tpl-01[data-theme="light"] [style*="color:#34d399"] {
        color: #047857 !important;
      }
      html.tpl-01[data-theme="light"] [style*="color:#fca5a5"] {
        color: #b91c1c !important;
      }

      /* Template 02: Terminal & IDE -> Light Mode */
      html.tpl-02[data-theme="light"] {
        --bg-root: #f3f6fa;
        --bg-sidebar: #f8fafc;
        --bg-editor: #ffffff;
        --bg-panel: #f8fafc;
        --border: #cbd5e1;
        --text: #0f172a;
        --text-muted: #475569;
        --green: #059669;
        --cyan: #0284c7;
        --purple: #7c3aed;
        --amber: #b45309;
        --red: #dc2626;
        --blue: #2563eb;
      }
      html.tpl-02[data-theme="light"] body {
        background: #f3f6fa !important;
        color: #0f172a;
      }
      html.tpl-02[data-theme="light"] .ide-shell {
        box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
      }
      html.tpl-02[data-theme="light"] .ide-titlebar {
        background: #e2e8f0;
        color: #0f172a;
      }
      html.tpl-02[data-theme="light"] .t-pill {
        background: #ecfdf5;
        border-color: #a7f3d0;
        color: #047857;
      }
      html.tpl-02[data-theme="light"] .t-pill.cyan {
        background: #e0f2fe;
        border-color: #bae6fd;
        color: #0369a1;
      }
      html.tpl-02[data-theme="light"] .tree-folder {
        color: #1d4ed8;
      }
      html.tpl-02[data-theme="light"] .tree-file:hover,
      html.tpl-02[data-theme="light"] .tree-file.active {
        background: #e0f2fe;
        color: #0f172a;
      }
      html.tpl-02[data-theme="light"] .code-comment { color: #15803d; }
      html.tpl-02[data-theme="light"] .kw { color: #7c3aed; }
      html.tpl-02[data-theme="light"] .tp { color: #0284c7; }
      html.tpl-02[data-theme="light"] .str { color: #b91c1c; }
      html.tpl-02[data-theme="light"] .fn { color: #b45309; }
      html.tpl-02[data-theme="light"] .hero-name,
      html.tpl-02[data-theme="light"] .sec-header h2,
      html.tpl-02[data-theme="light"] .pkg-card h3,
      html.tpl-02[data-theme="light"] .commit-title {
        color: #0f172a !important;
      }
      html.tpl-02[data-theme="light"] .hero-summary,
      html.tpl-02[data-theme="light"] .commit-list li {
        color: #334155;
      }
      html.tpl-02[data-theme="light"] .btn-cmd {
        background: #ffffff;
        border-color: #cbd5e1;
        color: #0f172a;
      }
      html.tpl-02[data-theme="light"] .btn-cmd:hover {
        border-color: #0284c7;
        color: #0284c7;
      }
      html.tpl-02[data-theme="light"] .btn-cmd.primary {
        background: #ecfdf5;
        border-color: #059669;
        color: #047857;
      }
      html.tpl-02[data-theme="light"] .sln-topbar,
      html.tpl-02[data-theme="light"] .term-shot-tabs,
      html.tpl-02[data-theme="light"] .code-tag,
      html.tpl-02[data-theme="light"] .json-box {
        background: #f1f5f9;
      }
      html.tpl-02[data-theme="light"] .arch-diagram {
        background: #f1f5f9;
        color: #1e40af;
      }
      html.tpl-02[data-theme="light"] .code-tag {
        color: #1e40af;
      }
      html.tpl-02[data-theme="light"] .json-key {
        color: #047857;
      }
      html.tpl-02[data-theme="light"] .git-graph::before {
        background: #cbd5e1;
      }
      html.tpl-02[data-theme="light"] .git-commit::before {
        border-color: #ffffff;
      }
      html.tpl-02[data-theme="light"] .term-hero .ol-photo-slot {
        background: #ecfdf5 !important;
        border-color: #059669 !important;
      }
      html.tpl-02[data-theme="light"] .ide-shell [style*="color:#fff"] {
        color: #0f172a !important;
      }
      html.tpl-02[data-theme="light"] [style*="color:#cbd5e1"] {
        color: #334155 !important;
      }
      html.tpl-02[data-theme="light"] [style*="color:#9ca3af"] {
        color: #475569 !important;
      }
      html.tpl-02[data-theme="light"] [style*="color:#fde047"] {
        color: #b45309 !important;
      }
      html.tpl-02[data-theme="light"] [style*="color:#38bdf8"] {
        color: #0284c7 !important;
      }
      html.tpl-02[data-theme="light"] [style*="color:#6ee7b7"] {
        color: #047857 !important;
      }

      /* Template 03: Swiss Editorial -> Dark Mode */
      html.tpl-03[data-theme="dark"] {
        --paper: #121210;
        --paper-card: #1a1917;
        --ink: #f4f2ec;
        --ink-muted: #b5b2aa;
        --ink-dim: #8a877f;
        --rule: #2e2d29;
        --vermilion: #ef4444;
      }
      html.tpl-03[data-theme="dark"] body {
        background: #121210 !important;
        color: #f4f2ec;
      }
      html.tpl-03[data-theme="dark"] .hero-right {
        background: #181715;
      }
      html.tpl-03[data-theme="dark"] .editorial-lead,
      html.tpl-03[data-theme="dark"] .exp-ul li {
        color: #d6d3cb;
      }
      html.tpl-03[data-theme="dark"] .hero-right .ol-photo-slot {
        background: #22211d !important;
      }

      /* Template 04: Nordic FinTech (Stripe) -> Dark Mode */
      html.tpl-04[data-theme="dark"] {
        --bg: #0b1120;
        --surface: #111827;
        --surface-subtle: #1e293b;
        --border: #334155;
        --border-hover: #475569;
        --text-main: #f8fafc;
        --text-body: #cbd5e1;
        --text-muted: #94a3b8;
        --indigo: #818cf8;
        --indigo-soft: rgba(99, 102, 241, 0.16);
        --emerald: #34d399;
        --emerald-soft: rgba(16, 185, 129, 0.14);
        --amber-soft: rgba(245, 158, 11, 0.15);
        --amber: #fbbf24;
        --shadow-sm: none;
        --shadow-md: 0 12px 30px rgba(0, 0, 0, 0.45);
      }
      html.tpl-04[data-theme="dark"] body {
        background-color: #0b1120 !important;
        background-image: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(99, 102, 241, 0.16), transparent) !important;
        color: #cbd5e1;
      }
      html.tpl-04[data-theme="dark"] .navbar {
        background: rgba(11, 17, 32, 0.9);
      }
      html.tpl-04[data-theme="dark"] .btn-indigo {
        color: #ffffff;
        background: #4f46e5;
      }
      html.tpl-04[data-theme="dark"] .summary-aside .ol-photo-slot {
        background: #1e1b4b !important;
      }

      /* Template 05: Executive Split-Screen -> Light Mode */
      html.tpl-05[data-theme="light"] {
        --navy: #f8fafc;
        --slate-card: #ffffff;
        --slate-hover: #f1f5f9;
        --border: #cbd5e1;
        --text-hi: #0f172a;
        --text-mid: #334155;
        --text-low: #64748b;
        --teal: #0d9488;
        --cyan: #0284c7;
      }
      html.tpl-05[data-theme="light"] body {
        background-color: #f8fafc !important;
        color: #334155;
      }
      html.tpl-05[data-theme="light"] #spotlight {
        display: none;
      }
      html.tpl-05[data-theme="light"] .exec-role,
      html.tpl-05[data-theme="light"] .lead-paragraph,
      html.tpl-05[data-theme="light"] .exec-ul li {
        color: #334155;
      }
      html.tpl-05[data-theme="light"] .teal-tag {
        background: #f0fdfa;
        color: #0f766e;
        border: 1px solid #99f6e4;
      }
      html.tpl-05[data-theme="light"] .c-pill {
        background: #ffffff;
      }
      html.tpl-05[data-theme="light"] .c-pill.teal,
      html.tpl-05[data-theme="light"] .exec-badge {
        background: #f0fdfa;
        border-color: #5eead4;
        color: #0f766e;
      }
      html.tpl-05[data-theme="light"] .left-pane .ol-photo-slot {
        background: #f0fdfa !important;
      }
      html.tpl-05[data-theme="light"] [style*="color:#cbd5e1"] {
        color: #334155 !important;
      }
      html.tpl-05[data-theme="light"] [style*="color:#38bdf8"] {
        color: #0284c7 !important;
      }

      /* Template 07 (06. Classic Dossier CV): Ink-Friendly Light & Full Dark Mode */
      html.tpl-07[data-theme="light"] {
        --bg-page: #f1f5f9;
        --sidebar-bg: #eef2ff;
        --main-bg: #ffffff;
        --ink: #0f172a;
        --ink-body: #334155;
        --ink-muted: #475569;
        --border: #cbd5e1;
      }
      html.tpl-07[data-theme="light"] body {
        background: #f1f5f9 !important;
      }
      html.tpl-07[data-theme="light"] .cv-sidebar {
        background: #eef2ff;
        color: #0f172a;
        border-right: 1px solid #dbeafe;
      }
      html.tpl-07[data-theme="light"] .cv-sidebar .sb-name { color: #0f172a; }
      html.tpl-07[data-theme="light"] .cv-sidebar .sb-role { color: #1d4ed8; }
      html.tpl-07[data-theme="light"] .cv-sidebar .sb-sec-title {
        color: #1d4ed8;
        border-bottom-color: rgba(37, 99, 235, 0.22);
      }
      html.tpl-07[data-theme="light"] .cv-sidebar .sb-contact-list a,
      html.tpl-07[data-theme="light"] .cv-sidebar .sb-bar-head {
        color: #1e293b;
      }
      html.tpl-07[data-theme="light"] .cv-sidebar .sb-bar-track {
        background: #cbd5e1;
      }
      html.tpl-07[data-theme="light"] .cv-sidebar .avatar-circle {
        background: linear-gradient(135deg, #dbeafe, #e0e7ff);
        border-color: #2563eb;
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.14);
      }
      html.tpl-07[data-theme="light"] .cv-sidebar .avatar-initials { color: #1d4ed8; }
      html.tpl-07[data-theme="light"] .cv-sidebar [style*="color:#94a3b8"] {
        color: #475569 !important;
      }

      html.tpl-07[data-theme="dark"] {
        --bg-page: #060911;
        --sidebar-bg: #0b1120;
        --main-bg: #0f172a;
        --ink: #f8fafc;
        --ink-body: #cbd5e1;
        --ink-muted: #94a3b8;
        --border: #1e293b;
      }
      html.tpl-07[data-theme="dark"] body {
        background: #060911 !important;
        color: #cbd5e1;
      }
      html.tpl-07[data-theme="dark"] .cv-paper {
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55);
      }
      html.tpl-07[data-theme="dark"] .cv-sidebar {
        border-right: 1px solid #1e293b;
      }
      html.tpl-07[data-theme="dark"] .cv-main {
        background: #0f172a;
      }
      html.tpl-07[data-theme="dark"] .ms-box {
        background: #1e293b;
      }
      html.tpl-07[data-theme="dark"] .ms-track {
        background: #334155;
      }
      html.tpl-07[data-theme="dark"] .tl-date {
        background: #1e293b;
        color: #94a3b8;
      }
      html.tpl-07[data-theme="dark"] .timeline-wrap {
        border-left-color: #334155;
      }
      html.tpl-07[data-theme="dark"] .tl-item::before {
        border-color: #0f172a;
      }
      html.tpl-07[data-theme="dark"] .tl-tag {
        background: rgba(37, 99, 235, 0.16);
        color: #93c5fd;
        border-color: rgba(56, 189, 248, 0.35);
      }
      html.tpl-07[data-theme="dark"] [style*="color:#059669"] {
        color: #34d399 !important;
      }

      /* Template 08 (07. Cloud Architect Portal): Light & Dark Mode */
      html.tpl-08[data-theme="dark"] {
        --bg: #070d18;
        --card: #0f172a;
        --blue: #3b82f6;
        --blue-dark: #2563eb;
        --ink: #f8fafc;
        --body: #cbd5e1;
        --muted: #94a3b8;
        --border: #1e293b;
        --shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
      }
      html.tpl-08[data-theme="dark"] body {
        background: #070d18 !important;
        color: #cbd5e1;
      }
      html.tpl-08[data-theme="dark"] .s-bar-card,
      html.tpl-08[data-theme="dark"] .f-pill,
      html.tpl-08[data-theme="dark"] .mega-card {
        background: #1e293b;
        border-color: #334155;
        color: #e2e8f0;
      }
      html.tpl-08[data-theme="dark"] .f-pill.active {
        background: #2563eb;
        border-color: #2563eb;
        color: #ffffff;
      }
      html.tpl-08[data-theme="dark"] .mega-menu {
        background: #0f172a;
        border-color: #334155;
        color: #f8fafc;
      }
      html.tpl-08[data-theme="dark"] .mega-card:hover {
        background: #0b132b;
        border-color: #3b82f6;
      }
      html.tpl-08[data-theme="dark"] .s-track {
        background: #1e293b;
      }
      html.tpl-08[data-theme="dark"] .c-badge {
        background: rgba(59, 130, 246, 0.16);
        border-color: rgba(59, 130, 246, 0.35);
        color: #93c5fd;
      }
      html.tpl-08[data-theme="dark"] .c-badge.aws {
        background: rgba(249, 115, 22, 0.16);
        border-color: rgba(249, 115, 22, 0.35);
        color: #fdba74;
      }
      html.tpl-08[data-theme="light"] .cloud-photo {
        background: linear-gradient(145deg, #eff6ff, #dbeafe);
        color: #0f172a;
      }
      html.tpl-08[data-theme="light"] .cloud-photo [style*="color:#38bdf8"] {
        color: #0066ff !important;
      }
      html.tpl-08[data-theme="light"] .cloud-photo [style*="color:#94a3b8"] {
        color: #475569 !important;
      }

      /* Template 09 (08. Minimal Mono Craft): Light & Dark Mode */
      html.tpl-09[data-theme="dark"] {
        --bg: #09090b;
        --card: #121215;
        --ink: #fafafa;
        --body: #d4d4d8;
        --muted: #a1a1aa;
        --border: #27272a;
        --emerald: #10b981;
      }
      html.tpl-09[data-theme="dark"] body {
        background: #09090b !important;
        color: #d4d4d8;
      }
      html.tpl-09[data-theme="dark"] .mono-nav {
        background: rgba(9, 9, 11, 0.9);
      }
      html.tpl-09[data-theme="dark"] .m-link:hover,
      html.tpl-09[data-theme="dark"] .mono-dd-item:hover {
        background: #18181b;
      }
      html.tpl-09[data-theme="dark"] .mono-photo,
      html.tpl-09[data-theme="dark"] .m-bar-track,
      html.tpl-09[data-theme="dark"] .m-pill {
        background: #18181b;
      }
      html.tpl-09[data-theme="dark"] .btn-dark {
        background: #fafafa;
        color: #09090b;
      }

      /* Template 10 (09. Emerald Matrix): Dark & Light Mode */
      html.tpl-10[data-theme="light"] {
        --bg: #f3f7f5;
        --card: #ffffff;
        --card-2: #eef5f1;
        --border: rgba(5, 150, 105, 0.25);
        --border-dim: #d1ddd7;
        --emerald: #059669;
        --emerald-soft: rgba(5, 150, 105, 0.1);
        --cyan: #0284c7;
        --text: #0f172a;
        --muted: #475569;
      }
      html.tpl-10[data-theme="light"] body {
        background-color: #f3f7f5 !important;
        background-image:
          radial-gradient(circle at 15% 15%, rgba(5, 150, 105, 0.06), transparent 40%),
          radial-gradient(circle at 85% 25%, rgba(2, 132, 199, 0.05), transparent 40%) !important;
        color: #0f172a;
      }
      html.tpl-10[data-theme="light"] .em-header {
        background: rgba(255, 255, 255, 0.92);
      }
      html.tpl-10[data-theme="light"] .em-logo,
      html.tpl-10[data-theme="light"] .em-link:hover {
        color: #0f172a;
      }
      html.tpl-10[data-theme="light"] .em-dd-btn {
        color: #047857;
      }
      html.tpl-10[data-theme="light"] .em-dd-panel {
        background: #ffffff;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.14);
      }
      html.tpl-10[data-theme="light"] .em-dd-item strong,
      html.tpl-10[data-theme="light"] .em-tag {
        color: #047857;
      }
      html.tpl-10[data-theme="light"] .profile-photo {
        background: #ecfdf5 !important;
        color: #047857;
      }
      html.tpl-10[data-theme="light"] .em-btn {
        color: #ffffff;
      }
      html.tpl-10[data-theme="light"] .em-ul li {
        color: #334155;
      }
      html.tpl-10[data-theme="light"] .seg-cell {
        background: #dbe6e0;
      }
      html.tpl-10[data-theme="light"] .seg-cell.on {
        background: #059669;
        box-shadow: none;
      }
      html.tpl-10[data-theme="light"] .seg-cell.cyan {
        background: #0284c7;
      }
      html.tpl-10[data-theme="light"] [style*="color:#cbd5e1"] {
        color: #334155 !important;
      }
      html.tpl-10[data-theme="light"] [style*="color:#6ee7b7"] {
        color: #047857 !important;
      }

      /* ==========================================================================
         AUTHENTIC FULL-STYLE A4 PRINT ARCHITECTURE (PRESERVES ACTIVE LIGHT OR DARK THEME!)
         ========================================================================== */
      @media print {
        @page {
          size: A4 portrait;
          margin: 0 !important;
        }

        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          animation: none !important;
          transition: none !important;
        }

        /* Paint the template's exact background edge-to-edge on EVERY printed page */
        #ol-print-page-bg {
          display: block !important;
          position: fixed !important;
          top: -50mm !important;
          left: -50mm !important;
          right: -50mm !important;
          bottom: -50mm !important;
          z-index: -9999 !important;
          pointer-events: none !important;
        }

        html {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: auto !important;
          overflow: visible !important;
          zoom: 0.75;
        }

        body {
          margin: 0 !important;
          padding: 10mm 12mm !important;
          -webkit-box-decoration-break: clone !important;
          box-decoration-break: clone !important;
          width: 100% !important;
          height: auto !important;
          overflow: visible !important;
        }

        /* 1. Hide Interactive Navigation Bars, Dropdowns, Floating Switchers & Upload Prompts */
        #ol-floating-switcher,
        #ol-project-landing-modal,
        #ol-hidden-photo-input,
        .ol-hdr-actions,
        #spotlight,
        .top-nav,
        .ide-titlebar,
        .ide-sidebar,
        .navbar,
        .exec-header,
        .top-bar,
        .portal-nav,
        .mono-nav,
        .em-header,
        .spy-nav,
        .filter-pills,
        .ol-photo-overlay,
        [data-i18n="photo_hint"],
        [data-open-landing],
        a[download],
        .bento-featured-mini,
        .code-comment,
        .cs-decl {
          display: none !important;
        }

        /* Fix gradient text in Bento Glass for both Dark and Light print */
        html[data-theme="dark"] .hero-name {
          -webkit-text-fill-color: #ffffff !important;
          background: none !important;
          color: #ffffff !important;
        }
        html[data-theme="light"] .hero-name {
          -webkit-text-fill-color: #0f172a !important;
          background: none !important;
          color: #0f172a !important;
        }

        /* 2. Consistent Page-Width Alignment Across All Pages (Zero Margin Drift) */
        .container,
        .wrap,
        .sheet,
        .ide-shell,
        .ide-content,
        .cv-paper,
        .split-layout,
        .em-grid {
          max-width: 100% !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }

        /* Template 01: Bento Grid — Compact spacing so it fits on 4 clean pages without orphan footer */
        .bento-grid {
          margin-bottom: 14px !important;
          gap: 10px !important;
        }
        .bento-card {
          padding: 14px 18px !important;
        }
        .bento-stack {
          grid-column: span 12 !important;
        }
        .section-head {
          margin: 12px 0 8px !important;
          flex-wrap: wrap !important;
        }
        .portfolio-flagship {
          padding: 18px 20px !important;
          margin-bottom: 10px !important;
        }
        .exp-list,
        .skills-matrix,
        .projects-subgrid {
          gap: 8px !important;
          margin-bottom: 10px !important;
        }
        .exp-card {
          padding: 12px 18px !important;
        }
        .exp-bullets li {
          margin-bottom: 3px !important;
          font-size: 13px !important;
        }
        .skill-group-card,
        .proj-card {
          padding: 11px 14px !important;
        }
        .skill-chip {
          padding: 4px 8px !important;
          font-size: 11.5px !important;
        }

        /* Template 02: IDE Layout — Identical left/right alignment on Page 1, 2 & 3 */
        .ide-shell {
          border: none !important;
          background: transparent !important;
          border-radius: 0 !important;
        }
        .ide-body {
          display: block !important;
          min-height: 0 !important;
        }
        .term-hero {
          padding: 16px 20px !important;
          margin-bottom: 12px !important;
        }
        .hero-summary {
          font-size: 13.5px !important;
          line-height: 1.5 !important;
          margin-bottom: 12px !important;
        }
        .sec-header {
          margin: 12px 0 8px !important;
          padding: 0 0 5px 0 !important;
        }
        .sln-showcase {
          margin-bottom: 10px !important;
        }
        .sln-body {
          padding: 14px 18px !important;
          gap: 16px !important;
        }
        .sln-grid-3 {
          gap: 10px !important;
          margin-bottom: 10px !important;
        }
        .pkg-card {
          padding: 12px 15px !important;
        }
        .git-graph {
          border-left: none !important;
          margin-left: 0 !important;
          padding-left: 0 !important;
          gap: 9px !important;
        }
        .git-commit::before {
          display: none !important;
        }
        .git-commit {
          padding: 12px 18px !important;
          margin-bottom: 0 !important;
        }
        .diff-list li {
          margin-bottom: 3px !important;
          font-size: 13px !important;
        }
        .json-grid {
          gap: 10px !important;
        }
        .json-box {
          padding: 11px 15px !important;
          font-size: 11.5px !important;
        }
        .code-tag {
          padding: 3px 8px !important;
          font-size: 11px !important;
        }

        /* Template 03: Swiss Editorial — Prevent orphaned sidebar labels & fit cleanly on 3 pages */
        .swiss-section {
          display: block !important;
        }
        .swiss-section#skills {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .sec-sidebar {
          border-right: none !important;
          border-bottom: 1px solid var(--ink) !important;
          padding: 10px 22px !important;
          display: flex !important;
          align-items: baseline !important;
          gap: 14px !important;
          break-after: avoid !important;
          page-break-after: avoid !important;
        }
        .sec-sidebar h2 {
          font-size: 18px !important;
          margin-top: 0 !important;
        }
        .sec-sidebar p {
          display: none !important;
        }
        .hero-left {
          padding: 22px 26px !important;
        }
        .hero-right {
          padding: 20px 22px !important;
        }
        .editorial-name {
          font-size: 42px !important;
          margin-bottom: 10px !important;
        }
        .editorial-sub {
          font-size: 21px !important;
          margin-bottom: 14px !important;
        }
        .editorial-lead {
          font-size: 13.5px !important;
          line-height: 1.52 !important;
        }
        .work-featured {
          padding: 18px 24px !important;
          gap: 18px !important;
        }
        .exp-row {
          padding: 14px 24px !important;
        }

        /* Template 04: Nordic FinTech — Compact hero & cards to eliminate empty gaps */
        .hero-card {
          padding: 22px 26px !important;
          margin-bottom: 18px !important;
          gap: 24px !important;
        }
        .product-showcase {
          margin-bottom: 14px !important;
        }
        .prod-info {
          padding: 20px 24px !important;
        }
        .prod-preview {
          padding: 16px !important;
        }
        .cards-3 {
          gap: 12px !important;
          margin-bottom: 18px !important;
        }
        .clean-card {
          padding: 16px 18px !important;
        }
        .exp-stack {
          gap: 12px !important;
          margin-bottom: 18px !important;
        }
        .exp-item {
          padding: 18px 22px !important;
          gap: 20px !important;
        }

        /* Template 05: Executive Split-Screen — Match Page 1 text padding with Page 2/3 cards */
        .split-layout {
          display: block !important;
        }
        .left-pane {
          position: static !important;
          height: auto !important;
          padding: 20px 24px !important;
          margin-bottom: 16px !important;
          background: var(--slate-card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 16px !important;
          break-inside: avoid !important;
        }
        .right-pane {
          padding: 0 !important;
        }
        .pane-section {
          margin-bottom: 18px !important;
        }
        .split-layout #about {
          background: var(--slate-card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 16px !important;
          padding: 20px 24px !important;
          break-inside: avoid !important;
        }
        .metric-strip {
          margin: 14px 0 0 !important;
        }
        .exec-card {
          padding: 18px 24px !important;
          margin-bottom: 12px !important;
        }
        .shot-box img {
          max-height: 220px !important;
          object-fit: cover !important;
          object-position: top !important;
        }

        /* Template 07 (06. Classic Dossier CV) — Align widths & adapt to Light/Dark theme */
        .cv-paper {
          display: block !important;
          border-radius: 14px !important;
          background: transparent !important;
        }
        .cv-sidebar {
          padding: 18px 22px !important;
          display: grid !important;
          grid-template-columns: 160px 1fr 1fr !important;
          gap: 18px !important;
          align-items: start !important;
          border-radius: 14px !important;
          margin-bottom: 14px !important;
          break-inside: avoid !important;
        }
        html.tpl-07[data-theme="light"] .cv-sidebar {
          border-right: 1px solid #dbeafe !important;
          border: 1px solid #dbeafe !important;
        }
        html.tpl-07[data-theme="dark"] .cv-sidebar {
          border: 1px solid #1e293b !important;
        }
        .cv-sidebar .avatar-circle {
          width: 96px !important;
          height: 96px !important;
          margin: 0 auto 8px !important;
        }
        .cv-main {
          padding: 20px 24px !important;
          background: var(--main-bg) !important;
          border-radius: 14px !important;
        }
        html.tpl-07[data-theme="dark"] .cv-main {
          border: 1px solid #1e293b !important;
        }
        .main-sec {
          margin-bottom: 16px !important;
        }
        .main-skills-grid {
          gap: 10px !important;
        }
        .ms-box {
          padding: 12px 14px !important;
        }
        .ms-row {
          margin-bottom: 7px !important;
        }
        .tl-item {
          padding-bottom: 12px !important;
          margin-bottom: 12px !important;
        }

        /* Template 08 (07. Cloud Architect): Ensure all skill bars print even if a filter tab was clicked */
        #cloud-skill-grid .s-bar-card {
          display: block !important;
        }

        /* Template 09 (08. Minimal Mono Craft) — Fit all Experience + Education on Page 2 */
        .mono-hero {
          padding: 20px 24px !important;
          margin-bottom: 16px !important;
          gap: 24px !important;
        }
        .mono-sec-head {
          margin: 14px 0 10px !important;
        }
        .mono-bars-grid {
          gap: 10px !important;
          margin-bottom: 14px !important;
        }
        .mono-bar-box {
          padding: 14px 18px !important;
        }
        .mono-exp-list {
          gap: 10px !important;
        }
        .mono-exp-card {
          padding: 14px 18px !important;
        }
        .mono-bullets li {
          margin-bottom: 3px !important;
        }

        /* Template 10 (09. Sticky Profile Card) — Match #about & timeline padding with cards */
        .em-grid {
          display: block !important;
        }
        .profile-card {
          position: static !important;
          display: grid !important;
          grid-template-columns: 140px 1fr 190px !important;
          gap: 18px !important;
          align-items: center !important;
          padding: 18px 22px !important;
          margin-bottom: 14px !important;
          break-inside: avoid !important;
        }
        .profile-photo {
          width: 140px !important;
          height: 150px !important;
        }
        .em-sec,
        .em-panel {
          background: var(--card) !important;
          border: 1px solid var(--border-dim) !important;
          border-radius: 16px !important;
          padding: 18px 22px !important;
          margin-bottom: 14px !important;
        }
        .em-tl {
          padding-left: 0 !important;
          border-left: none !important;
        }
        .em-exp-item::before {
          display: none !important;
        }

        /* 3. Logical Page Breaks (Never slice cards in half or orphan headings) */
        h1, h2, h3, h4,
        .section-head,
        .sec-header,
        .sec-head,
        .sec-title-wrap,
        .main-sec-head,
        .sec-top,
        .mono-sec-head,
        .em-sec-title,
        .sec-eyebrow {
          break-after: avoid !important;
          page-break-after: avoid !important;
        }

        article,
        .bento-card,
        .exp-card,
        .skill-group-card,
        .proj-card,
        .portfolio-flagship,
        .term-hero,
        .git-commit,
        .json-box,
        .sln-showcase,
        .pkg-card,
        .swiss-hero,
        .work-featured,
        .sub-work-cell,
        .exp-row,
        .skill-cell,
        .hero-card,
        .product-showcase,
        .clean-card,
        .exp-item,
        .exec-card,
        .ms-box,
        .tl-item,
        .cloud-hero,
        .s-bar-card,
        .exp-cloud-item,
        .mono-hero,
        .mono-bar-box,
        .mono-exp-card,
        .seg-card,
        .em-exp-item,
        .ol-cert-card,
        .ol-edu-item {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
      }

      /* Animated Skill Progress Bars (templates 07, 08, 09) */
      .ol-anim-bar {
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }
      .ol-anim-bar.ol-bar-filled {
        transform: scaleX(1);
      }
      @media (prefers-reduced-motion: reduce), print {
        .ol-anim-bar {
          transform: scaleX(1) !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    if (isIframe) {
      document.body.classList.add('in-iframe');
    }

    function injectHeaderActions(tplClass) {
      if (document.querySelector('.ol-hdr-actions')) return;
      const tplMeta = getCurrentTemplateMeta();
      const hideThemeToggle = !!(tplMeta && tplMeta.noTheme);
      const box = document.createElement('div');
      box.className = 'ol-hdr-actions';
      box.setAttribute('role', 'group');
      box.setAttribute('aria-label', 'Resume Display Controls');
      const themeSegHtml = hideThemeToggle ? '' : `
        <div class="ol-hdr-seg" title="Light / Dark Theme">
          <button type="button" class="ol-hdr-btn" data-theme-btn="light" aria-label="Light theme">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          </button>
          <button type="button" class="ol-hdr-btn" data-theme-btn="dark" aria-label="Dark theme">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          </button>
        </div>`;
      box.innerHTML = `${themeSegHtml}
        <div class="ol-hdr-seg" title="Language">
          <button type="button" class="ol-hdr-btn" data-lang-btn="en">EN</button>
          <button type="button" class="ol-hdr-btn" data-lang-btn="uk">UA</button>
        </div>
        <button type="button" class="ol-hdr-btn ol-hdr-print" data-print-btn="1" title="Print / Save as PDF" aria-label="Print resume">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          <span>Print</span>
        </button>
      `;

      let mounted = false;
      const mountMap = {
        'tpl-01': () => {
          const inner = document.querySelector('.top-nav-inner');
          const cta = inner && inner.querySelector('.nav-cta');
          if (inner) {
            if (cta) inner.insertBefore(box, cta);
            else inner.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-02': () => {
          const bar = document.querySelector('.ide-titlebar');
          if (bar) {
            bar.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-03': () => {
          const col = document.querySelector('.masthead > .m-col-3') || document.querySelector('.masthead');
          if (col) {
            col.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-04': () => {
          const nav = document.querySelector('.navbar .nav-container');
          const cta = nav && nav.querySelector('.btn-indigo');
          if (nav) {
            if (cta) nav.insertBefore(box, cta);
            else nav.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-05': () => {
          const paneTop = document.querySelector('.left-pane > div');
          if (paneTop) {
            paneTop.prepend(box);
            return true;
          }
          return false;
        },
        'tpl-07': () => {
          const nav = document.querySelector('.top-bar .top-nav');
          const pdf = nav && nav.querySelector('a[download]');
          if (nav) {
            if (pdf) nav.insertBefore(box, pdf);
            else nav.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-08': () => {
          const nav = document.querySelector('.portal-nav .portal-links');
          const pdf = nav && nav.querySelector('a[download]');
          if (nav) {
            if (pdf) nav.insertBefore(box, pdf);
            else nav.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-09': () => {
          const nav = document.querySelector('.mono-nav .mono-menu');
          const pdf = nav && nav.querySelector('.btn-dark');
          if (nav) {
            if (pdf) nav.insertBefore(box, pdf);
            else nav.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-10': () => {
          const nav = document.querySelector('.em-header .em-nav');
          if (nav) {
            nav.appendChild(box);
            return true;
          }
          return false;
        },
        'tpl-11': () => {
          const topBar = document.querySelector('.pdf-top-actions');
          if (topBar) {
            topBar.prepend(box);
            return true;
          }
          return false;
        }
      };

      if (tplClass && mountMap[tplClass]) {
        mounted = mountMap[tplClass]();
      }
      if (!mounted) {
        const hdr = document.querySelector('header');
        if (hdr) hdr.appendChild(box);
      }

      box.querySelectorAll('[data-lang-btn]').forEach((btn) => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang-btn')));
      });
      box.querySelectorAll('[data-theme-btn]').forEach((btn) => {
        btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme-btn'), true));
      });
      box.querySelectorAll('[data-print-btn]').forEach((btn) => {
        btn.addEventListener('click', () => {
          syncPrintBackground();
          window.print();
        });
      });
    }

    injectHeaderActions(meta && meta.tplClass);

    const isStandaloneResume = !!document.querySelector('meta[name="ol-standalone-resume"]');
    if (!isStandaloneResume && currentFile !== 'index.html' && !isIframe) {
      const bar = document.createElement('nav');
      bar.id = 'ol-floating-switcher';
      bar.setAttribute('aria-label', 'Template Switcher');

      const itemsHtml = TEMPLATES.map((t) => {
        const active = currentFile === t.file ? 'active' : '';
        return `<a href="${prefix}${t.file}" class="ol-sw-item ${active}" title="${t.tag}">
          <span class="ol-sw-dot" style="background:${t.accent}"></span>
          <span>${t.num}. ${t.name}</span>
        </a>`;
      }).join('');

      bar.innerHTML = `
        <a href="${hubHref}" class="ol-sw-hub">⊞ All 9</a>
        <div class="ol-sw-divider"></div>
        ${itemsHtml}
      `;
      document.body.appendChild(bar);
    }

    document.querySelectorAll('[data-open-landing]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectModal(btn.getAttribute('data-open-landing'));
      });
    });

    function initAnimatedProgressBars() {
      const bars = document.querySelectorAll('.sb-bar-fill, .ms-fill, .s-fill, .m-bar-fill');
      if (!bars.length) return;

      bars.forEach((bar) => bar.classList.add('ol-anim-bar'));

      const revealBar = (bar, delayMs) => {
        bar.style.transitionDelay = delayMs + 'ms';
        bar.classList.add('ol-bar-filled');
      };

      if (!('IntersectionObserver' in window)) {
        bars.forEach((bar, idx) => revealBar(bar, Math.min(idx * 45, 500)));
        return;
      }

      const barObs = new IntersectionObserver((entries) => {
        let batchIdx = 0;
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            const delay = Math.min(batchIdx * 55, 550);
            batchIdx++;
            requestAnimationFrame(() => revealBar(ent.target, delay));
            barObs.unobserve(ent.target);
          }
        });
      }, { threshold: 0.12 });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bars.forEach((bar) => barObs.observe(bar));
        });
      });

      window.addEventListener('beforeprint', () => {
        bars.forEach((bar) => {
          bar.style.transitionDelay = '0ms';
          bar.classList.add('ol-bar-filled');
        });
      });
    }

    initPhotoSlots();
    initAnimatedProgressBars();
    setLanguage(getCurrentLang());
    setTheme(getCurrentTheme(), false);
    loadLiveResumeJson();

    window.addEventListener('message', (ev) => {
      if (ev.data && ev.data.type === 'OL_SET_LANG') {
        setLanguage(ev.data.lang);
      }
      if (ev.data && ev.data.type === 'OL_SET_THEME') {
        setTheme(ev.data.theme, true);
      }
      if (ev.data && ev.data.type === 'OL_OPEN_MODAL') {
        openProjectModal(ev.data.project || 'redis-gui');
      }
      if (ev.data && ev.data.type === 'OL_SET_PHOTO' && !isPhotoLocked()) {
        applySavedPhoto(ev.data.photo);
      }
      if (ev.data && ev.data.type === 'OL_PRINT') {
        syncPrintBackground();
        window.print();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSwitcherToolbar);
  } else {
    injectSwitcherToolbar();
  }
})();
