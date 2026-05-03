import{test,expect}from'@playwright/test';
import { PostsClients } from '../clients/postClients';
import { validatePost } from '../utils/validators';

test('POST /posts creates a new post', async ({ request }) => {

   const posts = new PostsClients(request);
   const res = await posts.createPost({
       title: 'test title',
       body: 'test body',
       userId: 1
   });

    expect(res.status()).toBe(201);

    const body = await res.json();

    validatePost(body);

    expect(body.title).toBe('test title');
    expect(body.body).toBe('test body');
  });


  test('PUT /posts/1 updates the post', async ({request}) => {
     
    const post = new PostsClients(request);
    const res = await post.updatePost(1, {
      title: 'updated title',
      body: 'updated body',
      userId: 1
    });

    expect(res.status()).toBeTruthy();

    const body = await res.json();

    validatePost(body);
    
    expect(body.title).toBe('updated title');
  });


  test('DELETE /posts/1 deletes the post', async ({request}) => {
    const posts = new PostsClients(request);
    const res = await posts.deletePost(1);
    expect(res.status()).toBe(200);
    });
