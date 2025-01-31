import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { get, post } from "../utilities";
import "./FriendList.css";

const FriendList = (props) => {
  const [list, setList] = useState([]);
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  const removeFriend = (id) => {
    const body = {fromId: userId, toId: id};
    post('/api/remove-friend', body).then((user) => {
      props.setIds(props.ids.filter(id => id != user.remove));
    });
  }


  // const body = {fromId: userId, toId: id};
  // post('/remove-friend', body).then((user) => {
  //   props.setIds(props.ids.filter(id => id != user.remove));
  // });

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
            const friend = await get("/api/friend", query);
            return friend;
          })
        );
        setList(friends);
      }
      fetchFriends();
    } else {
      setList([]);
    }
  }, [props.ids]);

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
