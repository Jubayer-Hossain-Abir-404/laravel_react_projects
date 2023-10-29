import { Link } from "react-router-dom";
import Home from "./pages/Home";
import MyRouter from "./router";

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/contact-us">Contact Us</Link>

      <MyRouter />
    </div>
  );
}

export default App;
