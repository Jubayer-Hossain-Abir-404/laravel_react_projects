import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StudentEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");

  const params = useParams()

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/students/${params.id}/edit`)
      .then((response) => {
        setName(response.data.student.name);
        setEmail(response.data.student.email);
        setPhone(response.data.student.phone);
        setCourse(response.data.student.course);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [params.id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      phone: phone,
      course: course,
    };
    axios
      .put(`http://127.0.0.1:8000/api/students/${params.id}/edit`, data)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
          // client received an error response (5xx, 4xx)
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }
      });
  };
  
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
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3">
              <label for="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label for="course" className="form-label">
                Course
              </label>
              <input
                type="text"
                className="form-control"
                id="course"
                name="course"
                onChange={(e) => setCourse(e.target.value)}
                value={course}
              />
            </div>
            <div className="mb-3">
              <label for="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
