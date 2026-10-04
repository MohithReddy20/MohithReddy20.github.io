import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const routes = ['', 'projects/heart-disease', 'projects/asl-recognizer', 'projects/offline-nlp'];
const load = route => readFileSync(resolve('dist', route, 'index.html'), 'utf8');

for (const route of routes) {
  test(`Built route /${route} has accessible shell and valid local targets`, () => {
    const html = load(route);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /id="main-content"/);
    assert.match(html, /aria-controls="nav-links"/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(html, /data:image\/.*?base64/);
    assert.match(html, /name="description"/);
    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (!value.startsWith('/') && !value.startsWith('#')) continue;
      const url = new URL(value, `https://local.test/${route}/`);
      const path = decodeURIComponent(url.pathname);
      const target = resolve('dist', `.${path}`);
      assert.ok(existsSync(target), `Missing asset or route: ${value}`);
      if (url.hash) {
        const targetHtml = path === '/' ? load('') : html;
        assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${value}`);
      }
    }
  });
}

test('Homepage contains current education, all projects and public contact', () => {
  const html = load('');
  assert.match(html, /8\.41/);
  assert.match(html, /May 2026/);
  assert.doesNotMatch(html, /final-year|DRDO-backed|Oct 2025 — Present/i);
  for (const slug of routes.slice(1)) assert.ok(html.includes(`/${slug}`));
  assert.match(html, /mailto:yannammohithreddy@gmail\.com/);
  assert.match(html, /tel:\+917075124019/);
  assert.match(html, /Resume PDF reflects an earlier version/);
});

test('Case studies retain metric limitations and do not invent repository links', () => {
  assert.match(load('projects/heart-disease'), /rather than a clinically validated diagnostic system/);
  assert.match(load('projects/asl-recognizer'), /not a held-out test-set/);
  assert.match(load('projects/offline-nlp'), /does not imply organizational endorsement/);
  for (const route of routes.slice(1)) {
    assert.doesNotMatch(load(route), /https:\/\/github\.com\/MohithReddy20\/[a-z]/i);
  }
});

test('Resume bytes are unchanged from the supplied PDF', () => {
  assert.equal(createHash('sha256').update(readFileSync('public/resume/MohithReddyYannam_Resume.pdf')).digest('hex'), 'cc9b634d4c29bb83dab4def751ce8ecd0c86f275685fb98d2dcf97b0edaee585');
});

test('Portfolio copy keeps direct metrics, corrected dates and requested skills', () => {
  const home = load('');
  const heart = load('projects/heart-disease');
  const offline = load('projects/offline-nlp');
  assert.match(home, /88% accuracy/);
  assert.doesNotMatch(home, /Reported 88%|data sovereignty/);
  assert.match(home, /keeping all processing inside the air-gapped environment/);
  assert.match(heart, /Jan 2026–Mar 2026/);
  assert.match(heart, /achieved 88% accuracy/);
  assert.doesNotMatch(heart, /supplied record|intentionally not inferred/);
  assert.doesNotMatch(offline, /no additional parsing|supplied project context/);
  assert.match(offline, /not an organizational benchmark/);
  const skills = home.match(/<section id="skills"[\s\S]*?<\/section>/)?.[0];
  assert.ok(skills);
  assert.match(skills, />JavaScript</);
  assert.doesNotMatch(skills, />(Java|C)</);
  const hero = home.match(/<section id="hero"[\s\S]*?<\/section>/)?.[0];
  assert.match(hero, /View projects/);
  assert.match(hero, /Download CV/);
  assert.doesNotMatch(hero, /Hire me|Get a quote|Freelance/i);
});

test('Skills CSS guards against empty grey grid cells (source regression)', () => {
  const css = readFileSync('src/styles/components.css', 'utf8');
  assert.match(css, /\.skills-grid\s*\{\s*grid-template-columns:repeat\(3,minmax\(0,1fr\)\);\s*background:transparent;/);
  assert.match(css, /\.skills-grid > \.skill-group\s*\{\s*border:1px solid var\(--faint\)/);
  assert.match(css, /@media\(max-width:1150px\).*?\.skills-grid.*?repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:800px\).*?\.skills-grid.*?grid-template-columns:1fr/);
});
