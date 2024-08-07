import PropTypes from "prop-types";

const AuthLayout = ({ children }) => {
  return (
    <div className="lg:w-1/2 bg-white w-full mx-auto rounded-lg shadow-md p-4">
      {children}
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;
