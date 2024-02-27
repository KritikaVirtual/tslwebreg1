import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegistrantInformation } from "./RegistrantInformation";
import { SummaryTotals } from "./SummaryTotals";
import { Accordion } from "react-bootstrap";
import AdminLayout from "../../../Layout";
import {
  addRegistrantInfo,
  updateRegistrantInfo,
  getQuestionsRegistrantsList,
  getGuestAdditionalRegistrants,
  addGuestAddditionalInformation,
  updateGuestAdditionalInformation,
  getGuestAdditionalInformationById,
  getAnswerRegistrant,
  getRegistrantSessions,
  addRegistrantSessions,
  getSessionsConfig,
  getRegSessionById,
  updateRegistrantsSessions,
  getRegPayments,
  addRegPayments,
  getRegPaymentByID,
  updateRegPayment,
  getRegAmount,
  updateRegAmounts,
  getRegistrant,
  clearRegistrantData,
  clearAnswerData,
  getAnswerGuest,
  clearRegistrantsSessionsData,
  getRegistrantsGroupsMainRegIdExist,
} from "../../../Services/Store/Common/registrants/registrants.action";
import {
  getSCodeRegCategory,
  getRegTypeAmount,
  getSessionPrice,
  clearSessionPriceData,
} from "../../../Services/Store/Common/pageDesign/pageDesign.action";
import { registrantsSelector } from "../../../Services/Store/Common/registrants/registrants.selector";
import { pageDesignSelector } from "../../../Services/Store/Common/pageDesign/pageDesign.selector";
import "./index.css";
import { GuestsAddtionalInformation } from "./GuestsAddtionalInformation";
import { Sessions } from "./Sessions";
import { Payments } from "./Payments";
import { ProcessingPayments } from "./ProcessingPayments";
import { getPaymentDetails } from "../../../Services/Store/Common/account/account.action";
import { paymentDetailsSelector } from "../../../Services/Store/Common/account/account.selector";
import { getRegistrantFieldInformation } from "../../../Services/Store/Common/fieldsQ&ADiscSessions/fields.action";
import { fieldQADiscSessionsSelector } from "../../../Services/Store/Common/fieldsQ&ADiscSessions/fields.selector";

