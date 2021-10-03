import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SET_LOADER } from "src/redux/actions";
import { getPresignedUrl } from "src/views/employee/add/api";
import ModalButton from "../buttons/modalButton";
import SimpleButton from "../buttons/simpleButton";
import SimpleReactLightbox from "simple-react-lightbox";
import CustomLightBox from "../lightbox";
import { getFileTypeFromPresSignedUrl } from "src/utils/files";
import Colors from "src/constants/colors";
import Skeleton from "react-loading-skeleton";

const FilePreviewModal = (props) => {
  const {
    setIsModalVisible,
    isModalVisible,
    filePath,
    url: urlFromProps = "",
    fileDetails,
    onClickDelete,
  } = props;
  const toggle = () => setIsModalVisible(!isModalVisible);
  const [url, setUrl] = useState(urlFromProps);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (filePath && isModalVisible && !urlFromProps) {
      setLoader(true);
      getPresignedUrl(
        {
          filePath: filePath,
        },
        (data) => {
          if (data?.status === "success") {
            setUrl(data?.urls[0]);
            setLoader(false);
          } else {
            setLoader(false);
          }
        },
        () => {
          setLoader(false);
        }
      );
    }
  }, [filePath, isModalVisible, urlFromProps]);

  return (
    <div>
      <Modal isOpen={isModalVisible} toggle={toggle}>
        <ModalHeader toggle={toggle}>Preview</ModalHeader>
        <ModalBody className="d-flex flex-column align-items-center">
          {loader ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : getFileTypeFromPresSignedUrl(url) !== "pdf" ? (
            <SimpleReactLightbox>
              <CustomLightBox>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => {
                      console.log("asdassssss");
                    }}
                    src={url}
                    style={{ height: 200, width: 300, marginRight: 2 }}
                    key={url}
                    alt="img"
                  />
                </div>
              </CustomLightBox>
            </SimpleReactLightbox>
          ) : (
            <a
              key={filePath}
              style={{ textDecoration: "none" }}
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <embed
                style={{
                  pointerEvents: "none",
                  height: 200,
                  width: 300,
                }}
                name="plugin"
                src={url}
                type="application/pdf"
              ></embed>
            </a>
          )}
          {onClickDelete ? (
            <span
              onClick={async () => {
                await onClickDelete();
                toggle();
              }}
            >
              <i
                className="far fa-trash-alt image-delete-icon"
                style={{
                  color: Colors?.red,
                  marginTop: 20,
                  fontSize: 22,
                  cursor: "pointer",
                }}
              ></i>
            </span>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <div className="float-left">
            {getFileTypeFromPresSignedUrl(url) !== "pdf" ? (
              <SimpleReactLightbox>
                <CustomLightBox>
                  <a
                    key={filePath}
                    style={{ textDecoration: "none" }}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SimpleButton
                      onClick={() => {
                        console.log("asdassssss");
                      }}
                      href={url}
                      title="View in Full Screen"
                      color="success"
                    />
                  </a>
                </CustomLightBox>
              </SimpleReactLightbox>
            ) : (
              <a href={url} target="_blank">
                <SimpleButton title="View in New Tab" />
              </a>
            )}
          </div>
          <div onClick={toggle}>
            <ModalButton title={"Close"} />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FilePreviewModal;
