import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./index.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// import { displayAmountPendingMessage } from "../../../Services/Helpers/helper";
export function MemberForm(props) {
  const [fields, setFields] = useState(props.memberDetails ? props.memberDetails:{});
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [regId, setRegId] = useState("");
  const [errors, setErrors] = useState({});
  const [asteriskData, setAsteriskData] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [registrantField, setRegistrantField] = useState({});
  
  const [applyCheck] = useState(false);

  const navigate = useNavigate();


  const handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;
    if (
      event.target.name == "lRegType" &&
      event.target.value !== undefined &&
      event.target.value > 0
    ) {
      props.eventOnChange(true);
      props.getRegTypesAmount({ lRegType: event.target.value });
    }
    setFields({ ...data });
  };

 

  const validateMember = (fields, applyCheck = false) => {
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

    if (!fields["sPhone"] || fields["sPhone"] === "") {
      formIsValid = false;
      errors["sPhone"] = "*Please enter your Phone Number.";
    }

    if (!fields["sEmail"] || fields["sEmail"] === "") {
      formIsValid = false;
      errors["sEmail"] = "*Please enter your Email Id.";
    }

    return {
      errors: errors,
      formIsValid: formIsValid,
    };
  };

  const _validateForm = () => {
    let formFields = fields;
    let response = validateMember(formFields, applyCheck);
    setErrors(response.errors);
    return response.formIsValid;
  };

  const submitMemberInfo = async(event) => {
    event.preventDefault();
    if (_validateForm()) {
        const postData = fields;  
        if(props.memberDetails){
          postData['lMemberUniqueID'] = fields.lMemberUniqueID
          props.editMemberDetails(postData) 
        }else{           
        postData['lAccountID'] = props.userId;        
        props.addMemberDetails(postData)  
        }     
        navigate("/members"); 
    }
  }

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
                <form onSubmit={(event) => submitMemberInfo(event)}>
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
                          <label>Member Type</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Member Type"
                            name="sMemberType" 
                            value={(fields.sMemberType != "null")?(fields.sMemberType):""}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <label>Active Date</label>
                        </li>
                        <li>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="0"
                            name="sMemberActiveDate"          
                            value={(fields.sMemberActiveDate != "null")?(fields.sMemberActiveDate):""}
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
                            value={(fields.sMemberID!= "null")?(fields.sMemberID):""}
                            onChange={(event) => handleChange(event)}
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
                          <label>Prefix</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Badge Name"
                            name="sPrefix"                            
                            value={(fields.sPrefix !="null")?(fields.sPrefix):""}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>First Name {asteriskData.sSuffix ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First name"
                            name="sFirstName"
                            value={(fields.sFirstName != "null")?(fields.sFirstName):""}
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
                          <label>Middle Name </label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Middle Name"
                            name="sMiddleName"
                            value={(fields.sMiddleName != "null")?(fields.sMiddleName):""}
                            onChange={(event) => handleChange(event)}
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
                          <label>Last Name {asteriskData.sSuffix ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            name="sLastName"
                            value={(fields.sLastName != "null")?(fields.sLastName):""}
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
                          <label>Suffix </label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Suffix"
                            name="sSuffix"
                            value={(fields.sSuffix != "null")?(fields.sSuffix):""}
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
                          <label>Credentials </label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Credentials"
                            name="sCredentials"
                            value={(fields.sCredentials != "null")?(fields.sCredentials):""}
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
                          <label>Title </label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Title"
                            name="sTitle"
                            value={(fields.sTitle != "null")?(fields.sTitle):""}
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
                          <label>Company </label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company"
                            name="sCompany"
                            value={(fields.sCompany != "null")?(fields.sCompany):""}
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

                      <ul>
                        <li>
                          <label>Address 1 </label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address 1"
                            name="sAddress1"
                            value={(fields.sAddress1 != "null")?(fields.sAddress1):""}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sAddress1')}
                          />
                          {errors.lRegType ? (
                            <div className="errorMsg text-danger">
                              {errors.lRegType}
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Address 2 </label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address 2"
                            name="sAddress2"
                            value={(fields.sAddress2 !="null")?(fields.sAddress2):""}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sAddress2')}
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
                          <label>Address 3</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address 3"
                            name="sAddress3"
                            value={(fields.sOtherInfo3 != "null")?(fields.sOtherInfo3):""}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>City</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter City"
                            name="sCity"
                            value={(fields.sCity != "null")?(fields.sCity):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

<ul>
                        <li>
                          <label>State</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter State"
                            name="sState"
                            value={(fields.sState != "null") ?(fields.sState):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                      </ul>
                      <ul>
                        <li>
                          <label>Zip</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Zip"
                            name="sZip"
                            value={(fields.sZip !="null")?(fields.sZip):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Country</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Country"
                            name="sCountry"
                            value={(fields.sCountry != "null")?(fields.sCountry):""}
                            onChange={(event) => handleChange(event)}
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
                          <label>Phone </label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone"
                            name="sPhone"
                            value={(fields.sPhone != "null")?(fields.sPhone): ""}
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
                          <label>Cell </label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Cell"
                            name="sCell"
                            value={(fields.sCity != "null")?(fields.sCity):""}
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
                          <label>Fax {asteriskData.sState ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Fax"
                            name="sFax"
                            value={(fields.sFax != "null")?(fields.sFax):""}
                            onChange={(event) => handleChange(event)}
                            disabled={checkFieldDisabled('sFax')}
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
                          <label>Email {asteriskData.sZip ? ('*') : ("")}</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                            name="sEmail"
                            value={(fields.sEmail!= "null")?(fields.sEmail):""}
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
                    </div>
                    <div className="col-md-6 col-xs-6" >

                      <ul>
                        <li>
                          <label>Status </label>
                        </li>
                        <li>
                        <select name="sMemberStatus" id="" className="form-control">
                          <option value="1">Active </option>
                          <option value="0">Inactive </option>
                        </select>                      
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Inactive Date</label>
                        </li>
                        <li>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter Inactive Date"
                            name="sInactiveDate"
                            value={(fields.sInactiveDate !="null") ?(fields.sInactiveDate):""}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <label>Other 1</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 1"
                            name="sOther1"
                            value={(fields.sOther1 != "null")?(fields.sOther1):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 2</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 2"
                            name="sOther2"
                            value={(fields.sOther2 !="null")?(fields.sOther2):""}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>

                        </ul>

                      <ul>
                        <li>
                          <label>Other 3</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 3"
                            name="sOther3"
                            value={(fields.sOther3 !="null")?(fields.sOther3):""}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 4</label>
                        </li>
                        <li>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 4"
                            name="sOther4"
                            value={(fields.sOther4 !="null")?(fields.sOther4):""}
                            onChange={(event) => handleChange(event)}
                          />
                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 5</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 5"
                            name="sOther5"
                            value={(fields.sOther5 != "null")?(fields.sOther5):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 6</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 6"
                            name="sOther6"
                            value={(fields.sOther6 != "null")?(fields.sOther6):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 7</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 7"
                            name="sOther7"
                            value={(fields.sOther7 != "null")?(fields.sOther7):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 8</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 8"
                            name="sOther8"
                            value={(fields.sOther8 != "null")?(fields.sOther8):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 9</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 9"
                            name="sOther9"
                            value={(fields.sOther9 != "null")?(fields.sOther9):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 10</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 10"
                            name="sOther10"
                            value={(fields.sOther10 != "null" )?(fields.sOther10):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 11</label>
                        </li>
                        
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 11"
                            name="sOther11"
                            value={(fields.sOther11 != "null")?(fields.sOther11):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 12</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 12"
                            name="sOther12"
                            value={(fields.sOther12 !="null")?(fields.sOther12):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 13</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 13"
                            name="sOther13"
                            value={(fields.sOther13 != "null")?(fields.sOther13):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 14</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 14"
                            name="sOther14"
                            value={(fields.sOther14 != "null" )?(fields.sOther14):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 15</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 15"
                            name="sOther15"
                            value={(fields.sOther15 != "null")?(fields.sOther15):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 16</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 16"
                            name="sOther16"
                            value={(fields.sOther16 != "null")?(fields.sOther16):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 17</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 17"
                            name="sOther17"
                            value={(fields.sOther17 != "null")?(fields.sOther17):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 18</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 18"
                            name="sOther18"
                            value={(fields.sOther18 != "null")?(fields.sOther18):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 19</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 19"
                            name="sOther19"
                            value={(fields.sOther19 !="null")?(fields.sOther19):""}
                            onChange={(event) => handleChange(event)}
                          />

                        </li>
                        </ul>

                      <ul>
                        <li>
                          <label>Other 20</label>
                        </li>
                        <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Other 20"
                            name="sOther20"
                            value={(fields.sOther20 !="null")?(fields.sOther20):""}
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
    </>
  );
}
