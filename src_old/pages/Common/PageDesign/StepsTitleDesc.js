import React, { useState, useEffect } from "react";
import CommonPageSectionEditor from "./CommonPageSectionEditor";
import './index.css'

const StepsTitleDesc = (props) => {
  const [fields, setFields] = useState({stepsTitleDesc:{}});
  useEffect(()=>{
    if(props.fetchData){
        let data = fields
        data['stepsTitleDesc'] = {
            sStep1Title:props.fetchData.sStep1Title?props.fetchData.sStep1Title:'Welcome',
            sStep1Desc:props.fetchData.sStep1Desc?props.fetchData.sStep1Desc:'Enter your email address',
            sStep1Text:props.fetchData.sStep1Text,
            sStep1TextBottom:props.fetchData.sStep1TextBottom,
            sStep2Title:props.fetchData.sStep2Title?props.fetchData.sStep2Title:'Registration Type',
            sStep2Desc:props.fetchData.sStep2Desc?props.fetchData.sStep2Desc:'Select a registration type',
            sStep2Text:props.fetchData.sStep2Text,
            sStep2TextBottom:props.fetchData.sStep2TextBottom,
            sStep3Title:props.fetchData.sStep3Title?props.fetchData.sStep3Title:'Personal Information',
            sStep3Desc:props.fetchData.sStep3Desc?props.fetchData.sStep3Desc:'Enter your information',
            sStep3Text:props.fetchData.sStep3Text,
            sStep3TextBottom:props.fetchData.sStep3TextBottom,
            sStep4Title:props.fetchData.sStep4Title?props.fetchData.sStep4Title:'Other Questions',
            sStep4Desc:props.fetchData.sStep4Desc?props.fetchData.sStep4Desc:'Please answer all the required questions',
            sStep4Text:props.fetchData.sStep4Text,
            sStep4TextBottom:props.fetchData.sStep4TextBottom,
            sStep5Title:props.fetchData.sStep5Title?props.fetchData.sStep5Title:'Sessions Tickets',
            sStep5Desc:props.fetchData.sStep5Desc?props.fetchData.sStep5Desc:'Sessions and Tickets Options',
            sStep5Text:props.fetchData.sStep5Text,
            sStep5TextBottom:props.fetchData.sStep5TextBottom,
            sStep6Title:props.fetchData.sStep6Title?props.fetchData.sStep6Title:'Payment',
            sStep6Desc:props.fetchData.sStep6Desc?props.fetchData.sStep6Desc:'Payment Information',
            mPaymentTerms:props.fetchData.mPaymentTerms,
            sStep6Text:props.fetchData.sStep6Text,
            sStep6TextBottom:props.fetchData.sStep6TextBottom,
            sStep7Title:props.fetchData.sStep7Title?props.fetchData.sStep7Title:'Review',
            sStep7Desc:props.fetchData.sStep7Desc?props.fetchData.sStep7Desc:'Review Your Information',
            sStep7Text:props.fetchData.sStep7Text,
            sStep7TextBottom:props.fetchData.sStep7TextBottom,
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
                <input className="form-control" value={fields.stepsTitleDesc?.sStep1Title} onChange={(event)=>handleChange(event)} id="step1_title" name="sStep1Title" type="text"/> Please enter One or 2 Words only.
            </div>
            <label className="control-label">Step 1 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep1Desc} onChange={(event)=>handleChange(event)} id="step1_desc" name="sStep1Desc" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 1 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep1Text}
                    editorType={"sStep1Text"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 1 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep1TextBottom}
                    editorType={"sStep1TextBottom"}
                />    
            </div>
            
            <h4>Step 2 Detail</h4>
            <label className="control-label">Step 2 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep2Title} onChange={(event)=>handleChange(event)} id="step2_title" name="sStep2Title" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 2 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep2Desc} onChange={(event)=>handleChange(event)} id="step2_desc" name="sStep2Desc" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 2 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep2Text}
                    editorType={"sStep2Text"}
                />    
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 2 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep2TextBottom}
                    editorType={"sStep2TextBottom"}
                />     
            </div>
            
            <h4>Step 3 Detail</h4>
            <label className="control-label">Step 3 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep3Title} onChange={(event)=>handleChange(event)} id="step3_title" name="sStep3Title" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 3 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep3Desc} onChange={(event)=>handleChange(event)} id="step3_desc" name="sStep3Desc" type="text" />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 3 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep3Text}
                    editorType={"sStep3Text"}
                />  
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 3 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep3TextBottom}
                    editorType={"sStep3TextBottom"}
                />
            </div>


            <h4>Step 4 Detail</h4>
            <label className="control-label">Step 4 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep4Title} onChange={(event)=>handleChange(event)} id="step4_title" name="sStep4Title" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 4 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep4Desc} onChange={(event)=>handleChange(event)}id="step4_desc" name="sStep4Desc" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 4 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep4Text}
                    editorType={"sStep4Text"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 4 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep4TextBottom}
                    editorType={"sStep4TextBottom"}
                />
            </div>
            
            <h4>Step 5 Detail</h4>
            <label className="control-label">Step 5 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep5Title} onChange={(event)=>handleChange(event)} id="step5_title" name="sStep5Title" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 5 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep5Desc} onChange={(event)=>handleChange(event)} id="step5_desc" name="sStep5Desc" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 5 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep5Text}
                    editorType={"sStep5Text"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 5 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep5TextBottom}
                    editorType={"sStep5TextBottom"}
                />    
            </div>
            
            <h4>Step 6 Detail</h4>
            <label className="control-label">Step 6 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep6Title} onChange={(event)=>handleChange(event)} id="step6_title" name="sStep6Title" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 6 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep6Desc} onChange={(event)=>handleChange(event)} id="step6_desc" name="sStep6Desc" type="text"/>
            </div>
            
                <i>A check box will appear to the user with the text you entered. And the user will have to check the box in order to continue to the next step.</i>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Payment Terms"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.mPaymentTerms}
                    editorType={"mPaymentTerms"}
                />    
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 6 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep6Text}
                    editorType={"sStep6Text"}
                /> 
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 6 Text Bottom"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep6TextBottom}
                    editorType={"sStep6TextBottom"}
                />
            </div>
            
            <h4>Step 7 Detail</h4>
            <label className="control-label">Step 7 Title</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep7Title} onChange={(event)=>handleChange(event)} id="step7_title" name="sStep7Title" type="text"/> Please enter One or 2 Words only.
            </div>
            
            <label className="control-label">Step 7 Description</label>
            <div className="controls">
                <input className="form-control" value={fields.stepsTitleDesc?.sStep7Desc} onChange={(event)=>handleChange(event)} id="step7_desc" name="sStep7Desc" type="text"/>
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Step 7 Text Top"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep7Text}
                    editorType={"sStep7Text"}
                />
            </div>
            
            <div className="controls">
                <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the top of the page"
                    editorCategory={"stepsTitleDesc"}
                    backData={(data)=>stepsTitleDescResult(data)}
                    fetchData={fields.stepsTitleDesc?.sStep7TextBottom}
                    editorType={"sStep7TextBottom"}
                />    
            </div>
        </div>
    </>
  );
};
export default StepsTitleDesc;