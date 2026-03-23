'use client'

import { CompanionState } from '@/lib/types'

interface DogCompanionProps {
  state?: CompanionState
  size?: number
  className?: string
}

export default function DogCompanion({ state = 'neutral', size = 180, className = '' }: DogCompanionProps) {
  const animationStyle = {
    sleeping: { animation: 'sleeping-breathe 4s ease-in-out infinite' },
    resting:  { animation: 'idle-float 4s ease-in-out infinite' },
    neutral:  { animation: 'idle-float 3s ease-in-out infinite' },
    happy:    { animation: 'happy-bounce 0.8s ease-in-out 3' },
  }[state]

  return (
    <svg
      viewBox="0 0 160 180"
      width={size}
      height={size}
      className={className}
      style={animationStyle}
      aria-label={`Sleep companion feeling ${state}`}
      role="img"
    >
      {/* Tail */}
      <TailShape state={state} />

      {/* Left ear (behind head) */}
      <ellipse
        cx="34" cy="74" rx="13" ry="19"
        fill="#C4914A"
        transform="rotate(-12 34 74)"
      />
      <ellipse
        cx="34" cy="75" rx="8" ry="13"
        fill="#B07D3A"
        transform="rotate(-12 34 74)"
      />

      {/* Right ear (behind head) */}
      <ellipse
        cx="126" cy="74" rx="13" ry="19"
        fill="#C4914A"
        transform="rotate(12 126 74)"
      />
      <ellipse
        cx="126" cy="75" rx="8" ry="13"
        fill="#B07D3A"
        transform="rotate(12 126 74)"
      />

      {/* Body */}
      <ellipse cx="80" cy="138" rx="40" ry="33" fill="#DBA96B" />

      {/* Belly patch */}
      <ellipse cx="80" cy="143" rx="22" ry="18" fill="#EEC98A" />

      {/* Head */}
      <circle cx="80" cy="72" r="38" fill="#DBA96B" />

      {/* Snout */}
      <ellipse cx="80" cy="84" rx="20" ry="14" fill="#EEC98A" />

      {/* Eyes */}
      <EyeSet state={state} />

      {/* Nose */}
      <ellipse cx="80" cy="79" rx="6" ry="4" fill="#3A1F0D" />
      <ellipse cx="78" cy="78" rx="2" ry="1.5" fill="#5A3A25" opacity="0.6" />

      {/* Mouth */}
      <MouthShape state={state} />

      {/* Front paws */}
      <ellipse cx="58" cy="165" rx="16" ry="9" fill="#C4914A" />
      <ellipse cx="102" cy="165" rx="16" ry="9" fill="#C4914A" />
      <ellipse cx="58" cy="164" rx="10" ry="6" fill="#DBA96B" />
      <ellipse cx="102" cy="164" rx="10" ry="6" fill="#DBA96B" />

      {/* Paw toes (left) */}
      <circle cx="51" cy="169" r="3" fill="#C4914A" />
      <circle cx="58" cy="171" r="3" fill="#C4914A" />
      <circle cx="65" cy="169" r="3" fill="#C4914A" />

      {/* Paw toes (right) */}
      <circle cx="95" cy="169" r="3" fill="#C4914A" />
      <circle cx="102" cy="171" r="3" fill="#C4914A" />
      <circle cx="109" cy="169" r="3" fill="#C4914A" />

      {/* Sleeping zzz */}
      {state === 'sleeping' && <ZzzAnimation />}

      {/* Happy sparkles */}
      {state === 'happy' && <HappySparkles />}
    </svg>
  )
}

function TailShape({ state }: { state: CompanionState }) {
  const isHappy = state === 'happy'
  return (
    <path
      d={isHappy ? 'M 116 128 Q 145 108 140 130 Q 155 115 148 138' : 'M 118 130 Q 145 115 140 135'}
      stroke="#C4914A"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
      style={isHappy ? { animation: 'tail-wag 0.4s ease-in-out infinite', transformOrigin: '118px 130px' } : {}}
    />
  )
}

