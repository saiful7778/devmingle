import { commentModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getAllCommentController(req, res, next) {
  const postId = req.params.postId;

  serverHelper(async () => {
    const comments = await commentModel
      .find({ post: postId }, { __v: 0 })
      .populate({
        path: "user",
        select: ["userName", "userEmail", "userPhoto"],
      });

    res.status(200).send({
      success: true,
      data: comments,
    });
  }, next);
}
