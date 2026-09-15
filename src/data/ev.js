// Content for the dedicated Tesla / EV charging page (/ev-tesla-charger-installation)
// and the EV block on the home page.
//
// Scope note for the site owner: every capability claimed here is one the site
// already claims elsewhere (Level 1 and Level 2 installs, residential and
// commercial, code-compliant wiring and panel upgrades, free estimates,
// licensed and insured). The technical explanations are general EV-charging
// facts, not claims about Square One Electric's own process. See README.md for
// the short list of items worth confirming before this page goes to the client.

module.exports = {
  slug: 'ev-tesla-charger-installation',
  navLabel: 'Tesla & EV Charging',
  title: 'Tesla & EV Charger Installation | Square One Electric | Bartlett & Memphis, TN',
  description:
    'Tesla Wall Connector and Level 2 EV charger installation for homes and businesses in Bartlett, Memphis and the surrounding areas. Free estimates.',

  h1: 'Tesla and EV Charger Installation',
  h2: 'Level 2 Charging for Homes and Businesses in the Memphis Metro Area',
  intro: [
    'Most EV drivers do their charging at home overnight, and that takes a 240-volt circuit sized for the charger they plan to use. Square One Electric installs Tesla Wall Connectors, Level 2 chargers for J1772 vehicles, and the 240-volt outlets that mobile connectors plug into, throughout Bartlett, Memphis, Germantown, Collierville, Arlington, and the surrounding areas.',
    'Mounting the charger is the straightforward part. What decides whether the job is simple or involved is the panel: how much spare capacity it has, how far it sits from where you park, and whether the circuit runs through open framing, a finished wall, or outside to a detached garage.',
  ],
  heroImage: {
    src: '/assets/images/ev-home-garage-charging.jpg',
    alt: 'Blue Tesla parked in a home garage with a white Level 2 charger mounted on the wall and its cable connected to the car.',
    width: 1086,
    height: 1448,
  },

  stepsHeading: 'What a Level 2 Charger Installation Involves',
  stepsIntro:
    'Every install comes down to the same handful of questions. These are the ones that shape the work and the price.',
  steps: [
    {
      lead: 'Where the car parks, and where the charger goes.',
      text: 'The mounting spot sets the length of the circuit run and whether the equipment has to be rated for outdoor use.',
    },
    {
      lead: 'How much the charger will draw.',
      text: 'A Tesla Wall Connector and most other Level 2 units can be configured for different amperages, and that setting determines the breaker and the wire size.',
    },
    {
      lead: 'Whether the panel has room.',
      text: 'A load calculation shows whether the existing service can carry the new circuit alongside everything already connected to it.',
    },
    {
      lead: 'How the circuit gets there.',
      text: 'An open basement or attic run is quick. Fishing a finished wall, or trenching out to a detached garage, adds time and materials.',
    },
    {
      lead: 'Mounting, termination, and testing.',
      text: 'The unit is secured, connected, and tested before the job is closed out.',
    },
  ],

  equipmentHeading: 'Tesla Wall Connector, Mobile Connector, or a 240-Volt Outlet',
  equipmentIntro: [
    'Tesla vehicles in North America use the NACS connector. Most other EVs sold here charge on J1772, though several manufacturers have started shipping NACS ports of their own. The plug on the wall is what differs between them. The circuit behind it is the same kind of electrical work.',
  ],
  equipment: [
    {
      lead: 'Tesla Wall Connector.',
      text: 'Hardwired to a dedicated 240-volt circuit and adjustable to match the breaker your panel can support. It charges Teslas directly, and other EVs with the right adapter.',
    },
    {
      lead: 'Mobile connector on a 240-volt outlet.',
      text: 'If you would rather use the connector that came with the car, we can install a NEMA 14-50 receptacle instead. Receptacle-fed charging carries its own GFCI requirements under the electrical code.',
    },
    {
      lead: 'J1772 Level 2 charger.',
      text: 'The same installation work with a different plug. If you drive a non-Tesla EV, or expect to, this is usually the unit to ask about.',
    },
    {
      lead: 'Level 1, meaning a standard 120-volt outlet.',
      text: 'It adds only a few miles of range an hour. That is workable for a short commute or a plug-in hybrid, and it is the reason most drivers move up to Level 2.',
    },
  ],

  galleryHeading: 'A Level 2 Install in a Home Garage',
  gallery: [
    {
      src: '/assets/images/ev-tesla-wall-charger.jpg',
      alt: 'Blue Tesla parked in a garage beside a white wall-mounted EV charger, with the charging cable running to the car.',
      width: 1448,
      height: 1086,
      caption:
        'The charger goes on the wall beside the parking spot, close enough that the cable reaches the port without crossing a walkway.',
    },
    {
      src: '/assets/images/ev-charger-install-detail.jpg',
      alt: 'White EV charger mounted on a garage wall with a green status light, a gray enclosure above it, and the cable running to a car.',
      width: 1086,
      height: 1448,
      caption:
        'The unit and the enclosure feeding it, mounted together so the connection stays accessible.',
    },
    {
      src: '/assets/images/ev-charging-port-connected.jpg',
      alt: 'Charging connector seated in the rear charge port of a blue Tesla parked in a garage.',
      width: 1086,
      height: 1448,
      caption: 'The connector seated in the charge port, with the cable clear of the floor.',
    },
  ],

  panelHeading: 'If Your Panel Is Already Full',
  panelIntro:
    'A panel with no spare capacity is the most common reason an EV charger install turns into a bigger job than expected. There are usually several ways forward, and the load calculation decides which one fits:',
  panelOptions: [
    'Free up space in the existing panel where the circuits allow it.',
    'Add a subpanel fed from the main, when the service has headroom but the panel does not.',
    'Upgrade the panel or the service when the calculation shows the existing one cannot carry the load.',
    'Use a load-management device so the charger shares capacity with the rest of the house and backs off when demand is high.',
  ],
  panelClosing:
    'Estimates are free, so the useful answer comes from looking at your panel rather than guessing at it over the phone.',

  commercialHeading: 'Charging for Businesses and Commercial Property',
  commercial: [
    'Workplace and customer charging is a different problem from a single garage: more units, longer runs, and a service that has to carry all of them at once. We install commercial EV charging alongside the rest of our commercial and industrial electrical work, including the panel upgrades and dedicated circuits the units need.',
  ],

  faqHeading: 'EV Charging Questions We Get Asked',
  faqs: [
    {
      q: 'Can you install a Tesla Wall Connector I already bought?',
      a: 'Yes. Tell us the model when you call so the circuit is sized for what the unit will actually draw.',
    },
    {
      q: 'How long does an EV charger installation take?',
      a: 'A charger going on a wall near the panel, with capacity to spare, is usually a single visit. Long runs, finished walls, trenching to a detached garage, or a panel upgrade extend it. We can tell you what your job involves once we have seen the panel and the location.',
    },
    {
      q: 'Will a Level 2 charger work with a non-Tesla EV?',
      a: 'Yes. Most non-Tesla EVs sold in North America charge on J1772, and there are Level 2 units with that connector. A Tesla Wall Connector can also charge other EVs with the correct adapter.',
    },
    {
      q: 'Can you install a charger outdoors or at a detached garage?',
      a: 'Yes, using equipment rated for outdoor use and a circuit run to that location. A detached garage means either trenching a new feeder or confirming that an existing one has the capacity, which is the part worth checking first.',
    },
    {
      q: 'Do I need a permit for an EV charger?',
      a: 'Requirements for a new 240-volt circuit vary by city and county across the Memphis area. Ask about your address when you call and we will tell you what applies.',
    },
    {
      q: 'What does an EV charger installation cost?',
      a: 'It depends on the charger, the length of the run, and whether the panel has capacity. A unit going on the wall directly behind the panel is a much smaller job than one at the far end of a detached garage. Call (901) 467-7607 for a free estimate.',
    },
  ],

  ctaHeading: 'Get an Estimate for Your EV Charger',
  ctaText:
    'Call (901) 467-7607, or send us a request and tell us what you drive and where you park. Square One Electric is licensed and insured, and estimates are free.',

  // ---------- Home-page block ----------
  home: {
    heading: 'Tesla and EV Charger Installation',
    subheading: 'Level 2 charging for your garage, driveway, or business',
    paragraphs: [
      'A Tesla Wall Connector, or any other Level 2 charger, needs its own 240-volt circuit, and the panel it connects to has to have room for the load. That is the side of the job we handle: checking the existing capacity, running the circuit from the panel to where you park, and mounting and connecting the unit.',
      'We install charging for Teslas and for EVs that charge on J1772, at homes and at businesses across Bartlett, Memphis, and the surrounding areas.',
    ],
    linkLabel: 'Learn About EV and Tesla Charging',
    image: {
      src: '/assets/images/ev-tesla-charging-garage.jpg',
      alt: 'Blue Tesla charging in an open garage, with the connector plugged into the rear charge port.',
      width: 1448,
      height: 1086,
    },
  },
};
