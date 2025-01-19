import React from "react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <img src={profile.photo} alt={profile.name} />
      <h2>{profile.name}</h2>
      <p>{profile.description}</p>
      <button onClick={() => alert(`Show map for ${profile.name}`)}>Summary</button>
    </div>
  );
};

export default ProfileCard;
