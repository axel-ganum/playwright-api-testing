import {test, expect} from '@playwright/test';
import { validatePost } from '../utils/validators';

test('GET /posts returns JSON content-type', async ({ request }) => {
  const res = await request.get('/posts');

  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/json');
});


test('GET /posts has expected structure', async ({ request }) => {
  const res = await request.get(' posts/1');

  expect(res.status()).toBe(200);

  const body = await res.json();

    validatePost(body);
});