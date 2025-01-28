import React, {useState, useEffect, useContext} from "react";
import { get, post } from "../utilities";
import { UserContext } from "./context/UserContext";

const FriendList = (props) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchFriends() {
            const friends = await Promise.all(
                props.ids.map(async (friend_id) => {
                    const query = { id: friend_id };
                    const friend = await get('/api/friend', body);
                    return friend;
                })
            );
            setList(friends);
        }

        fetchFriends();
    }, []);

} 

export default FriendList;