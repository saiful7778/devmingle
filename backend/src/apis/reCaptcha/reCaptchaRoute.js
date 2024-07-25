import { Router } from "express";
import verifyCaptchaController from "./controller/verifyCaptchaController.js";

const reCaptchaRoute = Router();

reCaptchaRoute.post("/verify", verifyCaptchaController);

export default reCaptchaRoute;
