#!/usr/bin/env python3
"""
Generates the EduREVIVE OUTREACH illustration set.

Flat vector scenes in the brand palette, written to public/illustrations/.
Each file is self-contained (its own gradient, grid and glows) and drawn on a
400x250 canvas with the subject kept inside a safe area, so the panels can be
cropped to 16:10, 16:9, 4:3 or square without losing the subject.

Run:  python3 scripts/build-illustrations.py
"""

import math
import os

W, H = 400, 250
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "illustrations")

NAVY, NAVY7, NAVY6, NAVY4 = "#171B24", "#222835", "#2F3749", "#6B7794"
CREAM, CREAM2 = "#FFF9E3", "#F7EFD4"
ORANGE, ORANGE3, ORANGE6 = "#EF9A33", "#F4B365", "#C87518"


def defs(idx):
    """Shared background machinery, namespaced per file."""
    return f"""<defs>
  <linearGradient id="sky{idx}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="{NAVY7}"/>
    <stop offset="0.55" stop-color="{NAVY}"/>
    <stop offset="1" stop-color="#0C0F16"/>
  </linearGradient>
  <radialGradient id="glow{idx}" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="{ORANGE}" stop-opacity="0.45"/>
    <stop offset="1" stop-color="{ORANGE}" stop-opacity="0"/>
  </radialGradient>
  <pattern id="grid{idx}" width="28" height="28" patternUnits="userSpaceOnUse">
    <path d="M28 0H0v28" fill="none" stroke="{CREAM}" stroke-opacity="0.05" stroke-width="1"/>
  </pattern>
</defs>"""


def backdrop(idx, glow=(300, 70, 150)):
    gx, gy, gr = glow
    return f"""<rect width="{W}" height="{H}" fill="url(#sky{idx})"/>
<rect width="{W}" height="{H}" fill="url(#grid{idx})"/>
<circle cx="{gx}" cy="{gy}" r="{gr}" fill="url(#glow{idx})"/>"""


def ground(y=206, fill=NAVY7):
    return f'<rect x="0" y="{y}" width="{W}" height="{H - y}" fill="{fill}"/>'


def person(cx, base, h, fill=CREAM, arms=None, head_fill=None):
    """A flat figure: round head over a domed torso. `h` is total height."""
    hr = h * 0.17
    hy = base - h + hr
    tw = h * 0.62
    ty = base
    th = h - 2 * hr - h * 0.04
    body = (
        f'<path d="M{cx - tw / 2:.1f} {ty:.1f} '
        f'C{cx - tw / 2:.1f} {ty - th:.1f} {cx + tw / 2:.1f} {ty - th:.1f} '
        f'{cx + tw / 2:.1f} {ty:.1f} Z" fill="{fill}"/>'
    )
    head = f'<circle cx="{cx:.1f}" cy="{hy:.1f}" r="{hr:.1f}" fill="{head_fill or fill}"/>'
    out = body + head
    if arms == "raised":
        aw = h * 0.085
        for s in (-1, 1):
            x1 = cx + s * tw * 0.42
            y1 = ty - th * 0.62
            x2 = cx + s * tw * 0.95
            y2 = ty - th * 1.28
            out += (
                f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
                f'stroke="{fill}" stroke-width="{aw:.1f}" stroke-linecap="round"/>'
            )
    return out


def cap(cx, cy, s, fill=CREAM, under=NAVY):
    """Mortarboard, `s` = half-width of the board."""
    return (
        f'<path d="M{cx} {cy - s * 0.42}L{cx + s} {cy}L{cx} {cy + s * 0.42}L{cx - s} {cy}Z" fill="{fill}"/>'
        f'<path d="M{cx - s * 0.46} {cy + s * 0.2}v{s * 0.34:.1f}c0 {s * 0.2:.1f} {s * 0.92:.1f} {s * 0.2:.1f} {s * 0.92:.1f} 0v-{s * 0.34:.1f}z" fill="{under}"/>'
        f'<path d="M{cx + s * 0.86} {cy - s * 0.06}v{s * 0.5:.1f}" stroke="{fill}" stroke-width="{max(1.4, s * 0.09):.1f}" stroke-linecap="round"/>'
        f'<circle cx="{cx + s * 0.86}" cy="{cy + s * 0.5}" r="{s * 0.13:.1f}" fill="{fill}"/>'
    )


