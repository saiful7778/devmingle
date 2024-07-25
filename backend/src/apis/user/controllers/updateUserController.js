import { userModel } from "../../../models/userModel.js";
import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function updateUserController(req, res, next) {
  const userId = req.params.userId;
  const { userRole } = req.body;

  const check = inputCheck([userRole], next);
  if (!check) return;

  serverHelper(async () => {
    const data = await userModel.updateOne(
      { _id: userId },
      { $set: { userRole } }
    );

    res.status(200).json({
      success: true,
      data,
    });
  }, next);
}
