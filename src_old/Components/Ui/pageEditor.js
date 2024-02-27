import React, { useEffect, useState } from "react";
//import { Editor } from "@tinymce/tinymce-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
const PageEditor = (props) => {
  const [value, setValue] = useState(props.initialValue ?? "");
  useEffect(() => setValue(props.initialValue ?? ""), [props.initialValue]);
  const selectionChange = (newValue) => {
    setValue(newValue);
    props.updatedData(newValue);
  };
  const modules = {
    toolbar: [
      { font: [] },
      { size: ["small", false, "large", "huge"] },
      "bold",
      "italic",
      "underline",
      "strike",
      { color: [] },
      { background: [] },
      { blockquote: [], "code-block": [] },
      "list",
      { direction: "rtl" },
      { align: [] },
      { header: [1, 2, 3, 4, 5, 6, false] },
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      "code",
      { script: "sub" },
      { script: "super" },
      "link",
      "image",
      "video",
      "clean",
    ],
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(newValue) => selectionChange(newValue)}
        modules={modules}
        name={props.editorType}
      />
    </>
  );
};
export default PageEditor;
