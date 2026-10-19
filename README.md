# Alex James — Editorial Single-Page Portfolio

An editorial, typography-driven, minimal personal portfolio website crafted with HTML5, CSS3, and Vanilla JavaScript. Features a signature pale-blue palette, high-contrast serif typography, spacious layout, dynamic portfolio grid, and a centralized configuration system.

---

## Quick Start

Open `index.html` in any modern web browser. That's it! No build steps, Node.js, databases, or terminal servers required.

---

## Project Structure

```
portfolio/
│
├── index.html              # Single-page semantic HTML structure
│
├── css/
│   └── style.css           # Clean CSS3 design system & responsive styling
│
├── js/
│   ├── config.js           # << ALL EDITABLE CONTENT & THEME LIVES HERE >>
│   └── script.js           # Dynamic DOM rendering, animations & navigation engine
│
├── assets/
│   ├── profile.jpg         # Circular profile portrait
│   ├── about-banner.jpg    # Full-width editorial image banner
│   │
│   └── projects/           # High-resolution project mockup images
│       ├── project1.jpg
│       ├── project2.jpg
│       ├── project3.jpg
│       ├── project4.jpg
│       ├── project5.jpg
│       └── project6.jpg
│
└── README.md               # Customization and deployment guide
```

---

## 10-Point Customization Guide

All portfolio content is stored in **`js/config.js`**. You do **not** need to search through or modify the HTML/CSS to change your information!

### 1. How to Change Your Name & Job Title
Open `js/config.js` and locate the personal details section:
```javascript
name: "Alex James",
role: "Web Developer",
logo: {
    monogram: "/AJ",
    text: "ALEX JAMES"
},
hero: {
    title: "Alex James",
    subtitle: "Web Developer",
    // ...
}
```

### 2. How to Change Your Profile Image
1. Place your new photo inside `assets/` (e.g. `assets/my-photo.jpg`).
2. In `js/config.js`, update:
```javascript
hero: {
    // ...
    profileImage: "assets/my-photo.jpg"
}
```
*(A square or portrait image works best; the circular frame clips and centers it automatically).*

### 3. How to Change the About Text
In `js/config.js`, update the `about` object:
```javascript
about: {
    label: "About me",
    headline: "I am an enthusiastic web developer based in New York...",
    calloutQuote: "I design professional &\nbeautiful websites",
    paragraphs: [
        "First paragraph about your journey...",
        "Second paragraph about your approach..."
    ],
    readMoreText: "READ MORE",
    readMoreUrl: "#services"
}
```

### 4. How to Add or Remove Services
In `js/config.js`, modify the `services` array. To add a new service:
```javascript
services: [
    {
        id: "ui-ux",
        title: "UI/UX DESIGN",
        icon: "fa-solid fa-compass-drafting",
        description: "Your description..."
    },
    // Add another service item here:
    {
        id: "consulting",
        title: "DESIGN AUDITS",
        icon: "fa-solid fa-magnifying-glass",
        description: "Heuristic reviews and user flow optimizations."
    }
]
```

### 5. How to Change Skills & Percentages
In `js/config.js`, update the `skills` array:
```javascript
skills: [
    { name: "JavaScript", percentage: 85 },
    { name: "React", percentage: 90 },
    { name: "TypeScript", percentage: 80 }
]
```
The animated progress bars and percentage numbers update automatically.

### 6. How to Change Experience / Career Timeline
In `js/config.js`, update the `experience` list:
```javascript
experience: [
    {
        years: "2021-Present",
        company: "Studio Vanguard",
        role: "SENIOR PRODUCT DESIGNER",
        description: "Leading responsive design initiatives..."
    },
    {
        years: "2018-2021",
        company: "ACME Corp",
        role: "FRONTEND DEVELOPER",
        description: "Built scalable client applications..."
    }
]
```

### 7. How to Add, Remove, or Reorder Portfolio Projects
In `js/config.js`, update the `projects` array:
```javascript
projects: [
    {
        id: "new-project",
        title: "Brand Redesign",
        category: "Visual Identity",
        image: "assets/projects/new-project.jpg",
        link: "https://yourprojectlink.com",
        aspect: "standard" // Use "standard" (4:3) or "tall" (4:5.5)
    }
]
```
Add new project images into `assets/projects/` and reference them here.

### 8. How to Change Social Media & Contact Links
In `js/config.js`, update `contact`, `socialLinks`, and `footerServices`:
```javascript
contact: {
    locationKicker: "Based in New York, working worldwide.",
    heading: "Get in touch",
    email: "yourname@domain.com",
    phone: "123-456-7890"
},
socialLinks: [
    { name: "GitHub", url: "https://github.com/yourusername" },
    { name: "Twitter/X", url: "https://twitter.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" }
]
```

### 9. How to Change Website Colors
In `js/config.js`, simply edit the `theme` object:
```javascript
theme: {
    backgroundColor: "#EAF6FC", // Main background
    textColor: "#07152F",       // Deep navy text
    accentColor: "#0066FF",     // Blue accent color
    white: "#FFFFFF",           // Clean white surfaces & footer
    mutedText: "#506178",       // Paragraph text
    borderColor: "rgba(7, 21, 47, 0.12)",
    progressBg: "rgba(255, 255, 255, 0.85)"
}
```
This dynamically overrides the CSS variables on page load without touching `style.css`!

### 10. How to Deploy to GitHub Pages (Free Hosting)
1. Initialize a Git repository in the `portfolio/` folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings > Pages**.
5. Under **Branch**, select `main` and root directory `/`, then click **Save**.
6. Your portfolio will be live in 1-2 minutes at: `https://<your-username>.github.io/<repo-name>/`.
