/**
 * Single source of truth for EduREVIVE OUTREACH site content.
 * The information architecture mirrors itserviceafrica.com section for section;
 * all copy is drawn from the "We are EduREVIVE OUTREACH" brief.
 */

export const site = {
  name: "EduREVIVE OUTREACH",
  shortName: "EduREVIVE",
  strapline:
    "Heralding transformation in the education sector and the society at large",
  description:
    "EduREVIVE OUTREACH is a student and youth ministry raising students for academic excellence through biblical principles — motivation, deliverance and mentoring across schools and campuses in Nigeria and beyond.",
  email: "hello@edurevive.org",
  phone: "+234 000 000 0000",
  whatsapp: "+234 000 000 0000",
  addresses: [
    "National Coordinating Office, Ikeja, Lagos State, Nigeria",
    "Campus Ministry Desk, Garki, Abuja, Federal Capital Territory",
  ],
  socials: [
    {
      label: "Facebook",
      handle: "Edurevive Outreach",
      // The flyer prints the page name, not a URL — confirm this slug.
      href: "https://facebook.com/edureviveoutreach",
      icon: "facebook",
    },
    {
      label: "Instagram",
      handle: "@edureviveoutreach",
      href: "https://instagram.com/edureviveoutreach",
      icon: "instagram",
    },
    {
      label: "X",
      // Printed without the "out" the other handles carry — verify before launch.
      handle: "@edurevivereach",
      href: "https://x.com/edurevivereach",
      icon: "x",
    },
    {
      label: "TikTok",
      handle: "@edurevive_outreach",
      href: "https://tiktok.com/@edurevive_outreach",
      icon: "tiktok",
    },
    {
      label: "YouTube",
      handle: "@edureviveoutreach",
      href: "https://youtube.com/@edureviveoutreach",
      icon: "youtube",
    },
  ],
} as const;

/* ------------------------------------------------------------------ nav -- */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; blurb?: string }[];
};

