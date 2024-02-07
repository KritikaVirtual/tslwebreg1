import React, { useState, useEffect } from "react";
import "./index.css";
import Questions from "./Questions";

export function SessionsForm(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [regSessionId, setRegSessionId] = useState("");
  const [dTotal, setDTotal] = useState(0);
  const [answersRegistrant, setAnswersRegistrant] = useState([]);

  useEffect(() => {
    if (
      sessionStorage.getItem("regSessionId") !== undefined &&
      sessionStorage.getItem("regSessionId") > 0
    ) {
      setRegSessionId(sessionStorage.getItem("regSessionId"));
    }
    if (props.regSessionsDataByID) {
      setFields(props.regSessionsDataByID);
    }
    if (props.clearFields) {
      setFields({});
    }
  }, [props.regSessionsDataByID]);

  useEffect(() => {
    if (props.sessionPriceData) {
      console.log("props.sessionPriceData", props.sessionPriceData);
      let data = fields;
      const sessionPriceAmt = compareDates(props.sessionPriceData);

      data.dTotal = sessionPriceAmt.sessionPrice;
      setFields({ ...data });
      setDTotal(data.dTotal);
    }
  }, [props.sessionPriceData]);

  const compareDates = (data) => {
    var sessionPrice = {
      sessionPrice: 0,
    };

    // get Today Date
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = month + "/" + date + "/" + year;
    // end Getting Today Date

    const dtPrice1 = convertDateFormat(data.dtPrice1);
    const dtPrice2 = convertDateFormat(data.dtPrice2);

    if (
      Date.parse(dtPrice1) === Date.parse(currentDate) ||
      Date.parse(dtPrice1) > Date.parse(currentDate)
    ) {
      sessionPrice["sessionPrice"] = data.dPrice1;
    } else if (
      Date.parse(dtPrice2) === Date.parse(currentDate) ||
      Date.parse(dtPrice2) > Date.parse(currentDate)
    ) {
      sessionPrice["sessionPrice"] = data.dPrice2;
    } else {
      sessionPrice["sessionPrice"] = data.dPrice3;
    }
    return sessionPrice;
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
    data[event.target.name] = event.target.value;
    if (event.target.name === "lSessionID") {
      const lSessionID = event.target.value;
      if (props.userId && props.eventId && lSessionID) {
        props.getSessionPrice({
          lAccountID: props.userId,
          lEventID: props.eventId,
          lSessionID: lSessionID,
        });
      }
    }
    if (event.target.name === "lQty") {
      data["dTotal"] = dTotal * (event.target.value ? event.target.value : 1);
    }
    setFields({ ...data });
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      if (props.userId && props.eventId && props.regId) {
        const postData = {
          lAccountID: props.userId,
          lEventID: props.eventId,
          lRegID: props.regId,
          lSessionID: fields.lSessionID,
          sAdditionalText: fields.sAdditionalText,
          lQty: fields.lQty,
          dTotal: fields.dTotal,
          nStatus: fields.nStatus,
        };

        if (regSessionId) {
          postData["lRegSessionID"] = regSessionId;
          props.updateRegistrantSessions(postData);
        } else {
          props.saveRegistrantSessions(postData);
        }
        props.getRegAmount({
          lAccountID: props.userId,
          lEventID: props.eventId,
          lRegID: props.regId,
        });
        props.showModel(false);
      }
    }
  };

  const validateRegistration = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["lSessionID"] || fields["lSessionID"] === "") {
      formIsValid = false;
      errors["lSessionID"] = "*Please Select the Session";
    }

    if (!fields["lQty"] || fields["lQty"] === "") {
      formIsValid = false;
      errors["lQty"] = "*Please enter the Quantity";
    }

    if (!fields["dTotal"] || fields["dTotal"] === "") {
      formIsValid = false;
      errors["dTotal"] = "*Please enter the Total";
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

  const callSessionConfigRecords = (sessionsConfigData) => {
    if (sessionsConfigData && sessionsConfigData.length > 0) {
      return props.sessionsConfigData.map((data, index) => (
        <option value={data.lSessionID}>
          {data.sCode + " - " + data.sName}
        </option>
      ));
    }
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
                      <h4>Sessions Form</h4>
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <select
                        className="form-control"
                        onChange={handleChange}
                        name="lSessionID"
                        value={fields.lSessionID ? fields.lSessionID : ""}
                      >
                        <option value="">Select Session</option>
                        {props.sessionsConfigData
                          ? callSessionConfigRecords(props.sessionsConfigData)
                          : ""}
                      </select>
                      {errors.lSessionID ? (
                        <div className="errorMsg text-danger">
                          {errors.lSessionID}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Answer"
                        name="sAdditionalText"
                        value={fields?.sAdditionalText}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Quantity"
                        name="lQty"
                        value={fields?.lQty}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.lQty ? (
                        <div className="errorMsg text-danger">
                          {errors.lQty}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Total"
                        name="dTotal"
                        value={fields.dTotal ? fields.dTotal : 0}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.dTotal ? (
                        <div className="errorMsg text-danger">
                          {errors.dTotal}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <select
                        name="nStatus"
                        id=""
                        className="form-control"
                        onChange={(event) => handleChange(event)}
                        value={fields?.nStatus}
                      >
                        <option value="0">Active </option>
                        <option value="1">Deleted </option>
                        <option value="2">Cancel </option>
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
