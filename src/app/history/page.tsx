'use client'

import { useEffect, useState } from 'react'
import { getSessions } from '@/lib/storage'
import { SleepSession } from '@/lib/types'
import Link from 'next/link'

const REST_LABELS: Record<string, string> = {
  'not-rested': 'Not rested',
  'okay': 'Okay',
  'good': 'Good',
  'great': 'Great',
}

const REST_COLORS: Record<string, string> = {
  'not-rested': '#E07070',
  'okay': '#D4A050',
  'good': '#7BAA6E',
  'great': '#5A8FD4',
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  if (dateStr === today.toISOString().split('T')[0]) return 'Today'
  if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday'

  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function SessionRow({ session }: { session: SleepSession }) {
  const hasNight = !!session.night
  const hasMorning = !!session.morning

  return (
    <div className="p-4 rounded-2xl flex flex-col gap-3"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          {formatDate(session.date)}
        </span>
        {session.durationMinutes && (
          <span className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            {formatDuration(session.durationMinutes)}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {hasNight && (
          <div className="flex items-center gap-2 flex-1 p-3 rounded-xl"
            style={{ background: 'var(--surface-2)' }}>
            <span className="text-base">🌙</span>
            <div className="flex flex-col">
              <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                {session.night!.bedtime}
              </span>
              <span className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                {session.night!.mentalState}
                {session.night!.inputs.length > 0 && !session.night!.inputs.includes('none')
                  ? ` · ${session.night!.inputs.join(', ')}`
                  : ''}
              </span>
            </div>
          </div>
        )}

        {hasMorning && (
          <div className="flex items-center gap-2 flex-1 p-3 rounded-xl"
            style={{ background: 'var(--surface-2)' }}>
            <span className="text-base">☀️</span>
            <div className="flex flex-col">
              <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                {session.morning!.wakeTime}
              </span>
              <span className="text-xs font-medium"
                style={{ color: REST_COLORS[session.morning!.feltRest] }}>
                {REST_LABELS[session.morning!.feltRest]}
              </span>
            </div>
          </div>
        )}

        {hasNight && !hasMorning && (
          <div className="flex items-center gap-2 flex-1 p-3 rounded-xl opacity-40"
            style={{ background: 'var(--surface-2)', border: '1.5px dashed var(--border)' }}>
            <span className="text-base">☀️</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Morning pending
            </span>
          </div>
        )}

        {!hasNight && hasMorning && (
          <div className="flex items-center gap-2 flex-1 p-3 rounded-xl opacity-40"
            style={{ background: 'var(--surface-2)', border: '1.5px dashed var(--border)' }}>
            <span className="text-base">🌙</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Night not logged
            </span>
          </div>
        )}
      </div>

      {(session.night?.note || session.morning?.note) && (
        <p className="text-xs leading-relaxed px-1 italic" style={{ color: 'var(--text-muted)' }}>
          &ldquo;{session.night?.note || session.morning?.note}&rdquo;
        </p>
      )}
    </div>
  )
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SleepSession[]>([])

  useEffect(() => {
    setSessions(getSessions().slice(0, 7))
  }, [])

  return (
    <main className="flex flex-col min-h-dvh" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-12 pb-4">
        <Link href="/" aria-label="Back"
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Recent entries</h1>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 px-6 pb-12">
        {sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <span className="text-4xl">🌙</span>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No entries yet. Start with tonight&apos;s check-in.
            </p>
            <Link href="/checkin/night"
              className="px-6 py-3 rounded-2xl font-semibold text-white text-sm transition-all active:scale-95"
              style={{ background: 'var(--accent)' }}>
              Tuck in
            </Link>
          </div>
        )}
        {sessions.map(session => (
          <SessionRow key={session.date} session={session} />
        ))}
      </div>
    </main>
  )
}
