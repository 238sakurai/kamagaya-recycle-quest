import { describe, expect, it } from 'vitest'
import { SORT_ITEMS } from './items'
import { FLAG_QUIZZES, REWARD_QUIZ } from './quiz'
import { MAX_POINTS, REWARDS } from './rewards'
import { SCHOOLS } from './schools'
import { CHARACTER_SOURCE_IDS, RULE_SOURCE_IDS, SOURCES, SOURCE_LIST } from './sources'
import { POINTS_FIRST_TRY } from '../lib/score'

const DATE = /^\d{4}-\d{2}-\d{2}$/

describe('出典', () => {
  it('すべての出典が鎌ケ谷市公式ドメインで、確認日を持つ', () => {
    for (const s of SOURCE_LIST) {
      expect(s.url).toMatch(/^https:\/\/www\.city\.kamagaya\.chiba\.jp\//)
      expect(s.verifiedAt).toMatch(DATE)
      expect(s.pageUpdatedAt).toMatch(DATE)
    }
  })

  it('ルールの出典とキャラクターの出典で全出典を網羅し、重複しない', () => {
    const ids = [...RULE_SOURCE_IDS, ...CHARACTER_SOURCE_IDS]
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.sort()).toEqual(SOURCE_LIST.map((s) => s.id).sort())
  })

  it('出題データはルールの出典だけを参照する', () => {
    for (const item of SORT_ITEMS) for (const id of item.sources) expect(RULE_SOURCE_IDS).toContain(id)
    for (const q of [...FLAG_QUIZZES, REWARD_QUIZ]) for (const id of q.sources) expect(RULE_SOURCE_IDS).toContain(id)
  })
})

describe('ステージ1の出題データ', () => {
  it('各品目が出典と解説を持つ', () => {
    for (const item of SORT_ITEMS) {
      expect(item.sources.length).toBeGreaterThan(0)
      for (const id of item.sources) expect(SOURCES[id]).toBeDefined()
      expect(item.explanation.length).toBeGreaterThan(10)
    }
  })

  it('準備が必要な品目は出し方クイズを持ち、正解が選択肢に含まれる', () => {
    for (const item of SORT_ITEMS.filter((i) => i.verdict === 'prep')) {
      expect(item.prep).toBeDefined()
      const ids = item.prep!.options.map((o) => o.id)
      expect(ids).toContain(item.prep!.correctId)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('対象外の品目は代わりの出し方の案内を持つ', () => {
    for (const item of SORT_ITEMS.filter((i) => i.verdict === 'no')) {
      expect(item.prep).toBeUndefined()
      expect(item.instead).toBeDefined()
    }
  })

  it('各品目が種類（category）を持ち、どの種類も全体の半分以下（連続を避けられる）', () => {
    const counts = new Map<string, number>()
    for (const item of SORT_ITEMS) counts.set(item.category, (counts.get(item.category) ?? 0) + 1)
    for (const n of counts.values()) expect(n).toBeLessThanOrEqual(Math.ceil(SORT_ITEMS.length / 2))
  })

  it('id が重複しない', () => {
    const ids = SORT_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('公式ルールと一致する（主要品目）', () => {
    const byId = Object.fromEntries(SORT_ITEMS.map((i) => [i.id, i]))
    expect(byId.cardboard.prep?.correctId).toBe('flat')
    expect(byId.can.prep?.correctId).toBe('wash')
    expect(byId.bottle.prep?.correctId).toBe('wash')
    expect(byId.clothes.prep?.correctId).toBe('bag')
    expect(byId.spray.verdict).toBe('no')
    expect(byId['broken-bottle'].verdict).toBe('no')
  })
})

describe('ステージ2・3のクイズ', () => {
  it('午前9時が正解', () => {
    const q = FLAG_QUIZZES.find((q) => q.id === 'deadline')!
    expect(q.options.find((o) => o.id === q.correctId)?.label).toContain('9')
  })

  it('各クイズの正解が選択肢にあり、出典を持つ', () => {
    for (const q of [...FLAG_QUIZZES, REWARD_QUIZ]) {
      expect(q.options.map((o) => o.id)).toContain(q.correctId)
      expect(q.sources.length).toBeGreaterThan(0)
    }
  })

  it('未検証の具体的な回収日付を含まない', () => {
    const texts = [...FLAG_QUIZZES, REWARD_QUIZ].flatMap((q) => [q.question, q.explanation, ...q.options.map((o) => o.label)])
    for (const t of texts) expect(t).not.toMatch(/\d+月\d+日/)
  })
})

describe('ポイントと報酬', () => {
  it('満点は全問1回正解の合計と一致する', () => {
    const stage1 = SORT_ITEMS.reduce((sum, i) => sum + POINTS_FIRST_TRY + (i.verdict === 'prep' ? POINTS_FIRST_TRY : 0), 0)
    const stage2 = POINTS_FIRST_TRY + FLAG_QUIZZES.length * POINTS_FIRST_TRY
    const stage3 = POINTS_FIRST_TRY
    expect(MAX_POINTS).toBe(stage1 + stage2 + stage3)
  })

  it('報酬のしきい値は昇順で満点以下', () => {
    const t = REWARDS.map((r) => r.threshold)
    expect([...t].sort((a, b) => a - b)).toEqual(t)
    expect(t[t.length - 1]).toBeLessThanOrEqual(MAX_POINTS)
  })
})

describe('小学校区', () => {
  it('鎌ケ谷市立小学校9校', () => {
    expect(SCHOOLS).toHaveLength(9)
    expect(new Set(SCHOOLS.map((s) => s.id)).size).toBe(9)
  })
})
