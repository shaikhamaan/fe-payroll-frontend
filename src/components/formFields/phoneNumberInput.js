import React from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { CLabel } from "@coreui/react";

function PhoneNumberInput({
  value = "",
  onChange = () => { },
  id = "",
  error = "",
  title = "",
  required = false,
  disabled
}) {
  return (
    <>
      <CLabel htmlFor={id}>
        {title}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </CLabel>
      <PhoneInput
        country={"in"}
        inputStyle={{
          width: "100%",
          backgroundColor: disabled ? "#d8dbe0" : null,
          opacity: disabled ? 1 : null
        }}
        value={value}
        onChange={onChange}
        id={id}
        error={error}
        required
        autoFormat={false}
        disabled={disabled}
        containerStyle={{
          border: error ? "1px solid #e55353" : ""
        }}
      />
      {error ? (
        <CLabel htmlFor={id} style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  );
}

export default PhoneNumberInput;
