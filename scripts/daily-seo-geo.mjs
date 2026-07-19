#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = 'https://ai-naobo.com';
const today = process.env.CONTENT_DATE || beijingDate();
const forceRegenerate = process.env.FORCE_REGENERATE === '1';
const seed = daysSince('2026-05-29', today);

const imageCatalog = {
  parent: {
    src: 'assets/images/home-cabin-students-mobile.jpg',
    altZh: '学生在AI脑波英语学习舱中进行词汇训练',
    altEn: 'A student training vocabulary inside the AI Brainwave English learning cabin',
    captionZh: '真实训练场景：先测评，再进舱训练，出舱后立即检测和复现。',
    captionEn: 'Real training context: assessment first, cabin training, then exit testing and recall review.'
  },
  method: {
    src: 'assets/images/home-coach-cabin-mobile.jpg',
    altZh: 'AI脑波英语教练陪同学生完成学习舱训练',
    altEn: 'AI Brainwave English coach supporting a learner during cabin training',
    captionZh: '学习舱不是单独存在的设备，关键在进舱前读熟、出舱检测和教练复盘。',
    captionEn: 'The cabin works as part of a managed process: preparation, guided input, exit test and review.'
  },
  exam: {
    src: 'assets/images/students-room-optimized.jpg',
    altZh: 'AI脑波英语学生学习区和训练环境',
    altEn: 'Student learning area and training environment for AI Brainwave English',
    captionZh: '考试提分要把词汇、语法、听力、阅读、写作和刷卷复盘连起来。',
    captionEn: 'Exam improvement connects vocabulary, grammar, listening, reading, writing and paper review.'
  },
  institution: {
    src: 'assets/images/poster-wide-class.jpg',
    altZh: 'AI脑波英语校区合作与体验课现场',
    altEn: 'AI Brainwave English campus cooperation and trial-class context',
    captionZh: '机构合作先验证测评、体验、家长沟通和交付记录，再谈复制。',
    captionEn: 'Partnership pilots should validate assessment, experience, parent communication and delivery records.'
  },
  global: {
    src: 'assets/images/brand-building.jpg',
    altZh: 'AI脑波英语品牌与海外合作沟通场景',
    altEn: 'AI Brainwave English brand and global partnership communication',
    captionZh: '面向全球合作，先把训练流程、交付标准和验证路径讲清楚。',
    captionEn: 'For global partners, the priority is a clear process, delivery standard and validation path.'
  },
  faq: {
    src: 'assets/images/material-grid.jpg',
    altZh: 'AI脑波英语课程资料与家长沟通物料',
    altEn: 'AI Brainwave English course materials and parent communication assets',
    captionZh: '家长真正需要的是可理解、可检测、可复盘的训练说明。',
    captionEn: 'Parents need a training explanation that is understandable, measurable and reviewable.'
  }
};

