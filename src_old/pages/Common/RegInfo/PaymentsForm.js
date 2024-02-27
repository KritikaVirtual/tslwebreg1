import React, { useState, useEffect } from "react";
import moment from "moment";
import "./index.css";

export function PaymentsForm(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [paymentId, setPaymentId] = useState("");
  const [answersRegistrant, setAnswersRegistrant] = useState([]);

  useEffect(() => {
    if (
      sessionStorage.getItem("paymentId") !== undefined &&
      sessionStorage.getItem("paymentId") > 0
    ) {
      setPaymentId(sessionStorage.getItem("paymentId"));
    }
    if (props.regPaymentsDataByID) {
      setFields(props.regPaymentsDataByID);
    }
    if (props.clearFields) {
      setFields({});
    }
  }, [props.regPaymentsDataByID]);

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

        if (paymentId) {
          postData["lPaymentId"] = paymentId;
          props.updateRegPayments(postData);
        } else {
          props.saveRegPayments(postData);
        }
        props.getRegAmount({lAccountID: props.userId, lEventID: props.eventId, lRegID: props.regId})
        props.showModel(false);
      }
    }
  };

  const validateRegistration = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["dAmount"] || fields["dAmount"] === "") {
      formIsValid = false;
      errors["dAmount"] = "*Please enter Amount";
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
      <div className="invitation-wrap">
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
                      <h4>Payments Form</h4>
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="date"
                        className="form-control"
                        name="dtDate"
                        value={
                          fields.dtDate
                            ? moment(fields.dtDate).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={(event) => handleChange(event)}
                      />
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <select
                        onChange={(event) => handleChange(event)}
                        value={fields?.nType}
                        name="nType"
                        className="form-control"
                      >
                        <option value="0">Credit Card</option>
                        <option value="1">Cheque</option>
                        <option value="2">Cash</option>
                      </select>
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Payor"
                        name="sPayor"
                        value={fields?.sPayor}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Company"
                        name="sCompany"
                        value={fields?.sCompany}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Number"
                        name="sNumber"
                        value={fields?.sNumber}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Expiry Date"
                        name="sExpDate"
                        value={fields?.sExpDate}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="dAmount"
                        value={fields?.dAmount}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.dAmount ? (
                        <div className="errorMsg text-danger">
                          {errors.dAmount}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Transaction ID"
                        name="sTransactionID"
                        value={fields?.sTransactionID}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Invoice"
                        name="sInvoice"
                        value={fields?.sInvoice}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <select
                        name="sStatus"
                        id=""
                        className="form-control"
                        onChange={(event) => handleChange(event)}
                        value={fields?.sStatus}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Declined">Declined</option>
                        <option value="Deleted">Deleted</option>
                      </select>
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
    </>
  );
}
