import React from "react";
import { CButton } from "@coreui/react";

const SimpleButton = ({
  title = "",
  className = "",
  style = {},
  color = "primary",
  onClick = () => { },
  type = "",
  ref,
  disabled
}) => {
  return (
    <CButton
      type={type}
      style={style}
      onClick={onClick}
      color={color}
      className={className}
      ref={ref}
      disabled={disabled}
    >
      {title}
    </CButton>
  );
};
export default SimpleButton;
