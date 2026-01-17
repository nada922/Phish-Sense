# Phish Sense - React Website

A modern React website for Phish Sense, an advanced phishing protection service.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Project2/
├── src/
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── Pages/               # Page components
│   ├── Home.jsx
│   ├── Features.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── HowItWorks.jsx
├── Componants/          # Reusable components
│   ├── ui/              # UI component library
│   └── UserNotRegisteredError.jsx
├── layout.jsx           # Main layout wrapper
├── utils.js             # Utility functions
└── lib/
    └── utils.js         # Class name utilities
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router DOM** - Routing
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Radix UI** - Accessible component primitives

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Features

- Responsive design
- Modern UI with Tailwind CSS
- React Router for navigation
- Component-based architecture
- Accessible UI components

## 📄 License

This project is part of a graduation project.
