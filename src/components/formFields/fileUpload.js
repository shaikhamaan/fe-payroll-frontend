import React, { useState, useRef } from "react";
import _ from "lodash";
import { CInputFile, CCol, CLabel } from "@coreui/react";

const FileUpload = ({ required, title, onFileSelect, className }) => {
  const imageInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [imagePath, setImagePath] = useState("");
  const fileSelect = (event) => {
    console.log("asdasdasd");
    // setImageError("");
    setSelectedFile();
    var file = event.target.files[0];
    console.log(event.target.files, "event.target.files");
    onFileSelect(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <CLabel>
        {title} {required ? "*" : null}
      </CLabel>
      <CCol>
        <div class="">
          <input
            type="file"
            class="custom-file-input"
            // id="inputGroupFile01"
            onChange={fileSelect}
            accept=".xlsx"
            className={className}
          />
          <label class="custom-file-label" for="inputGroupFile01">
            {selectedFile?.name ? selectedFile?.name : "Choose file"}
          </label>
        </div>
      </CCol>
    </>
  );
};

export default FileUpload;
