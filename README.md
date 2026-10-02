<p align="center">
  <img alt="License MIT" src="https://img.shields.io/badge/License-MIT-39C5BB?style=flat-square&amp;labelColor=0b2429&amp;logo=opensourceinitiative&amp;logoColor=ffffff">
  <img alt="GitHub Pages live" src="https://img.shields.io/badge/GitHub_Pages-live-FF2F8E?style=flat-square&amp;labelColor=0b2429&amp;logo=githubpages&amp;logoColor=ffffff">
  <img alt="纯前端 零依赖" src="https://img.shields.io/badge/%E7%BA%AF%E5%89%8D%E7%AB%AF-%E9%9B%B6%E4%BE%9D%E8%B5%96-39C5BB?style=flat-square&amp;labelColor=0b2429">
  <img alt="Made with 💪" src="https://img.shields.io/badge/Made_with-%F0%9F%92%AA-FF2F8E?style=flat-square&amp;labelColor=0b2429">
  <img alt="Stars" src="https://img.shields.io/github/stars/liceses/hatsune-miku-cv01?style=flat-square&amp;label=Stars&amp;color=f7f56a&amp;labelColor=0b2429">
</p>
<p align="center">
  <img alt="HTML5 单文件 479 行" src="https://img.shields.io/badge/HTML5-%E5%8D%95%E6%96%87%E4%BB%B6_479_%E8%A1%8C-E34F26?style=flat-square&amp;labelColor=0b2429&amp;logo=html5&amp;logoColor=ffffff">
  <img alt="CSS3 1261 行 零框架" src="https://img.shields.io/badge/CSS3-1261_%E8%A1%8C_%E9%9B%B6%E6%A1%86%E6%9E%B6-1572B6?style=flat-square&amp;labelColor=0b2429&amp;logo=css3&amp;logoColor=ffffff">
  <img alt="JavaScript 原生 ES2020" src="https://img.shields.io/badge/JavaScript-%E5%8E%9F%E7%94%9F_ES2020-F7DF1E?style=flat-square&amp;labelColor=0b2429&amp;logo=javascript&amp;logoColor=000000">
  <img alt="字体 479 个 woff2 自托管" src="https://img.shields.io/badge/%E5%AD%97%E4%BD%93-479_%E4%B8%AA_woff2_%E8%87%AA%E6%89%98%E7%AE%A1-39C5BB?style=flat-square&amp;labelColor=0b2429&amp;logo=googlefonts&amp;logoColor=ffffff">
  <img alt="离线可用" src="https://img.shields.io/badge/%E7%A6%BB%E7%BA%BF-%E5%8F%AF%E7%94%A8-a8fff4?style=flat-square&amp;labelColor=0b2429">
</p>

<h1 align="center">初音ミク / HATSUNE MIKU — CV01 介绍页</h1>

<p align="center">
  <b>▶ 线上地址：<a href="https://liceses.github.io/hatsune-miku-cv01/">https://liceses.github.io/hatsune-miku-cv01/</a></b>
</p>

> 一页 479 行 HTML 撑起来的初音未来完全资料页。
> **零框架、零构建、零 CDN、零外部请求** —— 拔掉网线双击 `index.html`，她照样开唱。

![HERO — 初音ミク 首屏](preview/hero.png)

---

## 一眼看懂

