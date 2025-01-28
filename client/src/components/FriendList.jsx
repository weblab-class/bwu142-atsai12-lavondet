import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../utilities";
import { UserContext } from "./context/UserContext";

const FriendList = (props) => {
  const [list, setList] = useState([]);

  const listFriends = (list) => {
    return list.map((friend) => (
      <div key={friend.kerb} className="friend-card">
        <img src={friend.pfp} alt="profile" className="friend-pfp" />
        <div className="friend-info">
          <h3 className="friend-name">{friend.name}</h3>
          <p className="friend-major">Major: {friend.major}</p>
          <p className="friend-kerb">Kerberos ID: {friend.kerb}</p>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    async function fetchFriends() {
      const friends = await Promise.all(
        props.ids.map(async (friend_id) => {
          const query = { id: friend_id };
          const friend = await get("/api/friend", body);
          return friend;
        })
      );
      setList(friends);
    }

    fetchFriends();
  }, []);

  return (
    <div className="friend-list">
      <h2>Your Friends</h2>
      {list.length > 0 ? listFriends(list) : <p>No friends found.</p>}
    </div>
  );
};

export default FriendList;
