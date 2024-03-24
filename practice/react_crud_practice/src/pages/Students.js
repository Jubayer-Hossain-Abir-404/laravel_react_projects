import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';
import  * as Constants  from '../shared/Constant';
import Toaster from '../component/Toaster';

const Students = () => {
   const [students, setStudent] = useState([]); 
   const [loader, setLoader] = useState(true);

     const [toaster, setToaster] = useState({
       state: false,
       toastBg: "",
       toastHeader: "",
       toastBodyMessage: "",
     });

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
          const row = e.target.closest("tr");
        
          if (row) {
             row.remove();
          }
          
          setToaster({
            state: true,
            toastBg: "Success",
            toastHeader: "Success",
            toastBodyMessage: response.data.message,
          });
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            setToaster({
              state: true,
              toastBg: "Danger",
              toastHeader: "Error",
              toastBodyMessage: err.response.data.message,
            });
          }
        });
      setToaster({
        state: false,
        toastBg: "",
        toastHeader: "",
        toastBodyMessage: "",
      });
    }

    if (loader) {
      return <Loader />;
    }

  return (
    <>
      {toaster.state && <Toaster data={toaster} />}

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
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Course</th>
                    <th scope="col">Degree Type</th>
                    <th scope="col">Countries</th>
                    <th scope="col">Is Married</th>
                    <th scope="col">Range</th>
                    <th scope="col">Image</th>
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
                      <td>{Constants.DEGREE_TYPE[user.degree_type] ?? ""}</td>
                      <td>{user.countries}</td>
                      <td>{Constants.IS_MARRIED[user.isMarried] ?? ""}</td>
                      <td>{user.range}</td>
                      <td>
                        {user.file && (
                          <img
                            src={user.file}
                            width={"140px"}
                            height={"120px"}
                            alt="Display"
                          />
                        )}
                      </td>
                      <td className="text-nowrap">
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
      </div>
    </>
  );
}

export default Students