import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
// utils
import getEnvVar from "./utils/envVars.js";
import devDebug from "./utils/devDebug.js";
// routes
import userRoute from "./apis/user/userRoute.js";
import authRoute from "./apis/auth/authRoute.js";
import postRoute from "./apis/post/postRoute.js";
import commentRoute from "./apis/comment/commentRoute.js";

export default function expressApp() {
  const app = express();

  const frontendUrl = getEnvVar("FORNTEND_URL");
  const accessSite = [frontendUrl, "http://localhost:5173"];

  app.use(
    cors({
      origin: accessSite,
      methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    })
  );
  app.use(express.json());
  if (getEnvVar("NODE_ENV") === "development") {
    app.use(morgan("dev"));
  }
  app.use(helmet());
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again after 15 minutes",
    headers: true,
  });
  app.use(limiter);

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
    });
  });

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/posts/comments", commentRoute);

  app.get("*", (_req, res) => {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
  });

  app.use(
    // eslint-disable-next-line no-unused-vars
    (err, _req, res, _next) => {
      const errData = {
        status: err.status || err.statusCode || 500,
        name: err.name,
        message: err.message || "server error",
      };

      devDebug(errData.message);

      res.status(errData.status).json({
        success: false,
        message: errData.name,
      });
    }
  );

  return app;
}
