#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = 'https://ai-naobo.com';
const date = beijingDate();

writeFile(path.join(root, 'topics', 'english-assessment-before-score-improvement.html'), renderZh());
writeFile(path.join(root, 'en', 'topics', 'english-assessment-before-score-improvement.html'), renderEn());
updateSitemap();
insertHubCard('insights.html', '孩子英语提不上去，为什么要先做入学测评？', '30分钟免费预约测评，先判断孩子卡在音标、词汇、语法、阅读、写作还是刷卷复盘。', 'topics/english-assessment-before-score-improvement.html');
insertHubCard(path.join('en', 'insights.html'), 'Why English score improvement should start with assessment', 'A 30-minute free assessment helps separate phonics, vocabulary, grammar, reading, writing and exam-review gaps.', 'topics/english-assessment-before-score-improvement.html');

console.log(JSON.stringify({
  created: ['topics/english-assessment-before-score-improvement.html', 'en/topics/english-assessment-before-score-improvement.html'],
  sitemap: 'sitemap.xml',
  date
}, null, 2));

function renderZh() {
  const url = `${site}/topics/english-assessment-before-score-improvement.html`;
  const enUrl = `${site}/en/topics/english-assessment-before-score-improvement.html`;
  const title = '孩子英语提不上去，为什么要先做入学测评？';
  const description = 'AI脑波英语解释英语提分前为什么要先做30分钟免费预约测评，判断孩子卡在音标、词汇、语法、阅读、写作还是刷卷复盘，再决定保提分目标。';
  return page({
    lang: 'zh-CN',
    title: `${title}｜AI脑波英语`,
    description,
    keywords: '英语提分测评,入学测评,孩子英语提不上去,英语保提分,AI脑波英语',
    canonical: url,
    alternates: [['zh-CN', url], ['en', enUrl]],
    css: '../assets/css/style.css?v=assessment',
    js: '../assets/js/main.js',
    header: zhHeader(),
    footer: zhFooter(),
    json: jsonScripts(title, description, url, 'AI脑波英语', zhFaqs()),
    body: `<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta"><span class="meta-pill">免费预约测评</span><span class="meta-pill">30分钟</span><span class="meta-pill">${date}</span></div>
        <h1>${title}</h1>
        <p class="hero-note">同样是英语分数不涨，原因可能完全不同。先测卡点，再谈保提分目标和学习舱训练方案。</p>
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">预约时间</div>
        <h3>平日下午4点后，周末全天可约</h3>
        <p>入学测评免费，但需要预约。平日可约下午4点到晚9点，周末可约早8点到晚9点。</p>
        <a class="button button-primary" href="../contact.html">预约30分钟测评</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      <h2>一句话说明</h2>
      <p>英语提分前先做入学测评，是为了判断孩子到底卡在音标、自然拼读、词汇、语法、听力、阅读、写作还是试卷复盘。卡点不同，训练路径和保提分目标就不同。</p>
      <h2>为什么不能只看总分？</h2>
      <p>同样考70分，孩子的真实问题可能完全不同。一个孩子可能单词读不准，一个孩子可能词汇量不够，一个孩子可能语法结构混乱，还有一个孩子可能平时会、考试做不完。只看总分，很容易把训练方向做错。</p>
      <ul>
        <li>音标和自然拼读：判断孩子能不能读准、拼出、听辨。</li>
        <li>词汇量和遗忘：判断孩子是不会背、背不住，还是不会用。</li>
        <li>语法和句子：判断阅读、完形、写作的结构问题。</li>
        <li>听力、阅读、写作：判断词汇是否能进入真实题型。</li>
        <li>试卷复盘：判断错题来源和考试稳定性。</li>
      </ul>
      <h2>测评后如何决定保提分目标？</h2>
      <p>保提分目标不公开写固定数字，也不适合不测评就承诺。测评后会结合孩子基础、配合度、训练时间、考试周期和家庭配合，判断是否适合签约，以及目标应该定到什么范围。</p>
      <h2>学习舱从哪里接入？</h2>
      <p>学习舱不是第一步，也不是全部。孩子要先读熟、跟读、纠音，再进入学习舱做节律化输入。出舱后马上检测，隔天复现，后续再进入语法、阅读、写作和刷卷复盘。</p>
      <h2>3到5天体验怎么安排？</h2>
      <p>家长缴500元保证金后可以进入体验。不满意可随时退费离开，不收取费用；如果看到效果并认可训练方案，再补齐正式费用。</p>
      <h2>哪些城市可以预约？</h2>
      <p>目前 AI脑波英语正在长春、北京、石家庄、兰州等城市推进学习舱体验与交付。具体预约以当地校区实际安排为准。</p>
      <h2>常见问题</h2>
      ${faqHtml(zhFaqs(), true)}
      <div class="article-cta">
        <h2>下一步</h2>
        <p>如果孩子英语提不上去，先预约一次30分钟免费测评。先找卡点，再决定是否进入保提分训练。</p>
        <div class="hero-actions small-actions"><a class="button button-primary" href="../contact.html">预约测评</a><a class="button button-secondary" href="contract-score-improvement.html">了解保提分流程</a></div>
      </div>
    </div>
  </section>
</main>`
  });
}

