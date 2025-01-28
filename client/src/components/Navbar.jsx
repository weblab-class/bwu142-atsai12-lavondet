import React, { useState, useEffect, createContext, useContext } from "react";
import "./Navbar.css";
import Google from "./pages/Google";
import Profile from "./Profile";
import Filter from "./Filter";
import { UserContext } from "./context/UserContext";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [showFilter, setShowFilter] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  return (
    <>
      <nav className="Navbar-container">
        <div className="Navbar-left">
          <button id="Navbar-home">Home</button>
          <button onClick={toggleFilter}>Filter</button>
          {userId ? <button>Friends</button> : null}
        </div>
        <div className="Navbar-right">
          {userId ? <button onClick={toggleProfile}>Profile</button> : null}
          <Google id="Navbar-log" />
        </div>
      </nav>

      {showProfile && <Profile />}
      {showFilter && <Filter />}
    </>
  );
};

export default Navbar;
