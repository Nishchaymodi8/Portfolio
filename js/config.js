// ==========================================
// EDIT YOUR PORTFOLIO HERE
// ==========================================
// Simply update the values below to customize your website.
// You do NOT need to edit HTML or CSS to update your portfolio!
// ==========================================

const portfolioData = {
    // ----------------------------------------------------
    // THEME COLORS
    // Changing these hex codes updates the whole site palette!
    // ----------------------------------------------------
    theme: {
        backgroundColor: "#EAF6FC", // Pale ice-blue page background
        textColor: "#07152F",       // Deep navy editorial text
        accentColor: "#0066FF",     // Vibrant royal blue accent
        white: "#FFFFFF",           // Clean white for cards & footer
        mutedText: "#55657E",       // Soft navy-gray for paragraphs & labels
        borderColor: "rgba(7, 21, 47, 0.12)", // Subtle editorial divider lines
        progressBg: "rgba(255, 255, 255, 0.85)" // Light track for skill bars
    },

    // ----------------------------------------------------
    // BASIC PERSONAL DETAILS & HEADER
    // ----------------------------------------------------
    name: "Alex James",
    role: "Web Developer",
    logo: {
        monogram: "/AJ",
        text: "ALEX JAMES"
    },

    // Navigation menu links (scrolls smoothly to corresponding sections)
    navigation: [
        { label: "HOME", target: "#home" },
        { label: "ABOUT", target: "#about" },
        { label: "SERVICES", target: "#services" },
        { label: "PORTFOLIO", target: "#portfolio" },
        { label: "CONTACT", target: "#contact" }
    ],

    // ----------------------------------------------------
    // HERO SECTION
    // ----------------------------------------------------
    hero: {
        greeting: "HELLO, MY NAME IS",
        title: "Alex James",
        subtitle: "Web Developer",
        email: "contact@alexjames.com",
        phone: "929-242-6868",
        location: "New York",
        resumeUrl: "#", // Add link to your PDF resume here if desired
        profileImage: "assets/profile.jpg" // Path to your circular profile portrait
    },

    // ----------------------------------------------------
    // ABOUT SECTION
    // ----------------------------------------------------
    about: {
        label: "About me",
        headline: "I am an enthusiastic web developer based in New York, with a rich experience of over 6 years in website & product design.",
        calloutQuote: "I design professional &\nbeautiful websites",
        paragraphs: [
            "I'm a dedicated web developer and UI designer living and working in New York City. I have a relentless passion for creating websites that are exceptionally easy to navigate, visually striking, and technically rock-solid.",
            "Over the past 6 years, I have collaborated with visionary clients from all over the world, ranging from early-stage startups to established international companies. My goal is to build digital experiences that deliver real, measurable value while remaining genuinely intuitive and engaging for everyone who uses them."
        ],
        readMoreText: "READ MORE",
        readMoreUrl: "#services"
    },

    // ----------------------------------------------------
    // WHAT I DO / SERVICES SECTION
    // ----------------------------------------------------
    servicesSection: {
        title: "What I do",
        description: "I focus on crafting digital experiences that help businesses tell their stories and connect with their audience across multiple platforms."
    },
    services: [
        {
            id: "ui-ux",
            title: "UI/UX DESIGN",
            icon: "fa-solid fa-compass-drafting", // Font Awesome icon class or fallback SVG
            description: "I craft intuitive, human-centered interfaces with rigorous attention to typography, spacing, visual rhythm, and responsive behavior across devices."
        },
        {
            id: "web-dev",
            title: "WEB DEVELOPMENT",
            icon: "fa-solid fa-code",
            description: "I build fast, accessible, and standards-compliant websites using modern web technologies, ensuring seamless performance and smooth user journeys."
        },
        {
            id: "app-dev",
            title: "APP DEVELOPMENT",
            icon: "fa-solid fa-mobile-screen",
            description: "I design and develop responsive cross-platform web applications that deliver delightful native-like experiences on smartphones and tablets."
        }
    ],

    // ----------------------------------------------------
    // IMAGE BREAK / FULL-WIDTH BANNER
    // ----------------------------------------------------
    imageBreak: {
        image: "assets/about-banner.jpg",
        alt: "Studio workspace with architectural sketches and design materials"
    },

    // ----------------------------------------------------
    // SKILLS & PROGRESS BARS
    // ----------------------------------------------------
    skillsSectionTitle: "Skills",
    skills: [
        { name: "JavaScript", percentage: 85 },
        { name: "PHP", percentage: 95 },
        { name: "Python", percentage: 75 },
        { name: "Photoshop", percentage: 80 }
    ],

    // ----------------------------------------------------
    // EXPERIENCE TIMELINE
    // ----------------------------------------------------
    experienceSectionTitle: "My Experience",
    experience: [
        {
            years: "2015-2021",
            company: "ACME Company",
            role: "LEAD UI/UX DESIGNER",
            description: "Directed end-to-end design systems and interactive web experiences for enterprise clients, improving overall design consistency and user retention."
        },
        {
            years: "2011-2015",
            company: "Dynamic Capital INC",
            role: "WEB DEVELOPER",
            description: "Architected modern frontend templates, integrated custom APIs, and maintained critical client-facing web portals with peak performance standards."
        },
        {
            years: "2008-2011",
            company: "Pixel Craft Studio",
            role: "JUNIOR DESIGNER",
            description: "Collaborated on digital brand identities, responsive web layouts, marketing graphics, and cross-browser testing for boutique agencies."
        }
    ],

    // ----------------------------------------------------
    // PORTFOLIO PROJECTS
    // Simply add, delete, or rearrange objects in this array!
    // ----------------------------------------------------
    portfolioSection: {
        title: "Portfolio"
    },
    projects: [
        {
            id: "project-1",
            title: "Coffee Website",
            category: "UI/UX & Branding",
            image: "assets/projects/project1.jpg",
            link: "#",
            aspect: "standard" // standard or tall
        },
        {
            id: "project-2",
            title: "Limousine Website",
            category: "Luxury Transportation",
            image: "assets/projects/project2.jpg",
            link: "#",
            aspect: "standard"
        },
        {
            id: "project-3",
            title: "The Smokin' Burger",
            category: "Restaurant Website",
            image: "assets/projects/project3.jpg",
            link: "#",
            aspect: "standard"
        },
        {
            id: "project-4",
            title: "Food Truck",
            category: "Mobile Catering Platform",
            image: "assets/projects/project4.jpg",
            link: "#",
            aspect: "standard"
        },
        {
            id: "project-5",
            title: "Dolphins Sanctuary",
            category: "Marine Research Initiative",
            image: "assets/projects/project5.jpg",
            link: "#",
            aspect: "tall" // Asymmetric tall card matching the reference screenshot
        },
        {
            id: "project-6",
            title: "Atelier Noir",
            category: "Fashion Editorial",
            image: "assets/projects/project6.jpg",
            link: "#",
            aspect: "standard"
        }
    ],

    // ----------------------------------------------------
    // CONTACT & FOOTER SECTION
    // ----------------------------------------------------
    contact: {
        locationKicker: "Based in New York, working worldwide.",
        heading: "Get in touch",
        email: "contact@alexjames.com",
        phone: "929-242-6868"
    },

    // Social Media Links (displayed in the footer)
    socialLinks: [
        { name: "Instagram", url: "https://instagram.com" },
        { name: "Dribbble", url: "https://dribbble.com" },
        { name: "Behance", url: "https://behance.net" },
        { name: "LinkedIn", url: "https://linkedin.com" }
    ],

    // Footer Services List (displayed in the footer)
    footerServices: [
        { name: "UI/UX Design", url: "#services" },
        { name: "Web Development", url: "#services" },
        { name: "App Development", url: "#services" }
    ],

    // Bottom copyright text
    footerCopyright: "© 2026 Alex James. All rights reserved."
};

// Ensure global accessibility in browsers and test environments
if (typeof window !== 'undefined') {
    window.portfolioData = portfolioData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
