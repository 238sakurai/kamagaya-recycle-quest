import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, loadSettings, saveSettings, type Settings } from '../lib/storage'

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => loadSettings())

  useEffect(() => {
    saveSettings(settings)
    document.documentElement.dataset.animation = settings.animation ? 'on' : 'off'
  }, [settings])

  const toggle = useCallback((key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), [])

  return { settings, toggle, reset }
}
