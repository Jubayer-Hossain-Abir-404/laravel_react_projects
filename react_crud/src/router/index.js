import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Student from "../pages/Student";
import StudentCreate from "../pages/StudentCreate";

function MyRouter(){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/students" element={<Student />} />
        <Route path="/students/create" element={<StudentCreate />} />
      </Routes>
    );
}


export default MyRouter;