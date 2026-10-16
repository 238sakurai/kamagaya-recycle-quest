import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { SORT_ITEMS } from './data/items'
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
    expect(screen.getByTestId('points')).toHaveTextContent('10')
    expect(plainText(screen.getByTestId('feedback-correct'))).toContain(stripFurigana(item.explanation))
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

  it('出典画面に公式サイトへのリンクがある', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: '出典・このゲームについて' }))
    const list = screen.getByTestId('source-list')
    expect(list.querySelectorAll('a[href^="https://www.city.kamagaya.chiba.jp/"]').length).toBeGreaterThanOrEqual(4)
  })
})
