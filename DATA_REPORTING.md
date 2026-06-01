# AI脑波英语官网数据统计说明

## 已自动化

每天 GitHub Actions 会生成官网 SEO/GEO 日更，并同步生成：

- `reports/site-metrics/latest.md`
- `reports/site-metrics/YYYY-MM-DD.md`
- `reports/site-metrics/YYYY-MM-DD.json`

当前日报统计的是发布与SEO/GEO健康数据：

- HTML页面总数
- Sitemap URL数
- 中文/英文文章数
- 中文/英文专题页数
- 最新文章列表
- canonical、Article JSON-LD、FAQPage JSON-LD、sitemap覆盖等基础问题

## 尚未接入

真实经营数据需要外部数据源：

- 官网访问量、来源渠道、页面停留：GA4、Plausible、百度统计或类似工具
- Google搜索词、展示、点击、平均排名：Google Search Console
- 百度搜索表现：百度搜索资源平台或百度统计
- 扫码线索数：分渠道二维码或带UTM参数的落地页

## 后续推荐

1. 先接入一个主统计源：GA4 或 Plausible。
2. 同时接入 Google Search Console 和百度搜索资源平台。
3. 给家长测评、机构合作、投资人、海外合作分别使用独立二维码或独立参数。
4. 每日增长包中报告：新增页面、收录准备、访问量、搜索词、扫码线索、转化动作。
