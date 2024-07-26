import { TextInput } from "keep-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import InputError from "./InputError";

const Password = ({ errors, register }) => {
  const [password, setPassword] = useState(false);

  return (
    <>
      <div className="relative">
        <TextInput
          placeholder="Password"
          type={password ? "text" : "password"}
          {...register("password", {
            required: "Minimum 6 characters password",
            pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/,
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        <button
          onClick={() => setPassword((l) => !l)}
          className="absolute top-1/2 cursor-pointer -translate-y-1/2 right-2 z-30 text-gray-500 p-2"
          type="button"
        >
          {password ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
        </button>
      </div>
      <InputError error={errors} inputName="password" fieldName="required">
        Password is required
      </InputError>
      <InputError error={errors} inputName="password" fieldName="pattern">
        <div className="leading-4">
          Password required:
          <ul className="ml-5 list-disc">
            <li>minimum 6 characters</li>
            <li>numbers</li>
            <li>uppercase</li>
            <li>lowercase</li>
            <li>special character</li>
          </ul>
        </div>
      </InputError>
    </>
  );
};

Password.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default Password;
