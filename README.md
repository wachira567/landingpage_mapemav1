# Mapema — Kenya's Connected Future

Mapema is a premium, high-performance landing page representing a futuristic enterprise connectivity and loyalty rewards platform powering businesses and homes across East Africa.

📱 **Live URL:** (https://landingpage-mapemav1.vercel.app/)

---

## 🌌 Tech Stack & Key Features

*   **React & TypeScript:** Single Page Application (SPA) structure offering robust component typing and state management.
*   **Vite:** Superfast build and dev environment.
*   **WebGL 3D Raymarched Valley (Three.js):** 
    *   Features a custom fragment shader written in **GLSL 300 ES** (`THREE.GLSL3`) inside [ValleyCanvas.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/components/ValleyCanvas.tsx).
    *   Renders real-time landscape elevation, lighting, dynamic water wave displacement (via sin/cos height maps), film grain, and volumetric/god-ray scattering effects.
    *   Supports interactive zoom navigation using the mouse wheel events mapping directly into the orthographic camera.
*   **GSAP Animations:** Smooth page layout entry transitions and page-scroll staggered card animations using `ScrollTrigger` and gsap timelines.
*   **Tailwind CSS:** Modern dark mode styling, curated HSL-tailored color schemes (`#050505` deep black backgrounds and `#EDCC9E` soft gold accents), and animations (pulse dots, ticker banner).
*   **Interactive Coverage Map:** An SVG-based abstract map of Kenya showcasing connection grids and active nodes with search availability checks for major cities.

---

## 🛠️ Local Development

### Prerequisites
*   Node.js 20+
*   npm or yarn

### 1. Installation
Install all dependencies from the standard NPM registry:
```bash
npm install
```

### 2. Run Development Server
Start the local server at `http://localhost:3000`:
```bash
npm run dev
```

### 3. Production Build
Compile and bundle the site into minified production files (under the `dist/` directory):
```bash
npm run build
```

---

## 📂 Project Structure

*   `src/components/`
    *   [ValleyCanvas.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/components/ValleyCanvas.tsx): Three.js WebGL canvas containing custom shaders.
    *   [Header.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/components/Header.tsx): Fixed navigation header with mobile viewports.
*   `src/sections/`
    *   [HeroSection.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/HeroSection.tsx): Landing viewport with GSAP headers.
    *   [BrandTicker.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/BrandTicker.tsx): Scrolling brand banner.
    *   [EnterpriseSection.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/EnterpriseSection.tsx): Staggered reveals of solution offerings.
    *   [CoverageSection.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/CoverageSection.tsx): Interactive footprint check logic and SVG map.
    *   [StatsBand.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/StatsBand.tsx): Key business indicators.
    *   [RewardsSection.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/RewardsSection.tsx): Wallet, cashback information, and mobile app mockup.
    *   [CTABanner.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/CTABanner.tsx) & [Footer.tsx](file:///home/wachira/Documents/Tinka_Development_Projects/May2026/june24th-landing%20pages%20exampes/Kimi_Agent_Mapema%20Landing%20Page%20Design/app/src/sections/Footer.tsx): Contact information and links.
*   `public/images/`: Optimization assets for dashboard, mockup, and service covers.
