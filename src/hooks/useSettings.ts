import { useCallback, useEffect, useState } from 'react'
import { loadSettings, saveSettings, type Settings } from '../lib/storage'

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => loadSettings())

  useEffect(() => {
    saveSettings(settings)
    document.documentElement.dataset.animation = settings.animation ? 'on' : 'off'
  }, [settings])

  const toggle = useCallback((key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  return { settings, toggle }
}
