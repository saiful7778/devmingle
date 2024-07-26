import { Button } from "keep-react";
import { FaGoogle } from "react-icons/fa6";

const SocialAuth = () => {
  return (
    <div className="flex gap-2 justify-center items-center mt-4">
      <Button
        type="outlinePrimary"
        color="success"
        size="xs"
        className="btn p-2 text-xl"
      >
        <span className="pr-2">
          <FaGoogle />
        </span>
        Google
      </Button>
    </div>
  );
};

export default SocialAuth;
