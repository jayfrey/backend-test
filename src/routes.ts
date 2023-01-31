import { validator } from "./middlewares/index";
import { commentSchema } from "./schemas/index";
import { AppController } from "./controllers/AppController";

export default (app: any) => {
  app.get("/posts/top", new AppController().getTopPosts);

  app.get(
    "/comments/",
    validator(commentSchema.search),
    new AppController().search
  );
};
