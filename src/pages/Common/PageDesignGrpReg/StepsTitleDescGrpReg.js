import React, { useState, useEffect } from "react";
import CommonPageSectionEditor from "../PageDesign/CommonPageSectionEditor";
import './index.css'

const StepsTitleDescGrpReg = (props) => {
  const [fields, setFields] = useState({stepsTitleDesc:{}});
  useEffect(()=>{
    if(props.fetchData){
        let data = fields
        data['stepsTitleDesc'] = {
            sStep1TitleGroup:props.fetchData.sStep1TitleGroup?props.fetchData.sStep1TitleGroup:'Welcome',
            sStep1DescGroup:props.fetchData.sStep1DescGroup?props.fetchData.sStep1DescGroup:'Enter your email address',
            sStep1TextGroup:props.fetchData.sStep1TextGroup?props.fetchData.sStep1TextGroup:'',
            sStep1TextBottomGroup:props.fetchData.sStep1TextBottomGroup?props.fetchData.sStep1TextBottomGroup:'',
            sStep2TitleGroup:props.fetchData.sStep2TitleGroup?props.fetchData.sStep2TitleGroup:'Registration Type',
            sStep2DescGroup:props.fetchData.sStep2DescGroup?props.fetchData.sStep2DescGroup:'Select a registration type',
            sStep2TextGroup:props.fetchData.sStep2TextGroup?props.fetchData.sStep2TextGroup:'',
            sStep2TextBottomGroup:props.fetchData.sStep2TextBottomGroup?props.fetchData.sStep2TextBottomGroup:'',
            sStep3TitleGroup:props.fetchData.sStep3TitleGroup?props.fetchData.sStep3TitleGroup:'Personal Information',
            sStep3DescGroup:props.fetchData.sStep3DescGroup?props.fetchData.sStep3DescGroup:'Enter your information',
            sStep3TextGroup:props.fetchData.sStep3TextGroup?props.fetchData.sStep3TextGroup:'',
            sStep3TextBottomGroup:props.fetchData.sStep3TextBottomGroup?props.fetchData.sStep3TextBottomGroup:'',
            sStep4TitleGroup:props.fetchData.sStep4TitleGroup?props.fetchData.sStep4TitleGroup:'Other Questions',
            sStep4DescGroup:props.fetchData.sStep4DescGroup?props.fetchData.sStep4DescGroup:'Please answer all the required questions',
            sStep4TextGroup:props.fetchData.sStep4TextGroup?props.fetchData.sStep4TextGroup:'',
            sStep4TextBottomGroup:props.fetchData.sStep4TextBottomGroup,
            sStep5TitleGroup:props.fetchData.sStep5TitleGroup?props.fetchData.sStep5TitleGroup:'Sessions Tickets',
            sStep5DescGroup:props.fetchData.sStep5DescGroup?props.fetchData.sStep5DescGroup:'Sessions and Tickets Options',
            sStep5TextGroup:props.fetchData.sStep5TextGroup?props.fetchData.sStep5TextGroup:'',
            sStep5TextBottomGroup:props.fetchData.sStep5TextBottomGroup?props.fetchData.sStep5TextBottomGroup:'',
            sStep6TitleGroup:props.fetchData.sStep6TitleGroup?props.fetchData.sStep6TitleGroup:'Payment',
            sStep6DescGroup:props.fetchData.sStep6DescGroup?props.fetchData.sStep6DescGroup:'Payment Information',
            mPaymentTermsGroup:props.fetchData.mPaymentTermsGroup?props.fetchData.mPaymentTermsGroup:'',
            sStep6TextGroup:props.fetchData.sStep6TextGroup?props.fetchData.sStep6TextGroup:'',
            sStep6TextBottomGroup:props.fetchData.sStep6TextBottomGroup?props.fetchData.sStep6TextBottomGroup:'',
            sStep7TitleGroup:props.fetchData.sStep7TitleGroup?props.fetchData.sStep7TitleGroup:'Review',
            sStep7DescGroup:props.fetchData.sStep7DescGroup?props.fetchData.sStep7DescGroup:'Review Your Information',
            sStep7TextGroup:props.fetchData.sStep7TextGroup?props.fetchData.sStep7TextGroup:'',
            sStep7TextBottomGroup:props.fetchData.sStep7TextBottomGroup?props.fetchData.sStep7TextBottomGroup:'',
        }
        setFields({...data})
    }
  },[props.fetchData])

  useEffect(()=>{
    if(fields.stepsTitleDesc){
        props.backData(fields.stepsTitleDesc)
    }
  },[fields.stepsTitleDesc])

  const stepsTitleDescResult = (value)=>{
    let data = fields
    data['stepsTitleDesc'][Object.keys(value)] = Object.values(value).toString()
    setFields({...data})
  }

  const handleChange = (event)=>{
    let data = fields
    data['stepsTitleDesc'][event.target.name] = event.target.value
    setFields({...data})
  }
  
   
  return (
    <>
        <div className="control-group">
            <h4>Step 1 Detail</h4>
            <label className="control-label">Step 1 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep1TitleGroup} onChange={(event)=>handleChange(event)} id="step1_title" name="sStep1TitleGroup" type="text"/> Please enter One or 2 Words only.
            </div>
            <label className="control-label">Step 1 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep1DescGroup} onChange={(event)=>handleChange(event)} id="step1_desc" name="sStep1DescGroup" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 1 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep1TextGroup}
                    editorType={"sStep1TextGroup"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 1 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep1TextBottomGroup}
                    editorType={"sStep1TextBottomGroup"}
                />    
            </div>
            
            <h4>Step 2 Detail</h4>
            <label className="control-label">Step 2 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep2TitleGroup} onChange={(event)=>handleChange(event)} id="step2_title" name="sStep2TitleGroup" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 2 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep2DescGroup} onChange={(event)=>handleChange(event)} id="step2_desc" name="sStep2DescGroup" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 2 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep2TextGroup}
                    editorType={"sStep2TextGroup"}
                />    
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 2 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep2TextBottomGroup}
                    editorType={"sStep2TextBottomGroup"}
                />     
            </div>
            
            <h4>Step 3 Detail</h4>
            <label className="control-label">Step 3 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep3TitleGroup} onChange={(event)=>handleChange(event)} id="step3_title" name="sStep3TitleGroup" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 3 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep3DescGroup} onChange={(event)=>handleChange(event)} id="step3_desc" name="sStep3DescGroup" type="text" />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 3 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep3TextGroup}
                    editorType={"sStep3TextGroup"}
                />  
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 3 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep3TextBottomGroup}
                    editorType={"sStep3TextBottomGroup"}
                />
            </div>


            <h4>Step 4 Detail</h4>
            <label className="control-label">Step 4 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep4TitleGroup} onChange={(event)=>handleChange(event)} id="step4_title" name="sStep4TitleGroup" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 4 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep4DescGroup} onChange={(event)=>handleChange(event)}id="step4_desc" name="sStep4DescGroup" type="text"/>
            </div>
            
            <div className="controls">  
                <CommonPageSectionEditor
                    pageTitle="Step 4 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep4TextGroup}
                    editorType={"sStep4TextGroup"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 4 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep4TextBottomGroup}
                    editorType={"sStep4TextBottomGroup"}
                />
            </div>
            
            <h4>Step 5 Detail</h4>
            <label className="control-label">Step 5 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep5TitleGroup} onChange={(event)=>handleChange(event)} id="step5_title" name="sStep5TitleGroup" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 5 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep5DescGroup} onChange={(event)=>handleChange(event)} id="step5_desc" name="sStep5DescGroup" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 5 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep5TextGroup}
                    editorType={"sStep5TextGroup"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 5 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep5TextBottomGroup}
                    editorType={"sStep5TextBottomGroup"}
                />    
            </div>
            
            <h4>Step 6 Detail</h4>
            <label className="control-label">Step 6 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep6TitleGroup} onChange={(event)=>handleChange(event)} id="step6_title" name="sStep6TitleGroup" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 6 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep6DescGroup} onChange={(event)=>handleChange(event)} id="step6_desc" name="sStep6DescGroup" type="text"/>
            </div>
            
                <i>A check box will appear to the user with the text you entered. And the user will have to check the box in order to continue to the next step.</i>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Payment Terms"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.mPaymentTermsGroup}
                    editorType={"mPaymentTermsGroup"}
                />    
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 6 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep6TextGroup}
                    editorType={"sStep6TextGroup"}
                /> 
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 6 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep6TextBottomGroup}
                    editorType={"sStep6TextBottomGroup"}
                />
            </div>
            
            <h4>Step 7 Detail</h4>
            <label className="control-label">Step 7 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep7TitleGroup} onChange={(event)=>handleChange(event)} id="step7_title" name="sStep7TitleGroup" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 7 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep7DescGroup} onChange={(event)=>handleChange(event)} id="step7_desc" name="sStep7DescGroup" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 7 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep7TextGroup}
                    editorType={"sStep7TextGroup"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the top of the page"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep7TextBottomGroup}
                    editorType={"sStep7TextBottomGroup"}
                />    
            </div>
        </div>
    </>
  );
};
export default StepsTitleDescGrpReg;