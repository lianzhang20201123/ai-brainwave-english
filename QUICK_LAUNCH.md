# AI脑波英语网站 - 快速上线指南 🚀

## 🎯 目标：30分钟内让 ai-naobo.com 上线

---

## 📋 准备工作确认

- [x] ✅ 域名已申请：ai-naobo.com
- [x] ✅ 网站代码已完成
- [x] ✅ 部署配置已准备
- [ ] ⬜ 你的 GitHub 账号
- [ ] ⬜ 域名管理后台登录信息

---

## 🚀 快速上线步骤

### 步骤1：创建 GitHub 仓库（3分钟）

#### 1.1 访问 GitHub
打开浏览器，访问：https://github.com/

#### 1.2 创建新仓库
1. 点击右上角的 **+** 号
2. 选择 **New repository**
3. 填写仓库信息：
   - **Repository name:** `ai-brainwave-english`
   - **Description:** `AI脑波英语官方网站`
   - **Public/Private:** 选择 **Public**（推荐）
4. 点击 **Create repository**

#### 1.3 记录仓库地址
创建后，你会看到仓库地址，格式类似：
```
https://github.com/你的用户名/ai-brainwave-english.git
```

**⚠️ 重要：请记录这个地址，下一步会用到！**

---

### 步骤2：推送代码到 GitHub（5分钟）

#### 2.1 下载项目代码
从沙箱导出项目文件：
1. 进入工作目录：`/workspace/projects/ai-brainwave-english-website/`
2. 将所有文件打包下载到你的电脑
3. 解压到某个目录，比如：`/Users/你的用户名/ai-brainwave-english-website/`

#### 2.2 在你的电脑上打开终端
- **Mac/Linux:** 打开 Terminal
- **Windows:** 打开 Git Bash 或 PowerShell

#### 2.3 导航到项目目录
```bash
cd /Users/你的用户名/ai-brainwave-english-website/
```

#### 2.4 配置 Git（首次需要）
```bash
git config user.email "你的邮箱@example.com"
git config user.name "你的名字"
```

#### 2.5 初始化 Git 仓库
```bash
git init
git add .
git commit -m "Initial commit: AI脑波英语网站"
git branch -M main
```

#### 2.6 连接远程仓库并推送
```bash
# 替换为你的仓库地址（步骤1.3记录的地址）
git remote add origin https://github.com/你的用户名/ai-brainwave-english.git

# 推送代码到 GitHub
git push -u origin main
```

**⚠️ 提示：如果推送时需要登录，请使用 GitHub 账号密码或 Personal Access Token**

---

### 步骤3：在 Vercel 部署（5分钟）

#### 3.1 访问 Vercel
打开浏览器，访问：https://vercel.com/

#### 3.2 登录或注册
1. 点击 **Sign Up** 或 **Login**
2. 选择 **Continue with GitHub**
3. 授权 Vercel 访问你的 GitHub

#### 3.3 创建新项目
1. 点击 **Add New** → **Project**
2. 在 **Import Git Repository** 中找到 `ai-brainwave-english` 仓库
3. 点击 **Import**

#### 3.4 配置项目
Vercel 会自动检测配置，你只需要确认：

| 配置项 | 值 |
|--------|-----|
| **Framework Preset** | Other / Static |
| **Root Directory** | 留空 |
| **Build Command** | 留空 |
| **Output Directory** | 留空 |
| **Project Name** | ai-brainwave-english（或自定义）|

#### 3.5 开始部署
1. 点击 **Deploy** 按钮
2. 等待 1-2 分钟
3. 部署完成后，你会看到一个 URL，如：
   ```
   https://ai-brainwave-english.vercel.app
   ```

#### 3.6 测试网站
1. 访问生成的 Vercel URL
2. 测试所有页面
3. 确认一切正常

**🎉 恭喜！你的网站已经上线了！**

---

### 步骤4：配置自定义域名（10分钟）

#### 4.1 在 Vercel 添加域名
1. 进入 Vercel 项目控制台
2. 点击 **Settings** 标签
3. 点击左侧菜单的 **Domains**
4. 在输入框中输入：`ai-naobo.com`
5. 点击 **Add** 按钮

#### 4.2 复制 DNS 记录
Vercel 会显示需要添加的 DNS 记录，通常类似：

| 类型 | 名称 | 值 |
|------|------|-----|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**⚠️ 重要：请复制这些记录！**

#### 4.3 在域名注册商配置 DNS
**如果你是在阿里云购买域名：**
1. 访问：https://wanwang.aliyun.com/
2. 登录你的账号
3. 进入 **域名管理**
4. 找到 `ai-naobo.com`，点击 **管理**
5. 点击 **DNS 解析**
6. 添加以下记录：

```
记录1：
- 记录类型：A
- 主机记录：@
- 记录值：76.76.21.21
- TTL：10分钟

记录2：
- 记录类型：CNAME
- 主机记录：www
- 记录值：cname.vercel-dns.com
- TTL：10分钟
```

7. 保存

**如果你是在腾讯云购买域名：**
1. 访问：https://dnspod.cloud.tencent.com/
2. 登录你的账号
3. 进入 **DNS 解析** → **我的域名**
4. 找到 `ai-naobo.com`，点击 **解析**
5. 添加同样的 A 记录和 CNAME 记录
6. 保存

#### 4.4 等待 DNS 生效
- **最快：** 10 分钟
- **最慢：** 48 小时
- **通常：** 10-30 分钟