export function RegInfo(props) {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [regId, setRegId] = useState("");
  const [search, setSearch] = useState("");
  const [clearFields, setClearFields] = useState(true);
  const [regTypeEventOnChange, setRegTypeEventOnChange] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [lRegType, setlRegType] = useState(0);
  const [dregAmountValue, setDregAmountValue] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrantsData = useSelector(registrantsSelector);
  const regTypesData = useSelector(pageDesignSelector);
  const paymentDetails = useSelector(paymentDetailsSelector);
  const fieldQADiscSessions = useSelector(fieldQADiscSessionsSelector);

  // console.log('fieldQADiscSessions',fieldQADiscSessions)

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
  });

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

    const lRegID = JSON.parse(sessionStorage.getItem("regId"));

    if (lAccountID && lEventID) {
      dispatch(getQuestionsRegistrantsList({ lAccountID, lEventID }));
      dispatch(getSessionsConfig({ lAccountID, lEventID }));
      dispatch(getSCodeRegCategory({ lAccountID, lEventID }));
      dispatch(getPaymentDetails({ lAccountID }));
      dispatch(getRegistrantFieldInformation({ lAccountID, lEventID }));
      if (lRegID) {
        setRegId(lRegID);
        setClearFields(false);
        dispatch(
          getGuestAdditionalRegistrants({ lAccountID, lEventID, lRegID })
        );
        dispatch(getRegistrantSessions({ lAccountID, lEventID, lRegID }));
        dispatch(getRegPayments({ lAccountID, lEventID, lRegID }));
        dispatch(getRegAmount({ lAccountID, lEventID, lRegID }));
        dispatch(getRegistrant({ lAccountID, lEventID, lRegID }));
        dispatch(getAnswerRegistrant({ lAccountID, lEventID, lRegID }));
        dispatch(getRegistrantsGroupsMainRegIdExist({ lAccountID, lEventID, lRegID }))
      }
    }
    return () => {
      dispatch(clearRegistrantData());
      dispatch(clearAnswerData());
      dispatch(clearRegistrantsSessionsData());
    };
  }, []);

  useEffect(()=>{
    console.log('registrantsData.registrantMainRegIDExist.length',registrantsData.registrantMainRegIDExist)
    if(registrantsData.registrantMainRegIDExist && registrantsData.registrantMainRegIDExist.result !== undefined && registrantsData.registrantMainRegIDExist.result.length > 0){
      navigate('../regInfoGroup')
    }
  },[registrantsData.registrantMainRegIDExist])

  const saveRegInfo = (data) => {
    if (userId && eventId) {
      data["dRegAmount"] = dregAmountValue;
      dispatch(addRegistrantInfo(data));
    }
  };

  const updateRegInfo = (data) => {
    if (userId && eventId && data.lRegID) {
      data["dRegAmount"] = dregAmountValue;
      dispatch(updateRegistrantInfo(data));
    }
  };

  const saveGuestAddditionalInformation = (postData) => {
    dispatch(addGuestAddditionalInformation(postData));
  };

  const updateGuestAddditionalInformation = (postData) => {
    dispatch(updateGuestAdditionalInformation(postData));
  };

  const getGuestAddditionalInformationById = (postData) => {
    dispatch(getGuestAdditionalInformationById(postData));
  };

  const getAnswersRegistrant = (postData) => {
    dispatch(getAnswerRegistrant(postData));
  };

  const saveRegistrantSessions = (postData) => {
    dispatch(addRegistrantSessions(postData));
  };

  const getRegSessionsById = (postData) => {
    dispatch(getRegSessionById(postData));
  };

  const updateRegistrantSessions = (postData) => {
    dispatch(updateRegistrantsSessions(postData));
  };

  const saveRegPayments = (postData) => {
    dispatch(addRegPayments(postData));
  };

  const getRegPaymentsByID = (postData) => {
    dispatch(getRegPaymentByID(postData));
  };

  const updateRegPayments = (postData) => {
    dispatch(updateRegPayment(postData));
  };

  const updateRegAmount = (postData) => {
    dispatch(updateRegAmounts(postData));
  };

  const getRegAmountData = (postData) => {
    dispatch(getRegAmount(postData));
  };

  const getSessionPriceData = (postData) => {
    dispatch(getSessionPrice(postData));
  };

  const getRegTypesAmount = (postData) => {
    if (userId && eventId) {
      postData["lAccountID"] = userId;
      postData["lEventID"] = eventId;
      setlRegType(postData["lRegType"]);
      dispatch(getRegTypeAmount(postData));
    }
  };

  const getGuestAddRegAmount = (postData) => {
    let data = {};
    if (userId && eventId && lRegType) {
      data["lAccountID"] = userId;
      data["lEventID"] = eventId;
      data["lRegType"] = lRegType;
      dispatch(getRegTypeAmount(data));
    }
  };

  const getQuestionsGuest = (data) => {
    dispatch(
      getQuestionsRegistrantsList({
        lAccountID: data.lAccountID,
        lEventID: data.lEventID,
      })
    );
  };

  const getAnswersGuest = (data) => {
    dispatch(
      getAnswerGuest({
        lAccountID: data.lAccountID,
        lEventID: data.lEventID,
        lRegID: data.lRegID,
      })
    );
  };

  const filterData = (data) => {
    setSearch(data.search);
    const search = data.search;
    const searchType = data.searchType;

    if (userId && eventId && regId) {
      dispatch(
        getGuestAdditionalRegistrants({
          lAccountID: userId,
          lEventID: eventId,
          lRegID: regId,
          search,
          searchType,
        })
      );
    }
  };

  const filterSessionsData = (data) => {
    setSearch(data.search);
    const search = data.search;
    const searchType = data.searchType;

    if (userId && eventId && regId) {
      dispatch(
        getRegistrantSessions({
          lAccountID: userId,
          lEventID: eventId,
          lRegID: regId,
          search,
          searchType,
        })
      );
    }
  };

  const clearSessionPrice = () => {
    dispatch(clearSessionPriceData());
  };

  const backPage = (event) => {
    navigate("/regList");
  };

  return (
    <>
      <AdminLayout pageHeading="Registrant">
        <button
          className="d-none d-sm-inline-block btn btn-light-green backRegList"
          onClick={(event) => backPage(event)}
        >
          Back to Registrants List
        </button>
        <div className="container-fluid">
          <div className="container-fluid demo">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Registrant Information ( Access Code : Not Set )
                </Accordion.Header>
                <Accordion.Body>
                  <RegistrantInformation
                    userId={userId}
                    eventId={eventId}
                    saveRegInfo={(data) => saveRegInfo(data)}
                    updateRegInfo={(data) => updateRegInfo(data)}
                    questionsRegistrantData={
                      registrantsData.questionsRegistrantsList.result
                    }
                    answersRegistrantData={
                      registrantsData.answersRegistrant.result
                    }
                    registrantData={
                      registrantsData.registrantData &&
                      registrantsData.registrantData.result !== undefined
                        ? registrantsData.registrantData.result
                        : ""
                    }
                    answersData={
                      registrantsData.answersRegistrant &&
                      registrantsData.answersRegistrant.result !== undefined
                        ? registrantsData.answersRegistrant.result
                        : ""
                    }
                    regTypesData={
                      regTypesData.regScode &&
                      regTypesData.regScode.result !== undefined
                        ? regTypesData.regScode.result
                        : ""
                    }
                    getRegTypesAmount={(data) => getRegTypesAmount(data)}
                    regTypesAmountData={
                      regTypesData.regTypeAmount &&
                      regTypesData.regTypeAmount.result !== undefined
                        ? regTypesData.regTypeAmount.result
                        : ""
                    }
                    eventOnChange={(data) => setRegTypeEventOnChange(data)}
                    registrantField={
                      fieldQADiscSessions.registrantField
                        ? fieldQADiscSessions.registrantField.result
                        : {}
                    }
                    totalBalance={totalBalance}
                    clearFields={clearFields}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Guests and Additional Registrants
                </Accordion.Header>
                <Accordion.Body>
                  <GuestsAddtionalInformation
                    userId={userId}
                    eventId={eventId}
                    regId={regId}
                    guestRegistrantData={
                      registrantsData.guestAdditionalRegistrant
                        ? registrantsData.guestAdditionalRegistrant.result
                        : []
                    }
                    saveGuestAddditionalInformation={(postData) =>
                      saveGuestAddditionalInformation(postData)
                    }
                    updateGuestAddditionalInformation={(postData) =>
                      updateGuestAddditionalInformation(postData)
                    }
                    getGuestAddditionalInformationById={(postData) =>
                      getGuestAddditionalInformationById(postData)
                    }
                    guestRegistrantDataByID={
                      registrantsData.guestAdditionalRegistrantByID
                        ? registrantsData.guestAdditionalRegistrantByID.result
                        : {}
                    }
                    getQuestionsGuest={(postData) =>
                      getQuestionsGuest(postData)
                    }
                    getAnswersGuest={(postData) => getAnswersGuest(postData)}
                    filterData={(data) => filterData(data)}
                    questionsRegistrantData={
                      registrantsData.questionsRegistrantsList.result
                    }
                    answersGuestData={registrantsData.answerGuest.result}
                    getGuestAddRegAmount={(data) => getGuestAddRegAmount(data)}
                    regTypesAmountData={
                      regTypesData.regTypeAmount &&
                      regTypesData.regTypeAmount.result !== undefined
                        ? regTypesData.regTypeAmount.result
                        : ""
                    }
                    getRegAmount={(data) => getRegAmountData(data)}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Sessions</Accordion.Header>
                <Accordion.Body>
                  <Sessions
                    userId={userId}
                    eventId={eventId}
                    regId={regId}
                    registrantSessionsData={
                      registrantsData.registrantSessions.result
                    }
                    saveRegistrantSessions={(postData) =>
                      saveRegistrantSessions(postData)
                    }
                    sessionsConfigData={
                      registrantsData.sessionsConfig
                        ? registrantsData.sessionsConfig.result
                        : []
                    }
                    getRegSessionsById={(postData) =>
                      getRegSessionsById(postData)
                    }
                    regSessionsDataByID={
                      registrantsData.sessionsConfigById
                        ? registrantsData.sessionsConfigById.result
                        : {}
                    }
                    updateRegistrantSessions={(postData) =>
                      updateRegistrantSessions(postData)
                    }
                    filterSessionsData={(data) => filterSessionsData(data)}
                    getRegAmount={(data) => getRegAmountData(data)}
                    getSessionPrice={(data) => getSessionPriceData(data)}
                    sessionPriceData={
                      regTypesData.sessionPrice
                        ? regTypesData.sessionPrice.result
                        : {}
                    }
                    clearSessionPrice={() => clearSessionPrice()}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Payments</Accordion.Header>
                <Accordion.Body>
                  <Payments
                    userId={userId}
                    eventId={eventId}
                    regId={regId}
                    regPaymentsData={registrantsData.regPayments.result}
                    saveRegPayments={(postData) => saveRegPayments(postData)}
                    getRegPaymentsByID={(postData) =>
                      getRegPaymentsByID(postData)
                    }
                    regPaymentsDataByID={
                      registrantsData.regPaymentsById
                        ? registrantsData.regPaymentsById.result
                        : {}
                    }
                    updateRegPayments={(postData) =>
                      updateRegPayments(postData)
                    }
                    getRegAmount={(data) => getRegAmountData(data)}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Summary and Totals</Accordion.Header>
                <Accordion.Body>
                  <SummaryTotals
                    userId={userId}
                    eventId={eventId}
                    regId={regId}
                    regAmountData={registrantsData.regAmount.result}
                    updateRegAmount={(postData) => updateRegAmount(postData)}
                    regTypesAmountData={
                      regTypesData.regTypeAmount &&
                      regTypesData.regTypeAmount.result !== undefined
                        ? regTypesData.regTypeAmount.result
                        : ""
                    }
                    eventOnChange={(data) => setRegTypeEventOnChange(data)}
                    regTypeEventOnChange={regTypeEventOnChange}
                    totalBalance={(data) => setTotalBalance(data)}
                    dRegAmountValue={(data) => setDregAmountValue(data)}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>Processing Payments</Accordion.Header>
                <Accordion.Body>
                  <ProcessingPayments
                    userId={userId}
                    eventId={eventId}
                    regId={regId}
                    paymentDetails={
                      paymentDetails &&
                      paymentDetails.result &&
                      paymentDetails.result[0] !== undefined
                        ? paymentDetails.result[0]
                        : []
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
}
