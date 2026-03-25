import { techStackItems, certificateItems, courseItems } from './data.js';
import { translations } from './i18n.js';

const typedText = document.getElementById('typed-text');
const cursor = document.getElementById('cursor');
const languageButtons = document.querySelectorAll('[data-lang]');
const root = document.documentElement;
const floatingLanguage = document.getElementById('floating-language');
const floatingLanguageTrigger = document.getElementById('floating-language-trigger');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const topbar = document.querySelector('.topbar');

const moonIcon = `
  <svg viewBox="0 0 24 24" focusable="false">
    <path
      d="M14.89 3.32a1 1 0 0 1 .24 1.09a7.5 7.5 0 0 0 8.86 10.13a1 1 0 0 1 1.08.24a1.02 1.02 0 0 1 .16 1.1A10.5 10.5 0 1 1 13.79 2.16a1 1 0 0 1 1.1.16Z"
      fill="currentColor"
    />
  </svg>
`;

const sunIcon = `
  <svg viewBox="0 0 24 24" focusable="false">
    <path
      d="M12 6.25A5.75 5.75 0 1 0 17.75 12A5.76 5.76 0 0 0 12 6.25Zm0-4a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm0 17a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V20a.75.75 0 0 1 .75-.75Zm9.75-8a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5h1.5Zm-17 0a.75.75 0 0 1 0 1.5H3.25a.75.75 0 0 1 0-1.5h1.5Zm12.02-6.27a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06Zm-11.6 11.6a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06Zm12.66 2.12a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0Zm-11.6-11.6a.75.75 0 0 1 0-1.06L6.39 4.98a.75.75 0 1 1 1.06 1.06L6.39 7.1a.75.75 0 0 1-1.06 0Z"
      fill="currentColor"
    />
  </svg>
`;

const elements = {
  metaDescription: document.querySelector('meta[name="description"]'),
  nav: document.querySelectorAll('.nav a'),
  heroEyebrow: document.getElementById('hero-eyebrow'),
  heroDescription: document.getElementById('hero-description'),
  heroActions: document.querySelectorAll('.hero-actions a'),
  aboutKicker: document.getElementById('about-kicker'),
  aboutTitle: document.getElementById('about-title'),
  profileRole: document.getElementById('profile-role'),
  profileName: document.getElementById('profile-name'),
  profileDescription: document.getElementById('profile-description'),
  overviewKicker: document.getElementById('overview-kicker'),
  overviewTitle: document.getElementById('overview-title'),
  overviewItems: document.getElementById('overview-items'),
  experienceKicker: document.getElementById('experience-kicker'),
  experienceTitle: document.getElementById('experience-title'),
  experienceSummary: document.getElementById('experience-summary'),
  timeline: document.getElementById('timeline'),
  stackKicker: document.getElementById('stack-kicker'),
  stackTitle: document.getElementById('stack-title'),
  techStackGrid: document.getElementById('tech-stack-grid'),
  certKicker: document.getElementById('cert-kicker'),
  certTitle: document.getElementById('cert-title'),
  certGrid: document.getElementById('certificate-grid'),
  courseKicker: document.getElementById('course-kicker'),
  courseTitle: document.getElementById('course-title'),
  courseGrid: document.getElementById('course-grid'),
  highlightItems: document.querySelectorAll('[data-highlight-index]'),
  blogKicker: document.getElementById('blog-kicker'),
  blogTitle: document.getElementById('blog-title'),
  blogDescription: document.getElementById('blog-description'),
  blogLinkLabel: document.getElementById('blog-link-label'),
  contactKicker: document.getElementById('contact-kicker'),
  contactTitle: document.getElementById('contact-title'),
};

let currentLang = localStorage.getItem('github-home-lang') || 'ko';
let typingToken = 0;
let currentTheme = localStorage.getItem('github-home-theme') || 'light';

