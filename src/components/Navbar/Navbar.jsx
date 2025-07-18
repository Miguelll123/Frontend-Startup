import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <h1>Seed Startup Program</h1>
      </div>
      <div className="right">
        <img src="https://via.placeholder.com/40" alt="Icono1" />
        <img src="https://via.placeholder.com/40" alt="Icono2" />
        <img src="https://via.placeholder.com/40" alt="Icono3" />
      </div>
    </nav>
  );
};

export default Navbar;
