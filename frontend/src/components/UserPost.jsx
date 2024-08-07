import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { Button } from "keep-react";
import PropTypes from "prop-types";
import { BsFileArrowDown, BsFileArrowUpFill } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserPost = ({ inputData, reFatch }) => {
  const {
    _id,
    title,
    voteCount: { upVote, downVote },
    commentCount,
  } = inputData;

  return (
    <div className="flex overflow-hidden justify-between gap-2 p-2 rounded-lg border border-blue-600 bg-white">
      <div className="flex flex-col">
        <Link to={`/post/${_id}`}>
          <h3 className="flex-1 leading-5 md:text-xl font-semibold capitalize hover:underline max-h-16 overflow-hidden">
            {title}
          </h3>
        </Link>
        <div className="my-2">Comments: {commentCount}</div>
        <div className="flex gap-2 items-center">
          <Link to={`/dashboard/comments/${_id}`}>
            <Button size="sm" className="btn" type="primary">
              Comment
            </Button>
          </Link>
          <DeletePost postId={_id} title={title} reFatch={reFatch} />
        </div>
      </div>
      <div>
        <Button size="sm" className="mb-1">
          <BsFileArrowUpFill size={20} />
          <span className="text-xl font-bold ml-1">{upVote}</span>
        </Button>
        <Button size="sm">
          <BsFileArrowDown size={20} />
          <span className="text-xl font-bold ml-1">{downVote}</span>
        </Button>
      </div>
    </div>
  );
};

UserPost.propTypes = {
  inputData: PropTypes.object,
  reFatch: PropTypes.func,
};

const DeletePost = ({ postId, title, reFatch }) => {
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();

  const handleDelete = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: `delete "${title}"`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (isConfirmed) {
        Swal.fire({
          title: "Loading....",
          didOpen: () => {
            Swal.showLoading();
          },
          showConfirmButton: false,
        });

        const { data } = await axiosSecure.delete(`/api/posts/${postId}`, {
          params: { userEmail: user?.email, userId: userData?._id },
          headers: {
            Authorization: token,
          },
        });

        if (!data?.success) {
          throw new Error(data?.message);
        }

        if (data?.data?.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            text: `"${title}" has been deleted.`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Delete incomplate!",
            text: `"${title}" not deleted.`,
            icon: "error",
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    } finally {
      reFatch();
    }
  };

  return (
    <Button
      onClick={handleDelete}
      size="sm"
      color="error"
      className="btn py-1"
      type="primary"
    >
      <FaTrashCan />
    </Button>
  );
};

DeletePost.propTypes = {
  postId: PropTypes.string,
  title: PropTypes.string,
  reFatch: PropTypes.func,
};

export default UserPost;
