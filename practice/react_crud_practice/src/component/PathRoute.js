import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Students from "../pages/Students";
import StudentAdd from "../pages/StudentAdd";

const PathRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/students" element={<Students />}></Route>
      <Route path="/students/add" element={<StudentAdd />}></Route>
    </Routes>
  );
};

export default PathRoute;
