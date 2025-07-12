# Amit Anand - AI & Software Innovator Portfolio

A modern, responsive portfolio website showcasing Amit Anand's expertise in AI/ML, software development, and research achievements. Built with professional architecture and production-ready code structure.

## 🚀 Features

### ✨ Visual Design
- **Dark Theme** with neon accents and glassmorphism effects
- **Matrix Background** animation in hero section
- **Floating Particles** background effect
- **Smooth Animations** powered by GSAP
- **Interactive Cards** with 3D tilt effects
- **Responsive Design** for all devices

### 🎯 Interactive Elements
- **Scroll Progress Bar** showing page progress
- **Interactive Resume** with carousel navigation
- **Modal System** for project details
- **Smooth Scrolling** navigation
- **Back to Top** button
- **Mobile Menu** for responsive navigation

### 📱 Sections
- **Hero Section** with animated typing effect
- **Experience Timeline** with parallax effects
- **Projects Showcase** with detailed modals
- **Publications** highlighting research work
- **Achievements** showcasing recognition
- **Skills Grid** with hover animations
- **Contact Section** with call-to-action

## 🏗️ Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All CSS styles organized by sections
├── js/
│   └── main.js            # Modular JavaScript with ES6 classes
├── assets/
│   ├── 121176648.jpeg     # Profile image
│   └── Resume.pdf         # Downloadable resume
├── README.md              # Project documentation
└── vercel.json            # Deployment configuration
```

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and animations
- **JavaScript (ES6+)** - Modular architecture with classes
- **Tailwind CSS** - Utility-first CSS framework

### Libraries & Dependencies
- **GSAP** - Professional animations and scroll triggers
- **VanillaTilt** - 3D card tilt effects
- **Typed.js** - Typing animation for hero subtitle
- **Font Awesome** - Icon library
- **Google Fonts** - Poppins font family

## 🎨 Design System

### Color Palette
```css
:root {
    --dark-bg: #0a0a1a;
    --dark-card: #18182f;
    --text-primary: #e0e6f7;
    --text-secondary: #a5b4fc;
    --accent-pink: #f472b6;
    --accent-indigo: #6366f1;
    --accent-blue: #a5b4fc;
}
```

### Typography
- **Primary Font**: Poppins (300, 400, 500, 600, 700)
- **Fallback**: System fonts

### Animations
- **Entrance Animations**: Fade-in with staggered delays
- **Hover Effects**: Scale, rotate, and glow effects
- **Scroll Animations**: Parallax and reveal effects
- **Background Effects**: Matrix rain and floating particles

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local development server (optional)

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Open `index.html` in your browser or serve locally:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## 🔧 Customization

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles/main.css`
3. Add JavaScript functionality in `js/main.js`

### Modifying Colors
Update CSS variables in `styles/main.css`:
```css
:root {
    --accent-indigo: #your-color;
    --accent-pink: #your-color;
    /* ... other colors */
}
```

### Adding Animations
Use GSAP for new animations in `js/main.js`:
```javascript
gsap.from(".your-element", {
    scrollTrigger: { trigger: ".your-element", start: "top 80%" },
    opacity: 0, y: 50, duration: 0.8
});
```

## 📊 Performance Optimizations

- **CSS Organization**: Modular CSS with logical sections
- **JavaScript Architecture**: ES6 classes for maintainability
- **Image Optimization**: Compressed profile image
- **Lazy Loading**: Efficient resource loading
- **Debounced Events**: Performance-optimized scroll handlers

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

- **Email**: amitanand983@gmail.com
- **LinkedIn**: [Amit Anand](https://www.linkedin.com/in/amit-anand-0015b2145)
- **GitHub**: [amitanand983](https://github.com/amitanand983)
- **ORCID**: [0009-0006-9856-1026](https://orcid.org/0009-0006-9856-1026)

---

**Built with ❤️ and modern web technologies** 