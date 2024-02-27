import React, { useState, useEffect } from "react";
import "./index.css";
import { MultiSelect } from "react-multi-select-component";
import Questions from "./Questions";
import { Sessions } from "./Sessions";


export function GuestsAddtionalInformationForm(props) {
  const [fields, setFields] = useState({
    sFirstName: "",
    sLastName: "",
    sTitle: "",
    sPhone: "",
    sEmail: "",
    nStatus: "",
    dRegAmount: "",
    dAmount:"",
    sDiscountExtraText:"",
    dSpecialDiscountAmt:"",
    lDiscountID:0
  });
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [regId, setRegId] = useState("");
  const [dRegAmount, setdRegAmount] = useState("");
  
  const [answersRegistrant, setAnswersRegistrant] = useState([]);
  const [answersRegistrantData, setAnswersRegistrantData] = useState({});
  useEffect(() => {
    if (props.sendRegistrantInfoByID) {
      setFields(props.sendRegistrantInfoByID);
    }
    if (props.clearFields) {
      setFields({});
    }
  }, [props.sendRegistrantInfoByID]);
  
  useEffect(() => {
    let data = fields;
    if(props.regTypesAmountData !== undefined){
      data["dRegAmount"] = props.regTypesAmountData.dEarlyAmt;
      setFields({...data});
    }
    console.log(props.discountAmtByID);
    if(props.discountAmtByID !== undefined){
      data["dAmount"] = props.discountAmtByID.dAmount;
      setFields({...data});
    }
  },[props.regTypesAmountData.dEarlyAmt, props.discountAmtByID.dAmount])

  useEffect(() => {
    if (
      props.registrantRegID !== undefined &&
      props.registrantRegID > 0
    ) { 
      setRegId(props.registrantRegID);
      props.getRegistrantInfoByID(props.registrantRegID)
    }
    // if (props.clearFields) {
    //   setFields({});
    // }
    
  }, [props.registrantRegID]);
  
  useEffect(()=>{
    if(props.answersGuestData){
      const answerRegData = props.answersGuestData
      setAnswersRegistrantData(answerRegData)
      // const key = Object.keys(answerRegData).find((key)=>typeof answerRegData[key]==='string')
      // if(key!==undefined){
      //   setFieldsText({
      //     [key] : answerRegData[key]
      //   });
      // }

      const stringPairs = Object.entries(answerRegData)
      .filter(([key, value]) => typeof value === 'string')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      setFieldsText(stringPairs)

      setFieldsChecked(answerRegData);
            
    }
  },[props.answersGuestData])

 
  const compareDates = (data) => {
    
    var regTypeAmount = {
      'regTypeGuestAmount' : 0,
      'regTypeAddRegAmount' : 0
    }
    
    // get Today Date
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
    const currentDate = month + "/" + date + "/" + year;
    // end Getting Today Date

    const dtEarlyDateDB = convertDateFormat(data.dtEarlyDate) 
    const dtStandardDateDB = convertDateFormat(data.dtStandardDate)

    if(Date.parse(dtEarlyDateDB) === Date.parse(currentDate) || Date.parse(dtEarlyDateDB) > Date.parse(currentDate)){
      regTypeAmount['regTypeGuestAmount'] = data.dPricePerGuestEarly
      regTypeAmount['regTypeAddRegAmount'] = data.dPricePerAddRegEarly
    }else if (Date.parse(dtStandardDateDB) === Date.parse(currentDate) || Date.parse(dtStandardDateDB) > Date.parse(currentDate)){
      regTypeAmount['regTypeGuestAmount'] = data.dPricePerGuestStd
      regTypeAmount['regTypeAddRegAmount'] = data.dPricePerAddRegStd
    }else {
      regTypeAmount['regTypeGuestAmount'] = data.dPricePerGuest
      regTypeAmount['regTypeAddRegAmount'] = data.dPricePerAddReg
    }
    return regTypeAmount
  }

  const convertDateFormat = (dateDB) => {
    var now = new Date(dateDB);
    return ((now.getMonth() > 8) ? (now.getMonth() + 1) : ('0' + (now.getMonth() + 1))) + '/' + ((now.getDate() > 9) ? now.getDate() : ('0' + now.getDate())) + '/' + now.getFullYear();
  }

  const handleChange = (event) => {
    let data = fields;
    data[event.target.name] = event.target.value;

    if (event.target.name == "lRegType") {
      data["lRegType"] = event.target.value;
      props.getRegTypesAmount(data);
      props.discountCodeByRegId(event.target.value);
    }
    if (event.target.name == "lDiscountID") {
      data["lDiscountID"] = event.target.value;
      props.getDiscountAmtByID(event.target.value)
    }

    setFields({ ...data });

  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      if (props.userId && props.eventId && props.regId) {
        const postData = {
          lAccountID: props.userId,
          lEventID: props.eventId,
          lMainRegID: props.regId,
          sFirstName: fields.sFirstName,
          sLastName: fields.sLastName,
          sTitle: fields.sTitle,
          sPhone: fields.sPhone,
          sEmail: fields.sEmail,
          lRegType: fields.lRegType,       
          dRegAmount: fields.dRegAmount,   
          dAmount: fields.dAmount,
          sDiscountExtraText: fields.sDiscountExtraText,
          dSpecialDiscountAmt: fields.dSpecialDiscountAmt,  
          nStatus: fields.nStatus,
          lDiscountID: fields.lDiscountID
        };


        if(sessionStorage.getItem("RegistrantRegId")){
          postData['lRegID'] = sessionStorage.getItem("RegistrantRegId");
          props.updateGuestAddditionalInformation(postData);   
        }else{          
         props.saveGuestAddditionalInformation(postData);    
        }    
         props.showModel(false);
        
      }
    }
  };

  // console.log('fields',props.guestRegistrantDataByID)

  const validateRegistration = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["sFirstName"] || fields["sFirstName"] === "") {
      formIsValid = false;
      errors["sFirstName"] = "*Please enter your First Name";
    }

    if (!fields["sLastName"] || fields["sLastName"] === "") {
      formIsValid = false;
      errors["sLastName"] = "*Please enter your Last Name";
    }

    // if (!fields["dAmount"] || fields["dAmount"] === "") {
    //   formIsValid = false;
    //   errors["dAmount"] = "*Please enter Amount";
    // }

    if (typeof fields["sEmail"] !== "undefined" && fields["sEmail"] !== "") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["sEmail"])) {
        formIsValid = false;
        errors["sEmail"] = "*Please enter valid email.";
      }
    }

    return {
      errors: errors,
      formIsValid: formIsValid,
    };
  };

  const _validateForm = () => {
    let formFields = fields;
    let response = validateRegistration(formFields, applyCheck);
    setErrors(response.errors);
    return response.formIsValid;
  };

  const callQuestionsList = (questionData) => {
    // Create a map to store merged data
    const mergedMap = new Map();

    // Iterate through the data and merge properties
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
              {data ? callInputBoxes(data) : ""}
              {/* <input
                onChange={(e) => handleQuestionsChange(e)}
                type="radio"
                id={data.lQuestionID}
                name="lAnswerID"
                value={data.lAnswerID}
                checked={Object.values(fieldsChecked).includes(data.lAnswerID) ? true : false }
              />
              <label for=""> {data.sAnswer}</label> */}
              <br />
            </>
          ) : data.nType === 2 ? (
            <>{data ? callInputBoxes(data) : ""}</>
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
          dataQuestions[checkedId] = parseInt(checked);
        } else {
          delete dataQuestions[checkedId]
          // console.log('uncehcekd')
          // dataQuestions.splice(dataQuestions.findIndex('21035'),1);
        }
      }
    }
    
    setFieldsChecked({ ...dataQuestions });
  };

  const callInputBoxes = (datas) => {
    const sAnswer = datas.sAnswer;
    return Array.isArray(sAnswer) ? (
      sAnswer.map((data, index) => (
        <>
          <input
            onChange={(e) => handleQuestionsChange(e)}
            type={datas.nType === 1 ? 'radio' : datas.nType === 2 ? 'checkbox' : ''}
            id={datas.lQuestionID}
            name="lAnswerID"
            value={datas.lAnswerID[index]}
            checked={Object.values(fieldsChecked).includes(datas.lAnswerID[index]) ? true : false}
            
            
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
          id={datas.lQuestionID}
          name="lAnswerID"
          value={datas.lAnswerID}
          checked={Object.values(fieldsChecked).includes(datas.lAnswerID) ? true : false }
        />
        <label for=""> {datas.sAnswer}</label>
        <br />{" "}
      </>
    );
  };
  
  const callDataOnLoad = (data, type) => {
    var pushData = []
    pushData.push(<option value="0">{type}</option>)
    if (data && data.length > 0) {
      data.map((data, index) => (
        pushData.push(          
          <option value={data.value}>{data.label}</option>
        )
      ));
    }
    return pushData
  };

  

  return (
    <>
      <div className="invitation-wrap">
        <div className="container">
          <div className="row login-wrap-new">
            <div className="col-md-12 col-xs-12">
              <div className="form-content">
                <form onSubmit={(event) => _handleSubmit(event)}>
                  <div className="row">
                    <div className="col-12 ">
                      {successStatus ? (
                        <div className="successMsg text-success">
                          Details saved Successfully
                        </div>
                      ) : (
                        ""
                      )}
                      <h4>Registrant Form</h4>
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Reg ID"
                        name="lRegID"
                        value={sessionStorage.getItem("RegistrantRegId") ? sessionStorage.getItem("RegistrantRegId") : ''}
                        onChange={(event) => handleChange(event)}
                        disabled
                      />
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name *"
                        name="sFirstName"
                        value={fields?.sFirstName}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sFirstName ? (
                        <div className="errorMsg text-danger">
                          {errors.sFirstName}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name *"
                        name="sLastName"
                        value={fields?.sLastName}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sLastName ? (
                        <div className="errorMsg text-danger">
                          {errors.sLastName}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        name="sTitle"
                        value={fields?.sTitle}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Phone"
                        name="sPhone"
                        value={fields?.sPhone}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        name="sEmail"
                        value={fields?.sEmail}
                        onChange={(event) => handleChange(event)}
                      />
                      {errors.sEmail ? (
                        <div className="errorMsg text-danger">
                          {errors.sEmail}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <select
                        id="lRegType"
                        className="form-control"
                        name="lRegType"
                        onChange={(event) => handleChange(event)}
                        value={fields?.lRegType}
                      >
                        {props.regTypesData ? (
                          callDataOnLoad(props.regTypesData,'Select Reg Type')
                        ) : (
                          <option value="0">Select Reg Type</option>
                        )}
                      </select>
                      {errors.lRegType ? (
                        <div className="errorMsg text-danger">
                          {errors.lRegType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Reg Amt"
                        name="dRegAmount"
                        value={fields?.dRegAmount}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    {/* <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sess Amt"
                        name="dSessAmt"
                        value={fields?.dSessAmt}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Taxes"
                        name="dTaxesAmt"
                        value={fields?.dTaxesAmt}
                        onChange={(event) => handleChange(event)}
                      />
                    </div> */}

                    {/* <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Service Fee"
                        name="dServiceFeeAmt"
                        value={fields?.dServiceFeeAmt}
                        onChange={(event) => handleChange(event)}
                      />
                    </div> */}

                    <div className="col-md-12 col-xs-12">
                      
                      <select
                        id="lDiscountID"
                        className="form-control"
                        name="lDiscountID"
                        onChange={(event) => handleChange(event)}
                        value={fields?.lDiscountID}
                      >
                        {props.sendDiscountCodeByRegId ? (
                          callDataOnLoad(props.sendDiscountCodeByRegId,'Select Discount Code')
                        ) : (
                          <option value="0">Select Discount Code</option>
                        )}
                      </select>
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Disc Amt"
                        name="dAmount"
                        value={fields?.dAmount}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Disc Text"
                        name="sDiscountExtraText"
                        value={fields?.sDiscountExtraText}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Spec Disc"
                        name="dSpecialDiscountAmt"
                        value={fields?.dSpecialDiscountAmt}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>
{/* 
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Cancellation Amt"
                        name="dCancellationFee"
                        value={fields?.dCancellationFee}
                        onChange={(event) => handleChange(event)}
                      />
                    </div> */}

                    <div className="col-md-12 col-xs-12">
                      <select
                        name="nStatus"
                        id=""
                        className="form-control"
                        onChange={(event) => handleChange(event)}
                        value={fields?.nStatus}
                      >
                        <option value="0">Active </option>
                        <option value="1">Deleted </option>
                        <option value="2">Cancel </option>
                      </select>
                    </div>
                  </div>

                  {sessionStorage.getItem('RegistrantRegId') && (
                    <div className="row questions">
                      <div className="col-md-12 col-xs-12 titleQuestions">
                        <h4 className="mt-20">Questions</h4>
                      </div>

                      <div className="col-md-12 col-xs-12">
                        <table width="100%">
                          <tbody>
                            {props.questionsRegistrantData
                              ? callQuestionsList(props.questionsRegistrantData)
                              : ""}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {sessionStorage.getItem('RegistrantRegId') && 
                    <Sessions
                      userId={props.userId}
                      eventId={props.eventId}
                      regId={props.regId}
                      registrantRegID = {props.registrantRegID}
                      getRegSessionsById = {(postData) => props.getRegSessionsById(postData)}
                      sendSessionsData = {props.sendSessionsData}
                    />
                  }
                  <button type="submit" className="btn">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
