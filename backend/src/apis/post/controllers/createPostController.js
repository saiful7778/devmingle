import { postModel } from "../../../models/postModel.js";
import { userModel } from "../../../models/userModel.js";
import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function createPostController(req, res, next) {
  const userId = req.userId;

  const postData = req.body;
  const { title, des, tag } = postData;

  const check = inputCheck([title, des, tag], next);
  if (!check) return;

  serverHelper(async () => {
    const filter = {
      _id: userId,
      $or: [{ badge: "gold" }, { badge: "bronze", postCount: { $lt: 5 } }],
    };

    const userPostCountUpdate = await userModel.updateOne(filter, {
      $inc: { postCount: 1 },
    });

    if (userPostCountUpdate.modifiedCount === 0) {
      res.status(200).json({
        success: false,
        message: "You have limited post, please update your plan",
      });
      return;
    }

    const tags = tag.map((ele) => ele.toLowerCase());

    await postModel.create({ title, des, tags, author: userId });

    res.status(201).json({
      success: true,
      message: "Post is created",
    });
  }, next);
}
