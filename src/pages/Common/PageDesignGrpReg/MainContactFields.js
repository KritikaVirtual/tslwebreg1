import React, { useState, useEffect } from "react";
import "./index.css";

export default function MainContactFields(props) {
  const [fieldValue, setFieldValue] = useState("");
  const fieldNameData = props.fieldNameData ? props.fieldNameData : "";

  useEffect(() => { 
    if (fieldNameData!==undefined) { 
      let data = fieldValue;  
      fieldNameData.map((datas,index) => {
        const bVisibleGrpReg = datas.bVisibleGrpReg ? datas.bVisibleGrpReg : '';
        const bRequiredGrpReg = datas.bRequiredGrpReg ? datas.bRequiredGrpReg: '';
        data[datas.sName] = {   
               bVisibleGrpReg: bVisibleGrpReg,
               bRequiredGrpReg: bRequiredGrpReg
        }; 
      });
      setFieldValue({ ...data });
    }
  }, [fieldNameData]);

  const _handleChange = (event) => {
    const inputId= event.target.id
    const inputname= event.target.name
    let data = fieldValue
    if(event.target.checked){
        data[inputId][inputname]=1
    }else{
        data[inputId][inputname]=0
    }
    setFieldValue({ ...data });
  };

  const _handleSubmit = () => {
    if (fieldValue) {
      props.updateMainContactFields(fieldValue)
    }
  };

  const callPageRecords = fieldNameData => {
    if(fieldNameData){
        return fieldNameData.map((data,index) => (
            <tr key={index}>
                <td>{data.sName}</td>
                <td><input onChange={(event)=>_handleChange(event)} type="checkbox" id={data.sName} name="bVisibleGrpReg" value={data.bVisibleGrpReg} defaultChecked={data.bVisibleGrpReg===1?true:false}/></td>
                <td><input onChange={(event)=>_handleChange(event)} type="checkbox" id={data.sName} name="bRequiredGrpReg" value={data.bRequiredGrpReg} defaultChecked={data.bRequiredGrpReg===1?true:false}/></td>
            </tr>
        ))
    }
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
                          {fieldNameData ? callPageRecords(fieldNameData) : "" }
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
