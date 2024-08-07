import InputError from "@/components/InputError";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { Spinner, Textarea, TextInput } from "keep-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddAnnouncement = () => {
  const [spinner, setSpinner] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitData = async (e) => {
    try {
      setSpinner(true);

      const { data } = await axiosSecure.post(
        "/api/announcements",
        {
          title: e.title,
          details: e.des,
        },
        {
          params: { userEmail: user?.email, userId: userData?._id },
          headers: {
            Authorization: token,
          },
        }
      );

      if (!data?.success) {
        throw new Error(data?.message);
      }

      Swal.fire({
        icon: "success",
        title: "Announcement is created",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
      });
    } finally {
      reset();
      setSpinner(false);
    }
  };

  return (
    <>
      <h4 className="text-blue-600 text-4xl md:text-5xl font-bold text-center">
        Announcement
      </h4>
      <p className="text-center text-gray-500 text-sm mt-2 mb-5">
        Author image and name is automatically added by logged user
      </p>
      <form className="space-y-3" onSubmit={handleSubmit(submitData)}>
        <div>
          <TextInput
            placeholder="Title"
            type="text"
            {...register("title", {
              required: true,
            })}
          />
          <InputError error={errors} inputName="title" fieldName="required">
            Title is required
          </InputError>
        </div>
        <div>
          <Textarea
            placeholder="Description"
            withBg={true}
            color="gray"
            border={true}
            rows={4}
            {...register("des", {
              required: true,
            })}
          />
          <InputError error={errors} inputName="des" fieldName="required">
            Description is required
          </InputError>
        </div>
        <button
          className="w-full bg-blue-600 text-white rounded-md p-2 font-medium active:focus:scale-95 duration-150"
          type="submit"
          disabled={spinner}
        >
          {spinner ? <Spinner color="info" size="sm" /> : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AddAnnouncement;
