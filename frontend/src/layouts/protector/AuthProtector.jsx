import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AuthProtector = ({ children }) => {
  const { user, loader } = useAuth();

  if (loader) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

AuthProtector.propTypes = {
  children: PropTypes.node,
};

export default AuthProtector;
