import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSignUp,adminSignUpReset } from "../../../Services/Store/Admin/signUpForm/signup.action";
import { API_URL } from "../../../Config/config";
import "./index.css";

const SignUpForm=()=> {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [isUserExist, setIsUserExist] = useState(false);
  const [applyCheck] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.signup);
  //userStatus
  useEffect(() => {
    if (loginData.userStatus.result === "1") {
        navigate("/userList");
    } else if (loginData.userStatus.error) {
      setIsUserExist(true);
    }
  }, [loginData]);

  useEffect(() => {
    return ()=>{ 
        dispatch(adminSignUpReset());
    }
  }, []);
  const _handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;
    setFields({ ...data });
  };

  const validateRegistration = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["firstname"] || fields["firstname"].trim() === "") {
      formIsValid = false;
      errors["firstname"] = "*Please enter your firstname.";
    }

    if (!fields["lastname"] || fields["lastname"].trim() === "") {
      formIsValid = false;
      errors["lastname"] = "*Please enter your lastname.";
    }

    if (!fields["email"] || fields["email"].trim() === "") {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (typeof fields["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email.";
      }
    }

    if (!fields["password"] || fields["password"].trim() === "") {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    } else if (fields["password"].length < 4) {
      formIsValid = false;
      errors["password"] = "*please enter minimum 5 character";
    }

    if (
      !fields["confirm_password"] ||
      fields["confirm_password"].trim() === ""
    ) {
      formIsValid = false;
      errors["confirm_password"] = "*Please enter your password.";
    } else if (fields["confirm_password"].length < 4) {
      formIsValid = false;
      errors["confirm_password"] = "*please enter minimum 5 character";
    }

    if (fields["confirm_password"] !== fields["password"]) {
      formIsValid = false;
      // errors["password"] = "*password and confirm password are not match";
      errors["confirm_password"] =
        "*password and confirm password are not match";
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

  const backToLogin = () => {
    navigate("/admin", { replace: true });
  };
  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      const postData = {
        firstname: fields.firstname,
        lastname: fields.lastname,
        username: fields.email,
        password: fields.password,
      };
      dispatch(adminSignUp(postData));
    }
  };

  return (
    <>
      <div className="Sign-up-wrap">
        <div className="container">
          <div className="row login-wrap">
            <div className="col-md-12 col-xs-12">
              <div className="form-content">
                <form onSubmit={(event) => _handleSubmit(event)}>
                  <div className="row">
                    <div className="col-12 ">
                      {isUserExist ? (
                        <div className="text-danger text-center">
                          User Already Exist
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12 ">
                      <h4>SIGN UP</h4>
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="Enter First name"
                        name="firstname"
                        onChange={(event) => _handleChange(event)}
                      />
                      {errors.firstname ? (
                        <div className="errorMsg text-danger">
                          {errors.firstname}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder="Enter Last name"
                        name="lastname"
                        onChange={(event) => _handleChange(event)}
                      />
                      {errors.lastname ? (
                        <div className="errorMsg text-danger">
                          {errors.lastname}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={(event) => _handleChange(event)}
                      />
                      {errors.email ? (
                        <div className="errorMsg text-danger">
                          {errors.email}
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
                        name="password"
                        onChange={(event) => _handleChange(event)}
                      />
                      {errors.password ? (
                        <div className="errorMsg text-danger">
                          {errors.password}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="password"
                        className="form-control"
                        id="confirm_password"
                        placeholder="Enter Confirm password"
                        name="confirm_password"
                        onChange={(event) => _handleChange(event)}
                      />
                      {errors.confirm_password ? (
                        <div className="errorMsg text-danger">
                          {errors.confirm_password}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="admin-login">
                    <button type="submit" className="btn">
                      Sign Up
                    </button>
                    <button
                      type="submit"
                      className="btn reg-btn"
                      onClick={backToLogin}
                    >
                      Back to Login
                    </button>
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
export default SignUpForm;
