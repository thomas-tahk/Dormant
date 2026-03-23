export type MentalState = 'calm' | 'neutral' | 'wired' | 'anxious'
export type SleepInput = 'caffeine' | 'alcohol' | 'exercise' | 'screens' | 'none'
export type FeltRest = 'not-rested' | 'okay' | 'good' | 'great'
export type WakeDifficulty = 'easy' | 'normal' | 'hard' | 'very-hard'
export type Interruptions = 'none' | 'once-or-twice' | 'several'
export type CompanionState = 'sleeping' | 'resting' | 'neutral' | 'happy'

export interface NightEntry {
  id: string
  date: string        // ISO date string (wake date)
  bedtime: string     // HH:MM
  mentalState: MentalState
  inputs: SleepInput[]
  note?: string
  createdAt: string
}

export interface MorningEntry {
  id: string
  date: string        // ISO date string (wake date)
  wakeTime: string    // HH:MM
  feltRest: FeltRest
  wakeDifficulty: WakeDifficulty
  interruptions: Interruptions
  note?: string
  createdAt: string
}

export interface SleepSession {
  date: string
  night?: NightEntry
  morning?: MorningEntry
  durationMinutes?: number
}

export interface Observation {
  title: string
  body: string
  evidence: string
  prompt: string
}
