# RxAssist — Investor-Grade Site

**A premium, investor-first website** for RxAssist — AI-powered pharmaceutical middleware closing the medication safety gap across Sub-Saharan Africa.

## Live Pages
- `/` — Homepage: opportunity, solution, business model, roadmap, leadership
- `/demo/` — Interactive verification-scan preview + early-access waitlist
- `/blueprint/` — Web rendering of the Strategic Blueprint (with PDF download)

## Design System — "Specimen Label"
A light, investor-grade aesthetic built around clinical precision rather than startup gloss:

- **Palette**: warm paper white (`#FAFAF7`), deep teal (`#0D7A6E`), emerald (`#1F9D6B`), near-black ink (`#0F1A17`)
- **Type**: Fraunces (display serif, used at high optical size) + Inter (body) + JetBrains Mono (all data/stat readouts)
- **Signature element**: the Verification Strip — a ticker of live-style stat readouts at the top of every page, replacing the old dark "scan line" gimmick
- **Cards**: "specimen" modules with hairline top rule, mono labels, instrument-readout numerals — styled like a lab report rather than a glass card

All tokens are defined in `styles.css` under `:root`.

## File Structure
```
rxa-web/
├── index.html                          # Homepage
├── styles.css                          # Design system + Tailwind overrides
├── script.js                           # Homepage interactivity
├── demo/
│   ├── index.html                      # Interactive demo + waitlist
│   └── demo.js                         # Scan simulation + form logic
├── blueprint/
│   └── index.html                      # Web version of the blueprint
├── assets/
│   └── logo.svg                        # Light-mode logo
├── RxAssist_Strategic_Blueprint_2026.pdf
├── robots.txt
├── sitemap.xml
├── vercel.json
└── README.md
```

No build step. Pure HTML/CSS/JS, Tailwind via CDN.

## Local Development
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to Vercel
```bash
npm i -g vercel
vercel
```
`vercel.json` is configured for clean URLs and directory-based routing (`/demo/`, `/blueprint/`) rather than SPA-style rewrites.

## Content Source of Truth
All statistics and business-model language are sourced directly from `RxAssist_Strategic_Blueprint_2026.pdf` (May 2026). If the blueprint is updated, the homepage Business Model/Opportunity sections and the `/blueprint/` page should be updated to match.

## Notes on the Waitlist
The waitlist form on `/demo/` is a **front-end preview only** — no submissions are processed or stored. The success state demonstrates the intended UX. To go live, wire `demo.js`'s form handler to a real backend (e.g. a serverless function + email service, or a form provider like Formspree).

## Contact
Founder: Nathaniel Friday
Email: nathanial.f@rxassist.pro
LinkedIn: linkedin.com/in/rxassist

---
© 2026 RxAssist. Private & Confidential.
