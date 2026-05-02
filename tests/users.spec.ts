import {test, expect} from '@playwright/test';

test('GET /users returns list of users', async ({request}) => {
   const res = await request.get('https://jsonplaceholder.typicode.com/users');

   expect(res.status()).toBe(200);

   const body = await res.json();
   expect(Array.isArray(body)).toBeTruthy();
   expect(body.length).toBeGreaterThan(0);
});


test('GET /users/1 returns valid user', async ({request}) => {
   const res = await request.get('https://jsonplaceholder.typicode.com/users/1');

   expect(res.ok()).toBeTruthy();
  
    const user = await res.json();
    expect(user.id).toBe(1);
    expect(user.name).toBeDefined();
    expect(user.email).toContain('@');
});
