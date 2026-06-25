<div align="center">

# Saurabh Jadhav — Developer Portfolio

**A high-performance, dark-mode & light-mode developer portfolio built with React 19, Tailwind CSS v4, and Framer Motion.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://saurabhxo.site)

**[🌐 saurabhxo.site ](https://saurabhxo.site)** &nbsp;·&nbsp; **[📄 Resume](https://ik.imagekit.io/vwc55jjck/CV_SaurabhJadhav.pdf)** &nbsp;·&nbsp; **[💼 LinkedIn](https://www.linkedin.com/in/jadhavsau777/)** &nbsp;·&nbsp; **[🐙 GitHub](https://github.com/saurabh7121)**

**Website Version:** `0.2.0`

</div>

---

## 📖 Overview

This is my personal developer portfolio — designed to be fast, visually striking, and fully responsive. It showcases my skills, projects, blog posts, and experience as a Software Developer based in Maharashtra, India.

The design features a highly performant **Light/Dark theme architecture**, driven by a dynamic SVG `GridPattern` background, seamless glassmorphism cards, and fluid Framer Motion page transitions. 

---

## ✨ Key Features

### 🎨 Design & UX

- **Smart Theme Engine** — Fully responsive Light and Dark modes.
- **Dynamic Grid Background** — High-performance SVG grid pattern with dynamic masking, skewing, and automatic theme-adaptive stroke/fill colors.
- **Cursor Blob** — Radial gradient that follows mouse movement (desktop only).
- **Glassmorphism** — Premium blurred background surfaces.
- **Custom Scrollbar** — Thin red-to-blue gradient scrollbar.

### 📝 Integrated Blog System

- **Dynamic Routing** — `/blogs` and `/blogs/:slug` for seamless article navigation.
- **Markdown-Style Rendering** — Clean rendering for headings, blockquotes, lists, and bold text.
- **Mac-Style Code Blocks** — Beautifully styled code snippets resembling macOS windows.
- **Reading Progress Bar** — Sticky gradient progress bar that tracks scroll depth.
- **Lazy Loaded Data** — Content is managed cleanly via `src/data/blogsData.js`.

### ⚡ Performance & Architecture

- **Code Splitting** — All sections and pages are lazy-loaded with `React.lazy` + `Suspense`.
- **`content-visibility: auto`** — Off-screen sections are skipped during initial render.
- **GPU-Composited Animations** — Hardware-accelerated `transform` and `opacity` properties.
- **Data Abstraction** — Projects and Blogs are decoupled from UI logic into `projectsData.js` and `blogsData.js` for easy content management.

### 🔗 Dynamic Integrations

- **GitHub Repository Explorer** — Dynamic integration with the GitHub API to fetch and display public repositories, complete with live search, language filters, and stats.
- **Smart Contact Form** — Device-aware contact form that natively constructs and pre-fills email drafts via `mailto:` on mobile apps or `mail.google.com` on desktop browsers.
- **Resume via ImageKit** — CV PDF hosted on ImageKit CDN, served with a download attribute.
- **ETH Wallet Tip** — Copy-to-clipboard Ethereum address with animated states.

---

## 🛠 Tech Stack

| Category     | Technology                    | Version     |
| ------------ | ----------------------------- | ----------- |
| UI Framework | React                         | 19.2        |
| Build Tool   | Vite                          | 8.0         |
| Animation    | Framer Motion                 | 12.0        |
| Styling      | Tailwind CSS v4 + Vanilla CSS | 4.2         |
| Icons        | Lucide React + React Icons    | latest      |
| Routing      | React Router DOM              | 7.14        |
| Utilities    | clsx, tailwind-merge          | latest      |
| Deployment   | Netlify                       | —           |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── photo.png              # Profile photo (About section)
│   ├── logo.png               # Brand logo
│   └── _redirects             # Netlify SPA redirect rule
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky glassmorphism navbar + Theme Toggle
│   │   ├── Hero.jsx           # Hero section
│   │   ├── About.jsx          # Bio, tags, profile photo
│   │   ├── Projects.jsx       # Featured Projects + GitHub Repo Explorer
│   │   ├── Blogs.jsx          # Blog listing page
│   │   ├── BlogPost.jsx       # Individual blog article renderer
│   │   ├── Contact.jsx        # Smart device-detecting email composer
│   │   ├── GridPattern.jsx    # SVG dynamic background component
│   │   └── ...
│   │
│   ├── data/
│   │   ├── blogsData.js       # Blog content and metadata
│   │   └── projectsData.js    # Featured projects config
│   │
│   ├── lib/
│   │   └── utils.js           # Tailwind class merging (cn utility)
│   │
│   ├── App.jsx                # Routing & Suspense wrappers
│   ├── index.css              # Design system: tokens, theme colors
│   └── main.jsx               # Entry point
│
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/saurabh7121/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → http://localhost:5173
```

### ⚙️ Customization & Environment Setup

To personalize the GitHub Explorer:

1. **Configure Environment Variables:**  
   Create a `.env` file in the root directory:
   ```env
   GITHUB_USERNAME=your_github_username
   GITHUB_TOKEN=your_personal_access_token
   ```

2. **Production Deployment:**
   - Define `GITHUB_USERNAME` and `GITHUB_TOKEN` in your hosting provider's environment settings.

---

## 🌐 Deployment

The site is configured for seamless deployment on **Netlify**. The `public/_redirects` file ensures React Router DOM works perfectly:

```
/*    /index.html   200
```

---

## 📬 Contact

|             |                                                                           |
| ----------- | ------------------------------------------------------------------------- |
| 📧 Email    | [work.jadhavsaurabh@gmail.com](mailto:work.jadhavsaurabh@gmail.com)       |
| 💼 LinkedIn | [linkedin.com/in/jadhavsau777](https://www.linkedin.com/in/jadhavsau777/) |
| 🐙 GitHub   | [github.com/saurabh7121](https://github.com/saurabh7121)                  |
| 🐦 Twitter  | [@jadhavsau777](https://twitter.com/jadhavsau777)                         |
| 🌐 Website  | [saurabhxo.site](https://saurabhxo.site)                                  |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Designed & built by <strong>Saurabh Jadhav</strong> · Maharashtra, India 🇮🇳</sub>
</div>
