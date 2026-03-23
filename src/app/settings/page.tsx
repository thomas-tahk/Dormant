'use client'

import { useEffect, useState } from 'react'
import { getCompanionName, setCompanionName, getSessions, clearAllData } from '@/lib/storage'
import { useTheme } from '@/components/ThemeProvider'
import { downloadFhirBundle } from '@/lib/fhir'
import Link from 'next/link'

export default function SettingsPage() {
  const { mode, setMode } = useTheme()
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [exported, setExported] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    setName(getCompanionName())
  }, [])

  function handleSaveName() {
    setCompanionName(name)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
      return
    }
    clearAllData()
    setConfirmClear(false)
  }

  function handleExport() {
    const sessions = getSessions()
    downloadFhirBundle(sessions)
    setExported(true)
    setTimeout(() => setExported(false), 3000)
  }

  return (
    <main className="flex flex-col min-h-dvh" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-12 pb-6">
        <Link href="/" aria-label="Back"
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Settings</h1>
      </div>

      <div className="flex flex-col gap-6 px-6 pb-12">
        {/* Companion */}
        <Section title="Companion">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}>
              Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={24}
                placeholder="Your companion's name"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none font-medium"
                style={{
                  background: 'var(--surface-2)',
                  color: 'var(--text)',
                  border: '1.5px solid var(--border)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
              />
              <button onClick={handleSaveName}
                className="px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-95"
                style={{ background: saved ? '#5A8FD4' : 'var(--accent)' }}>
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </Section>

        {/* Appearance */}
        <Section title="Appearance">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: 'var(--text-muted)' }}>
              Color mode
            </label>
            {(['auto', 'dark', 'light'] as const).map(m => (
              <button key={m}
                onClick={() => setMode(m)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: mode === m ? 'var(--accent)' : 'var(--surface-2)',
                  color: mode === m ? 'white' : 'var(--text)',
                  border: `1.5px solid ${mode === m ? 'var(--accent)' : 'var(--border)'}`,
                }}>
                <span>
                  {m === 'auto' ? 'Auto (6am light / 6pm dark)' : m === 'dark' ? 'Dark' : 'Light'}
                </span>
                {mode === m && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Section>

        {/* Data */}
        <Section title="Data">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                Export as FHIR Bundle
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                Exports your sleep logs as a FHIR R4 Bundle — a standardized healthcare
                interoperability format (LOINC-coded Observations). Compatible with
                USCDI-aligned health record systems.
              </p>
              <button onClick={handleExport}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{
                  background: exported ? 'var(--surface-2)' : 'var(--accent)',
                  color: exported ? 'var(--text-muted)' : 'white',
                  border: exported ? '1.5px solid var(--border)' : 'none',
                }}>
                {exported ? 'Downloaded ✓' : 'Export FHIR Bundle'}
              </button>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                Reset all data
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                Clears all sleep entries. Useful for testing or starting fresh.
              </p>
              <button onClick={handleClear}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{
                  background: confirmClear ? '#E07070' : 'var(--surface-2)',
                  color: confirmClear ? 'white' : 'var(--text-muted)',
                  border: `1.5px solid ${confirmClear ? '#E07070' : 'var(--border)'}`,
                }}>
                {confirmClear ? 'Tap again to confirm' : 'Reset data'}
              </button>
            </div>
          </div>
        </Section>

        {/* Reminders */}
        <Section title="Reminders">
          <DisabledRow label="Night check-in reminder" control={<TimeChip value="10:00 PM" />} />
          <DisabledRow label="Morning check-in reminder" control={<TimeChip value="8:00 AM" />} />
        </Section>

        {/* Sound */}
        <Section title="Sound">
          <DisabledRow label="Ambient sounds" control={<FakeToggle />} />
          <DisabledRow label="Check-in sounds" control={<FakeToggle />} />
          <DisabledRow label="Master volume" control={<FakeSlider />} />
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: 'var(--text-muted)' }}>
        {title}
      </h2>
      <div className="p-4 rounded-2xl flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        {children}
      </div>
    </div>
  )
}

function DisabledRow({ label, control }: { label: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between opacity-40 cursor-not-allowed select-none">
      <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{label}</span>
      {control}
    </div>
  )
}

function FakeToggle() {
  return (
    <div className="w-11 h-6 rounded-full flex items-center px-0.5"
      style={{ background: 'var(--border)' }}>
      <div className="w-5 h-5 rounded-full" style={{ background: 'var(--surface-2)' }} />
    </div>
  )
}

function FakeSlider() {
  return (
    <div className="w-24 flex items-center gap-1.5">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
        <div className="w-1/2 h-1.5 rounded-full" style={{ background: 'var(--text-muted)' }} />
      </div>
      <div className="w-3.5 h-3.5 rounded-full border-2"
        style={{ background: 'var(--surface)', borderColor: 'var(--text-muted)' }} />
    </div>
  )
}

function TimeChip({ value }: { value: string }) {
  return (
    <span className="text-xs font-medium px-3 py-1.5 rounded-lg"
      style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
      {value}
    </span>
  )
}
