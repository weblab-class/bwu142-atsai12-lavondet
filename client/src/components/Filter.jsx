import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Filter.css";

import { get, post } from "../utilities";

import { UserContext } from "./context/UserContext";

const Filter = () => {
  const [customKeyword, setCustomKeyword] = useState(""); // State for the custom filter keyword

  return (
    <div className="filter-container">
      <h3 className="filter-header">Filter by</h3>
      <div className="filter-options">
        <div className="filter-element">
          <input type="radio" name="filter" />
          <label className="container">
            Friends
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="filter-element">
          <input type="radio" name="filter" />
          <label className="container">
            Major
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="filter-element custom-filter">
          <input type="radio" name="filter" />
          <input
            type="text"
            className="custom-input"
            placeholder="keyword"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)} // Update custom keyword on input change
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
