import { reportModel } from "../../../models/postModel.js";
import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function createReportController(req, res, next) {
  const commentId = req.params.commentId;
  const userId = req.userId;

  const reportData = req.body;
  const { feedback } = reportData;

  const check = inputCheck([feedback], next);
  if (!check) return;

  serverHelper(async () => {
    await reportModel.create({
      feedback,
      comment: commentId,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: "Report is created",
    });
  }, next);
}
