import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SET_LOADER } from "src/redux/actions";
import ModalButton from "../../buttons/modalButton";
// import { SET_LOADER } from "../redux/actions";
// import { disableMilestoneTasks } from "./apis";

const DisableModal = (props) => {
  const {
    setDisableModalVisible,
    disableModalVisible,
    secondaryCtaFunction = () => {
    },
    primaryCtaFunction = () => {

    },
    primaryText = "",
    secondaryText = "",
    innerText = "",
    loader = false
  } = props;
  const dispatch = useDispatch();
  const toggle = () => setDisableModalVisible(!disableModalVisible);

  // const disableTask = () => {
  //   dispatch({ type: SET_LOADER, payload: true });

  //   disableMilestoneTasks(task, () => {
  //     setRefresh(refresh + 1);
  //     setDisableModalVisible();
  //     dispatch({ type: SET_LOADER, payload: false });
  //   });
  // };
  return (
    <div>
      <Modal isOpen={disableModalVisible} toggle={toggle}>
        <ModalHeader toggle={toggle}>Disable</ModalHeader>
        <ModalBody>
          {innerText}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="cancel-btn" style={{ background: "none", border: "none", fontWeight: "bold", color: "#54a3b3" }} onClick={secondaryCtaFunction}>
            {secondaryText}
          </Button>{" "}
          <div onClick={primaryCtaFunction}>
            <ModalButton loader={loader} title={primaryText} />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DisableModal;
