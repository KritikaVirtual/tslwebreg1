import React, { useState, useEffect } from "react";
import "./index.css";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { GuestsAddtionalInformationForm } from "./GuestsAdditionalInformationForm";
import moment from "moment";
export function GuestsAddtionalInformation(props) {
  const [showModel, setShowModel] = useState(false);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [registrantRegID, setRegistrantRegID] = useState("");
  const [searchType, setSearchType] = useState("sFirstName");
  const [enable, setEnable] = useState(true);
  const [clearFields, setClearFields] = useState(false);

  const _handleEditClick = (data) => {
    if (data.lRegID) {
      sessionStorage.setItem("RegistrantRegId", data.lRegID);
      setRegistrantRegID(data.lRegID);
      // props.getGuestAddditionalInformationById({
      //   lAccountID: props.userId,
      //   lEventID: props.eventId,
      //   lRegID: data.lRegID
      // });
      props.getSessionsData({
        lAccountID: props.userId,
        lEventID: props.eventId,
        lRegID: data.lRegID
      });
      props.getQuestionsGuest({
        lAccountID: props.userId,
        lEventID: props.eventId
      });
      props.getAnswersGuest({
        lAccountID: props.userId,
        lEventID: props.eventId,
        lRegID: data.lRegID,
      });
      setShowModel(true);
      setClearFields(false);
    }
  };

  const handleAddClick = (data) => {
    if (sessionStorage.getItem("RegistrantRegId")) {
      sessionStorage.removeItem("RegistrantRegId");
    }
    setClearFields(true);
    setShowModel(true);
  };

  const searchOntextBases = (searchText) => {
    if (searchType) {
      props.filterData({
        searchType: searchType,
        search: searchText,
      });
      setEnable(true);
    }
  };

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
    if (enable) {
      setTimeout(() => searchOntextBases(event.target.value), 500);
      setEnable(false);
    }
  };

  const handleSearhChange = (event) => {
    setSearchType(event.target.value);
  };

  const callPageRecords = (registrantData) => {
    if (
      registrantData &&
      registrantData.length > 0
    ) {
      return registrantData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>{data.lRegID}</td>
          <td>{data.sFirstName}</td>
          <td>{data.sLastName}</td>
          <td>{data.sTitle}</td>
          <td>{data.sPhone}</td>
          <td>{data.sEmail}</td>
          <td>
            {data.sCode}
          </td>
          <td>{data.dRegAmount}</td>
          <td>{data.discountCode}</td>
          <td>{data.discountAmount}</td>
          <td>{data.sDiscountExtraText}</td>
          <td>{data.dSpecialDiscountAmt}</td>
          <td>
            {data.nStatus == 0
              ? "Active"
              : data.nStatus == 1
              ? "Deleted"
              : data.nStatus == 2
              ? "Cancel"
              : ""}
          </td>
          <td>{ moment(data.dtCreatedOn).format("YYYY-MM-DD") }</td>
          <td align="center">
            <button
              type="button"
              className="bd-none"
              onClick={() => _handleEditClick(data)}
            >
              <i className="fa fa-fw fa-edit"></i>
            </button>            
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
  return (
    <>
      <div className="row">
        {!props.regId ? (
          <div className="col-md-12">
            For new registrants, you need to fill up the first section and save
            in order to be able to add guests and/or additional registrants.
          </div>
        ) : (
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
                                      Add Registrant
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
                                      <select
                                        name="selectType"
                                        id=""
                                        className="form-control"
                                        onChange={(event) =>
                                          handleSearhChange(event)
                                        }
                                      >
                                        <option value="">Select Type</option>
                                        <option value="sFirstName">
                                          First Name
                                        </option>
                                        <option value="sLastName">
                                          Last Name
                                        </option>
                                        <option value="sTitle">Title</option>
                                        <option value="sPhone">Phone</option>
                                        <option value="sEmail">Email</option>
                                        <option value="nType">Type</option>
                                        <option value="dAMount">Amount</option>
                                        <option value="nStatus">Status</option>
                                      </select>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Reg ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Title</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Reg Type</th>
                                <th>Reg Amt</th>
                                <th>Disc Code</th>
                                <th>Disc Amt</th>
                                <th>Disc Text</th>
                                <th>Spec Disc</th>
                                <th>Status</th>
                                <th>Reg Date</th>                                
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {props.registrantInfo !== undefined &&
                              props.registrantInfo.length > 0 ? (
                                callPageRecords(props.registrantInfo)
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
        )}
        <ModalBox
          className="eventForm_model"
          show={showModel}
          onHide={() => {
            setShowModel(false);
          }}
        >
          <GuestsAddtionalInformationForm
            userId={props.userId}
            eventId={props.eventId}
            regId={props.regId}
            registrantRegID = {registrantRegID}
            regTypesData = {props.regTypesData}
            getRegSessionsById = {(postData) =>props.getRegSessionsById(postData)}
            getRegistrantInfoByID = {(postData) => props.getRegistrantInfoByID(postData)}
            sendRegistrantInfoByID = {props.sendRegistrantInfoByID}
            sendSessionsData = {props.sendSessionsData}
            saveGuestAddditionalInformation={(postData) =>
              props.saveGuestAddditionalInformation(postData)
            }
            updateGuestAddditionalInformation={(postData) =>
              props.updateGuestAddditionalInformation(postData)
            }
            guestRegistrantDataByID={props.guestRegistrantDataByID}
            questionsRegistrantData={props.questionsRegistrantData}
            answersGuestData={props.answersGuestData}
            showModel={(data) => setShowModel(data)}
            getGuestAddRegAmount={(data) => props.getGuestAddRegAmount(data)}
            regTypesAmountData={props.regTypesAmountData}
            getRegAmount={(data) => props.getRegAmount(data)}
            clearFields={clearFields}
            getRegTypesAmount={(data)=>props.getRegTypesAmount(data)}
            discountCodeByRegId={(data) => props.discountCodeByRegId(data)}
            sendDiscountCodeByRegId={props.sendDiscountCodeByRegId}
            getDiscountAmtByID = {(discountId) => props.getDiscountAmtByID(discountId)}
            discountAmtByID = {props.discountAmtByID}
          />
        </ModalBox>
      </div>
    </>
  );
}
