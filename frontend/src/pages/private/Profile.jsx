import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Empty } from "keep-react";
import notFoundImg from "@/assets/images/not-found.svg";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa6";

const Profile = () => {
  const { user, userData, token } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["profile", user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users/${userData?._id}`, {
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

  const { badge, userEmail, userName, userPhoto, userRole } = data;

  return (
    <div className="flex sm:flex-row my-16 flex-col items-center gap-4">
      <Avatar
        className="ml-2 cursor-pointer rounded-full bg-gray-200"
        shape="circle"
        size="2xl"
        bordered={true}
        img={userPhoto}
      />
      <div>
        <div className="flex gap-2">
          <h3 className="text-3xl leading-6 font-semibold">{userName}</h3>
          <Badge
            className="capitalize border border-gray-300"
            size="xs"
            colorType="light"
            color={badge === "gold" ? "warning" : "info"}
            icon={<HiOutlineBadgeCheck size={15} />}
            iconPosition="left"
          >
            {badge}
          </Badge>
        </div>
        <p className="text-sm">{userEmail}</p>
        <div className="flex gap-2 mt-2">
          <Badge
            size="sm"
            colorType="strong"
            badgeType="outline"
            color="warning"
            icon={<FaUserAstronaut />}
            iconPosition="right"
          />
          <h6 className="capitalize font-medium">: {userRole}</h6>
        </div>
      </div>
    </div>
  );
};

export default Profile;
