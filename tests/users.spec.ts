import {test, expect} from '@playwright/test';
import { UsersClient } from '../clients/usersClient';  
import { validateUser } from '../utils/validators';

test('GET /users returns list of users', async ({request}) => {
   const users = new UsersClient(request);

   const res = await users.getAllUsers();

   expect(res.status()).toBe(200);

   const body = await res.json();
   expect(body).toBeInstanceOf(Array);
   expect(body.length).toBeGreaterThan(0);
   
    body.forEach((user: any) => {
      validateUser(user);

      expect(user.id).toBeGreaterThan(0);
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
   });

});


test('GET /users/1 returns valid user', async ({request}) => {
   const users = new UsersClient(request);
   const res = await users.getUserById(1);
 
   expect(res.status()).toBe(200);  

   const body = await res.json();

   validateUser(body);

     expect(body).toMatchObject({
    id: 1,
  });

   expect(body.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

test('GET /users/999 returns 404', async ({request}) => {
   const users = new UsersClient(request);
   const res = await users.getUserById(999);

   expect(res.status()).toBe(404);
});