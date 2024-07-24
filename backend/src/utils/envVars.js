import dotenv from "dotenv";
import process from "node:process";
dotenv.config();

const envVars = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  SITE_SECRET: process.env.SITE_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  DB_CONNECT: process.env.DB_CONNECT,
  FORNTEND_URL: process.env.FORNTEND_URL,
  NODE_ENV: process.env.NODE_ENV,
};

export default function getEnvVar(varName) {
  if (typeof envVars[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit(1);
  } else {
    return envVars[varName];
  }
}
