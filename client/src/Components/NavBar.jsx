import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light container">
      <div className="container-fluid">
        <h1 className="navbar-brand">
          BLAZE
        </h1>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to={"/orders"}>
              Orders
            </Link>
            <Link className="nav-link" aria-current="page" to={"/products"}>
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
