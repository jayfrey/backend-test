import { IOutputter } from "./IOutputter";

interface IPost extends IOutputter {
  id: number;
  userId: number;
  title: string;
  body: string;

  getId: () => number;
  getUserId: () => number;
  getTitle: () => string;
  getBody: () => string;
}

export { IPost };