| 项 | 事实 |
| --- | --- |
| 页面本体 | `index.html` · **479 行 / 28.7 KB** —— 结构、文案、SEO meta 全在这一个文件里 |
| 样式 | `assets/css/miku.css` · **1261 行 / 34.5 KB** —— 手写 CSS，**21 个 `@keyframes`**、4 个 `@media` 块 |
| 交互 | `assets/js/miku.js` · **429 行 / 15.9 KB** —— 原生 ES2020，单个 IIFE，**无任何依赖** |
| 字体 | `assets/fonts/` · **479 个 woff2** 子集 + `fonts.css`（**582 条 `@font-face`**），5 个字族，全部本地文件、全部存在 |
| 立绘 | `assets/img/png/` · **7 张**官方透明 PNG（6 张立绘 + 1 张字标），单张最大 1.13 MB |
| 截图 | `preview/` · **5 张**页面实拍（480 KB ~ 833 KB） |
| 外部请求 | **0**。没有 CDN、没有 Google Fonts 外链、没有统计脚本、没有 iframe；`index.html` 里唯一的 `https` 出现在页脚 4 条「资料来源」`<a href>` 上，点了才请求 |
| 仓库体积 | 约 **17.1 MB**，几乎全是字体与立绘 |
| 构建步骤 | **无**。没有 `package.json`，没有 `node_modules`，改完刷新浏览器就是最新版 |
| 响应式 | `1080px` / `640px` 两档断点；触屏设备自动关掉自定义光标与导航点 |
| 无障碍 | 跟随系统 `prefers-reduced-motion`，动画时长压到 0.001s，tilt / 视差 / 残影全部停摆 |
| 主色 | 初音ミク グリーン `#39C5BB`，点缀粉 `#FF2F8E` |

---

## 页面里有什么

七个 section 一路推到底，中间夹两条无缝跑马灯：

| # | 区块 | 内容 |
| --- | --- | --- |
| — | **BOOT** | 开机动画：`0% → 100%` 进度条 + 伪终端文案，结束后 toast「CV01 上线 —— 39 / 初音ミク」 |
| — | **HUD** | 顶部滚动进度条、左右两列竖排 rail、右侧 7 个导航点（悬停显示区块名）、系统实时时钟 |
| — | **HERO** | 巨型「初音ミク」标题 + 英文副题、6 枚属性 chip、引言、2 个 CTA、全身立绘、自转 `39` 徽章、5 个飘浮音符、两条双马尾绸带 SVG |
| 01 | **PROFILE** | **16 行铭牌**：名前 / 身長 158cm / 体重 42kg / 年齢 16 / 誕生日 2007.08.31 / 声源 藤田咲 / 角色设计 KEI / 開発 Crypton（札幌）/ 引擎 V2→V6 / 代表色 #39C5BB / 标志物 / 得意分野 / 代表曲 / 価格 ¥15,750 / 授権 PCL / 設定背景；配 V3 盒绘卡 + **6 个滚动计数卡** |
| — | **TICKER ×2** | 曲名 / 关键词无缝跑马灯，反向滚动一条 |
| 02 | **SONGS** | **12 张**代表曲卡：曲名、中文释义、P 主、年月、一句话点评、悬停弹出 6 条均衡器 |
| 03 | **STORY** | **6 张**设定卡（名字由来 / 2007 诞生 / PCL 授权 / 演唱会与现实世界 / 永远的 16 岁 / 她属于谁）+ 一段大字引言 |
| 04 | **HISTORY** | **13 个**里程碑：2007.08.31 发售 → 2007 创作雪崩 → 神曲期 → 2009 首次登台 → 2010.03.09 39's Giving Day → Append → 2012 Tell Your World → 2013 マジカルミライ → 2014 MIKU EXPO → V4X → NT → 2025.12 V6 → 2026 北美巡演 10 万人 |
| 05 | **GALLERY** | **6 张**历代立绘横滑画廊，可鼠标抓拽 |
| — | **OUTRO** | 巨型「39」+「サンキュー、そしてこれからも。」+ 三个按钮（葱雨 / 再唱一段 / 回到顶端） |
| — | **FOOTER** | 版权声明、素材说明、4 条资料来源外链、`CV01 / 158CM / 42KG / 2007.08.31 / #39C5BB / 39` |

---

## 交互清单（全部手写，无库）

