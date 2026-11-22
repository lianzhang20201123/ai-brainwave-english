# AI脑波英语官网自动化说明

## 自动化已停止（2026-11-22）

旧站已退役，不再使用。2026-11-22 起，本仓库内的定时自动任务已关闭，不再自动生成、提交或发布新内容。已有页面和文章未删除，站点页面、跳转、DNS 和托管配置未改。

已在仓库内停用：

- `.github/workflows/daily-seo-geo.yml` 删除了 `schedule`。原先 cron 为 `20 23 * * *`（约北京时间每天 7:20），运行 `scripts/daily-seo-geo.mjs`，生成约 3 篇中文和 3 篇英文文章，校验后提交 `content-specs`、`news`、`en/news`、`insights.html`、`en/insights.html`、`sitemap.xml` 和 `reports/site-metrics`。
- 工作流文件保留。仍可在 GitHub Actions 里用 `workflow_dispatch` 手动运行；手动运行仍会生成并推送内容。
- 仓库里没有其他带 `schedule` 或 `cron` 的工作流，没有 Dependabot / Renovate 配置，脚本也不会自行定时执行。`vercel.json` 只有静态资源缓存头，没有 Vercel Cron。

GitHub 的 `schedule` 只读取默认分支 `main` 上的工作流。在包含本次变更的拉取请求合并进 `main` 之前，每日任务仍会按原计划运行。

仓库外、无法只靠本次代码变更关掉的自动行为：

- Vercel 已通过 Git 集成部署 Production。每次推送到 `main` 都会自动发布到 https://ai-naobo.com 。近期部署创建者是 `vercel[bot]`，与每日内容提交一一对应。要停止“一推送就上线”，需在 Vercel 项目设置里断开 Git 自动部署或暂停项目。本次未改托管配置。
- 仓库 Webhook 列表因权限不足未能读取。若除 Vercel 外还有其他 GitHub App 或外部定时任务监听此仓库，需在对应后台单独关闭。

## 停用前的目标

官网 `ai-naobo.com` 曾每天自动生成并发布 SEO/GEO 内容，服务三类目标：

- 家长端：英语提分、背单词、入学测评、学习舱、保提分。
- 合作端：机构合作、校区增项、学习舱落地、华图吉林样板验证。
- 全球端：英文内容、海外合作、投资人和产业伙伴理解。

## 停用前的自动发布机制

以下机制已于 2026-11-22 停止自动触发。GitHub Actions 工作流文件仍在，仅供手动运行：

- 文件：`.github/workflows/daily-seo-geo.yml`
- 原定时：北京时间每天 7:20 左右（cron `20 23 * * *`，已删除）
- 脚本：`scripts/daily-seo-geo.mjs`
- 产出：每天 3 个中文页面 + 3 个英文页面
- 更新：`insights.html`、`en/insights.html`、`sitemap.xml`
- 校验：`scripts/validate-site.mjs`

## 质量边界

公开页面必须遵守：

- 不公开“最高30分”这类私域/到店咨询口径。
- 不展示学习舱具体数量，只讲长春、北京、石家庄、兰州等城市。
- 不披露华图吉林团队细节。
- 华图合作可说“已进入华图教育吉林长春总部校区开展合作/试点/体验/样板验证”，不得写成全国复制已成功。
- 不使用医疗化、玄学化表达。
- 学习舱必须解释为“前测、读熟、节律化输入、出舱检测、复现巩固”的流程。

## 转化口径

- 入学测评：免费，需要预约，标准时长约 30 分钟。
- 预约时间：平日下午 4 点到晚 9 点，周末早 8 点到晚 9 点，具体以当地校区安排为准。
- 体验：缴 500 元保证金后体验；不满意可退费离开；认可效果后补齐正式费用。
- 公开页面不展示完整退费细节，详细规则在到店咨询和签约沟通中说明。

## 人工介入场景

以下情况需要人工处理：

- GitHub 权限失效。
- GitHub Actions 报错。
- 同一天手动改官网和自动日更同时修改 `insights.html`、`en/insights.html`、`sitemap.xml`，导致本地推送需要 rebase。
- 发布真实学生案例前，需要至少做匿名化处理；重要案例建议补充书面授权。

## 本地常用命令

生成每日内容：

```bash
node scripts/daily-seo-geo.mjs
```

生成保提分专题：

```bash
node scripts/build-guaranteed-score-page.mjs
```

生成入学测评专题：

```bash
node scripts/build-assessment-page.mjs
```

校验站点：

```bash
node scripts/validate-site.mjs
```