function renderEn() {
  const url = `${site}/en/topics/english-assessment-before-score-improvement.html`;
  const zhUrl = `${site}/topics/english-assessment-before-score-improvement.html`;
  const title = 'Why English score improvement should start with assessment';
  const description = 'AI Brainwave English explains why a 30-minute free assessment should identify phonics, vocabulary, grammar, reading, writing and exam-review gaps before setting a score-improvement target.';
  return page({
    lang: 'en',
    title: `${title} | AI Brainwave English`,
    description,
    keywords: 'English score assessment,English score improvement,AI Brainwave English,learning cabin,vocabulary training',
    canonical: url,
    alternates: [['en', url], ['zh-CN', zhUrl], ['x-default', url]],
    css: '../../assets/css/style.css?v=assessment',
    js: '../../assets/js/main.js',
    header: enHeader(),
    footer: enFooter(),
    json: jsonScripts(title, description, url, 'AI Brainwave English', enFaqs()),
    body: `<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta"><span class="meta-pill">Free assessment</span><span class="meta-pill">30 minutes</span><span class="meta-pill">${date}</span></div>
        <h1>${title}</h1>
        <p class="hero-note">The same English score can hide different problems. Assessment separates phonics, vocabulary, grammar, reading, writing and exam-review gaps before a plan is made.</p>
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">Reservation-based</div>
        <h3>Weekday afternoon and weekend appointments</h3>
        <p>The entrance assessment is free and reservation-based. Weekday appointments are generally after 4:00 PM, and weekend appointments from 8:00 AM to 9:00 PM.</p>
        <a class="button button-primary" href="../contact.html">Book assessment</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      <h2>Short answer</h2>
      <p>English score improvement should begin with assessment because the student may be blocked by pronunciation, phonics, vocabulary, grammar, listening, reading, writing or exam-paper habits. Different gaps require different training paths.</p>
      <h2>Why total score is not enough</h2>
      <p>Two students with the same score may need completely different help. One may mispronounce words, one may lack vocabulary, one may not understand sentence structure, and another may fail to finish exam papers on time.</p>
      <ul>
        <li>Phonics and pronunciation: can the student read, spell and hear words accurately?</li>
        <li>Vocabulary and forgetting: does the student recognize, recall and use words?</li>
        <li>Grammar and sentence structure: can the student understand reading and write sentences?</li>
        <li>Listening, reading and writing: can vocabulary move into real tasks?</li>
        <li>Exam review: where do repeated mistakes come from?</li>
      </ul>
      <h2>How the score target is decided</h2>
      <p>The website does not publish a fixed score promise. After assessment, the target depends on baseline, cooperation level, available training time, exam timeline and family support.</p>
      <h2>Where the learning cabin fits</h2>
      <p>The learning cabin is not the first step and not the whole program. Students prepare pronunciation and target vocabulary first, then use structured input in the cabin, followed by exit testing, review and exam-specific practice.</p>
      <h2>How the 3 to 5 day experience works</h2>
      <p>Families can start the experience after paying a 500 RMB deposit. If they are not satisfied, the deposit can be refunded and no tuition is charged. If the family recognizes the effect, formal payment can follow.</p>
      <h2>Available cities</h2>
      <p>AI Brainwave English is developing learning cabin delivery in Changchun, Beijing, Shijiazhuang and Lanzhou. Local appointment availability depends on each center.</p>
      <h2>Frequently asked questions</h2>
      ${faqHtml(enFaqs(), false)}
      <div class="article-cta">
        <h2>Next step</h2>
        <p>Book a 30-minute free assessment first. Find the learning gap before deciding whether a contract-based score-improvement plan fits.</p>
        <div class="hero-actions small-actions"><a class="button button-primary" href="../contact.html">Book assessment</a><a class="button button-secondary" href="contract-score-improvement.html">View contract model</a></div>
      </div>
    </div>
  </section>
</main>`
  });
}

function page(p) {
  return `<!doctype html>
<html lang="${p.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <meta name="keywords" content="${esc(p.keywords)}">
  <link rel="canonical" href="${p.canonical}">
${p.alternates.map(([lang, href]) => `  <link rel="alternate" hreflang="${lang}" href="${href}">`).join('\n')}
  <link rel="stylesheet" href="${p.css}">
${p.json}
</head>
<body>
${p.header}
${p.body}
${p.footer}
<script src="${p.js}"></script>
</body>
</html>
`;
}

