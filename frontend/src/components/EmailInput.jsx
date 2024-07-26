import { TextInput } from "keep-react";
import InputError from "./InputError";
import PropTypes from "prop-types";

const EmailInput = ({ register, errors }) => {
  return (
    <>
      <TextInput
        placeholder="Email address"
        type="email"
        {...register("email", {
          required: "Email Address is required",
          pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      <InputError error={errors} inputName="email" fieldName="required">
        Email Address is required
      </InputError>
      <InputError error={errors} inputName="email" fieldName="pattern">
        Invalid email address
      </InputError>
    </>
  );
};

EmailInput.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default EmailInput;
