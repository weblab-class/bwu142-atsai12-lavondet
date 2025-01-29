import React, { useState, useEffect } from "react";
import { get, post } from "../utilities";
import "./FriendList.css";

const FriendList = (props) => {
  const [list, setList] = useState([]);

  // const listFriends = (list) => {
  //   if (list.length === 0) {
  //     return <></>;
  //   }
  //   return list.map((friend) => (
  //     <div key={friend.kerb} className="friend-card">
  //       <img src={friend.pfp} alt="profile" className="friend-pfp" />
  //       <div className="friend-info">
  //         <h3 className="friend-name">{friend.name}</h3>
  //         <p className="friend-major">Major: {friend.major}</p>
  //         <p className="friend-kerb">Kerberos ID: {friend.kerb}</p>
  //       </div>
  //     </div>
  //   ));
  // };

  useEffect(() => {
    if (props.ids && props.ids.length > 0) {
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
    }
  }, []);

  return (
    <div className="friend-container">
      <div className="friend-list-container">
        <h2>Friends</h2>
        {list.length > 0 ? (
          list.map((user) => (
            <div key={user.id} className="friend-card">
              <img src={user.pfp} alt="pfp" className="user-icon" />
              <div className="friend-info">
                <p>{user.name}</p>
                <p>({user.major})</p>
              </div>
              <button onClick={() => removeFriend(user.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No friends found</p>
        )}
      </div>
    </div>
  );
};

export default FriendList;
