import React, { useState, useEffect } from "react";
import moment from "moment";
import "./index.css";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { SessionsForm } from "./SessionsForm.js";
import { PaymentsForm } from "./PaymentsForm";

export function Payments(props) {
  const [showModel, setShowModel] = useState(false);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("sFirstName");
  const [enable, setEnable] = useState(true);
  const [clearFields, setClearFields] = useState(false);

  const _handleEditClick = (data) => { 
    if (data.lPaymentID) {
      sessionStorage.setItem("paymentId", data.lPaymentID);
      props.getRegPaymentsByID({
        lAccountID: props.userId,
        lEventID: props.eventId,
        lRegID: props.regId,
        lPaymentID: data.lPaymentID,
      });
      setShowModel(true);
      setClearFields(false);
    }
  };

  const handleAddClick = (data) => {
    if (
      sessionStorage.getItem("paymentId") !== undefined &&
      sessionStorage.getItem("paymentId") > 0
    ) {
      sessionStorage.removeItem("paymentId");
    }
    setClearFields(true);
    setShowModel(true);
  };

  const searchOntextBases = (searchText) => {
    //   if (searchType) {
    //     props.filterSessionsData({
    //       searchType: searchType,
    //       search: searchText,
    //     });
    //     setEnable(true);
    //   }
  };

  const handleChange = (event) => {
    //   setSearchKeyword(event.target.value);
    //   if (enable) {
    //     setTimeout(() => searchOntextBases(event.target.value), 500);
    //     setEnable(false);
    //   }
  };

  const handleSearhChange = (event) => {
    //   setSearchType(event.target.value);
  };

  const callPageRecords = (regPaymentsData) => {
    if (regPaymentsData && regPaymentsData.length > 0) {
      return regPaymentsData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>
            {data.dtDate && data.dtDate !== "0000-00-00"
              ? moment(data.dtDate).format("MM/DD/YYYY")
              : ""}
          </td>
          <td>
            {data.nType == 0
              ? "Credit Card"
              : data.nType == 1
              ? "Cheque"
              : data.nType == 2
              ? "Cash"
              : ""}
          </td>
          <td>{data.sPayor}</td>
          <td>{data.sCompany}</td>
          <td>{data.sNumber}</td>
          <td>{data.sExpDate}</td>
          <td>{data.dAmount}</td>
          <td>{data.sTransactionID}</td>
          <td>{data.sInvoice}</td>
          <td>{data.sStatus}</td>
          <td>
            <button className="btn">Refund</button>
          </td>
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

  const callSessionConfigRecords = (sessionsConfigData) => {
    // if (sessionsConfigData && sessionsConfigData.length > 0) {
    //   return props.sessionsConfigData.map((data, index) => (
    //     <option value={data.lSessionID}>
    //       {data.sCode + " - " + data.sName}
    //     </option>
    //   ));
    // }
  };

  return (
    <>
      <div className="row">
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
                        <div className="row main-filter-show exhibitor-filter-show">
                          <div className="col-sm-12 col-md-6 ">
                            <div className="add-buttons">
                              <ul>
                                <li>
                                  <button
                                    className="d-none d-sm-inline-block btn"
                                    onClick={(event) => handleAddClick(event)}
                                  >
                                    Add Payments
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-6 user_search">
                            <div className="row fillter-wrap">
                              <ul>
                                <li>
                                  <div className="filter-wrap">
                                    {/* <select
                                        name="selectType"
                                        id=""
                                        className="form-control"
                                        onChange={(event) =>
                                          handleSearhChange(event)
                                        }
                                      >
                                        <option value="">Select Type</option>
                                        <option value="lSessionID">
                                          Sessions
                                        </option>
                                        <option value="sAdditionalText">
                                          Answer
                                        </option>
                                        <option value="lQty">Quantity</option>
                                        <option value="dTotal">Total</option>
                                        <option value="s">Status</option>
                                      </select>*/}
                                  </div>
                                </li>
                                <li>
                                  {/* {searchType == "lSessionID" ? (
                                      <select
                                        className="form-control"
                                        onChange={handleChange}
                                      >
                                        <option value="">Select Session</option>
                                        { props.sessionsConfigData
                                          ? callSessionConfigRecords(props.sessionsConfigData)
                                          : ""}
                                        
                                      </select>
                                    ) : searchType == "s" ? (
                                      <select
                                        className="form-control"
                                        onChange={handleChange}
                                      >
                                        <option value="">Select Status</option>
                                        <option value="0">Active</option>
                                        <option value="1">Deleted</option>
                                        <option value="2">Cancel</option>
                                      </select>
                                    ) : (
                                      <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search"
                                        onChange={handleChange}
                                        aria-controls="dataTable"
                                      />
                                    )} */}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th>Date</th>
                              <th>Type</th>
                              <th>Payor</th>
                              <th>Company</th>
                              <th>Number</th>
                              <th>Expiry Date</th>
                              <th>Amount</th>
                              <th>Trans ID</th>
                              <th>Invoice</th>
                              <th>Status</th>
                              <th>Refund</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.regPaymentsData !== undefined &&
                            props.regPaymentsData.length > 0 ? (
                              callPageRecords(props.regPaymentsData)
                            ) : (
                              <tr className="noRecords" colSpan={4}>
                                No Records Found
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-5"></div>
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
          <PaymentsForm
            userId={props.userId}
            eventId={props.eventId}
            regId={props.regId}
            saveRegPayments={(postData) => props.saveRegPayments(postData)}
            regPaymentsDataByID={props.regPaymentsDataByID}
            updateRegPayments={(postData) => props.updateRegPayments(postData)}
            getRegAmount = {(data)=>props.getRegAmount(data)}
            showModel={(data) => setShowModel(data)}
            clearFields={clearFields}
          />
        </ModalBox>
      </div>
    </>
  );
}
