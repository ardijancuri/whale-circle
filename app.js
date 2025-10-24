// ===================================
// Whale Circle - Shared JavaScript
// ===================================

// Four Pillars Configuration
const PILLARS = {
  wealth: {
    name: 'Wealth & Alpha',
    icon: 'fas fa-chart-line',
    color: '#D3B574',
    question: 'If you could give your younger self one piece of advice from the start of your career, what would it be?'
  },
  wellness: {
    name: 'Wellness & Fitness',
    icon: 'fas fa-heartbeat',
    color: '#4CAF50',
    question: "What's one non-negotiable part of your wellness routine that keeps you performing at your best?"
  },
  community: {
    name: 'Community & Culture',
    icon: 'fas fa-users',
    color: '#8FD3FE',
    question: 'Which community or relationship has had the greatest influence on your career trajectory?'
  },
  media: {
    name: 'Media & Influence',
    icon: 'fas fa-broadcast-tower',
    color: '#9C27B0',
    question: 'Who has most shaped your mindset and approach to leadership?'
  }
};

// ===================================
// Data Loading Functions
// ===================================

async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    return [];
  }
}

async function loadEvents() {
  return await loadJSON('/data/events.json');
}

async function loadPosts() {
  return await loadJSON('/data/posts.json');
}

async function loadVideos() {
  return await loadJSON('/data/videos.json');
}

async function loadPress() {
  return await loadJSON('/data/press.json');
}

// ===================================
// Pillar Badge Component
// ===================================

function createPillarBadge(pillarKey) {
  const pillar = PILLARS[pillarKey];
  if (!pillar) return '';

  return `
    <span class="badge-pillar ${pillarKey}">
      <i class="${pillar.icon} pillar-icon"></i>
      ${pillar.name}
    </span>
  `;
}

function renderPillarBadges(pillars) {
  if (!pillars || pillars.length === 0) return '';

  return `
    <div class="badge-pillars">
      ${pillars.map(pillar => createPillarBadge(pillar)).join('')}
    </div>
  `;
}

// ===================================
// Pillar Filters
// ===================================

function createPillarFilters(activeFilters = []) {
  const filterButtons = Object.keys(PILLARS).map(key => {
    const isActive = activeFilters.includes(key);
    return `
      <button class="filter-btn ${key} ${isActive ? 'active' : ''}" data-pillar="${key}">
        <i class="${PILLARS[key].icon}"></i> ${PILLARS[key].name}
      </button>
    `;
  }).join('');

  return `
    <div class="pillar-filters">
      <button class="filter-btn ${activeFilters.length === 0 ? 'active' : ''}" data-pillar="all">
        <i class="fas fa-th"></i> All Content
      </button>
      ${filterButtons}
    </div>
  `;
}

function setupPillarFilters(onFilterChange) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeFilters = [];

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pillar = btn.dataset.pillar;

      if (pillar === 'all') {
        activeFilters = [];
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        // Remove "all" filter if active
        document.querySelector('[data-pillar="all"]')?.classList.remove('active');

        // Toggle this pillar
        if (activeFilters.includes(pillar)) {
          activeFilters = activeFilters.filter(p => p !== pillar);
          btn.classList.remove('active');
        } else {
          activeFilters.push(pillar);
          btn.classList.add('active');
        }

        // If no filters active, activate "all"
        if (activeFilters.length === 0) {
          document.querySelector('[data-pillar="all"]')?.classList.add('active');
        }
      }

      onFilterChange(activeFilters);
    });
  });
}

function filterItemsByPillars(items, activeFilters) {
  if (activeFilters.length === 0) return items;

  return items.filter(item => {
    if (!item.pillars || item.pillars.length === 0) return false;
    return item.pillars.some(pillar => activeFilters.includes(pillar));
  });
}

// ===================================
// Date Formatting
// ===================================

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// ===================================
// Add to Calendar
// ===================================

function generateICS(event) {
  const start = new Date(event.start).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(event.end).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.venue}, ${event.city}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

function downloadICS(event) {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.slug}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ===================================
// YouTube Embed (Privacy-Enhanced)
// ===================================

function createYouTubeEmbed(videoId, autoplay = false) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    autoplay: autoplay ? '1' : '0'
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function createYouTubeThumbnail(videoId, quality = 'maxresdefault') {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// ===================================
// Slug Generation
// ===================================

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ===================================
// URL Helpers
// ===================================

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
}

function setURLParam(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

// ===================================
// Lazy Loading Images
// ===================================

function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Smooth Scroll
// ===================================

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===================================
// Mobile Navigation
// ===================================

function setupMobileNav() {
  // Mobile menu toggle (if needed)
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const nav = document.querySelector('.nav-menu');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }
}

// ===================================
// Form Validation
// ===================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

// ===================================
// Initialize on Page Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupMobileNav();
  setupLazyLoading();
});

// ===================================
// Export for use in other scripts
// ===================================

window.WhaleCircle = {
  PILLARS,
  loadEvents,
  loadPosts,
  loadVideos,
  loadPress,
  createPillarBadge,
  renderPillarBadges,
  createPillarFilters,
  setupPillarFilters,
  filterItemsByPillars,
  formatDate,
  formatDateTime,
  formatTime,
  generateICS,
  downloadICS,
  createYouTubeEmbed,
  createYouTubeThumbnail,
  generateSlug,
  getURLParams,
  setURLParam,
  validateForm,
  validateEmail
};
