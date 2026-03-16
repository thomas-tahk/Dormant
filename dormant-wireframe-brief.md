# Dormant Wireframe Brief

## Generated Wireframes

- **Figma Make – First rough pass:** https://www.figma.com/make/o9tYLtj5IexelXdYQA26Wd/Dormant-Sleep-Companion-App?t=u4Z2gnfMnJxGny6c-1

## Context

This document translates the current Dormant concept into a wireframe-ready screen brief. It is based on:

- [sleep-health-capstone-brief.md](/Users/tnt/Projects/Dormant/sleep-health-capstone-brief.md)
- [dormant-concept.docx](/Users/tnt/Projects/Dormant/dormant-concept.docx)
- the screen outline discussed in chat

Where those sources differ, the Dormant concept doc takes priority on product philosophy:

- no fail states
- approach motivation over guilt
- insights must be derived from the user's own data
- the companion reflects sleep patterns, but does not punish absence

## Product Frame

- Platform: mobile-first app
- Core loop: night check-in, sleep, morning check-in, earned observation
- Core emotional tone: cozy, calm, non-clinical
- Core UX goal: repeated daily logging should feel lightweight enough to sustain
- Core differentiator: self-report data becomes personal observations, not generic advice

## Experience Principles

- The companion is the emotional anchor and primary home-screen focal point.
- Logging should feel acknowledged with small companion reactions, not form submission.
- Missing a day should pause progress, not create visible damage.
- The app should say only what it has enough data to know.
- Stats and insights should support reflection, not optimization anxiety.

## Recommended Information Architecture

1. Onboarding
2. Home hub
3. Night check-in sheet
4. Morning check-in sheet
5. Recent entries / edit
6. Insight sheet
7. Stats / history
8. Settings

## Wireframe Set

### 1. Onboarding A: Welcome

**Goal:** establish emotional tone, companion, and low-stakes purpose.

**Layout**

- Progress indicator `1/2`
- Large companion placeholder silhouette centered in a sparse habitat
- Title: `Meet your sleep companion`
- Short supporting copy explaining that Dormant helps users notice their own patterns over time
- Secondary action: `Skip`
- Primary action: `Continue`

**Interactions**

- Tapping the companion can trigger a tiny idle response only
- `Skip` moves to the next onboarding step or directly into the app
- `Continue` advances to onboarding B

**Wireframe note**

- Keep this quiet and spacious. The companion should read as the central system metaphor immediately.

### 2. Onboarding B: Name + Two Check-ins

**Goal:** personalize the companion and explain the daily rhythm.

**Layout**

- Progress indicator `2/2`
- Heading: `Name your companion`
- Text input with an obviously optional placeholder
- Helper text: `Optional. You can rename them later.`
- Divider
- Two bullet explainers:
  - `At night`: log bedtime, mindset, and anything that may affect sleep
  - `In the morning`: log wake time and how rested you feel
- Primary CTA: `Enter app`
- Secondary CTA: `Skip naming`

**Interactions**

- The name field is optional
- `Enter app` saves a provided name and routes to home
- `Skip naming` uses a default fallback name

**Recommendation**

- Avoid opening the keyboard if it pushes the explainer below the fold on smaller screens.

### 3. Home Screen: Hub

**Goal:** create one stable home for mood, action, and progress.

**Layout**

- Top-left: settings gear
- Top-right: stats or journal icon
- Center: large companion
- Behind companion: habitat scene, sparse by default
- Around companion:
  - speech bubble icon -> primary context-aware check-in
  - pencil/edit icon -> recent entries
  - lightbulb icon -> insight sheet
- Bottom helper area:
  - status chip like `Tonight`, `This morning`, or `All set`
  - short helper text that cues the next action

**Companion states**

- sleeping
- rested
- neutral
- tired

**Habitat logic**

- Initial habitat is quiet and minimal
- Growth should track steady participation or observation milestones, not perfect sleep
- If the user stops logging, the scene remains paused rather than degrading

**Interactions**

- Speech bubble:
  - evening window -> night check-in
  - morning window -> morning check-in
  - after both are complete -> confirmation or soft review state
- Pencil -> last 7 days list
- Lightbulb -> insight bottom sheet
- Gear -> settings
- Stats/journal icon -> stats screen
- Tap companion -> idle animation or short status hint

**Wireframe note**

