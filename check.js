#!/usr/bin/env node
/**
 * Sanity checks for the built site. Zero dependencies, like the build.
 *
 *   npm run check      (runs the build first, then checks dist/)
 *
 * Catches the mistakes that are easy to make when editing content: a link or
 * image that points nowhere, two pages sharing a title or meta description, a
 * page with no or several <h1>, a heading outline that skips a level, and a
 * canonical tag that does not match the page's own URL. Exits non-zero if any
 * check fails, so it can gate a deploy.
 */
const fs = require('fs');
const path = require('path');
const site = require('./src/data/site');
const { pagePath } = require('./src/templates/layout');

const DIST = path.join(__dirname, 'dist');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** Does this root-relative URL resolve to a file in dist/? */
function resolves(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  return [
    path.join(DIST, clean),
    path.join(DIST, clean, 'index.html'),
    path.join(DIST, clean + '.html'),
  ].some((p) => p.startsWith(DIST) && fs.existsSync(p) && fs.statSync(p).isFile());
}

/** URL path a built file is served at: dist/contact-us/index.html -> /contact-us */
function routeOf(file) {
  const rel = path.relative(DIST, file).replace(/index\.html$/, '').replace(/\/$/, '');
  return '/' + rel;
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(1);
  }

  const failures = [];
  const fail = (msg) => failures.push(msg);

  const pages = walk(DIST)
    .filter((f) => f.endsWith('.html') && path.basename(f) !== '404.html')
    .map((file) => {
      const html = fs.readFileSync(file, 'utf8');
      const pick = (re) => (html.match(re) || [])[1] || '';
      return {
        file,
        route: routeOf(file),
        html,
        title: pick(/<title>([\s\S]*?)<\/title>/).trim(),
        description: pick(/<meta name="description" content="([^"]*)"/),
        canonical: pick(/<link rel="canonical" href="([^"]*)"/),
        h1s: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]*>/g, '').trim()),
        levels: [...html.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1])),
      };
    });

  // 1. Every internal link and asset resolves.
  for (const p of pages) {
    const refs = [
      ...[...p.html.matchAll(/href="([^"]+)"/g)].map((m) => ['href', m[1]]),
      ...[...p.html.matchAll(/src="([^"]+)"/g)].map((m) => ['src', m[1]]),
    ];
    for (const [kind, url] of refs) {
      if (/^(https?:|mailto:|tel:|data:|#)/.test(url)) continue;
      if (!url.startsWith('/')) fail(`${p.route}: ${kind} is not root-relative: ${url}`);
      else if (!resolves(url)) fail(`${p.route}: broken ${kind} -> ${url}`);
    }
  }

  // 2. Titles and descriptions are present and unique.
  const seenTitle = new Map();
  const seenDesc = new Map();
  for (const p of pages) {
    if (!p.title) fail(`${p.route}: missing <title>`);
    if (!p.description) fail(`${p.route}: missing meta description`);
    for (const [value, seen, label] of [[p.title, seenTitle, 'title'], [p.description, seenDesc, 'description']]) {
      if (!value) continue;
      if (seen.has(value)) fail(`${p.route}: duplicate ${label}, same as ${seen.get(value)}`);
      else seen.set(value, p.route);
    }
  }

  // 3. Exactly one <h1>, and the outline never skips a level.
  for (const p of pages) {
    if (p.h1s.length !== 1) fail(`${p.route}: ${p.h1s.length} <h1> elements (want exactly 1)`);
    let prev = 0;
    for (const level of p.levels) {
      if (prev && level > prev + 1) fail(`${p.route}: heading jumps h${prev} to h${level}`);
      prev = level;
    }
  }

  // 4. Canonical matches the URL the page is served at.
  for (const p of pages) {
    const expected = site.url + (p.route === '/' ? '/' : pagePath(p.route));
    if (p.canonical !== expected) fail(`${p.route}: canonical is ${p.canonical || '(missing)'}, expected ${expected}`);
  }

  // 5. The generated extras exist.
  for (const f of ['sitemap.xml', 'robots.txt', '404.html', 'favicon.ico', 'favicon.svg']) {
    if (!fs.existsSync(path.join(DIST, f))) fail(`missing generated file: ${f}`);
  }

  // 6. Every page is listed in the sitemap, and vice versa.
  const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const p of pages) {
    const url = site.url + (p.route === '/' ? '/' : pagePath(p.route));
    if (!listed.has(url)) fail(`${p.route}: not listed in sitemap.xml`);
  }
  if (listed.size !== pages.length) {
    fail(`sitemap.xml lists ${listed.size} URLs but the build produced ${pages.length} pages`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} problem${failures.length === 1 ? '' : 's'} found:\n`);
    for (const f of failures) console.error('  ' + f);
    process.exit(1);
  }
  console.log(`Checked ${pages.length} pages: links, titles, descriptions, headings, canonicals and sitemap all OK.`);
}

main();
