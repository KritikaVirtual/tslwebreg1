import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const [eventName, setEventName] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("eventName"))) {
      const getEventName = JSON.parse(sessionStorage.getItem("eventName"));
      setEventName(getEventName);
    }
  }, []);
  const handleChangeLogout = (event) => {
    if (event.target.value === "Logout") {
      const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
      const eventId = sessionStorage.getItem('eventId') ? sessionStorage.getItem('eventId') : ''
      
      sessionStorage.clear();
      localStorage.clear();

      if(userId){
        localStorage.setItem('userId',userId)
      }
      if(eventId){
        sessionStorage.setItem('eventId',eventId)
      }
      
      navigate("/");
    }
    if (event.target.value === "settings") {
      navigate("/account");
    }
  };

  return (
    <div className="dashboard-header navbar navbar-expand navbar-light topbar  static-top shadow">
      <div className="container-fluid">
        <div className="row ">
          <div className=" col-md-6 col-xs-12 page-name-wrap">
            <i className="fa fa-home" aria-hidden="true"></i>
            <h4>{eventName ? eventName : props.pageHeading}</h4>
          </div>
          <div className="col-md-6 col-xs-12">
            <ul>
              <li>
                <img
                  src="images/profile-image.png"
                  alt=""
                  className="img-fluid"
                />
              </li>
              <li>
                <select
                  onChange={(event) => handleChangeLogout(event)}
                  name="profile"
                  id="profile"
                >
                  <option value="Admin">My Account</option>
                  <option value="settings">Settings</option>
                  <option value="Logout">Logout</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
