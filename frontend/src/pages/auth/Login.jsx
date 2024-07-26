import { useState, useRef } from "react";
import { Spinner } from "keep-react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import errorStatus from "@/lib/errorStatus";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { useAxios } from "@/hooks/useAxios";
import EmailInput from "@/components/EmailInput";
import Password from "@/components/Password";
import SocialAuth from "@/components/SocialAuth";

const Login = () => {
  const { login } = useAuth();
  const axios = useAxios();
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const recaptcha = useRef(null);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitData = async (e) => {
    setSpinner(true);
    try {
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

        const { user } = await login(email, pass);
        Swal.fire({
          icon: "success",
          title: user.displayName,
          text: "Account successfully logged in!",
        });
        navigate(location.state ? location.state.from.pathname : "/");
      }
    } catch (err) {
      errorStatus(err);
    } finally {
      reset();
      setSpinner(false);
    }
  };

  return (
    <>
      <h3 className="text-blue-600 text-5xl font-bold text-center mb-6">
        Login
      </h3>
      <form onSubmit={handleSubmit(submitData)} className="space-y-3">
        <EmailInput register={register} errors={errors} />
        <Password register={register} errors={errors} />
        <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
        <button
          className="w-full bg-blue-600 text-white rounded-md p-2 font-medium active:focus:scale-95 duration-150"
          type="submit"
        >
          {spinner ? <Spinner color="info" size="sm" /> : "LOGIN"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Don{`'`}t have any account?{" "}
        <Link className="text-blue-600 italic underline" to="/register">
          register
        </Link>
      </p>
      <SocialAuth />
    </>
  );
};

export default Login;
