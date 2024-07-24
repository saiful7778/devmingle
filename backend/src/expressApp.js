import express from "express";
import cors from "cors";
// utils
import getEnvVar from "./utils/envVars.js";
import devDebug from "./utils/devDebug.js";
// routes
import userRoute from "./apis/user/userRoute.js";

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

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
    });
  });

  app.use("/api/users", userRoute);

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
