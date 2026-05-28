#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = 'https://ai-naobo.com';
const date = beijingDate();

const clusters = [
  {
    slug: 'zhongkao-english-score-improvement',
    lane: '中考英语',
    zhTitle: '中考英语提分专题：词汇、语法、阅读、写作和刷卷怎么安排',
    enTitle: 'Zhongkao English Score Improvement: vocabulary, grammar, reading, writing and paper review',
    zhDesc: 'AI脑波英语中考英语提分专题，系统解释如何从入学测评、音标词汇、语法阅读、写作和刷卷复盘，形成可执行的提分路径。',
    enDesc: 'A topic cluster for Zhongkao English score improvement, covering assessment, vocabulary, grammar, reading, writing and exam paper review.',
    zhKeywords: ['中考英语提分', '初中英语词汇', '中考英语阅读', 'AI脑波英语'],
    enKeywords: ['Zhongkao English score improvement', 'junior high English vocabulary', 'AI Brainwave English'],
    audience: '初中家长、中考学生、校区咨询老师',
    intent: '解决“孩子中考英语怎么提分、先补什么、课表怎么排”的搜索需求。',
    links: [
      ['中考英语怎么快速提分', '../news/how-to-improve-zhongkao-english-fast.html'],
      ['初中英语词汇问题', '../news/junior-high-english-vocabulary-problem.html'],
      ['课程体系', '../courses.html'],
      ['预约测评', '../contact.html']
    ]
  },
  {
    slug: 'gaokao-3500-vocabulary',
    lane: '高考英语',
    zhTitle: '高考3500词专题：从背过到阅读、写作和试卷能用',
    enTitle: 'Gaokao 3500 Vocabulary: from memorized words to usable reading and writing ability',
    zhDesc: '高考3500词不是只背单词表，AI脑波英语把词汇训练放进阅读、长难句、写作和刷卷复盘中，帮助学生把词汇转成分数能力。',
    enDesc: 'A topic cluster explaining how Gaokao 3500 vocabulary should move from memorization to reading, writing and exam performance.',
    zhKeywords: ['高考3500词', '高考英语提分', '高中英语阅读', 'AI脑波英语'],
    enKeywords: ['Gaokao 3500 words', 'high school English vocabulary', 'Gaokao English reading'],
    audience: '高中家长、高考学生',
    intent: '承接“高考3500词怎么背、怎么用、怎么转成阅读写作分数”的搜索需求。',
    links: [
      ['高考3500词策略', '../gaokao-3500-words.html'],
      ['高考词汇备考方法', '../news/how-to-prepare-gaokao-vocabulary.html'],
      ['课程体系', '../courses.html'],
      ['预约测评', '../contact.html']
    ]
  },
  {
    slug: 'ai-english-learning-cabin-method',
    lane: '学习舱方法',
    zhTitle: 'AI英语学习舱方法专题：前测、读熟、节律化输入、出舱检测和复现巩固',
    enTitle: 'AI English Learning Cabin Method: assessment, preparation, input, exit test and review',
    zhDesc: 'AI英语学习舱不是“睡一觉就会”，而是一套前测、进舱前读熟、学习舱输入、出舱检测和复现巩固组成的训练流程。',
    enDesc: 'A clear explanation of the AI English learning cabin workflow: assessment, preparation, structured input, exit testing and review.',
    zhKeywords: ['AI英语学习舱', '学习舱流程', '出舱检测', '词汇训练'],
    enKeywords: ['AI English learning cabin', 'learning cabin workflow', 'vocabulary training'],
    audience: '家长、学生、机构老师',
    intent: '回答“学习舱到底怎么学、是不是玄学、如何判断效果”的问题。',
    links: [
      ['学习原理', '../principle.html'],
      ['学习舱完整流程', '../news/learning-cabin-process.html'],
      ['安全说明', '../safety.html'],
      ['预约体验', '../contact.html']
    ]
  },
  {
    slug: 'education-center-partnership',
    lane: '机构合作',
    zhTitle: '教育机构合作专题：学习中心如何引入AI英语学习舱和保提分产品',
    enTitle: 'Education Center Partnership: introducing AI English learning cabins and score-improvement programs',
    zhDesc: '面向学习中心、教培机构和学校合作伙伴，解释AI脑波英语的测评、体验、设备、培训、交付和家长沟通模型。',
    enDesc: 'A partnership topic cluster for education centers interested in AI English learning cabins, assessment, delivery and parent communication.',
    zhKeywords: ['AI英语学习舱合作', '教育机构英语增项', '学习中心合作', 'AI脑波英语加盟'],
    enKeywords: ['AI English learning cabin partnership', 'education center English add-on', 'learning center cooperation'],
    audience: '校区负责人、区域代理、教培机构老板',
    intent: '承接“机构怎么合作、怎么落地、怎么验证转化”的商业搜索需求。',
    links: [
      ['机构合作', '../partner.html'],
      ['机构合作模型说明', '../news/franchise-investor-review.html'],
      ['案例与合作', '../cases.html'],
      ['合作咨询', '../contact.html']
    ]
  },
  {
    slug: 'global-ai-english-partnership',
    lane: '全球合作',
    zhTitle: '全球合作专题：AI脑波英语如何面向海外教育机构和华人家庭验证市场',
    enTitle: 'Global Partnership: AI Brainwave English for overseas education centers and Chinese-speaking families',
    zhDesc: 'AI脑波英语全球合作专题，面向海外教育机构、华人家庭、语言学校和产业伙伴，解释学习舱、词汇训练和合作验证路径。',
    enDesc: 'A global partnership topic cluster for overseas education centers, Chinese-speaking families, language schools and industry partners.',
    zhKeywords: ['AI英语海外合作', 'AI Brainwave English', '海外教育合作', '英语学习舱'],
    enKeywords: ['AI Brainwave English global partnership', 'AI English learning cabin overseas', 'Chinese students English training'],
    audience: '海外教育机构、华人社区、全球合作伙伴',
    intent: '承接英文搜索、海外合作和国际AI问答中的品牌解释需求。',
    links: [
      ['英文合作页', '../en/partner.html'],
      ['英文联系页', '../en/contact.html'],
      ['英文洞察入口', '../en/insights.html'],
      ['AI英语百科', '../insights.html']
    ]
  },
  {
    slug: 'edtech-investment-ai-brainwave-english',
    lane: '投资人沟通',
    zhTitle: '投资人专题：AI脑波英语的增长逻辑、交付模型和全球市场机会',
    enTitle: 'Investor Topic: growth logic, delivery model and global opportunity for AI Brainwave English',
    zhDesc: '面向投资人和产业资本，解释AI脑波英语三年GMV目标下的家长端转化、机构合作、全球内容增长和交付标准化逻辑。',
    enDesc: 'An investor-oriented topic cluster explaining growth logic, delivery model, partnerships, global content strategy and standardization.',
    zhKeywords: ['AI英语投资', '教育科技投资', 'AI脑波英语', '英语学习舱商业模式'],
    enKeywords: ['AI English investment', 'China EdTech investment', 'AI Brainwave English business model'],
    audience: '投资人、产业资本、上市公司教育业务负责人',
    intent: '承接“AI英语项目是否值得投资、商业模式如何验证、增长飞轮是什么”的搜索需求。',
    links: [
      ['投资人沟通', '../investors.html'],
      ['机构合作', '../partner.html'],
      ['投资人与加盟模型', '../news/franchise-investor-review.html'],
      ['联系我们', '../contact.html']
    ]
  }
];

