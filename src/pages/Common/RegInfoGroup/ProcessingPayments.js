import React, { useState, useEffect } from "react";
import "./index.css";
import { MultiSelect } from "react-multi-select-component";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import Questions from "./Questions";
import AuthorizePayment from "../PaymentGateways/AuthorizePayment";
import StripePayment from "../PaymentGateways/StripePayment";
import PaypalPayment from "../PaymentGateways/PaypalPayment";

export function ProcessingPayments(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [applyCheck] = useState(false);
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [paymentId, setPaymentId] = useState("");
  const [answersRegistrant, setAnswersRegistrant] = useState([]);

  const handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;
    setFields({ ...data });
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      if (props.userId && props.eventId && props.regId) {
        const postData = fields;
        postData["lAccountID"] = props.userId;
        postData["lEventID"] = props.eventId;
        postData["lRegID"] = props.regId;
        setShowModel(true);
      }
    }
  };

  const validateRegistration = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["x_amount"] || fields["x_amount"] === "") {
      formIsValid = false;
      errors["x_amount"] = "*Please enter Amount";
    }

    return {
      errors: errors,
      formIsValid: formIsValid,
    };
  };

  const _validateForm = () => {
    let formFields = fields;
    let response = validateRegistration(formFields, applyCheck);
    setErrors(response.errors);
    return response.formIsValid;
  };

  return (
    <>
      <div className="invitation-wrap regInfo">
        <div className="container">
          <div className="row login-wrap-new">
            <div className="col-md-12 col-xs-12">
              <div className="form-content">
                <form onSubmit={(event) => _handleSubmit(event)}>
                  <div className="row">
                    <div className="col-12 ">
                      {successStatus ? (
                        <div className="successMsg text-success">
                          Details saved Successfully
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Amount</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            name="x_amount"
                            placeholder="Enter Amount"
                            value={fields?.x_amount}
                            onChange={(event) => handleChange(event)}
                          />
                          {errors.x_amount ? (
                            <div className="errorMsg text-danger">
                              {errors.x_amount}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>First Name</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First Name"
                            name="x_first_name"
                            value={fields?.x_first_name}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Last Name</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            name="x_last_name"
                            value={fields?.x_last_name}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    {/*  <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Credit Card Number</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Credit Card Number"
                            name="x_card_num"
                            value={fields?.x_card_num}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Expiry Date</label>
                        </li>
                        <li>
                          <div className="col-md-3 col-xs-3 inline-block">
                            <select
                              className="form-control"
                              id="x_exp_month"
                              name="x_exp_month"
                            >
                              <option value="01" checked="">
                                01
                              </option>
                              <option value="02">02</option>
                              <option value="03">03</option>
                              <option value="04">04</option>
                              <option value="05">05</option>
                              <option value="06">06</option>
                              <option value="07">07</option>
                              <option value="08">08</option>
                              <option value="09">09</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                          </div>
                          <div className="col-md-3 col-xs-3 inline-block">
                            <select
                              className="form-control"
                              id="x_exp_year"
                              name="x_exp_year"
                            >
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                              <option value="2030">2030</option>
                              <option value="2031">2031</option>
                              <option value="2032">2032</option>
                            </select>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Card Code</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Card Code"
                            name="x_card_code"
                            value={fields?.x_card_code}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div> */}

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Company</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company"
                            name="x_company"
                            value={fields?.x_company}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Address</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address"
                            name="x_address"
                            value={fields?.x_address}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>City</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter City"
                            name="x_city"
                            value={fields?.x_city}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>State</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter State"
                            name="x_state"
                            value={fields?.x_state}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Zip</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Zip"
                            name="x_zip"
                            value={fields?.x_zip}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <ul>
                        <li>
                          <label>Country</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Country"
                            name="x_country"
                            value={fields?.x_country}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>

                  <button type="submit" className="btn">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalBox
        className="payment_model"
        show={showModel}
        onHide={() => {
          setShowModel(false);
        }}
      >
        {props.paymentDetails && props.paymentDetails.paymentID === 3 ? (
          <AuthorizePayment />
        ) : props.paymentDetails.paymentID === 4 ? (
          <PaypalPayment
            amount={fields?.x_amount}
            setShow={(data) => setShowModel(data)}
          />
        ) : props.paymentDetails.paymentID === 9 ? (
          <StripePayment />
        ) : (
          <PaypalPayment
            amount={fields?.x_amount}
            setShow={(data) => setShowModel(data)}
          />
        )}
      </ModalBox>
    </>
  );
}
