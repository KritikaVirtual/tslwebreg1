import React, { useState, useEffect } from "react";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import "./index.css";
import { BoothMembersForm } from "./BoothMembersForm";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";

const BoothMembers = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("sFirstName");
  const [enable, setEnable] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  var offset = currentPage * perPage;
  const callPageRecords = (exhibitorBoothMembersData) => {
    if (exhibitorBoothMembersData && exhibitorBoothMembersData.length > 0) {
      return exhibitorBoothMembersData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>{data.sFirstName}</td>
          <td>{data.sLastName}</td>
          <td>{data.sTitle}</td>
          <td></td>
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
          <td>{data.sPhone}</td>
          <td>{data.sEmail}</td>
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

  const _handleAddClick = () => {
    if (sessionStorage.getItem("memberId")) {
      sessionStorage.removeItem("memberId");
    }
    setShowModel(true);
  };

  const _handleEditClick = (data) => {
    const lAccountID = data.lAccountID;
    const lEventID = data.lEventID;
    const lExhibitorID = data.lExhibitorID;
    const lMemberID = data.lMemberID;
    // console.log(data)
    if (lMemberID !== undefined && lAccountID && lEventID && lExhibitorID) {
      sessionStorage.setItem("memberId", JSON.stringify(lMemberID));
      setShowModel(true);
      props.getExhibitorsBoothMembersByID({
        lAccountID,
        lEventID,
        lMemberID,
        lExhibitorID,
      });
      sessionStorage.setItem("memberId", data.lMemberID);
    }
  };

  const searchOntextBases = (searchText) => {
    if (searchType) {
      props.filterData({
        searchType: searchType,
        search: searchText,
        offset: offset,
      });
      setEnable(true);
    }
  };

  const handleSearhChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleChange = (event) => {
    if (searchType) {
      setSearchKeyword(event.target.value);
      if (enable) {
        setTimeout(() => searchOntextBases(event.target.value), 500);
        setEnable(false);
      }
    }
  };
  return (
    <>
      <div class="table-responsive">
        <div className="row">
          <div className="col-sm-12 col-md-7">
            <div className="dataTables_length" id="dataTable_length">
              <button
                type="button"
                className="d-none d-sm-inline-block btn"
                onClick={() => _handleAddClick()}
              >
                Add Booth Members&nbsp;
                <i className="fa fa-plus fa-sm"></i>
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-5 user_search">
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
                      <option value="">Select Type </option>
                      <option value="sFirstName">First Name </option>
                      <option value="sLastName">Last Name</option>
                      <option value="sTitle">Title</option>
                      <option value="nstatus">Status</option>
                      <option value="sPhone">Phone</option>
                      <option value="sEmail">Email</option>
                    </select>
                  </div>
                </li>
                <li>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    onChange={handleChange}
                    aria-controls="dataTable"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr class="bg-primary text-white">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Title</th>
              <th>File</th>
              <th>Status</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {props.exhibitorsBoothMembersData !== undefined &&
            props.exhibitorsBoothMembersData !== "" ? (
              callPageRecords(props.exhibitorsBoothMembersData)
            ) : (
              <tr>
                <td colSpan={12}>No record Found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="row">
          <div className="col-sm-12 col-md-5"></div>
          <div className="col-sm-12 col-md-7">
            <div
              className="dataTables_paginate paging_simple_numbers"
              id="dataTable_paginate"
            >
              {props.exhibitorsBoothMembersData != undefined &&
              props.exhibitorsBoothMembersData.length > 0 &&
              props.exhibitorsBoothMembersRecordsData !== undefined ? (
                <PaginationBlock
                  perPage={props.perPage}
                  userRecordsData={props.exhibitorsBoothMembersRecordsData}
                  callHandlePageClick={(data) => props.handlePageClick(data)}
                />
              ) : (
                ""
              )}
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
          <BoothMembersForm
            userId={props.userId}
            eventId={props.eventId}
            exhibitorId={props.exhibitorId}
            saveExhibitorBoothMembers={(data) =>
              props.saveExhibitorBoothMembers(data)
            }
            exhibitorsBoothMembersDataByID={
              props.exhibitorsBoothMembersDataByID
            }
            updateExhibitorBoothMembers={(data) =>
              props.updateExhibitorBoothMembers(data)
            }
            showModel={(data) => setShowModel(data)}
          />
        </ModalBox>
      </div>
    </>
  );
};
export default BoothMembers;
