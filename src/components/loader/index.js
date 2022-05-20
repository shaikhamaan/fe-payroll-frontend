import React from "react";
import { useSelector } from "react-redux";
import "../../../src/index.css";

function Loader(props) {
  if (!props.loading) {
    return null;
  }

  return (
    <div class="loading" style={{}}>
      Loading&#8230;
    </div>
  );
}

export default Loader;