for (const cluster of clusters) {
  writeCluster(cluster, 'zh');
  writeCluster(cluster, 'en');
}

updateSitemap();
insertTopicEntry('insights.html', '专题集群', '围绕中考、高考、学习舱、机构合作、全球合作和投资人沟通建立长期搜索入口。', 'topics/zhongkao-english-score-improvement.html');
insertTopicEntry(path.join('en', 'insights.html'), 'Topic clusters', 'Search hubs for Zhongkao, Gaokao, learning cabin methods, partnerships, global expansion and investors.', 'topics/zhongkao-english-score-improvement.html');

console.log(JSON.stringify({
  created: clusters.flatMap((item) => [`topics/${item.slug}.html`, `en/topics/${item.slug}.html`]),
  sitemap: 'sitemap.xml',
  date
}, null, 2));

function writeCluster(cluster, lang) {
  const isZh = lang === 'zh';
  const dir = isZh ? 'topics' : path.join('en', 'topics');
  const file = path.join(root, dir, `${cluster.slug}.html`);
  const title = isZh ? cluster.zhTitle : cluster.enTitle;
  const desc = isZh ? cluster.zhDesc : cluster.enDesc;
  const keywords = isZh ? cluster.zhKeywords : cluster.enKeywords;
  const canonical = isZh ? `${site}/topics/${cluster.slug}.html` : `${site}/en/topics/${cluster.slug}.html`;
  const alternate = isZh ? `${site}/en/topics/${cluster.slug}.html` : `${site}/topics/${cluster.slug}.html`;
  const back = isZh ? '../' : '../../';
  const links = cluster.links.map(([label, href]) => {
    const finalHref = isZh ? href : toEnglishHref(href);
    return `<a class="link" href="${esc(finalHref)}">${esc(label)} →</a>`;
  }).join('');
  const body = `<!doctype html>
<html lang="${isZh ? 'zh-CN' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}｜${isZh ? 'AI脑波英语' : 'AI Brainwave English'}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="keywords" content="${esc(keywords.join(','))}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="${isZh ? 'zh-CN' : 'en'}" href="${canonical}">
  <link rel="alternate" hreflang="${isZh ? 'en' : 'zh-CN'}" href="${alternate}">
  <link rel="stylesheet" href="${back}assets/css/style.css?v=topicclusters">
  <script type="application/ld+json">${jsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: desc,
    url: canonical,
    dateModified: date,
    publisher: { '@type': 'Organization', name: isZh ? 'AI脑波英语' : 'AI Brainwave English' }
  })}</script>
</head>
<body>
${isZh ? zhHeader(back) : enHeader(back)}
<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta"><span class="meta-pill">${esc(cluster.lane)}</span><span class="meta-pill">${date}</span></div>
        <h1>${esc(title)}</h1>
        <p class="hero-note">${esc(desc)}</p>
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">${isZh ? '搜索意图' : 'Search intent'}</div>
        <h3>${isZh ? '这不是单篇文章，而是长期专题入口' : 'This is a long-term topic hub'}</h3>
        <p>${esc(isZh ? cluster.intent : englishIntent(cluster))}</p>
        <a class="button button-primary" href="${back}${isZh ? 'contact.html' : 'en/contact.html'}">${isZh ? '预约测评/合作咨询' : 'Book assessment or partnership call'}</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      <h2>${isZh ? '一句话说明' : 'Short answer'}</h2>
      <p>${esc(isZh ? cluster.intent : englishIntent(cluster))}</p>
      <h2>${isZh ? '这个专题要解决什么' : 'What this topic solves'}</h2>
      <ul>
        <li>${isZh ? '把搜索用户最关心的问题集中在一个稳定页面，便于搜索引擎和AI问答引用。' : 'It gives search engines and AI answer engines a stable page to cite.'}</li>
        <li>${isZh ? '把每天新增文章沉淀到专题下，形成长期内容资产。' : 'It connects daily articles into a durable content asset.'}</li>
        <li>${isZh ? '把家长咨询、机构合作、全球合作和投资沟通导向明确的转化路径。' : 'It connects readers to parent assessment, partnerships and investor communication.'}</li>
      </ul>
      <h2>${isZh ? '推荐阅读路径' : 'Suggested reading path'}</h2>
      <div class="post-list news-post-list">
        ${links}
      </div>
      <h2>${isZh ? '适合谁' : 'Who this is for'}</h2>
      <p>${esc(cluster.audience)}</p>
      <h2>${isZh ? '下一步' : 'Next step'}</h2>
      <p>${isZh ? '如果你是家长，先预约测评；如果你是机构或海外伙伴，先沟通试点场景、场地、人员和交付边界；如果你是投资人，优先看单店模型、内容获客、交付标准化和合规表达。' : 'Parents can start with an assessment. Partners can start with a small pilot. Investors can review unit model, content acquisition, delivery standardization and compliance wording.'}</p>
      <div class="hero-actions small-actions"><a class="button button-primary" href="${back}${isZh ? 'contact.html' : 'en/contact.html'}">${isZh ? '联系AI脑波英语' : 'Contact AI Brainwave English'}</a><a class="button button-secondary" href="${back}${isZh ? 'insights.html' : 'en/insights.html'}">${isZh ? '返回AI英语百科' : 'Back to Insights'}</a></div>
    </div>
  </section>
</main>
${isZh ? zhFooter(back) : enFooter(back)}
<script src="${back}assets/js/main.js"></script>
</body>
</html>
`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
}

