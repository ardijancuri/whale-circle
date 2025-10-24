# Whale Circle Admin Panel

## Simple JSON-Based Content Management

This is a lightweight admin panel for managing your Whale Circle website content stored in JSON files.

### How It Works

Content is stored in `/data/*.json` files:
- `events.json` - Events and gatherings
- `posts.json` - Blog posts
- `videos.json` - Video content
- `press.json` - Press coverage

### Managing Content

**Option 1: GitHub-Based (Recommended)**
1. Edit JSON files directly in GitHub
2. Commit changes
3. Auto-deploy via GitHub Actions/Vercel

**Option 2: Local Editing**
1. Edit JSON files locally in `/data/` folder
2. Test locally
3. Deploy via FTP or Git

**Option 3: Admin Panel**
1. Access at `/admin/`
2. Login with password: `whalecircle2025`
3. View and browse content
4. Download JSON files for editing

### Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. **Change the admin password** in `/admin/index.html`
2. **Add server-side authentication** (this is client-side only)
3. **Restrict admin folder** using `.htaccess` or server config
4. Consider using environment variables for sensitive data

### Upgrading to Full CMS

When ready to scale, migrate to:
- **Strapi** - Open-source headless CMS
- **Sanity** - Structured content platform
- **WordPress** + Headless setup
- **Custom backend** with database

### Content Schema

#### Events
```json
{
  "id": "unique-id",
  "title": "Event Title",
  "slug": "event-slug",
  "start": "2025-11-02T18:00:00",
  "end": "2025-11-02T22:00:00",
  "timezone": "GST",
  "city": "Dubai",
  "venue": "Venue Name",
  "image": "/assets/events/image.jpg",
  "description": "Event description",
  "pillars": ["wellness", "community"],
  "isExternal": false,
  "isPast": false,
  "capacity": 24,
  "rsvpLink": "/contact?event=event-id"
}
```

#### Blog Posts
```json
{
  "id": "unique-id",
  "title": "Post Title",
  "slug": "post-slug",
  "date": "2025-01-15",
  "author": "Author Name",
  "image": "/assets/blog/image.jpg",
  "excerpt": "Short excerpt",
  "body": "<p>Full HTML content</p>",
  "pillars": ["wealth", "media"],
  "category": "insights",
  "featured": true
}
```

#### Videos
```json
{
  "id": "unique-id",
  "title": "Video Title",
  "slug": "video-slug",
  "youtubeId": "VIDEO_ID",
  "description": "Video description",
  "pillars": ["wellness"],
  "publishedISO": "2025-01-10",
  "duration": "12:34",
  "featured": true,
  "category": "tv-show"
}
```

#### Press Items
```json
{
  "id": "unique-id",
  "title": "Article Title",
  "outlet": "Publication Name",
  "date": "2025-01-20",
  "url": "https://external-url.com",
  "image": "/assets/press/image.jpg",
  "excerpt": "Brief excerpt",
  "pillars": ["media", "wealth"]
}
```

### Four Pillars

All content can be tagged with one or more pillars:
- `wealth` - Wealth & Alpha (💰)
- `wellness` - Wellness & Fitness (🏃)
- `community` - Community & Culture (🤝)
- `media` - Media & Influence (📺)

### Adding New Content

1. Open the appropriate JSON file
2. Copy an existing item
3. Update all fields with new content
4. Generate a unique `id` and `slug`
5. Save and test locally
6. Deploy

### Asset Management

Store images in:
- `/assets/events/` - Event images
- `/assets/blog/` - Blog post images
- `/assets/videos/` - Video thumbnails
- `/assets/press/` - Press coverage images

### Support

For questions or issues:
- Email: hello@whalecircle.com
- Documentation: See PDFs in root directory

---

Built with ❤️ for Whale Circle