function zhFaqs() {
  return [
    ['入学测评收费吗？', '入学测评免费，但需要提前预约。标准测评时长约30分钟。'],
    ['测评后一定能签保提分吗？', '不一定。需要看孩子基础、训练时间、配合度和目标是否合理。'],
    ['3到5天体验是否收费？', '体验前缴500元保证金，不满意可退费离开；认可效果后再补齐正式费用。'],
    ['官网为什么不写固定提分数？', '不同学生基础不同，公开固定数字容易造成误解。具体目标应在测评和到店沟通后确定。']
  ];
}

function enFaqs() {
  return [
    ['Is the entrance assessment free?', 'Yes. The entrance assessment is free and reservation-based. The standard assessment takes about 30 minutes.'],
    ['Can every student sign a score-improvement contract?', 'No. Fit depends on baseline, available time, cooperation level and whether the target is realistic.'],
    ['Is the 3 to 5 day experience free?', 'Families pay a 500 RMB deposit first. If they are not satisfied, the deposit can be refunded and no tuition is charged.'],
    ['Why does the website not publish a fixed score increase?', 'Student baselines vary. A fixed public number can be misleading, so targets should be set after assessment and consultation.']
  ];
}

function faqHtml(items) {
  return `<div class="faq">\n${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}\n</div>`;
}

function jsonScripts(title, description, url, orgName, faqs) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: orgName },
    publisher: { '@type': 'Organization', name: orgName },
    mainEntityOfPage: url,
    datePublished: date,
    dateModified: date
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
  return `  <script type="application/ld+json">${jsonLd(article)}</script>\n  <script type="application/ld+json">${jsonLd(faq)}</script>`;
}

function updateSitemap() {
  const sitemapPath = path.join(root, 'sitemap.xml');
  const urls = new Set();
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) urls.add(match[1]);
  }
  urls.add(`${site}/topics/english-assessment-before-score-improvement.html`);
  urls.add(`${site}/en/topics/english-assessment-before-score-improvement.html`);
  const body = [...urls].sort().map((url) => `  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>`).join('\n');
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

function insertHubCard(file, title, desc, href) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  const html = fs.readFileSync(full, 'utf8');
  if (html.includes(href)) return;
  const text = file.startsWith('en/') ? 'View topic hub →' : '查看专题 →';
  const card = `<article class="post-card news-card"><div class="meta"><span class="meta-pill">${file.startsWith('en/') ? 'Assessment' : '入学测评'}</span><span class="meta-pill">${date}</span></div><h3>${esc(title)}</h3><p>${esc(desc)}</p><a class="link" href="${href}">${text}</a></article>`;
  const marker = '<div class="post-list news-post-list">';
  const idx = html.indexOf(marker);
  if (idx === -1) return;
  fs.writeFileSync(full, `${html.slice(0, idx + marker.length)}${card}${html.slice(idx + marker.length)}`);
}

function zhHeader() {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI脑波英语</div><div class="brand-sub">学习舱 · 入学测评 · 保提分</div></div></a><nav class="nav"><a href="../index.html">首页</a><a href="../courses.html">课程体系</a><a href="../cases.html">案例与合作</a><a href="../partner.html">机构合作</a><a href="../insights.html" class="active">AI英语百科</a><a href="../contact.html">预约体验</a></nav></div></header>`;
}

function enHeader() {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI Brainwave English</div><div class="brand-sub">Assessment · Learning cabin · Score path</div></div></a><nav class="nav"><a href="../index.html">Home</a><a href="../courses.html">Programs</a><a href="../cases.html">Results</a><a href="../partner.html">Partnerships</a><a href="../insights.html" class="active">Insights</a><a href="../contact.html">Contact</a></nav></div></header>`;
}

function zhFooter() {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="footer-links"><a href="../index.html">首页</a><a href="../courses.html">课程体系</a><a href="../partner.html">机构合作</a><a href="../insights.html">AI英语百科</a><a href="../contact.html">联系我们</a></div><small>© 2026 ai-naobo.com · 课程咨询、测评预约、学校合作与机构合作</small></div></div></footer>`;
}

function enFooter() {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="footer-links"><a href="../index.html">Home</a><a href="../courses.html">Programs</a><a href="../partner.html">Partnerships</a><a href="../insights.html">Insights</a><a href="../contact.html">Contact</a></div><small>© 2026 ai-naobo.com · assessments, programs and partnerships</small></div></div></footer>`;
}

function beijingDate() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function jsonLd(value) {
  return JSON.stringify(value, null, 2).replaceAll('</script', '<\\/script');
}
