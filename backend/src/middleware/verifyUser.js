import createHttpError from "http-errors";
import { userModel } from "../models/userModel.js";

export default function verifyUser(userRole) {
  return async (req, _res, next) => {
    const { userId } = req.query;
    if (!userId) {
      return next(createHttpError(401, "userId is unavailable"));
    }

    try {
      const existUser = await userModel.findOne(
        { _id: userId },
        { _id: 1, role: 1, access: 1 }
      );

      if (!existUser) {
        return next(createHttpError(401, "user doesn't exist"));
      }

      if (!existUser.access) {
        return next(createHttpError(403, "user haven't access"));
      }

      if (!userRole.includes(existUser.role)) {
        return next(createHttpError(403, "user haven't access role"));
      }

      req.userId = existUser._id;
      next();
    } catch {
      return next(createHttpError(401, "user findOne error in verifyUser"));
    }
  };
}
