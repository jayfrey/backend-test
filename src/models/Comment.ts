import { IComment } from "../interfaces/IComment";

export class Comment implements IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  constructor(
    id: number,
    postId: number,
    name: string,
    email: string,
    body: string
  ) {
    this.id = id;
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
  }

  getId() {
    return this.id;
  }

  getPostId() {
    return this.postId;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getBody() {
    return this.body;
  }

  static getAttributes() {
    return ["id", "postId", "name", "email", "body"];
  }

  toJSON() {
    return {
      id: this.id,
      postId: this.postId,
      name: this.name,
      email: this.email,
      body: this.body,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
