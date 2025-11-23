# PhishSense - Phishing Detection Website

A beautiful, animated React.js frontend for a phishing detection system with multiple screens and smooth transitions.

## Features

- 🎨 **Stunning Visual Design** - Vibrant colors and modern UI
- ✨ **Smooth Animations** - Powered by Framer Motion
- 📱 **Responsive Design** - Works on all devices
- 🎯 **Multi-Screen Navigation** - Intro → Home → Analysis flow
- 🛡️ **Interactive Analysis** - Real-time phishing detection interface

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Project Structure

```
src/
├── screens/
│   ├── Intro.jsx      # Animated intro screen
│   ├── Intro.css
│   ├── Home.jsx       # Home screen with features
│   ├── Home.css
│   ├── Analysis.jsx   # Analysis screen
│   └── Analysis.css
├── App.jsx            # Main app with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Screens

1. **Intro Screen** - Animated welcome screen with gradient background
2. **Home Screen** - Feature showcase with cards and CTA button
3. **Analysis Screen** - Input form and results display

## Technologies Used

- React 18
- React Router DOM
- Framer Motion (animations)
- Vite (build tool)
- CSS3 (styling)

## Customization

You can customize colors, animations, and content by editing the respective CSS and JSX files in the `src/screens/` directory.



