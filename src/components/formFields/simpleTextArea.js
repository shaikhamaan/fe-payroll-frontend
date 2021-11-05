import React from "react";
import { CLabel, CTextarea } from "@coreui/react";

const SimpleTextArea = ({
  id = "",
  title = "",
  placeholder = "",
  value = "",
  className = "",
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <>
      <CLabel htmlFor={id}>
        {title}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </CLabel>
      <CTextarea
        id={id}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        style={{ borderColor: error ? "#e55353" : "" }}
        disabled={disabled}
        rows={8}
      />

      {error ? (
        <CLabel htmlFor={id} style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  );
};

export default SimpleTextArea;
