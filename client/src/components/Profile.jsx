import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Profile.css";

import { get, post } from "../utilities";

import { UserContext } from "./context/UserContext";
import { ProfileContext } from "./context/ProfileContext";


const Profile = ({ onClose }) => {
  // Initial default values for name and major
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const {userName, userMajor, userKerb, userPfp, setUserName, setUserMajor, setUserKerb} = useContext(ProfileContext);

  const [tempName, setTempName] = useState(userName);
  const [tempMajor, setTempMajor] = useState(userMajor);
  const [tempKerb, setTempKerb] = useState(userKerb);

  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  useEffect(() => {
    setTempMajor(userMajor);
  }, [userMajor]);

  useEffect(() => {
    setTempKerb(userKerb);
  }, [userKerb]);

  // Handle changes in the name input field
  const handleNameChange = (e) => {
    setTempName(e.target.value);
  };

  // Handle changes in the major input field
  const handleMajorChange = (e) => {
    setTempMajor(e.target.value);
  };

  const handleKerbChange = (e) => {
    setTempKerb(e.target.value);
  };

  // Save the new name
  const handleSaveName = () => {
    // Optionally, save the new value to the database or other storage
    const body = { id: userId, name: tempName };
    post("/api/change-name", body).then((user) => {
      setUserName(user.name);
    });
  };

  // Save the new major
  const handleSaveMajor = () => {
    // Optionally, save the new value to the database or other storage
    const body = { id: userId, major: tempMajor };
    post("/api/change-major", body).then((user) => {
      setUserMajor(user.major);
    });
  };

  const handleSaveKerb = () => {
    const body = { id: userId, kerb: tempKerb };
    post("/api/change-kerb", body).then((user) => {
      setUserKerb(user.kerb);
    });
  };

  return (
    <div className="profile-container">

        <img src={userPfp} alt="profile-icon" className="profile-icon" />

      <button onClick={onClose} className="close-button">
        <img src="/src/public/close.svg" alt="Close" />
      </button>
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
          <button onClick={handleSaveName} className="save-button">
            Save
          </button>
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
          <button onClick={handleSaveMajor} className="save-button">
            Save
          </button>
        </div>
      </div>

      {/* Kerb Section */}
      <div className="profile-category">
        <p className="profile-element">Kerberos ID</p>
        <div className="input-container">
          <input
            type="text"
            value={tempKerb}
            onChange={handleKerbChange}
            placeholder="Enter your MIT kerb"
          />
          <button onClick={handleSaveKerb} className="save-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
