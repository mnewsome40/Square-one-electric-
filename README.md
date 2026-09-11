# Square One Electric — Website Rebuild

Static rebuild of [squareonememphis.com](https://www.squareonememphis.com/) for Square One Electric (Bartlett, TN), recreated from the live Duda site as clean, dependency-free HTML/CSS/JS and set up for Netlify.

## What's included

All 23 public pages of the original site, at the same URLs:

| Section | Pages |
| --- | --- |
| Home | `/` |
| Services | `/home-inspection-corrections`, `/aluminum-wire-mediation`, `/lighting-refreshers`, `/ev-chargers-installation`, `/industrial-equipment-connections`, `/general-repair-and-diagnosis` |
| Areas | `/areas-we-serve` plus `/service-areas/{memphis,germantown,collierville,millington,arlington,bartlett}-tn` |
| FAQs | `/resources` |
| Contact | `/contact-us` (Jobber work-request form embed) |
| Policy and T&C | `/new-page` |
| Blog posts | 6 articles at their original slugs, linked with Older/Newer navigation |

Also generated: `sitemap.xml`, `robots.txt`, `404.html`, favicons, and LocalBusiness / Service / FAQPage / BlogPosting structured data.

Intentionally **not** included (per the brief): pop-ups, chat widgets, cookie banners, and other third-party scripts. The only external embeds are the Google map on the home page and the Jobber request form on the Contact page, both of which the original site uses.

## How it's built

There are no npm dependencies. A small Node script renders the pages from content data and templates:

```
build.js                 Renders src/ → dist/ (pages, sitemap, robots, 404, static files)
serve.js                 Zero-dependency local preview server for dist/
netlify.toml             Netlify build command, publish directory, cache/security headers
src/
  data/site.js           Business details, hours, phone, navigation, embeds
  data/services.js       Six service pages + home-page service cards
  data/areas.js          Six service-area pages
  data/faqs.js           FAQ questions and answers
  data/posts.js          Blog posts (oldest → newest)
  data/policy.js         Policy and T&C page copy
  templates/layout.js    <head>, header/nav, mobile drawer, footer, HTML helpers
  templates/pages.js     One render function per page type
  css/styles.css         All styles (Oswald + Montserrat, #242424 / #a60000 palette)
  js/main.js             Mobile drawer, Services dropdown, FAQ accordion
  assets/images/         Optimised site images
  assets/icons/          Inline SVG icons from the original site
  public/                Favicons (copied to the site root)
```

To change business details (phone, hours, address), edit `src/data/site.js`. To edit page copy, edit the matching file in `src/data/`. Every page updates on the next build.

## Local development

```bash
npm run build     # renders the site into dist/
npm run serve     # serves dist/ at http://localhost:8080
npm start         # build + serve
```

Requires Node 18 or newer. Nothing to install.

## Deploying to Netlify

1. Create a new site in Netlify from this repository.
2. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20
3. Deploy. Every push to the connected branch rebuilds and publishes the site.

Manual alternative: run `npm run build` locally and drag the `dist/` folder into Netlify's deploy drop zone.

### About the page URLs

Each page is written as a directory index (`dist/contact-us/index.html`), and every
canonical tag, sitemap entry, and internal link uses the trailing-slash form
(`/contact-us/`). This matches how Netlify serves the site: its **Pretty URLs**
setting, on by default, normalises every request to the trailing-slash form, so
`/contact-us` returns a 301 to `/contact-us/`. Declaring the same form the server
returns keeps the canonical tags honest and avoids a redirect hop on internal
navigation. The old non-slash URLs still work and redirect, so existing inbound
links to the Duda site keep their value.

## Notes for the site owner

These items were carried over exactly as they appear on the live site and may deserve a look:

- **Policy and T&C page** (`/new-page`): the copy is Jobber's help-center guidance on *how to write* a privacy policy and terms of service, not a policy specific to Square One Electric. It should be replaced with the business's own policy.
- **Blog posts** use a different phone number (901-409-1794) and the name "SQUARE ONE ELECTRIC LLC", while the rest of the site uses (901) 467-7607. Worth confirming which number should appear.
- **Home page area list** includes "West Memphis, TN". West Memphis is in Arkansas.
- **Contact form** is a Jobber embed tied to the existing Jobber account. If that account changes, update the IDs in `src/data/site.js`.
