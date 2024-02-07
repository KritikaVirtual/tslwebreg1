import React,{ useState, useEffect} from 'react';
import "./index.css";

export default function RegistrantsInformation(props) {
    const [fieldValue,setFieldValue]=useState([])

    const fieldNameData = props.fieldNameData
    const regTypeData = props.regTypeData

    useEffect(()=>{
        if(fieldNameData){
            let data = fieldValue
            fieldNameData.map((datas,indexs)=>{
                const sVisible = datas.sVisible
                const sRequired = datas.sRequired
                data[datas.sCode] = {
                    sVisible : sVisible,
                    sRequired : sRequired
                }
                setFieldValue({...data})
            })
        }
    },[fieldNameData])
    
    const _handleChange = event =>{
        const checkboxType = event.target.id
        const checkboxValue = event.target.value
        const checkboxName = event.target.name
        let data = fieldValue            
        if(!data[checkboxName]){
            data[checkboxName] = {[checkboxType] : checkboxValue}
        }else{
            if(!data[checkboxName][checkboxType]){
                data[checkboxName][checkboxType]=checkboxValue
            }else{
                if(event.target.checked){
                    data[checkboxName][checkboxType] = data[checkboxName][checkboxType]+ ','+checkboxValue
                }else{
                    if(data[checkboxName][checkboxType].indexOf(','+checkboxValue)!=-1 ){
                        data[checkboxName][checkboxType] = data[checkboxName][checkboxType].replace(','+checkboxValue,'')
                    }else if(data[checkboxName][checkboxType].indexOf(checkboxValue+',')!=-1){
                        data[checkboxName][checkboxType] = data[checkboxName][checkboxType].replace(checkboxValue+',' , '')
                    }else{
                        data[checkboxName][checkboxType] = data[checkboxName][checkboxType].replace(checkboxValue,'')
                    }
                    
                }
            }
        }
        setFieldValue({...data})
    }

    const _handleSubmit = () => {
        if(fieldValue){
            props.updateRegInfo(fieldValue)
        }
    }

    const callRegTypes = (regTypes,sCode,valueChecked,checkboxType) =>{
        if(regTypes){
            let checkedVal = false
            return regTypes.map((data, index) => (
            <>  
                {checkedVal = valueChecked.indexOf(data.lRegTypeID) != -1 ? true : false}
                <li><input type="checkbox" id={checkboxType} onChange={(event)=>_handleChange(event)} name={sCode} value={data.lRegTypeID} defaultChecked={checkedVal} /><label>{data.sCode} </label><br/></li>
                </>
            ))
        }
    }
    const callPageRecords = fieldData => {
        if(fieldData){
            return fieldData.map((data, index) => (
                <tr key={data.lQuestionID}>
                    <td>{data.sName}</td>
                    {regTypeData?
                    <>
                    <td>
                        <ul key={index}>{callRegTypes(regTypeData,data.sCode,data.sVisible,'sVisible')}</ul>
                    </td>
                    <td>
                        <ul key={index}>{callRegTypes(regTypeData,data.sCode,data.sRequired,'sRequired')}</ul>
                    </td></>:''}
                </tr>
              ));
        }
    }
    
    return (
        <>
            <div className="panel-group dashboard-table-format" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                        <div className="panel-body">
                            <div className="card  mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <table className="table table-striped table-bordered check-box-wrap">
                                                <thead>
                                                    <tr className="bg-primary text-white">
                                                        <th>Field Name</th>
                                                        <th>Visible</th>
                                                        <th>Required</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fieldNameData?callPageRecords(fieldNameData):''}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={(event) => _handleSubmit(event)}
                className="btn btn-save"
              >
                Save
              </button>
            </div>
        </>
    )
}