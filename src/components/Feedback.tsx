import { Ruby } from './Ruby'
import { Button } from './Button'

interface FeedbackProps {
  kind: 'correct' | 'wrong'
  /** ふりがな記法 */
  message: string
  /** 対象外の品目などで「代わりにどうするか」の補足 */
  extra?: string
  gained?: number
  onNext: () => void
  nextLabel?: string
}

export function Feedback({ kind, message, extra, gained, onNext, nextLabel }: FeedbackProps) {
  const correct = kind === 'correct'
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid={`feedback-${kind}`}
      className={`animate-pop rounded-blob p-5 ring-4 ${correct ? 'bg-eco-green/15 ring-eco-green' : 'bg-eco-pink/25 ring-eco-pink'}`}
    >
      <p className="mb-2 text-2xl font-black">
        {correct ? (
          <>
            ⭕ <Ruby text="せいかい！" />
            {gained ? <span className="ml-2 text-eco-green-dark">+{gained}</span> : null}
          </>
        ) : (
          <>
            ❌ <Ruby text="おしい！" />
          </>
        )}
      </p>
      <p className="text-lg leading-relaxed">
        <Ruby text={message} />
      </p>
      {extra ? (
        <p className="mt-3 rounded-2xl bg-white/70 p-3 text-base leading-relaxed">
          <Ruby text={extra} />
        </p>
      ) : null}
      <div className="mt-4 flex justify-end">
        <Button variant={correct ? 'primary' : 'yellow'} onClick={onNext} label={nextLabel ?? (correct ? 'つぎへ ▶' : 'もういちど！')} />
      </div>
    </div>
  )
}
