import { NightEntry, MorningEntry, SleepSession } from './types'

const KEYS = {
  companionName: 'dormant_companion_name',
  onboarded: 'dormant_onboarded',
  nightEntries: 'dormant_night_entries',
  morningEntries: 'dormant_morning_entries',
  theme: 'dormant_theme',
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export function isOnboarded(): boolean {
  return read<boolean>(KEYS.onboarded, false)
}

export function setOnboarded(): void {
  write(KEYS.onboarded, true)
}

export function getCompanionName(): string {
  return read<string>(KEYS.companionName, 'your companion')
}

export function setCompanionName(name: string): void {
  write(KEYS.companionName, name || 'your companion')
}

export function getNightEntries(): NightEntry[] {
  return read<NightEntry[]>(KEYS.nightEntries, [])
}

export function getMorningEntries(): MorningEntry[] {
  return read<MorningEntry[]>(KEYS.morningEntries, [])
}

export function saveNightEntry(entry: NightEntry): void {
  const entries = getNightEntries()
  // Replace existing entry for same date if any
  const filtered = entries.filter(e => e.date !== entry.date)
  write(KEYS.nightEntries, [...filtered, entry])
}

export function saveMorningEntry(entry: MorningEntry): void {
  const entries = getMorningEntries()
  const filtered = entries.filter(e => e.date !== entry.date)
  write(KEYS.morningEntries, [...filtered, entry])
}

export function getSessions(): SleepSession[] {
  const nights = getNightEntries()
  const mornings = getMorningEntries()

  const dateSet = new Set([
    ...nights.map(n => n.date),
    ...mornings.map(m => m.date),
  ])

  const sessions: SleepSession[] = Array.from(dateSet).map(date => {
    const night = nights.find(n => n.date === date)
    const morning = mornings.find(m => m.date === date)

    let durationMinutes: number | undefined
    if (night && morning) {
      const [bh, bm] = night.bedtime.split(':').map(Number)
      const [wh, wm] = morning.wakeTime.split(':').map(Number)
      // Bedtime is previous evening, wake is current morning
      const bedMinutes = bh * 60 + bm
      const wakeMinutes = wh * 60 + wm
      // Assume sleep crosses midnight
      durationMinutes = bedMinutes > wakeMinutes
        ? (24 * 60 - bedMinutes) + wakeMinutes
        : wakeMinutes - bedMinutes
    }

    return { date, night, morning, durationMinutes }
  })

  return sessions.sort((a, b) => b.date.localeCompare(a.date))
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

export function getThemePreference(): 'light' | 'dark' | 'auto' {
  return read<'light' | 'dark' | 'auto'>(KEYS.theme, 'auto')
}

export function setThemePreference(theme: 'light' | 'dark' | 'auto'): void {
  write(KEYS.theme, theme)
}

export function clearAllData(): void {
  localStorage.removeItem(KEYS.nightEntries)
  localStorage.removeItem(KEYS.morningEntries)
}

export function seedEntries(nights: NightEntry[], mornings: MorningEntry[]): void {
  write(KEYS.nightEntries, nights)
  write(KEYS.morningEntries, mornings)
}
