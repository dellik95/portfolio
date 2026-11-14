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
    }
  ];

  const I18N = {
    en: {
      role: 'Senior Full Stack Software Engineer',
      role_sub: '.NET/C#, Angular & React • 190+ Microservices • AWS Serverless & AI Agents',
      location: 'Spain (Remote / Hybrid)',
      exp_badge: '9+ Years Experience • 2 Years Tech Lead • 190+ Microservices Scale',
      summary_title: 'About Me',
      summary_text:
        'Senior Full-Stack .NET Engineer with 9+ years of commercial experience (including 2 years as a Tech Lead) designing and building scalable, high-performance applications and highly distributed systems across Healthcare (Automated Payments), WMS, and CRM domains. My core expertise spans .NET/C#, Angular, React.js, and cloud technologies, with extensive hands-on experience evolving complex architectures — including highly distributed platforms consisting of 190+ microservices alongside multiple monoliths, communicating through synchronous HTTP/GraphQL APIs and asynchronous event-driven messaging patterns (RabbitMQ, Kafka, EventBridge, SNS, Azure Service Bus).\n\nOver the past 1.5+ years, my focus has increasingly shifted toward cloud-native development and AI-driven software engineering, with AWS as my primary cloud platform (Lambda, Step Functions, EventBridge, API Gateway, DynamoDB, S3, SNS) alongside Azure. I actively use AI to accelerate the software development lifecycle (SDLC) and have hands-on experience integrating AI agents and LLM workflows (Semantic Kernel, OpenAI, MCP) into products to enable intelligent automation, backed by strong full-cycle testing discipline (Unit, Component, and Playwright E2E testing).',
      skills_title: 'Technical Arsenal & Skills',
      exp_title: 'Professional Experience',
      portfolio_title: 'Featured Portfolio & Products',
      portfolio_sub: 'Production-grade open-source tools, platforms & engineering systems',
      edu_title: 'Education',
      lang_title: 'Languages',
      contact_title: 'Contact & Links',
      download_cv: 'Download PDF CV',
      open_landing_cta: 'Explore RedisGUI →',
      github_cta: 'GitHub Repository',
      edu_degree: "Master's Degree in Computer Engineering",
      edu_uni: 'National Aviation University (NAU)',
      lang_uk: 'Ukrainian — Native',
      lang_en: 'English — Intermediate (B1+/B2)',
      photo_hint: 'Click to upload photo',
      // DataArt Experience
      da_role: 'Senior Full Stack Software Engineer',
      da_date: 'September 2025 – Present',
      da_domain: 'Large-Scale Healthcare Platform — Automated Payments (AutoPay) Team',
      da_b1: 'Driving development and end-to-end automation of recurring payment workflows (AutoPay) within a large-scale enterprise Healthcare platform.',
      da_b2: 'Owned architecture and integration with the internal Payment Gateway, ensuring reliable, idempotent, and compliant payment processing.',
      da_b3: 'Designed and built internal operational & support tools from scratch for production data remediation, automated data backfills, and high-volume bulk operations.',
      da_b4: 'Engineered event-driven serverless workflows on AWS using Lambda, Step Functions, EventBridge, SNS, S3, API Gateway, DynamoDB, and SQL, backed by Playwright E2E automation.',
      // FluentPro Experience
      fp_role: 'Senior Full Stack Software Engineer',
      fp_date: 'April 2025 – September 2025',
      fp_b1: 'Developed new features and enhanced existing functionality within a scalable analytics platform leveraging AI for enriched data interpretation and dynamic content generation.',
      fp_b2: 'Implemented an admin interface for configuring dynamic templates and placeholder queries, enabling flexible data retrieval and AI-augmented insights.',
      fp_b3: 'Integrated Semantic Kernel to orchestrate AI workflows, combining structured data with advanced natural language processing and generation capabilities using OpenAI services.',
      fp_b4: 'Designed and maintained backend services using Azure Functions and Azure Service Bus to support reliable, event-driven, and asynchronous data processing.',
      fp_b5: 'Authored comprehensive automated tests and conducted thorough code reviews to guarantee code quality and maintainability.',
      // GlobalLogic Experience
      gl_role: 'Senior Software Engineer',
      gl_date: 'October 2022 – April 2025',
      gl_b1: 'Developed resilient microservices for a high-throughput Warehouse Management & Automation System (WMS).',
      gl_b2: 'Drove monolith decomposition into independent, scalable microservices.',
      gl_b3: 'Expanded unit and component test coverage across mission-critical services.',
      gl_b4: 'Investigated and resolved complex production issues and executed system-wide performance optimizations.',
      gl_b5: 'Built new API integrations and developed stub/mock applications for external hardware and ERP systems.',
      gl_b6: 'Collaborated closely with product owners and cross-functional engineering teams.',
      // Rozetka Experience
      rz_role: 'Full-Stack Engineer / Tech Leader',
      rz_date: 'May 2018 – October 2022',
      rz_desc: 'Led engineering on a large-scale Digital Document Flow & CRM ecosystem (based on Bpm’Online CRM) and architected a custom Request Processing System from scratch.',
      rz_b1: 'Built the frontend architecture from scratch and created a reusable UI component library powered by GraphQL (dynamic dropdowns, virtual tables, configurable pages).',
      rz_b2: 'Created and maintained the core Digital Document Flow system and high-volume API integrations.',
      rz_b3: 'Communicated directly with business stakeholders, managed production deployments, and resolved critical incidents.',
      rz_b4: 'Led and mentored developers as Tech Lead with close cross-team coordination.',
      // Avon Experience
      av_role: 'Junior Software Developer (.NET)',
      av_date: 'July 2017 – May 2018',
      av_b1: 'Designed and developed modular, extensible object-oriented .NET code.',
      av_b2: 'Maintained and enhanced enterprise applications across both client and server tiers.',
      // Portfolio items
      rg_badge: 'Open-Source Product • .NET 11 + Angular 22 + SignalR',
      rg_title: 'RedisGUI — Modern Redis Studio & Observability Platform',
      rg_desc: 'Enterprise-grade, high-performance Redis management studio and diagnostics platform built on .NET 11, ASP.NET Core Minimal APIs, Clean Architecture (CQRS / MediatR), SignalR WebSockets, and Angular 22 Signals.',
      rg_f1: 'Visual Strategy-based editors for Strings, Hashes, Lists, Sets, ZSets & Streams',
      rg_f2: 'Sub-second SignalR telemetry (Ops/sec, Memory RSS, CPU) & Slowlog diagnostics',
      rg_f3: 'Built-in multi-DB CLI drawer, Synthetic Load Tester (p50/p95/p99) & 10k Key Seeder',
      rg_f4: 'Enterprise RBAC, JWT Auth, Audit Logging & Production Safe Mode',
      tm_badge: 'Modular Monolith + Design System',
      tm_title: 'TalentMind & @dellik95/ui — AI Recruitment Platform',
      tm_desc: 'Full-scale recruitment platform built as an ASP.NET Core Modular Monolith + Angular 22 SPA with an AI Copilot, workflow automation engine, GraphQL DSL generator, multi-tenancy, and a private npm design-system (@dellik95/ui).',
      cl_badge: 'AI Agent Tooling • MCP Server',
      cl_title: 'Claudy (Context Platform) — Codebase Memory & Hybrid Search',
      cl_desc: 'Token-efficient codebase intelligence and persistent memory platform for AI coding agents using hybrid search (FTS5 + vector cosine + tree-sitter AST symbol graph), live SignalR dashboard, and MCP server tools.',
      yt_badge: 'Engineering Education • 40+ Modules',
      yt_title: '.NET Engineering Academy — Deep-Dive Technical Courses',
      yt_desc: 'Comprehensive curriculum and interactive learning hub covering AI in .NET (Microsoft Agent Framework, RAG, Qdrant, MCP), Docker & Kubernetes for .NET Developers, C# CLR Internals, and ASP.NET Core Security.'
    },
    uk: {
      role: 'Senior Full Stack Software Engineer',
      role_sub: '.NET/C#, Angular та React • 190+ Мікросервісів • AWS Serverless та AI-агенти',
      location: 'Іспанія (Remote / Hybrid)',
      exp_badge: '9+ років досвіду • 2 роки Tech Lead • Масштаб 190+ мікросервісів',
      summary_title: 'Про мене',
      summary_text:
        'Senior Full-Stack .NET інженер із понад 9-річним комерційним досвідом (включно з 2 роками на позиції Tech Lead) у проєктуванні та розробці масштабованих, високопродуктивних додатків і високонавантажених розподілених систем у сферах Healthcare (автоматизація платежів), WMS та CRM. Моя ключова експертиза охоплює .NET/C#, Angular, React.js та хмарні технології з глибоким практичним досвідом розвитку складних архітектур — зокрема високорозподілених платформ зі 190+ мікросервісів поруч із кількома монолітами, що взаємодіють через синхронні HTTP/GraphQL API та асинхронні патерни обміну повідомленнями (RabbitMQ, Kafka, EventBridge, SNS, Azure Service Bus).\n\nПротягом останніх 1.5+ років мій фокус дедалі більше зосереджений на cloud-native розробці та AI-driven програмній інженерії, де AWS є моєю основною хмарною платформою (Lambda, Step Functions, EventBridge, API Gateway, DynamoDB, S3, SNS) разом із Azure. Я активно використовую AI для вдосконалення й прискорення життєвого циклу розробки (SDLC) та маю практичний досвід інтеграції AI-агентів і LLM-воркфлоу (Semantic Kernel, OpenAI, MCP) у продукти для інтелектуальної автоматизації, дотримуючись високих стандартів повного циклу тестування (Unit, Component та Playwright E2E).',
      skills_title: 'Технічний стек та навички',
      exp_title: 'Професійний досвід',
      portfolio_title: 'Портфоліо та Власні Проєкти',
      portfolio_sub: 'Власні продукти, open-source інструменти та інженерні платформи',
      edu_title: 'Освіта',
      lang_title: 'Мови',
      contact_title: 'Контакти та Посилання',
      download_cv: 'Завантажити PDF CV',
      open_landing_cta: 'Детальніше про RedisGUI →',
      github_cta: 'GitHub Репозиторій',
      edu_degree: 'Магістр комп’ютерної інженерії',
      edu_uni: 'Національний авіаційний університет (НАУ)',
      lang_uk: 'Українська — Рідна',
      lang_en: 'Англійська — Intermediate (B1+/B2)',
      photo_hint: 'Натисніть, щоб додати фото',
      // DataArt Experience
      da_role: 'Senior Full Stack Software Engineer',
      da_date: 'Вересень 2025 – Теперішній час',
      da_domain: 'Масштабна Healthcare-система — Команда автоматичних платежів (AutoPay)',
      da_b1: 'Розробка та розвиток функціоналу автоматизації платежів (Auto-Payment) у великій корпоративній Healthcare-платформі.',
      da_b2: 'Відповідальність за проєктування та інтеграцію з внутрішнім платіжним шлюзом (Payment Gateway) для надійної обробки транзакцій.',
      da_b3: 'Створення з нуля внутрішніх інструментів (internal tools) для підтримки та виправлення продакшн-даних, виконання backfill-процесів та масових (bulk) операцій над даними.',
      da_b4: 'Побудова serverless та event-driven пайплайнів у AWS (EventBridge, Lambda, Step Functions, S3, SNS, API Gateway, DynamoDB, SQL), фронтенду на React.js та E2E-тестування на Playwright.',
      // FluentPro Experience
      fp_role: 'Senior Full Stack Software Engineer',
      fp_date: 'Квітень 2025 – Вересень 2025',
      fp_b1: 'Розробка нових фіч та розвиток масштабованої аналітичної платформи з використанням AI для збагаченої інтерпретації даних і динамічної генерації контенту.',
      fp_b2: 'Реалізація адмін-інтерфейсу для налаштування динамічних шаблонів і параметризованих запитів для гнучкої вибірки даних та AI-інсайтів.',
      fp_b3: 'Інтеграція Semantic Kernel для оркестрації AI-воркфлоу, поєднання структурованих даних із можливостями NLP та генерації через OpenAI.',
      fp_b4: 'Проєктування та підтримка бекенд-сервісів на базі Azure Functions та Azure Service Bus для надійної подійно-орієнтованої та асинхронної обробки даних.',
      fp_b5: 'Написання комплексних автоматизованих тестів та проведення ретельних код-рев’ю для забезпечення високої якості коду.',
      // GlobalLogic Experience
      gl_role: 'Senior Software Engineer',
      gl_date: 'Жовтень 2022 – Квітень 2025',
      gl_b1: 'Розробка мікросервісів для високонавантаженої системи автоматизації складу (Warehouse Management System).',
      gl_b2: 'Декомпозиція монолітної системи на незалежні мікросервіси.',
      gl_b3: 'Покриття коду unit- та компонентними тестами.',
      gl_b4: 'Дослідження та вирішення складних продакшн-інцидентів, оптимізація продуктивності системи.',
      gl_b5: 'Створення нових API-інтеграцій та розробка Stub/Mock-додатків для емуляції зовнішніх систем.',
      gl_b6: 'Тісна співпраця з Product Owner-ами та крос-командна взаємодія.',
      // Rozetka Experience
      rz_role: 'Full-Stack Engineer / Tech Leader',
      rz_date: 'Травень 2018 – Жовтень 2022',
      rz_desc: 'Ключова роль у розробці масштабної системи електронного документообігу (CRM на базі Bpm’Online) та створення системи обробки заявок з нуля.',
      rz_b1: 'Розробка фронтенду з нуля та створення бібліотеки конфігурованих UI-компонентів, що працюють з GraphQL (Dropdowns, Tables, Pages).',
      rz_b2: 'Створення та розвиток системи документообігу і нових API-інтеграцій.',
      rz_b3: 'Комунікація зі стейкхолдерами, проведення релізів нових фіч та вирішення продакшн-проблем.',
      rz_b4: 'Технічне лідерство, координація команди та міжкомандна взаємодія.',
      // Avon Experience
      av_role: 'Junior Software Developer (.NET)',
      av_date: 'Липень 2017 – Травень 2018',
      av_b1: 'Проєктування та розробка модульного, розширюваного коду на C# / .NET Framework.',
      av_b2: 'Підтримка та розвиток клієнт-серверних корпоративних додатків.',
      // Portfolio items
      rg_badge: 'Власний продукт • .NET 11 + Angular 22 + SignalR',
      rg_title: 'RedisGUI — Сучасна студія управління та моніторингу Redis',
      rg_desc: 'Високопродуктивна enterprise-платформа для візуального адміністрування та діагностики Redis, побудована на .NET 11, ASP.NET Core Minimal APIs, Clean Architecture (CQRS / MediatR), SignalR та Angular 22 Signals.',
      rg_f1: 'Візуальні редактори для всіх типів Redis (Strings, Hashes, Lists, Sets, ZSets, Streams)',
      rg_f2: 'Real-time телеметрія через SignalR (Ops/sec, Memory RSS, CPU) та аналізатор Slowlog',
      rg_f3: 'Вбудований Redis CLI термінал, генератор навантаження (p50/p95/p99) та Seeder на 10k ключів',
      rg_f4: 'RBAC-авторизація (JWT), аудит-логування та безпечний Read-Only режим для продакшну',
      tm_badge: 'Модульний моноліт + Дизайн-система',
      tm_title: 'TalentMind & @dellik95/ui — AI-платформа рекрутингу',
      tm_desc: 'Масштабна рекрутингова система (ASP.NET Core Modular Monolith + Angular 22 SPA) з AI-копілотом, рушієм автоматизації воркфлоу, генератором GraphQL DSL та власною бібліотекою компонентів @dellik95/ui.',
      cl_badge: 'AI Agent Tooling • MCP Сервер',
      cl_title: 'Claudy (Context Platform) — Кодова пам’ять та гібридний пошук',
      cl_desc: 'Платформа збереження контексту та семантичного індексування коду для AI-агентів (FTS5 + векторний пошук + AST граф символів tree-sitter), SignalR-дашборд та MCP-інструменти.',
      yt_badge: 'Освітній хаб • 40+ модулів',
      yt_title: '.NET Engineering Academy — Авторські технічні курси',
      yt_desc: 'Поглиблені інженерні курси: AI у .NET (Microsoft Agent Framework, RAG, MCP), Docker та Kubernetes для .NET розробника, C# CLR Internals, ASP.NET Core Security та 24 спеціалізованих модулі.'
    }
  };

  function syncPrintBackground() {
    const printBg = document.getElementById('ol-print-page-bg');
    if (!printBg) return;
    const bodyStyle = window.getComputedStyle(document.body);
    printBg.style.backgroundColor = bodyStyle.backgroundColor;
    printBg.style.backgroundImage = bodyStyle.backgroundImage;
  }

  function getCurrentTemplateMeta() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    return TEMPLATES.find((t) => t.file === currentFile) || null;
  }

  function getCurrentTheme() {
    try {
      const saved = localStorage.getItem('ol_cv_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    const meta = getCurrentTemplateMeta();
    return (meta && meta.nativeTheme) || 'light';
  }

  function setTheme(theme, persist = true) {
    if (theme !== 'light' && theme !== 'dark') return;
    if (persist) {
      try {
        localStorage.setItem('ol_cv_theme', theme);
      } catch (e) {}
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === theme);
    });
    // Re-sync full-bleed print background layer after styles recompute
    window.requestAnimationFrame(syncPrintBackground);
    if (window.self !== window.top && window.parent) {
      try {
        window.parent.postMessage({ type: 'OL_THEME_STATE', theme }, '*');
      } catch (e) {}
    }
  }

  function getCurrentLang() {
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
    const dict = I18N[lang] || I18N.en;
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

  function initPhotoSlots() {
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
    const isInTemplatesDir = window.location.pathname.replace(/\\/g, '/').includes('/templates/');
    const redisLandingUrl = isInTemplatesDir ? '../projects/redis-gui.html' : 'projects/redis-gui.html';

    if (projectId === 'redis-gui') {
      window.location.href = redisLandingUrl;
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
      html.tpl-02[data-theme="light"] .git-graph {
        border-left-color: #cbd5e1;
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
        .em-exp-item {
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

    const isStandaloneResume = !!document.querySelector('meta[name="ol-standalone-resume"]');
    if (isStandaloneResume || currentFile !== 'index.html') {
      const bar = document.createElement('nav');
      bar.id = 'ol-floating-switcher';
      bar.setAttribute('aria-label', isStandaloneResume ? 'Resume Controls' : 'Template Switcher');

      const itemsHtml = isStandaloneResume ? '' : TEMPLATES.map((t) => {
        const active = currentFile === t.file ? 'active' : '';
        return `<a href="${prefix}${t.file}" class="ol-sw-item ${active}" title="${t.tag}">
          <span class="ol-sw-dot" style="background:${t.accent}"></span>
          <span>${t.num}. ${t.name}</span>
        </a>`;
      }).join('');

      const hubSwitchHtml = isStandaloneResume ? '' : `
        <a href="${hubHref}" class="ol-sw-hub">⊞ All 9</a>
      `;
      const templatesDividerHtml = isStandaloneResume ? '' : `
        <div class="ol-sw-divider"></div>
        ${itemsHtml}
      `;

      bar.innerHTML = `
        ${hubSwitchHtml}
        <a href="${isInTemplatesDir ? '../projects/redis-gui.html' : 'projects/redis-gui.html'}" class="ol-sw-hub" style="background:rgba(239,68,68,0.16);border-color:rgba(239,68,68,0.4);color:#fca5a5;">🚀 RedisGUI</a>
        <button type="button" class="ol-sw-hub" onclick="window.print()" title="Print / Save as PDF">🖨 Print</button>
        ${templatesDividerHtml}
        <div class="ol-sw-divider"></div>
        <div class="ol-sw-lang-group" title="Light / Dark Theme">
          <button type="button" class="ol-sw-lang" data-theme-btn="light">☀</button>
          <button type="button" class="ol-sw-lang" data-theme-btn="dark">🌙</button>
        </div>
        <div class="ol-sw-lang-group">
          <button type="button" class="ol-sw-lang" data-lang-btn="en">EN</button>
          <button type="button" class="ol-sw-lang" data-lang-btn="uk">UA</button>
        </div>
      `;
      document.body.appendChild(bar);

      bar.querySelectorAll('[data-lang-btn]').forEach((btn) => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang-btn')));
      });
      bar.querySelectorAll('[data-theme-btn]').forEach((btn) => {
        btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme-btn'), true));
      });
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
      if (ev.data && ev.data.type === 'OL_SET_PHOTO') {
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
