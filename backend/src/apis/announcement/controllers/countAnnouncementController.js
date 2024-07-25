import { announcementModel } from "../../../models/announcementModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function countAnnouncementController(_req, res, next) {
  serverHelper(async () => {
    const count = await announcementModel.countDocuments();
    res.status(200).json({
      success: true,
      data: { count },
    });
  }, next);
}
