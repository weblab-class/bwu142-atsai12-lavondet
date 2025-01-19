import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "../../utilities.css";
import "../App.css"
import { UserContext } from "../App";

// Handles logging in with google

const Google = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <button className="Google-logout"
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
    </>
  );
};

export default Google;
