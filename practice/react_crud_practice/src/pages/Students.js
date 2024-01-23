import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Students = () => {
   const [students, setStudent] = useState([]); 

    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/students`)
        .then((response) => {
          setStudent(response.data.students);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },[]);

    const deleteStudent = (id) => {
      axios
        .delete(`http://127.0.0.1:8000/api/students/${id}/delete`)
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
    }

  return (
    <div className="container mt-5">
      <div class="card">
        <div class="card-header">
          <Link
            className="btn btn-primary float-end"
            to="/students/add"
            role="button"
          >
            Add Student
          </Link>
        </div>
        <div class="card-body">
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
                      class="btn btn-warning me-3"
                      to={`/students/${user.id}/edit`}
                      role="button"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => deleteStudent(user.id)}
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