- Do not turn this into a metrics dashboard. The home screen should stay emotional and action-first.

### 4. Night Check-in: "Tucking In" Bottom Sheet

**Pattern**

- Modal bottom sheet over the home screen
- Grab handle at top
- Step indicator like `1 of 4`
- Persistent primary CTA
- Home screen and companion remain partially visible behind the sheet

**Step 1: Bedtime confirm**

- Title: `When are you heading to sleep?`
- Time picker prefilled from device time
- Small supporting copy: `Adjust if needed`

**Step 2: Mental state**

- Title: `How is your mind feeling?`
- Four large tap targets:
  - calm
  - neutral
  - wired
  - anxious

**Step 3: Notable inputs**

- Title: `Anything that might affect sleep tonight?`
- Multi-select chips:
  - caffeine
  - alcohol
  - exercise
  - screens
  - none of the above

**Step 4: Optional note**

- Title: `Anything else to remember?`
- Multiline text field
- Explicit `Skip` action

**Completion**

- Companion visibly settles in
- Message: `Good night`
- Short supportive copy
- CTA: `Done`

**Dormant-specific note**

- The reaction should feel like acknowledgement, not reward. Small settling motion is enough.

### 5. Morning Check-in: "Waking Up" Bottom Sheet

**Pattern**

- Same sheet shell as the night flow

**Step 1: Wake time confirm**

- Title: `When did you wake up?`
- Time picker prefilled from device time

**Step 2: Rested feeling**

- Title: `How rested do you feel right now?`
- Four large tap targets:
  - not rested
  - okay
  - good
  - great

**Step 3: Difficulty + interruptions**

- Title: `How did waking up go?`
- Group A: wake difficulty
  - easy
  - normal
  - hard
  - very hard
- Group B: interruptions
  - none
  - once or twice
  - several times

**Step 4: Optional note**

- Same pattern as night flow

**Completion**

- Companion wakes up and shifts pose/state based on reported rest
- Message: `Good morning`
- CTA: `Done`

**Recommendation**

- Keep wake difficulty and interruptions visually separated enough that users do not read them as one scale.

### 6. Recent Entries / Edit

**Goal:** let users correct logs without making the app feel like a spreadsheet.

**Layout**

- Title: `Recent entries`
- Last 7 days list
- Each row includes:
  - date
  - check-in type: night or morning
  - short summary, for example `11:41 PM • Wired • Screens`
- Tap any row -> prefilled edit form using the same structure as the original flow
- Footer actions: `Cancel`, `Save`

**Recommendation**

- If both night and morning logs exist for one date, show them as separate rows to avoid confusion.

### 7. Insight Panel Bottom Sheet

**Pattern**

- Dismissible bottom sheet
- Single card presentation

**State A: Not enough data yet**

- Small illustration area
- Title: `Still learning your rhythm`
- Supportive one-line body copy
- Sleep trivia or fact card below or within the card

**State B: Enough data**

- Personalized observation card derived from the user's logs
- Example pattern:
  - observation: `On nights you logged screens late, your morning rest rating was usually lower.`
  - evidence: `5 of your last 6 better mornings followed nights without screens logged.`
  - soft prompt: `Try one quieter wind-down this week?`

**Interactions**

- Swipe down or tap outside to dismiss
- Optional `View history` or `See stats` CTA if a second path is useful

**Dormant-specific note**

- This should read as an earned observation, not a generic recommendation engine.

### 8. Stats / History Screen

**Goal:** support reflection while staying softer than a quantified-self dashboard.

**Layout**

- Calendar strip at top, color-coded by sleep quality or companion state
- Key stats:
  - avg duration
  - avg felt quality
  - consistency score
- Last 7 nights list:
  - date
  - duration
  - quality label or colored marker
- Bottom CTA: `Export JSON`

**Interactions**

- Tap a calendar day for a simple detail state
- Tap a list row to open that entry in edit mode
- Tap export to trigger share/export

**Recommendation**

- Label `consistency score` clearly or rename it before high-fidelity design if the formula is still fuzzy.

### 9. Settings Screen

**Layout**

- Appearance
  - Dark / Light / System
- Sound
  - Master volume slider
  - Check-in sounds slider, disabled with `Coming soon`
  - Ambient sounds slider, disabled with `Coming soon`
