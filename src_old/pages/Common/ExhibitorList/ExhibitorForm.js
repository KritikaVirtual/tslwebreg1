import React, { useState, useEffect } from "react";
import "./index.css";

export function ExhibitorForm(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const _handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;
    setFields({ ...data });
    console.log(fields);
  };

  const validateExhibitorForm = (fields) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["nMaxStaff"] || fields["nMaxStaff"] === "") {
      formIsValid = false;
      errors["nMaxStaff"] = "*Please enter Max Staff.";
    }

    if (!fields["nFreeStaffs"] || fields["nFreeStaffs"] === "") {
      formIsValid = false;
      errors["nFreeStaffs"] = "*Please enter Free Staff.";
    }

    if (
      !fields["dPricePerExtraStaff"] ||
      fields["dPricePerExtraStaff"] === ""
    ) {
      formIsValid = false;
      errors["dPricePerExtraStaff"] =
        "*Please enter your Price Per Extra Staff.";
    }

    if (!fields["sFirstName"] || fields["sFirstName"] === "") {
      formIsValid = false;
      errors["sFirstName"] = "*Please enter First Name.";
    }

    if (!fields["sLastName"] || fields["sLastName"] === "") {
      formIsValid = false;
      errors["sLastName"] = "*Please enter Last Name.";
    }

    if (!fields["sCompany"] || fields["sCompany"] === "") {
      formIsValid = false;
      errors["sCompany"] = "*Please enter Company Name.";
    }

    if (!fields["sPhone"] || fields["sPhone"] === "") {
      formIsValid = false;
      errors["sPhone"] = "*Please enter Phone Number.";
    }

    if (typeof fields["sEmail"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["sEmail"])) {
        formIsValid = false;
        errors["sEmail"] = "*Please enter valid email.";
      }
    }

    if (!fields["nStatus"] || fields["nStatus"].trim() === "") {
      formIsValid = false;
      errors["nStatus"] = "*Please select your Status.";
    }

    return {
      errors: errors,
      formIsValid: formIsValid,
    };
  };

  const _validateForm = () => {
    let formFields = fields;
    let response = validateExhibitorForm(formFields);
    setErrors(response.errors);
    return response.formIsValid;
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      if (props.userId) {
        const postData = fields;
        postData.lAccountID = props.userId;
        props.addEventInfo(postData);
      }
    }
  };
  return (
    <>
      <div className="invitation-wrap">
        <div className="panel-body">
          <div className="form-content">
            <form onSubmit={(event) => _handleSubmit(event)}>
              <div className="row">
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Event Name</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                    name="sName"
                    placeholder="Event Name"
                  />
                  {errors.sName ? (
                    <div className="errorMsg text-danger">{errors.sName}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Event Location</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                    name="sLocation"
                    placeholder="Event Location"
                  />
                  {errors.sLocation ? (
                    <div className="errorMsg text-danger">
                      {errors.sLocation}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Start Date</label>
                  <br />
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                    name="dtStart"
                    placeholder="Start Date"
                  />
                  {errors.dtStart ? (
                    <div className="errorMsg text-danger">{errors.dtStart}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">End Date</label>
                  <br />
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                    name="dtEnd"
                    placeholder="End Date"
                  />
                  {errors.dtEnd ? (
                    <div className="errorMsg text-danger">{errors.dtEnd}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Status</label>
                  <br />
                  <select
                    name="sStatus"
                    id=""
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                  >
                    <option value="">Select Status </option>
                    <option value="Active">Active </option>
                    <option value="Ended">Ended</option>
                    <option value="Test">Test</option>
                  </select>
                  {errors.sStatus ? (
                    <div className="errorMsg text-danger">{errors.sStatus}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Event Contact</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                    name="sEventContactName"
                    placeholder="Event Contact"
                  />
                  {errors.sEventContactName ? (
                    <div className="errorMsg text-danger">
                      {errors.sEventContactName}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Event Email</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                    name="sEventContactEmail"
                    placeholder="Event Email"
                  />
                  {errors.sEventContactEmail ? (
                    <div className="errorMsg text-danger">
                      {errors.sEventContactEmail}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Close site date</label>
                  <br />
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => _handleChange(e)}
                    name="dtCloseSite"
                    placeholder="Close site date"
                  />
                  {errors.dtCloseSite ? (
                    <div className="errorMsg text-danger">
                      {errors.dtCloseSite}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12 event_modal">
                  <label className="event_label">Default Badge Layout</label>
                  <br />
                  <select
                    name="lBadgeReportID"
                    onChange={(e) => _handleChange(e)}
                    className="form-control"
                    placeholder="Accunt Type"
                  >
                    <option value="">Select Badge Layout </option>
                    <option value="37">1 </option>
                    <option value="38">2</option>
                    <option value="39">3</option>
                  </select>
                  {errors.lBadgeReportID ? (
                    <div className="errorMsg text-danger">
                      {errors.lBadgeReportID}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12">
                  <label>Unique email required for all registrants</label>
                  <br />
                  <input
                    type="radio"
                    id="html"
                    name="bUniqueEmailsForAddReg"
                    value="1"
                    onChange={(e) => _handleChange(e)}
                  />
                  <label className="radio-label">Enable</label>
                  <br />
                  <input
                    type="radio"
                    id="css"
                    name="bUniqueEmailsForAddReg"
                    value="0"
                    onChange={(e) => _handleChange(e)}
                  />
                  <label className="radio-label">Disable</label>
                  <br />
                  {errors.bUniqueEmailsForAddReg ? (
                    <div className="errorMsg text-danger">
                      {errors.bUniqueEmailsForAddReg}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xs-12">
                  <label>Access code for session tracking and Check In</label>
                  <br />
                  <input
                    type="text"
                    onChange={(e) => _handleChange(e)}
                    className="form-control"
                    name="sAccessCode"
                    value={accessCodes}
                    placeholder=""
                    disabled
                  />
                  {/* {errors.sAccessCode ? (<div className="errorMsg text-danger">{errors.sAccessCode}</div>) : ("")} */}
                </div>
              </div>
              <div>
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
