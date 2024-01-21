import axios from 'axios';
import React, { useEffect, useState } from 'react'

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

  return (
    <div className="container mt-5">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Course</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students