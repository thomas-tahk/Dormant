# Capstone Brief: Dormant (POC)

## Project Snapshot

- **Working title:** Dormant
- **Format:** New proof-of-concept mobile-first app
- **Duration:** 5 weeks, part-time
- **Goal:** Help users understand their own sleep patterns through lightweight self-report check-ins, a companion-led experience, and simple earned observations.

## Problem Statement

Current sleep apps usually fall into two categories:

- passive trackers that generate scores and trend charts without helping users understand what to change,
- structured intervention products that can feel clinical, demanding, or too heavy for people who are not seeking a therapy program.

That leaves a gap for a softer tool that does three things well:

- collects enough self-reported context to surface personal patterns,
- makes repeated logging feel sustainable instead of tedious,
- returns observations that are specific to the user's own data rather than generic sleep advice.

## Core Product Thesis

Dormant is built around a simple loop:

1. The user checks in briefly before bed.
2. The user checks in briefly after waking.
3. Over time, Dormant turns those entries into small personal observations.

The product is intentionally not trying to diagnose, treat, or optimize sleep through pressure. It is trying to make reflection repeatable enough that real patterns can emerge.

## Differentiator

Dormant combines three ideas that are usually split apart:

1. **Two-minute self-report loop**
- A short night check-in and a short morning check-in.
- No long surveys.
- No dependency on passive wearable data.

2. **Companion-centered motivation**
- A persistent visual companion gives emotional continuity to the app.
- Logging is acknowledged through subtle reactions, not rewards or guilt mechanics.
- Missing days pauses progress instead of creating a failure state.

3. **Earned personal observations**
- Insights are derived from the user's own entries.
- The app says only what it has enough data to know.
- Early prototype scope focuses on one simple observation pattern, such as late screens or caffeine correlating with lower felt rest.

## Design Principles

- **No fail states:** missing a check-in should never punish the user.
- **Approach motivation over guilt:** the experience should invite return, not pressure it.
- **Your data, your patterns:** observations must come from logged history, not generic content masquerading as personalization.
- **Cozy over clinical:** the UI should feel calm, warm, and low-stakes.
- **Lightweight honesty:** every question should ask only what the user can reliably answer in the moment.

## MVP Scope

### In Scope

- onboarding flow
- home screen with companion as the focal point
- night check-in flow
- morning check-in flow
- local storage for entries
- recent entries/history screen
- one simple observation card after enough data is logged
- basic stats/history view
- settings screen with rename and export actions

### Out of Scope

- backend or user accounts
- cloud sync
- wearable integrations
- full companion evolution system
- multiple advanced insight models
- social or sharing features
- clinical treatment workflows

## Core User Flow

1. User opens Dormant and meets the companion.
2. User optionally names the companion and learns the two-check-in rhythm.
3. At night, the user logs bedtime, mental state, notable inputs, and an optional note.
4. In the morning, the user logs wake time, felt rest, wake difficulty, interruptions, and an optional note.
5. Entries are saved locally and shown in recent history.
6. After enough logs exist, Dormant surfaces an observation derived from the user's own entries.

## Data Model Direction

The MVP tracks a small set of variables that can be self-reported consistently:

- bedtime
- wake time
- mental state before sleep
- notable pre-sleep inputs
- felt rest on waking
- wake difficulty
- interruptions
- optional notes

Derived values for v0.1 can include:

- sleep duration
- bedtime consistency
- wake-time consistency
- simple correlation signals between inputs and felt rest

## Why This Is Worth Building

The key design challenge is not measuring sleep. It is sustaining enough honest input to make personal reflection useful.

Dormant treats adherence as a product design problem:

- reduce friction,
- reduce shame,
- make the interaction feel acknowledged,
- give the user something specific back once the data supports it.

That framing makes the project a stronger capstone than a generic tracker clone because it sits at the intersection of behavior design, interaction design, and lightweight data interpretation.

## Technical Direction

- **Frontend:** React + TypeScript or equivalent mobile-first stack
- **Storage:** local-first persistence
- **Logic:** rule-based observation generation for v0.1
- **Prototype fidelity:** functional screens with polished interaction tone, not just static mockups

## 5-Week Plan

### Week 1: Product Lock + App Scaffold

- finalize screen list and question set
- define entry schema and observation rules
- scaffold app structure and navigation

### Week 2: Night Check-in + Home

- build onboarding
- build companion-centered home screen
- implement night flow and local save

### Week 3: Morning Check-in + History

- implement morning flow
- save and render entries
- build recent entries/edit experience

### Week 4: Observation + Visual Polish

- add first rule-based observation
- connect insight panel state to real data
- improve transitions, layout, and companion states

### Week 5: Cleanup + Demo

- resolve edge cases
- tighten copy and UI consistency
- prepare presentation artifacts and walkthrough

## Evaluation Criteria

- Can a user complete both check-ins quickly without confusion?
- Does the home screen clearly guide the next action?
- Does the app avoid punishment mechanics when usage pauses?
- Does the first observation feel personal rather than generic?
- Does the overall experience feel calm and intentional rather than clinical?

## Demo Story

The best capstone demo path is:

1. onboard into the app,
2. complete a night check-in,
3. complete a morning check-in,
4. show saved history,
5. load seeded data,
6. reveal a simple earned observation,
7. show how the companion and home state reflect progress without using shame or score-driven pressure.

## Scope Guardrails

- Not a diagnosis tool
- Not a medical device
- Not a substitute for professional treatment
- Not a passive sleep-tracking product
- Not a streak-based habit app

## Supporting References

These references are useful for context and presentation framing, not as a mandate to turn Dormant into a clinical education tool:

- Sleep Cycle: passive tracking benchmark
- Sleepio / CBT-i products: structured intervention benchmark
- Finch: companion-centered emotional design reference
- Pokemon Sleep: sleep-themed character framing reference
- Daylio: low-friction repeated logging reference
- RISE: interpretation-oriented sleep data reference
