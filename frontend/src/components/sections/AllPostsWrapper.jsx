import { postTags } from "@/lib/staticData";
import { Button } from "keep-react";
import { useState } from "react";
import PropTypes from "prop-types";
import AllPosts from "./AllPosts";

const AllPostsWrapper = () => {
  const [tag, setTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const renderTabButtons = postTags?.map((tab, idx) => (
    <TabButton
      key={`tag-${idx}`}
      tagName={tab.tagName}
      setTag={setTag}
      setCurrentPage={setCurrentPage}
    />
  ));

  return (
    <div className="my-20 space-y-8">
      <h2 className="text-center text-4xl font-bold">All posts</h2>
      <div className="text-center font-medium">
        {`Result of "${tag}" post tags`}
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <Button
          type="outlinePrimary"
          onClick={() => setTag("all")}
          className="btn capitalize"
        >
          all
        </Button>
        {renderTabButtons}
      </div>
      <AllPosts
        tag={tag}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

const TabButton = ({ tagName, setTag, setCurrentPage }) => {
  const handleTagSearch = () => {
    setTag(tagName);
    setCurrentPage(1);
  };

  return (
    <Button
      type="outlinePrimary"
      onClick={handleTagSearch}
      className="btn capitalize"
    >
      {tagName}
    </Button>
  );
};

TabButton.propTypes = {
  tagName: PropTypes.string,
  handleTagSearch: PropTypes.func,
  setTag: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default AllPostsWrapper;
