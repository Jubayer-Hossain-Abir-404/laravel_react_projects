import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function StudentCreate(){

  const [loading, setloading] = useState(false);

  const [inputErrorList, setInputErrorList] = useState({});

  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value})
  }

  const saveStudent = (e) => {
    e.preventDefault();

    setloading(true);
    const data = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
    }

    axios.post(`http://localhost:8000/api/students`, data).then(
      res => {
        alert(res.data.message);
        setloading(false);
      })
      .catch(function (error){
        if(error.response){
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
            setloading(false);
          }

          if (error.response.status === 500) {
            alert(error.response.data);
            setloading(false);
          }
        }
      });
  }

  if (loading) {
    return <Loading />;
  }

    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Add Student</h4>
                  <Link to="/students" className="btn btn-danger float-end">
                    Back
                  </Link>
                </div>
                <div className="card-body">
                  <form onSubmit={saveStudent}>
                    <div className="mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleInput}
                        className="form-control"
                      />
                      <span className="text-danger">{inputErrorList.name}</span>
                    </div>
                    <div className="mb-3">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        value={student.email}
                        onChange={handleInput}
                        className="form-control"
                      />
                      <span className="text-danger">
                        {inputErrorList.email}
                      </span>
                    </div>
                    <div className="mb-3">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={student.phone}
                        onChange={handleInput}
                        className="form-control"
                      />
                      <span className="text-danger">
                        {inputErrorList.phone}
                      </span>
                    </div>
                    <div className="mb-3">
                      <label>Course</label>
                      <input
                        type="text"
                        name="course"
                        value={student.course}
                        onChange={handleInput}
                        className="form-control"
                      />
                      <span className="text-danger">{inputErrorList.course}</span>
                    </div>

                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary">
                        Save Student
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default StudentCreate;