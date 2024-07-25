import { reportModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getAllReportsController(_req, res, next) {
  serverHelper(async () => {
    const reports = await reportModel
      .find({}, { __v: 0 })
      .populate({
        path: "comment",
        select: ["details", "user", "post", "createdAt"],
        populate: [
          { path: "post", select: "title" },
          { path: "user", select: ["userEmail", "userName", "userPhoto"] },
        ],
      })
      .populate({
        path: "user",
        select: ["userEmail", "userName", "userPhoto"],
      });

    res.status(200).json({
      success: true,
      data: reports,
    });
  }, next);
}
