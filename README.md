# RxLoop — Site + Product

**RxLoop** is AI-powered pharmaceutical middleware closing the medication safety gap across Sub-Saharan Africa. This repo contains the marketing site and a real, functional early-stage web app.

## Live Pages
- `/` — Homepage: opportunity, solution, business model, roadmap, leadership
- `/app/` — **The real product.** A Progressive Web App: medication reference info in 5 languages, offline support, counterfeit reporting, and adherence reminders. See "What's real vs. roadmap" below.
- `/blueprint/` — Web rendering of the Strategic Blueprint

`/demo/` has been removed and now 301-redirects to `/app/` (see `vercel.json`). It previously contained a simulated, pre-recorded "scan" mockup — that has been replaced with the real app.

## What's real vs. roadmap

**Real and functional today:**
- Medication reference lookup (general safety/adherence info, not clinical dosing) in English, Yoruba, Hausa, Igbo, and Nigerian Pidgin
- Offline support via a real service worker — the app shell and data are cached and usable without connectivity
- Installable as a PWA (Add to Home Screen / install prompt)
- Counterfeit reporting — users can log a suspected counterfeit (photo, batch code, location); **stored locally on-device** (localStorage), not yet synced to a shared backend
- Adherence reminders — local notifications while the app is open/installed; not yet backed by a push server

**Still roadmap, not yet built:**
- Computer-vision counterfeit detection against a manufacturer-verified database (the original "Trust Score" concept) — this requires real manufacturer/regulatory partnerships and should not be simulated or implied as live until it exists
- Cross-device sync for counterfeit reports (needs a real backend — see Upgrade Path below)
- True background push notifications for reminders (needs a push server)
- Clinical review of the medication content and translations by qualified pharmacists/native-speaking health communicators — **do this before wide public release**, see Content Review below

## Design System — "Specimen Label"
A light, investor-grade aesthetic built around clinical precision rather than startup gloss:

- **Palette**: warm paper white (`#FAFAF7`), deep teal (`#0D7A6E`), emerald (`#1F9D6B`), near-black ink (`#0F1A17`)
- **Type**: Fraunces (display serif) + Inter (body) + JetBrains Mono (data/stat readouts)
- **Cards**: "specimen" modules with hairline rule, mono labels, instrument-readout numerals

All tokens are defined in `styles.css` under `:root`. The `/app/` product reuses this same stylesheet for visual continuity.

## File Structure
```
rxa-web/
├── index.html                          # Homepage
├── styles.css                          # Shared design system + Tailwind overrides
├── script.js                           # Homepage interactivity
├── app/
│   ├── index.html                      # The real product (PWA shell)
│   ├── app.js                          # Core app logic
│   ├── data.js                         # Medication reference content (5 languages)
│   ├── manifest.json                   # PWA manifest
│   ├── service-worker.js               # Offline caching
│   └── icons/                          # PWA icons (192, 512, maskable)
├── blueprint/
│   └── index.html                      # Web version of the blueprint
├── assets/
│   └── logo.svg
├── RxLoop_Strategic_Blueprint_2026.pdf
├── robots.txt
├── sitemap.xml
├── vercel.json                         # Includes /demo/ → /app/ redirect
└── README.md
```

No build step. Pure HTML/CSS/JS, Tailwind via CDN.

## Local Development
```bash
python3 -m http.server 8000
# then open http://localhost:8000 and http://localhost:8000/app/
```
Note: service workers require HTTPS or `localhost` to register — `localhost` is fine for local testing.

## Deploy to Vercel
```bash
npm i -g vercel
vercel
```
`vercel.json` handles clean URLs, the `/demo/` → `/app/` redirect, and cache headers. No environment variables or build step required for what's in this repo today.

### Pre-deployment checklist
- [ ] Confirm `rxloop.org` DNS points at Vercel and the domain is verified in the Vercel project
- [ ] Run Lighthouse against the deployed `/app/` URL — confirm PWA installability passes (manifest, service worker, icons all resolve)
- [ ] Test offline mode manually: load `/app/`, then disable network, reload — medication lookup should still work
- [ ] Test install prompt on an actual Android device (Chrome) and iOS (Safari "Add to Home Screen", which doesn't fire `beforeinstallprompt` — the install button will stay hidden there by design, which is expected browser behavior, not a bug)
- [ ] Verify all 5 languages render correctly, including diacritics (Yoruba) — check on at least one Android device, since font fallback for diacritics can vary

## Content Review (do before wide release)
The medication content in `app/data.js` is a first-pass draft:
- General safety/adherence information only — deliberately excludes numeric dosing, which varies by patient and should never come from an unreviewed source
- Translations (Yoruba, Hausa, Igbo, Pidgin) are a good-faith first draft, not verified by native-speaking healthcare communicators
- **Before treating this as production-ready clinical content, have a licensed pharmacist and native-speaking reviewers for each language check every entry in `app/data.js`.**

## Upgrade Path: Cross-Device Sync
The counterfeit-reporting and reminders features currently store data with `localStorage`, which is real and functional but device-local only. To make reports genuinely shared/aggregated across users (a real step toward the original "community verification" concept):
1. Set up a lightweight backend — Supabase or Firebase both have generous free tiers and integrate with static JS without a build step (just a `<script>` tag and an API key)
2. Replace the `saveReports()` / `getReports()` functions in `app/app.js` with calls to that backend instead of `localStorage`
3. Add basic moderation/rate-limiting before making aggregated reports public, to prevent spam or bad-faith submissions

## Content Source of Truth
Statistics and business-model language on the homepage are sourced from `RxLoop_Strategic_Blueprint_2026.pdf` (May 2026). Note: the PDF's internal pages still reference the site's prior name — regenerate via `generate_blueprint.py` (not included in this repo) if that needs to match.

## Contact
Founder: Nwosu Uzoma
Email: uzomanwosu@rxloop.org
LinkedIn: https://www.linkedin.com/in/uzoma-nwosu/

---
© 2026 RxLoop.
