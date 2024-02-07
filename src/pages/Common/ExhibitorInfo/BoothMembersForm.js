import React, { useState, useEffect } from "react";
import "./index.css";
import { MultiSelect } from "react-multi-select-component";

export function BoothMembersForm(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);

  useEffect(() => {
    if (props.exhibitorsBoothMembersDataByID !== undefined) {
      setFields(props.exhibitorsBoothMembersDataByID);
    }
  }, [props.exhibitorsBoothMembersDataByID]);

  const handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;
    setFields({ ...data });
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      if (props.userId && props.eventId && props.exhibitorId) {
        const postData = {
          lAccountID: props.userId,
          lEventID: props.eventId,
          lExhibitorID: props.exhibitorId,
          sFirstName: fields.sFirstName,
          sLastName: fields.sLastName,
          sTitle: fields.sTitle,
          nStatus: fields.nStatus,
          sPhone: fields.sPhone,
          sEmail: fields.sEmail,
        };
        if (
          sessionStorage.getItem("memberId") !== undefined &&
          sessionStorage.getItem("memberId") > 0
        ) {
          postData["lMemberID"] = sessionStorage.getItem("memberId");
          props.updateExhibitorBoothMembers(postData);
        } else {
          props.saveExhibitorBoothMembers(postData);
        }
        props.showModel(false);
      }
    }
  };

  const validateRegistration = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["sFirstName"] || fields["sFirstName"] === "") {
      formIsValid = false;
      errors["sFirstName"] = "*Please enter your First Name";
    }

    if (!fields["sLastName"] || fields["sLastName"] === "") {
      formIsValid = false;
      errors["sLastName"] = "*Please enter your First Name";
    }

    if (!fields["sTitle"] || fields["sTitle"] === "") {
      formIsValid = false;
      errors["sTitle"] = "*Please enter your Title";
    }

    if (!fields["sPhone"] || fields["sPhone"] === "") {
      formIsValid = false;
      errors["sPhone"] = "*Please enter your Phone";
    }

    if (!fields["sEmail"] || fields["sEmail"] === "") {
      formIsValid = false;
      errors["sEmail"] = "*Please enter your Email";
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
                      <h4>Booth Members Form</h4>
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        name="sFirstName"
                        value={fields?.sFirstName}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sFirstName ? (
                        <div className="errorMsg text-danger">
                          {errors.sFirstName}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                        name="sLastName"
                        value={fields?.sLastName}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sLastName ? (
                        <div className="errorMsg text-danger">
                          {errors.sLastName}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        name="sTitle"
                        value={fields?.sTitle}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sTitle ? (
                        <div className="errorMsg text-danger">
                          {errors.sTitle}
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

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Phone"
                        name="sPhone"
                        value={fields?.sPhone}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sPhone ? (
                        <div className="errorMsg text-danger">
                          {errors.sPhone}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        name="sEmail"
                        value={fields?.sEmail}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sEmail ? (
                        <div className="errorMsg text-danger">
                          {errors.sEmail}
                        </div>
                      ) : (
                        ""
                      )}
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