#### 4.5 验证域名配置
1. 回到 Vercel 控制台
2. 查看 Domains 页面
3. 等待状态变为 **Valid Configuration**
4. 访问：https://ai-naobo.com
5. 测试：http://ai-naobo.com 和 http://www.ai-naobo.com

**🎉 恭喜！你的自定义域名已经配置成功！**

---

### 步骤5：启用 HTTPS（自动完成）✅

Vercel 会自动为你的域名配置 HTTPS 证书：
- ✅ 自动申请 Let's Encrypt SSL 证书
- ✅ 自动续期
- ✅ 无需手动配置

几分钟后，访问 `https://ai-naobo.com` 即可看到 HTTPS 已启用。

---

## 📊 进度检查表

- [ ] 步骤1：创建 GitHub 仓库（3分钟）
- [ ] 步骤2：推送代码到 GitHub（5分钟）
- [ ] 步骤3：在 Vercel 部署（5分钟）
- [ ] 步骤4：配置自定义域名（10分钟）
- [ ] 步骤5：启用 HTTPS（自动完成）

**总计时间：约 25 分钟**

---

## 🔍 验证清单

部署完成后，请逐一检查：

### 基础功能
- [ ] 访问 https://ai-naobo.com 能正常打开
- [ ] 访问 http://ai-naobo.com 能正常打开
- [ ] 访问 https://www.ai-naobo.com 能正常打开
- [ ] 首页加载正常
- [ ] 所有导航链接可点击
- [ ] 页面跳转正常

### 页面测试
- [ ] 首页（index.html）正常显示
- [ ] 产品介绍页（product.html）正常显示
- [ ] 成功案例页（cases.html）正常显示
- [ ] 联系我们页（contact.html）正常显示
- [ ] 关于我们页（about.html）正常显示

### 移动端测试
- [ ] 手机浏览器访问正常
- [ ] 响应式布局正常
- [ ] 触摸操作正常
- [ ] 导航菜单在移动端正常

### 功能测试
- [ ] 数字动画效果
- [ ] FAQ 手风琴效果
- [ ] 联系表单（如果有后端）
- [ ] 平滑滚动

### HTTPS 测试
- [ ] 浏览器显示锁图标 🔒
- [ ] 混合内容警告（无）
- [ ] SSL 证书有效

---

## ⚠️ 常见问题

### Q1: 推送代码到 GitHub 时提示认证失败
**A:**
1. 确保你的 GitHub 账号有仓库访问权限
2. 使用 Personal Access Token（推荐）
3. 或使用 SSH 密钥认证

### Q2: Vercel 部署失败
**A:**
1. 检查 GitHub 仓库是否公开（Public）
2. 检查 Vercel 是否有 GitHub 访问权限
3. 查看 Vercel 部署日志

### Q3: 域名解析失败
**A:**
1. 检查 DNS 记录是否正确添加
2. 等待 10-30 分钟后重试
3. 使用 `nslookup ai-naobo.com` 检查解析
4. 联系域名注册商客服

### Q4: HTTPS 证书未生效
**A:**
1. 确保域名已正确解析到 Vercel
2. 在 Vercel 控制台查看证书状态
3. 等待 10-30 分钟后重试

### Q5: 网站访问速度慢
**A:**
1. Vercel 有全球 CDN，通常速度很快
2. 检查网络连接
3. 清除浏览器缓存
4. 如果在国内，可以考虑使用阿里云 CDN

---

## 📞 需要帮助？

### 官方文档
- **Vercel 文档：** https://vercel.com/docs
- **GitHub 文档：** https://docs.github.com/
- **阿里云 DNS 文档：** https://help.aliyun.com/product/37160.html

### 技术支持
- **Vercel 支持：** https://vercel.com/support
- **GitHub 支持：** https://support.github.com/

---

## 🎉 完成后的操作

### 备份配置
1. 保存 GitHub 仓库地址
2. 保存 Vercel 项目 URL
3. 保存域名管理后台登录信息
4. 记录 DNS 配置

### 后续维护
1. 定期备份代码到 GitHub
2. 监控网站访问情况
3. 收集用户反馈
4. 根据需要更新内容

### 推广网站
1. 分享到社交媒体
2. 添加到公司官网
3. 在名片和宣传材料上印制网址
4. 考虑 SEO 优化

---

## 💡 提示

### 加快速度
- 提前准备好 GitHub 账号
- 提前登录域名管理后台
- 提前阅读本文档，熟悉步骤

### 避免错误
- 不要在 Git 提交信息中使用中文（虽然支持，但建议英文）
- 确保 DNS 记录完全正确
- 按顺序执行步骤，不要跳过

### 安全建议
- 为 GitHub 账号启用双因素认证
- 定期更新密码
- 不要在公共场所推送代码

---

## 🚀 开始吧！

按照上述步骤，**25 分钟内**就能让 `ai-naobo.com` 正式上线！

准备好了吗？让我们开始吧！💪

---

## 📞 紧急联系

如果遇到任何问题，可以：

1. **查看日志：** Vercel 控制台 → Deployments
2. **检查配置：** Vercel 控制台 → Settings
3. **查看文档：** 本文档的"常见问题"部分
4. **联系支持：** 官方技术支持

---

**祝部署顺利！30分钟后，ai-naobo.com 就能正式上线了！** 🎉