- Check-ins
  - Night reminder time picker, disabled with `Coming soon`
  - Morning reminder time picker, disabled with `Coming soon`
- Companion
  - Rename companion text input
- Data
  - Export data button

**Interactions**

- Disabled controls stay visible but clearly inactive
- Rename companion saves inline or with a compact `Save` button

**Recommendation**

- If reminders will not exist in v0.1, consider one collapsed `Reminders coming soon` card rather than several disabled controls.

## Cross-Screen Interaction Notes

- The speech-bubble action should always surface the highest-priority next check-in.
- Bottom sheets should preserve a visible slice of the home screen so the companion remains present.
- Optional notes must always include a visible skip path.
- Completion states should change companion pose immediately.
- Edit forms should reuse original check-in layout to reduce cognitive friction.
- Empty states should always include either supportive copy, a fact card, or a companion reaction.

## Product Decisions To Lock Soon

### 1. Home CTA timing logic

Define exactly when the primary home action becomes:

- `Tuck in`
- `Wake up`
- `All set`

Without that rule, the hub stays ambiguous in both design and implementation.

### 2. What date a sleep record belongs to

Choose whether a record is anchored to:

- the bedtime date, or
- the wake date

Wake date is often easier for reflection, but either works if applied consistently.

### 3. Observation threshold

The concept doc suggests:

- one useful observation after about 7+ logged nights for the capstone
- richer personal observations after roughly 2-3 weeks for a fuller product

The wireframes should explicitly represent the v0.1 threshold you want to demo.

### 4. Habitat growth rules

Because Dormant rejects punishment mechanics, habitat changes should align with:

- steady participation
- earned observations
- companion state changes

not with deprivation or loss after missed days.

## Inspiration Map

These are reference points for specific patterns, not direct templates.

### Mascot-centered home and companion-first design

- Finch App Store: strong example of a companion-centered home and low-pressure self-care framing  
  https://apps.apple.com/us/app/finch-self-care-pet/id1528595748
- Finch home-page help article: useful for how actions can orbit the companion without overcrowding the screen  
  https://help.finchcare.com/hc/en-us/articles/37780000231309-Exploring-the-Finch-Home-Page
- Pokemon Sleep official site: sleep-themed character framing and soft habitat/world-building  
  https://www.pokemonsleep.net/en/
- Pokemon Sleep App Store: wake-state framing and playful sleep feedback loop  
  https://apps.apple.com/us/app/pok%C3%A9mon-sleep/id1579464667

### Cozy, calm wellness tone

- Headspace App Store: accessible onboarding tone and non-clinical sleep positioning  
  https://apps.apple.com/us/app/headspace-meditation-sleep/id493145008
- Calm sleep product page: quiet, low-pressure sleep content framing  
  https://www.calm.com/sleep

### Short repeated check-ins

- Daylio App Store: low-friction mood/activity logging and optional note behavior  
  https://apps.apple.com/us/app/daylio-journal-mood-tracker/id1194023242
- VA Insomnia Coach: relevant for sleep logging scope and symptom-guidance framing, even if Dormant is intentionally softer and less clinical  
  https://mobile.va.gov/app/insomnia-coach

### Insight and stats framing

- RISE App Store: examples of turning sleep data into interpretation rather than raw display  
  https://apps.apple.com/us/app/rise-sleep-tracker/id1453884781
- Sleep Cycle App Store: trend summaries, historical views, and sleep-log framing  
  https://apps.apple.com/us/app/sleep-cycle-tracker-sounds/id320606217
- Fitbit App Store: compact metrics and daily trend patterns  
  https://apps.apple.com/us/app/fitbit-health-fitness/id462638897

### Mobile pattern guidance

- Material bottom sheets: behavior and structure guidance for modal bottom sheets  
  https://m1.material.io/components/bottom-sheets.html
- Apple design tips: touch targets and readability guidance relevant to the large option controls  
  https://developer.apple.com/design/tips/

## Mobbin Note

Mobbin remains useful for more exact examples of:

- onboarding sequences
- bottom-sheet forms
- empty states
- simple mobile stats layouts

I did not use it as a primary reference here because the official/public links above are more stable and directly openable.

## Suggested Next Deliverables

1. Convert this brief into grayscale low-fidelity wireframes.
2. Turn it into a Figma-ready screen inventory and component list.
3. Build a clickable prototype with local fake data to validate the loop.
