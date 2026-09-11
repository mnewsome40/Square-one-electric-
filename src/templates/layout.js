// Page shell shared by every page: <head>, header/navigation, mobile drawer, footer.
// Also exports the small HTML helpers the page templates use.

const fs = require('fs');
const path = require('path');
const site = require('../data/site');

/** Escape text for safe insertion into HTML text nodes and attribute values. */
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Render a list of paragraphs. Strings are escaped; `{ html }` objects are inserted as-is. */
function paragraphs(items, className) {
  const cls = className ? ` class="${className}"` : '';
  return items
    .filter(Boolean)
    .map((p) => (typeof p === 'string' ? `<p${cls}>${esc(p)}</p>` : `<p${cls}>${p.html}</p>`))
    .join('\n');
}

/** Turn "(901) 467-7607" into a tel: link wherever it appears in an escaped string. */
function linkPhones(text) {
  return esc(text).replace(/\(901\) 467-7607/g, `<a href="${site.phoneHref}">${site.phoneHtml}</a>`);
}

const iconCache = {};
/** Inline an SVG icon from src/assets/icons (fill is controlled by CSS). */
function icon(name, extraClass = '') {
  if (!iconCache[name]) {
    const file = path.join(__dirname, '..', 'assets', 'icons', `${name}.svg`);
    iconCache[name] = fs.readFileSync(file, 'utf8').replace(/<\?xml[^>]*>/, '').trim();
  }
  let svg = iconCache[name];
  // Decorative icons: hide from assistive tech and drop the embedded <title>.
  svg = svg.replace(/<title>[\s\S]*?<\/title>/, '').replace('<svg', '<svg aria-hidden="true" focusable="false"');
  if (extraClass) svg = svg.replace('<svg', `<svg class="${extraClass}"`);
  return svg;
}

const CHEVRON =
  '<svg class="chevron" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

const HAMBURGER =
  '<svg aria-hidden="true" viewBox="0 0 100 100"><path d="M77.1 34.3H44.2a2.5 2.5 0 0 1 0-5h32.9a2.5 2.5 0 0 1 0 5zM36.3 34.3H22.9a2.5 2.5 0 0 1 0-5h13.4a2.5 2.5 0 0 1 0 5zM77.1 52.4H22.9a2.5 2.5 0 0 1 0-5h54.2a2.5 2.5 0 0 1 0 5zM77.1 70.6H55.8a2.5 2.5 0 0 1 0-5h21.3a2.5 2.5 0 0 1 0 5zM47.9 70.6H22.9a2.5 2.5 0 0 1 0-5h25a2.5 2.5 0 0 1 0 5z"/></svg>';

/** Is this nav item (or one of its children) the current page? */
function isActive(item, currentPath) {
  if (item.href === currentPath) return true;
  return Boolean(item.children && item.children.some((c) => c.href === currentPath));
}

function navList(currentPath, { drawer = false } = {}) {
  const items = site.nav
    .map((item) => {
      const active = isActive(item, currentPath);
      const hasSub = Boolean(item.children);
      const classes = ['nav-item', hasSub ? 'has-sub' : '', active ? 'is-active' : ''].filter(Boolean).join(' ');
      const ariaCurrent = item.href === currentPath ? ' aria-current="page"' : '';
      let link;
      if (hasSub) {
        link = `<a class="nav-link" href="${esc(item.href)}" aria-haspopup="true" aria-expanded="false">${esc(item.label)} ${CHEVRON}</a>`;
        const children = item.children
          .map((c) => {
            const cActive = c.href === currentPath;
            return `<li${cActive ? ' class="is-active"' : ''}><a href="${esc(c.href)}"${cActive ? ' aria-current="page"' : ''}>${esc(c.label)}</a></li>`;
          })
          .join('');
        link += `<ul class="sub-menu">${children}</ul>`;
      } else {
        link = `<a class="nav-link" href="${esc(item.href)}"${ariaCurrent}>${esc(item.label)}</a>`;
      }
      return `<li class="${classes}">${link}</li>`;
    })
    .join('\n');
  return `<ul class="nav-list${drawer ? ' nav-list--drawer' : ''}">${items}</ul>`;
}

function header(currentPath) {
  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${esc(site.name)} — home">
      <img src="${site.logo.src}" alt="${esc(site.logo.alt)}" width="${site.logo.width}" height="${site.logo.height}" fetchpriority="high">
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      ${navList(currentPath)}
    </nav>
    <a class="btn btn--phone" href="${site.phoneHref}">${site.phoneHtml}</a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-controls="mobile-drawer" aria-expanded="false">${HAMBURGER}</button>
  </div>
</header>
<div class="drawer-overlay" hidden></div>
<aside id="mobile-drawer" class="mobile-drawer" aria-label="Site menu" inert>
  <button class="drawer-close" type="button" aria-label="Close menu">&times;</button>
  <nav aria-label="Mobile navigation">
    ${navList(currentPath, { drawer: true })}
  </nav>
  <a class="btn" href="${site.phoneHref}">${site.phoneHtml}</a>
</aside>`;
}

function footer() {
  return `
<footer class="site-footer">
  <div class="container">
    <img class="footer-collage" src="${site.footerImage.src}" alt="${esc(site.footerImage.alt)}" width="${site.footerImage.width}" height="${site.footerImage.height}" loading="lazy">
    <div class="footer-meta">
      <p>${esc(site.address.display)}</p>
      <p>${esc(site.copyright)}</p>
    </div>
  </div>
</footer>`;
}

/** LocalBusiness structured data (mirrors the original site's Electrician schema). */
function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': site.url,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    logo: site.url + site.logo.src,
    image: site.url + site.logo.src,
    description:
      "When you need electrical work in Bartlett, Memphis, and the surrounding areas, you're looking for an electrician that combines expertise with reliability. At Square One Electric, we bring over 30 years of industry experience to every electrical service. Whether you're in the heart of the city or in the surrounding areas, our electricians are ready to assist with both residential and commercial needs. We focus on integrity, safety, and providing top-notch service to ensure your electrical systems run smoothly.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.regionLong,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
  };
}

/**
 * Render a complete HTML document.
 * @param {object} opts
 * @param {string} opts.title        <title>
 * @param {string} opts.description  meta description
 * @param {string} opts.path         URL path of this page, e.g. "/contact-us"
 * @param {string} opts.content      rendered <main> content
 * @param {string} [opts.bodyClass]
 * @param {object[]} [opts.jsonLd]   extra JSON-LD objects
 * @param {string} [opts.extraHead]  extra tags for <head>
 * @param {string} [opts.ogType]
 */
function renderPage({ title, description, path: currentPath, content, bodyClass = '', jsonLd = [], extraHead = '', ogType = 'website' }) {
  const canonical = site.url + (currentPath === '/' ? '/' : currentPath);
  const ld = [businessJsonLd(), ...jsonLd]
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="google-site-verification" content="${site.googleSiteVerification}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${site.url}${site.logo.src}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="theme-color" content="#a60000">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Oswald:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
${extraHead}
${ld}
</head>
<body class="${esc(bodyClass)}">
${header(currentPath)}
<main id="main">
${content}
</main>
${footer()}
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}

module.exports = { renderPage, esc, paragraphs, linkPhones, icon, site };
