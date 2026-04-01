# 部署说明

## 1. GitHub

在项目目录执行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 2. Vercel

- 进入 Vercel 后台
- 选择 **Add New -> Project**
- 选择 GitHub 仓库
- 导入后直接部署

## 3. 自定义域名

在 Vercel 项目设置中添加：

- `ai-naobo.com`
- `www.ai-naobo.com`（可选）

按后台提示配置 DNS。

## 4. 常见问题

### 页面样式没加载
确认 `assets/` 目录已经一起上传。

### 视频无法播放
确认 `assets/student-video.mp4` 已上传且文件完整。

### 域名没有生效
等待 DNS 传播，通常需要几分钟到几小时。

### 404 页面
项目已自带 `404.html`。
