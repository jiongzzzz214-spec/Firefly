/**
 * ⚠️ 本文件目前是**死代码** —— 全仓库没有任何地方 import 它。
 *
 * 真正生效的樱花实现是 `src/components/features/SakuraEffect.astro`
 * 里那段 `<script is:inline>` 内联脚本（主题自带了一份内联副本）。
 * 改樱花逻辑请改那个文件，别改这里。
 *
 * 本文件保留并且与内联版保持同步，只是为了将来若有人切过来用时行为一致
 * （2026-09-13 已同步「按时间推进」的改动）。
 */
import type { SakuraConfig } from "../types/config";

// 樱花对象类
class Sakura {
	x: number;
	y: number;
	s: number;
	r: number;
	a: number;
	fn: {
		x: (x: number, y: number, k: number) => number;
		y: (x: number, y: number, k: number) => number;
		r: (r: number, k: number) => number;
		a: (a: number, k: number) => number;
	};
	idx: number;
	img: HTMLImageElement;
	limitArray: number[];
	config: SakuraConfig;

	constructor(
		x: number,
		y: number,
		s: number,
		r: number,
		a: number,
		fn: {
			x: (x: number, y: number, k: number) => number;
			y: (x: number, y: number, k: number) => number;
			r: (r: number, k: number) => number;
			a: (a: number, k: number) => number;
		},
		idx: number,
		img: HTMLImageElement,
		limitArray: number[],
		config: SakuraConfig,
	) {
		this.x = x;
		this.y = y;
		this.s = s;
		this.r = r;
		this.a = a;
		this.fn = fn;
		this.idx = idx;
		this.img = img;
		this.limitArray = limitArray;
		this.config = config;
	}

	draw(cxt: CanvasRenderingContext2D) {
		cxt.save();
		cxt.translate(this.x, this.y);
		cxt.rotate(this.r);
		cxt.globalAlpha = this.a;
		cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s);
		cxt.restore();
	}

	// k = 时间缩放系数，1 表示「这一帧的耗时相当于 60fps 下的标准一帧」。
	// 乘上 k 之后，花瓣速度就与显示器刷新率和实际帧率无关了 ——
	// 60Hz / 120Hz / 144Hz 的屏幕观感一致，掉帧时也不会变慢。
	update(k = 1) {
		this.x = this.fn.x(this.x, this.y, k);
		this.y = this.fn.y(this.y, this.y, k);
		this.r = this.fn.r(this.r, k);
		this.a = this.fn.a(this.a, k);

		// 如果樱花越界或完全透明，重新调整位置
		if (
			this.x > window.innerWidth ||
			this.x < 0 ||
			this.y > window.innerHeight ||
			this.y < 0 ||
			this.a <= 0
		) {
			// 如果樱花不做限制
			if (this.limitArray[this.idx] === -1) {
				this.resetPosition();
			}
			// 否则樱花有限制
			else {
				if (this.limitArray[this.idx] > 0) {
					this.resetPosition();
					this.limitArray[this.idx]--;
				}
			}
		}
	}

	private resetPosition() {
		this.fn.r = getRandom("fnr", this.config);
		if (Math.random() > 0.4) {
			this.x = getRandom("x", this.config);
			this.y = 0;
			this.s = getRandom("s", this.config);
			this.r = getRandom("r", this.config);
			this.a = getRandom("a", this.config);
		} else {
			this.x = window.innerWidth;
			this.y = getRandom("y", this.config);
			this.s = getRandom("s", this.config);
			this.r = getRandom("r", this.config);
			this.a = getRandom("a", this.config);
		}
	}
}

// 樱花列表类
class SakuraList {
	list: Sakura[];

	constructor() {
		this.list = [];
	}

	push(sakura: Sakura) {
		this.list.push(sakura);
	}

	update(k = 1) {
		for (let i = 0, len = this.list.length; i < len; i++) {
			this.list[i].update(k);
		}
	}

	draw(cxt: CanvasRenderingContext2D) {
		for (let i = 0, len = this.list.length; i < len; i++) {
			this.list[i].draw(cxt);
		}
	}

	get(i: number) {
		return this.list[i];
	}

	size() {
		return this.list.length;
	}
}

// 获取随机值的函数
function getRandom(
	option: "x" | "y" | "s" | "r" | "a",
	config: SakuraConfig,
): number;
function getRandom(
	option: "fnx" | "fny" | "fnr" | "fna",
	config: SakuraConfig,
): (...args: number[]) => number;
function getRandom(
	option: string,
	config: SakuraConfig,
): number | ((...args: number[]) => number) {
	let ret: number | ((...args: number[]) => number) = 0;
	let random: number;

	switch (option) {
		case "x":
			ret = Math.random() * window.innerWidth;
			break;
		case "y":
			ret = Math.random() * window.innerHeight;
			break;
		case "s":
			ret =
				config.size.min + Math.random() * (config.size.max - config.size.min);
			break;
		case "r":
			ret = Math.random() * 6;
			break;
		case "a":
			ret =
				config.opacity.min +
				Math.random() * (config.opacity.max - config.opacity.min);
			break;
		case "fnx":
			random =
				config.speed.horizontal.min +
				Math.random() *
					(config.speed.horizontal.max - config.speed.horizontal.min);
			ret = (x: number, _y: number, k = 1) => x + random * k;
			break;
		case "fny":
			random =
				config.speed.vertical.min +
				Math.random() * (config.speed.vertical.max - config.speed.vertical.min);
			ret = (_x: number, y: number, k = 1) => y + random * k;
			break;
		case "fnr":
			ret = (r: number, k = 1) => r + config.speed.rotation * k;
			break;
		case "fna":
			ret = (alpha: number, k = 1) =>
				alpha - config.speed.fadeSpeed * 0.01 * k;
			break;
	}
	return ret;
}

