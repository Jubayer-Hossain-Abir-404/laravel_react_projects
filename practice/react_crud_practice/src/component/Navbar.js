import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </li>
    </div>
  );
}

export default Navbar