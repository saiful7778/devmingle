import { userModel } from "../../../models/userModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getAllUserController(_req, res, next) {
  serverHelper(async () => {
    const users = await userModel.find({}, { __v: 0 });

    res.status(200).json({
      success: true,
      data: users,
    });
  }, next);
}