def book(cx, cy, w, fill=CREAM, edge=ORANGE):
    """Open book seen from the front."""
    h = w * 0.34
    return (
        f'<path d="M{cx - w / 2} {cy} q{w * 0.24:.1f} -{h * 0.9:.1f} {w / 2 - 2:.1f} -{h * 0.2:.1f} '
        f'v{h:.1f} q-{w * 0.26:.1f} -{h * 0.6:.1f} -{w / 2 - 2:.1f} {h * 0.2:.1f} z" fill="{edge}"/>'
        f'<path d="M{cx + w / 2} {cy} q-{w * 0.24:.1f} -{h * 0.9:.1f} -{w / 2 - 2:.1f} -{h * 0.2:.1f} '
        f'v{h:.1f} q{w * 0.26:.1f} -{h * 0.6:.1f} {w / 2 - 2:.1f} {h * 0.2:.1f} z" fill="{fill}"/>'
    )


def heart(cx, cy, s, fill=ORANGE):
    return (
        f'<path d="M{cx} {cy + s * 0.78:.1f} '
        f'C{cx - s * 1.45:.1f} {cy - s * 0.18:.1f} {cx - s * 0.78:.1f} {cy - s * 1.12:.1f} {cx} {cy - s * 0.34:.1f} '
        f'C{cx + s * 0.78:.1f} {cy - s * 1.12:.1f} {cx + s * 1.45:.1f} {cy - s * 0.18:.1f} {cx} {cy + s * 0.78:.1f} Z" fill="{fill}"/>'
    )


def svg(idx, body, glow=(300, 70, 150)):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" role="img">\n'
        f"{defs(idx)}\n{backdrop(idx, glow)}\n{body}\n</svg>\n"
    )


scenes = {}

# ---------------------------------------------------------------- convocation
b = ground(208)
b += f'<rect x="92" y="150" width="216" height="58" rx="4" fill="{NAVY6}"/>'          # stage
b += f'<rect x="92" y="146" width="216" height="8" rx="4" fill="{ORANGE}"/>'
b += f'<rect x="120" y="36" width="160" height="88" rx="6" fill="{NAVY6}"/>'          # screen
b += f'<rect x="128" y="44" width="144" height="72" rx="3" fill="{NAVY7}"/>'
b += cap(200, 72, 30)
b += f'<text x="200" y="110" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="{ORANGE}" text-anchor="middle" letter-spacing="2">TRANSFORMATION</text>'
b += f'<rect x="186" y="160" width="28" height="48" rx="3" fill="{ORANGE}"/>'          # podium
b += person(200, 160, 46, CREAM)
for i, x in enumerate((40, 74, 326, 360)):                                              # audience
    b += person(x, 214 + (i % 2) * 6, 40, NAVY4)
for x in (28, 62, 96, 304, 338, 372):
    b += person(x, 240, 46, NAVY6)
scenes["convocation"] = svg("cv", b, (200, 60, 140))

# -------------------------------------------------------------- campus crusade
b = ground(210)
b += f'<path d="M200 18 L250 210 L150 210 Z" fill="{ORANGE}" opacity="0.14"/>'         # light beam
b += f'<rect x="194" y="30" width="12" height="76" rx="3" fill="{CREAM}"/>'            # cross
b += f'<rect x="170" y="52" width="60" height="12" rx="3" fill="{CREAM}"/>'
b += f'<circle cx="200" cy="68" r="46" fill="{ORANGE}" opacity="0.18"/>'
for x, h in ((44, 62), (96, 70), (300, 70), (356, 62)):                                 # crowd, arms up
    b += person(x, 210, h, NAVY4, arms="raised")
for x, h in ((150, 76), (200, 82), (252, 76)):
    b += person(x, 212, h, CREAM, arms="raised")
b += f'<rect x="0" y="206" width="{W}" height="6" fill="{ORANGE}" opacity="0.5"/>'
scenes["campus-crusade"] = svg("cc", b, (200, 60, 150))

