import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";
import { commentModel, postModel } from "../../../models/postModel.js";

export default function createCommentController(req, res, next) {
  const postId = req.params.postId;
  const userId = req.userId;

  const bodyData = req.body;
  const { details } = bodyData;

  const check = inputCheck([details], next);
  if (!check) return;

  serverHelper(async () => {
    await commentModel.create({
      post: postId,
      user: userId,
      details,
    });

    await postModel.updateOne({ _id: postId }, { $inc: { commentCount: 1 } });
    res.status(201).json({ success: true, message: "Comment is created" });
  }, next);
}
