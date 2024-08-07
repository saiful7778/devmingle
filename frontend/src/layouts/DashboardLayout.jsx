import Sidebar from "@/components/shared/Sidebar";
import cn from "@/lib/cn";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="w-full min-h-screen overflow-x-hidden text-gray-700">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main
        className={cn(
          "p-2 mt-14 overflow-auto bg-gray-100",
          showSidebar ? "ml-[220px]" : "ml-0"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
