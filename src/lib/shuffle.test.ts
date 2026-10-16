import { describe, expect, it } from 'vitest'
import { shuffle, shuffleNoAdjacent } from './shuffle'

/** 決定的な疑似乱数（テスト用） */
function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

describe('shuffle', () => {
  it('要素を欠かさず重複もさせない', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8]
    for (let seed = 1; seed <= 20; seed++) {
      const out = shuffle(input, seeded(seed))
      expect([...out].sort((a, b) => a - b)).toEqual(input)
    }
  })
})

describe('shuffleNoAdjacent', () => {
  const items = [
    { id: 'a1', g: 'a' },
    { id: 'a2', g: 'a' },
    { id: 'a3', g: 'a' },
    { id: 'b1', g: 'b' },
    { id: 'b2', g: 'b' },
    { id: 'c1', g: 'c' },
    { id: 'c2', g: 'c' },
    { id: 'c3', g: 'c' },
    { id: 'd1', g: 'd' },
    { id: 'e1', g: 'e' },
  ]

  it('同じグループが隣り合わない', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const out = shuffleNoAdjacent(items, (i) => i.g, seeded(seed))
      expect(out.map((i) => i.id).sort()).toEqual(items.map((i) => i.id).sort())
      for (let k = 1; k < out.length; k++) expect(out[k].g).not.toBe(out[k - 1].g)
    }
  })

  it('避けられない場合でも要素を失わない', () => {
    const same = [
      { id: 'x1', g: 'x' },
      { id: 'x2', g: 'x' },
      { id: 'y1', g: 'y' },
    ]
    const out = shuffleNoAdjacent(same, (i) => i.g, seeded(3))
    expect(out).toHaveLength(3)
  })
})
