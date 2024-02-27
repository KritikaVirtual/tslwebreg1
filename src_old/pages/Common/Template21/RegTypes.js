import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { Button, Input } from "antd";
import MultiStepFormContext from "./MultiStepFormContext";
import "./index.css";

export function RegTypes(props) {  

  const { step2Fields, setStep2Fields, next, prev } = useContext(MultiStepFormContext);
  const [totalAmountDue, setTotalAmountDue] = useState(0.00)
  const [addReg, setAddReg] = useState(0.00)
  const [guest, setGuest] = useState(0.00)
  const [addRegPrice, setAddRegPrice] = useState(0.00)
  const [guestPrice, setGuestPrice] = useState(0.00)  
  const [checkedRadio, setCheckedRadio] = useState(false)
  const [hideGuests, setHideGuests] = useState(true)
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  // const [categoryId, setCategoryId] = useState("");
  var flag = true

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

    props.getRegTypes({lAccountID, lEventID, lCategoryID})
  },[])

  useEffect(()=>{
    if(props.regTypesTemplate1Data){
      props.regTypesTemplate1Data.map((data,index)=>{
        if(data.dPricePerGuestEarly && data.dPricePerGuestEarly > 0){
          setHideGuests(false)
        } 
      })
    }
  },[props.regTypesTemplate1Data])

  const radioBtnChange = (amt, addRegAmt, event, index, regTypeId, sName) => {
    if(event.target.checked == true){
      setCheckedRadio(true)
      setAddRegPrice(0) 
      setGuestPrice(0)
      
      if(document.getElementById("addRegPrice"+index).value > 0){
        document.getElementById("addReg"+index).disabled = false
      }

      if(document.getElementById("guestsPrice"+index) && document.getElementById("guestsPrice"+index).value > 0){
        document.getElementById("guests"+index).disabled = false
        if(sessionStorage.getItem('guestsPrice')){
          sessionStorage.removeItem('guestsPrice')
        } 
        sessionStorage.setItem('guestsPrice',document.getElementById("guestsPrice"+index).value)
      }
      
      if(sessionStorage.getItem('amountDue')){
        sessionStorage.removeItem('amountDue')
      }
      sessionStorage.setItem('amountDue',amt) 

      if(sessionStorage.getItem('regTypePrice')){
        sessionStorage.removeItem('regTypePrice')
      }
      
      sessionStorage.setItem('regTypePrice',amt) 

      if(sessionStorage.getItem('addRegAmt')){
        sessionStorage.removeItem('addRegAmt')
      }
      
      sessionStorage.setItem('addRegAmt',addRegAmt) 

      if(sessionStorage.getItem('regTypeName')){
        sessionStorage.removeItem('regTypeName')
      }
      
      sessionStorage.setItem('regTypeName',sName) 

      if(sessionStorage.getItem('regTypeId')){
        sessionStorage.removeItem('regTypeId')
      }
      sessionStorage.setItem('regTypeId',regTypeId)
    }
    setTotalAmountDue(amt)

    
  }

  const priceInputChange = (event, index) => {
    var totalAmtDue = 0
    var addRegPrices = addRegPrice
    var guestsPrices = guestPrice

    if(event.target.name == 'addReg'+index)
    {
      addRegPrices = event.target.value * document.getElementById("addRegPrice"+index).value

      setAddRegPrice(addRegPrices)
      if(sessionStorage.getItem('countRegistrant')){
        sessionStorage.removeItem('countRegistrant')
      }
      if(event.target.value > 0){
        sessionStorage.setItem('countRegistrant',event.target.value)
      }
    }
    if(event.target.name == 'guests'+index)
    {
      guestsPrices = event.target.value * document.getElementById("guestsPrice"+index).value

      // setGuest(event.target.value)
      setGuestPrice(guestsPrices)
      if(sessionStorage.getItem('countGuest')){
        sessionStorage.removeItem('countGuest')
      }
      if(event.target.value > 0){
        sessionStorage.setItem('countGuest',event.target.value)
      }
      
    }

    totalAmtDue = parseInt(document.getElementById("price"+index).value) + parseInt(addRegPrices) + parseInt(guestsPrices)

    if(sessionStorage.getItem('amountDue'))
    {
      sessionStorage.removeItem('amountDue')
    }

    sessionStorage.setItem('amountDue',totalAmtDue)

    setTotalAmountDue(totalAmtDue)

  }

  const callRegTypesData = regTypeData => {
    if(regTypeData){
      return (
        regTypeData.map((data,index)=>(
          <tr key={index}>
          <td><Input type={"radio"} name={"radiobtn"} value={data.lRegTypeID} onChange={(event)=>radioBtnChange(data.dEarlyAmt, data.dPricePerAddRegEarly, event, index, data.lRegTypeID, data.sName,  )} /></td>
          <td>{data.sName}</td>
          <td><input className="ant-input css-dev-only-do-not-override-1ck3jst wd-30" type="text" name={"price"+index} id={"price"+index} value={data.dEarlyAmt} disabled /></td>
          <td> <input className="ant-input css-dev-only-do-not-override-1ck3jst wd-30" type="text" name={"addReg"+index} id={"addReg"+index}  onChange={(event)=>priceInputChange(event, index)} disabled /></td>
          <td> <input className="ant-input css-dev-only-do-not-override-1ck3jst wd-30" type="text" name={"addRegPrice"+index} id={"addRegPrice"+index} value={data.dPricePerAddRegEarly} disabled /></td>
          { !hideGuests ? 
          (data.dPricePerGuestEarly && data.dPricePerGuestEarly) > 0 ?
            <>
              <td> <input className="ant-input css-dev-only-do-not-override-1ck3jst wd-30" type="text" name={"guests"+index} id={"guests"+index}  onChange={(event)=>priceInputChange(event, index)} disabled /></td>
              <td> <input className="ant-input css-dev-only-do-not-override-1ck3jst wd-30" type="text" name={"guestsPrice"+index} id={"guestsPrice"+index} value={data.dPricePerGuestEarly} disabled /></td>
            </>
          :<><td></td><td></td></> : ''
          }
          
        </tr>
        ))
      )
    }
  }
  const previousButton = (event) => {
    event.preventDefault()
    prev()
  }

  return (
    <>
      <Formik
        initialValues={step2Fields}
        onSubmit={(values) => { 
            setStep2Fields(values);
            props.step2Details(values)
            next();
        }}
        validate={(values) => {
            const errors = {}; 
            if (!checkedRadio) errors.radiobtn = "Please Select the Reg Type";
            return errors;
            
    }}
      >
      {({ handleSubmit, errors }) => {
        return (
              <div class="form-content">
                  <div class="row">
                    <div class="col-md-12 form-heading ">
                      <h4>{props.eventsData?  props.eventsData.sStep2Desc : ''}</h4>
                    </div>
                    <div className="textHeader">
                        {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep2Text }} />  : ''}
                    </div>
                    <div className="col-md-12 col-xs-12 table-overlay-wrap">
                      <table className="table table-striped table-bordered">
                                  <thead>
                                    <tr className="bg-primary text-white">
                                      <th>Choice</th>
                                      <th>Description</th>
                                      <th>Price $</th>
                                      <th>Additional Registrants</th>
                                      <th>Add. Reg Price $</th>
                                      {hideGuests == false  ?  
                                        <><th>Guests</th>
                                        <th>Guests Price $</th></> : ''
                                      }                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {props.regTypesTemplate1Data ? 
                                      callRegTypesData(props.regTypesTemplate1Data) :                                 
                                      <tr className="noRecords" colSpan={4}>No Records Found</tr> 
                                    }                              
                                  </tbody>
                      </table>
                        {errors.radiobtn ? (
                                <div className="errorMsg text-danger">
                                    {errors.radiobtn}
                                </div>
                                ) : ("")
                            }
                    </div>
                  </div>
                  

                  <div className="textFooter">
                      {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep2TextBottom }} /> : ''}
                  </div>

                  <div
                      className={"form__item button__items d-flex justify-content-end"}
                      >
                      <Button type={"secondary"} onClick={(e)=>previousButton(e)}>
                        Previous
                      </Button>
                      <Button type={"primary"} onClick={handleSubmit}> 
                          Next
                      </Button>
                  </div>

                  <div className="reg-amount">
                    <h5>Total Amount Due ${totalAmountDue}</h5>
                  </div>
                  
              </div>
        );
      }}
      </Formik>
    </>
  )
}
