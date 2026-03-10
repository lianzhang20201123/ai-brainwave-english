# AI脑波英语官方网站

## 项目简介

这是AI脑波英语的官方网站，展示了产品介绍、成功案例和联系方式。

**设计风格：** Apple 风格，简洁高端，配色采用 Apple 官方配色系统

**技术栈：** 纯HTML5 + CSS3 + JavaScript，响应式设计

## 🚀 快速上线（推荐）

### 最简单方式：Vercel 部署（10分钟上线）

**优点：**
- ✅ 完全免费
- ✅ 全球CDN加速
- ✅ 自动HTTPS
- ✅ 无需备案
- ✅ 支持自定义域名

**部署步骤：**
1. 访问 [Vercel](https://vercel.com/) 并使用 GitHub 账号登录
2. 点击 "New Project"
3. 导入本项目的 GitHub 仓库
4. 点击 "Deploy" 按钮即可

**详细指南：** 查看 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 技术栈

- 纯HTML5 + CSS3 + JavaScript
- 响应式设计，支持移动端
- 现代化的UI设计
- 科技感配色方案

## 本地开发

### 方法1：使用Python启动本地服务器

```bash
# Python 3
cd /workspace/projects/ai-brainwave-english-website
python -m http.server 8000
```

然后在浏览器中访问：http://localhost:8000

### 方法2：使用Node.js启动本地服务器

```bash
cd /workspace/projects/ai-brainwave-english-website
npx http-server -p 8000
```

然后在浏览器中访问：http://localhost:8000

### 方法3：直接打开文件

直接在浏览器中打开 `index.html` 文件即可查看。

---

## 🌐 部署选项

### 方案对比

| 平台 | 费用 | 速度 | 需要备案 | 推荐度 |
|------|------|------|---------|--------|
| **Vercel** | 免费 | ⭐⭐⭐⭐ | 否 | ⭐⭐⭐⭐⭐ |
| **Netlify** | 免费 | ⭐⭐⭐⭐ | 否 | ⭐⭐⭐⭐⭐ |
| **阿里云OSS+CDN** | 50-100元/年 | ⭐⭐⭐⭐⭐ | 是 | ⭐⭐⭐⭐ |
| **GitHub Pages** | 免费 | ⭐⭐⭐ | 否 | ⭐⭐⭐⭐ |

### 部署准备

运行部署准备脚本：

```bash
./deploy.sh
```

这将：
- ✅ 检查文件完整性
- ✅ 生成部署信息
- ✅ 创建 Git 配置

### 推荐部署平台

**1. Vercel（最推荐）**
- 🚀 最简单快捷
- 💰 完全免费
- 🌍 全球CDN
- 🔒 自动HTTPS
- 📦 持续部署

**2. Netlify**
- 🚀 简单易用
- 💰 完全免费
- 📝 内置表单处理
- 🔒 自动HTTPS

**3. 阿里云OSS + CDN（国内方案）**
- 🚀 国内访问速度快
- 💰 约50-100元/年
- ⚠️ 需要备案
- 🏢 企业级服务

---

## 📝 部署文件说明

项目已包含以下部署配置文件：

- `vercel.json` - Vercel 平台配置
- `netlify.toml` - Netlify 平台配置
- `deploy.sh` - 部署准备脚本
- `DEPLOYMENT_GUIDE.md` - 完整部署指南
- `DEPLOY_INFO.txt` - 部署信息（运行 deploy.sh 后生成）

---

## 🎯 快速部署清单

- [ ] 1. 检查网站内容是否完整
- [ ] 2. 运行 `./deploy.sh` 准备部署
- [ ] 3. 将代码提交到 GitHub
- [ ] 4. 在 Vercel 创建项目并导入
- [ ] 5. 点击部署按钮
- [ ] 6. 测试网站功能
- [ ] 7. （可选）配置自定义域名
- [ ] 8. （可选）配置 DNS 解析

---

## 📞 技术支持

- **详细部署指南：** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Vercel 文档：** https://vercel.com/docs
- **Netlify 文档：** https://docs.netlify.com/

---

## 页面结构

1. **首页 (index.html)** - 品牌介绍、核心数据、产品特点、核心原理、安全说明
2. **产品介绍 (product.html)** - 产品展示、技术原理、核心原理、安全说明、适用人群
3. **成功案例 (cases.html)** - 真实案例、用户反馈
4. **联系我们 (contact.html)** - 商务合作、在线咨询、FAQ
5. **关于我们 (about.html)** - 公司介绍、使命愿景、发展历程、企业文化

## 快速启动

### 方法1：使用Python启动本地服务器

```bash
# Python 3
cd /workspace/projects/ai-brainwave-english-website
python -m http.server 8000
```

然后在浏览器中访问：http://localhost:8000

### 方法2：使用Node.js启动本地服务器

```bash
cd /workspace/projects/ai-brainwave-english-website
npx http-server -p 8000
```

然后在浏览器中访问：http://localhost:8000

### 方法3：直接打开文件

直接在浏览器中打开 `index.html` 文件即可查看。

## 文件说明

- `index.html` - 首页
- `product.html` - 产品介绍页
- `cases.html` - 成功案例页
- `contact.html` - 联系我们页
- `about.html` - 关于我们页
- `styles.css` - 主样式文件
- `script.js` - JavaScript交互脚本
- `README.md` - 项目说明文档
- `logo.png` - 自定义LOGO图片
- `brainwave-device.jpg` - 科技感眼罩和耳机图片
- `learning-pod-1.jpg` - 学习仓单舱图片
- `learning-pod-2.png` - 学习仓主图
- `learning-pod-3.jpg` - 学习仓多舱图片
- `report-cover.png` - 检测报告封面
- `report-detail.png` - 检测报告详情

## 功能特性

- ✅ 响应式设计，适配各种屏幕尺寸
- ✅ 现代化的UI设计，专业科技配色（深天蓝 #0284c7）
- ✅ 完全去除紫色，采用蓝色系配色
- ✅ 自定义LOGO集成
- ✅ 核心原理展示板块
- ✅ 安全说明展示板块（含权威检测报告）
- ✅ 丰富的导航菜单（6个导航项）
- ✅ 关于我们页面
- ✅ 产品展示页面（含学习仓图片和科技感设备）
- ✅ Hero区域科技感动画（浮动、渐变、光效）
- ✅ 优化的卡片和按钮样式
- ✅ 平滑滚动效果
- ✅ 数字动画效果
- ✅ FAQ手风琴效果
- ✅ 表单验证
- ✅ 导航栏固定效果

## 浏览器兼容性

支持所有现代浏览器：
- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 联系方式

- 微信：lianzhang8877
- 备注：合作

## 许可证

© 2025 AI脑波英语. All rights reserved.
