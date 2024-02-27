import React, { useState, useContext } from "react";
import { Formik } from "formik";
import { Button, Input } from "antd";
import MultiStepFormContext from "./MultiStepFormContext";
import "./index.css";
import { useEffect } from "react";

export function OtherQuestions(props) {  

  const { step4Fields, setStep4Fields, next, prev } = useContext(MultiStepFormContext);
  const [fields, setFields] = useState({});
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [additionalfieldsChecked, setAdditionalFieldsChecked] = useState({});
  const [pushQuestionIDS, setPushQuestionIDS] = useState([]);
  const [fieldsText, setFieldsText] = useState({});
  const [additionalfieldsText, setAdditionalFieldsText] = useState({});
  const [countRegistrant, setCountRegistrant] = useState(0)
  const [countGuest, setCountGuest] = useState(0)

    useEffect(()=>{
      if(sessionStorage.getItem('countRegistrant')){
        setCountRegistrant(sessionStorage.getItem('countRegistrant'))
      }
      if(sessionStorage.getItem('countGuest')){
        setCountGuest(sessionStorage.getItem('countGuest'))
      }
    },[])

    const callQuestionsList = (questionData, errors) => {
      // Create a map to store merged data
      const mergedMap = new Map();
  
      questionData.forEach((item) => {
        if (mergedMap.has(item.lQuestionID)) {
          const mergedItem = mergedMap.get(item.lQuestionID);
          Object.keys(item).forEach((key) => {
            if (key !== "lQuestionID" && key !== "sName" && key !== "nType") {
              mergedItem[key] = Array.isArray(mergedItem[key])
                ? mergedItem[key].concat(item[key])
                : [mergedItem[key], item[key]];
            } else if (key === "sName" || key === "nType") {
              if (mergedItem[key] !== item[key]) {
                mergedItem[key] = "Multiple Values";
              }
            }
          });
        } else {
          mergedMap.set(item.lQuestionID, { ...item });
        }
      });
  
      // Convert the mergedMap values to an array of merged objects
      const mergedData = Array.from(mergedMap.values());
      return mergedData.map((data, index) => (
        <tr className="questionsContent">
          <td>
            <label>{data.sName}</label>
          </td>
          <td>
            {data.nType === 0 ? (
              <>
                <input
                  onChange={(e) => handleQuestionsChange(e)}
                  className="form-control"
                  type="text"
                  id={data.lQuestionID}
                  name="sOther"
                  value={fieldsText ? fieldsText[data.lQuestionID] : ''}
                />
                <br />
              </>
            ) : data.nType === 1 ? (
              <>
                {data ? callInputBoxes(data, errors) : ""} 
                <br />
              </>
            ) : data.nType === 2 ? (
              <>{data ? callInputBoxes(data, errors) : ""}</>
            ) : data.nType === 3 ? (
              <>
                <select
                  onChange={(e) => handleQuestionsChange(e)}
                  className="form-control"
                  id={data.lQuestionID}
                  name="lAnswerID"
                />
                <option value={data.lAnswerID}>{data.sAnswer}</option>
                <br />
              </>
            ) : (
              ""
            )}
            {(errors && errors[data.lQuestionID]) ? (
                  <div className="errorMsg text-danger">
                      {errors[data.lQuestionID]}
                  </div>
                  ) : ("")}
          </td>
        </tr>
      ));
    };

    const handleQuestionsChange = (event) => {
      let dataQuestions = fieldsChecked;
      let dataTextQuestions = fieldsText;
  
      if (event.target.name == "sOther") {
        if (event.target.value) {
          dataTextQuestions[event.target.id] = event.target.value;
          setFieldsText(dataTextQuestions);
        } else {
          setFieldsText({});
        }
      } else {
        if(event.target.name == "lAnswerID"){
          var checked = event.target.value; 
          var checkedId = event.target.id;
  
          if (event.target.checked) {
            if(Object.keys(fieldsChecked).includes(dataQuestions[checkedId])){
              dataQuestions[checkedId] = fieldsChecked.dataQuestions[checkedId] + ',' + parseInt(checked)
            }else{
              dataQuestions[checkedId] = parseInt(checked);
            }
          } else {
            delete dataQuestions[checkedId]
            // console.log('uncehcekd')
            // dataQuestions.splice(dataQuestions.findIndex('21035'),1);
          }
        }
      }
      setFieldsChecked({ ...dataQuestions });
    };

    const callInputBoxes = (datas, errors) => {
      const sAnswer = datas.sAnswer;
      
      return Array.isArray(sAnswer) ? (
        sAnswer.map((data, index) => (
          <>
            <input
              onChange={(e) => handleQuestionsChange(e)}
              type={datas.nType === 1 ? 'radio' : datas.nType === 2 ? 'checkbox' : ''}
              name="lAnswerID" 
              id={datas.lQuestionID}
              value={datas.lAnswerID[index]}              
            />
            
            <label for=""> {data}</label>
            <br />{" "}
          </>
        ))
      ) : (
        <>
          <input
            onChange={(e) => handleQuestionsChange(e)}
            type="checkbox"
            name="lAnswerID"
            value={datas.lAnswerID}
            id={datas.lQuestionID}
            // checked={Object.values(fieldsChecked).includes(datas.lAnswerID) ? true : false }
          />
          <label for=""> {datas.sAnswer}</label>
          <br />{" "}
        </>
      );
      
      
    };
    
    const callInputBoxesAddReg = (datas, errors) => {
      const sAnswer = datas.sAnswer;
      
      return Array.isArray(sAnswer) ? (
        sAnswer.map((data, index) => (
          <>
            <input
              onChange={(e) => handleAdditionalQuestionsChange(e)}
              type={datas.nType === 1 ? 'radio' : datas.nType === 2 ? 'checkbox' : ''}
              name="lAnswerIDAddReg" 
              id={'add_reg'+datas.lQuestionID}
              value={datas.lAnswerID[index]}
              // value={datas.lQuestionID}
              // checked={Object.values(fieldsChecked).includes(datas.lAnswerID[index]) ? true : false}
              
              
            />
            
            <label for=""> {data}</label>
            <br />{" "}
          </>
        ))
      ) : (
        <>
          <input
            onChange={(e) => handleAdditionalQuestionsChange(e)}
            type="checkbox"
            name="lAnswerIDAddReg"
            value={datas.lAnswerID}
            id={'add_reg'+datas.lQuestionID}
            // checked={Object.values(fieldsChecked).includes(datas.lAnswerID) ? true : false }
          />
          <label for=""> {datas.sAnswer}</label>
          <br />{" "}
        </>
      );
    };

    const handleAdditionalQuestionsChange = (event) => {
      let dataQuestions = additionalfieldsChecked;
      let dataTextQuestions = additionalfieldsText;
  
      if (event.target.name == "sOther") {
        if (event.target.value) {
          dataTextQuestions[event.target.id] = event.target.value;
          setAdditionalFieldsText(dataTextQuestions);
        } else {
          setAdditionalFieldsText({});
        }
      } else {
        if(event.target.name == "lAnswerIDAddReg"){
          var checked = event.target.value; 
          var checkedId = event.target.id;
  
          if (event.target.checked) {
            if(Object.keys(additionalfieldsChecked).includes(dataQuestions[checkedId])){
              dataQuestions[checkedId] = additionalfieldsChecked.dataQuestions[checkedId] + ',' + parseInt(checked)
            }else{
              dataQuestions[checkedId] = parseInt(checked);
            }
          } else {
            delete dataQuestions[checkedId]
            // console.log('uncehcekd')
            // dataQuestions.splice(dataQuestions.findIndex('21035'),1);
          }
        }
      }
      setAdditionalFieldsChecked({ ...dataQuestions });
    };
    
    const getAdditionalRegistrantQuestions = (countReg, errors) => {
      var additionalRegistrantList = []
      for (let index = 1; index <= countReg; index++) {
        // callQuestionsList(props.questionsRegistrantData)
        additionalRegistrantList.push(<h2 className="accordion-button">For additional registrant {props.sendPersonalInformationValuesSubmitted['add_reg_sFirstName_'+index]}</h2>)
        const mergedMap = new Map();
  
      // Iterate through the data and merge properties
        props.questionsRegistrantData.forEach((item) => {
          if (mergedMap.has(item.lQuestionID)) {
            const mergedItem = mergedMap.get(item.lQuestionID);
            Object.keys(item).forEach((key) => {
              if (key !== "lQuestionID" && key !== "sName" && key !== "nType") {
                mergedItem[key] = Array.isArray(mergedItem[key])
                  ? mergedItem[key].concat(item[key])
                  : [mergedItem[key], item[key]];
              } else if (key === "sName" || key === "nType") {
                if (mergedItem[key] !== item[key]) {
                  mergedItem[key] = "Multiple Values";
                }
              }
            });
          } else {
            mergedMap.set(item.lQuestionID, { ...item });
          }
        });
        
        

        // Convert the mergedMap values to an array of merged objects
        const mergedData = Array.from(mergedMap.values());
        mergedData.map((data, index) => (
          additionalRegistrantList.push(
            <tr className="questionsContent">
              <td>
                <label>{data.sName}</label>
              </td>
              <td>
                {data.nType === 0 ? (
                  <>
                    <input
                      onChange={(e) => handleAdditionalQuestionsChange(e)}
                      className="form-control"
                      type="text"
                      id={'add_reg'+data.lQuestionID}
                      name="sOther"
                      // value={fieldsText ? fieldsText[data.lQuestionID] : ''}
                    />
                    <br />
                  </>
                ) : data.nType === 1 ? (
                  <>
                    {data ? callInputBoxesAddReg(data, errors) : ""} 
                    <br />
                  </>
                ) : data.nType === 2 ? (
                  <>{data ? callInputBoxesAddReg(data, errors) : ""}</>
                ) : data.nType === 3 ? (
                  <>
                    <select
                      onChange={(e) => handleAdditionalQuestionsChange(e)}
                      className="form-control"
                      id={'add_reg'+data.lQuestionID}
                      name="lAnswerID"
                    />
                    <option value={data.lAnswerID}>{data.sAnswer}</option>
                    
                    <br />
                  </>
                ) : (
                  ""
                )}
                {(errors && errors['add_reg'+data.lQuestionID]) ? (
                  <div className="errorMsg text-danger">
                      {errors['add_reg'+data.lQuestionID]}
                  </div>
                  ) : ("")}
                
              </td>
            </tr>
          )
        ));
      }
      return additionalRegistrantList
    }
    
    const getGuestQuestions = countReg => {
      var guestList = []
      for (let index = 1; index <= countReg; index++) {
        // callQuestionsList(props.questionsRegistrantData)
        guestList.push(<h2 className="accordion-button">For Guest {props.sendPersonalInformationValuesSubmitted['guest_first_name_'+index]}</h2>)
        const mergedMap = new Map();
  
      // Iterate through the data and merge properties
        props.questionsRegistrantData.forEach((item) => {
          if (mergedMap.has(item.lQuestionID)) {
            const mergedItem = mergedMap.get(item.lQuestionID);
            Object.keys(item).forEach((key) => {
              if (key !== "lQuestionID" && key !== "sName" && key !== "nType") {
                mergedItem[key] = Array.isArray(mergedItem[key])
                  ? mergedItem[key].concat(item[key])
                  : [mergedItem[key], item[key]];
              } else if (key === "sName" || key === "nType") {
                if (mergedItem[key] !== item[key]) {
                  mergedItem[key] = "Multiple Values";
                }
              }
            });
          } else {
            mergedMap.set(item.lQuestionID, { ...item });
          }
        });
        
        

        // Convert the mergedMap values to an array of merged objects
        const mergedData = Array.from(mergedMap.values());
        mergedData.map((data, index) => (
          guestList.push(
            <tr className="questionsContent">
              <td>
                <label>{data.sName}</label>
              </td>
              <td>
                {data.nType === 0 ? (
                  <>
                    <input
                      onChange={(e) => handleQuestionsChange(e)}
                      className="form-control"
                      type="text"
                      // id={data.lQuestionID}
                      name="sOther"
                      // value={fieldsText ? fieldsText[data.lQuestionID] : ''}
                    />
                    <br />
                  </>
                ) : data.nType === 1 ? (
                  <>
                    {data ? callInputBoxes(data) : ""} 
                    <br />
                  </>
                ) : data.nType === 2 ? (
                  <>{data ? callInputBoxes(data) : ""}</>
                ) : data.nType === 3 ? (
                  <>
                    <select
                      onChange={(e) => handleQuestionsChange(e)}
                      className="form-control"
                      // id={data.lQuestionID}
                      name="lAnswerID"
                    />
                    <option value={data.lAnswerID}>{data.sAnswer}</option>
                    <br />
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          )
        ));
      }
      return guestList
    }

    const previousButton = () => {
      prev()
    }

  return (
    <>
      <Formik
        initialValues={step4Fields}
        onSubmit={(values) => {
            setStep4Fields(values); 
            props.getOtherQuestionsData({fieldsChecked, fieldsText, additionalfieldsChecked, additionalfieldsText})
            next(); 
        }}
        validate={(values) => {
          const errors = {};
          props.questionsRegistrantData.forEach((item) => {
            if(item.bRequired == '1'){
              if(!fieldsChecked.hasOwnProperty(item.lQuestionID)){
                errors[item.lQuestionID] = "Please Select the answers";
              }
              if(countRegistrant > 0){
                if(!additionalfieldsChecked.hasOwnProperty('add_reg'+item.lQuestionID)){
                  errors['add_reg'+item.lQuestionID] = "Please Select the answers";
                }
              }
            }
          })
          return errors;
        }}
      >
      {({ handleSubmit, errors }) => {
        return (
              <div class="form-content">
                  <div class="row">
                    <div class="col-md-12 form-heading ">
                      <h4>{props.eventsData?  props.eventsData.sStep4Desc : ''}</h4>
                    </div>
                    <div className="textHeader">
                        {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep4Text }} />  : ''}
                    </div>
                    
                    <div className="row questions">
                      <div className="col-md-12 col-xs-12 titleQuestions">
                        <h2 className="accordion-button">Questions</h2>
                      </div>

                      <div className="col-md-12 col-xs-12">
                        <table width="100%">
                          <tbody>
                            {props.questionsRegistrantData
                              ? callQuestionsList(props.questionsRegistrantData, errors)
                              : ""}
                          </tbody>
                        </table>
                      </div>
                      
                      {countRegistrant > 0 &&
                        <>
                          <hr/>
                          <div className="col-md-12 col-xs-12">
                            <table width="100%">
                              <tbody>
                                {props.questionsRegistrantData ? getAdditionalRegistrantQuestions(countRegistrant, errors) : ''}
                                
                              </tbody>
                            </table>
                          </div>
                        </>
                      }
                      
                      {countGuest > 0 &&
                        <>
                          <hr/>
                          <div className="col-md-12 col-xs-12">
                            <table width="100%">
                              <tbody>
                                {props.questionsRegistrantData ? getGuestQuestions(countGuest) : ''}
                                
                              </tbody>
                            </table>
                          </div>
                        </>
                      }
                    </div>
                     
                  </div>
                  

                  <div className="textFooter">
                      {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep4TextBottom }} /> : ''}
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
                    <h5>Total Amount Due ${sessionStorage.getItem('amountDue') ? sessionStorage.getItem('amountDue') : 0 }</h5>
                  </div>
                  
              </div>
        );
      }}
      </Formik>
    </>
  )
}
 