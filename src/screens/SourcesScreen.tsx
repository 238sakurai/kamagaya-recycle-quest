import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Screen } from '../components/Screen'
import { CONTACT, SOURCE_LIST } from '../data/sources'

interface SourcesScreenProps {
  onBack: () => void
}

export function SourcesScreen({ onBack }: SourcesScreenProps) {
  return (
    <Screen testId="screen-sources" header={<h2 className="text-xl font-black">出典・このゲームについて</h2>}>
      <Card className="flex flex-col gap-2 text-sm leading-relaxed">
        <p>
          「かまがや リサイクル大作戦！」は、鎌ケ谷市PTAの有価物回収運動への理解と参加を広げるために作られた、非公式の普及啓発ゲームです。出題内容は以下の鎌ケ谷市公式ページと照合しています。
        </p>
        <p>
          市の通常のごみ収集（市指定袋・ごみ集積所）と、PTAが主体となる有価物回収運動（黄色い旗・午前9時まで）は別の制度です。ゲームでは有価物回収運動のルールを扱い、対象外の品目については市のごみ収集の案内を補足しています。
        </p>
      </Card>

      <Card tone="sky" className="flex flex-col gap-3">
        <p className="text-base font-bold">出典（鎌ケ谷市公式サイト）</p>
        <ul className="flex flex-col gap-3" data-testid="source-list">
          {SOURCE_LIST.map((s) => (
            <li key={s.id} className="text-sm leading-relaxed">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4">
                {s.title}
              </a>
              <br />
              <span className="text-eco-brown/70">
                ページ更新日 {s.pageUpdatedAt} ／ 確認日 {s.verifiedAt}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-eco-brown/70">
          ルールは変わることがあります。最新の情報は公式ページ、または {CONTACT.department}（電話 {CONTACT.tel}）でご確認ください。
        </p>
      </Card>

      <Card className="flex flex-col gap-2 text-sm leading-relaxed">
        <p className="text-base font-bold">プライバシーと省電力</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>氏名・住所・学校名などの個人情報は収集しません。入力も求めません。</li>
          <li>設定と進捗（ポイント・任意の学区選択）はこの端末のブラウザ内にだけ保存されます。</li>
          <li>通信を伴うランキングはありません。GPS・カメラ・マイクも使いません。</li>
          <li>アニメーションと効果音はいつでもOFFにできます。タブが非表示のときは動きを止めます。</li>
        </ul>
      </Card>

      <Card className="flex flex-col gap-2 text-sm leading-relaxed">
        <p className="text-base font-bold">キャラクターについて</p>
        <p>
          ゲームに登場する緑のキャラクター「リサ丸」は、リサイクルマークをモチーフにしたオリジナルキャラクターです。鎌ケ谷市のマスコット「かまたん」は、利用条件の確認と使用承認を得るまで使用していません。
        </p>
      </Card>

      <Button onClick={onBack} label="◀ もどる" data-testid="back" />
    </Screen>
  )
}
