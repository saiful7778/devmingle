import { announcementModel } from "../../../models/announcementModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getAllAnnouncementController(_req, res, next) {
  serverHelper(async () => {
    const announcements = await announcementModel
      .find({}, { __v: 0 })
      .populate("author", ["userName", "userEmail", "userPhoto"]);

    res.status(200).json({
      success: true,
      data: announcements,
    });
  }, next);
}