# ------------------------------------------------------------------ mass media
b = ground(214)
b += f'<path d="M200 48 L178 214 L222 214 Z" fill="{NAVY6}"/>'                          # tower
b += f'<path d="M186 120h28M182 152h36M178 184h44" stroke="{NAVY4}" stroke-width="5"/>'
b += f'<circle cx="200" cy="44" r="10" fill="{ORANGE}"/>'
for i, r in enumerate((34, 58, 82)):                                                    # signal arcs
    o = 0.55 - i * 0.14
    b += (
        f'<path d="M{200 - r} 44 A{r} {r} 0 0 1 {200 + r} 44" fill="none" '
        f'stroke="{ORANGE}" stroke-width="4" stroke-linecap="round" opacity="{o:.2f}"/>'
    )
b += f'<rect x="38" y="120" width="64" height="94" rx="9" fill="{CREAM}"/>'             # phone
b += f'<rect x="45" y="130" width="50" height="68" rx="4" fill="{NAVY7}"/>'
b += f'<circle cx="70" cy="164" r="15" fill="{ORANGE}"/>'
b += f'<path d="M66 157l12 7-12 7z" fill="{NAVY}"/>'
b += f'<rect x="296" y="132" width="74" height="60" rx="6" fill="{CREAM}"/>'            # screen
b += f'<rect x="303" y="139" width="60" height="38" rx="3" fill="{NAVY7}"/>'
b += f'<rect x="324" y="192" width="18" height="12" fill="{CREAM}"/>'
b += f'<rect x="310" y="202" width="46" height="7" rx="3" fill="{CREAM}"/>'
b += f'<path d="M312 158h8l6-10 7 20 6-12h12" stroke="{ORANGE}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
scenes["mass-media"] = svg("mm", b, (200, 50, 140))

# ------------------------------------------------------------ school of motivation
b = ground(208)
b += f'<rect x="48" y="36" width="190" height="112" rx="6" fill="{CREAM}"/>'            # board
b += f'<rect x="56" y="44" width="174" height="96" rx="3" fill="{NAVY7}"/>'
b += f'<path d="M74 70h86M74 90h120M74 110h64" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>'
b += f'<path d="M172 108h44" stroke="{NAVY4}" stroke-width="5" stroke-linecap="round"/>'
b += person(292, 178, 92, CREAM)                                                        # teacher
b += f'<line x1="268" y1="128" x2="246" y2="104" stroke="{CREAM}" stroke-width="7" stroke-linecap="round"/>'
b += f'<circle cx="243" cy="101" r="5" fill="{ORANGE}"/>'
for x in (70, 128, 186):                                                                # pupils at desks
    b += f'<rect x="{x - 26}" y="186" width="52" height="8" rx="3" fill="{ORANGE}"/>'
    b += f'<rect x="{x - 20}" y="194" width="40" height="22" rx="3" fill="{NAVY6}"/>'
    b += person(x, 186, 44, NAVY4)
scenes["school-of-motivation"] = svg("sm", b, (310, 60, 130))

# -------------------------------------------------------------------- coaching
b = ground(200)
b += f'<rect x="40" y="186" width="320" height="14" rx="4" fill="{ORANGE}"/>'           # desk
b += f'<rect x="60" y="200" width="14" height="50" fill="{NAVY6}"/>'
b += f'<rect x="326" y="200" width="14" height="50" fill="{NAVY6}"/>'
b += person(140, 186, 96, CREAM)                                                        # student writing
b += f'<line x1="166" y1="150" x2="196" y2="176" stroke="{CREAM}" stroke-width="8" stroke-linecap="round"/>'
b += f'<rect x="186" y="168" width="58" height="18" rx="3" fill="{CREAM2}" transform="rotate(-4 215 177)"/>'
b += f'<path d="M196 176l10-7" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>'
b += f'<rect x="262" y="146" width="60" height="12" rx="3" fill="{CREAM}"/>'            # book stack
b += f'<rect x="256" y="158" width="72" height="12" rx="3" fill="{ORANGE}"/>'
b += f'<rect x="264" y="170" width="56" height="12" rx="3" fill="{CREAM2}"/>'
b += f'<circle cx="300" cy="64" r="26" fill="none" stroke="{CREAM}" stroke-width="5"/>' # clock
b += f'<path d="M300 48v18l12 8" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round" fill="none"/>'
b += f'<path d="M72 60h44v36H72z" fill="{NAVY6}"/>'
b += f'<path d="M80 72h28M80 84h20" stroke="{NAVY4}" stroke-width="4" stroke-linecap="round"/>'
scenes["coaching"] = svg("co", b, (120, 60, 140))

