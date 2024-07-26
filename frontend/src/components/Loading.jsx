import cn from "@/lib/cn";
import { Spinner } from "keep-react";
import PropTypes from "prop-types";

const Loading = ({ fullPage }) => {
  return (
    <div
      className={cn(
        "w-full flex justify-center items-center",
        fullPage && "h-[50vh]"
      )}
    >
      <Spinner color="info" size="xl" />
    </div>
  );
};

Loading.propTypes = {
  fullPage: PropTypes.bool,
};

export default Loading;
