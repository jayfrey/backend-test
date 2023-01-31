import { IComment } from "../interfaces/IComment";
import { IPost } from "../interfaces/IPost";

type TopPost = {
  post_id: number;
  post_title: string;
  post_body: string;
  total_number_of_comments: number;
};

export function getTopPosts(comments: IComment[], posts: IPost[]) {
  let groupByPostId: TopPost[] = [];

  for (const comment of comments) {
    const index = groupByPostId.findIndex((e: TopPost) => {
      return e.post_id == comment.getPostId();
    });

    if (index == -1) {
      const post: IPost | null =
        posts.find((e: IPost) => {
          return e.getId() == comment.getPostId();
        }) ?? null;
      if (post != null) {
        groupByPostId.push({
          post_id: post!.getId(),
          post_title: post!.getTitle(),
          post_body: post!.getBody(),
          total_number_of_comments: 1,
        });
      }
    } else {
      groupByPostId[index].total_number_of_comments =
        groupByPostId[index].total_number_of_comments + 1;
    }
  }

  return groupByPostId.sort((a: TopPost, b: TopPost) =>
    a.total_number_of_comments < b.total_number_of_comments
      ? 1
      : a.total_number_of_comments > b.total_number_of_comments
      ? -1
      : 0
  );
}

export function getFilteredComments(
  comments: IComment[],
  search: string,
  filterBy: string | string[]
) {
  let pattern = new RegExp(search, "i");

  return comments.filter((comment: IComment) => {
    let hasMatches = [];

    if (filterBy.includes("id")) {
      hasMatches.push(comment.getId().toString().match(pattern) != null);
    }

    if (filterBy.includes("postId")) {
      hasMatches.push(comment.getPostId().toString().match(pattern) != null);
    }

    if (filterBy.includes("name")) {
      hasMatches.push(comment.getName().match(pattern) != null);
    }

    if (filterBy.includes("email")) {
      hasMatches.push(comment.getEmail().match(pattern) != null);
    }

    if (filterBy.includes("body")) {
      hasMatches.push(comment.getBody().match(pattern) != null);
    }

    return hasMatches.includes(true);
  });
}
