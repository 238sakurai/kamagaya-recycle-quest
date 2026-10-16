import { existsSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ILLUSTRATIONS, ILLUSTRATION_BY_KEY, ILLUSTRATIONS_VERIFIED_AT, itemImagePath } from './illustrations'
import { SORT_ITEMS } from './items'
import { ROOMS } from './rooms'

const usedArts = new Set([...SORT_ITEMS.map((i) => i.art), ...ROOMS.flatMap((r) => r.objects.map((o) => o.art))])

describe('いらすとやの素材', () => {
  it('key が重複せず、出典ページがいらすとやの URL', () => {
    const keys = ILLUSTRATIONS.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const i of ILLUSTRATIONS) expect(i.pageUrl).toMatch(/^https:\/\/www\.irasutoya\.com\//)
    expect(ILLUSTRATIONS_VERIFIED_AT).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('品目で使う art はすべて素材一覧にあり、画像ファイルが public にある（100KB 以下）', () => {
    for (const art of usedArts) {
      expect(ILLUSTRATION_BY_KEY[art], `${art} の出典がない`).toBeDefined()
      const path = `public/${itemImagePath(art)}`
      expect(existsSync(path), `${path} がない`).toBe(true)
      expect(statSync(path).size).toBeLessThanOrEqual(100 * 1024)
    }
  })

  it('一覧にある素材はすべて品目で使われている（使っていない素材を同梱しない）', () => {
    for (const i of ILLUSTRATIONS) expect(usedArts.has(i.key), `${i.key} は未使用`).toBe(true)
  })
})
