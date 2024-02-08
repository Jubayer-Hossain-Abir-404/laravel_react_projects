import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import Toaster from "../component/Toaster";

const StudentAdd = () => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [toaster, setToaster] = useState({
    state: false,
    toastBg: "",
    toastHeader: "",
    toastBodyMessage: "",
  });

  const setInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .post("http://127.0.0.1:8000/api/students", data)
      .then((response) => {
        setLoader(false);
        setToaster({
          state: true,
          toastBg: "Success",
          toastHeader: "Success",
          toastBodyMessage: response.data.message,
        });
        navigate("/students");
      })
      .catch((err) => {
        if (err.response) {
          setLoader(false);
          if (err.response.status === 422) {
            setErrorMessage(err.response.data.message);
          } 
          // else if (err.response.status === 500) {
          //     setToaster({
          //       state: true,
          //       toastBg: "Danger",
          //       toastHeader: "Error",
          //       toastBodyMessage: err.response.data.message,
          //     });
          // } 
          else {
           setToaster({
             state: true,
             toastBg: "Danger",
             toastHeader: "Error",
             toastBodyMessage: err.response.data.message,
           });
          }
        }
      });
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {toaster.state && <Toaster data = {toaster}/>}

      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="card col-6">
            <div className="card-header">
              Create Student
              <Link
                className="btn btn-danger float-end"
                to="/students"
                role="button"
              >
                Back
              </Link>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={(e) => setInputData(e)}
                    value={data.name ?? ""}
                  />
                  {errorMessage && (
                    <span className="text-danger">{errorMessage.name}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={(e) => setInputData(e)}
                    value={data.email ?? ""}
                  />
                  {errorMessage && (
                    <span className="text-danger">{errorMessage.email}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    Course
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="course"
                    name="course"
                    onChange={(e) => setInputData(e)}
                    value={data.course ?? ""}
                  />
                  {errorMessage && (
                    <span className="text-danger">{errorMessage.course}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    onChange={(e) => setInputData(e)}
                    value={data.phone ?? ""}
                  />
                  {errorMessage && (
                    <span className="text-danger">{errorMessage.phone}</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAdd;
