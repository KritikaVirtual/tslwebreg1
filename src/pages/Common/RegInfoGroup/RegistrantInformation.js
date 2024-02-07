import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./index.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
// import { displayAmountPendingMessage } from "../../../Services/Helpers/helper";
export function RegistrantInformation(props) {
  const [fields, setFields] = useState({});
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [regId, setRegId] = useState("");
  const [errors, setErrors] = useState({});
  const [asteriskData, setAsteriskData] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [answersRegistrantData, setAnswersRegistrantData] = useState({});
  const [registrantField, setRegistrantField] = useState({});
  
  const [applyCheck] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    if(props.answersRegistrantData){
      const answerRegData = props.answersRegistrantData
      setAnswersRegistrantData(answerRegData)
 
      const stringPairs = Object.entries(answerRegData)
      .filter(([key, value]) => typeof value === 'string')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      setFieldsText(stringPairs)

      // delete answerRegData[key]
      setFieldsChecked(answerRegData);
          
    }
  },[props.answersRegistrantData])

  useEffect(()=>{
    if(props.registrantField){
      props.registrantField.map((data,index)=>{
        if(data.bRequired === 1){
          asteriskData[data.sCode] = "1";
        }
      })
    }
  },[props.registrantField])
  
  useEffect(() => {
    if (
      sessionStorage.getItem("regId") !== undefined &&
      sessionStorage.getItem("regId") > 0
    ) {
      setRegId(sessionStorage.getItem("regId"));
    }

    if (props.registrantData) {
      setFields(props.registrantData);
    }

    // if (props.regTypesData) {
    //   // console.log('props.registrantData',props.registrantData)
    //   if (props.registrantData.lRegType && props.registrantData.lRegType > 0 && regId) {
    //     props.getRegTypesAmount({ lRegType: props.registrantData.lRegType });
    //   } else if (
    //     !regId &&
    //     props.regTypesData[0] != undefined
    //     //  &&
    //     // (props.registrantData.lRegType === 0 ||
    //     //   props.registrantData.lRegType == undefined)
    //   ) {
    //     props.getRegTypesAmount({ lRegType: props.regTypesData[0].value });
    //   }
    // }

    if (props.clearFields) {
      setFields({});
    }
  }, [props.registrantData,
    //  props.regTypesData
  ]);

  useEffect(() => {
    if (regId && props.totalBalance > 0) {
      displayAmountPendingMessage(
        "ALERT!!!! Amount Due of $" + props.totalBalance
      );
    }
  }, [props.totalBalance]);

  const displayAmountPendingMessage = (key) => {
    toastr.error(key, {
      showMethod: "slideDown",
      hideMethod: "slideUp",
      autoClose: false,
      closeButton: false,
    });
  };

  const handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;
    if (
      event.target.name == "lRegType" &&
      event.target.value !== undefined &&
      event.target.value > 0
    ) {
      props.eventOnChange(true);
      // props.getRegTypesAmount({ lRegType: event.target.value });
    }
    setFields({ ...data });
  };

  const validateRegistration = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["sFirstName"] || fields["sFirstName"] === "") {
      formIsValid = false;
      errors["sFirstName"] = "*Please enter your First Name.";
    }

    if (!fields["sLastName"] || fields["sLastName"] === "") {
      formIsValid = false;
      errors["sLastName"] = "*Please enter your Last Name.";
    }

    // registrantField ? registrantField

    if(props.registrantField){
      props.registrantField.map((data,index)=>{
        if(data.bRequired === 1){
          if (!fields[data.sCode] || fields[data.sCode] === "") {
            formIsValid = false;
            errors[data.sCode] = "*Please enter "+ data.sName;
          }
        }
      })
    }
    

    // if (!fields["lRegType"] || fields["lRegType"] === "") {
    //   formIsValid = false;
    //   errors["lRegType"] = "*Please select Reg Type.";
    // }

    if (!props.regTypesData) {
      formIsValid = false;
      errors["lRegType"] = "*Please select Reg Type.";
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

  const submitRegistrantInformation = async (event) => {
    event.preventDefault();
    if (_validateForm()) {
      if (props.userId && props.eventId) {
        const postData = fields;
        postData["fieldsChecked"] = fieldsChecked;
        postData["fieldsText"] = fieldsText;
        if (regId) {
          postData["lRegId"] = regId;
          props.updateRegInfo(postData);
        } else {
          // postData["lRegType"] =
          //   postData["lRegType"] === "" || postData["lRegType"] === undefined
          //     ? props.regTypesData[0].value
          //     : postData["lRegType"];
          postData["lAccountID"] = props.userId;
          postData["lEventID"] = props.eventId;
          props.saveRegInfo(postData);
          // navigate("/regList");
        }
      }
    }
  };

  const callRegTypesData = (regTypeData) => {
    if (regTypeData && regTypeData.length > 0) {
      return regTypeData.map((data, index) => (
        <>
          <option value={data.value}>{data.label}</option>
        </>
      ));
    }
  };

  const checkFieldDisabled = value => {
    const result = props.registrantField ? props.registrantField.find(item => item.sCode == value) : ''
    if(result){
      return result.bVisible == '0' ? true : false
    }
  }

  return (
    <>
      <div className="invitation-wrap regInfo">
        <div className="container">
          <div className="row login-wrap-new">
            <div className="col-md-12 col-xs-12">
              <div className="form-content">
                <form onSubmit={(event) => submitRegistrantInformation(event)}>
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
                    <div className="col-md-6 col-xs-6">
                      <ul>
                        <li>
                          <label>Status *</label>
                        </li>
                        <li>
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
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <label>Reg ID</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="0"
                            name="lRegID"
                            value={fields?.lRegID}
                            disabled
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <label>Member ID {asteriskData.sMemberID ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Member ID"
                            name="sMemberID"
                            value={fields?.sMemberID}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sMemberID')}
                          />
                          {errors.sMemberID ? (
                            <div className="errorMsg text-danger">
                              {errors.sMemberID}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <label>Badge Name</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Badge Name"
                            name="sPrefix"
                            value={fields?.sPrefix}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>First Name *</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First name"
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
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Middle Name {asteriskData.sMiddleName ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Middle Name"
                            name="sMiddleName"
                            value={fields?.sMiddleName}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sMiddleName')}
                          />
                          {errors.sMiddleName ? (
                            <div className="errorMsg text-danger">
                              {errors.sMiddleName}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Last Name *</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            name="sLastName"
                            value={fields?.sLastName}
                            // value={ fields.sLastName?moment(fields.sLastName).format("YYYY-MM-DD"):''}
                            onChange={(event) => handleChange(event)}
                          />
                          {errors.sLastName ? (
                            <div className="errorMsg text-danger">
                              {errors.sLastName}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Suffix {asteriskData.sSuffix ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Suffix"
                            name="sSuffix"
                            value={fields?.sSuffix}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sSuffix')}
                          />
                          {errors.sSuffix ? (
                            <div className="errorMsg text-danger">
                              {errors.sSuffix}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Credentials {asteriskData.sCredentials ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Credentials"
                            name="sCredentials"
                            value={fields?.sCredentials}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sCredentials')}
                          />
                          {errors.sCredentials ? (
                            <div className="errorMsg text-danger">
                              {errors.sCredentials}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Title {asteriskData.sTitle ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Title"
                            name="sTitle"
                            value={fields?.sTitle}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sTitle')}
                          />
                          {errors.sTitle ? (
                            <div className="errorMsg text-danger">
                              {errors.sTitle}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Company {asteriskData.sCompany ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company"
                            name="sCompany"
                            value={fields?.sCompany}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sCompany')}
                          />
                          {errors.sCompany ? (
                            <div className="errorMsg text-danger">
                              {errors.sCompany}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      {/* <ul>
                        <li>
                          <label>Reg Type {asteriskData.lRegType ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <select
                            id="lRegType"
                            className="form-control"
                            name="lRegType"
                            onChange={(event) => handleChange(event)}
                            value={fields?.lRegType}
                          >
                            {props.regTypesData ? (
                              callRegTypesData(props.regTypesData)
                            ) : (
                              <option value="0">Select Reg Type</option>
                            )}
                          </select>
                          {errors.lRegType ? (
                            <div className="errorMsg text-danger">
                              {errors.lRegType}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul> */}

                      <ul>
                        <li>
                          <label>Other Info {asteriskData.sOtherInfo1 ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other Info"
                            name="sOtherInfo1"
                            value={fields?.sOtherInfo1}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sOtherInfo1')}
                          />
                          {errors.sOtherInfo1 ? (
                            <div className="errorMsg text-danger">
                              {errors.sOtherInfo1}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Other Info 3</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other Info 3"
                            name="sOtherInfo3"
                            value={fields?.sOtherInfo3}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Notes</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Notes"
                            name="mNotes"
                            value={fields?.mNotes}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-6 col-xs-6">
                      <ul>
                        <li>
                          <label>Reg Date</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="dtRegDate"
                            value={
                              fields.dtCreatedOn
                                ? moment(fields.dtCreatedOn).format(
                                    "YYYY-MM-DD"
                                  )
                                : ""
                            }
                            disabled
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <label>Address 1 {asteriskData.sAddress1 ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address 1"
                            name="sAddress1"
                            value={fields?.sAddress1}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sAddress1')}
                          />
                          {errors.sAddress1 ? (
                            <div className="errorMsg text-danger">
                              {errors.sAddress1}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Address 2 {asteriskData.sAddress2 ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address 2"
                            name="sAddress2"
                            value={fields?.sAddress2}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sAddress2')}
                          />
                          {errors.sAddress2 ? (
                            <div className="errorMsg text-danger">
                              {errors.sAddress2}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Address 3 {asteriskData.sAddress3 ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address 3"
                            name="sAddress3"
                            value={fields?.sAddress3}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sAddress3')}
                          />
                          {errors.sAddress3 ? (
                            <div className="errorMsg text-danger">
                              {errors.sAddress3}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>City {asteriskData.sCity ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter City"
                            name="sCity"
                            value={fields?.sCity}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sCity')}
                          />
                          {errors.sCity ? (
                            <div className="errorMsg text-danger">
                              {errors.sCity}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>State {asteriskData.sState ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter State"
                            name="sState"
                            value={fields?.sState}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sState')}
                          />
                          {errors.sState ? (
                            <div className="errorMsg text-danger">
                              {errors.sState}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Zip {asteriskData.sZip ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Zip"
                            name="sZip"
                            value={fields?.sZip}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sZip')}
                          />
                          {errors.sZip ? (
                            <div className="errorMsg text-danger">
                              {errors.sZip}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Country {asteriskData.sCountry ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Country"
                            name="sCountry"
                            value={fields?.sCountry}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sCountry')}
                          />
                          {errors.sCountry ? (
                            <div className="errorMsg text-danger">
                              {errors.sCountry}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Phone {asteriskData.sPhone ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone"
                            name="sPhone"
                            value={fields?.sPhone}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sPhone')}
                          />
                          {errors.sPhone ? (
                            <div className="errorMsg text-danger">
                              {errors.sPhone}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Cell {asteriskData.sCell ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Cell"
                            name="sCell"
                            value={fields?.sCell}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sCell')}
                          />
                          {errors.sCell ? (
                            <div className="errorMsg text-danger">
                              {errors.sCell}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Fax {asteriskData.sFax ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Fax"
                            name="sFax"
                            value={fields?.sFax}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sFax')}
                          />
                          {errors.sFax ? (
                            <div className="errorMsg text-danger">
                              {errors.sFax}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Email {asteriskData.sEmail ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                            name="sEmail"
                            value={fields?.sEmail}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sEmail')}
                          />
                          {errors.sEmail ? (
                            <div className="errorMsg text-danger">
                              {errors.sEmail}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Other Info 2 {asteriskData.sOtherInfo2 ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other Info 2"
                            name="sOtherInfo2"
                            value={fields?.sOtherInfo2}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Other Info 4</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other Info 4"
                            name="sOtherInfo4"
                            value={fields?.sOtherInfo4}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>

                      {/* <ul>
                        <li>
                          <label>Address Type</label>
                        </li>
                        <li>
                          <select
                            id="address_type"
                            name="address_type"
                            className="form-control"
                            onChange={(event) => handleChange(event)}
                          >
                            <option value="1" required="">
                              Home
                            </option>

                            <option value="2">Office</option>
                          </select>
                        </li>
                      </ul> */}
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
