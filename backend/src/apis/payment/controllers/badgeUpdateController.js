import { userModel } from "../../../models/userModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function badgeUpdateController(req, res, next) {
  const userId = req.userId;
  serverHelper(async () => {
    const data = await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          badge: "gold",
        },
      }
    );

    res.status(200).json({
      success: true,
      data,
    });
  }, next);
}
