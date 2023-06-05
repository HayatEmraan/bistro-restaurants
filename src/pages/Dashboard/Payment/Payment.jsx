import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);
const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0);
  const price = parseFloat(total.toFixed(2));
  return (
    <>
      (
      <div className="w-full mt-[20%] space-y-8">
        <h2 className="font-cinzel text-3xl font-medium text-center ">
          Payment
        </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} price={price} />
        </Elements>
      </div>
      )
    </>
  );
};

export default Payment;
