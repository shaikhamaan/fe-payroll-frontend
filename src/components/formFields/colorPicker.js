import { CLabel } from "@coreui/react";
import React from "react";

const ColorPicker = ({ title, id, onChange, value }) => {
  return (
    <>
      <CLabel htmlFor={id}>{title} </CLabel>
      <input
        type="color"
        id={id}
        className="mx-3"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default ColorPicker;
