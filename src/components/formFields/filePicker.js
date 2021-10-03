import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { CCol, CLabel } from "@coreui/react";
import { useSnackbar } from "notistack";

const FilePicker = ({
  error,
  required,
  title,
  onFileSelect,
  accept = ".png, .jpg, .jpeg",
  imagePreview,
  disabled,
  uploadImageRef,
  id,
}) => {
  const imageInputRef = useRef();

  const [selectedImage, setSelectedImage] = useState();
  const [imageError, setImageError] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [url, setUrl] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fileSelect = (event) => {
    console.log("asdasdasd");
    setImageError("");
    setSelectedImage();
    var file = event.target.files[0];
    if (file?.size / 1024 > 1024 * 5) {
      enqueueSnackbar("Please choose an image below 5 MB", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      });
      setImageError("Please choose an image below 5 MB");
      return;
    }
    console.log(event.target.files, "event.target.files");
    onFileSelect(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
    console.log(selectedImage, event.target.files[0], "buuu");
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <CCol style={{ paddingLeft: 0, paddingRight: 0 }}>
      {title ? (
        <CLabel htmlFor={id}>
          {title}
          {required ? <span style={{ color: "red" }}> *</span> : null}
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
      />

      <div className="d-flex">
        {imagePreview ? (
          <div
            className="custom-filepicker-browse-button"
            style={{
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: 60,
              backgroundColor: disabled ? "#d8dbe0" : null,
              // opacity: disabled ? 1 : null,
            }}
          >
            {imagePreview(imagePath)}
          </div>
        ) : null}
        <div
          className="custom-filepicker-choose-input"
          style={
            imagePreview
              ? {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: disabled ? "#d8dbe0" : null,
                  opacity: disabled ? 1 : null,
                }
              : { backgroundColor: disabled ? "#d8dbe0" : null }
          }
        >
          {console.log(selectedImage, "selected")}
          {imagePath
            ? selectedImage?.name?.slice(0, 10) + "..."
            : // <img
              //   src={imagePath}
              //   style={{ height: 25, width: 25, marginRight: 10 }}
              // />
              "Choose File"}
        </div>
        <div
          className="custom-filepicker-browse-button"
          style={{
            // backgroundColor: disabled ? "#d8dbe0" : null,
            // opacity: disabled ? 0.6 : null,
            cursor: disabled ? "default" : "pointer",
          }}
        >
          <div
            onClick={() => imageInputRef.current.click()}
            ref={uploadImageRef}
          >
            {" "}
            Browse{" "}
          </div>
        </div>
      </div>

      {error ? <CLabel style={{ color: "red" }}>{error}</CLabel> : null}
    </CCol>
  );
};

export default FilePicker;