function buildTechStack(mainLabel) {
  const sortedTechStackItems = [...techStackItems].sort((a, b) => {
    if (a.isMain !== b.isMain) {
      return a.isMain ? -1 : 1;
    }

    if (a.proficiency !== b.proficiency) {
      return b.proficiency - a.proficiency;
    }

    return a.name.localeCompare(b.name);
  });

  elements.techStackGrid.innerHTML = sortedTechStackItems
    .map((item) => {
      const filled = Math.floor(item.proficiency / 20);
      const empty = 5 - filled;
      return `<article class="tech-card"><div class="tech-icon">${item.icon}</div><div class="tech-body"><p class="tech-name">${item.name}</p><div class="skill-boxes">${Array.from({ length: filled }, () => '<span class="skill-box skill-box-filled"></span>').join('')}${Array.from({ length: empty }, () => '<span class="skill-box"></span>').join('')}</div></div>${item.isMain ? `<span class="main-ribbon">${mainLabel}</span>` : ''}</article>`;
    })
    .join('');
}

function buildCertificates(lang) {
  elements.certGrid.innerHTML = certificateItems
    .map((item) => `<a class="certificate-card" href="${item.url}" target="_blank" rel="noreferrer"><span class="certificate-issued-date">${item.issueDate}</span><div class="certificate-image-wrap"><img class="certificate-image" src="${item.image}" alt="${item.title[lang]}" /></div><div class="certificate-body"><div class="certificate-heading"><span class="certificate-title-local">${item.title[lang]}</span><span class="certificate-issuer">${item.issuer}</span></div></div></a>`)
    .join('');
}

function buildCourses(lang, emptyMessage) {
  if (!courseItems.length) {
    elements.courseGrid.innerHTML = '';
    return;
  }

  const sortedCourseItems = [...courseItems].sort((a, b) => {
    return new Date(b.completedDate.replaceAll('.', '-') ).getTime() - new Date(a.completedDate.replaceAll('.', '-')).getTime();
  });

  elements.courseGrid.innerHTML = sortedCourseItems
    .map((item) => `<a class="course-card" href="${item.url}" target="_blank" rel="noreferrer"><span class="course-completed-date">${item.completedDate}</span><div class="course-provider">${item.provider}</div><h3 class="course-title">${item.title[lang]}</h3><span class="course-period">${item.period}</span><p class="muted">${item.description[lang]}</p></a>`)
    .join('');
}

function buildOverview(items) {
  elements.overviewItems.innerHTML = items.map(([label, text]) => `<div><span class="label">${label}</span><p>${text}</p></div>`).join('');
}

function buildTimeline(items) {
  const companyIcon = `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5.75 19.25V6.75c0-.55.45-1 1-1h10.5c.55 0 1 .45 1 1v12.5M4.5 19.25h15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 8.75h1.5v1.5H9Zm0 3.25h1.5v1.5H9Zm4.5-3.25H15v1.5h-1.5Zm0 3.25H15v1.5h-1.5Z" fill="currentColor"/>
    </svg>
  `;
  const schoolIcon = `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 4.5 3 8.75 12 13l7.03-3.32v4.12a.75.75 0 1 0 1.5 0V9L21 8.75 12 4.5Zm-5.5 7.33v3.04c0 .57.32 1.08.83 1.34 3.07 1.57 6.77 1.57 9.84 0 .51-.26.83-.77.83-1.34v-3.04L12 14.96l-5.5-3.13Z" fill="currentColor"/>
    </svg>
  `;

  elements.timeline.innerHTML = items.map(([period, title, role, description]) => {
    const isSchool = /school|university/i.test(title);
    const icon = isSchool ? schoolIcon : companyIcon;

    return `<article class="timeline-item"><span class="timeline-period">${period}</span><h3 class="timeline-title"><span class="timeline-title-icon">${icon}</span><span>${title}</span></h3><p class="timeline-role">${role}</p>${description ? `<p class="muted">${description}</p>` : ''}</article>`;
  }).join('');
}

function renderTypedText(text) {
  if (currentLang === 'ko' && text.includes('김상순')) {
    typedText.innerHTML = text.replace('김상순', '<span class="rainbow-name">김상순</span>');
    return;
  }
  if (text.includes('Sangsun Kim')) {
    typedText.innerHTML = text.replace('Sangsun Kim', '<span class="rainbow-name">Sangsun Kim</span>');
    return;
  }
  typedText.textContent = text;
}

