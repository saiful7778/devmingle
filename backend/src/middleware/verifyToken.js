import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import getEnvVar from "../utils/envVars.js";

export default function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  const { email } = req.query;

  if (!authorization) {
    return next(createHttpError(401, "authorization headers is unavailable"));
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "authorization token is unavailable"));
  }

  if (!email) {
    return next(createHttpError(401, "query email is unavailable"));
  }

  jwt.verify(token, getEnvVar("ACCESS_TOKEN"), (err, decode) => {
    if (err) {
      return next(createHttpError(401, "token is not valid"));
    }

    if (decode?.email !== email) {
      return next(
        createHttpError(401, "token user email and query email is not match")
      );
    }
    next();
  });
}
