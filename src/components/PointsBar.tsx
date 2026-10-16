import { Ruby } from './Ruby'

interface PointsBarProps {
  points: number
  max: number
}

export function PointsBar({ points, max }: PointsBarProps) {
  const ratio = Math.min(1, points / max)
  return (
    <div className="flex items-center gap-3" aria-label={`リサイクルポイント ${points}`}>
      <span className="text-sm font-bold whitespace-nowrap">
        <Ruby text="♻ ポイント" />
      </span>
      <div className="h-4 flex-1 overflow-hidden rounded-full bg-white/80 ring-2 ring-eco-brown/10">
        <div
          className="h-full rounded-full bg-eco-green transition-[width] duration-500"
          style={{ width: `${ratio * 100}%` }}
          role="progressbar"
          aria-valuenow={points}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      <span className="min-w-10 text-right text-lg font-black tabular-nums" data-testid="points">
        {points}
      </span>
    </div>
  )
}
