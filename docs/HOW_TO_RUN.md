# How to Run Whale Circle Website Locally

## The Issue

You're seeing empty pages because **browsers block loading local JSON files via JavaScript** for security reasons (CORS policy). The website needs to run on a local web server to function properly.

## Solution: Run a Local Web Server

You have several options to run a local server:

---

### Option 1: Python (Recommended - Simple)

If you have Python installed:

**Python 3.x:**
```bash
cd c:\Users\PC\Desktop\whale-cricle
python -m http.server 8000
```

**Python 2.x:**
```bash
cd c:\Users\PC\Desktop\whale-cricle
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

---

### Option 2: Node.js (http-server)

If you have Node.js installed:

1. Install http-server globally:
```bash
npm install -g http-server
```

2. Run the server:
```bash
cd c:\Users\PC\Desktop\whale-cricle
http-server -p 8000
```

Then open: **http://localhost:8000**

---

### Option 3: VS Code Live Server Extension

If you're using Visual Studio Code:

1. Install the "Live Server" extension by Ritwick Dey
2. Right-click on `index.html`
3. Select "Open with Live Server"

The website will automatically open in your browser.

---

### Option 4: PHP (if you have PHP installed)

```bash
cd c:\Users\PC\Desktop\whale-cricle
php -S localhost:8000
```

Then open: **http://localhost:8000**

---

## Verifying It Works

Once the server is running:

1. Open **http://localhost:8000** in your browser
2. Navigate to:
   - **Events page**: http://localhost:8000/events.html
   - **Blog page**: http://localhost:8000/blog.html
   - **Videos page**: http://localhost:8000/videos.html
   - **Press page**: http://localhost:8000/press.html

3. You should see:
   - ✅ 10 events displaying on the events page
   - ✅ 2 blog posts on the blog page
   - ✅ 4 videos on the videos page
   - ✅ 3 press items on the press page

---

## Checking for Errors

Open the browser's Developer Console (F12) and check for:

- ❌ **CORS errors** = You're opening files directly (file://) instead of via a server (http://)
- ❌ **404 errors** = Server can't find the JSON files (check paths)
- ✅ **No errors** = Everything is working!

---

## Quick Start (Recommended)

**Easiest method using Python:**

1. Open Command Prompt or PowerShell
2. Navigate to the project folder:
   ```bash
   cd c:\Users\PC\Desktop\whale-cricle
   ```
3. Start the server:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and go to: **http://localhost:8000**

That's it! The website should now display all content correctly.

---

## Troubleshooting

### Events/Posts/Videos Not Showing?

1. **Check the browser console** (F12 → Console tab)
2. Look for error messages
3. Verify the server is running on port 8000
4. Make sure you're accessing via `http://localhost:8000` and NOT `file:///`

### Still Having Issues?

Make sure:
- The server is running in the `whale-cricle` directory
- All JSON files exist in the `data/` folder
- You're accessing the site via `http://localhost:8000` (not file://)
- Your browser console doesn't show any JavaScript errors

---

## For Production Deployment

When ready to deploy, you can use:
- **GitHub Pages** (free hosting)
- **Vercel** (free hosting with automatic deployments)
- **Netlify** (free hosting with form handling)
- **Traditional hosting** (shared hosting, VPS, etc.)

All of these will serve files correctly without CORS issues.
