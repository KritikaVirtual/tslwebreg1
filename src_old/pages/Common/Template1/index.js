import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";
import { Provider } from "./MultiStepFormContext";
import { Welcome } from "./Welcome";
import { RegTypes } from "./RegTypes";
import AdminLayout from "../../../Layout";
import "./index.css";
import { addAdditionalGuestData, addTemplate1Data, clearRegTypesTemplate1, getEventHeaderFooter, getFieldsForAdditionalGuest, getFieldsForPersonalInformation, getRegTypesTemplate1, getSessionsTicketsDataTemplate1, sendEmail } from "../../../Services/Store/Common/template1/template1.action";
import { getPageDesignGrpReg } from "../../../Services/Store/Common/pageDesignGrpReg/pageDesignGrp.action";
import { pageDesignGrpRegSelector } from "../../../Services/Store/Common/pageDesignGrpReg/pageDesignGrp.selector";
import { template1Selector } from "../../../Services/Store/Common/template1/template1.selector";
import { getRegCategoriesPageDesign } from "../../../Services/Store/Common/pageDesign/pageDesign.action";
import { pageDesignSelector } from "../../../Services/Store/Common/pageDesign/pageDesign.selector";
import { registrantsSelector } from "../../../Services/Store/Common/registrants/registrants.selector"; 
import { getPaymentDetails } from "../../../Services/Store/Common/account/account.action";
import { paymentDetailsSelector } from "../../../Services/Store/Common/account/account.selector";
import { PersonalInformation } from "./PersonalInformation";
import { OtherQuestions } from "./OtherQuestions";
import { getQuestionsRegistrantsList } from "../../../Services/Store/Common/registrants/registrants.action";
import { SessionsTickets } from "./SessionsTickets";
import { PaymentInformation } from "./PaymentInformation";
import { Review } from "./Review";
import { ConfirmationPage } from "./ConfirmationPage";
 
const { Step } = Steps;

const step1InitialState = {
  categories1: "",
  sEmail: ""
};

const step2InitialState = {
  radiobtn : ""
};

const step3InitialState = {
  sFirstName : "",
  sLastName : "",
  sCompany : "",
  sAddress1 : "",
  sCity : "",
  sState : "",
  sZip : "",
  addresstype : "",
  sPhone : "",
  // sEmail : "", 
}

const step4InitialState = {
  lAnswerID : ''
};

const step5InitialState = {
};

const step6InitialState = {
  terms : "",
  x_first_name : "",
  x_last_name : "",
  x_company : "",
  x_address : "",
  x_city : "",
  x_state : "",
  x_zip : "",
  x_country : ""
};

const step7InitialState = {
};
 

