import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

const PathRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About/>}></Route>
      </Routes>
  );
};

export default PathRoute;
