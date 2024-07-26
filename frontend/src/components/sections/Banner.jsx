import bannerBg from "@/assets/images/banner-bg.jpg";
import PostSearch from "../PostSearch";

const Banner = () => {
  return (
    <div
      className="w-full h-[80vh] overflow-hidden rounded-md flex justify-center items-center p-2"
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url('${bannerBg}')`,
      }}
    >
      <PostSearch />
    </div>
  );
};

export default Banner;
