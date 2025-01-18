import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../utilities.css";
import { socket } from "../client-socket";
import { get, post } from "../utilities";
import "./App.css";

/**
 * Define the "App" component
 */
const Profile = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState("")
  const [userMajor, setUserMajor] = useState("")


  useEffect(() => {

  })

  return (
    <div className="profile-container">
        <div className="profile-pic">
            <img src="src/public/profile.svg" alt="profile-icon" className="profile-icon"/>
            <button id="profile-edit-pfp">Edit</button>
        </div>
        <div className="profile-category">
            <p className="profile-element">Name</p>
            <div className="input-container">
                <img src="src/public/edit.svg" alt="edit-icon" className="edit-icon"/>
                <input type="text" value="placeholder name"></input>
            </div>
        </div>
        <div className="profile-category">
            <p className="profile-element">Major / Course</p>
            <div className="input-container">
                <img src="src/public/edit.svg" alt="edit-icon" className="edit-icon"/>
                <input type="text" value="placeholder major"></input>
            </div>
        </div>
    </div>
  );
};

export default Profile;
