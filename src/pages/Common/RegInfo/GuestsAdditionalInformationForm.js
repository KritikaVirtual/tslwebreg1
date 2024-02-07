import React, { useState, useEffect } from "react";
import "./index.css";
import { MultiSelect } from "react-multi-select-component";
import Questions from "./Questions";

export function GuestsAddtionalInformationForm(props) {
  const [fields, setFields] = useState({
    sFirstName: "",
    sLastName: "",
    sTitle: "",
    sPhone: "",
    sEmail: "",
    nType: 0,
    dAmount: 0,
    nStatus: "",
  });
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [applyCheck] = useState(false);
  const [fieldsChecked, setFieldsChecked] = useState({});
  const [fieldsText, setFieldsText] = useState({});
  const [guestId, setGuestId] = useState("");
  const [answersRegistrant, setAnswersRegistrant] = useState([]);
  const [answersRegistrantData, setAnswersRegistrantData] = useState({});

  useEffect(() => {
    if (
      sessionStorage.getItem("guestId") !== undefined &&
      sessionStorage.getItem("guestId") > 0
    ) {
      setGuestId(sessionStorage.getItem("guestId"));
    }
    if (props.guestRegistrantDataByID) {
      setFields(props.guestRegistrantDataByID);
    }
    if (props.clearFields) {
      setFields({});
    }
    
  }, [props.guestRegistrantDataByID]);

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

  useEffect(()=>{
    if(props.regTypesAmountData && !guestId){
      let data = fields
      const regTypeAmount = compareDates(props.regTypesAmountData)
      if(fields.nType == '0'){
        data.dAmount = regTypeAmount.regTypeGuestAmount
      }else if(fields.nType == '1'){
        data.dAmount = regTypeAmount.regTypeAddRegAmount
      }
      setFields({ ...data });
    }
  }, [props.regTypesAmountData]);

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
    setFields({ ...data });
    if (event.target.name == "nType" && !guestId) {
      props.getGuestAddRegAmount(event.target.value);
    }
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      if (props.userId && props.eventId && props.regId) {
        const postData = {
          lAccountID: props.userId,
          lEventID: props.eventId,
          lRegID: props.regId,
          sFirstName: fields.sFirstName,
          sLastName: fields.sLastName,
          sTitle: fields.sTitle,
          sPhone: fields.sPhone,
          sEmail: fields.sEmail,
          nType: fields.nType,
          dAmount: fields.dAmount,
          nStatus: fields.nStatus,
        };

        if (
          sessionStorage.getItem("guestId") !== undefined &&
          sessionStorage.getItem("guestId") > 0
        ) {
          postData["lGuestID"] = sessionStorage.getItem("guestId");
          postData["fieldsChecked"] = fieldsChecked;
          postData["fieldsText"] = fieldsText;
          props.updateGuestAddditionalInformation(postData);
        } else {
          props.saveGuestAddditionalInformation(postData);
        }
        props.getRegAmount({
          lAccountID: props.userId,
          lEventID: props.eventId,
          lRegID: props.regId,
        });
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
      errors["sLastName"] = "*Please enter your First Name";
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
                      <h4>Guests and Additional Registrant Form</h4>
                    </div>
                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
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
                        placeholder="Enter Last Name"
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
                        name="nType"
                        id=""
                        className="form-control"
                        onChange={(event) => handleChange(event)}
                        value={fields?.nType}
                      >
                        <option value="0">Guest</option>
                        <option value="1">Additional Registrant</option>
                      </select>
                    </div>

                    <div className="col-md-12 col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="dAmount"
                        value={fields?.dAmount}
                        onChange={(event) => handleChange(event)}
                      />
                      {/* {errors.dAmount ? (
                        <div className="errorMsg text-danger">
                          {errors.dAmount}
                        </div>
                      ) : (
                        ""
                      )} */}
                    </div>

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

                  {guestId && (
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
