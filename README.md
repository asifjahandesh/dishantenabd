# 📡 DishAntena Live — Ultra HD Live TV Streaming

A modern, responsive, high-performance Live IP TV streaming web application built with **HTML5, Modern CSS, Vanilla JavaScript, and HLS.js**, powered by **Vite**.

![DishAntena Live](https://img.shields.io/badge/DishAntena-Live_TV-00f2fe?style=for-the-badge&logo=satellite&logoColor=white)
![Verified Streams](https://img.shields.io/badge/Active_Streams-100%25_Verified-10b981?style=for-the-badge)
![Vite](https://img.shields.io/badge/Bundler-Vite_6-646cff?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open **`http://localhost:5173/`** in your browser.

### 3. Build for Production Deployment
```bash
npm run build
```
Generates an optimized static output in `dist/` ready for Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## ✨ Features

- **100% Active, Verified Streams**: Over 1,270+ dead/expired links (403/404) have been completely scrapped. Every channel in the master playlist is tested and active.
- **Brand New Design & Cyber Theme**: Deep obsidian background with luminous **Cyber Cyan (`#00f2fe`)** and glassmorphic micro-interactions.
- **Soundwave Equalizer**: Live audio visualizer animation on active playing channels.
- **Auto-Switch Failover**: If any stream experiences a network drop, DishAntena automatically recovers or advances to the next working channel.
- **CORS Stream Proxy Built-in**: Local Vite proxy middleware (`/api/proxy?url=...`) ensures cross-origin and unencrypted streams play with zero CORS blocks.
- **Player Utilities**:
  - Resolution & Bitrate switcher (Auto, 1080p, 720p, 480p, 360p).
  - Volume slider with one-click mute toggle.
  - Aspect ratio switcher (Normal, Fill, Cover, 16:9, 4:3).
  - Picture-in-Picture (`P`), Theater Mode (`T`), and Fullscreen (`F`).
  - Native Screenshot capture (`S`) with clean timestamp filenames.
  - Favorites system (⭐) persisted in browser storage.
  - Quick channel navigation with Previous (`[`) and Next (`]`) buttons.
- **Custom M3U Support**: Upload local `.m3u` files or paste any remote M3U URL on the fly.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :---: | :--- |
| `Space` | Play / Pause |
| `F` | Toggle Fullscreen |
| `M` | Mute / Unmute Audio |
| `P` | Picture-in-Picture (PiP) |
| `T` | Toggle Theater Mode |
| `]` | Next Channel |
| `[` | Previous Channel |
| `S` | Capture Screenshot |
| `?` | Keyboard Shortcuts Guide |

---

## 📄 License
Licensed under the [GNU General Public License v3.0](LICENSE).
