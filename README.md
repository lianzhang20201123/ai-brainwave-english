# AI脑波英语官网静态站

适用于 GitHub + Vercel + ai-naobo.com 的静态官网仓库。

## 当前版本包含

- 中文官网页面：首页、核心原理、课程体系、成功案例、安全认证、资讯、机构合作、联系我们
- 英文官网页面：`/en/` 下的全站镜像页
- 公开资讯栏目：`insights.html` 与 `en/insights.html`
- 可持续扩展的文章目录：`/news/` 与 `/en/news/`
- 文章模板：`news/_template.html` 与 `en/news/_template.html`
- 现有 2 个公开视频文件，适合 GitHub 网页端上传

## 多语言与 SEO

- 中文站为根目录
- 英文站为 `/en/`
- 页面已加入 hreflang 与 canonical
- `sitemap.xml` 已收录中英文页面与资讯文章页

## 部署

直接上传到 GitHub 仓库后，导入 Vercel 即可部署。
