'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getThemePreference, setThemePreference } from '@/lib/storage'

type ThemeMode = 'light' | 'dark' | 'auto'

interface ThemeContextValue {
  mode: ThemeMode
  resolved: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'auto',
  resolved: 'dark',
  setMode: () => {},
})

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'auto') {
    const hour = new Date().getHours()
    return hour >= 6 && hour < 18 ? 'light' : 'dark'
  }
  return mode
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('auto')
  const [resolved, setResolved] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const stored = getThemePreference()
    setModeState(stored)
    const r = resolveTheme(stored)
    setResolved(r)
    applyTheme(r)
  }, [])

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
    setThemePreference(newMode)
    const r = resolveTheme(newMode)
    setResolved(r)
    applyTheme(r)
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

function applyTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const useTheme = () => useContext(ThemeContext)
