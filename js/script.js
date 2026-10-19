/**
 * ==========================================================================
 * ALEX JAMES - PORTFOLIO INTERACTIVE & DYNAMIC ENGINE
 * ==========================================================================
 * Reads content and theme settings from config.js and dynamically builds the DOM.
 * Manages smooth navigation, mobile menu, scroll spy, and progress bar animations.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if configuration exists
    if (typeof portfolioData === 'undefined') {
        console.warn('Configuration object `portfolioData` not found in config.js.');
        return;
    }

    // 2. Initialize application components
    applyThemeColors(portfolioData.theme);
    renderHeader(portfolioData);
    renderHero(portfolioData);
    renderAbout(portfolioData.about);
    renderServices(portfolioData);
    renderImageBreak(portfolioData.imageBreak);
    renderSkills(portfolioData);
    renderExperience(portfolioData);
    renderPortfolio(portfolioData);
    renderContactAndFooter(portfolioData);

    // 3. Initialize interactive behaviors
    initMobileMenu();
    initSmoothScrollAndActiveNav();
    initSkillBarObserver();
});

/* --------------------------------------------------------------------------
   THEME STYLES INJECTION
   -------------------------------------------------------------------------- */
function applyThemeColors(theme) {
    if (!theme) return;
    const root = document.documentElement;

    if (theme.backgroundColor) root.style.setProperty('--bg-color', theme.backgroundColor);
    if (theme.textColor) root.style.setProperty('--text-color', theme.textColor);
    if (theme.accentColor) root.style.setProperty('--accent-color', theme.accentColor);
    if (theme.white) root.style.setProperty('--white', theme.white);
    if (theme.mutedText) root.style.setProperty('--muted-text', theme.mutedText);
    if (theme.borderColor) root.style.setProperty('--border-color', theme.borderColor);
    if (theme.progressBg) root.style.setProperty('--progress-track', theme.progressBg);
}

/* --------------------------------------------------------------------------
   HEADER & NAVIGATION RENDERING
   -------------------------------------------------------------------------- */
function renderHeader(data) {
    // Logo
    const monogramEl = document.getElementById('logo-monogram');
    const textEl = document.getElementById('logo-text');
    if (monogramEl && data.logo?.monogram) monogramEl.textContent = data.logo.monogram;
    if (textEl && data.logo?.text) textEl.textContent = data.logo.text;

    // Nav Links
    const navDesktop = document.getElementById('nav-desktop');
    const navMobile = document.getElementById('nav-mobile');

    if (Array.isArray(data.navigation)) {
        const desktopMarkup = data.navigation.map((item, idx) => `
            <a href="${item.target}" class="${idx === 0 ? 'active' : ''}">${escapeHtml(item.label)}</a>
        `).join('');

        const mobileMarkup = data.navigation.map((item, idx) => `
            <a href="${item.target}" class="${idx === 0 ? 'active' : ''}">${escapeHtml(item.label)}</a>
        `).join('');

        if (navDesktop) navDesktop.innerHTML = desktopMarkup;
        if (navMobile) navMobile.innerHTML = mobileMarkup;
    }
}

/* --------------------------------------------------------------------------
   HERO RENDERING
   -------------------------------------------------------------------------- */
function renderHero(data) {
    const hero = data.hero || {};

    const greetingEl = document.getElementById('hero-greeting');
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');
    const imageEl = document.getElementById('hero-image');
    const contactsContainer = document.getElementById('hero-contacts');

    if (greetingEl && hero.greeting) greetingEl.textContent = hero.greeting;
    if (titleEl && hero.title) titleEl.textContent = hero.title;
    if (subtitleEl && hero.subtitle) subtitleEl.textContent = hero.subtitle;
    if (imageEl && hero.profileImage) {
        imageEl.src = hero.profileImage;
        imageEl.alt = hero.title || data.name || "Profile Photo";
    }

    if (contactsContainer) {
        let contactHtml = '';
        if (hero.email) {
            contactHtml += `
                <a href="mailto:${escapeHtml(hero.email)}" class="contact-pill" title="Email Alex">
                    <span class="pill-icon"><i class="fa-regular fa-envelope"></i></span>
                    <span>${escapeHtml(hero.email)}</span>
                </a>
            `;
        }
        if (hero.phone) {
            contactHtml += `
                <a href="tel:${escapeHtml(hero.phone.replace(/[^0-9+]/g, ''))}" class="contact-pill" title="Call Alex">
                    <span class="pill-icon"><i class="fa-solid fa-phone"></i></span>
                    <span>${escapeHtml(hero.phone)}</span>
                </a>
            `;
        }
        contactsContainer.innerHTML = contactHtml;
    }
}

