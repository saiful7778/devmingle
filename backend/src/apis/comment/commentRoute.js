import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createCommentController from "./controllers/createCommentController.js";
import getAllCommentController from "./controllers/getAllCommentController.js";

const commentRoute = Router();

commentRoute
  .route("/:postId")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createCommentController)
  .get(getAllCommentController);

export default commentRoute;
