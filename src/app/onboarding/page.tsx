'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setOnboarded, setCompanionName } from '@/lib/storage'
import DogCompanion from '@/components/companion/DogCompanion'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')

  function handleEnterApp() {
    setCompanionName(name.trim() || 'your companion')
    setOnboarded()
    router.replace('/')
  }

  if (step === 1) {
    return (
      <main className="flex flex-col min-h-dvh items-center px-6 text-center"
        style={{ background: 'var(--bg)' }}>
        {/* Skip */}
        <div className="w-full flex justify-end pt-12 pb-2">
          <button onClick={() => setStep(2)}
            className="text-sm font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-60"
            style={{ color: 'var(--text-muted)' }}>
            Skip
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-8">
          <span className="w-6 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          <span className="w-6 h-1.5 rounded-full opacity-30" style={{ background: 'var(--accent)' }} />
        </div>

        {/* Companion */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute rounded-full pointer-events-none"
            style={{
              width: 260, height: 260,
              background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)',
              opacity: 0.18,
            }} />
          <DogCompanion state="happy" size={200} />
        </div>

        {/* Copy */}
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
          Meet your sleep companion
        </h1>
        <p className="text-sm leading-relaxed max-w-xs mb-12" style={{ color: 'var(--text-muted)' }}>
          Dormant helps you notice your own sleep patterns over time — with two quick daily check-ins and no pressure.
        </p>

        <button onClick={() => setStep(2)}
          className="w-full max-w-xs py-4 rounded-2xl font-semibold text-white text-base transition-all active:scale-95 hover:opacity-90"
          style={{ background: 'var(--accent)' }}>
          Continue
        </button>
      </main>
    )
  }

  return (
    <main className="flex flex-col min-h-dvh px-6" style={{ background: 'var(--bg)' }}>
      <div className="pt-12 pb-2 flex justify-end">
        <button onClick={handleEnterApp}
          className="text-sm font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-60"
          style={{ color: 'var(--text-muted)' }}>
          Skip naming
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        <span className="w-6 h-1.5 rounded-full opacity-30" style={{ background: 'var(--accent)' }} />
        <span className="w-6 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
      </div>

      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
        Name your companion
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        Optional — you can rename them later in settings.
      </p>

      {/* Name input */}
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        maxLength={24}
        placeholder="Optional name"
        className="w-full px-4 py-4 rounded-2xl text-base outline-none mb-8 font-medium"
        style={{
          background: 'var(--surface)',
          color: 'var(--text)',
          border: '1.5px solid var(--border)',
        }}
        onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
      />

      {/* Explainers */}
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: 'var(--surface)' }}>
          <span className="text-xl mt-0.5">🌙</span>
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>At night</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Log your bedtime, how your mind is feeling, and anything that might affect sleep.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: 'var(--surface)' }}>
          <span className="text-xl mt-0.5">☀️</span>
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>In the morning</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Log your wake time and how rested you feel. That's it.
            </p>
          </div>
        </div>
      </div>

      <button onClick={handleEnterApp}
        className="w-full py-4 rounded-2xl font-semibold text-white text-base transition-all active:scale-95 hover:opacity-90"
        style={{ background: 'var(--accent)' }}>
        Enter app
      </button>
    </main>
  )
}
