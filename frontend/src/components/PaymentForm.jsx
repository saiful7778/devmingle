import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Spinner } from "keep-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PaymentForm = ({ clientSecret }) => {
  const { user, userData, token } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      setIsLoading(true);
      setMessage("");
      const card = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        }
      );

      if (error) {
        console.log("[error]", error);
        setMessage(error.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          const { data } = await axiosSecure.patch(
            "/api/payment/update_badge",
            {},
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

          if (data?.data?.modifiedCount === 1) {
            Swal.fire({
              icon: "success",
              text: "Congratulations your now a gold user",
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Payment faild",
            });
          }
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-blue-600 w-full mt-4 text-white rounded-md p-2 font-medium active:focus:scale-95 duration-150"
        disabled={isLoading || !stripe || !elements}
        type="submit"
      >
        <span id="button-text">
          {isLoading ? <Spinner color="info" size="sm" /> : "Pay now"}
        </span>
      </button>
      {message && (
        <div className="leading-3 text-sm text-red-500 mt-1">{message}</div>
      )}
    </form>
  );
};

PaymentForm.propTypes = {
  clientSecret: PropTypes.string,
};

export default PaymentForm;
