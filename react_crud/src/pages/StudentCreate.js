import { Link } from "react-router-dom";

function StudentCreate(){
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Add Student</h4>
                  <Link
                    to="/students"
                    className="btn btn-danger float-end"
                  >
                    Back
                  </Link>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label>Name</label>
                      <input type="text" name="name" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label>Email</label>
                      <input type="text" name="email" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label>Phone</label>
                      <input type="text" name="phone" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label>Course</label>
                      <input type="text" name="course" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label>Course</label>
                      <input type="text" name="course" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label>Course</label>
                      <input type="text" name="course" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <button type="submit"  className="btn btn-primary">Save Student</button>
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