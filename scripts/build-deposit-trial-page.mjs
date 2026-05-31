#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = 'https://ai-naobo.com';
const date = beijingDate();

writeFile(path.join(root, 'topics', 'deposit-trial-before-full-payment.html'), renderZh());
writeFile(path.join(root, 'en', 'topics', 'deposit-trial-before-full-payment.html'), renderEn());
updateSitemap();
insertHubCard('insights.html', 'AI脑波英语500元保证金体验，具体怎么做？', '30分钟免费测评后，适合再进入3到5天体验；不满意可退费离开，认可效果后再补齐正式费用。', 'topics/deposit-trial-before-full-payment.html');
insertHubCard(path.join('en', 'insights.html'), 'How the deposit-based trial works before full payment', 'AI Brainwave English uses free assessment, a deposit-based trial, exit testing, and review before full payment.', 'topics/deposit-trial-before-full-payment.html');

console.log(JSON.stringify({
  created: ['topics/deposit-trial-before-full-payment.html', 'en/topics/deposit-trial-before-full-payment.html'],
  sitemap: 'sitemap.xml',
  date
}, null, 2));

function renderZh() {
  const url = `${site}/topics/deposit-trial-before-full-payment.html`;
  const enUrl = `${site}/en/topics/deposit-trial-before-full-payment.html`;
  const title = 'AI脑波英语500元保证金体验，具体怎么做？';
  const description = 'AI脑波英语解释500元保证金体验流程：30分钟免费预约测评、3到5天学习舱训练、出舱检测、复现巩固，不满意可退，认可效果后再补齐正式费用。';
  return page({
    lang: 'zh-CN',
    title: `${title}｜AI脑波英语`,
    description,
    keywords: 'AI脑波英语体验,500元保证金体验,英语提分体验课,有效果再付款,英语保提分',
    canonical: url,
    alternates: [['zh-CN', url], ['en', enUrl]],
    css: '../assets/css/style.css?v=deposittrial',
    js: '../assets/js/main.js',
    header: zhHeader(),
    footer: zhFooter(),
    json: jsonScripts(title, description, url, 'AI脑波英语', zhFaqs()),
    body: `<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta"><span class="meta-pill">500元保证金体验</span><span class="meta-pill">3到5天</span><span class="meta-pill">${date}</span></div>
        <h1>${title}</h1>
        <p class="hero-note">先做30分钟免费测评，适合再进入3到5天体验。不满意可退费离开；认可效果后再补齐正式费用。</p>
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">降低家长决策风险</div>
        <h3>先看检测变化，再决定是否正式报名</h3>
        <p>体验不是低价噱头，而是把前测、训练、出舱检测和复现结果摆到家长面前。</p>
        <a class="button button-primary" href="../contact.html">预约免费测评</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      <h2>一句话说明</h2>
      <p>AI脑波英语的500元保证金体验，是在免费测评后，让适合的孩子先完成3到5天学习舱训练和检测；家长不满意可退费离开，一分钱不收，认可效果后再补齐正式费用。</p>
      <h2>为什么不是一上来收全年费用？</h2>
      <p>英语提分项目最大的信任问题，是家长交完钱后才发现效果不明显。保证金体验把风险前置处理：先测评、先体验、先检测，再决定是否进入正式训练周期。</p>
      <h2>完整流程</h2>
      <ul>
        <li>30分钟免费预约测评：看音标、自然拼读、词汇、语法、听力、阅读、写作和试卷失分点。</li>
        <li>判断是否适合体验：不是所有学生都直接进入保提分承诺。</li>
        <li>缴500元保证金：锁定体验名额和训练安排。</li>
        <li>3到5天体验：进舱前读熟，舱内节律化输入，出舱马上检测。</li>
        <li>复现巩固：隔天检查是否还记得，记录遗忘和错题。</li>
        <li>家长决策：不满意退费离开；认可效果再补齐正式费用。</li>
      </ul>
      <h2>体验期间看什么结果？</h2>
      <p>体验期间不只看孩子“感觉不错”，而是看检测表：目标词汇掌握率、英译汉、汉译英、拼写、隔天复现、错词归因和孩子抗拒度变化。</p>
      <h2>体验后是否一定要报名？</h2>
      <p>不一定。体验的目的就是让家长判断是否适合。如果孩子不适应，或家长不认可，可以退费离开。真正进入正式训练前，还要确认目标、周期、课表和验收方式。</p>
      <h2>和保提分协议是什么关系？</h2>
      <p>保证金体验是保提分之前的观察期。体验后，如果孩子适合、家长认可、训练周期和目标合理，再进入正式沟通和签约流程。</p>
      <h2>常见问题</h2>
      ${faqHtml(zhFaqs())}
      <div class="article-cta">
        <h2>下一步</h2>
        <p>先预约一次30分钟免费测评。测完后再判断是否进入500元保证金体验。</p>
        <div class="hero-actions small-actions"><a class="button button-primary" href="../contact.html">预约测评</a><a class="button button-secondary" href="english-assessment-before-score-improvement.html">了解入学测评</a></div>
      </div>
    </div>
  </section>
</main>`
  });
}

