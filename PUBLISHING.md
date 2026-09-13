# 在任意设备上写文章

本站的**部署与本地环境完全解耦**：Cloudflare Workers 直接连这个 GitHub 仓库，
你只要把 Markdown 推送到 `master`，1~2 分钟后线上自动更新。

所以「换一台设备」要解决的只有一件事 —— **怎么把文章文件送进仓库**。
下面三条路线按「省事程度」排序，任选一条。

---

## 路线 A：GitHub 网页版（零安装，最省事）

适合：借用别人的电脑、临时改个错字、只想发一篇纯文字文章、手机/平板。

1. 打开 <https://github.com/jiongzzzz214-spec/Firefly>
2. 进入 `src/content/posts/`
3. 右上角 **Add file → Create new file**
4. 文件名填 `文章名.md`（例如 `csapp-ch1.md`）
5. 内容**开头必须是 frontmatter**：

   ```markdown
   ---
   title: 文章标题
   published: 2026-09-12
   ---

   正文从这里开始。
   ```

6. 页面底部 **Commit changes** → 选 *Commit directly to the `master` branch*
7. 等 1~2 分钟，刷新 <https://720620.xyz> 即可看到

> ⚠️ 必须提交到 **`master`** 分支。推到别的分支 Cloudflare 不会构建。
> ⚠️ 网页版**没有预览**，只能提交后到线上看效果。
> ⚠️ `published` 是**日期**（`2026-09-12`），不要加引号、不要写时间。

**只有 `title` 和 `published` 是必填的**，其余字段全部可以省略（见下方「frontmatter 全表」）。

---

## 路线 B：另一台电脑（完整环境）

适合：长期在另一台机器上写、需要本地预览、要处理图片。

**前置**：装 **Node.js ≥ 22** 和 **pnpm ≥ 9**（`npm i -g pnpm`）。

```bash
git clone https://github.com/jiongzzzz214-spec/Firefly.git blog
cd blog
pnpm install        # 首次约 1 分钟
pnpm run dev        # 本地预览 → http://localhost:4321
```

**写新文章**：

```bash
pnpm run new-post -- 我的文章名
```

会在 `src/content/posts/` 下生成 `我的文章名.md`（已带好 frontmatter 骨架）。

**发布**：

```bash
git add src/content/posts/我的文章名.md
git commit -m "post: 我的文章名"
git push
```

> ⚠️ `new-post` 脚本用的是**相对路径** `./src/content/posts/`，
> 所以**必须在仓库根目录执行**，不能先 `cd` 到别处。
> 脚本**不会覆盖**已存在的同名文件（会直接报错退出）。

---

## 路线 C：手机 / 平板

没有顺手的 Git 客户端时，**直接用路线 A 的网页版**即可 ——
手机浏览器操作 GitHub 完全够用。GitHub 官方 App 也能建文件，但编辑体验不如网页版。

---

## 文章放哪 / 怎么写

两种等价写法，二选一：

| 写法 | 路径 | 适用场景 |
|---|---|---|
| 单文件 | `src/content/posts/我的文章.md` | 一般文章 |
| 带目录 | `src/content/posts/我的文章/index.md` | 需要放同目录的图片、附件 |

URL 就是文件名：`我的文章.md` → `/posts/我的文章/`。

### frontmatter 全表

**必填只有 `title` 和 `published`**。下表是为了让你按需填，留空即用默认值。

| 字段 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `title` | 字符串 | **必填** | 文章标题 |
| `published` | 日期 | **必填** | 发布日期，如 `2026-09-12` |
| `updated` | 日期 | 无 | 更新日期 |
| `description` | 字符串 | `""` | 摘要，用于列表页与 OG 分享卡 |
| `tags` | 字符串数组 | `[]` | 标签 |
| `category` | 字符串 | `""` | 分类 |
| `draft` | 布尔 | `false` | `true` 则**不发布** |
| `image` | 字符串 | `""` | 封面图；**留空则整块封面不渲染** |
| `pinned` | 布尔 | `false` | 置顶 |
| `comment` | 布尔 | `true` | 是否允许评论 |
| `password` | 字符串 | `""` | 填了即为加密文章 |
| `passwordHint` | 字符串 | `""` | 加密文章的密码提示 |
| `lang` | 字符串 | `""` | 语言 |
| `author` | 字符串 | `""` | 转载时的原作者 |
| `sourceLink` | 字符串 | `""` | 转载时的原文链接 |
| `licenseName` / `licenseUrl` | 字符串 | `""` | 版权声明 |

> ⚠️ **`draft: true` 是「不发布」**，不是「保存草稿」—— 本地 `pnpm dev` 也看不到。
> 文章「写好了却不见了」，第一个要查的就是这里。

### 图片放哪

| 位置 | 特点 | 引用方式 |
|---|---|---|
| `public/` | **原样输出**，不压缩 | `![说明](/图片名.png)` |
| `src/assets/` | 构建时压缩优化 | 走 Astro 图片组件（需 `import`） |
| 与文章同目录 | 跟着文章走 | 相对路径 `![](./图.png)`（需用 `index.md` 写法） |

> ⚠️ **动图（GIF / 动态 WebP）必须放 `public/`** —— 放 `src/` 会被构建转成静态 webp，只剩第一帧。
> ⚠️ `public/` 下的文件名**不带内容哈希**，换图后浏览器可能仍显示旧图，**改个文件名**最省事。

---

## 跨设备注意事项

| 事项 | 说明 |
|---|---|
| 换行符 | `.gitattributes` 已设 `eol=lf`，Windows / macOS 互推**不会**产生全文件 diff |
| 包管理器 | `package.json` 锁了 `pnpm@9.14.4`，`preinstall` 会拒绝 npm / yarn |
| 分支 | 只推 **`master`**，Cloudflare 只监听它 |
| 追番数据 | **构建时抓取** —— 在 B 站增删追番后要**再推一次**才会同步 |
| 本机专属内容 | `docs/`（资料归档）与 `.git/config` 里的证书设置**不会跟着仓库走** |
| 本地构建 | 本机 `pnpm build` 收尾会卡住（环境问题，非代码问题），验证请看 `dist/` 产物，别等进程退出 |

---

## 给 AI Agent 的速查

把仓库交给 AI 助手改时，让它**先读根目录的 [`AGENTS.md`](./AGENTS.md)**（那里有完整红线）。
核心几条摘录如下：

- **部署**：push 到 `master` → Cloudflare Workers 自动构建（1~2 分钟）。
  **没有 GitHub Actions**，构建状态在
  `https://github.com/jiongzzzz214-spec/Firefly/commit/<sha>/checks`
  （是 **check-run**，不是 `/actions`，后者永远为空）。
- **不要做的事**：
  1. 不要用 `git rm` / `rm` 删文件 —— 本仓库历史上执行后会连带删掉整个 `src/`（240 个文件）。要删就 `mv` 移出仓库。
  2. 不要给 `/*` 或 HTML 加 `Cache-Control: no-transform` —— 会打断 Cloudflare Web Analytics 的边缘注入。
  3. 不要填 `analyticsConfig.cloudflareWebAnalytics.token` —— 统计是「自动设置」模式，填了会**重复计数**。
  4. 不要删 `wrangler.toml` 或 `wrangler.jsonc` —— 两者并存且内容不一致，猜错哪个生效会搞坏部署。
- **改完必须验证构建产物**（`grep dist/`），不能只看源码。
- **别只信本地构建日志**：收尾阶段会挂住，看 `dist/index.html` 的 mtime 判断是否渲染完成。
- 提交信息用 **Conventional Commits**（`feat:` / `fix:` / `chore:` / `post:`）。
