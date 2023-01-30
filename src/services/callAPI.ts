import { IComment } from "../interfaces/IComment";
import { IPost } from "../interfaces/IPost";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";

const axios = require("axios").default;
const sourceURL = "https://jsonplaceholder.typicode.com";

export async function getComments() {
  const commentResp = await axios.get(sourceURL + "/comments");

  const comments: IComment[] = commentResp.data.map((comment: any) => {
    return new Comment(
      comment.id,
      comment.postId,
      comment.name,
      comment.email,
      comment.body
    );
  });

  return comments;
}

export async function getPosts() {
  const postsResp = await axios.get(sourceURL + "/posts");

  const posts: IPost[] = postsResp.data.map((post: any) => {
    return new Post(post.id, post.userId, post.title, post.body);
  });

  return posts;
}
