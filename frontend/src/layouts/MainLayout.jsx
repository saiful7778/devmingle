import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden text-gray-700 bg-gray-100 font-poppins">
      <div className="container w-full md:w-4/5 mx-auto p-2">
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