export const outreaches = [
  {
    slug: "student-convocation",
    title: "Student Convocation: TRANSFORMATION",
    short: "Student Convocation",
    blurb:
      "Our annual, bi-annual and quarterly gathering to orient and re-orient students, academics and other stakeholders in the sector.",
    body: [
      "TRANSFORMATION is the flagship convocation of EduREVIVE OUTREACH — a gathering held annually, bi-annually and quarterly that brings students, teachers, administrators and sector stakeholders into one room.",
      "Each edition is built around orientation and re-orientation: unlearning the habits that feed decadence in the sector, and establishing the convictions that produce excellence, godliness and good leadership.",
      "Sessions combine motivation with power, teaching from biblical principles, testimonies from students, and practical commitments that delegates carry back into their schools.",
    ],
    outcomes: [
      "Students leave with a renewed conviction that academic excellence is a necessity, not an option",
      "Teachers and administrators are equipped to model and reward integrity",
      "Schools return with a clear plan for the term ahead",
    ],
  },
  {
    slug: "campus-crusades",
    title: "Campus Crusades",
    short: "Campus Crusades",
    blurb:
      "Kingdom invasion and occupation of campuses — enthroning Jesus Christ as Lord over our learning institutions.",
    body: [
      "Campuses shape the leaders a nation inherits. Our crusades take the gospel directly onto those grounds with clarity, reverence and power.",
      "We work hand in hand with campus fellowships, chaplaincies and student leaders so that what happens during a crusade continues long after the sound system is packed away.",
      "The goal is not an event. It is occupation: a campus where Christ is honoured, where vices lose their grip, and where students pursue excellence as worship.",
    ],
    outcomes: [
      "Christ enthroned as Lord over the campus community",
      "Students delivered from habits and bondages that limit them",
      "Local fellowships strengthened with follow-up structures",
    ],
  },
  {
    slug: "mass-media-motivation",
    title: "Motivation With Power via Mass Media",
    short: "Mass Media Motivation",
    blurb:
      "Social media, TV, radio and internet broadcasts that carry motivation with power to students everywhere.",
    body: [
      "Not every student will sit in our auditorium, so we take the message to where students already are.",
      "We produce and distribute teaching across social media, television, radio and internet broadcast — short, practical and rooted in scripture.",
      "This is the widest-reaching of our avenues and the entry point through which most students first meet EduREVIVE OUTREACH.",
    ],
    outcomes: [
      "Consistent weekly motivation reaching students beyond our physical events",
      "Partners, schools and students kept aligned through regular broadcasts",
      "An accessible first point of contact for new schools",
    ],
  },
  {
    slug: "school-of-motivation",
    title: "School of Motivation",
    short: "School of Motivation",
    blurb:
      "Motivation with power (1 Cor 2:4-5; 4:19). We partner with schools to reach students with motivation, assistance, study, mentoring, counselling and prayers.",
    body: [
      "The School of Motivation is our partnership programme with individual schools. We come in by invitation and we stay.",
      "Within it students receive motivation, academic assistance, structured study support, mentoring, counselling and prayer — the full range of what a young person needs to flourish.",
      "Our conviction is scriptural: speech and preaching that rest not on persuasive words of human wisdom, but in demonstration of the Spirit and of power (1 Corinthians 2:4-5).",
    ],
    outcomes: [
      "A standing relationship between the school and the ministry",
      "Students supported academically, spiritually and emotionally",
      "Teachers equipped as first-line mentors",
    ],
  },
  {
    slug: "weekend-coaching",
    title: "Weekend Coaching & Tutorial Centres",
    short: "Weekend Coaching",
    blurb:
      "Practical coaching that builds understanding and confidence, so students sit examinations without 'assistance' and pass with flying colours.",
    body: [
      "Examination malpractice persists where students are unprepared and afraid. Our answer is preparation.",
      "Weekend coaching and tutorial centres promote genuine commitment to learning, help students get a better understanding of difficult subjects, and build the confidence to sit an examination unaided.",
      "Centres are run by vetted teachers and volunteer coordinators, and every centre carries the ministry's standard of godliness and diligence.",
    ],
    outcomes: [
      "Measurably better understanding of core subjects",
      "Confidence to sit examinations without malpractice",
      "A visible, local presence in the communities we serve",
    ],
  },
  {
    slug: "academic-clubs",
    title: "Academic Clubs",
    short: "Academic Clubs",
    blurb:
      "Clubs in partner schools that gather students who share our vision, mission, values and goals — our ambassadors on the ground.",
    body: [
      "In every school that partners with us we create an academic club. The club brings together students who share our vision, mission, values and goals, and they become our ambassadors in that school.",
      "Clubs meet weekly. Volunteer students and teachers serve as coordinators, supported with materials, training and oversight from the ministry.",
      "This is how transformation becomes continuous rather than occasional — a standing community inside the school itself.",
    ],
    outcomes: [
      "Weekly meetings sustaining momentum between our visits",
      "Student ambassadors carrying the G-LEAD values",
      "Volunteer teachers trained as coordinators",
    ],
  },
  {
    slug: "academic-competitions",
    title: "Yearly Academic Competitions",
    short: "Academic Competitions",
    blurb:
      "Individual and inter-school competitions held each year to motivate students and schools towards learning and excellence.",
    body: [
      "Healthy competition is a powerful motivator. Each year we organise individual and inter-school academic competitions across our partner network.",
      "Competitions motivate students towards learning and schools towards excellence, and they give quiet, diligent students a public stage they rarely get.",
      "Every round is run to the ministry's standard: no shortcuts, no compromise, no 'assistance'.",
    ],
    outcomes: [
      "A yearly calendar fixture that schools prepare towards",
      "Recognition for diligent students across the network",
      "Measurable improvement in participating schools",
    ],
  },
  {
    slug: "excellence-award",
    title: "Yearly Excellence Award",
    short: "Excellence Award",
    blurb:
      "Recognising students, teachers and schools who deliver their responsibilities excellently without compromising godly and moral standards.",
    body: [
      "What a community honours, it reproduces. The Excellence Award exists to honour the right thing.",
      "It is designed to recognise and motivate students, teachers and schools who have delivered their responsibilities excellently — and who have done so without compromising on either godly or moral standards.",
      "Nominations come from our partner schools, academic clubs and coordinators, and are assessed against both performance and character.",
    ],
    outcomes: [
      "Public recognition for integrity as well as performance",
      "A standard the whole network aspires to",
      "Role models made visible to younger students",
    ],
  },
  {
    slug: "counselling-and-prayer",
    title: "Counselling, Mentoring & Prayer",
    short: "Counselling & Prayer",
    blurb:
      "One-to-one mentoring, counselling and prayer support for students facing pressure, vices, discouragement or decisions about their future.",
    body: [
      "Behind every failing result there is usually a story. Our counselling and mentoring desk exists to hear it.",
      "Students are matched with trained mentors for one-to-one support covering academic pressure, character formation, deliverance from besetting habits, and decisions about their future.",
      "Prayer is not an afterthought here. It is the foundation on which the rest of the support rests.",
    ],
    outcomes: [
      "Confidential, trained support for students in difficulty",
      "Deliverance and freedom from besetting habits",
      "Mentors walking with students over the long term",
    ],
  },
] as const;

