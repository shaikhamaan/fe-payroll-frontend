import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SET_LOADER } from "src/redux/actions";
import ModalButton from "../buttons/modalButton";
import SimpleButton from "../buttons/simpleButton";
import SimpleInput from "../formFields/simpleInput";
// import { SET_LOADER } from "../redux/actions";
// import { deleteMilestoneTasks } from "./apis";

const CustomModal = (props) => {
  const {
    setIsModalVisible,
    isModalVisible,
    secondaryCtaFunction = () => {},
    primaryCtaFunction = () => {},
    primaryText = "",
    secondaryText = "",
    innerText = "",
    title = "",
    loader = false,
    color = "",
    placeholder = "",
    input = false,
    status = "",
  } = props;
  const toggle = () => setIsModalVisible(!isModalVisible);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      <Modal isOpen={isModalVisible} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <div>{innerText}</div>
          {input ? (
            <SimpleInput
              placeholder={placeholder}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              value={inputText}
            />
          ) : null}
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="cancel-btn"
            style={{
              background: "none",
              border: "none",
              fontWeight: "bold",
              color: "#54a3b3",
            }}
            onClick={secondaryCtaFunction}
          >
            {secondaryText}
          </Button>{" "}
          <div
            onClick={() => {
              if (status) {
                if (status === "Rejected" && !inputText) {
                  setError("Note is required");
                  return;
                } else {
                  primaryCtaFunction(status, inputText);
                }
              } else {
                primaryCtaFunction();
              }
            }}
          >
            <ModalButton loader={loader} title={primaryText} color={color} />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;
