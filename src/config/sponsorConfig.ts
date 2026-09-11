import type { SponsorConfig } from "../types/sponsorConfig";

export const sponsorConfig: SponsorConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 打赏用途说明
	usage:
		"您的打赏将用于服务器维护、内容创作和功能开发，帮助我持续提供优质内容。",

	// 是否显示打赏者列表
	// 模板自带的打赏记录是虚构的示例数据，已清空，故关闭显示
	showSponsorsList: false,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否在文章详情页底部显示打赏按钮
	// 四个打赏方式目前全部停用，故关闭文章页的打赏按钮
	showButtonInPost: false,

	// 打赏方式列表
	//
	// 【重要】以下 4 个方式原本全部指向 Firefly 模板作者，均已停用：
	//   - 支付宝 / 微信：原来的二维码是模板作者的收款码，图片文件已删除
	//   - ko-fi / 爱发电：链接指向模板作者 cuteleaf 的页面
	// 想启用打赏：把你自己的收款码放到 public/assets/images/sponsor/ 下（文件名 alipay.png / wechat.png），
	// 或改掉下面的 qrCode 路径，然后把对应的 enabled 改回 true。
	methods: [
		{
			name: "支付宝",
			icon: "fa7-brands:alipay",
			// 收款码图片路径（需要放在 public 目录下）
			// TODO: 把你的收款码放到 public/assets/images/sponsor/alipay.png
			qrCode: "/assets/images/sponsor/alipay.png",
			link: "",
			description: "使用 支付宝 扫码打赏",
			enabled: false,
		},
		{
			name: "微信",
			icon: "fa7-brands:weixin",
			// TODO: 把你的收款码放到 public/assets/images/sponsor/wechat.png
			qrCode: "/assets/images/sponsor/wechat.png",
			link: "",
			description: "使用 微信 扫码打赏",
			enabled: false,
		},
		{
			name: "ko-fi",
			icon: "simple-icons:kofi",
			qrCode: "",
			// TODO: 换成你自己的 ko-fi 主页地址
			link: "",
			description: "Buy me a Coffee",
			enabled: false,
		},
		{
			name: "爱发电",
			icon: "simple-icons:afdian",
			qrCode: "",
			// TODO: 换成你自己的爱发电主页地址
			link: "",
			description: "通过 爱发电 进行打赏",
			enabled: false,
		},
	],

	// 打赏者列表（可选）
	// 模板自带的示例打赏记录是虚构的，已清空。
	// 收到真实打赏后再按下面的格式追加：
	//   { name: "打赏者昵称", avatar: "头像URL", amount: "¥50", date: "2026-09-11" }
	sponsors: [],
};
