import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 禁用音乐播放器方法：
	// 模板默认侧边栏和导航栏两个都显示
	// 1. 侧边栏：在sidebarConfig.ts侧边栏配置把音乐组件enable设为false禁用即可
	// 2. 导航栏：在本配置文件把showInNavbar设为false禁用即可

	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "meting",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 【实测结论】模板默认的 api.i-meto.com 请求一直超时（换了两个网络通道都不通，
		//   TCP 能连上但服务端不响应），所以把可用的 injahow.cn 提为主接口，
		//   i-meto 降级到备用列表里（万一它恢复了还能用）
		api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		// 来源：https://music.163.com/playlist?id=17541985329 （歌单名「ture love」，377 首）
		id: "17541985329",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		// 模板自带的歌曲文件已删除。放上你自己的歌之后再启用：
		//   1. 把你的 mp3 放进 public/assets/music/
		//   2. 把封面图放进 public/assets/music/cover/
		//   3. 照下面格式填好，并把本文件顶部的 showInNavbar 改回 true
		playlist: [
			// {
			// 	name: "歌曲名",
			// 	artist: "歌手",
			// 	url: "/assets/music/你的文件名.mp3",
			// 	cover: "/assets/music/cover/封面图.webp",
			// 	lrc: "",
			// },
		],
	},
};