| 触发 | 表现 | 实现要点 |
| --- | --- | --- |
| 鼠标移动 | 自定义葱绿光标：实心点 + 缓动环（悬停可交互元素变粉加粗），身后撒 🥬 ♪ ♫ ✿ 残影 | `mousemove` + rAF 缓动系数 0.16；残影 46ms 节流、950ms 自动移除 |
| 全程 | 全屏 canvas 粒子场：音符 / `39` / `01` / `ネギ` / `✦` 字形与发光圆点，桌面 108 个、窄屏 46 个，随鼠标做视差偏移 | `#miku-canvas`，DPR 上限 2，`visibilitychange` 时暂停 rAF |
| 悬停卡片 / 立绘 | 3D tilt：`perspective(900px)`，横向 ±16°、纵向 ∓14°，离开弹性回位 | rAF 缓动 0.18，仅 `pointer:fine` 且未开启 reduced-motion 时启用 |
| 悬停 HERO 立绘 | 视差跟手 + 微缩放 + CSS 呼吸浮动 + 马尾甩动 + 39 徽章自转 | rAF 缓动 0.07 + `heroFloat` / `tailWhip` / `badgeSpin` 关键帧 |
| 滚动 | 顶部进度条、右侧导航点高亮、分区揭示（模糊 → 清晰）、英文小标题乱码解码、数字滚动计数 | 3 个 IntersectionObserver + `scroll` 监听，揭示延迟按 `i % 4` 错峰 70ms |
| 悬停代表曲卡 | 底部 6 条均衡器逐条跳动 | `eqBeat` 关键帧 + 每条 `i` 错峰延迟 |
| 点击 **🥬 让葱下起来** | 56 个 🥬 / ♪ / ♫ / ネギ / 39 从天而降，随机大小、时长、延迟、葱绿或粉色光晕 | 动态插 `<span>`，`leekFall` 关键帧，7.4s 后自动回收 |
| 点击 **▶ 播放「39」音型** | WebAudio **现场合成**：方波主旋律（10 音）+ 三角波贝斯 + 26 颗正弦星点，经低通滤波扫频 2600Hz → 900Hz 后衰减 | `OscillatorNode` + `GainNode` + `BiquadFilterNode`，**不加载任何音频文件** |
| 按 `M` / `3` | 彩蛋：葱雨 40 个 / 9 个 + toast | `keydown` |
| 拖拽历代立绘 | 横向抓拽滚动（含抓取光标） | `pointerdown/move/up` 手动同步 `scrollLeft` |
| 停留 4.2 秒 | toast 提示「按 M 键 —— 有惊喜 🥬」 | `setTimeout` |
| 触屏设备 | 隐藏自定义光标、`640px` 以下隐藏导航点、粒子数降到 46 | `@media (pointer: coarse)` + JS 分支 |
| 系统「减少动态效果」 | 关掉 tilt、视差、鼠标残影，动画与过渡时长压到最短 | `prefers-reduced-motion` + JS `matchMedia` 判断 |

---

## 页面实拍

| <img src="preview/profile.png" width="460" alt="01 PROFILE"> | <img src="preview/songs.png" width="460" alt="02 SONGS"> |
| :--: | :--: |
| **01 PROFILE** — 16 行铭牌 + 6 个计数卡 | **02 SONGS** — 12 张代表曲卡，悬停弹均衡器 |
| <img src="preview/history.png" width="460" alt="04 HISTORY"> | <img src="preview/gallery.png" width="460" alt="05 GALLERY"> |
| **04 HISTORY** — 13 个里程碑：2007 → 2026 | **05 GALLERY** — 6 张历代立绘，可抓拽横滑 |

首屏实拍见顶部 `preview/hero.png`；`preview/` 目录里就是这 5 张。

---

## 目录结构

