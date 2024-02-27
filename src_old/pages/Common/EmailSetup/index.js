import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import AdminLayout from "../../../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEmailSetup, updateEmailSetup } from "../../../Services/Store/Common/emailSetup/emailSetup.action";
import { emailSetupSelector } from "../../../Services/Store/Common/emailSetup/emailSetup.selector";
import "./index.css";
import ConfirmationPage from "./ConfirmationPage";
import ConfirmationEmail from "./ConfirmationEmail";
import GroupConfirmationPageEmail from "./GroupConfirmationPageEmail";
import CancellationPage from "./CancellationPage";
import InviteEmailRegistrant from "./InviteEmailRegistrant";
import CancellationEmail from "./CancellationEmail";
import ExhibitorsConfirmationPage from "./ExhibitorsConfirmationPage";
import ExhibitorsConfirmationEmail from "./ExhibitorsConfirmationEmail";
import ExhibitorsCancellationPage from "./ExhibitorsCancellationPage";
import ExhibitorsCancellationEmail from "./ExhibitorsCancellationEmail";

const EmailSetup = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [emailSetupData, setEmailSetupData] = useState([]);
  const [fields, setFields] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailSetup = useSelector(emailSetupSelector);
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

    if (lAccountID && lEventID) {
      dispatch(getEmailSetup({ lAccountID, lEventID }));
    }
  }, []);

  useEffect(() => {
    if (
      emailSetup.emailSetup !== undefined &&
      emailSetup.emailSetup.error_code === 0
    ) {
      const emailSetupResult = emailSetup.emailSetup.result;
      if (emailSetupResult) {
        setEmailSetupData(emailSetupResult);
      } else {
        setEmailSetupData([]);
      }
    } else {
      setEmailSetupData([]);
    }
  }, [emailSetup]);

  const setSubmitResult = data => {
   // 
    const newObj = Object.keys(emailSetupData).reduce((accumulator, key) => {
      if (data[key]) {
        emailSetupData[key] = data[key]
        return {...accumulator, [key]: data[key]};
      }
      return {...accumulator, [key]: emailSetupData[key]};
    }, {});
    setFields(newObj)
  }

  const _handleSubmit = event => {
    if(userId && eventId){
      const postData = fields
      dispatch(updateEmailSetup(postData))
    }
  }

  return (
    <>
      <AdminLayout pageHeading="Text for Confirmation page and Confirmation Email">
        <div className="container-fluid">
          <div className="container-fluid demo">
            <div className="row">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Confirmation Page</Accordion.Header>
                  <Accordion.Body>
                    <ConfirmationPage
                      confirmationPage={emailSetupData.mConfirmationPageText}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Confirmation Email</Accordion.Header>
                  <Accordion.Body>
                    <ConfirmationEmail
                      confirmationEmail={emailSetupData.mConfirmationEmailText}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Group Confirmation Page and Email
                  </Accordion.Header>
                  <Accordion.Body>
                    <GroupConfirmationPageEmail
                      groupConfirmationPageEmail={
                        emailSetupData.mConfirmationEmailTextGrp
                      }
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Cancellation Page</Accordion.Header>
                  <Accordion.Body>
                    <CancellationPage
                      cancellationPage={emailSetupData.mCancellationPageText}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>Cancellation Email</Accordion.Header>
                  <Accordion.Body>
                    <CancellationEmail
                      cancellationEmail={emailSetupData.mCancellationEmailText}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    Email Invite From Registrant
                  </Accordion.Header>
                  <Accordion.Body>
                    <InviteEmailRegistrant
                      inviteEmailRegistrant={emailSetupData.mInviteEmailText}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>Exhibitors Confirmation Page</Accordion.Header>
                  <Accordion.Body>
                    <ExhibitorsConfirmationPage
                      exhibitorsConfirmationPage={emailSetupData.mConfirmationPageTextExh}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="7">
                  <Accordion.Header>Exhibitors Confirmation Email</Accordion.Header>
                  <Accordion.Body>
                    <ExhibitorsConfirmationEmail
                      exhibitorsConfirmationEmail={emailSetupData.mConfirmationEmailTextExh}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="8">
                  <Accordion.Header>Exhibitors Cancellation Page</Accordion.Header>
                  <Accordion.Body>
                    <ExhibitorsCancellationPage
                      exhibitorsCancellationPage={emailSetupData.mCancellationPageTextExh}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="9">
                  <Accordion.Header>Exhibitors Cancellation Email</Accordion.Header>
                  <Accordion.Body>
                    <ExhibitorsCancellationEmail
                      exhibitorsCancellationEmail={emailSetupData.mCancellationEmailTextExh}
                      backData={(data)=>setSubmitResult(data)}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                
              </Accordion>
              <button onClick={(event)=>_handleSubmit(event)} type="submit" className="btn">Save</button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default EmailSetup;
