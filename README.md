# AnovaOS Website

AnovaOS 官方网站。默认简体中文与深色主题，英文位于 `/en/`。Astro 在构建时生成全部页面、Markdown、Shiki 代码高亮及搜索索引。浏览器仅加载导航、主题、筛选和搜索所需的小段 JavaScript。字体、图像与 CSS 随站点分发，生产环境只需静态文件服务。

| 仓库 | 用途 | 分支 |
| --- | --- | --- |
| [AnovaOS-Website](https://github.com/ananwanan/AnovaOS-Website) | 官网源码与部署配置的权威来源 | main |
| [AnovaOS](https://github.com/ananwanan/AnovaOS/tree/dev) | 系统源码与技术依据 | dev |

## 快速开始

安装 Node.js 24 LTS 和 pnpm 11.25.0。如果环境没有 pnpm，可运行 `npm install --global pnpm@11.25.0`。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端打印的地址。验证生产输出：

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm verify
pnpm preview
```

`dist/` 可直接部署到站点根目录。也可使用 `python3 -m http.server 8080 --bind 127.0.0.1 --directory dist` 本地预览。压缩包中附有已构建的 `dist/`，可跳过 Node 安装直接查看。请通过 HTTP 打开页面。

## 页面与内容

- `/`、`/features/`、`/download/`、`/roadmap/`、`/docs/`、`/contributing/` 均有对应英文地址。
- `src/content/evidence.json` 集中维护 OS 提交、里程碑、特性和最近更新。两种语言及上下游链接共用同一条记录。更新技术内容时核对提交、实际文档和验证配置。状态应反映证据和前置条件。
- `src/articles/{zh,en}/` 是八对 Markdown 文章。保留标题、二级目录和上游固定提交链接。增加文档入口时同步更新 `src/lib/site.ts`、对应翻译和输出校验。
- `pnpm sync:releases` 分页读取操作系统的公开 GitHub Releases，仅修改本地 `src/content/releases.json`。在官网维护分支检查差异，构建验证后随 PR 合并；失败时保留旧快照。若需要更高 API 限额，可在当前进程提供只读 `GITHUB_TOKEN`。访客请求不访问 API。发布页始终给出上游实时入口。
- `public/validation/provenance.json` 记录三张 QEMU 帧缓冲图片的上游提交、归档键和**原始 PPM** SHA-256。PNG 是无损转换。原项目许可和 NOTICE 同目录保存。
- `scripts/draw-architecture.mjs` 绘制原创概念图；运行 `node scripts/draw-architecture.mjs` 可重建 SVG。视觉系统在 `src/style.css`，公共布局在 `src/layouts/Shell.astro`。
- `src/lib/site.ts` 和 `src/pages/[...route].astro` 定义静态路由。页面直达、语言互链和 SEO 在构建时完成。站点不安装访客分析或追踪脚本。

## 正式域名与部署

复制 `.env.example` 为 `.env`，填写 `SITE_URL`（包含 HTTPS，不带路径），重新构建。正式域名用于 sitemap、canonical、两种语言的 hreflang、Open Graph URL 和分享图。未指定域名时，预览构建请求爬虫跳过收录，并生成空 sitemap。完整服务器、Runner、Tunnel、更新和回滚说明见 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 从本次导出提交到现有仓库

确认预览并准备提交后，在导出目录的**外部**执行。用实际的解压路径替换 `EXPORT`。先克隆现有仓库，保留其历史和许可证，再创建功能分支。

```sh
EXPORT=/absolute/path/to/export/AnovaOS-Website
git clone --branch main https://github.com/ananwanan/AnovaOS-Website.git website-main
cd website-main
cmp LICENSE "$EXPORT/LICENSE"
git switch -c feat/official-site
rsync -a --exclude='.git/' --exclude='LICENSE' --exclude='dist/' --exclude='node_modules/' --exclude='.astro/' --exclude='.sites-runtime/' --exclude='.env' "$EXPORT/" ./
pnpm install --frozen-lockfile
pnpm typecheck && pnpm lint && pnpm build && pnpm verify
git add .
git diff --cached --check
git diff --cached --stat
git commit -m "Build bilingual AnovaOS website and static deployment pipeline"
git push -u origin feat/official-site
```

在官网仓库创建到 `main` 的 PR，CI 通过后合入。若导出后 main 出现其他更改，先检查差异再合并。Sites 可以使用同一份源码预览，私有发布在确认预览后单独进行。

## 许可

官网工程沿用原仓库 [MPL-2.0](LICENSE)。操作系统与其验收材料使用 [Apache-2.0](public/validation/LICENSE-Apache-2.0.txt)，保留 [NOTICE](public/validation/NOTICE.txt)。Space Grotesk 与 IBM Plex Mono 的字体许可证位于 `public/licenses/`。

