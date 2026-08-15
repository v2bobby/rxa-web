# RxLoop — site + product

**RxLoop** is offline-first pharmaceutical middleware for Sub-Saharan Africa. This repo holds the marketing site and a real, functional early-stage web app. No build step, no framework, no dependencies: plain HTML, CSS and JavaScript.

## Pages

| Path | What it is |
|---|---|
| `/` | Homepage. 3D capsule-field hero, then the full argument in split-page sections, with the reference lookup, report form, reminder builder and loop diagram all live on the page. |
| `/app/` | **The product.** Installable PWA: reference guidance in 5 languages, offline, counterfeit reporting, adherence reminders. |
| `/product/` | What the app does today and, precisely, what it does not. |
| `/blueprint/` | Web rendering of the strategic blueprint. |
| `/about/` | Premise, principles, founder. |
| `/contact/` | Routes by who you are; composes a mail draft locally. |
| `/privacy/`, `/terms/` | Short and specific. |

`/demo/` is gone and 301-redirects to `/app/` (see `vercel.json`).

## Design system — "Signal"

A light, clinical-instrument aesthetic where **bold type does the work** and colour is reserved for meaning.

- **Palette** — paper white `#F6F6F3`, lift white `#FFFFFF`, ink `#0A0E14`, **electric blue `#0047FF`**, blue wash `#E7ECFF`. Two state-only colours: `#0E7A55` verified, `#B4341F` suspect.
- **The blue rule** — blue is never decorative. It marks verification state and nothing else. Every place it appears in the UI, it is saying "this is the checked thing."
- **Type** — Archivo (display, 800–900 weight at 110–118% width, tight negative tracking), Inter Tight (body), JetBrains Mono (labels and data readouts).
- **Layout** — every content section is a true split: sticky left column carrying the title and framing, hairline rule, scrolling right column. Stacks on mobile.
- **Signature** — the hero capsule field. Exactly one instance in ten is blue, and a verification sweep travels up through it. The statistic *is* the image.

All tokens live in `styles.css` under `:root`. `/app/` uses the same stylesheet.

## Structure

```
rxa-web/
├── index.html                  # Homepage
├── styles.css                  # Design system — shared by site and app
├── script.js                   # Homepage: 3D hero, demos, diagram, filters
├── app/
│   ├── index.html              # PWA shell
│   ├── app.js                  # App logic (storage, search, reminders, install, SW)
│   ├── data.js                 # Medication reference, 5 languages — single source of truth
│   ├── manifest.json
│   ├── service-worker.js       # Offline caching
│   └── icons/                  # 192, 512, maskable-512
├── about|product|contact|privacy|terms|blueprint/index.html
├── assets/logo.svg
├── robots.txt, sitemap.xml, vercel.json, package.json
└── README.md
```

`app/data.js` is loaded by **both** the homepage and the app, so the reference content exists in exactly one place. Edit it there and both update.

## What's real vs. roadmap

**Live today**

- Medication reference in English, Nigerian Pidgin, Yorùbá, Hausa and Igbo — **14 medicines**, 210 translated strings, general safety and adherence guidance, **no numeric dosing**
- Filter chips by condition (fever, malaria, infection, diarrhoea, blood pressure, diabetes, anaemia/pregnancy, asthma, TB, HIV, strong painkillers)
- Full offline operation via a real service worker
- Installable as a PWA (Android prompt; iOS via Safari's Add to Home Screen, which doesn't fire `beforeinstallprompt` — the install bar staying hidden there is correct, not a bug)
- Counterfeit reporting — batch code, location, red flags, optional photo; **stored on-device** in `localStorage`, with export and clear
- Adherence reminders — local notifications while the app is installed or open, with per-dose tick-off and course progress
- App shell: hash routing (`#medicines`, `#report`, `#reminders`) so manifest shortcuts and the back button work; first-run language gate; condition filter chips; cross-links from a medicine to its reminder or report; photo thumbnails downscaled to 480px before storage; iOS Add-to-Home-Screen guidance

**Roadmap, not built**

- Computer-vision pack verification against manufacturer-verified data (the original Trust Score concept). Requires real manufacturer and regulatory partnerships. **Do not simulate this.**
- Cross-device sync for reports (needs a moderated backend — see below)
- Background push reminders (needs a push server)
- Clinical review of `app/data.js` and native-speaker review of every translation

## Content review — do this before wide release

`app/data.js` is a first-pass draft. The app flags this to users on every entry, but the flag is not a substitute for the work:

1. A **licensed pharmacist** reviews every English entry. Priority order, by how badly a wrong entry would land: TB (RHZE), ART, Tramadol, Co-trimoxazole, Ferrous sulphate, Salbutamol — then the rest.
2. A **native-speaking health communicator** reviews each of `pcm`, `yo`, `ha`, `ig`.
3. Keep the no-dosing rule intact. It is stated at the top of `data.js` for a reason.

## Upgrade path: cross-device sync

Reports are device-local today. To aggregate them:

1. Stand up a lightweight backend — Supabase or Firebase both work from static JS with no build step.
2. Replace **only** `saveReports()` / `getReports()` in `app/app.js`. Nothing else needs to change; the rest of the file already treats them as the storage boundary.
3. Add moderation and rate limiting **before** anything aggregated goes public. An unmoderated report map is a defamation tool.
4. Rewrite `/privacy/` and add an explicit consent step before the first upload.

## Local development

```bash
npm run dev          # python3 -m http.server 8000
# → http://localhost:8000  and  http://localhost:8000/app/
```

Service workers need HTTPS or `localhost` — `localhost` is fine.

## Deploy

```bash
npm i -g vercel
vercel
```

`vercel.json` handles clean URLs, the `/demo/` → `/app/` redirect, cache headers and basic security headers. No environment variables, no build step.

### Pre-deployment checklist

- [ ] **Replace the homepage and blueprint statistics.** The figures currently on `/` and `/blueprint/` are cited from public WHO and peer-reviewed sources but are marked "verify" in the source line — swap in the numbers from `RxLoop_Strategic_Blueprint_2026.pdf` and confirm each citation.
- [ ] Confirm `rxloop.org` DNS points at Vercel and the domain is verified in the project
- [ ] Lighthouse on the deployed `/app/` — confirm PWA installability (manifest, SW, icons all resolve)
- [ ] Test offline: load `/app/`, kill the network, reload — reference lookup should still work
- [ ] Test install on a real Android device (Chrome) and on iOS Safari
- [ ] Check Yorùbá diacritics render on at least one Android device — font fallback varies
- [ ] Delete the stray `*:Zone.Identifier` files from the repo (`git rm --cached '*:Zone.Identifier'`); `.gitignore` now blocks new ones
- [ ] Regenerate `RxLoop_Strategic_Blueprint_2026.pdf` if its internal pages still carry the old product name

## Contact

Founder: Nwosu Uzoma · <uzomanwosu@rxloop.org> · [LinkedIn](https://www.linkedin.com/in/uzoma-nwosu/)

---

© 2026 RxLoop.
