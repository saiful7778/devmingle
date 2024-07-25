import { Router } from "express";
import createUserController from "./controllers/createUserController.js";
import getUserController from "./controllers/getUserController.js";

const route = Router();

route.route("/").post(createUserController);

route.route("/:userId").get(getUserController);

export default route;
