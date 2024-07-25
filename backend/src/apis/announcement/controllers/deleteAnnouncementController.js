import { announcementModel } from "../../../models/announcementModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function deleteAnnouncementController(req, res, next) {
  const announcementID = req.params.announcementId;

  serverHelper(async () => {
    const data = await announcementModel.deleteOne({ _id: announcementID });
    res.status(200).json({
      success: true,
      data,
    });
  }, next);
}
