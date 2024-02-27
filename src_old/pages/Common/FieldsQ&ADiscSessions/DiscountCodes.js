import React, { useState, useEffect } from "react";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { CustomQuestionsForm } from "./CustomQuestionsForm";
import { DiscountCodesForm } from "./DiscountCodesForm";
import "./index.css";

export default function DiscountCodes(props) {
  const [showModel, setShowModel] = useState(false);
  const [clearFields, setClearFields] = useState(false);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [discountId, setDiscountId] = useState("");

  const callPageRecords = (discountCodesData) => {
    if (discountCodesData && discountCodesData.length > 0) {
      return discountCodesData.map((data, index) => (
        <tr key={index} onClick={() => _handleEditClick(data)}>
          <td>{data.sCode}</td>
          <td>{data.sName}</td>
          <td>
            {data.nExtraFieldRequired === 0
              ? "Not Required"
              : data.nExtraFieldRequired === 1
              ? "Required"
              : ""}
          </td>
          <td>{data.dAmount}</td>
          <td>{data.sApplyToRegTypes}</td>
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
          <td colSpan="12">No Record Found</td>
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
      if (data && data.lDiscountID !== undefined) {
        if (sessionStorage.getItem("discountId")) {
          sessionStorage.removeItem("discountId");
        }
        sessionStorage.setItem("discountId", JSON.stringify(data.lDiscountID));
        setDiscountId(data.lDiscountID);
        setShowModel(true);
        setClearFields(false);
        props.fetchDiscountCodesById(data.lDiscountID);
      }
    }
  };

  const _handleAddClick = () => {
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
                            Add Discount Codes&nbsp;
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
                            <th>Extra Field </th>
                            <th>Amount </th>
                            <th>Apply to Reg Types </th>
                            <th>Status </th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.getDiscountCodes !== "" ? (
                            callPageRecords(props.getDiscountCodes)
                          ) : (
                            <tr>
                              <td colSpan={20}>No record Found</td>
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
        </div>
        <ModalBox
          className="eventForm_model"
          show={showModel}
          onHide={() => {
            setShowModel(false);
          }}
        >
          <DiscountCodesForm
            userId={userId}
            eventId={eventId}
            discountId={discountId}
            clearFields={clearFields}
            regScodeData={props.regScodeData}
            discountCodesByIdData={props.discountCodesByIdData}
            showModel={(data) => setShowModel(data)}
            addDiscountCodes={(data) => props.addDiscountCodes(data)}
            updateDiscountCodes={(data) => props.updateDiscountCodes(data)}
          />
        </ModalBox>
      </div>
    </>
  );
}
