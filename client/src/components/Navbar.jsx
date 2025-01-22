import React, { useState, useEffect, createContext } from "react";
import "./Navbar.css";
import Google from "./pages/Google";
import Profile from "./Profile";

const Navbar = () => {

  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
        <nav className="Navbar-container">
        <div className="Navbar-left">
            <button id="Navbar-home">Home</button>
            <button>Friends</button>
            <button>Filter</button>
        </div>
        <div className="Navbar-right">
            <button onClick={toggleProfile}>Profile</button>
            <Google id="Navbar-log" />
        </div>
        </nav>

        {showProfile && <Profile />}
    </>
  );
};

export default Navbar;
