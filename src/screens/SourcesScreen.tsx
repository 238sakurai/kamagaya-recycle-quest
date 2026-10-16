import type { ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Screen } from '../components/Screen'
import { CHARACTER, isOfficialMascotAvailable } from '../config/character'
import { ILLUSTRATIONS, ILLUSTRATIONS_VERIFIED_AT, IRASUTOYA_TERMS_URL } from '../data/illustrations'
import { CHARACTER_SOURCE_IDS, CONTACT, RULE_SOURCE_IDS, SOURCES, type Source } from '../data/sources'

interface SourcesScreenProps {
  onBack: () => void
  onClearData: () => void
}

function Section({ title, children, tone }: { title: string; children: ReactNode; tone?: 'white' | 'sky' | 'pink' | 'yellow' }) {
  return (
    <Card tone={tone} className="flex flex-col gap-2 text-sm leading-relaxed">
      <h3 className="text-base font-bold">{title}</h3>
      {children}
    </Card>
  )
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4">
      {children} ↗
    </a>
  )
}

function SourceList({ sources, testId }: { sources: Source[]; testId: string }) {
  return (
    <ul className="flex flex-col gap-3" data-testid={testId}>
      {sources.map((s) => (
        <li key={s.id} className="text-sm leading-relaxed">
          <ExternalLink href={s.url}>{s.title}</ExternalLink>
          <br />
          <span className="text-eco-brown/70">
            ページ更新日 {s.pageUpdatedAt} ／ 確認日 {s.verifiedAt}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function SourcesScreen({ onBack, onClearData }: SourcesScreenProps) {
  const [cleared, setCleared] = useState(false)
  const officialApproved = isOfficialMascotAvailable()

  const clearData = () => {
    if (!window.confirm('このブラウザに保存されたポイント・クリア回数・設定・学区の選択を消します。よろしいですか？')) return
    onClearData()
    setCleared(true)
  }

  return (
    <Screen testId="screen-sources" header={<h2 className="text-xl font-black">出典・このゲームについて</h2>}>
      <Section title="かまがや リサイクル大作戦！">
        <p>鎌ケ谷市PTAの有価物回収運動（何を・どう分けて・いつ・どこに出すか、集めた資源がどう学校に還元されるか）を、3〜5分で楽しく学ぶ子ども向けゲームです。</p>
        <p className="font-bold">このゲームは鎌ケ谷市および鎌ケ谷市PTAの公式事業ではありません。個人が制作した非公式の普及啓発ゲームです。</p>
      </Section>

      <Section title="出典（鎌ケ谷市公式サイト）" tone="sky">
        <p>出題内容は以下の公式ページと照合しています。公式ページの文章や画像は転載せず、要点を子ども向けに言い換えています。</p>
        <SourceList sources={RULE_SOURCE_IDS.map((id) => SOURCES[id])} testId="source-list" />
        <p className="text-xs text-eco-brown/70">
          ルールは変わることがあります。最新の情報は公式ページ、または {CONTACT.department}（電話 {CONTACT.tel}）でご確認ください。
        </p>
      </Section>

      <Section title="市のごみ収集との違い">
        <p>市の通常のごみ収集（市指定袋・ごみ集積所・朝8時まで）と、PTAが主体となる有価物回収運動（黄色い旗・回収日当日の午前9時まで）は別の制度です。このゲームは有価物回収運動のルールを扱い、対象外の品目については市のごみ収集の案内を補足しています。</p>
        <p>回収日の具体的な日付と回収場所の住所はゲーム内に表示しません。公式の年間回収日程表と町名別の回収場所一覧で確認してください。回収場所には利用できる人が限られる場所や、変更になる場所があります。</p>
      </Section>

      <Section title={`${CHARACTER.official.name}について`} tone="yellow">
        <p>
          「{CHARACTER.official.name}」は、1997年に鎌ケ谷市のごみ減量とリサイクル推進のために生まれた市のキャラクターです（{CHARACTER.official.description}）。
        </p>
        <p data-testid="character-status">
          {officialApproved
            ? `市の承諾を得た画像を使用しています。${CHARACTER.official.credit}`
            : `市の公式ページでキャラクターのデザインは無断使用・転載できないとされているため、承諾を得るまで${CHARACTER.official.name}の公式画像は使用していません。`}
        </p>
        {!officialApproved ? (
          <p data-testid="illustration-credit">
            タイトルとクリア画面のイラストは、
            <ExternalLink href={CHARACTER.placeholder.pageUrl}>
              {CHARACTER.placeholder.author}「{CHARACTER.placeholder.name}」
            </ExternalLink>
            を
            <ExternalLink href={CHARACTER.placeholder.termsUrl}>利用規約</ExternalLink>
            の範囲で使用しています（{CHARACTER.placeholder.description}。確認日 {CHARACTER.placeholder.verifiedAt}）。
          </p>
        ) : null}
        <p>鎌ケ谷市のマスコットキャラクター「かまたん」も、使用には市の承認申請が必要なため使用していません。</p>
        <SourceList sources={CHARACTER_SOURCE_IDS.map((id) => SOURCES[id])} testId="character-source-list" />
        <p className="text-xs text-eco-brown/70">
          キャラクターの所管: {CONTACT.characterDepartment}（電話 {CONTACT.characterTel}）
        </p>
      </Section>

      <Section title="イラストの出典（いらすとや）" tone="yellow">
        <p>
          資源や部屋の品目のアイコン {ILLUSTRATIONS.length} 点は、
          <ExternalLink href="https://www.irasutoya.com/">いらすとや</ExternalLink>
          の素材を<ExternalLink href={IRASUTOYA_TERMS_URL}>利用規約</ExternalLink>の範囲で縮小して使用しています（確認日 {ILLUSTRATIONS_VERIFIED_AT}）。素材の著作権は作者にあり、このゲームから素材を取り出して配布することはできません。
        </p>
        <details>
          <summary className="tap-area cursor-pointer font-bold">使用している素材の一覧</summary>
          <ul className="mt-2 flex flex-col gap-1 text-xs" data-testid="illustration-list">
            {ILLUSTRATIONS.map((i) => (
              <li key={i.key}>
                <ExternalLink href={i.pageUrl}>{i.title}</ExternalLink>
                {i.note ? `（${i.note}）` : ''}
              </li>
            ))}
          </ul>
        </details>
      </Section>

      <Section title="プライバシー">
        <ul className="list-disc space-y-1 pl-5">
          <li>氏名・住所・学校名・位置情報などの個人情報は収集しません。入力も求めません。GPS・カメラ・マイクも使いません。</li>
          <li>最高ポイント・クリア回数・設定（音・アニメーション）・任意で選んだ学区は、この端末のブラウザ（localStorage）の中にだけ保存され、外部には送信しません。</li>
          <li>アクセス解析ツールは使っていません。通信を伴うランキングもありません。</li>
          <li>公式ページへのリンクは新しいタブで開きます。リンク先では鎌ケ谷市のサイトの利用条件が適用されます。</li>
        </ul>
        <div className="mt-1 flex flex-col gap-1">
          <Button variant="secondary" onClick={clearData} label="保存[ほぞん]データを消[け]す" data-testid="clear-data" disabled={cleared} />
          {cleared ? (
            <p role="status" className="text-xs text-eco-brown/70" data-testid="clear-data-done">
              保存データを消しました。設定は初期値に戻ります。
            </p>
          ) : null}
        </div>
      </Section>

      <Section title="省電力の工夫">
        <p>イラストはすべてインライン SVG で、常時動く描画ループは持ちません。演出は短い CSS アニメーションだけで、紙吹雪は約2秒で消えます。タブが非表示になるとアニメーションと音を止め、設定の「うごき OFF」「おと OFF」でいつでも止められます。OS の「視差効果を減らす」設定も尊重します。</p>
      </Section>

      <Section title="安全のために">
        <p>重い物・ガラス・割れ物・危険物は子どもだけで運ばず、家庭での準備や回収場所への持ち出しは大人と一緒に行ってください。ゲーム内の演出（本・鑑賞会・備品）は制度のしくみを学ぶための例で、実際の奨励金の金額や各PTAの予算配分を表すものではありません。</p>
      </Section>

      <Section title="ライセンス">
        <p>アプリ本体は MIT License です。タイトル画面と品目アイコンのイラスト（いらすとや）を除き、街・学校・部屋の背景や効果音は自作です。いらすとやの素材は規約により再配布できません。出典と利用条件の一覧は、配布物に同梱の NOTICE.md に記載しています。</p>
      </Section>

      <Button onClick={onBack} label="◀ もどる" data-testid="back" />
    </Screen>
  )
}