# ---------------------------------------------------------------- academic club
b = ground(214)
b += f'<ellipse cx="200" cy="176" rx="104" ry="30" fill="{ORANGE}"/>'                   # round table
b += f'<ellipse cx="200" cy="170" rx="104" ry="30" fill="{CREAM}"/>'
b += f'<ellipse cx="200" cy="170" rx="76" ry="20" fill="{CREAM2}"/>'
for ang in range(0, 360, 60):                                                            # members around it
    r = math.radians(ang - 90)
    x = 200 + math.cos(r) * 128
    y = 170 + math.sin(r) * 46
    col = CREAM if ang in (0, 180) else NAVY4
    b += person(x, y + 20, 52 if y > 170 else 44, col)
b += book(200, 158, 72)
b += f'<path d="M126 60h64a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8h-44l-14 14v-14h-6a8 8 0 0 1-8-8V68a8 8 0 0 1 8-8z" fill="{ORANGE}"/>'
b += f'<path d="M140 76h36M140 88h24" stroke="{NAVY}" stroke-width="5" stroke-linecap="round"/>'
scenes["academic-club"] = svg("ac", b, (300, 60, 130))

# ----------------------------------------------------------------- competition
b = ground(212)
b += f'<rect x="150" y="104" width="100" height="108" fill="{ORANGE}"/>'                 # podium 1
b += f'<rect x="52" y="140" width="96" height="72" fill="{NAVY6}"/>'                     # 2
b += f'<rect x="252" y="158" width="96" height="54" fill="{NAVY6}"/>'                    # 3
b += f'<text x="200" y="168" font-family="system-ui,sans-serif" font-size="46" font-weight="800" fill="{NAVY}" text-anchor="middle">1</text>'
b += f'<text x="100" y="192" font-family="system-ui,sans-serif" font-size="30" font-weight="800" fill="{NAVY4}" text-anchor="middle">2</text>'
b += f'<text x="300" y="200" font-family="system-ui,sans-serif" font-size="30" font-weight="800" fill="{NAVY4}" text-anchor="middle">3</text>'
b += person(200, 104, 70, CREAM, arms="raised")
b += person(100, 140, 56, NAVY4)
b += person(300, 158, 52, NAVY4)
b += cap(200, 36, 22)
scenes["competition"] = svg("cp", b, (200, 56, 130))

# ----------------------------------------------------------------------- award
b = ground(214)
for i in range(12):                                                                       # rays
    a = math.radians(i * 30)
    x1, y1 = 200 + math.cos(a) * 54, 102 + math.sin(a) * 54
    x2, y2 = 200 + math.cos(a) * 92, 102 + math.sin(a) * 92
    b += f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{ORANGE}" stroke-width="4" stroke-linecap="round" opacity="0.3"/>'
b += f'<circle cx="200" cy="102" r="52" fill="{ORANGE}" opacity="0.16"/>'
b += f'<path d="M172 44h56v34a28 28 0 0 1-56 0z" fill="{ORANGE}"/>'                       # cup
b += f'<path d="M172 50h-18a18 18 0 0 0 18 18M228 50h18a18 18 0 0 1-18 18" fill="none" stroke="{ORANGE}" stroke-width="7"/>'
b += f'<rect x="192" y="106" width="16" height="24" fill="{ORANGE6}"/>'
b += f'<rect x="168" y="130" width="64" height="14" rx="3" fill="{CREAM}"/>'
b += f'<rect x="158" y="144" width="84" height="18" rx="4" fill="{CREAM2}"/>'
b += f'<path d="M186 60l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z" fill="{CREAM}" opacity="0.9" transform="translate(14,-2)"/>'
b += person(86, 214, 76, NAVY4, arms="raised")
b += person(316, 214, 76, NAVY4, arms="raised")
scenes["award"] = svg("aw", b, (200, 70, 150))

