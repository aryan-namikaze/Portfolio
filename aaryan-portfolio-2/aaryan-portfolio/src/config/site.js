// ─────────────────────────────────────────────────────────────
//  EDIT YOUR CONTENT HERE. Text, projects, links and contact
//  details all live in this one file.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Aaryan Raghuwanshi',
  role: 'Senior Product Designer',
  status: 'Open to interesting problems',

  nav: [
    { id: 'work', label: 'Work' },
    { id: 'playground', label: 'Playground' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    // Two sentences, two lines each. The second sentence is drawn as an outline.
    first: ['Designing', 'things.'],
    second: ['Questioning', 'others.'],
    copy:
      'Senior product designer. I make software obvious, then make it memorable. The people using it remain unpredictable.',
    ma: { kanji: '間', reading: 'ma', meaning: 'the space between things' },
    seal: ['設', '計'], // sekkei: design
  },

  manifesto: [
    { lines: ['Pixel-perfect.', 'Mostly people-proof.'], jp: '完璧', note: 'kanpeki: flawless' },
    { lines: ['A beautiful interface', 'nobody understands', 'is an expensive riddle.'], jp: '伝わる', note: 'tsutawaru: to get across' },
    { lines: ['Solve the problem', 'before you decorate it.'], jp: '課題', note: 'kadai: the problem to solve' },
    { lines: ['Know which details', 'to leave out.'], jp: '余白', note: 'yohaku: blank space, left on purpose' },
  ],

  projectsIntro: {
    title: 'Projects.',
    text: "A selection of digital experiences I've designed, from concept to final interaction.",
  },

  // Add, remove or reorder projects freely.
  // image: file inside /public/images (leave '' to show the abstract artwork)
  // href: link to a case study (leave '' and nothing is shown)
  projects: [
    {
      id: 'burger-house',
      title: 'Burger House',
      category: 'UI/UX design · Food & beverage',
      subtitle: 'Food Ordering Experience',
      description:
        'Ordering a burger should take less time than deciding on toppings. An app built around the one decision that matters: yes, extra cheese.',
      tags: ['Mobile app', 'Ordering flow', 'Visual identity'],
      image: '/images/Burger_App.png',
      art: 'sun',
      layout: 'a',
      href: '',
    },
    {
      id: 'pegwale',
      title: 'PegWale',
      category: 'UI/UX design · E-commerce',
      subtitle: 'Liquor Ordering Experience',
      description:
        'Friday-night ordering with the lights low and the interface sober. Fast, clear and calm, so nobody else has to be.',
      tags: ['Mobile app', 'E-commerce', 'Interaction design'],
      image: '/images/Beer_App.png',
      art: 'ripple',
      layout: 'b',
      href: '',
    },
    {
      id: 'tata-avinya',
      title: 'Tata Avinya App',
      category: 'UI/UX design · Automotive',
      subtitle: 'Automotive Digital Experience',
      description:
        'A concept companion app for an electric future. Less dashboard fatigue, more "oh, that is where that went."',
      tags: ['Mobile app', 'Concept', 'Interaction design'],
      image: '/images/Car_App.png',
      art: 'wind',
      layout: 'c',
      href: '',
    },
  ],

  playground: {
    title: ['Serious about design.', 'Not about everything.'],
    ink: { label: 'Ink pad', hint: 'Draw something. It fades, like most feedback.' },
    type: { word: 'WHITESPACE', label: 'Weight test', hint: 'Move closer. Whitespace remains undefeated.' },
  },

  about: {
    image: '', // e.g. '/images/aaryan.jpg' — leave empty to show the artwork placeholder
    imageAlt: 'Portrait of Aaryan Raghuwanshi',
    title: ['Hello.', 'I design things', 'people have to use.'],
    paragraphs: [
      "I'm Aaryan, a senior product designer with three-plus years in digital products: enterprise platforms, sales experiences and consumer apps. Some of them involved cars. That is a coincidence, not a personality.",
      'I like the moment a messy problem becomes obvious. I like it even more when it also looks good, because I am not made of stone.',
      "I work across product thinking, interaction and visual design, and I fuss over design systems so other people don't have to.",
      "Outside of work I build things like this site, mostly to find out what I'd make if nobody were giving feedback.",
    ],
    vertical: { text: '手仕事', note: 'teshigoto: handiwork' },
  },

  capabilitiesTitle: ['What I do when', 'the brief is vague.'],
  capabilities: [
    { title: 'Product thinking', text: 'Working out what to build, for whom, and what to quietly not build.' },
    { title: 'UX & interaction design', text: 'Flows, states and the unglamorous edge cases where users actually live.' },
    { title: 'Visual design', text: 'Hierarchy, type and colour with a point of view.' },
    { title: 'Design systems', text: 'Components that scale without everyone reinventing the button.' },
    { title: 'Prototyping', text: 'Making ideas clickable before opinions become expensive.' },
    { title: 'Motion & micro-interactions', text: 'Movement that explains what changed, not movement for applause.' },
    { title: 'Creative experiments', text: 'Sites like this one, built to see what happens.' },
  ],
  tools: [], // e.g. ['Figma', 'Illustrator'] — only shown when you add some

  contact: {
    title: ['Have a good problem?', "Let's make it interesting."],
    line: 'Bring the brief. Bring the mess. I will bring opinions.',
    email: '', // ← add your email here, e.g. 'you@example.com'. Until then the button copies a ready-made message.
    subject: 'A problem worth making interesting',
    message: 'Hi Aaryan, I have a problem worth making interesting. Here is the short version: ',
    // Only links with both a label and a url are shown, e.g. { label: 'LinkedIn', url: 'https://...' }
    socials: [],
  },
}
