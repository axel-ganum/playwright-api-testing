import{test,expect}from'@playwright/test';

test('POST /posts creates a new post',async({request})=>{

     const res = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'test title',
      body: 'test body',
      userId: 1
    }
  });
   
    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body.title).toBe('test title');
    expect(body.body).toBe('test body');
  });


  test('PUT /posts/1 updates the post', async ({request}) => {
    const res = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: {
        title: 'updated title',
        body: 'updated body',
        userId: 1
      }
    });

    expect(res.status()).toBeTruthy

    const body = await res.json();
    expect(body.title).toBe('updated title');
  });

  
    test('DELETE /posts/1 deletes the post', async ({request}) => {
      const res = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
      expect(res.status()).toBe(200);
    });
