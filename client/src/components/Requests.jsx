import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../utilities";
import { UserContext } from "./context/UserContext";

const Requests = (props) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [incomingIds, setIncomingIds] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // for incoming friend requests
  useEffect(() => {
    const query = { id: userId };
    get("/api/incoming", query).then((user) => {
      setIncomingIds(user.incoming);
    });
  }, []);

  useEffect(() => {
    async function fetchIncoming() {
      const incoming_requests = await Promise.all(
        incomingIds.map(async (user_id) => {
          const query = { id: user_id };
          const user = await get("/api/friend", body);
          return user;
        })
      );
      setIncoming(incoming_requests);
    }
    fetchIncoming();
  }, [incomingIds]);

  // for recommended friends
  useEffect(() => {
    get("/api/profiles").then((data) => {
      const profiles = data.users;

      // Filter out profiles with ids in friends or requests
      const filteredProfiles = profiles.filter(
        (profile) =>
          (!props.ids || props.ids.length === 0 || !props.ids.includes(profile.id)) &&
          (!incomingIds || incomingIds.length === 0 || !incomingIds.includes(profile.id)) &&
          !(userId === profile.id)
      );

      // Shuffle the filtered profiles and select up to 10
      const shuffledProfiles = filteredProfiles.sort(() => 0.5 - Math.random());
      const selectedProfiles = shuffledProfiles.slice(0, 10);

      // Set the recommended state
      setRecommended(selectedProfiles);
    });
  });

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

  return (
    <div className="requests-container">
      <div className="incoming-requests-container">
        <h2>Incoming</h2>
      </div>
      <hr></hr>
      <div className="sent-requests-container">
        <h2>Sent</h2>
      </div>
    </div>
  );
};

export default Requests;
