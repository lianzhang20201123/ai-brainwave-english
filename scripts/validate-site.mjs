#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const htmlFiles = collectHtml(root).filter(shouldValidateHtml);
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (/[<]{7}|={7}|>{7}/.test(html)) {
    errors.push(`${rel(file)} contains a merge-conflict marker`);
  }
  checkLinks(file, html);
  if (!/<title>[^<]{8,}<\/title>/i.test(html)) {
    errors.push(`${rel(file)} is missing a useful <title>`);
  }
  if (!/<meta\s+name="description"\s+content="[^"]{40,}"/i.test(html)) {
    errors.push(`${rel(file)} is missing a useful meta description`);
  }
}

checkSitemap();

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} issue(s):`);
  for (const error of errors.slice(0, 80)) console.error(`- ${error}`);
  if (errors.length > 80) console.error(`- ... ${errors.length - 80} more`);
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  htmlFiles: htmlFiles.length,
  sitemap: fs.existsSync(path.join(root, 'sitemap.xml')) ? 'checked' : 'missing'
}, null, 2));

function collectHtml(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectHtml(full));
    if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function shouldValidateHtml(file) {
  const relative = rel(file);
  if (relative === 'index.html') return true;
  if (relative === 'insights.html') return true;
  if (relative === 'en/insights.html') return true;
  if (relative.startsWith('topics/')) return true;
  if (relative.startsWith('en/topics/')) return true;
  if (/^news\/20\d{2}-\d{2}-\d{2}-/.test(relative)) return true;
  if (/^en\/news\/20\d{2}-\d{2}-\d{2}-/.test(relative)) return true;
  return false;
}

function checkLinks(file, html) {
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    const href = raw.split('#')[0].split('?')[0];
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('data:')) continue;
    if (href.startsWith('//')) continue;
    const target = path.normalize(path.join(path.dirname(file), href));
    if (!fs.existsSync(target)) {
      errors.push(`${rel(file)} links to missing ${raw}`);
    }
  }
}

function checkSitemap() {
  const sitemapPath = path.join(root, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    errors.push('sitemap.xml is missing');
    return;
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) errors.push(`sitemap duplicate URL: ${loc}`);
    seen.add(loc);
    let pathname;
    try {
      pathname = new URL(loc).pathname;
    } catch {
      errors.push(`sitemap invalid URL: ${loc}`);
      continue;
    }
    let localPath = decodeURIComponent(pathname);
    if (localPath === '/') localPath = '/index.html';
    if (localPath === '/en/') localPath = '/en/index.html';
    if (!fs.existsSync(path.join(root, localPath.slice(1)))) {
      errors.push(`sitemap URL has no local file: ${loc}`);
    }
  }
}

function rel(file) {
  return path.relative(root, file);
}
