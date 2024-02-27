import React,{ useState, useEffect} from 'react';
import "./index.css";

export function EventForm(props) {

        const [fields, setFields] = useState({});
        const [errors, setErrors] = useState({});
        const [accessCodes, setAccessCodes] = useState('');
        const insertFieldArray = [ 
                {sCode : 'sMemberID', sName : 'Member ID'},
                {sCode : 'sPrefix', sName : 'Prefix'},
                {sCode : 'sFirstName', sName : 'First Name'},
                {sCode : 'sMiddleName', sName : 'Middle Name'},
                {sCode : 'sLastName', sName : 'Last Name'},
                {sCode : 'sSuffix', sName : 'Suffix'},
                {sCode : 'sCredentials', sName : 'Credentials'},
                {sCode : 'sTitle', sName : 'Title'},
                {sCode : 'sCompany', sName : 'Company'},
                {sCode : 'sAddress1', sName : 'Address 1'},
                {sCode : 'sAddress2', sName : 'Address 2'},
                {sCode : 'sAddress3', sName : 'Address 3'},
                {sCode : 'sCity', sName : 'City'},
                {sCode : 'sState', sName : 'State/Province'},
                {sCode : 'sZip', sName : 'Postal Code'},
                {sCode : 'sCountry', sName : 'Country'},
                {sCode : 'sPhone ', sName : 'Phone'},
                {sCode : 'sCell', sName : 'Cell'},
                {sCode : 'sFax', sName : 'Fax'},
                {sCode : 'sEmail', sName : 'Email'},
                {sCode : 'sOtherInfo1', sName : 'Other Info'}
        ]        

        const insertGuestAddRegFieldData = [
                {sName: 'sTitle'},
                {sName: 'sPhone'},
                {sName: 'sEmail'},
        ]
        useEffect(()=>{
                let accessCodeData = randomNumberInRange(100000,1000000)
                setAccessCodes(accessCodeData)
                let data = {}
                data["sAccessCode"] = accessCodeData
                setFields(data)
        },[])

        const _handleChange = (event) => {
                let data = fields;
                data[event.target.name] = event.target.value;
                setFields({ ...data });
                console.log(fields)
        };

        const randomNumberInRange= (min, max) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
        }
            
        const validateRegistration = (fields) => {
                let errors = {};
                let formIsValid = true;
            
                if (!fields["sName"] || fields["sName"].trim() === "") {
                  formIsValid = false;
                  errors["sName"] = "*Please enter your Event Name.";
                }
            
                if (!fields["sLocation"] || fields["sLocation"].trim() === "") {
                  formIsValid = false;
                  errors["sLocation"] = "*Please enter your Event Location.";
                }
                
                if (!fields["dtStart"] || fields["dtStart"].trim() === "") {
                        formIsValid = false;
                        errors["dtStart"] = "*Please enter your Start Date.";
                }

                if (!fields["dtEnd"] || fields["dtEnd"].trim() === "") {
                        formIsValid = false;
                        errors["dtEnd"] = "*Please enter your End Date.";
                }

                if (!fields["sStatus"] || fields["sStatus"].trim() === "") {
                        formIsValid = false;
                        errors["sStatus"] = "*Please select your Status.";
                }

                if (!fields["sEventContactName"] || fields["sEventContactName"].trim() === "") {
                        formIsValid = false;
                        errors["sEventContactName"] = "*Please enter your Event Contact.";
                }

                if (!fields["sEventContactEmail"] || fields["sEventContactEmail"].trim() === "") {
                        formIsValid = false;
                        errors["sEventContactEmail"] = "*Please enter your Email.";
                }
                
                if (typeof fields["sEventContactEmail"] !== "undefined") {
                        var pattern = new RegExp(
                        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                        );
                        if (!pattern.test(fields["sEventContactEmail"])) {
                                formIsValid = false;
                                errors["sEventContactEmail"] = "*Please enter valid email.";
                        }
                }

                if (!fields["dtCloseSite"] || fields["dtCloseSite"].trim() === "") {
                        formIsValid = false;
                        errors["dtCloseSite"] = "*Please enter your Closing Date.";
                }

                if (!fields["lBadgeReportID"] || fields["lBadgeReportID"].trim() === "") {
                        formIsValid = false;
                        errors["lBadgeReportID"] = "*Please select your Badge Layout.";
                }

                if (!fields["bUniqueEmailsForAddReg"] || fields["bUniqueEmailsForAddReg"].trim() === "") {
                        formIsValid = false;
                        errors["bUniqueEmailsForAddReg"] = "*Please choose one field.";
                }

                if (typeof fields["nAllowToPayByCheck"] == "undefined" || fields["nAllowToPayByCheck"] === "") {
                        formIsValid = false;
                        errors["nAllowToPayByCheck"] = "*Please choose one field.";
                }
                
                // if (!fields["sAccessCode"] || fields["sAccessCode"].trim() === "") {
                //         formIsValid = false;
                //         errors["sAccessCode"] = "*Please enter Access Code.";
                // }

                return {
                  errors: errors,
                  formIsValid: formIsValid,
                };
        };
            
        const _validateForm = () => {
                let formFields = fields;
                let response = validateRegistration(formFields);
                setErrors(response.errors);
                return response.formIsValid;
        };

        const _handleSubmit = (event) =>{
                event.preventDefault()
                if (_validateForm()) {
                        if(props.userId){
                                const postData = fields
                                postData.lAccountID = props.userId
                                postData.fieldsDataArray = insertFieldArray
                                postData.guestAddRegFieldData = insertGuestAddRegFieldData
                                props.addEventInfo(postData)
                                
                        }
                }
        }
        return (
                <>
                <div className="invitation-wrap">
                        <div className="panel-body">
                        <div className="form-content">
                                <form onSubmit={(event) => _handleSubmit(event)}>
                                <div className="row">
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Event Name</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="sName" placeholder="Event Name"/>
                                                {errors.sName ? (<div className="errorMsg text-danger">{errors.sName}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Event Location</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="sLocation" placeholder="Event Location"/>
                                                {errors.sLocation ? (<div className="errorMsg text-danger">{errors.sLocation}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Start Date</label><br/>
                                                <input type="date" className="form-control" onChange={(e)=>_handleChange(e)} name="dtStart" placeholder="Start Date"/>
                                                {errors.dtStart ? (<div className="errorMsg text-danger">{errors.dtStart}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">End Date</label><br/>
                                                <input type="date" className="form-control" onChange={(e)=>_handleChange(e)} name="dtEnd" placeholder="End Date"/>
                                                {errors.dtEnd ? (<div className="errorMsg text-danger">{errors.dtEnd}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Status</label><br/>
                                                <select name="sStatus" id="" className="form-control" onChange={(e) => _handleChange(e)}>
                                                <option value="">Select Status </option>
                                                <option value="Active">Active </option>
                                                <option value="Ended">Ended</option>
                                                <option value="Test">Test</option>
                                                </select>
                                                {errors.sStatus ? (<div className="errorMsg text-danger">{errors.sStatus}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Event Contact</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="sEventContactName" placeholder="Event Contact"/>
                                                {errors.sEventContactName ? (<div className="errorMsg text-danger">{errors.sEventContactName}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Event Email</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="sEventContactEmail" placeholder="Event Email"/>
                                                {errors.sEventContactEmail ? (<div className="errorMsg text-danger">{errors.sEventContactEmail}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Close site date</label><br/>
                                                <input type="date" className="form-control" onChange={(e)=>_handleChange(e)} name="dtCloseSite" placeholder="Close site date"/>
                                                {errors.dtCloseSite ? (<div className="errorMsg text-danger">{errors.dtCloseSite}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Default Badge Layout</label><br/>
                                                <select name="lBadgeReportID" onChange={(e)=>_handleChange(e)} className="form-control" placeholder="Accunt Type"  >
                                                <option value="">Select Badge Layout </option>
                                                <option value="37">1 </option>
                                                <option value="38">2</option>
                                                <option value="39">3</option>
                                                </select>
                                                {errors.lBadgeReportID ? (<div className="errorMsg text-danger">{errors.lBadgeReportID}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                                <label>Unique email required for all registrants</label><br/>
                                                <input type="radio" id="html" name="bUniqueEmailsForAddReg" value="1" onChange={(e)=>_handleChange(e)}/>
                                                <label className="radio-label">Enable</label><br/>
                                                <input type="radio" id="css" name="bUniqueEmailsForAddReg" value="0" onChange={(e)=>_handleChange(e)}/>
                                                <label className="radio-label">Disable</label><br/> 
                                                {errors.bUniqueEmailsForAddReg ? (<div className="errorMsg text-danger">{errors.bUniqueEmailsForAddReg}</div>) : ("")}
                                        </div>

                                        <div className="col-md-12 col-xs-12">
                                                <label>Allow to pay by check/Cash *</label><br/>
                                                <input type="radio" name="nAllowToPayByCheck" value="1"  checked={ (fields.nAllowToPayByCheck && fields.nAllowToPayByCheck==1) ? true : false } onChange={(e)=>_handleChange(e)}/>
                                                <label className="radio-label">Yes</label><br/>
                                                <input type="radio" name="nAllowToPayByCheck" value="0" checked={ (fields.nAllowToPayByCheck==0) ? true : false } onChange={(e)=>_handleChange(e)}/>
                                                <label className="radio-label">No</label><br/> 
                                                {errors.nAllowToPayByCheck ? (<div className="errorMsg text-danger">{errors.nAllowToPayByCheck}</div>) : ("")}
                                        </div>

                                        <div className="col-md-12 col-xs-12">
                                                <label>Access code for session tracking and Check In</label><br/>
                                                <input type="text" onChange={(e)=>_handleChange(e)} className="form-control" name="sAccessCode" value={accessCodes} placeholder="" disabled/>
                                                {/* {errors.sAccessCode ? (<div className="errorMsg text-danger">{errors.sAccessCode}</div>) : ("")} */}
                                        </div>
                                </div>
                                <div>
                                        <button type="submit" className="btn">Save</button>
                                </div>
                                </form>
                        </div>
                        </div>
                </div>
                </>
        );
}