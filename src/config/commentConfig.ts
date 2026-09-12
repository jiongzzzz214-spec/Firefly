import type { CommentConfig } from "../types/commentConfig";

export const commentConfig: CommentConfig = {
	// 评论系统类型: none, twikoo, waline, giscus, disqus, artalk，默认为none，即不启用评论系统
	//
	// 当前用 giscus：国内访客大概率发不出评论（要 GitHub 登录）。
	// 想换成国内友好的 Twikoo：先照 Twikoo 那一段的注释部署后端拿到地址，
	// 然后把这里的 "giscus" 改成 "twikoo"、填好 envId 即可，其它都不用动。
	type: "giscus",

	//twikoo评论系统配置
	//
	// 【什么时候需要它】
	// giscus 依赖 GitHub 登录，国内访客往往加载不出、也发不了评论。
	// Twikoo 是自托管的，不依赖任何被墙的服务，国内访问体验最好。
	//
	// 【但必须先有自己的后端】Twikoo 是「前端 + 后端」结构，
	// envId 就是后端地址。没有后端的话，把 type 改成 twikoo 会导致评论区直接空白。
	// 部署方法见：C:\Users\Setsuna\WorkBuddy AI\2026-09-11-20-08-42\Twikoo评论-Cloudflare部署指南.md
	// 部署完拿到地址后，只需改两处：type 改成 "twikoo" + 下面 envId 填你的地址。
	twikoo: {
		// 后端地址。部署完成后填这里，例如：
		//   Cloudflare Workers: "https://twikoo.你的子域.workers.dev"
		//   腾讯云开发:          "https://你的环境ID.service.tcloudbase.com/twikoo"
		//   自有域名:            "https://twikoo.720620.xyz"
		envId: "",
		// 设置 Twikoo 评论系统语言
		lang: "zh-CN",
		// 是否启用文章访问量统计功能
		visitorCount: true,
		// Twikoo JS 文件地址，支持 CDN 链接
		// 已选用 npmmirror（阿里云 npm 镜像）—— 国内可直连，实测 456 KB 正常返回。
		// 备选：https://s4.zstatic.net/npm/twikoo@1.7.13/dist/twikoo.min.js
		// 不推荐 cdn.jsdelivr.net —— 国内经常被 DNS 污染，加载不出前端脚本。
		jsUrl: "https://registry.npmmirror.com/twikoo/1.7.13/files/dist/twikoo.min.js",
		// Twikoo 自定义 CSS 文件地址，为空则不加载
		cssUrl: "/assets/css/twikoo-custom.css",
	},

	//waline评论系统配置
	waline: {
		// waline 后端服务地址
		serverURL: "https://waline.vercel.app",
		// 设置 Waline 评论系统语言
		lang: "zh-CN",
		// 设置 Waline 评论系统表情地址
		emoji: [
			"https://unpkg.com/@waline/emojis@1.4.0/weibo",
			"https://unpkg.com/@waline/emojis@1.4.0/bilibili",
			"https://unpkg.com/@waline/emojis@1.4.0/bmoji",
		],
		// 评论登录模式。可选值如下：
		//   'enable'   —— 默认，允许访客匿名评论和用第三方 OAuth 登录评论，兼容性最佳。
		//   'force'    —— 强制必须登录后才能评论，适合严格社区，关闭匿名评论。
		//   'disable'  —— 禁止所有登录和 OAuth，仅允许匿名评论（填写昵称/邮箱），适用于极简留言。
		login: "enable",
		// 是否启用文章访问量统计功能
		visitorCount: true,
	},

	// artalk评论系统配置
	artalk: {
		// artalk后端程序 API 地址
		server: "https://artalk.example.com/",
		// 设置 Artalk 语言
		locale: "zh-CN",
		// 是否启用文章访问量统计功能
		visitorCount: true,
	},

	//giscus评论系统配置
	giscus: {
		// 设置 Giscus 评论系统仓库
		repo: "jiongzzzz214-spec/Firefly",
		// 设置 Giscus 评论系统仓库ID
		// 已填好：这个值就是 GitHub 仓库的 node_id，用
		//   https://api.github.com/repos/jiongzzzz214-spec/Firefly
		// 查到的 node_id = R_kgDOTZEMsA
		repoId: "R_kgDOTZEMsA",
		// 设置 Giscus 评论系统分类
		// 推荐用「Announcements」类型的分类：只有 giscus App 能在里面新建讨论，
		// 可以防止访客绕过评论区直接建空的讨论。
		// ⚠️ 这里填的名字必须和你在 giscus.app 选的分类名字完全一致
		category: "Announcements",
		// 获取 Giscus 评论系统分类ID
		// 已填好：Announcements 分类的 node_id（从 https://giscus.app/api/discussions/categories?repo=... 取的）
		// 如果哪天在 GitHub 里删掉重建了这个分类，这个值会失效，需要重新取一次
		categoryId: "DIC_kwDOTZEMsM4DFYWi",
		// 获取 Giscus 评论系统映射方式
		mapping: "title",
		// 获取 Giscus 评论系统严格模式
		strict: "0",
		// 获取 Giscus 评论系统反应功能
		reactionsEnabled: "1",
		// 获取 Giscus 评论系统元数据功能
		emitMetadata: "1",
		// 获取 Giscus 评论系统输入位置
		inputPosition: "top",
		// 获取 Giscus 评论系统语言
		lang: "zh-CN",
		// 获取 Giscus 评论系统加载方式
		loading: "lazy",
	},

	//disqus评论系统配置
	disqus: {
		// 获取 Disqus 评论系统
		shortname: "firefly",
	},
};
