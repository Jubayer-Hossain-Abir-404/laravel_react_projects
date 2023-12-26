import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Student(){

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/students`).then(res => {
            console.log(res);
            setStudents(res.data.students);
            setLoading(false);
        });
    }, []);


    if(loading){
        return (
            <Loading />
        )
    }


    var studentDetails = "";
    studentDetails = students.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                    <Link to="/" className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <Link to="/" className="btn btn-danger">Delete</Link>
                </td>
            </tr>
        )
    });

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Students List</h4>
                <Link to="/students/create" className="btn btn-primary float-end">
                  Add Student
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>{studentDetails}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Student;