const topics = [
  {
    lane: 'parent',
    slug: 'middle-school-english-vocabulary-before-grammar',
    zhTitle: '初中英语低分，为什么很多孩子要先补词汇再补语法？',
    enTitle: 'Why vocabulary often comes before grammar for middle school English learners',
    zhKeyword: '初中英语低分 先补词汇还是语法',
    enKeyword: 'middle school English vocabulary before grammar',
    audience: '初中家长',
    cta: '预约一次入学测评，先看孩子卡在音标、词汇、语法还是做题习惯。'
  },
  {
    lane: 'method',
    slug: 'phonics-pronunciation-vocabulary-training-path',
    zhTitle: '音标、自然拼读和词汇训练，应该怎么衔接？',
    enTitle: 'How phonics, pronunciation and vocabulary training should work together',
    zhKeyword: '音标 自然拼读 词汇训练',
    enKeyword: 'phonics pronunciation vocabulary training',
    audience: '小学高年级、初高中家长',
    cta: '如果孩子会背但不会读、会认但不会用，建议先做音标和词汇底座测评。'
  },
  {
    lane: 'exam',
    slug: 'zhongkao-english-score-improvement-workflow',
    zhTitle: '中考英语提分，词汇、语法、阅读和刷卷怎么安排？',
    enTitle: 'A practical workflow for improving Zhongkao English scores',
    zhKeyword: '中考英语提分 词汇 语法 阅读 刷卷',
    enKeyword: 'Zhongkao English score improvement workflow',
    audience: '中考学生家长',
    cta: '中考阶段不要只刷题，先用测评找出最该补的底层短板。'
  },
  {
    lane: 'institution',
    slug: 'education-center-ai-english-cabin-pilot',
    zhTitle: '教育机构引入AI英语学习舱，第一阶段应该验证什么？',
    enTitle: 'What education centers should validate in an AI English learning cabin pilot',
    zhKeyword: '教育机构 AI英语学习舱 合作',
    enKeyword: 'AI English learning cabin education center partnership',
    audience: '教培机构和学习中心负责人',
    cta: '机构合作建议从小规模体验和标准交付表开始，而不是一上来就追求大规模复制。'
  },
  {
    lane: 'global',
    slug: 'ai-english-learning-cabin-for-global-partners',
    zhTitle: '海外教育伙伴如何理解AI英语学习舱？',
    enTitle: 'What global partners should know about AI English learning cabins',
    zhKeyword: 'AI英语学习舱 海外合作',
    enKeyword: 'AI English learning cabin global partnership',
    audience: '海外教育机构、投资人与合作伙伴',
    cta: '海外合作可以从中文学生、华人家庭和本地英语补强需求三个场景开始验证。'
  },
  {
    lane: 'parent',
    slug: 'child-remembers-words-but-cannot-use-them',
    zhTitle: '孩子单词背过了，为什么听力阅读写作还是上不去？',
    enTitle: 'Why students may remember words but still struggle with listening, reading and writing',
    zhKeyword: '单词背过了 听力阅读写作上不去',
    enKeyword: 'remember vocabulary but cannot use in listening reading writing',
    audience: '初高中家长',
    cta: '词汇训练结束后，要把单词转入句子、篇章和试卷场景，才可能变成分数。'
  },
  {
    lane: 'faq',
    slug: 'guaranteed-score-improvement-contract-explained',
    zhTitle: '英语训练目标怎样落到可检测的课表？',
    enTitle: 'How to turn an English training goal into a measurable timetable',
    zhKeyword: '英语训练目标 课表 阶段检测',
    enKeyword: 'English training goal measurable timetable',
    audience: '准备咨询的家长',
    cta: '进入完整训练周期前，先确认基线、目标、课表、出勤条件和阶段检测方式。'
  },
  {
    lane: 'method',
    slug: 'learning-cabin-exit-test-and-review',
    zhTitle: '学习舱训练后，为什么必须做出舱检测和复现巩固？',
    enTitle: 'Why exit tests and review matter after learning cabin sessions',
    zhKeyword: '学习舱 出舱检测 复现巩固',
    enKeyword: 'learning cabin exit test review',
    audience: '体验学习舱的家长',
    cta: '一次训练是否有效，不看感觉，要看出舱检测、隔天复现和阶段测评。'
  },
  {
    lane: 'exam',
    slug: 'gaokao-english-3500-words-to-reading',
    zhTitle: '高考3500词怎么从“背过”变成“阅读能用”？',
    enTitle: 'How Gaokao 3500 vocabulary can become usable reading ability',
    zhKeyword: '高考3500词 阅读理解',
    enKeyword: 'Gaokao 3500 words reading comprehension',
    audience: '高中家长',
    cta: '高中词汇不能只按单词表过，要进入长难句、阅读篇章和错题复盘。'
  },
  {
    lane: 'institution',
    slug: 'english-program-add-on-for-learning-centers',
    zhTitle: '学习中心做英语增项，为什么要先做9.9元3次课体验验证？',
    enTitle: 'Why learning centers should validate an English add-on with a three-session trial',
    zhKeyword: '学习中心 英语增项 体验转化',
    enKeyword: 'English add-on program learning center experience conversion',
    audience: '校区负责人',
    cta: 'AI脑波英语机构合作更适合先验证测评、体验、家长沟通和交付复盘四件事。'
  },
  {
    lane: 'global',
    slug: 'china-edtech-ai-vocabulary-training-investor-note',
    zhTitle: '从投资人视角看，AI英语词汇训练为什么值得关注？',
    enTitle: 'Why AI vocabulary training in China may interest education investors',
    zhKeyword: 'AI英语 词汇训练 投资 教育科技',
    enKeyword: 'AI vocabulary training China EdTech investment',
    audience: '投资人与产业伙伴',
    cta: '投资沟通应关注验证路径、单店模型、交付标准和合规表达，而不是只看概念。'
  },
  {
    lane: 'parent',
    slug: 'high-school-english-stuck-at-90',
    zhTitle: '高中英语卡在90分左右，通常不是只差刷题',
    enTitle: 'When high school English is stuck around 90, more practice papers may not be enough',
    zhKeyword: '高中英语90分 提分',
    enKeyword: 'high school English stuck around 90 score improvement',
    audience: '高中家长',
    cta: '先拆分词汇、语法、阅读速度、写作和试卷策略，再决定训练重点。'
  },
  {
    lane: 'method',
    slug: 'from-vocabulary-to-writing-output',
    zhTitle: '词汇突破后，如何真正转化到英语写作？',
    enTitle: 'How vocabulary breakthrough can translate into English writing output',
    zhKeyword: '词汇突破 英语写作',
    enKeyword: 'vocabulary training English writing output',
    audience: '想提升写作的学生家长',
    cta: '写作提升需要词块、句型、范文仿写和批改复盘，不能只靠背单词。'
  },
  {
    lane: 'faq',
    slug: 'who-is-not-suitable-for-ai-brainwave-english',
    zhTitle: '哪些孩子暂时不适合直接进入AI脑波英语完整训练周期？',
    enTitle: 'Who may not be ready for a score-improvement program with AI Brainwave English',
    zhKeyword: 'AI脑波英语 适合人群 不适合',
    enKeyword: 'who is suitable for AI Brainwave English',
    audience: '谨慎决策的家长',
    cta: '不确定是否适合时，先测评，不建议直接按承诺目标签约。'
  }
];

