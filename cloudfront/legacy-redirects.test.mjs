// Run: node --test cloudfront/legacy-redirects.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('./legacy-redirects.js', import.meta.url), 'utf8');
const handler = new Function(`${src}; return handler;`)();

const run = (uri, querystring = {}) => handler({ request: { uri, querystring } });

test('a job page without its trailing slash is a 301 to the slash version', () => {
  const r = run('/jobs/view/backend-engineer-at-acme-bengaluru-abcdefghij', { utm_source: { value: 'x' } });
  assert.equal(r.statusCode, 301);
  assert.equal(r.headers.location.value, '/jobs/view/backend-engineer-at-acme-bengaluru-abcdefghij/?utm_source=x');
  assert.equal(run('/jobs').headers.location.value, '/jobs/');
});

test('the slash version and job files are served, not redirected', () => {
  assert.equal(run('/jobs/view/backend-engineer-at-acme-bengaluru-abcdefghij/').uri,
    '/jobs/view/backend-engineer-at-acme-bengaluru-abcdefghij/index.html');
  assert.equal(run('/jobs/').uri, '/jobs/index.html');
  assert.equal(run('/jobs/sitemaps/index.xml').uri, '/jobs/sitemaps/index.xml');
  assert.equal(run('/jobs/assets/site.v1.css').uri, '/jobs/assets/site.v1.css');
});

test('other routes keep the rewrite they had', () => {
  assert.equal(run('/pricing').uri, '/pricing/index.html');
  assert.equal(run('/jobsearch-tips').uri, '/jobsearch-tips/index.html');
});
