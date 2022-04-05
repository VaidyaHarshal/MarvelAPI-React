import React from "react";
import logo from "../img/Marvel_Logo.svg.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Marvel
        </Link>
      </div>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            className="logo"
            src={logo}
            alt="Marvel"
            width="170"
            height="60"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
