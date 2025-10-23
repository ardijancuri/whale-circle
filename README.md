# Whale Circle Website

A modern, minimalistic website featuring a stunning Three.js particle whale animation in the hero section.

Live URL: <a href="https://whale-circle.netlify.app">whale-circle.netlify.app</a>

## Features

- **Three.js Particle Whale**: Interactive 3D whale made of particles that responds to mouse movement
- **Smooth Animations**: Minimalistic floating and breathing animations
- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Clean, minimal design with accent colors
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Interactive Elements**: Hover effects, ripple animations, and scroll animations

## Color Palette

- **Primary (Ink)**: #0E1116
- **Accent (Aqua)**: #8FD3FE
- **Gold Accent**: #D3B574
- **Background Light**: #FFFFFF
- **Background Dark**: #0A0C10
- **Text Primary**: #101317
- **Text Secondary**: #5A6573

## Technologies Used

- HTML5
- CSS3 (with CSS Custom Properties)
- JavaScript (ES6+)
- Three.js (r128)

## Project Structure

```
whale-circle/
├── index.html              # Main HTML file
├── styles.css              # Global styles and design tokens
├── whale-particles.js      # Three.js particle whale animation
├── script.js               # Main JavaScript for interactions
└── README.md              # This file
```

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Use a Local Server (Recommended)

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

#### Using Node.js (http-server):
```bash
npm install -g http-server
http-server

# Then open: http://localhost:8080
```

#### Using VS Code:
Install the "Live Server" extension and click "Go Live" in the status bar.

## Features Breakdown

### Hero Section
- Full-screen hero with particle whale animation
- Interactive: Whale responds to mouse movement
- Smooth floating and breathing animations
- Call-to-action buttons

### About Section
- Grid layout with text and visual
- Animated statistics counter
- Responsive design

### Services Section
- 6 service cards with icons
- Hover effects and animations
- Auto-grid layout

### Process Section
- 6-step process visualization
- Dark theme section
- Step-by-step breakdown

### Contact Section
- Contact form
- Contact information
- Form validation

### Footer
- Multi-column layout
- Links and branding
- Copyright information

## Customization

### Changing Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --color-primary: #0E1116;
    --color-accent: #8FD3FE;
    /* ... other colors */
}
```

### Modifying the Whale
Edit the `createWhaleShape()` function in `whale-particles.js` to change the whale's appearance.

### Adding Content
Update the content directly in `index.html`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized particle count for smooth performance
- Throttled scroll events
- Responsive canvas rendering
- Hardware-accelerated animations

## Future Enhancements

- [ ] Add mobile menu/hamburger navigation
- [ ] Implement actual form submission backend
- [ ] Add more whale animations (swimming patterns)
- [ ] Add more sections (portfolio, testimonials)
- [ ] Dark mode toggle
- [ ] Loading animation

## License

MIT License - feel free to use this project for your own purposes.

## Credits

Design inspired by modern minimalistic websites with ocean/whale themes.
Built with Three.js for 3D particle effects.
