import { expect, test, type Page } from '@playwright/test'
import { SORT_ITEMS } from '../src/data/items'
import { FLAG_QUIZZES, REWARD_QUIZ } from '../src/data/quiz'
import { ROOMS } from '../src/data/rooms'

async function playStage1(page: Page) {
  for (let i = 0; i < SORT_ITEMS.length; i++) {
    const itemId = await page.getByTestId('item-name').getAttribute('data-item-id')
    const item = SORT_ITEMS.find((it) => it.id === itemId)!
    await page.getByTestId(`option-${item.verdict}`).click()
    await expect(page.getByTestId('feedback-correct')).toBeVisible()
    await page.getByTestId('feedback-correct').getByRole('button').click()
    if (item.prep) {
      await page.getByTestId(`option-${item.prep.correctId}`).click()
      await expect(page.getByTestId('feedback-correct')).toBeVisible()
      await page.getByTestId('feedback-correct').getByRole('button').click()
    }
  }
}

test('3つのステージを通しでクリアできる', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/リサイクル大作戦/)
  await page.getByTestId('start').click()

  // ステージ1
  await expect(page.getByTestId('screen-stage1')).toBeVisible()
  await playStage1(page)

  // ステージ2：まちがった目印 → ヒント → 黄色い旗
  await expect(page.getByTestId('screen-stage2')).toBeVisible()
  await page.getByTestId('spot-red-flag').click()
  await expect(page.getByTestId('flag-hint')).toBeVisible()
  await page.getByTestId('spot-yellow-flag').click()
  await expect(page.getByTestId('feedback-correct')).toBeVisible()
  await page.getByTestId('feedback-correct').getByRole('button').click()
  for (const quiz of FLAG_QUIZZES) {
    await expect(page.getByTestId('quiz-question')).toHaveAttribute('data-quiz-id', quiz.id)
    await page.getByTestId(`option-${quiz.correctId}`).click()
    await expect(page.getByTestId('feedback-correct')).toBeVisible()
    await page.getByTestId('feedback-correct').getByRole('button').click()
  }
  await expect(page.getByRole('link', { name: /年間回収日程表/ })).toHaveAttribute('href', /R8yuuka\.pdf$/)
  await page.getByTestId('to-stage3').click()

  // ステージ3
  await expect(page.getByTestId('screen-stage3')).toBeVisible()
  await page.getByTestId('to-reward-quiz').click()
  await page.getByTestId(`option-${REWARD_QUIZ.correctId}`).click()
  await expect(page.getByTestId('feedback-correct')).toBeVisible()
  await page.getByTestId('feedback-correct').getByRole('button').click()
  for (let i = 0; i < 3; i++) await page.getByTestId('deliver').click()
  await expect(page.getByTestId('reward-unlocked')).toBeVisible()
  await page.getByTestId('to-clear').click()

  // クリア画面
  await expect(page.getByTestId('screen-clear')).toBeVisible()
  await expect(page.getByTestId('clear-message')).toContainText('有価物回収')
  await expect(page.getByTestId('link-rules')).toHaveAttribute('href', /yukabutu\.html$/)
  await expect(page.getByTestId('link-schedule')).toHaveAttribute('href', /R8yuuka\.pdf$/)
  await expect(page.getByTestId('link-sites')).toHaveAttribute('href', /kaishubasyo\/index\.html$/)

  // 学区の任意選択（自動確定しない注意書きが出る）
  await page.locator('#school').selectOption('kamagaya')
  await expect(page.getByTestId('school-note')).toContainText('年間回収日程表')

  // 最高点が保存されている
  await page.getByTestId('restart').click()
  await expect(page.getByTestId('screen-title')).toContainText('さいこうポイント')
})

test('アニメーションと音をOFFにできる', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('switch', { name: 'アニメーション' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-animation', 'off')
  await page.getByRole('switch', { name: '効果音' }).click()
  await expect(page.getByRole('switch', { name: '効果音' })).toHaveAttribute('aria-checked', 'false')
  await page.reload()
  await expect(page.getByRole('switch', { name: '効果音' })).toHaveAttribute('aria-checked', 'false')
})

test('おへやで有価物さがしで、2部屋とも3つ星を取れる', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('start-room').click()
  for (let i = 0; i < ROOMS.length; i++) {
    const room = ROOMS[i]
    await expect(page.getByTestId('room-progress')).toHaveText(`${i + 1} / ${ROOMS.length}`)
    await expect(page.getByTestId('check')).toBeDisabled()
    for (const o of room.objects.filter((x) => x.accepted)) {
      await page.getByTestId(`object-${o.id}`).click()
      await expect(page.getByTestId(`object-${o.id}`)).toHaveAttribute('data-marked', 'true')
    }
    await page.getByTestId('check').click()
    await expect(page.getByTestId('stars')).toHaveAttribute('data-stars', '3')
    await expect(page.getByTestId('result-found').locator('li')).toHaveCount(room.objects.filter((x) => x.accepted).length)
    if (i + 1 < ROOMS.length) await page.getByTestId('next-room').click()
  }
  await page.getByTestId('room-exit').click()
  await expect(page.getByTestId('screen-title')).toContainText('おへやさがしの星')
})
