import getEnvVar from "./envVars.js";

export default function devDebug(inputText) {
  const nodeEnv = getEnvVar("NODE_ENV");
  console.log(nodeEnv);
  if (nodeEnv !== "production") {
    console.log("\n", "\t", "debug:", inputText, "\n");
  }
}
