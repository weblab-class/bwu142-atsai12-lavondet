import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Filter.css";

import { get, post } from "../utilities";

import { UserContext } from "./context/UserContext";

const Filter = () => {
  const [customKeyword, setCustomKeyword] = useState("");
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
        <div className="filter-element">
        <input
            type="checkbox" // Changed to checkbox for toggle functionality
            checked={selected === "friends"} // Controlled input
            onChange={() => handleToggle("friends")}
          />
          <label className="container">
            Friends
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="filter-element">
        <input
            type="checkbox" // Changed to checkbox for toggle functionality
            checked={selected === "major"} // Controlled input
            onChange={() => handleToggle("major")}
          />
          <label className="container">
            Major
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="filter-element custom-filter">
        <input
            type="checkbox" // Changed to checkbox for toggle functionality
            checked={selected === "custom"} // Controlled input
            onChange={() => handleToggle("custom")}
          />
          <input
            type="text"
            className="custom-input"
            placeholder="Keyword"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            disabled={selected !== "custom"} // Update custom keyword on input change
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
