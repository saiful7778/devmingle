import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import notFoundImg from "@/assets/images/not-found.svg";
import { Empty, Tag } from "keep-react";
import UserPost from "@/components/UserPost";

const MyPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();

  const {
    data: myPost,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["mypost", user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/posts/user_posts/${userData?._id}`,
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

  if (myPost?.length === 0) {
    return (
      <Empty
        title="Oops! No post found"
        content="Please add some post"
        buttonText="Add new post"
        redirectBtnSize="md"
        redirectUrl="/dashboard/add_post"
        image={<img src={notFoundImg} height={234} width={350} alt="404" />}
      />
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="flex items-center gap-5 my-5 px-6">
        <p className="text-body-1 font-semibold text-metal-600">Total posts:</p>
        <Tag color="info">{myPost.length} post</Tag>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {myPost?.map((post, idx) => (
          <UserPost
            key={`user-post-${idx}`}
            inputData={post}
            reFatch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPost;
