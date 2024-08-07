import { Avatar } from "keep-react";
import PropTypes from "prop-types";

const AnnouncementItem = ({ inputData }) => {
  const {
    title,
    details,
    author: { userName, userPhoto },
  } = inputData || {};

  return (
    <div className="flex flex-col gap-3 p-3 shadow-md bg-white rounded-md border border-blue-500">
      <div className="flex-1">
        <h3 className="md:text-xl font-semibold">{title}</h3>
        <p className="text-sm">{details}</p>
      </div>
      <div className="flex gap-1 items-center">
        <Avatar shape="circle" size="sm" bordered img={userPhoto} />
        <h6 className="text-lg font-medium">{userName}</h6>
      </div>
    </div>
  );
};

AnnouncementItem.propTypes = {
  inputData: PropTypes.object,
};

export default AnnouncementItem;