function EyeSet({ state }: { state: CompanionState }) {
  const leftX = 65
  const rightX = 95
  const eyeY = 67

  if (state === 'sleeping') {
    return (
      <>
        {/* Closed eyes — curved lines */}
        <path d={`M ${leftX - 7} ${eyeY} Q ${leftX} ${eyeY + 5} ${leftX + 7} ${eyeY}`}
          stroke="#3A1F0D" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d={`M ${rightX - 7} ${eyeY} Q ${rightX} ${eyeY + 5} ${rightX + 7} ${eyeY}`}
          stroke="#3A1F0D" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    )
  }

  if (state === 'resting') {
    return (
      <>
        {/* Half-open eyes */}
        <circle cx={leftX} cy={eyeY} r="7" fill="#3A1F0D" />
        <circle cx={rightX} cy={eyeY} r="7" fill="#3A1F0D" />
        {/* Droopy lids */}
        <ellipse cx={leftX} cy={eyeY - 2} rx="7" ry="5" fill="#DBA96B" />
        <ellipse cx={rightX} cy={eyeY - 2} rx="7" ry="5" fill="#DBA96B" />
        {/* Small visible eye portion */}
        <circle cx={leftX} cy={eyeY + 1} r="3.5" fill="#3A1F0D" />
        <circle cx={rightX} cy={eyeY + 1} r="3.5" fill="#3A1F0D" />
        <circle cx={leftX + 1} cy={eyeY} r="1" fill="white" />
        <circle cx={rightX + 1} cy={eyeY} r="1" fill="white" />
      </>
    )
  }

  const eyeRadius = state === 'happy' ? 8 : 7

  return (
    <>
      <circle cx={leftX} cy={eyeY} r={eyeRadius} fill="#3A1F0D" />
      <circle cx={rightX} cy={eyeY} r={eyeRadius} fill="#3A1F0D" />
      {/* Eye shine */}
      <circle cx={leftX + 2} cy={eyeY - 2} r="2" fill="white" />
      <circle cx={rightX + 2} cy={eyeY - 2} r="2" fill="white" />
      {/* Small secondary shine */}
      <circle cx={leftX - 2} cy={eyeY + 2} r="1" fill="white" opacity="0.5" />
      <circle cx={rightX - 2} cy={eyeY + 2} r="1" fill="white" opacity="0.5" />
    </>
  )
}

function MouthShape({ state }: { state: CompanionState }) {
  if (state === 'sleeping') {
    return (
      <path d="M 73 88 Q 80 91 87 88"
        stroke="#3A1F0D" strokeWidth="2" fill="none" strokeLinecap="round" />
    )
  }

  if (state === 'happy') {
    return (
      <>
        <path d="M 68 88 Q 80 98 92 88"
          stroke="#3A1F0D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Tongue */}
        <ellipse cx="80" cy="96" rx="8" ry="6" fill="#F09AAA" />
        <path d="M 72 96 Q 80 102 88 96"
          stroke="#E07080" strokeWidth="1.5" fill="none" />
      </>
    )
  }

  return (
    <path d="M 72 88 Q 80 93 88 88"
      stroke="#3A1F0D" strokeWidth="2" fill="none" strokeLinecap="round" />
  )
}

function ZzzAnimation() {
  return (
    <g>
      <text x="112" y="48" fontSize="14" fill="#A99DE0" fontWeight="700"
        style={{ animation: 'zzz-float 3s ease-in-out infinite', opacity: 0 }}>z</text>
      <text x="122" y="36" fontSize="10" fill="#A99DE0" fontWeight="700"
        style={{ animation: 'zzz-float 3s ease-in-out 1s infinite', opacity: 0 }}>z</text>
      <text x="130" y="26" fontSize="7" fill="#A99DE0" fontWeight="700"
        style={{ animation: 'zzz-float 3s ease-in-out 2s infinite', opacity: 0 }}>z</text>
    </g>
  )
}

function HappySparkles() {
  return (
    <g>
      <circle cx="30" cy="40" r="3" fill="#F5C842"
        style={{ animation: 'sparkle 1.2s ease-in-out infinite' }} />
      <circle cx="135" cy="35" r="2.5" fill="#F5C842"
        style={{ animation: 'sparkle 1.2s ease-in-out 0.4s infinite' }} />
      <circle cx="22" cy="70" r="2" fill="#F09AAA"
        style={{ animation: 'sparkle 1.2s ease-in-out 0.8s infinite' }} />
      <circle cx="142" cy="65" r="2" fill="#F09AAA"
        style={{ animation: 'sparkle 1.2s ease-in-out 0.2s infinite' }} />
    </g>
  )
}
