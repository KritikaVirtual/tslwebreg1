import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input, Select } from "formik-antd";
import { ModalBox } from "../../../Components/Ui/ModalBox";
import AuthorizePayment from "../PaymentGateways/AuthorizePayment";
import StripePayment from "../PaymentGateways/StripePayment";
import PaypalPayment from "../PaymentGateways/PaypalPayment";
import MultiStepFormContext from "./MultiStepFormContext";
import { useNavigate } from "react-router-dom";

export function Review(props) {
    
    const { step7Fields, setStep7Fields, next, prev } = useContext(MultiStepFormContext);
    const [showModel, setShowModel] = useState(false);
    const navigate = useNavigate()

    // useEffect(()=>{
    //     if(sessionStorage.getItem('amountDue')>0)
    //         props.getPaymentId()
    // },[])
    const getAdditionalRegistrantData = (registrant) => {
        if(registrant){
            var registrantsList = []
            for (let index = 1; index <= registrant; index++) {
                registrantsList.push(
                    <>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Title</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={index}>
                                    <td>{props.personalInformationData["add_reg_sFirstName_"+index] !== "undefined" ? props.personalInformationData["add_reg_sFirstName_"+index] : ''}</td>
                                    <td>{props.personalInformationData["add_reg_sLastName_"+index] !== "undefined" ? props.personalInformationData["add_reg_sLastName_"+index] : ''}</td>
                                    <td>{props.personalInformationData["add_reg_sTitle_"+index] !== "undefined" ? props.personalInformationData["add_reg_sTitle_"+index] : ''}</td>
                                    <td>{props.personalInformationData["add_reg_sPhone_"+index] !== "undefined" ? props.personalInformationData["add_reg_sPhone_"+index] : ''}</td>
                                    <td>{props.personalInformationData["add_reg_sEmail_"+index] !== "undefined" ? props.personalInformationData["add_reg_sEmail_"+index] : ''}</td>
                                    <td>{sessionStorage.getItem('addRegAmt') ? '$'+sessionStorage.getItem('addRegAmt') : 0}</td>
                                </tr>                
                                {sessionStorage.getItem('regTypeId'+index) &&
                                    <>
                                        <tr className="bg-primary">
                                            <th>Reg Type :</th>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr> 
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>{sessionStorage.getItem('regTypeName'+index) ? sessionStorage.getItem('regTypeName'+index) : ''}</td>
                                            <td>{props.personalInformationData["add_reg_sLastName_"+index] !== "undefined" ? props.personalInformationData["add_reg_sLastName_"+index] : ''}</td>
                                            <td>1</td>
                                            <td>{sessionStorage.getItem('regTypePrice'+index) ? sessionStorage.getItem('regTypePrice'+index) : ''}</td>
                                        </tr>   
                                    </>
                                }  
                                {props.sessionTicketsValues !==undefined ?  
                                    <>
                                            <tr className="bg-primary">
                                                <th>Sessions and Events : </th>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr> 
                                        {getSessionsTicketsData(index, props.sessionTicketsValues)}
                                    </> 
                                    : '' 
                                }  
                                    
                            </tbody>
                        </table>
                        <br/>
                    </>
                );
            }
            return registrantsList
        }
    }
    
    const getSessionsTicketsData = (indexArray, sessionsTicket) => {
        if(sessionsTicket){ 
            var sessionsTicketsList = []
            for (let index = 0; index < sessionsTicket.countSessions; index++) {
                sessionsTicketsList.push(
                    <>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>{sessionsTicket[`sName${indexArray-1+''+index}`] ? sessionsTicket[`sName${indexArray-1+''+index}`] : ''}</td>
                            <td>{sessionsTicket[`dPrice${indexArray-1+''+index}`] ? sessionsTicket[`dPrice${indexArray-1+''+index}`] : ''}</td>
                            <td>{sessionsTicket[`dQty${indexArray-1+''+index}`] ? sessionsTicket[`dQty${indexArray-1+''+index}`] : ''}</td>
                            <td>{sessionsTicket[`dTotal${indexArray-1+''+index}`] ? sessionsTicket[`dTotal${indexArray-1+''+index}`] : ''}</td>
                        </tr>   
                    </>
                );
            }
            return sessionsTicketsList
        }
    }

    const afterPaymentSuccess = data => {
        if(data)
            props.submitDataTemplate1(props.step1Value)
    }

    const previousButton = () => {
        prev()
    }
    
    return (
        <>
        <Formik
        initialValues={step7Fields}
        onSubmit={(values) => {
            setStep7Fields(values);
            if(sessionStorage.getItem('amountDue')>0)
                if(props.paymentInformationValuesData.payment_type == '0'){
                    setShowModel(true);
                }else{
                    const postData = {
                        step1Value : props.step1Value,
                        step2Value : props.mainContactFieldsData,
                        step3Value : props.personalInformationData,
                        step4Value : props.otherQuestionsData,
                        step5Value : props.sessionTicketsValues,
                        step6Value : props.paymentInformationValuesData
                    }
                    props.submitDataTemplate21(postData)
                    alert('Order Completed !!!');
                    next();
                } 
        }}
        validate={(values) => {
        }}
        >
        {({ handleSubmit, errors }) => {
            return (
            <div className={"details__wrapper"}>
                <div class="form-content">
                    <div class="row">
                        <div class="col-md-12 form-heading ">
                            <h4>{props.eventsData?  props.eventsData.sStep7DescGroup : ''}</h4>
                        </div>
                        <div className="textHeader">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep7TextGroup }} />  : ''}
                        </div>
                      
                        <div className="stepsTab stepsform-wrap reviewTab">
                            <br/>
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <h4>Main Contact</h4> <hr/>
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">First Name : </label>
                                    {props.mainContactFieldsData.sFirstName}  
                                </div> 
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Last Name : </label>
                                    {props.mainContactFieldsData.sLastName}
                                </div> 
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Company : </label>
                                    {props.mainContactFieldsData.sCompany}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Address 1 : </label>
                                    {props.mainContactFieldsData.sAddress1}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">City : </label>
                                    {props.mainContactFieldsData.sAddress1}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">State : </label>
                                    {props.mainContactFieldsData.sState}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Zip : </label>
                                    {props.mainContactFieldsData.sZip}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Phone : </label>
                                    {props.mainContactFieldsData.sPhone}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Email : </label>
                                    {props.mainContactFieldsData.sEmail}
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <h4>Registrants</h4>
                                </div>
                                <div className="col-md-12 col-xs-12 table-overlay-wrap">
                                {(sessionStorage.getItem('countRegistrant')!==undefined && sessionStorage.getItem('countRegistrant') > 0) ? 
                                                getAdditionalRegistrantData(sessionStorage.getItem('countRegistrant')) : ''}
                                    
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <h4>Payment</h4> <hr/>
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">First Name : </label>
                                    {props.paymentInformationValuesData.x_first_name}  
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Last Name : </label>
                                    {props.paymentInformationValuesData.x_last_name}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Company : </label>
                                    {props.paymentInformationValuesData.x_company}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Address : </label>
                                    {props.paymentInformationValuesData.x_address}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">City : </label>
                                    {props.paymentInformationValuesData.x_city}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">State/Province : </label>
                                    {props.paymentInformationValuesData.x_state}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Postal Code : </label>
                                    {props.paymentInformationValuesData.x_zip}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Country : </label>
                                    {props.paymentInformationValuesData.x_country}
                                </div>
                            </div>

                        </div>
                        

                        <div className="textFooter">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep7TextBottomGroup }} /> : ''}
                        </div>
                        
                        <div
                            className={"form__item button__items d-flex justify-content-end"}
                            >
                            <Button type={"secondary"} onClick={()=>previousButton()}>
                                Previous
                            </Button>

                            <Button type={"primary"} 
                                onClick={handleSubmit}
                            >
                                Finish
                            </Button>
                        </div>

                        <div className="reg-amount">
                            <h5>Total Amount Due ${sessionStorage.getItem('amountDue') ? sessionStorage.getItem('amountDue') : 0 }</h5>
                        </div>
                    
                        
                    </div>
                </div>
            </div>
            );
        }}
        </Formik>
        {/* <ModalBox
            className="payment_model"
            show={showModel}
            onHide={() => {
            setShowModel(false);
            }}
        >
            {props.paymentDetails && props.paymentDetails.paymentID === 3 ? (
            <AuthorizePayment />
            ) : props.paymentDetails.paymentID === 4 ? (
            <PaypalPayment
                amount={sessionStorage.getItem('amountDue')}
                setShow={(data) => setShowModel(data)}
                paymentSuccess = {(data)=>afterPaymentSuccess(data)}
            />
            ) : props.paymentDetails.paymentID === 9 ? (
            <StripePayment />
            ) : (
            <PaypalPayment
                amount={sessionStorage.getItem('amountDue')}
                setShow={(data) => setShowModel(data)}
            />
            )}
        </ModalBox> */}
        </>
    );
}
