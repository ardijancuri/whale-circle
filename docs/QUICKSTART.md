# Quick Start Guide - Whale Circle Website

## Instant Preview

### Windows (simplest method):
1. Double-click on `index.html` to open it in your default browser

### Using Python (if installed):
```bash
cd c:\Users\PC\Desktop\whale-cricle
python -m http.server 8000
```
Then open: http://localhost:8000

### Using Node.js (if installed):
```bash
cd c:\Users\PC\Desktop\whale-cricle
npx http-server
```
Then open: http://localhost:8080

## What You'll See

### 1. Hero Section
- A beautiful particle whale made with Three.js
- Move your mouse to interact with the whale
- The whale has gentle breathing and floating animations

### 2. Navigation
- Sticky navigation bar at the top
- Smooth scroll to different sections
- "Get Started" button

### 3. About Section
- Company information
- Animated statistics (150+ projects, 50+ clients, 98% satisfaction)
- Whale illustration

### 4. Services Section (6 cards)
- Web Development
- UI/UX Design
- Brand Strategy
- Digital Marketing
- Consulting
- Support & Maintenance

### 5. Process Section (6 steps)
- Discovery → Strategy → Design → Development → Launch → Growth
- Dark themed section

### 6. Contact Section
- Contact form
- Email and phone information
- All sections have smooth scroll animations

## Customization Tips

### Change Colors:
Open `styles.css` and modify the `:root` variables:
```css
:root {
    --color-primary: #0E1116;    /* Change this */
    --color-accent: #8FD3FE;     /* And this */
    /* ... */
}
```

### Change Content:
Open `index.html` and update the text directly

### Modify Whale Animation:
Open `whale-particles.js` and adjust:
- `createWhaleShape()` - Change whale form
- Particle count
- Animation speeds
- Colors

## Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Interactive 3D particle whale
✅ Smooth scroll animations
✅ Hover effects on cards
✅ Animated statistics counter
✅ Contact form (frontend only)
✅ Modern minimalistic design

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Troubleshooting

**Whale not showing?**
- Make sure Three.js CDN is loading (check browser console)
- Try refreshing the page
- Check internet connection (Three.js loads from CDN)

**Animations not working?**
- Check browser console for JavaScript errors
- Make sure all files are in the same folder

**Styling looks broken?**
- Verify `styles.css` is in the same folder as `index.html`
- Clear browser cache and refresh

## Next Steps

1. ✏️ Customize the content in `index.html`
2. 🎨 Adjust colors in `styles.css`
3. 🐋 Modify whale animation in `whale-particles.js`
4. 📧 Connect contact form to a backend service
5. 🚀 Deploy to a web host (Netlify, Vercel, GitHub Pages, etc.)

## Deploy to Web

### GitHub Pages (Free):
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at: `username.github.io/whale-circle`

### Netlify (Free):
1. Go to netlify.com
2. Drag and drop your folder
3. Done! Instant deployment

### Vercel (Free):
1. Go to vercel.com
2. Import your project
3. Deploy!

## Need Help?

Check the main `README.md` for detailed documentation.

---

Enjoy your Whale Circle website! 🐋✨
