import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com'
  }
});