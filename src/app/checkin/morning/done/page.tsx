'use client'

import { useRouter } from 'next/navigation'
import { getSessions, getTodayDate } from '@/lib/storage'
import Companion from '@/components/companion/Companion'

export default function MorningDonePage() {
  const router = useRouter()

  const sessions = getSessions()
  const today = getTodayDate()
  const todaySession = sessions.find(s => s.date === today)
  const feltRest = todaySession?.morning?.feltRest
  const companionState = feltRest === 'great' || feltRest === 'good' ? 'happy' : 'neutral'

  return (
    <div className="flex flex-col min-h-dvh items-center justify-center px-6 text-center"
      style={{ background: 'var(--bg)' }}>
      <Companion state={companionState} size={180} />
      <h2 className="text-2xl font-bold mt-6 mb-3" style={{ color: 'var(--text)' }}>
        Good morning
      </h2>
      <p className="text-sm leading-relaxed max-w-xs mb-10" style={{ color: 'var(--text-muted)' }}>
        {companionState === 'happy'
          ? 'Glad you slept well. Check in again tonight.'
          : 'Thanks for checking in. Every entry helps Dormant learn your patterns.'}
      </p>
      <button onClick={() => router.replace('/')}
        className="w-full max-w-xs py-4 rounded-2xl font-semibold text-white text-base transition-all active:scale-95 hover:opacity-90"
        style={{ background: 'var(--accent)' }}>
        Done
      </button>
    </div>
  )
}