const dailyTopics = pickDailyTopics(seed);
const published = [];

for (const topic of dailyTopics) {
  const datedSlug = `${today}-${topic.slug}`;
  const zhPath = path.join(root, 'news', `${datedSlug}.html`);
  const enPath = path.join(root, 'en', 'news', `${datedSlug}.html`);

  const alreadyExists = fs.existsSync(zhPath) || fs.existsSync(enPath);
  if (alreadyExists && !forceRegenerate) {
    published.push({ slug: datedSlug, skipped: true });
    continue;
  }

  const spec = buildSpec(topic, datedSlug, today);
  writeJson(path.join(root, 'content-specs', `${datedSlug}.json`), spec);
  writeFile(zhPath, renderZh(spec));
  writeFile(enPath, renderEn(spec));
  updateSitemap(spec);
  if (!alreadyExists) {
    prependHubLink('insights.html', spec.zh.title, spec.zh.description, `news/${spec.slug}.html`, topic.lane);
    prependHubLink(path.join('en', 'insights.html'), spec.en.title, spec.en.description, `news/${spec.slug}.html`, topic.lane);
  }
  published.push({
    slug: spec.slug,
    lane: topic.lane,
    created: [`news/${spec.slug}.html`, `en/news/${spec.slug}.html`],
    keywords: [topic.zhKeyword, topic.enKeyword]
  });
}

console.log(JSON.stringify({
  date: today,
  quota: '3 bilingual topic pairs per day',
  published
}, null, 2));

function pickDailyTopics(offset) {
  const groups = [
    ['parent', 'method', 'exam'],
    ['parent', 'institution', 'global'],
    ['method', 'exam', 'faq'],
    ['parent', 'institution', 'faq'],
    ['exam', 'global', 'method'],
    ['parent', 'exam', 'institution'],
    ['method', 'global', 'faq']
  ];
  const lanes = groups[((offset % groups.length) + groups.length) % groups.length];
  const used = new Set();
  return lanes.map((lane, index) => {
    const pool = topics.filter((topic) => topic.lane === lane && !used.has(topic.slug));
    const topic = pool[Math.abs(offset + index * 3) % pool.length];
    used.add(topic.slug);
    return topic;
  });
}

function buildSpec(t, slug, date) {
  return {
    slug,
    date,
    image: imageForTopic(t),
    zh: {
      title: t.zhTitle,
      description: `${t.zhTitle} AI脑波英语用前测、音标/自然拼读、词汇集中训练、语法专项、听力阅读写作和刷卷复盘，帮助${t.audience}看清可执行路径。`,
      keywords: [t.zhKeyword, 'AI脑波英语', '非侵入式脑机学习舱', '阶段检测'],
      tags: tagSet(t.lane, 'zh'),
      lead: shortAnswerZh(t),
      sections: zhSections(t),
      faqs: zhFaqs(t),
      cta: t.cta
    },
    en: {
      title: t.enTitle,
      description: `${t.enTitle}. AI Brainwave English explains assessment, phonics, vocabulary training, grammar, listening, reading, writing and exam review for parents and partners.`,
      keywords: [t.enKeyword, 'AI Brainwave English', 'English learning cabin', 'vocabulary training'],
      tags: tagSet(t.lane, 'en'),
      lead: shortAnswerEn(t),
      sections: enSections(t),
      faqs: enFaqs(t),
      cta: englishCta(t)
    }
  };
}

function shortAnswerZh(t) {
  const map = {
    parent: `简短答案：${t.zhKeyword}这个问题不能只靠多背或多刷题解决。AI脑波英语会先做入学测评，判断孩子卡在音标、词汇、语法、听力、阅读、写作还是试卷策略，再安排学习舱和课后训练。`,
    method: `简短答案：有效的英语训练要有顺序。AI脑波英语通常先看音标和自然拼读，再做词汇集中输入，随后进入语法、听力、阅读、写作和刷卷复盘。`,
    exam: `简短答案：考试提分不是单点动作，而是一套路径。先明确基础和目标分，再把词汇、语法、阅读、写作、听力和试卷错题排进课表。`,
    institution: `简短答案：机构引入学习舱，第一阶段不应只看设备，而要验证测评、体验、家长沟通、交付记录和阶段效果。`,
    global: `简短答案：AI英语学习舱适合被理解为一套有测评、有输入、有检测、有复习的英语训练系统，而不是神秘化工具。`,
    faq: `简短答案：是否进入完整训练周期，应先看测评基线、目标、时间、出勤条件和学生适应情况，不做未经验证的结果承诺。`
  };
  return map[t.lane] || map.parent;
}

