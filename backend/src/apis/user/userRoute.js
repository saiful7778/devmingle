import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createUserController from "./controllers/createUserController.js";
import getUserController from "./controllers/getUserController.js";
import getAllUserController from "./controllers/getAllUserController.js";

const userRoute = Router();

userRoute
  .route("/")
  .post(createUserController)
  .get(verifyToken, verifyUser(["admin"]), getAllUserController);

userRoute.get("/:userId", verifyToken, getUserController);

export default userRoute;