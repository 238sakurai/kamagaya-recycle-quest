import { describe, expect, it } from 'vitest'
import { clampPoints, newlyUnlocked, POINTS_FIRST_TRY, POINTS_RETRY, pointsForAnswer } from './score'

describe('pointsForAnswer', () => {
  it('1回目の正解は満点', () => {
    expect(pointsForAnswer(1)).toBe(POINTS_FIRST_TRY)
  })
  it('やり直しの正解でも半分もらえる', () => {
    expect(pointsForAnswer(2)).toBe(POINTS_RETRY)
    expect(pointsForAnswer(5)).toBe(POINTS_RETRY)
  })
})

describe('newlyUnlocked', () => {
  it('またいだしきい値だけを返す', () => {
    expect(newlyUnlocked([30, 60, 85], 20, 70)).toEqual([0, 1])
    expect(newlyUnlocked([30, 60, 85], 70, 80)).toEqual([])
    expect(newlyUnlocked([30, 60, 85], 80, 100)).toEqual([2])
  })
})

describe('clampPoints', () => {
  it('0〜max に収める', () => {
    expect(clampPoints(-5, 100)).toBe(0)
    expect(clampPoints(500, 100)).toBe(100)
    expect(clampPoints(42, 100)).toBe(42)
  })
})
