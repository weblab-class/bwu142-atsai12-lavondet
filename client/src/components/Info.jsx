import React from "react";
import "./Info.css";

const Info = () => {
  return (
    <div className="infoContainer">
      <h1>About StudBuds</h1>
      <p>
        Welcome to StudBuds, a web-app that helps users find their ideal study buddies on campus.
      </p>
      <h2>Get Started</h2>
      <ul>
        <li>Log in with a Google account to save your personal preferences</li>
        <li>Click on 'Profile' to enter name, major, and kerberos ID for filtering</li>
        <li>Click and drag on the home page map to explore different study areas</li>
        <li>Request and accept friends in the 'Friends' page</li>
        <li>Optional: Filter pins by friends or major</li>
      </ul>
    </div>
  );
};

export default Info;
