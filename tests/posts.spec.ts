import{test,expect}from'@playwright/test';
import { PostsClients } from '../clients/postClients';
import { validatePost } from '../utils/validators';

test('POST /posts creates a new post', async ({ request }) => {

   const posts = new PostsClients(request);
   
   const payload = {
    title: 'test title',
    body: 'test body',
    userId: 1
   };

   const res = await posts.createPost(payload);

   expect(res.status()).toBe(201);

   const body = await res.json();

   validatePost(body);

   expect(body).toMatchObject(payload);
   expect(body.id).toBeDefined();
  });

  test('PUT /posts/1 updates the post', async ({request}) => {
     
    const post = new PostsClients(request);
   
    const payload = {
      title: 'updated title',
      body: 'updated body',
      userId: 1
    };
  
    const res = await post.updatePost(1, payload);

    expect(res.status()).toBe(200);

    const body = await res.json();

    validatePost(body);
    
    expect(body).toMatchObject(payload);

  });

  test('DELETE /posts/1 deletes the post', async ({request}) => {
    const posts = new PostsClients(request);
    const res = await posts.deletePost(1);
    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body).toEqual({});
  });

  test('POST /posts with invalid payload returns error', async ({request}) => {
    const posts = new PostsClients(request);

    const payload = {
      title: '',
      body: 'test body',
      userId: 1
    };
    const res = await posts.createPost(payload);
    const status = res.status();

    expect([201, 400]).toContain(status);

    if(status === 201) {
      console.warn('Mock API does not validate payload correctly');
    }
  });

  test('PUT /posts/999 updates non-existing post', async ({request}) => {
    const posts = new PostsClients(request);
    const payload = {
      title: 'test',
      body: 'test',
      userId: 1
    };
    const res = await posts.updatePost(999, payload);
    const status = res.status();

   expect([200, 404, 500]).toContain(status);

   if (status === 500) {
     console.warn('Mock API returned 500 for non-existing resource');
   }
  });

  test('DELETE /posts/999 handles non-existing resource', async ({request}) => {
    const posts = new PostsClients(request);
    const res = await posts.deletePost(999);

   const status = res.status();

    expect([200, 404, 500]).toContain(status);

     if (status === 500) {
       console.warn('API mock returned 500 for non-existing resource');
      }  
  });
