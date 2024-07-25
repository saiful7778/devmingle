import createHttpError from "http-errors";
import { postModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function updatePostController(req, res, next) {
  const postId = req.params.postId;

  const postData = req.body;
  const postDataKeys = Object.keys(postData);

  // if body is empty then block user
  if (postDataKeys.length === 0) {
    return next(createHttpError(400, "Invalid input data"));
  }

  // block user action if "commentCount" or "author" is try to update
  if (
    postDataKeys.includes("commentCount") ||
    postDataKeys.includes("author")
  ) {
    res.status(400).json({
      success: false,
      message: `You can't update 'commentCount' or 'author' field`,
    });
    return;
  }

  serverHelper(async () => {
    const update = await postModel.updateOne({ _id: postId }, postData);

    res.status(200).json({
      success: true,
      data: update,
    });
  }, next);
}
