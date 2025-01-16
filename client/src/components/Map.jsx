import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "700px" };  // if height set to 100% -> map doesnt render (fix later)
const center = { lat: 42.3601, lng: -71.0942 }; // MIT coordinates

const Map = () => (
  <LoadScript googleMapsApiKey="AIzaSyDI1Zc7mz5G7f7tGbkqR79UjD328mRIgkg">
    <GoogleMap
      options={{ disableDefaultUI: true }}
      center={center}
      mapContainerStyle={containerStyle}
      zoom={16}
    >
      {/* Add markers or overlays here */}
    </GoogleMap>
  </LoadScript>
);

export default Map;
