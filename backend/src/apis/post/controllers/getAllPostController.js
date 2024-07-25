import { postModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function getAllPostController(req, res, next) {
  const { queryPage, querySize, queryTag } = req.query;

  const page = parseInt(queryPage ?? 0);
  const size = parseInt(querySize ?? 10);
  const skip = page * size;

  const tag = queryTag;

  serverHelper(async () => {
    const totalCount = await postModel.estimatedDocumentCount();

    let pipeline = [
      {
        $addFields: {
          voteDifference: {
            $subtract: ["$voteCount.upVote", "$voteCount.downVote"],
          },
          id: {
            $toString: "$_id",
          },
        },
      },
      {
        $sort: { voteDifference: -1 },
      },
      {
        $project: {
          _id: 0,
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
                _id: 0,
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

    const posts = await postModel
      .aggregate(pipeline)
      .skip(skip)
      .limit(size)
      .exec();

    res.status(200).send({
      success: true,
      totalCount,
      count: posts.length,
      posts,
    });
  }, next);
}
