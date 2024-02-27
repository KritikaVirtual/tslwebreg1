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
  const [countGuest, setCountGuest] = useState(0)
  const [amountDue, setAmountDue] = useState(sessionStorage.getItem('amountDue'))
  const [fieldsValue, setFieldsValue] = useState({})

    useEffect(()=>{
      if(sessionStorage.getItem('countRegistrant')){
        setCountRegistrant(sessionStorage.getItem('countRegistrant'))
      }
      if(sessionStorage.getItem('countGuest')){
        setCountGuest(sessionStorage.getItem('countGuest'))
      }
      if(sessionStorage.getItem('regTypeId')){
        props.getSessionsTicketsData(sessionStorage.getItem('regTypeId'))
      }
      
      // console.log('props.sessionsTicketsData',props.sessionsTicketsData)
    },[])
    
    const callSessionsTicketsData = sessionsTicketsData => {
      if(sessionsTicketsData){
        return (
          sessionsTicketsData.map((data,index)=>(
            <>
              <tr key={index}>
                <td>{data.sName}</td>
                <td><Input type="text" className="wd-30" name={"dPrice"+index} id={"dPrice"+index} value={data.dPrice1} disabled /></td>
                <td> <Input type="text" className="wd-30" name={"dQty"+index} id={"dQty"+index} onChange={(event)=>qtyInputChange(event, index, sessionsTicketsData.length, data.lSessionID, data.sName)} /></td>
                <td> <Input type="text" className="wd-30" name={"dTotal"+index} id={"dTotal"+index} value={(document.getElementById("dPrice"+index)!== null && document.getElementById("dQty"+index)!== null) ? (document.getElementById("dPrice"+index).value * document.getElementById("dQty"+index).value) : 0} disabled /></td>            
              </tr>
            </>
          ))
        )
      }
    }

    const qtyInputChange = (event, index, countSessions, lSessionID, sName) => {
      const price = parseFloat(document.getElementById("dPrice"+index).value);
      const quantity = parseFloat(event.target.value);
    
      if (!isNaN(price) && !isNaN(quantity) && quantity > 0) {
        const totalField = price * quantity;       
    
        const updatedFields = { ...step5Fields };
        updatedFields[`dTotal${index}`] = totalField;
        // updatedFields[`dPrice${index}`] = price;
        // updatedFields[`dQty${index}`] = quantity;
        // updatedFields[`lSessionID${index}`] = lSessionID;
        // updatedFields[`countSessions`] = countSessions;
        
    
        setStep5Fields(updatedFields); 

        const inputFields = { ...fieldsValue };

        inputFields[`dTotal${index}`] = totalField;
        inputFields[`dPrice${index}`] = price;
        inputFields[`dQty${index}`] = quantity;
        inputFields[`lSessionID${index}`] = lSessionID;
        inputFields[`sName${index}`] = sName;
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
                      <h4>{props.eventsData?  props.eventsData.sStep5Desc : ''}</h4>
                    </div>
                    <div className="textHeader">
                        {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep5Text }} />  : ''}
                    </div>

                    <div className="col-md-12 col-xs-12">
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
                          {props.sessionsTicketsData ? 
                            callSessionsTicketsData(props.sessionsTicketsData) :                                 
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
                      {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep5TextBottom }} /> : ''}
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
