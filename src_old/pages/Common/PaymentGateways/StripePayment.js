import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import './index.css'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { createStripeIntent } from '../../../Services/Store/Common/registrants/registrants.action';
import { registrantsSelector } from "../../../Services/Store/Common/registrants/registrants.selector";
import { displayErrorMessage, displaySuccessMessage } from "../../../Services/Helpers/helper";
import TYPES from '../../../Services/Constant/types';

const CheckoutForm = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [regId, setRegId] = useState("");
  // const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrantsData = useSelector(registrantsSelector);

  useEffect(() => {
    const loginCheck = JSON.parse(sessionStorage.getItem("adminToken"))
      ? JSON.parse(sessionStorage.getItem("adminToken"))
      : JSON.parse(sessionStorage.getItem("clientToken"))
      ? JSON.parse(sessionStorage.getItem("clientToken"))
      : "";
    if (!loginCheck) {
      navigate("/");
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    if (lAccountID) {
      setUserId(lAccountID);
    }
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    if (lEventID) {
      setEventId(lEventID);
    }
    const lRegID = JSON.parse(sessionStorage.getItem("regId"));
    if (lRegID) {
      setRegId(lRegID);
    }
  });

  useEffect(()=>{
    if(registrantsData.stripeDetails && registrantsData.stripeDetails.error_code===0){
      // setClientSecret(registrantsData.stripeDetails.result)
      const clientSecret = registrantsData.stripeDetails.result

      const confirmPayment = async () => {
        const { error } = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          clientSecret,
          confirmParams: {
            return_url: "http://localhost:3000/regInfo",
          },
        });
        return error
      }

      const paymentError = confirmPayment();      

      console.log('paymentError',paymentError)
  
      if (paymentError) {
        displayErrorMessage('paymentFailed');
      } else {
        displaySuccessMessage('paymentSuccess');
      }
    }
  },[registrantsData.stripeDetails])

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const {error: submitError} = await elements.submit();
    
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    dispatch(createStripeIntent({lAccountID:userId, lEventID: eventId, lRegID: regId}));   
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe(TYPES["STRIPE_PUBLISHABLE_KEY"]);

const options = {
  mode: "payment",
  amount: 1,
  currency: "usd",
  appearance: {
    /*...*/
  },
};

const StripePayment = () => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements>
);

export default StripePayment;
