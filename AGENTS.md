# Repository Guidelines

## ⚠️ 本仓库的实际身份（阅读下文前必读）

这个仓库**不是**原版 Firefly 主题仓库，而是 **Jiongzzzz 的个人博客**
（<https://720620.xyz>）的部署仓库 —— 由 [Firefly](https://github.com/CuteLeaf/Firefly)
Fork 而来，已做大量站点定制。

下文「Project Structure」起的各节是**主题原版**的通用说明，仍然有效；
但以下几条是**本站专属、优先级更高**的事实与红线。

### 部署

- push 到 **`master`** → **Cloudflare Workers** 自动构建上线，约 1~2 分钟。
- **没有 GitHub Actions**（Fork 仓库默认关闭）。构建状态看
  `https://github.com/jiongzzzz214-spec/Firefly/commit/<sha>/checks`
  —— 是 **check-run**，**不是** `/actions`（那里永远为空）。
- 本地 `pnpm build` 收尾阶段会卡住（**环境问题，非代码问题**）：
  看 `dist/index.html` 的 mtime 判断是否渲染完成，别等进程退出。

### 🔴 四条红线（违反会出事故）

1. **禁用 `git rm` / `rm` 删文件** —— 本仓库历史上执行后会**连带删掉整个 `src/`**（240 个文件）。
   要删文件用 `mv` 移出仓库。
2. **不要给 `/*` 或 HTML 加 `Cache-Control: no-transform`** ——
   Cloudflare Web Analytics 靠边缘改写 HTML 注入 beacon，加了会把统计打死。
3. **`analyticsConfig.cloudflareWebAnalytics.token` 必须留空** ——
   本站统计是「自动设置」模式，一直在正常收数据；填了 token = 两个 beacon = **重复计数**。
4. **不要删 `wrangler.toml` / `wrangler.jsonc` 中的任何一个** ——
   两者并存且内容不一致，猜错哪个生效会直接搞坏部署。

### 维护手册（skill）

本站的完整维护手册在 **`.workbuddy-ai/skills/firefly-astro-blog-maintenance/SKILL.md`**
—— 站点坐标、配置文件速查、五个必知的坑、常用改造手法、上线复核清单。

- **动手改站点之前先读它**，能省掉大量试错。
- 里面的 `<仓库根>`、`<用户目录>` 是占位符，含义见该文件末尾。
- 这是**自动生成的可移植版**（由 `.workbuddy-ai/sync-skill.sh` 产出），
  **别直接编辑** —— 改本机原件后重新生成。
- 支持 skill 机制的工具：把**工作目录设成仓库根**即可自动加载。

### 其他约定

- 改配置后**必须验证构建产物**（`grep dist/`），不能只看源码。
- 写文章、换设备发布的完整说明见 **[PUBLISHING.md](./PUBLISHING.md)**。
- 提交信息用 **Conventional Commits**（`feat:` / `fix:` / `chore:` / `post:`）。

## Project Structure & Module Organization

Firefly is an Astro 7 site with Svelte islands and TypeScript configuration. Main source code lives in `src/`: routes in `src/pages`, layouts in `src/layouts`, reusable UI in `src/components`, styles in `src/styles`, content in `src/content`, helpers in `src/utils`, and Markdown/HTML plugins in `src/plugins`. Site configuration is split across `src/config` with matching type definitions in `src/types`; prefer imports from `@/config` when available. Static files served directly belong in `public`, source-managed images in `src/assets`, docs in `docs` and `Firefly-Docs`, and automation in `scripts`.

## Build, Test, and Development Commands

Use `pnpm`; the `preinstall` script enforces it.

- `pnpm dev` or `pnpm start`: run the local Astro dev server.
- `pnpm check`: run Astro diagnostics.
- `pnpm type-check`: run TypeScript with `--noEmit`.
- `pnpm format`: format `src` with Biome.
- `pnpm lint`: run Biome checks and safe fixes on `src`.
- `pnpm build`: generate icons, LQIPs, the Astro build, font subsets, and Pagefind search output in `dist`.
- `pnpm preview`: preview the production build locally.
- `pnpm new-post`: scaffold a new content post.

## Coding Style & Naming Conventions

Biome is the formatter and linter. It uses tabs for indentation and double quotes for JavaScript/TypeScript strings. Keep Astro and Svelte components in `PascalCase` (`PostCard.astro`, `Search.svelte`), config modules in `camelCase` ending with `Config.ts`, and utilities in descriptive kebab case such as `date-utils.ts`. Keep `src/types` aligned with `src/config`. Avoid unrelated formatting churn.

## Testing Guidelines

There is no dedicated unit-test framework configured. Before submitting changes, run `pnpm check`, `pnpm type-check`, and `pnpm build` for rendering, content, or generated asset work. For visual or interactive changes, verify with `pnpm dev` or `pnpm preview` and include screenshots in the PR. Name future tests near the feature they cover, using the local file name as the stem.

## Commit & Pull Request Guidelines

Use Conventional Commits, matching the current history: `feat: ...`, `fix: ...`, and `chore: ...`. Keep commits and PRs focused on one concern. PRs should include a concise summary, linked issues when relevant, validation commands run, and screenshots for UI changes. Discuss major features or design changes in an issue or discussion before implementation.

## Security & Configuration Tips

Do not commit secrets, tokens, or service keys in config files. Keep deployment-specific settings in the target platform environment, and review generated files such as `dist`, `src/constants/lqips.json`, and `src/constants/icons.ts` before committing them.
