import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "700px" };
const center = { lat: 42.3601, lng: -71.0942 };

const Map = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef();

  const handleAddButtonClick = () => {
    setIsAddMode(!isAddMode); // Toggle add mode
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
    const marker = {
      ...newMarkerPosition,
      info: markerInfo,
      timeout: 10000, // Marker will disappear after 10 seconds (adjust as needed)
      // set timeout to 10 * 60 * 1000 for 10 min or x6 for 1 hour
    };

    setMarkers((prevMarkers) => [...prevMarkers, marker]);
    setModalVisible(false);
    setNewMarkerPosition(null);
    setMarkerInfo("");

    // Set a timeout to remove the marker after `timeout` duration
    setTimeout(() => {
      setMarkers((prevMarkers) =>
        prevMarkers.filter((m) => m !== marker)
      );
    }, marker.timeout);
  };


  const handleMarkerHover = (marker) => {
    setActiveMarker(marker);
  };

  const handleMarkerHoverOut = () => {
    setActiveMarker(null);
  };

  return (
    <div>
      <button onClick={handleAddButtonClick} className="Add-post">
        {isAddMode ? "Exit" : "Add"}
      </button>

      {modalVisible && (
        <div className="modal">
          <h3>Create a New Post</h3>
          <textarea
            placeholder="Enter details"
            value={markerInfo}
            onChange={(e) => setMarkerInfo(e.target.value)}
            rows="4" // Set the number of rows for the textarea (adjust as needed)
            cols="40" // Set the width of the textarea
          />
          <div>
            <button onClick={handleSaveMarker}>Save</button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
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
