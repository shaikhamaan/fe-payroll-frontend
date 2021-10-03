import React from "react";
import { CFormGroup, CInput, CLabel } from "@coreui/react";

const SimpleInput = ({
  id = "",
  title = "",
  placeholder = "",
  value = "",
  type = "text",
  className = "",
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  error,
  required = false,
  disabled = false,
  sideText,
}) => {
  return (
    <>
      <CLabel htmlFor={id}>
        {title}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </CLabel>
      <div
        className={`d-flex align-items-center ${className ? className : ""}`}
        style={{
          flex: 1,
          position: title ? null : "relative",
          bottom: title ? null : 1,
        }}
      >
        <CInput
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          style={{
            borderColor: error ? "#e55353" : "",
            flex: sideText ? 1 : null,
          }}
          disabled={disabled}
        />
        <div
          style={{
            width: "fit-content",
            marginLeft: 12,
          }}
        >
          {sideText}
        </div>
      </div>

      {error ? (
        <CLabel htmlFor={id} style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  );
};

export default SimpleInput;
