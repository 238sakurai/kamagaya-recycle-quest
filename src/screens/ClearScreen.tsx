import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Mascot } from '../components/Mascot'
import { Ruby } from '../components/Ruby'
import { Screen } from '../components/Screen'
import { MAX_POINTS } from '../data/rewards'
import { SCHOOLS } from '../data/schools'
import { SOURCES } from '../data/sources'
import type { Progress } from '../lib/storage'

interface ClearScreenProps {
  points: number
  progress: Progress
  onSelectSchool: (id: string | null) => void
  onRestart: () => void
  onStartRoom: () => void
  onShowSources: () => void
  animate: boolean
}

const LINKS = [
  { id: 'rules', label: '有価物回収のルール（分け方・出し方）', url: SOURCES.yukabutu.url },
  { id: 'schedule', label: '年間回収日程表（PDF）', url: SOURCES.schedule.url },
  { id: 'sites', label: '町名別の回収場所一覧', url: SOURCES.kaishubasyo.url },
]

export function ClearScreen({ points, progress, onSelectSchool, onRestart, onStartRoom, onShowSources, animate }: ClearScreenProps) {
  const school = SCHOOLS.find((s) => s.id === progress.schoolId) ?? null
  return (
    <Screen testId="screen-clear">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className={animate ? 'animate-float' : ''}>
          <Mascot className="size-36" />
        </div>
        <h2 className="text-3xl font-black">
          <Ruby text="🎊 大作戦[だいさくせん]クリア！" />
        </h2>
        <p className="text-lg font-bold">
          <Ruby text={`リサイクルポイント：${points} / ${MAX_POINTS}`} />
        </p>
      </div>

      <Card tone="yellow" className="text-center">
        <p className="text-2xl font-black leading-relaxed" data-testid="clear-message">
          <Ruby text="おうちの人[ひと]と、有価物回収[ゆうかぶつかいしゅう]に参加[さんか]してみよう！" />
        </p>
      </Card>

      <Card className="flex flex-col gap-2">
        <p className="text-base font-bold">
          <Ruby text="鎌ケ谷市[かまがやし]の公式[こうしき]ページで確認[かくにん]しよう" />
        </p>
        <ul className="flex flex-col gap-2">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-${l.id}`}
                className="tap-area block rounded-blob bg-eco-green/15 px-4 py-3 text-base font-bold underline underline-offset-4"
              >
                🔗 {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <Card tone="sky" className="flex flex-col gap-2">
        <label htmlFor="school" className="text-base font-bold">
          <Ruby text="きみの小学校区[しょうがっこうく]（えらばなくてもOK）" />
        </label>
        <select
          id="school"
          value={progress.schoolId ?? ''}
          onChange={(e) => onSelectSchool(e.target.value || null)}
          className="rounded-blob bg-white px-4 py-3 text-lg font-bold ring-2 ring-eco-brown/10"
        >
          <option value="">えらばない</option>
          {SCHOOLS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        {school ? (
          <p className="text-sm leading-relaxed" data-testid="school-note">
            <Ruby text={`${school.name}学区[がっく]の回収日[かいしゅうび]は、公式[こうしき]の年間回収日程表[ねんかんかいしゅうにっていひょう]でたしかめてね。回収場所[かいしゅうばしょ]は町名別[ちょうめいべつ]の一覧[いちらん]と、現地[げんち]の黄色[きいろ]い旗[はた]で確認[かくにん]しよう。`} />
          </p>
        ) : null}
        <p className="text-xs leading-relaxed text-eco-brown/70">
          ※ 回収場所には利用できる人が限られる場所や、変更になる場所があります。学校を選んでも、使える回収場所や日程はこのゲームでは決まりません。かならず公式情報と現地の黄色い旗で確認してください。
        </p>
      </Card>

      <Card tone="pink" className="flex flex-col gap-1">
        <p className="text-base font-bold">
          <Ruby text="🧤 あんぜんに参加[さんか]するために" />
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>
            <Ruby text="重[おも]いもの・ガラス・あぶないものは、子[こ]どもだけで運[はこ]ばない" />
          </li>
          <li>
            <Ruby text="おうちでの準備[じゅんび]や回収場所[かいしゅうばしょ]への持[も]ち出[だ]しは、大人[おとな]といっしょに" />
          </li>
          <li>
            <Ruby text="回収日[かいしゅうび]の朝[あさ]は、車[くるま]に気[き]をつけてね" />
          </li>
        </ul>
      </Card>

      <Card tone="yellow" className="flex flex-col gap-2">
        <p className="text-base font-bold">
          <Ruby text="🏠 ボーナス：おへやで有価物[ゆうかぶつ]さがし" />
        </p>
        <p className="text-sm leading-relaxed">
          <Ruby text="散[ち]らかった部屋[へや]の中[なか]から、有価物回収[ゆうかぶつかいしゅう]に出[だ]せるものをさがして丸[まる]をつけよう！" />
        </p>
        <Button variant="yellow" onClick={onStartRoom} label="おへやさがしに挑戦[ちょうせん] ▶" data-testid="start-room" />
      </Card>

      <div className="flex flex-col gap-2">
        <Button size="lg" onClick={onRestart} label="🔁 もういちど遊[あそ]ぶ" data-testid="restart" />
        <Button variant="ghost" onClick={onShowSources} label="出典[しゅってん]・このゲームについて" />
      </div>
    </Screen>
  )
}
