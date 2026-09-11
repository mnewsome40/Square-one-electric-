// Page templates. Each function returns the <main> content for one page type;
// build.js wraps it with layout.renderPage().

const { renderPage, esc, paragraphs, linkPhones, icon, site } = require('./layout');

/* ---------- shared fragments ---------- */

const WAVE_PATHS =
  '<path d="M0 90.72l140-28.28 315.52 24.14L796.48 65.8 1140 104.89l140-14.17V0H0v90.72z" fill-opacity=".5"/><path d="M0 0v47.44L170 0l626.48 94.89L1110 87.11l170-39.67V0H0z"/>';

/** Angled divider. `flip` puts the dark fill on the bottom edge (use before a dark section). */
function wave(flip) {
  return `<div class="wave${flip ? ' wave--flip' : ''}" aria-hidden="true"><svg viewBox="0 0 1280 140" preserveAspectRatio="none">${WAVE_PATHS}</svg></div>`;
}

const BOLT =
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13.5 2 5 13.5h5.2L9 22l9.9-12.5h-5.4L13.5 2z"/></svg>';

function button(label, href, extraClass = '') {
  return `<a class="btn${extraClass ? ' ' + extraClass : ''}" href="${esc(href)}">${esc(label)}</a>`;
}

/* ---------- Home ---------- */

