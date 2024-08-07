import Loading from "@/components/Loading";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import notFoundImg from "@/assets/images/not-found.svg";
import { Empty } from "keep-react";
import AnnouncementItem from "@/components/AnnouncementItem";

const AllAnnouncement = () => {
  const axios = useAxios();

  const {
    data: announcements,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axios.get("/api/announcements");
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

  if (announcements?.length === 0) {
    return (
      <Empty
        title="Oops! No announcement found"
        image={<img src={notFoundImg} height={234} width={350} alt="404" />}
      />
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {announcements?.map((ele, idx) => (
          <AnnouncementItem key={`announcement-${idx}`} inputData={ele} />
        ))}
      </div>
    </div>
  );
};

export default AllAnnouncement;
