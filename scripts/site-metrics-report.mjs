#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const date = process.env.REPORT_DATE || beijingDate();
const outDir = path.join(root, 'reports', 'site-metrics');

const htmlFiles = listFiles(root, '.html')
  .filter((file) => !file.includes(`${path.sep}.git${path.sep}`))
  .map((file) => path.relative(root, file).replaceAll(path.sep, '/'))
  .filter((file) => !isNonIndexableUtilityPage(file))
  .filter((file) => !hasNoindex(file))
  .sort();

const newsZh = htmlFiles.filter((file) => file.startsWith('news/'));
const newsEn = htmlFiles.filter((file) => file.startsWith('en/news/'));
const topicZh = htmlFiles.filter((file) => file.startsWith('topics/'));
const topicEn = htmlFiles.filter((file) => file.startsWith('en/topics/'));
const sitemapUrls = readSitemapUrls();
const latestZh = latest(newsZh, 12);
const latestEn = latest(newsEn, 12);
const issues = collectIssues(htmlFiles);

const report = {
  date,
  generatedAt: new Date().toISOString(),
  totals: {
    htmlPages: htmlFiles.length,
    sitemapUrls: sitemapUrls.length,
    zhNews: newsZh.length,
    enNews: newsEn.length,
    zhTopics: topicZh.length,
    enTopics: topicEn.length,
    issueCount: issues.length
  },
  latest: {
    zhNews: latestZh,
    enNews: latestEn
  },
  issues: issues.slice(0, 80),
  notes: [
    'This report measures site publishing and SEO/GEO readiness, not real visitor traffic.',
    'Traffic, search queries, conversions, and QR scans require GA4/Search Console/Baidu Analytics or another connected data source.'
  ]
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `${date}.json`), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, `${date}.md`), renderMarkdown(report));
fs.writeFileSync(path.join(outDir, 'latest.md'), renderMarkdown(report));

console.log(JSON.stringify({
  date,
  report: `reports/site-metrics/${date}.md`,
  latest: 'reports/site-metrics/latest.md',
  totals: report.totals
}, null, 2));

function beijingDate() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
}

function listFiles(dir, ext, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, ext, acc);
    else if (entry.isFile() && full.endsWith(ext)) acc.push(full);
  }
  return acc;
}

function isNonIndexableUtilityPage(file) {
  const basename = path.posix.basename(file);
  return basename === '404.html' || basename.startsWith('_');
}

function hasNoindex(file) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  return /<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta\s+[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

function readSitemapUrls() {
  const sitemap = path.join(root, 'sitemap.xml');
  if (!fs.existsSync(sitemap)) return [];
  const xml = fs.readFileSync(sitemap, 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).sort();
}

function latest(files, limit) {
  return files
    .filter((file) => /^\D*(?:en\/)?news\/\d{4}-\d{2}-\d{2}-/.test(file))
    .sort()
    .reverse()
    .slice(0, limit);
}

function collectIssues(files) {
  const issues = [];
  const sitemapSet = new Set(sitemapUrls.map((url) => url.replace('https://ai-naobo.com/', '')));
  for (const file of files) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    if (!html.includes('rel="canonical"')) issues.push(`${file}: missing canonical`);
    if ((file.startsWith('news/') || file.startsWith('en/news/')) && !html.includes('"@type": "Article"')) {
      issues.push(`${file}: news page missing Article JSON-LD`);
    }
    if ((file.startsWith('news/') || file.startsWith('en/news/')) && !html.includes('"@type": "FAQPage"')) {
      issues.push(`${file}: news page missing FAQPage JSON-LD`);
    }
    const sitemapPath = file.endsWith('/index.html')
      ? file.slice(0, -'index.html'.length)
      : file === 'index.html' ? '' : file;
    if (!sitemapSet.has(file) && !sitemapSet.has(sitemapPath)) {
      issues.push(`${file}: missing from sitemap.xml`);
    }
  }
  return issues;
}

function renderMarkdown(data) {
  const lines = [];
  lines.push(`# AI脑波英语官网数据日报`);
  lines.push('');
  lines.push(`日期：${data.date}`);
  lines.push('');
  lines.push(`## 1. 发布与SEO/GEO健康`);
  lines.push('');
  lines.push(`- HTML页面总数：${data.totals.htmlPages}`);
  lines.push(`- Sitemap URL数：${data.totals.sitemapUrls}`);
  lines.push(`- 中文文章数：${data.totals.zhNews}`);
  lines.push(`- 英文文章数：${data.totals.enNews}`);
  lines.push(`- 中文专题页数：${data.totals.zhTopics}`);
  lines.push(`- 英文专题页数：${data.totals.enTopics}`);
  lines.push(`- 结构/收录准备问题数：${data.totals.issueCount}`);
  lines.push('');
  lines.push(`## 2. 最新中文文章`);
  lines.push('');
  for (const file of data.latest.zhNews) lines.push(`- ${file}`);
  lines.push('');
  lines.push(`## 3. Latest English Articles`);
  lines.push('');
  for (const file of data.latest.enNews) lines.push(`- ${file}`);
  lines.push('');
  lines.push(`## 4. 需要继续修复的SEO基础问题`);
  lines.push('');
  if (data.issues.length === 0) {
    lines.push(`- 暂无。`);
  } else {
    for (const issue of data.issues.slice(0, 30)) lines.push(`- ${issue}`);
    if (data.issues.length > 30) lines.push(`- 另有 ${data.issues.length - 30} 个问题在JSON报告中。`);
  }
  lines.push('');
  lines.push(`## 5. 还需接入的数据源`);
  lines.push('');
  lines.push(`- 官网访问量、来源渠道、页面停留：需接入 GA4 / Plausible / 百度统计之一。`);
  lines.push(`- Google搜索词、展示、点击、平均排名：需接入 Google Search Console。`);
  lines.push(`- 百度搜索表现：需接入百度搜索资源平台或百度统计。`);
  lines.push(`- 扫码线索数：需用不同二维码/UTM参数区分家长、机构、投资人、海外合作来源。`);
  lines.push('');
  return `${lines.join('\n')}\n`;
}
