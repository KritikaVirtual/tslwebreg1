import React, { useState, useEffect } from "react";
import moment from "moment";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import "./index.css";
import { ExtraConfigurationSessionForm } from "./ExtraConfigurationSessionForm";

export default function ExtraConfigurationForSessions(props) {
    const [showModel, setShowModel] = useState(false);
    const [clearFields, setClearFields] = useState(false);
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");
    const [itemID, setItemID] = useState("");

    const _handleAddClick = () => {
        const lAccountID = JSON.parse(localStorage.getItem("userId"));
        const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
        if (lAccountID && lEventID) {
          setUserId(lAccountID);
          setEventId(lEventID);
          setShowModel(true);
          setClearFields(true);
          setItemID("");
        }
      };

      const _handleEditClick = (data) => {
        const lAccountID = JSON.parse(localStorage.getItem("userId"));
        const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
        if (lAccountID && lEventID) {
          setUserId(lAccountID);
          setEventId(lEventID);
          if (data && data.lItemID !== undefined) {
            if (sessionStorage.getItem("lItemID")) {
              sessionStorage.removeItem("lItemID");
            }
            sessionStorage.setItem("lItemID", JSON.stringify(data.lItemID));
            setItemID(data.lItemID);
            setShowModel(true);
            setClearFields(false);
            props.fetchExtraConfigById(data.lItemID);
          }
        }
      };

      const callPageRecords = (extraConfigData) => {
        if (extraConfigData && extraConfigData.length > 0) {
          return extraConfigData.map((data, index) => (
            <tr onClick={() => _handleEditClick(data)} key={index}>
                <td>{data.sCode}</td>
                <td>{data.nType===0?'Seperator':data.nType===1?'Label Only':data.nType===2?'Label with textbox':''}</td>
                <td>{data.nPosition===0?'Before':data.nPosition===1?'After':''}</td>
                <td>{data.lBeforeAfterItemID}</td>
                <td>{data.mLabel}</td>
                <td>{data.nSize===0?'N/A':data.nSize===1?'Small Textbox':data.nSize===2?'Medium Textbox':data.nSize===3?'Large Textbox':data.nSize===4?'Multi-line Textbox':''}</td>
                <td>{data.nRequired===0?'No':data.nRequired===1?'Yes':''}</td>
                <td>{data.nStatus===0?'Active':data.nStatus===1?'Inactive':data.nStatus===2?'Deleted':''}</td>
                <td>{data.sApplyToRegTypes}</td>
            </tr>
          ));
        } else {
          return (
            <tr className="text-center">
              <td colSpan={20}>No Record Found</td>
            </tr>
          );
        }
      };

    return (
        <div className="panel-heading" role="tab" id="headingOne">
            <div className="panel-body">
              <div className="card  mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="dataTable_wrapper"
                      className="dataTables_wrapper dt-bootstrap4"
                    >
                        <label>Extra Configuration for Sessions (allows to add separators, labels and labels with text boxes before or after specific session)</label>
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
                            Add Extra Configuration &nbsp;
                            <i className="fa fa-plus fa-sm"></i>
                          </button>
                        </div>
                      </div>
                      <br />
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th>Code </th>
                            <th>Type </th>
                            <th>Position </th>
                            <th>Session </th>
                            <th>Label </th>
                            <th>Size</th>
                            <th>Required</th>
                            <th>Status</th>
                            <th>Apply To Reg Types</th>
                          </tr>
                        </thead>
                        <tbody>
                        {props.extraConfigForSession !== undefined && props.extraConfigForSession !== "" ? (
                                callPageRecords(props.extraConfigForSession)
                            ) : (
                                <tr>
                                <td colSpan={12}>No record Found</td>
                                </tr>
                            )
                        }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ModalBox
          className="eventForm_model"
          show={showModel}
          onHide={() => {
            setShowModel(false);
          }}
        >
          <ExtraConfigurationSessionForm
            userId={userId}
            eventId={eventId}
            clearFields={clearFields}
            showModel={(data) => setShowModel(data)}
            regScodeData={props.regScodeData}
            addExtraConfigurationForSessions={(data)=>props.addExtraConfigurationForSessions(data)}
            extraConfigForSessionByIdData={props.extraConfigForSessionByIdData}
            updateExtraConfigurationForSessions={(data)=>props.updateExtraConfigurationForSessions(data)}
            itemId={itemID}
            getIndividualSessionData={props.getIndividualSessionData}
          />
        </ModalBox>
        </div>
    )
}