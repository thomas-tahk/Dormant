# Dormant — Session Handoff

## What This Is
POC sleep companion app. Bootcamp capstone. Demo-ready build against a hard deadline.
Web-first (Next.js) with stated intent to become React Native mobile later.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind v4 (CSS-based config, no tailwind.config.js — `@theme` in globals.css)
- localStorage only — no backend, no auth
- Google Fonts: Plus Jakarta Sans
- Deployed: https://dormant-rho.vercel.app/ (Vercel, auto-deploys from main)
- GitHub: git@github.com:thomas-tahk/Dormant.git

## IMPORTANT: Next.js 16 / Tailwind v4 Notes
- `params` in dynamic routes is `Promise<{ id: string }>` — must `await params`
- Tailwind v4: no config file, custom tokens go in `@theme {}` block in globals.css
- Dark mode uses `@variant dark (&:where(.dark, .dark *))` — class on `<html>`
- `'use client'` required on any component using useState, useEffect, localStorage, router
- Always run `npm run build` locally before pushing — Vercel will catch TypeScript errors that dev server ignores

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
| `/settings` | `src/app/settings/page.tsx` | Rename, theme, FHIR export, reset data |

### Key Source Files
| File | Purpose |
|---|---|
| `src/lib/types.ts` | All TypeScript interfaces |
| `src/lib/storage.ts` | localStorage read/write helpers |
| `src/lib/observations.ts` | Rule-based insight engine + companion state |
| `src/lib/seed.ts` | 7-night demo seed data (SEED_NIGHTS, SEED_MORNINGS) |
| `src/lib/fhir.ts` | FHIR R4 Bundle export (browser download) |
| `src/components/ThemeProvider.tsx` | Time-based dark/light context (6am/6pm) |
| `src/components/companion/Companion.tsx` | SVG companion, 4 states, CSS animations, tap-to-bounce |
| `src/components/companion/Habitat.tsx` | Ambient elements that grow with session count |
| `src/app/globals.css` | Design tokens, keyframes, app-shell frame styling |

### Design Tokens (globals.css)
CSS variables on `:root` (light) and `.dark`:
- `--bg`, `--surface`, `--surface-2`, `--accent` (#7c6fcd), `--accent-soft`, `--text`, `--text-muted`, `--border`

### Companion States
`sleeping` | `resting` | `neutral` | `happy`
- Driven by check-in data, NOT time of day
- sleeping = no entry today, resting = night only, neutral/happy = both done (happy if felt rest was good/great)
- Tap companion → bounces happy for 2.6s with cooldown (key-based remount for clean animation)

### Habitat System
`src/components/companion/Habitat.tsx` — rendered behind companion on home screen
- 1+ complete sessions: 3 soft floating orbs with glow
- 3+ sessions: warm yellow glowing orb (right side)
- 5+ sessions: crescent moon (upper left)
- "Complete session" = night + morning both logged for same date
- Option A (future): integrate sleep objects into companion SVG itself

### Sleep Inputs (night check-in step 3)
`caffeine` · `alcohol` · `exercise` · `screens` (label: "Bright screens") · `late-meal` · `nap` · `none`

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
6. Settings → Export FHIR Bundle → downloads `.json`
7. Settings → Reset data (two-tap confirm) → clears all entries
8. Theme auto-switches at 6am/6pm, manual override in Settings
9. Tap companion → bounce animation (2.6s, won't re-trigger during cooldown)
10. Habitat elements appear as session count grows

## What's Missing / Next Up (priority order)
1. **Edit past entries** — add edit buttons to history screen, route to pre-filled check-in form
2. **Progress indicator** — "X of 5 nights to first insight" on home or insights screen
3. **Streak counter** — consecutive days logged, shown softly on home screen
4. **Companion habitat Option A** — integrate sleep object (hammock/bed) into companion SVG at milestone
5. **Gamified check-in** — companion reacts in real-time during check-in steps (v2 scope)

## Known Issues
- History page doesn't auto-refresh after a new check-in (requires navigating away and back)
- No scroll handling on very small screens during check-in

## FHIR Export Notes
Generates FHIR R4 Bundle of Observation resources. LOINC codes used:
- Sleep duration: `93832-4`
- Sleep quality (felt rest): `89243-0`
- Pre-sleep self-report: `44250-9`
Relevant standard: USCDI — sleep diary data is an Assessment data element.

## Git History (recent)
```
815a818  Add presentation doc for capstone demo
0dbdd01  Add companion habitat — ambient elements that grow with session count
e8c54e5  Fix TypeScript error blocking Vercel build
a3b101a  Companion rename, tap bounce, visual fixes, sleep inputs, settings clear
9998a0e  Add session-handoff.md with full build state and next steps
```
