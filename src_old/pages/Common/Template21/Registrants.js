import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input, Select } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

export function Registrants(props) {
    
    const { step3Fields, setStep3Fields, next, prev } = useContext(MultiStepFormContext);
    const [rowsData, setRowsData] = useState(1);
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [regTypeAmount, setRegTypeAmount] = useState(0)

    useEffect(()=>{
        
        const lAccountID = JSON.parse(localStorage.getItem("userId"));
        if (lAccountID) {
            setUserId(lAccountID);
        }
        
        const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
        if (lEventID) {
            setEventId(lEventID);
        }

        const lCategoryID = JSON.parse(sessionStorage.getItem("categoryId"));

        sessionStorage.setItem('countRegistrant', rowsData)

        props.getRegTypes({lAccountID, lEventID, lCategoryID})
    },[])
    
    const callRegFieldsLabel = regFieldsData => {
        if(regFieldsData)
            return regFieldsData.map((data)=>(
                <th>{data.sName == 'sTitle' ? 'Title' : data.sName == 'sPhone' ? 'Phone' : data.sName == 'sEmail' ? 'Email' : ''}</th>
            ))
    }

    const getRegTypesDropdown = (regTypesData, i) => {
        if(regTypesData){
            return regTypesData.map((data)=>(
                <option value={data.dEarlyAmt} id={data.lRegTypeID}>
                    {data.sName}
                </option>
            ))
        }
    }
    
    const dropdownChange = (event, i, values) =>{
        document.getElementById('regTypeAmount'+i).value = event.target.value
        let amountDue = 0
        for (let index = 1; index <= rowsData; index++) {
            amountDue = amountDue + parseInt(document.getElementById('regTypeAmount'+index).value)
        }
        sessionStorage.setItem('amountDue',amountDue)
        sessionStorage.setItem('regTypeId'+i,event.target[event.target.selectedIndex].id)
        sessionStorage.setItem('regTypeName'+i,event.target[event.target.selectedIndex].innerText)
        sessionStorage.setItem('regTypePrice'+i,event.target[event.target.selectedIndex].value)
        values['regTypePrice'+i] = event.target[event.target.selectedIndex].value
        values['regTypeId'+i] = event.target[event.target.selectedIndex].id
    }

    const getAdditionalRegistrantFields = (errors, rowsData, values, deleteTableRows, handleChange) => {
        var registrantsList = []
        for(let i=1; i<=rowsData; i++){
            registrantsList.push(
                <>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th>First Name</th>
                                <th>last Name</th>
                                <th>Email</th>
                                {props.registrantFieldData ? callRegFieldsLabel(props.registrantFieldData): ''}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Input className="wd-60" name={"add_reg_sFirstName_"+i} defaultValue={i==1 ? firstNameValue : ''} />
                                    {(errors && errors['add_reg_sFirstName_'+i]) ? (
                                        <div className="errorMsg text-danger">
                                            {errors['add_reg_sFirstName_'+i]}
                                        </div>
                                        ) : ("")
                                    }
                                </td>
                                <td><Input className="wd-60" name={"add_reg_sLastName_"+i} defaultValue={i==1 ? lastNameValue : ''} />
                                    {(errors && errors['add_reg_sLastName_'+i]) ? (
                                        <div className="errorMsg text-danger">
                                            {errors['add_reg_sLastName_'+i]}
                                        </div>
                                        ) : ("")
                                    }
                                </td>
                                <td><Input className="wd-60" name={"add_reg_sEmail_"+i} /></td>
                                {props.registrantFieldData ? callRegFieldsData(props.registrantFieldData, errors, i)  : ''}
                            </tr>                            
                        </tbody>
                    </table>
                    <div className="col-md-12">
                        <label className="regTypeLabel">Reg Type : </label>
                        <select className="ant-input css-dev-only-do-not-override-1ck3jst wd-15" onChange={(event)=>dropdownChange(event, i, values)} name={"regTypes"+i}>
                            <option value="0" id="0">Select Item</option>
                            {props.regTypesTemplate21Data ? getRegTypesDropdown(props.regTypesTemplate21Data, i) : []}
                        </select>
                        {/* {(errors && errors['regTypes'+i]) ? (
                            <div className="errorMsg text-danger">
                                {errors['regTypes'+i]}  
                            </div>
                            ) : ("")
                        } */}
                        <label className="regTypeLabel">Amount : </label>
                        <Input name={"regTypeAmount"+i} id={"regTypeAmount"+i} className="wd-15" value={regTypeAmount} disabled />
                    </div>
                    
                </>
            );
        }
        return registrantsList
    }
    
    const callRegFieldsData = (regFieldsData, errors, i) => {
        if(regFieldsData)
        
            return regFieldsData.map((data)=>(
                <>
                    <td><Input className="wd-60" name={'add_reg_'+data.sName+'_'+i} />
                        {(errors && errors['add_reg_'+data.sName+'_'+i]) ? (
                            <div className="errorMsg text-danger">
                                {errors['add_reg_'+data.sName+'_'+i]}
                            </div>
                            ) : ("")
                        }
                    </td>
                    
                </>
            ))
    }
     
    const addTableRows = ()=>{
        setRowsData(rowsData + 1)
        sessionStorage.setItem('countRegistrant', rowsData + 1)
    }
    
    const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
        sessionStorage.setItem('countRegistrant', rows)
    }
    
    const handleChange = (index, evnt)=>{
    
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }

    const previousButton = () => {
        prev()
    }

    const handleRegCheckbox = (event, values) => {
        if(event.target.checked){
            setFirstNameValue(props.mainContactFieldsData.sFirstName)
            values['add_reg_sFirstName_1'] = props.mainContactFieldsData.sFirstName

            setLastNameValue(props.mainContactFieldsData.sLastName)
            values['add_reg_sLastName_1'] = props.mainContactFieldsData.sLastName

            setEmailValue(props.mainContactFieldsData.sEmail)
            values['add_reg_sEmail_1'] = props.mainContactFieldsData.sEmail

            setPhoneValue(props.mainContactFieldsData.sPhone)
            values['add_reg_sPhone_1'] = props.mainContactFieldsData.sPhone

            setTitleValue(props.mainContactFieldsData.sTitle)
            values['add_reg_sTitle_1'] = props.mainContactFieldsData.sTitle
        }
    }

    return (
        <>
        <Formik
        initialValues={step3Fields}
        onSubmit={(values) => {
            console.log('values',values)
            setStep3Fields(values);
            props.getPersonalInformationValuesSubmit(values)
            next();
        }}
        validate={(values) => {
            values.sEmail = props.step1EmailValue
            const errors = {};
                var registrantemailsArray = []
                    if(props.registrantFieldData && props.registrantFieldData.length > 0){
                        props.registrantFieldData.map((data)=>{ 
                            if(data.bRequired == 1)
                            for (let index = 1; index <= rowsData; index++) {
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
                            }
                               
                            
                            
                            registrantemailsArray = Object.entries(values)
                            .filter(([key]) => key.startsWith("sEmail"))
                            .map(([_,value]) =>  value );
                        })
                    }
                    for (let index = 1; index <= rowsData; index++) {
                        if (!values['add_reg_sFirstName_'+index]) errors['add_reg_sFirstName_'+index] = "Please Enter the sFirstName";
                        if (!values['add_reg_sLastName_'+index]) errors['add_reg_sLastName_'+index] = "Please Enter the sLastName";
                        // if (!values['regTypes'+index]) errors['regTypes'+index] = "Please Select the Reg Type";
                    }
                    
                // registrantemailsArray.push(props.step1EmailValue)
                // const hasDuplicates = arr => new Set(arr).size !== arr.length;
                // if(hasDuplicates(registrantemailsArray)){
                //     // alert('Duplicate Data')
                //     errors['regDuplicateEmail'] = `The email test is used by more than 1 Additional Registrant. Each additional registrant must have unique email address and must be different than the main registrant's email.`
                // }
            return errors;
             
        }}
        >
        {({ handleSubmit, errors, values }) => {
            return (
            <div className={"details__wrapper"}>
                <div class="form-content">
                    <div class="row">
                        <div class="col-md-12 form-heading ">
                            <h4>{props.eventsData?  props.eventsData.sStep3DescGroup : ''}</h4>
                        </div>
                        <div className="textHeader">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep3TextGroup }} />  : ''}
                        </div>
                        <div className="col-md-12 col-xs-12">
                            <div className="regCheckbox">
                                <Input type="checkbox" name="registrantCheckbox" onClick={(e)=>handleRegCheckbox(e, values)} /><br/>
                                <label>Include main contact as Registrant ?</label>
                            </div>
                        </div>
                        <div className="col-md-12 col-xs-12">
                            {getAdditionalRegistrantFields(errors, rowsData, values, deleteTableRows, handleChange)}
                                    
                                    {/* {errors.regDuplicateEmail ? (
                                        <div className="errorMsg text-danger">
                                            {errors.regDuplicateEmail}
                                        </div>
                                    ): ""} */}
                                </div>
                        
                        <div className="textFooter">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep3TextBottomGroup }} /> : ''}
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-outline-success" onClick={addTableRows} >Add Additional Registrants</button>
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
                            <h5>Total Amount Due ${ sessionStorage.getItem('amountDue') ? sessionStorage.getItem('amountDue') : 0 }</h5>
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
