import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PropTypes from "prop-types";
import Loading from "../Loading";
import { Empty, Pagination } from "keep-react";
import notFoundImg from "@/assets/images/not-found.svg";
import PostItem from "../PostItem";

const AllPosts = ({ tag, currentPage, setCurrentPage }) => {
  const axios = useAxios();
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 4;

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", { currentPage, itemsPerPage, tag }],
    queryFn: async () => {
      const { data } = await axios.get("/api/posts", {
        params: {
          queryPage: currentPage - 1,
          querySize: itemsPerPage,
          queryTag: tag,
        },
      });
      if (!data?.success) {
        throw new Error(data?.message);
      }
      if (tag === "all") {
        setTotalItems(data?.totalCount);
        return data.data;
      } else {
        setTotalItems(data?.count);
        return data.data;
      }
    },
  });

  if (isLoading) {
    return <Loading fullPage />;
  }

  if (isError) {
    console.error(error);
    return (
      <Empty
        title="Oops! No post found"
        content="You may be in the wrong place!"
        image={<img src={notFoundImg} height={234} width={350} alt="404" />}
      />
    );
  }

  const numberOfPage = Math.ceil(totalItems / itemsPerPage);

  const renderAllPosts = posts?.map((post, idx) => (
    <PostItem key={`post-item-${idx}`} inputData={post} />
  ));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderAllPosts}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={numberOfPage}
          iconWithOutText={true}
          prevNextShape="roundSquare"
        />
      </div>
    </>
  );
};

AllPosts.propTypes = {
  tag: PropTypes.string,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default AllPosts;
