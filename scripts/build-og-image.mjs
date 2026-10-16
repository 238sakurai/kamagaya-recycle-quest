/**
 * リンク共有用のアイキャッチ画像（OGP 画像, 1200x630）を生成する。
 *
 *   node scripts/build-og-image.mjs
 *
 * ゲームと同じ配色・SVG で描いた HTML を Playwright の Chromium でスクリーンショットし、
 * public/og-image.png に書き出す。文字はシステムフォント（macOS のヒラギノ丸ゴ）で描くため、
 * macOS で実行する想定。むだなしくんの公式画像は承諾を得ていないため描かない
 * （docs/mudanashikun-usage-notes.md）。タイトル画像と資源のイラストはいらすとやの素材を使う（NOTICE.md）。
 */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const root = fileURLToPath(new URL('..', import.meta.url))
const BROWN = '#453830'

/** いらすとや「リサイクルのイメージのイラスト」（public/images/irasutoya-recycle.png）を data URI で埋め込む */
const illustration = `data:image/png;base64,${(await readFile(`${root}public/images/irasutoya-recycle.png`)).toString('base64')}`
const mascot = `<img src="${illustration}" width="290" height="279" alt="" />`

/** 資源のイラスト（いらすとや、public/images/items/<key>.png）を data URI で埋め込む */
const itemData = async (key) => `data:image/png;base64,${(await readFile(`${root}public/images/items/${key}.png`)).toString('base64')}`
const item = async (key, size) => `<img src="${await itemData(key)}" width="${size}" height="${size}" alt="" style="object-fit:contain" />`

/** 黄色い旗 */
const flag = `
<svg viewBox="-30 -10 80 90" width="150" height="170" xmlns="http://www.w3.org/2000/svg">
  <rect x="-2" y="0" width="4" height="66" fill="${BROWN}" />
  <path d="M2 2 L46 15 L2 30 Z" fill="#FFD85A" stroke="${BROWN}" stroke-width="2" />
  <rect x="-22" y="54" width="48" height="14" fill="#FFFDF7" stroke="${BROWN}" stroke-width="1.5" />
  <circle cx="-13" cy="61" r="4" fill="#B8E4FF" />
  <rect x="-2" y="57" width="10" height="8" fill="#E0B87A" />
  <rect x="12" y="57" width="7" height="8" fill="#DDD" />
</svg>`

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    font-family: 'Hiragino Maru Gothic ProN', 'Hiragino Maru Gothic Pro', 'BIZ UDPGothic', 'Noto Sans JP', sans-serif;
    color: ${BROWN};
    background: linear-gradient(180deg, #B8E4FF 0%, #FFFDF7 60%);
  }
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 150px; background: #A8E0B4; }
  .frame { position: absolute; inset: 24px; border: 6px solid #58C78E; border-radius: 40px; }
  .text { position: absolute; left: 76px; top: 92px; white-space: nowrap; }
  .badge {
    display: inline-flex; align-items: center; gap: 12px;
    background: #FFD85A; color: ${BROWN}; font-size: 28px; font-weight: 700;
    padding: 10px 26px; border-radius: 999px;
  }
  h1 { margin-top: 26px; font-size: 84px; line-height: 1.12; font-weight: 700; letter-spacing: 0.01em; }
  h1 .small { display: block; font-size: 56px; }
  h1 .accent { color: #3EA973; }
  .lead { margin-top: 22px; font-size: 36px; font-weight: 700; color: #6b5a4e; }
  .items { position: absolute; left: 76px; bottom: 48px; display: flex; gap: 10px; align-items: flex-end; }
  .item { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 22px; font-weight: 700; }
  .mascot { position: absolute; right: 70px; top: 100px; }
  .flag { position: absolute; right: 70px; bottom: 56px; }
  .sun { position: absolute; right: 44px; top: 44px; width: 70px; height: 70px; border-radius: 50%; background: #FFD85A; }
</style>
</head>
<body>
  <div class="ground"></div>
  <div class="frame"></div>
  <div class="sun"></div>
  <div class="text">
    <div class="badge">♻ 鎌ケ谷市PTA 有価物回収運動を学ぶゲーム</div>
    <h1><span class="small">かまがや</span>リサイクル<span class="accent">大作戦！</span></h1>
    <p class="lead">あつめて、わけて、学校をハッピーに！</p>
  </div>
  <div class="items">
    <div class="item">${await item('newspaper', 110)}<span>新聞</span></div>
    <div class="item">${await item('cardboard', 110)}<span>ダンボール</span></div>
    <div class="item">${await item('can', 110)}<span>空き缶</span></div>
    <div class="item">${await item('bottle', 110)}<span>空きビン</span></div>
    <div class="item">${await item('clothes', 110)}<span>古着</span></div>
  </div>
  <div class="mascot">${mascot}</div>
  <div class="flag">${flag}</div>
</body>
</html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(html)
  await page.screenshot({ path: `${root}public/og-image.png`, type: 'png' })
} finally {
  await browser.close()
}
console.log('public/og-image.png を書き出しました')
