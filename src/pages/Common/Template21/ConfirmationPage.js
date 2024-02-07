import React, { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmailSetup } from "../../../Services/Store/Common/emailSetup/emailSetup.action";
import { emailSetupSelector } from "../../../Services/Store/Common/emailSetup/emailSetup.selector";
import { SectionEventInfoBasic } from "../ShortCodesTemplate21/SectionEventInfoBasic";
import { SectionRegistrantFullInfo } from "../ShortCodesTemplate21/SectionRegistrantFullInfo";
import { SectionRegistrationType } from "../ShortCodesTemplate21/SectionRegistrationType";
import { SectionAdditionalRegistrants } from "../ShortCodesTemplate21/SectionAdditionalRegistrants";
import { SectionGuests } from "../ShortCodesTemplate21/SectionGuests";
import { SectionSessions } from "../ShortCodesTemplate21/SectionSessions";
import { SectionTotalWithOtherFees } from "../ShortCodesTemplate21/SectionTotalWithOtherFees";
import { SectionPaymentAll } from "../ShortCodesTemplate21/SectionPaymentAll";
import { sendEmail } from "../../../Services/Store/Common/template1/template1.action";

export function ConfirmationPage(props) {
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const emailSetupData = useSelector(emailSetupSelector)

      useEffect(() => {
        const lAccountID = JSON.parse(localStorage.getItem("userId"));
        if (lAccountID) {
          setUserId(lAccountID);
        }
        const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
        if (lEventID) {
          setEventId(lEventID);
        }
    
        if (lAccountID && lEventID) {
          dispatch(getEmailSetup({lAccountID, lEventID}))
          // if(emailSetupData.emailSetup && emailSetupData.emailSetup.result !==undefined){
          //   dispatch(sendEmail(callShortCodes(emailSetupData.emailSetup.result.mConfirmationPageText)))
          // }
        }
        
      }, []);
     
      const callShortCodes = data => {
        var result = data
        if(data.includes('[Registrant_First_Name]')){
          result = result.replace('[Registrant_First_Name]','')
        } 
        if(data.includes('[Registrant_Last_Name]')){
          result = result.replace('[Registrant_Last_Name]','')
        }  
        if(data.includes('[Section_Event_Info_Basic]')){
          const sectionEventInfoBasicHtml = ReactDOMServer.renderToStaticMarkup(<SectionEventInfoBasic 
            eventData={emailSetupData.emailSetup.result} />) 
          result = result.replace('[Section_Event_Info_Basic]',sectionEventInfoBasicHtml)
        } 
        if(data.includes('[Section_Registrant_Full_Info]')){
          const sectionRegistrantFullInfoHtml = ReactDOMServer.renderToStaticMarkup(<SectionRegistrantFullInfo 
            mainContactInformation = {props.mainContactFieldsData}
            />)
          result = result.replace('[Section_Registrant_Full_Info]',sectionRegistrantFullInfoHtml) 
        }
        if(data.includes('[Section_Additional_Registrants]')){
            const sectionAdditionalRegistrantsHtml = ReactDOMServer.renderToStaticMarkup(<SectionAdditionalRegistrants 
              personalInformationData={props.personalInformationData} />)
            result = result.replace('[Section_Additional_Registrants]',sectionAdditionalRegistrantsHtml)
          }
        if(data.includes('[Section_Registration_Type]')){
          const sectionRegistrationTypeHtml = ReactDOMServer.renderToStaticMarkup(<SectionRegistrationType
            personalInformationData = {props.personalInformationData} />) 
          result = result.replace('[Section_Registration_Type]',sectionRegistrationTypeHtml)
        }
          
        if(data.includes('[Section_Sessions_All]')){
          const sectionSessionsHtml = ReactDOMServer.renderToStaticMarkup(<SectionSessions 
            personalInformationData = {props.personalInformationData}
            sessionsTicketsData = {props.sessionsTicketsData} />)
          result = result.replace('[Section_Sessions_All]',sectionSessionsHtml)
        }
        
        if(data.includes('[Section_Total_With_Other_Fees]')){   
          const sectionTotalOtherFeesHtml = ReactDOMServer.renderToStaticMarkup(<SectionTotalWithOtherFees />)
          result = result.replace('[Section_Total_With_Other_Fees]',sectionTotalOtherFeesHtml)
        }
        if(data.includes('[Section_Questions_All]')){  
          const sectionQuestionsHtml = ReactDOMServer.renderToStaticMarkup(<p></p>) 
          result = result.replace('[Section_Questions_All]',sectionQuestionsHtml)
        }
        if(data.includes('[Section_Guests]')){ 
          const sectionGuestsHtml = ReactDOMServer.renderToStaticMarkup(<p></p>)
          result = result.replace('[Section_Guests]',sectionGuestsHtml)
        }
        if(data.includes('[Section_Payment_All]')){ 
          const sectionPaymentHtml = ReactDOMServer.renderToStaticMarkup(<SectionPaymentAll
            paymentInformationValuesData = {props.paymentInformationValuesData} 
            registrantInformation = {props.sendPersonalInformationValuesSubmitted} />)
          result = result.replace('[Section_Payment_All]',sectionPaymentHtml)
        }
        return result
      }

    return (
        <>
            <div className="container-fluid">
                <div className="container-fluid demo">
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
                                            {(emailSetupData.emailSetup && emailSetupData.emailSetup.result !==undefined) ? 
                                              <>
                                              <div 
                                                   dangerouslySetInnerHTML={{__html: callShortCodes(emailSetupData.emailSetup.result.mConfirmationPageText)}}>
                                              </div> 
                                              </>
                                                : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
