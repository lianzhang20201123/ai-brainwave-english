# Design QA

## 2026-06-07 Homepage Conversion Redesign

Selected direction: option 2, parent-facing conversion page centered on "英语拖总分，先别急着再报班".

Result: passed.

Checks completed:

- Desktop screenshot: `/tmp/ai-naobo-home-redesign-desktop-full.png`
- Desktop final viewport: `/tmp/ai-naobo-home-redesign-desktop-final.png`
- Mobile screenshot: `/tmp/ai-naobo-home-redesign-mobile-full.png`
- Mobile width QA: document width matched viewport width, no horizontal overflow.
- Site validation: `node scripts/validate-site.mjs` passed.

Notes:

- Homepage uses real local learning-cabin and parent-stress assets rather than generated placeholder imagery.
- Public copy avoids highest-score promises, medicalized claims, and "sleep and learn" framing.
- Primary conversion now focuses on 9.9元200词体验 and 30分钟测评.
