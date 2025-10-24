const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
  'index.html',
  'events.html',
  'past-events.html',
  'event-detail.html',
  'videos.html',
  'tv-show.html',
  'blog.html',
  'blog-post.html',
  'press.html',
  'contact.html'
];

// New navigation structure with hamburger menu
const createNavigation = (activePage) => {
  const pages = [
    { href: '/', label: 'Home', page: 'index' },
    { href: '/events.html', label: 'Events', page: 'events' },
    { href: '/videos.html', label: 'Videos', page: 'videos' },
    { href: '/tv-show.html', label: 'TV Show', page: 'tv-show' },
    { href: '/blog.html', label: 'Blog', page: 'blog' },
    { href: '/press.html', label: 'Press', page: 'press' },
    { href: '/contact.html', label: 'Contact', page: 'contact' }
  ];

  const menuItems = pages.map(p => {
    const activeClass = p.page === activePage ? ' class="active"' : '';
    return `                <li><a href="${p.href}"${activeClass}>${p.label}</a></li>`;
  }).join('\n');

  return `    <nav class="nav">
        <div class="nav-container">
            <a href="/" class="nav-logo">
                <img src="/assets/whale-circle-logo.jpg" alt="Whale Circle" class="logo-image">
            </a>

            <!-- Hamburger Menu Icon -->
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul class="nav-menu">
${menuItems}
                <li class="mobile-cta-wrapper">
                    <a href="/contact.html" class="mobile-cta">Join Us</a>
                </li>
            </ul>

            <a href="/contact.html" class="nav-cta">Join Us</a>
        </div>
    </nav>`;
};

// Update each HTML file
htmlFiles.forEach(file => {
  try {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Determine active page
    let activePage = file.replace('.html', '');
    if (file === 'index.html') activePage = 'index';
    if (file === 'past-events.html') activePage = 'events';
    if (file === 'event-detail.html') activePage = 'events';
    if (file === 'blog-post.html') activePage = 'blog';

    // Find and replace the navigation section
    const navRegex = /<nav class="nav">[\s\S]*?<\/nav>/;
    const newNav = createNavigation(activePage);

    content = content.replace(navRegex, newNav);

    // Write the updated content back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${file}`);
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
  }
});

console.log('\n🎉 All pages updated with hamburger menu!');
console.log('Refresh your browser to see the mobile navigation.');
