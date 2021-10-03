import React, { useState } from "react";
import { getFileTypeFromPresSignedUrl } from "src/utils/files";
import FilePreviewModal from "./modal";
import { BsImageFill } from "react-icons/bs";
import { AiFillFilePdf } from "react-icons/ai";

const ImagePreview = ({
  onClickDelete,
  url: urlFromProps,
  filePath,
  fileDetails,
}) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (urlFromProps || filePath) {
    return (
      <div style={{}}>
        {getFileTypeFromPresSignedUrl(filePath) !== "pdf" ? (
          <a onClick={() => setIsModalOpen(true)} key={filePath}>
            <BsImageFill
              style={{ fontSize: 30, color: "#0000FF", cursor: "pointer" }}
            />
          </a>
        ) : (
          <a
            onClick={() => setIsModalOpen(true)}
            key={filePath}
            style={{ textDecoration: "none" }}
          >
            <AiFillFilePdf
              style={{ fontSize: 30, color: "#FF0000", cursor: "pointer" }}
            />
          </a>
        )}
        <FilePreviewModal
          setIsModalVisible={setIsModalOpen}
          isModalVisible={isModalOpen}
          filePath={filePath}
          url={urlFromProps}
          fileDetails={fileDetails}
          onClickDelete={onClickDelete}
        />
      </div>
    );
  }
  return null;
};

export default ImagePreview;