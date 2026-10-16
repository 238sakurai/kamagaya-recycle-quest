import { describe, expect, it } from 'vitest'
import { CHARACTER, isOfficialMascotAvailable, mascotName } from './character'

describe('キャラクター設定', () => {
  it('承諾フラグと画像パスの組み合わせが矛盾しない', () => {
    const { officialImageApproved, imageSrc } = CHARACTER.official
    if (officialImageApproved) expect(imageSrc).toMatch(/^images\//)
    else expect(imageSrc).toBeNull()
  })

  it('未承諾のあいだはオリジナルキャラクターの名前を使う', () => {
    expect(isOfficialMascotAvailable()).toBe(CHARACTER.official.officialImageApproved && CHARACTER.official.imageSrc !== null)
    expect(mascotName()).toBe(isOfficialMascotAvailable() ? CHARACTER.official.name : CHARACTER.placeholder.name)
  })

  it('公式ページの URL は鎌ケ谷市の公式ドメイン', () => {
    expect(CHARACTER.official.infoUrl).toMatch(/^https:\/\/www\.city\.kamagaya\.chiba\.jp\//)
  })
})
