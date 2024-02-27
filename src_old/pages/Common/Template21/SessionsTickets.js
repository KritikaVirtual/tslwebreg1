import React, { useState, useContext } from "react";
import { Formik } from "formik";
import { Button, Input } from "antd";
import MultiStepFormContext from "./MultiStepFormContext";
import "./index.css";
import { useEffect } from "react";

export function SessionsTickets(props) {  

  const { step5Fields, setStep5Fields, next, prev } = useContext(MultiStepFormContext);
  const [fields, setFields] = useState({});
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [countRegistrant, setCountRegistrant] = useState(0)
  const [amountDue, setAmountDue] = useState(sessionStorage.getItem('amountDue'))
  const [fieldsValue, setFieldsValue] = useState({})

    useEffect(()=>{
      const registrantCount = sessionStorage.getItem('countRegistrant')
      if(registrantCount){
        var regTypeIdArray = []
        setCountRegistrant(registrantCount)
        for (let index = 1; index <= registrantCount; index++) {
          regTypeIdArray.push(sessionStorage.getItem('regTypeId'+index))
        }
        props.getSessionsTicketsData(regTypeIdArray)
      }
    },[])
    
    const callSessionsTicketsData = sessionsTicketsData => {
      if(sessionsTicketsData){
        return (
          sessionsTicketsData.map((dataArray,indexArray)=>(
            <>
              <h2 className="accordion-button">For additional registrant {props.sendPersonalInformationValuesSubmitted['add_reg_sFirstName_'+(indexArray+1)]}</h2>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th>Description</th>
                      <th>Price $</th>
                      <th>Qty</th>
                      <th>Total $</th>
                    </tr>
                  </thead>
                
                  {dataArray.map((data, index) => (
                    <tbody>
                      <tr key={index}>
                        <td>{data.sName}</td>
                        <td><Input type="text" className="wd-30" name={"dPrice"+indexArray+index} id={"dPrice"+indexArray+index} value={data.dPrice1} disabled /></td>
                        <td> <Input type="text" className="wd-30" name={"dQty"+indexArray+index} id={"dQty"+indexArray+index} onChange={(event)=>qtyInputChange(event, indexArray, index, sessionsTicketsData.length, data.lSessionID, data.sName)} /></td>
                        <td> <Input type="text" className="wd-30" name={"dTotal"+indexArray+index} id={"dTotal"+indexArray+index} value={(document.getElementById("dPrice"+indexArray+index)!== null && document.getElementById("dQty"+indexArray+index)!== null) ? (document.getElementById("dPrice"+indexArray+index).value * document.getElementById("dQty"+indexArray+index).value) : 0} disabled /></td>            
                      </tr>
                    </tbody>
                  ))}
                </table>
            </>
          ))
        )
      }
    }

    const qtyInputChange = (event, indexArray, index, countSessions, lSessionID, sName) => {
      const price = parseFloat(document.getElementById("dPrice"+indexArray+index).value);
      const quantity = parseFloat(event.target.value);
    
      if (!isNaN(price) && !isNaN(quantity)) {
        const totalField = price * quantity;       
    
        const updatedFields = { ...step5Fields };
        updatedFields[`dTotal${indexArray+index}`] = totalField;
        
    
        setStep5Fields(updatedFields); 

        const inputFields = { ...fieldsValue };

        inputFields[`dTotal${indexArray+''+index}`] = totalField;
        inputFields[`dPrice${indexArray+''+index}`] = price;
        inputFields[`dQty${indexArray+''+index}`] = quantity;
        inputFields[`lSessionID${indexArray+''+index}`] = lSessionID;
        inputFields[`sName${indexArray+''+index}`] = sName;
        inputFields[`countSessions`] = countSessions;
        
        setFieldsValue(inputFields); 

        const overallTotal = Object.values(updatedFields)
          .filter(value => !isNaN(parseFloat(value)))
          .reduce((acc, item) => acc + parseFloat(item), 0);
    
        setAmountDue(parseInt(sessionStorage.getItem('amountDue')) + parseInt(overallTotal));
      }
    };

    const previousButton = () => {
      prev()
    }
    
  return (
    <>
      <Formik
        initialValues={step5Fields}
        onSubmit={(values) => {
            setStep5Fields(values);
            if (sessionStorage.getItem('amountDue')){
              sessionStorage.removeItem('amountDue')
            }
            sessionStorage.setItem('amountDue',amountDue) 
            props.getSessionTicketsValuesSubmit(fieldsValue)
            next();
        }}
        validate={(values) => {
        }}
      >
      {({ handleSubmit, errors }) => {
        return (
              <div class="form-content">
                  <div class="row">
                    <div class="col-md-12 form-heading ">
                      <h4>{props.eventsData?  props.eventsData.sStep5DescGroup : ''}</h4>
                    </div>
                    <div className="textHeader">
                        {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep5TextGroup }} />  : ''}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      {props.sessionsTicketsData ? 
                        callSessionsTicketsData(props.sessionsTicketsData) :  
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th>Description</th>
                              <th>Price $</th>
                              <th>Qty</th>
                              <th>Total $</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr colspan={5}>No Records Found</tr>
                          </tbody>
                        </table>
                      }
                      {errors.radiobtn ? (
                          <div className="errorMsg text-danger">
                              {errors.radiobtn}
                          </div>
                          ) : ("")
                      }
                    </div>
                  </div>
          
                  <div className="textFooter">
                      {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep5TextBottomGroup }} /> : ''}
                  </div>

                  <div
                      className={"form__item button__items d-flex justify-content-end"}
                      >
                      <Button type={"secondary"} onClick={()=>previousButton()}>
                        Previous
                      </Button>
                      <Button type={"primary"} onClick={handleSubmit}>
                          Next
                      </Button>
                  </div>

                  <div className="reg-amount">
                    <h5>Total Amount Due ${amountDue ? amountDue : 0 }</h5>
                  </div>
                  
              </div>
        );
      }}
      </Formik>
    </>
  )
}
