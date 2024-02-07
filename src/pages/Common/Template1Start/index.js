import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MultiStep from 'react-multistep'
import AdminLayout from "../../../Layout";
import "./index.css";
import { Welcome } from "./Welcome";

export function Template1Start(props) {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [regId, setRegId] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log('registrantsData',registrantsData)

  useEffect(() => {
    const loginCheck = JSON.parse(sessionStorage.getItem("adminToken"))
      ? JSON.parse(sessionStorage.getItem("adminToken"))
      : JSON.parse(sessionStorage.getItem("clientToken"))
      ? JSON.parse(sessionStorage.getItem("clientToken"))
      : "";
    if (!loginCheck) { 
      navigate("/");
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    if (lAccountID) {
      setUserId(lAccountID);
    }
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    if (lEventID) {
      setEventId(lEventID);
    }
  });

  useEffect(() => {
    const loginCheck = JSON.parse(sessionStorage.getItem("adminToken"))
      ? JSON.parse(sessionStorage.getItem("adminToken"))
      : JSON.parse(sessionStorage.getItem("clientToken"))
      ? JSON.parse(sessionStorage.getItem("clientToken"))
      : "";
    if (!loginCheck) {
      navigate("/");
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    if (lAccountID) {
      setUserId(lAccountID);
    }
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    if (lEventID) {
      setEventId(lEventID);
    }

    const lRegID = JSON.parse(sessionStorage.getItem("regId"));

    if (lAccountID && lEventID) {
    }
  }, []);

  return (
    <>
      <AdminLayout pageHeading="Template 1 Start">
        <div className="container-fluid">
          <div className="container-fluid demo">
            <div class="reg-login">
              <div class="container">
                <div class="row log-reg-wrap">
                  <div class="col-md-12 col-xs-12">
                    <div class="regs-head">
                      <h2>EVENT HEADER</h2>
                    </div>
                    <div className="templateBtn">
                      <button className="d-none d-sm-inline-block btn btn-light-green">
                        Register Group
                      </button> <br/>
                      <button className="d-none d-sm-inline-block btn btn-light-green">
                        Register Individual
                      </button> <br/>
                      <button className="d-none d-sm-inline-block btn btn-light-green">
                        Register Booth Staff
                      </button>

                    </div>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
