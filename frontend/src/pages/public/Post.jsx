import Loading from "@/components/Loading";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Button, Empty } from "keep-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import notFoundImg from "@/assets/images/not-found.svg";
import moment from "moment";
import {
  BsArrowLeftShort,
  BsFileArrowDown,
  BsFileArrowUpFill,
} from "react-icons/bs";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import AllComments from "@/components/sections/AllComments";

const Post = () => {
  const { postId } = useParams();

  const axios = useAxios();
  const {
    data: postData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${postId}`);
      if (!data?.success) {
        throw new Error(data?.message);
      }
      return data?.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(error.message);
    return (
      <Empty
        title="Oops! No post found"
        content="You may be in the wrong place!"
        image={<img src={notFoundImg} height={234} width={350} alt="404" />}
      />
    );
  }

  const {
    post: {
      _id,
      title,
      tags,
      des,
      postTime: loadTime,
      author: { userPhoto, userName },
      voteCount: { upVote, downVote },
      commentCount,
    },
    comments,
  } = postData;

  const renderTags = tags?.map((tagEle, idx) => (
    <Badge
      key={`post-tag-${idx}`}
      className="capitalize select-none"
      colorType="light"
      color="gray"
      badgeType="outline"
    >
      {tagEle}
    </Badge>
  ));

  const shareUrl = `${window.location.origin}/post/${postId}`;
  const postTime = moment(loadTime).format("MMM Do YY");

  return (
    <div className="my-6 space-y-2">
      <Link to="/post">
        <Button className="btn" size="xs" type="primary">
          <BsArrowLeftShort size={30} />
          <span className="ml-2">Back</span>
        </Button>
      </Link>
      <div className="flex md:flex-row flex-col justify-between py-2">
        <div>
          <h1 className="md:text-4xl text-3xl font-bold">{title}</h1>
          <div className="font-medium text-gray-600">Created: {postTime}</div>
          <div className="flex items-center gap-2 my-2">
            <div className="text-xl font-semibold">Share: </div>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton url={shareUrl}>
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
            <TwitterShareButton url={shareUrl}>
              <XIcon size={32} round />
            </TwitterShareButton>
          </div>
        </div>
        <PostVote
          postId={postId}
          refetch={refetch}
          downVote={downVote}
          upVote={upVote}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Avatar shape="circle" size="sm" bordered img={userPhoto} />
        <h6 className="text-lg font-medium">{userName}</h6>
      </div>
      <div className="flex flex-wrap gap-1 mt-1">{renderTags}</div>
      <p>{des}</p>
      <AllComments
        postId={_id}
        commentCount={commentCount}
        comments={comments}
      />
      {/* <div className="py-3 space-y-3">{renderComments}</div>
      <form className="space-y-3" onSubmit={handleSubmit(submitData)}>
        <Textarea
          placeholder="Leave a comment..."
          withBg={true}
          color="info"
          border={true}
          rows={4}
          {...register("comment", { required: true })}
        />
        <CheckError error={errors} inputName="comment" fieldName="required">
          Comment is required
        </CheckError>
        <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
        <button
          className="w-full bg-blue-600 text-white rounded-md p-2 font-medium active:focus:scale-95 duration-150"
          type="submit"
        >
          Add comment
        </button>
      </form> */}
    </div>
  );
};

const PostVote = ({ postId, upVote, downVote, refetch }) => {
  const axios = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleVote = async (vote) => {
    try {
      if (!user) {
        const { isConfirmed } = await Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "You need to login/register for do this!",
          confirmButtonText: "login",
        });
        if (isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
        return;
      }
      const body =
        vote === "up"
          ? { upVote: parseInt(upVote) + 1, downVote }
          : { downVote: parseInt(downVote) + 1, upVote };

      const { data } = await axios.patch(`/api/posts/${postId}`, body, {
        params: { email: user.email },
      });

      if (!data?.success) {
        throw new Error(data?.message);
      }

      if (data?.data?.modifiedCount) {
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex md:flex-col flex-row gap-2">
      <Button
        onClick={() => handleVote("up")}
        size="xs"
        type="outlinePrimary"
        className="active:focus:scale-95 duration-100"
      >
        <BsFileArrowUpFill size={20} />
        <span className="text-xl font-bold">{upVote}</span>
      </Button>
      <Button
        onClick={() => handleVote("down")}
        size="xs"
        type="outlinePrimary"
        className="active:focus:scale-95 duration-100"
      >
        <BsFileArrowDown size={20} />
        <span className="text-xl font-bold">{downVote}</span>
      </Button>
    </div>
  );
};

PostVote.propTypes = {
  postId: PropTypes.string,
  upVote: PropTypes.number,
  downVote: PropTypes.number,
  refetch: PropTypes.func,
};

export default Post;