export const programmes = [
  {
    slug: "transformation",
    name: "TRANSFORMATION",
    kicker: "The Convocation",
    blurb:
      "Our flagship student convocation, gathering students, academics and stakeholders to orient and re-orient the sector.",
    long: "TRANSFORMATION is where the ministry's mandate becomes visible. Students, teachers, administrators, government representatives and other stakeholders gather for teaching, motivation, commitment and re-orientation.",
    points: [
      "Held annually, bi-annually and quarterly",
      "Open to students, academics and sector stakeholders",
      "Orientation and re-orientation sessions",
      "Commitments carried back into every participating school",
    ],
  },
  {
    slug: "mdm",
    name: "MDM",
    kicker: "Motivation · Deliverance · Mentoring",
    blurb:
      "The core of everything we do — motivation with power, deliverance from vices, and mentoring that lasts beyond the meeting.",
    long: "MDM is not a single event but the method behind every avenue we run. Motivation stirs the will, deliverance breaks what holds a student back, and mentoring sustains the change.",
    points: [
      "Motivation with power (1 Cor 2:4-5)",
      "Deliverance from vices and besetting habits",
      "Mentoring relationships that outlast the programme",
      "Delivered through every EduREVIVE avenue",
    ],
  },
  {
    slug: "g-lead",
    name: "G-LEAD ACADEMIC CLUB",
    kicker: "Godliness · Leadership · Excellence · Aptitude · Diligence",
    blurb:
      "School-based clubs built on our five core values, meeting weekly and led by volunteer student and teacher coordinators.",
    long: "G-LEAD takes our core values and makes them a weekly practice inside the school. Members are ambassadors of the ministry in their own classrooms.",
    points: [
      "Weekly meetings in every partner school",
      "Volunteer student and teacher coordinators",
      "Built on Godliness, Leadership, Excellence, Aptitude, Diligence",
      "Members serve as EduREVIVE ambassadors",
    ],
  },
  {
    slug: "excellence-award",
    name: "EXCELLENCE AWARD",
    kicker: "Honouring Integrity",
    blurb:
      "A yearly award recognising students, teachers and schools who excel without compromising godly and moral standards.",
    long: "The Excellence Award is the ministry's answer to a sector that too often rewards results obtained by any means. Here, how you got there counts.",
    points: [
      "Student, teacher and school categories",
      "Assessed on performance and character together",
      "Nominations from clubs, schools and coordinators",
      "Presented at the annual convocation",
    ],
  },
] as const;

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Our Outreaches",
    href: "/outreaches",
    children: outreaches.map((o) => ({
      label: o.short,
      href: `/outreaches/${o.slug}`,
      blurb: o.blurb,
    })),
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: programmes.map((p) => ({
      label: p.name,
      href: `/programmes/${p.slug}`,
      blurb: p.blurb,
    })),
  },
  { label: "Contact us", href: "/contact" },
  { label: "Partner with us", href: "/partners" },
];

