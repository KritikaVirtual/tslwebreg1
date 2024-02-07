import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import AdminLayout from "../../../Layout";
import RegistrantsInformation from "./RegistrantsInformation";
import {
  getFieldNameRegistrantsInfo,
  updateRegInfoFieldsPage,
  getGuestsRegistrantsFields,
  getCustomQuestions,
  updateGuestRegistrantsFields,
  getRegistrantFieldInformation,
  updateRegistrantFieldSetup,
  addCustomQuestions,
  getCustomQuestionsById,
  updateCustomQuestionsById,
  getDiscountCodes,
  getDiscountCodesById,
  addDiscountCodes,
  updateDiscountCodesById,
  getIndividualSession,
  addIndividualSession,
  getSessionById,
  updateIndividualSessionById,
  getExtraConfigurationForSession,
  addExtraConfigurationForSessions,
  getExtraConfigurationById,
  updateExtraConfigForSessions,
} from "../../../Services/Store/Common/fieldsQ&ADiscSessions/fields.action";
import {
  getRegTypesPageDesign,
  getSCodeRegCategory,
} from "../../../Services/Store/Common/pageDesign/pageDesign.action";
import { fieldQADiscSessionsSelector } from "../../../Services/Store/Common/fieldsQ&ADiscSessions/fields.selector";
import {
  regTypesPageDesignSelector,
  pageDesignSelector,
} from "../../../Services/Store/Common/pageDesign/pageDesign.selector";
import "./index.css";
import GuestRegistrantsFields from "./GuestRegistrantsFields";
import RegistrantFieldSetup from "./RegistrantFieldSetup";
import CustomQuestions from "./CustomQuestions";
import DiscountCodes from "./DiscountCodes";
import SessionTicket from "./SessionTicket";

