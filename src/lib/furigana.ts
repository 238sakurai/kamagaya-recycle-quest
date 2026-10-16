/**
 * ふりがな記法 "漢字[よみ]" をパースする。
 * 例: "有価物[ゆうかぶつ]を集[あつ]める" → [{base:'有価物',ruby:'ゆうかぶつ'},{base:'を'},{base:'集',ruby:'あつ'},{base:'める'}]
 */
export interface RubySegment {
  base: string
  ruby?: string
}

const PATTERN = /([^\s\[\]]+?)\[([^\[\]]+)\]/g

export function parseFurigana(text: string): RubySegment[] {
  const segments: RubySegment[] = []
  let last = 0
  for (const match of text.matchAll(PATTERN)) {
    const index = match.index ?? 0
    const full = match[0]
    const base = match[1]
    const ruby = match[2]
    // 漢字の直前にあるひらがな等は、ふりがなの対象から外す。
    // 例: "お酒[さけ]" → "お" + "酒[さけ]"
    const kanjiStart = findRubyBaseStart(base)
    const plainPrefix = text.slice(last, index) + base.slice(0, kanjiStart)
    if (plainPrefix) segments.push({ base: plainPrefix })
    segments.push({ base: base.slice(kanjiStart), ruby })
    last = index + full.length
  }
  if (last < text.length) segments.push({ base: text.slice(last) })
  return segments
}

/** 文字列の中で、漢字（またはカタカナ・英数字）が始まる位置 */
function findRubyBaseStart(base: string): number {
  for (let i = 0; i < base.length; i++) {
    const code = base.charCodeAt(i)
    const isHiragana = code >= 0x3041 && code <= 0x309f
    if (!isHiragana) return i
  }
  return 0
}

/** ふりがな記法を外して、読み上げやテスト用のプレーンテキストにする */
export function stripFurigana(text: string): string {
  return text.replace(PATTERN, '$1')
}
