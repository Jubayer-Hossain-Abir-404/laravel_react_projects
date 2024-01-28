import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';

const Students = () => {
   const [students, setStudent] = useState([]); 
   const [loader, setLoader] = useState(true);

    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/students`)
        .then((response) => {
          setLoader(false);
          setStudent(response.data.students);
        })
        .catch((error) => {
          setLoader(false);
          console.log(error.response.data.message);
        });
    },[]);

    const deleteStudent = (studentId, e) => {
      axios
        .delete(`http://127.0.0.1:8000/api/students/${studentId}/delete`)
        .then((response) => {
          alert(response.data.message);
          // const element = document.getElementById("student-" + studentId);
          // element.remove(); // Removes the div with the 'div-02' id

          const row = e.target.closest("tr");

          if (row) {
            row.remove(); // Removes the table row
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    }

    if (loader) {
      return <Loader />;
    }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <Link
            className="btn btn-primary float-end"
            to="/students/add"
            role="button"
          >
            Add Student
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Course</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.course}</td>
                  <td>
                    <Link
                      className="btn btn-warning me-3"
                      to={`/students/${user.id}/edit`}
                      role="button"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => deleteStudent(user.id, e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students