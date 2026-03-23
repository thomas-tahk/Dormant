interface HabitatProps {
  sessionCount: number
}

export default function Habitat({ sessionCount }: HabitatProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">

      {/* Level 1 (1+ sessions): soft floating orbs */}
      {sessionCount >= 1 && (
        <>
          <div className="absolute fade-in" style={{ bottom: '30%', left: '8%' }}>
            <div style={{
              width: 16, height: 16, borderRadius: '50%',
              background: 'var(--accent-soft)',
              opacity: 0.7,
              boxShadow: '0 0 12px 6px var(--accent-soft)',
              animation: 'idle-float 4.5s ease-in-out infinite',
            }} />
          </div>
          <div className="absolute fade-in" style={{ bottom: '48%', right: '10%' }}>
            <div style={{
              width: 11, height: 11, borderRadius: '50%',
              background: '#F09AAA',
              opacity: 0.65,
              boxShadow: '0 0 10px 5px rgba(240,154,170,0.5)',
              animation: 'idle-float 5.5s ease-in-out 1.2s infinite',
            }} />
          </div>
          <div className="absolute fade-in" style={{ bottom: '60%', left: '16%' }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent-soft)',
              opacity: 0.55,
              boxShadow: '0 0 8px 4px var(--accent-soft)',
              animation: 'idle-float 6s ease-in-out 2.4s infinite',
            }} />
          </div>
        </>
      )}

      {/* Level 2 (3+ sessions): warm glowing orb */}
      {sessionCount >= 3 && (
        <div className="absolute fade-in" style={{
          bottom: '42%', right: '6%',
          animation: 'idle-float 7s ease-in-out 1s infinite',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'radial-gradient(circle, #F5C842 0%, rgba(245,200,66,0.4) 55%, transparent 100%)',
            boxShadow: '0 0 24px 12px rgba(245, 200, 66, 0.25)',
          }} />
        </div>
      )}

      {/* Level 3 (5+ sessions): crescent moon */}
      {sessionCount >= 5 && (
        <div className="absolute fade-in" style={{
          top: '12%', left: '8%',
          animation: 'idle-float 8s ease-in-out 2s infinite',
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M 27 5 A 14 14 0 1 1 5 27 A 10 10 0 0 0 27 5 Z" fill="#F5C842" opacity="0.75" />
          </svg>
        </div>
      )}

    </div>
  )
}
