import React, {useState, useEffect, useContext} from "react";
import { get, post } from "../utilities";
import { UserContext } from "./context/UserContext";

const Requests = (props) => {
    const [incoming, setIncoming] = useState([]);
    const [recommended, setRecommended] = useState([]);

}