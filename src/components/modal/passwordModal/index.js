import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SET_LOADER } from "src/redux/actions";
import SimpleButton from "../../buttons/simpleButton";
import SimpleInput from "../../formFields/simpleInput";
import copy from "copy-to-clipboard";
import "./style.css";
import { useSnackbar } from "notistack";
import ReactTooltip from "react-tooltip";
import { getUserPassword } from "src/views/employee/add/api";
// import { SET_LOADER } from "../redux/actions";
// import { deleteMilestoneTasks } from "./apis";

const PasswordModal = (props) => {
  const {
    passwordModalVisible,
    secondaryCtaFunction = () => {},
    organizationId = "",
  } = props;
  const dispatch = useDispatch();
  const toggle = () => secondaryCtaFunction();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userCredentials, setUserCredentials] = useState({});
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    getUserPassword(
      organizationId,
      (data) => {
        console.log(data, "datamera");
        if (data?.status == "failed") {
          console.log("I am here");
          setShowPassword(false);
        }
        setUserCredentials({
          office_email: data?.data?.office_email,
          password: data?.data?.password,
        });
      },
      () => {
        console.log("Not found");
      }
    );
  }, [passwordModalVisible]);

  return (
    <div>
      <Modal isOpen={passwordModalVisible} toggle={toggle}>
        <ModalHeader toggle={toggle}>User's Credentials</ModalHeader>
        <ModalBody
          style={{
            flexDirection: "column",
            display: "flex",
          }}
        >
          {showPassword === true ? (
            <div>
              <div>Login Id : {userCredentials?.office_email}</div>
              <div>Password : {userCredentials?.password}</div>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Password has been resetted
            </div>
          )}
        </ModalBody>
        {showPassword ? (
          <ModalFooter className="password_modal_footer">
            <Button
              className="password_modal_copy_button"
              onClick={() => {
                copy(
                  `User Id : ${userCredentials?.office_email}\nPassword : ${userCredentials?.password}`
                );
                enqueueSnackbar("Credentials copied to clipboard.", {
                  variant: "success",
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                });
              }}
            >
              <span>Click here to copy the Credentials</span>
              <span>
                <i className="ml-2 fas fa-copy"></i>
              </span>
            </Button>
            <a
              href={`mailto:${userCredentials?.office_email}?subject=Credentials&body=UserId:${userCredentials?.office_email}%0D%0APassword:${userCredentials?.password}`}
              data-tip="Mail Credentials"
              target="_blank"
            >
              <i className="fas fa-envelope mail-icon"></i>
            </a>
            <ReactTooltip />
          </ModalFooter>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default PasswordModal;