export function Template1() {
  const [step1Fields, setStep1Fields] = useState(step1InitialState);
  const [step2Fields, setStep2Fields] = useState(step2InitialState);
  const [step3Fields, setStep3Fields] = useState(step3InitialState);
  const [step4Fields, setStep4Fields] = useState(step4InitialState);
  const [step5Fields, setStep5Fields] = useState(step5InitialState);
  const [step6Fields, setStep6Fields] = useState(step6InitialState);
  const [step7Fields, setStep7Fields] = useState(step7InitialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [regId, setRegId] = useState("");
  const [search, setSearch] = useState("");
  const [personalInformationValuesSubmitted, setPersonalInformationValuesSubmitted] = useState({});
  const [sessionTicketsValuesSubmitted, setSessionTicketsValuesSubmitted] = useState({});
  const [paymentInformationValuesSubmitted, setPaymentInformationValuesSubmitted] = useState({});
  const [otherQuestionValuesSubmitted, setOtherQuestionValuesSubmitted] = useState({});
  const [step1Values, setStep1Values] = useState({});
  const [step2Values, setStep2Values] = useState({});  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const template1Data = useSelector(template1Selector)
  const pageDesign = useSelector(pageDesignSelector);
  const registrantsData = useSelector(registrantsSelector);
  const pageDesignGrpReg = useSelector(pageDesignGrpRegSelector);
  const paymentDetails = useSelector(paymentDetailsSelector);

  useEffect(() => {
    // const loginCheck = JSON.parse(sessionStorage.getItem("adminToken"))
    //   ? JSON.parse(sessionStorage.getItem("adminToken"))
    //   : JSON.parse(sessionStorage.getItem("clientToken"))
    //   ? JSON.parse(sessionStorage.getItem("clientToken"))
    //   : "";
    // if (!loginCheck) {
    //   navigate("/");
    // }
    const urlSearchString = window.location.search;

    const params = new URLSearchParams(urlSearchString);

    if(params.get('userId')){
      localStorage.setItem("userId",params.get('userId'))
    }

    if(params.get('eventId')){
      sessionStorage.setItem("eventId",params.get('eventId'))
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

    const lRegTypeID = JSON.parse(sessionStorage.getItem("regTypeId"));

    if (lAccountID && lEventID) {
      dispatch(getEventHeaderFooter({lAccountID, lEventID}))
      dispatch(getRegCategoriesPageDesign({lAccountID, lEventID}))
      dispatch(getQuestionsRegistrantsList({ lAccountID, lEventID }));
    }
    return () => {
      dispatch(clearRegTypesTemplate1());
    };
  }, []);

  const regTypesTemplate1 = postData =>{
    dispatch(getRegTypesTemplate1(postData))
  }

  const fetchPersonalInformationFields = postData => {
    dispatch(getFieldsForPersonalInformation(postData))
  }

  const fetchAdditionalGuestFields = postData => {
    dispatch(getFieldsForAdditionalGuest(postData))
  }
  
  const getPersonalInformationValuesSubmitted = values => {
     setPersonalInformationValuesSubmitted(values)
  }

  const getSessionTicketsValuesSubmitted = values => {
    setSessionTicketsValuesSubmitted(values)
  }

  const getPaymentInformationValuesSubmitted = values => {
    setPaymentInformationValuesSubmitted(values)
  }

  const getPaymentDetailsId = () => {
    dispatch(getPaymentDetails({lAccountID : userId}))
  }
 
  const fetchCashCheckAllowedForPaymentInfo = () => {
    if(userId && eventId)
      dispatch(getPageDesignGrpReg({ lAccountID: userId, lEventID: eventId }));
  }

  const fetchStep1Details = values => {
    setStep1Values(values)
  }

  const fetchStep2Details = values => {
    setStep2Values(values)
  }

  const fetchOtherQuestionsData = values => {
    setOtherQuestionValuesSubmitted(values)
  }

  const getSessionsTicketsData = (lRegTypeID) => {
    if(lRegTypeID)
        dispatch(getSessionsTicketsDataTemplate1({lAccountID : userId, lEventID : eventId, lRegTypeID}))
  }

  const insertTemplate1Data = data => {
    const postData = {
      lAccountID : userId,
      lEventID   : eventId,
      step1PostData : data.step1Value,
      step2PostData : {
        regTypeId : sessionStorage.getItem('regTypeId') ? sessionStorage.getItem('regTypeId') : 0 
      },
      step3PostData : data.step3Value,
      step4PostData : data.step4Value,
      step5PostData : data.step5Value,
      step6PostData : data.step6Value,
      totalAmountDue : sessionStorage.getItem('amountDue') ? sessionStorage.getItem('amountDue') : 0,
      countRegistrant : sessionStorage.getItem('countRegistrant') ? sessionStorage.getItem('countRegistrant') : 0,
      countGuest : sessionStorage.getItem('countGuest') ? sessionStorage.getItem('countGuest') : 0,
      addRegAmt : sessionStorage.getItem('addRegAmt') ? sessionStorage.getItem('addRegAmt') : 0,
      guestsPrice : sessionStorage.getItem('guestsPrice') ? sessionStorage.getItem('guestsPrice') : 0,
      dRegAmount : sessionStorage.getItem('regTypePrice') ? sessionStorage.getItem('regTypePrice') : 0,
      lCategoryID : sessionStorage.getItem('categoryId') ? sessionStorage.getItem('categoryId') : 0,
    }
    dispatch(addTemplate1Data(postData))
    // dispatch(sendEmail(postData))
  }

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <Welcome
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                  template1Data.template1.result : ''}                           
                regCategoriesData = {(pageDesign.regCategoriesPageDesign && pageDesign.regCategoriesPageDesign.result!==undefined ?
                  pageDesign.regCategoriesPageDesign.result : [])}
                step1Details={(values)=>fetchStep1Details(values)}
                />;
                
      case 1:
        return <RegTypes 
                getRegTypes={(data)=>regTypesTemplate1(data)}
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                  template1Data.template1.result : ''}
                regTypesTemplate1Data={(template1Data.regTypesTemplate1 && template1Data.regTypesTemplate1.result!==undefined) ? 
                  template1Data.regTypesTemplate1.result : ''}
                step2Details={(values)=>fetchStep2Details(values)}
                
                  />;
      case 2:
        return <PersonalInformation
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                  template1Data.template1.result : ''}
                getPersonalInformationFields = {(postData)=>fetchPersonalInformationFields(postData)}
                getAdditonalGuestFields = {(postData)=>fetchAdditionalGuestFields(postData)}
                fieldsData = {(template1Data.fieldsPersonalInformation && template1Data.fieldsPersonalInformation.result!==undefined) ? 
                  template1Data.fieldsPersonalInformation.result : ''}
                regGuestfieldsData = {(template1Data.fieldsRegGuest && template1Data.fieldsRegGuest.result!==undefined) ? 
                    template1Data.fieldsRegGuest.result : ''}
                getPersonalInformationValuesSubmit = {(values)=>getPersonalInformationValuesSubmitted(values)}
                step1EmailValue={(step1Values && step1Values.sEmail) ? step1Values.sEmail : ''}
                      />;
      case 3:
        return <OtherQuestions
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                  template1Data.template1.result : ''}
                questionsRegistrantData={
                    registrantsData.questionsRegistrantsList.result 
                  }
                sendPersonalInformationValuesSubmitted = {personalInformationValuesSubmitted}
                getOtherQuestionsData = {(data)=>fetchOtherQuestionsData(data)}
                  />;
      case 4:
        return <SessionsTickets
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                  template1Data.template1.result : ''}
                sessionsTicketsData = {(template1Data.sessionsTicketsDataTemplate1 && template1Data.sessionsTicketsDataTemplate1.result!==undefined) ? 
                  template1Data.sessionsTicketsDataTemplate1.result : ''}
                getSessionTicketsValuesSubmit={(values)=>getSessionTicketsValuesSubmitted(values)}
                getSessionsTicketsData = {(data)=>getSessionsTicketsData(data)}
                  />;

      case 5:
        return <PaymentInformation
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                  template1Data.template1.result : ''}
                getCheckCashAllowed = {()=>fetchCashCheckAllowedForPaymentInfo()}
                checkCashAllowed={(pageDesignGrpReg.pageDesignGrpReg && pageDesignGrpReg.pageDesignGrpReg.result !==undefined)?
                  pageDesignGrpReg.pageDesignGrpReg.result : {}}
                getPaymentInformationValuesSubmit={(values)=>getPaymentInformationValuesSubmitted(values)}
                  />;

      case 6:
        return <Review
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                              template1Data.template1.result : ''}
                personalInformationData = {personalInformationValuesSubmitted}
                paymentInformationValuesData = {paymentInformationValuesSubmitted}
                getPaymentId = {()=>getPaymentDetailsId()}
                paymentDetails={paymentDetails && paymentDetails.result && paymentDetails.result[0] !== undefined
                                ? paymentDetails.result[0] : []}
                lAccountID={userId}
                lEventID={eventId}
                step1Value={step1Values}
                step2Value={step2Values}
                step3Value = {personalInformationValuesSubmitted}
                step4Value = {otherQuestionValuesSubmitted}
                step5Value = {sessionTicketsValuesSubmitted}
                submitDataTemplate1 = {(data)=>insertTemplate1Data(data)}
                />;
        case 7 : <ConfirmationPage sendPersonalInformationValuesSubmitted = {personalInformationValuesSubmitted}
                  sessionsTicketsData = {sessionTicketsValuesSubmitted}
                  paymentInformationValuesData = {paymentInformationValuesSubmitted} />
      default:
        return null;
    }
  };

  const next = () => {
    // if (currentStep === 2) {
      setCurrentStep(0);
      setStep1Fields(step1InitialState);
      setStep2Fields(step2InitialState);
      setStep3Fields(step3InitialState);
      setStep4Fields(step4InitialState);
      setStep5Fields(step5InitialState);
      setStep6Fields(step6InitialState);
      setStep7Fields(step7InitialState);
      
    // }
    setCurrentStep(currentStep + 1); 
    return;
  };
  const prev = () => setCurrentStep(currentStep - 1);
  return (
    // <AdminLayout pageHeading="Template 1">
        <div className="container-fluid">
          <div className="container-fluid demo">
            <div className="reg-login">
              <div className="container">
                <div className="row log-reg-wrap">
                  <div className="col-md-12 col-xs-12">
                    {currentStep != '7' ? 
                      <>
                      <div className="pageHeader">
                        {(template1Data.template1 && template1Data.template1.result!==undefined) ? <div dangerouslySetInnerHTML={{ __html: template1Data.template1.result.mPageHeader }} /> : ''}
                      </div>
                      <div className="reg-steps">
                        <Provider value={{ step1Fields, setStep1Fields, step2Fields, setStep2Fields, step3Fields, setStep3Fields, step4Fields, setStep4Fields, step5Fields, setStep5Fields, step6Fields, setStep6Fields, step7Fields, setStep7Fields, next, prev }}>
                          <Steps current={currentStep}>
                            <Step title={(template1Data.template1 && template1Data.template1.result!==undefined) ?
                            template1Data.template1.result.sStep1Title : ''} />
                            <Step title={(template1Data.template1 && template1Data.template1.result!==undefined) ?
                            template1Data.template1.result.sStep2Title : ''} />
                            <Step title={(template1Data.template1 && template1Data.template1.result!==undefined) ?
                            template1Data.template1.result.sStep3Title : ''} />
                            <Step title={(template1Data.template1 && template1Data.template1.result!==undefined) ?
                            template1Data.template1.result.sStep4Title : ''} />
                            <Step title={(template1Data.template1 && template1Data.template1.result!==undefined) ?
                            template1Data.template1.result.sStep5Title : ''} />
                            <Step title={(template1Data.template1 && template1Data.template1.result!==undefined) ?
                            template1Data.template1.result.sStep6Title : ''} />
                            <Step title={(template1Data.template1 && template1Data.template1.result!==undefined) ?
                            template1Data.template1.result.sStep7Title : ''} />
                          </Steps>
                          <main>{renderStep(currentStep)}</main>
                        </Provider>
                      </div>

                      <div className="pageFooter"> 
                      {(template1Data.template1 && template1Data.template1.result!==undefined) ? <div dangerouslySetInnerHTML={{ __html: template1Data.template1.result.mPageFooter }} /> : ''}
                      </div>
                    </> : 
                    <ConfirmationPage 
                      sendPersonalInformationValuesSubmitted = {personalInformationValuesSubmitted}
                      sessionsTicketsData = {sessionTicketsValuesSubmitted}
                      paymentInformationValuesData = {paymentInformationValuesSubmitted}
                    />
                    }
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      // </AdminLayout>
  );
};
