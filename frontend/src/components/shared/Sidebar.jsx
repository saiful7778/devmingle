import cn from "@/lib/cn";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SiteLogo from "../SiteLogo";
import { Button } from "keep-react";
import { LuMenuSquare } from "react-icons/lu";
import { sidebarLinks } from "@/lib/staticData";
import useAuth from "@/hooks/useAuth";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { userData } = useAuth();

  const renderSidebarLinks = sidebarLinks?.map((sideNav, idx) => {
    if (sideNav.access.includes(userData?.userRole)) {
      return <SidebarItem key={`sidebar-item-${idx}`} inputData={sideNav} />;
    }
  });

  return (
    <aside
      className={cn(
        "fixed z-40 top-0 h-screen w-[220px] bg-gray-200 border-r border-gray-300",
        showSidebar ? "left-0" : "right-full"
      )}
    >
      <div className="h-screen p-4 w-full overflow-y-auto">
        <SiteLogo />
        <ul className="flex flex-col gap-1">{renderSidebarLinks}</ul>
      </div>
      <div className="absolute top-0 pl-2 left-full z-50 w-screen p-2 border border-gray-300 bg-white">
        <div className="flex gap-2 items-center">
          <Button
            className="active:focus:scale-95 duration-100"
            size="xs"
            type="primary"
            circle={true}
            onClick={() => setShowSidebar((l) => !l)}
          >
            <LuMenuSquare size={20} />
          </Button>
          <SiteLogo />
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

const SidebarItem = ({ inputData }) => {
  return (
    <li>
      <NavLink
        className={({ isActive, isPending }) =>
          (isPending ? "animate-pulse" : isActive ? "bg-gray-100" : "") +
          " capitalize py-1 px-2 rounded-md hover:bg-gray-100 w-full block border border-gray-300"
        }
        to={inputData.path}
      >
        {inputData.navName}
      </NavLink>
    </li>
  );
};

SidebarItem.propTypes = {
  inputData: PropTypes.object,
};

export default Sidebar;
