import { Router } from "express";
import createUserController from "./controllers/createUserController.js";

const route = Router();

route.route("/").post(createUserController);

export default route;
