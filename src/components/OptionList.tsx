import { useEffect, useState } from 'react'
import { Ruby } from './Ruby'

interface Option {
  id: string
  label: string
}

interface OptionListProps {
  options: Option[]
  onSelect: (id: string) => void
  disabled?: boolean
  /** 選択済みで不正解だった選択肢（再挑戦時に薄く表示） */
  wrongIds?: string[]
  selectedId?: string | null
  correctId?: string
  revealed?: boolean
}

/** 表示直後の誤タップ（前の画面の「つぎへ」を連打した等）を防ぐための短いロック時間 */
const INPUT_LOCK_MS = 350

export function OptionList({ options, onSelect, disabled, wrongIds = [], selectedId, correctId, revealed }: OptionListProps) {
  const [locked, setLocked] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(() => setLocked(false), INPUT_LOCK_MS)
    return () => window.clearTimeout(timer)
  }, [])
  const isDisabled = disabled || locked
  return (
    <ul className="grid gap-3" role="list">
      {options.map((opt, index) => {
        const isWrong = wrongIds.includes(opt.id)
        const isSelected = selectedId === opt.id
        const isCorrect = revealed && correctId === opt.id
        let tone = 'bg-white ring-eco-brown/10'
        if (isCorrect) tone = 'bg-eco-green/20 ring-eco-green'
        else if (isSelected && revealed) tone = 'bg-eco-pink/30 ring-eco-pink'
        else if (isWrong) tone = 'bg-eco-brown/5 ring-eco-brown/10 opacity-50'
        return (
          <li key={opt.id}>
            <button
              type="button"
              data-testid={`option-${opt.id}`}
              disabled={isDisabled || isWrong}
              onClick={() => onSelect(opt.id)}
              className={`tap-area flex w-full items-center gap-3 rounded-blob px-4 py-4 text-left text-lg font-bold leading-snug ring-4 transition-transform active:scale-[0.98] disabled:cursor-not-allowed ${tone}`}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-eco-yellow text-base font-black">
                {String.fromCharCode(65 + index)}
              </span>
              <Ruby text={opt.label} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
