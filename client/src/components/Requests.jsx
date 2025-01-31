import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../utilities";
import { UserContext } from "./context/UserContext";
import "./Requests.css";

const Requests = (props) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [incomingIds, setIncomingIds] = useState([]);
  const [sentIds, setSentIds] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // for incoming friend requests
  useEffect(() => {
    const query = { id: userId };
    get("/api/incoming", query).then((user) => {
      setIncomingIds(user.incoming);
    });
  }, []);

  // for sent friend requests
  useEffect(() => {
    const query = { id: userId };
    get("/api/sent", query).then((user) => {
      setSentIds(user.sent);
    });
  }, []);

  useEffect(() => {
    async function fetchIncoming() {
      const incoming_requests = await Promise.all(
        incomingIds.map(async (user_id) => {
          const query = { id: user_id };
          const user = await get("/api/friend", query);
          return user;
        })
      );
      setIncoming(incoming_requests);
    }
    fetchIncoming();
  }, [incomingIds, sentIds]);

  // for recommended friends
  useEffect(() => {
    get("/api/profiles").then((data) => {
      const profiles = data.users;

      // Filter out profiles with ids in friends or requests
      const filteredProfiles = profiles.filter(
        (profile) =>
          (!props.ids || props.ids.length === 0 || !props.ids.includes(profile.id)) &&
          (!incomingIds || incomingIds.length === 0 || !incomingIds.includes(profile.id)) &&
          (!sentIds || sentIds.length === 0 || !sentIds.includes(profile.id)) &&
          !(userId === profile.id)
      );

      // Shuffle the filtered profiles and select up to 10
      const shuffledProfiles = filteredProfiles.sort(() => 0.5 - Math.random());
      const selectedProfiles = shuffledProfiles.slice(0, 5);

      // Set the recommended state
      setRecommended(selectedProfiles);
    });
  }, [incomingIds, sentIds, props.ids, userId]);

  // send request (recommended list) u can possibly add a sent message/button when clicked
  // body = {from_id: userId, to_id: id of other user};
  // post("/api/send-request").then((info) => {
  //   console.log('added friend request');
  // })

  // accept request (incoming list) can possibly add an accepted message
  // body = {from_id: id of other user, to_id: userId};
  // post("/api/accept-request").then((info) => {
  //   console.log('accepted friend request');
  // })

  // reject request (incoming list) can possibly add a reject message
  // body = {from_id: id of other user, to_id: userId};
  // post("/api/reject-request").then((info) => {
  //   console.log('reject friend request');
  // })



  // Handle sending a friend request
  const sendRequest = (toId) => {
    const body = { from_id: userId, to_id: toId };
    post("/api/send-request", body).then(() => {
      console.log(`Sent friend request to ${toId}`);

      // update UI: Remove user from recommended list after request is sent
      setRecommended((prevRecommended) => prevRecommended.filter((user) => user.id !== toId));
      setSentIds((prevSent) => [...prevSent, toId]);
    });
  };

  // Handle accepting a friend request
  const acceptRequest = (fromId) => {
    const body = { from_id: fromId, to_id: userId };
    post("/api/accept-request", body).then(() => {
      console.log(`Accepted friend request from ${fromId}`);

      // update UI: Remove user from incoming requests after accepting
      setIncoming((prevIncoming) => prevIncoming.filter((user) => user.id !== fromId));
      setIncomingIds((prevIds) => prevIds.filter((id) => id !== fromId));

      // update UI: Add user to "friends" list (if you maintain one)
      props.setIds((prevIds) => [...prevIds, fromId])

    });
  };

  // Handle rejecting a friend request
  const rejectRequest = (fromId) => {
    const body = { from_id: fromId, to_id: userId };
    post("/api/reject-request", body).then(() => {
      console.log(`Rejected friend request from ${fromId}`);

      // update UI: Remove user from incoming requests after rejection
      setIncoming((prevIncoming) => prevIncoming.filter((user) => user.id !== fromId));
      setIncomingIds((prevIds) => prevIds.filter((id) => id !== fromId));
    });
  };

  return (
    <div className="requests-container">
      {/* Incoming Friend Requests */}
      <div className="incoming-requests-container">
        <h2>Requests</h2>
        {incoming.length > 0 ? (
          incoming.map((user) => (
            <div key={user.id} className="friend-request">
              <img src={user.pfp} alt="pfp" className="user-icon" />
              <div className="incoming-user-info">
                <p>{user.name}</p>
                <p>({user.major})</p>
              </div>
              <button className="user-decision" onClick={() => acceptRequest(user.id)}>✓</button>
              <button className="user-decision" id="reject-invite" onClick={() => rejectRequest(user.id)}>X</button>
            </div>
          ))
        ) : (
          <p>No incoming requests</p>
        )}
      </div>

      <hr />

      {/* Recommended Friends */}
      <div className="recommended-friends-container">
        <h2>Recommended</h2>
        {recommended.length > 0 ? (
          recommended.map((user) => (
            <div key={user.id} className="recommended-friend">
              <img src={user.pfp} alt="pfp" className="user-icon" />
              <div className="recommended-user-info">
                <p>{user.name}</p>
                <p>({user.major})</p>
              </div>
              <button onClick={() => sendRequest(user.id)}>Add</button>
            </div>
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
