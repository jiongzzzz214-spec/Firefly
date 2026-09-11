import type { BackgroundWallpaperConfig } from "@/types/backgroundWallpaper";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	// 壁纸模式："banner" 横幅壁纸，"fullscreen" 全屏壁纸，"overlay" 全屏透明，"none" 纯色背景无壁纸
	mode: "banner",
	// 是否允许用户通过导航栏切换壁纸模式
	// 且同时维护多种壁纸模式过于复杂（已经屎山代码），在切换时有时候可能会出现一些奇怪的过渡效果或者bug
	// 推荐只选择自己喜欢的模式并关闭切换功能
	switchable: true,
	// 是否启用背景视频播放，配置后将在导航栏显示视频播放按钮
	playerEnable: true,
	/**
	 * 背景图片配置
	 * 图片路径支持三种格式：
	 * 1. public 目录（以 "/" 开头，不优化）："/assets/images/banner.avif"
	 * 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/banner.avif"
	 * 3. 远程 URL："https://example.com/banner.jpg"
	 * 注意：远程URL和public目录的图片不会被优化，请确保图片体积足够小以免影响加载速度
	 *
	 * 【动态图片（GIF / 动态 WebP / APNG）】
	 * 想让壁纸是一张会动的图，必须放在 public 目录并用 "/" 开头的路径引用，例如：
	 *   desktop: ["/assets/images/wallpaper/desktop.webp"]
	 * 因为放在 src 目录的图片会经过 Astro 压缩转成静态 webp，动画会被丢掉（只剩第一帧）。
	 * 但动图当全屏壁纸体积非常大（1080p 动图动辄几十 MB），
	 * 一般还是用上面的「背景视频」更划算。
	 *
	 * 建议不要替换d1-d6，m1-m6这些默认示例图片，但你可以删除掉节省空间
	 * 因为以后可能会更换示例图片，导致你自定义的图片被覆盖
	 * 所以建议使用自己的图片的时候命名为其他名称，不要使用d1-d6，m1-m6这些名称
	 *
	 * 如果只使用一张图片或者使用随机图API，推荐直接使用字符串格式：
	 * desktop: "https://t.alcy.cc/pc",   // 随机图API
	 * desktop: "assets/images/DesktopWallpaper/d1.avif", // 单张图片
	 *
	 * mobile: "https://t.alcy.cc/mp", // 随机图API
	 * mobile: "assets/images/MobileWallpaper/m1.avif", // 单张图片
	 *
	 * 支持配置多张图片（数组），每次刷新页面随机显示一张：
	 * desktop: [
	 * "assets/images/DesktopWallpaper/d1.avif",
	 * "assets/images/DesktopWallpaper/d2.avif",
	 * ],
	 *
	 * mobile:[
	 *   "assets/images/MobileWallpaper/m1.avif",
	 *   "assets/images/MobileWallpaper/m2.avif",
	 * ],
	 */
	src: {
		// 桌面背景图片（支持单张或多张随机）
		// desktop: "assets/images/DesktopWallpaper/d1.avif",
		desktop: [
			"assets/images/DesktopWallpaper/my1.avif",
			"assets/images/DesktopWallpaper/my2.avif",
			"assets/images/DesktopWallpaper/my3.avif",
			"assets/images/DesktopWallpaper/my4.avif",
			"assets/images/DesktopWallpaper/my5.avif",
			"assets/images/DesktopWallpaper/my6.avif",
		],
		// 移动背景图片（支持单张或多张随机）
		// mobile: "assets/images/MobileWallpaper/m1.avif",
		mobile: [
			"assets/images/MobileWallpaper/mym1.avif",
			"assets/images/MobileWallpaper/mym2.avif",
			"assets/images/MobileWallpaper/mym3.avif",
			"assets/images/MobileWallpaper/mym4.avif",
			"assets/images/MobileWallpaper/mym5.avif",
			"assets/images/MobileWallpaper/mym6.avif",
		],
		// ── 背景视频（动态壁纸）─────────────────────────────────
		// 支持单个视频（字符串）或多个视频循环（数组）
		// 本地视频放在 public/assets/videos/ 目录下，用 "/assets/videos/文件名.mp4" 引用
		//
		// 【格式要求】浏览器用原生 <video> 直接播放，所以：
		//   - 推荐 MP4（H.264 视频 + AAC 音频）—— 兼容性最好，所有浏览器都支持
		//   - WebM（VP9 / AV1）体积更小，但 Safari 支持不完整，手机端可能播不了
		//   - 不建议 MOV / AVI / MKV —— 浏览器普遍不支持
		// 【体积建议】1920×1080、码率 2~4 Mbps、时长 10~30 秒，控制在 5~15 MB
		//   public/ 目录的文件不会被构建压缩，必须自己先压好
		//
		// 【已知行为，配之前要知道】
		//   1. 不会自动播放 —— 访客要点击导航栏的视频按钮才会播（这是主题的设计）
		//   2. 单个视频播完就停（不会循环）；配 2 个以上视频才会依次轮播
		//   3. 视频是有声音的 —— 主题先静音播放，100ms 后恢复音量
		//      想让它当纯背景，视频本身要压成无声的
		//   4. 画面用 object-cover 铺满，比例不匹配会被裁切
		//   5. 视频播放时，上面的静态壁纸会自动隐藏
		//
		// ── 当前使用的视频 ────────────────────────────────────
		// huaqing2.mp4 由 E:\视频\花情2.mp4 压制而成：
		//   原始：3840x2160 / 60fps / 49 Mbps / 122 MB / 20 秒
		//   成品：1920x1080 / 30fps / 4.9 Mbps / 11.7 MB / 20 秒
		// 压制命令（ffmpeg）：
		//   ffmpeg -i "原始.mp4" -vf "scale=1920:1080:flags=lanczos,fps=30" \
		//     -c:v libx264 -preset slow -crf 23 -profile:v high -level 4.0 \
		//     -pix_fmt yuv420p -an -movflags +faststart -y huaqing2.mp4
		// 说明：-an 丢掉音轨（原音轨是 -91dB 的数字静音，留着没意义，
		//       丢掉还能保证播放时绝对不出声）
		//       -movflags +faststart 把索引放到文件头部，边下边播
		//
		// 换自己的视频：压好后放进 public/assets/videos/，改下面的路径即可
		playerUrl: ["/assets/videos/huaqing2.mp4"],
	},
	// 横幅壁纸和全屏壁纸共享配置
	common: {
		// 壁纸遮罩暗度，让横幅文字显示更清晰，0-1之间，值越大越暗
		dimOpacity: 0.2,
		// 多视频播放模式："order" 顺序循环，"random" 随机切换（仅当 playerUrl 为数组时生效）
		playerMode: "random",
		// 主页横幅文字
		homeText: {
			// 是否启用主页横幅文字
			enable: true,
			// 是否允许用户通过控制面板切换横幅标题显示
			switchable: true,
			// 主页横幅主标题
			title: "这里是 Jiongzzzz",
			// 主页横幅主标题字体大小
			// 实际生效值 = min(这个值, 10vw)：桌面端按这个值显示，手机上自动缩到 10vw
			titleSize: "3.8rem",
			// 主页横幅副标题
			// 写数组 → 多条依次循环；写单个字符串 → 只显示这一句
			subtitle: "欢迎来到我的博客",
			// 主页横幅副标题字体大小
			subtitleSize: "1.5rem",
			typewriter: {
				// 是否启用打字机效果
				// 副标题是数组   → 逐字打出、停顿、删除，然后循环下一条
				// 副标题只有一句 → 打一遍就停住，永远不会删除
				// 改成 false     → 不要动画，直接静态显示
				enable: true,
				// 打字速度（毫秒）
				speed: 100,
				// 删除速度（毫秒）
				deleteSpeed: 50,
				// 完全显示后的暂停时间（毫秒）
				pauseTime: 2000,
			},
		},
		// 导航栏配置
		navbar: {
			// 导航栏透明模式："semi" 半透明，"full" 完全透明，"semifull" 动态透明
			transparentMode: "semi",
			// 是否开启毛玻璃模糊效果，开启可能会影响页面性能，如果不开启则是半透明，请根据自己的喜好开启
			enableBlur: true,
			// 毛玻璃模糊度
			blur: 5,
		},
		// 水波纹动画效果配置，开启会影响页面性能，请根据自己的喜好开启
		waves: {
			enable: {
				// 桌面端是否启用水波纹动画效果
				desktop: true,
				// 移动端是否启用水波纹动画效果
				mobile: true,
			},
			// 是否允许用户通过控制面板切换水波纹动画
			switchable: true,
		},
		// 渐变过渡效果配置，当水波纹关闭时自动启用，提供壁纸底部到背景色的平滑过渡
		gradient: {
			enable: {
				// 桌面端是否启用渐变过渡
				desktop: true,
				// 移动端是否启用渐变过渡
				mobile: true,
			},
			// 渐变高度
			height: "10%",
			// 是否允许用户通过控制面板切换渐变过渡
			switchable: true,
		},
		// 壁纸轮播配置，横幅壁纸和全屏壁纸共享，仅在配置多张图片时生效
		carousel: {
			// 是否启用壁纸轮播；关闭时保持每次刷新随机显示一张
			enable: false,
			// 轮播切换间隔（毫秒）
			interval: 5000,
			// 过渡效果: 'fade' 渐变 | 'zoom' 缩放 | 'slide' 滑动 | 'kenburns' 旋转木马
			transitionEffect: "zoom",
			// 是否允许用户通过控制面板切换壁纸轮播
			switchable: true,
		},
	},
	// Banner模式特有配置
	banner: {
		// 图片位置
		// 支持所有CSS object-position值，如: 'top', 'center', 'bottom', 'left top', 'right bottom', '25% 75%', '10px 20px'..
		// 如果不知道怎么配置百分百之类的配置，推荐直接使用：'center'居中，'top'顶部居中，'bottom' 底部居中，'left'左侧居中，'right'右侧居中
		position: "0% 20%",
	},
	// 全屏透明覆盖模式特有配置
	overlay: {
		// 是否允许用户通过控制面板调整全屏透明模式参数
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
		// 层级，确保壁纸在背景层
		zIndex: -1,
		// 壁纸透明度
		opacity: 0.8,
		// 背景模糊度
		blur: 10,
		// 卡片透明度，0-1之间，值越小越透明
		cardOpacity: 0.5,
	},
	// 全屏壁纸模式特有配置
	fullscreen: {
		// 图片位置
		position: "center",
	},
};
