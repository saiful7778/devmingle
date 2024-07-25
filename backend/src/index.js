import expressApp from "./expressApp.js";
import { connect } from "mongoose";
import process from "node:process";
import getEnvVar from "./utils/envVars.js";

(async () => {
  try {
    const dbUrl = getEnvVar("DB_CONNECT");

    console.log("connecting...");
    await connect(dbUrl);
    console.log("connected DB");
  } catch (err) {
    console.log("connection failed");
    console.log(err);
  }
})();

const port = process.env.PORT ?? 5000;
const app = expressApp();

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
