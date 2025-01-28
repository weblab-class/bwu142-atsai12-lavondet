import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Friends.css";
import "./Switch.css";

import { get, post } from "../utilities";

import { UserContext } from "./context/UserContext";

const Friends = () => {
  const [active, setActive] = useState("left"); // "left" is initially active

  const toggleActive = (side) => {
    setActive(side); // Update the active button
  };

  return (
    <div className="friends-container">
      <div className="switch-container">
        <button
          className={`switch-button ${active === "left" ? "active" : ""}`}
          onClick={() => toggleActive("left")}
        >
          Friends
        </button>
        <button
          className={`switch-button ${active === "right" ? "active" : ""}`}
          onClick={() => toggleActive("right")}
        >
          Requests
        </button>
      </div>
    </div>
  );
};

export default Friends;
