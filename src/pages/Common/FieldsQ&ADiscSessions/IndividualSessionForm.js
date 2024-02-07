import React,{ useState, useEffect} from 'react';
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
import "./index.css";

export function IndividualSessionForm(props) {

        const [fields, setFields] = useState({'nStatus':0});
        const [errors, setErrors] = useState({});
        const [selectedRegTypes,setSelectedRegTypes] = useState([])
        const [autoTicketForRegTypes,setAutoTicketForRegTypes] = useState([])
        var arrs = [];
        useEffect(()=>{
                if(props.individualSessionDataByIdData){
                        // let individualSessionData = {
                        //         sCode:props.individualSessionDataByIdData.sCode?props.individualSessionDataByIdData.sCode:'',
                        //         sName:props.individualSessionDataByIdData.sName?props.individualSessionDataByIdData.sName:'',
                        //         nMaxQty:props.individualSessionDataByIdData.nMaxQty?props.individualSessionDataByIdData.nMaxQty:'',
                        //         dPrice1:props.individualSessionDataByIdData.dPrice1?props.individualSessionDataByIdData.dPrice1:'',
                        //         dtPrice1:props.individualSessionDataByIdData.dtPrice1?moment(props.individualSessionDataByIdData.dtPrice1).format("YYYY-MM-DD"):'',
                        //         dPrice2:props.individualSessionDataByIdData.dPrice2?props.individualSessionDataByIdData.dPrice2:'',
                        //         dtPrice2:props.individualSessionDataByIdData.dtPrice2?moment(props.individualSessionDataByIdData.dtPrice2).format("YYYY-MM-DD"):'',
                        //         dPrice3:props.individualSessionDataByIdData.dPrice3?props.individualSessionDataByIdData.dPrice3:'',
                        //         dtPrice3:props.individualSessionDataByIdData.dtPrice3?moment(props.individualSessionDataByIdData.dtPrice3).format("YYYY-MM-DD"):'',
                        //         bPrintTicket:props.individualSessionDataByIdData.bPrintTicket?props.individualSessionDataByIdData.bPrintTicket:'',
                        //         sPrintTicketText:props.individualSessionDataByIdData.sPrintTicketText?props.individualSessionDataByIdData.sPrintTicketText:'',
                        //         sApplyToRegTypes:props.individualSessionDataByIdData.sApplyToRegTypes?props.individualSessionDataByIdData.sApplyToRegTypes:'',
                        //         sAutoTicketForRegTypes:props.individualSessionDataByIdData.sAutoTicketForRegTypes?props.individualSessionDataByIdData.sAutoTicketForRegTypes:'',
                        //         nStatus:props.individualSessionDataByIdData.nStatus?props.individualSessionDataByIdData.nStatus:''
                        // }
                        setFields(props.individualSessionDataByIdData)
                        
                }
                if(props.clearFields){
                        setFields({});
                }
        },[props.individualSessionDataByIdData])

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
        useEffect(()=>{
                if(autoTicketForRegTypes){
                        autoTicketForRegTypes.map((data, index) => (
                        setAutoTicketForRegTypesCall(data)
                    ))
                }
             },[autoTicketForRegTypes]);
        
        const setAutoTicketForRegTypesCall = (data) => {
                arrs[data.value] = data.label
                const arr2 = {...arrs}
                const regTypeValues = Object.keys(arr2).join(',')
                fields['sAutoTicketForRegTypes'] = regTypeValues
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

            if (!fields["sName"] || fields["sName"].trim() === "") {
            formIsValid = false;
            errors["sName"] = "*Please enter the Name.";
            }
        
            if (!fields["nMaxQty"] || fields["nMaxQty"] === "") {
              formIsValid = false;
              errors["nMaxQty"] = "*Please enter the Max Qty.";
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
                        if (
                                sessionStorage.getItem("lSessionID") !== undefined &&
                                sessionStorage.getItem("lSessionID") > 0
                        ) {
                                postData['lSessionID'] = sessionStorage.getItem("lSessionID")
                                props.updateIndividualSession(postData)
                        }else{
                                props.addIndividualSession(postData)
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
                                                <label className="event_label">Max Qty</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="nMaxQty" placeholder="Max Qty" value={fields?.nMaxQty} />
                                                {errors.nMaxQty ? (<div className="errorMsg text-danger">{errors.nMaxQty}</div>) : ("")}
                                                </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Price 1</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="dPrice1" placeholder="Price1" value={fields?.dPrice1} />
                                                {errors.dPrice1 ? (<div className="errorMsg text-danger">{errors.dPrice1}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Price 1 Date</label><br/>
                                                <input type="date" className="form-control" onChange={(e)=>_handleChange(e)} name="dtPrice1" placeholder="date Price" value={fields.dtPrice1 ? moment(fields?.dtPrice1).format("YYYY-MM-DD"): ''} />
                                                {errors.dtPrice1 ? (<div className="errorMsg text-danger">{errors.dtPrice1}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Price 2</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="dPrice2" placeholder="Price2" value={fields?.dPrice2} />
                                                {errors.dPrice2 ? (<div className="errorMsg text-danger">{errors.dPrice2}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Price 2 Date</label><br/>
                                                <input type="date" className="form-control" onChange={(e)=>_handleChange(e)} name="dtPrice2" placeholder="date price 2" value={fields.dtPrice2 ? moment(fields?.dtPrice2).format("YYYY-MM-DD") : ''} />
                                                {errors.dtPrice2 ? (<div className="errorMsg text-danger">{errors.dtPrice2}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Price 3</label><br/>
                                                <input type="text" className="form-control" onChange={(e)=>_handleChange(e)} name="dPrice3" placeholder="Price3" value={fields?.dPrice3} />
                                                {errors.dPrice3 ? (<div className="errorMsg text-danger">{errors.dPrice3}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Price 3 Date</label><br/>
                                                <input type="date" className="form-control" onChange={(e)=>_handleChange(e)} name="dtPrice3" placeholder="date Price3" value={fields.dtPrice3 ? moment(fields?.dtPrice3).format("YYYY-MM-DD") : ''} />
                                                {errors.dtPrice3 ? (<div className="errorMsg text-danger">{errors.dtPrice3}</div>) : ("")}
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Print</label><br/>
                                                <select name="bPrintTicket" onChange={(e)=>_handleChange(e)} className="form-control"  value={fields?.bPrintTicket} >
                                                <option value="0">No</option>
                                                <option value="1">Yes </option>
                                                </select>
                                        </div>
                                         
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Print Text</label><br/>
                                                <textarea name="sPrintTicketText" className="form-control" onChange={(e)=>_handleChange(e)}>{fields?.sPrintTicketText}</textarea>
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

                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Auto ticket for Reg Types</label><br/>
                                                <MultiSelect
                                                name="sAutoTicketForRegTypes"
                                                className="form-control"
                                                options={props.regScodeData}
                                                value={autoTicketForRegTypes}
                                                onChange={setAutoTicketForRegTypes}
                                                labelledBy={"Select"}
                                                isCreatable={true}
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12 event_modal">
                                                <label className="event_label">Status</label><br/>
                                                <select name="nStatus" onChange={(e)=>_handleChange(e)} className="form-control"  value={fields?.nStatus} >
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