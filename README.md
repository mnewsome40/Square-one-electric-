# Square One Electric — Website Rebuild

Static rebuild of [squareonememphis.com](https://www.squareonememphis.com/) for Square One Electric (Bartlett, TN), recreated from the live Duda site as clean, dependency-free HTML/CSS/JS and set up for Netlify.

## What's included

All 23 public pages of the original site, at the same URLs, plus one new page:

| Section | Pages |
| --- | --- |
| Home | `/` |
| Services | `/home-inspection-corrections`, `/aluminum-wire-mediation`, `/lighting-refreshers`, `/ev-chargers-installation`, `/industrial-equipment-connections`, `/general-repair-and-diagnosis` |
| Tesla & EV charging | `/ev-tesla-charger-installation` (**new**, not on the original site) |
| Areas | `/areas-we-serve` plus `/service-areas/{memphis,germantown,collierville,millington,arlington,bartlett}-tn` |
| FAQs | `/resources` |
| Contact | `/contact-us` (Jobber work-request form embed) |
| Policy and T&C | `/new-page` |
| Blog posts | 6 articles at their original slugs, linked with Older/Newer navigation |

Also generated: `sitemap.xml`, `robots.txt`, `404.html`, favicons, and LocalBusiness / Service / FAQPage / BlogPosting structured data.

Intentionally **not** included (per the brief): pop-ups, chat widgets, cookie banners, and other third-party scripts. The only external embeds are the Google map on the home page and the Jobber request form on the Contact page, both of which the original site uses.

Fonts are self-hosted rather than loaded from Google Fonts, so the pages need no third-party request to render. Oswald and Montserrat ship as variable fonts, so one file per family covers both weights the design uses, and the latin-ext subset is only downloaded if a page actually contains a character from it.

## How it's built

There are no npm dependencies. A small Node script renders the pages from content data and templates:

```
build.js                 Renders src/ → dist/ (pages, sitemap, robots, 404, static files)
check.js                 Post-build checks: links, meta, headings, canonicals, sitemap
serve.js                 Zero-dependency local preview server for dist/
netlify.toml             Netlify build command, publish directory, cache/security headers
src/
  data/site.js           Business details, hours, phone, navigation, embeds
  data/services.js       Six service pages + home-page service cards
  data/areas.js          Six service-area pages
  data/faqs.js           FAQ questions and answers
  data/ev.js             Tesla / EV charging page + the EV block on the home page
  data/posts.js          Blog posts (oldest → newest)
  data/policy.js         Policy and T&C page copy
  templates/layout.js    <head>, header/nav, mobile drawer, footer, HTML helpers
  templates/pages.js     One render function per page type
  css/styles.css         All styles (Oswald + Montserrat, #242424 / #a60000 palette)
  js/main.js             Mobile drawer, Services dropdown, FAQ accordion
  assets/images/         Optimised site images
  assets/icons/          Inline SVG icons from the original site
  assets/fonts/          Self-hosted Oswald and Montserrat (woff2)
  public/                Favicons (copied to the site root)
```

To change business details (phone, hours, address), edit `src/data/site.js`. To edit page copy, edit the matching file in `src/data/`. Every page updates on the next build.

## Local development

```bash
npm run build     # renders the site into dist/
npm run check     # builds, then checks the output (see below)
npm run serve     # serves dist/ at http://localhost:8080
npm start         # build + serve
```

Requires Node 18 or newer. Nothing to install.

`npm run check` catches the mistakes that are easy to make when editing content:
a link or image pointing nowhere, two pages sharing a title or meta description,
a page with no or several `<h1>`, a heading outline that skips a level, a
canonical tag that does not match the page's own URL, and any page missing from
the sitemap. It exits non-zero on failure, so it can gate a deploy.

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

## The Tesla and EV charging page

`/ev-tesla-charger-installation` is new content, not a rebuild of an existing page. It adds a home-page section and a dedicated page covering Level 2 installs, the Tesla Wall Connector, panel capacity, commercial charging, and six EV-specific FAQs. All copy lives in `src/data/ev.js`.

Everything the page claims about Square One Electric is a claim the site already makes elsewhere: Level 1 and Level 2 installs, residential and commercial work, code-compliant wiring and panel upgrades, free estimates, licensed and insured. The technical explanations (NACS and J1772 connectors, load calculations, NEMA 14-50 receptacles, GFCI requirements, load-management devices) are general EV-charging facts rather than descriptions of a proprietary process.

**Before this goes to the client, three things are worth confirming:**

1. **The photos.** The five EV images in `src/assets/images/` (filenames beginning `ev-`) are retouched marketing photographs supplied for this page. The underlying installation is real, but surfaces, reflections, and small details were reconstructed during retouching. The captions describe what is in the frame and do not claim the work as Square One Electric's own. If the client wants them presented as their own completed jobs, that is their call to make.
2. **Permits.** The FAQ says permit requirements vary by city and county and invites the customer to ask. If Square One Electric pulls permits as part of the job, saying so directly would be stronger.
3. **Two pages now target EV charger installation.** The original `/ev-chargers-installation` service page and the older blog post `/professional-ev-charger-installation-services-in-bartlett-tn` both cover the same ground. The new page is written around Tesla and Level 2 specifics to keep them distinct, and the service page links to it, but consolidating the three into one page would be the cleaner long-term answer if the client wants to rank for these terms.

## Notes for the site owner

These items were carried over exactly as they appear on the live site and may deserve a look:

- **Policy and T&C page** (`/new-page`): the copy is Jobber's help-center guidance on *how to write* a privacy policy and terms of service, not a policy specific to Square One Electric. It should be replaced with the business's own policy.
- **Blog posts** use a different phone number (901-409-1794) and the name "SQUARE ONE ELECTRIC LLC", while the rest of the site uses (901) 467-7607. Worth confirming which number should appear.
- **Home page area list** includes "West Memphis, TN". West Memphis is in Arkansas.
- **Contact form** is a Jobber embed tied to the existing Jobber account. If that account changes, update the IDs in `src/data/site.js`.
- **One typo was corrected.** The Contact page heading reads "…in the memphis metro area today" on the live site. Because that heading is styled in capitals the mistake is invisible, but the underlying text now reads "Memphis Metro Area". Every other heading on the site already used title case. Nothing else in the copy was changed: a word-level comparison against the live pages confirms the rebuild carries all of the original body copy.
