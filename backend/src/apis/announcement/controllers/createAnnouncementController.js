import { announcementModel } from "../../../models/announcementModel.js";
import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function createAnnouncementController(req, res, next) {
  const bodyData = req.body;
  const authorId = req.userId;

  const { title, details } = bodyData;
  const check = inputCheck([title, details], next);
  if (!check) return;

  serverHelper(async () => {
    await announcementModel.create({ title, details, author: authorId });

    res.status(201).json({
      success: true,
      message: "accouncement is created",
    });
  }, next);
}
