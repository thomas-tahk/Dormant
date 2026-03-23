'use client'

import { useRouter } from 'next/navigation'
import DogCompanion from '@/components/companion/DogCompanion'

export default function NightDonePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-dvh items-center justify-center px-6 text-center"
      style={{ background: 'var(--bg)' }}>
      <DogCompanion state="sleeping" size={180} />
      <h2 className="text-2xl font-bold mt-6 mb-3" style={{ color: 'var(--text)' }}>
        Good night
      </h2>
      <p className="text-sm leading-relaxed max-w-xs mb-10" style={{ color: 'var(--text-muted)' }}>
        Check in again in the morning. Dormant will be here.
      </p>
      <button onClick={() => router.replace('/')}
        className="w-full max-w-xs py-4 rounded-2xl font-semibold text-white text-base transition-all active:scale-95 hover:opacity-90"
        style={{ background: 'var(--accent)' }}>
        Done
      </button>
    </div>
  )
}
