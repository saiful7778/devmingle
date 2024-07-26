import { Link } from "react-router-dom";

const SiteLogo = () => {
  return (
    <Link to="/" className="flex flex-col">
      <span className="text-[#164863] leading-5 font-bold text-3xl">DEV</span>
      <span className="text-[#9BBEC8] uppercase font-medium text-base">
        Mingle
      </span>
    </Link>
  );
};

export default SiteLogo;
