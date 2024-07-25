import { userModel } from "../../../models/userModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getUserController(req, res, next) {
  const userId = req.params.userId;

  serverHelper(async () => {
    const user = await userModel.findOne({ _id: userId }, { __v: 0 });

    res.status(200).json({
      success: true,
      data: user,
    });
  }, next);
}
