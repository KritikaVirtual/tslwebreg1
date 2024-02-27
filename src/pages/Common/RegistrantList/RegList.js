import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import PaginationBlock from "../../../Components/Ui/PaginationBlock";

const RegList = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchType, setSearchType] = useState("sFirstName");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [enable, setEnable] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [regListData, setRegListData] = useState([]);

  const navigate = useNavigate();

  var offset = currentPage * perPage;

  /** For pagination code start here **/

  const handlePageClick = (selectedPage) => {
    props.filterData({ search: searchKeyword, offset: selectedPage });
  };

  /** For pagination code end here **/

  const handleSearhChange = (event) => {
    setSearchType(event.target.value);
  };

  const _handleEditClick = (data) => {
    if(data.lRegID){
      sessionStorage.setItem('regId',data.lRegID)
      if(data.lRegisteredAs == '-10'){
        navigate('/regInfoGroup')
      }else{
        navigate('/regInfo')
      }
    }
  }

  useEffect(()=>{
    if(props.registrantsListData && props.additionalRegistrantsListData){
      const regData = props.registrantsListData.concat(props.additionalRegistrantsListData)
      regData.sort((a, b) => {
        const lastNameComparison = a.sLastName.localeCompare(b.sLastName);
        
        return lastNameComparison !== 0 ? lastNameComparison : a.sFirstName.localeCompare(b.firstName);
      });
      setRegListData(regData)
    }
  },[props.registrantsListData])


  const callPageRecords = (registrantsListData) => {
    var registrantLists = []
    if (registrantsListData && registrantsListData.length > 0) {
       registrantsListData.map((data, index) => (
        registrantLists.push(
          <>
            <tr onClick={() => _handleEditClick(data)} key={index}>
              <td>{data.lRegID}</td>
              <td>{data.lGuestID}</td>
              <td> {data.sFirstName}</td>
              <td> {data.sLastName}</td>
              <td> {data.sCompany}</td>
              <td> {data.sEmail}</td>
              <td> {data.TotalPaid + data.Balance1}</td>
              <td> {data.TotalPaid}</td>
              <td> {data.Balance1}</td>
              <td> {data.sCode}</td>
              <td> {moment(data.dtCreatedOn).format("YYYY-MM-DD")}</td>
              <td>
                {" "}
                {data.nStatus == 0
                  ? "Active"
                  : data.nStatus == 1
                  ? "Deleted"
                  : data.nStatus == 2
                  ? "Cancel"
                  : ""}
              </td>
            </tr>
          </>
        )
      ));
      return registrantLists
    } else {
      return (
        <tr className="text-center">
          <td colSpan={20}>No Record Found</td>
        </tr>
      );
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

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
    if (enable) {
      setTimeout(() => searchOntextBases(event.target.value), 500);
      setEnable(false);
    }
  };

  const removeRegId = () => {
    if(sessionStorage.getItem('regId')){
      sessionStorage.removeItem('regId')
    }
  }

  const showDeleteModal = () => {
    if(props.registrantsListData !== undefined && props.registrantsListData.length>0){
      setShowModel(true)
    }
  }

  const deleteAllRegistrant = () => {
    props.deleteRegistrant()
    setShowModel(false)
  }

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
                      <div className="row main-filter-show exhibitor-filter-show">
                        <div className="col-sm-12 col-md-9 ">
                          <div className="add-buttons">
                            <ul>
                              <li>
                                <Link to="/regInfo">
                                  <button className="d-none d-sm-inline-block btn btn-green" onClick={removeRegId}>
                                    Add New Registrant
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link to="/regInfoGroup">
                                  <button className="d-none d-sm-inline-block btn " onClick={removeRegId}>
                                    {" "}
                                    Add New Group Registrant
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link to="/regimport">
                                  <button className="d-none d-sm-inline-block btn btn-light-green ">
                                    {" "}
                                    Import Registrant
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <button className="d-none d-sm-inline-block btn delete-btn" onClick={showDeleteModal}>
                                  {" "}
                                  Delete All Registrants
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-3 user_search">
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
                                    <option value="">Select Type </option>
                                    <option value="lGuestID">Guest ID</option>
                                    <option value="sFirstName">
                                      First Name
                                    </option>
                                    <option value="sLastName">Last Name</option>
                                    <option value="sCompany">Company</option>
                                    <option value="sEmail">Email</option>
                                    <option value="Total1">Total</option>
                                    <option value="TotalPaid">Paid</option>
                                    <option value="Balance1">Balance</option>
                                    {/* <option value="lRegisteredAs">
                                      Reg As
                                    </option> */}
                                    <option value="lRegType">Reg Type</option>
                                    <option value="dtCreatedOn">
                                      Reg Date
                                    </option>
                                    <option value="nStatus">Status</option>
                                  </select>
                                </div>
                              </li>
                              <li>
                                {searchType == "lRegType" ? (
                                  <select
                                    className="form-control"
                                    onChange={handleChange}
                                  >
                                    <option value="1665">REGTYPE1</option>
                                    <option value="2112">REGTYPE2</option>
                                    <option value="2322">REG3</option>
                                    <option value="2455">MEMBER</option>
                                    <option value="-1">EXH</option>
                                    <option value="-2">GUEST</option>
                                    <option value="0">N/A</option>
                                  </select>
                                ) : (
                                  <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search"
                                    aria-controls="dataTable"
                                    onChange={handleChange}
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
                            <th>Reg ID</th>
                            <th>Guest ID</th>
                            <th>First Name</th>
                            <th>last Name</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Balance</th>
                            {/* <th>Reg As</th> */}
                            <th>Reg Type</th>
                            <th>Reg Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {regListData && regListData.length > 0 ? (
                            callPageRecords(regListData)
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
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="dataTable_paginate"
                    >
                      {props.registrantsListData != undefined &&
                      props.registrantsListData.length > 0 &&
                      props.totalPages !== undefined ? (
                        <PaginationBlock
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
        </div>
      </div>
      <ModalBox
        className="eventForm_model"
        show={showModel}
        onHide={() => {
          setShowModel(false);
        }}
      >
        <h4> Are you sure, You want to delete ? </h4>
        <button className="d-none d-sm-inline-block btn btn-green" onClick={deleteAllRegistrant}>OK</button>
        <button className="d-none d-sm-inline-block btn delete-btn" onClick={()=>setShowModel(false)}>Cancel</button>
      </ModalBox>
    </>
  );
};
export default RegList;