/* --------------------------------------------------------------------------
   ABOUT RENDERING
   -------------------------------------------------------------------------- */
function renderAbout(about) {
    if (!about) return;

    const labelEl = document.getElementById('about-label');
    const headlineEl = document.getElementById('about-headline');
    const quoteEl = document.getElementById('about-quote');
    const paragraphsContainer = document.getElementById('about-paragraphs');
    const readMoreEl = document.getElementById('about-readmore');

    if (labelEl && about.label) labelEl.textContent = about.label;
    if (headlineEl && about.headline) headlineEl.textContent = about.headline;
    if (quoteEl && about.calloutQuote) quoteEl.textContent = about.calloutQuote;

    if (paragraphsContainer && Array.isArray(about.paragraphs)) {
        paragraphsContainer.innerHTML = about.paragraphs.map(p => `
            <p class="about-paragraph">${escapeHtml(p)}</p>
        `).join('');
    }

    if (readMoreEl) {
        if (about.readMoreText) readMoreEl.textContent = about.readMoreText;
        if (about.readMoreUrl) readMoreEl.href = about.readMoreUrl;
    }
}

/* --------------------------------------------------------------------------
   SERVICES RENDERING
   -------------------------------------------------------------------------- */
function renderServices(data) {
    const secTitleEl = document.getElementById('services-title');
    const secDescEl = document.getElementById('services-desc');
    const gridContainer = document.getElementById('services-grid');

    if (secTitleEl && data.servicesSection?.title) {
        secTitleEl.textContent = data.servicesSection.title;
    }
    if (secDescEl && data.servicesSection?.description) {
        secDescEl.textContent = data.servicesSection.description;
    }

    if (gridContainer && Array.isArray(data.services)) {
        gridContainer.innerHTML = data.services.map(item => `
            <article class="service-card">
                <div class="service-icon-box">
                    <i class="${escapeHtml(item.icon || 'fa-solid fa-layer-group')}"></i>
                </div>
                <h3 class="service-title">${escapeHtml(item.title)}</h3>
                <p class="service-description">${escapeHtml(item.description)}</p>
            </article>
        `).join('');
    }
}

/* --------------------------------------------------------------------------
   IMAGE BREAK RENDERING
   -------------------------------------------------------------------------- */
function renderImageBreak(imageBreak) {
    if (!imageBreak) return;
    const bannerImg = document.getElementById('image-break-img');
    if (bannerImg && imageBreak.image) {
        bannerImg.src = imageBreak.image;
        if (imageBreak.alt) bannerImg.alt = imageBreak.alt;
    }
}

/* --------------------------------------------------------------------------
   SKILLS RENDERING
   -------------------------------------------------------------------------- */
function renderSkills(data) {
    const titleEl = document.getElementById('skills-title');
    const listContainer = document.getElementById('skills-list');

    if (titleEl && data.skillsSectionTitle) titleEl.textContent = data.skillsSectionTitle;

    if (listContainer && Array.isArray(data.skills)) {
        listContainer.innerHTML = data.skills.map(skill => `
            <div class="skill-item">
                <div class="skill-info">
                    <span class="skill-name">${escapeHtml(skill.name)}</span>
                    <span class="skill-percentage">${escapeHtml(skill.percentage)}%</span>
                </div>
                <div class="skill-bar-track">
                    <div class="skill-bar-fill" data-percentage="${escapeHtml(skill.percentage)}"></div>
                </div>
            </div>
        `).join('');
    }
}

/* --------------------------------------------------------------------------
   EXPERIENCE RENDERING
   -------------------------------------------------------------------------- */