```
hatsune-miku-cv01/                    ← 仓库根目录 = 站点根目录
├─ index.html                         页面本体：BOOT + HUD + 7 个 section + 页脚（479 行）
├─ README.md                          本文件
├─ LICENSE                            MIT（代码部分）+ Crypton 版权归属说明
├─ robots.txt                         允许全部抓取 + Sitemap 指向
├─ sitemap.xml                        只列线上首页这一条 URL
├─ .gitignore                         系统垃圾 / 编辑器 / 日志（含 tools 会写的 _log.txt）
├─ .nojekyll                          让 GitHub Pages 原样直出，跳过 Jekyll 处理
├─ 打开页面.cmd                       Windows 一键预览：找 node → 起服务 → 开浏览器（8899）
├─ assets/
│  ├─ favicon.svg                     纯 SVG 图标：葱绿双马尾 + 一根葱 + 数字 39（64×64，无外链）
│  ├─ css/
│  │  └─ miku.css                     设计变量 / 版式 / 21 个关键帧 / 两档响应式（1261 行）
│  ├─ js/
│  │  └─ miku.js                      粒子场 / tilt / 计数 / 葱雨 / WebAudio（429 行）
│  ├─ fonts/
│  │  ├─ fonts.css                    582 条 @font-face，按 unicode-range 切成子集
│  │  ├─ delagothic/    （123 个 woff2）Dela Gothic One —— 巨型标题
│  │  ├─ notosanssc/    （101 个 woff2）Noto Sans SC 400/900 —— 中文正文
│  │  ├─ mplusrounded/  （252 个 woff2）M PLUS Rounded 1c —— 日文小字
│  │  ├─ orbitron/      （  1 个 woff2）Orbitron —— 数字 / 仪表
│  │  └─ zendots/       （  2 个 woff2）Zen Dots —— 英文标签
│  └─ img/
│     └─ png/                         7 张官方透明 PNG：
│                                     hero_miku / miku_v3 / miku_v3box / miku_v6 /
│                                     miku_chinese / miku_pocket / logo_word
├─ preview/                           5 张页面实拍：hero / profile / songs / history / gallery
└─ tools/
   ├─ serve.mjs                       28 行静态服务器：127.0.0.1:8899，禁目录穿越，no-store
   ├─ dl-img.mjs                      立绘抓取脚本（vocaloid.fandom.com，7 条源 URL）
   ├─ dl-fonts.mjs                    字体抓取脚本（Google Fonts woff2，5 个字族）
   └─ verify-live.mjs                 线上探活脚本：抓首页 → 抽出全部本地引用 → 逐个校验状态与字节数
```

---

## 本地跑起来

**方式 1 · 双击 `index.html`**
最快，但部分浏览器在 `file://` 下会按同源策略拒绝加载 woff2 字体，排版会掉档。只适合快速瞄一眼。

**方式 2 · 双击 `打开页面.cmd`（推荐，字体 100% 正常）**
脚本自动在 PATH 或 DSH 运行时目录里找 `node` → 后台起 `tools/serve.mjs` → 打开 `http://127.0.0.1:8899/`。找不到 node 时它会退化成直接打开 `index.html`。

**方式 3 · 手动起服务器**

```bash
node tools/serve.mjs                 # → http://127.0.0.1:8899/
MIKU_PORT=9000 node tools/serve.mjs  # 换端口
python -m http.server 8899           # 没有 node 就用这个，效果一样
npx serve .                          # 或者任意静态服务器，根目录就是仓库根
```

---

## 部署 / 自建一份

仓库根目录就是站点根目录，`index.html` 在最外层 —— **任何静态托管都能直接吃下去，不需要构建命令、不需要环境变量**。

- **GitHub Pages**：Settings → Pages → Source 选 `Deploy from a branch` → 分支 `main`、目录 `/ (root)` → 保存。线上地址即 `https://<用户名>.github.io/<仓库名>/`。仓库里已放 `.nojekyll`，Pages 会原样直出、不做 Jekyll 预处理。
- **其他平台**：Nginx / Cloudflare Pages / Vercel / Netlify / 对象存储，把整个目录当静态资源目录丢上去即可；构建命令留空，输出目录填 `.`。
- **换域名或换仓库名之后**：记得同步改 `robots.txt` 与 `sitemap.xml` 里的绝对 URL。
- **想只发布不公开源码**：全部资源都是同源相对路径，打包 `index.html + assets/` 就够跑（`preview/`、`tools/`、`README.md` 可以不发）。

