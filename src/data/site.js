// Site-wide settings and shared content for Square One Electric.
// Every page template reads from this file, so business details only need to change here.

module.exports = {
  name: 'Square One Electric',
  legalName: 'SQUARE ONE ELECTRIC LLC',
  tagline: 'Wired For Life.',
  url: 'https://www.squareonememphis.com',
  phone: '(901) 467-7607',
  // Same number with non-breaking space/hyphen for use inside tel: link text.
  phoneHtml: '(901)&nbsp;467&#8209;7607',
  phoneHref: 'tel:+19014677607',
  email: 'squareonememphis@gmail.com',
  address: {
    locality: 'Bartlett',
    region: 'TN',
    regionLong: 'Tennessee',
    postalCode: '38135',
    country: 'US',
    display: 'Bartlett, TN 38135',
  },
  geo: { latitude: '35.241267', longitude: '-89.844878' },
  hours: [
    { days: 'Mon - Fri', hours: '8:00 am - 5:00 pm' },
    { days: 'Sat - Sun', hours: 'Closed' },
  ],
  logo: {
    src: '/assets/images/logo-square-one-electric.jpg',
    alt: 'Red lightning bolt with plug and outlet, "Square One Electric" logo, "Wired for Life." tagline.',
    width: 800,
    height: 530,
  },
  footerImage: {
    src: '/assets/images/team-collage.jpg',
    alt: 'Red-tinted four-panel collage of Square One Electric technicians working on panels, wiring, and outdoor equipment.',
    width: 960,
    height: 259,
  },
  // Google My Maps embed shown in the "Areas we serve" section of the home page.
  mapEmbed: 'https://www.google.com/maps/d/embed?mid=1awAi0w913Fzpzqw52EAq3aGZqYfSbf0&ehbc=2E312F&noprof=1',
  // Jobber "work request" form embedded on the Contact page (same embed the original site uses).
  jobber: {
    clienthubId: '8d5e6459-eecb-4f6c-a786-b9e0597accad-4971429',
    formUrl:
      'https://clienthub.getjobber.com/client_hubs/8d5e6459-eecb-4f6c-a786-b9e0597accad/public/work_request/embedded_work_request_form?form_id=4971429',
    css: 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css',
    script: 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js',
  },
  googleSiteVerification: '9tV2pljjuASW12fTJKDBR-mpGauZW_khAGsI07FptG8',
  // Main navigation (desktop menu and mobile drawer). "Services" opens a submenu.
  nav: [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: '#',
      children: [
        { label: 'Home Inspection Corrections', href: '/home-inspection-corrections' },
        { label: 'Aluminum Wire Mediation', href: '/aluminum-wire-mediation' },
        { label: 'Lighting Refreshers', href: '/lighting-refreshers' },
        { label: 'EV Chargers Installation', href: '/ev-chargers-installation' },
        { label: 'Industrial Equipment Connections', href: '/industrial-equipment-connections' },
        { label: 'General Repair and Diagnosis', href: '/general-repair-and-diagnosis' },
      ],
    },
    { label: 'Areas We Serve', href: '/areas-we-serve' },
    { label: 'FAQs', href: '/resources' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Policy and T&C', href: '/new-page' },
  ],
  // City list shown under the map on the home page (kept exactly as on the original site).
  homeAreaList: ['Bartlett, TN', 'Memphis, TN', 'Germantown, TN', 'Collierville, TN', 'West Memphis, TN', 'Arlington, TN'],
  copyright: 'Copyright © Square One Electric | All Rights Reserved',
};