// 樱花管理器类
export class SakuraManager {
	private config: SakuraConfig;
	private canvas: HTMLCanvasElement | null = null;
	private ctx: CanvasRenderingContext2D | null = null;
	private sakuraList: SakuraList | null = null;
	private animationId: number | null = null;
	private img: HTMLImageElement | null = null;
	private isRunning = false;

	constructor(config: SakuraConfig) {
		this.config = config;
	}

	// 初始化樱花特效
	async init(): Promise<void> {
		if (!this.config.enable || this.isRunning) {
			return;
		}

		// 创建图片对象
		this.img = new Image();
		this.img.src = "/sakura.png"; // 使用樱花图片

		// 等待图片加载完成
		await new Promise<void>((resolve, reject) => {
			if (this.img) {
				this.img.onload = () => resolve();
				this.img.onerror = () =>
					reject(new Error("Failed to load sakura image"));
			}
		});

		this.createCanvas();
		this.createSakuraList();
		this.startAnimation();
		this.isRunning = true;
	}

	// 创建画布
	private createCanvas(): void {
		this.canvas = document.createElement("canvas");
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;
		this.canvas.setAttribute(
			"style",
			`position: fixed; left: 0; top: 0; pointer-events: none; z-index: ${this.config.zIndex};`,
		);
		this.canvas.setAttribute("id", "canvas_sakura");
		document.body.appendChild(this.canvas);
		this.ctx = this.canvas.getContext("2d");

		// 监听窗口大小变化
		window.addEventListener("resize", this.handleResize.bind(this));
	}

	// 创建樱花列表
	private createSakuraList(): void {
		if (!this.img || !this.ctx) return;

		this.sakuraList = new SakuraList();
		const limitArray = new Array(this.config.sakuraNum).fill(
			this.config.limitTimes,
		);

		for (let i = 0; i < this.config.sakuraNum; i++) {
			const randomX = getRandom("x", this.config);
			const randomY = getRandom("y", this.config);
			const randomS = getRandom("s", this.config);
			const randomR = getRandom("r", this.config);
			const randomA = getRandom("a", this.config);
			const randomFnx = getRandom("fnx", this.config);
			const randomFny = getRandom("fny", this.config);
			const randomFnR = getRandom("fnr", this.config);
			const randomFnA = getRandom("fna", this.config);

			const sakura = new Sakura(
				randomX,
				randomY,
				randomS,
				randomR,
				randomA,
				{
					x: randomFnx,
					y: randomFny,
					r: randomFnR,
					a: randomFnA,
				},
				i,
				this.img,
				limitArray,
				this.config,
			);

			sakura.draw(this.ctx);
			this.sakuraList.push(sakura);
		}
	}

	// 开始动画
	private startAnimation(): void {
		if (!this.ctx || !this.canvas || !this.sakuraList) return;

		// 以 60fps 为基准：k = 实际帧间隔 / 标准帧间隔。
		// 这样花瓣的「每秒位移」是恒定的，不再受刷新率（60/120/144Hz）和掉帧影响。
		// 改这里之前，位移是「每帧固定值」，所以帧率一低花瓣就变慢 ——
		// Edge 卡顿时花瓣爬行、iPad 与 Chrome 速度不一致，都是这个原因。
		const FRAME_MS = 1000 / 60;
		// 单帧最多按 3 帧计：切走标签页再切回来时 rAF 会积压一大段时间，
		// 不封顶的话花瓣会瞬移一大截。
		const MAX_K = 3;

		let lastTime = performance.now();

		const animate = (now: number) => {
			if (!this.ctx || !this.canvas || !this.sakuraList) return;

			const elapsed = now - lastTime;
			lastTime = now;
			const k = Math.min(elapsed / FRAME_MS, MAX_K);

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.sakuraList.update(k);
			this.sakuraList.draw(this.ctx);
			this.animationId = requestAnimationFrame(animate);
		};

		this.animationId = requestAnimationFrame(animate);
	}

	// 处理窗口大小变化
	private handleResize(): void {
		if (this.canvas) {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}
	}

	// 停止樱花特效
	stop(): void {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}

		if (this.canvas) {
			document.body.removeChild(this.canvas);
			this.canvas = null;
		}

		window.removeEventListener("resize", this.handleResize.bind(this));
		this.isRunning = false;
	}

	// 切换樱花特效
	toggle(): void {
		if (this.isRunning) {
			this.stop();
		} else {
			this.init();
		}
	}

	// 更新配置
	updateConfig(newConfig: SakuraConfig): void {
		const wasRunning = this.isRunning;
		if (wasRunning) {
			this.stop();
		}
		this.config = newConfig;
		if (wasRunning && newConfig.enable) {
			this.init();
		}
	}

	// 获取运行状态
	getIsRunning(): boolean {
		return this.isRunning;
	}
}

// 创建全局樱花管理器实例
let globalSakuraManager: SakuraManager | null = null;

// 初始化樱花特效
export function initSakura(config: SakuraConfig): void {
	if (globalSakuraManager) {
		globalSakuraManager.updateConfig(config);
	} else {
		globalSakuraManager = new SakuraManager(config);
		if (config.enable) {
			globalSakuraManager.init();
		}
	}
}

// 切换樱花特效
export function toggleSakura(): void {
	if (globalSakuraManager) {
		globalSakuraManager.toggle();
	}
}

// 停止樱花特效
export function stopSakura(): void {
	if (globalSakuraManager) {
		globalSakuraManager.stop();
		globalSakuraManager = null;
	}
}

// 获取樱花特效运行状态
export function getSakuraStatus(): boolean {
	return globalSakuraManager ? globalSakuraManager.getIsRunning() : false;
}
