import React,{ useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { useDispatch,useSelector } from "react-redux";
import { checkLoginUser } from "../../../Services/Store/Admin/adminLogin/user.action";
const Login=()=> {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoginStatus, setIsLoginStatus] = useState(1);
    const [applyCheck] = useState(false);
  
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const loginData=useSelector((state)=>state.user);

    useEffect(() => {
      if(JSON.parse(sessionStorage.getItem("adminToken"))){
          setIsLoginStatus(1);
          navigate('/userList');
     }
     else if(loginData && loginData.currentUser.error){
      setIsLoginStatus(0);
     }
    },[loginData]);
    
    const _handleChange = (event) => {
        setIsLoginStatus(1);
        let data = fields;
        data[event.target.name] = event.target.value;
        setFields({ ...data });
    };

    const _validateForm = () => {
        let formFields = fields;
        let response = _validateLogin(formFields, applyCheck);
        setErrors(response.errors);
        return response.formIsValid;
    };

    const _handleSubmit = (event) => {
        event.preventDefault();
        
        if (_validateForm()) {
          const postData = {
            username :fields.username,
            password :fields.password,
          }
          dispatch(checkLoginUser(postData));
        }
    };

  const _validateLogin = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;


    if (!fields["username"] || fields["username"].trim() === '') {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
    }

    if (typeof fields["username"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["username"])) {
            formIsValid = false;
            errors["username"] = "*Please enter valid username.";
        }
    }

    if (!fields["password"] || fields["password"].trim() === '') {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
    }
    else if (fields["password"].length < 4) {
        formIsValid = false;
        errors["password"] = "*please enter minimum 5 character";
    }

      
    return {
        errors : errors,
        formIsValid : formIsValid
    };
  }

  return (
    <>
      <div className="admin-login">
        <div className="container">
            <div className="row login-wrap">
                <div className="col-md-7 col-xs-12 admin-image" >
                  <img src="./assets/images/admin-login-panel.jpg" alt="" className="img-fluid" />
                    <div className="admin-logo">
                        <img src="./assets/images/admin-logo.png" alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-5 col-xs-12">
                  <div className="form-content">
                      <form onSubmit={(event) => _handleSubmit(event)}>
                          <div className="row">
                          {isLoginStatus===0 ? <div className="errorMsg text-danger text-center mb-2">Invalid Credentials</div> : <div className="successMsg text-success"></div>}
                              <div className="col-12 ">
                                  <h4>ADMIN PANEL</h4>
                              </div>
                              <div className="col-md-12 col-xs-12">
                                <input type="text" className="form-control" name="username" placeholder="User Name" onChange={(event) => _handleChange(event)}/>
                                {errors.username ? <div className="errorMsg text-danger">{errors.username}</div> : ''}
                              </div><br/>
                              <div className="col-md-12 col-xs-12">
                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={(event) => _handleChange(event)}/>
                                {errors.password ? <div className="errorMsg text-danger">{errors.password}</div> : ''}
                              </div>
                          </div>
                          <div>
                              <button type="submit" className="btn">Login</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
        </div>
        
      </div>
    </>
  );
};
export default Login;