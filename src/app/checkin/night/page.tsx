'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveNightEntry, getTodayDate } from '@/lib/storage'
import { MentalState, SleepInput, NightEntry } from '@/lib/types'
import Link from 'next/link'

const MENTAL_OPTIONS: { value: MentalState; label: string; emoji: string }[] = [
  { value: 'calm',    label: 'Calm',    emoji: '😌' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
  { value: 'wired',   label: 'Wired',   emoji: '⚡' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
]

const INPUT_OPTIONS: { value: SleepInput; label: string; emoji: string }[] = [
  { value: 'caffeine',  label: 'Caffeine',      emoji: '☕' },
  { value: 'alcohol',   label: 'Alcohol',        emoji: '🍷' },
  { value: 'exercise',  label: 'Exercise',       emoji: '🏃' },
  { value: 'screens',   label: 'Screens late',   emoji: '📱' },
  { value: 'none',      label: 'None of these',  emoji: '✨' },
]

function getCurrentTime(): string {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

export default function NightCheckinPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [bedtime, setBedtime] = useState(getCurrentTime)
  const [mentalState, setMentalState] = useState<MentalState | null>(null)
  const [inputs, setInputs] = useState<SleepInput[]>([])
  const [note, setNote] = useState('')

  const totalSteps = 4

  function toggleInput(val: SleepInput) {
    if (val === 'none') {
      setInputs(['none'])
      return
    }
    setInputs(prev => {
      const without = prev.filter(v => v !== 'none')
      return without.includes(val) ? without.filter(v => v !== val) : [...without, val]
    })
  }

  function handleNext() {
    if (step < totalSteps) setStep(s => s + 1)
  }

  function handleComplete() {
    const entry: NightEntry = {
      id: `n-${Date.now()}`,
      date: getTodayDate(),
      bedtime,
      mentalState: mentalState ?? 'neutral',
      inputs: inputs.length > 0 ? inputs : ['none'],
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    }
    saveNightEntry(entry)
    router.push('/checkin/night/done')
  }

  const canAdvance =
    (step === 1) ||
    (step === 2 && mentalState !== null) ||
    (step === 3 && inputs.length > 0) ||
    (step === 4)

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: 'var(--bg)' }}>
      {/* Backdrop — simulates home screen behind sheet */}
      <div className="flex-1 flex items-end">
        {/* Sheet */}
        <div className="w-full rounded-t-3xl sheet-enter px-6 pt-6 pb-10 flex flex-col"
          style={{ background: 'var(--surface)', minHeight: '75dvh' }}>

          {/* Drag handle + close */}
          <div className="flex items-center justify-between mb-6">
            <div className="mx-auto w-10 h-1.5 rounded-full absolute top-3 left-1/2 -translate-x-1/2"
              style={{ background: 'var(--border)' }} />
            <Link href="/" className="ml-auto text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)' }}>
              Close
            </Link>
          </div>

          {/* Step indicator */}
          <div className="flex gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span key={i} className="h-1.5 flex-1 rounded-full transition-all"
                style={{ background: i < step ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1 fade-in" key={step}>
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                    When are you heading to sleep?
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Adjust if needed</p>
                </div>
                <input
                  type="time"
                  value={bedtime}
                  onChange={e => setBedtime(e.target.value)}
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
                  How is your mind feeling?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {MENTAL_OPTIONS.map(opt => (
                    <button key={opt.value}
                      onClick={() => setMentalState(opt.value)}
                      className="flex flex-col items-center gap-2 py-5 rounded-2xl font-medium text-sm transition-all active:scale-95"
                      style={{
                        background: mentalState === opt.value ? 'var(--accent)' : 'var(--surface-2)',
                        color: mentalState === opt.value ? 'white' : 'var(--text)',
                        border: `1.5px solid ${mentalState === opt.value ? 'var(--accent)' : 'var(--border)'}`,
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
                  Anything that might affect sleep tonight?
                </h2>
                <div className="flex flex-col gap-3">
                  {INPUT_OPTIONS.map(opt => {
                    const selected = inputs.includes(opt.value)
                    return (
                      <button key={opt.value}
                        onClick={() => toggleInput(opt.value)}
                        className="flex items-center gap-4 px-5 py-4 rounded-2xl font-medium text-sm transition-all active:scale-95"
                        style={{
                          background: selected ? 'var(--accent)' : 'var(--surface-2)',
                          color: selected ? 'white' : 'var(--text)',
                          border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                        }}>
                        <span className="text-xl">{opt.emoji}</span>
                        {opt.label}
                      </button>
                    )
                  })}
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

          {/* CTA */}
          <div className="flex flex-col gap-3 mt-6">
            {step < totalSteps ? (
              <button onClick={handleNext} disabled={!canAdvance}
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
