import { Button } from '../components/Button'
import { Mascot } from '../components/Mascot'
import { Ruby } from '../components/Ruby'
import { Screen } from '../components/Screen'
import { SettingsBar } from '../components/SettingsBar'
import { MAX_POINTS } from '../data/rewards'
import type { Progress, Settings } from '../lib/storage'

interface TitleScreenProps {
  settings: Settings
  onToggle: (key: keyof Settings) => void
  progress: Progress
  onStart: () => void
  onStartRoom: () => void
  onShowSources: () => void
  animate: boolean
}

export function TitleScreen({ settings, onToggle, progress, onStart, onStartRoom, onShowSources, animate }: TitleScreenProps) {
  const roomStars = Object.values(progress.roomStars).reduce((sum, n) => sum + n, 0)
  return (
    <Screen testId="screen-title" header={<SettingsBar settings={settings} onToggle={onToggle} />}>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <div className={animate ? 'animate-float' : ''}>
          <Mascot className="size-44" />
        </div>
        <h1 className="text-balance text-4xl font-black leading-tight tracking-tight">
          かまがや
          <br />
          <span className="text-eco-green-dark">リサイクル大作戦！</span>
        </h1>
        <p className="text-lg font-bold">
          <Ruby text="あつめて、わけて、学校[がっこう]をハッピーに！" />
        </p>
        <p className="max-w-xs text-base leading-relaxed">
          <Ruby text="鎌ケ谷市[かまがやし]PTAの「有価物回収運動[ゆうかぶつかいしゅううんどう]」を、ゲームで楽[たの]しく学[まな]ぼう！" />
        </p>
        <Button size="lg" onClick={onStart} label="▶ スタート！" className="w-full max-w-xs" data-testid="start" />
        <Button variant="yellow" onClick={onStartRoom} label="🏠 おへやで有価物[ゆうかぶつ]さがし" className="w-full max-w-xs" data-testid="start-room" />
        {roomStars > 0 ? (
          <p className="-mt-2 text-sm font-bold text-eco-brown/70">
            <Ruby text={`おへやさがしの星[ほし]：${'★'.repeat(roomStars)}`} />
          </p>
        ) : null}
        {progress.clearCount > 0 ? (
          <p className="text-sm font-bold text-eco-brown/70">
            <Ruby text={`これまでのさいこうポイント：${Math.min(progress.bestPoints, MAX_POINTS)} / ${MAX_POINTS}（クリア ${progress.clearCount}回[かい]）`} />
          </p>
        ) : null}
      </div>
      <div className="flex flex-col items-center gap-1 text-xs text-eco-brown/70">
        <button type="button" onClick={onShowSources} className="tap-area underline underline-offset-4">
          出典・このゲームについて
        </button>
        <p>鎌ケ谷市公式サイトの情報をもとに作成（非公式ファンメイド）</p>
      </div>
    </Screen>
  )
}
