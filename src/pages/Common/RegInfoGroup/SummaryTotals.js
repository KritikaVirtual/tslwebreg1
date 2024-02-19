import React, { useState, useEffect } from "react";
import moment from "moment";
import "./index.css";
import { MultiSelect } from "react-multi-select-component";
import Questions from "./Questions";
// import { clearRegistrantData } from "../../../Services/Store/Common/registrants/registrants.action";

export function SummaryTotals(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [paymentId, setPaymentId] = useState("");
  const [answersRegistrant, setAnswersRegistrant] = useState([]);

  useEffect(() => {
    if (props.summaryTotalsSum) {
      let data = props.summaryTotalsSum;
      
      data["dGrandTotal"] =
        (data.dRegAmount ? data.dRegAmount : 0) +
        (data.dSessionsAmount ? data.dSessionsAmount : 0) +
        (data.dServiceFeeAmt ? data.dServiceFeeAmt : 0) +
        (data.dTaxesAmt ? data.dTaxesAmt : 0) -
        ((data.dDiscountAmount ? data.dDiscountAmount : 0) +
          (data.dSpecialDiscountAmt ? data.dSpecialDiscountAmt : 0));
      data["dTotalBalance"] =
        data["dGrandTotal"] +
        (data.dCancellationFee ? data.dCancellationFee : 0) 
        // -
        // ((data.dTotalPaid ? data.dTotalPaid : 0) +
        //   (data.dTotalRefund ? data.dTotalRefund : 0));
      setFields({ ...data });
      // console.log('props.regAmountData',props.regAmountData)
      // if (props.regAmountData !== undefined) {
      //   props.totalBalance(data["dTotalBalance"]);
      // }
      // props.dRegAmountValue(data.dRegAmount ? data.dRegAmount : 0);
    }
    // return ()=>{
    //   clearRegistrantData()
    // }
  }, [props.summaryTotalsSum]);
  useEffect(()=>{
    if(props.summaryTotalsSum){
      setFields(props.summaryTotalsSum)
    }
  },[props.summaryTotalsSum])
  const compareDates = (data) => {
    var regTypeAmount = 0;

    // get Today Date
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = month + "/" + date + "/" + year;
    // end Getting Today Date

    const dtEarlyDateDB = convertDateFormat(data.dtEarlyDate);
    const dtStandardDateDB = convertDateFormat(data.dtStandardDate);
 
    if (
      Date.parse(dtEarlyDateDB) === Date.parse(currentDate) ||
      Date.parse(dtEarlyDateDB) > Date.parse(currentDate)
    ) {
      regTypeAmount = data.dEarlyAmt;
    } else if (
      Date.parse(dtStandardDateDB) === Date.parse(currentDate) ||
      Date.parse(dtStandardDateDB) > Date.parse(currentDate)
    ) {
      regTypeAmount = data.dStandardAmt;
    } else {
      regTypeAmount = data.dOnsiteAmt;
    }
    return regTypeAmount;
  };

  const convertDateFormat = (dateDB) => {
    var now = new Date(dateDB);
    return (
      (now.getMonth() > 8 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1)) +
      "/" +
      (now.getDate() > 9 ? now.getDate() : "0" + now.getDate()) +
      "/" +
      now.getFullYear()
    );
  };

  const handleChange = (event) => {
    let data = fields;
    props.eventOnChange(false);
    data[event.target.name] = parseInt(event.target.value, 10);
    data["dGrandTotal"] =
      (data.dRegAmount ? data.dRegAmount : 0) +
      (data.dSessionsAmount ? data.dSessionsAmount : 0) +
      (data.dServiceFeeAmt ? data.dServiceFeeAmt : 0) +
      (data.dTaxesAmt ? data.dTaxesAmt : 0) -
      ((data.dDiscountAmount ? data.dDiscountAmount : 0) +
        (data.dSpecialDiscountAmt ? data.dSpecialDiscountAmt : 0));

    data["dTotalBalance"] =
      data["dGrandTotal"] +
      (data.dCancellationFee ? data.dCancellationFee : 0)
      //  -
      // ((data.dTotalPaid ? data.dTotalPaid : 0) +
      //   (data.dTotalRefund ? data.dTotalRefund : 0));
    setFields({ ...data });
    // props.totalBalance(data["dTotalBalance"]);
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (props.userId && props.eventId && props.regId) {
      const postData = fields;
      postData["lAccountID"] = props.userId;
      postData["lEventID"] = props.eventId;
      postData["lRegID"] = props.regId;
      postData["dRegAmount"] = fields.dRegAmount;
      postData["dSpecialDiscountAmt"] = fields.dSpecialDiscountAmt;
      postData["dCancellationFee"] = fields.dCancellationFee;

      props.updateRegAmount(postData);
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
      <div className="">
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
                    <div className="table-responsive events-wrap">
                      <table className="table table-striped table-bordered summary-table">
                        <tbody>
                          <tr>
                            <td>Reg Amount: +</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dRegAmount"
                                value={
                                  fields.dRegAmount ? fields.dRegAmount : 0
                                }
                                onChange={(event) => handleChange(event)}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>Sessions: +</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dSessionsAmount"
                                value={
                                  fields.dSessionsAmount
                                    ? fields.dSessionsAmount
                                    : 0
                                }
                                onChange={(event) => handleChange(event)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Discount: -</td>
                            <td>
                              {" "}
                              <ul>
                                <li>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="dDiscountAmount"
                                    value={
                                      fields.dDiscountAmount
                                        ? fields.dDiscountAmount
                                        : 0
                                    }
                                    onChange={(event) => handleChange(event)}
                                    disabled
                                  />
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>Special Discount: -</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dSpecialDiscountAmt"
                                value={
                                  fields.dSpecialDiscountAmt
                                    ? fields.dSpecialDiscountAmt
                                    : 0
                                }
                                onChange={(event) => handleChange(event)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Service Amount: +</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dServiceFeeAmt"
                                value={
                                  fields.dServiceFeeAmt
                                    ? fields.dServiceFeeAmt
                                    : 0
                                }
                                onChange={(event) => handleChange(event)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Taxes: +</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dTaxesAmt"
                                value={fields.dTaxesAmt ? fields.dTaxesAmt : 0}
                                onChange={(event) => handleChange(event)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Grand Total: =</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dGrandTotal"
                                value={
                                  fields.dGrandTotal ? fields.dGrandTotal : 0
                                }
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Cancelled Amt: -</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dCancelledAmt"
                                value={0}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Cancellation Fee: +</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dCancellationFee"
                                value={
                                  fields.dCancellationFee
                                    ? fields.dCancellationFee
                                    : 0
                                }
                                onChange={(event) => handleChange(event)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Total Paid: -</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dTotalPaid"
                                value={
                                  fields.dTotalPaid ? fields.dTotalPaid : 0
                                }
                                onChange={(event) => handleChange(event)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Total Refund: -</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dTotalRefund"
                                value={
                                  fields.dTotalRefund ? fields.dTotalRefund : 0
                                }
                                onChange={(event) => handleChange(event)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Balance:</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                className="form-control"
                                name="dTotalBalance"
                                value={fields.dTotalBalance}
                                disabled
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="submit-btn summary-btn">
                        <button type="submit" className="btn">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