function renderExperience(data) {
    const titleEl = document.getElementById('experience-title');
    const listContainer = document.getElementById('timeline-list');

    if (titleEl && data.experienceSectionTitle) titleEl.textContent = data.experienceSectionTitle;

    if (listContainer && Array.isArray(data.experience)) {
        listContainer.innerHTML = data.experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-meta">
                    <div class="timeline-years">${escapeHtml(exp.years)}</div>
                    <div class="timeline-company">${escapeHtml(exp.company)}</div>
                </div>
                <div class="timeline-content">
                    <h3 class="timeline-role">${escapeHtml(exp.role)}</h3>
                    <p class="timeline-description">${escapeHtml(exp.description)}</p>
                </div>
            </div>
        `).join('');
    }
}

/* --------------------------------------------------------------------------
   PORTFOLIO RENDERING
   -------------------------------------------------------------------------- */
function renderPortfolio(data) {
    const titleEl = document.getElementById('portfolio-title');
    const gridContainer = document.getElementById('portfolio-grid');

    if (titleEl && data.portfolioSection?.title) {
        titleEl.textContent = data.portfolioSection.title;
    }

    if (gridContainer && Array.isArray(data.projects)) {
        gridContainer.innerHTML = data.projects.map(proj => {
            const aspectClass = proj.aspect === 'tall' ? 'aspect-tall' : 'aspect-standard';
            return `
                <a href="${escapeHtml(proj.link || '#')}" class="portfolio-card ${aspectClass}" target="${proj.link && proj.link.startsWith('http') ? '_blank' : '_self'}" rel="noopener noreferrer">
                    <div class="portfolio-img-box">
                        <img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.title)}" class="portfolio-img" loading="lazy">
                        <div class="portfolio-overlay">
                            ${proj.category ? `<span class="portfolio-overlay-cat">${escapeHtml(proj.category)}</span>` : ''}
                            <h3 class="portfolio-overlay-title">${escapeHtml(proj.title)}</h3>
                        </div>
                    </div>
                </a>
            `;
        }).join('');
    }
}

/* --------------------------------------------------------------------------
   CONTACT & FOOTER RENDERING
   -------------------------------------------------------------------------- */
function renderContactAndFooter(data) {
    const kickerEl = document.getElementById('contact-kicker');
    const headingEl = document.getElementById('contact-heading');
    const emailLinkEl = document.getElementById('contact-email-link');
    const socialList = document.getElementById('footer-social-links');
    const servicesList = document.getElementById('footer-services-links');
    const copyrightEl = document.getElementById('footer-copyright');

    if (kickerEl && data.contact?.locationKicker) {
        kickerEl.textContent = data.contact.locationKicker;
    }
    if (headingEl && data.contact?.heading) {
        headingEl.textContent = data.contact.heading;
    }
    if (emailLinkEl && data.contact?.email) {
        emailLinkEl.href = `mailto:${data.contact.email}`;
    }

    if (socialList && Array.isArray(data.socialLinks)) {
        socialList.innerHTML = data.socialLinks.map(link => `
            <li class="footer-link-item">
                <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.name)}</a>
            </li>
        `).join('');
    }

    if (servicesList && Array.isArray(data.footerServices)) {
        servicesList.innerHTML = data.footerServices.map(item => `
            <li class="footer-link-item">
                <a href="${escapeHtml(item.url)}">${escapeHtml(item.name)}</a>
            </li>
        `).join('');
    }

    if (copyrightEl && data.footerCopyright) {
        copyrightEl.textContent = data.footerCopyright;
    }
}

/* --------------------------------------------------------------------------
   INTERACTIVE BEHAVIORS
   -------------------------------------------------------------------------- */

// Mobile Navigation Toggle
function initMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('nav-mobile');

    if (!toggleBtn || !mobileNav) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('is-open');
        toggleBtn.classList.toggle('is-active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when any nav item is clicked
    mobileNav.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            toggleBtn.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth Anchor Scrolling & Active Nav Highlighting
function initSmoothScrollAndActiveNav() {
    const desktopLinks = document.querySelectorAll('.nav-desktop a');
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    const sections = document.querySelectorAll('section[id], footer[id]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                desktopLinks.forEach(link => {
                    const href = link.getAttribute('href').replace('#', '');
                    link.classList.toggle('active', href === sectionId);
                });
                mobileLinks.forEach(link => {
                    const href = link.getAttribute('href').replace('#', '');
                    link.classList.toggle('active', href === sectionId);
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
}

// Skill Progress Bar Animation on Viewport Entry
function initSkillBarObserver() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const targetPercentage = bar.getAttribute('data-percentage');
                    bar.style.width = `${targetPercentage}%`;
                });
                obs.disconnect(); // Animate once
            }
        });
    }, {
        threshold: 0.25
    });

    const skillsSection = document.getElementById('experience');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

/* --------------------------------------------------------------------------
   UTILITY HELPERS
   -------------------------------------------------------------------------- */
function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
