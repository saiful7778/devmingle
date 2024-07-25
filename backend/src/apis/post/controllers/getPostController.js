import { commentModel, postModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getPostController(req, res, next) {
  const postId = req.params.postId;

  serverHelper(async () => {
    const post = await postModel.findOne({ _id: postId }, { __v: 0 }).populate({
      path: "author",
      select: ["userName", "userEmail", "userPhoto"],
    });

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const comments = await commentModel
      .find({ post: post.id }, { __v: 0, post: 0 })
      .populate({
        path: "user",
        select: ["userName", "userEmail", "userPhoto"],
      });

    res.status(200).json({
      success: true,
      data: {
        post,
        comments,
      },
    });
  }, next);
}
