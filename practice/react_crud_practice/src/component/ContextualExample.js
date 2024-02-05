import Toast from "react-bootstrap/Toast";

function ContextualExample() {
  return (
    <>
      {
        <Toast
          className="d-inline-block m-2 float-end"
          bg={"Danger".toLowerCase()}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Message</strong>
          </Toast.Header>
          <Toast.Body className="Dark text-white">
            Hello, world! This is a toast message.
          </Toast.Body>
        </Toast>
      }
    </>
  );
}

export default ContextualExample;
