import React,{ useState, useEffect} from 'react';
import "./index.css";
import CONSTANT from '../../../Services/Constant/user.constants';
export function UserForm(props) {
    
    const [fields,setFields] = useState(props.userDetails ? props.userDetails:{});
    const [errors, setErrors] = useState({});
    const [successStatus,setSuccessStatus] = useState(false);
    const [applyCheck] = useState(false);
    console.log(fields);
    const handleChange = (event) => {
        let data = fields;
        data[event.target.name] = event.target.value;
        setFields({ ...data });
    };
    
    const validateRegistration = (fields, applyCheck = false) => {
        let errors = {};
        let formIsValid = true;
        
        if (!fields["sUserName"] || fields["sUserName"].trim() === "") {
            formIsValid = false;
            errors["sUserName"] = "*Please enter your Username.";
        }

        if (typeof fields["sUserName"] !== "undefined") {
            var pattern = new RegExp(
              /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(fields["sUserName"])) {
              formIsValid = false;
              errors["sUserName"] = "*Please enter valid Username.";
            }
        }

        if (!fields["sFirstName"] || fields["sFirstName"].trim() === "") {
          formIsValid = false;
          errors["sFirstName"] = "*Please enter your First name.";
        }
    
        if (!fields["sLastName"] || fields["sLastName"].trim() === "") {
          formIsValid = false;
          errors["sLastName"] = "*Please enter your Last name.";
        }
    
        if (!fields["sUserPassword"] || fields["sUserPassword"].trim() === "") {
          formIsValid = false;
          errors["sUserPassword"] = "*Please enter your Password.";
        } else if (fields["sUserPassword"].length < 4) {
          formIsValid = false;
          errors["sUserPassword"] = "*Please enter minimum 5 characters";
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
    
    const updateUserDetails = async(event) => {
        event.preventDefault();
        if (_validateForm()) {
            if(fields){
                const postData = {
                    sUserName : fields.sUserName,
                    sUserPassword: fields.sUserPassword,
                    sFirstName: fields.sFirstName,
                    sLastName: fields.sLastName,
                    lRoleID: fields.lRoleID,
                    sStatus: fields.sStatus,
                    lLoginID: fields.lLoginID,
                }
                 if(props.userDetails){
                    props.editUserDetails(postData);
                 }else if(props.userId){
                    const params={sUserName : fields.sUserName,
                        sUserPassword: fields.sUserPassword,
                        sFirstName: fields.sFirstName,
                        sLastName: fields.sLastName,
                        lRoleID: fields.lRoleID ? fields.lRoleID : '1',
                        sStatus: fields.sStatus ? fields.sStatus : 'Active',
                        userId: props.userId
                     }
                    props.addUserDetails(params)
                }
                
            }
        }
    }
    
  return (
    <>
            <div className="invitation-wrap">
                  <div className="container">
                    <div className="row login-wrap-new">
                        <div className="col-md-12 col-xs-12">
                            <div className="form-content">
                                <form onSubmit={(event) => updateUserDetails(event)}>
                                    <div className="row">
                                        <div className="col-12 ">
                                        {successStatus?<div className="successMsg text-success">Details saved Successfully</div>:''}
                                        <h4>User Form</h4>
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter UserName"
                                            name="sUserName"
                                            value={fields?.sUserName }
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.sUserName ? (
                                            <div className="errorMsg text-danger">
                                            {errors.sUserName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter password"
                                            name="sUserPassword"
                                            value={fields?.sUserPassword}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.sUserPassword ? (
                                            <div className="errorMsg text-danger">
                                            {errors.sUserPassword}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                        <select className="form-control" name="lRoleID" onChange={(event) => handleChange(event)} value={fields?.lRoleID}>
                                            <option value="1">{CONSTANT[1]}</option>
                                            <option value="2">{CONSTANT[2]}</option>
                                        </select>
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                        <select className="form-control" name="sStatus" onChange={(event) => handleChange(event)} value={fields?.sStatus}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
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