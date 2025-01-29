import React, { useState, useEffect } from "react";
import { get, post } from "../utilities";

const FriendList = (props) => {
  const [list, setList] = useState([]);

  // const body = {fromId: userId, toId: id};
  // post('/remove-friend', body).then((user) => {
  //   props.setIds(props.ids.filter(id => id != user.remove));
  // });

  const listFriends = (list) => {
    if (list.length === 0) {
      return <></>;
    }
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
  }, [props.ids]);

  return (
    <div className="friend-list">
      <h2>Your Friends</h2>
      {list.length > 0 ? listFriends(list) : <p>No friends found.</p>}
    </div>
  );
};

export default FriendList;
