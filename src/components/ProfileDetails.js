// ProfileDetails.js
import React from 'react';

const ProfileDetails = ({ profile, onClose }) => {
  return (
    <div className="profile-details-container">
      <button className="close-button" onClick={onClose}>Close</button>
      <h2>Profile Details</h2>
      <img className="profile-details-photo" src={profile.photo} alt={`${profile.name}'s photo`} />
      <div className="profile-details-name">{profile.name}</div>
      <div className="profile-details-description">{profile.description}</div>
      <div className="profile-details-location">
        Location: {profile.location.lat}, {profile.location.lng}
      </div>
    </div>
  );
};

export default ProfileDetails;
