import { userModel } from "../../../models/userModel.js";
import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function createUserController(req, res, next) {
  const userData = req.body;
  const { userName, userEmail, userToken, userPhoto } = userData;

  const check = inputCheck([userName, userEmail, userToken], next);
  if (!check) return;

  serverHelper(async () => {
    const exist = await userModel.findOne({ userEmail });
    if (exist) {
      res.status(400).send({
        success: false,
        message: "User is already exist",
      });
      return;
    }
    const result = await userModel.create({
      userName,
      userEmail,
      userPhoto,
      userToken,
    });

    res.status(201).send({
      success: true,
      data: {
        userName: result.userName,
        userEmail: result.userEmail,
        userPhoto: result.userPhoto,
        userToken: result.userToken,
        userRole: result.userRole,
        badge: result.badge,
        postCount: result.postCount,
      },
    });
  }, next);
}
