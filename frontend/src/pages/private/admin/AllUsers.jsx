import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Button, Empty, Table, Tag } from "keep-react";
import notFoundImg from "@/assets/images/not-found.svg";
import { FaUserAstronaut, FaUsers } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useState } from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { user, userData, token } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/users", {
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

  if (allUsers?.length === 0) {
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
            Total member:
          </p>
          <Tag color="info" leftIcon={<FaUsers />}>
            {allUsers.length} Member
          </Tag>
        </div>
      </Table.Caption>
      <Table.Head className="bg-gray-300 border border-gray-400">
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-14 py-1 px-2">
          #No
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg min-w-[400px] py-1 px-2">
          User details
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-fit py-1 px-2">
          Role
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-fit py-1 px-2">
          Total post
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-fit py-1 px-2">
          Badge
        </Table.HeadCell>
        <Table.HeadCell className="text-gray-500 border-r border-r-gray-400 text-lg w-fit py-1 px-2">
          Action
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="border border-gray-300">
        {allUsers?.map((ele, idx) => (
          <TableRow
            key={`users-${idx}`}
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
  const { _id, userName, userEmail, userPhoto, userRole, postCount, badge } =
    inputData || {};

  const { user, userData, token } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [buttonDisable, setButtonDisable] = useState(
    userRole === "admin" ? true : false
  );

  const handleAdmin = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        icon: "info",
        title: "Are you sure?",
        text: `Make "${userName}" admin account.`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (isConfirmed) {
        Swal.fire({
          title: "Loading....",
          didOpen: () => {
            Swal.showLoading();
          },
          showConfirmButton: false,
        });

        const { data } = await axiosSecure.patch(
          `/api/users/${_id}`,
          { userRole: "admin" },
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

        if (data?.data?.modifiedCount === 1) {
          Swal.fire({
            title: "Successfully!",
            text: `"${userName}" is admin.`,
            icon: "success",
          });
          setButtonDisable(true);
        } else {
          Swal.fire({
            title: "Error!",
            text: `"${userName}" is not admin.`,
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
    <Table.Row className="hover:bg-gray-200 even:border-gray-300 even:bg-slate-200">
      <Table.Cell className="border-r-gray-300 py-1 px-2 text-center font-bold text-xl">
        {count}
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2">
        <div className="flex items-center gap-2">
          <Avatar shape="circle" bordered={true} img={userPhoto} size="md" />
          <div>
            <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
              {userName}
            </p>
            <span>{userEmail}</span>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2 flex flex-col items-center">
        {userRole === "user" ? (
          <FaUsers size={20} />
        ) : (
          <FaUserAstronaut size={20} />
        )}
        {userRole}
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2">
        {postCount}
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2 capitalize">
        <Badge
          className="capitalize border border-gray-300"
          size="sm"
          colorType="light"
          color={badge === "gold" ? "warning" : "info"}
        >
          {badge}
        </Badge>
      </Table.Cell>
      <Table.Cell className="border-r-gray-300 py-1 px-2">
        <div className=" flex gap-2 items-center h-full whitespace-nowrap">
          <Button
            type="primary"
            color="info"
            onClick={handleAdmin}
            className="[&>span]:disabled:cursor-not-allowed btn"
            disabled={buttonDisable}
          >
            Make admin
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  inputData: PropTypes.object,
  count: PropTypes.number,
  reFatch: PropTypes.func,
};

export default AllUsers;
