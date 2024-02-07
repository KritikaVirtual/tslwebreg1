import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input, Select } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

export function PaymentInformation(props) {
    
    const { step6Fields, setStep6Fields, next, prev } = useContext(MultiStepFormContext);
    const [countRegistrant, setCountRegistrant] = useState(0)
    const [countGuest, setCountGuest] = useState(0)
    const [guestsPrice, setGuestsPrice] = useState(0)
    const [fieldsDisabled, setFieldsDisabled] = useState(false)
    const [radioChecked, setRadioChecked] = useState(true)
    const [checkCashAllowed, setCheckCashAllowed] = useState(0)

    useEffect(()=>{
        if(props.checkCashAllowed && props.checkCashAllowed.nAllowToPayByCheck !=='undefined'){
            setCheckCashAllowed(props.checkCashAllowed.nAllowToPayByCheck)
        }
    },[props.checkCashAllowed])

    const _handlePaymentType = event => {
        if(event.target.value == '0'){
            setFieldsDisabled(false)
            setRadioChecked(true)
        }
        if(event.target.value == '1'){
            setFieldsDisabled(true)
            setRadioChecked(false)
        }
    }

    const previousButton = () => {
        prev()
    }

    return (
        <>
        <Formik
        initialValues={step6Fields}
        onSubmit={(values) => {
            if(!values.payment_type){
                values.payment_type = '0'
            }
            setStep6Fields(values);
            props.getPaymentInformationValuesSubmit(values)
            next();
        }}
        validate={(values) => {
            const errors = {};
            if (!values.terms) errors.terms = "Please agree the Terms and Conditions";
            if(!fieldsDisabled){
                if (!values.x_first_name) errors.x_first_name = "Please Enter the First Name";
                if (!values.x_last_name) errors.x_last_name = "Please Enter the Last Name";
                if (!values.x_company) errors.x_company = "Please Enter the Company";
                if (!values.x_address) errors.x_address = "Please Enter the Address";
                if (!values.x_city) errors.x_city = "Please Enter the City";
                if (!values.x_state) errors.x_state = "Please Enter the State";
                if (!values.x_zip) errors.x_zip = "Please Enter the Zip";
            }
            
            return errors;
        }}
        >
        {({ handleSubmit, errors }) => {
            return (
            <div className={"details__wrapper"}>
                <div class="form-content">
                    <div class="row">
                        <div class="col-md-12 form-heading ">
                            <h4>{props.eventsData?  props.eventsData.sStep6DescGroup : ''}</h4>
                        </div>
                        <div className="textHeader">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep6TextGroup }} />  : ''}
                        </div>
                        
                        <div class="stepsTab stepsform-wrap">
                            <div className="row">
                                {checkCashAllowed == '1' && <div className="col-md-6 paymentType">
                                    <Input type="radio" name="payment_type" value="1" onChange={(event)=>_handlePaymentType(event)} />
                                    <label>Pay by Check or Cash</label> 
                                </div>}
                                
                                <div className="col-md-6 paymentType">
                                    <Input type="radio" name="payment_type" value="0" checked={radioChecked} onChange={(event)=>_handlePaymentType(event)} />
                                    <label>Pay by Credit Card</label> 
                                </div>
                                <div class="col-md-12 col-xs-12 paymentType">
                                    <Input type="checkbox" name={"terms"} />
                                        <label for="html">Terms and Conditions</label>
                                        {errors.terms ? (
                                            <div className="errorMsg text-danger">
                                                {errors.terms}
                                            </div>
                                            ) : ("")
                                        }
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">First Name *</label>
                                 <Input name={"x_first_name"} disabled={fieldsDisabled} />
                                 {(errors.x_first_name && !fieldsDisabled) ? (
                                    <div className="errorMsg text-danger">
                                        {errors.x_first_name}
                                    </div>
                                    ) : ("")
                                }
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">Last Name *</label>
                                <Input name={"x_last_name"} disabled={fieldsDisabled} />
                                {(errors.x_last_name && !fieldsDisabled) ? (
                                    <div className="errorMsg text-danger">
                                        {errors.x_last_name}
                                    </div>
                                    ) : ("")
                                }
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">Company *</label>
                                    <Input name={"x_company"} disabled={fieldsDisabled} />
                                    {(errors.x_company && !fieldsDisabled) ? (
                                        <div className="errorMsg text-danger">
                                            {errors.x_company}
                                        </div>
                                        ) : ("")
                                    }
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">Address *</label>
                                <Input name={"x_address"} disabled={fieldsDisabled} />
                                {(errors.x_address && !fieldsDisabled)? (
                                    <div className="errorMsg text-danger">
                                        {errors.x_address}
                                    </div>
                                    ) : ("")
                                }
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">City *</label>
                                <Input name={"x_city"} disabled={fieldsDisabled} />
                                {(errors.x_city && !fieldsDisabled)? (
                                    <div className="errorMsg text-danger">
                                        {errors.x_city}
                                    </div>
                                    ) : ("")
                                }
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">State/ Province *</label>
                                <Input name={"x_state"} disabled={fieldsDisabled} />
                                {(errors.x_state && !fieldsDisabled) ? (
                                    <div className="errorMsg text-danger">
                                        {errors.x_state}
                                    </div>
                                    ) : ("")
                                }
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">Postal Code *</label>
                                <Input name={"x_zip"} disabled={fieldsDisabled} />
                                {(errors.x_zip && !fieldsDisabled) ? (
                                    <div className="errorMsg text-danger">
                                        {errors.x_zip}
                                    </div>
                                    ) : ("")
                                }
                            </div>
                            <div class="col-md-12 col-xs-12 mb-2">
                                <label for="html">Country </label>
                                <Input name={"x_country"} disabled={fieldsDisabled} />
                            </div>
                        </div>

                        <div className="textFooter">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep6TextBottomGroup }} /> : ''}
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
                                Next
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
        </>
    );
}
