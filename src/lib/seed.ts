import { NightEntry, MorningEntry } from './types'

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

export const SEED_NIGHTS: NightEntry[] = [
  {
    id: 'n1', date: daysAgo(7), bedtime: '23:45',
    mentalState: 'wired', inputs: ['screens', 'caffeine'],
    note: 'Worked late, hard to wind down.', createdAt: daysAgo(7),
  },
  {
    id: 'n2', date: daysAgo(6), bedtime: '23:30',
    mentalState: 'neutral', inputs: ['screens'],
    createdAt: daysAgo(6),
  },
  {
    id: 'n3', date: daysAgo(5), bedtime: '22:15',
    mentalState: 'calm', inputs: ['none'],
    note: 'Read before bed.', createdAt: daysAgo(5),
  },
  {
    id: 'n4', date: daysAgo(4), bedtime: '22:00',
    mentalState: 'calm', inputs: ['exercise'],
    createdAt: daysAgo(4),
  },
  {
    id: 'n5', date: daysAgo(3), bedtime: '23:50',
    mentalState: 'anxious', inputs: ['screens', 'caffeine'],
    note: 'Anxious about a deadline.', createdAt: daysAgo(3),
  },
  {
    id: 'n6', date: daysAgo(2), bedtime: '22:30',
    mentalState: 'calm', inputs: ['none'],
    createdAt: daysAgo(2),
  },
  {
    id: 'n7', date: daysAgo(1), bedtime: '22:10',
    mentalState: 'neutral', inputs: ['exercise'],
    createdAt: daysAgo(1),
  },
]

export const SEED_MORNINGS: MorningEntry[] = [
  {
    id: 'm1', date: daysAgo(7), wakeTime: '07:55',
    feltRest: 'not-rested', wakeDifficulty: 'hard', interruptions: 'once-or-twice',
    createdAt: daysAgo(7),
  },
  {
    id: 'm2', date: daysAgo(6), wakeTime: '07:40',
    feltRest: 'okay', wakeDifficulty: 'normal', interruptions: 'none',
    createdAt: daysAgo(6),
  },
  {
    id: 'm3', date: daysAgo(5), wakeTime: '07:00',
    feltRest: 'great', wakeDifficulty: 'easy', interruptions: 'none',
    note: 'Felt genuinely rested.', createdAt: daysAgo(5),
  },
  {
    id: 'm4', date: daysAgo(4), wakeTime: '06:50',
    feltRest: 'good', wakeDifficulty: 'easy', interruptions: 'none',
    createdAt: daysAgo(4),
  },
  {
    id: 'm5', date: daysAgo(3), wakeTime: '08:10',
    feltRest: 'not-rested', wakeDifficulty: 'very-hard', interruptions: 'several',
    createdAt: daysAgo(3),
  },
  {
    id: 'm6', date: daysAgo(2), wakeTime: '07:05',
    feltRest: 'good', wakeDifficulty: 'easy', interruptions: 'none',
    createdAt: daysAgo(2),
  },
  {
    id: 'm7', date: daysAgo(1), wakeTime: '06:55',
    feltRest: 'great', wakeDifficulty: 'easy', interruptions: 'none',
    createdAt: daysAgo(1),
  },
]
