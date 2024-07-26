import PropTypes from "prop-types";

const InputError = ({ error, inputName, fieldName, children }) => {
  return (
    error[inputName]?.type === fieldName && (
      <div className="leading-3 text-sm text-red-500 mt-1">{children}</div>
    )
  );
};

InputError.propTypes = {
  error: PropTypes.object,
  inputName: PropTypes.string,
  fieldName: PropTypes.string,
  children: PropTypes.node,
};

export default InputError;
