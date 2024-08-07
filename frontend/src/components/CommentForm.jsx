import { Spinner, Textarea } from "keep-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputError from "./InputError";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxios, useAxiosSecure } from "@/hooks/useAxios";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";

const CommentForm = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const { user, userData, token } = useAuth();
  const recaptcha = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitData = async (e) => {
    try {
      setLoading(true);
      if (!user) {
        const { isConfirmed } = await Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "You need to login/register for do this!",
          confirmButtonText: "login",
        });
        if (isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
        return;
      }

      if (recaptcha.current) {
        const captchaValue = recaptcha.current.getValue();

        if (!captchaValue) {
          Swal.fire({
            icon: "warning",
            text: "Please verify the reCAPTCHA!",
          });
          setLoading(false);
          return;
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

        const { data } = await axiosSecure.post(
          `/api/posts/comments/${postId}`,
          {
            details: e.comment,
          },
          {
            params: {
              userEmail: user?.email,
              userId: userData?._id,
            },
            headers: {
              Authorization: token,
            },
          }
        );

        if (!data?.success) {
          throw new Error("Something went wrong");
        }

        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      } else {
        throw new Error("Error from reCaptcha");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitData)}>
      <Textarea
        placeholder="Leave a comment..."
        withBg={true}
        color="info"
        border={true}
        rows={4}
        disabled={loading}
        {...register("comment", { required: true })}
      />
      <InputError error={errors} inputName="comment" fieldName="required">
        Comment is required
      </InputError>
      <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
      <button
        className="w-full bg-blue-600 text-white rounded-md p-2 font-medium active:focus:scale-95 duration-150"
        type="submit"
        disabled={loading}
      >
        {loading ? <Spinner color="info" size="sm" /> : "Add comment"}
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string,
};

export default CommentForm;
