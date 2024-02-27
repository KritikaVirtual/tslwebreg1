import React,{ useState, useEffect} from 'react';
import "./index.css";
import moment from "moment";
export function RegistrationTypesForm(props) {
    
    const [fields,setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [successStatus,setSuccessStatus] = useState(false);
    const [applyCheck] = useState(false);
    
    useEffect(()=>{
        if(props.regTypeByIdData!==undefined){
           setFields(props.regTypeByIdData);
        }
        if(props.clearFields){
            setFields({});
        }
     },[props.regTypeByIdData]);

    const handleChange = (event) => {
        let data = fields;
        data[event.target.name] = event.target.value;
        setFields({ ...data });
    };
    
    const validateRegistration = (fields, applyCheck = false) => {
        let errors = {};
        let formIsValid = true;

        if (!fields["sCode"] || fields["sCode"] === "") {
            formIsValid = false;
            errors["sCode"] = "*Please enter your Code.";
        }

        if (/^[A-Za-z0-9]*$/.test(fields["sCode"])){
            errors["sCode"] = "";
        }else{
            formIsValid = false;
            errors["sCode"] = "*Please enter Valid Code.";
        }

        if (/^[a-z0-9]*$/.test(fields["sCode"])){
            formIsValid = false;
            errors["sCode"] = "Please enter the code in capital letters";
        }

        if (!fields["sName"] || fields["sName"] === "") {
          formIsValid = false;
          errors["sName"] = "*Please enter your Name.";
        }
    
        // if (!fields["dEarlyAmt"] || fields["dEarlyAmt"] === "" || isNaN(fields["dEarlyAmt"])){
        //   formIsValid = false;
        //   errors["dEarlyAmt"] = "*Please enter correct Early Price Amount 1";
        // }
        // if (!fields["lNumberOfEarlyReg1"] || fields["lNumberOfEarlyReg1"] === "" || isNaN(fields["lNumberOfEarlyReg1"])){
        //     formIsValid = false;
        //     errors["lNumberOfEarlyReg1"] = "*Please enter Number of registrants at price amount 1";
        // }
        // if (!fields["dEarlyAmt2"] || fields["dEarlyAmt2"] === "" || isNaN(fields["dEarlyAmt2"])){
        //     formIsValid = false;
        //     errors["dEarlyAmt2"] = "*Please enter correct Early Price Amount 2";
        // }
        // if (!fields["lNumberOfEarlyReg2"] || fields["lNumberOfEarlyReg2"] === "" || isNaN(fields["lNumberOfEarlyReg2"])){
        //     formIsValid = false;
        //     errors["lNumberOfEarlyReg2"] = "*Please enter Number of registrants at price amount 2";
        // }
        // if (!fields["dEarlyAmt3"] || fields["dEarlyAmt3"] === "" || isNaN(fields["dEarlyAmt3"])){
        //     formIsValid = false;
        //     errors["dEarlyAmt3"] = "*Please enter correct Early Price Amount 3";
        // }
        // if (!fields["lNumberOfEarlyReg3"] || fields["lNumberOfEarlyReg3"] === "" || isNaN(fields["lNumberOfEarlyReg3"])){
        //     formIsValid = false;
        //     errors["lNumberOfEarlyReg3"] = "*Please enter Number of registrants at price amount 3";
        // }
        // if (!fields["dEarlyAmt4"] || fields["dEarlyAmt4"] === "" || isNaN(fields["dEarlyAmt4"])){
        //     formIsValid = false;
        //     errors["dEarlyAmt4"] = "*Please enter correct Early Price Amount 4";
        // }
        // if (!fields["lNumberOfEarlyReg4"] || fields["lNumberOfEarlyReg4"] === "" || isNaN(fields["lNumberOfEarlyReg4"])){
        //     formIsValid = false;
        //     errors["lNumberOfEarlyReg4"] = "*Please enter Number of registrants at price amount 4";
        // }

        // if (!fields["dtEarlyDate"] || fields["dtEarlyDate"] === "") {
        //     formIsValid = false;
        //     errors["dtEarlyDate"] = "*Please enter your Early Date";
        // }

        // if (!fields["dStandardAmt"] || fields["dStandardAmt"] === "" || isNaN(fields["dStandardAmt"])){
        //     formIsValid = false;
        //     errors["dStandardAmt"] = "*Please enter correct Regular Price Amount 1";
        // }

        // if (!fields["lNumberOfStandardReg1"] || fields["lNumberOfStandardReg1"] === "" || isNaN(fields["lNumberOfStandardReg1"])){
        //     formIsValid = false;
        //     errors["lNumberOfStandardReg1"] = "*Please enter correct Number of registrants at price amount 1";
        // }

        // if (!fields["dStandardAmt2"] || fields["dStandardAmt2"] === "" || isNaN(fields["dStandardAmt2"])){
        //     formIsValid = false;
        //     errors["dStandardAmt2"] = "*Please enter correct Regular Price Amount 2";
        // }

        // if (!fields["lNumberOfStandardReg2"] || fields["lNumberOfStandardReg2"] === "" || isNaN(fields["lNumberOfStandardReg2"])){
        //     formIsValid = false;
        //     errors["lNumberOfStandardReg2"] = "*Please enter correct Number of registrants at price amount 2";
        // }

        // if (!fields["dStandardAmt3"] || fields["dStandardAmt3"] === "" || isNaN(fields["dStandardAmt3"])){
        //     formIsValid = false;
        //     errors["dStandardAmt3"] = "*Please enter correct Regular Amount Price 3";
        // }

        // if (!fields["lNumberOfStandardReg3"] || fields["lNumberOfStandardReg3"] === "" || isNaN(fields["lNumberOfStandardReg3"])){
        //     formIsValid = false;
        //     errors["lNumberOfStandardReg3"] = "*Please enter correct Number of registrants at price amount 3";
        // }

        // if (!fields["dStandardAmt4"] || fields["dStandardAmt4"] === "" || isNaN(fields["dStandardAmt4"])){
        //     formIsValid = false;
        //     errors["dStandardAmt4"] = "*Please enter correct Regular Price Amount 4";
        // }

        // if (!fields["lNumberOfStandardReg4"] || fields["lNumberOfStandardReg4"] === "" || isNaN(fields["lNumberOfStandardReg4"])){
        //     formIsValid = false;
        //     errors["lNumberOfStandardReg4"] = "*Please enter correct Number of registrants at price amount 4";
        // }

        // if (!fields["dtStandardDate"] || fields["dtStandardDate"] === "") {
        //     formIsValid = false;
        //     errors["dtStandardDate"] = "*Please enter your Ending date for Regular Price";
        // }

        // if (!fields["dOnsiteAmt"] || fields["dOnsiteAmt"] === "" || isNaN(fields["dOnsiteAmt"])){
        //     formIsValid = false;
        //     errors["dOnsiteAmt"] = "*Please enter Onsite Price Amount 1";
        // }

        // if (!fields["lNumberOfOnsiteReg1"] || fields["lNumberOfOnsiteReg1"] === "" || isNaN(fields["lNumberOfOnsiteReg1"])){
        //     formIsValid = false;
        //     errors["lNumberOfOnsiteReg1"] = "*Please enter Number of registrants at price amount 1";
        // }

        // if (!fields["dOnsiteAmt2"] || fields["dOnsiteAmt2"] === "" || isNaN(fields["dOnsiteAmt2"])){
        //     formIsValid = false;
        //     errors["dOnsiteAmt2"] = "*Please enter Onsite Price Amount 2";
        // }

        // if (!fields["lNumberOfOnsiteReg2"] || fields["lNumberOfOnsiteReg2"] === "" || isNaN(fields["lNumberOfOnsiteReg2"])){
        //     formIsValid = false;
        //     errors["lNumberOfOnsiteReg2"] = "*Please enter Number of registrants at price amount 2";
        // }

        // if (!fields["dOnsiteAmt3"] || fields["dOnsiteAmt3"] === "" || isNaN(fields["dOnsiteAmt3"])){
        //     formIsValid = false;
        //     errors["dOnsiteAmt3"] = "*Please enter Onsite Price Amount 3";
        // }

        // if (!fields["lNumberOfOnsiteReg3"] || fields["lNumberOfOnsiteReg3"] === "" || isNaN(fields["lNumberOfOnsiteReg3"])){
        //     formIsValid = false;
        //     errors["lNumberOfOnsiteReg3"] = "*Please enter Number of registrants at price amount 3";
        // }

        // if (!fields["dOnsiteAmt4"] || fields["dOnsiteAmt4"] === "" || isNaN(fields["dOnsiteAmt4"])){
        //     formIsValid = false;
        //     errors["dOnsiteAmt4"] = "*Please enter Onsite Price Amount 4";
        // }

        // if (!fields["lNumberOfOnsiteReg4"] || fields["lNumberOfOnsiteReg4"] === "" || isNaN(fields["lNumberOfOnsiteReg4"])){
        //     formIsValid = false;
        //     errors["lNumberOfOnsiteReg4"] = "*Please enter Number of registrants at price amount 4";
        // }







        // if (!fields["dPricePerAddRegEarly"] || fields["dPricePerAddRegEarly"] === "" || isNaN(fields["dPricePerAddRegEarly"])){
        //     formIsValid = false;
        //     errors["dPricePerAddRegEarly"] = "*Please enter correct Early Add Reg Amt";
        // }

        // if (!fields["dPricePerGuestEarly"] || fields["dPricePerGuestEarly"] === "" || isNaN(fields["dPricePerGuestEarly"])){
        //     formIsValid = false;
        //     errors["dPricePerGuestEarly"] = "*Please enter correct Early Guest Amt";
        // }


        // if (!fields["dPricePerAddRegStd"] || fields["dPricePerAddRegStd"] === "" || isNaN(fields["dPricePerAddRegStd"])){
        //     formIsValid = false;
        //     errors["dPricePerAddRegStd"] = "*Please enter correct Std Add Reg Amt";
        // }

        // if (!fields["dPricePerGuestStd"] || fields["dPricePerGuestStd"] === "" || isNaN(fields["dPricePerGuestStd"])){
        //     formIsValid = false;
        //     errors["dPricePerGuestStd"] = "*Please enter correct Std Guest Amt";
        // }

        

        // if (!fields["bNeedMembership"] || fields["bNeedMembership"] === "") {
        //     formIsValid = false;
        //     errors["bNeedMembership"] = "*Please select Membership status";
        // }

       
        
        // if (!fields["dPricePerAddReg"] || fields["dPricePerAddReg"] === "" || isNaN(fields["dPricePerAddReg"])){
        //     formIsValid = false;
        //     errors["dPricePerAddReg"] = "*Please enter correct Price Per Add Reg";
        // }

        // if (!fields["dPricePerGuest"] || fields["dPricePerGuest"] === "" || isNaN(fields["dPricePerGuest"])){
        //     formIsValid = false;
        //     errors["dPricePerGuest"] = "*Please enter correct Price Per Guest";
        // }

        // if (!fields["nAddRegMax"] || fields["nAddRegMax"] === "" || isNaN(fields["nAddRegMax"])){
        //     formIsValid = false;
        //     errors["nAddRegMax"] = "*Please enter correct Max Add Reg";
        // }

        // if (!fields["nGuestsMax"] || fields["nGuestsMax"] === "" || isNaN(fields["nGuestsMax"])){
        //     formIsValid = false;
        //     errors["nGuestsMax"] = "*Please enter correct Max Guests";
        // }

        // if (fields["nStatus"] === "") {
        //     formIsValid = false;
        //     errors["nStatus"] = "*Please select status";
        // }
    
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
    
    const submitRegTypeInfo = async(event) => {
        event.preventDefault();
        if (_validateForm()) {
            if(props.userId && props.eventId){
                const postData = {
                    lAccountID: props.userId,
                    lEventID: props.eventId,
                    sCode: fields.sCode,
                    sName: fields.sName,
                    dEarlyAmt: fields.dEarlyAmt ? fields.dEarlyAmt : 0,
                    lNumberOfEarlyReg1: fields.lNumberOfEarlyReg1 ? fields.lNumberOfEarlyReg1 : 0,
                    dEarlyAmt2: fields.dEarlyAmt2 ? fields.dEarlyAmt2 : 0,
                    lNumberOfEarlyReg2: fields.lNumberOfEarlyReg2 ? fields.lNumberOfEarlyReg2 : 0,
                    dEarlyAmt3: fields.dEarlyAmt3 ? fields.dEarlyAmt3 : 0,
                    lNumberOfEarlyReg3: fields.lNumberOfEarlyReg3 ? fields.lNumberOfEarlyReg3 : 0,
                    dEarlyAmt4: fields.dEarlyAmt4 ? fields.dEarlyAmt4 : 0,
                    lNumberOfEarlyReg4: fields.lNumberOfEarlyReg4 ? fields.lNumberOfEarlyReg4 : 0,
                    dtEarlyDate: fields.dtEarlyDate,
                    dStandardAmt: fields.dStandardAmt ? fields.dStandardAmt : 0,
                    lNumberOfStandardReg1:fields.lNumberOfStandardReg1 ? fields.lNumberOfStandardReg1 : 0,
                    dStandardAmt2:fields.dStandardAmt2 ? fields.dStandardAmt2 : 0,
                    lNumberOfStandardReg2:fields.lNumberOfStandardReg2 ? fields.lNumberOfStandardReg2 : 0,
                    dStandardAmt3:fields.dStandardAmt3 ? fields.dStandardAmt3 : 0,
                    lNumberOfStandardReg3:fields.lNumberOfStandardReg3 ? fields.lNumberOfStandardReg3 : 0,
                    dStandardAmt4:fields.dStandardAmt4 ? fields.dStandardAmt4 : 0,
                    lNumberOfStandardReg4:fields.lNumberOfStandardReg4 ? fields.lNumberOfStandardReg4 : 0,
                    dtStandardDate: fields.dtStandardDate,
                    dOnsiteAmt: fields.dOnsiteAmt ? fields.dOnsiteAmt : 0,
                    lNumberOfOnsiteReg1: fields.lNumberOfOnsiteReg1 ? fields.lNumberOfOnsiteReg1 : 0,
                    dOnsiteAmt2: fields.dOnsiteAmt2 ? fields.dOnsiteAmt2 : 0,
                    lNumberOfOnsiteReg2: fields.lNumberOfOnsiteReg2 ? fields.lNumberOfOnsiteReg2 : 0,
                    dOnsiteAmt3: fields.dOnsiteAmt3 ? fields.dOnsiteAmt3 : 0,
                    lNumberOfOnsiteReg3: fields.lNumberOfOnsiteReg3 ? fields.lNumberOfOnsiteReg3 : 0,
                    dOnsiteAmt4: fields.dOnsiteAmt4 ? fields.dOnsiteAmt4 : 0,
                    lNumberOfOnsiteReg4: fields.lNumberOfOnsiteReg4 ? fields.lNumberOfOnsiteReg4 : 0,



                    dPricePerAddRegEarly: fields.dPricePerAddRegEarly ? fields.dPricePerAddRegEarly : 0,
                    dPricePerGuestEarly: fields.dPricePerGuestEarly ? fields.dPricePerGuestEarly : 0,
                    dPricePerAddRegStd: fields.dPricePerAddRegStd ? fields.dPricePerAddRegStd : 0,
                    dPricePerGuestStd: fields.dPricePerGuestStd ? fields.dPricePerGuestStd : 0,
                    dPricePerAddReg: fields.dPricePerAddReg,
                    dPricePerGuest: fields.dPricePerGuest,
                    // bNeedMembership: fields.bNeedMembership,
                    // nAddRegMax: fields.nAddRegMax,
                    // nGuestsMax: fields.nGuestsMax,
                    sPrintText: fields.sPrintText,
                    nStatus: fields.nStatus
                }
                if(props.regTypeId){
                    postData['lRegTypeID'] = props.regTypeByIdData.lRegTypeID
                    props.updateRegTypes(postData);  
                }else{
                    props.saveRegTypes(postData);  
                }
                props.showModel(false); 
                
            }
        }
    }
    
  return (
    <>
            <div className="invitation-wrap reg_type_form">
                  <div className="container">
                    <div className="row login-wrap-new">
                        <div className="col-md-12 col-xs-12">
                            <div className="form-content">
                                <form onSubmit={(event) => submitRegTypeInfo(event)}>
                                    <div className="row">
                                        <div className="col-12 ">
                                        {successStatus?<div className="successMsg text-success">Details saved Successfully</div>:''}
                                        <h4>Registration Types Form</h4>
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>SCode</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter SCode"
                                                name="sCode"
                                                value={fields?.sCode }
                                                onChange={(event) => handleChange(event)}
                                            />
                                            {errors.sCode ? (
                                                <div className="errorMsg text-danger">
                                                {errors.sCode}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>SName</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Name"
                                                name="sName"
                                                value={fields?.sName}
                                                onChange={(event) => handleChange(event)}
                                            />
                                            {errors.sName ? (
                                                <div className="errorMsg text-danger">
                                                {errors.sName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>Early Price Amount 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Early Price Amount 1 "
                                            name="dEarlyAmt"
                                            value={fields?.dEarlyAmt}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dEarlyAmt ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dEarlyAmt}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Early Add Reg Amt</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="early_add_reg_amt"
                                                placeholder="Enter Early Add Reg Amt"
                                                name="dPricePerAddRegEarly"
                                                value={fields?.dPricePerAddRegEarly}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Early Guest Amt</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="early_add_reg_amt"
                                                placeholder="Enter Early Guest Amt"
                                                name="dPricePerGuestEarly"
                                                value={fields?.dPricePerGuestEarly}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Number of registrants at price amount 1 "
                                                name="lNumberOfEarlyReg1"
                                                value={fields?.lNumberOfEarlyReg1}
                                                onChange={(event) => handleChange(event)}
                                            />
                                            {/* {errors.lNumberOfEarlyReg1 ? (
                                                <div className="errorMsg text-danger">
                                                {errors.lNumberOfEarlyReg1}
                                                </div>
                                            ) : (
                                                ""
                                            )} */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Early Price Amount 2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Early Price Amount 2 "
                                                name="dEarlyAmt2"
                                                value={fields?.dEarlyAmt2}
                                                onChange={(event) => handleChange(event)}
                                            />
                                            {/* {errors.dEarlyAmt2 ? (
                                                <div className="errorMsg text-danger">
                                                {errors.dEarlyAmt2}
                                                </div>
                                            ) : (
                                                ""
                                            )} */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 2"
                                            name="lNumberOfEarlyReg2"
                                            value={fields?.lNumberOfEarlyReg2}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfEarlyReg2 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfEarlyReg2}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Early Price Amount 3 </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Early Price Amount 3 "
                                            name="dEarlyAmt3"
                                            value={fields?.dEarlyAmt3}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dEarlyAmt3 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dEarlyAmt3}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 3</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 3"
                                            name="lNumberOfEarlyReg3"
                                            value={fields?.lNumberOfEarlyReg3}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfEarlyReg3 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfEarlyReg3}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Early Price Amount 4 </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Early Price Amount 4 "
                                            name="dEarlyAmt4"
                                            value={fields?.dEarlyAmt4}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dEarlyAmt4 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dEarlyAmt4}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 4</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 4"
                                            name="lNumberOfEarlyReg4"
                                            value={fields?.lNumberOfEarlyReg4}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfEarlyReg4 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfEarlyReg4}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Early Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Enter Early Date"
                                            name="dtEarlyDate"
                                            value={ fields.dtEarlyDate?moment(fields.dtEarlyDate).format("YYYY-MM-DD"):''}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dtEarlyDate ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dtEarlyDate}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Std Amt</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Regular Price Amount 1"
                                            name="dStandardAmt"
                                            value={fields?.dStandardAmt}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dStandardAmt ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dStandardAmt}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>Std Add Reg Amt</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Std Add Reg Amt"
                                            name="dPricePerAddRegStd"
                                            value={fields?.dPricePerAddRegStd}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.dPricePerAddRegStd ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dPricePerAddRegStd}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>Std Guest Amt</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Std Guest Amt"
                                            name="dPricePerGuestStd"
                                            value={fields?.dPricePerGuestStd}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.dPricePerGuestStd ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dPricePerGuestStd}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>



                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 1"
                                            name="lNumberOfStandardReg1"
                                            value={fields?.lNumberOfStandardReg1}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfStandardReg1 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfStandardReg1}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Regular Price Amount 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Regular Price Amount 2"
                                            name="dStandardAmt2"
                                            value={fields?.dStandardAmt2}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dStandardAmt2 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dStandardAmt2}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 2"
                                            name="lNumberOfStandardReg2"
                                            value={fields?.lNumberOfStandardReg2}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfStandardReg2 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfStandardReg2}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Regular Price Amount 3</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Regular Price Amount 3"
                                            name="dStandardAmt3"
                                            value={fields?.dStandardAmt3}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dStandardAmt3 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dStandardAmt3}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 3</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 3"
                                            name="lNumberOfStandardReg3"
                                            value={fields?.lNumberOfStandardReg3}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfStandardReg3 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfStandardReg3}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Regular Price Amount 4</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Regular Price Amount 4"
                                            name="dStandardAmt4"
                                            value={fields?.dStandardAmt4}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dStandardAmt4 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dStandardAmt4}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 4</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 4"
                                            name="lNumberOfStandardReg4"
                                            value={fields?.lNumberOfStandardReg4}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfStandardReg4 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfStandardReg4}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Ending date for Regular Price</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Enter Ending date for Regular Price "
                                            name="dtStandardDate"
                                            value={fields?.dtStandardDate?moment(fields?.dtStandardDate).format("YYYY-MM-DD"):''}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dtStandardDate ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dtStandardDate}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Onsite Amt</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Onsite Amt"
                                            name="dOnsiteAmt"
                                            value={fields?.dOnsiteAmt}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dOnsiteAmt ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dOnsiteAmt}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>Price Per Add Reg</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Price Per Add Reg"
                                            name="dPricePerAddReg"
                                            value={fields?.dPricePerAddReg}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.dPricePerAddReg ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dPricePerAddReg}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>Price Per Guest</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Price Per Guest"
                                            name="dPricePerGuest"
                                            value={fields?.dPricePerGuest}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.dPricePerGuest ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dPricePerGuest}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>
                                        
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 1"
                                            name="lNumberOfOnsiteReg1"
                                            value={fields?.lNumberOfOnsiteReg1}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfOnsiteReg1 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfOnsiteReg1}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Onsite Price Amount 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Onsite Price Amount 2"
                                            name="dOnsiteAmt2"
                                            value={fields?.dOnsiteAmt2}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dOnsiteAmt2 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dOnsiteAmt2}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 2"
                                            name="lNumberOfOnsiteReg2"
                                            value={fields?.lNumberOfOnsiteReg2}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfOnsiteReg2 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfOnsiteReg2}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>
                                        
                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Onsite Price Amount 3</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Onsite Price Amount 3"
                                            name="dOnsiteAmt3"
                                            value={fields?.dOnsiteAmt3}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dOnsiteAmt3 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dOnsiteAmt3}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 3</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 3"
                                            name="lNumberOfOnsiteReg3"
                                            value={fields?.lNumberOfOnsiteReg3}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfOnsiteReg3 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfOnsiteReg3}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Onsite Price Amount 4</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Onsite Price Amount 4"
                                            name="dOnsiteAmt4"
                                            value={fields?.dOnsiteAmt4}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.dOnsiteAmt4 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.dOnsiteAmt4}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Number of registrants at price amount 4</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Number of registrants at price amount 4"
                                            name="lNumberOfOnsiteReg4"
                                            value={fields?.lNumberOfOnsiteReg4}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.lNumberOfOnsiteReg4 ? (
                                            <div className="errorMsg text-danger">
                                            {errors.lNumberOfOnsiteReg4}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>


                                        {/*  */}
                                         
                                        
                                        

                                        

                                        {/*

                                        

                                        

                                        

                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>SName</label>
                                        <select name="bNeedMembership" id="" className="form-control" onChange={(event) => handleChange(event)}>
                                            <option value="">Select Membership </option>
                                            <option value="0">No </option>
                                            <option value="1">Yes </option>
                                        </select>
                                        {errors.bNeedMembership ? (
                                            <div className="errorMsg text-danger">
                                            {errors.bNeedMembership}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>SName</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Max Add Reg"
                                            name="nAddRegMax"
                                            value={fields?.nAddRegMax}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.nAddRegMax ? (
                                            <div className="errorMsg text-danger">
                                            {errors.nAddRegMax}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>

                                        <div className="col-md-12 col-xs-12 label_registration">
                                        <label>SName</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Max Guests"
                                            name="nGuestsMax"
                                            value={fields?.nGuestsMax}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {errors.nGuestsMax ? (
                                            <div className="errorMsg text-danger">
                                            {errors.nGuestsMax}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        </div>*/}

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Print Text</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Print Text"
                                            name="sPrintText"
                                            value={fields?.sPrintText}
                                            onChange={(event) => handleChange(event)}
                                        />
                                        {/* {errors.sPrintText ? (
                                            <div className="errorMsg text-danger">
                                            {errors.sPrintText}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div> 

                                        <div className="col-md-12 col-xs-12 label_registration">
                                            <label>Status</label>
                                        <select name="nStatus" id="" className="form-control" onChange={(event) => handleChange(event)} value={fields?.nStatus}>
                                        {/* <option value="">Select Status </option> */}
                                            <option value="0">Active </option>
                                            <option value="1">Deleted </option>
                                            <option value="2">Cancel </option>
                                        </select>
                                        {/* {errors.nStatus ? (
                                            <div className="errorMsg text-danger">
                                            {errors.nStatus}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        </div>

                                        
                                    </div>
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