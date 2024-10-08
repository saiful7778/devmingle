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
import userPostGetController from "./controllers/userPostGetController.js";

const postRoute = Router();

postRoute
  .route("/")
  .post(verifyToken, verifyUser(["user", "admin"]), createPostController)
  .get(getAllPostController);

postRoute.get("/search", searchPostController);

postRoute.get("/user_posts/:userId", userPostGetController);

postRoute
  .route("/:postId")
  .get(getPostController)
  .patch(verifyToken, updatePostController)
  .delete(verifyToken, verifyUser(["user", "admin"]), deletePostController);

export default postRoute;