/* ----------------------------------------------------------- home page -- */

/** "Common Technology Challenges" → the challenges facing the education sector. */
export const challenges = [
  {
    title: "Vices Are Becoming the Norm",
    body: "Examination malpractice, cultism and dishonesty are eating deep into the sector and are fast becoming accepted as normal.",
    accent: "#dc2626",
  },
  {
    title: "Character Formation Is Neglected",
    body: "Education has been reduced to classroom exercises, while the character formation that produces good leadership is left unattended.",
    accent: "#16a34a",
  },
  {
    title: "Students Lack Motivation",
    body: "Many students have no vision for their studies, no model of excellence to follow, and no one speaking into their future.",
    accent: "#2563eb",
  },
  {
    title: "Students Fear Examinations",
    body: "Poor understanding and weak preparation push students towards 'assistance' rather than honest, confident work.",
    accent: "#ea580c",
  },
  {
    title: "Stakeholders Work in Isolation",
    body: "Students, teachers, administrators and government rarely share a platform, so nobody is pulling in the same direction.",
    accent: "#9333ea",
  },
  {
    title: "Godliness Is Pushed to the Margins",
    body: "Where godliness is treated as optional, the foundation for honest character and good leadership quietly erodes.",
    accent: "#0891b2",
  },
] as const;

/** "The Business Outcomes We Deliver" → the outcomes we pursue. */
export const outcomes = [
  {
    title: "Academic Excellence",
    body: "We hold that academic excellence is not an option but a necessity, and we give students the motivation and support to reach it honestly.",
  },
  {
    title: "Character & Formation",
    body: "Beyond classroom exercises, we build the character and development that good leadership depends on.",
  },
  {
    title: "Freedom From Vices",
    body: "We forestall vices and further decadence through deliverance, counselling and sustained mentoring.",
  },
  {
    title: "Leaders for Tomorrow",
    body: "Learning institutions raise future leaders. We help raise ones who will right wrongs and reshape the society we live in.",
  },
] as const;

/** "Why ITSA?" → why partner with us. */
export const whyUs = [
  {
    title: "Kingdom-First Approach",
    body: "We believe godliness is central to character formation, to forestalling vices, and to transformation in the sector and the society at large.",
  },
  {
    title: "Whole-Sector Engagement",
    body: "We do not speak to students alone. Teachers, administrators, government and other stakeholders all have vital roles, so we engage them all.",
  },
  {
    title: "Presence That Continues",
    body: "Clubs meet weekly, centres run every weekend and mentors stay in touch. Our partnership does not end when the event does.",
  },
] as const;

/** "Working With ITSA Is Easy" → how a school partners with us. */
export const process = [
  {
    title: "Invitation & Conversation",
    body: "A school, campus fellowship or church invites us in. We listen to the challenges on the ground and the outcomes you want to see.",
  },
  {
    title: "Programme Design",
    body: "We recommend the right combination of avenues — convocation, School of Motivation, coaching, clubs — and agree a clear plan with you.",
  },
  {
    title: "Launch & Mobilisation",
    body: "We come on site, run the first sessions, appoint volunteer coordinators and establish your academic club.",
  },
  {
    title: "Continuous Mentoring",
    body: "Weekly club meetings, weekend coaching, counselling, prayer and an invitation to the yearly competitions and Excellence Award.",
  },
] as const;

