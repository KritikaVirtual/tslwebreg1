import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";
import { Provider } from "./MultiStepFormContext";
import { Welcome } from "./Welcome";
import { MainContact } from "./MainContact";
import "./index.css";
import { 
    getPageDesignGrpReg,
    getMainContactFields 
} from "../../../Services/Store/Common/pageDesignGrpReg/pageDesignGrp.action";
import { pageDesignGrpRegSelector } from "../../../Services/Store/Common/pageDesignGrpReg/pageDesignGrp.selector";
import { getRegCategoriesPageDesign } from "../../../Services/Store/Common/pageDesign/pageDesign.action";
import { pageDesignSelector } from "../../../Services/Store/Common/pageDesign/pageDesign.selector";
import { template1Selector } from "../../../Services/Store/Common/template1/template1.selector";
import { Registrants } from "./Registrants";
import { addTemplate21Data, getFieldsForRegistrant, getSessionsTicketsDataTemplate21 } from "../../../Services/Store/Common/template21/template21.action";
import { template21Selector } from "../../../Services/Store/Common/template21/template21.selector";
import { getRegTypesTemplate1, getSessionsTicketsDataTemplate1 } from "../../../Services/Store/Common/template1/template1.action";
import { OtherQuestions } from "./OtherQuestions";
import { getQuestionsRegistrantsList } from "../../../Services/Store/Common/registrants/registrants.action";
import { registrantsSelector } from "../../../Services/Store/Common/registrants/registrants.selector"; 
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
 

