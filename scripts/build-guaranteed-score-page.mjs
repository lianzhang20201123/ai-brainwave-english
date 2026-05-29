#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const date = beijingDate();
const site = 'https://ai-naobo.com';

const zhPath = path.join(root, 'topics', 'contract-score-improvement.html');
const enPath = path.join(root, 'en', 'topics', 'contract-score-improvement.html');

const shared = {
  zhTitle: '签合同保提分，有效果再付款：AI脑波英语如何把承诺变成交付流程',
  enTitle: 'Contract-based English score improvement: how AI Brainwave English turns promises into delivery',
  zhDesc: 'AI脑波英语“签合同保提分，有效果再付款”不是公开兜售固定分数，而是先测评、定目标、排课表、做训练、做检测和按约定验收。',
  enDesc: 'AI Brainwave English explains contract-based score improvement as an assessed, scheduled and measurable delivery process, not a one-size-fits-all promise.',
  zhKeywords: ['签合同保提分', '有效果再付款', '英语保提分', 'AI脑波英语', '学习舱'],
  enKeywords: ['contract based English score improvement', 'pay after effect English training', 'AI Brainwave English', 'learning cabin']
};

writeFile(zhPath, renderZh());
writeFile(enPath, renderEn());
updateSitemap();
insertHubCard('insights.html', '签合同保提分，有效果再付款', '把保提分讲成可测评、可排课、可训练、可检测、可验收的交付流程。', 'topics/contract-score-improvement.html');
insertHubCard(path.join('en', 'insights.html'), 'Contract-based score improvement', 'How AI Brainwave English turns a score promise into assessment, timetable, delivery and review.', 'topics/contract-score-improvement.html');

console.log(JSON.stringify({
  created: ['topics/contract-score-improvement.html', 'en/topics/contract-score-improvement.html'],
  sitemap: 'sitemap.xml',
  date
}, null, 2));

