import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
const root = path.resolve('dist'),
  pages = new Map();
function visit(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, e.name);
    if (e.isDirectory()) visit(file);
    else if (e.name === 'index.html') pages.set(file, load(fs.readFileSync(file, 'utf8')));
  }
}
visit(root);
assert.equal(pages.size, 26, 'Expected 13 static routes in each language');
let references = 0;
for (const [file, $] of pages) {
  const pathname =
    '/' + path.relative(root, path.dirname(file)).split(path.sep).filter(Boolean).join('/');
  const base = new URL(pathname.replace(/\/?$/, '/'), 'https://test.invalid');
  assert.equal(
    $('html').attr('lang'),
    pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh-CN',
  );
  for (const sel of [
    'h1',
    'main',
    'title',
    'meta[name="description"]',
    'meta[property="og:title"]',
  ])
    assert.equal($(sel).length, 1, file + ' ' + sel);
  $('img').each((_, el) => assert.ok($(el).attr('alt') !== undefined, 'Missing alt in ' + file));
  const ids = $('[id]')
    .map((_, el) => $(el).attr('id'))
    .get();
  assert.equal(new Set(ids).size, ids.length, 'Duplicate ID in ' + file);
  for (const el of $('a[href],img[src],script[src],link[href],image[href]').toArray()) {
    const ref = $(el).attr('href') ?? $(el).attr('src');
    const u = new URL(ref, base);
    if (u.origin !== base.origin) continue;
    let target = path.join(root, decodeURIComponent(u.pathname));
    if (u.pathname.endsWith('/')) target = path.join(target, 'index.html');
    assert.ok(fs.existsSync(target), file + ' points to missing ' + ref);
    if (u.hash && pages.has(target)) {
      const id = decodeURIComponent(u.hash.slice(1));
      assert.ok(
        pages
          .get(target)('[id]')
          .toArray()
          .some((e) => e.attribs.id === id),
        'Missing anchor ' + ref + ' from ' + file,
      );
    }
    references++;
  }
}
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8'),
  sitemap = load(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8'), { xml: true });
if (robots.includes('Allow: /')) {
  assert.equal(sitemap('loc').length, pages.size);
  for (const $ of pages.values()) {
    assert.equal($('link[rel="canonical"]').length, 1);
    assert.equal($('link[hreflang]').length, 3);
  }
} else assert.ok(robots.includes('Disallow: /'));
console.log(
  pages.size +
    ' static pages, ' +
    references +
    ' local references, metadata, language and anchor checks passed.',
);