const FieldsQADiscSessions = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [fieldNameData, setFieldNameData] = useState([]);
  const [regTypeData, setRegTypeData] = useState([]);
  const [regScodeData, setRegScodeData] = useState([]);
  const [guestRegistrantFieldsData, setGuestRegistrantFieldsData] = useState(
    []
  );
  const [customQuestionsData, setCustomQuestionsData] = useState([]);
  const [registrantFieldData, setRegistrantFieldData] = useState([]);
  const [customQuestionsByIdData, setCustomQuestionsByIdData] = useState([]);
  const [discountCodesData, setDiscountCodesData] = useState([]);
  const [discountCodesByIdData, setDiscountCodesByIdData] = useState([]);
  const [individualSessionData, setIndividualSessionData] = useState([]);
  const [individualSessionDataByIdData, setindividualSessionDataByIdData] =
    useState([]);
  const [extraConfigForSessionData, setExtraConfigForSessionData] = useState(
    []
  );
  const [extraConfigForSessionByIdData, setExtraConfigForSessionByIdData] =
    useState([]);
  const [errorResponce, setErrorResponce] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fieldQADiscSessions = useSelector(fieldQADiscSessionsSelector);
  const regTypes = useSelector(regTypesPageDesignSelector);
  const pageDesign = useSelector(pageDesignSelector);

  const fieldNameArray =
    "'sMemberID','sPrefix','sFirstName','sMiddleName','sLastName','sSuffix','sCredentials','sTitle','sCompany','sAddress1','sAddress2','sAddress3','sCity','sState','sZip','sCountry','sPhone','sCell','sFax','sEmail','sOtherInfo1'";
  const guestsFieldName = "'sTitle','sPhone','sEmail'";

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
        getFieldNameRegistrantsInfo({
          lAccountID,
          lEventID,
          sCode: fieldNameArray,
        })
      );
      dispatch(getRegTypesPageDesign({ lAccountID, lEventID }));
      dispatch(
        getGuestsRegistrantsFields({ lAccountID, lEventID, guestsFieldName })
      );
      dispatch(getCustomQuestions({ lAccountID, lEventID }));
      dispatch(getRegistrantFieldInformation({ lAccountID, lEventID }));
      dispatch(getSCodeRegCategory({ lEventID, lAccountID }));
      dispatch(getDiscountCodes({ lEventID, lAccountID }));
      dispatch(getIndividualSession({ lEventID, lAccountID }));
      dispatch(getExtraConfigurationForSession({ lEventID, lAccountID }));
    }
  }, []);

  useEffect(() => {
    if (fieldQADiscSessions.fieldName.result !== undefined) {
      const result = fieldQADiscSessions.fieldName.result;
      if (result.length > 0) {
        setFieldNameData(fieldQADiscSessions.fieldName.result);
        setErrorResponce(fieldQADiscSessions.fieldName.error_code);
      } else {
        setFieldNameData([]);
      }
    }

    if (
      fieldQADiscSessions.guestsRegistrantFields !== undefined &&
      fieldQADiscSessions.guestsRegistrantFields.result !== undefined
    ) {
      const result = fieldQADiscSessions.guestsRegistrantFields.result;
      if (result.length > 0) {
        setGuestRegistrantFieldsData(
          fieldQADiscSessions.guestsRegistrantFields.result
        );
        setErrorResponce(fieldQADiscSessions.guestsRegistrantFields.error_code);
      } else {
        setGuestRegistrantFieldsData([]);
      }
    }

    if (
      fieldQADiscSessions.customQuestions !== undefined &&
      fieldQADiscSessions.customQuestions.result !== undefined
    ) {
      const result = fieldQADiscSessions.customQuestions.result;
      if (result.length > 0) {
        setCustomQuestionsData(fieldQADiscSessions.customQuestions.result);
        setErrorResponce(fieldQADiscSessions.customQuestions.error_code);
      } else {
        setCustomQuestionsData([]);
      }
    }

    if (
      fieldQADiscSessions.registrantField !== undefined &&
      fieldQADiscSessions.registrantField.result !== undefined
    ) {
      const result = fieldQADiscSessions.registrantField.result;
      if (result.length > 0) {
        setRegistrantFieldData(fieldQADiscSessions.registrantField.result);
        setErrorResponce(fieldQADiscSessions.registrantField.error_code);
      } else {
        setRegistrantFieldData([]);
      }
    }

    if (
      fieldQADiscSessions.customQuestionsById !== undefined &&
      fieldQADiscSessions.customQuestionsById.result !== undefined
    ) {
      const result = fieldQADiscSessions.customQuestionsById.result;
      // console.log('result',result)
      if (result) {
        setCustomQuestionsByIdData(
          fieldQADiscSessions.customQuestionsById.result
        );
        setErrorResponce(fieldQADiscSessions.customQuestionsById.error_code);
      } else {
        setCustomQuestionsByIdData([]);
      }
    }

    if (regTypes.result !== undefined) {
      const result = regTypes.result;
      if (result.length > 0) {
        setRegTypeData(regTypes.result);
      } else {
        setRegTypeData([]);
      }
    }

    if (
      pageDesign.regScode !== undefined &&
      pageDesign.regScode.error_code === 0
    ) {
      const regScoderesult = pageDesign.regScode.result;
      setRegScodeData(regScoderesult);
    } else {
      setRegScodeData([]);
    }

    if (
      fieldQADiscSessions.discountCodes !== undefined &&
      fieldQADiscSessions.discountCodes.result !== undefined
    ) {
      const result = fieldQADiscSessions.discountCodes.result;
      // console.log('result',result)
      if (result) {
        setDiscountCodesData(fieldQADiscSessions.discountCodes.result);
        setErrorResponce(fieldQADiscSessions.discountCodes.error_code);
      } else {
        setDiscountCodesData([]);
      }
    }

    if (
      fieldQADiscSessions.discountCodesById !== undefined &&
      fieldQADiscSessions.discountCodesById.result !== undefined
    ) {
      const result = fieldQADiscSessions.discountCodesById.result;
      // console.log('result',result)
      if (result) {
        setDiscountCodesByIdData(fieldQADiscSessions.discountCodesById.result);
        setErrorResponce(fieldQADiscSessions.discountCodesById.error_code);
      } else {
        setDiscountCodesByIdData([]);
      }
    }

    if (
      fieldQADiscSessions.individualSessionById !== undefined &&
      fieldQADiscSessions.individualSessionById.result !== undefined
    ) {
      const result = fieldQADiscSessions.individualSessionById.result;
      if (result) {
        setindividualSessionDataByIdData(
          fieldQADiscSessions.individualSessionById.result
        );
        setErrorResponce(fieldQADiscSessions.individualSessionById.error_code);
      } else {
        setindividualSessionDataByIdData([]);
      }
    }

    if (
      fieldQADiscSessions.individualSession !== undefined &&
      fieldQADiscSessions.individualSession.result !== undefined
    ) {
      const result = fieldQADiscSessions.individualSession.result;
      // console.log('result',result)
      if (result) {
        setIndividualSessionData(fieldQADiscSessions.individualSession.result);
        setErrorResponce(fieldQADiscSessions.individualSession.error_code);
      } else {
        setIndividualSessionData([]);
      }
    }

    if (
      fieldQADiscSessions.extraConfigForSession !== undefined &&
      fieldQADiscSessions.extraConfigForSession.result !== undefined
    ) {
      const result = fieldQADiscSessions.extraConfigForSession.result;
      // console.log('result',result)
      if (result) {
        setExtraConfigForSessionData(
          fieldQADiscSessions.extraConfigForSession.result
        );
        setErrorResponce(fieldQADiscSessions.extraConfigForSession.error_code);
      } else {
        setExtraConfigForSessionData([]);
      }
    }

    if (
      fieldQADiscSessions.extraConfigForSessionById !== undefined &&
      fieldQADiscSessions.extraConfigForSessionById.result !== undefined
    ) {
      const result = fieldQADiscSessions.extraConfigForSessionById.result;
      if (result) {
        setExtraConfigForSessionByIdData(
          fieldQADiscSessions.extraConfigForSessionById.result
        );
        setErrorResponce(
          fieldQADiscSessions.extraConfigForSessionById.error_code
        );
      } else {
        setExtraConfigForSessionByIdData([]);
      }
    }
  }, [fieldQADiscSessions, regTypes]);

  const updateRegInfo = (fieldValue) => {
    if (userId && eventId) {
      dispatch(
        updateRegInfoFieldsPage({
          fieldValue,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const updateGuestData = (guestData) => {
    if (userId && eventId) {
      dispatch(
        updateGuestRegistrantsFields({
          guestData: guestData,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const updateRegFieldSetup = (regFieldData) => {
    if (userId && eventId) {
      dispatch(
        updateRegistrantFieldSetup({
          regFieldData: regFieldData,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const saveCustomQuestions = (data) => {
    if (userId && eventId) {
      dispatch(
        addCustomQuestions({
          customQuestionsData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const fetchCustomQuestionsById = (data) => {
    if (userId && eventId) {
      dispatch(
        getCustomQuestionsById({
          lQuestionID: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const updateCustomQuestions = (data) => {
    if (userId && eventId) {
      dispatch(
        updateCustomQuestionsById({
          customQuestionsData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const fetchDiscountCodesById = (data) => {
    if (userId && eventId) {
      dispatch(
        getDiscountCodesById({
          lDiscountID: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const fetchSessionById = (data) => {
    if (userId && eventId) {
      dispatch(
        getSessionById({
          lSessionID: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const saveDiscountCodes = (data) => {
    if (userId && eventId) {
      dispatch(
        addDiscountCodes({
          discountCodesData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const saveIndividualSession = (data) => {
    if (userId && eventId) {
      dispatch(
        addIndividualSession({
          sessionCodesData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const updateDiscountCodes = (data) => {
    if (userId && eventId) {
      dispatch(
        updateDiscountCodesById({
          discountCodesData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const updateIndividualSession = (data) => {
    if (userId && eventId) {
      dispatch(
        updateIndividualSessionById({
          sessionCodesData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const saveExtraConfigurationForSessions = (data) => {
    if (userId && eventId) {
      dispatch(
        addExtraConfigurationForSessions({
          extraConfigurationData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const fetchExtraConfigById = (data) => {
    if (userId && eventId) {
      dispatch(
        getExtraConfigurationById({
          lItemID: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  const updateExtraConfigurationForSessions = (data) => {
    if (userId && eventId) {
      dispatch(
        updateExtraConfigForSessions({
          extraConfigurationData: data,
          lAccountID: userId,
          lEventID: eventId,
        })
      );
    }
  };

  return (
    <>
      <AdminLayout pageHeading="Fields, Q&A, Disc, Sessions">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Fields, Q&A, Disc, Sessions</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Registrant Information</Accordion.Header>
                <Accordion.Body>
                  <RegistrantsInformation
                    fieldNameData={fieldNameData}
                    regTypeData={regTypeData}
                    updateRegInfo={(data) => updateRegInfo(data)}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Guests and Additional Registrants Fields
                </Accordion.Header>
                <Accordion.Body>
                  <GuestRegistrantsFields
                    guestRegistrantFieldsData={guestRegistrantFieldsData}
                    updateGuestData={(data) => updateGuestData(data)}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Registrant Field Setup</Accordion.Header>
                <Accordion.Body>
                  <RegistrantFieldSetup
                    registrantFieldData={registrantFieldData}
                    updateRegistrantFieldSetup={(data) =>
                      updateRegFieldSetup(data)
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Custom Questions</Accordion.Header>
                <Accordion.Body>
                  <CustomQuestions
                    getCustomQuestions={customQuestionsData}
                    addCustomQuestions={(data) => saveCustomQuestions(data)}
                    updateCustomQuestions={(data) =>
                      updateCustomQuestions(data)
                    }
                    fetchCustomQuestionsById={(data) =>
                      fetchCustomQuestionsById(data)
                    }
                    customQuestionsByIdData={customQuestionsByIdData}
                    regScodeData={regScodeData}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Discount Codes</Accordion.Header>
                <Accordion.Body>
                  <DiscountCodes
                    getDiscountCodes={discountCodesData}
                    regScodeData={regScodeData}
                    addDiscountCodes={(data) => saveDiscountCodes(data)}
                    updateDiscountCodes={(data) => updateDiscountCodes(data)}
                    fetchDiscountCodesById={(data) =>
                      fetchDiscountCodesById(data)
                    }
                    discountCodesByIdData={discountCodesByIdData}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>Session / Ticket</Accordion.Header>
                <Accordion.Body>
                  <SessionTicket
                    getIndividualSessionData={individualSessionData}
                    regScodeData={regScodeData}
                    addIndividualSession={(data) => saveIndividualSession(data)}
                    fetchSessionById={(data) => fetchSessionById(data)}
                    individualSessionDataByIdData={
                      individualSessionDataByIdData
                    }
                    updateIndividualSession={(data) =>
                      updateIndividualSession(data)
                    }
                    extraConfigForSession={extraConfigForSessionData}
                    addExtraConfigurationForSessions={(data) =>
                      saveExtraConfigurationForSessions(data)
                    }
                    fetchExtraConfigById={(data) => fetchExtraConfigById(data)}
                    extraConfigForSessionByIdData={
                      extraConfigForSessionByIdData
                    }
                    updateExtraConfigurationForSessions={(data) =>
                      updateExtraConfigurationForSessions(data)
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default FieldsQADiscSessions;