function shortAnswerEn(t) {
  const map = {
    parent: `Short answer: this problem is rarely solved by asking the child to memorize more words. AI Brainwave English starts with assessment, then separates phonics, vocabulary, grammar, listening, reading, writing and exam practice.`,
    method: `Short answer: the training sequence matters. A practical path starts with pronunciation and phonics, builds vocabulary, then moves into grammar, listening, reading, writing and paper review.`,
    exam: `Short answer: score improvement needs a measurable plan. The student's baseline, target score, timetable and acceptance criteria should be defined before training begins.`,
    institution: `Short answer: an education center should validate the operating model before scaling. The pilot should test assessment, parent communication, delivery records and stage results.`,
    global: `Short answer: an AI English learning cabin is best understood as a structured training environment with assessment, guided input, exit tests and review, not as a magic shortcut.`,
    faq: `Short answer: any score-improvement promise should be tied to assessment, contract terms, target setting, attendance, training records and measurable review.`
  };
  return map[t.lane] || map.parent;
}

function zhSections(t) {
  return [
    {
      h2: '先把孩子的英语基础拆开看',
      paragraphs: [
        `很多家长看到${t.zhKeyword}，第一反应是继续报班、继续背单词、继续刷卷。但真正影响分数的，往往不是一个点，而是音标、自然拼读、词汇量、语法结构、阅读速度、听力辨音、写作输出和考试习惯共同作用。`,
        'AI脑波英语的第一步不是直接承诺结果，而是用入学测试看清孩子的基础：单词会不会读，读音能不能对应拼写，词汇是会认还是会用，语法题错在哪里，阅读卡在词汇还是长难句，作文是没词还是没句型。'
      ],
      bullets: ['音标和自然拼读：解决会不会读、能不能拼的问题。', '词汇：解决认识、听懂、读懂和复现的问题。', '语法和句子：解决看懂结构、写出句子的能力。', '专项和刷卷：解决分数转化和考试稳定性。']
    },
    {
      h2: '为什么训练顺序不能乱？',
      paragraphs: [
        '如果孩子音标薄弱，直接背大量单词会很吃力；如果词汇不够，语法和阅读会处处卡住；如果只做学习舱输入，不做出舱检测和复现，家长也很难判断效果是否真实。训练顺序清楚，老师、学生和家长才知道每天在解决什么问题。',
        '比较稳的路径是：先补音标和自然拼读，再做词汇集中突破，然后把词汇带入语法、听力、阅读、写作和试卷。学习舱主要承担高频输入和记忆效率提升，课后老师要负责读熟、检测、纠错、复现和题型迁移。'
      ],
      bullets: ['进舱前：读熟材料，确认孩子知道今天学什么。', '学习舱中：做节律化输入，不把它说成“睡一觉就会”。', '出舱后：马上检测，记录掌握和遗忘。', '后续课：进入语法、阅读、写作和刷卷场景。']
    },
    {
      h2: '训练目标要落实到课表和阶段检测',
      paragraphs: [
        '训练目标应对应清楚的前测基线、训练周期、出勤要求、家庭配合和阶段检测。公开页面不承诺所有学生都达到相同结果，具体服务以测评和正式协议为准。',
        '对于初高中学生，课表通常要把词汇训练和考试专项结合起来。比如前期集中处理音标和词汇，中期补语法、听力、阅读和写作，后期做套卷、错题、限时训练和考前策略。每个阶段都要留记录。'
      ],
      bullets: ['入学测：确定当前分数和具体短板。', '目标设定：按学生基础和时间确定合理目标。', '阶段复测：看是否达到约定进度。', '风险处理：缺勤、抗拒、目标过高时及时调整。']
    },
    {
      h2: '哪些情况要谨慎承诺？',
      paragraphs: [
        '如果学生基础极弱、距离考试太近、出勤无法保证、家庭完全不配合，或者目标分数明显超过当前条件，校区就不应该轻易签高目标承诺。AI脑波英语可以提升训练效率，但不能替代学生参与、老师跟进和阶段复盘。',
        '更健康的沟通方式，是先做测评，再通过9.9元3次课体验观察孩子是否适应学习舱和检测节奏，最后决定是否进入完整训练周期。'
      ],
      bullets: ['不夸大效果，不编造案例。', '不把学习舱包装成医疗或玄学概念。', '不承诺未经验证的全国复制结果。', '合作案例只表达已开展试点、体验或样板验证。']
    }
  ];
}

