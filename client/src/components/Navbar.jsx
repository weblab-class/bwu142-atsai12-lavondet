import React, { useState, useEffect, createContext, useContext } from "react";
import "./Navbar.css";
import Google from "./pages/Google";
import Profile from "./Profile";
// import Filter from "./Filter";
import Friends from "./Friends";
import { UserContext } from "./context/UserContext";

const Navbar = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleFriends = () => {
    setShowFriends(!showFriends);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };



  return (
    <>
      <nav className="Navbar-container">
        <div className="Navbar-left">
          <button id="Navbar-home">Home</button>
          {userId ? <button onClick={toggleFriends}>Friends</button> : null}
        </div>
        <div className="Navbar-right">
          {userId ? <button onClick={toggleProfile}>Profile</button> : null}
          <Google id="Navbar-log" />
        </div>
      </nav>

      {showProfile && <Profile onClose={closeProfile} />}
      {showFriends && <Friends />}
    </>
  );
};

export default Navbar;