# ------------------------------------------------------------------- mentoring
b = ground(212)
b += f'<rect x="64" y="186" width="90" height="12" rx="4" fill="{NAVY6}"/>'               # two seats
b += f'<rect x="246" y="186" width="90" height="12" rx="4" fill="{NAVY6}"/>'
b += person(110, 186, 94, CREAM)                                                           # mentor
b += person(290, 186, 80, NAVY4)                                                           # student
b += f'<path d="M142 132 Q200 100 258 142" fill="none" stroke="{CREAM}" stroke-opacity="0.55" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 11"/>'
b += heart(200, 86, 22)
b += f'<circle cx="92" cy="62" r="5" fill="{ORANGE}" opacity="0.6"/>'
b += f'<circle cx="320" cy="48" r="7" fill="{ORANGE}" opacity="0.4"/>'
scenes["mentoring"] = svg("mn", b, (200, 54, 130))

# -------------------------------------------------------------- transformation
b = ground(214)
b += f'<path d="M40 214 C120 214 150 120 200 96 C250 72 290 60 364 56" fill="none" stroke="{ORANGE}" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 14"/>'
b += person(66, 214, 56, NAVY6)
b += person(150, 198, 68, NAVY4)
b += person(246, 166, 82, CREAM)
b += person(336, 132, 96, CREAM, arms="raised")
b += cap(336, 20, 26)
b += f'<circle cx="336" cy="112" r="44" fill="{ORANGE}" opacity="0.14"/>'
scenes["transformation"] = svg("tr", b, (330, 70, 150))

# ------------------------------------------------------------------------- mdm
b = ""
cols = ((76, ORANGE, "M76 58c14 18 24 28 24 44a24 24 0 0 1-48 0c0-16 10-26 24-44z"),)
b += f'<path d="M76 56c15 19 25 30 25 47a25 25 0 0 1-50 0c0-17 10-28 25-47z" fill="{ORANGE}"/>'
b += f'<path d="M76 120a11 11 0 0 1-11-11c0-7 5-10 11-19 6 9 11 12 11 19a11 11 0 0 1-11 11z" fill="{NAVY}"/>'
b += f'<path d="M186 74a20 20 0 0 1 28 0l10 10a20 20 0 0 1-2 30" fill="none" stroke="{CREAM}" stroke-width="10" stroke-linecap="round"/>'
b += f'<path d="M214 134a20 20 0 0 1-28 0l-10-10a20 20 0 0 1 2-30" fill="none" stroke="{CREAM}" stroke-width="10" stroke-linecap="round"/>'
b += f'<path d="M232 66l16-16M242 84l20-6M224 50l6-20" stroke="{ORANGE}" stroke-width="6" stroke-linecap="round"/>'
b += person(306, 138, 72, CREAM)
b += person(344, 138, 58, NAVY4)
b += f'<line x1="322" y1="104" x2="338" y2="110" stroke="{CREAM}" stroke-width="7" stroke-linecap="round"/>'
for x, t in ((76, "MOTIVATION"), (200, "DELIVERANCE"), (324, "MENTORING")):
    b += f'<text x="{x}" y="176" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="{ORANGE}" text-anchor="middle" letter-spacing="1.4">{t}</text>'
b += f'<path d="M40 196h320" stroke="{NAVY6}" stroke-width="3"/>'
b += f'<text x="200" y="224" font-family="system-ui,sans-serif" font-size="20" font-weight="800" fill="{CREAM}" text-anchor="middle" letter-spacing="6">MDM</text>'
scenes["mdm"] = svg("md", b, (200, 60, 150))

# ----------------------------------------------------------------------- g-lead
b = ground(212)
letters = ["G", "L", "E", "A", "D"]
for i, ch in enumerate(letters):
    x = 44 + i * 64
    ht = 56 + (2 - abs(i - 2)) * 22
    y = 212 - ht
    fill = ORANGE if i == 2 else NAVY6
    txt = NAVY if i == 2 else CREAM
    b += f'<rect x="{x}" y="{y}" width="52" height="{ht}" rx="6" fill="{fill}"/>'
    b += f'<text x="{x + 26}" y="{y + ht / 2 + 9:.0f}" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="{txt}" text-anchor="middle">{ch}</text>'
b += f'<rect x="28" y="212" width="344" height="11" rx="5" fill="{ORANGE}"/>'
b += f'<rect x="28" y="223" width="344" height="5" rx="2" fill="{ORANGE6}"/>'
b += cap(200, 40, 26)
scenes["g-lead"] = svg("gl", b, (200, 50, 130))

