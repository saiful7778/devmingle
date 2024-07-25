import { Types } from "mongoose";
import serverHelper from "../../../utils/serverHelper.js";
import { postModel } from "../../../models/postModel.js";

export default function userPostGetController(req, res, next) {
  const userId = req.params.userId;
  const { queryPage, querySize } = req.query;

  const page = parseInt(queryPage ?? 0);
  const size = parseInt(querySize ?? 10);
  const skip = page * size;

  serverHelper(async () => {
    let pipeline = [
      {
        $match: {
          author: new Types.ObjectId(userId),
        },
      },
      {
        $project: {
          des: 0,
          author: 0,
          __v: 0,
        },
      },
    ];

    const totalCount = await postModel.countDocuments({
      author: new Types.ObjectId(userId),
    });

    const userPosts = await postModel
      .aggregate(pipeline)
      .skip(skip)
      .limit(size);

    res.status(200).json({
      success: true,
      totalCount: totalCount,
      count: userPosts.length,
      data: userPosts,
    });
  }, next);
}
