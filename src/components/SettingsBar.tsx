import type { Settings } from '../lib/storage'

interface SettingsBarProps {
  settings: Settings
  onToggle: (key: keyof Settings) => void
}

export function SettingsBar({ settings, onToggle }: SettingsBarProps) {
  return (
    <div className="flex gap-2" role="group" aria-label="設定">
      <ToggleChip
        on={settings.sound}
        onClick={() => onToggle('sound')}
        label={settings.sound ? '🔊 おと ON' : '🔇 おと OFF'}
        ariaLabel="効果音"
      />
      <ToggleChip
        on={settings.animation}
        onClick={() => onToggle('animation')}
        label={settings.animation ? '✨ うごき ON' : '⏸ うごき OFF'}
        ariaLabel="アニメーション"
      />
    </div>
  )
}

function ToggleChip({ on, onClick, label, ariaLabel }: { on: boolean; onClick: () => void; label: string; ariaLabel: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`tap-area rounded-full px-3 py-1.5 text-xs font-bold ring-2 transition-colors ${
        on ? 'bg-white text-eco-brown ring-eco-green' : 'bg-eco-brown/5 text-eco-brown/60 ring-eco-brown/10'
      }`}
    >
      {label}
    </button>
  )
}
