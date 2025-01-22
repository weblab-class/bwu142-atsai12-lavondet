import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  // Initial default values for name and major
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [userMajor, setUserMajor] = useState(localStorage.getItem("userMajor") || "");

  // Handle changes in the name input field
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  // Handle changes in the major input field
  const handleMajorChange = (e) => {
    setUserMajor(e.target.value);
  };

  // Save the new name
  const handleSaveName = () => {
    localStorage.setItem("userName", userName);
  };

  // Save the new major
  const handleSaveMajor = () => {
    localStorage.setItem("userMajor", userMajor);
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
            value={userName}
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
            value={userMajor}
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
