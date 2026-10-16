import { parseFurigana } from '../lib/furigana'

interface RubyProps {
  text: string
  className?: string
}

/** "漢字[よみ]" 記法をふりがな付きで表示する */
export function Ruby({ text, className }: RubyProps) {
  const segments = parseFurigana(text)
  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.ruby ? (
          <ruby key={i}>
            {seg.base}
            <rp>(</rp>
            <rt>{seg.ruby}</rt>
            <rp>)</rp>
          </ruby>
        ) : (
          <span key={i}>{seg.base}</span>
        ),
      )}
    </span>
  )
}
