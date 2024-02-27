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

    useEffect(()=>{
        if(sessionStorage.getItem('amountDue')>0)
            props.getPaymentId()
    },[])

    const getAdditionalRegistrantData = (registrant) => {
        if(registrant){
            var registrantsList = []
            for (let index = 1; index <= registrant; index++) {
                registrantsList.push(
                    <>
                        <tr key={index}>
                            <td>{props.personalInformationData["add_reg_sFirstName_"+index] !== "undefined" ? props.personalInformationData["add_reg_sFirstName_"+index] : ''}</td>
                            <td>{props.personalInformationData["add_reg_sLastName_"+index] !== "undefined" ? props.personalInformationData["add_reg_sLastName_"+index] : ''}</td>
                            <td>{props.personalInformationData["add_reg_sTitle_"+index] !== "undefined" ? props.personalInformationData["add_reg_sTitle_"+index] : ''}</td>
                            <td>{props.personalInformationData["add_reg_sPhone_"+index] !== "undefined" ? props.personalInformationData["add_reg_sPhone_"+index] : ''}</td>
                            <td>{props.personalInformationData["add_reg_sEmail_"+index] !== "undefined" ? props.personalInformationData["add_reg_sEmail_"+index] : ''}</td>
                            <td>{sessionStorage.getItem('addRegAmt') ? '$'+sessionStorage.getItem('addRegAmt') : 0}</td>
                        </tr>                  
                    </>
                );
            }
            return registrantsList
        }
    }

    const getGuestData = (guest) => {
        if(guest){ 
            var guestsList = []
            for (let index = 1; index <= guest; index++) {
                guestsList.push(
                    <>
                        <tr key={index}>
                            <td>{props.personalInformationData["guest_first_name_"+index] !== "undefined" ? props.personalInformationData["guest_first_name_"+index] : ''}</td>
                            <td>{props.personalInformationData["guest_last_name_"+index] !== "undefined" ? props.personalInformationData["guest_last_name_"+index] : ''}</td>
                            <td>{props.personalInformationData["guest_title_"+index] !== "undefined" ? props.personalInformationData["guest_title_"+index] : ''}</td>
                            <td>{props.personalInformationData["guest_phone_"+index] !== "undefined" ? props.personalInformationData["guest_phone_"+index] : ''}</td>
                            <td>{props.personalInformationData["guest_email_"+index] !== "undefined" ? props.personalInformationData["guest_email_"+index] : ''}</td>
                            <td>{sessionStorage.getItem('guestsPrice') ? '$'+sessionStorage.getItem('guestsPrice') : 0}</td> 
                        </tr>                  
                    </>
                );
            }
            return guestsList
        }
    }

    const getSessionsTicketsData = (sessionsTicket) => {
        if(sessionsTicket){ 
            var sessionsTicketsList = []
            for (let index = 0; index < sessionsTicket.countSessions; index++) {
                sessionsTicketsList.push(
                    <>
                        <tr key={index}>
                            <td>{sessionsTicket[`sName${index}`] ? sessionsTicket[`sName${index}`] : ''}</td>
                            <td>{sessionsTicket[`dPrice${index}`] ? sessionsTicket[`dPrice${index}`] : ''}</td>
                            <td>{sessionsTicket[`dQty${index}`] ? sessionsTicket[`dQty${index}`] : ''}</td>
                            <td>{sessionsTicket[`dTotal${index}`] ? sessionsTicket[`dTotal${index}`] : ''}</td>
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
                        step2Value : props.step2Value,
                        step3Value : props.step3Value,
                        step4Value : props.step4Value,
                        step5Value : props.step5Value,
                        step6Value : props.paymentInformationValuesData
                    }
                    props.submitDataTemplate1(postData)
                    alert('Order Completed !!!')
                    next()
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
                            <h4>{props.eventsData?  props.eventsData.sStep7Desc : ''}</h4>
                        </div>
                        <div className="textHeader">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep7Text }} />  : ''}
                        </div>
                      
                        <div className="stepsTab stepsform-wrap reviewTab">
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <h4>Registration Type</h4> <hr/>
                                </div>
                                <ul className="regTypeDetail">
                                    <li>
                                        {sessionStorage.getItem('regTypeName')?sessionStorage.getItem('regTypeName'):''}
                                    </li>
                                    <li>
                                        {sessionStorage.getItem('regTypePrice')?'$'+sessionStorage.getItem('regTypePrice'):''}
                                    </li>
                                </ul>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <h4>Personal Information</h4> <hr/>
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">First Name : </label>
                                    {props.personalInformationData.sFirstName}  
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Last Name : </label>
                                    {props.personalInformationData.sLastName}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Company : </label>
                                    {props.personalInformationData.sCompany}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Address 1 : </label>
                                    {props.personalInformationData.sAddress1}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">State : </label>
                                    {props.personalInformationData.sState}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Zip : </label>
                                    {props.personalInformationData.sZip}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Phone : </label>
                                    {props.personalInformationData.sPhone}
                                </div>
                                <div class="col-md-12 col-xs-12 mb-2">
                                    <label for="html">Email : </label>
                                    {props.personalInformationData.sEmail}
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <h4>Additional Registrants</h4>
                                </div>
                                <div className="col-md-12 col-xs-12 table-overlay-wrap">
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
                                            {(sessionStorage.getItem('countRegistrant')!==undefined && sessionStorage.getItem('countRegistrant') > 0) ? 
                                                getAdditionalRegistrantData(sessionStorage.getItem('countRegistrant')) : 
                                                <tr>
                                                    <td colSpan={6}>No Additional Registrants Found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 col-xs-12 table-overlay-wrap">
                                    <h4>Guests</h4>
                                </div>
                                <div className="col-md-12 col-xs-12">
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
                                            {(sessionStorage.getItem('countGuest')!==undefined && sessionStorage.getItem('countGuest') > 0) ? 
                                                getGuestData(sessionStorage.getItem('countGuest')):
                                                <tr>
                                                    <td colSpan={6}>No Guests Found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <h4>Sessions and Events</h4>
                                </div>
                                <div className="col-md-12 col-xs-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr className="bg-primary text-white">
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(props.step5Value && props.step5Value.countSessions !==undefined && props.step5Value.countSessions > 0) ? 
                                                getSessionsTicketsData(props.step5Value):
                                                <tr>
                                                    <td colSpan={6}>No events and/or tickets have been selected</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
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
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep7TextBottom }} /> : ''}
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
        <ModalBox
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
        </ModalBox>
        </>
    );
}