export const beliefs = [
  {
    heading: "Academic excellence",
    body: "ACADEMIC EXCELLENCE is not an option but a necessity for all students. However, the pursuit of excellence largely depends on students; other stakeholders in the sector have vital roles to play.",
  },
  {
    heading: "Learning institutions",
    body: "LEARNING INSTITUTIONS are grounds for imparting and raising future leaders who would subsequently help sustain the good things that remain, right the wrongs, and create a new and better way of doing things, thereby reshaping the society we live in.",
  },
  {
    heading: "Character formation",
    body: "Beyond classroom exercises, education has so much to do with CHARACTER FORMATION and DEVELOPMENT, which is vital for GOOD LEADERSHIP. The posterity and prosperity of any nation are greatly tied to GOOD LEADERSHIP.",
  },
  {
    heading: "The reality of vices",
    body: "The education sector is strongly confronted with VICES, which is fast becoming a norm, eating deep and causing decadence in the sector.",
  },
  {
    heading: "Transformation is possible",
    body: "We believe the education sector can be TRANSFORMED and RESCUED from further decadence.",
  },
  {
    heading: "Godliness at the centre",
    body: "We believe GODLINESS is central to CHARACTER FORMATION and DEVELOPMENT, FORESTALLING VICES and thereby PROMOTE TRANSFORMATION in the sector and the society at large.",
  },
] as const;

export const coreValues = [
  { letter: "G", word: "Godliness" },
  { letter: "L", word: "Leadership" },
  { letter: "E", word: "Excellence" },
  { letter: "A", word: "Aptitude" },
  { letter: "D", word: "Diligence" },
] as const;

export const targets = [
  "Students",
  "Teachers",
  "School Administrators",
  "Government",
  "Other Stakeholders",
] as const;

/** Stands in for the reference site's technology-partner logo strip. */
export const partnerLogos = [
  "Scripture Union",
  "FCA Nigeria",
  "NIFES",
  "CASOR",
  "Youth Alive",
  "Campus Light",
  "Bible Society",
  "Christ Embassy Campus",
  "Rhema Youth",
  "Living Faith Schools",
  "Covenant Campus",
  "Deeper Life Campus",
] as const;

/** Stands in for the "Trusted by Organizations" strip. */
export const schoolLogos = [
  "Grace Comprehensive College",
  "Federal Govt. College, Ijanikin",
  "Lighthouse Academy",
  "Hilltop International School",
  "St. Andrew's College",
  "Unity Secondary School",
  "Royal Heritage College",
  "Cornerstone High School",
] as const;

export const testimonials = [
  {
    quote:
      "Our students came back from TRANSFORMATION different. The club now meets every Friday without a teacher chasing them, and for the first time in years we sat our mock examinations with no malpractice reported in any hall.",
    name: "Mrs. Adaeze Nwankwo",
    role: "Principal, Grace Comprehensive College, Enugu",
  },
  {
    quote:
      "I joined the weekend coaching because I was afraid of Mathematics. By the third term I was explaining it to my classmates. I wrote my examination on my own and I passed, and nobody helped me.",
    name: "Samuel Oluwatobi",
    role: "SS3 Student, Lighthouse Academy, Ibadan",
  },
  {
    quote:
      "As a teacher I have attended many motivational programmes. What is different here is that they come back. The mentoring continues, the coordinators are supported, and the students know somebody is watching over them.",
    name: "Mr. Ibrahim Yusuf",
    role: "Club Coordinator, Unity Secondary School, Kaduna",
  },
] as const;

export const faqs = [
  {
    q: "Who can invite EduREVIVE OUTREACH?",
    a: "Schools, campus fellowships, churches, parent bodies and government education offices can all invite us. We work with primary, secondary and tertiary institutions.",
  },
  {
    q: "Is there a cost to partnering with us?",
    a: "Our programmes are run as a ministry. We discuss logistics with each partner school individually and will never let cost be the reason a student goes unreached.",
  },
  {
    q: "Are your programmes only for Christian schools?",
    a: "No. We are open about our convictions — godliness is central to what we teach — and we serve any school that invites us, with respect for its community.",
  },
  {
    q: "How quickly can a programme start?",
    a: "After the first conversation we usually agree a plan within two weeks, and most partner schools hold their launch session within the following month.",
  },
] as const;

export const stats = [
  { value: "9", label: "Outreach avenues" },
  { value: "5", label: "Core values (G-LEAD)" },
  { value: "52", label: "Club meetings a year" },
  { value: "100%", label: "Commitment to integrity" },
] as const;
