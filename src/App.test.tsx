import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { SORT_ITEMS } from './data/items'
import { ROOMS } from './data/rooms'
import { stripFurigana } from './lib/furigana'

/** <ruby> の読みと括弧を除いた本文テキスト */
function plainText(element: HTMLElement): string {
  const clone = element.cloneNode(true) as HTMLElement
  clone.querySelectorAll('rt, rp').forEach((n) => n.remove())
  return clone.textContent ?? ''
}

/** 選択肢は表示直後に誤タップ防止のロックがかかるため、押せるようになるまで待つ */
async function clickOption(user: ReturnType<typeof userEvent.setup>, id: string) {
  const button = screen.getByTestId(`option-${id}`)
  await waitFor(() => expect(button).toBeEnabled())
  await user.click(button)
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('タイトル画面からステージ1に進める', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByTestId('screen-title')).toBeInTheDocument()
    await user.click(screen.getByTestId('start'))
    expect(screen.getByTestId('screen-stage1')).toBeInTheDocument()
    expect(screen.getByTestId('stage1-progress')).toHaveTextContent(`1 / ${SORT_ITEMS.length}`)
  })

  it('設定トグルがlocalStorageに保存される', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('switch', { name: '効果音' }))
    expect(JSON.parse(localStorage.getItem('krq:settings:v1')!)).toMatchObject({ sound: false })
  })

  it('ステージ1で正解すると解説とポイントが表示される', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByTestId('start'))
    const itemId = screen.getByTestId('item-name').dataset.itemId!
    const item = SORT_ITEMS.find((i) => i.id === itemId)!
    await clickOption(user, item.verdict)
    expect(screen.getByTestId('feedback-correct')).toBeInTheDocument()
    expect(screen.getByTestId('points')).toHaveTextContent('5')
    expect(plainText(screen.getByTestId('feedback-correct'))).toContain(stripFurigana(item.explanation))
  })

  it('準備が必要な品目は、同じ品目のままステップ2（出し方）に進む', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByTestId('start'))
    // 準備が必要な品目が出るまで進める
    for (let i = 0; i < SORT_ITEMS.length; i++) {
      const itemId = screen.getByTestId('item-name').dataset.itemId!
      const item = SORT_ITEMS.find((it) => it.id === itemId)!
      expect(plainText(screen.getByTestId('step-badge'))).toContain('ステップ1')
      await clickOption(user, item.verdict)
      await user.click(screen.getByTestId('feedback-correct').querySelector('button')!)
      if (item.verdict === 'prep') {
        expect(screen.getByTestId('item-name').dataset.itemId).toBe(itemId)
        expect(plainText(screen.getByTestId('step-badge'))).toContain('ステップ2')
        return
      }
    }
    throw new Error('準備が必要な品目が出題されなかった')
  })

  it('不正解でも再挑戦できる', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByTestId('start'))
    await clickOption(user, 'asis')
    expect(screen.getByTestId('feedback-wrong')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /もういちど/ }))
    await waitFor(() => expect(screen.getByTestId('option-prep')).toBeEnabled())
    expect(screen.getByTestId('option-asis')).toBeDisabled()
  })

  it('おへやで有価物さがしで、有価物だけに丸をつけると3つ星になる', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByTestId('start-room'))
    expect(screen.getByTestId('screen-room')).toBeInTheDocument()
    expect(screen.getByTestId('check')).toBeDisabled()
    const room = ROOMS[0]
    for (const o of room.objects.filter((x) => x.accepted)) await user.click(screen.getByTestId(`object-${o.id}`))
    // もういちどタップすると丸が消える
    const first = room.objects.find((x) => x.accepted)!
    await user.click(screen.getByTestId(`object-${first.id}`))
    expect(screen.getByTestId(`object-${first.id}`)).toHaveAttribute('data-marked', 'false')
    await user.click(screen.getByTestId(`object-${first.id}`))
    await user.click(screen.getByTestId('check'))
    expect(screen.getByTestId('stars')).toHaveAttribute('data-stars', '3')
    expect(screen.getByTestId('result-found').children).toHaveLength(room.objects.filter((x) => x.accepted).length)
    expect(screen.queryByTestId('result-wrong')).toBeNull()
    expect(JSON.parse(localStorage.getItem('krq:progress:v1')!).roomStars).toEqual({ [room.id]: 3 })
    await user.click(screen.getByTestId('next-room'))
    expect(screen.getByTestId('room-progress')).toHaveTextContent('2 / 2')
  })

  it('対象外に丸をつけると、答え合わせでまちがいとして解説が出る', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByTestId('start-room'))
    const wrong = ROOMS[0].objects.find((x) => !x.accepted)!
    await user.click(screen.getByTestId(`object-${wrong.id}`))
    await user.click(screen.getByTestId('check'))
    expect(screen.getByTestId('stars')).toHaveAttribute('data-stars', '1')
    expect(plainText(screen.getByTestId('result-wrong'))).toContain(stripFurigana(wrong.explanation))
    expect(screen.getByTestId(`object-${wrong.id}`)).toHaveAttribute('data-status', 'wrong')
  })

  it('出典画面に公式サイトへのリンクとキャラクターの説明がある', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: '出典・このゲームについて' }))
    const list = screen.getByTestId('source-list')
    expect(list.querySelectorAll('a[href^="https://www.city.kamagaya.chiba.jp/"]').length).toBe(4)
    expect(screen.getByTestId('character-status')).toHaveTextContent('むだなしくん')
    expect(screen.getByTestId('character-source-list').querySelectorAll('a').length).toBe(2)
  })

  it('出典画面から保存データを消せる', async () => {
    const user = userEvent.setup()
    localStorage.setItem('krq:progress:v1', JSON.stringify({ bestPoints: 100, clearCount: 2, schoolId: 'tobu' }))
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<App />)
    expect(screen.getByTestId('screen-title')).toHaveTextContent('さいこうポイント')
    await user.click(screen.getByRole('button', { name: '出典・このゲームについて' }))
    await user.click(screen.getByTestId('clear-data'))
    expect(screen.getByTestId('clear-data-done')).toBeInTheDocument()
    expect(localStorage.getItem('krq:progress:v1')).toBeNull()
    await user.click(screen.getByTestId('back'))
    expect(screen.getByTestId('screen-title')).not.toHaveTextContent('さいこうポイント')
  })
})
