import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createCommentController from "./controllers/createCommentController.js";

const commentRoute = Router();

commentRoute
  .route("/:postId")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createCommentController);

export default commentRoute;
