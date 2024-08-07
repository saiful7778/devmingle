import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Dropdown, Empty, Modal, Table, Tag } from "keep-react";
import { useParams } from "react-router-dom";
import notFoundImg from "@/assets/images/not-found.svg";
import { GoCommentDiscussion } from "react-icons/go";
import PropTypes from "prop-types";
import { useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";

const Comments = () => {
  const { postId } = useParams();
  const { user, userData, token } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: commentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", "comments", postId, user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/posts/comments/${postId}`, {
        params: { userEmail: user?.email, userId: userData?._id },
        headers: {
          Authorization: token,
        },
      });

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

  if (commentData?.length === 0) {
    return (
      <Empty
        title="Oops! No comment found"
        image={<img src={notFoundImg} height={234} width={350} alt="404" />}
      />
    );
  }

  return (
    <Table
      showBorder={true}
      showBorderPosition="right"
      striped={true}
      hoverable={true}
    >
      <Table.Caption>
        <div className="flex items-center gap-5 my-5 px-6">
          <p className="text-body-1 font-semibold text-metal-600">
            Total Comments:
          </p>
          <Tag color="info" leftIcon={<GoCommentDiscussion />}>
            {commentData.length}
          </Tag>
        </div>
      </Table.Caption>
      <Table.Head className="bg-gray-300 border border-gray-400">
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[200px] py-1 px-2">
          User
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[300px] py-1 px-2">
          Comment
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[200px] py-1 px-2">
          Feedback
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[200px] py-1 px-2">
          Report
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="border border-gray-300">
        {commentData?.map((comment, idx) => (
          <TableRow key={`comment-row-${idx}`} inputData={comment} />
        ))}
      </Table.Body>
    </Table>
  );
};

const TableRow = ({ inputData }) => {
  const { user, userData, token } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { _id, user: authorData, details, createdAt } = inputData || {};

  const [excerpt, excerptedComment] = commnetExcerpt(details);

  const submitReport = async () => {
    try {
      const { data } = await axiosSecure.post(
        `/api/posts/reports/${_id}`,
        {
          feedback,
        },
        {
          params: { userEmail: user?.email, userId: userData?._id },
          headers: {
            Authorization: token,
          },
        }
      );

      if (!data?.success) {
        throw new Error(data?.message);
      }

      Swal.fire({
        icon: "success",
        text: "Report is added",
      });

      setDisableButton(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    }
  };

  const handleOptions = (optionName) => {
    setFeedback(optionName);
    setDisableButton(false);
  };

  return (
    <Table.Row className="hover:bg-gray-200 even:border-gray-300 even:bg-slate-200">
      <Table.Cell className="border-r-gray-300 py-1 p-2">
        <div className="flex items-center gap-2">
          <Avatar
            shape="circle"
            bordered={true}
            img={authorData?.userPhoto}
            size="md"
          />
          <div>
            <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
              {authorData?.userName}
            </p>
            <span>{authorData?.userEmail}</span>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 p-2 text-sm">
        {excerpt ? (
          <div>
            <p>
              {excerptedComment}
              <button
                type="button"
                onClick={() => setShowModal((l) => !l)}
                className="inline-block ml-2 text-blue-600 underline"
              >
                Read....
              </button>
            </p>
            <Modal
              position="center"
              show={showModal}
              icon={<GoCommentDiscussion size={25} />}
              onClose={() => setShowModal((l) => !l)}
            >
              <Modal.Header>Comment</Modal.Header>
              <Modal.Body>
                <p className="text-gray-500">{details}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button type="primary" onClick={() => setShowModal((l) => !l)}>
                  Done
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          <p>{excerptedComment}</p>
        )}
        <p className="text-sm font-medium mt-2">
          Posted: {moment(createdAt).format("MMM Do YY")}
        </p>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 p-2">
        <Dropdown
          label="Feedback"
          size="xs"
          type="primary"
          dismissOnClick={true}
        >
          <Dropdown.Item onClick={() => handleOptions("spam")}>
            Spam
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOptions("hateful")}>
            Hateful
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOptions("misleading")}>
            Misleading
          </Dropdown.Item>
        </Dropdown>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 p-2">
        <Button
          type="primary"
          color="error"
          onClick={submitReport}
          className="[&>span]:disabled:cursor-not-allowed "
          disabled={disableButton}
        >
          Report
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  inputData: PropTypes.object,
};

const commnetExcerpt = (comment) => {
  const commentLength = comment.split(" ");
  if (commentLength.length > 20) {
    return [true, commentLength.slice(0, 21).join(" ")];
  }
  return [false, comment];
};

export default Comments;
