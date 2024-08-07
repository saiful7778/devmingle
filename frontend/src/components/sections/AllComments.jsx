import PropTypes from "prop-types";
import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";

const AllComments = ({ postId, commentCount, comments }) => {
  const renderComments = comments?.map((comment, idx) => (
    <Comment key={`comment-${idx}`} commentData={comment} />
  ));

  return (
    <>
      <div className="text-xl font-bold">Comments: {commentCount}</div>
      <div className="py-3 space-y-6">{renderComments}</div>
      <CommentForm postId={postId} />
    </>
  );
};

AllComments.propTypes = {
  postId: PropTypes.string,
  commentCount: PropTypes.number,
  comments: PropTypes.array,
};

export default AllComments;
