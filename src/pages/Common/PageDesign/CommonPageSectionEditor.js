import React, { useState, useEffect } from "react";
import PageEditor from '../../../Components/Ui/pageEditor';
const CommonPageSectionEditor = (props) => {
    let pageDetail = {}
    const backData=(data)=>{
      if(props.editorCategory==='stepsTitleDesc'){
        pageDetail[props.editorType] = data
        props.backData(pageDetail)
      }else{
        props.backData(data);
      }
    }
    const fetchData = props.fetchData
return(
    <>
            <div
                        className="panel-group dashboard-table-format"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        <div className="panel panel-default">
                          <div
                            className="panel-heading"
                            role="tab"
                            id="headingOne"
                          >
                            <div className="panel-body">
                              <div className="card  mb-4">
                                <div className="card-body">
                                <label className="control-label">{props.pageTitle}</label>
                                  <PageEditor initialValue={fetchData} updatedData={(data)=>backData(data)} editorType={props.editorType} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
    </>
 )
}
export default CommonPageSectionEditor;