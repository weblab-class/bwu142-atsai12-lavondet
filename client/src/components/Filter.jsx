import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Filter.css";

import { get, post } from "../utilities";

import { UserContext } from "./context/UserContext";

const Filter = (props) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [customKeyword, setCustomKeyword] = useState("");
  const [majorKeyword, setMajorKeyword] = useState("");
  const [selected, setSelected] = useState(null);
  const [friends, setFriends] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const handleToggle = (option) => {
    if (selected === option) {
      setSelected(null); // Deselect the option if it's already selected
    } else {
      setSelected(option); // Select the option
    }
  };

  useEffect(() => {
    const query = { id: userId };
    get("/api/friends", query).then((user) => {
      setFriends(user.friends);
    });
    setTrigger((prevTrigger) => prevTrigger + 1);
  }, [selected, props.all_markers]);

  useEffect(() => {
    let current = props.all_markers;
    if (selected == "friends") {
      if (friends) {
        current = current.filter((marker) => friends.includes(marker.id));
      } else {
        current = [];
      }
    } else if (selected === "major") {
      current = current.filter((marker) => marker.major.includes(majorKeyword));
    } else if (selected === "custom") {
      current = current.filter((marker) => marker.info.toLowerCase().includes(customKeyword.toLowerCase()));
    }
    props.set_filtered(current);
  }, [trigger, majorKeyword, customKeyword]);

  return (
    <div className="filter-container">
      <h3 className="filter-header">Filter by</h3>
      <div className="filter-options">
        {/* Friends Filter */}
        <div className="filter-element">
          <input
            type="checkbox"
            checked={selected === "friends"}
            onChange={() => handleToggle("friends")}
          />
          <label className="container">
            Friends
            <span className="checkmark"></span>
          </label>
        </div>

        {/* Major Filter */}
        <div className="filter-element custom-filter">
          <input
            type="checkbox"
            checked={selected === "major"}
            onChange={() => handleToggle("major")}
          />
          <input
            type="text"
            className="custom-input"
            placeholder="Major"
            value={majorKeyword}
            onChange={(e) => setMajorKeyword(e.target.value)}
            disabled={selected !== "major"} // Enable only when selected
          />
        </div>

        {/* Custom Keyword Filter */}
        <div className="filter-element custom-filter">
          <input
            type="checkbox"
            checked={selected === "custom"}
            onChange={() => handleToggle("custom")}
          />
          <input
            type="text"
            className="custom-input"
            placeholder="Keyword"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            disabled={selected !== "custom"} // Enable only when selected
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
