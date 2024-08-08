import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import notFoundImg from "@/assets/images/not-found.svg";
import PropTypes from "prop-types";
import { Avatar, Button, Empty, Table, Tag } from "keep-react";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageAnnouncement = () => {
  const axios = useAxiosSecure();
  const { user, userData, token } = useAuth();
  const {
    data: allAnnouncements,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allAnnouncement", user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axios.get("/api/announcements", {
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

  if (allAnnouncements?.length === 0) {
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
            Total Announcements:
          </p>
          <Tag color="info">{allAnnouncements.length}</Tag>
        </div>
      </Table.Caption>
      <Table.Head className="bg-gray-300 border border-gray-400">
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-14 py-1 px-2">
          #No
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[150px] py-1 px-2">
          Title
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[350px] py-1 px-2">
          Description
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[170px] py-1 px-2">
          Author
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-fit py-1 px-2">
          Action
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="border border-gray-300">
        {allAnnouncements?.map((ele, idx) => (
          <TableRow
            key={`announcement-${idx}`}
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
    title,
    details,
    author: { userName, userPhoto },
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

        const { data } = await axiosSecure.delete(`/api/announcements/${_id}`, {
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
        text: err.message,
      });
    } finally {
      reFatch();
    }
  };

  return (
    <Table.Row className="hover:bg-gray-200 even:border-gray-300 even:bg-slate-200 text-sm">
      <Table.Cell className="border-r-gray-300 py-1 px-2 text-center font-bold">
        {count}
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2">
        <h6>{title}</h6>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2">{details}</Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Avatar shape="circle" bordered={true} img={userPhoto} size="sm" />
          <p className="leading-4 font-medium">{userName}</p>
        </div>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 p-2">
        <Button
          onClick={handleDelete}
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

export default ManageAnnouncement;
