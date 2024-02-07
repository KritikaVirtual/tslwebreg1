import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import CONSTANT from "../../../Services/Constant/user.constants";
import { API_URL } from "../../../Config/config";
import { requestTokenHeader } from "../../../Services/Helpers/helper";

export default function PaymentDetailsTab(props) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState({});
    const [paymentID, setpaymentID] = useState(3);
    const [fields,setFields] = useState({});

    useEffect(() => {
        getPaymentDetails();
    },[]);
        
    const handleChange = (event) => {
        let data = fields;
        data[event.target.name] = event.target.value;
        setFields({ ...data });
    };
    
    const validateRegistration = (fields) => {
       
        let errors = {};
        let formIsValid = true;
        if(paymentID === 3){
            if (!fields["authorize_api_login_id"] || fields["authorize_api_login_id"].trim() === " ") {
                formIsValid = false;
                errors["authorize_api_login_id"] = "*Please enter Authorize API Login ID.";
            }
            if (!fields["authorize_transaction_key"] || fields["authorize_transaction_key"].trim() === "") {
                formIsValid = false;
                errors["authorize_transaction_key"] = "*Please enter Authorize Transaction Key.";
            }
        }else if(paymentID === 4){
            if (!fields["pay_pal_username"] || fields["pay_pal_username"].trim() === "") {
                formIsValid = false;
                errors["pay_pal_username"] = "*Please enter Pay Pal UserName.";
            }
            if (!fields["pay_pal_password"] || fields["pay_pal_password"].trim() === "") {
                formIsValid = false;
                errors["pay_pal_password"] = "*Please enter Pay Pal Password.";
            }
            if (!fields["pay_pal_signature"] || fields["pay_pal_signature"].trim() === "") {
                formIsValid = false;
                errors["pay_pal_signature"] = "*Please enter Pay Pal Signature.";
            }

        }else if(paymentID === 5){
            if (!fields["pay_flow_partner"] || fields["pay_flow_partner"].trim() === "") {
                formIsValid = false;
                errors["pay_flow_partner"] = "*Please enter Pay Flow Partner.";
            }
            if (!fields["pay_flow_vendor"] || fields["pay_flow_vendor"].trim() === "") {
                formIsValid = false;
                errors["pay_flow_vendor"] = "*Please enter Pay FLow Vendor.";
            }
            if (!fields["pay_flow_user"] || fields["pay_flow_user"].trim() === "") {
                formIsValid = false;
                errors["pay_flow_user"] = "*Please enter Pay Pal User.";
            }
            if (!fields["pay_flow_password"] || fields["pay_flow_password"].trim() === "") {
                formIsValid = false;
                errors["pay_flow_password"] = "*Please enter Pay Flow Password.";
            }

        }else if(paymentID === 6){
            if (!fields["payeezy_gateway_id"] || fields["payeezy_gateway_id"].trim() === "") {
                formIsValid = false;
                errors["payeezy_gateway_id"] = "*Please enter Payeezy Gateway ID.";
            }
            if (!fields["payeezy_gateway_password"] || fields["payeezy_gateway_password"].trim() === "") {
                formIsValid = false;
                errors["payeezy_gateway_password"] = "*Please enter Payeezy Gateway Password.";
            }
            if (!fields["payeezy_gateway_api_key"] || fields["payeezy_gateway_api_key"].trim() === "") {
                formIsValid = false;
                errors["payeezy_gateway_api_key"] = "*Please enter Payeezy Gateway API Key.";
            }
            if (!fields["payeezy_gateway_hmac"] || fields["payeezy_gateway_hmac"].trim() === "") {
                formIsValid = false;
                errors["payeezy_gateway_hmac"] = "*Please enter Payeezy Gateway HMAC.";
            }

        }else if(paymentID === 7){
            if (!fields["payeezy_api_secret"] || fields["payeezy_api_secret"].trim() === "") {
                formIsValid = false;
                errors["payeezy_api_secret"] = "*Please enter Payeezy API Secret.";
            }
            if (!fields["payeezy_api_key"] || fields["payeezy_api_key"].trim() === "") {
                formIsValid = false;
                errors["payeezy_api_key"] = "*Please enter Payeezy API Key.";
            }
            if (!fields["payeezy_merchant_token"] || fields["payeezy_merchant_token"].trim() === "") {
                formIsValid = false;
                errors["payeezy_merchant_token"] = "*Please enter Payeezy Merchant Token.";
            }

        }else if(paymentID === 8){
            if (!fields["quickBook_client_secret"] || fields["quickBook_client_secret"].trim() === "") {
                formIsValid = false;
                errors["quickBook_client_secret"] = "*Please enter QuickBook Client Secret.";
            }
            if (!fields["quickBook_client_id"] || fields["quickBook_client_id"].trim() === "") {
                formIsValid = false;
                errors["quickBook_client_id"] = "*Please enter QuickBook Client ID.";
            }
            if (!fields["quickBook_refresh_token"] || fields["quickBook_refresh_token"].trim() === "") {
                formIsValid = false;
                errors["quickBook_refresh_token"] = "*Please enter QuickBook Refresh Token.";
            }

        }else if(paymentID === 9){
            if (!fields["stripe_publishable_key"] || fields["stripe_publishable_key"].trim() === "") {
                formIsValid = false;
                errors["stripe_publishable_key"] = "*Please enter Stripe Publishable Key.";
            }
            if (!fields["stripe_secret_key"] || fields["stripe_secret_key"].trim() === "") {
                formIsValid = false;
                errors["stripe_secret_key"] = "*Please enter Stripe Secret Key.";
            }
        }
    
        return {
          errors: errors,
          formIsValid: formIsValid,
        };
    };
    
    const _validateForm = () => {
        let formFields = fields;
        let response = validateRegistration(formFields);
        setError(response.errors);
        return response.formIsValid;
    };

    const _handlePaymentChange = event =>{
        setpaymentID(parseInt(event.target.value));
    }

    const _handleSubmit = (event) => {
        event.preventDefault();
        if(_validateForm()){
            const serialize = require('form-serialize');
            const form = document.querySelector('#paymentDetailsForm');
            const paymentDetailObj = serialize(form, { hash: true });
            const userId = localStorage.getItem('userId');
            if(userId){
                const postData = {
                    lAccountID: userId,
                    paymentID: paymentID,
                    paymentDetails: paymentDetailObj
                }
                props.addPaymentDetails(postData);
                setPaymentSuccess(true);
            }
        }
    }

    const renderComoponent = useCallback(()=>{
        if(paymentID){
            switch (paymentID) {
                case 3 : return ( <>
                         <div className="col-md-12 col-xs-12">
                                <label>Authorize.net API Login ID</label><br/>
                                <input onChange={(event) => handleChange(event)} type="text" value={typeof fields.authorize_api_login_id != 'undefined' ? fields.authorize_api_login_id : ''} className="form-control" name="authorize_api_login_id" placeholder="Enter Authorize.net API Login ID"/>
                                {error.authorize_api_login_id ? (
                                    <div className="errorMsg text-danger">
                                    {error.authorize_api_login_id}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                            <label>Authorize.net Transaction Key</label><br/>
                            <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.authorize_transaction_key !='undefined' ? fields.authorize_transaction_key : ''} className="form-control" name="authorize_transaction_key" placeholder="*****"/>
                            {error.authorize_transaction_key ? (
                                    <div className="errorMsg text-danger">
                                    {error.authorize_transaction_key}
                                    </div>
                                ) : (
                                    ""
                            )}
                            </div>
                            </>)
                        

                    case 4 : return (  <>
                        <div className="col-md-12 col-xs-12">
                        <label>Pay Pal User Name</label><br/>
                        <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.pay_pal_username != 'undefined' ? fields.pay_pal_username : ''} className="form-control" name="pay_pal_username" placeholder="Enter Pay Pal User Name"/>
                        {error.pay_pal_username ? (
                                <div className="errorMsg text-danger">
                                {error.pay_pal_username}
                                </div>
                            ) : (
                                ""
                        )}
                        </div>
                        <div className="col-md-12 col-xs-12">
                        <label>Pay Pal Password</label><br/>
                        <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.pay_pal_password != 'undefined' ? fields.pay_pal_password : ''} className="form-control" name="pay_pal_password" placeholder="*****"/>
                        {error.pay_pal_password ? (
                                <div className="errorMsg text-danger">
                                {error.pay_pal_password}
                                </div>
                            ) : (
                                ""
                        )}
                        </div>
                        <div className="col-md-12 col-xs-12">
                        <label>Pay Pal Signature</label><br/>
                        <input type="text" onChange={(event) => handleChange(event)} value={typeof fields?.pay_pal_signature != 'undefined' ? fields.pay_pal_signature : ''} className="form-control" name="pay_pal_signature" placeholder="Enter Pay Pal Signature"/>
                        {error.pay_pal_signature ? (
                                <div className="errorMsg text-danger">
                                {error.pay_pal_signature}
                                </div>
                            ) : (
                                ""
                        )}
                        </div>
                    </>)

                    case 5 : return (<>
                        <div className="col-md-12 col-xs-12">
                            <label>Pay Flow Partner</label><br/>
                            <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.pay_flow_partner!='undefined' ? fields.pay_flow_partner : '' } className="form-control" name="pay_flow_partner" placeholder="Enter Pay Flow Partner"/>
                            {error.pay_flow_partner ? (
                                    <div className="errorMsg text-danger">
                                    {error.pay_flow_partner}
                                    </div>
                                ) : (
                                    ""
                            )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                            <label>Pay Flow Vendor</label><br/>
                            <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.pay_flow_vendor!='undefined' ? fields.pay_flow_vendor : ''} className="form-control" name="pay_flow_vendor" placeholder="Enter Pay Flow Vendor"/>
                            {error.pay_flow_vendor ? (
                                    <div className="errorMsg text-danger">
                                    {error.pay_flow_vendor}
                                    </div>
                                ) : (
                                    ""
                            )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                            <label>Pay Flow User</label><br/>
                            <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.pay_flow_user != 'undefined' ? fields.pay_flow_user : ''} className="form-control" name="pay_flow_user" placeholder="Enter Pay Flow User"/>
                            {error.pay_flow_user ? (
                                    <div className="errorMsg text-danger">
                                    {error.pay_flow_user}
                                    </div>
                                ) : (
                                    ""
                            )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                            <label>Pay Flow Password</label><br/>
                            <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.pay_flow_password!='undefined'?fields.pay_flow_password:''} className="form-control" name="pay_flow_password" placeholder="*****"/>
                            {error.pay_flow_password ? (
                                    <div className="errorMsg text-danger">
                                    {error.pay_flow_password}
                                    </div>
                                ) : (
                                    ""
                            )}
                            </div>
                    </>)

                    case 6 : return (<>
                        <div className="col-md-12 col-xs-12">
                                <label>Payeezy Gateway ID</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.payeezy_gateway_id !='undefined' ? fields.payeezy_gateway_id:''} className="form-control" name="payeezy_gateway_id" placeholder="Enter Payeezy Gateway ID"/>
                                {error.payeezy_gateway_id ? (
                                    <div className="errorMsg text-danger">
                                    {error.payeezy_gateway_id}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                                <label>Payeezy Gateway Password</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.payeezy_gateway_password !='undefined'?fields.payeezy_gateway_password:''} className="form-control" name="payeezy_gateway_password" placeholder="Enter Payeezy Gateway Password"/>
                                {error.payeezy_gateway_password ? (
                                    <div className="errorMsg text-danger">
                                    {error.payeezy_gateway_password}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                                <label>Payeezy Gateway API Key</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.payeezy_gateway_api_key!='undefined'?fields.payeezy_gateway_api_key:''} className="form-control" name="payeezy_gateway_api_key" placeholder="*****"/>
                                {error.payeezy_gateway_api_key ? (
                                    <div className="errorMsg text-danger">
                                    {error.payeezy_gateway_api_key}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                                <label>Payeezy Gateway HMAC</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.payeezy_gateway_hmac!='undefined'?fields.payeezy_gateway_hmac:''} className="form-control" name="payeezy_gateway_hmac" placeholder="Enter Payeezy Gateway HMAC"/>
                                {error.payeezy_gateway_hmac ? (
                                    <div className="errorMsg text-danger">
                                    {error.payeezy_gateway_hmac}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                    </>)

                    case 7 : return (<>
                        <div className="col-md-12 col-xs-12">
                                <label>Payeezy API Secret</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.payeezy_api_secret!='undefined'?fields.payeezy_api_secret:''} className="form-control" name="payeezy_api_secret" placeholder="*****"/>
                                {error.payeezy_api_secret ? (
                                    <div className="errorMsg text-danger">
                                    {error.payeezy_api_secret}
                                    </div>
                                ) : (
                                    ""
                                )}
                                </div>
                                <div className="col-md-12 col-xs-12">
                                <label>Payeezy API Key</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.payeezy_api_key!='undefined'?fields.payeezy_api_key:''} className="form-control" name="payeezy_api_key" placeholder="*****"/>
                                {error.payeezy_api_key ? (
                                    <div className="errorMsg text-danger">
                                    {error.payeezy_api_key}
                                    </div>
                                ) : (
                                    ""
                                )}
                                </div>
                                <div className="col-md-12 col-xs-12">
                                <label>Payeezy Merchant Token</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.payeezy_merchant_token !='undefined' ? fields.payeezy_merchant_token:''} className="form-control" name="payeezy_merchant_token" placeholder="*****"/>
                                {error.payeezy_merchant_token ? (
                                    <div className="errorMsg text-danger">
                                    {error.payeezy_merchant_token}
                                    </div>
                                ) : (
                                    ""
                                )}
                                </div>
                    </>)
                    case 8 : return (<>
                        <div className="col-md-12 col-xs-12">
                                <label>QuickBook Client Secret</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.quickBook_client_secret!='undefined' ?fields.quickBook_client_secret:'' } className="form-control" name="quickBook_client_secret" placeholder="*****"/>
                                {error.quickBook_client_secret ? (
                                    <div className="errorMsg text-danger">
                                    {error.quickBook_client_secret}
                                    </div>
                                ) : (
                                    ""
                                )}
                                </div>
                                <div className="col-md-12 col-xs-12">
                                <label>QuickBook Client ID</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.quickBook_client_id!='undefined'?fields.quickBook_client_id:''} className="form-control" name="quickBook_client_id" placeholder="Enter QuickBook Client ID"/>
                                {error.quickBook_client_id ? (
                                    <div className="errorMsg text-danger">
                                    {error.quickBook_client_id}
                                    </div>
                                ) : (
                                    ""
                                )}
                                </div>
                                <div className="col-md-12 col-xs-12">
                                <label>QuickBook Refresh Token</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.quickBook_refresh_token!='undefined'?fields.quickBook_refresh_token:''} className="form-control" name="quickBook_refresh_token" placeholder="*****"/>
                                {error.quickBook_refresh_token ? (
                                    <div className="errorMsg text-danger">
                                    {error.quickBook_refresh_token}
                                    </div>
                                ) : (
                                    ""
                                )}
                                </div>
                    </>)
                    case 9 : return (<>
                        <div className="col-md-12 col-xs-12">
                                <label>Stripe Publishable Key</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.stripe_publishable_key!='undefined'?fields.stripe_publishable_key:''} className="form-control" name="stripe_publishable_key" placeholder="*****"/>
                                {error.stripe_publishable_key ? (
                                    <div className="errorMsg text-danger">
                                    {error.stripe_publishable_key}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-12 col-xs-12">
                                <label>Stripe Secret Key</label><br/>
                                <input type="text" onChange={(event) => handleChange(event)} value={typeof fields.stripe_secret_key!='undefined'?fields.stripe_secret_key:''} className="form-control" name="stripe_secret_key" placeholder="*****"/>
                                {error.stripe_secret_key ? (
                                    <div className="errorMsg text-danger">
                                    {error.stripe_secret_key}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                    </>)
                default:
                   return null;
            }
        }
    },[paymentID,error])

    const getPaymentDetails = async() => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (userId) {
            const postData = {userId:userId}
            const response = await axios.get(API_URL + "api/v1/tslGetPaymentDetails", {
                params: postData,headers:requestTokenHeader()
            });
            if (response.data.errorCode === 0) {
                const paymentID1 = response.data.data[0].paymentID;
                const paymentObject1 = response.data.data[0].paymentDetails;
                setpaymentID(paymentID1);
                const pymtObj = JSON.parse(paymentObject1);  
                delete pymtObj.payment_id;
                setFields(pymtObj)
                }
            }
        }
    return (
    <>
        <div className="accordion-formwrap">
            <div className="panel-body">
                <div className="form-content">
                <form onSubmit={(e) => _handleSubmit(e)} id="paymentDetailsForm">
                    <div className="row">
                        <div className="col-md-12 col-xs-12">
                        <label>Credit Card Process *</label><br/>
                            <select onChange={(e) => _handlePaymentChange(e)} value={paymentID} name="payment_id" id="payment_id" className="form-control">
                            <option value="3">{CONSTANT[3]} </option>
                            <option value="4">{CONSTANT[4]}</option>
                            <option value="5">{CONSTANT[5]}</option>
                            <option value="6">{CONSTANT[6]}</option>
                            <option value="7">{CONSTANT[7]}</option>
                            <option value="8">{CONSTANT[8]}</option>
                            <option value="9">{CONSTANT[9]}</option>
                            </select>
                        </div>
                        {renderComoponent()}
                    </div>
                    <div>
                        <button type="submit" className="btn">Save</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </>
  );
}