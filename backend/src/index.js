import expressApp from "./expressApp.js";
import connectDB from "./utils/connectDB.js";
import getEnvVar from "./utils/envVars.js";

(async () => {
  await connectDB();

  const app = expressApp();
  const port = getEnvVar("PORT");

  app.listen(port, () => {
    console.log("Server is running on port:", port);
  });
})();
