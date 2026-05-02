import {test, expect} from '@playwright/test';

test('GET /posts returns JSON content-type', async ({ request }) => {
  const res = await request.get('https://jsonplaceholder.typicode.com/posts');

  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/json');
});


test('GET /posts has expected structure', async ({ request }) => {
  const res = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  expect(res.status()).toBe(200);

  const body = await res.json();

  expect(body).toHaveProperty('id');
  expect(typeof body.id).toBe('number');

  expect(body).toHaveProperty('title');
  expect(typeof body.title).toBe('string');

  expect(body).toHaveProperty('body');
  expect(typeof body.body).toBe('string');

  expect(body).toHaveProperty('userId');
  expect(typeof body.userId).toBe('number');
});