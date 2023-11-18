import { defineConfig } from 'vitepress'
import { genYuqueSideBar, genYuqueSideBarWithShortUrl } from "../../utils/route";
import { YuQueSVG } from "../../utils/assists";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Yuque-VitePress",
  description: "语雀 + Elog + VitePress + GitHub Actions + Vercel 文档站点解决方案",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    outline: [2,6],
    nav: [
      { text: '首页', link: '/' },
      { text: '配置文档', link: '/docs/入门指引/快速开始', activeMatch: '/docs/' },
      { text: '短路由模式', link: '/docs-shorturl/ssuhngw0yb3dgkkg', activeMatch: '/docs-shorturl/' }
    ],
    sidebar: {
      "/docs/": await genYuqueSideBar('/docs'),
      "/docs-shorturl/": await genYuqueSideBarWithShortUrl('/docs-shorturl')
    },
    // sidebar: await genYuqueSideBar(),
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    socialLinks: [
      { icon: { svg: YuQueSVG }, link: "https://www.yuque.com/1874w/yuque-vitepress-template" },
      { icon: 'github', link: 'https://github.com/elog-x/yuque-vitepress' }
    ],
    footer: {
      message: 'Powered by <a href="https://www.yuque.com/1874w/yuque-vitepress-template" target="_blank">语雀</a>  & <a href="https://vitepress.dev" target="_blank">VitePress</a> with <a href="https://github.com/LetTTGACO/elog" target="_blank">Elog</a>',
      copyright: 'Copyright © 2023-present'
    },
  }
})
