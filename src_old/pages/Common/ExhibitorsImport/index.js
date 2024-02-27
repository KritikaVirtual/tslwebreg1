import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../../../Layout";
import { addExhibitorImport } from "../../../Services/Store/Common/exhibitorList/exhibitorList.action";
import { exhibitorListSelector } from "../../../Services/Store/Common/exhibitorList/exhibitorList.selector";
import Loader from "../../../Components/Ui/loader";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import "./index.css";
import Papa from "papaparse";
import ProgressBar from "../../../Components/Ui/ProgressBar";

const ExhibitorsImport = () => {
  const [exhibitorData, setExhibitorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [fileEvent, setFileEvent] = useState("");
  const [fileRead, setFileRead] = useState(false);
  const [progressBar, setProgressBar] = useState(false);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [fileValues, setFileValues] = useState([]);
  const [columnValue, setColumnValue] = useState([]);

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
    }
  }, []);

  const readFile = (e) => {
    setFileEvent(e);
    var f = document.getElementById("myfile").files[0];

    if (f) {
      var r = new FileReader();
      var lines = "";
      r.onload = function (e) {
        var contents = e.target.result;

        //extract fields
        lines = this.result.split("\n");
        var fields = lines[0].split("\t");
        var i = 0;
        for (i = 0; i < fields.length; i++) {
          document.getElementById("data_" + (i + 1)).value = fields[i];
        }
      };
      r.readAsText(f);
      setFileRead(true);
    } else {
      alert("Failed to load file");
    }
  };

  const submitForm = (e) => {
    var i = 0;
    var bNotOk = 0;
    var bFirst = 0;
    var bLast = 0;
    var bComp = 0;
    var bEmail = 0;
    var select1 = "";
    var value1 = "";

    for (i = 1; i < 100; i++) {
      select1 = document.getElementById("sField_" + i + "_s");
      if (select1 != null) {
        value1 = select1.options[select1.selectedIndex].value;
        if (value1 == "sFirstName") {
          bFirst = 1;
        } else if (value1 == "sLastName") {
          bLast = 1;
        } else if (value1 == "sCompany") {
          bComp = 1;
        } else if (value1 == "sEmail") {
          bEmail = 1;
        }
      } else {
        break;
      }
    }
    if (bFirst == 0 || bLast == 0 || bComp == 0 || bEmail == 0) {
      if (bFirst == 0) {
        bNotOk = 1;
        alert(
          "Cannot upload. One field must be set to import as 'First Name'."
        );
      } else if (bLast == 0) {
        bNotOk = 1;
        alert("Cannot upload. One field must be set to import as 'Last Name'.");
      } else if (bComp == 0) {
        bNotOk = 1;
        alert("Cannot upload. One field must be set to import as 'Company'.");
      } else if (bEmail == 0) {
        bNotOk = 1;
        alert("Cannot upload. One field must be set to import as 'Email'.");
      }
    } else {
      var dbFields = Array(42);
      for (i = 0; i < 42; i++) {
        dbFields[i] = 0;
      }
      for (i = 1; i < 100; i++) {
        var select1 = document.getElementById("sField_" + i + "_s");
        if (select1 != null) {
          var value1 = select1.options[select1.selectedIndex].value;
          dbFields[value1] = dbFields[value1] + 1;
        }
      }
      for (i = 0; i < 44; i++) {
        if (dbFields[i] > 1) {
          bNotOk = 1;
          alert(
            "Cannot upload. Each field under the right column must be selected only once."
          );
          break;
        }
      }

      if (bNotOk == 0) {
        var rowsArray = [];
        var valuesArray = [];

        Papa.parse(fileEvent.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            results.data.map((d) => {
              rowsArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
            });

            setParsedData(results.data);
            setTableRows(rowsArray[0]);
            setFileValues(valuesArray);
          },
        });

        var importsetup = "";
        for (i = 1; i < 100; i++) {
          select1 = document.getElementById("sField_" + i + "_s");
          if (select1 != null) {
            value1 = select1.options[select1.selectedIndex].value;
            columnValue.push(value1);
            if (value1 > 0) {
              var number1 = value1;
              if (value1.length == 1) {
                number1 = "0" + value1;
              } else {
                number1 = value1;
              }
              importsetup = importsetup + number1;
            } else {
              importsetup = importsetup + "00";
            }
          } else {
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (fileValues.length > 0 && columnValue.length > 0 && userId && eventId) {
      const postImportData = {
        lAccountID: userId,
        lEventID: eventId,
        columnArray: columnValue,
        valueArray: fileValues,
      };
      dispatch(addExhibitorImport({ postImportData }));
      setProgressBar(true);
      navigate("/exhibitorList");
    }
  }, [fileValues]);

  const callPageRecords = () => {
    var n = 0;
    var forLoop = [];
    for (n = 1; n < 17; n++) {
      forLoop.push(
        <tr id={"row_data_" + n} key={n}>
          <td>
            <input
              id={"data_" + n}
              name={"data_" + n}
              type="text"
              value=""
              readOnly
              disabled
            />
          </td>

          <td>
            <select id={"sField_" + n + "_s"} name={"sField_" + n + "_s"}>
              <option
                id={"sField_" + n + "_not_selected"}
                name={"sField_" + n}
                value=""
                disabled
                selected
              >
                Select an item
              </option>
              <option
                id={"sField_" + n + "_4"}
                name={"sField_" + n}
                value="nFreeStaffs"
              >
                Free Staff Members
              </option>
              <option
                id={"sField_" + n + "_5"}
                name={"sField_" + n}
                value="dPricePerExtraStaff"
              >
                Price Per Extra Staff Member
              </option>
              <option
                id={"sField_" + n + "_6"}
                name={"sField_" + n}
                value="sPrefix"
              >
                Prefix
              </option>
              <option
                id={"sField_" + n + "_7"}
                name={"sField_" + n}
                value="sFirstName"
              >
                First Name
              </option>
              <option
                id={"sField_" + n + "_8"}
                name={"sField_" + n}
                value="sMiddleName"
              >
                Middle Name
              </option>
              <option
                id={"sField_" + n + "_9"}
                name={"sField_" + n}
                value="sLastName"
              >
                Last Name
              </option>
              <option
                id={"sField_" + n + "_10"}
                name={"sField_" + n}
                value="sSuffix"
              >
                Suffix
              </option>
              <option
                id={"sField_" + n + "_11"}
                name={"sField_" + n}
                value="sCredentials"
              >
                Credentials
              </option>
              <option
                id={"sField_" + n + "_12"}
                name={"sField_" + n}
                value="sTitle"
              >
                Title
              </option>
              <option
                id={"sField_" + n + "_13"}
                name={"sField_" + n}
                value="sCompany"
              >
                Company
              </option>
              <option
                id={"sField_" + n + "_14"}
                name={"sField_" + n}
                value="sAddress1"
              >
                Address 1
              </option>
              <option
                id={"sField_" + n + "_15"}
                name={"sField_" + n}
                value="sAddress2"
              >
                Address 2
              </option>
              <option
                id={"sField_" + n + "_16"}
                name={"sField_" + n}
                value="sAddress3"
              >
                Address 3
              </option>
              <option
                id={"sField_" + n + "_17"}
                name={"sField_" + n}
                value="sCity"
              >
                City
              </option>
              <option
                id={"sField_" + n + "_18"}
                name={"sField_" + n}
                value="sState"
              >
                State
              </option>
              <option
                id={"sField_" + n + "_19"}
                name={"sField_" + n}
                value="sZip"
              >
                Zip
              </option>
              <option
                id={"sField_" + n + "_20"}
                name={"sField_" + n}
                value="sCountry"
              >
                Country
              </option>
              <option
                id={"sField_" + n + "_21"}
                name={"sField_" + n}
                value="sPhone"
              >
                Phone
              </option>
              <option
                id={"sField_" + n + "_22"}
                name={"sField_" + n}
                value="sCell"
              >
                Cell
              </option>
              <option
                id={"sField_" + n + "_23"}
                name={"sField_" + n}
                value="sFax"
              >
                Fax
              </option>
              <option
                id={"sField_" + n + "_24"}
                name={"sField_" + n}
                value="sEmail"
              >
                Email
              </option>
              <option
                id={"sField_" + n + "_25"}
                name={"sField_" + n}
                value="sBooth"
              >
                Booth
              </option>
              <option
                id={"sField_" + n + "_26"}
                name={"sField_" + n}
                value="sBoothSize"
              >
                Booth Size
              </option>
              <option
                id={"sField_" + n + "_27"}
                name={"sField_" + n}
                value="sDocument"
              >
                Document Link
              </option>
              <option
                id={"sField_" + n + "_28"}
                name={"sField_" + n}
                value="sWebSite"
              >
                Website
              </option>
              <option
                id={"sField_" + n + "_29"}
                name={"sField_" + n}
                value="mAbout"
              >
                About
              </option>
              <option
                id={"sField_" + n + "_30"}
                name={"sField_" + n}
                value="mNotes"
              >
                Notes
              </option>
              <option
                id={"sField_" + n + "_31"}
                name={"sField_" + n}
                value="nMaxStaff"
              >
                Max Staff
              </option>
              <option
                id={"sField_" + n + "_32"}
                name={"sField_" + n}
                value="nExhType"
              >
                Exhibitor
              </option>
              <option
                id={"sField_" + n + "_33"}
                name={"sField_" + n}
                value="nSponsorType"
              >
                Sponsor Type
              </option>
            </select>
          </td>
        </tr>
      );
    }
    return forLoop;
  };

  return (
    <>
      <AdminLayout pageHeading="Exhibitor Import">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Exhibitor Import</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Exhibitor Import</Accordion.Header>
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
                                    <div className="col-sm-12 col-md-6 ">
                                      <div className="add-buttons">
                                        <ul>
                                          <li>
                                            <Link to="/exhibitorList">
                                              <button className="d-none d-sm-inline-block btn">
                                                Go back to exhibitors list
                                              </button>
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="row">
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
                              </div> */}
                          </div>
                        </div>
                      </div>
                      <form
                        id="myForm"
                        method="post"
                        encType="multipart/form-data"
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <label>
                                  Your file must be in a{" "}
                                  <strong>tab delimited format</strong>
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>
                                  Your file must NOT have more than 99 columns
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>
                                  The minimum fields to import are: first name,
                                  last name, company and email.
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>
                                  For Exhibitor column, the value must be either
                                  0 or 1. 1 Means that record is an Exhibitor.
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>
                                  For Sponsor Type column, the value must be one
                                  of the following: 0 for None , 1 for{" "}
                                </label>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table width="100%">
                          <tbody>
                            <tr>
                              <td>
                                1. Select file:&nbsp;&nbsp;
                                <input
                                  className="form-control"
                                  type="file"
                                  id="myfile"
                                  name="myfile"
                                  onChange={(e) => readFile(e)}
                                />
                                <br />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                2. Select into which field to import each of
                                your column
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table className="table table-striped table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Fields from your file</th>
                                      <th>Import into field</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fileRead ? callPageRecords() : <tr></tr>}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                3. Click Upload when
                                ready&nbsp;&nbsp;&nbsp;&nbsp;
                                <input
                                  className="btn btn-medium btn-primary"
                                  type="button"
                                  value="Upload"
                                  onClick={(e) => submitForm(e)}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />

                        {progressBar ? <ProgressBar /> : ""}
                        <div id="status"></div>
                      </form>
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
export default ExhibitorsImport;
