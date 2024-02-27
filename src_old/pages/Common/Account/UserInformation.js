import React, { useState, useEffect } from "react";
import CONSTANT from "../../../Services/Constant/user.constants";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { UserForm } from "./UserForm";
import { DeleteForm } from "../../../Components/Common/DeleteForm";
const UserInformation = (props) => {
    const [userId, setUserId] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [showModel, setShowModel] = useState(false);
    const [editModel, setEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
     const [modalData, setModalData] = useState({});
    const [deleteModel, setDeleteModel] = useState(false);
    const [addModel, setAddModel] = useState(false);
    const [perPage, setPerPage] = useState(10);
    var offset = currentPage * perPage;
    
    useEffect(() => {
        const getData = setTimeout(() => {
          const userId = JSON.parse(localStorage.getItem("userId"));
          if (userId) {
            props.getSearchResult({userId, search: searchKeyword, offset })
          }
        }, 500);
        return () => clearTimeout(getData);
      }, [searchKeyword]);

    const _handleAddClick = () => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (userId) {
          setUserId(userId);
          setShowModel(true);
          setAddModel(true);
        }
      };

      
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
      
        /** For pagination code start here **/
        const handlePageClick = (selectedPage) => {
            props.handlePageClick(selectedPage);
        };
  /** For pagination code end here **/


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

      const editUserDetails = async (params) => {
        props.submitEditUserDetailsData(params);
        setShowModel(false);
        setAddModel(false);
      };

      const deleteUserData = async (params) => {
         props.deleteUser(params);
         setShowModel(false);
         setDeleteModel(false);
      };

      const closeDeletePopUp = async () => {
        setShowModel(false);
        setDeleteModel(false);
      };

      const submitUserDetailsData = async (params) => {
        props.submitUserDetailsData(params);
        setShowModel(false);
        setAddModel(false);
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
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.userListByIdResult.result !== undefined &&
                        props.userListByIdResult.result !== "" ? (
                          callPageRecords(props.userListByIdResult.result)
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
                        {props.userData != undefined &&
                        props.userData.length > 0 &&
                        props.userRecordsData !== undefined ? (
                          <PaginationBlock
                            perPage={props.perPage}
                            userRecordsData={props.userRecordsData}
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
              editUserDetails={(params) => editUserDetails(params)}
              userDetails={modalData}
            />
          ) : deleteModel === true ? (
            <DeleteForm
              userId={userId}
              deleteUserId={(userId) => deleteUserData(userId)}
              closeDeletePopUp={() => closeDeletePopUp()}
            />
          ) : addModel === true ? (
            <UserForm
              userId={userId}
              addUserDetails={(params) => submitUserDetailsData(params)}
            />
          ) : (
            ""
          )}
        </ModalBox>
    </>
  );
};
export default UserInformation;
