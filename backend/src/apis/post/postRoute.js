import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createPostController from "./controllers/createPostController.js";

const postRoute = Router();

postRoute
  .route("/")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createPostController);

export default postRoute;
