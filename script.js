import { techStackItems, certificateItems, courseItems } from './data.js';
import { translations } from './i18n.js';

const typedText = document.getElementById('typed-text');
const cursor = document.getElementById('cursor');
const languageButtons = document.querySelectorAll('[data-lang]');
const root = document.documentElement;
const floatingLanguage = document.getElementById('floating-language');
const floatingLanguageTrigger = document.getElementById(
  'floating-language-trigger',
);
const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const topbar = document.querySelector('.topbar');
const scrollProgressBar = document.getElementById('scroll-progress-bar');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!motionPreference.matches && 'IntersectionObserver' in window) {
  root.classList.add('motion-ready');
}

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

const courseCompletedIcon = `
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path
      d="M7.25 3.75a.75.75 0 0 1 .75.75v1h8v-1a.75.75 0 0 1 1.5 0v1h.75A2.75 2.75 0 0 1 21 9.25v8A2.75 2.75 0 0 1 18.25 20h-12.5A2.75 2.75 0 0 1 3 17.25v-8A2.75 2.75 0 0 1 5.75 6.5h.75v-1a.75.75 0 0 1 .75-.75Zm11.25 6H4.5v7.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25v-7.5Zm-12.75-1.75c-.69 0-1.25.56-1.25 1.25v.25h15v-.25c0-.69-.56-1.25-1.25-1.25h-12.5Z"
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
  studyLogLinkLabel: document.getElementById('study-log-link-label'),
  contactKicker: document.getElementById('contact-kicker'),
  contactTitle: document.getElementById('contact-title'),
  contactLinks: document.getElementById('contact-links'),
  contactLabels: document.querySelectorAll('[data-contact-label]'),
  contactForm: document.getElementById('contact-form'),
  contactFormTitle: document.getElementById('contact-form-title'),
  contactFormDescription: document.getElementById(
    'contact-form-description',
  ),
  contactEmailLabel: document.getElementById('contact-email-label'),
  contactEmail: document.getElementById('contact-email'),
  contactSubjectLabel: document.getElementById('contact-subject-label'),
  contactSubject: document.getElementById('contact-subject'),
  contactMessageLabel: document.getElementById('contact-message-label'),
  contactMessage: document.getElementById('contact-message'),
  contactSubmitLabel: document.getElementById('contact-submit-label'),
  contactFormNote: document.getElementById('contact-form-note'),
  contactFormStatus: document.getElementById('contact-form-status'),
};

let currentLang = localStorage.getItem('github-home-lang') || 'ko';
let typingToken = 0;
let currentTheme = localStorage.getItem('github-home-theme') || 'light';
let revealObserver = null;
let observedRevealTargets = new WeakSet();
let scrollUpdateQueued = false;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function getTechIconMarkup(item) {
  const fallback = escapeHtml(item.icon);

  if (!item.iconUrl) {
    return fallback;
  }

  return `<img class="tech-icon-image" src="${escapeHtml(item.iconUrl)}" alt="${escapeHtml(item.name)} icon" data-fallback="${fallback}" loading="lazy" decoding="async" />`;
}

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
      return `<article class="tech-card"><div class="tech-icon">${getTechIconMarkup(item)}</div><div class="tech-body"><p class="tech-name">${escapeHtml(item.name)}</p><div class="skill-boxes">${Array.from({ length: filled }, () => '<span class="skill-box skill-box-filled"></span>').join('')}${Array.from({ length: empty }, () => '<span class="skill-box"></span>').join('')}</div></div>${item.isMain ? `<span class="main-ribbon">${escapeHtml(mainLabel)}</span>` : ''}</article>`;
    })
    .join('');

  elements.techStackGrid
    .querySelectorAll('.tech-icon-image')
    .forEach((image) => {
      image.addEventListener('error', () => {
        const icon = image.closest('.tech-icon');

        if (icon) {
          icon.textContent = image.dataset.fallback || '';
        }
      });
    });
}

function buildCertificates(lang) {
  elements.certGrid.innerHTML = certificateItems
    .map(
      (item) =>
        `<a class="certificate-card" href="${item.url}" target="_blank" rel="noreferrer"><span class="certificate-issued-date">${item.issueDate}</span><div class="certificate-image-wrap"><img class="certificate-image" src="${item.image}" alt="${item.title[lang]}" /></div><div class="certificate-body"><div class="certificate-heading"><span class="certificate-title-local">${item.title[lang]}</span><span class="certificate-issuer">${item.issuer}</span></div></div></a>`,
    )
    .join('');
}

function buildCourses(lang, emptyMessage) {
  if (!courseItems.length) {
    elements.courseGrid.innerHTML = '';
    return;
  }

  const getCompletedTimestamp = (item) => {
    if (!item.completedDate) {
      return Number.NEGATIVE_INFINITY;
    }

    return new Date(item.completedDate.replaceAll('.', '-')).getTime();
  };

  const getCourseDescription = (item) => {
    return (
      item.description?.[lang] ?? item.description?.description?.[lang] ?? ''
    );
  };

  const sortedCourseItems = [...courseItems].sort((a, b) => {
    return getCompletedTimestamp(b) - getCompletedTimestamp(a);
  });

  elements.courseGrid.innerHTML = sortedCourseItems
    .map(
      (item) =>
        `<li class="course-list-item"><a class="course-item" href="${item.url}" target="_blank" rel="noreferrer">${item.completedDate ? `<span class="course-completed-date"><span class="course-completed-date-icon">${courseCompletedIcon}</span><span>${item.completedDate}</span></span>` : '<span></span>'}<div class="course-content"><div class="course-provider">${item.provider}</div><h3 class="course-title">${item.title[lang]}</h3><p class="muted">${getCourseDescription(item)}</p></div><span class="course-period">${item.period}</span></a></li>`,
    )
    .join('');
}

function buildOverview(items) {
  elements.overviewItems.innerHTML = items
    .map(
      ([label, text]) =>
        `<div><span class="label">${label}</span><p>${text}</p></div>`,
    )
    .join('');
}

function buildTimeline(items, labels) {
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

  const isEducationItem = ([, title]) =>
    /school|university|학교|대학|schule|universit[aä]t/i.test(title);
  const experienceItems = items.filter((item) => !isEducationItem(item));
  const educationItems = items.filter(isEducationItem);

  const renderItems = (groupItems) =>
    groupItems
      .map(
        ([period, title, role, description]) =>
          `<li class="timeline-item"><span class="timeline-marker" aria-hidden="true"></span><span class="timeline-period">${escapeHtml(period)}</span><h4 class="timeline-title">${escapeHtml(title)}</h4><p class="timeline-role">${escapeHtml(role)}</p>${description ? `<p class="muted">${escapeHtml(description)}</p>` : ''}</li>`,
      )
      .join('');

  const renderGroup = (type, label, icon, groupItems) =>
    `<section class="timeline-group timeline-group-${type}" aria-labelledby="timeline-${type}-title"><div class="timeline-group-head"><span class="timeline-group-icon" aria-hidden="true">${icon}</span><h3 id="timeline-${type}-title">${escapeHtml(label)}</h3><span class="timeline-group-count" aria-hidden="true">${groupItems.length}</span></div><ol class="timeline-list">${renderItems(groupItems)}</ol></section>`;

  elements.timeline.innerHTML = [
    renderGroup(
      'experience',
      labels.experience,
      companyIcon,
      experienceItems,
    ),
    renderGroup('education', labels.education, schoolIcon, educationItems),
  ].join('');
}

function observeRevealTarget(target, direction = 'up', delay = 0) {
  if (!target || !revealObserver || observedRevealTargets.has(target)) return;

  target.dataset.reveal = direction;
  target.style.setProperty('--reveal-delay', `${delay}ms`);
  observedRevealTargets.add(target);
  revealObserver.observe(target);
}

function observeRevealGroup(
  selector,
  { direction = 'up', stagger = 0, maxDelay = 320 } = {},
) {
  document.querySelectorAll(selector).forEach((target, index) => {
    observeRevealTarget(
      target,
      direction,
      Math.min(index * stagger, maxDelay),
    );
  });
}

function registerMotionTargets() {
  observeRevealTarget(document.querySelector('.hero-top-box'), 'up', 40);
  observeRevealTarget(document.querySelector('.hero-bottom-box'), 'up', 140);

  document.querySelectorAll('#about > .card').forEach((target, index) => {
    observeRevealTarget(target, index === 0 ? 'left' : 'right', index * 90);
  });

  observeRevealGroup('.content > .card:not(.hero)', {
    stagger: 0,
  });

  document.querySelectorAll('#highlights > .card').forEach((target, index) => {
    observeRevealTarget(target, index === 0 ? 'left' : 'right', index * 90);
  });

  observeRevealGroup('.intro-points > div', {
    stagger: 70,
    maxDelay: 210,
  });
  observeRevealGroup('.timeline-item', {
    stagger: 70,
    maxDelay: 280,
  });
  observeRevealGroup('.tech-card', {
    stagger: 36,
    maxDelay: 288,
  });
  observeRevealGroup('.certificate-card', {
    stagger: 55,
    maxDelay: 275,
  });
  observeRevealGroup('.course-list-item', {
    stagger: 36,
    maxDelay: 144,
  });
  observeRevealGroup('.contact-item', {
    stagger: 70,
    maxDelay: 210,
  });
  observeRevealTarget(document.querySelector('.contact-form'), 'right', 100);
}

function initializeScrollMotion() {
  if (revealObserver) return;

  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    root.classList.remove('motion-ready');
    return;
  }

  root.classList.add('motion-ready');
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -6% 0px',
    },
  );

  registerMotionTargets();
}

function handleMotionPreferenceChange(event) {
  if (event.matches) {
    root.classList.remove('motion-ready');
    revealObserver?.disconnect();
    revealObserver = null;
    document.querySelectorAll('[data-reveal]').forEach((target) => {
      target.classList.add('is-visible');
    });
    return;
  }

  observedRevealTargets = new WeakSet();
  initializeScrollMotion();
}

function renderTypedText(text) {
  if (currentLang === 'ko' && text.includes('김상순')) {
    typedText.innerHTML = text.replace(
      '김상순',
      '<span class="rainbow-name">김상순</span>',
    );
    return;
  }
  if (text.includes('Sangsun Kim')) {
    typedText.innerHTML = text.replace(
      'Sangsun Kim',
      '<span class="rainbow-name">Sangsun Kim</span>',
    );
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
  elements.nav.forEach((node, index) => {
    node.textContent = t.nav[index];
  });
  elements.heroEyebrow.textContent = t.heroEyebrow;
  elements.heroDescription.textContent = t.heroDescription;
  elements.heroActions.forEach((node, index) => {
    node.textContent = t.heroActions[index];
  });
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
  buildTimeline(t.timeline, {
    experience: t.experienceGroupTitle,
    education: t.educationGroupTitle,
  });
  elements.stackKicker.textContent = t.stackKicker;
  elements.stackTitle.textContent = t.stackTitle;
  buildTechStack(t.stackMainLabel);
  elements.certKicker.textContent = t.certKicker;
  elements.certTitle.textContent = t.certTitle;
  buildCertificates(lang);
  elements.courseKicker.textContent = t.courseKicker;
  elements.courseTitle.textContent = t.courseTitle;
  buildCourses(lang, t.courseEmpty);
  elements.highlightItems.forEach((node) => {
    node.textContent = t.highlights[Number(node.dataset.highlightIndex)];
  });
  elements.blogKicker.textContent = t.blogKicker;
  elements.blogTitle.textContent = t.blogTitle;
  elements.blogDescription.textContent = t.blogDescription;
  elements.blogLinkLabel.textContent = t.blogLinkLabel;
  elements.studyLogLinkLabel.textContent = t.studyLogLinkLabel;
  elements.contactKicker.textContent = t.contactKicker;
  elements.contactTitle.textContent = t.contactTitle;
  elements.contactLinks.setAttribute('aria-label', t.contactLinksLabel);
  elements.contactLabels.forEach((node) => {
    node.textContent = t.contactLinkLabels[node.dataset.contactLabel];
  });
  elements.contactFormTitle.textContent = t.contactFormTitle;
  elements.contactFormDescription.textContent = t.contactFormDescription;
  elements.contactEmailLabel.textContent = t.contactEmailLabel;
  elements.contactEmail.placeholder = t.contactEmailPlaceholder;
  elements.contactSubjectLabel.textContent = t.contactSubjectLabel;
  elements.contactSubject.placeholder = t.contactSubjectPlaceholder;
  elements.contactMessageLabel.textContent = t.contactMessageLabel;
  elements.contactMessage.placeholder = t.contactMessagePlaceholder;
  elements.contactSubmitLabel.textContent = t.contactSubmitLabel;
  elements.contactFormNote.textContent = t.contactFormNote;
  elements.contactFormStatus.textContent = '';
  languageButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === lang);
  });
  if (floatingLanguageTrigger) {
    floatingLanguageTrigger.setAttribute('aria-expanded', 'false');
  }
  if (floatingLanguage) {
    floatingLanguage.classList.remove('is-open');
  }
  localStorage.setItem('github-home-lang', lang);
  startTyping(t.heroText, lang);

  if (revealObserver) {
    window.requestAnimationFrame(registerMotionTargets);
  }
}

function applyTheme(theme) {
  currentTheme = theme;
  root.setAttribute('data-theme', theme);
  if (themeToggleIcon) {
    themeToggleIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
    );
  }
  localStorage.setItem('github-home-theme', theme);
}

function syncTopbarState() {
  if (!topbar) return;
  topbar.classList.toggle('is-scrolled', window.scrollY > 16);
}

function syncScrollInterface() {
  syncTopbarState();

  const scrollableHeight = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    0,
  );
  const progress = scrollableHeight
    ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
    : 0;

  if (scrollProgressBar) {
    scrollProgressBar.style.transform = `scaleX(${progress})`;
  }

  const activationLine = Math.min(window.innerHeight * 0.32, 220);
  let activeLink = null;

  elements.nav.forEach((link) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (target && target.getBoundingClientRect().top <= activationLine) {
      activeLink = link;
    }
  });

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4
  ) {
    activeLink = elements.nav[elements.nav.length - 1] || activeLink;
  }

  elements.nav.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  scrollUpdateQueued = false;
}

function requestScrollInterfaceUpdate() {
  if (scrollUpdateQueued) return;

  scrollUpdateQueued = true;
  window.requestAnimationFrame(syncScrollInterface);
}

function handleContactSubmit(event) {
  event.preventDefault();

  if (!elements.contactForm.reportValidity()) return;

  const senderEmail = elements.contactEmail.value.trim();
  const subject = elements.contactSubject.value.trim();
  const message = elements.contactMessage.value.trim().replace(/\r?\n/g, '\r\n');
  const t = translations[currentLang];
  const body = `${t.contactMailSenderLabel}: ${senderEmail}\r\n\r\n${message}`;
  const mailtoUrl = `mailto:dev.snykim@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  elements.contactFormStatus.textContent = t.contactFormStatus;
  window.location.href = mailtoUrl;
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

if (elements.contactForm) {
  elements.contactForm.addEventListener('submit', handleContactSubmit);
}

window.addEventListener('scroll', requestScrollInterfaceUpdate, {
  passive: true,
});
window.addEventListener('resize', requestScrollInterfaceUpdate, {
  passive: true,
});
window.addEventListener('load', requestScrollInterfaceUpdate, { once: true });
motionPreference.addEventListener?.('change', handleMotionPreferenceChange);

applyTheme(currentTheme === 'dark' ? 'dark' : 'light');
setLanguage(translations[currentLang] ? currentLang : 'ko');
initializeScrollMotion();
syncScrollInterface();
