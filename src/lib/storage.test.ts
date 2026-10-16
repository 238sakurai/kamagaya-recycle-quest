import { beforeEach, describe, expect, it } from 'vitest'
import { clearAllData, loadProgress, loadSettings, recordClear, saveSchool, saveSettings } from './storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('設定の初期値は音・アニメーションともON', () => {
    expect(loadSettings()).toEqual({ sound: true, animation: true })
  })

  it('設定を保存して読み戻せる', () => {
    saveSettings({ sound: false, animation: true })
    expect(loadSettings()).toEqual({ sound: false, animation: true })
  })

  it('壊れたデータは初期値に戻す', () => {
    localStorage.setItem('krq:settings:v1', '{not json')
    expect(loadSettings()).toEqual({ sound: true, animation: true })
  })

  it('クリアを記録すると最高点と回数が更新される', () => {
    recordClear(120)
    recordClear(90)
    expect(loadProgress()).toMatchObject({ bestPoints: 120, clearCount: 2 })
  })

  it('学区は任意で保存・解除できる', () => {
    saveSchool('kamagaya')
    expect(loadProgress().schoolId).toBe('kamagaya')
    saveSchool(null)
    expect(loadProgress().schoolId).toBeNull()
  })

  it('保存データの消去はこのアプリのキーだけを消す', () => {
    localStorage.setItem('other-app:save', '1')
    saveSettings({ sound: false, animation: false })
    recordClear(50)
    clearAllData()
    expect(loadSettings()).toEqual({ sound: true, animation: true })
    expect(loadProgress()).toMatchObject({ bestPoints: 0, clearCount: 0, schoolId: null })
    expect(localStorage.getItem('other-app:save')).toBe('1')
  })

  it('個人情報に相当するキーは保存しない', () => {
    recordClear(10)
    saveSchool('tobu')
    const keys = Object.keys(localStorage)
    expect(keys.sort()).toEqual(['krq:progress:v1'])
    const raw = JSON.stringify(localStorage.getItem('krq:progress:v1'))
    expect(raw).not.toMatch(/name|address|住所|氏名/)
  })
})
