import { useEffect, useState } from 'react'
import { suspendAudio } from '../lib/sound'

/**
 * ブラウザのタブが非表示になったら、アニメーションと音を止める。
 * 戻ってきたら再開する。常時実行するループは持たない。
 */
export function useVisibilityPause(): boolean {
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden)

  useEffect(() => {
    const onChange = () => {
      const isHidden = document.hidden
      setHidden(isHidden)
      document.documentElement.dataset.hidden = isHidden ? 'true' : 'false'
      if (isHidden) suspendAudio()
    }
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return hidden
}
