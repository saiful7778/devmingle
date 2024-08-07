import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminProtector = ({ children }) => {
  const { user, userData, loader } = useAuth();

  if (loader) {
    return <Loading />;
  }
  if (user && userData?.userRole === "admin") {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

AdminProtector.propTypes = {
  children: PropTypes.node,
};

export default AdminProtector;
