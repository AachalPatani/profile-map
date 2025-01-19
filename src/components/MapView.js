import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Leaflet styles
import L from 'leaflet';  // Leaflet core for creating markers


const ProfileMap = () => {
    const [profile, setProfile] = useState({
      name: 'John Doe',
      address: '1234 Elm St, Springfield, IL',
      coordinates: [39.7817, -89.6501], // Example coordinates (Springfield, IL)
    });
  
    return (
      <div>
        <h2>{profile.name}'s Location</h2>
        
        <MapContainer center={profile.coordinates} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={profile.coordinates}>
            <Popup>{profile.address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };
  
  export default ProfileMap;
  