function updateSitemap() {
  const sitemapPath = path.join(root, 'sitemap.xml');
  const urls = new Set();
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) urls.add(match[1]);
  }
  for (const cluster of clusters) {
    urls.add(`${site}/topics/${cluster.slug}.html`);
    urls.add(`${site}/en/topics/${cluster.slug}.html`);
  }
  const body = [...urls].sort().map((url) => `  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>`).join('\n');
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

function insertTopicEntry(file, title, desc, href) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  const html = fs.readFileSync(full, 'utf8');
  if (html.includes(href)) return;
  const entry = `<article class="post-card news-card"><div class="meta"><span class="meta-pill">Topic Cluster</span><span class="meta-pill">${date}</span></div><h3>${esc(title)}</h3><p>${esc(desc)}</p><a class="link" href="${href}">${file.startsWith('en/') ? 'View topic hub →' : '查看专题 →'}</a></article>`;
  const marker = '<div class="post-list news-post-list">';
  const index = html.indexOf(marker);
  if (index === -1) return;
  const insertAt = index + marker.length;
  fs.writeFileSync(full, `${html.slice(0, insertAt)}${entry}${html.slice(insertAt)}`);
}

function toEnglishHref(href) {
  const mapped = {
    '../gaokao-3500-words.html': '../news/how-to-prepare-gaokao-vocabulary.html',
    '../news/gaokao-3500-words.html': '../news/how-to-prepare-gaokao-vocabulary.html',
    '../news/franchise-investor-review.html': '../partner.html',
    '../news/learning-cabin-process.html': '../principle.html',
    '../investors.html': '../index.html',
    '../insights.html': '../insights.html',
    '../principle.html': '../principle.html',
    '../safety.html': '../safety.html'
  };
  if (mapped[href]) return mapped[href];
  if (href.startsWith('../news/')) return href.replace('../news/', '../news/');
  if (href.startsWith('../en/')) return href.replace('../en/', '../');
  if (href === '../contact.html') return '../contact.html';
  if (href === '../partner.html') return '../partner.html';
  if (href === '../courses.html') return '../courses.html';
  if (href === '../cases.html') return '../cases.html';
  if (href === '../investors.html') return '../index.html';
  return href;
}

