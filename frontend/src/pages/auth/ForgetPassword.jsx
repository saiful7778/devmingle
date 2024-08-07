import EmailInput from "@/components/EmailInput";
import useAuth from "@/hooks/useAuth";
import { useAxios } from "@/hooks/useAxios";
import errorStatus from "@/lib/errorStatus";
import { Spinner } from "keep-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const [spinner, setSpinner] = useState(false);
  const { forgetPassword } = useAuth();
  const recaptcha = useRef(null);
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitData = async (e) => {
    try {
      setSpinner(true);
      const email = e.email;
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

        await forgetPassword(email);
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
        Forget password
      </h3>
      <form onSubmit={handleSubmit(submitData)} className="space-y-3">
        <EmailInput register={register} errors={errors} />
        <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
        <button
          className="w-full bg-blue-600 text-white rounded-md p-2 font-medium active:focus:scale-95 duration-150"
          type="submit"
          disabled={spinner}
        >
          {spinner ? <Spinner color="info" size="sm" /> : "Forget password"}
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
