import PropTypes from "prop-types";
import moment from "moment";
import { Avatar } from "keep-react";

const Comment = ({ commentData }) => {
  const {
    user: { userName, userPhoto },
    details,
    createdAt,
  } = commentData;

  const commentTime = moment(createdAt).fromNow();

  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0">
        <Avatar shape="circle" size="sm" bordered img={userPhoto} />
      </div>
      <div>
        <h6 className="text-lg text-blue-600 leading-3 font-semibold">
          {userName}
        </h6>
        <div className="text-xs italic text-gray-500">{commentTime}</div>
        <p className="md:text-sm text-xs">{details}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  commentData: PropTypes.object,
};

export default Comment;
