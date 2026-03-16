# Dormant AI Wireframe Prompt Pack

## Use Case

This document is for generating first-pass mobile wireframes and early visual directions for **Dormant**, a cozy sleep companion app.

Use it with:

- Figma Make
- Figma First Draft
- Uizard
- similar prompt-based UI generation tools

## Core Product Summary

Dormant is a mobile-first sleep companion app built around two short daily check-ins:

- a **night check-in** before bed,
- a **morning check-in** after waking.

The app uses a soft, companion-centered experience to help users log sleep-related context consistently. Over time, it turns those logs into small personal observations derived from the user's own history.

The product should feel:

- cozy
- calm
- warm
- low-pressure
- reflective
- non-clinical

It should **not** feel like:

- a hospital app
- a quantified-self dashboard
- a productivity tracker
- a streak-based habit app
- a gamified punishment loop

## Design Direction

### Visual Tone

- soft and atmospheric
- emotionally warm
- minimal but not sterile
- companion-first, not metrics-first
- mobile-native

### Style Cues

- rounded cards and controls
- soft gradients or illustrated background shapes
- calm earth tones, dusk tones, muted greens, warm creams, soft blues
- large comfortable spacing
- friendly typography
- subtle scene-like layout around the companion

### Avoid

- harsh medical blues
- dense data tables
- heavy chart-first interfaces
- rigid enterprise UI
- overdesigned gamification badges
- visible punishment for missed days

## Product Rules

- Missing a day should pause progress, not damage the companion or habitat.
- Insights must look earned from user data, not generic.
- The companion is the emotional anchor of the home screen.
- Logging should feel acknowledged, not scored.
- The home screen should clearly guide the next action.
- The app should stay soft and readable on mobile.

## Screen Inventory

Generate these screens:

1. Onboarding A: welcome
2. Onboarding B: name companion
3. Home screen
4. Night check-in bottom sheet, step 1
5. Night check-in bottom sheet, step 2
6. Night check-in bottom sheet, step 3
7. Night check-in bottom sheet, step 4
8. Morning check-in bottom sheet, step 1
9. Morning check-in bottom sheet, step 2
10. Morning check-in bottom sheet, step 3
11. Morning check-in bottom sheet, step 4
12. Insight panel bottom sheet: not enough data
13. Insight panel bottom sheet: earned observation
14. Recent entries screen
15. Stats/history screen
16. Settings screen

## Shared Component List

Use these recurring components:

- top app bar with small utility icons
- large companion illustration area
- habitat/background scene area
- status chip
- supportive helper text
- circular or rounded icon actions around companion
- modal bottom sheet with drag handle
- multi-step progress label
- large tap-target choice buttons
- pill chips for multi-select inputs
- optional note field
- sticky bottom CTA
- observation card
- simple history list rows
- settings rows with toggles or disclosure arrows

## Copy Starter

Use this copy directly unless the tool needs shorter variations.

### Onboarding A

- Title: `Meet your sleep companion`
- Body: `Dormant helps you notice your own sleep patterns over time with two quick daily check-ins.`
- Secondary CTA: `Skip`
- Primary CTA: `Continue`

### Onboarding B

- Title: `Name your companion`
- Field placeholder: `Optional name`
- Helper text: `Optional. You can rename them later.`
- Explainer 1: `At night: log bedtime, mindset, and anything that may affect sleep.`
- Explainer 2: `In the morning: log wake time and how rested you feel.`
- Secondary CTA: `Skip naming`
- Primary CTA: `Enter app`

### Home

- Status chip options: `Tonight`, `This morning`, `All set`
- Helper text example 1: `A quick check-in helps Dormant learn your rhythm.`
- Helper text example 2: `You logged last night. Add your morning check-in when you're ready.`
- Helper text example 3: `All caught up. Check your recent entries or insights anytime.`

### Night Check-In

- Step 1 title: `When are you heading to sleep?`
- Step 2 title: `How is your mind feeling?`
- Step 3 title: `Anything that might affect sleep tonight?`
- Step 4 title: `Anything else to remember?`
- Step 2 options: `Calm`, `Neutral`, `Wired`, `Anxious`
- Step 3 options: `Caffeine`, `Alcohol`, `Exercise`, `Screens`, `None of the above`
- Completion text: `Good night`

### Morning Check-In

- Step 1 title: `When did you wake up?`
- Step 2 title: `How rested do you feel right now?`
- Step 3 title: `How did waking up go?`
- Step 2 options: `Not rested`, `Okay`, `Good`, `Great`
- Wake difficulty options: `Easy`, `Normal`, `Hard`, `Very hard`
- Interruptions options: `None`, `Once or twice`, `Several times`
- Step 4 title: `Anything else to remember?`
- Completion text: `Good morning`

### Insight Panel

- Empty state title: `Still learning your rhythm`
- Empty state body: `A few more check-ins will help Dormant notice patterns that are actually yours.`
- Observation title example: `A small pattern showed up`
- Observation body example: `On nights you logged screens late, your morning rest rating was usually lower.`
- Evidence example: `5 of your last 6 better mornings followed nights without screens logged.`
- Prompt example: `Try one quieter wind-down this week?`

