import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const Leafletmap = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const jakartaBounds = [
    [-6.36, 106.6], // koordinat barat daya Jakarta
    [-6.02, 107.1], // koordinat timur laut Jakarta
  ];

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      setLoading(true);
      try {
        const response = await axios.get("http://172.16.26.97:5000/site", {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });

        setMarkers(response.data.data);
        // console.log(response.data.data);
        // console.log(JSON.stringify(response.data.data));
      } catch (e) {
        console.log(e);
        console.log("access token sudah expired");
      }
    };

    // Call fetchData immediately
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
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
            <h4>Site Info : </h4>
            <li>
              <strong>Landing Name :</strong> {marker.landing_name}
            </li>
            <li>
              <strong>Name :</strong> {marker.name}
            </li>
            <li>
              <strong>Profile Info :</strong> {marker.profile_info.name}
            </li>
            <br />
            <h4>Titik Kordinat : </h4>
            <li>
              <strong>Latitude :</strong> {marker.latitude}
            </li>
            <li>
              <strong>Longtitude :</strong> {marker.longtitude}
            </li>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Leafletmap;
