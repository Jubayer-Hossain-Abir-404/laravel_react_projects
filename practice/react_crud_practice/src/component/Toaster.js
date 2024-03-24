import React, { useState } from 'react';
import Toast from "react-bootstrap/Toast";

const Toaster = (props) => {
  const [show, setShow] = useState(props.data.state);
  
  return (
    <>
      {
        <Toast
          className="d-inline-block m-2 position-absolute end-0"
          bg={props.data.toastBg.toLowerCase()}
          style={{ zIndex: 100 }}
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{props.data.toastHeader}</strong>
          </Toast.Header>
          <Toast.Body className="Dark text-white">
            {props.data.toastBodyMessage}
          </Toast.Body>
        </Toast>
      }
    </>
  );
}

export default Toaster