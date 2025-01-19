import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";

const ProfileListPage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch profiles from an API or mock data
    axios.get("https://api.example.com/profiles")
      .then(response => setProfiles(response.data))
      .catch(error => console.error("Error fetching profiles:", error));
  }, []);

  return (
    <div>
      <h1>Profiles</h1>
      <div className="profile-list">
        {profiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default ProfileListPage;
