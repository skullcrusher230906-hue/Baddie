# GetBaddie ♡

> **Not just a dating app... It's a vibe. ♡**  
> *Real People • Real Vibes • No Rules*

![GetBaddie Preview](assets/images/hero-baddie.jpg)

[![License: MIT](https://img.shields.io/badge/License-MIT-ff2a7a.svg)](LICENSE)
[![Status: Ready for Deploy](https://img.shields.io/badge/Status-Production%20Ready-success.svg)](#)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-ff2a7a.svg)](#)

---

## ✨ Overview

**GetBaddie ♡** is an ultra-stylish, dark-aesthetic dating and connection web application designed with sultry bedroom ambiance and signature hot neon pink accents (`#ff2a7a`).

Built to match the exact aesthetic, typography, and layout of the original design concept, this repository is **100% self-contained, zero-dependency, and ready to upload directly to GitHub / GitLab and deploy live**.

---

## 🔥 Key Features

1. **Faithful Visual Design**:
   - Signature handwritten brush typography (`Caveat`) & clean UI (`Plus Jakarta Sans`).
   - Neon pink glow filters, hand-drawn crown doodles, and heart accents.
   - Pinned authentic **Polaroid Card** with translucent washi tape.
   - **Hot Pink Sticky Note** displaying the founder and team board.
   - Cinematic sensual bottom banner with call-to-action.

2. **Interactive Explore & Swipe Deck**:
   - 3D Card Stack featuring baddie profiles (Mia, Zara, Elena, Sienna).
   - Mouse drag and touch gestures (swipe right to Like, swipe left to Pass).
   - Keyboard shortcuts (`←` Pass, `→` Like, `↑` Superlike).
   - "It's a Vibe! You Matched" instant celebration modal.

3. **Active Matches Grid**:
   - Live status indicators (Online, active minutes ago).
   - Vibe compatibility percentages.
   - Direct 1-click chat launcher.

4. **Interactive Direct Messenger**:
   - Real-time chat stream with message bubbles.
   - Instant icebreaker chips (*"Late night vibe? 🌙"*, *"Drinks or coffee? 🍸"*, etc.).
   - Simulated baddie replies with realistic typing indicators (`Mia is typing... ♡`).

5. **Integrated Web Audio Ambient Synthesizer**:
   - Self-contained audio generation via the HTML5 Web Audio API (zero audio files needed).
   - Dreamy ambient synth pad toggle in the navigation bar.
   - Interactive sound effects for Likes, Matches, Passes, and incoming messages.

6. **Interactive Onboarding & Auth**:
   - **Join Now Modal** with vibe selection chips.
   - **Log In Modal** with demo credentials pre-loaded.
   - Toast notification feedback system.

---

## 📁 Repository Structure

```text
get_baddie2.0/
├── index.html              # Main single-page application & all interactive views
├── explore.html            # Direct route fallback for /explore
├── matches.html            # Direct route fallback for /matches
├── messages.html           # Direct route fallback for /messages
├── css/
│   └── style.css           # Bespoke design system, glassmorphism, & responsive CSS
├── js/
│   └── app.js              # View router, swipe engine, chat simulation & audio synth
├── assets/
│   └── images/             # High-res photography assets matching the dark aesthetic
│       ├── hero-baddie.jpg
│       ├── polaroid-baddie.jpg
│       ├── bottom-couple.jpg
│       ├── profile-mia.jpg
│       ├── profile-zara.jpg
│       └── profile-elena.jpg
├── .gitignore              # Standard git ignore file
├── LICENSE                 # MIT License
├── package.json            # Development & preview scripts
└── README.md               # Project documentation
```

---

## 🚀 Quick Start (Running Locally)

Because GetBaddie is built with vanilla standards, you can run it instantly without compiling:

### Option 1: Direct File Open
Simply double-click `index.html` or open it in any modern browser:
```bash
open index.html
```

### Option 2: Using Node / NPM
```bash
# Start a local static server
npm start
# or
npx -y serve .
```

### Option 3: Using Python
```bash
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

---

## 🌐 Deploy to Git & Go Live

This repository is already initialized and prepared for immediate upload to GitHub or GitLab:

### 1. Push to GitHub
Create a new empty repository on [GitHub](https://github.com/new), then run:

```bash
# Add your GitHub repository URL
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# Push the main branch
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages (Free Instant Hosting)
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. Your website will be live at `https://<your-username>.github.io/<your-repo-name>/`!

### 3. Deploy to Vercel or Netlify
- **Vercel**: Import the GitHub repo; it will automatically detect `index.html` and deploy with zero configuration.
- **Netlify**: Drag and drop the `get_baddie2.0` folder directly onto [Netlify Drop](https://app.netlify.com/drop).

---

## 👑 Team Credits

As featured on the official GetBaddie team board:

- **Founder**: Chinmay Randwa
- **CEO**: Kiron, Chetan
- **Tech Lead**: Chinmay Randwa
- **Web Developer**: Chinmay
- **Backend Dev**: EDA - Athmik
- **Frontend**: Amith
- **Presentation**: Andhera Chetan
- **Authentication Testing**: Arjun
- **Data Collection**: Chetan, Kiran

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

*Built for baddies. By a baddie. ♡*
