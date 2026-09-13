# Jiongzzzz 的博客

个人博客，主要记录**学习笔记**和**随笔**。

- 站点地址：<https://720620.xyz>
- RSS 订阅：<https://720620.xyz/rss.xml>

## 技术栈

| 项目 | 说明 |
|---|---|
| 站点生成 | [Astro](https://astro.build/)（静态输出） |
| 主题 | [Firefly](https://github.com/CuteLeaf/Firefly)（基于 [Fuwari](https://github.com/saicaca/fuwari) 二次开发） |
| 包管理 | pnpm |
| 部署 | Cloudflare（连仓库自动构建） |
| 评论 | Giscus（GitHub Discussions） |

## 本地开发

需要 Node.js >= 22 和 pnpm >= 9。

```bash
pnpm install        # 安装依赖
pnpm run dev        # 本地预览 → http://localhost:4321
pnpm run build      # 构建到 dist/
pnpm run preview    # 预览构建结果
```

其他可用命令：

```bash
pnpm run check       # Astro 类型检查
pnpm run lint        # Biome 代码检查并自动修复
pnpm run icons       # 重新生成图标
```

## 写文章

**方式一：用脚本生成（推荐）**

```bash
pnpm run new-post -- 文章文件名
```

会在 `src/content/posts/` 下生成带好 frontmatter 的 Markdown 文件。

**方式二：手动创建**

在 `src/content/posts/` 下新建目录，里面放 `index.md`：

```markdown
---
title: 文章标题
published: 2026-09-11
description: 一句话摘要
tags:
  - 标签一
  - 标签二
category: 分类
draft: false
---

正文从这里开始。
```

> `draft: true` 的文章不会出现在线上。

## 在另一台设备上写文章

部署与本地环境**完全解耦**：只要把 Markdown 推送到 `master`，Cloudflare 就会自动构建上线。
所以换设备时不必装环境 —— **最省事的做法是直接用 GitHub 网页版新建文件**。

三种路线（GitHub 网页版 / 另一台电脑 / 手机）、frontmatter 全表、图片放置规则、
跨设备注意事项，都在 **[PUBLISHING.md](./PUBLISHING.md)**。

## 常用配置在哪

| 想改什么 | 文件 |
|---|---|
| 站点标题 / 副标题 / URL / 导航栏 Logo | `src/config/siteConfig.ts` |
| 头像 / 昵称 / 个人签名 / 联系方式 | `src/config/profileConfig.ts` |
| 首页横幅文字 / 壁纸 / 背景视频 | `src/config/backgroundWallpaper.ts` |
| 侧栏公告 | `src/config/announcementConfig.ts` |
| 音乐播放器 | `src/config/musicConfig.ts` |
| 评论系统 | `src/config/commentConfig.ts` |
| 导航菜单 | `src/config/navBarConfig.ts` |
| 侧栏组件开关与顺序 | `src/config/sidebarConfig.ts` |
| 追番（B站）/ 番组计划（Bangumi） | `src/config/siteConfig.ts` |
| 关于页 / 友链页 | `src/content/spec/` |
| 文章封面图策略 | `src/config/coverImageConfig.ts` |

静态资源：

- `src/assets/images/` —— 会经过压缩优化的图（Logo、头像、封面、壁纸）
- `public/` —— 原样输出的文件（favicon、视频、字体），用 `/` 开头的路径引用

> ⚠️ 想让**动图**（GIF / 动态 WebP）保持动画，必须放 `public/` 并用 `/` 开头引用。
> 放 `src/` 会被构建转成静态 webp，只剩第一帧。

## 部署

推送到 `master` 分支后 Cloudflare 自动构建发布，约 1~2 分钟。

```bash
git add -A
git commit -m "更新说明"
git push
```

> 追番数据是**构建时抓取**的，所以在 B站增删追番后需要重新推送一次才会同步。

## 许可

本站的文章内容版权归 Jiongzzzz 所有。

站点基于 [Firefly](https://github.com/CuteLeaf/Firefly) 主题构建，该主题 Fork 自
[saicaca/fuwari](https://github.com/saicaca/fuwari)，遵循 [MIT 协议](./LICENSE)。

**版权声明：**

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)

根据 MIT 开源协议，可以自由使用、修改、分发代码，但需保留上述版权声明。
