import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Google from "./pages/Google";

const Navbar = () => {
  return (
    <nav className="Navbar-container">
      <div className="Navbar-left">
        <button id="Navbar-home">Home</button>
        <button>Friends</button>
        <button>Filter</button>
      </div>
      <div className="Navbar-right">
        <button>Profile</button>
        <Google id="Navbar-log" />
      </div>
    </nav>
  );
};

export default Navbar;