# ---------------------------------------------------------------------- mandate
b = ground(216)
b += f'<circle cx="200" cy="112" r="76" fill="{ORANGE}" opacity="0.13"/>'
b += book(200, 176, 210)
b += f'<path d="M200 150V92" stroke="{ORANGE}" stroke-width="6" stroke-linecap="round"/>'
b += cap(200, 68, 40)
for i, a in enumerate((-58, -30, 30, 58)):
    r = math.radians(a - 90)
    x1, y1 = 200 + math.cos(r) * 74, 112 + math.sin(r) * 74
    x2, y2 = 200 + math.cos(r) * 100, 112 + math.sin(r) * 100
    b += f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round" opacity="0.45"/>'
scenes["mandate"] = svg("ma", b, (200, 60, 140))

# --------------------------------------------------------------------- outcomes
b = ground(214)
for i in range(4):                                                                         # rising stack
    x = 58 + i * 76
    ht = 42 + i * 34
    b += f'<rect x="{x}" y="{214 - ht}" width="56" height="{ht}" rx="5" fill="{ORANGE if i == 3 else NAVY6}"/>'
    b += f'<rect x="{x}" y="{214 - ht}" width="56" height="7" rx="3" fill="{CREAM if i == 3 else NAVY4}"/>'
b += f'<path d="M70 150 L146 124 L222 92 L300 50" fill="none" stroke="{CREAM}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
for x, y in ((70, 150), (146, 124), (222, 92), (300, 50)):
    b += f'<circle cx="{x}" cy="{y}" r="7" fill="{CREAM}"/>'
b += person(314, 214 - 144, 54, CREAM, arms="raised")
b += cap(314, 34, 20)
scenes["outcomes"] = svg("oc", b, (300, 60, 140))

# ------------------------------------------------------------------------ reach
b = f'<circle cx="200" cy="126" r="86" fill="{NAVY6}"/>'
b += f'<circle cx="200" cy="126" r="86" fill="none" stroke="{CREAM}" stroke-opacity="0.2" stroke-width="2"/>'
for ry in (30, 58):
    b += f'<ellipse cx="200" cy="126" rx="86" ry="{ry}" fill="none" stroke="{CREAM}" stroke-opacity="0.18" stroke-width="2"/>'
b += f'<path d="M200 40v172M126 72c30 20 118 20 148 0M126 180c30-20 118-20 148 0" fill="none" stroke="{CREAM}" stroke-opacity="0.18" stroke-width="2"/>'
b += (
    f'<path d="M186 74c14-6 30-4 38 6 7 9 2 20 8 30 5 9 18 10 20 20 2 11-10 18-14 28'
    f'-4 11-2 24-10 32-9 9-24 6-32-2-9-9-8-24-14-34-6-11-20-16-22-28-2-13 10-23 14-34 3-9 2-14 12-18z" fill="{ORANGE}"/>'
)
for x, y in ((112, 78), (292, 94), (132, 186), (286, 180), (200, 44)):
    b += f'<circle cx="{x}" cy="{y}" r="6" fill="{CREAM}"/>'
    b += f'<circle cx="{x}" cy="{y}" r="13" fill="none" stroke="{CREAM}" stroke-opacity="0.35" stroke-width="2"/>'
scenes["reach"] = svg("re", b, (200, 70, 150))

# ---------------------------------------------------------------------- partners
b = ground(212)
for i, x in enumerate((96, 200, 304)):
    h = 64 if i == 1 else 50
    b += f'<rect x="{x - 40}" y="{212 - h - 46}" width="80" height="{h + 46}" rx="6" fill="{NAVY6 if i != 1 else ORANGE}"/>'
    b += f'<rect x="{x - 26}" y="{212 - h - 32}" width="52" height="22" rx="3" fill="{NAVY7 if i != 1 else NAVY}"/>'
    b += person(x, 212, 40, CREAM if i == 1 else NAVY4)
b += f'<path d="M136 120h28M236 120h28" stroke="{CREAM}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10"/>'
b += cap(200, 48, 24)
scenes["partners"] = svg("pt", b, (200, 56, 130))

os.makedirs(OUT, exist_ok=True)
for name, markup in scenes.items():
    path = os.path.join(OUT, f"{name}.svg")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(markup)
    print(f"{name}.svg  {len(markup):>6} bytes")
print(f"\n{len(scenes)} illustrations written to public/illustrations/")
