import {test, expect} from '@playwright/test';

test('GET users', async ({request}) => {

  const res = await request.get('https://jsonplaceholder.typicode.com/users');

  expect(res.status()).toBe(200);

  const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
});