import { Types } from "mongoose";
import {
  commentModel,
  postModel,
  reportModel,
} from "../../../models/postModel.js";
import { userModel } from "../../../models/userModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function deletePostController(req, res, next) {
  const postId = req.params.postId;
  const userId = req.userId;

  serverHelper(async () => {
    const data = await postModel.deleteOne({
      _id: postId,
      author: userId,
    });

    if (data.deletedCount === 0) {
      res.status(400).json({ success: false, message: "Something went wrong" });
      return;
    }
    await userModel.updateOne({ _id: userId }, { $inc: { postCount: -1 } });

    await commentModel.deleteMany({
      post: new Types.ObjectId(postId),
    });

    await reportModel.deleteMany({
      post: new Types.ObjectId(postId),
    });

    res.status(200).json({
      success: true,
      data,
    });
  }, next);
}