function enSections(t) {
  return [
    {
      h2: 'Start by separating the student’s English foundation',
      paragraphs: [
        'Many English problems look like a single issue, but the real causes are often mixed: pronunciation, phonics, vocabulary size, grammar, reading speed, listening recognition, writing output and exam habits.',
        'AI Brainwave English starts with assessment. The goal is to understand whether the student can pronounce words, connect sound with spelling, recognize and use vocabulary, understand sentence structure and transfer learning into exam tasks.'
      ],
      bullets: ['Phonics and pronunciation: can the student read and spell correctly?', 'Vocabulary: can the student recognize, hear, read and recall the words?', 'Grammar and sentences: can the student understand and produce structure?', 'Exam practice: can the learning become stable scores?']
    },
    {
      h2: 'Why the training sequence matters',
      paragraphs: [
        'If phonics is weak, heavy vocabulary memorization becomes painful. If vocabulary is weak, grammar and reading remain blocked. If learning cabin input has no exit test or review, parents cannot judge whether the effect is real.',
        'A practical sequence is pronunciation and phonics first, vocabulary breakthrough second, then grammar, listening, reading, writing and paper review. The learning cabin supports repeated input, while teachers manage preparation, testing, correction and transfer.'
      ],
      bullets: ['Before cabin: prepare the material and pronunciation.', 'During cabin: structured input, not a magical sleep claim.', 'After cabin: immediate exit testing and records.', 'Follow-up: grammar, reading, writing and exam tasks.']
    },
    {
      h2: 'A score-improvement promise needs timetable and evidence',
      paragraphs: [
        'A contract-based promise should not be only a slogan. It should be connected with baseline score, target score, training period, attendance rules, family cooperation, stage tests and refund or remediation terms.',
        'For secondary school students, the timetable should combine vocabulary work with exam-specific tasks. Early sessions may focus on phonics and vocabulary, while later sessions move into grammar, listening, reading, writing, timed papers and error review.'
      ],
      bullets: ['Baseline assessment: identify the real gap.', 'Target setting: define a reasonable score target.', 'Stage review: check progress against the plan.', 'Risk handling: adjust when attendance, motivation or target setting becomes unrealistic.']
    },
    {
      h2: 'When should the program be cautious?',
      paragraphs: [
        'The program should be cautious when the foundation is extremely weak, the exam is too close, attendance is unstable, family support is missing or the requested target is unrealistic.',
        'A healthier approach is to start with assessment and a short experience period, then decide whether a full training cycle is suitable.'
      ],
      bullets: ['Do not exaggerate outcomes.', 'Do not describe the learning cabin as medical or mystical.', 'Do not invent national rollout claims.', 'Mention cooperation pilots only with careful wording.']
    }
  ];
}

function zhFaqs(t) {
  return [
    { q: 'AI脑波英语是不是让孩子躺着就能学会？', a: '不是。学习舱只是训练系统的一部分，必须配合前测、进舱前读熟、出舱检测、复现巩固和老师专项训练。' },
    { q: '为什么要先做音标和词汇？', a: '音标和自然拼读影响孩子能不能读、能不能记；词汇底座影响听力、阅读、语法和写作能不能继续推进。' },
    { q: '能不能不测评就直接进入完整训练周期？', a: '不建议。应先做入学测评，根据基础、目标、时间、出勤条件和体验记录制定方案。' },
    { q: '训练后怎么判断有没有效果？', a: '看出舱检测、隔天复现、阶段测试和试卷题型迁移，而不是只看孩子当时感觉。' },
    { q: '机构合作能不能全国快速复制？', a: '机构合作需要校区场地、人员、招生、交付和家长沟通共同验证。对外可以说已进入部分校区合作或试点，但不能夸大为全国成功复制。' }
  ];
}

function enFaqs(t) {
  return [
    { q: 'Is AI Brainwave English a sleep-and-learn method?', a: 'No. The learning cabin is only one part of the system. It must be combined with assessment, preparation, exit testing, review and teacher-led practice.' },
    { q: 'Why start with phonics and vocabulary?', a: 'Pronunciation and phonics affect reading and memory. Vocabulary supports listening, reading, grammar, writing and exam performance.' },
    { q: 'Can a score-improvement contract be signed immediately?', a: 'It should start with assessment. The target should depend on baseline, timeline, attendance and training conditions.' },
    { q: 'How can parents judge whether it works?', a: 'Look at exit tests, next-day recall, stage tests and transfer into exam tasks, not only the student’s immediate feeling.' },
    { q: 'Can the partnership model be scaled nationally at once?', a: 'Scaling requires local validation of space, staff, enrollment, delivery and parent communication. Public wording should remain careful.' }
  ];
}

