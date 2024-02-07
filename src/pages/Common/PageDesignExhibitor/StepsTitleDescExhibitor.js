import React, { useState, useEffect } from "react";
import CommonPageSectionEditor from "../PageDesign/CommonPageSectionEditor";
import "./index.css";

const StepsTitleDescExhibitor = (props) => {
  const [fields, setFields] = useState({ stepsTitleDesc: {} });
  useEffect(() => {
    if (props.fetchData) {
      let data = fields;
      data["stepsTitleDesc"] = {
        sStep1TitleExh: props.fetchData.sStep1TitleExh
          ? props.fetchData.sStep1TitleExh
          : "Welcome",
        sStep1DescExh: props.fetchData.sStep1DescExh
          ? props.fetchData.sStep1DescExh
          : "Enter the main contact email address",
        sStep1TextExh: props.fetchData.sStep1TextExh
          ? props.fetchData.sStep1TextExh
          : "",
        sStep2TitleExh: props.fetchData.sStep2TitleExh
          ? props.fetchData.sStep2TitleExh
          : "Company Info",
        sStep2DescExh: props.fetchData.sStep2DescExh
          ? props.fetchData.sStep2DescExh
          : "Enter the number of booth staff to register and click Next",
        sStep2TextExh: props.fetchData.sStep2TextExh
          ? props.fetchData.sStep2TextExh
          : "",
        sStep3TitleExh: props.fetchData.sStep3TitleExh
          ? props.fetchData.sStep3TitleExh
          : "Booth Staff",
        sStep3DescExh: props.fetchData.sStep3DescExh
          ? props.fetchData.sStep3DescExh
          : "Enter information for each booth staff",
        sStep3TextExh: props.fetchData.sStep3TextExh
          ? props.fetchData.sStep3TextExh
          : "",
        sStep4TitleExh: props.fetchData.sStep4TitleExh
          ? props.fetchData.sStep4TitleExh
          : "Other Questions",
        sStep4DescExh: props.fetchData.sStep4DescExh
          ? props.fetchData.sStep4DescExh
          : "Please answer all the required questions",
        sStep4TextExh: props.fetchData.sStep4TextExh
          ? props.fetchData.sStep4TextExh
          : "",
        sStep5TitleExh: props.fetchData.sStep5TitleExh
          ? props.fetchData.sStep5TitleExh
          : "Sessions Tickets",
        sStep5DescExh: props.fetchData.sStep5DescExh
          ? props.fetchData.sStep5DescExh
          : "Sessions and Tickets Options",
        sStep5TextExh: props.fetchData.sStep5TextExh
          ? props.fetchData.sStep5TextExh
          : "",
        sStep6TitleExh: props.fetchData.sStep6TitleExh
          ? props.fetchData.sStep6TitleExh
          : "Payment",
        sStep6DescExh: props.fetchData.sStep6DescExh
          ? props.fetchData.sStep6DescExh
          : "Payment Information",
        sStep6TextExh: props.fetchData.sStep6TextExh
          ? props.fetchData.sStep6TextExh
          : "",
        sStep7TitleExh: props.fetchData.sStep7TitleExh
          ? props.fetchData.sStep7TitleExh
          : "Review",
        sStep7DescExh: props.fetchData.sStep7DescExh
          ? props.fetchData.sStep7DescExh
          : "Review your information",
        sStep7TextExh: props.fetchData.sStep7TextExh
          ? props.fetchData.sStep7TextExh
          : "",
      };
      setFields({ ...data });
    }
  }, [props.fetchData]);

  useEffect(() => {
    if (fields.stepsTitleDesc) {
      props.backData(fields.stepsTitleDesc);
    }
  }, [fields.stepsTitleDesc]);

  const stepsTitleDescResult = (value) => {
    let data = fields;
    data["stepsTitleDesc"][Object.keys(value)] =
      Object.values(value).toString();
    setFields({ ...data });
  };

  const handleChange = (event) => {
    let data = fields;
    data["stepsTitleDesc"][event.target.name] = event.target.value;
    setFields({ ...data });
  };

  return (
    <>
      <div className="control-group">
        <label className="control-label">Step 1 Title</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep1TitleExh}
            onChange={(event) => handleChange(event)}
            id="step1_title"
            name="sStep1TitleExh"
            type="text"
          />
          Please enter One or 2 Words only.
        </div>
        <label className="control-label">Step 1 Description</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep1DescExh}
            onChange={(event) => handleChange(event)}
            id="step1_desc"
            name="sStep1DescExh"
            type="text"
          />
        </div>

        <div className="controls">
          <CommonPageSectionEditor
            pageTitle="Step 1 Text"
            editorCategory={"stepsTitleDesc"}
            backData={(data) => stepsTitleDescResult(data)}
            fetchData={fields.stepsTitleDesc?.sStep1TextExh}
            editorType={"sStep1TextExh"}
          />
        </div>

        <label className="control-label">Step 2 Title</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep2TitleExh}
            onChange={(event) => handleChange(event)}
            id="step2_title"
            name="sStep2TitleExh"
            type="text"
          />
          Please enter One or 2 Words only.
        </div>

        <label className="control-label">Step 2 Description</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep2DescExh}
            onChange={(event) => handleChange(event)}
            id="step2_desc"
            name="sStep2DescExh"
            type="text"
          />
        </div>

        <div className="controls">
          <CommonPageSectionEditor
            pageTitle="Step 2 Text"
            editorCategory={"stepsTitleDesc"}
            backData={(data) => stepsTitleDescResult(data)}
            fetchData={fields.stepsTitleDesc?.sStep2TextExh}
            editorType={"sStep2TextExh"}
          />
        </div>

        <label className="control-label">Step 3 Title</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep3TitleExh}
            onChange={(event) => handleChange(event)}
            id="step3_title"
            name="sStep3TitleExh"
            type="text"
          />
          Please enter One or 2 Words only.
        </div>

        <label className="control-label">Step 3 Description</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep3DescExh}
            onChange={(event) => handleChange(event)}
            id="step3_desc"
            name="sStep3DescExh"
            type="text"
          />
        </div>

        <div className="controls">
          <CommonPageSectionEditor
            pageTitle="Step 3 Text"
            editorCategory={"stepsTitleDesc"}
            backData={(data) => stepsTitleDescResult(data)}
            fetchData={fields.stepsTitleDesc?.sStep3TextExh}
            editorType={"sStep3TextExh"}
          />
        </div>

        <label className="control-label">Step 4 Title</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep4TitleExh}
            onChange={(event) => handleChange(event)}
            id="step4_title"
            name="sStep4TitleExh"
            type="text"
          />
          Please enter One or 2 Words only.
        </div>

        <label className="control-label">Step 4 Description</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep4DescExh}
            onChange={(event) => handleChange(event)}
            id="step4_desc"
            name="sStep4DescExh"
            type="text"
          />
        </div>

        <div className="controls">
          <CommonPageSectionEditor
            pageTitle="Step 4 Text"
            editorCategory={"stepsTitleDesc"}
            backData={(data) => stepsTitleDescResult(data)}
            fetchData={fields.stepsTitleDesc?.sStep4TextExh}
            editorType={"sStep4TextExh"}
          />
        </div>

        <label className="control-label">Step 5 Title</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep5TitleExh}
            onChange={(event) => handleChange(event)}
            id="step5_title"
            name="sStep5TitleExh"
            type="text"
          />
          Please enter One or 2 Words only.
        </div>

        <label className="control-label">Step 5 Description</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep5DescExh}
            onChange={(event) => handleChange(event)}
            id="step5_desc"
            name="sStep5DescExh"
            type="text"
          />
        </div>

        <div className="controls">
          <CommonPageSectionEditor
            pageTitle="Step 5 Text"
            editorCategory={"stepsTitleDesc"}
            backData={(data) => stepsTitleDescResult(data)}
            fetchData={fields.stepsTitleDesc?.sStep5TextExh}
            editorType={"sStep5TextExh"}
          />
        </div>

        <label className="control-label">Step 6 Title</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep6TitleExh}
            onChange={(event) => handleChange(event)}
            id="step6_title"
            name="sStep6TitleExh"
            type="text"
          />
          Please enter One or 2 Words only.
        </div>

        <label className="control-label">Step 6 Description</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep6DescExh}
            onChange={(event) => handleChange(event)}
            id="step6_desc"
            name="sStep6DescExh"
            type="text"
          />
        </div>

        <div className="controls">
          <CommonPageSectionEditor
            pageTitle="Step 6 Text"
            editorCategory={"stepsTitleDesc"}
            backData={(data) => stepsTitleDescResult(data)}
            fetchData={fields.stepsTitleDesc?.sStep6TextExh}
            editorType={"sStep6TextExh"}
          />
        </div>

        <label className="control-label">Step 7 Title</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep7TitleExh}
            onChange={(event) => handleChange(event)}
            id="step7_title"
            name="sStep7TitleExh"
            type="text"
          />
          Please enter One or 2 Words only.
        </div>

        <label className="control-label">Step 7 Description</label>
        <div className="controls">
          <input
            className="form-control"
            value={fields.stepsTitleDesc?.sStep7DescExh}
            onChange={(event) => handleChange(event)}
            id="step7_desc"
            name="sStep7DescExh"
            type="text"
          />
        </div>

        <div className="controls">
          <CommonPageSectionEditor
            pageTitle="Step 7 Text"
            editorCategory={"stepsTitleDesc"}
            backData={(data) => stepsTitleDescResult(data)}
            fetchData={fields.stepsTitleDesc?.sStep7TextExh}
            editorType={"sStep7TextExh"}
          />
        </div>
      </div>
    </>
  );
};
export default StepsTitleDescExhibitor;
