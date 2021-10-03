import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { CCol, CLabel } from "@coreui/react";
import CustomLightBox from "../lightbox";
import { useLightbox } from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import { getPresignedUrl } from "src/views/employee/add/api";
import { useSelector } from "react-redux";
import classNames from "classnames";
import mapSeries from "async/mapSeries";
import { useSnackbar } from "notistack";

const MultiFilesPicker = ({
  error,
  required,
  title,
  onFileSelect,
  disabled,
  accept = ".png, .jpg, .jpeg",
}) => {
  const imageInputRef = useRef();
  const { openLightbox } = useLightbox();

  const [selectedImage, setSelectedImage] = useState();
  const [imageError, setImageError] = useState("");
  const [imagePath, setImagePath] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fileSelect = (event) => {
    console.log("asdasdasd");
    setImageError("");
    setSelectedImage();
    var filesList = event.target.files;
    var validFiles = [];
    var inValidFiles = [];
    var files = Array.from(filesList);
    if (files?.length > 3) {
      enqueueSnackbar("You can upload only 3 files", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      });
      return
    }
    mapSeries(
      files,
      async (docFile, async_callback) => {
        if (docFile?.size / 1024 > 1024 * 5) {
          inValidFiles?.push(docFile);
          console.log("error h bhai");
        } else {
          validFiles?.push(docFile);
        }
        async_callback(null, null);
      },
      (err, result) => {
        if (inValidFiles?.length > 0) {
          enqueueSnackbar("Please choose an image below 5 MB", {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
          });
        }
        console.log(validFiles, "valFiles");
        onFileSelect(validFiles);
        setSelectedImage(files);
        var urlsList = [];
        for (let i = 0; i < validFiles.length; i++) {
          var fileUrl = URL.createObjectURL(validFiles[i]);
          urlsList.push(fileUrl);
        }
        setImagePath(urlsList);
      }
    );
  };

  return (
    <CCol style={{ paddingLeft: 0 }}>
      {title ? (
        <CLabel>
          {title} {required ? "*" : null}
        </CLabel>
      ) : null}

      <input
        ref={imageInputRef}
        type="file"
        class="custom-file-input"
        onChange={fileSelect}
        accept={accept}
        style={{ display: "none" }}
        disabled={disabled}
        multiple
      />

      <div className="d-flex">
        {/* {url[0]} */}
        <div className="d-flex custom-filepicker-choose-input"
        style={{
          backgroundColor: disabled ? "#d8dbe0" : null,
        }}
        >
          {imagePath?.length > 0
            ? imagePath?.length + " files"
            : // imagePath?.slice(0, 2)?.map((item) => (
              //     <img
              //       // onClick={() => openLightbox()}
              //       src={item}
              //       style={{ height: 25, width: 25, marginRight: 10 }}
              //     />
              //   ))
              "Choose File"}
        </div>
        <div
          className="custom-filepicker-browse-button"
          onClick={() => imageInputRef.current.click()}
          style={{
            backgroundColor: disabled ? "#d8dbe0" : null,
          }}
        >
          <div> Browse </div>
        </div>
      </div>

      {/* {error ? <CLabel style={{ color: "#e55353" }}>{error}</CLabel> : null}
      <div style={{ display: "none" }} key={imagePath}>
        <CustomLightBox>
          <img
            src={imagePath ? imagePath : imagePath}
            style={{ height: 300, width: 300 }}
          />
        </CustomLightBox>
      </div> */}
    </CCol>
  );
};

export default MultiFilesPicker;
