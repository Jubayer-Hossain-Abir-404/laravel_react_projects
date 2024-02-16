import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";
import Toaster from "../component/Toaster";
import { MultiSelect } from "react-multi-select-component";

const StudentEdit = () => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);
  const [toaster, setToaster] = useState({
    state: false,
    toastBg: "",
    toastHeader: "",
    toastBodyMessage: "",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countries = [
    { label: "Bangladesh", value: "BD" },
    { label: "India", value: "IND" },
    { label: "USA", value: "USA" },
    { label: "Nepal", value: "NEP" },
    { label: "UK", value: "UK" },
    { label: "Pakistan", value: "PAK" },
  ];

  const setInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState();

  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/students/${params.id}/edit`)
      .then((response) => {
        //console.log(response.data);
        setData(response.data.student);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.response.data.message);
      });
  }, [params.id]);

  const [selected, setSelected] = useState([]);
  const [allowedSelect, setAllowedSelect] = useState(true);

  useEffect(() => {
    if (data.countries && allowedSelect) {
      const savedCountries = data.countries.split(",");
      const selectedCountries = countries.filter((country) =>
        savedCountries.includes(country.value)
      );
      setSelected(selectedCountries);
      setAllowedSelect(false);
    }
  }, [countries, data.countries, selected, allowedSelect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    let selectedCountries = [];
    // if (selected.length > 0) {
    //   selectedCountries = selected.map((x) => x.value);
    //   setData({ ...data, countries: selectedCountries });
    // }
    axios
      .put(`http://127.0.0.1:8000/api/students/${params.id}/edit`, {
        ...data,
        countries: selectedCountries,
      })
      .then((response) => {
        setToaster({
          state: true,
          toastBg: "Success",
          toastHeader: "Success",
          toastBodyMessage: response.data.message,
        });
        setLoader(false);
      })
      .catch((err) => {
        if (err.response) {
          setLoader(false);
          if (err.response.status === 422) {
            setErrorMessage(err.response.data.message);
          } else {
            setToaster({
              state: true,
              toastBg: "Danger",
              toastHeader: "Error",
              toastBodyMessage: err.response.data.message,
            });
          }
          console.log(err.response);
        }
      });
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {toaster.state && <Toaster data={toaster} />}
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="card col-6">
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
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentEdit;
