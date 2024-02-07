import React, { useState, useEffect } from "react";
import moment from "moment";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";
import Loader from "../../../Components/Ui/loader";
import { RegistrationCategoriesForm } from "./RegistrationCategoriesForm";

const RegistrationCategories = (props) => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [regCategoryId, setRegCategoryId] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("sName");
  const [enable, setEnable] = useState(true);
  const [clearFields, setClearFields] = useState(false);
  
  var offset = currentPage * perPage;

  const _handleAddClick = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const eventId = JSON.parse(sessionStorage.getItem("eventId"));
    if (userId && eventId) {
      setUserId(userId);
      setEventId(eventId);
      setRegCategoryId("");
      setShowModel(true);
      setClearFields(true);
    }
  };
  const searchOntextBases = (searchText) => {
    if (searchType) {
      props.filterData({
        searchType: searchType,
        search: searchText,
        offset:offset,
        name:'categorySearch'
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
    props.filterData({ name:'categorySearch', search:searchKeyword, offset: selectedPage });
  };
  /** For pagination code end here **/

  const _handleEditClick = (data) => {
    const lCategoryID = data.lCategoryID;
    const lAccountID = data.lAccountID;
    const lEventID = data.lEventID;
    // console.log(data)
    if (lCategoryID !== undefined && lAccountID && lEventID) {
      if (sessionStorage.getItem("regTypeId")) {
        sessionStorage.removeItem("regTypeId");
      }
      sessionStorage.setItem("regTypeId", JSON.stringify(lCategoryID));
      setUserId(lAccountID);
      setEventId(lEventID);
      setRegCategoryId(lCategoryID);
      setShowModel(true);
      setClearFields(false);
      props.getRegCategoriesByID({ lAccountID, lEventID, lCategoryID });
    }
  };

  const callPageRecords = (regCategoriesData) => {
    if (regCategoriesData && regCategoriesData.length > 0) {
      return regCategoriesData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>{data.sCode}</td>
          <td>{data.sName}</td>
          <td> {data.sApplyToRegTypes}</td>
          <td>
            {" "}
            {data.sApplyToTemplates == "1"
              ? "template 1"
              : data.sApplyToTemplates == "2"
              ? "template 2"
              : ""}
          </td>
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
    //props.filterData(event.target.value)
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
                      Add Registration Categories&nbsp;
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
                            {/* <option value="sApplyToRegTypes">
                              Apply toReg Types
                            </option> */}
                            {/* <option value="sApplyToTemplates">
                              Apply toTemplates
                            </option> */}
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
                        <th>Apply To Reg Types</th>
                        <th>Apply To Templates</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.regCategoriesData !== undefined &&
                      props.regCategoriesData !== "" ? (
                        callPageRecords(props.regCategoriesData)
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
                    {props.regCategoriesData != undefined &&
                    props.regCategoriesData.length > 0 &&
                    props.totalPages !== undefined ? (
                      <PaginationBlock
                        containerClassName={props.containerClassName}
                        perPage={perPage}
                        userRecordsData={props.totalPages}
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
          <RegistrationCategoriesForm
            userId={userId}
            eventId={eventId}
            regCategoryId={regCategoryId}
            saveRegCategories={(data) => props.saveRegCategories(data)}
            showModel={(data) => setShowModel(data)}
            updateRegCategories={(data) => props.updateRegCategories(data)}
            regScodeData={props.getRegScode}
            regCategoryByIdData={props.regCategoryByIdData}
            clearFields={clearFields}
          />
        </ModalBox>
      </div>
    </>
  );
};
export default RegistrationCategories;
