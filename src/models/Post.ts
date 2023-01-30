import { IPost } from "../interfaces/IPost";

export class Post implements IPost {
  id: number;
  userId: number;
  title: string;
  body: string;

  constructor(id: number, userId: number, title: string, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getTitle() {
    return this.title;
  }

  getBody() {
    return this.body;
  }

  toJSON() {
    return {
      id: this.id,
      user_id: this.userId,
      title: this.title,
      body: this.body,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