export function Template21() {
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
  const [step1Values, setStep1Values] = useState({});
  const [step2Values, setStep2Values] = useState({});  
  const [personalInformationValuesSubmitted, setPersonalInformationValuesSubmitted] = useState({});
  const [paymentInformationValuesSubmitted, setPaymentInformationValuesSubmitted] = useState({});
  const [mainContactFieldsData, setMainContactFieldsData] = useState({});
  const [sessionTicketsValuesSubmitted, setSessionTicketsValuesSubmitted] = useState({});
  const [otherQuestionValuesSubmitted, setOtherQuestionValuesSubmitted] = useState({});
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageDesign = useSelector(pageDesignSelector);
  const pageDesignGrpRegData = useSelector(pageDesignGrpRegSelector);
  const template1Data = useSelector(template1Selector)
  const template21Data = useSelector(template21Selector)
  const registrantsData = useSelector(registrantsSelector);

  useEffect(() => {
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

    if (lAccountID && lEventID) {
      dispatch(getRegCategoriesPageDesign({lAccountID, lEventID}))
      dispatch(getPageDesignGrpReg({lAccountID, lEventID}))
      dispatch(getFieldsForRegistrant({lAccountID, lEventID}))
      dispatch(getQuestionsRegistrantsList({ lAccountID, lEventID }));
    }
  }, []);

  const fetchStep1Details = values => {
    setStep1Values(values)
  }

  const fetchMainContactFields = postData => {
    dispatch(getMainContactFields({ lAccountID : postData.lAccountID, lEventID: postData.lEventID, sCode: postData.fieldNameArray }));
  }

  const regTypesTemplate1 = postData =>{
    dispatch(getRegTypesTemplate1(postData))
  }

  const getPersonalInformationValuesSubmitted = values => {
    setPersonalInformationValuesSubmitted(values)
  }

  const getSessionsTicketsData = (regTypeId) => {
    dispatch(getSessionsTicketsDataTemplate21({lAccountID : userId, lEventID : eventId, lRegTypeID: regTypeId}))
  }

  const getMainContactFieldsData = values => {
    setMainContactFieldsData(values)
  }

  const getSessionTicketsValuesSubmitted = values => {
    setSessionTicketsValuesSubmitted(values)
  }

  const getPaymentInformationValuesSubmitted = values => {
    setPaymentInformationValuesSubmitted(values)
  }

  const fetchOtherQuestionsData = values => {
    setOtherQuestionValuesSubmitted(values)
  }

  const insertTemplate21Data = data => {
    const postData = {
      lAccountID : userId,
      lEventID   : eventId,
      step1PostData : data.step1Value,
      // step2PostData : {
      //   regTypeId : sessionStorage.getItem('regTypeId') ? sessionStorage.getItem('regTypeId') : 0 
      // },
      step2PostData : data.step2Value,
      step3PostData : data.step3Value,
      step4PostData : data.step4Value,
      step5PostData : data.step5Value,
      step6PostData : data.step6Value,
      totalAmountDue : sessionStorage.getItem('amountDue') ? sessionStorage.getItem('amountDue') : 0,
      countRegistrant : sessionStorage.getItem('countRegistrant') ? sessionStorage.getItem('countRegistrant') : 0,
      // addRegAmt : sessionStorage.getItem('addRegAmt') ? sessionStorage.getItem('addRegAmt') : 0,
      // dRegAmount : sessionStorage.getItem('regTypePrice') ? sessionStorage.getItem('regTypePrice') : 0,
      lCategoryID : sessionStorage.getItem('categoryId') ? sessionStorage.getItem('categoryId') : 0,
    }
    console.log('postData',postData)
    dispatch(addTemplate21Data(postData))
    // dispatch(sendEmail(postData))
  }

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <Welcome
                eventsData = {(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ? 
                  pageDesignGrpRegData.pageDesignGrpReg.result : ''}                           
                regCategoriesData = {(pageDesign.regCategoriesPageDesign && pageDesign.regCategoriesPageDesign.result!==undefined ?
                  pageDesign.regCategoriesPageDesign.result : [])}
                step1Details={(values)=>fetchStep1Details(values)}
                />;
                
      case 1:
        return  <MainContact
                  eventsData = {(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ? 
                    pageDesignGrpRegData.pageDesignGrpReg.result : ''}
                  getMainContactFields = {(postData)=>fetchMainContactFields(postData)}
                  mainContactFieldsData = {(pageDesignGrpRegData.fieldName && pageDesignGrpRegData.fieldName.result!==undefined) ? 
                      pageDesignGrpRegData.fieldName.result : ''}
                  step1EmailValue={(step1Values && step1Values.sEmail) ? step1Values.sEmail : ''}
                  sendMainContactData = {(values)=>getMainContactFieldsData(values)}
                />;
      case 2:
        return <Registrants
                eventsData = {(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ? 
                  pageDesignGrpRegData.pageDesignGrpReg.result : ''}
                registrantFieldData = {(template21Data.fieldsRegistrant && template21Data.fieldsRegistrant.result!==undefined) ? 
                  template21Data.fieldsRegistrant.result : ''}
                getRegTypes={(data)=>regTypesTemplate1(data)}
                regTypesTemplate21Data={(template1Data.regTypesTemplate1 && template1Data.regTypesTemplate1.result!==undefined) ? 
                  template1Data.regTypesTemplate1.result : ''}
                getPersonalInformationValuesSubmit = {(values)=>getPersonalInformationValuesSubmitted(values)}
                mainContactFieldsData = {mainContactFieldsData}
                      />;
      case 3:
        return <OtherQuestions
                eventsData = {(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ? 
                  pageDesignGrpRegData.pageDesignGrpReg.result : ''}
                questionsRegistrantData={
                    registrantsData.questionsRegistrantsList.result 
                  }
                sendPersonalInformationValuesSubmitted = {personalInformationValuesSubmitted}
                getOtherQuestionsData = {(data)=>fetchOtherQuestionsData(data)}
                  />;
      case 4:
        return <SessionsTickets
                eventsData = {(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ? 
                   pageDesignGrpRegData.pageDesignGrpReg.result : ''}
                getSessionsTicketsData = {(data)=>getSessionsTicketsData(data)}
                sessionsTicketsData = {(template21Data.sessionsTicketsDataTemplate21 && template21Data.sessionsTicketsDataTemplate21.result!==undefined) ? 
                  template21Data.sessionsTicketsDataTemplate21.result : ''} 
                sendPersonalInformationValuesSubmitted = {personalInformationValuesSubmitted}
                getSessionTicketsValuesSubmit={(values)=>getSessionTicketsValuesSubmitted(values)}
                  
                  />; 

      case 5:
        return <PaymentInformation
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                  template1Data.template1.result : ''}
                checkCashAllowed={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result !==undefined)?
                  pageDesignGrpRegData.pageDesignGrpReg.result : {}}
                getPaymentInformationValuesSubmit={(values)=>getPaymentInformationValuesSubmitted(values)}
                  />;

      case 6:
        return <Review
                eventsData = {(template1Data.template1 && template1Data.template1.result!==undefined) ? 
                              template1Data.template1.result : ''}
                personalInformationData = {personalInformationValuesSubmitted}
                mainContactFieldsData = {mainContactFieldsData}
                sessionTicketsValues = {sessionTicketsValuesSubmitted}
                paymentInformationValuesData = {paymentInformationValuesSubmitted}
                otherQuestionsData = {otherQuestionValuesSubmitted}
                // getPaymentId = {()=>getPaymentDetailsId()}
                // paymentDetails={paymentDetails && paymentDetails.result && paymentDetails.result[0] !== undefined
                //                 ? paymentDetails.result[0] : []}
                lAccountID={userId}
                lEventID={eventId}
                step1Value={step1Values}
                // step4Value = {otherQuestionValuesSubmitted}
                submitDataTemplate21 = {(data)=>insertTemplate21Data(data)}
                />;
        // case 7 : <ConfirmationPage
        //           sendPersonalInformationValuesSubmitted = {personalInformationValuesSubmitted}
        //           sessionsTicketsData = {sessionTicketsValuesSubmitted}
        //           paymentInformationValuesData = {paymentInformationValuesSubmitted} 
        //         />
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
                        {(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ? <div dangerouslySetInnerHTML={{ __html: pageDesignGrpRegData.pageDesignGrpReg.result.mPageHeaderGroup }} /> : ''}
                      </div>
                      <div className="reg-steps">
                        <Provider value={{ step1Fields, setStep1Fields, step2Fields, setStep2Fields, step3Fields, setStep3Fields, step4Fields, setStep4Fields, step5Fields, setStep5Fields, step6Fields, setStep6Fields, step7Fields, setStep7Fields, next, prev }}>
                          <Steps current={currentStep}>
                            <Step title={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ?
                            pageDesignGrpRegData.pageDesignGrpReg.result.sStep1TitleGroup : ''} />
                            <Step title={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ?
                            pageDesignGrpRegData.pageDesignGrpReg.result.sStep2TitleGroup : ''} />
                            <Step title={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ?
                            pageDesignGrpRegData.pageDesignGrpReg.result.sStep3TitleGroup : ''} />
                            <Step title={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ?
                            pageDesignGrpRegData.pageDesignGrpReg.result.sStep4TitleGroup : ''} />
                            <Step title={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ?
                            pageDesignGrpRegData.pageDesignGrpReg.result.sStep5TitleGroup : ''} />
                            <Step title={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ?
                            pageDesignGrpRegData.pageDesignGrpReg.result.sStep6TitleGroup : ''} />
                            <Step title={(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ?
                            pageDesignGrpRegData.pageDesignGrpReg.result.sStep7TitleGroup : ''} />
                          </Steps>
                          <main>{renderStep(currentStep)}</main>
                        </Provider>
                      </div>

                      <div className="pageFooter"> 
                      {(pageDesignGrpRegData.pageDesignGrpReg && pageDesignGrpRegData.pageDesignGrpReg.result!==undefined) ? <div dangerouslySetInnerHTML={{ __html: pageDesignGrpRegData.pageDesignGrpReg.result.mPageFooterGroup }} /> : ''}
                      </div>
                    </> : 
                    <ConfirmationPage 
                      mainContactFieldsData = {mainContactFieldsData}
                      personalInformationData = {personalInformationValuesSubmitted}
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
