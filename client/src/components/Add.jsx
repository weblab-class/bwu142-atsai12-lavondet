import React, { useState, useEffect, createContext } from "react";
import "./App.css";

const Add = () => {

    const [toggleAdd, setToggleAdd] = useState(false);

    return (
      <button className="Add-post">Add</button>
    );
};

export default Add;
