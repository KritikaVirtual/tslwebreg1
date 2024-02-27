import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import { FaArrowCircleRight } from "react-icons/fa";
import InvitationForm from "./InvitationForm";
import AddClientForm from "./AddClientForm";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";
import {
  getUserList,
  userListReset,
  addClientDetails
} from "../../../Services/Store/Admin/userList/userList.action";
import Loader from "../../../Components/Ui/loader";
const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showModelClient, setShowModelClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [userRecordsData, setUserRecordsData] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [errorResponce, setErrorResponce] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userList, blocking } = useSelector((state) => state.userList);

  useEffect(() => {
    if (userList.result !== undefined) {
      const result = userList.result;
      if (result.length > 0) {
        setUserData(userList.result);
        setUserRecordsData(userList.records);
        setErrorResponce(userList.error_code);
      } else {
        setUserData(userList.result);
        setUserRecordsData(userList.records);
        setErrorResponce(userList.error_code);
      }
    }
    setShowModelClient(false);
    setLoading(blocking);
    // return ()=> dispatch(userListReset());
  }, [userList]);

  useEffect(() => {
    const adminLogin = JSON.parse(sessionStorage.getItem("adminToken"));
    if (!adminLogin) {
      navigate("/admin");
    }
    return ()=> dispatch(userListReset());
  }, []);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(getUserList({ search: searchKeyword, offset }));
    }, 500);
    return () => clearTimeout(getData);
  }, [searchKeyword]);

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const storeUserId = (userId) => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
    localStorage.setItem("userId", JSON.stringify(userId));
    // if(lastEventId!='0'){
    //   sessionStorage.setItem("eventId", JSON.stringify(lastEventId));
    // }
    
    navigate("/event");
  };

  /** For pagination code start here **/
  var offset = currentPage * perPage;
  const handlePageClick = (selectedPage) => {
      dispatch(getUserList({ search: searchKeyword, offset: selectedPage }));
  };
  /** For pagination code end here **/

  const callPageRecords = (userData) => {
    if (userData) {
      return userData.slice(offset, offset + perPage).map((data, index) => (
        <tr key={data.lLoginID}>
          <td>{data.sFirstName}</td>
          <td>{data.sLastName}</td>
          <td> {data.sBillCompany}</td>
          <td align="center">
            <FaArrowCircleRight onClick={() => storeUserId(data.lAccountID)} />
          </td>
        </tr>
      ));
    }
  };

  const saveclientForm=async(params)=>{
     dispatch(addClientDetails(params));
  }

  return (
    <>
      <div className="container-fluid gray-back">
        <div className="card shadow ">
          <div className="card-body">
            <div className="table-responsive">
              <div
                id="dataTable_wrapper"
                className="dataTables_wrapper dt-bootstrap4 inside-header"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <ul>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => setShowModelClient(true)}
                        >
                          ADD CLIENT ACCOUNT +
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn blue-btn"
                          onClick={() => setShowModel(true)}
                        >
                          ADD NEW ADMIN ACCOUNT +
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="col-sm-12 col-md-6 right-action">
                    <ul>
                      <li className="search_keyword">
                        <input
                          type="text"
                          className="input-search_keyword search-wrap"
                          value={searchKeyword}
                          onChange={handleChange}
                          placeholder="Search"
                        />
                      </li>
                      <li className="logout">
                        <button
                          type="submit"
                          className="btn-logout"
                          onClick={logout}
                        >
                          Logout
                        </button>
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
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.result !== undefined && userList.result !== "" ? (
                      callPageRecords(userList.result)
                    ) : (
                      <tr>
                        <td colSpan={4}>No record Found</td>
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
                  {userData != undefined &&
                  userData.length > 0 &&
                  userRecordsData !== undefined ? (
                    <PaginationBlock
                      perPage={perPage}
                      userRecordsData={userRecordsData}
                      callHandlePageClick={(data) => handlePageClick(data)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-sm-12 col-md-5">
                {/* <div
                  className="dataTables_info"
                  id="dataTable_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing 1 to 10 of 57 entries
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {
          <ModalBox show={showModel} onHide={() => setShowModel(false)}>
            <InvitationForm />
          </ModalBox>
        }
        {
          <ModalBox show={showModelClient}  onHide={() => setShowModelClient(false)}>
            <AddClientForm clientFormData={(data)=>saveclientForm(data) } />
          </ModalBox>
        }
      </div>
    </>
  );
};
export default UserList;
