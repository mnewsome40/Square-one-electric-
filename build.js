#!/usr/bin/env node
/**
 * Build script for the Square One Electric static site.
 * Zero dependencies: renders every page from src/data + src/templates into dist/,
 * copies static assets, and writes sitemap.xml / robots.txt / 404.html.
 *
 *   npm run build      → dist/
 *   npm run serve      → preview dist/ at http://localhost:8080
 */
const fs = require('fs');
const path = require('path');

const site = require('./src/data/site');
const services = require('./src/data/services');
const areas = require('./src/data/areas');
const faqs = require('./src/data/faqs');
const posts = require('./src/data/posts');
const policy = require('./src/data/policy');
const pages = require('./src/templates/pages');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

function write(urlPath, html) {
  const rel = urlPath === '/' ? 'index.html' : path.join(urlPath.replace(/^\//, ''), 'index.html');
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html.replace(/[ \t]+$/gm, ''));
  return rel;
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}

function build() {
  const started = Date.now();
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  /** @type {{path:string, html:string, lastmod:string, priority:string}[]} */
  const routes = [];
  const today = new Date().toISOString().slice(0, 10);
  const add = (urlPath, html, { lastmod = today, priority = '1.0' } = {}) =>
    routes.push({ path: urlPath, html, lastmod, priority });

  // Home
  add('/', pages.home({ services }));

  // Services
  for (const s of services) add(`/${s.slug}`, pages.service(s));

  // Areas
  add('/areas-we-serve', pages.areasIndex({ areas }));
  for (const a of areas) add(`/service-areas/${a.slug}`, pages.area(a));

  // FAQ, Contact, Policy
  add('/resources', pages.faq(faqs));
  add('/contact-us', pages.contact());
  add('/new-page', pages.policy(policy));

  // Blog posts (older/newer derived from array order: oldest → newest)
  posts.forEach((p, i) => {
    add(`/${p.slug}`, pages.post(p, { older: posts[i - 1], newer: posts[i + 1] }), {
      lastmod: p.dateModified.slice(0, 10),
      priority: '0.8',
    });
  });

  // Write pages
  for (const r of routes) write(r.path, r.html);

  // 404 (Netlify serves dist/404.html automatically)
  fs.writeFileSync(path.join(DIST, '404.html'), pages.notFound());

  // Static files
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
  copyDir(path.join(SRC, 'css'), path.join(DIST, 'css'));
  copyDir(path.join(SRC, 'js'), path.join(DIST, 'js'));
  const publicDir = path.join(SRC, 'public');
  if (fs.existsSync(publicDir)) copyDir(publicDir, DIST);

  // sitemap.xml
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${site.url}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');
  fs.writeFileSync(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );

  // robots.txt
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

  console.log(`Built ${routes.length} pages + 404 into dist/ in ${Date.now() - started} ms`);
  for (const r of routes) console.log('  ' + r.path);
}

build();
