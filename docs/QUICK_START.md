# Whale Circle - Quick Start Guide

## 🎯 Get Your Website Live in 5 Steps

### Step 1: Test Locally (2 minutes)
```bash
# Open index.html in your browser
# Click through all the pages to see everything working
```

Visit:
- Homepage: [index.html](index.html)
- Events: [events.html](events.html)
- Admin: [admin/index.html](admin/index.html) (password: `whalecircle2025`)

---

### Step 2: Add Your Content (30 minutes)

**Edit these JSON files with your real content:**

📅 `data/events.json` - Your upcoming events
✍️ `data/posts.json` - Your blog posts
📺 `data/videos.json` - Your video content
📰 `data/press.json` - Your press mentions

**Tip:** Use the existing sample content as templates!

---

### Step 3: Add Your Images (15 minutes)

Replace placeholder images in:
```
assets/
├── events/     (your event photos)
├── blog/       (your blog images)
├── videos/     (video thumbnails - optional)
└── press/      (press logos/images)
```

---

### Step 4: Configure Contact Form (5 minutes)

1. Go to https://formspree.io (FREE account)
2. Create a new form
3. Copy your form ID
4. Update [contact.html](contact.html):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```

---

### Step 5: Deploy (10 minutes)

**Option A: Vercel (Easiest, FREE)**
```bash
npm i -g vercel
vercel
```

**Option B: Netlify (FREE)**
```bash
npm i -g netlify-cli
netlify deploy
```

**Option C: GitHub Pages (FREE)**
```bash
git init
git add .
git commit -m "Launch Whale Circle"
git remote add origin YOUR_REPO_URL
git push -u origin main
# Then enable GitHub Pages in repo settings
```

---

## 🔐 Security Checklist

Before going live:

- [ ] Change admin password in `admin/index.html`
- [ ] Test contact form works
- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Replace sample content
- [ ] Add real images

---

## 📊 What You Get

✅ **10 Pages:**
- Home, Events, Past Events, Event Detail
- Videos, TV Show, Blog, Blog Post
- Press, Contact

✅ **Features:**
- Four Pillars filtering
- Mobile responsive
- SEO optimized
- Admin panel
- Contact form
- Add to Calendar
- Social sharing

✅ **Zero Monthly Cost:**
- No database fees
- Free hosting (Vercel/Netlify/GitHub Pages)
- Free contact form (Formspree free tier)

---

## 🆘 Need Help?

1. Read: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
2. Read: [admin/README.md](admin/README.md)
3. Check the PDF specifications in root folder
4. Contact: hello@whalecircle.com

---

## 🎉 You're Ready!

Your production-ready Whale Circle website is complete. Time to launch! 🚀

**Total setup time: ~1 hour**
**Monthly cost: $0** (with free tiers)