function englishIntent(cluster) {
  return `This hub answers search questions for ${cluster.audience}, then connects readers to assessment, partnership or investor conversations.`;
}

function zhHeader(back) {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="${back}index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI脑波英语</div><div class="brand-sub">学习舱 · 极忆营 · 词汇训练</div></div></a><nav class="nav"><a href="${back}index.html">首页</a><a href="${back}courses.html">课程体系</a><a href="${back}cases.html">案例与合作</a><a href="${back}partner.html">机构合作</a><a href="${back}insights.html" class="active">AI英语百科</a><a href="${back}contact.html">预约体验</a></nav></div></header>`;
}

function enHeader(back) {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="${back}en/index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI Brainwave English</div><div class="brand-sub">Learning cabin · Vocabulary training</div></div></a><nav class="nav"><a href="${back}en/index.html">Home</a><a href="${back}en/courses.html">Programs</a><a href="${back}en/cases.html">Results</a><a href="${back}en/partner.html">Partnerships</a><a href="${back}en/insights.html" class="active">Insights</a><a href="${back}en/contact.html">Contact</a></nav></div></header>`;
}

function zhFooter(back) {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="footer-links"><a href="${back}index.html">首页</a><a href="${back}courses.html">课程体系</a><a href="${back}partner.html">机构合作</a><a href="${back}insights.html">AI英语百科</a><a href="${back}contact.html">联系我们</a></div><small>© 2026 ai-naobo.com · 课程咨询、测评预约、学校合作与机构合作</small></div></div></footer>`;
}

function enFooter(back) {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="footer-links"><a href="${back}en/index.html">Home</a><a href="${back}en/courses.html">Programs</a><a href="${back}en/partner.html">Partnerships</a><a href="${back}en/insights.html">Insights</a><a href="${back}en/contact.html">Contact</a></div><small>© 2026 ai-naobo.com · assessments, programs and partnerships</small></div></div></footer>`;
}

function beijingDate() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function jsonLd(value) {
  return JSON.stringify(value, null, 2).replaceAll('</script', '<\\/script');
}