function renderZh(spec) {
  const url = `${site}/news/${spec.slug}.html`;
  const enUrl = `${site}/en/news/${spec.slug}.html`;
  const z = spec.zh;
  return page({
    lang: 'zh-CN',
    title: `${z.title}｜AI脑波英语`,
    description: z.description,
    keywords: z.keywords,
    canonical: url,
    alternates: [['zh-CN', url], ['en', enUrl]],
    css: '../assets/css/style.css?v=dailyseo',
    js: '../assets/js/main.js',
    header: zhHeader(spec.slug),
    footer: zhFooter(),
    body: articleBody('zh', spec, z),
    image: spec.image,
    json: jsonScripts(z, url, spec.date, 'AI脑波英语', imageUrl(spec.image))
  });
}

function renderEn(spec) {
  const url = `${site}/en/news/${spec.slug}.html`;
  const zhUrl = `${site}/news/${spec.slug}.html`;
  const e = spec.en;
  return page({
    lang: 'en',
    title: `${e.title} | AI Brainwave English`,
    description: e.description,
    keywords: e.keywords,
    canonical: url,
    alternates: [['en', url], ['zh-CN', zhUrl], ['x-default', url]],
    css: '../../assets/css/style.css?v=dailyseo',
    js: '../../assets/js/main.js',
    header: enHeader(spec.slug),
    footer: enFooter(),
    body: articleBody('en', spec, e),
    image: spec.image,
    json: jsonScripts(e, url, spec.date, 'AI Brainwave English', imageUrl(spec.image))
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
  <meta name="keywords" content="${esc(p.keywords.join(','))}">
  <link rel="canonical" href="${p.canonical}">
${p.alternates.map(([lang, href]) => `  <link rel="alternate" hreflang="${lang}" href="${href}">`).join('\n')}
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${imageUrl(p.image)}">
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

function articleBody(lang, spec, data) {
  const isZh = lang === 'zh';
  const contact = isZh ? '../contact.html' : '../contact.html';
  const courses = isZh ? '../courses.html' : '../courses.html';
  const faqTitle = isZh ? '常见问题' : 'Frequently asked questions';
  const next = isZh ? '下一步' : 'Next step';
  const assessment = isZh ? '预约测评' : 'Book assessment';
  const programs = isZh ? '查看课程体系' : 'View programs';
  const sideTitle = isZh ? '先测评，再决定训练路径' : 'Start with assessment';
  const sideText = isZh
    ? 'AI脑波英语会先看音标、词汇、语法、听力、阅读、写作和试卷失分点，再判断是否适合签约目标。'
    : 'AI Brainwave English reviews phonics, vocabulary, grammar, listening, reading, writing and exam gaps before recommending a plan.';
  return `<main>
  <section class="section article-hero">
    <div class="container article-grid">
      <article class="article-card">
        <div class="meta">${data.tags.map((t) => `<span class="meta-pill">${esc(t)}</span>`).join('')}<span class="meta-pill">${spec.date}</span></div>
        <h1>${esc(data.title)}</h1>
        <p class="hero-note">${esc(data.lead)}</p>
        ${articleFigure(lang, spec.image)}
      </article>
      <aside class="article-card insight-side-card">
        <div class="eyebrow">${isZh ? 'AI英语百科' : 'AI English Insights'}</div>
        <h3>${sideTitle}</h3>
        <p>${sideText}</p>
        <a class="button button-primary" href="${contact}">${assessment}</a>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="container article-content">
      ${positioningBlock(lang)}
${data.sections.map(sectionHtml).join('\n')}
      <h2>${faqTitle}</h2>
      <div class="faq">
${data.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
      </div>
      <div class="article-cta">
        <h2>${next}</h2>
        <p>${esc(data.cta)}</p>
        <div class="hero-actions small-actions"><a class="button button-primary" href="${contact}">${assessment}</a><a class="button button-secondary" href="${courses}">${programs}</a></div>
      </div>
    </div>
  </section>
</main>`;
}

function positioningBlock(lang) {
  if (lang === 'zh') {
    return `<div class="article-note"><strong>一句话理解：</strong>AI脑波英语是一套面向家长和教育机构的英语训练系统，核心由非侵入式脑机学习舱、AI课程系统、真人教练和学习数据闭环组成。它通过测评、训练、检测、复现和复盘，让训练过程更易记录和核验。</div>`;
  }
  return `<div class="article-note"><strong>One-sentence summary:</strong> AI脑波英语 is an English score-improvement and memory-training system built around a non-invasive / 非侵入式 learning cabin / 学习舱, AI课程, coach workflow and 数据闭环. The model is designed for parents, learning centers and partners who need assessment, guided training, exit testing and review instead of vague claims.</div>`;
}

function sectionHtml(section) {
  const paragraphs = section.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n');
  const bullets = section.bullets?.length ? `<ul>${section.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : '';
  return `      <h2>${esc(section.h2)}</h2>\n${paragraphs}\n${bullets}`;
}

function articleFigure(lang, image) {
  const img = normalizeImage(image);
  const src = articleImagePath(lang, img.src);
  const alt = lang === 'zh' ? img.altZh : img.altEn;
  const caption = lang === 'zh' ? img.captionZh : img.captionEn;
  return `<figure class="article-hero-image"><img src="${src}" alt="${esc(alt)}" loading="eager" fetchpriority="high" decoding="async"><figcaption>${esc(caption)}</figcaption></figure>`;
}

function jsonScripts(data, url, date, orgName, image) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    author: { '@type': 'Organization', name: orgName },
    publisher: { '@type': 'Organization', name: orgName },
    mainEntityOfPage: url,
    image,
    datePublished: date,
    dateModified: date
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  };
  return `  <script type="application/ld+json">${jsonLd(article)}</script>\n  <script type="application/ld+json">${jsonLd(faq)}</script>`;
}

function zhHeader(slug) {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html" aria-label="AI脑波英语首页"><div class="brand-mark">AI</div><div><div class="brand-title">AI脑波英语 @脑机/非侵入</div><div class="brand-sub">把单词存入大脑</div></div></a><nav class="nav"><a href="../index.html">首页</a><a href="../principle.html">核心原理</a><a href="../courses.html">课程体系</a><a href="../cases.html">案例与合作</a><a href="../safety.html">安全认证</a><a href="../partner.html">机构合作</a><a href="../insights.html" class="active">AI英语百科</a><a href="../contact.html">预约体验</a></nav><div class="nav-tools"><a class="lang-switch" href="../en/news/${slug}.html">EN</a><a class="button button-primary" href="../contact.html">预约测评</a></div><button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-label="切换菜单">☰</button></div><div class="container mobile-menu" data-mobile-menu><a href="../index.html">首页</a><a href="../principle.html">核心原理</a><a href="../courses.html">课程体系</a><a href="../cases.html">案例与合作</a><a href="../safety.html">安全认证</a><a href="../partner.html">机构合作</a><a href="../insights.html">AI英语百科</a><a href="../contact.html">预约体验</a></div></header>`;
}

function enHeader(slug) {
  return `<header class="header"><div class="container header-inner"><a class="brand" href="../index.html" aria-label="AI Brainwave English home"><div class="brand-mark">AI</div><div><div class="brand-title">AI Brainwave English</div><div class="brand-sub">Brain-computer / non-invasive vocabulary training</div></div></a><nav class="nav"><a href="../index.html">Home</a><a href="../principle.html">Core Principle</a><a href="../courses.html">Programs</a><a href="../cases.html">Results</a><a href="../safety.html">Safety</a><a href="../partner.html">Partnerships</a><a href="../insights.html" class="active">Insights</a><a href="../contact.html">Contact</a></nav><div class="nav-tools"><a class="lang-switch" href="../../news/${slug}.html">中文</a><a class="button button-primary" href="../contact.html">Book Assessment</a></div><button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-label="Toggle menu">☰</button></div><div class="container mobile-menu" data-mobile-menu><a href="../index.html">Home</a><a href="../principle.html">Core Principle</a><a href="../courses.html">Programs</a><a href="../cases.html">Results</a><a href="../safety.html">Safety</a><a href="../partner.html">Partnerships</a><a href="../insights.html">Insights</a><a href="../contact.html">Contact</a></div></header>`;
}

function zhFooter() {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="brand"><div class="brand-mark">AI</div><div><div class="brand-title">AI脑波英语 @脑机/非侵入</div><div class="brand-sub">把单词存入大脑</div></div></div><div class="footer-links"><a href="../index.html">首页</a><a href="../principle.html">核心原理</a><a href="../courses.html">课程体系</a><a href="../cases.html">案例与合作</a><a href="../safety.html">安全认证</a><a href="../insights.html">AI英语百科</a><a href="../partner.html">机构合作</a><a href="../contact.html">联系我们</a></div><small>© 2026 ai-naobo.com · 课程咨询、测评预约、学校合作与机构合作</small></div><small>适用阶段：小升初 / 中考 / 高考 / 四级 / 六级 / 托福雅思</small></div></footer>`;
}

function enFooter() {
  return `<footer class="footer"><div class="container footer-inner"><div><div class="brand"><div class="brand-mark">AI</div><div><div class="brand-title">AI Brainwave English</div><div class="brand-sub">Brain-computer / non-invasive vocabulary training</div></div></div><div class="footer-links"><a href="../index.html">Home</a><a href="../principle.html">Core Principle</a><a href="../courses.html">Programs</a><a href="../cases.html">Results</a><a href="../safety.html">Safety</a><a href="../insights.html">Insights</a><a href="../partner.html">Partnerships</a><a href="../contact.html">Contact</a></div><small>© 2026 ai-naobo.com · assessments, programs, school cooperation and partnerships</small></div><small>Programs for junior high, high school, CET, TOEFL and IELTS</small></div></footer>`;
}

function prependHubLink(file, title, description, href, lane) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  const html = fs.readFileSync(full, 'utf8');
  if (html.includes(href)) return;
  const card = `        <article class="post-card news-card"><div class="meta"><span class="meta-pill">${esc(lane)}</span><span class="meta-pill">${today}</span></div><h3>${esc(title)}</h3><p>${esc(description)}</p><a class="link" href="${href}">${file.startsWith('en/') ? 'Read more →' : '阅读全文 →'}</a></article>\n`;
  const marker = '<div class="post-list news-post-list">';
  const idx = html.indexOf(marker);
  if (idx === -1) return;
  const insertAt = idx + marker.length;
  fs.writeFileSync(full, html.slice(0, insertAt) + card + html.slice(insertAt));
}

function updateSitemap(spec) {
  const sitemapPath = path.join(root, 'sitemap.xml');
  const entries = new Map();
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    for (const m of xml.matchAll(/<url>\s*<loc>(.*?)<\/loc>(?:\s*<lastmod>(.*?)<\/lastmod>)?\s*<\/url>/g)) {
      entries.set(m[1], m[2] || spec.date);
    }
  }
  entries.set(`${site}/news/${spec.slug}.html`, spec.date);
  entries.set(`${site}/en/news/${spec.slug}.html`, spec.date);
  const body = [...entries].sort(([a], [b]) => a.localeCompare(b)).map(([u, lastmod]) => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

function tagSet(lane, lang) {
  const zh = {
    parent: ['家长问题', '词汇训练', '提分路径'],
    method: ['学习方法', '学习舱', '训练流程'],
    exam: ['考试提分', '初高中英语', '刷卷复盘'],
    institution: ['机构合作', '校区落地', '体验转化'],
    global: ['全球合作', 'AI英语', '教育科技'],
    faq: ['家长FAQ', '适配评估', '训练边界']
  };
  const en = {
    parent: ['Parent FAQ', 'Vocabulary Training', 'Score Path'],
    method: ['Method', 'Learning Cabin', 'Workflow'],
    exam: ['Exam English', 'Score Improvement', 'Review'],
    institution: ['Partnership', 'Learning Center', 'Pilot'],
    global: ['Global', 'AI English', 'EdTech'],
    faq: ['FAQ', 'Contract', 'Assessment']
  };
  return (lang === 'zh' ? zh : en)[lane] || (lang === 'zh' ? zh.parent : en.parent);
}

function englishCta(t) {
  if (t.lane === 'institution') return 'Contact / 联系 AI Brainwave English to start with a small learning-center pilot that validates assessment, parent communication and delivery records.';
  if (t.lane === 'global') return 'Contact / 联系 the team to begin with a focused pilot for Chinese-speaking learners, local education centers or vocabulary-intensive exam preparation.';
  if (t.lane === 'faq') return 'Contact / 联系 the team before signing any promise, and define baseline, target score, timetable, attendance and stage review rules.';
  return 'Book an assessment or contact / 联系 the team first, then decide whether the student needs phonics, vocabulary, grammar, skills training or exam review.';
}

function imageForTopic(topic) {
  return imageCatalog[topic.lane] || imageCatalog.parent;
}

function normalizeImage(image) {
  if (typeof image === 'string') {
    return {
      src: image,
      altZh: 'AI脑波英语学习舱训练场景',
      altEn: 'AI Brainwave English learning cabin training scene',
      captionZh: 'AI脑波英语用真实训练场景说明测评、进舱、出舱检测和复现巩固。',
      captionEn: 'AI Brainwave English uses real training context to explain assessment, cabin input, exit testing and review.'
    };
  }
  return image || imageCatalog.parent;
}

function articleImagePath(lang, src) {
  return `${lang === 'zh' ? '../' : '../../'}${src}`;
}

function imageUrl(image) {
  const img = normalizeImage(image);
  return `${site}/${img.src}`;
}

function daysSince(start, date) {
  const a = Date.parse(`${start}T00:00:00Z`);
  const b = Date.parse(`${date}T00:00:00Z`);
  return Math.floor((b - a) / 86400000);
}

function beijingDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${lookup.year}-${lookup.month}-${lookup.day}`;
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function writeJson(file, data) {
  writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replaceAll('</script', '<\\/script');
}
