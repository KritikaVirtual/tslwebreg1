import React, { useState, useEffect } from "react";

const AddClientForm=(props)=> {
    const [inputs, setInputs]=useState({});
    const [errors, setErrors] = useState({});

    const onChangeField=(event)=>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))   
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(_validateForm()){
          props.clientFormData(inputs);
          setInputs("");
        }
      }
    
    const validateRegistration = (fields) => {
       
        let errors = {};
        let formIsValid = true;
        
        if (!inputs["sFirstName"] || inputs["sFirstName"].trim() === "") {
            formIsValid = false;
            errors["sFirstName"] = "*Please enter First Name.";
        }
        if (!inputs["sLastName"] || inputs["sLastName"].trim() === "") {
            formIsValid = false;
            errors["sLastName"] = "*Please enter Last Name.";
        }
        if (!inputs["sBillCompany"] || inputs["sBillCompany"].trim() === "") {
          formIsValid = false;
          errors["sBillCompany"] = "*Please enter Company Name.";
        }
        if (!inputs["sUserName"] || inputs["sUserName"].trim() === "") {
          formIsValid = false;
          errors["sUserName"] = "*Please enter your email.";
        }
        if (typeof inputs["sUserName"] !== "undefined") {
          var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          );
          if (!pattern.test(inputs["sUserName"])) {
            formIsValid = false;
            errors["sUserName"] = "*Please enter valid email.";
          }
        }
    
        if (!inputs["sUserPassword"] || inputs["sUserPassword"].trim() === "") {
          formIsValid = false;
          errors["sUserPassword"] = "*Please enter your password.";
        } else if (inputs["sUserPassword"].length < 4) {
          formIsValid = false;
          errors["sUserPassword"] = "*please enter minimum 5 character";
        }

        if (!inputs["sUserRepeatPassword"] || inputs["sUserRepeatPassword"].trim() === "") {
          formIsValid = false;
          errors["sUserRepeatPassword"] = "*Please enter your Confirm Password.";
        }

        if (inputs["sUserRepeatPassword"] !== inputs["sUserPassword"]) {
          formIsValid = false;
          // errors["password"] = "*password and confirm password are not match";
          errors["sUserRepeatPassword"] =
            "*password and confirm password are not match";
        }

        return {
          errors: errors,
          formIsValid: formIsValid,
        };
    };
    
    const _validateForm = () => {
        let formFields = inputs;
        let response = validateRegistration(formFields);
        setErrors(response.errors);
        return response.formIsValid;
    };

  return (
    <>
      <div className="accordion-formwrap">
        <div className="panel-body">
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    name="sFirstName"
                    placeholder="First Name"
                    value={inputs.sFirstName || ""} 
                    onChange={(e)=>onChangeField(e)}
                  />
                  {errors.sFirstName ? (<div className="errorMsg text-danger">{errors.sFirstName}</div>) : ("")}
                </div>
                <div className="col-md-12 col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    name="sLastName"
                    value={inputs.sLastName || ""} 
                    placeholder="Last Name"
                    onChange={(e)=>onChangeField(e)}
                  />
                  {errors.sLastName ? (<div className="errorMsg text-danger">{errors.sLastName}</div>) : ("")}
                </div>
                <div className="col-md-12 col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    name="sBillCompany"
                    value={inputs.sBillCompany || ""} 
                    placeholder="Company Name"
                    onChange={(e)=>onChangeField(e)}
                  />
                  {errors.sBillCompany ? (<div className="errorMsg text-danger">{errors.sBillCompany}</div>) : ("")}
                </div>
                <div className="col-md-12 col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    name="sUserName"
                    value={inputs.sUserName || ""} 
                    placeholder="Email"
                    onChange={(e)=>onChangeField(e)}
                  />
                  {errors.sUserName ? (<div className="errorMsg text-danger">{errors.sUserName}</div>) : ("")}
                </div>
                <div className="col-md-12 col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    name="sUserPassword"
                    value={inputs.sUserPassword || ""} 
                    placeholder="Password"
                    onChange={(e)=>onChangeField(e)}
                  />
                  {errors.sUserPassword ? (<div className="errorMsg text-danger">{errors.sUserPassword}</div>) : ("")}
                </div>
                <div className="col-md-12 col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    name="sUserRepeatPassword"
                    value={inputs.sUserRepeatPassword || ""} 
                    placeholder="Repeat Password"
                    onChange={(e)=>onChangeField(e)}
                  />
                  {errors.sUserRepeatPassword ? (<div className="errorMsg text-danger">{errors.sUserRepeatPassword}</div>) : ("")}
                </div>
              </div>
              <div>
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddClientForm;