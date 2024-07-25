import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createPostController from "./controllers/createPostController.js";
import getPostController from "./controllers/getPostController.js";
import getAllPostController from "./controllers/getAllPostController.js";
import updatePostController from "./controllers/updatePostController.js";
import deletePostController from "./controllers/deletePostController.js";
import searchPostController from "./controllers/searchPostController.js";

const postRoute = Router();

postRoute
  .route("/")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createPostController)
  .get(getAllPostController);

postRoute.get("/search", searchPostController);

postRoute
  .route("/:postId")
  .all(verifyToken)
  .get(getPostController)
  .patch(updatePostController)
  .delete(verifyUser(["user", "admin"]), deletePostController);

export default postRoute;
