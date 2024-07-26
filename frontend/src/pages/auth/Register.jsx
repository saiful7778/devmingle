import { useState, useRef } from "react";
import { TextInput, Spinner } from "keep-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputError from "@/components/InputError";
import Password from "@/components/Password";
import EmailInput from "@/components/EmailInput";
import useAuth from "@/hooks/useAuth";
import { useAxios } from "@/hooks/useAxios";
import errorStatus from "@/lib/errorStatus";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import SocialAuth from "@/components/SocialAuth";

const Register = () => {
  const { register: signUp } = useAuth();

  const axios = useAxios();
  const recaptcha = useRef(null);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitData = async (e) => {
    setSpinner(true);

    try {
      const userName = e.fullName;
      const email = e.email;
      const pass = e.password;

      if (recaptcha.current) {
        const captchaValue = recaptcha.current.getValue();

        if (!captchaValue) {
          Swal.fire({
            icon: "warning",
            text: "Please verify the reCAPTCHA!",
          });
          return setSpinner(false);
        }

        const { data: reCaptchaRes } = await axios.post(
          "/api/reCaptcha/verify",
          {
            captchaValue,
          }
        );

        if (!reCaptchaRes?.success) {
          throw new Error("Invalid reCaptcha!");
        }

        const { user } = await signUp(email, pass);

        await updateProfile(user, {
          displayName: userName,
        });

        const { data } = await axios.post("/api/users", {
          userName: userName,
          userEmail: email,
          userToken: user.uid,
        });

        if (!data?.success) {
          throw new Error(data?.message);
        }

        Swal.fire({
          title: `"${userName}"`,
          text: "Account created successfully!",
          icon: "success",
        });
      }
    } catch (err) {
      errorStatus(err);
    } finally {
      navigate("/");
      reset();
      setSpinner(false);
    }
  };

  return (
    <>
      <h3 className="text-blue-600 text-5xl font-bold text-center mb-6">
        Register
      </h3>
      <form onSubmit={handleSubmit(submitData)} className="space-y-3">
        <TextInput
          placeholder="Full name"
          {...register("fullName", { required: true })}
        />
        <InputError error={errors} inputName="fullName" fieldName="required">
          Name is required
        </InputError>
        <EmailInput register={register} errors={errors} />
        <Password register={register} errors={errors} />
        <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
        <button
          className="w-full bg-blue-600 text-white rounded-md p-2 font-medium active:focus:scale-95 duration-150"
          type="submit"
        >
          {spinner ? <Spinner color="info" size="sm" /> : "REGISTER"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Do you have an account?{" "}
        <Link className="text-blue-600 italic underline" to="/login">
          login
        </Link>
      </p>
      <SocialAuth />
    </>
  );
};

export default Register;
