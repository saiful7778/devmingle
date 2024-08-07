import Loading from "@/components/Loading";
import PropTypes from "prop-types";
import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateProtector = ({ children }) => {
  const location = useLocation();
  const { user, loader } = useAuth();

  if (loader) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

PrivateProtector.propTypes = {
  children: PropTypes.node,
};

export default PrivateProtector;
