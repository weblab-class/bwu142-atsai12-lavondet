import React, { useState, useEffect, useRef, useContext } from "react";
import "./Map.css";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Filter from "./Filter";

import { get, post } from "../utilities";
import { socket } from "../client-socket";

import { UserContext } from "./context/UserContext";
import { ProfileContext } from "./context/ProfileContext";

const containerStyle = { width: "100vw", height: "100vh" };
const center = { lat: 42.3601, lng: -71.0942 };

const Map = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const { userName, userMajor, userKerb, userPfp, setUserName, setUserMajor, setUserKerb } =
    useContext(ProfileContext);

  const [hasMarker, setHasMarker] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [postTrigger, setPostTrigger] = useState(0);
  const [first, setFirst] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    const query = { id: userId };
    get("/api/find-post", query).then((posts) => {
      setHasMarker(posts.exist);
    });
  }, [userId]);

  useEffect(() => {
    if (first < 2) {
      console.log('changes');
      setFilteredMarkers(markers);
      setFirst(first+1);
    }
  }, [markers]);

  useEffect(() => {
    get("/api/posts").then((data) => {
      console.log("markersset");
      setMarkers(data.posts);
    });
  }, [postTrigger]);

  const addPost = (post) => {
    console.log("addPost");
    console.log("hello", post);
    // setMarkers([...markers, post]);
    setMarkers((prevMarkers) => [...prevMarkers, post]);
  };

  const updatePosts = () => {
    console.log("updatePosts");
    get("/api/posts").then((data) => {
      console.log("data.posts", data.posts);
      setMarkers(data.posts);
    });
  };

  useEffect(() => {
    console.log("markers has been changed", markers);
  }, [markers]);

  useEffect(() => {
    socket.on("new post", addPost);
    console.log("listening for socket messsage");
    return () => {
      socket.off("new post", addPost);
    };
  }, []);

  useEffect(() => {
    socket.on("change post", updatePosts);
    return () => {
      socket.off("change post", updatePosts);
    };
  }, []);

  const handleButtonClick = () => {
    console.log("handleButtonClick");
    if (hasMarker) {
      const body = { id: userId };
      post("/api/remove-post", body).then((marker) => {
        console.log("removed");
      });
      setPostTrigger(postTrigger + 1);
      setHasMarker(false);
    } else {
      setIsAddMode(!isAddMode);
    }
  };

  const handleFilterClick = () => {
    setFilterVisible(!filterVisible);
  };

  const handleMapClick = (event) => {
    if (isAddMode) {
      const position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setNewMarkerPosition(position);
      setIsAddMode(false);
      setModalVisible(true);
    }
  };

  const handleSaveMarker = () => {
    console.log("saveMarker");
    const body = {
      id: userId,
      lat: newMarkerPosition.lat,
      lng: newMarkerPosition.lng,
      name: userName,
      major: userMajor,
      kerb: userKerb,
      info: markerInfo,
      pfp: userPfp,
    };
    console.log("called");
    post("/api/post", body).then((marker) => {
      // setMarkers((prevMarkers) => [...prevMarkers, marker]);
    });

    setModalVisible(false);
    setNewMarkerPosition(null);
    setMarkerInfo("");
    setHasMarker(true);
  };

  const handleCancelMarker = () => {
    setModalVisible(false);
    setMarkerInfo("");
  };

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker); // Set the clicked marker as active
  };

  const handleCloseInfoWindow = () => {
    setActiveMarker(null); // Close the info window when clicked on the close button
  };

  const closeFilter = () => {
    setFilterVisible(false);
  };

  return (
    <div>
      {userId ? (
        <>
          <button onClick={handleButtonClick} className="Add-post">
            {isAddMode ? "Exit" : hasMarker ? "Remove" : "Add"}
          </button>

          {filterVisible? (<Filter all_markers={markers} set_filtered={setFilteredMarkers} onClose={closeFilter} />):
          (<button onClick={handleFilterClick} onClose={closeFilter} className="Filter-post">
            {"Filter"}
          </button>)}
        </>
      ) : null}

      {modalVisible && (
        <div className="modal">
          <h3>Create a New Post</h3>
          <textarea
            placeholder="Describe your location/class/assignment etc."
            value={markerInfo}
            onChange={(e) => setMarkerInfo(e.target.value)}
            rows="4"
            cols="40"
          />
          <div className="new-post-buttons">
            <button id="new-post-save" onClick={handleSaveMarker}>
              Save
            </button>
            <button id="new-post-cancel" onClick={handleCancelMarker}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ position: "relative", cursor: isAddMode ? "crosshair" : "default" }}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            ref={mapRef}
            options={{ disableDefaultUI: true }}
            center={center}
            mapContainerStyle={containerStyle}
            zoom={16}
            onClick={handleMapClick}
          >
            {filteredMarkers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)} // Open info window on click
              />
            ))}

            {activeMarker && (
              <InfoWindow
                position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
                onCloseClick={handleCloseInfoWindow} // Close info window on "close click"
              >
                <div
                  className="info-window-content"
                  style={{
                    width: "250px",
                    height: "auto",
                    padding: "0 10px 10px 10px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <img src={activeMarker.pfp} alt="profile-icon" className="profile-icon" />
                  <div className="Map-marker-info">
                    <p>
                      <span className="Map-marker-hover">Name: </span>
                      {activeMarker.name}
                    </p>
                    <p>
                      <span className="Map-marker-hover">Major / Course: </span>
                      {activeMarker.major}
                    </p>
                    <p>
                      <span className="Map-marker-hover">Note: </span>
                      {activeMarker.info}
                    </p>
                  </div>
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
