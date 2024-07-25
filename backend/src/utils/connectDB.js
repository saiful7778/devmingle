import mongoose from "mongoose";
import getEnvVar from "./envVars.js";
import process from "node:process";

export default async function connectDB() {
  try {
    console.log("Connecting DB.....");

    mongoose.connection.on("connected", () => {
      console.log("Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error to connecting DB", err);
    });

    const dbUrl = getEnvVar("DB_CONNECT");

    await mongoose.connect(dbUrl);
  } catch (err) {
    console.error("Failed to connect in DB.", err);
    process.exit(1);
  }
}
