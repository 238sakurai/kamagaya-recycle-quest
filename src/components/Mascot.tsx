import { CHARACTER, isOfficialMascotAvailable, mascotName } from '../config/character'

/**
 * タイトル・クリア画面の案内役の画像。
 * 市のごみ減量・リサイクル推進キャラクター「むだなしくん」の画像は、市の承諾を得るまで使わない。
 * 承諾前はいらすとやの「リサイクルのイメージのイラスト」を表示する。
 */
interface MascotProps {
  className?: string
}

export function Mascot({ className = 'size-32' }: MascotProps) {
  const src = isOfficialMascotAvailable() ? CHARACTER.official.imageSrc : CHARACTER.placeholder.imageSrc
  return (
    <img
      src={`${import.meta.env.BASE_URL}${src}`}
      alt={mascotName()}
      width={400}
      height={385}
      className={`${className} object-contain`}
      decoding="async"
      data-testid="mascot"
    />
  )
}
