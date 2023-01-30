import { IOutputter } from "./IOutputter";

interface IComment extends IOutputter {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  getId: () => number;
  getPostId: () => number;
  getName: () => string;
  getEmail: () => string;
  getBody: () => string;
}

export { IComment };
