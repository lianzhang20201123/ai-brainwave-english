#!/bin/bash

# AI脑波英语网站 - 快速部署脚本
# 此脚本用于准备网站部署

echo "=========================================="
echo "  AI脑波英语网站 - 部署准备脚本"
echo "=========================================="
echo ""

# 检查文件完整性
echo "📂 检查文件完整性..."
files=(
  "index.html"
  "product.html"
  "cases.html"
  "contact.html"
  "about.html"
  "styles.css"
  "script.js"
)

all_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - 文件不存在"
    all_exist=false
  fi
done

if [ "$all_exist" = false ]; then
  echo ""
  echo "❌ 部署失败：缺少必要文件"
  exit 1
fi

echo ""
echo "✅ 所有文件完整"
echo ""

# 优化图片（如果存在）
echo "🖼️ 检查图片文件..."
if [ -d "images" ]; then
  image_count=$(find images -type f | wc -l)
  echo "✅ 找到 $image_count 张图片"
else
  echo "⚠️ 未找到 images 目录"
fi

echo ""

# 生成部署信息
echo "📝 生成部署信息..."
cat > DEPLOY_INFO.txt << EOF
AI脑波英语网站 - 部署信息
==========================================

部署时间: $(date '+%Y-%m-%d %H:%M:%S')

文件清单:
- index.html (首页)
- product.html (产品介绍)
- cases.html (成功案例)
- contact.html (联系我们)
- about.html (关于我们)
- styles.css (样式文件)
- script.js (脚本文件)

推荐部署平台:
1. Vercel (最推荐) - https://vercel.com/
2. Netlify - https://www.netlify.com/
3. GitHub Pages - https://pages.github.com/

快速部署步骤（Vercel）:
1. 访问 https://vercel.com/
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入本项目的 GitHub 仓库
5. 点击 "Deploy" 即可

自定义域名:
1. 在域名注册商购买域名
2. 在 Vercel 控制台添加域名
3. 配置 DNS 解析
4. 等待生效（最多48小时）

技术支持:
- Vercel 文档: https://vercel.com/docs
- Netlify 文档: https://docs.netlify.com/
- 部署指南: 查看 DEPLOYMENT_GUIDE.md

==========================================
EOF

echo "✅ 部署信息已生成到 DEPLOY_INFO.txt"
echo ""

# 检查是否有 .gitignore
echo "📝 检查 Git 配置..."
if [ ! -f ".gitignore" ]; then
  cat > .gitignore << EOF
# 系统文件
.DS_Store
Thumbs.db

# 编辑器
.vscode
.idea
*.swp
*.swo

# 日志
*.log
logs/

# 临时文件
tmp/
temp/
*.tmp

# 部署信息（可选）
DEPLOY_INFO.txt
EOF
  echo "✅ 已创建 .gitignore 文件"
else
  echo "✅ .gitignore 文件已存在"
fi

echo ""
echo "=========================================="
echo "  ✅ 部署准备完成！"
echo "=========================================="
echo ""
echo "下一步："
echo "1. 将代码提交到 Git 仓库（GitHub/GitLab）"
echo "2. 在 Vercel/Netlify 创建项目并导入仓库"
echo "3. 点击部署按钮即可上线"
echo ""
echo "详细说明请查看："
echo "- DEPLOYMENT_GUIDE.md（完整部署指南）"
echo "- DEPLOY_INFO.txt（部署信息）"
echo ""
