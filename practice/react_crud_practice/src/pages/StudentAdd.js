import axios from "axios";
import React, { useState } from "react";
import { Link
  , useNavigate 
} from "react-router-dom";
import Loader from "../component/Loader";
import Toaster from "../component/Toaster";
import { MultiSelect } from "react-multi-select-component";

const StudentAdd = () => {
  const countries = [
    { label: "Bangladesh", value: "BD" },
    { label: "India", value: "IND" },
    { label: "USA", value: "USA" },
    { label: "Nepal", value: "NEP" },
    { label: "UK", value: "UK" },
    { label: "Pakistan", value: "PAK" },
  ];

  const [selected, setSelected] = useState([]);

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

  const [file, setFile] = useState(
    "https://as1.ftcdn.net/v2/jpg/05/72/90/54/1000_F_572905428_MwCL0yVHtIUbTGKBQGq0Z2PKuNEdtRLo.jpg"
  );
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setData({ ...data, file: e.target.files[0] });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    let selectedCountries = [];
    if (selected.length > 0) {
      selectedCountries = selected.map((x) => x.value);
      setData({ ...data, countries: selectedCountries });
    }
    console.log(data);
    //return;
    axios
      .post("http://127.0.0.1:8000/api/students", {
        ...data,
        countries: selectedCountries,
      })
      .then((response) => {
        setLoader(false);
        if (response.data.status === 200) {
          setToaster({
            state: true,
            toastBg: "Success",
            toastHeader: "Success",
            toastBodyMessage: response.data.message,
          });
          navigate("/students");
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoader(false);
          if (err.response.status === 422) {
            setErrorMessage(err.response.data.message);
          }
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
      {toaster.state && <Toaster data={toaster} />}

      <div className="container my-5">
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
                <div className="mb-3">
                  <label htmlFor="degree_type" className="form-label">
                    Degree Type
                  </label>
                  <select
                    className="form-select"
                    aria-label="Small select example"
                    id="degree_type"
                    name="degree_type"
                    onChange={(e) => setInputData(e)}
                    value={data.degree_type ?? ""}
                  >
                    <option value="0">Select</option>
                    <option value="1">BSC</option>
                    <option value="2">MSC</option>
                  </select>
                  {errorMessage && (
                    <span className="text-danger">
                      {errorMessage.degree_type}
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="countries" className="form-label">
                    Select Countries
                  </label>
                  <MultiSelect
                    options={countries}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                  {errorMessage && (
                    <div className="text-danger">
                      {Object.keys(errorMessage).map((key) => {
                        if (key.startsWith("countries")) {
                          return errorMessage[key].map((error, index) => (
                            <span key={index}>
                              {error}
                              <br />
                            </span>
                          ));
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Image Upload
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                  {file && (
                    <img
                      className="my-2"
                      src={file}
                      width={"180px"}
                      height={"160px"}
                      alt="Display"
                    />
                  )}
                  <br/>
                  {errorMessage && (
                    <span className="text-danger">{errorMessage.file}</span>
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
