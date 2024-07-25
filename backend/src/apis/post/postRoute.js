import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createPostController from "./controllers/createPostController.js";
import getPostController from "./controllers/getPostController.js";
import getAllPostController from "./controllers/getAllPostController.js";

const postRoute = Router();

postRoute
  .route("/")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createPostController)
  .get(getAllPostController);

postRoute.route("/:postId").all(verifyToken).get(getPostController);

export default postRoute;
