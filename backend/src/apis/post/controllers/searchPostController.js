import { postModel } from "../../../models/postModel.js";
import serverHelper from "../../../utils/serverHelper.js";

export default function searchPostController(req, res, next) {
  const query = req.query.q;

  serverHelper(async () => {
    const post = await postModel.find(
      { title: new RegExp(query, "ig") },
      { title: 1 }
    );

    res.status(200).json({
      success: true,
      data: post,
    });
  }, next);
}
