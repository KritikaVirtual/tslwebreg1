import React,{ useState, useEffect} from 'react';
import { MultiSelect } from "react-multi-select-component";
import "./index.css";

export function CustomQuestionsForm(props) {

        const [fields, setFields] = useState({});
        const [errors, setErrors] = useState({});
        const [selectedRegTypes,setSelectedRegTypes] = useState([])

        var arrs = []

        useEffect(()=>{
                if(props.customQuestionsByIdData){
                        setFields(props.customQuestionsByIdData)
                        if(props.regScodeData && props.customQuestionsByIdData.sApplyToRegTypes){
                                var filteredArray = props.regScodeData.filter(function(itm){
                                        return props.customQuestionsByIdData.sApplyToRegTypes.includes(itm.value);
                                });
                                if(filteredArray){      
                                setSelectedRegTypes(filteredArray);
                                }      
                        }
                }
                if(props.clearFields){
                        setFields({});
                }
        },[props.customQuestionsByIdData])

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

        const _handleChange = (event) => {
                let data = fields;
                data[event.target.name] = event.target.value;
                if(event.target.name=='sAnswers'){
                        data[event.target.name] = event.target.value.split("\n")
                }
                setFields({ ...data });
        };

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

            if (!fields["sName"] || fields["sName"].trim() === "") {
            formIsValid = false;
            errors["sName"] = "*Please enter the Name.";
            }
        
            if (!fields["nOrder"] || fields["nOrder"] === "") {
              formIsValid = false;
              errors["nOrder"] = "*Please enter the Order value.";
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
                        const postData = fields
                        console.log('questionId',props.questionId)
                        if(props.questionId){
                                postData['lQuestionID'] = props.customQuestionsByIdData.lQuestionID
                                props.updateCustomQuestions(postData)
                        }else{
                                props.addCustomQuestions(postData)
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
                                                <label className="event_label">Name</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="sName" placeholder="Name" value={fields?.sName} />
                                                {errors.sName ? (<div className="errorMsg text-danger">{errors.sName}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Type</label><br/>
                                                <select id="nType" name="nType" onChange={(e)=>_handleChange(e)} className="form-control" value={fields?.nType}><option role="option" value="0">Text</option><option role="option" value="1">Radio buttons</option><option role="option" value="2">Check Boxes</option><option role="option" value="3">Dropdown</option></select>
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Choices</label><br/>
                                                <textarea className="form-control" name="sAnswers" onChange={(e)=>_handleChange(e)} placeholder="choices"></textarea>
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Required</label><br/>
                                                <select id="bRequired" name="bRequired" onChange={(e)=>_handleChange(e)} className="form-control" value={fields?.bRequired}><option role="option" value="0">No</option><option role="option" value="1">Yes</option></select>
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
                                                {/* <select multiple="multiple" id="sApplyToRegTypes" onChange={(e)=>_handleChange(e)} name="sApplyToRegTypes" className="form-control" value={fields?.sApplyToRegTypes}><option role="option" value="280">ATT</option><option role="option" value="-1">EXH</option></select> */}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Order</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="nOrder" placeholder="Order" value={fields?.nOrder}/>
                                                {errors.nOrder ? (<div className="errorMsg text-danger">{errors.nOrder}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Status</label><br/>
                                                <select name="nStatus" onChange={(e)=>_handleChange(e)} className="form-control" placeholder="Accunt Type" value={fields?.nStatus} >
                                                <option value="0">Active </option>
                                                <option value="1">Deleted</option>
                                                <option value="2">Cancelled</option>
                                                </select>
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