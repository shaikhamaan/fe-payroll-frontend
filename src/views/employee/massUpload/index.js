import React from "react";
import MassUploadAssets from "./massUploadAssets";
import MassUploadEmployees from "./massUploadEmployees";
import MassUploadAll from "./massUploadAll";

function MassUpload() {
  return (
    <div>
      <MassUploadAll />
      {/* <MassUploadAssets /> */}
    </div>
  );
}

export default MassUpload;
