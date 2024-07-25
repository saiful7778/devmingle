import { userModel } from "../../../models/userModel.js";
import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";
import getEnvVar from "../../../utils/envVars.js";
import jwt from "jsonwebtoken";

export default function loginController(req, res, next) {
  const userData = req.body;
  const { userEmail } = userData;

  const check = inputCheck([userEmail], next);
  if (!check) return;

  serverHelper(async () => {
    const user = await userModel.findOne(
      { userEmail },
      {
        userEmail: 1,
        userToken: 1,
        userRole: 1,
        badge: 1,
      }
    );

    if (!user) {
      res.status(400).send({
        success: false,
        message: "User doesn't exist",
      });
      return;
    }

    const accessToken = getEnvVar("ACCESS_TOKEN");

    const token = jwt.sign(
      {
        userEmail: user.userEmail,
        userToken: user.userToken,
        userRole: user.userRole,
        badge: user.badge,
      },
      accessToken,
      { expiresIn: "2h" }
    );
    res.status(200).json({ success: true, token, user });
  }, next);
}
