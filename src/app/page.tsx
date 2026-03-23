'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isOnboarded, getSessions, getCompanionName, getTodayDate } from '@/lib/storage'
import { getCompanionStateFromSessions } from '@/lib/observations'
import Companion from '@/components/companion/Companion'
import Habitat from '@/components/companion/Habitat'
import { CompanionState } from '@/lib/types'
import Link from 'next/link'

function getCheckinStatus(todayDate: string, sessions: ReturnType<typeof getSessions>) {
  const today = sessions.find(s => s.date === todayDate)
  const hasNight = !!today?.night
  const hasMorning = !!today?.morning

  if (hasNight && hasMorning) {
    return { label: 'All set', hint: 'All caught up. Check your entries or insights anytime.', action: null }
  }

  const hour = new Date().getHours()
  const isMorning = hour >= 2 && hour < 12

  if (isMorning && !hasMorning) {
    return {
      label: 'This morning',
      hint: 'How did you wake up? Log your morning check-in when you\'re ready.',
      action: { href: '/checkin/morning', text: 'Morning check-in' },
    }
  }

  if (hasNight && !hasMorning) {
    return {
      label: 'This morning',
      hint: 'You logged last night. Add your morning check-in when you\'re ready.',
      action: { href: '/checkin/morning', text: 'Morning check-in' },
    }
  }

  return {
    label: 'Tonight',
    hint: 'A quick check-in helps Dormant learn your rhythm.',
    action: { href: '/checkin/night', text: 'Tuck in' },
  }
}

export default function HomePage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [companionName, setCompanionName] = useState('your companion')
  const [status, setStatus] = useState<ReturnType<typeof getCheckinStatus> | null>(null)
  const [companionState, setCompanionState] = useState<CompanionState>('neutral')
  const [habitatLevel, setHabitatLevel] = useState(0)

  useEffect(() => {
    if (!isOnboarded()) {
      router.replace('/onboarding')
      return
    }
    const sessions = getSessions()
    const today = getTodayDate()
    setCompanionName(getCompanionName())
    setStatus(getCheckinStatus(today, sessions))
    setCompanionState(getCompanionStateFromSessions(sessions))
    setHabitatLevel(sessions.filter(s => s.night && s.morning).length)
    setReady(true)
  }, [router])

  if (!ready) return null

  return (
    <main className="flex flex-col min-h-dvh" style={{ background: 'var(--bg)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-12 pb-2">
        <Link href="/settings" aria-label="Settings"
          className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
          style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </Link>

        <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--accent)' }}>
          dormant
        </span>

        <Link href="/history" aria-label="Recent entries"
          className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
          style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </Link>
      </div>

      {/* Companion area */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 relative">
        {/* Soft habitat glow */}
        <div className="absolute rounded-full pointer-events-none"
          style={{
            width: 280, height: 280,
            background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)',
            opacity: 0.15,
          }} />

        <Habitat sessionCount={habitatLevel} />

        <Companion state={companionState} size={210} />

        {/* Companion name */}
        <p className="text-sm mt-3 font-medium" style={{ color: 'var(--text-muted)' }}>
          {companionName}
        </p>

        {/* Floating action: insights */}
        <Link href="/insights"
          aria-label="View insights"
          className="absolute right-8 top-1/2 -translate-y-12 w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95"
          style={{ background: 'var(--surface)', color: 'var(--accent)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2L15 17H9l-.5-1.8A7 7 0 0 1 12 2z"/>
          </svg>
        </Link>
      </div>

      {/* Status + CTA */}
      <div className="px-6 pb-12 flex flex-col items-center gap-4">
        {status && (
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
            style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}>
            {status.label}
          </span>
        )}

        {status && (
          <p className="text-center text-sm leading-relaxed max-w-[280px]" style={{ color: 'var(--text-muted)' }}>
            {status.hint}
          </p>
        )}

        {status?.action && (
          <Link href={status.action.href}
            className="w-full max-w-[280px] py-4 rounded-2xl text-center font-semibold text-white text-base transition-all active:scale-95 hover:opacity-90"
            style={{ background: 'var(--accent)' }}>
            {status.action.text}
          </Link>
        )}

        {status && !status.action && (
          <div className="w-full max-w-[280px] py-4 rounded-2xl text-center font-medium text-sm"
            style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
            Check back tonight
          </div>
        )}
      </div>
    </main>
  )
}
