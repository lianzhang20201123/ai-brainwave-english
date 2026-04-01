# AI脑波英语官网（最新版完整仓库）

这是适用于 **GitHub + Vercel + ai-naobo.com** 的静态网站完整仓库版本。

## 本版包含

- 中文主站（保留现有内容结构）
- 英文镜像站 `/en/`
- 前台可见的资讯栏目 `insights.html`
- 英文 Insights 栏目 `en/insights.html`
- 10 篇中文家长搜索词文章 `news/*.html`
- 10 篇英文对应文章 `en/news/*.html`
- 更新后的 `sitemap.xml`
- 支持 GitHub 网页端直接上传覆盖

## 主要目录

- `index.html` 中文首页
- `en/index.html` 英文首页
- `insights.html` 中文资讯栏目
- `en/insights.html` 英文资讯栏目
- `news/` 中文文章目录
- `en/news/` 英文文章目录
- `assets/` 图片、视频、样式和脚本资源

## 部署方式

1. 将本仓库全部文件上传到 GitHub 仓库根目录
2. 在 Vercel 导入该仓库
3. 绑定域名 `ai-naobo.com`
4. 后续只需继续新增 `news/*.html`、`en/news/*.html` 并更新 `insights.html` / `en/insights.html` / `sitemap.xml`

## 内容更新建议

后续每次新增资讯，建议同步更新：

- 中文文章页
- 英文文章页
- 中文资讯列表
- 英文资讯列表
- sitemap

