# 🚀 Henok Gizaw - Personal Portfolio

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modular-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](LICENSE)

Welcome to the official source repository for my personal engineering portfolio. Built with modern web development standards, high performance, modular architecture, and sleek dark/light design aesthetics.

---

## 👨‍💻 About Me

I am an **Electrical and Computer Engineering** student at **Addis Ababa University (AAU)** passionate about:
- **Backend Systems Development** (Python / Flask / FastAPI / Java Spring Boot / Node.js)
- **Embedded Systems & IoT Devices** (ESP32, ESP32-CAM, Arduino, Raspberry Pi, Jetson Nano, FPGA, C/C++)
- **Competitive Programming & Data Structures** (Codeforces, A2SV)

---

## ✨ Features & Visual Highlights

- **📐 Modular Architecture**: Decoupled HTML partial sections, modular CSS tokens, and ES6 JS feature modules for maximum maintainability.
- **🌓 Dynamic Dark / Light Theme**: Instant theme switching with zero Flash of Unstyled Content (FOUC) and `localStorage` persistence.
- **⚡ FLIP Profile Picture Animation**: Smooth profile picture morph transition between the Hero section and Glass Navigation bar upon scrolling.
- **🎯 3D Perspective Card Tilt**: Interactive 3D tilt hover matrix effect on project cards.
- **🔄 Infinite Skills Marquee**: Continuous left-to-right looping carousel highlighting languages, frameworks, hardware, and tools with monochrome-to-color hover focus.
- **🔥 Nike-Style Graphic Typography**: Integrated `"LETS BUILD TOGETHER!"` background graphic slogan.
- **📩 Formspree AJAX Integration**: Asynchronous contact form submission with real-time UI state feedback.

---

## 🛠️ Project Architecture

```text
henokgportfolio/
├── dist/                     # Production build output
├── src/
│   ├── images/               # Image assets & screenshots
│   ├── public/images/        # Static public assets (Vercel deployment)
│   ├── scripts/
│   │   ├── modules/          # ES JavaScript Feature Modules
│   │   │   ├── 3d-card.js
│   │   │   ├── animations.js
│   │   │   ├── contact-form.js
│   │   │   ├── navigation.js
│   │   │   ├── preloader.js
│   │   │   ├── profile-morph.js
│   │   │   ├── theme.js
│   │   │   └── typewriter.js
│   │   └── script.js         # Entry JavaScript module
│   ├── sections/             # Modular HTML Section Partials
│   │   ├── about.html
│   │   ├── certificates.html
│   │   ├── contact.html
│   │   ├── education.html
│   │   ├── experience.html
│   │   ├── footer.html
│   │   ├── hero.html
│   │   ├── nav.html
│   │   ├── preloader.html
│   │   ├── projects.html
│   │   └── tools.html
│   ├── styles/               # Modular CSS Stylesheets
│   │   ├── about.css
│   │   ├── base.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   ├── hero.css
│   │   ├── nav.css
│   │   ├── preloader.css
│   │   ├── projects.css
│   │   ├── responsive.css
│   │   ├── skills.css
│   │   ├── styles.css        # Master CSS importer
│   │   ├── timeline.css
│   │   └── variables.css
│   └── index.html            # Main HTML entry file
├── package.json              # Dependencies & Scripts
├── vercel.json               # Vercel deployment configuration
└── vite.config.js            # Vite configuration & HTML partial plugin
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Henok0728/henokgportfolio.git
   cd henokgportfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server** (with Nodemon & Vite HMR):
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-ready static bundle will be generated in the `dist/` directory.

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌟 Featured Projects

- **Face Recognition Attendance System**: Web & embedded application using InsightFace, Flask, MongoDB, ESP32, ESP32-CAM, PIR sensor, and TFT screen.
- **Pharmaceutical Inventory Management System**: Hardware-integrated Java Spring Boot desktop application with MySQL, C++, and Arduino.
- **Server Calculator**: Java TCP socket & multithreading client-server calculator.
- **Lodge Link**: Hotel middleware platform (TypeScript, FastAPI, React, SQLAlchemy).

---

## 🌐 Connect With Me

- **GitHub**: [@Henok0728](https://github.com/Henok0728)
- **LinkedIn**: [Henok Gizaw Nigatu](https://www.linkedin.com/in/henokgizawnigatu)
- **Telegram**: [@henokastr](https://t.me/henokastr)
- **Codeforces**: [henok.ugr-0728-16](https://codeforces.com/profile/henok.ugr-0728-16)

---

## 📜 License

This project is open source and available under the [ISC License](LICENSE).