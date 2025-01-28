import React, { useState, useEffect, useContext } from "react";
import "../utilities.css";
import "./Friends.css";

import {get, post} from '../utilities';

import {UserContext} from "./context/UserContext";

const Friends = () => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    const [ids, setIds] = useState([]);

    useEffect(() => {
        query = {id: userId};
        get("/api/friends", query).then((user) => {
            setIds(user.friends);
        });
    })

    return (
        <div className="friends-container">
            <h3>Friends</h3>

        </div>
    );

};

export default Friends;
