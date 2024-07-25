import axios from "axios";
import serverHelper from "../../../utils/serverHelper.js";
import getEnvVar from "../../../utils/envVars.js";
import inputCheck from "../../../utils/inputCheck.js";

export default function verifyCaptchaController(req, res, next) {
  const { captchaValue } = req.body;

  const check = inputCheck([captchaValue], next);
  if (!check) return;

  const siteSecret = getEnvVar("SITE_SECRET");

  serverHelper(async () => {
    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      undefined,
      {
        params: {
          secret: siteSecret,
          response: captchaValue,
        },
      }
    );
    res.status(200).json({ success: true, data });
  }, next);
}
