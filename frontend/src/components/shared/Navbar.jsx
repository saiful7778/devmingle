import useAuth from "@/hooks/useAuth";
import { useAxios } from "@/hooks/useAxios";
import { navLinks } from "@/lib/staticData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Popover, Spinner } from "keep-react";
import { IoCloseCircleOutline, IoNotifications } from "react-icons/io5";
import { LuMenuSquare } from "react-icons/lu";
import SiteLogo from "../SiteLogo";
import PropTypes from "prop-types";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logout } = useAuth();

  const renderNavLinks = navLinks?.map((nav, idx) => (
    <li key={`nav-link-${idx}`}>
      <NavLink
        className={({ isActive, isPending }) =>
          (isPending ? "animate-pulse" : isActive ? "active" : "") + " nav-link"
        }
        to={nav.path}
      >
        {nav.navName}
      </NavLink>
    </li>
  ));

  return (
    <>
      <nav className="flex items-center justify-between gap-2 py-2">
        <div className="flex gap-2 items-center">
          <Button
            className="active:focus:scale-95 duration-100 md:hidden"
            size="xs"
            type="primary"
            circle={true}
            onClick={() => setMobileMenu((l) => !l)}
          >
            <LuMenuSquare size={20} />
          </Button>
          <SiteLogo />
        </div>
        <div className="flex gap-2 items-center">
          <ul className="hidden md:flex gap-2">{renderNavLinks}</ul>
          <AnnouncementNotify />
          {user ? <UserLogged user={user} logout={logout} /> : <UserLogout />}
        </div>
      </nav>
      <div
        className={`fixed z-[1000] top-0 ${
          mobileMenu ? "left-0" : "-left-full"
        } min-h-screen p-4 shadow-md bg-white text-center duration-300 md:hidden`}
      >
        <Button
          className="active:focus:scale-95 duration-100 mx-auto mb-6"
          size="xs"
          type="primary"
          circle={true}
          onClick={() => setMobileMenu((l) => !l)}
        >
          <IoCloseCircleOutline size={20} />
        </Button>
        <ul className="space-y-3">{renderNavLinks}</ul>
      </div>
    </>
  );
};

const AnnouncementNotify = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const { data: announcementCount, isPending } = useQuery({
    queryKey: ["announcement", "count"],
    queryFn: async () => {
      const { data } = await axios.get("/api/announcements/count");
      if (!data?.success) {
        throw new Error(data?.message);
      }
      return data?.data;
    },
  });

  return (
    <button onClick={() => navigate("/announcement")} className="relative">
      <IoNotifications size="30" />
      <div className="bg-amber-500 absolute rounded-3xl flex items-center justify-center w-[30px] h-[15px] -top-px -right-3 text-body-6">
        {isPending ? (
          <Spinner size="xs" color="info" />
        ) : (
          announcementCount?.count
        )}
      </div>
    </button>
  );
};

const UserLogout = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/login")}
      className="ml-2 p-0 btn"
      size="xs"
      type="primary"
    >
      Join us
    </Button>
  );
};

const UserLogged = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <Popover
      showDismissIcon={false}
      showArrow={false}
      position="bottom-end"
      className="border border-gray-300 shadow-md whitespace-nowrap py-2 px-3 space-y-2 rounded-lg bg-white"
      additionalContent={
        <>
          <div>{user.displayName}</div>
          <div>
            <Link to="/dashboard/profile">Dashboard</Link>
          </div>
          <Button
            onClick={handleLogout}
            className="btn"
            size="xs"
            type="primary"
          >
            Logout
          </Button>
        </>
      }
    >
      <Avatar
        className="ml-2 cursor-pointer rounded-full bg-gray-200"
        shape="circle"
        size="md"
        bordered={true}
        img={user?.photoURL ? user?.photoURL : ""}
      />
    </Popover>
  );
};

UserLogged.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Navbar;