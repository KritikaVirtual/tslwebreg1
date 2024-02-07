import React,{ useState, useEffect} from 'react';
import "./index.css";

export default function RegistrantFieldSetup(props) {

    const [fields,setFields] = useState([])

    const _handleSubmit = event =>{
        props.updateRegistrantFieldSetup(fields)
    }

    useEffect(()=>{
        if(props.registrantFieldData){
            let data=fields
            props.registrantFieldData.map((value,index)=>{
                data[value.sName]={
                    bRequired : value.bRequired,
                    bVisible : value.bVisible
                }
            })
            setFields({...data})
        }
    },[props.registrantFieldData])

    const _handleChange = event =>{
        const inputId= event.target.id
        const inputname= event.target.name
        let data = fields
        if(event.target.checked){
            data[inputId][inputname]=1
        }else{
            data[inputId][inputname]=0
        }
        setFields({...data})
    }

    const callPageRecords = registrantFieldData => {
        if(registrantFieldData){
            return registrantFieldData.map((data,index) => (
                <tr key={index}>
                    <td>{data.sName}</td>
                    <td><input onChange={(event)=>_handleChange(event)} type="checkbox" id={data.sName} name="bRequired" value={data.bRequired} defaultChecked={data.bRequired===1?true:false}/></td>
                    <td><input onChange={(event)=>_handleChange(event)} type="checkbox" id={data.sName} name="bVisible" value={data.bVisible} defaultChecked={data.bVisible===1?true:false}/></td>
                </tr>
            ))
        }
    }
    // console.log(fields)
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
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr className="bg-primary text-white">
                                                    <th>Field Name</th>
                                                    <th>Required</th>
                                                    <th>Visible</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.registrantFieldData?callPageRecords(props.registrantFieldData):<tr><td>No Records Found</td></tr>}
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