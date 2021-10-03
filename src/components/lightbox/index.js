import React from "react";
import { SRLWrapper } from "simple-react-lightbox";

const CustomLightBox = ({ children }) => {
  return (
    <SRLWrapper
      options={{
        buttons: {
          showAutoplayButton: false,
          showCloseButton: true,
          showDownloadButton: false,
          showFullscreenButton: true,
          showNextButton: false,
          showPrevButton: false,
          showThumbnailsButton: false,
        },
        thumbnails: { showThumbnails: false },
      }}
    >
      {children}
    </SRLWrapper>
  );
};

export default CustomLightBox;
