import React, { useState, useEffect, useRef, useContext } from "react";
import "./Map.css";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import {get, post} from '../utilities';

import {UserContext} from "./context/UserContext";

const containerStyle = { width: "100%", height: "700px" };
const center = { lat: 42.3601, lng: -71.0942 };

const Map = () => {
  const{userId, handleLogin, handleLogout} = useContext(UserContext);
  const [userName, setUserName] = useState("name");
  const [userMajor, setUserMajor] = useState("major");
  const [hasMarker, setHasMarker] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [postTrigger, setPostTrigger] = useState(0);
  const mapRef = useRef();

  useEffect(() => {
    const query = {id: userId};
    get("/api/name-major", query).then((user) => {
      setUserName(user.name);
      setUserMajor(user.major);
    });
  });

  useEffect(() => {
    const query = {id: userId};
    get("/api/find-post", query).then((posts) => {
      setHasMarker(posts.exist);
    });
  }, [userId]);

  useEffect(() => {
    get("/api/posts").then((data) => {
      setMarkers(data.posts);
    })
  }, [postTrigger]);

  const handleButtonClick = () => {
    if (hasMarker) {
      const body = {id: userId};
      post("/api/remove-post", body).then((marker) => {
        console.log('removed');
      });
      setPostTrigger(postTrigger + 1);
      setHasMarker(false);
    } else {
      setIsAddMode(!isAddMode);
    }
  }

  const handleMapClick = (event) => {
    if (isAddMode) {
      const position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setNewMarkerPosition(position);
      setIsAddMode(false);
      setModalVisible(true);
    }
  };

  const handleSaveMarker = () => {
    // adding marker to database
    const body = {
      id: userId,
      lat: newMarkerPosition.lat,
      lng: newMarkerPosition.lng,
      name: userName,
      major: userMajor,
      info: markerInfo
    };
    post("/api/post", body).then((marker) => {
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    })

    // reseting new marker info
    setModalVisible(false);
    setNewMarkerPosition(null);
    setMarkerInfo("");
    setHasMarker(true);
  };

  const handleCancelMarker = () => {
    setModalVisible(false);
    setMarkerInfo("");
  }


  const handleMarkerHover = (marker) => {
    setActiveMarker(marker);
  };

  const handleMarkerHoverOut = () => {
    setActiveMarker(null);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="Add-post">
        {isAddMode ? "Exit" : (hasMarker ? "Remove": "Add")}
      </button>

      {modalVisible && (
        <div className="modal">
          <h3>Create a New Post</h3>
          <textarea
            placeholder="Add a note"
            value={markerInfo}
            onChange={(e) => setMarkerInfo(e.target.value)}
            rows="4" // Set the number of rows for the textarea (adjust as needed)
            cols="40" // Set the width of the textarea
          />
          <div className="new-post-buttons">
            <button id="new-post-save" onClick={handleSaveMarker}>Save</button>
            <button id="new-post-cancel" onClick={handleCancelMarker}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ position: "relative", cursor: isAddMode ? "crosshair" : "default" }}>
        <LoadScript googleMapsApiKey="AIzaSyDI1Zc7mz5G7f7tGbkqR79UjD328mRIgkg">
          <GoogleMap
            ref={mapRef}
            options={{ disableDefaultUI: true }}
            center={center}
            mapContainerStyle={containerStyle}
            zoom={16}
            onClick={handleMapClick}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onMouseOver={() => handleMarkerHover(marker)}
                onMouseOut={handleMarkerHoverOut}
              />
            ))}

            {activeMarker && (
              <InfoWindow
                position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
                // onCloseClick={handleMarkerHoverOut}
              >
                <div
                  className="info-window-content"
                  style={{
                    width: "250px",
                    height: "150px",
                    padding: "10px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <h4>Note:</h4>
                  <p>{activeMarker.info}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Map;
