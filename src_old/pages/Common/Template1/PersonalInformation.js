import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input, Select } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

export function PersonalInformation(props) {
    
    const { step3Fields, setStep3Fields, next, prev } = useContext(MultiStepFormContext);
    const [countRegistrant, setCountRegistrant] = useState(0)
    const [countGuest, setCountGuest] = useState(0)
    const [guestsPrice, setGuestsPrice] = useState(0)
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");

    const addressTypeFields = [
        {label : 'Home', value : '1'},
        {label : 'Office', value : '2'}
    ]

    // console.log('props.regGuestfieldsData',props.regGuestfieldsData)

    const stateFields = [{value : 'AL',label : 'ALABAMA'},{value : 'AK',label : 'ALASKA'},{value : 'AZ',label : 'ARIZONA'},{value : 'AR',label : 'ARKANSAS'},{value : 'CA',label : 'CALIFORNIA'},{value : 'CO',label : 'COLORADO'},{value : 'CT',label : 'CONNECTICUT'},{value : 'DE',label : 'DELAWARE'},{value : 'FL',label : 'FLORIDA'},{value : 'GA',label : 'GEORGIA'},
                        {value : 'HI',label : 'HAWAII'},{value : 'ID',label : 'IDAHO'},{value : 'IL',label : 'ILLINOIS'},{value : 'IN',label : 'INDIANA'},{value : 'IA',label : 'IOWA'},{value : 'KN',label : 'KANSAS'},{value : 'KY',label : 'KENTUCKY'},{value : 'LA',label : 'LOUISIANA'},{value : 'ME',label : 'MAINE'},{value : 'MD',label : 'MARYLAND'},{value : 'MA',label : 'MASSACHUSETTS'},
                        {value : 'MI',label : 'MICHIGAN'},{value : 'MN',label : 'MINNESOTA'},{value : 'MS',label : 'MISSISSIPPI'},{value : 'MO',label : 'MISSOURI'},{value : 'MT',label : 'MONTANA'},{value : 'NE',label : 'NEBRASKA'},{value : 'NV',label : 'NEVADA'},{value : 'NH',label : 'NEW HAMPSHIRE'},{value : 'NJ',label : 'NEW JERSEY'},{value : 'NM',label : 'NEW MEXICO'},
                        {value : 'NY',label : 'NEW YORK'},{value : 'NC',label : 'NEW CAROLINA'},{value : 'ND',label : 'NORTH DAKOTA'},{value : 'OH',label : 'OHIO'},{value : 'OK',label : 'OKLAHOMA'},{value : 'OR',label : 'OREGON'},{value : 'PA',label : 'PENNSYLVANIA'},{value : 'RI',label : 'RHODE ISLAND'},{value : 'SC',label : 'SOUTH CAROLINA'},
                        {value : 'SD',label : 'SOUTH DAKOTA'},{value : 'TN',label : 'TENNESSEE'},{value : 'TX',label : 'TEXAS'},{value : 'UT',label : 'UTAH'},{value : 'VT',label : 'VERMONT'},{value : 'VA',label : 'VIRGINIA'},{value : 'WA',label : 'WASHINGHTON'},{value : 'WV',label : 'WEST VIRGINA'},{value : 'WI',label : 'WISCONSIN'},{value : 'WY',label : 'WYOMING'},
                        {value : 'GU',label : 'GUAM'},{value : 'PR',label : 'PUERTO RICO'},{value : 'VI',label : 'VIRGIN ISLAND'},{label : 'OT',label : 'OTHER STATE'}];
    

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

        const lRegTypeID = JSON.parse(sessionStorage.getItem("regTypeId"));
        
        props.getPersonalInformationFields({lAccountID, lEventID, lRegTypeID})
        props.getAdditonalGuestFields({lAccountID, lEventID})

    },[])

    const getAdditionalRegistrantFields = (registrant, errors) => {
        if(registrant){
            
            
            var registrantsList = []
            for (let index = 1; index <= registrant; index++) {
                registrantsList.push(
                    <>
                        <tr key={index}>
                            <td><Input className="wd-60" name={"add_reg_sFirstName_"+index}  /></td>
                            <td><Input className="wd-60" name={"add_reg_sLastName_"+index} /></td>
                            {props.regGuestfieldsData ? callRegFieldsData(props.regGuestfieldsData, index, errors)  : ''}
                        </tr>                  
                    </>
                );
            }
            return registrantsList
        }
    }

    const getGuestFields = (guest, errors) => {
        if(guest){
            var guestsList = []
            for (let index = 1; index <= guest; index++) {
                guestsList.push(
                    <>
                        <tr key={index}>
                            <td><Input name={"guest_first_name_"+index}  />
                                {(errors && errors["guest_first_name_"+index]) ? (
                                    <div className="errorMsg text-danger">
                                        {errors["guest_first_name_"+index]}
                                    </div>
                                    ) : ("")
                                }
                            </td>
                            <td><Input name={"guest_last_name_"+index} />
                                {(errors && errors["guest_last_name_"+index]) ? (
                                    <div className="errorMsg text-danger">
                                        {errors["guest_last_name_"+index]}
                                    </div>
                                    ) : ("")
                                }
                            </td>
                            <td><Input name={"guest_title_"+index} /></td>
                            <td><Input name={"guest_phone_"+index} /></td>
                            <td><Input name={"guest_email_"+index} />
                                {(errors && errors["guest_email_"+index]) ? (
                                    <div className="errorMsg text-danger">
                                        {errors["guest_email_"+index]}
                                    </div>
                                    ) : ("")
                                }
                            </td>
                            <td><Input name={"guest_total_"+index} value={guestsPrice} disabled /></td>
                        </tr>                  
                    </>
                );
            }
            return guestsList
        }
    }

    const callRegFieldsData = (regFieldsData, index, errors) => {
        if(regFieldsData)
        
            return regFieldsData.map((data)=>(
                <>
                    <td><Input className="wd-60" name={'add_reg_'+data.sName+'_'+index} />
                        {(errors && errors['add_reg_'+data.sName+'_'+index]) ? (
                            <div className="errorMsg text-danger">
                                {errors['add_reg_'+data.sName+'_'+index]}
                            </div>
                            ) : ("")
                        }
                    </td>
                    
                </>
            ))
    }

    const callRegFieldsLabel = regFieldsData => {
        if(regFieldsData)
            return regFieldsData.map((data,index)=>(
                <th>{data.sName == 'sTitle' ? 'Title' : data.sName == 'sPhone' ? 'Phone' : data.sName == 'sEmail' ? 'Email' : ''}</th>
            ))
    }

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
            props.getPersonalInformationValuesSubmit(values)
            next();
        }}
        validate={(values) => {
            values.sEmail = props.step1EmailValue
            const errors = {};
             if(props.fieldsData && props.fieldsData.length > 0){
                props.fieldsData.map((data,index)=>{ 
                    if(data.sRequired.indexOf(sessionStorage.getItem('regTypeId')) != -1)
                        if (!values[data.sCode]) errors[data.sCode] = "Please Enter the " + data.sName;
                    
                })
             }   
             if(countRegistrant){
                var registrantemailsArray = []
                for (let index = 1; index <= countRegistrant; index++) {
                    if(props.regGuestfieldsData && props.regGuestfieldsData.length > 0){
                        props.regGuestfieldsData.map((data)=>{ 
                            if(data.bRequired == 1)
                                if (!values['add_reg_'+data.sName+'_'+index]) errors['add_reg_'+data.sName+'_'+index] = "Please Enter the "+data.sName;
                                if(data.sName == 'sEmail'){
                                    if (typeof values['add_reg_'+data.sName+'_'+index] !== "undefined") {
                                        var pattern = new RegExp(
                                        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                                        );
                                        if (!pattern.test(values['add_reg_'+data.sName+'_'+index])) {
                                            errors['add_reg_'+data.sName+'_'+index] = "*Please enter valid email.";
                                        }
                                    }
                                }
                            
                            
                            registrantemailsArray = Object.entries(values)
                            .filter(([key]) => key.startsWith("add_reg_sEmail"))
                            .map(([_,value]) =>  value );
                        })
                    }
                }
                registrantemailsArray.push(props.step1EmailValue)
                const hasDuplicates = arr => new Set(arr).size !== arr.length;
                if(hasDuplicates(registrantemailsArray)){
                    // alert('Duplicate Data')
                    errors['addRegDuplicateEmail'] = `The email test is used by more than 1 Additional Registrant. Each additional registrant must have unique email address and must be different than the main registrant's email.`
                }
            }
            if(countGuest){
                for (let index = 1; index <= countGuest; index++) {
                    if (!values['guest_first_name_'+index]) errors['guest_first_name_'+index] = "Please Enter the First Name";
                    if (!values['guest_last_name_'+index]) errors['guest_last_name_'+index] = "Please Enter the Last Name";
                    if(values['guest_email_'+index]){
                        if (typeof values['guest_email_'+index] !== "undefined") {
                            var pattern = new RegExp(
                            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                            );
                            if (!pattern.test(values['guest_email_'+index])) {
                                errors['guest_email_'+index] = "*Please enter valid email.";
                            }
                        }
                    }
                }
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
                            <h4>{props.eventsData?  props.eventsData.sStep3Desc : ''}</h4>
                        </div>
                        <div className="textHeader">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep3Text }} />  : ''}
                        </div>
                        <div className="stepsTab stepsform-wrap">
                            {(props.fieldsData && props.fieldsData.length > 0) ? callFieldsData(props.fieldsData, errors) : <h4>Please Visible the Fields from Registrant Information</h4>}
                        </div>
                        {countRegistrant ?  
                            <>
                                <div class="col-md-12 form-heading additionalRegistrants">
                                    <h4>Additional Registrants</h4>
                                </div>
                                <div className="col-md-12 col-xs-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr className="bg-primary text-white">
                                                <th>First Name</th>
                                                <th>last Name</th>
                                                {props.regGuestfieldsData ? callRegFieldsLabel(props.regGuestfieldsData): ''}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getAdditionalRegistrantFields(countRegistrant, errors)}
                                        </tbody>
                                    </table>
                                    {errors.addRegDuplicateEmail ? (
                                        <div className="errorMsg text-danger">
                                            {errors.addRegDuplicateEmail}
                                        </div>
                                    ): ""}
                                </div>
                            </>
                        : ''}

                        {countGuest ?  
                            <>
                                <div class="col-md-12 form-heading guests">
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
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getGuestFields(countGuest, errors)}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        : ''}
                        <div className="textFooter">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep3TextBottom }} /> : ''}
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
