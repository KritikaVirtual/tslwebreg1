import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../Config/config";
import AdminLayout from "../../../Layout";
import Accordion from "react-bootstrap/Accordion";
import {
  addExhibitorInfo,
  getExhibitorListById,
  updateExhibitorInfo,
  addExhibitorBoothMembers,
  getExhibitorBoothMembers,
  getExhibitorsBoothMembersByID,
  updateExhibitorsBoothMember,
} from "../../../Services/Store/Common/exhibitorList/exhibitorList.action";
import {
  exhibitorListSelector,
  exhibitorListByIdSelector,
} from "../../../Services/Store/Common/exhibitorList/exhibitorList.selector";
import "./index.css";
import BoothMembers from "./BoothMembers";

export function ExhibitorInfo(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [exhibitorId, setExhibitorId] = useState("");
  const [picture, setPicture] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [exhibitorsBoothMembersData, setExhibitorsBoothMembersData] = useState(
    []
  );
  const [exhibitorsBoothMembersDataByID, setExhibitorsBoothMembersByIDData] =
    useState([]);
  const [
    exhibitorsBoothMembersRecordsData,
    setExhibitorsBoothMembersRecordsData,
  ] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exhibitorListById = useSelector(exhibitorListByIdSelector);

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
    if (sessionStorage.getItem("exhibitorId") && lAccountID && lEventID) {
      const lExhibitorID = sessionStorage.getItem("exhibitorId");
      setExhibitorId(lExhibitorID);
      dispatch(getExhibitorListById({ lAccountID, lEventID, lExhibitorID }));
      dispatch(
        getExhibitorBoothMembers({ lAccountID, lEventID, lExhibitorID })
      );
    }
  }, []);

  useEffect(() => {
    if (
      exhibitorListById.exhibitorListById !== undefined &&
      exhibitorListById.exhibitorListById.error_code === 0
    ) {
      const exhibitorListByIdResult =
        exhibitorListById.exhibitorListById.result;
      delete exhibitorListByIdResult.lAccountID;
      delete exhibitorListByIdResult.lEventID;
      setFields(exhibitorListByIdResult);
    }

    if (
      exhibitorList.exhibitorBoothMembers !== undefined &&
      exhibitorList.exhibitorBoothMembers.error_code === 0
    ) {
      const exhibitorBoothMembersResult =
        exhibitorList.exhibitorBoothMembers.result;
      setExhibitorsBoothMembersData(exhibitorBoothMembersResult);
      setExhibitorsBoothMembersRecordsData(
        exhibitorList.exhibitorBoothMembers.records
      );
    } else {
      setExhibitorsBoothMembersData([]);
      setExhibitorsBoothMembersRecordsData("");
    }

    if (
      exhibitorList.exhibitorBoothMembersByID !== undefined &&
      exhibitorList.exhibitorBoothMembersByID.error_code === 0
    ) {
      const exhibitorBoothMembersByIDResult =
        exhibitorList.exhibitorBoothMembersByID.result;
      setExhibitorsBoothMembersByIDData(exhibitorBoothMembersByIDResult);
    }
  }, [exhibitorListById, exhibitorList]);

  console.log("exhibitorList", exhibitorList);

  const _handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;
    setFields({ ...data });
    console.log(fields);
  };

  const _handlePicture = (event) => {
    setPicture(event.target.files[0]);
  };
  const _handleProfilePic = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const validateExhibitorForm = (fields) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["nMaxStaff"] || fields["nMaxStaff"] === "") {
      formIsValid = false;
      errors["nMaxStaff"] = "*Please enter Max Staff.";
    }

    if (!fields["nFreeStaffs"] || fields["nFreeStaffs"] === "") {
      formIsValid = false;
      errors["nFreeStaffs"] = "*Please enter Free Staff.";
    }

    if (
      !fields["dPricePerExtraStaff"] ||
      fields["dPricePerExtraStaff"] === ""
    ) {
      formIsValid = false;
      errors["dPricePerExtraStaff"] =
        "*Please enter your Price Per Extra Staff.";
    }

    if (!fields["sFirstName"] || fields["sFirstName"] === "") {
      formIsValid = false;
      errors["sFirstName"] = "*Please enter First Name.";
    }

    if (!fields["sLastName"] || fields["sLastName"] === "") {
      formIsValid = false;
      errors["sLastName"] = "*Please enter Last Name.";
    }

    if (!fields["sCompany"] || fields["sCompany"] === "") {
      formIsValid = false;
      errors["sCompany"] = "*Please enter Company Name.";
    }

    if (!fields["sPhone"] || fields["sPhone"] === "") {
      formIsValid = false;
      errors["sPhone"] = "*Please enter Phone Number.";
    }

    if (typeof fields["sEmail"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["sEmail"])) {
        formIsValid = false;
        errors["sEmail"] = "*Please enter valid email.";
      }
    }

    if (fields["nStatus"] === "") {
      formIsValid = false;
      errors["nStatus"] = "*Please select your Status.";
    }

    return {
      errors: errors,
      formIsValid: formIsValid,
    };
  };

  const _validateForm = () => {
    let formFields = fields;
    let response = validateExhibitorForm(formFields);
    setErrors(response.errors);
    return response.formIsValid;
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    console.log("1");
    if (_validateForm()) {
      if (userId && eventId) {
        const formData = new FormData();
        formData.append("sPicture", picture);
        formData.append("sProfilePic", profilePic);
        formData.append("lAccountID", userId);
        formData.append("lEventID", eventId);
        for (var key in fields) {
          formData.append(key, fields[key]);
        }

        if (exhibitorId) {
          dispatch(updateExhibitorInfo(formData));
        } else {
          dispatch(addExhibitorInfo(formData));
        }
        navigate("/exhibitorList");
      }
    }
  };

  const saveExhibitorBoothMembers = (data) => {
    dispatch(addExhibitorBoothMembers(data));
  };

  const fetchExhibitorsBoothMembersByID = (data) => {
    dispatch(getExhibitorsBoothMembersByID(data));
  };

  const updateExhibitorBoothMembers = (data) => {
    dispatch(updateExhibitorsBoothMember(data));
  };

  /** For pagination code start here **/

  const handlePageClick = (selectedPage) => {
    if (userId && eventId && exhibitorId) {
      dispatch(
        getExhibitorBoothMembers({
          lAccountID: userId,
          lEventID: eventId,
          lExhibitorID: exhibitorId,
          search: searchKeyword,
          offset: selectedPage,
        })
      );
    }
  };
  /** For pagination code end here **/

  const filterData = (data) => {
    setSearch(data.search);
    const offset = data.offset;
    const search = data.search;
    const searchType = data.searchType;
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    setOffset(offset);
    if (JSON.parse(lEventID)) {
      setEventId(lEventID);
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    if (JSON.parse(lAccountID)) {
      setUserId(lAccountID);
    }

    const lExhibitorID = JSON.parse(sessionStorage.getItem("exhibitorId"));
    if (JSON.parse(lExhibitorID)) {
      setExhibitorId(lExhibitorID);
    }

    if (lAccountID && lEventID) {
      dispatch(
        getExhibitorBoothMembers({
          lEventID,
          lAccountID,
          lExhibitorID,
          offset: offset,
          search,
          searchType,
        })
      );
    }
  };

  return (
    <>
      <AdminLayout pageHeading="Exhibitor Info">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Exhibitor Info</Accordion.Header>
            <Accordion.Body>
              <div className="panel panel-default Exhibitor-info-tab">
                <div className="panel-heading" role="" id="">
                  <div id="" className="" role="">
                    <div className="panel-body">
                      <div className="card  mb-4">
                        <div className="card-body">
                          <div className="table-responsive">
                            <div className="control-group" width="100%">
                              <div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                                <Link to="/exhibitorList">
                                  <div
                                    href="#"
                                    className="d-none d-sm-inline-block btn "
                                  >
                                    {" "}
                                    <i
                                      className="fa fa-angle-left"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    Go back to exhibitors list{" "}
                                  </div>
                                </Link>
                              </div>
                              <form
                                onSubmit={(event) => _handleSubmit(event)}
                                encType="multipart/form-data"
                              >
                                <table className="exhInfoTable">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Exhibitor ID
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="lExhibitorID"
                                            value={
                                              fields.lExhibitorID
                                                ? fields.lExhibitorID
                                                : ""
                                            }
                                            placeholder=""
                                            readOnly
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <label className="control-labelsmall">
                                          Status *
                                        </label>
                                        <div className="controls3">
                                          <select
                                            name="nStatus"
                                            value={
                                              fields.nStatus
                                                ? fields.nStatus
                                                : "0"
                                            }
                                            id="nStatus"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                          >
                                            <option value="">
                                              Select Status{" "}
                                            </option>
                                            <option value="0">Active </option>
                                            <option value="1">Deleted</option>
                                          </select>
                                          {errors.nStatus ? (
                                            <div className="errorMsg text-danger">
                                              {errors.nStatus}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Max Staff *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="nMaxStaff"
                                            value={
                                              fields.nMaxStaff
                                                ? fields.nMaxStaff
                                                : ""
                                            }
                                            placeholder="Max Staff"
                                          />
                                          {errors.nMaxStaff ? (
                                            <div className="errorMsg text-danger">
                                              {errors.nMaxStaff}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        <label className="control-labelsmall">
                                          Booth
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sBooth"
                                            value={
                                              fields.sBooth ? fields.sBooth : ""
                                            }
                                            placeholder="Booth"
                                          />
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Maximum Booth Staff
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sBooth"
                                            value={
                                              fields.sBooth ? fields.sBooth : ""
                                            }
                                            placeholder="Maximum Booth Staff"
                                          />
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Free Staff *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="nFreeStaffs"
                                            value={
                                              fields.nFreeStaffs
                                                ? fields.nFreeStaffs
                                                : ""
                                            }
                                            placeholder="Free Staff"
                                          />
                                          {errors.nFreeStaffs ? (
                                            <div className="errorMsg text-danger">
                                              {errors.nFreeStaffs}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        <label className="control-labelsmall">
                                          Booth Size
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sBoothSize"
                                            value={
                                              fields.sBoothSize
                                                ? fields.sBoothSize
                                                : ""
                                            }
                                            placeholder="Booth Size"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Price Per Extra Staff *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="dPricePerExtraStaff"
                                            value={
                                              fields.dPricePerExtraStaff
                                                ? fields.dPricePerExtraStaff
                                                : ""
                                            }
                                            placeholder="Price Per Extra Staff"
                                          />
                                          {errors.dPricePerExtraStaff ? (
                                            <div className="errorMsg text-danger">
                                              {errors.dPricePerExtraStaff}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        <label className="control-labelsmall">
                                          Exhibitor
                                        </label>
                                        <div className="controls3">
                                          <select
                                            id="nExhType"
                                            onChange={(e) => _handleChange(e)}
                                            className="form-control"
                                            name="nExhType"
                                            value={
                                              fields.nExhType
                                                ? fields.nExhType
                                                : ""
                                            }
                                          >
                                            <option value="0" required="">
                                              No
                                            </option>
                                            <option value="1">Yes</option>
                                          </select>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Prefix
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sPrefix"
                                            value={
                                              fields.sPrefix
                                                ? fields.sPrefix
                                                : ""
                                            }
                                            placeholder="Prefix"
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <label className="control-labelsmall">
                                          Sponsor Type
                                        </label>
                                        <div className="controls3">
                                          <select
                                            id="nSponsorType"
                                            onChange={(e) => _handleChange(e)}
                                            className="form-control"
                                            name="nSponsorType"
                                            value={
                                              fields.nSponsorType
                                                ? fields.nSponsorType
                                                : ""
                                            }
                                          >
                                            <option value="0" required="">
                                              None
                                            </option>
                                            <option value="1"></option>
                                          </select>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          First Name *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sFirstName"
                                            value={
                                              fields.sFirstName
                                                ? fields.sFirstName
                                                : ""
                                            }
                                            placeholder="First Name"
                                          />
                                          {errors.sFirstName ? (
                                            <div className="errorMsg text-danger">
                                              {errors.sFirstName}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        <label className="control-labelsmall">
                                          Web Site{" "}
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sWebSite"
                                            value={
                                              fields.sWebSite
                                                ? fields.sWebSite
                                                : ""
                                            }
                                            placeholder="Website"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Middle Name
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sMiddleName"
                                            value={
                                              fields.sMiddleName
                                                ? fields.sMiddleName
                                                : ""
                                            }
                                            placeholder="Middle Name"
                                          />
                                        </div>
                                      </td>
                                      <td rowSpan="1">
                                        <label className="control-labelsmall">
                                          Document
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sDocument"
                                            value={
                                              fields.sDocument
                                                ? fields.sDocument
                                                : ""
                                            }
                                            placeholder="Document"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Last Name *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sLastName"
                                            value={
                                              fields.sLastName
                                                ? fields.sLastName
                                                : ""
                                            }
                                            placeholder="Last Name"
                                          />
                                          {errors.sLastName ? (
                                            <div className="errorMsg text-danger">
                                              {errors.sLastName}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>

                                      <td rowSpan="4">
                                        <label className="control-labelsmall">
                                          Picture (jpg or png)
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => _handlePicture(e)}
                                            name="sPicture"
                                          />
                                          {fields.sPicture != "undefined" &&
                                          fields.sPicture ? (
                                            <img
                                              src={
                                                API_URL +
                                                "images/exhibitors/" +
                                                fields.sPicture
                                              }
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Suffix
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sSuffix"
                                            value={
                                              fields.sSuffix
                                                ? fields.sSuffix
                                                : ""
                                            }
                                            placeholder="Suffix"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Credentials
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sCredentials"
                                            value={
                                              fields.sCredentials
                                                ? fields.sCredentials
                                                : ""
                                            }
                                            placeholder="Credentials"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Title
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sTitle"
                                            value={
                                              fields.sTitle ? fields.sTitle : ""
                                            }
                                            placeholder="Title"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Company *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sCompany"
                                            value={
                                              fields.sCompany
                                                ? fields.sCompany
                                                : ""
                                            }
                                            placeholder="Company"
                                          />
                                          {errors.sCompany ? (
                                            <div className="errorMsg text-danger">
                                              {errors.sCompany}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                      <td rowSpan="6">
                                        <label className="control-labelsmall">
                                          About
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="mAbout"
                                            value={
                                              fields.mAbout ? fields.mAbout : ""
                                            }
                                            placeholder="About"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Address 1
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sAddress1"
                                            value={
                                              fields.sAddress1
                                                ? fields.sAddress1
                                                : ""
                                            }
                                            placeholder="Address 1"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Address 2
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sAddress2"
                                            value={
                                              fields.sAddress2
                                                ? fields.sAddress2
                                                : ""
                                            }
                                            placeholder="Address 2"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Address 3
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sAddress3"
                                            value={
                                              fields.sAddress3
                                                ? fields.sAddress3
                                                : ""
                                            }
                                            placeholder="Address 3"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          City
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sCity"
                                            value={
                                              fields.sCity ? fields.sCity : ""
                                            }
                                            placeholder="City"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          State
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sState"
                                            value={
                                              fields.sState ? fields.sState : ""
                                            }
                                            placeholder="State"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Zip
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sZip"
                                            value={
                                              fields.sZip ? fields.sZip : ""
                                            }
                                            placeholder="Zip"
                                          />
                                        </div>
                                      </td>
                                      <td rowSpan="6">
                                        <label className="control-labelsmall">
                                          Notes
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="mNotes"
                                            value={
                                              fields.mNotes ? fields.mNotes : ""
                                            }
                                            placeholder="Notes"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Country
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sCountry"
                                            value={
                                              fields.sCountry
                                                ? fields.sCountry
                                                : ""
                                            }
                                            placeholder="State"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Phone *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sPhone"
                                            value={
                                              fields.sPhone ? fields.sPhone : ""
                                            }
                                            placeholder="Phone"
                                          />
                                          {errors.sPhone ? (
                                            <div className="errorMsg text-danger">
                                              {errors.sPhone}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Cell
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sCell"
                                            value={
                                              fields.sCell ? fields.sCell : ""
                                            }
                                            placeholder="Cell"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Fax
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sFax"
                                            value={
                                              fields.sFax ? fields.sFax : ""
                                            }
                                            placeholder="Fax"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Email *
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sEmail"
                                            value={
                                              fields.sEmail ? fields.sEmail : ""
                                            }
                                            placeholder="Email"
                                          />
                                          {errors.sEmail ? (
                                            <div className="errorMsg text-danger">
                                              {errors.sEmail}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Sort Order
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="nSortOrder"
                                            value={
                                              fields.nSortOrder
                                                ? fields.nSortOrder
                                                : ""
                                            }
                                            placeholder="Sort Order"
                                          />
                                        </div>
                                      </td>

                                      <td>
                                        <label className="control-labelsmall">
                                          Value Type
                                        </label>
                                        <div className="controls3">
                                          <select
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            id="nExhValueType"
                                            name="nExhValueType"
                                            value={
                                              fields.nExhValueType
                                                ? fields.nExhValueType
                                                : ""
                                            }
                                          >
                                            <option value="0" required="">
                                              None
                                            </option>
                                            <option value="1">Diamond</option>
                                            <option value="2">Gold</option>
                                            <option value="3">Silver</option>
                                          </select>
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Exhibitor Template
                                        </label>
                                        <div className="controls3">
                                          <select
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            id="nExhTemplate"
                                            name="nExhTemplate"
                                            value={
                                              fields.nExhTemplate
                                                ? fields.nExhTemplate
                                                : ""
                                            }
                                          >
                                            <option value="1" required="">
                                              Full Access (Type 1)
                                            </option>
                                            <option value="2" required="">
                                              Full Access (Type 2)
                                            </option>
                                            <option value="3" required="">
                                              Full Access (Type 3)
                                            </option>
                                            <option value="4">
                                              Limited Access
                                            </option>
                                          </select>
                                        </div>
                                      </td>

                                      <td>
                                        <label className="control-label2">
                                          Video Links (one per line)
                                        </label>
                                        <div className="controls">
                                          <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            name="sVideoLinks"
                                            value={
                                              fields.sVideoLinks
                                                ? fields.sVideoLinks
                                                : ""
                                            }
                                            placeholder=""
                                          />
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Show in booth staff list on frontend?
                                        </label>
                                        <div className="controls3">
                                          <select
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            id="nShowInBoothStaffList"
                                            name="nShowInBoothStaffList"
                                            value={
                                              fields.nShowInBoothStaffList
                                                ? fields.nShowInBoothStaffList
                                                : ""
                                            }
                                          >
                                            <option value="1" required="">
                                              Yes
                                            </option>
                                            <option value="2">No</option>
                                          </select>
                                        </div>
                                      </td>

                                      <td rowSpan="4">
                                        <label className="control-labelsmall">
                                          Profile Pic
                                        </label>
                                        <div className="controls3">
                                          <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) =>
                                              _handleProfilePic(e)
                                            }
                                            name="sProfilePic"
                                          />
                                          {fields.sProfilePic != "undefined" &&
                                          fields.sProfilePic ? (
                                            <img
                                              src={
                                                API_URL +
                                                "images/exhibitors/" +
                                                fields.sProfilePic
                                              }
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <label className="control-labelsmall">
                                          Enable Golden Ticket?
                                        </label>
                                        <div className="controls3">
                                          <select
                                            className="form-control"
                                            onChange={(e) => _handleChange(e)}
                                            id="nEnableGoldenTkt"
                                            name="nEnableGoldenTkt"
                                            value={
                                              fields.nEnableGoldenTkt
                                                ? fields.nEnableGoldenTkt
                                                : ""
                                            }
                                          >
                                            <option value="1" required="">
                                              Yes
                                            </option>
                                            <option value="2">No</option>
                                          </select>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                                  <button type="submit" className="btn">
                                    Save
                                  </button>
                                </div>
                              </form>
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
          {exhibitorId && (
            <Accordion.Item eventKey="1">
              <Accordion.Header>Booth Members</Accordion.Header>
              <Accordion.Body>
                <BoothMembers
                  userId={userId}
                  eventId={eventId}
                  exhibitorId={exhibitorId}
                  exhibitorsBoothMembersData={exhibitorsBoothMembersData}
                  saveExhibitorBoothMembers={(data) =>
                    saveExhibitorBoothMembers(data)
                  }
                  updateExhibitorBoothMembers={(data) =>
                    updateExhibitorBoothMembers(data)
                  }
                  getExhibitorsBoothMembersByID={(data) =>
                    fetchExhibitorsBoothMembersByID(data)
                  }
                  exhibitorsBoothMembersDataByID={
                    exhibitorsBoothMembersDataByID
                  }
                  exhibitorsBoothMembersRecordsData={
                    exhibitorsBoothMembersRecordsData
                  }
                  perPage={perPage}
                  handlePageClick={(data) => handlePageClick(data)}
                  filterData={(data) => filterData(data)}
                />
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </AdminLayout>
    </>
  );
}
