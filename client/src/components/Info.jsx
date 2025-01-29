import React from "react";
import "./Info.css";

const Info = ({onClose}) => {
  return (
    <div className="infoContainer">
      <h1>Welcome to StudBuds!</h1>
      <button onClick={onClose} className="close-button">
        <img src="https://i.imgur.com/zdbq35Z.png" alt="Close"/>
      </button>
      <p>
        A web-app that helps users find their ideal study buddies on campus.
      </p>
      <h2>Get Started</h2>
      <ol className="info-directions">
        <li>Log in with a Google account to save your personal preferences</li>
        <li>Click on 'Profile' to enter your name, major, and kerberos ID</li>
        <li>Explore the map on the home page to see where other students are studying</li>
        <li>Add your own post to find peers to collaborate with</li>
        <li>Request and accept friends in the 'Friends' page</li>
        <li>Extra: Filter posts by friends, major, or other!</li>
      </ol>
    </div>
  );
};

export default Info;
