import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = (props) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Description",
                    amount: {
                        currency_code: "USD",
                        value: props.amount ? props.amount : 0,
                    },
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
            props.setShow(false)
            props.paymentSuccess(true)
        }
    },[success]);

    return (
        <PayPalScriptProvider options={{ "client-id": 'AROYHYbC24vW3Te-5SmHYxc-5zZzCcXqNxWuQ8R19OFt5lvrmy925EXtFbbro28TGEhKG9JIU62V4iT9' }}>
            <div>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </div>
        </PayPalScriptProvider>
    );
}

export default PaypalPayment

