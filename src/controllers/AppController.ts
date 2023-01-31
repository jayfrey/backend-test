import { IComment } from "../interfaces/IComment";
import { IPost } from "../interfaces/IPost";
import { getTopPosts, getFilteredComments } from "../services/appService";
import { StatusCodes } from "http-status-codes";
import { paginate } from "../utils/pagination";

import { getComments, getPosts } from "../services/callAPI";

export class AppController {
  async getTopPosts(_: any, res: any) {
    const comments: IComment[] = await getComments();
    const posts: IPost[] = await getPosts();

    res.status(StatusCodes.OK).json(getTopPosts(comments, posts));
  }

  async search(req: any, res: any) {
    const comments: IComment[] = await getComments();

    const search = req.query.search;
    const filterBy = req.query.filterBy;
    const page = req.query.page;
    const perPage = req.query.perPage;

    let filteredComments: IComment[];

    if (search && filterBy) {
      filteredComments = getFilteredComments(comments, search, filterBy);
    } else {
      filteredComments = comments;
    }

    res.status(StatusCodes.OK).json(paginate(filteredComments, page, perPage));
  }
}
