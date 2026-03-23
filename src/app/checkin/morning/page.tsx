'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveMorningEntry, getTodayDate } from '@/lib/storage'
import { FeltRest, WakeDifficulty, Interruptions, MorningEntry } from '@/lib/types'
import Link from 'next/link'

const REST_OPTIONS: { value: FeltRest; label: string; emoji: string }[] = [
  { value: 'not-rested', label: 'Not rested', emoji: '😴' },
  { value: 'okay',       label: 'Okay',        emoji: '😑' },
  { value: 'good',       label: 'Good',        emoji: '🙂' },
  { value: 'great',      label: 'Great',       emoji: '😄' },
]

const DIFFICULTY_OPTIONS: { value: WakeDifficulty; label: string }[] = [
  { value: 'easy',      label: 'Easy' },
  { value: 'normal',    label: 'Normal' },
  { value: 'hard',      label: 'Hard' },
  { value: 'very-hard', label: 'Very hard' },
]

const INTERRUPTION_OPTIONS: { value: Interruptions; label: string }[] = [
  { value: 'none',           label: 'None' },
  { value: 'once-or-twice',  label: 'Once or twice' },
  { value: 'several',        label: 'Several times' },
]

function getCurrentTime(): string {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

export default function MorningCheckinPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [wakeTime, setWakeTime] = useState(getCurrentTime)
  const [feltRest, setFeltRest] = useState<FeltRest | null>(null)
  const [wakeDifficulty, setWakeDifficulty] = useState<WakeDifficulty | null>(null)
  const [interruptions, setInterruptions] = useState<Interruptions | null>(null)
  const [note, setNote] = useState('')

  const totalSteps = 4

  function handleComplete() {
    const entry: MorningEntry = {
      id: `m-${Date.now()}`,
      date: getTodayDate(),
      wakeTime,
      feltRest: feltRest ?? 'okay',
      wakeDifficulty: wakeDifficulty ?? 'normal',
      interruptions: interruptions ?? 'none',
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    }
    saveMorningEntry(entry)
    router.push('/checkin/morning/done')
  }

  const canAdvance =
    (step === 1) ||
    (step === 2 && feltRest !== null) ||
    (step === 3 && wakeDifficulty !== null && interruptions !== null) ||
    (step === 4)

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: 'var(--bg)' }}>
      <div className="flex-1 flex items-end">
        <div className="w-full rounded-t-3xl sheet-enter px-6 pt-6 pb-10 flex flex-col"
          style={{ background: 'var(--surface)', minHeight: '75dvh' }}>

          <div className="flex items-center justify-between mb-6">
            <div className="mx-auto w-10 h-1.5 rounded-full absolute top-3 left-1/2 -translate-x-1/2"
              style={{ background: 'var(--border)' }} />
            <Link href="/" className="ml-auto text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)' }}>
              Close
            </Link>
          </div>

          <div className="flex gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span key={i} className="h-1.5 flex-1 rounded-full transition-all"
                style={{ background: i < step ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>

          <div className="flex-1 fade-in" key={step}>
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                    When did you wake up?
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Adjust if needed</p>
                </div>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={e => setWakeTime(e.target.value)}
                  className="w-full px-4 py-5 rounded-2xl text-2xl font-semibold text-center outline-none"
                  style={{
                    background: 'var(--surface-2)',
                    color: 'var(--text)',
                    border: '1.5px solid var(--border)',
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                  How rested do you feel right now?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {REST_OPTIONS.map(opt => (
                    <button key={opt.value}
                      onClick={() => setFeltRest(opt.value)}
                      className="flex flex-col items-center gap-2 py-5 rounded-2xl font-medium text-sm transition-all active:scale-95"
                      style={{
                        background: feltRest === opt.value ? 'var(--accent)' : 'var(--surface-2)',
                        color: feltRest === opt.value ? 'white' : 'var(--text)',
                        border: `1.5px solid ${feltRest === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                      }}>
                      <span className="text-2xl">{opt.emoji}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                  How did waking up go?
                </h2>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: 'var(--text-muted)' }}>
                    Wake difficulty
                  </p>
                  <div className="flex gap-2">
                    {DIFFICULTY_OPTIONS.map(opt => (
                      <button key={opt.value}
                        onClick={() => setWakeDifficulty(opt.value)}
                        className="flex-1 py-3 rounded-xl font-medium text-xs transition-all active:scale-95"
                        style={{
                          background: wakeDifficulty === opt.value ? 'var(--accent)' : 'var(--surface-2)',
                          color: wakeDifficulty === opt.value ? 'white' : 'var(--text)',
                          border: `1.5px solid ${wakeDifficulty === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                        }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: 'var(--text-muted)' }}>
                    Interruptions
                  </p>
                  <div className="flex gap-2">
                    {INTERRUPTION_OPTIONS.map(opt => (
                      <button key={opt.value}
                        onClick={() => setInterruptions(opt.value)}
                        className="flex-1 py-3 rounded-xl font-medium text-xs transition-all active:scale-95"
                        style={{
                          background: interruptions === opt.value ? 'var(--accent)' : 'var(--surface-2)',
                          color: interruptions === opt.value ? 'white' : 'var(--text)',
                          border: `1.5px solid ${interruptions === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                        }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                    Anything else to remember?
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Completely optional</p>
                </div>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Optional note…"
                  rows={4}
                  className="w-full px-4 py-4 rounded-2xl text-sm outline-none resize-none leading-relaxed"
                  style={{
                    background: 'var(--surface-2)',
                    color: 'var(--text)',
                    border: '1.5px solid var(--border)',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            {step < totalSteps ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canAdvance}
                className="w-full py-4 rounded-2xl font-semibold text-white text-base transition-all active:scale-95 disabled:opacity-40"
                style={{ background: 'var(--accent)' }}>
                Continue
              </button>
            ) : (
              <>
                <button onClick={handleComplete}
                  className="w-full py-4 rounded-2xl font-semibold text-white text-base transition-all active:scale-95"
                  style={{ background: 'var(--accent)' }}>
                  Done
                </button>
                <button onClick={() => { setNote(''); handleComplete() }}
                  className="w-full py-3 rounded-2xl font-medium text-sm transition-opacity hover:opacity-60"
                  style={{ color: 'var(--text-muted)' }}>
                  Skip note
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
