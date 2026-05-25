<div align="center">

# Saurabh Jadhav — Developer Portfolio

**A high-performance, dark-themed developer portfolio built with React 19, Paper Design Shaders, and Framer Motion.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://saurabhxo.site)

**[🌐 saurabhxo.site ](https://saurabhxo.site)** &nbsp;·&nbsp; **[📄 Resume](https://ik.imagekit.io/vwc55jjck/CV_SaurabhJadhav.pdf)** &nbsp;·&nbsp; **[💼 LinkedIn](https://www.linkedin.com/in/jadhavsau777/)** &nbsp;·&nbsp; **[🐙 GitHub](https://github.com/saurabh7121)**

**Website Version:** `0.1.1`

</div>

---

## 📖 Overview

This is my personal developer portfolio — designed to be fast, visually striking, and fully responsive. It showcases my skills, projects, and experience as a Software Developer based in Maharashtra, India.

The design philosophy is **noir-first**: deep blacks, film grain texture, glassmorphism cards, subtle red/blue accent gradients, and a GPU-composited 3D particle canvas that runs without blocking the main thread.

---

## ✨ Key Features

### 🎨 Design & UX

- **Dark Noir Aesthetic** — Deep `#080808` background, film grain overlay via SVG noise, glassmorphism surfaces
- **Cursor Blob** — Radial gradient that follows mouse movement (desktop only), composited on the GPU
- **Orbit Rings** — Decorative spinning rings in the hero section
- **Scroll Indicator** — Animated gradient line at the bottom of the hero
- **Custom Scrollbar** — Thin red-to-blue gradient scrollbar

### ⚡ Performance

- **Zero TBT on Mobile** — Three.js is never requested on mobile; the `IS_MOBILE` check runs at module-parse time before any lazy imports
- **Deferred 3D Canvas** — On desktop, Three.js loads via `requestIdleCallback` after the page is interactive, eliminating long tasks
- **Code Splitting** — All below-fold sections (`About`, `Skills`, `Projects`, etc.) are lazy-loaded with `React.lazy` + `Suspense`
- **`content-visibility: auto`** — Off-screen sections are skipped during initial render, dramatically reducing TBT and LCP
- **GPU-Composited Animations** — All animations use `transform` and `opacity` with `will-change` to stay on the compositor thread
- **Lazy Photo Loading** — Profile image uses `loading="lazy"` and `decoding="async"`
- **On-Demand API Fetching** — GitHub repositories are only fetched when the user explicitly expands the explorer section, reducing initial load bandwidth and CPU cycles.

### 📱 Responsive

- **Separate Mobile Hero** — `Hero.jsx` (mobile) and `HeroDesktop.jsx` (desktop) are split so Framer Motion (~132KB) is **never downloaded on mobile**
- **Mobile CTA Row** — "Get In Touch" and "Resume" buttons are sized with explicit flex/padding overrides to prevent overflow on 320px screens
- **Adaptive Grid** — All section layouts use CSS grid with `lg:` breakpoints

### 🔗 Integrations

- **GitHub Repository Explorer** — Dynamic integration with the GitHub REST API to fetch and display public repositories with search functionality, auto-generated language filters, stars/forks counters, and smooth Framer Motion expanding animations.
- **Resume via ImageKit** — CV PDF hosted on ImageKit CDN, served with `download` attribute for one-click save
- **ETH Wallet Tip** — Copy-to-clipboard Ethereum address (`0x8162…bE1FD`) in the footer with animated copied state
- **Social Links** — GitHub, LinkedIn, Twitter, personal site linked in hero and footer

---

## 🛠 Tech Stack

| Category     | Technology                    | Version     |
| ------------ | ----------------------------- | ----------- |
| UI Framework | React                         | 19.2        |
| Build Tool   | Vite                          | 8.0         |
| 3D Rendering | Three.js + React Three Fiber  | 0.184 / 9.6 |
| 3D Helpers   | @react-three/drei             | 10.7        |
| Animation    | Framer Motion                 | 12.0        |
| Styling      | Tailwind CSS v4 + Vanilla CSS | 4.2         |
| Icons        | Lucide React + React Icons    | latest      |
| Routing      | React Router DOM              | 7.14        |
| Utilities    | clsx, tailwind-merge          | latest      |
| Deployment   | Netlify                       | —           |
| Asset CDN    | ImageKit                      | —           |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── photo.png              # Profile photo (About section)
│   ├── logo.png               # Brand logo (Navbar + Footer)
│   └── _redirects             # Netlify SPA redirect rule (/* → /index.html)
│
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Mobile hero — pure CSS animations, no Framer Motion
│   │   ├── HeroDesktop.jsx    # Desktop hero — Framer Motion, lazy-imported
│   │   ├── About.jsx          # Bio, traits, currently learning tags, profile photo
│   │   ├── Services.jsx       # Services offered cards
│   │   ├── Projects.jsx       # Project showcase with animated code preview terminals
│   │   ├── Experience.jsx     # Work/journey timeline
│   │   ├── Skills.jsx         # Skill bars + secondary skill tags + marquee
│   │   ├── Contact.jsx        # Contact form + info
│   │   ├── Navbar.jsx         # Sticky glassmorphism navbar with scroll-spy
│   │   ├── Footer.jsx         # Footer with ETH tip button + socials
│   │   ├── ThreeCanvas.jsx    # 3D particle canvas (desktop only, idle-loaded)
│   │   └── NotFound.jsx       # Animated 404 page with glitch effect
│   │
│   ├── App.jsx                # Route definitions + mobile/desktop canvas logic
│   ├── index.css              # Design system: tokens, buttons, glass, animations
│   └── main.jsx               # React DOM entry point
│
├── index.html                 # HTML shell with font preloads and meta tags
├── vite.config.js             # Vite + Tailwind plugin config
├── eslint.config.js           # ESLint flat config
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

To personalize this portfolio with your own details and dynamically load your GitHub repositories:

1. **Configure Environment Variables:**  
   Create a `.env` file in the root directory and add:
   ```env
   GITHUB_USERNAME=your_github_username
   GITHUB_TOKEN=your_personal_access_token
   ```

2. **Generate a GitHub Personal Access Token (PAT):**
   - Navigate to your GitHub account **Settings** > **Developer Settings** > **Personal Access Tokens** > **Tokens (classic)**.
   - Click **Generate new token (classic)**.
   - Set a name/note and check the **public_repo** scope.
   - Click **Generate token** at the bottom, copy it, and paste it under `GITHUB_TOKEN` in your `.env` file.

> [!NOTE]
> The `GITHUB_TOKEN` is used to authenticate requests to the GitHub REST API. This elevates the rate limit from 60 requests/hour (unauthenticated) to 5,000 requests/hour, preventing API rate-limiting issues during development and high traffic.

3. **Production Deployment (e.g., Netlify / Vercel):**
   - Make sure to define both `GITHUB_USERNAME` and `GITHUB_TOKEN` under your hosting provider's **Environment Variables** dashboard settings to ensure they are injected correctly during the production build.

### Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR   |
| `npm run build`   | Production build to `dist/`      |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

---

## 🌐 Deployment

The site is deployed on **Netlify** with continuous deployment.

The `public/_redirects` file ensures all routes resolve to `index.html` for React Router:

```
/*    /index.html   200
```

To deploy your own fork:

1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

---

## 🗂 Sections

| Section        | Description                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **Hero**       | Name, role, CTA buttons (View Work / Get In Touch / Resume), social links, animated terminal card |
| **About**      | Bio, trait pills, "Currently Learning" tags, profile photo, location tag                          |
| **Services**   | Web dev, Frontend, Backend, Full Stack, AI Integration, Performance Optimization                  |
| **Projects**   | Featured projects (Accessible Financial Platform, etc.) + **interactive GitHub Repository Explorer** (dynamic fetch, language filter tabs, repository search, stars/forks) |
| **Experience** | Freelance developer timeline (2023–Present)                                                       |
| **Skills**     | Animated skill bars (React, Node.js, JS, MongoDB, Python, Git) + secondary tags                   |
| **Contact**    | Email form + contact details                                                                      |
| **Footer**     | Nav links · Socials · ETH tip button · Scroll-to-top                                              |

---

## 📬 Contact

|             |                                                                           |
| ----------- | ------------------------------------------------------------------------- |
| 📧 Email    | [work.jadhavsaurabh@gmail.com](mailto:work.jadhavsaurabh@gmail.com)       |
| 💼 LinkedIn | [linkedin.com/in/jadhavsau777](https://www.linkedin.com/in/jadhavsau777/) |
| 🐙 GitHub   | [github.com/saurabh7121](https://github.com/saurabh7121)                  |
| 🐦 Twitter  | [@jadhavsau777](https://twitter.com/jadhavsau777)                         |
| 🌐 Website  | [saurabhxo.site](https://saurabhxo.site)                                  |
| 📍 Location | Aurangabad, Maharashtra, India                                            |

---

## 🔭 Future Approach

Planned improvements and features on the roadmap:

### ✍️ Blog / Writing Section
- Integrate a **blog** directly into the portfolio — either as a dedicated `/blog` route or embedded in the home page
- Posts authored in **MDX** (Markdown + JSX) so code snippets, diagrams, and live components can be embedded inline
- Categorised by topic (Web Dev, AI/ML, Open Source, Career) with a tag filter UI
- **RSS feed** auto-generated at build time for readers who subscribe via feed readers
- Reading-time estimate and progress indicator on each post
- Possible CMS integration (e.g. **Hashnode API** or **Dev.to API**) to cross-post from an existing blog without duplicating content

### 🛠 Product & DX Improvements
| Area | Planned Change |
|---|---|
| **Dark / Light parity** | Fully tune every section for both modes (some components are still dark-first) |
| **Testimonials** | A scrolling marquee section featuring short client / collaborator quotes |
| **Case Studies** | Deep-dive pages per project with problem → approach → result narrative |
| **Analytics** | Privacy-first analytics (Plausible or Umami) to understand real visitor behaviour without cookies |
| **Contact form backend** | Replace the current mailto approach with a serverless function (Netlify Functions + Resend API) for reliable email delivery |
| **Accessibility audit** | Full WCAG 2.1 AA pass — focus rings, ARIA labels, keyboard navigation for all interactive elements |
| **PWA / Offline** | Service worker + manifest so the site installs as a PWA and works offline |

### ⚡ Performance
- Switch to **image CDN** transforms (ImageKit URL parameters) for responsive `srcset` on all project screenshots
- Investigate **partial hydration** with React Server Components once RSC support stabilises in Vite

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Designed & built by <strong>Saurabh Jadhav</strong> · Maharashtra, India 🇮🇳</sub>
</div>
