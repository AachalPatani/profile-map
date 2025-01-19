import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import './App.css';
import ProfileDetails from './components/ProfileDetails';

const App = () => {
  const initialProfiles = [
    {
      id: 1,
      name: "John Doe",
      photo: "https://via.placeholder.com/50",
      description: "Web Developer",
      location: { lat: 28.7041, lng: 77.1025 },
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: "https://via.placeholder.com/50",
      description: "Graphic Designer",
      location: { lat: 19.076, lng: 72.8777 },
    },
  ];

  const [profiles, setProfiles] = useState(initialProfiles);
  const [newProfile, setNewProfile] = useState({ name: "", address: "", description: "", photo: null });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [selectedProfile, setSelectedProfile] = useState(null); // Store selected profile for details view
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleAddressChange = async (address) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=853a846f2a1d4fbda82a2bdf2aa5b416`
      );
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching location data:", error);
      return { lat: 0, lng: 0 };
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleAddProfile = async () => {
    setIsLoading(true); // Start loading when adding a profile
    const { lat, lng } = await handleAddressChange(newProfile.address);

    const newProfileObj = {
      id: profiles.length + 1,
      name: newProfile.name,
      description: newProfile.description,
      location: { lat, lng },
      photo: newProfile.photo || "https://via.placeholder.com/50", // Use uploaded photo or placeholder
    };

    setProfiles([...profiles, newProfileObj]);
    setNewProfile({ name: "", address: "", description: "", photo: null });
    setIsLoading(false); // End loading
  };

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfile({ ...newProfile, photo: reader.result }); // Set the uploaded image as a base64 string
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  // Handle Search Filter
  useEffect(() => {
    setFilteredProfiles(
      profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, profiles]);

  const UpdateMapCenter = ({ location }) => {
    const map = useMap();
    if (location) {
      map.setView(location, 10);
    }
    return null;
  };

  return (
    <div className="app-container">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Profiles"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Profile List */}
      <div className="profile-list">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="profile-card"
            onClick={() => {
              setSelectedProfile(profile); // Set the selected profile
              setSelectedLocation(profile.location); // Update map center to selected profile's location
            }} // Set the selected profile and map location when clicked
          >
            <img
              className="profile-photo"
              src={profile.photo}
              alt={`${profile.name}'s photo`}
            />
            <div className="profile-info">
              <div className="profile-name">{profile.name}</div>
              <div className="profile-description">{profile.description}</div>
            </div>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProfile(profile.id);
              }}
            >
              Delete
            </button>
            {/* Button to update map center to this profile's location */}
            <button
              className="map-update-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent profile selection click event
                setSelectedLocation(profile.location); // Update the map center
              }}
            >
              Show on Map
            </button>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}

      {/* Map Section */}
      <div className="map-container">
        <MapContainer
          center={selectedLocation || { lat: 28.6139, lng: 77.209 }} // Default location (New Delhi)
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {profiles.map((profile) => (
            <Marker
              key={profile.id}
              position={profile.location}
              icon={L.icon({ iconUrl: "https://via.placeholder.com/30" })}
            >
              <Popup>{profile.name}</Popup>
            </Marker>
          ))}
          <UpdateMapCenter location={selectedLocation} />
        </MapContainer>
      </div>

      {/* Add Profile Form */}
      <div className="add-profile-form">
        <h3>Add a New Profile</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newProfile.address}
          onChange={(e) => setNewProfile({ ...newProfile, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProfile.description}
          onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {newProfile.photo && <img className="preview-photo" src={newProfile.photo} alt="Uploaded preview" />}
        <button onClick={handleAddProfile}>Add Profile</button>
      </div>

      {/* Render Profile Details View */}
      {selectedProfile && (
        <ProfileDetails
          profile={selectedProfile} // Pass selected profile to the ProfileDetails component
          onClose={() => setSelectedProfile(null)} // Close profile details view
        />
      )}
    </div>
  );
};

export default App;
