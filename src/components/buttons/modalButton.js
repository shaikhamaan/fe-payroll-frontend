import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader/index';
import { Spinner } from "react-bootstrap";
import colors from 'src/constants/colors';
import Colors from 'src/constants/colors';

function ModalButton({
  title,
  loader,
  color,
  type,
  className = "",
  style = {},
  onClick = () => { },
  ref }) {
  return (
    <button
      disabled={loader}
      className="default-btn"
      style={{ outline: "none", backgroundColor: color ? color : Colors?.red }}
      type={type}
    >
      {loader ? (
        <Spinner animation="border" role="status" style={{ width: 25, height: 25 }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
        // <Loader loading={loading} />
      ) :
        title
      }
    </button>
  )
}

export default ModalButton

