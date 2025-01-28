import React, {useState, useEffect, useContext} from "react";
import { get, post } from "../utilities";
import { UserContext } from "./context/UserContext";

const Requests = (props) => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    const [incomingIds, setIncomingIds] = useState([]);
    const[incoming, setIncoming] = useState([]);
    const [recommended, setRecommended] = useState([]);

    // for incoming friend requests
    useEffect(() => {
        query = {id: userId};
        get("/api/incoming", query).then((user) => {
            setIncomingIds(user.incoming);
        });
    }, []);

    useEffect(() => {
        async function fetchIncoming() {
            const incoming_requests = await Promise.all(
                incomingIds.map(async (user_id) => {
                    const query = { id: user_id };
                    const user = await get('/api/friend', body);
                    return user;
                })
            );
            setIncoming(incoming_requests);
        }
        fetchIncoming();
    }, [incomingIds])

    // for recommended friends
    useEffect(() => {
        get("/api/profiles").then((data) =>{
            const profiles = data.users;

            // Filter out profiles with ids in friends or requests
            const filteredProfiles = profiles.filter(
                (profile) => !props.ids.includes(profile.id) && !incomingIds.includes(profile.id)
            );

            // Shuffle the filtered profiles and select up to 10
            const shuffledProfiles = filteredProfiles.sort(() => 0.5 - Math.random());
            const selectedProfiles = shuffledProfiles.slice(0, 10);

            // Set the recommended state
            setRecommended(selectedProfiles);
        })
    })

}