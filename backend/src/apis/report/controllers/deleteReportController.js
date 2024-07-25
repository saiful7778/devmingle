import { reportModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function deleteReportController(req, res, next) {
  const reportId = req.params.reportId;

  serverHelper(async () => {
    const data = await reportModel.deleteOne({ _id: reportId });

    if (data.deletedCount === 0) {
      res.status(400).send({ success: false, message: "Something went wrong" });
      return;
    }

    res.status(200).json({
      success: true,
      data,
    });
  }, next);
}
