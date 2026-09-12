import type { AnalyticsConfig } from "../types/analyticsConfig";

export const analyticsConfig: AnalyticsConfig = {
	// Google Analytics ID
	googleAnalyticsId: "",
	// Microsoft Clarity ID
	microsoftClarityId: "",
	// ⚠️ Cloudflare Web Analytics —— 本站**已经在用了，且不需要这里填任何东西**
	//
	// 现状（2026-09-12 确认）：控制台里 720620.xyz 已存在，模式是「自动设置」，
	// 且正在正常收集数据（24 小时 65 PV / 26 访问）。
	// 「自动设置」由 Cloudflare 在边缘自动往 HTML 注入 beacon，**不经过本配置**。
	//
	// 🔴 所以下面的 token 请**保持留空**。
	//    自动注入 + 这里再填 token = 页面上出现两个 beacon = 访问量被重复计数。
	//
	// 什么时候才需要填：只有当控制台的自动设置失效、或站点不再走 Cloudflare 代理时，
	// 才在 Manage site 里改用「Enable with JS Snippet installation」，
	// 把 snippet 里的 token 填到下面（组件已备好，见 components/analytics/CloudflareWebAnalytics.astro）。
	cloudflareWebAnalytics: {
		token: "",
		// 默认官方地址；如果国内访问不稳，可以自建反代后改这里
		scriptUrl: "https://static.cloudflareinsights.com/beacon.min.js",
	},
	// Umami 统计配置
	umamiAnalytics: {
		// Umami Website ID
		websiteId: "",
		// Umami JS地址，支持使用自建
		scriptUrl: "https://cloud.umami.is/script.js",
		// Umami 会话回放脚本地址，支持使用自建
		replaysScriptUrl: "https://cloud.umami.is/recorder.js",
		// 是否追踪出站链接
		trackOutboundLinks: true,
		// 是否收集浏览器性能指标
		collectWebVitals: false,
		// 会话回放配置
		replays: {
			// 是否启用会话回放
			enabled: false,
			// 录制会话采样率，范围 0-1，例如 0.15 表示记录 15% 的会话
			sampleRate: 0.15,
			// 隐私遮罩级别："moderate" 会遮罩所有输入框；"strict" 额外遮罩页面全部文本
			maskLevel: "moderate",
			// 单次录制最大时长（毫秒）
			maxDuration: 300000,
			// 需要排除录制的元素 CSS 选择器，例如 ".sensitive-widget"
			blockSelector: "",
		},
	},
	// 51la 统计配置
	la51Analytics: {
		// 51la 统计 ID
		Id: "",
		// 自定义 SDK JS 地址，防止 DNS 污染，留空使用默认地址
		sdkUrl: "",
		// 多个统计 ID 的数据分离标识，留空则使用 Id
		ck: "",
		// 是否开启事件分析功能
		autoTrack: false,
		//  Hash路由模式, 项目使用History API路由, 所以不必开启默认false
		hashMode: false,
		// 是否开启网站录屏功能
		screenRecord: true,
	},
};
