import React, { useState, useEffect } from "react";
import "./index.css";

export default function RegistrantsFields(props) {

  const [fields,setFields] = useState([])
  
  const _handleSubmit = event =>{
      props.updateRegistrantFields(fields)
  }

  useEffect(()=>{
    if(props.registrantFieldsData){
        let data=fields
        props.registrantFieldsData.map((value,index)=>{
            data[value.sName]={
                bVisible : value.bVisible,
                bRequired : value.bRequired                
            }
        })
        setFields({...data})
    }
},[props.registrantFieldsData])

  const callPageRecords = registrantFieldsData => {
      if(registrantFieldsData){
          return registrantFieldsData.map((data,index) => (
              <tr key={index}>
                  <td>{data.sName}</td>
                  <td><input onChange={(event)=>_handleChange(event)} type="checkbox" id={data.sName} name="bVisible" value={data.bVisible} defaultChecked={data.bVisible===1?true:false}/></td>
                  <td><input onChange={(event)=>_handleChange(event)} type="checkbox" id={data.sName} name="bRequired" value={data.bRequired} defaultChecked={data.bRequired===1?true:false}/></td>
              </tr>
          ))
      }
  }

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

  return (
    <>
      <div
        className="panel-group dashboard-table-format"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <div className="panel-body">
              <div className="card  mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="dataTable_wrapper"
                      className="dataTables_wrapper dt-bootstrap4"
                    >
                      <table className="table table-striped table-bordered check-box-wrap">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th>Field Name</th>
                            <th>Visible</th>
                            <th>Required</th>
                          </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>First Name</td>
                            <td><input type="checkbox" checked disabled/></td>
                            <td><input type="checkbox" checked disabled/></td>
                        </tr>

                        <tr>
                            <td>Last Name</td>
                            <td><input type="checkbox" checked disabled/></td>
                            <td><input type="checkbox" checked disabled/></td>
                        </tr>

                        {props.registrantFieldsData?callPageRecords(props.registrantFieldsData):<tr><td>No Records Found</td></tr>}
                        
                        <tr>
                          <td>Email</td>
                          <td><input type="checkbox" checked disabled/></td>
                          <td><input type="checkbox" disabled/></td>
                        </tr>
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
  );
}