### Recent Entries

- Title: `Recent entries`

### Stats

- Title: `Your rhythm`

### Settings

- Title: `Settings`

## Master Prompt

Paste this first if you want one broad generation pass:

```text
Design a mobile-first wireframe set for a cozy sleep companion app called Dormant. The app helps users understand their own sleep patterns through two short daily check-ins: one before bed and one after waking. The tone should feel calm, warm, gentle, low-pressure, and non-clinical. Avoid dashboards, medical styling, streak mechanics, punishment, or productivity-tracker energy.

The home screen should be companion-centered, with a large illustrated sleep companion in the middle of a soft habitat scene. Around the companion, place a few simple actions: primary check-in, recent entries, insights, settings, and stats. The layout should feel spacious and emotionally inviting, not data-heavy.

Generate these mobile screens:
1. Welcome onboarding screen with companion hero art, title "Meet your sleep companion", short explanatory copy, Skip and Continue buttons.
2. Second onboarding screen where the user can optionally name the companion and learn the two-check-in rhythm.
3. Home screen with companion, habitat, status chip, helper text, and context-aware primary action.
4. Night check-in as a modal bottom sheet with 4 steps: bedtime confirm, mental state, notable inputs, optional note.
5. Morning check-in as a modal bottom sheet with 4 steps: wake time, felt rest, wake difficulty plus interruptions, optional note.
6. Insight bottom sheet with an empty state and a separate earned observation state.
7. Recent entries screen with a simple, soft list of the last 7 days.
8. Stats/history screen that is reflective and gentle, not a quantified-self dashboard.
9. Settings screen with appearance, companion renaming, data export, and a few clearly labeled coming-soon items.

UI requirements:
- rounded cards and large tap targets
- soft gradients or quiet illustrated backgrounds
- warm muted colors like dusk blue, moss green, cream, muted gold, and soft slate
- readable mobile spacing
- bottom sheets should leave part of the home screen visible behind them
- companion reactions should feel acknowledged, not rewarded
- missed check-ins should never show damage or decline

Use clear, polished wireframe-level UI with enough visual personality to feel presentation-ready.
```

## Focused Prompt: Home Screen

```text
Design a mobile app home screen for a cozy sleep companion app called Dormant. Make the companion the central focus, large and emotionally expressive, standing or resting in a soft habitat scene. The interface should feel calm and quiet, with only a few supporting actions around the companion. Include a small status chip like "Tonight" or "This morning", short helper text, and floating or orbiting action buttons for check-in, recent entries, and insights. Include settings and stats access without making the screen feel like a dashboard. The screen should feel warm, spacious, and slightly whimsical, like a wellness app inspired by cozy games rather than clinical sleep tracking.
```

## Focused Prompt: Onboarding

```text
Design two onboarding screens for a mobile sleep companion app called Dormant. Screen one introduces the companion with a spacious, atmospheric layout, a large companion illustration, the title "Meet your sleep companion", a short line about noticing your own sleep patterns over time, and Skip / Continue actions. Screen two lets the user optionally name the companion and explains the two daily check-ins in a simple friendly way. Keep both screens soft, polished, emotionally warm, and non-clinical.
```

## Focused Prompt: Night And Morning Sheets

```text
Design modal bottom-sheet flows for a mobile sleep app called Dormant. Show the sheets over a partially visible home screen with a companion in the background. Create a 4-step night check-in flow and a 4-step morning check-in flow. The night flow asks for bedtime, current mental state, notable sleep-affecting inputs, and an optional note. The morning flow asks for wake time, how rested the user feels, wake difficulty and interruptions, and an optional note. Use large tap targets, rounded chips, soft spacing, a visible step label, and a sticky bottom CTA. The interaction should feel lightweight and calming, not like filling out a survey.
```

## Focused Prompt: Insight And History

```text
Design a mobile insight bottom sheet and a simple history screen for a cozy sleep companion app. The insight sheet should have one state for "not enough data yet" and one state for an earned personal observation based on the user's own logs. The history screen should show recent entries in a soft, readable list that avoids spreadsheet energy. The overall tone should stay warm, gentle, and reflective.
```

## If The Tool Produces Generic Output

Refine with these instructions:

- make it less clinical and less like a health dashboard
- reduce charts and metrics on the home screen
- make the companion much larger and more central
- add more atmosphere and softness to the background
- increase warmth and whimsy slightly
- simplify actions so the flow feels calmer
- replace productivity or streak language with reflective, supportive language
- keep the UI mobile-first and touch-friendly

## Best Generation Order

If the tool works better with smaller prompts, do this:

1. Generate onboarding
2. Generate home screen
3. Generate check-in bottom sheets
4. Generate insight and history
5. Generate settings and stats

## What To Keep When Choosing Between AI Outputs

- the version with the clearest companion-centered home
- the version with the least dashboard clutter
- the version where check-ins look fastest to complete
- the version with the strongest calm tone
- the version that feels most unlike a medical app

## What You Will Probably Need To Fix Manually

- exact copy consistency
- the action priority on the home screen
- whether stats feel too heavy
- whether the companion is too childish or too decorative
- spacing consistency across screens
- making the night and morning flows clearly distinct