function renderZh() {
  const url = `${site}/topics/contract-score-improvement.html`;
  const enUrl = `${site}/en/topics/contract-score-improvement.html`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${shared.zhTitle}｜AI脑波英语</title>
  <meta name="description" content="${shared.zhDesc}">
  <meta name="keywords" content="${shared.zhKeywords.join(',')}">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="zh-CN" href="${url}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="stylesheet" href="../assets/css/style.css?v=contractscore">
  <script type="application/ld+json">${jsonLd(articleLd(shared.zhTitle, shared.zhDesc, url, 'AI脑波英语'))}</script>
  <script type="application/ld+json">${jsonLd(faqLd([
    ['AI脑波英语的保提分是不是人人最高提30分？', '不是。每个学生的承诺目标不同，必须先看基础、配合度、训练时间和考试周期。最高目标只适合起点较低、配合度高、训练周期足够的学生。'],
    ['“有效果再付款”的完整规则会公开吗？', '完整细节不作为公开页面宣传，通常在家长到店咨询、测评和签约沟通过程中说明。官网只解释原则和交付流程。'],
    ['学习舱是不是孩子躺着就能学会？', '不是。学习舱必须配合前测、进舱前读熟、舱内节律化输入、出舱检测、复现巩固和考试专项训练。'],
    ['目前有哪些学习舱落地？', '目前已规划或落地的学习舱包括长春6个、北京6个、石家庄4个、兰州6个，具体开放体验以当地校区安排为准。']
  ]))}</script>
</head>
<body>
${zhHeader()}
<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta"><span class="meta-pill">保提分协议</span><span class="meta-pill">家长测评</span><span class="meta-pill">${date}</span></div>
        <h1>签合同保提分，有效果再付款</h1>
        <p class="hero-note">这句话的重点不是“喊得狠”，而是把英语提分拆成入学测评、目标协议、学习舱训练、专项课程、阶段检测和结果验收。</p>
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">先测评，再承诺</div>
        <h3>不是每个孩子都承诺一样的分数</h3>
        <p>每个学生的基础、时间、配合度和目标不同。最高可承诺约30分，通常只适合起点较低、配合度高、训练周期足够的学生。</p>
        <a class="button button-primary" href="../contact.html">预约入学测评</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      <h2>一句话说明</h2>
      <p>AI脑波英语的“签合同保提分，有效果再付款”，不是把固定分数卖给所有学生，而是在测评后为适合的学生设定合理目标，并用训练记录、阶段检测和约定验收来交付。</p>
      <h2>第一步：入学测试要看清楚孩子卡在哪里</h2>
      <p>入学不是只问最近考了多少分。我们会看音标、自然拼读、词汇量、语法基础、听力辨音、阅读速度、写作输出和试卷失分点。只有知道孩子卡在哪里，才知道能不能承诺、承诺多少、怎么排课。</p>
      <ul>
        <li>音标和自然拼读：解决会不会读、能不能拼的问题。</li>
        <li>词汇量和遗忘率：判断孩子是不会背、背不住，还是不会用。</li>
        <li>语法、阅读、写作：判断词汇突破后如何转成分数。</li>
        <li>试卷分析：看失分集中在基础题、阅读题、作文还是时间分配。</li>
      </ul>
      <h2>第二步：承诺目标因人而异</h2>
      <p>保提分协议不能一刀切。起点低、配合度高、训练时间充足的学生，目标可以更积极；基础已经较高、距离考试很近、出勤不稳定的学生，目标就要更谨慎。最高承诺不等于人人适用。</p>
      <h2>第三步：训练路径必须完整</h2>
      <p>英语想提分，通常不能只靠刷题，也不能只靠学习舱。比较稳的顺序是：音标/自然拼读先补稳，词汇集中突破，再进入语法、听力、阅读、写作和刷卷复盘。</p>
      <ul>
        <li>进舱前：先读熟、跟读、纠音，确保孩子知道今天学什么。</li>
        <li>学习舱中：用节律化输入完成更低抗拒的词汇训练。</li>
        <li>出舱后：马上检测，记录掌握情况和遗忘点。</li>
        <li>专项课：把词汇带进语法、阅读、写作和套卷。</li>
      </ul>
      <h2>第四步：阶段验收比一句承诺更重要</h2>
      <p>家长真正需要看的不是一句口号，而是孩子每个阶段有没有变化：词汇是否能复现，阅读是否更顺，语法错题是否减少，作文是否有词有句，套卷分数是否稳定。</p>
      <h2>目前学习舱布局</h2>
      <p>目前 AI脑波英语已在长春、北京、石家庄、兰州等地推进学习舱体验与交付。其中长春6个舱，北京6个舱，石家庄4个舱，兰州6个舱。具体体验安排以当地校区实际开放为准。</p>
      <h2>关于合作样板</h2>
      <p>AI脑波英语已进入华图教育吉林长春总部校区开展合作推进。对外沟通可以说明合作事实，但仍应以实际样板验证、交付数据和家长反馈为基础，不把局部合作直接表述为全国复制结果。</p>
      <h2>常见问题</h2>
      <div class="faq">
        <details><summary>完整退费规则会在官网公开吗？</summary><p>不会在官网公开完整细节。官网只解释原则、流程和边界，具体规则在到店测评、咨询和签约沟通中说明。</p></details>
        <details><summary>训练3到5天就一定能成交吗？</summary><p>3到5天体验的目标是让家长看到检测变化和孩子适应度。转化率是内部目标，需要实际跑出数据后再对外表达。</p></details>
        <details><summary>真实案例可以宣传吗？</summary><p>可以做匿名化展示，例如遮挡面部、隐藏真实姓名和敏感信息。重要案例建议后续补充书面授权。</p></details>
      </div>
      <div class="article-cta">
        <h2>下一步</h2>
        <p>如果想知道孩子是否适合签保提分协议，建议先预约一次入学测评。先看基础，再定目标，再决定训练周期。</p>
        <div class="hero-actions small-actions"><a class="button button-primary" href="../contact.html">预约测评</a><a class="button button-secondary" href="../courses.html">查看课程体系</a></div>
      </div>
    </div>
  </section>
</main>
${zhFooter()}
<script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

function renderEn() {
  const url = `${site}/en/topics/contract-score-improvement.html`;
  const zhUrl = `${site}/topics/contract-score-improvement.html`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${shared.enTitle} | AI Brainwave English</title>
  <meta name="description" content="${shared.enDesc}">
  <meta name="keywords" content="${shared.enKeywords.join(',')}">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en" href="${url}">
  <link rel="alternate" hreflang="zh-CN" href="${zhUrl}">
  <link rel="alternate" hreflang="x-default" href="${url}">
  <link rel="stylesheet" href="../../assets/css/style.css?v=contractscore">
  <script type="application/ld+json">${jsonLd(articleLd(shared.enTitle, shared.enDesc, url, 'AI Brainwave English'))}</script>
  <script type="application/ld+json">${jsonLd(faqLd([
    ['Does AI Brainwave English promise the same score increase to every student?', 'No. The target depends on baseline, cooperation level, available training time and exam timeline. A higher target is suitable only for selected students after assessment.'],
    ['Are the full pay-after-effect details published online?', 'No. The website explains the principle and delivery workflow. Detailed terms are discussed during assessment and consultation.'],
    ['Is the learning cabin a sleep-and-learn method?', 'No. It is part of a structured process that includes assessment, preparation, guided input, exit testing, review and exam-specific practice.'],
    ['Where are learning cabins being developed?', 'Current learning cabin deployment includes Changchun, Beijing, Shijiazhuang and Lanzhou. Local availability depends on each center.']
  ]))}</script>
</head>
<body>
${enHeader()}
<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta"><span class="meta-pill">Contract-based model</span><span class="meta-pill">Assessment first</span><span class="meta-pill">${date}</span></div>
        <h1>Contract-based English score improvement</h1>
        <p class="hero-note">AI Brainwave English treats a score promise as a measurable delivery system: assessment, target setting, learning cabin input, exit testing, review and exam-specific training.</p>
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">Assessment before promise</div>
        <h3>No one-size-fits-all target</h3>
        <p>Each student needs a different target based on baseline, cooperation, training time and exam timeline.</p>
        <a class="button button-primary" href="../contact.html">Book an assessment</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      <h2>Short answer</h2>
      <p>Contract-based score improvement should not be a fixed promise sold to every learner. It should start with assessment, then define a realistic target, timetable, training path, stage tests and review criteria.</p>
      <h2>Step 1: assess the real learning gap</h2>
      <p>The process reviews pronunciation, phonics, vocabulary, grammar, listening, reading, writing and exam-paper loss points. This helps decide whether a student is suitable for a contract-based target.</p>
      <h2>Step 2: set a target student by student</h2>
      <p>Some students with a lower baseline, strong cooperation and enough training time may receive a more ambitious target. Students close to exams, with unstable attendance or already high scores need more cautious targets.</p>
      <h2>Step 3: deliver a complete training path</h2>
      <ul>
        <li>Before cabin: prepare pronunciation, reading and target vocabulary.</li>
        <li>During cabin: structured audio and vocabulary input in a low-resistance environment.</li>
        <li>After cabin: exit testing, records and review.</li>
        <li>Follow-up: grammar, listening, reading, writing and exam paper practice.</li>
      </ul>
      <h2>Learning cabin deployment</h2>
      <p>AI Brainwave English is developing learning cabin delivery in Changchun, Beijing, Shijiazhuang and Lanzhou. Current capacity includes 6 cabins in Changchun, 6 in Beijing, 4 in Shijiazhuang and 6 in Lanzhou, subject to local center availability.</p>
      <h2>Partnership note</h2>
      <p>AI Brainwave English has entered cooperation development with Huatu Education Jilin Changchun headquarters campus. Public communication should still be based on actual pilot progress, delivery data and parent feedback.</p>
      <h2>Frequently asked questions</h2>
      <div class="faq">
        <details><summary>Are detailed payment and refund terms published online?</summary><p>No. The website explains the workflow and boundaries. Detailed terms are discussed during assessment and consultation.</p></details>
        <details><summary>Can a 3 to 5 day experience guarantee conversion?</summary><p>The experience is designed to show assessment changes and student fit. Conversion rate should be treated as an internal target until real data is collected.</p></details>
        <details><summary>Can student cases be used publicly?</summary><p>Cases should be anonymized by hiding names, faces and sensitive information. Written authorization is recommended for important cases.</p></details>
      </div>
      <div class="article-cta">
        <h2>Next step</h2>
        <p>Book an assessment first. The score target should be decided only after reviewing the student’s baseline and training conditions.</p>
        <div class="hero-actions small-actions"><a class="button button-primary" href="../contact.html">Book assessment</a><a class="button button-secondary" href="../courses.html">View programs</a></div>
      </div>
    </div>
  </section>
</main>
${enFooter()}
<script src="../../assets/js/main.js"></script>
</body>
</html>
`;
}

function updateSitemap() {
  const sitemapPath = path.join(root, 'sitemap.xml');
  const urls = new Set();
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) urls.add(match[1]);
  }
  urls.add(`${site}/topics/contract-score-improvement.html`);
  urls.add(`${site}/en/topics/contract-score-improvement.html`);
  const body = [...urls].sort().map((url) => `  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>`).join('\n');
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

function insertHubCard(file, title, desc, href) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  const html = fs.readFileSync(full, 'utf8');
  if (html.includes(href)) return;
  const text = file.startsWith('en/') ? 'View topic hub →' : '查看专题 →';
  const card = `<article class="post-card news-card"><div class="meta"><span class="meta-pill">保提分</span><span class="meta-pill">${date}</span></div><h3>${esc(title)}</h3><p>${esc(desc)}</p><a class="link" href="${href}">${text}</a></article>`;
  const marker = '<div class="post-list news-post-list">';
  const idx = html.indexOf(marker);
  if (idx === -1) return;
  fs.writeFileSync(full, `${html.slice(0, idx + marker.length)}${card}${html.slice(idx + marker.length)}`);
}

function zhHeader() {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI脑波英语</div><div class="brand-sub">学习舱 · 保提分 · 词汇训练</div></div></a><nav class="nav"><a href="../index.html">首页</a><a href="../courses.html">课程体系</a><a href="../cases.html">案例与合作</a><a href="../partner.html">机构合作</a><a href="../insights.html" class="active">AI英语百科</a><a href="../contact.html">预约体验</a></nav></div></header>`;
}

function enHeader() {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html"><div class="brand-mark">AI</div><div><div class="brand-title">AI Brainwave English</div><div class="brand-sub">Learning cabin · Score improvement</div></div></a><nav class="nav"><a href="../index.html">Home</a><a href="../courses.html">Programs</a><a href="../cases.html">Results</a><a href="../partner.html">Partnerships</a><a href="../insights.html" class="active">Insights</a><a href="../contact.html">Contact</a></nav></div></header>`;
}

function zhFooter() {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="footer-links"><a href="../index.html">首页</a><a href="../courses.html">课程体系</a><a href="../partner.html">机构合作</a><a href="../insights.html">AI英语百科</a><a href="../contact.html">联系我们</a></div><small>© 2026 ai-naobo.com · 课程咨询、测评预约、学校合作与机构合作</small></div></div></footer>`;
}

function enFooter() {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="footer-links"><a href="../index.html">Home</a><a href="../courses.html">Programs</a><a href="../partner.html">Partnerships</a><a href="../insights.html">Insights</a><a href="../contact.html">Contact</a></div><small>© 2026 ai-naobo.com · assessments, programs and partnerships</small></div></div></footer>`;
}

function articleLd(title, description, url, orgName) {
  return {
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
}

function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
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
