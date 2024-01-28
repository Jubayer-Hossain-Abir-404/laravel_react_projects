import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";

const StudentEdit = () => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  const setInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const params = useParams()

  useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/students/${params.id}/edit`)
        .then((response) => {
          setData(response.data.student);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.log(error.response.data.message);
        });
  }, [params.id]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .put(`http://127.0.0.1:8000/api/students/${params.id}/edit`, data)
      .then((response) => {
        alert(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        if (err.response) {
          setLoader(false);
          console.log(err.response);
        }
      });
  };
  
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          Edit Student
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
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentEdit;
