# 🚀 How to Run PhishSense

## Quick Start (3 Steps)

### Step 1: Open Terminal
- Press `Windows Key + X` and select "Windows PowerShell" or "Terminal"
- OR right-click in your project folder and select "Open in Terminal"

### Step 2: Navigate to Project Folder (if not already there)
```bash
cd C:\Users\user\Desktop\Phish_sense
```

### Step 3: Start the Development Server
```bash
npm run dev
```

## What Happens Next?

After running `npm run dev`, you'll see something like:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser
1. Copy the URL shown (usually `http://localhost:5173`)
2. Open your web browser (Chrome, Firefox, Edge, etc.)
3. Paste the URL in the address bar
4. Press Enter

**That's it! Your website is now running! 🎉**

---

## 📋 Complete Step-by-Step Guide

### First Time Setup (Only if dependencies aren't installed)

If you see errors about missing modules, run:

```bash
npm install
```

This installs all required libraries (React, Framer Motion, etc.)

---

## 🎮 Running Commands

### Development Mode (What you'll use most)
```bash
npm run dev
```
- Starts the development server
- Opens at `http://localhost:5173`
- **Auto-refreshes** when you make changes
- Shows errors in the browser

### Build for Production
```bash
npm run build
```
- Creates optimized files in `dist/` folder
- Ready to deploy to a web server

### Preview Production Build
```bash
npm run build
npm run preview
```
- Tests the production build locally

---

## 🛑 How to Stop the Server

1. Go to the terminal window
2. Press `Ctrl + C`
3. Confirm by pressing `Y` or `Enter`

---

## 🔧 Troubleshooting

### Problem: "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Port 5173 already in use"
**Solution:** 
- Close other programs using that port
- OR Vite will automatically use the next available port (5174, 5175, etc.)

### Problem: "Cannot find module"
**Solution:** Run `npm install` to install dependencies

### Problem: Page shows blank/white screen
**Solution:**
- Check browser console for errors (F12)
- Make sure all files are saved
- Try refreshing the page (Ctrl + R)

---

## 📱 What You'll See

1. **Intro Screen** - Animated welcome screen with "Get Started" button
2. **Home Screen** - Feature cards and "Start Analysis" button (after clicking Get Started)
3. **Analysis Screen** - Input field to analyze URLs/emails (after clicking Start Analysis)

---

## 💡 Tips

- **Keep the terminal open** while developing
- The server **auto-reloads** when you save changes
- Check the terminal for any error messages
- Use browser DevTools (F12) to debug

---

## 🎯 Quick Reference

| Command | What It Does |
|---------|-------------|
| `npm install` | Install dependencies (first time only) |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `Ctrl + C` | Stop the server |

---

**Need Help?** Check the terminal output for error messages or browser console (F12) for JavaScript errors.


