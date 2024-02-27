import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import AdminLayout from "../../../Layout";
import MainContactFields from "./MainContactFields";
import { pageDesignGrpRegSelector } from "../../../Services/Store/Common/pageDesignGrpReg/pageDesignGrp.selector";

import {
  getMainContactFields,
  updateMainContactFields,
  getRegistrantFields,
  updateRegistrantFields,
  getPageDesignGrpReg,
  updatePageDesignGrpReg,
} from "../../../Services/Store/Common/pageDesignGrpReg/pageDesignGrp.action";
import { regTypesPageDesignSelector } from "../../../Services/Store/Common/pageDesign/pageDesign.selector";
import { getRegTypesPageDesign } from "../../../Services/Store/Common/pageDesign/pageDesign.action";

import "./index.css";
import RegistrantsFields from "./RegistrantsFields";
import CommonPageSectionEditor from "../PageDesign/CommonPageSectionEditor";
import StepsTitleDescGrpReg from "./StepsTitleDescGrpReg";

const PageDesignGrpReg = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [fieldNameData, setFieldNameData] = useState([]);
  const [registrantFieldsData, setRegistrantFieldsData] = useState([]);
  const [regTypeData, setRegTypeData] = useState([]);
  const [errorResponce, setErrorResponce] = useState([]);
  const [pageDesignGrpRegData, setPageDesignGrpRegData] = useState([]);
  const [headerResult, setHeaderResult] = useState("");
  const [footerResult, setFooterResult] = useState("");
  const [stepsTitleDescGrpRegResult, setStepsTitleDescGrpRegResult] =
    useState("");

  const fieldNameArray =
    "'sMemberID','sPrefix','sFirstName','sMiddleName','sLastName','sSuffix','sCredentials','sTitle','sCompany','sAddress1','sAddress2','sAddress3','sCity','sState','sZip','sCountry','sPhone','sCell','sFax','sEmail','sOtherInfo1'";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageDesignGrpReg = useSelector(pageDesignGrpRegSelector);
  const regTypes = useSelector(regTypesPageDesignSelector);

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
      dispatch(
        getMainContactFields({ lAccountID, lEventID, sCode: fieldNameArray })
      );
      dispatch(getRegTypesPageDesign({ lAccountID, lEventID }));
      dispatch(getRegistrantFields({ lAccountID, lEventID }));
      dispatch(getPageDesignGrpReg({ lAccountID, lEventID }));
    }
  }, []);

  useEffect(() => {
    if (pageDesignGrpReg.fieldName.result !== undefined) {
      const result = pageDesignGrpReg.fieldName.result;
      if (result.length > 0) {
        setFieldNameData(pageDesignGrpReg.fieldName.result);
        setErrorResponce(pageDesignGrpReg.fieldName.error_code);
      } else {
        setFieldNameData([]);
      }
    }

    if (pageDesignGrpReg.registrantFields.result !== undefined) {
      const result = pageDesignGrpReg.registrantFields.result;
      if (result.length > 0) {
        setRegistrantFieldsData(pageDesignGrpReg.registrantFields.result);
        setErrorResponce(pageDesignGrpReg.registrantFields.error_code);
      } else {
        setRegistrantFieldsData([]);
      }
    }

    if (
      pageDesignGrpReg.pageDesignGrpReg !== undefined &&
      pageDesignGrpReg.pageDesignGrpReg.error_code === 0
    ) {
      const pageDesignGrpRegresult = pageDesignGrpReg.pageDesignGrpReg.result;

      setPageDesignGrpRegData(pageDesignGrpRegresult);
      setHeaderResult(pageDesignGrpRegresult.mPageHeaderGroup);
      setFooterResult(pageDesignGrpRegresult.mPageFooterGroup);
    }

    if (regTypes.result !== undefined) {
      const result = regTypes.result;
      if (result.length > 0) {
        setRegTypeData(regTypes.result);
      } else {
        setRegTypeData([]);
      }
    }
  }, [pageDesignGrpReg, regTypes]);

  const updateMainContactsFields = (mainFieldContactData) => {
    if (userId && eventId) {
      dispatch(
        updateMainContactFields({
          mainFieldContactData: mainFieldContactData,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const updateRegistrantFieldsData = (regFieldData) => {
    if (userId && eventId) {
      dispatch(
        updateRegistrantFields({
          regFieldData: regFieldData,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const getHeaderResult = (result) => {
    setHeaderResult(result);
  };

  const getFooterResult = (result) => {
    setFooterResult(result);
  };

  const getStepsTitleDescResultGrpReg = (result) => {
    setStepsTitleDescGrpRegResult(result);
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (userId && eventId) {
      const postData = {
        mPageHeader: headerResult,
        mPageFooter: footerResult,
        stepsTitleDesc: stepsTitleDescGrpRegResult,
        lEventID: eventId,
        lAccountID: userId,
      };
      dispatch(updatePageDesignGrpReg(postData));
    }
  };
  return (
    <>
      <AdminLayout pageHeading="Page Design Group Registration">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Page Design Group Registration</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header> Main Contact Fields</Accordion.Header>
                <Accordion.Body>
                  <MainContactFields
                    fieldNameData={fieldNameData}
                    updateMainContactFields={(data) =>
                      updateMainContactsFields(data)
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header> Registrants Fields</Accordion.Header>
                <Accordion.Body>
                  <RegistrantsFields
                    registrantFieldsData={registrantFieldsData}
                    updateRegistrantFields={(data) =>
                      updateRegistrantFieldsData(data)
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Page Header</Accordion.Header>
                <Accordion.Body>
                  <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the top of the page"
                    backData={(data) => getHeaderResult(data)}
                    fetchData={pageDesignGrpRegData.mPageHeaderGroup}
                    editorType={"headerEditor"}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Page Footer</Accordion.Header>
                <Accordion.Body>
                  <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the bottom of the page"
                    backData={(data) => getFooterResult(data)}
                    fetchData={pageDesignGrpRegData.mPageFooterGroup}
                    editorType={"headerEditor"}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  Steps, Title, Description and Text
                </Accordion.Header>
                <Accordion.Body>
                  <StepsTitleDescGrpReg
                    backData={(data) => getStepsTitleDescResultGrpReg(data)}
                    fetchData={pageDesignGrpRegData}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div>
              <button
                type="submit"
                onClick={(event) => _handleSubmit(event)}
                className="btn btn-save"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default PageDesignGrpReg;
