/**
 * Photography registry.
 *
 * Every image slot on the site resolves through this map, so swapping a stock
 * photo for EduREVIVE's own event photography means replacing the file in
 * public/images/ and updating the alt text here — nothing else changes.
 *
 * Sources and licence: see IMAGE-CREDITS.md at the repository root.
 */

export const photos = {
  hero: {
    src: "/images/hero-students.jpg",
    alt: "An older student in school uniform helping a younger one with her work",
  },
  convocation: {
    src: "/images/convocation.jpg",
    alt: "Students seated in a lecture hall listening attentively during a convocation session",
  },
  "campus-crusade": {
    src: "/images/campus-crusade.jpg",
    alt: "A young woman leading worship with a microphone at an outdoor gathering",
  },
  "mass-media": {
    src: "/images/mass-media.jpg",
    alt: "Two young people working together at a monitor in a media production studio",
  },
  "school-of-motivation": {
    src: "/images/school-of-motivation.jpg",
    alt: "A teacher reading aloud to a classroom of attentive schoolchildren",
  },
  coaching: {
    src: "/images/coaching.jpg",
    alt: "A student writing notes beside an open textbook at a study desk",
  },
  "academic-club": {
    src: "/images/academic-club.jpg",
    alt: "A group of students gathered around a laptop, working through a problem together",
  },
  competition: {
    src: "/images/competition.jpg",
    alt: "Students seated at desks in rows, working quietly in a classroom",
  },
  award: {
    src: "/images/award.jpg",
    alt: "A row of silver and gold trophies arranged on a table",
  },
  mentoring: {
    src: "/images/mentoring.jpg",
    alt: "Two people seated across a table in an unhurried one-to-one conversation",
  },
  transformation: {
    src: "/images/transformation.jpg",
    alt: "Graduands in academic gowns gathered outside a university building",
  },
  mdm: {
    src: "/images/mdm.jpg",
    alt: "Hands raised in worship during a gathering",
  },
  "g-lead": {
    src: "/images/g-lead.jpg",
    alt: "Schoolgirls in uniform holding their textbooks and smiling",
  },
  mandate: {
    src: "/images/mandate.jpg",
    alt: "A student watching a teacher work through a problem at the board",
  },
  outcomes: {
    src: "/images/outcomes.jpg",
    alt: "A smiling graduate in cap and gown holding her certificate",
  },
  reach: {
    src: "/images/reach-nigeria.jpg",
    alt: "Nigerian secondary school students in uniform on their school compound",
  },
  partners: {
    src: "/images/partners.jpg",
    alt: "Graduating students photographing each other after a ceremony",
  },
} as const;

export type PhotoName = keyof typeof photos;

/** Outreach slug → photo. */
export const outreachPhoto: Record<string, PhotoName> = {
  "student-convocation": "convocation",
  "campus-crusades": "campus-crusade",
  "mass-media-motivation": "mass-media",
  "school-of-motivation": "school-of-motivation",
  "weekend-coaching": "coaching",
  "academic-clubs": "academic-club",
  "academic-competitions": "competition",
  "excellence-award": "award",
  "counselling-and-prayer": "mentoring",
};

/** Programme slug → photo. */
export const programmePhoto: Record<string, PhotoName> = {
  transformation: "transformation",
  mdm: "mdm",
  "g-lead": "g-lead",
  "excellence-award": "award",
};