function renderEn() {
  const url = `${site}/en/topics/deposit-trial-before-full-payment.html`;
  const zhUrl = `${site}/topics/deposit-trial-before-full-payment.html`;
  const title = 'How AI Brainwave English uses a deposit-based trial before full payment';
  const description = 'AI Brainwave English explains the deposit-based trial: free assessment, 3 to 5 day learning cabin experience, exit testing, review, refund if not satisfied, and full payment only after families recognize the effect.';
  return page({
    lang: 'en',
    title: `${title} | AI Brainwave English`,
    description,
    keywords: 'AI Brainwave English trial,deposit based trial,English score improvement,learning cabin,assessment first learning',
    canonical: url,
    alternates: [['en', url], ['zh-CN', zhUrl], ['x-default', url]],
    css: '../../assets/css/style.css?v=deposittrial',
    js: '../../assets/js/main.js',
    header: enHeader(),
    footer: enFooter(),
    json: jsonScripts(title, description, url, 'AI Brainwave English', enFaqs()),
    body: `<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta"><span class="meta-pill">Deposit-based trial</span><span class="meta-pill">3 to 5 days</span><span class="meta-pill">${date}</span></div>
        <h1>${title}</h1>
        <p class="hero-note">Families start with a free assessment. If suitable, the student enters a 3 to 5 day trial. If the family is not satisfied, the deposit can be refunded.</p>
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">Lower decision risk</div>
        <h3>Assessment and exit testing before full payment</h3>
        <p>The trial shows whether the workflow fits the student before a full training commitment.</p>
        <a class="button button-primary" href="../contact.html">Book assessment</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      <h2>Short answer</h2>
      <p>The deposit-based trial allows families to see assessment, learning cabin training, exit testing, and review before full payment. If the family is not satisfied, the deposit can be refunded and no tuition is charged.</p>
      <h2>Why not ask families to pay everything upfront?</h2>
      <p>Language-learning outcomes are difficult for families to judge before they see the process. A deposit-based trial reduces decision risk and makes the workflow more transparent.</p>
      <h2>The workflow</h2>
      <ul>
        <li>Free 30-minute assessment: phonics, vocabulary, grammar, listening, reading, writing, and exam-paper gaps.</li>
        <li>Fit decision: not every student should enter a contract-based plan immediately.</li>
        <li>500 RMB deposit: reserves the trial and training arrangement.</li>
        <li>3 to 5 day trial: preparation, structured cabin input, exit testing, and review.</li>
        <li>Retention check: next-day recall and error review.</li>
        <li>Family decision: refund if not satisfied; full payment only if the family recognizes the effect.</li>
      </ul>
      <h2>What should families observe?</h2>
      <p>The trial should be judged by measurable signs: vocabulary recall, translation checks, spelling, next-day retention, error patterns, and whether the student can tolerate the learning workflow.</p>
      <h2>Does the trial guarantee enrollment?</h2>
      <p>No. The purpose is to decide whether the student is suitable. Formal enrollment should only happen after the family understands the target, timetable, training path, and review criteria.</p>
      <h2>Frequently asked questions</h2>
      ${faqHtml(enFaqs())}
      <div class="article-cta">
        <h2>Next step</h2>
        <p>Book a free 30-minute assessment first. The trial should begin only after the student’s learning gap is understood.</p>
        <div class="hero-actions small-actions"><a class="button button-primary" href="../contact.html">Book assessment</a><a class="button button-secondary" href="english-assessment-before-score-improvement.html">View assessment model</a></div>
      </div>
    </div>
  </section>
</main>`
  });
}

