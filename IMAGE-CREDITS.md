# Image credits

All photography in `public/images/` comes from [Unsplash](https://unsplash.com)
and is used under the [Unsplash License](https://unsplash.com/license), which
permits free commercial and non-commercial use without permission. Attribution
is not required but is appreciated.

Each file is listed with the Unsplash image ID it was fetched from, so any
photo can be traced back to its source and photographer:

| File | Used for | Unsplash image ID |
| --- | --- | --- |
| `hero-students.jpg` | Home — hero | `photo-1603394336952-3628e17d3920` |
| `convocation.jpg` | Student Convocation outreach | `photo-1758270705067-0d7edee57af0` |
| `campus-crusade.jpg` | Campus Crusades outreach | `photo-1647957902647-0337913440fc` |
| `mass-media.jpg` | Mass Media Motivation outreach | `photo-1531482615713-2afd69097998` |
| `school-of-motivation.jpg` | School of Motivation outreach | `photo-1632215861513-130b66fe97f4` |
| `coaching.jpg` | Weekend Coaching outreach | `photo-1585661417298-8236a5f449aa` |
| `academic-club.jpg` | Academic Clubs outreach | `photo-1758270705518-b61b40527e76` |
| `competition.jpg` | Academic Competitions outreach | `photo-1473649085228-583485e6e4d7` |
| `award.jpg` | Excellence Award outreach & programme | `photo-1514820720301-4c4790309f46` |
| `mentoring.jpg` | Counselling & Prayer outreach | `photo-1507537362848-9c7e70b7b5c1` |
| `transformation.jpg` | TRANSFORMATION programme | `photo-1627556704243-5f0771d90783` |
| `mdm.jpg` | MDM programme | `photo-1641337261712-3cb3f398331f` |
| `g-lead.jpg` | G-LEAD programme | `photo-1666281269793-da06484657e8` |
| `mandate.jpg` | Home — About section | `photo-1744809482817-9a9d4fc280af` |
| `outcomes.jpg` | Home — Outcomes section | `photo-1612214495858-4f32b96155a7` |
| `reach-nigeria.jpg` | Partners — Nigeria and beyond | `photo-1632215863479-201029d93143` |
| `partners.jpg` | About — Who we are sent to | `photo-1645263012710-35e2fc89cb5c` |

The full source URL for any entry is
`https://images.unsplash.com/<image id>`.

`hero-students.jpg` is a square crop of a portrait original, taken with
`?rect=0,300,3456,3456&w=1400&q=80` so that neither student's head is cut off
by the frame. Re-fetch it with those exact parameters if it ever needs
regenerating.

## Replacing these with EduREVIVE's own photography

These are stand-ins. Photographs of your own convocations, campus crusades,
coaching centres and award ceremonies will always serve this site better than
stock. To swap one in:

1. Drop the new file into `public/images/`, keeping the same filename.
2. Update that entry's `alt` text in [`src/lib/photos.ts`](src/lib/photos.ts)
   to describe the new photograph.
3. Remove the row above, or replace it with your own credit.

Nothing else needs to change — every image slot on the site resolves through
that one registry. Landscape images of roughly 1400x900 or larger work best,
except the hero, whose slot is square: give it a square image of about
1400x1400 with headroom above the subject.

## Illustration fallback

An original vector illustration set was built for these same slots before the
switch to photography. It is reproducible at any time with:

```bash
python3 scripts/build-illustrations.py
```

That writes sixteen brand-coloured SVG scenes to `public/illustrations/`.
