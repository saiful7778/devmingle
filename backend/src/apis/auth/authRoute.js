import { Router } from "express";
import loginController from "./controllers/loginController.js";

const authRoute = Router();

authRoute.post("/login", loginController);

export default authRoute;
