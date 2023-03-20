import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const Leafletmap = () => {
  const [markers, setMarkers] = useState([]);

  const jakartaBounds = [
    [-6.36, 106.6], // koordinat barat daya Jakarta
    [-6.02, 107.1], // koordinat timur laut Jakarta
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3003/markers")
      .then((response) => {
        setMarkers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MapContainer
      bounds={jakartaBounds}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
      className="mapContainer"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers?.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            <li>ID: {marker.id}</li>
            <li>Client: {marker.client}</li>
            <li>Alamat: {marker.alamat}</li>
            <li>Titik Kordinat: {marker.position}</li>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Leafletmap;
