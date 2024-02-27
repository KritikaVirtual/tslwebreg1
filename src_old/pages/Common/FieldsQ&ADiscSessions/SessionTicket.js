import React, { useState, useEffect } from "react";
import moment from "moment";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { IndividualSessionForm } from "./IndividualSessionForm";
import "./index.css";
import ExtraConfigurationForSessions from "./ExtraConfigurationForSessions";

export default function SessionTicket(props) {
  const [showModel, setShowModel] = useState(false);
  const [clearFields, setClearFields] = useState(false);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [discountId, setDiscountId] = useState("");
  const [sessionID, setSessionID] = useState("");
  
  const callPageRecords = (individualSessionData) => {
    if (individualSessionData && individualSessionData.length > 0) {
      console.log('individualSessionData',individualSessionData)
      return individualSessionData.map((data, index) => (
        <tr key={index} onClick={() => _handleEditClick(data)}>
          <td>{data.sCode}</td>
          <td>{data.sName}</td>
          <td>
            {data.nMaxQty}
          </td>
          <td>{data.dPrice1}</td>
          <td>{(data.dtPrice1 && data.dtPrice1!=="0000-00-00") ? moment(data.dtPrice1).format("MM/DD/YYYY") : ''}</td>
          <td>{data.dPrice2}</td>
          <td>{(data.dtPrice2 && data.dtPrice1!=="0000-00-00") ? moment(data.dtPrice2).format("MM/DD/YYYY") : ''}</td>
          <td>{data.dPrice3}</td>
          <td>{(data.dtPrice3 && data.dtPrice1!=="0000-00-00") ? moment(data.dtPrice3).format("MM/DD/YYYY") : ''}</td>
          <td>{(data.bPrintTicket==1) ? 'Yes' :'No'}</td>
          <td>{data.sPrintTicketText}</td>
          <td>{data.sApplyToRegTypes}</td>
          <td>{data.sAutoTicketForRegTypes}</td>
          <td>
            {data.nStatus === 0
              ? "Active"
              : data.nStatus === 1
              ? "Inactive"
              : data.nStatus === 2
              ? "Deleted"
              : ""}
          </td>
        </tr>
      ));
    } else {
      return (
        <tr className="text-center">
          <td colSpan="14">No Record Found</td>
        </tr>
      );
    }
  };

  const _handleEditClick = (data) => {
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    if (lAccountID && lEventID) {
      setUserId(lAccountID);
      setEventId(lEventID);
      if (data && data.lSessionID !== undefined) {
        if (sessionStorage.getItem("lSessionID")) {
          sessionStorage.removeItem("lSessionID");
        }
        sessionStorage.setItem("lSessionID", JSON.stringify(data.lSessionID));
        //setDiscountId(data.lSessionID);
        setSessionID(data.lSessionID);
        setShowModel(true);
        setClearFields(false);
        props.fetchSessionById(data.lSessionID);
      }
    }
  };

  const _handleAddClick = () => {
    if(sessionStorage.getItem('lSessionID')){
      sessionStorage.removeItem('lSessionID')
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    if (lAccountID && lEventID) {
      setUserId(lAccountID);
      setEventId(lEventID);
      setShowModel(true);
      setClearFields(true);
    }
  };

  return (
    <>
      <div
        className="panel-group dashboard-table-format"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <div className="panel-body">
              <div className="card  mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="dataTable_wrapper"
                      className="dataTables_wrapper dt-bootstrap4"
                    >
                      <div className="col-sm-12 col-md-6">
                        <div
                          className="dataTables_length"
                          id="dataTable_length"
                        >
                          <button
                            type="button"
                            className="d-none d-sm-inline-block btn"
                            onClick={() => _handleAddClick()}
                          >
                            Add Individual Session &nbsp;
                            <i className="fa fa-plus fa-sm"></i>
                          </button>
                        </div>
                      </div>
                      <br />
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th>Code </th>
                            <th>Name </th>
                            <th>Max Qty </th>
                            <th>Price 1 </th>
                            <th>Price 1 Date </th>
                            <th>Price 2</th>
                            <th>Price 2 Date</th>
                            <th>Price 3</th>
                            <th>Price 3 Date</th>
                            <th>Print</th>
                            <th>Print Text</th>
                            <th>Apply to Reg Types</th>
                            <th>Auto ticket for Reg Types</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.getIndividualSessionData !== "" ? (
                            callPageRecords(props.getIndividualSessionData)
                          ) : (
                            <tr>
                              <td colSpan={14}>No record Found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ExtraConfigurationForSessions 
          extraConfigForSession={props.extraConfigForSession} 
          regScodeData={props.regScodeData} 
          addExtraConfigurationForSessions={(data)=>props.addExtraConfigurationForSessions(data)}
          fetchExtraConfigById={(data)=>props.fetchExtraConfigById(data)}
          extraConfigForSessionByIdData={props.extraConfigForSessionByIdData}
          updateExtraConfigurationForSessions={(data)=>props.updateExtraConfigurationForSessions(data)}
          getIndividualSessionData={props.getIndividualSessionData}
          />
        </div>
        <ModalBox
          className="eventForm_model"
          show={showModel}
          onHide={() => {
            setShowModel(false);
          }}
        >
          <IndividualSessionForm
            userId={userId}
            eventId={eventId}
            clearFields={clearFields}
            showModel={(data) => setShowModel(data)}
            addIndividualSession={(data)=>props.addIndividualSession(data)} 
            updateIndividualSession={(data)=>props.updateIndividualSession(data)}
            regScodeData={props.regScodeData}
            individualSessionDataByIdData={props.individualSessionDataByIdData}
            sessionID={sessionID}
          />
        </ModalBox>
      </div>
    </>
  );
}
