import React,{ useState, useEffect} from 'react';
import "./index.css";
import { MultiSelect } from "react-multi-select-component";

export function RegistrationCategoriesForm(props) {
    
    const [fields,setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [successStatus,setSuccessStatus] = useState(false);
    const [applyCheck] = useState(false);
    const [selectedRegTypes,setSelectedRegTypes] = useState([])
    const [selectedTemplate,setSelectedTemplate] = useState([])
    const [regTypes,setRegTypes] = useState([])
    var arrs = []

    const templateOptions = [
        { value: "1", label: "template1" },
        { value: "2", label: "template2" },
    ];

    useEffect(()=>{
        if(props.regCategoryByIdData!==undefined){
           setFields(props.regCategoryByIdData);
           if(props.regScodeData && props.regCategoryByIdData.sApplyToRegTypes && props.regCategoryId){
                var filteredArray = props.regScodeData.filter(function(itm){
                        return props.regCategoryByIdData.sApplyToRegTypes.includes(itm.value);
                });
                if(filteredArray){      
                    setSelectedRegTypes(filteredArray);
                }      

                if(templateOptions && props.regCategoryByIdData.sApplyToTemplates && props.regCategoryId){
                    var filteredArray2 = templateOptions.filter(function(itm){
                            return props.regCategoryByIdData.sApplyToTemplates.includes(itm.value);
                    });
                    if(filteredArray2){      
                        setSelectedTemplate(filteredArray2);
                    }      
                }
            }
        }
        if(props.clearFields){
            setFields({});
        }
    },[props.regCategoryByIdData]);

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

    useEffect(()=>{
        if(selectedTemplate){
            selectedTemplate.map((data, index) => (
                setApplyTemplates(data)
            ))
        }
     },[selectedTemplate]);

    const setApplyTemplates = (data) => {
        arrs[data.value] = data.label
        const arr2 = {...arrs}
        const regTemplates = Object.keys(arr2).join(',')
        fields['sApplyToTemplates'] = regTemplates
        setFields({...fields})
    }

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
    
    const submitRegCategoryInfo = async(event) => {
        event.preventDefault();
        if (_validateForm()) {
            if(props.userId && props.eventId){
                const postData = {
                    lAccountID: props.userId,
                    lEventID: props.eventId,
                    sCode: fields.sCode,
                    sName: fields.sName,
                    sApplyToRegTypes: fields.sApplyToRegTypes,
                    sApplyToTemplates: fields.sApplyToTemplates,
                    nStatus: fields.nStatus,
                }
                if(props.regCategoryId){
                    postData['lCategoryID'] = props.regCategoryId
                    props.updateRegCategories(postData);  
                }else{
                    props.saveRegCategories(postData);  
                }
                props.showModel(false); 
                
            }
        }
    }

    

  return (
    <>
            <div className="invitation-wrap">
                  <div className="container">
                    <div className="row login-wrap-new">
                        <div className="col-md-12 col-xs-12">
                            <div className="form-content">
                                <form onSubmit={(event) => submitRegCategoryInfo(event)}>
                                    <div className="row">
                                        <div className="col-12 ">
                                        {successStatus?<div className="successMsg text-success">Details saved Successfully</div>:''}
                                        <h4>Registration Categories Form</h4>
                                        </div>
                                        <div className="col-md-12 col-xs-12">
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
                                        <div className="col-md-12 col-xs-12">
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
                                        <div className="col-md-12 col-xs-12">
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
                                        <div className="col-md-12 col-xs-12">
                                            <MultiSelect
                                                name="sApplyToTemplates"
                                                className="form-control"
                                                options={templateOptions}
                                                value={selectedTemplate}
                                                onChange={setSelectedTemplate}
                                                labelledBy={"Select"}
                                                isCreatable={true}
                                            />
                                        </div>

                                        <div className="col-md-12 col-xs-12">
                                            <select name="nStatus" id="" className="form-control" onChange={(event) => handleChange(event)} value={fields?.nStatus}>
                                                <option value="0">Active </option>
                                                <option value="1">Deleted </option>
                                                <option value="2">Cancel </option>
                                            </select>
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