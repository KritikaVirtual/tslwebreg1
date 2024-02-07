import React, { useState, useEffect } from "react";
import moment from "moment";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { RegistrationTypesForm } from "./RegistrationTypesForm";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";
import Loader from "../../../Components/Ui/loader";

const RegistrationTypes = (props) => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [regTypeId, setRegTypeId] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("sName");
  const [enable, setEnable] = useState(true);
  const [clearFields, setClearFields] = useState(false);
  const [offset,setOffset] = useState(0);
 
  const _handleAddClick = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const eventId = JSON.parse(sessionStorage.getItem("eventId"));
    if (userId && eventId) {
      setUserId(userId);
      setEventId(eventId);
      setRegTypeId("");
      setShowModel(true);
      setClearFields(true);
    }
  };

  const searchOntextBases = (searchText) => {
    if (searchType) {
      props.filterDataRegistrationType({
        searchType: searchType,
        search: searchText,
        offset: offset,
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

  /** For pagination code start here **/

  const handlePageClick = (selectedPage) => {
      setOffset(selectedPage)
      props.filterDataRegistrationType({ name:'registartionTypeSearch',searchType:searchType, search:searchKeyword, offset:selectedPage });
  };
  /** For pagination code end here **/

  const _handleEditClick = (data) => {
    const lRegTypeID = data.lRegTypeID;
    const lAccountID = data.lAccountID;
    const lEventID = data.lEventID;
    if (lRegTypeID !== undefined && lAccountID && lEventID) {
      if (sessionStorage.getItem("regTypeId")) {
        sessionStorage.removeItem("regTypeId");
      }
      sessionStorage.setItem("regTypeId", JSON.stringify(lRegTypeID));
      setUserId(lAccountID);
      setEventId(lEventID);
      setRegTypeId(lRegTypeID);
      setShowModel(true);
      setClearFields(false);
      props.getRegTypesByID({ lAccountID, lEventID, lRegTypeID });
    }
  };

  const callPageRecords = (regTypeData) => {
    if (regTypeData && regTypeData.length > 0) {
      return regTypeData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>{data.sCode}</td>
          <td>{data.sName}</td>
          <td> {data.dEarlyAmt}</td>
          <td> {data.dPricePerAddRegEarly}</td>
          <td> {data.dPricePerGuestEarly}</td>
          <td> {data.lNumberOfEarlyReg1}</td>
          <td> {data.dEarlyAmt2}</td>

          <td> {data.lNumberOfEarlyReg2}</td>
          <td> {data.dEarlyAmt3}</td>
          <td> {data.lNumberOfEarlyReg3}</td>
          <td> {data.dEarlyAmt4}</td>
          <td> {data.lNumberOfEarlyReg4}</td>
          <td>
            {" "}
            {data.dtEarlyDate && data.dtEarlyDate !== "0000-00-00"
              ? moment(data.dtEarlyDate).format("MM/DD/YYYY HH:MM")
              : ""}
          </td>
          <td> {data.dStandardAmt}</td>
          <td> {data.dPricePerAddRegStd}</td>
          <td> {data.dPricePerGuestStd}</td>
          <td> {data.lNumberOfStandardReg1}</td>
          <td> {data.dStandardAmt2}</td>
          <td> {data.lNumberOfStandardReg2}</td>
          <td> {data.dStandardAmt3}</td>
          <td> {data.lNumberOfStandardReg3}</td>
          <td> {data.dStandardAmt4}</td>
          <td> {data.lNumberOfStandardReg4}</td>
          <td>
            {" "}
            {data.dtStandardDate && data.dtStandardDate !== "0000-00-00"
              ? moment(data.dtStandardDate).format("MM/DD/YYYY HH:MM")
              : ""}
          </td>
          <td> {data.dOnsiteAmt}</td>
          <td> {data.dPricePerAddReg}</td>
          <td> {data.dPricePerGuest}</td>
          <td> {data.lNumberOfOnsiteReg1}</td>

          <td> {data.dOnsiteAmt2}</td>
          <td> {data.lNumberOfOnsiteReg2}</td>
          <td> {data.dOnsiteAmt3}</td>
          <td> {data.lNumberOfOnsiteReg3}</td>
          <td> {data.dOnsiteAmt4}</td>
          <td> {data.lNumberOfOnsiteReg4}</td>
          <td> {data.sPrintText}</td>
          <td>
            {" "}
            {data.nStatus === 0
              ? "Active"
              : data.nStatus === 1
              ? "Deleted"
              : data.nStatus === 2
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

  const handleSearhChange = (event) => {
    setSearchType(event.target.value);
    // props.filterData(event.target.value)
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
              <div className="row table-responsive">
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_length" id="dataTable_length">
                    <button
                      type="button"
                      className="d-none d-sm-inline-block btn"
                      onClick={() => _handleAddClick()}
                    >
                      Add Registration Type&nbsp;
                      <i className="fa fa-plus fa-sm"></i>
                    </button>
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
                            onChange={(event) => handleSearhChange(event)}
                          >
                            <option value="">Select Type</option>
                            <option value="sCode">Code</option>
                            <option value="sName">Name</option>
                            <option value="dEarlyAmt">
                              Early Price Amount 1
                            </option>
                            <option value="lNumberOfEarlyReg1">
                              Number of registrants at price amount 1
                            </option>
                            <option value="dEarlyAmt2">
                              Early Price Amount 2
                            </option>
                            <option value="lNumberOfEarlyReg2">
                              Number of registrants at price amount 2
                            </option>
                            <option value="dEarlyAmt3">
                              Early Price Amount 3
                            </option>
                            <option value="lNumberOfEarlyReg3">
                              Number of registrants at price amount 3
                            </option>
                            <option value="dEarlyAmt4">
                              Early Price Amount 4
                            </option>
                            <option value="lNumberOfEarlyReg4">
                              Number of registrants at price amount 4
                            </option>
                            <option value="dtEarlyDate">EarlyDate</option>
                            <option value="dStandardAmt">
                              Regular Price Amount 1
                            </option>
                            <option value="lNumberOfStandardReg1">
                              Number of registrants at price amount 1
                            </option>
                            <option value="dStandardAmt2">
                              Regular Price Amount 2{" "}
                            </option>
                            <option value="lNumberOfStandardReg2">
                              Number of registrants at price amount 2
                            </option>
                            <option value="dStandardAmt3">
                              Regular Price Amount 3{" "}
                            </option>
                            <option value="lNumberOfStandardReg3">
                              Number of registrants at price amount 3{" "}
                            </option>
                            <option value="dStandardAmt4">
                              Regular Price Amount 4{" "}
                            </option>
                            <option value="lNumberOfStandardReg4">
                              Number of registrants at price amount 4{" "}
                            </option>
                            <option value="dtStandardDate">
                              Ending date for Regular Price{" "}
                            </option>
                            <option value="dOnsiteAmt">Onsite Amt </option>
                            <option value="lNumberOfOnsiteReg1">
                              Number of registrants at price amount 1{" "}
                            </option>
                            <option value="dOnsiteAmt2">
                              Onsite Price Amount 2{" "}
                            </option>
                            <option value="lNumberOfOnsiteReg2">
                              Number of registrants at price amount 2{" "}
                            </option>
                            <option value="dOnsiteAmt3">
                              Onsite Price Amount 3{" "}
                            </option>
                            <option value="lNumberOfOnsiteReg3">
                              Number of registrants at price amount 3{" "}
                            </option>
                            <option value="dOnsiteAmt4">
                              Onsite Price Amount 4
                            </option>
                            <option value="lNumberOfOnsiteReg4">
                              Number of registrants at price amount 4{" "}
                            </option>
                            <option value="sPrintText">Print Text</option>
                            <option value="nStatus">Status</option>
                          </select>
                        </div>
                      </li>
                      <li>
                        {searchType == "dtEarlyDate" ||
                        searchType == "dtStandardDate" ? (
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Search"
                            onChange={handleChange}
                            aria-controls="dataTable"
                          />
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
              <div className="table-responsive">
                <div
                  id="dataTable_wrapper"
                  className="dataTables_wrapper dt-bootstrap4"
                ></div>
                {props.loading ? (
                  <Loader />
                ) : (
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th>Code </th>
                        <th>Name</th>
                        <th>Early Price Amount 1</th>
                        <th>Early Add Reg Amt</th>
                        <th>Early Guest Amt</th>
                        <th>Number of registrants at price amount 1</th>
                        <th>Early Price Amount 2</th>
                        <th>Number of registrants at price amount 2</th>
                        <th>Early Price Amount 3</th>
                        <th>Number of registrants at price amount 3</th>
                        <th>Early Price Amount 4</th>
                        <th>Number of registrants at price amount 4</th>

                        <th>Early Date</th>
                        <th>Std Amt</th>
                        <th>Std Add Reg Amt</th>
                        <th>Std Guest Amt</th>
                        <th>Number of registrants at price amount 1</th>
                        <th>Regular Price Amount 2</th>
                        <th>Number of registrants at price amount 2</th>
                        <th>Regular Price Amount 3</th>
                        <th>Number of registrants at price amount 3</th>
                        <th>Regular Price Amount 4</th>
                        <th>Number of registrants at price amount 4</th>
                        <th>Ending date for Regular Price </th>
                        <th>Onsite Amt</th>
                        <th>Price Per Add Reg</th>
                        <th>Price Per Guest</th>
                        <th>Number of registrants at price amount 1</th>
                        <th>Onsite Price Amount 2</th>
                        <th>Number of registrants at price amount 2</th>

                        <th>Onsite Price Amount 3</th>
                        <th>Number of registrants at price amount 3</th>
                        <th>Onsite Price Amount 4</th>
                        <th>Number of registrants at price amount 4</th>

                        <th>Print Text</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.regTypeData !== undefined &&
                      props.regTypeData !== "" ? (
                        callPageRecords(props.regTypeData)
                      ) : (
                        <tr>
                          <td colSpan={12}>No record Found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-7">
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="dataTable_paginate"
                  >
                    {props.regTypeData !== undefined &&
                    props.regTypeData.length > 0 &&
                    props.totalPagesRegistrationTypes !== undefined ? (  
                      <PaginationBlock
                        perPage={perPage}
                        containerClassName={props.containerClassName}
                        userRecordsData={props.totalPagesRegistrationTypes}
                        callHandlePageClick={(data) => handlePageClick(data)}
                      />
                    ) : (
                      ""
                    )}
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
          <RegistrationTypesForm
            userId={userId}
            eventId={eventId}
            regTypeId={regTypeId}
            saveRegTypes={(data) => props.saveRegTypes(data)}
            updateRegTypes={(data) => props.updateRegTypes(data)}
            showModel={(data) => setShowModel(data)}
            regTypeByIdData={props.regTypeByIdData}
            clearFields={clearFields}
          />
        </ModalBox>
      </div>
    </>
  );
};
export default RegistrationTypes;
