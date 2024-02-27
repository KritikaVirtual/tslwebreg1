import React,{ useState, useEffect} from 'react';
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
import "./index.css";

export function ExtraConfigurationSessionForm(props) {

        const [fields, setFields] = useState({'nStatus':0});
        const [errors, setErrors] = useState({});
        const [selectedRegTypes,setSelectedRegTypes] = useState([])
        var arrs = [];
        useEffect(()=>{
                if(props.extraConfigForSessionByIdData){
                        setFields(props.extraConfigForSessionByIdData)
                        if(props.regScodeData && props.extraConfigForSessionByIdData.sApplyToRegTypes){
                                var filteredArray = props.regScodeData.filter(function(itm){
                                        return props.extraConfigForSessionByIdData.sApplyToRegTypes.includes(itm.value);
                                });
                                if(filteredArray){      
                                setSelectedRegTypes(filteredArray);
                                }      
                        }                        
                }
                if(props.clearFields){
                        setFields({});
                }
        },[props.extraConfigForSessionByIdData])

        const _handleChange = (event) => {
                let data = fields;
                data[event.target.name] = event.target.value;
                setFields({ ...data });
        };

        useEffect(()=>{
                if(selectedRegTypes){
                    selectedRegTypes.map((data, index) => (
                        setApplyRegTypes(data)
                    ))
                }
             },[selectedRegTypes]);
        
        const setApplyRegTypes = (data) => {
                arrs[data.value] = data.label
                const arr2 = {...arrs}
                const regTypeValues = Object.keys(arr2).join(',')
                fields['sApplyToRegTypes'] = regTypeValues
                setFields({...fields})
        } 

        const validateRegistration = (fields) => {
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

            if (!fields["mLabel"] || fields["mLabel"].trim() === "") {
            formIsValid = false;
            errors["mLabel"] = "*Please enter the Label.";
            }
            
            if (!fields["lBeforeAfterItemID"] || fields["lBeforeAfterItemID"] === "") {
                formIsValid = false;
                errors["lBeforeAfterItemID"] = "*Please select the Session.";
            }

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
                if(props.userId && props.eventId){
                        const postData = fields;
                        if(props.itemId){
                                postData['lItemID'] = props.itemId
                                props.updateExtraConfigurationForSessions(postData)
                        }else{
                                props.addExtraConfigurationForSessions(postData)
                        }
                        props.showModel(false)
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
                                                <label className="event_label">Code</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="sCode" placeholder="Code" value={fields?.sCode}/>
                                                {errors.sCode ? (<div className="errorMsg text-danger">{errors.sCode}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Type</label><br/>
                                                <select id="nType" value={fields?.nType} name="nType" onChange={(e)=>_handleChange(e)} class="form-control"><option value="0">Separator</option><option role="option" value="1">Label only</option><option role="option" value="2">Label with textbox</option></select>
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Position</label><br/>
                                                <select name="nPosition" value={fields?.nPosition} onChange={(e)=>_handleChange(e)} class="form-control"><option value="0">Before</option><option role="option" value="1">After</option></select>
                                                </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Session</label><br/>
                                                <select name="lBeforeAfterItemID" value={fields?.lBeforeAfterItemID} onChange={(e)=>_handleChange(e)} size="1" class="form-control">
                                                <option value="">Select Session</option>
                                                        {props.getIndividualSessionData?
                                                        props.getIndividualSessionData.map((data, index) => (
                                                                <option value={data.lSessionID}>{data.sCode}</option>
                                                        )):''}
                                                        
                                                        </select>
                                                {errors.lBeforeAfterItemID ? (<div className="errorMsg text-danger">{errors.lBeforeAfterItemID}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Label</label><br/>
                                                <input type="text" className="form-control" value={fields?.mLabel} onChange={(e)=>_handleChange(e)} name="mLabel" placeholder="Label" />
                                                {errors.mLabel ? (<div className="errorMsg text-danger">{errors.mLabel}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Size</label><br/>
                                                <select name="nSize" value={fields?.nSize} onChange={(e)=>_handleChange(e)} class="form-control"><option value="0">N/A</option><option role="option" value="1">Small Textbox</option><option role="option" value="2">Medium Textbox</option><option role="option" value="3">Large Textbox</option><option role="option" value="4">Multi-line Textbox</option></select>
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Required</label><br/>
                                                <select name="nRequired" value={fields?.nRequired} onChange={(e)=>_handleChange(e)} class="form-control"><option value="0">No</option><option role="option" value="1">Yes</option></select>
                                        </div>

                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Status</label><br/>
                                                <select name="nStatus"  onChange={(e)=>_handleChange(e)} className="form-control"  value={fields?.nStatus} >
                                                <option value="0">Active </option>
                                                <option value="1">Deleted</option>
                                                <option value="2">Cancelled</option>
                                                </select>
                                        </div>

                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Apply To Reg Types</label><br/>
                                                <MultiSelect
                                                name="sApplyToRegTypes"
                                                className="form-control"
                                                options={props.regScodeData}
                                                value={selectedRegTypes}
                                                onChange={setSelectedRegTypes}
                                                labelledBy={"Select"}
                                                isCreatable={true}
                                            />
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