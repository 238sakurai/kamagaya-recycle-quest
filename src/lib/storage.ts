/**
 * localStorage の薄いラッパー。
 * 個人情報は一切保存しない。保存するのは設定とゲームの進捗だけ。
 */
export interface Settings {
  sound: boolean
  animation: boolean
}

export interface Progress {
  bestPoints: number
  clearCount: number
  /** 任意で選んだ小学校区の id。未選択なら null */
  schoolId: string | null
}

const SETTINGS_KEY = 'krq:settings:v1'
const PROGRESS_KEY = 'krq:progress:v1'

export const DEFAULT_SETTINGS: Settings = { sound: true, animation: true }
export const DEFAULT_PROGRESS: Progress = { bestPoints: 0, clearCount: 0, schoolId: null }

function read<T>(key: string, fallback: T, validate: (v: unknown) => v is T): T {
  try {
    const raw = globalThis.localStorage?.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return validate(parsed) ? { ...fallback, ...parsed } : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown): void {
  try {
    globalThis.localStorage?.setItem(key, JSON.stringify(value))
  } catch {
    // プライベートモード等で保存できなくても、ゲームは続行できる
  }
}

function isSettings(v: unknown): v is Settings {
  return typeof v === 'object' && v !== null
}

function isProgress(v: unknown): v is Progress {
  return typeof v === 'object' && v !== null
}

export function loadSettings(): Settings {
  const s = read(SETTINGS_KEY, DEFAULT_SETTINGS, isSettings)
  return { sound: s.sound !== false, animation: s.animation !== false }
}

export function saveSettings(settings: Settings): void {
  write(SETTINGS_KEY, settings)
}

export function loadProgress(): Progress {
  const p = read(PROGRESS_KEY, DEFAULT_PROGRESS, isProgress)
  return {
    bestPoints: typeof p.bestPoints === 'number' ? p.bestPoints : 0,
    clearCount: typeof p.clearCount === 'number' ? p.clearCount : 0,
    schoolId: typeof p.schoolId === 'string' ? p.schoolId : null,
  }
}

export function saveProgress(progress: Progress): void {
  write(PROGRESS_KEY, progress)
}

export function recordClear(points: number): Progress {
  const current = loadProgress()
  const next: Progress = {
    ...current,
    bestPoints: Math.max(current.bestPoints, points),
    clearCount: current.clearCount + 1,
  }
  saveProgress(next)
  return next
}

export function saveSchool(schoolId: string | null): Progress {
  const next = { ...loadProgress(), schoolId }
  saveProgress(next)
  return next
}

/** 設定と進捗をすべて消す（このアプリのキーだけを対象にする） */
export function clearAllData(): void {
  try {
    globalThis.localStorage?.removeItem(SETTINGS_KEY)
    globalThis.localStorage?.removeItem(PROGRESS_KEY)
  } catch {
    // 保存できない環境では何もしない
  }
}
