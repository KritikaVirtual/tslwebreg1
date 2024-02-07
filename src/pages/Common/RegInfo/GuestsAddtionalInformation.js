import React, { useState, useEffect } from "react";
import "./index.css";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { GuestsAddtionalInformationForm } from "./GuestsAdditionalInformationForm";
export function GuestsAddtionalInformation(props) {
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
    if (data.lGuestID) {
      sessionStorage.setItem("guestId", data.lGuestID);
      props.getGuestAddditionalInformationById({
        lAccountID: props.userId,
        lEventID: props.eventId,
        lRegID: props.regId,
        lGuestID: data.lGuestID,
      });
      props.getQuestionsGuest({
        lAccountID: props.userId,
        lEventID: props.eventId
      });
      props.getAnswersGuest({
        lAccountID: props.userId,
        lEventID: props.eventId,
        lRegID: data.lGuestID,
      });
      setShowModel(true);
      setClearFields(false);
    }
  };

  const handleAddClick = (data) => {
    if (sessionStorage.getItem("guestId")) {
      sessionStorage.removeItem("guestId");
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

  const callPageRecords = (guestAdditionalRegistrantData) => {
    if (
      guestAdditionalRegistrantData &&
      guestAdditionalRegistrantData.length > 0
    ) {
      return guestAdditionalRegistrantData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>{data.sFirstName}</td>
          <td>{data.sLastName}</td>
          <td>{data.sTitle}</td>
          <td>{data.sPhone}</td>
          <td>{data.sEmail}</td>
          <td>
            {data.nType === 0
              ? "Guest"
              : data.nType === 1
              ? "Additional Registrant"
              : ""}
          </td>
          <td>{data.dAmount}</td>
          <td>
            {data.nStatus == 0
              ? "Active"
              : data.nStatus == 1
              ? "Deleted"
              : data.nStatus == 2
              ? "Cancel"
              : ""}
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
                                      Add New Guest and Additional Registrant
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
                                  <li>
                                    {searchType == "nType" ? (
                                      <select
                                        className="form-control"
                                        onChange={handleChange}
                                      >
                                        <option value="">Select Type</option>
                                        <option value="0">Guest</option>
                                        <option value="1">
                                          Additional Registrant
                                        </option>
                                      </select>
                                    ) : searchType == "nStatus" ? (
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
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Title</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {props.guestRegistrantData !== undefined &&
                              props.guestRegistrantData.length > 0 ? (
                                callPageRecords(props.guestRegistrantData)
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
          />
        </ModalBox>
      </div>
    </>
  );
}
