import { IComment } from "../interfaces/IComment";
import { IPost } from "../interfaces/IPost";
import { getComments, getPosts } from "../services/callAPI";
import { getTopPosts, getFilteredComments } from "../services/appService";
import { paginate } from "../utils/pagination";

const httpConstants = require("http2").constants;

module.exports = (app: any) => {
  app.get("/posts/top", async (_: any, res: any) => {
    const comments: IComment[] = await getComments();
    const posts: IPost[] = await getPosts();

    res.status(httpConstants.HTTP_STATUS_OK).json(getTopPosts(comments, posts));
  });

  app.get("/comments/", async (req: any, res: any) => {
    const comments: IComment[] = await getComments();

    const search = req.query.search;
    const filterBy = req.query.filterBy;
    const page = req.query.page;

    let filteredComments: IComment[];

    if (search && filterBy) {
      filteredComments = getFilteredComments(comments, search, filterBy);
    } else {
      filteredComments = comments;
    }

    res
      .status(httpConstants.HTTP_STATUS_OK)
      .json(paginate(filteredComments, page));
  });
};
