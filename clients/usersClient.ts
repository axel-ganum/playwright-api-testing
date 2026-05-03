import {APIRequestContext} from "@playwright/test";

export class UsersClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

      async getAllUsers() {
      return this.request.get('/users');
      }

      async getUserById(id: number) {
         return this.request.get(`/users/${id}`);
      }
  }