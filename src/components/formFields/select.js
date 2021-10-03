import React from "react";
import { CSelect, CLabel } from "@coreui/react";

const Select = ({
  id = "",
  title = "",
  options = [],
  valueAccessor = "value",
  keyAccessor = "key",
  value = "",
  error,
  required,
  onChange = () => {},
  disabled = false,
  sideText,
  className,
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
          position: title ? null : "absolute",
          bottom: title ? null : 1,
        }}
      >
        <CSelect
          disabled={disabled}
          custom
          name={"select"}
          id={id}
          value={value}
          style={{
            borderColor: error ? "#e55353" : "",
            flex: sideText ? 1 : null,
          }}
          onChange={onChange}
        >
          {options?.map((item, index) => (
            <option value={item[valueAccessor]}>{item[keyAccessor]}</option>
          ))}
        </CSelect>
        <div style={{ width: "fit-content", marginLeft: 12 }}>{sideText}</div>
      </div>
      {error ? (
        <CLabel htmlFor={id} style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  );
};

export default Select;