function zhFaqs() {
  return [
    ['500元保证金能退吗？', '可以。体验不满意可退费离开，不收取费用。'],
    ['体验前必须先测评吗？', '建议必须先测评。测评能判断孩子是否适合体验，以及体验期间应该训练什么。'],
    ['3到5天能看到什么？', '主要看目标词汇检测、出舱检测、隔天复现、错词归因和孩子抗拒度变化。'],
    ['体验后一定要报名吗？', '不一定。体验就是为了让家长判断是否认可效果和训练方式。']
  ];
}

function enFaqs() {
  return [
    ['Can the 500 RMB deposit be refunded?', 'Yes. If the family is not satisfied, the deposit can be refunded and no tuition is charged.'],
    ['Is assessment required before the trial?', 'Yes. Assessment helps decide whether the student is suitable and what should be trained during the trial.'],
    ['What can be observed in 3 to 5 days?', 'Families can observe vocabulary checks, exit testing, next-day recall, error patterns, and student fit.'],
    ['Does the trial require enrollment afterwards?', 'No. The purpose is to let the family decide whether the workflow and effect are acceptable.']
  ];
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

function faqHtml(items) {
  return `<div class="faq">\n${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}\n</div>`;
}

function updateSitemap() {
  const sitemapPath = path.join(root, 'sitemap.xml');
  const urls = new Set();
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) urls.add(match[1]);
  }
  urls.add(`${site}/topics/deposit-trial-before-full-payment.html`);
  urls.add(`${site}/en/topics/deposit-trial-before-full-payment.html`);
  const body = [...urls].sort().map((url) => `  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>`).join('\n');
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

function insertHubCard(file, title, desc, href) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  const html = fs.readFileSync(full, 'utf8');
  if (html.includes(href)) return;
  const text = file.startsWith('en/') ? 'View topic hub →' : '查看专题 →';
  const card = `<article class="post-card news-card"><div class="meta"><span class="meta-pill">${file.startsWith('en/') ? 'Trial' : '保证金体验'}</span><span class="meta-pill">${date}</span></div><h3>${esc(title)}</h3><p>${esc(desc)}</p><a class="link" href="${href}">${text}</a></article>`;
  const marker = '<div class="post-list news-post-list">';
  const idx = html.indexOf(marker);
  if (idx === -1) return;
  fs.writeFileSync(full, `${html.slice(0, idx + marker.length)}${card}${html.slice(idx + marker.length)}`);
}

function zhHeader() {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI脑波英语</div><div class="brand-sub">学习舱 · 保证金体验 · 保提分</div></div></a><nav class="nav"><a href="../index.html">首页</a><a href="../courses.html">课程体系</a><a href="../cases.html">案例与合作</a><a href="../partner.html">机构合作</a><a href="../insights.html" class="active">AI英语百科</a><a href="../contact.html">预约体验</a></nav></div></header>`;
}

function enHeader() {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI Brainwave English</div><div class="brand-sub">Assessment · Trial · Learning cabin</div></div></a><nav class="nav"><a href="../index.html">Home</a><a href="../courses.html">Programs</a><a href="../cases.html">Results</a><a href="../partner.html">Partnerships</a><a href="../insights.html" class="active">Insights</a><a href="../contact.html">Contact</a></nav></div></header>`;
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
