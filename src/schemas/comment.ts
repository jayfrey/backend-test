import Joi from "joi";
import { Comment } from "../models/Comment";

export const commentSchema = {
  search: Joi.object({
    page: Joi.number().min(1).required(),
    perPage: Joi.number().min(1).optional(),
  })
    .when(Joi.object({ search: Joi.exist() }).unknown(), {
      then: Joi.object({
        filterBy: Joi.alternatives()
          .try(
            Joi.array().items(Joi.string().valid(...Comment.getAttributes())),
            Joi.string().valid(...Comment.getAttributes())
          )
          .required(),
      }),
      otherwise: Joi.object({
        filterBy: Joi.optional(),
      }),
    })
    .when(Joi.object({ filterBy: Joi.exist() }).unknown(), {
      then: Joi.object({
        search: Joi.string().required(),
      }),
      otherwise: Joi.object({
        search: Joi.optional(),
      }),
    }),
};
