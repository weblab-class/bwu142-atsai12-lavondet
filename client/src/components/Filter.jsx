import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Filter.css";

import { get, post } from "../utilities";

import { UserContext } from "./context/UserContext";

const Filter = () => {
  const [customKeyword, setCustomKeyword] = useState("");
  const [majorKeyword, setMajorKeyword] = useState("");
  const [selected, setSelected] = useState(null);

  const handleToggle = (option) => {
    if (selected === option) {
      setSelected(null); // Deselect the option if it's already selected
    } else {
      setSelected(option); // Select the option
    }
  };

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
