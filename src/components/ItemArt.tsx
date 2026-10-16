import { itemImagePath } from '../data/illustrations'

/**
 * 品目のアイコン。いらすとやの素材（public/images/items/<art>.png）を表示する。
 * 出典と利用条件は src/data/illustrations.ts と NOTICE.md を参照。
 */
interface ItemArtProps {
  art: string
  className?: string
  /** 画像の説明。品目名の横に置くときは省略して装飾扱いにする */
  alt?: string
}

export function ItemArt({ art, className = 'size-40', alt = '' }: ItemArtProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}${itemImagePath(art)}`}
      alt={alt}
      width={240}
      height={240}
      className={`${className} object-contain`}
      decoding="async"
      loading="lazy"
      data-art={art}
    />
  )
}
