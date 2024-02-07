import React from "react";
import {
  AcceptHosted,
  FormComponent,
  FormContainer,
} from "react-authorize-net";
import { displayErrorMessage } from "../../../Services/Helpers/helper";

const AuthorizePayment = () => {
  const clientKey =
    "68mkacrNnYfV9fAq8an8W4WgPunY9D9akMAPhq3qX4bfJRP643z8twqDpL8T9bn2";
  const apiLoginId = "55aCf5dn9NAb";

  const onSuccessHandler = (response) => {
    console.log("response", response);
  };

  const onErrorHandler = (error) => {
    console.log("error", error);
    if (error && error.messages.message.length > 0) {
      displayErrorMessage(error.messages.message[0].text);
    }
  };
  return (
    <div className="App">
      <FormContainer
        environment="sandbox"
        onError={onErrorHandler}
        onSuccess={onSuccessHandler}
        amount={25}
        component={FormComponent}
        clientKey={clientKey}
        apiLoginId={apiLoginId}
      />
    </div>
  );
};

export default AuthorizePayment;