---

## 顺手做全的 SEO / 小件

| 文件 | 作用 |
| --- | --- |
| `index.html` 内的 meta | `title`、`description`、`viewport`、`lang="zh-CN"` 已备齐 |
| `robots.txt` | `User-agent: *` + `Allow: /`，并指向本站 `sitemap.xml` |
| `sitemap.xml` | 只声明线上首页一条 URL，带 `lastmod` / `changefreq` / `priority` |
| `assets/favicon.svg` | 纯 SVG 矢量图标，`viewBox="0 0 64 64"`，无外部字体与图片；双马尾（粉 `#FF2F8E` 描边 + 葱绿 `#39C5BB` 内线）、一根葱（白茎 + 绿叶）、底部 `39` 数字 |

---

## 已知小坑

1. **图标还没挂上页面**：`assets/favicon.svg` 已就位，但 `index.html` 第 8 行的 `<link rel="icon">` 目前仍指向 `assets/img/png/logo_word.png`。要启用 SVG 图标，把那行改成 `href="assets/favicon.svg"` 即可（本次只交付图标文件，没有改动页面代码）。
2. **工具脚本里是写死的绝对路径**：`tools/serve.mjs` 的 `root`、`tools/dl-img.mjs` 的 `out`、`tools/dl-fonts.mjs` 的 `root` 都指向开发机上的 `D:/developing/DSH-plugin/dsh-cosplay/miku`。换机器先改这几行常量，或者干脆用 `python -m http.server`。
3. **`file://` 下字体可能被拒**：这是浏览器的同源策略，不是页面 bug。本地预览请走 `打开页面.cmd` 或任意静态服务器。
4. **抓取脚本依赖第三方 URL**：`dl-img.mjs` 里的 7 条 fandom 图片直链将来可能失效；立绘已经全部落在 `assets/img/png/`，脚本失效不影响页面运行。
5. **`assets/fonts/_log.txt`** 是抓取脚本顺手写的日志，已被 `.gitignore` 忽略。

---

## 素材与版权

- **立绘 / 角色**：初音ミク 官方插画，版权归 **Crypton Future Media** 及原画师（KEI、iXima 等）所有；本仓库的 PNG 经 `tools/dl-img.mjs` 取自 [vocaloid.fandom.com](https://vocaloid.fandom.com/wiki/Hatsune_Miku)，仅用于粉丝向非商业展示。请勿商用或二次销售。
- **字体**：Google Fonts 开源字体，SIL Open Font License 1.1，已本地自托管并保留子集切分，未修改字形。
- **页面代码**：`index.html` / `miku.css` / `miku.js` / 本页文案均为原创实现。
- **曲名与 P 主名**：仅作资料引用，版权归各创作者与唱片权利方。
- **资料来源**：[Crypton 官方 CV01 页面](https://ec.crypton.co.jp/pages/prod/virtualsinger/cv01) · [初音ミク V6 Early Access](https://sonicwire.com/news/blog/2025/12/miku-v6-earlyaccess) · [HATSUNE MIKU EXPO 历史](https://mikuexpo.com/history.html) · [piapro](https://piapro.net/)
- **声明**：本站是粉丝二次创作的展示页，**非官方**，与 Crypton Future Media 无隶属关系。

---

## License

页面代码（HTML / CSS / JS / 文案 / `assets/favicon.svg`）以 **MIT** 授权（见 [`LICENSE`](LICENSE)，Copyright © 2026 liceses），随便用、随便改、随便 fork。
立绘与字体**不适用** MIT，各自归属上述权利方 —— `LICENSE` 末尾也写了这条边界，转载前请自行确认授权范围。

<p align="center"><sub>CV01 / 158CM / 42KG / 2007.08.31 / #39C5BB / 39 — 39 = ミク = サンキュー</sub></p>
