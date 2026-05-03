import {test, expect} from '@playwright/test';
import { UsersClient } from '../clients/usersClient';  
import { validateUser } from '../utils/validators';

test('GET /users returns list of users', async ({request}) => {
   const users = new UsersClient(request);

   const res = await users.getAllUsers();

   expect(res.status()).toBe(200);

   const body = await res.json();
   expect(Array.isArray(body)).toBeTruthy();
   expect(body.length).toBeGreaterThan(0);

   validateUser(body[0]);
});


test('GET /users/1 returns valid user', async ({request}) => {
   const users = new UsersClient(request);
   const res = await users.getUserById(1);
   expect(res.ok()).toBeTruthy();

   const body = await res.json();

   validateUser(body);

   expect(body.id).toBe(1);
   expect(body.email).toContain('@');
});
