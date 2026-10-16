import { describe, expect, it } from 'vitest'
import { OBJECT_HIT_RADIUS, ROOM_HEIGHT, ROOM_WIDTH, ROOMS } from './rooms'
import { RULE_SOURCE_IDS } from './sources'

describe('おへやで有価物さがしの部屋データ', () => {
  it('部屋 id が重複せず、4部屋ある', () => {
    const ids = ROOMS.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toEqual(['kids', 'living', 'entrance', 'storage'])
  })

  it('金属製品の出し方を学ぶ部屋にはポイントがある', () => {
    for (const room of ROOMS.filter((r) => r.id === 'entrance' || r.id === 'storage')) {
      expect(room.tips?.length).toBeGreaterThan(0)
    }
  })

  for (const room of ROOMS) {
    describe(room.id, () => {
      it('オブジェクト id が重複せず、解説と出典を持つ', () => {
        const ids = room.objects.map((o) => o.id)
        expect(new Set(ids).size).toBe(ids.length)
        for (const o of room.objects) {
          expect(o.explanation.length).toBeGreaterThan(10)
          expect(o.sources.length).toBeGreaterThan(0)
          for (const s of o.sources) expect(RULE_SOURCE_IDS).toContain(s)
        }
      })

      it('有価物と対象外が両方あり、有価物は3つ以上', () => {
        expect(room.objects.filter((o) => o.accepted).length).toBeGreaterThanOrEqual(3)
        expect(room.objects.filter((o) => !o.accepted).length).toBeGreaterThanOrEqual(3)
      })

      it('オブジェクトが部屋の中に収まり、タップ領域が重ならない', () => {
        for (const o of room.objects) {
          expect(o.x).toBeGreaterThanOrEqual(OBJECT_HIT_RADIUS)
          expect(o.x).toBeLessThanOrEqual(ROOM_WIDTH - OBJECT_HIT_RADIUS)
          expect(o.y).toBeGreaterThanOrEqual(OBJECT_HIT_RADIUS)
          expect(o.y).toBeLessThanOrEqual(ROOM_HEIGHT - OBJECT_HIT_RADIUS)
        }
        for (let i = 0; i < room.objects.length; i++) {
          for (let j = i + 1; j < room.objects.length; j++) {
            const a = room.objects[i]
            const b = room.objects[j]
            const distance = Math.hypot(a.x - b.x, a.y - b.y)
            expect(distance, `${a.id} と ${b.id} が近すぎる`).toBeGreaterThanOrEqual(OBJECT_HIT_RADIUS * 2)
          }
        }
      })

      it('公式ルールと一致する', () => {
        const byId = Object.fromEntries(room.objects.map((o) => [o.id, o.accepted]))
        if ('spray' in byId) expect(byId.spray).toBe(false)
        if ('pet-bottle' in byId) expect(byId['pet-bottle']).toBe(false)
        if ('newspaper' in byId) expect(byId.newspaper).toBe(true)
        if ('cardboard' in byId) expect(byId.cardboard).toBe(true)
        if ('electric-blanket' in byId) expect(byId['electric-blanket']).toBe(false)
        if ('blanket' in byId) expect(byId.blanket).toBe(true)
        if ('bicycle' in byId) expect(byId.bicycle).toBe(true)
        if ('stove' in byId) expect(byId.stove).toBe(true)
        if ('e-bike' in byId) expect(byId['e-bike']).toBe(true)
        if ('oil-heater' in byId) expect(byId['oil-heater']).toBe(false)
        if ('gas-cylinder' in byId) expect(byId['gas-cylinder']).toBe(false)
        if ('tire' in byId) expect(byId.tire).toBe(false)
        if ('bike-battery' in byId) expect(byId['bike-battery']).toBe(false)
      })
    })
  }
})
