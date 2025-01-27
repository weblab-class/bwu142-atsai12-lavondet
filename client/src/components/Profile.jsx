import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Profile.css";

import {get, post} from '../utilities';

import {UserContext} from "./context/UserContext";

const Profile = () => {
  // Initial default values for name and major
  const {userId, handleLogin, handleLogout} = useContext(UserContext);

  const [userName, setUserName] = useState("name");
  const [userMajor, setUserMajor] = useState("major");
  const [tempName, setTempName] = useState(userName);
  const[tempMajor, setTempMajor] = useState(userMajor);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const query = {id: userId};
    get("/api/name-major", query).then((user) => {
      setUserName(user.name);
      setUserMajor(user.major);
      setTrigger(true);
    });
  }, []);

  useEffect(() => {
    setTempName(userName);
    setTempMajor(userMajor);
  }, [trigger])

  // Handle changes in the name input field
  const handleNameChange = (e) => {
    setTempName(e.target.value)
  };

  // Handle changes in the major input field
  const handleMajorChange = (e) => {
    setTempMajor(e.target.value);
  };

  // Save the new name
  const handleSaveName = () => {
    // Optionally, save the new value to the database or other storage
    const body = {id: userId, name: tempName};
    post("/api/change-name", body).then((user) => {
      setUserName(user.name);
    });
  };

  // Save the new major
  const handleSaveMajor = () => {
    // Optionally, save the new value to the database or other storage
    const body = {id: userId, major: tempMajor};
    post("/api/change-major", body).then((user) => {
      setUserMajor(user.major);
    });
  };

  return (
    <div className="profile-container">
      {/* <div className="profile-pic">
        <img src="src/public/profile.svg" alt="profile-icon" className="profile-icon" />
        <button id="profile-edit-pfp">Edit</button>
      </div> */}

      {/* Name Section */}
      <div className="profile-category">
        <p className="profile-element">Name</p>
        <div className="input-container">
          <input
            type="text"
            value={tempName}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
          <button onClick={handleSaveName} className="save-button">Save</button>
        </div>
      </div>

      {/* Major Section */}
      <div className="profile-category">
        <p className="profile-element">Major / Course</p>
        <div className="input-container">
          <input
            type="text"
            value={tempMajor}
            onChange={handleMajorChange}
            placeholder="Enter your major"
          />
          <button onClick={handleSaveMajor} className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
