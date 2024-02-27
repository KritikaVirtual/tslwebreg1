import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./index.css";
const Sidebar = () => {
  const [urlName, setUrlName] = useState("");
  let location = useLocation();
  //const loginData=useSelector((state)=>state.user);
  useEffect(() => {
    let pathBaseName = location;
    setUrlName(pathBaseName.pathname);
  }, [location]);

  return (
    <>
      <div className="side-dashboard-wrap">
        <ul
          className="navbar-nav  sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
            </div>
            <div className="sidebar-brand-text mx-3"><img src="./assets/images/adminlogo-dashboard.png" alt="" className="img-fluid" /></div> 
        </a> */}
          <Link to="/userList">
            <div className="sidebar-brand-icon rotate-n-15"></div>
            <div className="sidebar-brand-text mx-3">
              <img
                src="./assets/images/adminlogo-dashboard.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </Link>

          <div className="sidebar-heading">MAIN</div>
          <li className={`nav-item ${urlName == "/event" ? "active" : ""}`}>
            <Link className="nav-link" to="/event">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <span> Events List</span>
            </Link>
          </li>

          <li className={`nav-item ${urlName == "/account" ? "active" : ""}`}>
            <Link className="nav-link" to="/account">
              <i className="fa fa-user" aria-hidden="true"></i>
              <span> Account</span>
            </Link>
          </li>

          <li className={`nav-item ${urlName == "/members" ? "active" : ""}`}>
            <Link className="nav-link" to="/members">
              <i className="fa fa-users" aria-hidden="true"></i>
              <span> Members</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/reportDesigner" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-sticky-note" aria-hidden="true"></i>
              <span> Report Designer</span>
            </Link>
          </li>

          <li className={`nav-item ${urlName == "/ceCentral" ? "active" : ""}`}>
            <Link className="nav-link" to="">
              <i className="fa fa-certificate" aria-hidden="true"></i>
              <span> CE Central</span>
            </Link>
          </li>

          <div className="sidebar-heading">CURRENT EVENT</div>

          <li className={`nav-item ${urlName == "/dashboard" ? "active" : ""}`}>
            <Link className="nav-link" to="">
              <i className="fa fa-home" aria-hidden="true"></i>
              <span> Dashboard</span>
            </Link>
          </li>

          <li className={`nav-item ${urlName == "/eventinfo" ? "active" : ""}`}>
            <Link className="nav-link" to="/eventinfo">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <span> Event Info</span>
            </Link>
          </li>

          <li
            className={`nav-item ${urlName == "/pagedesign" ? "active" : ""}`}
          >
            <Link className="nav-link" to="/pagedesign">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span> Page Design/Reg Types Att.</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/questionnaire" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="/questionnaire">
              <i className="fa fa-thumb-tack" aria-hidden="true"></i>
              <span> Fields,Q&A,Disc,Sessions</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/pagedesigngrpreg" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="/pagedesigngrpreg">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span> Page Design Group Reg</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/pagedesignexh" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-file" aria-hidden="true"></i>
              <span> Page Design Exhibitors</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/exhibitorList" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="/exhibitorList">
              <i className="fa fa-list-alt" aria-hidden="true"></i>
              <span> Exhibitors List</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/allboothmemberslist" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-list" aria-hidden="true"></i>
              <span> Booth Members List</span>
            </Link>
          </li>

          <li
            className={`nav-item ${urlName == "/emailSetup" ? "active" : ""}`}
          >
            <Link className="nav-link" to="/emailSetup">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span> Email Setup</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/pagedesignself" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-print" aria-hidden="true"></i>
              <span> Page Design Self Print</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/sesstrackinglist" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-address-card-o" aria-hidden="true"></i>
              <span> Sessions Tracking</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/manageSpeakers" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-microphone" aria-hidden="true"></i>
              <span> Speakers List</span>
            </Link>
          </li>

          <li className={`nav-item ${urlName == "/reglist" ? "active" : ""}`}>
            <Link className="nav-link" to="/reglist">
              <i className="fa fa-list-alt" aria-hidden="true"></i>
              <span> Registrants List</span>
            </Link>
          </li>

          <li className={`nav-item ${urlName == "/emailreg" ? "active" : ""}`}>
            <Link className="nav-link" to="">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span> Email Registrants</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/miconferenceSetup" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-comments" aria-hidden="true"></i>
              <span> MiConference Setup</span>
            </Link>
          </li>
          <li className={`nav-item ${urlName == "/reports" ? "active" : ""}`}>
            <Link className="nav-link" to="">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span> Reports</span>
            </Link>
          </li>

          <li className={`nav-item ${urlName == "/printreg" ? "active" : ""}`}>
            <Link className="nav-link" to="">
              <i className="fa fa-microchip" aria-hidden="true"></i>
              <span> Onsite</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/orderonlineform" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span> Online Order Form</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/managepushnotifications" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-bell" aria-hidden="true"></i>
              <span> Push Notification</span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              urlName == "/virtualconferenceSetup" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="">
              <i className="fa fa-users" aria-hidden="true"></i>
              <span> Virtual Conference Setup</span>
            </Link>
          </li>

          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
            ></button>
          </div>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
