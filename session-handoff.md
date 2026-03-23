# Dormant — Session Handoff

## What This Is
POC sleep companion app. Bootcamp capstone. Demo-ready build against a hard deadline.
Web-first (Next.js) with stated intent to become React Native mobile later.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind v4 (CSS-based config, no tailwind.config.js — `@theme` in globals.css)
- localStorage only — no backend, no auth
- Google Fonts: Plus Jakarta Sans
- Deployed target: Vercel (free hobby tier, no project limit)
- GitHub: git@github.com:thomas-tahk/Dormant.git

## IMPORTANT: Next.js 16 / Tailwind v4 Notes
- `params` in dynamic routes is `Promise<{ id: string }>` — must `await params`
- Tailwind v4: no config file, custom tokens go in `@theme {}` block in globals.css
- Dark mode uses `@variant dark (&:where(.dark, .dark *))` — class on `<html>`
- `'use client'` required on any component using useState, useEffect, localStorage, router

## Current Build State

### Routes (all working)
| Route | File | Status |
|---|---|---|
| `/` | `src/app/page.tsx` | Home screen — redirects to /onboarding if not onboarded |
| `/onboarding` | `src/app/onboarding/page.tsx` | 2-step: welcome + name companion |
| `/checkin/night` | `src/app/checkin/night/page.tsx` | 4-step night flow |
| `/checkin/night/done` | `src/app/checkin/night/done/page.tsx` | Completion screen |
| `/checkin/morning` | `src/app/checkin/morning/page.tsx` | 4-step morning flow |
| `/checkin/morning/done` | `src/app/checkin/morning/done/page.tsx` | Completion screen |
| `/history` | `src/app/history/page.tsx` | Last 7 sessions, read-only |
| `/insights` | `src/app/insights/page.tsx` | 3 states: empty / learning / ready |
| `/settings` | `src/app/settings/page.tsx` | Rename, theme, FHIR export, disabled previews |

### Key Source Files
| File | Purpose |
|---|---|
| `src/lib/types.ts` | All TypeScript interfaces |
| `src/lib/storage.ts` | localStorage read/write helpers |
| `src/lib/observations.ts` | Rule-based insight engine + companion state |
| `src/lib/seed.ts` | 7-night demo seed data (SEED_NIGHTS, SEED_MORNINGS) |
| `src/lib/fhir.ts` | FHIR R4 Bundle export (browser download) |
| `src/components/ThemeProvider.tsx` | Time-based dark/light context (6am/6pm) |
| `src/components/companion/DogCompanion.tsx` | SVG dog, 4 states, CSS animations |
| `src/app/globals.css` | Design tokens, keyframes, app-shell frame styling |

### Design Tokens (globals.css)
CSS variables on `:root` (light) and `.dark`:
- `--bg`, `--surface`, `--surface-2`, `--accent` (#7c6fcd), `--accent-soft`, `--text`, `--text-muted`, `--border`

### Companion States
`sleeping` | `resting` | `neutral` | `happy`
- Animations: `idle-float`, `sleeping-breathe`, `happy-bounce`, `tail-wag`, `zzz-float`, `sparkle`

### Data Model
```
NightEntry: { id, date (wake date ISO), bedtime (HH:MM), mentalState, inputs[], note?, createdAt }
MorningEntry: { id, date, wakeTime, feltRest, wakeDifficulty, interruptions, note?, createdAt }
SleepSession: { date, night?, morning?, durationMinutes? }
```
**Date convention: wake date anchoring.** Night at 11pm Mon + wake 7am Tue = both filed under Tue.

### localStorage Keys
- `dormant_companion_name`
- `dormant_onboarded`
- `dormant_night_entries`
- `dormant_morning_entries`
- `dormant_theme` (`'light' | 'dark' | 'auto'`)

## What Works for the Demo
1. Onboard → name companion → home
2. Night check-in (4 steps) → saves → home reflects state
3. Morning check-in (4 steps) → saves → companion state updates
4. History shows last 7 sessions
5. Insights → tap "Load demo data" to seed 7 nights → insight card appears
6. Settings → Export FHIR Bundle → downloads `.json` to Downloads folder
7. Theme auto-switches at 6am/6pm, manual override in Settings

## What's Missing / Cut
- No editing past entries (only today can be re-logged, overwrites)
- No adding entries for past dates manually
- No stats/history screen (cut from scope — not in demo story)
- Sound and Reminders are disabled UI only (shown in Settings as coming soon)
- No real companion animations beyond CSS (no Lottie/Rive)

## Visual / UI Notes
- Desktop: phone frame (430px wide, 40px rounded corners, floating with margin)
- Dark mode body: deep navy + CSS star pattern + purple glows
- Light mode body: warm layered gradients (lavender/cream/peach)
- Sheet pattern: check-ins use `sheet-enter` animation (slides up), `fade-in` per step

## Known Issues / To Fix Next Session
- Minor: `.dark body` selector may flash on first load (ThemeProvider sets class client-side)
- The companion `happy-bounce` animation only fires once (needs `infinite` or re-trigger on state change)
- No scroll on long check-in steps on very small screens (no overflow handling yet)
- History page doesn't auto-refresh after a new check-in (requires navigating away and back)

## FHIR Export Notes
Generates FHIR R4 Bundle of Observation resources. LOINC codes used:
- Sleep duration: `93832-4`
- Sleep quality (felt rest): `89243-0`
- Pre-sleep self-report: `44250-9`
Relevant standard: USCDI (United States Core Data for Interoperability) — sleep diary data
is recognized as an Assessment data element. Relevant for healthcare interoperability framing
in the demo presentation.

## Git History
```
0dfcec1  Round phone frame corners, replace coming-soon list with disabled controls
fd89d86  Add phone-frame outline and day/night background environments
bdc4171  Scaffold Dormant POC — full app structure and all core screens
920d8a7  Initial commit — project briefs and wireframe docs
```

## Suggested Next Steps (in priority order)
1. Deploy to Vercel (connect GitHub repo → auto-deploy)
2. Fix happy-bounce animation (add `key` prop re-trigger or set `infinite`)
3. Polish: home screen companion glow/habitat feels sparse — consider a soft illustrated ground
4. Polish: check-in sheet backdrop should show a blurred hint of the home screen behind it
5. Add ability to seed/clear data from Settings (useful for demo)
6. Consider a simple "Add past entry" flow for history screen
