import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Students from "../pages/Students";

const PathRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/students" element={<Students />}></Route>
    </Routes>
  );
};

export default PathRoute;
