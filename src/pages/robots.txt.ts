import type { APIRoute } from "astro";

// 注意：这里**不要**加 `Disallow: /_astro/`。
// Google 明确建议不要屏蔽 CSS/JS —— 它需要抓取这些资源才能正确渲染页面、
// 评估移动端适配和 Core Web Vitals。屏蔽 `/_astro/` 会拖累 SEO。
// 线上看到的「屏蔽 AI 爬虫」那段是 Cloudflare 托管注入的，与本文件无关。
const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
