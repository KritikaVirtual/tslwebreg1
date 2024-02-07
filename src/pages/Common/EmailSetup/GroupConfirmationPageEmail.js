import React, { useState, useEffect } from "react";
import CommonPageSectionEditor from "../PageDesign/CommonPageSectionEditor";

const GroupConfirmationPageEmail = (props) => {

  const [groupConfirmationPageEmail,setGroupConfirmationPageEmail] = useState("")

  const groupConfirmationPageEmailResult = (data) => {
    setGroupConfirmationPageEmail(data)
  };

  useEffect(()=>{
    if(groupConfirmationPageEmail){
        let result = {}
        result['mConfirmationEmailTextGrp'] = groupConfirmationPageEmail
        props.backData(result)
    }
  },[groupConfirmationPageEmail])

  return (
    <>
      <div
        className="panel-group dashboard-table-format"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        <div className="row table-responsive">
          <div className="col-sm-12 col-md-12">
            <div class="card-body">
              <p>
                Enter the text you want to show in the GROUP confirmation email
              </p>
              <p>
                You must put the tag [Sections_Group_Email] in the template and
                this tag will be changed for the standard sections for group
                registration.
              </p>
            </div>
            <div className="dataTables_length" id="dataTable_length">
              <div className="controls">
                <CommonPageSectionEditor
                  pageTitle=""
                  editorCategory={"confirmationEmail"}
                  editorType={"confirmationEmail"}
                  backData={(data) => groupConfirmationPageEmailResult(data)}
                  fetchData={
                    props.groupConfirmationPageEmail
                      ? props.groupConfirmationPageEmail
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupConfirmationPageEmail;
