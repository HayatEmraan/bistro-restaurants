import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import "./Common.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Toaster, toast } from "react-hot-toast";
import useCart from "../../../hooks/useCart";

const CheckoutForm = ({ cart, price }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [axiosInstance] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [, refetch] = useCart();
  useEffect(() => {
    if (price) {
      axiosInstance
        .post("/payment", { price })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [cart, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentMethod);
      setError("");
    }
    setProcessing(true);
    const { paymentIntent, error: paymentIntentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });
    if (paymentIntent.status === "succeeded") {
      toast.success("Payment Successful!");
      const payment = {
        paymentIntentId: paymentIntent.id,
        price: price,
        date: new Date(),
        status: "Pending",
        items: cart.map((item) => item._id),
        itemNames: cart.map((item) => item.name),
      };
      axiosInstance.post("/payments", payment).then((res) => {
        console.log(res.data);
        refetch();
      });
    }
    if (paymentIntentError) {
      toast.error("Payment failed!");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form onSubmit={handleSubmit} className="text-center">
        <CardElement className="w-1/2 mx-auto border p-4 rounded-md" />
        <button
          className="px-2 border rounded-md text-2xl font-cinzel mt-4"
          type="submit"
          disabled={!stripe || processing}
        >
          Pay
        </button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </>
  );
};

export default CheckoutForm;
