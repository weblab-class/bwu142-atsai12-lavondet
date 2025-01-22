import React, { useState, useEffect } from "react";
import "../utilities.css";
import "./App.css";

/**  this is a component that renders a single post, given props

Proptypes

* @param {string} username of creator of post
* @param {string} major of creator of post
* @param {string} note of creator of post
* maybe @param {string} pfp pf creator of post

*/

const SinglePost = (props) => {
  return (
    <div className="Single-post">
      {/* <img src={props.pfp} alt="user-profile-pic"/> */}
      <h3 className="Post-creator">{props.username}</h3>
      <h3 className="Post-major">{props.major}</h3>
      <p className="Post-note">{props.note}</p>
    </div>
  );
};

export default SinglePost;
