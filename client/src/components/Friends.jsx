import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Friends.css";
import "./Switch.css";
import FriendList from "./FriendList";
import Requests from "./Requests";

import { get, post } from "../utilities";

import { UserContext } from "./context/UserContext";

const Friends = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [ids, setIds] = useState([]);
  const [active, setActive] = useState("friends"); // "left" is initially active

  useEffect(() => {
    const query = { id: userId };
    get("/api/friends", query).then((user) => {
      setIds(user.friends);
    });
  }, [active]);

  const toggleActive = (side) => {
    setActive(side); // Update the active button
  };

  return (
    <div className="friends-container">
      <div className="switch-container">
        <button
          className={`switch-button ${active === "friends" ? "active" : ""}`}
          onClick={() => toggleActive("friends")}
        >
          Friends
        </button>
        <button
          className={`switch-button ${active === "requests" ? "active" : ""}`}
          onClick={() => toggleActive("requests")}
        >
          Requests
        </button>
      </div>
      <div className="content">{active === "friends" ? <FriendList ids={ids} setIds={setIds}/> : <Requests ids={ids} setIds={setIds}/>}</div>
    </div>
  );
};

export default Friends;
