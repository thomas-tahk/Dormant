'use client'

import { useEffect, useState } from 'react'
import { getSessions } from '@/lib/storage'
import { getObservationState, deriveObservation } from '@/lib/observations'
import { SleepSession, Observation } from '@/lib/types'
import { SEED_NIGHTS, SEED_MORNINGS } from '@/lib/seed'
import { seedEntries } from '@/lib/storage'
import Link from 'next/link'

const SLEEP_FACTS = [
  'Adults need 7–9 hours of sleep per night according to sleep researchers.',
  'Your body temperature drops slightly as you fall asleep.',
  'Consistent sleep and wake times help regulate your internal clock.',
  'Caffeine has a half-life of about 5–6 hours in most people.',
  'Even one night of poor sleep can affect mood and focus the next day.',
  'REM sleep plays a key role in memory consolidation.',
]

export default function InsightsPage() {
  const [sessions, setSessions] = useState<SleepSession[]>([])
  const [observation, setObservation] = useState<Observation | null>(null)
  const [state, setState] = useState<'empty' | 'learning' | 'ready'>('empty')
  const [fact] = useState(() => SLEEP_FACTS[Math.floor(Math.random() * SLEEP_FACTS.length)])
  const [seeded, setSeeded] = useState(false)

  function loadData() {
    const s = getSessions()
    setSessions(s)
    setState(getObservationState(s))
    setObservation(deriveObservation(s))
  }

  useEffect(() => { loadData() }, [])

  function handleSeedData() {
    seedEntries(SEED_NIGHTS, SEED_MORNINGS)
    setSeeded(true)
    loadData()
  }

  const completeSessions = sessions.filter(s => s.night && s.morning).length

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: 'var(--bg)' }}>
      <div className="flex-1 flex items-end">
        <div className="w-full rounded-t-3xl sheet-enter px-6 pt-6 pb-12 flex flex-col gap-6"
          style={{ background: 'var(--surface)', minHeight: '70dvh' }}>

          {/* Handle + close */}
          <div className="relative flex items-center justify-center mb-2">
            <div className="w-10 h-1.5 rounded-full"
              style={{ background: 'var(--border)' }} />
            <Link href="/" className="absolute right-0 text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)' }}>
              Close
            </Link>
          </div>

          {state === 'empty' && (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <span className="text-5xl">🌱</span>
              <div>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                  Still learning your rhythm
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  A few more check-ins will help Dormant notice patterns that are actually yours.
                </p>
              </div>
              <FactCard fact={fact} />
            </div>
          )}

          {state === 'learning' && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                  Still learning your rhythm
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {completeSessions} of 5 nights logged — almost there.
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full" style={{ background: 'var(--surface-2)' }}>
                <div className="h-2 rounded-full transition-all"
                  style={{ background: 'var(--accent)', width: `${(completeSessions / 5) * 100}%` }} />
              </div>

              <FactCard fact={fact} />
            </div>
          )}

          {state === 'ready' && observation && (
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--accent)' }}>
                Your pattern
              </span>
              <ObservationCard observation={observation} />
            </div>
          )}

          {/* Demo seed button */}
          {!seeded && state !== 'ready' && (
            <div className="mt-auto pt-4">
              <div className="p-4 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                  Demo mode
                </p>
                <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                  Load 7 nights of sample data to see how insights work.
                </p>
                <button onClick={handleSeedData}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all active:scale-95"
                  style={{ background: 'var(--accent)' }}>
                  Load demo data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FactCard({ fact }: { fact: string }) {
  return (
    <div className="w-full p-4 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
        Sleep fact
      </p>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {fact}
      </p>
    </div>
  )
}

function ObservationCard({ observation }: { observation: Observation }) {
  return (
    <div className="p-5 rounded-2xl flex flex-col gap-4"
      style={{ background: 'var(--surface-2)', border: '1.5px solid color-mix(in srgb, var(--accent) 40%, transparent)' }}>
      <div>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
          {observation.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
          {observation.body}
        </p>
      </div>

      <div className="p-3 rounded-xl" style={{ background: 'var(--surface)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {observation.evidence}
        </p>
      </div>

      <p className="text-sm font-medium italic" style={{ color: 'var(--accent)' }}>
        {observation.prompt}
      </p>
    </div>
  )
}