function startTyping(fullText, lang) {
  const token = ++typingToken;
  let index = 0;
  typedText.textContent = '';
  cursor.style.opacity = '1';

  function step() {
    if (token !== typingToken || currentLang !== lang) return;
    if (index <= fullText.length) {
      renderTypedText(fullText.slice(0, index));
      index += 1;
      window.setTimeout(step, 80);
      return;
    }
  }

  step();
}

function setLanguage(lang) {
  const t = translations[lang];
  currentLang = lang;
  root.lang = lang;
  elements.metaDescription.setAttribute('content', t.metaDescription);
  elements.nav.forEach((node, index) => { node.textContent = t.nav[index]; });
  elements.heroEyebrow.textContent = t.heroEyebrow;
  elements.heroDescription.textContent = t.heroDescription;
  elements.heroActions.forEach((node, index) => { node.textContent = t.heroActions[index]; });
  elements.aboutKicker.textContent = t.aboutKicker;
  elements.aboutTitle.textContent = t.aboutTitle;
  elements.profileRole.textContent = t.profileRole;
  elements.profileName.textContent = t.profileName;
  elements.profileDescription.textContent = t.profileDescription;
  elements.overviewKicker.textContent = t.overviewKicker;
  elements.overviewTitle.textContent = t.overviewTitle;
  buildOverview(t.overviewItems);
  elements.experienceKicker.textContent = t.experienceKicker;
  elements.experienceTitle.textContent = t.experienceTitle;
  elements.experienceSummary.textContent = t.experienceSummary;
  buildTimeline(t.timeline);
  elements.stackKicker.textContent = t.stackKicker;
  elements.stackTitle.textContent = t.stackTitle;
  buildTechStack(t.stackMainLabel);
  elements.certKicker.textContent = t.certKicker;
  elements.certTitle.textContent = t.certTitle;
  buildCertificates(lang);
  elements.courseKicker.textContent = t.courseKicker;
  elements.courseTitle.textContent = t.courseTitle;
  buildCourses(lang, t.courseEmpty);
  elements.highlightItems.forEach((node) => { node.textContent = t.highlights[Number(node.dataset.highlightIndex)]; });
  elements.blogKicker.textContent = t.blogKicker;
  elements.blogTitle.textContent = t.blogTitle;
  elements.blogDescription.textContent = t.blogDescription;
  elements.blogLinkLabel.textContent = t.blogLinkLabel;
  elements.contactKicker.textContent = t.contactKicker;
  elements.contactTitle.textContent = t.contactTitle;
  languageButtons.forEach((button) => { button.classList.toggle('is-active', button.dataset.lang === lang); });
  if (floatingLanguageTrigger) {
    floatingLanguageTrigger.setAttribute('aria-expanded', 'false');
  }
  if (floatingLanguage) {
    floatingLanguage.classList.remove('is-open');
  }
  localStorage.setItem('github-home-lang', lang);
  startTyping(t.heroText, lang);
}

function applyTheme(theme) {
  currentTheme = theme;
  root.setAttribute('data-theme', theme);
  if (themeToggleIcon) {
    themeToggleIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  localStorage.setItem('github-home-theme', theme);
}

function syncTopbarState() {
  if (!topbar) return;
  topbar.classList.toggle('is-scrolled', window.scrollY > 16);
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

if (floatingLanguageTrigger && floatingLanguage) {
  floatingLanguageTrigger.addEventListener('click', () => {
    const isOpen = floatingLanguage.classList.toggle('is-open');
    floatingLanguageTrigger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!floatingLanguage.contains(event.target)) {
      floatingLanguage.classList.remove('is-open');
      floatingLanguageTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

window.addEventListener('scroll', syncTopbarState, { passive: true });

applyTheme(currentTheme === 'dark' ? 'dark' : 'light');
setLanguage(translations[currentLang] ? currentLang : 'ko');
syncTopbarState();
