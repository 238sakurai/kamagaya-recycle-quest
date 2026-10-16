/**
 * Web Audio API で短い効果音を鳴らす。
 * 音声ファイルを持たず、必要なときだけ AudioContext を生成する（省電力・軽量）。
 */
export type SoundName = 'tap' | 'correct' | 'wrong' | 'fanfare' | 'unlock'

let context: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!context) context = new Ctor()
  if (context.state === 'suspended') void context.resume()
  return context
}

interface Note {
  freq: number
  start: number
  duration: number
  type?: OscillatorType
  gain?: number
}

const PATTERNS: Record<SoundName, Note[]> = {
  tap: [{ freq: 660, start: 0, duration: 0.06, type: 'sine', gain: 0.15 }],
  correct: [
    { freq: 784, start: 0, duration: 0.1, type: 'triangle' },
    { freq: 1047, start: 0.1, duration: 0.16, type: 'triangle' },
  ],
  wrong: [
    { freq: 330, start: 0, duration: 0.12, type: 'square', gain: 0.08 },
    { freq: 262, start: 0.12, duration: 0.18, type: 'square', gain: 0.08 },
  ],
  unlock: [
    { freq: 523, start: 0, duration: 0.09, type: 'triangle' },
    { freq: 659, start: 0.09, duration: 0.09, type: 'triangle' },
    { freq: 784, start: 0.18, duration: 0.09, type: 'triangle' },
    { freq: 1047, start: 0.27, duration: 0.2, type: 'triangle' },
  ],
  fanfare: [
    { freq: 523, start: 0, duration: 0.12, type: 'triangle' },
    { freq: 523, start: 0.14, duration: 0.12, type: 'triangle' },
    { freq: 523, start: 0.28, duration: 0.12, type: 'triangle' },
    { freq: 659, start: 0.42, duration: 0.3, type: 'triangle' },
    { freq: 784, start: 0.72, duration: 0.4, type: 'triangle' },
  ],
}

export function playSound(name: SoundName, enabled: boolean): void {
  if (!enabled) return
  const ctx = getContext()
  if (!ctx) return
  const now = ctx.currentTime
  for (const note of PATTERNS[name]) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = note.type ?? 'sine'
    osc.frequency.value = note.freq
    const peak = note.gain ?? 0.2
    gain.gain.setValueAtTime(0, now + note.start)
    gain.gain.linearRampToValueAtTime(peak, now + note.start + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.start + note.duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now + note.start)
    osc.stop(now + note.start + note.duration + 0.02)
  }
}

/** タブが非表示になったときに音を止める（省電力） */
export function suspendAudio(): void {
  if (context && context.state === 'running') void context.suspend()
}
