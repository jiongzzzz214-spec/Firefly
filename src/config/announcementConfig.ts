import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "公告",

	// 公告内容
	// TODO: 换成你自己想说的话；不需要公告可以整段删掉
	content: "博客刚搭好，之后会陆续更新学习笔记和随笔，欢迎常来看看。",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "关于我",
		// 链接 URL
		url: "/about/",
		// 内部链接
		external: false,
	},
};
