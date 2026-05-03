import { APIRequestContext } from '@playwright/test';

export class PostsClients {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createPost(data: any) {
        return this.request.post('/posts', { data });
    }

    async updatePost(id: number, data: any) {
        return this.request.put(`/posts/${id}`, { data });
    }

    async deletePost(id: number) {
        return this.request.delete(`/posts/${id}`);
    }
}