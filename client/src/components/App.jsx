import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../utilities.css";
import { socket } from "../client-socket";
import { get, post } from "../utilities";
import Map from "./Map"; // Import Google Maps component

import { UserContext } from "./context/UserContext";
import { ProfileContext } from "./context/ProfileContext";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user.googleid);
      }
    });
  }, []);

  useEffect(() => {
    const query = { id: userId };
    get("/api/name-major-kerb", query).then((user) => {
      setUserName(user.name);
      setUserMajor(user.major);
      setUserKerb(user.kerb);
      setTrigger(true);
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user.googleid);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      <div>
      <Outlet />
        <Map />  {/* Add the Google Maps component */}
      </div>
    </UserContext.Provider>
  );
};

export default App;
