import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  // Initial default values for name and major
  const [userName, setUserName] = useState("name");
  const [userMajor, setUserMajor] = useState("major");

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
    // Optionally, save the new value to the database or other storage
    console.log("Name saved:", userName);
  };

  // Save the new major
  const handleSaveMajor = () => {
    // Optionally, save the new value to the database or other storage
    console.log("Major saved:", userMajor);
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