function home({ services }) {
  const cards = services
    .filter((s) => s.card)
    .map(
      (s) => `
      <article class="card">
        <div class="card__icon">${icon(s.card.icon)}</div>
        <h3 class="card__title type-h4">${esc(s.card.title)}</h3>
        <p>${esc(s.card.text)}</p>
        <a class="card__link" href="/${s.slug}">Learn More ➔</a>
      </article>`
    )
    .join('');

  const serviceLinks = services
    .map((s) => `<li><a href="/${s.slug}">${esc(s.linkLabel)}</a></li>`)
    .join('');

  const cities = site.homeAreaList.map((c) => `<li>${esc(c)}</li>`).join('');

  const content = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container">
    <div class="hero__inner">
      <h1 id="hero-title">Illuminate Your Space with Expert Solutions</h1>
      <h2>Explore Our Electrical Services in the Memphis Metro Area</h2>
      ${button('Request Service', '/contact-us')}
    </div>
  </div>
</section>

<section class="card-row" aria-labelledby="featured-title">
  <h2 id="featured-title" class="visually-hidden">Our Services</h2>
  ${cards}
</section>

<section class="intro-band">
  <div class="container">
    <h2 class="type-h5">Excellence in Every Connection</h2>
    <p class="type-h6">Trustworthy service you can count on</p>
  </div>
</section>

${wave(true)}

<section class="section--dark story" aria-labelledby="story-title">
  <div class="container">
    <p class="display-title">Wired For Life.</p>
    <div class="story__text">
      <h2 id="story-title" class="type-h3">Power Your Home with Precision</h2>
      <h3 class="type-h4">Call Our Electrician Serving the Memphis Metro Area</h3>
      <p>When you need electrical work in Bartlett, Memphis, and the surrounding areas, you're looking for an electrician that combines expertise with reliability. At Square One Electric, we bring over 30 years of industry experience to every electrical service. Whether you're in the heart of the city or in the surrounding areas, our electricians are ready to assist with both residential and commercial needs. We focus on integrity, safety, and providing top-notch service to ensure your electrical systems run smoothly.</p>
      <p>Our services range from wiring and panel upgrades to <a href="/ev-chargers-installation">EV charger installations</a> and troubleshooting. We understand the importance of timely and clean work, which is why we offer free estimates, emergency services, and warranties on our projects. Licensed and insured, our team is known for its professional approach and has earned a 5.0-star rating from satisfied clients.</p>
      <p><a href="/contact-us">Contact us</a> today to schedule your service and ensure your electrical systems are in expert hands.</p>
    </div>
    <div class="image-pair">
      <img src="/assets/images/electrical-panel.jpg" alt="Gray electrical panel on a brick wall with wires and a meter to the right." width="1200" height="1663" loading="lazy">
      <img src="/assets/images/burnt-outlet.jpg" alt="Burnt electrical outlet with exposed wires in a wall. Blackened switch and surrounding damage." width="1200" height="1370" loading="lazy">
    </div>
  </div>
</section>

${wave(false)}

<section class="popular" aria-labelledby="popular-title">
  <div class="container">
    <div class="split-block">
      <div>
        <h2 id="popular-title" class="type-h3">Our Most Popular Services</h2>
        <h3 class="type-h4">Our commitment to excellence is reflected in the wide range of services we offer.</h3>
      </div>
      <div>
        <p>From home inspection corrections to industrial equipment connections, we cover all your electrical needs. Our skilled team ensures that every project is completed with precision and care. Here’s what we provide:</p>
        <ul>${serviceLinks}</ul>
        <p>Schedule your service today to experience the difference our expertise can make.</p>
      </div>
    </div>
  </div>
</section>

<section class="why" aria-labelledby="why-title">
  <div class="container">
    <h2 id="why-title">Why <span class="caps">Square One Electric</span></h2>
    <p>Square One Electric is proud to serve the greater Memphis area and its vibrant community. The local culture and landmarks inspire us to deliver exceptional service. Our approach is centered on integrity and customer satisfaction, ensuring every interaction is positive and productive. We take pride in our ability to adapt to the unique needs of each client, providing solutions that are both effective and efficient.</p>
    <p>Our team is dedicated to maintaining the highest standards of safety and quality. With a focus on timely and professional work, we strive to exceed your expectations in every project.</p>
    <p>Reach out to us and discover how our values align with your needs for reliable electrical solutions.</p>
  </div>
</section>

${wave(true)}

<section class="section--dark areas" aria-labelledby="areas-title">
  <div class="container">
    <h2 id="areas-title" class="type-h3">The Areas we serve</h2>
    <div class="map-embed">
      <iframe src="${esc(site.mapEmbed)}" title="Map of the Square One Electric service area around Memphis, Tennessee" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <div class="areas-card">
      <div class="areas-card__icon" aria-hidden="true">${icon('icon-leaves')}</div>
      <ul class="areas-list">${cities}</ul>
    </div>
  </div>
</section>`;

  return renderPage({
    title: 'Professional Electrical Services | Square One Electric | Bartlett & Memphis, TN',
    description: 'Get expert electrical services in the Memphis Metro Area. Contact Square One Electric for reliable solutions today!',
    path: '/',
    bodyClass: 'page-home',
    content,
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url + '/' }],
  });
}

/* ---------- Service page ---------- */

function service(s) {
  const benefits = s.benefits
    .map(
      (b) => `
      <div class="benefit">
        <div class="benefit__icon">${BOLT}</div>
        <p>${esc(b)}</p>
      </div>`
    )
    .join('');

  const content = `
<section class="page-hero page-hero--split">
  <div class="container">
    <div class="page-hero__text">
      <h1>${esc(s.h1)}</h1>
      <h2>${esc(s.h2)}</h2>
      ${paragraphs(s.paragraphs)}
      ${button('Request Service', '/contact-us')}
    </div>
    <div class="page-hero__image">
      <img src="${s.image.src}" alt="${esc(s.image.alt)}" width="${s.image.width}" height="${s.image.height}">
    </div>
  </div>
</section>

${wave(true)}

<section class="section--dark benefits" aria-labelledby="benefits-title">
  <div class="container">
    <h3 id="benefits-title">${esc(s.benefitsHeading)}</h3>
    <p class="benefits__intro">${esc(s.benefitsIntro)}</p>
    <div class="benefit-grid">${benefits}</div>
    <p class="benefits__closing">${esc(s.closing)}</p>
  </div>
</section>`;

  return renderPage({
    title: s.title,
    description: s.description,
    path: `/${s.slug}`,
    bodyClass: 'page-service',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.navLabel,
        serviceType: s.navLabel,
        description: s.description,
        url: `${site.url}/${s.slug}`,
        areaServed: 'Memphis Metro Area, TN',
        provider: { '@id': site.url },
      },
    ],
  });
}

/* ---------- Areas We Serve (index) ---------- */

function areasIndex({ areas }) {
  const cards = areas
    .map(
      (a) => `
      <article class="area-card">
        <div class="area-card__image"><img src="/assets/images/areas-card-bg.jpg" alt="" width="1600" height="1000" loading="lazy"></div>
        <h2>${esc(a.city)}</h2>
        <a class="btn btn--sm" href="/service-areas/${a.slug}" aria-label="Learn more about electrical services in ${esc(a.city)}">Learn More</a>
      </article>`
    )
    .join('');

  const content = `
<section class="page-hero page-hero--center">
  <div class="container">
    <h1>Areas We Serve</h1>
    ${button('Talk With Us', '/contact-us')}
  </div>
</section>

<section class="section--red areas-section" aria-label="Service areas">
  <div class="container">
    <div class="area-grid">${cards}</div>
  </div>
</section>`;

  return renderPage({
    title: 'Electrical Services | Square One Electric | Bartlett & Memphis, TN',
    description: 'Get reliable electrical services in Bartlett & Memphis. Contact us for expert assistance with your residential or commercial needs!',
    path: '/areas-we-serve',
    bodyClass: 'page-areas',
    content,
  });
}

/* ---------- Service-area page ---------- */

function area(a) {
  const bullets = a.bullets.map((b) => `<li>${esc(b)}</li>`).join('');
  const content = `
<section class="page-hero page-hero--narrow">
  <div class="container prose">
    <h1>${esc(a.h1)}</h1>
    <h2>${esc(a.h2)}</h2>
    ${a.intro.map((p) => `<p>${linkPhones(p)}</p>`).join('\n')}
  </div>
</section>

<section class="area-content">
  <div class="container prose">
    <h3>${esc(a.whyHeading)}</h3>
    <p>${linkPhones(a.whyIntro)}</p>
    <ul>${bullets}</ul>
    <p>${linkPhones(a.whyClosing)}</p>

    <h3>${esc(a.secondHeading)}</h3>
    ${a.second.map((p) => `<p>${linkPhones(p)}</p>`).join('\n')}
    ${button('Get Your Free Estimate', '/contact-us')}
  </div>
</section>`;

  return renderPage({
    title: a.title,
    description: a.description,
    path: `/service-areas/${a.slug}`,
    bodyClass: 'page-area',
    content,
  });
}

/* ---------- FAQ (/resources) ---------- */

function faq(data) {
  const items = data.items
    .map(
      (f) => `
      <details class="faq-item">
        <summary><h2>${esc(f.q)}</h2></summary>
        <div class="faq-answer"><p>${linkPhones(f.a)}</p></div>
      </details>`
    )
    .join('');

  const content = `
<section class="page-hero page-hero--red">
  <div class="container">
    <h1>${esc(data.h1)}</h1>
    ${button(data.cta, '/contact-us', 'btn--light')}
  </div>
</section>

<section class="faq-section" aria-label="Frequently asked questions">
  <div class="faq-list">${items}</div>
</section>`;

  return renderPage({
    title: data.title,
    description: data.description,
    path: '/resources',
    bodyClass: 'page-faq',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });
}

/* ---------- Contact ---------- */

function contact() {
  const j = site.jobber;
  const hours = site.hours.map((h) => `<dt>${esc(h.days)}</dt><dd>${esc(h.hours)}</dd>`).join('');

  const content = `
<section class="page-hero page-hero--split">
  <div class="container">
    <div class="page-hero__text">
      <h1>Call us for Electrical Services in the Memphis Metro Area today</h1>
      <h2>Contact Square One Electric Today</h2>
      <p>Thank you for visiting the website of Square One Electric.</p>
      <p>Please use the form on this page to email us. You can also call <a href="${site.phoneHref}">${site.phoneHtml}</a> to speak with us immediately.</p>
    </div>
    <div class="page-hero__image">
      <img src="/assets/images/contact-outlet-wires.jpg" alt="Electrical wires spilling out of a green outlet box on a white and green wall." width="1200" height="1798">
    </div>
  </div>
</section>

${wave(true)}

<section class="section--dark contact-section" aria-labelledby="contact-title">
  <div class="container">
    <h3 id="contact-title">Reach Out Today!</h3>

    <div class="form-embed">
      <!-- Jobber work-request form (the same embed the original site uses). -->
      <div id="${esc(j.clienthubId)}"></div>
      <script src="${esc(j.script)}" clienthub_id="${esc(j.clienthubId)}" form_url="${esc(j.formUrl)}"></script>
      <noscript><p class="form-fallback">The request form needs JavaScript. Please call <a href="${site.phoneHref}">${site.phoneHtml}</a> or email <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p></noscript>
    </div>

    <div class="info-card">
      <h3>${esc(site.name)}</h3>
      <h4>Our Location</h4>
      <p>${esc(site.address.display)}</p>
      <h4>Call Us</h4>
      <p><a href="${site.phoneHref}">${site.phoneHtml}</a></p>
      <h4>Hours</h4>
      <dl class="hours">${hours}</dl>
    </div>
  </div>
</section>`;

  return renderPage({
    title: 'Contact Us | Square One Electric | Bartlett & Memphis, TN',
    description: 'Contact Square One Electric for electrical services in the Memphis metro area. Request service online or call (901) 467-7607.',
    path: '/contact-us',
    bodyClass: 'page-contact',
    content,
    extraHead: `  <link rel="stylesheet" href="${esc(j.css)}" media="screen">`,
  });
}

/* ---------- Policy and T&C (/new-page) ---------- */

function policy(data) {
  const cols = data.columns
    .map(
      (c) => `
      <div class="policy-col">
        <h2>${esc(c.heading)}</h2>
        ${c.html}
      </div>`
    )
    .join('');

  const content = `
<section class="policy">
  <div class="container">
    <h1 class="visually-hidden">Policy and Terms &amp; Conditions</h1>
    <div class="policy-grid">${cols}</div>
  </div>
</section>`;

  return renderPage({
    title: data.title,
    description: data.description,
    path: '/new-page',
    bodyClass: 'page-policy',
    content,
  });
}

/* ---------- Blog post ---------- */

function post(p, { older, newer }) {
  const sections = p.sections
    .map((sec) => `<h2>${esc(sec.h2)}</h2>\n${sec.paras.map((t) => `<p>${t}</p>`).join('\n')}`)
    .join('\n');
  const closing = p.closing.map((t) => `<p>${esc(t)}</p>`).join('\n');

  const nav = `
    <nav class="post-nav" aria-label="Blog post navigation">
      ${older ? `<a href="/${older.slug}" rel="prev">&lt; Older Post</a>` : '<span></span>'}
      ${newer ? `<a href="/${newer.slug}" rel="next">Newer Post &gt;</a>` : '<span></span>'}
    </nav>`;

  const content = `
<article>
  <section class="page-hero page-hero--narrow post-hero">
    <div class="container">
      <h1>${esc(p.title)}</h1>
      <p class="lead">${esc(p.intro)}</p>
    </div>
  </section>
  <section class="post">
    <div class="container prose">
      ${sections}
      ${closing}
      ${nav}
    </div>
  </section>
</article>`;

  return renderPage({
    title: p.title,
    description: p.description,
    path: `/${p.slug}`,
    bodyClass: 'page-post',
    content,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        author: { '@type': 'Organization', name: site.legalName },
        publisher: { '@id': site.url },
        mainEntityOfPage: `${site.url}/${p.slug}`,
      },
    ],
  });
}

/* ---------- 404 ---------- */

function notFound() {
  const content = `
<section class="not-found">
  <div class="container">
    <h1>Page Not Found</h1>
    <p>Sorry, we couldn’t find that page. Head back to the <a href="/">home page</a> or <a href="/contact-us">contact us</a> for electrical service in the Memphis metro area.</p>
    ${button('Back to Home', '/')}
  </div>
</section>`;

  return renderPage({
    title: 'Page Not Found | Square One Electric',
    description: 'The page you requested could not be found.',
    path: '/404',
    bodyClass: 'page-404',
    content,
  });
}

module.exports = { home, service, areasIndex, area, faq, contact, policy, post, notFound };
