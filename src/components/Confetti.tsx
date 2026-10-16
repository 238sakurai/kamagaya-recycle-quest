import { useEffect, useState } from 'react'

interface ConfettiProps {
  /** 同じ値のまま再レンダーしても紙吹雪は増えない。変えると新しく降る */
  burstKey: number
  enabled: boolean
  count?: number
}

const COLORS = ['#58C78E', '#FFD85A', '#B8E4FF', '#FF9FB2', '#FFFDF7']

interface Piece {
  id: number
  left: number
  delay: number
  color: string
  size: number
}

/** 控えめな紙吹雪。CSS アニメーションのみで、描画ループは持たない。 */
export function Confetti({ burstKey, enabled, count = 24 }: ConfettiProps) {
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    if (!enabled || burstKey === 0) return
    const next: Piece[] = Array.from({ length: count }, (_, i) => ({
      id: burstKey * 1000 + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      color: COLORS[i % COLORS.length],
      size: 8 + Math.random() * 8,
    }))
    setPieces(next)
    const timer = window.setTimeout(() => setPieces([]), 2200)
    return () => window.clearTimeout(timer)
  }, [burstKey, enabled, count])

  if (pieces.length === 0) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block animate-fall rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
