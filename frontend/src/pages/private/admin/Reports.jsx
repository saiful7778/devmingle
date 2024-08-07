import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import notFoundImg from "@/assets/images/not-found.svg";
import { Button, Empty, Table, Tag } from "keep-react";
import { GoReport } from "react-icons/go";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();

  const {
    data: allReports,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reports", user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/posts/reports", {
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

  if (allReports?.length === 0) {
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
            Total Reports:
          </p>
          <Tag color="error" leftIcon={<GoReport />}>
            {allReports.length} report
          </Tag>
        </div>
      </Table.Caption>
      <Table.Head className="bg-gray-300 border border-gray-400">
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-14 py-1 px-2">
          #No
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[200px] py-1 px-2">
          Post Title
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[350px] py-1 px-2">
          Comment
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-fit py-1 px-2">
          Report
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[220px] py-1 px-2">
          Report user
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-fit py-1 px-2">
          Action
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="border border-gray-300">
        {allReports?.map((ele, idx) => (
          <TableRow
            key={`reports-${idx}`}
            inputData={ele}
            count={idx + 1}
            reFatch={refetch}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const TableRow = ({ inputData, count, reFatch }) => {
  const {
    _id,
    feedback,
    comment: {
      details,
      post: { _id: postId, title },
    },
    user: { userName, userEmail },
  } = inputData || {};

  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();

  const handleDelete = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
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

        const { data } = await axiosSecure.delete(
          `/api/posts/reports/admin/${_id}`,
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

        if (data?.data?.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Delete incomplate!",
            icon: "error",
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete incomplate!",
        text: err.message,
      });
    } finally {
      reFatch();
    }
  };

  return (
    <Table.Row className="hover:bg-gray-200 even:border-gray-300 even:bg-slate-200 text-sm">
      <Table.Cell className="border-r-gray-300 py-1 px-2 text-center font-bold text-lg">
        {count}
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2">
        <Link to={`/post/${postId}`} className="hover:underline">
          {title}
        </Link>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2">{details}</Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2 capitalize">
        {feedback}
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2 whitespace-nowrap">
        <p className="leading-4 font-semibold">{userName}</p>
        <p>{userEmail}</p>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 p-2">
        <Button
          onClick={handleDelete}
          size="sm"
          color="error"
          className="btn py-1"
          type="primary"
        >
          <FaTrashCan />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  inputData: PropTypes.object,
  count: PropTypes.number,
  reFatch: PropTypes.func,
};

export default Reports;
