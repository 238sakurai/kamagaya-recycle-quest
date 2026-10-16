import { describe, expect, it } from 'vitest'
import { parseFurigana, stripFurigana } from './furigana'

describe('parseFurigana', () => {
  it('漢字[よみ] をルビ付きセグメントに分ける', () => {
    expect(parseFurigana('有価物[ゆうかぶつ]を集[あつ]める')).toEqual([
      { base: '有価物', ruby: 'ゆうかぶつ' },
      { base: 'を' },
      { base: '集', ruby: 'あつ' },
      { base: 'める' },
    ])
  })

  it('直前のひらがなはルビの対象に含めない', () => {
    expect(parseFurigana('お酒[さけ]')).toEqual([{ base: 'お' }, { base: '酒', ruby: 'さけ' }])
  })

  it('記法がなければそのまま返す', () => {
    expect(parseFurigana('ダンボール')).toEqual([{ base: 'ダンボール' }])
  })

  it('stripFurigana は読みを取り除く', () => {
    expect(stripFurigana('午前[ごぜん]9時[じ]まで')).toBe('午前9時まで')
  })
})
