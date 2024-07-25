import { postModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getAllPostController(req, res, next) {
  const { queryPage, querySize, queryTag } = req.query;

  const page = parseInt(queryPage ?? 0);
  const size = parseInt(querySize ?? 10);
  const skip = page * size;

  const tag = queryTag;

  serverHelper(async () => {
    const totalCount = await postModel.countDocuments();

    let pipeline = [
      {
        $addFields: {
          voteDifference: {
            $subtract: ["$voteCount.upVote", "$voteCount.downVote"],
          },
        },
      },
      {
        $sort: { voteDifference: -1 },
      },
      {
        $project: {
          __v: 0,
          des: 0,
        },
      },
      {
        $lookup: {
          from: "users", // Collection name to lookup
          localField: "author", // Field in the post collection
          foreignField: "_id", // Field in the user collection
          as: "author", // Alias for the joined documents
          pipeline: [
            {
              $project: {
                userName: 1,
                userEmail: 1,
                userPhoto: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$author", // Deconstruct the author array created by $lookup
      },
    ];

    if (typeof tag !== "undefined" && tag !== "all") {
      pipeline.push({
        $match: {
          tags: {
            $elemMatch: {
              $eq: tag,
            },
          },
        },
      });
    }

    const posts = await postModel.aggregate(pipeline).skip(skip).limit(size);

    res.status(200).json({
      success: true,
      totalCount,
      count: posts.length,
      data: posts,
    });
  }, next);
}
