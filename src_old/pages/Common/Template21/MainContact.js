import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input, Select } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

export function MainContact(props) {
    
    const { step3Fields, setStep3Fields, next, prev } = useContext(MultiStepFormContext);
    const [countRegistrant, setCountRegistrant] = useState(0)
    const [countGuest, setCountGuest] = useState(0)
    const [guestsPrice, setGuestsPrice] = useState(0)
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");

    const stateFields = [{value : 'AL',label : 'ALABAMA'},{value : 'AK',label : 'ALASKA'},{value : 'AZ',label : 'ARIZONA'},{value : 'AR',label : 'ARKANSAS'},{value : 'CA',label : 'CALIFORNIA'},{value : 'CO',label : 'COLORADO'},{value : 'CT',label : 'CONNECTICUT'},{value : 'DE',label : 'DELAWARE'},{value : 'FL',label : 'FLORIDA'},{value : 'GA',label : 'GEORGIA'},
                        {value : 'HI',label : 'HAWAII'},{value : 'ID',label : 'IDAHO'},{value : 'IL',label : 'ILLINOIS'},{value : 'IN',label : 'INDIANA'},{value : 'IA',label : 'IOWA'},{value : 'KN',label : 'KANSAS'},{value : 'KY',label : 'KENTUCKY'},{value : 'LA',label : 'LOUISIANA'},{value : 'ME',label : 'MAINE'},{value : 'MD',label : 'MARYLAND'},{value : 'MA',label : 'MASSACHUSETTS'},
                        {value : 'MI',label : 'MICHIGAN'},{value : 'MN',label : 'MINNESOTA'},{value : 'MS',label : 'MISSISSIPPI'},{value : 'MO',label : 'MISSOURI'},{value : 'MT',label : 'MONTANA'},{value : 'NE',label : 'NEBRASKA'},{value : 'NV',label : 'NEVADA'},{value : 'NH',label : 'NEW HAMPSHIRE'},{value : 'NJ',label : 'NEW JERSEY'},{value : 'NM',label : 'NEW MEXICO'},
                        {value : 'NY',label : 'NEW YORK'},{value : 'NC',label : 'NEW CAROLINA'},{value : 'ND',label : 'NORTH DAKOTA'},{value : 'OH',label : 'OHIO'},{value : 'OK',label : 'OKLAHOMA'},{value : 'OR',label : 'OREGON'},{value : 'PA',label : 'PENNSYLVANIA'},{value : 'RI',label : 'RHODE ISLAND'},{value : 'SC',label : 'SOUTH CAROLINA'},
                        {value : 'SD',label : 'SOUTH DAKOTA'},{value : 'TN',label : 'TENNESSEE'},{value : 'TX',label : 'TEXAS'},{value : 'UT',label : 'UTAH'},{value : 'VT',label : 'VERMONT'},{value : 'VA',label : 'VIRGINIA'},{value : 'WA',label : 'WASHINGHTON'},{value : 'WV',label : 'WEST VIRGINA'},{value : 'WI',label : 'WISCONSIN'},{value : 'WY',label : 'WYOMING'},
                        {value : 'GU',label : 'GUAM'},{value : 'PR',label : 'PUERTO RICO'},{value : 'VI',label : 'VIRGIN ISLAND'},{label : 'OT',label : 'OTHER STATE'}];
    
    const fieldNameArray =
        "'sMemberID','sPrefix','sFirstName','sMiddleName','sLastName','sSuffix','sCredentials','sTitle','sCompany','sAddress1','sAddress2','sAddress3','sCity','sState','sZip','sCountry','sPhone','sCell','sFax','sEmail','sOtherInfo1'";
                    
    useEffect(()=>{
        if(sessionStorage.getItem('countRegistrant')){
            setCountRegistrant(sessionStorage.getItem('countRegistrant'))
        }

        if(sessionStorage.getItem('countGuest')){
            setCountGuest(sessionStorage.getItem('countGuest'))
        }
        
        if(sessionStorage.getItem('guestsPrice')){
            setGuestsPrice(sessionStorage.getItem('guestsPrice'))
        }

        const lAccountID = JSON.parse(localStorage.getItem("userId"));
        if (lAccountID) {
            setUserId(lAccountID);
        }
        
        const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
        if (lEventID) {
            setEventId(lEventID);
        }
        props.getMainContactFields({lAccountID, lEventID, fieldNameArray})

    },[])

    const callStateProvince = stateData => {
        const newArray = stateData.map((data,item) =>{
            return {
                value : data.value,
                label : data.label
            }
        })
        return newArray
    }    

    const callFieldsData = (fieldsData, errors) => {
        if(fieldsData){
            return fieldsData.map((data,index)=>(
                <>
                    {data.bVisibleGrpReg === 1 ? 
                        <div class="col-md-12 col-xs-12 mb-2">
                            <label for="html">{data.sName}</label> 
                            <br />
                            {data.sCode == 'sEmail' ? 
                                <Input name={data.sCode} value={props.step1EmailValue} disabled /> :
                                data.sCode == 'sState' ? <Select 
                                className="form-control" 
                                name="sState"
                                id="sState"
                                options={stateFields ?
                                    callStateProvince(stateFields) : []}
                                /> :
                                <Input name={data.sCode} />
                            }
                        
                            {(data.sCode!='sEmail' && errors && errors[data.sCode]) ? (
                                <div className="errorMsg text-danger">
                                    {errors[data.sCode]}
                                </div>
                                ) : ("")
                            }
                        </div> 
                        : ''
                    }
                </>
            ))
        }
    }
    
    const previousButton = () => {
        prev()
    }

    return (
        <>
        <Formik
        initialValues={step3Fields}
        onSubmit={(values) => {
            setStep3Fields(values);
            props.sendMainContactData(values)
            next();
        }}
        validate={(values) => {
            values.sEmail = props.step1EmailValue
            const errors = {};
             if(props.mainContactFieldsData && props.mainContactFieldsData.length > 0){
                props.mainContactFieldsData.map((data,index)=>{ 
                    if(data.bRequiredGrpReg === 1)
                        if (!values[data.sCode]) errors[data.sCode] = "Please Enter the " + data.sName;
                    
                })
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
                            <h4>{props.eventsData?  props.eventsData.sStep2DescGroup : ''}</h4>
                        </div>
                        <div className="textHeader">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep2TextGroup }} />  : ''}
                        </div>
                        <div className="stepsTab stepsform-wrap">
                            {(props.mainContactFieldsData && props.mainContactFieldsData.length > 0) ? callFieldsData(props.mainContactFieldsData, errors) : <h4>Please Visible the Fields from Main Contact Fields</h4>}
                        </div>
                        <div className="textFooter">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep2TextBottomGroup }} /> : ''}
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
                            {/* <h4>Previous Total $0.00</h4>
                            <h4>Paid $0.00</h4>
                            <h4>New Total $0.00</h4>
                            <h4>Balance $0.00</h4> */}
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
