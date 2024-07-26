import { useAxios } from "@/hooks/useAxios";
import { Badge, SearchBar, Spinner } from "keep-react";
import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { postTags } from "@/lib/staticData";

const PostSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allPostTitle, setAllPostTitle] = useState([]);
  const axios = useAxios();

  const handleOnChange = async (e) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const searchTerm = e.target.value.toLowerCase();

      if (searchTerm && searchTerm !== "") {
        const { data } = await axios.get("/api/posts/search", {
          params: { q: searchTerm },
        });

        if (!data?.success) {
          throw new Error(data?.message);
        }
        setAllPostTitle(data?.data);
      } else {
        setAllPostTitle([]);
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative shadow-md">
      <SearchBar
        placeholder="Search Anything"
        addon={<FaMagnifyingGlass size={15} />}
        addonPosition="left"
        size="md"
        icon={<BiRightArrowAlt size={25} />}
        iconPosition="right"
        handleOnChange={handleOnChange}
      >
        <div className="flex gap-1 items-center mt-1">
          {postTags?.map((tagEle, idx) => (
            <Badge
              key={`tag-${idx}`}
              className={`capitalize select-none`}
              colorType="strong"
              color="success"
              badgeType="outline"
            >
              {tagEle.tagName}
            </Badge>
          ))}
        </div>
        <ul className="absolute top-full left-0 z-50 w-full rounded-md overflow-auto max-h-48 bg-gray-50 mt-1">
          <ShowResults
            isLoading={isLoading}
            isError={isError}
            allData={allPostTitle}
          />
        </ul>
      </SearchBar>
    </div>
  );
};

const ShowResults = ({ isLoading, isError, allData }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-2">
        <Spinner color="info" size="xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-2 text-xl font-semibold text-red-600">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="divide-y">
      {allData?.map((ele, idx) => (
        <Link
          key={`search-post-${idx}`}
          className="flex py-2 px-4"
          to={`/post/${ele?._id}`}
        >
          <span className="hover:underline">{ele?.title}</span>
          <span className="ml-auto">
            <BiRightArrowAlt size={25} />
          </span>
        </Link>
      ))}
    </div>
  );
};

ShowResults.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  allData: PropTypes.array,
};

export default PostSearch;
