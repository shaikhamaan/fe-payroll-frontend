import React, { useState } from "react";
import {
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const PasswordInput = ({
  value,
  setValue,
  title = "Password",
  placeholder = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <CInputGroup>
      <CInputGroupPrepend>
        <CInputGroupText>
          <CIcon name="cil-lock-locked" />
        </CInputGroupText>
      </CInputGroupPrepend>
      <CInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type={showPassword ? "" : "password"}
        placeholder={placeholder}
        autoComplete="current-password"
      />
      <CInputGroupPrepend
        key={showPassword}
        onClick={() => setShowPassword(!showPassword)}
        style={{
          cursor: "pointer",
        }}
      >
        <CInputGroupText>
          <i className={`fas ${!showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
        </CInputGroupText>
      </CInputGroupPrepend>
    </CInputGroup>
  );
};

export default PasswordInput;
