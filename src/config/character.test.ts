import { describe, expect, it } from 'vitest'
import { CHARACTER, isOfficialMascotAvailable, mascotName } from './character'

describe('キャラクター設定', () => {
  it('承諾フラグと画像パスの組み合わせが矛盾しない', () => {
    const { officialImageApproved, imageSrc } = CHARACTER.official
    if (officialImageApproved) expect(imageSrc).toMatch(/^images\//)
    else expect(imageSrc).toBeNull()
  })

  it('未承諾のあいだは、いらすとやのイラストの説明を alt に使う', () => {
    expect(isOfficialMascotAvailable()).toBe(CHARACTER.official.officialImageApproved && CHARACTER.official.imageSrc !== null)
    if (isOfficialMascotAvailable()) expect(mascotName()).toBe(CHARACTER.official.name)
    else expect(mascotName()).toContain(CHARACTER.placeholder.author)
  })

  it('いらすとやのイラストは出典ページ・規約・確認日を持ち、画像が public にある', async () => {
    const { existsSync } = await import('node:fs')
    expect(CHARACTER.placeholder.pageUrl).toMatch(/^https:\/\/www\.irasutoya\.com\//)
    expect(CHARACTER.placeholder.termsUrl).toMatch(/^https:\/\/www\.irasutoya\.com\//)
    expect(CHARACTER.placeholder.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(existsSync(`public/${CHARACTER.placeholder.imageSrc}`)).toBe(true)
  })

  it('公式ページの URL は鎌ケ谷市の公式ドメイン', () => {
    expect(CHARACTER.official.infoUrl).toMatch(/^https:\/\/www\.city\.kamagaya\.chiba\.jp\//)
  })
})
