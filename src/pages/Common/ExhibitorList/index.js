import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import AdminLayout from "../../../Layout";
import { getExhibitorList } from "../../../Services/Store/Common/exhibitorList/exhibitorList.action";
import { exhibitorListSelector } from "../../../Services/Store/Common/exhibitorList/exhibitorList.selector";
import Loader from "../../../Components/Ui/loader";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";
// import { EventForm } from "./ExhibitorForm.js";
import "./index.css";

const ExhibitorList = () => {
  const [exhibitorData, setExhibitorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [searchType, setSearchType] = useState("sFirstName");
  const [exhibitorRecordsData, setExhibitorRecordsData] = useState(0);
  const [errorResponce, setErrorResponce] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exhibitorList = useSelector(exhibitorListSelector);

  useEffect(() => {
    const loginCheck = JSON.parse(sessionStorage.getItem("adminToken"))
      ? JSON.parse(sessionStorage.getItem("adminToken"))
      : JSON.parse(sessionStorage.getItem("clientToken"))
      ? JSON.parse(sessionStorage.getItem("clientToken"))
      : "";
    if (!loginCheck) {
      navigate("/");
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    if (lAccountID) {
      setUserId(lAccountID);
    }
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    if (lEventID) {
      setEventId(lEventID);
    }

    if (lAccountID && lEventID) {
      dispatch(getExhibitorList({ lAccountID, lEventID }));
    }
  }, []);

  useEffect(() => {
    console.log("exhibitorList", exhibitorList);
    if (
      exhibitorList.exhibitorList !== undefined &&
      exhibitorList.exhibitorList.error_code === 0
    ) {
      const exhibitorListResult = exhibitorList.exhibitorList.result;
      if (exhibitorListResult.length > 0) {
        setExhibitorData(exhibitorListResult);
        setExhibitorRecordsData(exhibitorList.exhibitorList.records);
      } else {
        setExhibitorData([]);
        setExhibitorRecordsData("");
      }
    } else {
      setExhibitorData([]);
      setExhibitorRecordsData("");
    }
    setLoading(exhibitorList.blocking);
  }, [exhibitorList]);

  const _handleEditClick = (data) => {
    if (sessionStorage.getItem("exhibitorId")) {
      sessionStorage.removeItem("exhibitorId");
    }
    sessionStorage.setItem("exhibitorId", JSON.stringify(data.lExhibitorID));
    navigate("/exhibitorinfo");
  };

  const _handleAddClick = (data) => {
    if (sessionStorage.getItem("exhibitorId")) {
      sessionStorage.removeItem("exhibitorId");
    }
    navigate("/exhibitorinfo");
  };

  const callPageRecords = (exhibitorData) => {
    if (exhibitorData) {
      return exhibitorData.map((data, index) => (
        <tr onClick={() => _handleEditClick(data)} key={index}>
          <td>{data.sFirstName}</td>
          <td>{data.sLastName}</td>
          <td>{data.sCompany}</td>
          <td>{data.sEmail}</td>
          <td>
            {data.nExhType == 0
              ? "Not Exhibitor"
              : data.nExhType == 1
              ? "Exhibitor"
              : ""}
          </td>
          <td>{data.nSponsorType == 0 ? "Not Sponsor" : ""}</td>
          <td>
            {data.nStatus == 0 ? "Active" : data.nStatus == 1 ? "Deleted" : ""}
          </td>
        </tr>
      ));
    }
  };

  const handleChange = (event) => {
    if (searchType) {
      setSearchKeyword(event.target.value);
    }
  };

  /** For pagination code start here **/

  const handlePageClick = (selectedPage) => {
    if (userId && eventId) {
      dispatch(
        getExhibitorList({
          lAccountID: userId,
          lEventID: eventId,
          search: searchKeyword,
          offset: selectedPage,
        })
      );
    }
  };
  /** For pagination code end here **/

  var offset = currentPage * perPage;
  useEffect(() => {
    const getData = setTimeout(() => {
      if (userId && eventId) {
        dispatch(
          getExhibitorList({
            lAccountID: userId,
            lEventID: eventId,
            searchType: searchType,
            search: searchKeyword,
            offset,
          })
        );
      }
    }, 500);
    return () => clearTimeout(getData);
  }, [searchKeyword]);

  const handleSearhChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <>
      <AdminLayout pageHeading="Exhibitor List">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Exhibitor List</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Exhibitor List</Accordion.Header>
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
                                  <div className="row main-filter-show exhibitor-filter-show">
                                    <div className="col-sm-12 col-md-7 ">
                                      <div className="add-buttons">
                                        <ul>
                                          <li>
                                            <button
                                              onClick={(event) =>
                                                _handleAddClick(event)
                                              }
                                              className="d-none d-sm-inline-block btn "
                                            >
                                              {" "}
                                              Add New Exhibitor
                                            </button>
                                          </li>
                                          <li>
                                            <Link to="/exhibitorImport">
                                              <button className="d-none d-sm-inline-block btn ">
                                                {" "}
                                                Import Exhibitors
                                              </button>
                                            </Link>
                                          </li>
                                          <li>
                                            <button className="d-none d-sm-inline-block btn delete-btn">
                                              {" "}
                                              Delete New Exhibitor
                                            </button>
                                          </li>
                                        </ul>
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
                                                onChange={(event) =>
                                                  handleSearhChange(event)
                                                }
                                              >
                                                <option value="">
                                                  Select Type{" "}
                                                </option>
                                                <option value="sFirstName">
                                                  First Name{" "}
                                                </option>
                                                <option value="sLastName">
                                                  Last Name
                                                </option>
                                                <option value="sCompany">
                                                  Company
                                                </option>
                                                <option value="nExhType">
                                                  Exhibitor
                                                </option>
                                                <option value="nSponsorType">
                                                  Sponsor Type
                                                </option>
                                                <option value="nStatus">
                                                  Status
                                                </option>
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
                                  {loading ? (
                                    <Loader />
                                  ) : (
                                    <table className="table table-striped table-bordered">
                                      <thead>
                                        <tr className="bg-primary text-white">
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Company</th>
                                          <th>Email</th>
                                          <th>Exh</th>
                                          <th>Sponsor Type</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {exhibitorData !== undefined &&
                                        exhibitorData !== "" ? (
                                          callPageRecords(exhibitorData)
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
                                  {exhibitorData != undefined &&
                                  exhibitorData.length > 0 &&
                                  exhibitorRecordsData !== undefined ? (
                                    <PaginationBlock
                                      perPage={perPage}
                                      userRecordsData={exhibitorRecordsData}
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
        >
          {/* <EventForm userId={userId} addEventInfo={(params) => submitEventInfo(params)} /> */}
        </ModalBox>
      </AdminLayout>
    </>
  );
};
export default ExhibitorList;
