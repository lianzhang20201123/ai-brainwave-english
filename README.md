# AI脑波英语网站（GitHub + Vercel 版）

这是一个可直接上传到 GitHub 并部署到 Vercel 的静态多页面网站，域名为 **ai-naobo.com**。

## 包含内容

- 首页：`index.html`
- 核心原理：`principle.html`
- 课程体系：`courses.html`
- 成功案例：`cases.html`
- 安全认证：`safety.html`
- 机构合作：`partner.html`
- 联系我们：`contact.html`
- 404 页面：`404.html`
- 静态资源目录：`assets/`
- 部署配置：`vercel.json`
- 搜索配置：`robots.txt`、`sitemap.xml`

## 目录结构

```text
.
├── index.html
├── principle.html
├── courses.html
├── cases.html
├── safety.html
├── partner.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── vercel.json
├── .gitignore
├── DEPLOY.md
└── assets/
    ├── styles.css
    ├── app.js
    ├── hero-split.jpg
    ├── children-room.jpg
    ├── adult-room.jpg
    ├── student-focus.jpg
    ├── school-report.jpg
    ├── emc-cover.png
    ├── emc-result.png
    ├── bozai-qr.jpg
    ├── student-video.mp4
    ├── student-video-poster.jpg
    ├── core-principle.pdf
    └── intro.pdf
```

## 本地预览

方法一：直接双击 `index.html`

方法二：推荐使用本地静态服务器

```bash
python3 -m http.server 8000
```

然后打开：

```text
http://localhost:8000
```

## 上传到 GitHub

### 方案一：命令行

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 方案二：网页上传

1. 在 GitHub 新建仓库
2. 把本目录下所有文件上传到仓库根目录
3. 确认首页文件为 `index.html`

## 部署到 Vercel

1. 登录 Vercel
2. 点击 **Add New -> Project**
3. 选择你的 GitHub 仓库并导入
4. Root Directory 保持仓库根目录
5. 不需要额外环境变量
6. 点击部署

## 绑定域名 ai-naobo.com

1. 进入 Vercel 项目
2. 打开 **Settings -> Domains**
3. 添加域名：`ai-naobo.com`
4. 按 Vercel 提示在域名服务商处配置 DNS

## 后续更新

后续只需要修改文件后重新提交到 GitHub：

```bash
git add .
git commit -m "update site"
git push
```

Vercel 会自动触发新部署。

## 说明

这是一个纯静态站点，不依赖数据库和后端服务，适合展示型官网、课程介绍、案例展示、品牌官网和咨询落地页。
