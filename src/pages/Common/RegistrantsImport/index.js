import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../../../Layout";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import "./index.css";
import Papa from "papaparse";
import { addRegistrantImport, getQuestionsRegistrantsList } from "../../../Services/Store/Common/registrants/registrants.action";
import { registrantsSelector } from "../../../Services/Store/Common/registrants/registrants.selector";
import { getSCodeRegCategory } from "../../../Services/Store/Common/pageDesign/pageDesign.action";
import { pageDesignSelector } from "../../../Services/Store/Common/pageDesign/pageDesign.selector";

const RegistrantsImport = () => {
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

  const registrantsData = useSelector(registrantsSelector);
  const regTypesData = useSelector(pageDesignSelector);

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
      dispatch(getQuestionsRegistrantsList({ lAccountID, lEventID }));
      dispatch(getSCodeRegCategory({ lAccountID, lEventID }));
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
    if (bFirst == 0 || bLast == 0
      //  || bComp == 0 || bEmail == 0
       ) {
      if (bFirst == 0) {
        bNotOk = 1;
        alert(
          "Cannot upload. One field must be set to import as 'First Name'."
        );
      } else if (bLast == 0) {
        bNotOk = 1;
        alert("Cannot upload. One field must be set to import as 'Last Name'.");
      } 
      else if (bComp == 0) {
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
      console.log('postImportData',postImportData)
      dispatch(addRegistrantImport({ postImportData }));
      setProgressBar(true);
      navigate("/reglist");
    }
  }, [fileValues]);

  const callQuestionsList = questionData => {
    if (questionData && questionData.length > 0) {
      return questionData.map((data, index) => (
        <option
          id={"sQuestion_" + data.lQuestionID +  data.lAnswerID}
          name={"sQuestion_" + data.lQuestionID + data.lAnswerID}
          value={data.nType === 0 ? data.lQuestionID + ':' + data.sName : data.lQuestionID + ':' + data.lAnswerID}
        >
          { data.nType === 0 ? data.sName : data.sName + ' ANSWER : ' + data.sAnswer }
        </option>
      ))
    }
  }

  const callPageRecords = () => {
    var n = 0; 
    var forLoop = [];
    for (n = 1; n < 21; n++) {
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
                value="lRegID"
              >
                Reg ID
              </option>
              <option
                id={"sField_" + n + "_5"}
                name={"sField_" + n}
                value="sMemberID"
              >
                Member ID
              </option>
              <option
                id={"sField_" + n + "_6"}
                name={"sField_" + n}
                value="sPrefix"
              >
                Badge Name
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
                value="sOtherInfo1"
              >
                Other Info
              </option>
              <option
                id={"sField_" + n + "_26"}
                name={"sField_" + n}
                value="sOtherInfo2"
              >
                Other Info2
              </option>
              <option
                id={"sField_" + n + "_26"}
                name={"sField_" + n}
                value="sOtherInfo3"
              >
                Other Info3
              </option>
              <option
                id={"sField_" + n + "_26"}
                name={"sField_" + n}
                value="sOtherInfo4"
              >
                Other Info4
              </option>
              
             
              <option
                id={"sField_" + n + "_33"}
                name={"sField_" + n}
                value="lRegType"
              >
                Reg Type
              </option>

              {registrantsData.questionsRegistrantsList &&
               registrantsData.questionsRegistrantsList.error_code === 0 ? 
                callQuestionsList(registrantsData.questionsRegistrantsList.result) : []
              }
            </select>
          </td>
        </tr>
      );
    }
    return forLoop;
  };

  const callRegTypes = regTypeData => {
    if(regTypeData){
      return regTypeData.map((data, index) => (
        <>{data.value + ' : ' + data.label} <br/></>
      ));
    }  
  }
  return (
    <>
      <AdminLayout pageHeading="Registrants Import">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Registrants Import</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Registrants Import</Accordion.Header>
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
                                            <Link to="/reglist">
                                              <button className="d-none d-sm-inline-block btn">
                                                Go back to Registrants list
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
                      <form id="myForm" action="uploadFile.php" method="post" enctype="multipart/form-data">
                        <table>
                            <tbody>
                                <tr><td><label>Your file must be in a <strong>tab delimited format</strong></label></td></tr>
                                <tr><td><label>Your file must NOT have more than 99 columns</label></td></tr>
                                <tr><td><label>The minimum fields to import are: first name, last name, company and email.</label></td></tr>
                                <tr><td><label>The following fields cannot be imported at the moment and will be set with a default value: Reg Amount, Status, Taxes Amount, Discount, Special Discount Amount, Notes, Canellation fee, Category, Questions, Additional Registrants, Guests and Sessions.</label></td></tr>
                                <tr><td><label><font color="red">If you import the reg type, the field in your file must be a number and be one of your reg types for this event as follow:<br />
                                {regTypesData.regScode &&
                                  regTypesData.regScode.result !== undefined
                                  ? callRegTypes(regTypesData.regScode.result): []}</font></label></td></tr>

                                <tr><td><label><font color="red">To import questions: </font><br />Your file must have 1 column for each question.<br />If the question type is radio buttons or drop down box, the column must contains one of the possible answer that you have set for your event and that question.<br />If the question type is check boxes, you must have a column for each possible answer and the data in each column must be the possible answer text. The data in the column for question types other than Text must match exactly the same text as the text you setup for your event. For example if you set a question as radio buttons type and one of the answer is 'Course 1B', the text in your file cannot be 'Course 1 B' or 'Course1B'. </label></td></tr>
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
export default RegistrantsImport;
 