import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import AdminLayout from "../../../Layout";
import { getMemberList } from "../../../Services/Store/Common/members/members.action";
import { memberListSelector } from "../../../Services/Store/Common/members/members.selector";
import Loader from "../../../Components/Ui/loader";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";
import { MemberForm } from "./MemberForm";
import "./index.css";

const Member = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchType, setSearchType] = useState("sName");
  const [eventRecordsData, setEventRecordsData] = useState(0);
  const [errorResponce, setErrorResponce] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memberList, blocking } = useSelector(memberListSelector);

  useEffect(() => {
    let isLogin = false;
    if (JSON.parse(sessionStorage.getItem("adminToken"))) {
      isLogin = true;
    } else if (JSON.parse(sessionStorage.getItem("clientToken"))) {
      isLogin = true;
    }

    if (!isLogin || errorResponce === 4) {
      navigate("/");
    }
    // const userId = JSON.parse(localStorage.getItem("userId"));
    // if (userId) {
    //   dispatch(getmemberList({ userId }));
    // }
    return () => {
      // dispatch(memberListReset());
    };
  }, []);

  useEffect(() => {
    if (memberList.result !== undefined) {
      const result = memberList.result;
      if (result.length > 0) {
        setEventData(memberList.result);
        setEventRecordsData(memberList.records);
        setErrorResponce(memberList.error_code);
        if (!JSON.parse(sessionStorage.getItem("eventId"))) {
          sessionStorage.setItem("eventId", JSON.stringify(result[0].lEventID));
        }
      } else {
        setEventData("");
        setEventRecordsData("");
      }
    }
    setLoading(blocking);
  }, [memberList]);

  const handleChange = (event) => {
    if (searchType) {
      setSearchKeyword(event.target.value);
    }
  };

  /** For pagination code start here **/

  const handlePageClick = (selectedPage) => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      dispatch(
        getMemberList({ userId, search: searchKeyword, offset: selectedPage })
      );
    }
  };
  /** For pagination code end here **/

  var offset = currentPage * perPage;
  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(
        getMemberList({
          lEventID: 1053,
          lAccountID: 7,
        })
      );
    }, 500);
    return () => clearTimeout(getData);
  }, [searchKeyword]);

  const _handleEditClick = (data) => {
    sessionStorage.removeItem("eventId");
    sessionStorage.removeItem("eventName");
    sessionStorage.setItem("eventId", JSON.stringify(data.lEventID));
    sessionStorage.setItem("eventName", JSON.stringify(data.sName));
    navigate("/eventinfo");
  };

  const _handleAddClick = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setUserId(userId);
      setShowModel(true);
    }
  };
  const callPageRecords = (eventData) => {
    if (eventData) {
      return eventData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>{data.sFirstName}</td>
          <td>{data.sLastName}</td>
          <td>{data.sEmail}</td>
          <td>{data.sCompany}</td>
          <td>{moment(data.dtCreatedOn).format("MM/DD/YYYY HH:MM")} </td>
          <td>{moment(data.dtStart).format("MM/DD/YYYY")} </td>
          <td>{moment(data.dtEnd).format("MM/DD/YYYY")} </td>
          {/* <td>{moment(data.dtCloseSite).format("MMMM Do YYYY")}{" "}</td> */}
        </tr>
      ));
    }
  };

  //   const submitEventInfo = async (params) => {
  //     dispatch(addEventInfo(params));
  //     setShowModel(false);
  //     const userId = JSON.parse(localStorage.getItem("userId"));
  //     if (userId) {
  //       setUserId(userId);
  //     }
  //   };

  const handleSearhChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <>
      <AdminLayout pageHeading="Member">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Members</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Members</Accordion.Header>
                <Accordion.Body>
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
                                  <div className="row">
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
                                          Add Member&nbsp;
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
                                                onChange={(event) =>
                                                  handleSearhChange(event)
                                                }
                                              >
                                                <option value="">
                                                  Select Type{" "}
                                                </option>
                                                <option value="sName">
                                                  Event Name{" "}
                                                </option>
                                                <option value="sLocation">
                                                  Event Location
                                                </option>
                                                <option value="sEventContactEmail">
                                                  Event Email
                                                </option>
                                                <option value="sStatus">
                                                  Status
                                                </option>
                                                <option value="dtCreatedOn">
                                                  Created On
                                                </option>
                                                <option value="dtStart">
                                                  Start Date
                                                </option>
                                                <option value="dtEnd">
                                                  End Date
                                                </option>
                                              </select>
                                            </div>
                                          </li>
                                          <li>
                                            {searchType == "dtCreatedOn" ||
                                            searchType == "dtStart" ||
                                            searchType == "dtEnd" ? (
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
                                  {loading ? (
                                    <Loader />
                                  ) : (
                                    <table className="table table-striped table-bordered">
                                      <thead>
                                        <tr className="bg-primary text-white">
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Email</th>
                                          <th>Company</th>
                                          <th>Created On</th>
                                          <th>Start Date</th>
                                          <th>End Date</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {memberList.result !== undefined &&
                                        memberList.result !== "" ? (
                                          callPageRecords(memberList.result)
                                        ) : (
                                          <tr className="noRecords" colSpan={4}>
                                            No Records Found
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 col-md-5"></div>
                              <div className="col-sm-12 col-md-7">
                                <div
                                  className="dataTables_paginate paging_simple_numbers"
                                  id="dataTable_paginate"
                                >
                                  {eventData != undefined &&
                                  eventData.length > 0 &&
                                  eventRecordsData !== undefined ? (
                                    <PaginationBlock
                                      perPage={perPage}
                                      userRecordsData={eventRecordsData}
                                      callHandlePageClick={(data) =>
                                        handlePageClick(data)
                                      }
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
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <ModalBox
          className="eventForm_model"
          show={showModel}
          onHide={() => {
            setShowModel(false);
          }}
        ></ModalBox>
      </AdminLayout>
    </>
  );
};
export default Member;
