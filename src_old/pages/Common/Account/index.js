import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  getUserListById,
  deleteUserById,
  addUserDetails,
  editUserDetails,
  addPaymentDetails,
  editClientDetails,
  getClientDetails,
  resetAccountPage
} from "../../../Services/Store/Common/account/account.action";
import CONSTANT from "../../../Services/Constant/user.constants";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";
import { UserForm } from "./UserForm";
import { DeleteForm } from "../../../Components/Common/DeleteForm";
import PaymentDetailsTab from "./PaymentDetailsTab";
import ClientInformation from "./ClientInformation";
import AdminLayout from "../../../Layout";
import { userListById,mainClient } from "../../../Services/Store/Common/account/account.selector";
const Account = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [errorResponce, setErrorResponce] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [userRecordsData, setUserRecordsData] = useState(0);
  const [getClientList, setGetClientList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userListByIdResult = useSelector(userListById);
  const mainClientresponse = useSelector(mainClient);

  useEffect(() => {
    const loginCheck = JSON.parse(sessionStorage.getItem("adminToken")) ? JSON.parse(sessionStorage.getItem("adminToken")) : JSON.parse(sessionStorage.getItem("clientToken")) ? JSON.parse(sessionStorage.getItem("clientToken")) : '';
 
    if (!loginCheck || errorResponce === 4) {
      navigate("/");
    }
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      dispatch(getClientDetails({ userId }));
    }
    return () => {
                   //setGetClientList({});
                   dispatch(resetAccountPage());
                 }
  }, []);

  useEffect(() => {
    if (userListByIdResult.result !== undefined) {
      const result = userListByIdResult.result;
      if (result.length > 0) {
        setUserData(userListByIdResult.result);
        setUserRecordsData(userListByIdResult.records);
        setErrorResponce(userListByIdResult.error_code);
      } else {
        setUserData("");
        setUserRecordsData("");
      }
    }
  }, [userListByIdResult]);

  useEffect(() => {
    if (mainClientresponse !== undefined) {
      if (Object.keys(mainClientresponse).length !== 0 ) {
        setGetClientList(mainClientresponse);
      } 
    }
  }, [mainClientresponse]);

  useEffect(() => {
    const getData = setTimeout(() => {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (userId) {
        dispatch(getUserListById({ userId, search: searchKeyword, offset }));
      }
    }, 500);
    return () => clearTimeout(getData);
  }, [searchKeyword]);

  
  /** For pagination code start here **/
  var offset = currentPage * perPage;
  const handlePageClick = (selectedPage) => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      dispatch(
        getUserListById({ userId, search: searchKeyword, offset: selectedPage })
      );
    }
  };
  /** For pagination code end here **/

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const _handleEditClick = (userDetails) => {
    setModalData(userDetails);
    setShowModel(true);
    setEditModel(true);
  };

  const _handleDeleteClick = (userId) => {
    setUserId(userId);
    setShowModel(true);
    setDeleteModel(true);
  };

  const _handleAddClick = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setUserId(userId);
      setShowModel(true);
      setAddModel(true);
    }
  };

  const callPageRecords = (userData) => {
    if (userData) {
      return userData.map((data, index) => (
        <tr key={data.lLoginID}>
          <td>{data.sUserName}</td>
          <td>{data.sFirstName}</td>
          <td> {data.sLastName}</td>
          <td> {data.sUserPassword}</td>
          <td> {CONSTANT[data.lRoleID]}</td>
          <td> {data.sStatus}</td>
          <td align="center">
            <button
              type="button"
              className="bd-none"
              onClick={() => _handleEditClick(data)}
            >
              <i className="fa fa-fw fa-edit"></i>
            </button>
            <button
              type="button"
              className="bd-none"
              onClick={() => _handleDeleteClick(data.lLoginID)}
            >
              <i className="fa fa-fw fa-trash"></i>
            </button>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr className="text-center">
          <td colSpan={8}>No Record Found</td>
        </tr>
      );
    }
  };

  const deleteUser = async (userId2) => {
    dispatch(deleteUserById(userId2));
    setShowModel(false);
    setDeleteModel(false);
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setUserId(userId);
    }
  };
  const closeDeletePopUp = async () => {
    setShowModel(false);
    setDeleteModel(false);
  };
  const submitUserDetails = async (params) => {
    dispatch(addUserDetails(params));
    setShowModel(false);
    setAddModel(false);
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setUserId(userId);
    }
  };

  const submitPaymentDetails = async (params) => {
    dispatch(addPaymentDetails(params));
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setUserId(userId);
    }
  };

  const submitEditUserDetails = async (params) => {
    dispatch(editUserDetails(params));
    setShowModel(false);
    setAddModel(false);
  };

  const callClientResponce = async (params) => {
    dispatch(editClientDetails(params));
  };
  return (
    <>
        <AdminLayout pageHeading="Account">
            <div className="container-fluid">
            <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Account</h3>
            </div>
          </div>
              <div className="container-fluid demo">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Client Information</Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(getClientList).length !== 0 ? (
                        <ClientInformation
                          getClientData={getClientList}
                          submitClientData={(data) => callClientResponce(data)}
                        />
                      ) : (
                        ""
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Users</Accordion.Header>
                    <Accordion.Body>
                      <div
                        className="panel-group dashboard-table-format"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        <div className="panel panel-default">
                          <div
                            className="panel-heading"
                            role="tab"
                            id="headingOne"
                          >
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
                                              Add user{" "}
                                              <i className="fa fa-plus fa-sm text-white-50"></i>
                                            </button>
                                          </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 user_search">
                                          <div
                                            id="dataTable_filter"
                                            className="dataTables_filter"
                                          >
                                            <label>
                                              <input
                                                type="search"
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Search"
                                                aria-controls="dataTable"
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <table className="table table-striped table-bordered">
                                      <thead>
                                        <tr className="bg-primary text-white">
                                          <th>Email/User Name</th>
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Password</th>
                                          <th>Role</th>
                                          <th>Status</th>
                                          <th className="text-center">
                                            Action
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {userListByIdResult.result !==
                                          undefined &&
                                        userListByIdResult.result !== "" ? (
                                          callPageRecords(
                                            userListByIdResult.result
                                          )
                                        ) : (
                                          <tr>
                                            <td colSpan={8}>No record Found</td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-12 col-md-5">
                                      {/* <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                                       */}
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                      <div
                                        className="dataTables_paginate paging_simple_numbers"
                                        id="dataTable_paginate"
                                      >
                                        {userData != undefined &&
                                        userData.length > 0 &&
                                        userRecordsData !== undefined ? (
                                          <PaginationBlock
                                            perPage={perPage}
                                            userRecordsData={userRecordsData}
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
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Payment Details</Accordion.Header>
                    <Accordion.Body>
                      <PaymentDetailsTab
                        userId={userId}
                        addPaymentDetails={(params) =>
                          submitPaymentDetails(params)
                        }
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <ModalBox
          show={showModel}
          onHide={() => {
            setShowModel(false);
            setEditModel(false);
            setDeleteModel(false);
            setAddModel(false);
          }}
        >
          {editModel === true ? (
            <UserForm
              editUserDetails={(params) => submitEditUserDetails(params)}
              userDetails={modalData}
            />
          ) : deleteModel === true ? (
            <DeleteForm
              userId={userId}
              deleteUserId={(userId) => deleteUser(userId)}
              closeDeletePopUp={() => closeDeletePopUp()}
            />
          ) : addModel === true ? (
            <UserForm
              userId={userId}
              addUserDetails={(params) => submitUserDetails(params)}
            />
          ) : (
            ""
          )}
        </ModalBox>
          </div>
       
        </AdminLayout>
    </>
  );
};
export default Account;
