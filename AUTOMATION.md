# AI脑波英语官网自动化说明

## 当前目标

官网 `ai-naobo.com` 每天自动生成并发布 SEO/GEO 内容，服务三类目标：

- 家长端：英语提分、背单词、入学测评、学习舱、保提分。
- 合作端：机构合作、校区增项、学习舱落地、华图吉林样板验证。
- 全球端：英文内容、海外合作、投资人和产业伙伴理解。

## 自动发布机制

GitHub Actions 工作流：

- 文件：`.github/workflows/daily-seo-geo.yml`
- 时间：北京时间每天 7:20 左右
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
