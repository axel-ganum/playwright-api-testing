import { expect } from '@playwright/test';

export function validatePost(body: any) {
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');
  expect(body).toHaveProperty('userId');

  expect(typeof body.title).toBe('string');
  expect(typeof body.body).toBe('string');
  expect(typeof body.userId).toBe('number');
}

export function validateUser(user: any) {
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');

  expect(typeof user.name).toBe('string');
  expect(typeof user.email).toBe('string');
}